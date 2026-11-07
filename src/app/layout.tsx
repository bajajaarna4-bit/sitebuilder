import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NEXUS AI — Autonomous Full-Stack Software Development Platform',
  description: 'From an idea to a fully functional application. Designed, developed, tested, and deployed by autonomous AI agents.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface-950 text-zinc-100 antialiased min-h-screen selection:bg-cyan-500/20 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}

