// NEXUS AI Domain Types

export type ProjectStatus =
  | 'QUEUED'
  | 'PLANNING'
  | 'GENERATING'
  | 'EXECUTING'
  | 'TESTING'
  | 'FIXING'
  | 'READY'
  | 'DEPLOYED'
  | 'FAILED'
  | 'CANCELLED'
  | 'NEEDS_APPROVAL';

export type AgentRole =
  | 'planner'
  | 'designer'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'debugger'
  | 'tester'
  | 'security'
  | 'performance'
  | 'deployment';

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role: 'user' | 'admin' | 'developer';
  tier: 'free' | 'pro' | 'team' | 'enterprise';
  monthlyTokenQuota: number;
  tokensConsumedThisMonth: number;
  createdAt: string;
}

export interface ProjectSettings {
  theme: 'dark' | 'light';
  autoFix: boolean;
  strictTesting: boolean;
  preferredModel?: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description: string;
  template: string;
  currentStatus: ProjectStatus;
  framework: string;
  thumbnailUrl?: string;
  isArchived: boolean;
  settings: ProjectSettings;
  createdAt: string;
  updatedAt: string;
  fileCount?: number;
}

export interface ProjectFile {
  id: string;
  projectId: string;
  path: string;
  name: string;
  content: string;
  isDirectory: boolean;
  language: string;
  sizeBytes: number;
  version: number;
  lastModifiedBy: string;
  updatedAt: string;
}

export interface AgentTask {
  id: string;
  runId: string;
  agentRole: AgentRole;
  title: string;
  description?: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'blocked';
  output?: Record<string, unknown>;
  startedAt?: string;
  finishedAt?: string;
}

export interface AgentRun {
  id: string;
  projectId: string;
  userId: string;
  prompt: string;
  status: ProjectStatus;
  plan?: {
    appName: string;
    category: string;
    architectureSummary: string;
    pages: string[];
    components: string[];
    models: string[];
    tasks: { role: AgentRole; title: string; desc: string }[];
  };
  tokensUsed: number;
  costUsd: number;
  errorSummary?: string;
  startedAt: string;
  completedAt?: string;
  tasks?: AgentTask[];
}

export type ModelProviderId = 'gemini' | 'openai' | 'anthropic' | 'custom' | 'offline-nexus';

export interface ModelMetadata {
  id: string;
  name: string;
  provider: ModelProviderId;
  description: string;
  contextWindow: number;
  inputCostPer1M: number;
  outputCostPer1M: number;
  supportsStreaming: boolean;
  supportsVision: boolean;
  supportsToolCalling: boolean;
  isAvailable: boolean;
}

export interface UserCredential {
  id: string;
  userId: string;
  provider: ModelProviderId;
  label?: string;
  isActive: boolean;
  lastVerifiedAt?: string;
  createdAt: string;
}

export interface ModelHealthStatus {
  provider: ModelProviderId;
  isHealthy: boolean;
  latencyMs: number;
  message: string;
  lastChecked: string;
}

export type DeploymentProvider = 'supabase' | 'vercel' | 'netlify' | 'zip' | 'webhook';

export interface DeploymentRecord {
  id: string;
  projectId: string;
  targetProvider: DeploymentProvider;
  status: 'pending' | 'building' | 'live' | 'failed' | 'cancelled';
  deploymentUrl?: string;
  buildLogs: string;
  commitHash: string;
  createdAt: string;
}

export interface VisualInspectorElement {
  id: string;
  tagName: string;
  classes: string;
  innerText?: string;
  sourceFile?: string;
  sourceLine?: number;
  styles?: {
    color?: string;
    backgroundColor?: string;
    padding?: string;
    fontSize?: string;
  };
}

export interface TerminalLogEntry {
  id: string;
  timestamp: string;
  stream: 'stdout' | 'stderr' | 'system';
  message: string;
}

export interface PlanStep {
  id: string;
  role: AgentRole;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

