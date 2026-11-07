export const youtubeTemplate = {
  name: 'NexusTube — Video Sharing & Community Platform',
  category: 'Video Platform & Community',
  description: 'Full YouTube-style video-sharing application with responsive grid, player modal, subscribe interactions, comment feed, and category chips.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'nexustube',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7', 'lucide-react': '^0.475.0' },
      },
      null,
      2
    ),
    '/src/data/videos.ts': `export interface Video {
  id: string;
  title: string;
  channel: {
    name: string;
    avatar: string;
    verified?: boolean;
    subscribers: string;
  };
  views: string;
  timeAgo: string;
  duration: string;
  thumbnail: string;
  category: string;
}

export const VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Building an Autonomous AI Operating System in 2026',
    channel: {
      name: 'Deep Engineering Labs',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true,
      subscribers: '1.4M',
    },
    views: '412K views',
    timeAgo: '1 day ago',
    duration: '24:18',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
  },
  {
    id: 'v2',
    title: 'Quantum Supremacy Explained: What Actually Happened?',
    channel: {
      name: 'Veritasium & Co',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: true,
      subscribers: '980K',
    },
    views: '890K views',
    timeAgo: '3 days ago',
    duration: '18:02',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    category: 'Science',
  },
  {
    id: 'v3',
    title: 'Lo-Fi Chill Beats for Autonomous Coding [24/7 Stream]',
    channel: {
      name: 'Nexus Beats',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      subscribers: '3.2M',
    },
    views: '2.1M views',
    timeAgo: 'Streamed live',
    duration: 'LIVE',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    category: 'Music',
  },
  {
    id: 'v4',
    title: 'Next.js 15 Full Course: Modern Server Components Masterclass',
    channel: {
      name: 'Architecture School',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      verified: true,
      subscribers: '650K',
    },
    views: '180K views',
    timeAgo: '5 days ago',
    duration: '3:45:12',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    category: 'Coding',
  },
];
`,
    '/src/App.tsx': `import React, { useState } from 'react';
import { VIDEOS, Video } from './data/videos';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const categories = ['All', 'Technology', 'Science', 'Coding', 'Music', 'Gaming', 'AI Systems'];
  const filtered = selectedCategory === 'All' ? VIDEOS : VIDEOS.filter(v => v.category === selectedCategory);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <header className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-lg">
            ▶
          </div>
          <span className="text-xl font-bold tracking-tight text-white">NexusTube</span>
        </div>
        <div className="hidden sm:flex items-center flex-1 max-w-lg mx-8">
          <input
            type="text"
            placeholder="Search videos, creators..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-full px-5 py-2 text-sm text-white focus:outline-none focus:border-red-500"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-full">
            + Upload
          </button>
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold">
            NT
          </div>
        </div>
      </header>

      <div className="px-6 py-3 border-b border-zinc-800/80 flex space-x-2 overflow-x-auto scrollbar-none">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={\`px-3.5 py-1.5 rounded-lg text-xs font-medium transition flex-none \${
              selectedCategory === c ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            }\`}
          >
            {c}
          </button>
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group cursor-pointer space-y-3"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <span className="absolute bottom-2 right-2 bg-black/80 font-mono text-[11px] px-1.5 py-0.5 rounded text-white font-semibold">
                  {video.duration}
                </span>
              </div>
              <div className="flex space-x-3">
                <img src={video.channel.avatar} alt={video.channel.name} className="w-9 h-9 rounded-full object-cover flex-none" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm text-zinc-100 group-hover:text-red-400 transition line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-zinc-400">
                    <span>{video.channel.name}</span>
                    {video.channel.verified && <span className="text-zinc-500">✓</span>}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    <span>{video.views}</span> • <span>{video.timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-zinc-900 rounded-xl overflow-hidden max-w-3xl w-full border border-zinc-700 shadow-2xl relative">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-red-600 transition flex items-center justify-center font-bold"
            >
              ✕
            </button>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img src={activeVideo.thumbnail} alt={activeVideo.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl shadow-xl hover:scale-110 transition cursor-pointer">
                  ▶
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-white">{activeVideo.title}</h2>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center space-x-3">
                  <img src={activeVideo.channel.avatar} alt={activeVideo.channel.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-sm text-white">{activeVideo.channel.name}</h4>
                    <span className="text-xs text-zinc-400">{activeVideo.channel.subscribers} subscribers</span>
                  </div>
                </div>
                <button
                  onClick={() => setSubscribed(!subscribed)}
                  className={\`px-5 py-2 rounded-full font-bold text-xs transition \${
                    subscribed ? 'bg-zinc-800 text-white border border-zinc-700' : 'bg-red-600 text-white hover:bg-red-500'
                  }\`}
                >
                  {subscribed ? 'Subscribed ✓' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`,
    '/supabase/migrations/20261107_youtube_schema.sql': `-- NexusTube Schema
CREATE TABLE IF NOT EXISTS public.nexustube_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT NOT NULL,
    video_url TEXT NOT NULL,
    views_count BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
`,
  },
};

