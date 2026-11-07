export const instagramTemplate = {
  name: 'InstaVibe — Social Media & Content Platform',
  category: 'Social Media & Photo Sharing',
  description: 'Full Instagram-style social app with responsive feed, user stories bar, interactive likes, comment modals, create post flow, and profile tabs.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'instavibe',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7', 'lucide-react': '^0.475.0' },
      },
      null,
      2
    ),
    '/src/data/posts.ts': `export interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  image: string;
  caption: string;
  likes: number;
  commentsCount: number;
  timeAgo: string;
}

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: {
      name: 'Elena Rostova',
      handle: 'elenarostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true,
    },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    caption: 'Chasing auroras in northern Norway 🌌 The silence here speaks louder than any city.',
    likes: 1243,
    commentsCount: 84,
    timeAgo: '2h',
  },
  {
    id: 'p2',
    author: {
      name: 'Marcus Vance',
      handle: 'marcus_vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    caption: 'Shipped our new autonomous platform v1 today with the team. Endless coffee and great vibes! ☕🚀',
    likes: 892,
    commentsCount: 42,
    timeAgo: '4h',
  },
];
`,
    '/src/components/StoriesBar.tsx': `import React from 'react';

const STORIES = [
  { id: 's0', name: 'Your Story', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', isMe: true },
  { id: 's1', name: 'alexa.ux', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
  { id: 's2', name: 'david_dev', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { id: 's3', name: 'sarah.ai', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
  { id: 's4', name: 'studio_k', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' },
];

export function StoriesBar() {
  return (
    <div className="flex space-x-4 overflow-x-auto p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 scrollbar-none mb-6">
      {STORIES.map((s) => (
        <div key={s.id} className="flex flex-col items-center space-y-1.5 cursor-pointer flex-none">
          <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
            <img src={s.avatar} alt={s.name} className="w-full h-full rounded-full object-cover border-2 border-zinc-950" />
          </div>
          <span className="text-[11px] text-zinc-300 font-medium truncate w-16 text-center">{s.name}</span>
        </div>
      ))}
    </div>
  );
}
`,
    '/src/App.tsx': `import React, { useState } from 'react';
import { StoriesBar } from './components/StoriesBar';
import { INITIAL_POSTS, Post } from './data/posts';

export default function App() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedMap(prev => {
      const nextLiked = !prev[id];
      setPosts(current => current.map(p => p.id === id ? { ...p, likes: p.likes + (nextLiked ? 1 : -1) } : p));
      return { ...prev, [id]: nextLiked };
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-6 py-3.5 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
          InstaVibe
        </h1>
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs rounded-lg transition">
            + New Post
          </button>
          <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold">
            U
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6">
        <StoriesBar />
        <div className="space-y-6">
          {posts.map((post) => {
            const isLiked = likedMap[post.id];
            return (
              <div key={post.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold text-sm text-white">{post.author.handle}</span>
                        {post.author.verified && <span className="text-sky-400 text-xs">✓</span>}
                      </div>
                      <span className="text-zinc-500 text-[11px]">{post.timeAgo} ago</span>
                    </div>
                  </div>
                  <button className="text-zinc-500 hover:text-white">•••</button>
                </div>

                <div onDoubleClick={() => toggleLike(post.id)} className="cursor-pointer bg-black">
                  <img src={post.image} alt="post" className="w-full h-96 object-cover" />
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center space-x-4 text-xl">
                    <button onClick={() => toggleLike(post.id)} className={isLiked ? "text-red-500 scale-110 transition" : "text-zinc-300 hover:text-white"}>
                      {isLiked ? '❤️' : '🤍'}
                    </button>
                    <button className="text-zinc-300 hover:text-white">💬</button>
                    <button className="text-zinc-300 hover:text-white">✈️</button>
                  </div>
                  <div className="text-xs font-bold text-white">{post.likes.toLocaleString()} likes</div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    <span className="font-bold text-white mr-2">{post.author.handle}</span>
                    {post.caption}
                  </p>
                  <button className="text-zinc-500 text-[11px] font-medium">View all {post.commentsCount} comments</button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
`,
    '/supabase/migrations/20261107_social_schema.sql': `-- InstaVibe Schema
CREATE TABLE IF NOT EXISTS public.instavibe_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    caption TEXT,
    media_url TEXT NOT NULL,
    likes_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.instavibe_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES public.instavibe_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    UNIQUE(post_id, user_id)
);
`,
  },
};
