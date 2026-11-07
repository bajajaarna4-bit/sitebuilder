import { ModelProviderAdapter, GenerationOptions, GenerationResult } from './types';

export class OpenAIProviderAdapter implements ModelProviderAdapter {
  id = 'openai' as const;
  name = 'OpenAI';

  isConfigured(apiKey?: string): boolean {
    return Boolean(apiKey || process.env.OPENAI_API_KEY);
  }

  private resolveKey(apiKey?: string): string {
    const key = apiKey || process.env.OPENAI_API_KEY;
    if (!key) {
      throw new Error('OpenAI API key is not configured. Please supply an API key in Model Control Center or set OPENAI_API_KEY.');
    }
    return key;
  }

  async healthCheck(apiKey?: string): Promise<{ healthy: boolean; latencyMs: number; message: string }> {
    const start = Date.now();
    try {
      const key = this.resolveKey(apiKey);
      const res = await fetch('https://api.openai.com/v1/models', {
        headers: { Authorization: `Bearer ${key}` },
      });
      const latencyMs = Date.now() - start;
      if (!res.ok) {
        const err = await res.text();
        return { healthy: false, latencyMs, message: `OpenAI API returned error: ${res.status} ${err}` };
      }
      return { healthy: true, latencyMs, message: 'OpenAI API connection healthy' };
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
    const model = options?.model || 'gpt-4o-mini';

    const messages = [];
    if (options?.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const body: Record<string, unknown> = {
      model,
      messages,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 4096,
    };

    if (options?.responseFormat === 'json') {
      body.response_format = { type: 'json_object' };
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`OpenAI API Error (${res.status}): ${err}`);
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || '';
    const inputTokens = data.usage?.prompt_tokens || Math.ceil(prompt.length / 4);
    const outputTokens = data.usage?.completion_tokens || Math.ceil(text.length / 4);
    const totalTokens = inputTokens + outputTokens;
    const costUsd = (inputTokens / 1_000_000) * 0.15 + (outputTokens / 1_000_000) * 0.6;

    return {
      text,
      tokensUsed: { inputTokens, outputTokens, totalTokens },
      costUsd,
      model,
      provider: 'openai',
    };
  }

  async streamText(
    prompt: string,
    apiKey: string | undefined,
    onChunk: (text: string) => void,
    options?: GenerationOptions
  ): Promise<GenerationResult> {
    const result = await this.generateText(prompt, apiKey, options);
    const lines = result.text.split('\n');
    for (const line of lines) {
      onChunk(line + '\n');
      await new Promise((r) => setTimeout(r, 15));
    }
    return result;
  }
}
