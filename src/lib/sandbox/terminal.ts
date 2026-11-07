import { TerminalLogEntry } from '@/types';

export class VirtualTerminal {
  private logs: TerminalLogEntry[] = [];
  private listeners: ((entry: TerminalLogEntry) => void)[] = [];

  constructor() {
    this.writeSystem('NEXUS Autonomous Environment Initialized. Terminal ready.');
  }

  getLogs(): TerminalLogEntry[] {
    return [...this.logs];
  }

  write(stream: 'stdout' | 'stderr' | 'system', message: string) {
    const entry: TerminalLogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toLocaleTimeString(),
      stream,
      message,
    };
    this.logs.push(entry);
    for (const listener of this.listeners) {
      listener(entry);
    }
  }

  writeStdout(msg: string) {
    this.write('stdout', msg);
  }

  writeStderr(msg: string) {
    this.write('stderr', msg);
  }

  writeSystem(msg: string) {
    this.write('system', `[NEXUS] ${msg}`);
  }

  subscribe(listener: (entry: TerminalLogEntry) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  clear() {
    this.logs = [];
    this.writeSystem('Terminal buffer cleared.');
  }
}
