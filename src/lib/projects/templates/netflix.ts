export const netflixTemplate = {
  name: 'StreamFlix — Netflix-Style Video Streaming Platform',
  category: 'Video Streaming & Media',
  description: 'Premium video streaming application featuring hero billboard, category carousels, video player modal, watchlist state, and search.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'streamflix',
        version: '1.0.0',
        private: true,
        scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
        dependencies: {
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          next: '15.1.7',
          'lucide-react': '^0.475.0',
        },
      },
      null,
      2
    ),
    '/src/data/movies.ts': `export interface Movie {
  id: string;
  title: string;
  backdrop: string;
  poster: string;
  overview: string;
  rating: number;
  year: number;
  duration: string;
  genre: string[];
  trending?: boolean;
}

export const MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'Cyberpunk: Neon Horizon',
    backdrop: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    overview: 'In a dystopian city controlled by mega-corporations, a rogue bio-hacker discovers a neural virus that could awaken synthetic consciousness.',
    rating: 9.2,
    year: 2026,
    duration: '2h 18m',
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    trending: true,
  },
  {
    id: 'm2',
    title: 'Echoes of the Deep',
    backdrop: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    overview: 'An oceanic expedition team investigating a mysterious trench anomaly awakens a primeval intelligence beneath the Mariana Trench.',
    rating: 8.7,
    year: 2025,
    duration: '1h 54m',
    genre: ['Mystery', 'Horror', 'Adventure'],
    trending: true,
  },
  {
    id: 'm3',
    title: 'Quantum Dynasty',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    overview: 'A prodigy physicist discovers how to communicate with alternate timelines, only to trigger a temporal war that threatens humanity.',
    rating: 8.9,
    year: 2026,
    duration: '2h 05m',
    genre: ['Sci-Fi', 'Drama'],
  },
  {
    id: 'm4',
    title: 'Midnight in Tokyo',
    backdrop: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    overview: 'An undercover detective infiltrates an elite underground street racing syndicate where cars run on experimental synthetic fuel.',
    rating: 8.4,
    year: 2025,
    duration: '1h 48m',
    genre: ['Action', 'Crime'],
  },
];
`,
    '/src/components/Navbar.tsx': `import React from 'react';

export function Navbar({ onSearch }: { onSearch?: (q: string) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
      <div className="flex items-center space-x-8">
        <span className="text-2xl font-black tracking-wider text-red-600 uppercase">StreamFlix</span>
        <div className="hidden md:flex space-x-6 text-sm font-medium text-zinc-300">
          <a href="#" className="text-white hover:text-red-500 transition">Home</a>
          <a href="#" className="hover:text-red-500 transition">Series</a>
          <a href="#" className="hover:text-red-500 transition">Movies</a>
          <a href="#" className="hover:text-red-500 transition">New & Popular</a>
          <a href="#" className="hover:text-red-500 transition">My List</a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search titles, actors, genres..."
          onChange={(e) => onSearch && onSearch(e.target.value)}
          className="bg-black/60 border border-zinc-700 text-sm px-4 py-1.5 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 w-48 md:w-64"
        />
        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-xs text-white">
          NX
        </div>
      </div>
    </nav>
  );
}
`,
    '/src/components/Hero.tsx': `import React from 'react';
import { Movie } from '../data/movies';

export function Hero({ movie, onPlay }: { movie: Movie; onPlay: (m: Movie) => void }) {
  if (!movie) return null;
  return (
    <div className="relative h-[80vh] w-full flex items-center bg-black">
      <img
        src={movie.backdrop}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
      <div className="relative z-10 max-w-2xl px-8 md:px-16 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-red-500 uppercase tracking-widest">
          <span>★ Featured Premiere</span>
          <span>•</span>
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.duration}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">{movie.title}</h1>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed line-clamp-3">{movie.overview}</p>
        <div className="flex items-center space-x-4 pt-2">
          <button
            onClick={() => onPlay(movie)}
            className="px-6 py-2.5 bg-white text-black font-bold rounded hover:bg-zinc-200 transition flex items-center space-x-2 shadow-lg"
          >
            <span>▶ Play Now</span>
          </button>
          <button
            onClick={() => alert("Added to Watchlist!")}
            className="px-6 py-2.5 bg-zinc-800/80 text-white font-medium rounded hover:bg-zinc-700 transition flex items-center space-x-2 backdrop-blur border border-white/10"
          >
            <span>+ My List</span>
          </button>
        </div>
      </div>
    </div>
  );
}
`,
    '/src/components/MovieRow.tsx': `import React from 'react';
import { Movie } from '../data/movies';

export function MovieRow({
  title,
  movies,
  onSelect,
}: {
  title: string;
  movies: Movie[];
  onSelect: (m: Movie) => void;
}) {
  return (
    <div className="py-6 px-8 md:px-16 space-y-3">
      <h2 className="text-xl font-bold text-white tracking-wide">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none">
        {movies.map((m) => (
          <div
            key={m.id}
            onClick={() => onSelect(m)}
            className="flex-none w-52 md:w-64 group cursor-pointer relative rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:scale-105 transition-all duration-300 hover:border-red-600/50 hover:shadow-2xl hover:z-20"
          >
            <img src={m.backdrop} alt={m.title} className="w-full h-36 object-cover" />
            <div className="p-3 bg-zinc-950/90">
              <h3 className="text-white font-bold text-sm truncate">{m.title}</h3>
              <div className="flex items-center justify-between text-xs text-zinc-400 mt-1">
                <span className="text-emerald-400 font-semibold">{m.rating * 10}% Match</span>
                <span>{m.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    '/src/App.tsx': `import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MovieRow } from './components/MovieRow';
