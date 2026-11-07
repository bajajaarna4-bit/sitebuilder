import { ModelProviderAdapter } from './types';
import { GeminiProviderAdapter } from './gemini';
import { OpenAIProviderAdapter } from './openai';
import { AnthropicProviderAdapter } from './anthropic';
import { NexusOfflineProviderAdapter } from './fallback';
import { ModelMetadata, ModelProviderId, ModelHealthStatus } from '@/types';

class ModelRegistry {
  private adapters: Map<ModelProviderId, ModelProviderAdapter> = new Map();

  constructor() {
    this.register(new GeminiProviderAdapter());
    this.register(new OpenAIProviderAdapter());
    this.register(new AnthropicProviderAdapter());
    this.register(new NexusOfflineProviderAdapter());
  }

  register(adapter: ModelProviderAdapter) {
    this.adapters.set(adapter.id, adapter);
  }

  getAdapter(providerId: ModelProviderId): ModelProviderAdapter {
    const adapter = this.adapters.get(providerId);
    if (!adapter) {
      // Fallback to offline engine
      return this.adapters.get('offline-nexus')!;
    }
    return adapter;
  }

  getAllModels(): ModelMetadata[] {
    const geminiConfigured = this.adapters.get('gemini')!.isConfigured();
    const openaiConfigured = this.adapters.get('openai')!.isConfigured();
    const anthropicConfigured = this.adapters.get('anthropic')!.isConfigured();

    return [
      {
        id: 'gemini-2.5-flash',
        name: 'Google Gemini 2.5 Flash',
        provider: 'gemini',
        description: 'Fast, multimodal model optimized for autonomous generation and low latency.',
        contextWindow: 1_000_000,
        inputCostPer1M: 0.15,
        outputCostPer1M: 0.60,
        supportsStreaming: true,
        supportsVision: true,
        supportsToolCalling: true,
        isAvailable: geminiConfigured,
      },
      {
        id: 'gemini-2.5-pro',
        name: 'Google Gemini 2.5 Pro',
        provider: 'gemini',
        description: 'State-of-the-art reasoning model for complex architectural planning and code synthesis.',
        contextWindow: 2_000_000,
        inputCostPer1M: 1.25,
        outputCostPer1M: 5.00,
        supportsStreaming: true,
        supportsVision: true,
        supportsToolCalling: true,
        isAvailable: geminiConfigured,
      },
      {
        id: 'gpt-4o',
        name: 'OpenAI GPT-4o',
        provider: 'openai',
        description: 'Flagship omni-model for high-precision code generation and debugging.',
        contextWindow: 128_000,
        inputCostPer1M: 2.50,
        outputCostPer1M: 10.00,
        supportsStreaming: true,
        supportsVision: true,
        supportsToolCalling: true,
        isAvailable: openaiConfigured,
      },
      {
        id: 'gpt-4o-mini',
        name: 'OpenAI GPT-4o Mini',
        provider: 'openai',
        description: 'High-speed, cost-efficient model for component synthesis and unit testing.',
        contextWindow: 128_000,
        inputCostPer1M: 0.15,
        outputCostPer1M: 0.60,
        supportsStreaming: true,
        supportsVision: true,
        supportsToolCalling: true,
        isAvailable: openaiConfigured,
      },
      {
        id: 'claude-3-7-sonnet',
        name: 'Anthropic Claude 3.7 Sonnet',
        provider: 'anthropic',
        description: 'Exceptional coding, refactoring, and architectural design capabilities.',
        contextWindow: 200_000,
        inputCostPer1M: 3.00,
        outputCostPer1M: 15.00,
        supportsStreaming: true,
        supportsVision: true,
        supportsToolCalling: true,
        isAvailable: anthropicConfigured,
      },
      {
        id: 'nexus-autonomous-v1',
        name: 'NEXUS Autonomous Core Engine',
        provider: 'offline-nexus',
        description: 'Built-in deterministic synthesis engine. Operates instantly with zero external dependencies.',
        contextWindow: 100_000,
        inputCostPer1M: 0,
        outputCostPer1M: 0,
        supportsStreaming: true,
        supportsVision: true,
        supportsToolCalling: true,
        isAvailable: true,
      },
    ];
  }

  async runHealthChecks(credentials?: Record<ModelProviderId, string>): Promise<ModelHealthStatus[]> {
    const statuses: ModelHealthStatus[] = [];

    for (const [id, adapter] of this.adapters.entries()) {
      const apiKey = credentials?.[id];
      const isConfigured = adapter.isConfigured(apiKey);

      if (!isConfigured && id !== 'offline-nexus') {
        statuses.push({
          provider: id,
          isHealthy: false,
          latencyMs: 0,
          message: 'Not configured — please enter your API key in Model Control Center to activate',
          lastChecked: new Date().toISOString(),
        });
        continue;
      }

      const res = await adapter.healthCheck(apiKey);
      statuses.push({
        provider: id,
        isHealthy: res.healthy,
        latencyMs: res.latencyMs,
        message: res.message,
        lastChecked: new Date().toISOString(),
      });
    }

    return statuses;
  }
}

export const modelRegistry = new ModelRegistry();
