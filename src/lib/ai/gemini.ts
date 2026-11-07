import { ModelProviderAdapter, GenerationOptions, GenerationResult } from './types';

export class GeminiProviderAdapter implements ModelProviderAdapter {
  id = 'gemini' as const;
  name = 'Google Gemini';

  isConfigured(apiKey?: string): boolean {
    return Boolean(apiKey || process.env.GEMINI_API_KEY);
  }

  private resolveKey(apiKey?: string): string {
    const key = apiKey || process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('Gemini API key is not configured. Please supply an API key in Model Control Center or set GEMINI_API_KEY.');
    }
    return key;
  }

  async healthCheck(apiKey?: string): Promise<{ healthy: boolean; latencyMs: number; message: string }> {
    const start = Date.now();
    try {
      const key = this.resolveKey(apiKey);
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const latencyMs = Date.now() - start;
      if (!res.ok) {
        const err = await res.text();
        return { healthy: false, latencyMs, message: `Gemini API returned error: ${res.status} ${err}` };
      }
      return { healthy: true, latencyMs, message: 'Google Gemini API connection healthy' };
    } catch (err: unknown) {
      return {
        healthy: false,
        latencyMs: Date.now() - start,
        message: err instanceof Error ? err.message : 'Unknown connection error',
      };
    }
  }

  async generateText(prompt: string, apiKey?: string, options?: GenerationOptions): Promise<GenerationResult> {
    const key = this.resolveKey(apiKey);
    const model = options?.model || 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

    const body: Record<string, unknown> = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxTokens ?? 4096,
      },
    };

    if (options?.systemPrompt) {
      body.systemInstruction = {
        parts: [{ text: options.systemPrompt }],
      };
    }

    if (options?.responseFormat === 'json') {
      (body.generationConfig as Record<string, unknown>).responseMimeType = 'application/json';
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gemini API Error (${res.status}): ${err}`);
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const inputTokens = data.usageMetadata?.promptTokenCount || Math.ceil(prompt.length / 4);
    const outputTokens = data.usageMetadata?.candidatesTokenCount || Math.ceil(text.length / 4);
    const totalTokens = inputTokens + outputTokens;
    const costUsd = (inputTokens / 1_000_000) * 0.15 + (outputTokens / 1_000_000) * 0.6;

    return {
      text,
      tokensUsed: { inputTokens, outputTokens, totalTokens },
      costUsd,
      model,
      provider: 'gemini',
    };
  }

  async streamText(
    prompt: string,
    apiKey: string | undefined,
    onChunk: (text: string) => void,
    options?: GenerationOptions
  ): Promise<GenerationResult> {
    const result = await this.generateText(prompt, apiKey, options);
    // Continuous streaming simulation or line-by-line emission
    const lines = result.text.split('\n');
    for (const line of lines) {
      onChunk(line + '\n');
      await new Promise((r) => setTimeout(r, 15));
    }
    return result;
  }
}

