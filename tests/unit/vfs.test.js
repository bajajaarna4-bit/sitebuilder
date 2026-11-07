const test = require('node:test');
const assert = require('node:assert');

class VirtualFileSystem {
  constructor() {
    this.files = new Map();
  }
  writeFile(path, content) {
    this.files.set(path, { path, content, version: (this.files.get(path)?.version || 0) + 1 });
  }
  getFile(path) {
    return this.files.get(path);
  }
  deleteFile(path) {
    return this.files.delete(path);
  }
  getAllFiles() {
    return Array.from(this.files.values());
  }
}

test('Virtual File System (VFS) Operations', async (t) => {
  const vfs = new VirtualFileSystem();

  await t.test('creates and retrieves a new file', () => {
    vfs.writeFile('/src/App.tsx', 'export default function App() {}');
    const file = vfs.getFile('/src/App.tsx');
    assert.ok(file);
    assert.strictEqual(file.path, '/src/App.tsx');
    assert.strictEqual(file.content, 'export default function App() {}');
    assert.strictEqual(file.version, 1);
  });

  await t.test('increments version on modification', () => {
    vfs.writeFile('/src/App.tsx', 'export default function UpdatedApp() {}');
    const file = vfs.getFile('/src/App.tsx');
    assert.strictEqual(file.version, 2);
    assert.ok(file.content.includes('UpdatedApp'));
  });

  await t.test('deletes a file properly', () => {
    vfs.writeFile('/temp.txt', 'temporary');
    assert.strictEqual(vfs.getAllFiles().length, 2);
    vfs.deleteFile('/temp.txt');
    assert.strictEqual(vfs.getAllFiles().length, 1);
    assert.strictEqual(vfs.getFile('/temp.txt'), undefined);
  });
});

