export const netflixTemplate = {
  name: 'StreamFlix Pro — Premium Video Streaming & Admin Platform',
  category: 'Video Streaming & Media',
  description: 'Enterprise streaming application featuring hero billboard, video playback modal, user authentication, subscription tiers, category carousels, and complete admin dashboard.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'streamflix-pro',
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
  views?: number;
}

export const MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'Cyberpunk: Neon Horizon',
    backdrop: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    overview: 'In a dystopian city controlled by mega-corporations, a rogue bio-hacker discovers a neural virus that could awaken synthetic consciousness.',
    rating: 9.4,
    year: 2026,
    duration: '2h 18m',
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    trending: true,
    views: 482190,
  },
  {
    id: 'm2',
    title: 'Echoes of the Deep',
    backdrop: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    overview: 'An oceanic expedition team investigating a mysterious trench anomaly awakens a primeval intelligence beneath the Mariana Trench.',
    rating: 8.9,
    year: 2025,
    duration: '1h 54m',
    genre: ['Mystery', 'Horror', 'Adventure'],
    trending: true,
    views: 312450,
  },
  {
    id: 'm3',
    title: 'Quantum Dynasty',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    overview: 'A prodigy physicist discovers how to communicate with alternate timelines, only to trigger a temporal war that threatens humanity.',
    rating: 9.1,
    year: 2026,
    duration: '2h 05m',
    genre: ['Sci-Fi', 'Drama'],
    views: 298100,
  },
  {
    id: 'm4',
    title: 'Midnight in Tokyo',
    backdrop: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    poster: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    overview: 'An undercover detective infiltrates an elite underground street racing syndicate where cars run on experimental synthetic fuel.',
    rating: 8.6,
    year: 2025,
    duration: '1h 48m',
    genre: ['Action', 'Crime'],
    views: 185200,
  },
];
`,
    '/src/components/Navbar.tsx': `function Navbar({
  onSearch,
  onOpenLogin,
  onOpenSubscribe,
  onToggleAdmin,
  isAdminView,
  user,
}: {
  onSearch?: (q: string) => void;
  onOpenLogin: () => void;
  onOpenSubscribe: () => void;
  onToggleAdmin: () => void;
  isAdminView: boolean;
  user: { email: string; tier: string } | null;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-3.5 bg-gradient-to-b from-black/95 via-black/70 to-transparent backdrop-blur-sm border-b border-zinc-900/60">
      <div className="flex items-center space-x-8">
        <span className="text-2xl font-black tracking-wider text-red-600 uppercase cursor-pointer">
          StreamFlix<span className="text-white text-xs font-mono ml-1 px-1.5 py-0.5 bg-red-950 rounded border border-red-800">PRO</span>
        </span>
        <div className="hidden lg:flex space-x-6 text-xs font-semibold text-zinc-300">
          <a href="#" className="text-white hover:text-red-500 transition">Browse</a>
          <a href="#" className="hover:text-red-500 transition">Series</a>
          <a href="#" className="hover:text-red-500 transition">Movies</a>
          <a href="#" className="hover:text-red-500 transition">4K Originals</a>
          <a href="#" className="hover:text-red-500 transition">My Watchlist</a>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Search titles, actors, genres..."
          onChange={(e) => onSearch && onSearch(e.target.value)}
          className="bg-black/70 border border-zinc-700/80 text-xs px-3.5 py-1.5 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 w-36 sm:w-60 transition"
        />

        <button
          onClick={onOpenSubscribe}
          className="hidden sm:flex px-3 py-1.5 bg-gradient-to-r from-amber-500 to-red-600 text-white font-extrabold text-xs rounded-full shadow hover:opacity-90 transition"
        >
          {user ? user.tier : '⚡ Upgrade to 4K'}
        </button>

        <button
          onClick={onToggleAdmin}
          className={\`px-3 py-1.5 rounded-full text-xs font-bold transition border \${
            isAdminView ? 'bg-red-600 text-white border-red-500' : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:text-white'
          }\`}
        >
          {isAdminView ? 'Exit Admin' : 'Admin Hub'}
        </button>

        {user ? (
          <div className="flex items-center space-x-2 pl-1">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-xs text-white shadow">
              {user.email.slice(0, 2).toUpperCase()}
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenLogin}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-full transition shadow"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
`,
    '/src/components/Hero.tsx': `function Hero({ movie, onPlay }: { movie: Movie; onPlay: (m: Movie) => void }) {
  if (!movie) return null;
  return (
    <div className="relative h-[82vh] w-full flex items-center bg-black">
      <img
        src={movie.backdrop}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-transparent to-transparent" />

      <div className="relative z-10 max-w-2xl px-6 md:px-12 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-red-500 uppercase tracking-widest">
          <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded">PREMIERE</span>
          <span>•</span>
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.duration}</span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">★ {movie.rating}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">{movie.title}</h1>
        <p className="text-zinc-300 text-xs md:text-sm leading-relaxed line-clamp-3 max-w-xl">{movie.overview}</p>

        <div className="flex items-center space-x-3 pt-2">
          <button
            onClick={() => onPlay(movie)}
            className="px-6 py-2.5 bg-white text-black font-extrabold text-xs md:text-sm rounded-lg hover:bg-zinc-200 transition flex items-center space-x-2 shadow-xl hover:scale-105"
          >
            <span>▶ Play Full Movie</span>
          </button>
          <button
            onClick={() => alert("Added to your StreamFlix watchlist!")}
            className="px-5 py-2.5 bg-zinc-800/80 text-white font-semibold text-xs md:text-sm rounded-lg hover:bg-zinc-700 transition flex items-center space-x-2 backdrop-blur border border-white/10"
          >
            <span>+ Add to Watchlist</span>
          </button>
        </div>
      </div>
    </div>
  );
}
`,
    '/src/components/MovieRow.tsx': `function MovieRow({
  title,
  movies,
  onSelect,
}: {
  title: string;
  movies: Movie[];
  onSelect: (m: Movie) => void;
}) {
  return (
    <div className="py-4 px-6 md:px-12 space-y-2.5">
      <h2 className="text-lg md:text-xl font-bold text-white tracking-wide flex items-center justify-between">
        <span>{title}</span>
        <span className="text-xs text-zinc-500 font-mono font-normal cursor-pointer hover:text-red-500">Explore all →</span>
      </h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none">
        {movies.map((m) => (
          <div
            key={m.id}
            onClick={() => onSelect(m)}
            className="flex-none w-52 md:w-64 group cursor-pointer relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:scale-105 transition-all duration-300 hover:border-red-600/60 hover:shadow-2xl hover:z-20"
          >
            <div className="relative h-36 bg-black">
              <img src={m.backdrop} alt={m.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-zinc-300">
                {m.duration}
              </span>
            </div>
            <div className="p-3 bg-zinc-950/90">
              <h3 className="text-white font-bold text-xs truncate">{m.title}</h3>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1">
                <span className="text-emerald-400 font-semibold">{m.rating * 10}% Match</span>
                <span>{m.genre[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    '/src/App.tsx': `function App() {
  const [moviesList, setMoviesList] = useState(MOVIES);
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [search, setSearch] = useState('');
  const [isAdminView, setIsAdminView] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  // User Auth State
  const [user, setUser] = useState<{ email: string; tier: string } | null>({
    email: 'alex.creator@nexus.io',
    tier: 'Premium 4K Ultra',
  });

  // Admin New Movie Form State
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('Sci-Fi');
  const [newDuration, setNewDuration] = useState('2h 10m');

  const filteredMovies = search
    ? moviesList.filter(
        (m) =>
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.genre.some((g) => g.toLowerCase().includes(search.toLowerCase()))
      )
    : moviesList;

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newMovie: Movie = {
      id: 'm_' + Date.now(),
      title: newTitle,
      backdrop: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1600&q=80',
      poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&q=80',
      overview: 'Newly published premium original title added through StreamFlix Admin Dashboard.',
      rating: 9.0,
      year: 2026,
      duration: newDuration,
      genre: [newGenre, 'Original'],
      trending: true,
      views: 1200,
    };
    setMoviesList([newMovie, ...moviesList]);
    setNewTitle('');
    alert('Movie published to streaming catalog!');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-red-600 selection:text-white pb-16">
      <Navbar
        onSearch={setSearch}
        onOpenLogin={() => setShowLoginModal(true)}
        onOpenSubscribe={() => setShowSubscribeModal(true)}
        onToggleAdmin={() => setIsAdminView(!isAdminView)}
        isAdminView={isAdminView}
        user={user}
      />

      {isAdminView ? (
        /* ================= ADMIN DASHBOARD VIEW ================= */
        <div className="pt-24 px-6 md:px-12 max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h1 className="text-2xl font-black text-white">StreamFlix Admin Operations</h1>
              <p className="text-xs text-zinc-400 mt-1">Manage titles, analytics telemetry, and global subscription revenue.</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-red-950 border border-red-800 text-red-300 font-bold">
              ADMIN MODE ACTIVE
            </span>
          </div>

          {/* Metric KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
              <span className="text-xs text-zinc-400 font-medium">Total Subscribers</span>
              <div className="text-2xl font-black text-white">142,890</div>
              <span className="text-[11px] text-emerald-400 font-semibold">↑ +18.4% this month</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
              <span className="text-xs text-zinc-400 font-medium">Monthly Revenue (MRR)</span>
              <div className="text-2xl font-black text-white">$2,143,350</div>
              <span className="text-[11px] text-emerald-400 font-semibold">↑ +24.1% YoY</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
              <span className="text-xs text-zinc-400 font-medium">Active Streams</span>
              <div className="text-2xl font-black text-cyan-400">18,420 Live</div>
              <span className="text-[11px] text-zinc-500">Global edge CDN healthy</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
              <span className="text-xs text-zinc-400 font-medium">Catalog Titles</span>
              <div className="text-2xl font-black text-white">{moviesList.length} Movies</div>
              <span className="text-[11px] text-zinc-400">Ultra HD 4K HDR</span>
            </div>
          </div>

          {/* Publish New Title Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">Publish New Title to Catalog</h3>
            <form onSubmit={handleAddMovie} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Movie Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
              />
              <select
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Thriller">Thriller</option>
              </select>
              <input
                type="text"
                placeholder="Duration (e.g. 2h 15m)"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition"
              >
                + Publish Title
              </button>
            </form>
          </div>

          {/* Video Catalog Table */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-3.5 border-b border-zinc-800 flex items-center justify-between text-xs font-bold text-zinc-300">
              <span>Catalog Titles</span>
              <span className="font-mono text-zinc-500">{moviesList.length} items</span>
            </div>
            <div className="divide-y divide-zinc-800/80">
              {moviesList.map((m) => (
                <div key={m.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-zinc-850 transition">
                  <div className="flex items-center space-x-3">
                    <img src={m.backdrop} alt={m.title} className="w-14 h-9 rounded object-cover" />
                    <div>
                      <h4 className="font-bold text-white">{m.title}</h4>
                      <span className="text-[11px] text-zinc-400 font-mono">{m.genre.join(', ')} • {m.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-zinc-400 font-mono">{m.views?.toLocaleString() || 1200} views</span>
                    <span className="text-emerald-400 font-bold">★ {m.rating}</span>
                    <button
                      onClick={() => setMoviesList(moviesList.filter((item) => item.id !== m.id))}
                      className="text-zinc-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ================= REGULAR CONSUMER STREAMING VIEW ================= */
        <>
          <Hero movie={moviesList[0]} onPlay={setActiveMovie} />
          <div className="-mt-16 relative z-20 space-y-4">
            <MovieRow title="🔥 Trending Premieres" movies={filteredMovies} onSelect={setActiveMovie} />
            <MovieRow
              title="🚀 Sci-Fi & Cyberpunk Originals"
              movies={filteredMovies.filter((m) => m.genre.includes('Sci-Fi'))}
              onSelect={setActiveMovie}
            />
            <MovieRow
              title="💥 Action & Adrenaline"
              movies={filteredMovies.filter((m) => m.genre.includes('Action'))}
              onSelect={setActiveMovie}
            />
            <MovieRow
              title="🎭 Thrillers & Mystery"
              movies={filteredMovies.filter((m) => m.genre.includes('Mystery') || m.genre.includes('Thriller'))}
              onSelect={setActiveMovie}
            />
          </div>
        </>
      )}

      {/* ================= FULLSCREEN VIDEO PLAYER MODAL ================= */}
      {activeMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="bg-zinc-900 rounded-2xl overflow-hidden max-w-4xl w-full border border-zinc-700 shadow-2xl relative flex flex-col">
            <button
              onClick={() => setActiveMovie(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/80 text-white hover:bg-red-600 transition flex items-center justify-center font-bold"
            >
              ✕
            </button>

            {/* Simulated Video Canvas */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeMovie.backdrop}
                alt={activeMovie.title}
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-red-600/90 text-white flex items-center justify-center text-3xl shadow-2xl cursor-pointer hover:scale-110 transition">
                  ▶
                </div>
              </div>

              {/* Player UI Controls Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-600 h-full w-1/3" />
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-300">
                  <div className="flex items-center space-x-3">
                    <button className="text-white font-bold">❚❚ Pause</button>
                    <span>0:42:15 / {activeMovie.duration}</span>
                    <span className="text-zinc-500">|</span>
                    <span>🔊 100%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-zinc-800 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400">4K HDR</span>
                    <span className="bg-zinc-800 px-2 py-0.5 rounded text-[10px] font-mono">Dolby Atmos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-3">
              <h2 className="text-2xl font-black text-white">{activeMovie.title}</h2>
              <div className="flex items-center space-x-3 text-xs text-zinc-400">
                <span className="text-emerald-400 font-bold">{activeMovie.rating} Rating</span>
                <span>•</span>
                <span>{activeMovie.year}</span>
                <span>•</span>
                <span>{activeMovie.duration}</span>
                <span>•</span>
                <span className="border border-zinc-700 px-2 py-0.5 rounded text-[10px] text-zinc-300">Ultra HD 4K</span>
              </div>
              <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">{activeMovie.overview}</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= USER LOGIN / AUTH MODAL ================= */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white">StreamFlix Account</h3>
              <button onClick={() => setShowLoginModal(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setUser({ email: 'user@streamflix.io', tier: 'Premium 4K Ultra' });
                setShowLoginModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="alex.creator@nexus.io"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Password</label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition"
              >
                Sign In to Watch
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= SUBSCRIPTION TIERS MODAL ================= */}
      {showSubscribeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white">Choose Your StreamFlix Plan</h3>
              <button onClick={() => setShowSubscribeModal(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: 'Basic', price: '$8.99', quality: '1080p Full HD', screens: '1 Screen' },
                { name: 'Standard', price: '$14.99', quality: '1080p + Downloads', screens: '2 Screens' },
                { name: 'Premium 4K', price: '$19.99', quality: '4K Ultra HD + HDR', screens: '4 Screens', active: true },
              ].map((tier) => (
                <div
                  key={tier.name}
                  onClick={() => {
                    setUser({ email: user?.email || 'user@streamflix.io', tier: tier.name + ' Plan' });
                    setShowSubscribeModal(false);
                  }}
                  className={\`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition \${
                    tier.active ? 'bg-red-950/40 border-red-500 shadow-lg' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                  }\`}
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white">{tier.name}</h4>
                    <span className="text-xl font-black text-red-500">{tier.price}</span>
                    <span className="text-[10px] text-zinc-500 block">/month</span>
                    <p className="text-[11px] text-zinc-300 pt-2">{tier.quality}</p>
                    <p className="text-[10px] text-zinc-500">{tier.screens}</p>
                  </div>
                  <button className="mt-4 w-full py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition">
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`,
    '/supabase/migrations/20261107_streaming_schema.sql': `-- StreamFlix Pro Supabase Database Schema
CREATE TABLE IF NOT EXISTS public.streamflix_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'standard', 'premium_4k')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

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
    views_count BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.streamflix_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.streamflix_users(id) ON DELETE CASCADE,
    tier TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    current_period_end TIMESTAMPTZ NOT NULL,
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
