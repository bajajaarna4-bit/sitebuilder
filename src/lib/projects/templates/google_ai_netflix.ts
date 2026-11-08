import { ProjectTemplate } from './index';

// ============================================================================
// GOOGLE AI & NETFLIX CINEMA PLATFORM (Cinematic Masterpiece Suite)
// ============================================================================
export const googleAiNetflixTemplate: ProjectTemplate = {
  name: 'Google AI Studio & Netflix Cinema — Cinematic Streaming & Intelligence',
  category: 'Cinematic Media & AI Entertainment',
  description: 'Flagship hybrid combining Google AI intelligence and Netflix premium cinema with real video streaming playback, category carousels, theater mode modal, watchlist persistence, and multilingual voice narration in English, Hindi, Korean, Chinese, and Sanskrit.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'google-ai-netflix-cinema',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const [watchlist, setWatchlist] = useState(['m1', 'm3']);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isVoiceNarrating, setIsVoiceNarrating] = useState(false);
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [moviesList, setMoviesList] = useState([
    {
      id: 'm1',
      title: 'Artificial Consciousness',
      category: 'ai',
      badge: 'DEEPMIND EXCLUSIVE',
      rating: '9.9',
      duration: '2h 14m',
      cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 'm2',
      title: 'Neon Horizon: Cyber Tokyo',
      category: 'scifi',
      badge: 'TRENDING #1',
      rating: '9.6',
      duration: '1h 58m',
      cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
    {
      id: 'm3',
      title: 'Subway Surfers: The Animated Film',
      category: 'animation',
      badge: 'NEW RELEASE',
      rating: '9.8',
      duration: '1h 35m',
      cover: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    {
      id: 'm4',
      title: 'Quantum Velocity',
      category: 'scifi',
      badge: '4K DOLBY VISION',
      rating: '9.4',
      duration: '2h 05m',
      cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    },
    {
      id: 'm5',
      title: 'Antigravity: Autonomous Builders',
      category: 'ai',
      badge: 'POPULAR',
      rating: '9.7',
      duration: '1h 48m',
      cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  ]);

  const FEATURED_HERO = {
    id: 'm1',
    title: 'Google DeepMind: Artificial Consciousness',
    subtitle: 'NEXUS & GOOGLE DEEPMIND CINEMA ORIGINAL',
    badge: 'PREMIERE 4K HDR',
    rating: '9.9 ★',
    duration: '2h 14m',
    year: '2026',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    description: 'An elite team of artificial intelligence researchers inside DeepMind breakthroughs into synthetic sentience, sparking an unprecedented global paradigm shift in autonomous software generation.',
  };

  const MULTILINGUAL_SCRIPTS = {
    en: 'Welcome to Google AI and Netflix Cinema. Experience cinematic artificial intelligence storytelling with 4K video playback, real-time interactive carousels, and autonomous streaming.',
    hi: 'गूगल एआई और नेटफ्लिक्स सिनेमा में आपका स्वागत है। 4K वीडियो स्ट्रीमिंग और कृत्रिम बुद्धिमत्ता की दुनिया का आनंद लें।',
    ko: '구글 AI 및 넷플릭스 시네마에 오신 것을 환영합니다. 4K 비디오 스트리밍과 인공지능 엔터테인먼트를 실시간으로 즐겨보세요.',
    zh: '欢迎来到 Google AI 与 Netflix 影院。体验4K超清视频流媒体与人工智能生成的电影级视听盛宴。',
    sa: 'गूगल-एआई-नेटफ्लिक्स्-चलच्चित्र-मञ्चे स्वागतम् अस्ति। अत्र 4K चलच्चित्रस्य कृत्रिमबुद्धेः च अद्भुतं सङ्गमं पश्यन्तु।',
  };

  const handleToggleVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isVoiceNarrating) {
      window.speechSynthesis.cancel();
      setIsVoiceNarrating(false);
      return;
    }

    window.speechSynthesis.cancel();
    const script = MULTILINGUAL_SCRIPTS[selectedLanguage] || MULTILINGUAL_SCRIPTS.en;
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = selectedLanguage === 'ko' ? 'ko-KR' : selectedLanguage === 'zh' ? 'zh-CN' : selectedLanguage === 'hi' || selectedLanguage === 'sa' ? 'hi-IN' : 'en-US';
    utterance.onend = () => setIsVoiceNarrating(false);
    utterance.onerror = () => setIsVoiceNarrating(false);
    window.speechSynthesis.speak(utterance);
    setIsVoiceNarrating(true);
  };

  const toggleWatchlist = (id) => {
    if (watchlist.includes(id)) {
      setWatchlist(watchlist.filter((item) => item !== id));
    } else {
      setWatchlist([...watchlist, id]);
    }
  };

  const handleGenerateAIScene = () => {
    const newId = 'm_' + Date.now();
    const newFilm = {
      id: newId,
      title: 'Neural Synthesizer Vol. ' + (moviesList.length + 1),
      category: 'ai',
      badge: 'AI GENERATED',
      rating: '9.9',
      duration: '1h 45m',
      cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    };
    setMoviesList([newFilm, ...moviesList]);
    setActiveModalVideo(newFilm);
  };

  const filteredMovies = moviesList
    .filter((m) => {
      if (activeTab === 'watchlist') return watchlist.includes(m.id);
      if (activeTab === 'series') return m.category === 'ai';
      if (activeTab === 'movies') return m.category === 'scifi' || m.category === 'animation';
      return true;
    })
    .filter((m) => (activeCategory === 'all' ? true : m.category === activeCategory))
    .filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col font-sans select-none overflow-x-hidden">
      {/* Netflix + Google AI Cinema Navigation */}
      <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-xl border-b border-white/[0.08] px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => { setActiveTab('home'); setActiveCategory('all'); }}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 via-rose-500 to-cyan-500 flex items-center justify-center font-black text-black text-base shadow-lg shadow-red-600/30">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-widest text-red-500 uppercase">STREAMFLIX</span>
              <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase -mt-0.5">Google AI Studio</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-5 text-xs font-semibold text-zinc-300">
            <span onClick={() => { setActiveTab('home'); setActiveCategory('all'); }} className={\`cursor-pointer transition \${activeTab === 'home' ? 'text-white font-bold' : 'hover:text-white'}\`}>Home</span>
            <span onClick={() => { setActiveTab('series'); setActiveCategory('all'); }} className={\`cursor-pointer transition \${activeTab === 'series' ? 'text-white font-bold' : 'hover:text-white'}\`}>AI Series</span>
            <span onClick={() => { setActiveTab('movies'); setActiveCategory('all'); }} className={\`cursor-pointer transition \${activeTab === 'movies' ? 'text-white font-bold' : 'hover:text-white'}\`}>4K Films</span>
            <span onClick={() => { setActiveTab('watchlist'); setActiveCategory('all'); }} className={\`cursor-pointer transition \${activeTab === 'watchlist' ? 'text-white font-bold' : 'hover:text-white'}\`}>My List ({watchlist.length})</span>
          </nav>
        </div>

        {/* Right Search, Multilingual Voice, Scene Generator & Profile */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleGenerateAIScene}
            className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white font-extrabold text-[11px] shadow-lg shadow-red-600/20 active:scale-95 transition"
          >
            <span>✨</span>
            <span>Synthesize AI Film</span>
          </button>

          {/* Multilingual Voice Narrator Button */}
          <div className="flex items-center space-x-1.5 bg-zinc-900 border border-white/[0.1] rounded-full px-2.5 py-1">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-xs text-cyan-300 font-mono focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-zinc-900 text-white">🇺🇸 English</option>
              <option value="hi" className="bg-zinc-900 text-white">🇮🇳 हिन्दी</option>
              <option value="ko" className="bg-zinc-900 text-white">🇰🇷 한국어</option>
              <option value="zh" className="bg-zinc-900 text-white">🇨🇳 中文</option>
              <option value="sa" className="bg-zinc-900 text-white">🕉️ संस्कृतम्</option>
            </select>
            <button
              onClick={handleToggleVoice}
              className={\`p-1 rounded-full text-xs transition flex items-center space-x-1 \${
                isVoiceNarrating ? 'bg-emerald-500 text-black animate-pulse' : 'text-zinc-400 hover:text-white'
              }\`}
              title="Listen in Selected Language"
            >
              <span>{isVoiceNarrating ? '🔊' : '🔈'}</span>
            </button>
          </div>

          <input
            type="text"
            placeholder="Search titles, actors, AI genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="hidden sm:block w-44 bg-zinc-900/90 border border-white/[0.1] rounded-full px-3.5 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
          />

          <div className="w-8 h-8 rounded-lg bg-red-600 font-black text-xs flex items-center justify-center text-white shadow-md">
            G
          </div>
        </div>
      </header>

      {/* Cinematic Hero Billboard with Live Playable Video */}
      <section className="relative w-full h-[75vh] flex items-center justify-start overflow-hidden bg-black">
        {/* Background Looping 4K Video or Backdrop Poster */}
        {isHeroVideoPlaying ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={FEATURED_HERO.videoUrl}
            className="absolute inset-0 w-full h-full object-cover filter brightness-75 scale-105 transition-all duration-1000"
          />
        ) : (
          <img
            src={FEATURED_HERO.poster}
            alt={FEATURED_HERO.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60 filter brightness-90 transition-transform duration-700 hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/60 to-transparent" />

        {/* Hero Narrative Info */}
        <div className="relative z-10 max-w-3xl px-8 md:px-16 space-y-4">
          <div className="flex items-center space-x-2.5 text-xs font-mono font-extrabold tracking-widest text-red-400">
            <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
              {FEATURED_HERO.badge}
            </span>
            <span>•</span>
            <span className="text-cyan-400">{FEATURED_HERO.subtitle}</span>
            <span>•</span>
            <span className="text-emerald-400">{FEATURED_HERO.rating}</span>
          </div>

          <h1 className="text-3xl md:text-6xl font-black text-white tracking-tight leading-none drop-shadow-lg">
            {FEATURED_HERO.title}
          </h1>

          <p className="text-zinc-300 text-xs md:text-sm leading-relaxed max-w-xl line-clamp-3">
            {FEATURED_HERO.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => setActiveModalVideo(FEATURED_HERO)}
              className="px-7 py-3 bg-white hover:bg-zinc-200 text-black font-black text-xs md:text-sm rounded-xl transition flex items-center space-x-2 shadow-2xl hover:scale-105 active:scale-95"
            >
              <span className="text-base">▶</span>
              <span>Watch 4K Trailer Now</span>
            </button>

            <button
              onClick={() => toggleWatchlist(FEATURED_HERO.id)}
              className="px-5 py-3 bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold text-xs md:text-sm rounded-xl border border-white/[0.1] backdrop-blur transition flex items-center space-x-2"
            >
              <span>{watchlist.includes(FEATURED_HERO.id) ? '✓ In Watchlist' : '+ Add to List'}</span>
            </button>

            <button
              onClick={() => setIsHeroVideoPlaying(!isHeroVideoPlaying)}
              className="px-4 py-3 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 font-mono text-xs rounded-xl border border-white/[0.08] backdrop-blur transition flex items-center space-x-1.5"
            >
              <span>{isHeroVideoPlaying ? '⏸ Pause Ambient' : '▶ Play Ambient Loop'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      <div className="px-8 md:px-16 py-4 flex items-center space-x-2 overflow-x-auto text-xs font-bold border-b border-white/[0.06]">
        {[
          { id: 'all', label: 'All Releases' },
          { id: 'ai', label: 'Google AI Originals' },
          { id: 'scifi', label: 'Sci-Fi & Cyberpunk' },
          { id: 'animation', label: '3D Gaming & Animation' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={\`px-4 py-1.5 rounded-full transition whitespace-nowrap \${
              activeCategory === cat.id
                ? 'bg-red-600 text-white font-black shadow-lg shadow-red-600/30'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/[0.06]'
            }\`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Netflix Horizontal Movies Carousel */}
      <main className="px-8 md:px-16 py-8 space-y-6 flex-1">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <h2 className="text-lg font-black tracking-wide text-white uppercase">
              {activeTab === 'watchlist'
                ? 'My Saved Watchlist'
                : activeTab === 'series'
                ? 'Google AI Studios & Neural Series'
                : activeTab === 'movies'
                ? '4K Ultra HD Feature Films'
                : 'Trending Cinema & Interactive Releases'}
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-400">Ultra HD 4K Enabled</span>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="text-4xl">🎬</div>
            <h3 className="font-bold text-white text-base">No films in this selection yet</h3>
            <p className="text-xs text-zinc-500">Try switching categories or clicking &quot;+ List&quot; on any film.</p>
            <button
              onClick={() => { setActiveTab('home'); setActiveCategory('all'); }}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition"
            >
              Browse All Releases
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => setActiveModalVideo(movie)}
                className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/[0.08] hover:border-red-500/80 transition-all duration-300 hover:scale-105 cursor-pointer shadow-xl flex flex-col justify-between"
              >
                <div className="relative h-44 bg-zinc-900 overflow-hidden">
                  <img
                    src={movie.cover}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono font-bold text-red-400 border border-red-500/40">
                    {movie.badge}
                  </span>
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono text-emerald-400 font-bold">
                    ★ {movie.rating} • {movie.duration}
                  </span>
                </div>

                <div className="p-3.5 space-y-2 bg-zinc-950">
                  <h3 className="font-extrabold text-xs text-white truncate">{movie.title}</h3>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-cyan-400 font-semibold group-hover:underline">▶ Watch Video</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchlist(movie.id);
                      }}
                      className="text-zinc-400 hover:text-white"
                    >
                      {watchlist.includes(movie.id) ? '✓ Saved' : '+ List'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Video Playback Modal Overlay */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8">
          <div className="bg-zinc-950 border border-white/[0.1] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Top Bar */}
            <div className="p-4 bg-zinc-900 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-red-500 font-black text-sm">STREAMFLIX 4K PLAYER</span>
                <span className="text-xs text-zinc-400 font-mono">• {activeModalVideo.title}</span>
              </div>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Embedded Real HTML5 Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                controls
                autoPlay
                className="w-full h-full object-contain"
                src={activeModalVideo.videoUrl}
              >
                Your browser does not support HTML5 video streaming.
              </video>
            </div>

            <div className="p-4 bg-zinc-950 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Resolution: 3840x2160 UHD • Dolby Atmos 5.1</span>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`,
  },
};