import { MOVIES, Movie } from './data/movies';

export default function App() {
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [search, setSearch] = useState('');

  const filteredMovies = search
    ? MOVIES.filter(m => m.title.toLowerCase().includes(search.toLowerCase()) || m.genre.some(g => g.toLowerCase().includes(search.toLowerCase())))
    : MOVIES;

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-red-600 selection:text-white">
      <Navbar onSearch={setSearch} />
      <Hero movie={MOVIES[0]} onPlay={setActiveMovie} />
      <div className="-mt-16 relative z-20 space-y-4">
        <MovieRow title="🔥 Trending Now" movies={filteredMovies} onSelect={setActiveMovie} />
        <MovieRow title="🚀 Sci-Fi & Cyberpunk Originals" movies={filteredMovies.filter(m => m.genre.includes('Sci-Fi'))} onSelect={setActiveMovie} />
        <MovieRow title="💥 Action & Adrenaline" movies={filteredMovies.filter(m => m.genre.includes('Action'))} onSelect={setActiveMovie} />
      </div>

      {activeMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-zinc-900 rounded-xl overflow-hidden max-w-2xl w-full border border-zinc-700 shadow-2xl relative">
            <button
              onClick={() => setActiveMovie(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-red-600 transition flex items-center justify-center font-bold"
            >
              ✕
            </button>
            <div className="relative h-64 bg-black flex items-center justify-center">
              <img src={activeMovie.backdrop} alt={activeMovie.title} className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl shadow-lg cursor-pointer hover:scale-110 transition">
                  ▶
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <h2 className="text-2xl font-bold text-white">{activeMovie.title}</h2>
              <div className="flex items-center space-x-3 text-xs text-zinc-400">
                <span className="text-emerald-400 font-bold">{activeMovie.rating} Rating</span>
                <span>•</span>
                <span>{activeMovie.year}</span>
                <span>•</span>
                <span>{activeMovie.duration}</span>
                <span>•</span>
                <span className="border border-zinc-700 px-1.5 py-0.5 rounded text-[10px]">ULTRA HD 4K</span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">{activeMovie.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`,
    '/supabase/migrations/20261107_streaming_schema.sql': `-- StreamFlix Supabase Database Schema
CREATE TABLE IF NOT EXISTS public.streamflix_movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    backdrop_url TEXT NOT NULL,
    poster_url TEXT NOT NULL,
    overview TEXT NOT NULL,
    rating NUMERIC(3, 1) NOT NULL DEFAULT 8.0,
    year INTEGER NOT NULL,
    duration TEXT NOT NULL,
    genres TEXT[] NOT NULL DEFAULT '{}',
    is_trending BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.streamflix_watchlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    movie_id UUID REFERENCES public.streamflix_movies(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    UNIQUE(user_id, movie_id)
);
`,
  },
};
