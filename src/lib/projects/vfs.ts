import { ProjectFile } from '@/types';

export class VirtualFileSystem {
  private files: Map<string, ProjectFile> = new Map();

  constructor(initialFiles: ProjectFile[] = []) {
    for (const file of initialFiles) {
      this.files.set(file.path, file);
    }
  }

  getAllFiles(): ProjectFile[] {
    return Array.from(this.files.values()).sort((a, b) => a.path.localeCompare(b.path));
  }

  getFile(path: string): ProjectFile | undefined {
    return this.files.get(path);
  }

  writeFile(
    projectId: string,
    path: string,
    content: string,
    language = 'typescript',
    modifiedBy = 'agent:frontend'
  ): ProjectFile {
    const existing = this.files.get(path);
    const now = new Date().toISOString();
    const name = path.split('/').pop() || path;

    const file: ProjectFile = {
      id: existing ? existing.id : `file_${Math.random().toString(36).substring(2, 9)}`,
      projectId,
      path,
      name,
      content,
      isDirectory: false,
      language,
      sizeBytes: Buffer.byteLength(content, 'utf8'),
      version: existing ? existing.version + 1 : 1,
      lastModifiedBy: modifiedBy,
      updatedAt: now,
    };

    this.files.set(path, file);
    return file;
  }

  deleteFile(path: string): boolean {
    return this.files.delete(path);
  }

  createDirectory(projectId: string, path: string): ProjectFile {
    const name = path.split('/').pop() || path;
    const now = new Date().toISOString();
    const dir: ProjectFile = {
      id: `dir_${Math.random().toString(36).substring(2, 9)}`,
      projectId,
      path,
      name,
      content: '',
      isDirectory: true,
      language: '',
      sizeBytes: 0,
      version: 1,
      lastModifiedBy: 'user',
      updatedAt: now,
    };
    this.files.set(path, dir);
    return dir;
  }

  getFileTree() {
    const root: Record<string, unknown> = {};

    for (const file of this.files.values()) {
      const parts = file.path.split('/').filter(Boolean);
      let current = root;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isLast = i === parts.length - 1;

        if (isLast) {
          current[part] = {
            ...file,
            type: file.isDirectory ? 'directory' : 'file',
          };
        } else {
          if (!current[part]) {
            current[part] = { type: 'directory', children: {} };
          }
          current = (current[part] as { children: Record<string, unknown> }).children;
        }
      }
    }

    return root;
  }

  getSnapshot(): Record<string, string> {
    const snapshot: Record<string, string> = {};
    for (const [path, file] of this.files.entries()) {
      if (!file.isDirectory) {
        snapshot[path] = file.content;
      }
    }
    return snapshot;
  }

  loadSnapshot(projectId: string, snapshot: Record<string, string>) {
    this.files.clear();
    for (const [path, content] of Object.entries(snapshot)) {
      this.writeFile(projectId, path, content);
    }
  }
}

