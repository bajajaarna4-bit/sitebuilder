'use client';

import React, { useState } from 'react';
import { Key, Eye, EyeOff, Plus, Trash2, Shield, Lock } from 'lucide-react';

export interface EnvVariable {
  key: string;
  value: string;
  isSecret: boolean;
}

interface EnvVarsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (variables: EnvVariable[]) => void;
}

export function EnvVarsModal({ isOpen, onClose, onSave }: EnvVarsModalProps) {
  const [variables, setVariables] = useState<EnvVariable[]>([
    { key: 'NEXT_PUBLIC_APP_NAME', value: 'NEXUS Studio App', isSecret: false },
    { key: 'DATABASE_URL', value: 'postgresql://postgres:••••••••@db.supabase.co:5432', isSecret: true },
    { key: 'SUPABASE_ANON_KEY', value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', isSecret: true },
  ]);

  const [visibleMap, setVisibleMap] = useState<Record<number, boolean>>({});
  const [newKey, setNewKey] = useState('');
  const [newVal, setNewVal] = useState('');
  const [newSecret, setNewSecret] = useState(false);

  if (!isOpen) return null;

  const toggleVisibility = (index: number) => {
    setVisibleMap((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim()) return;
    setVariables([...variables, { key: newKey.toUpperCase().trim(), value: newVal, isSecret: newSecret }]);
    setNewKey('');
    setNewVal('');
    setNewSecret(false);
  };

  const handleDelete = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const handleSaveAll = () => {
    onSave(variables);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-surface-900 border border-zinc-800 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-bold text-white">Project Environment Variables</h2>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white text-xs">✕</button>
        </div>

        <p className="text-xs text-zinc-400">
          Environment variables are securely injected into the isolated execution container at runtime. Variables marked as secrets are encrypted and masked.
        </p>

        {/* Existing variables table */}
        <div className="max-h-56 overflow-y-auto space-y-2">
          {variables.map((env, idx) => {
            const isVisible = visibleMap[idx];
            return (
              <div key={idx} className="p-2.5 bg-surface-950 border border-zinc-800 rounded-xl flex items-center justify-between space-x-3 text-xs">
                <span className="font-mono font-bold text-cyan-300 truncate w-40">{env.key}</span>
                <div className="flex-1 flex items-center space-x-2">
                  <span className="font-mono text-zinc-400 truncate max-w-xs">
                    {env.isSecret && !isVisible ? '••••••••••••••••' : env.value}
                  </span>
                  {env.isSecret && (
                    <button onClick={() => toggleVisibility(idx)} className="text-zinc-500 hover:text-zinc-300">
                      {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
                <button onClick={() => handleDelete(idx)} className="text-zinc-500 hover:text-red-400 p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Add new variable form */}
        <form onSubmit={handleAdd} className="p-3 bg-surface-950/60 border border-zinc-800/80 rounded-xl space-y-2">
          <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Add Variable</span>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="KEY (e.g. STRIPE_KEY)"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="bg-surface-950 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono uppercase focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              placeholder="VALUE"
              value={newVal}
              onChange={(e) => setNewVal(e.target.value)}
              className="bg-surface-950 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-1.5 text-xs text-zinc-400 cursor-pointer">
              <input
                type="checkbox"
                checked={newSecret}
                onChange={(e) => setNewSecret(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-cyan-500 bg-surface-950 border-zinc-700"
              />
              <span>Mask as secret</span>
            </label>
            <button
              type="submit"
              className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs rounded-lg transition"
            >
              + Add
            </button>
          </div>
        </form>

        <div className="flex items-center justify-end space-x-3 pt-2 border-t border-zinc-800">
          <button onClick={onClose} className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white">
            Cancel
          </button>
          <button
            onClick={handleSaveAll}
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-xl transition shadow"
          >
            Save Environment
          </button>
        </div>
      </div>
    </div>
  );
}

