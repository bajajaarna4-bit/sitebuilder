import { ProjectFile } from '@/types';

export interface ProjectCheckpoint {
  id: string;
  projectId: string;
  message: string;
  author: string;
  timestamp: string;
  fileCount: number;
  snapshot: Record<string, string>; // path -> content
}

class CheckpointManager {
  private checkpoints: Map<string, ProjectCheckpoint[]> = new Map();

  createCheckpoint(
    projectId: string,
    message: string,
    files: ProjectFile[],
    author = 'Developer'
  ): ProjectCheckpoint {
    const snapshot: Record<string, string> = {};
    for (const f of files) {
      if (!f.isDirectory) {
        snapshot[f.path] = f.content;
      }
    }

    const checkpoint: ProjectCheckpoint = {
      id: `ckpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      projectId,
      message,
      author,
      timestamp: new Date().toISOString(),
      fileCount: Object.keys(snapshot).length,
      snapshot,
    };

    const existing = this.checkpoints.get(projectId) || [];
    this.checkpoints.set(projectId, [checkpoint, ...existing]);
    return checkpoint;
  }

  getCheckpoints(projectId: string): ProjectCheckpoint[] {
    return this.checkpoints.get(projectId) || [];
  }

  getCheckpoint(projectId: string, checkpointId: string): ProjectCheckpoint | undefined {
    const list = this.getCheckpoints(projectId);
    return list.find((c) => c.id === checkpointId);
  }

  computeDiff(oldContent: string, newContent: string): { added: number; removed: number; changes: string[] } {
    const oldLines = oldContent.split('\n');
    const newLines = newContent.split('\n');
    let added = 0;
    let removed = 0;
    const changes: string[] = [];

    const max = Math.max(oldLines.length, newLines.length);
    for (let i = 0; i < max; i++) {
      const o = oldLines[i];
      const n = newLines[i];
      if (o !== n) {
        if (o !== undefined && n !== undefined) {
          changes.push(`~ Line ${i + 1}: ${o} -> ${n}`);
        } else if (n !== undefined) {
          added++;
          changes.push(`+ Line ${i + 1}: ${n}`);
        } else if (o !== undefined) {
          removed++;
          changes.push(`- Line ${i + 1}: ${o}`);
        }
      }
    }

    return { added, removed, changes };
  }
}

export const checkpointManager = new CheckpointManager();

