import JSZip from 'jszip';
import { ProjectFile } from '@/types';

export async function exportProjectToZip(projectName: string, files: ProjectFile[]): Promise<Blob> {
  const zip = new JSZip();

  for (const file of files) {
    if (!file.isDirectory) {
      // Clean path, remove leading slash
      const cleanPath = file.path.startsWith('/') ? file.path.slice(1) : file.path;
      zip.file(cleanPath, file.content);
    }
  }

  // Add standard README to export
  zip.file(
    'NEXUS_EXPORT_README.md',
    `# ${projectName}\n\nGenerated autonomously by **NEXUS AI**.\n\n## Getting Started\n\n\`\`\`bash\npnpm install\npnpm dev\n\`\`\`\n\nVisit http://localhost:3000 to preview your application.`
  );

  return await zip.generateAsync({ type: 'blob' });
}

