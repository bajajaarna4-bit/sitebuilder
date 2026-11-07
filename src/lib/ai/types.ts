import { ModelProviderId } from '@/types';

export interface GenerationOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  responseFormat?: 'text' | 'json';
  onStreamChunk?: (chunk: string) => void;
}

export interface GenerationResult {
  text: string;
  tokensUsed: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
  costUsd: number;
  model: string;
  provider: ModelProviderId;
}

export interface ModelProviderAdapter {
  id: ModelProviderId;
  name: string;
  isConfigured(apiKey?: string): boolean;
  generateText(prompt: string, apiKey?: string, options?: GenerationOptions): Promise<GenerationResult>;
  streamText(prompt: string, apiKey: string | undefined, onChunk: (text: string) => void, options?: GenerationOptions): Promise<GenerationResult>;
  healthCheck(apiKey?: string): Promise<{ healthy: boolean; latencyMs: number; message: string }>;
}
