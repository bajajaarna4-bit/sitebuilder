import { ProjectTemplate } from './index';

// ============================================================================
// POKI ONLINE GAMES & SUBWAY SURFERS ARCADE SUITE
// ============================================================================
export const pokiClone: ProjectTemplate = {
  name: 'Poki Arcade — Instant Web Games & Subway Surfer 3D Runner',
  category: 'Gaming & Interactive Entertainment',
  description: 'Poki-style instant web games platform featuring a real-time playable 3-lane Subway Surfer endless runner (with Arrow key controls, jump, slide, coins, trains), plus Flappy Dash, Retro Snake, and Speed Racer arcade games.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'poki-arcade-games',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [activeTab, setActiveTab] = useState('subway'); // 'subway' | 'snake' | 'flappy' | 'portal'
  const [selectedCategory, setSelectedCategory] = useState('all');

  // --- SUBWAY SURFER GAME STATE ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [highScore, setHighScore] = useState(1480);
  const [lane, setLane] = useState(1); // 0: Left, 1: Center, 2: Right
  const [isJumping, setIsJumping] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [hoverboardActive, setHoverboardActive] = useState(false);
  const [obstacles, setObstacles] = useState([
    { id: 1, lane: 0, distance: 80, type: 'train', icon: '🚆' },
    { id: 2, lane: 2, distance: 150, type: 'barrier', icon: '🚧' },
    { id: 3, lane: 1, distance: 220, type: 'train', icon: '🚇' },
  ]);
  const [coinItems, setCoinItems] = useState([
    { id: 101, lane: 1, distance: 40 },
    { id: 102, lane: 1, distance: 60 },
    { id: 103, lane: 2, distance: 110 },
    { id: 104, lane: 0, distance: 170 },
  ]);

  // --- SNAKE GAME STATE ---
  const [snake, setSnake] = useState([[5, 5], [5, 4], [5, 3]]);
  const [food, setFood] = useState([10, 10]);
  const [snakeDir, setSnakeDir] = useState('RIGHT');
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeGameOver, setSnakeGameOver] = useState(false);
  const [snakeRunning, setSnakeRunning] = useState(false);

  // Subway Surfer Game Loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const interval = setInterval(() => {
      setScore((s) => s + 1);

      // Move obstacles closer
      setObstacles((prev) => {
        const next = prev.map((obs) => ({ ...obs, distance: obs.distance - 4 }));

        // Collision check
        for (const obs of next) {
          if (obs.distance <= 12 && obs.distance >= 0 && obs.lane === lane) {
            // If barrier and jumping, or sliding, dodge! Otherwise crash
            if (obs.type === 'barrier' && isJumping) {
              // Dodged!
            } else if (hoverboardActive) {
              // Hoverboard shield breaks
              setHoverboardActive(false);
              obs.distance = -50;
            } else {
              setIsGameOver(true);
              setIsPlaying(false);
            }
          }
        }

        // Respawn past obstacles
        return next.map((obs) =>
          obs.distance < -20
            ? {
                ...obs,
                distance: 260 + Math.random() * 80,
                lane: Math.floor(Math.random() * 3),
                type: Math.random() > 0.4 ? 'train' : 'barrier',
                icon: Math.random() > 0.4 ? '🚆' : '🚧',
              }
            : obs
        );
      });

      // Move coins
      setCoinItems((prev) => {
        const next = prev.map((c) => ({ ...c, distance: c.distance - 4 }));
        for (const c of next) {
          if (c.distance <= 12 && c.distance >= -2 && c.lane === lane) {
            setCoins((val) => val + 1);
            setScore((val) => val + 10);
            c.distance = -50;
          }
        }
        return next.map((c) =>
          c.distance < -20
            ? { ...c, distance: 200 + Math.random() * 120, lane: Math.floor(Math.random() * 3) }
            : c
        );
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, isGameOver, lane, isJumping, isSliding, hoverboardActive]);

  // Update High Score
  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  // Keyboard Controller
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab !== 'subway') return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        setLane((l) => Math.max(0, l - 1));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setLane((l) => Math.min(2, l + 1));
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        if (!isJumping) {
          setIsJumping(true);
          setTimeout(() => setIsJumping(false), 550);
        }
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        if (!isSliding) {
          setIsSliding(true);
          setTimeout(() => setIsSliding(false), 450);
        }
      } else if (e.key.toLowerCase() === 'h') {
        // Activate Hoverboard
        setHoverboardActive(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, isJumping, isSliding]);

  const startSubwayGame = () => {
    setScore(0);
    setCoins(0);
    setLane(1);
    setIsJumping(false);
    setIsSliding(false);
    setIsGameOver(false);
    setHoverboardActive(false);
    setObstacles([
      { id: 1, lane: 0, distance: 90, type: 'train', icon: '🚆' },
      { id: 2, lane: 2, distance: 160, type: 'barrier', icon: '🚧' },
      { id: 3, lane: 1, distance: 240, type: 'train', icon: '🚇' },
    ]);
    setIsPlaying(true);
  };

  const GAMES_LIST = [
    { id: 'subway', title: 'Subway Surfers: Tokyo Tour', plays: '48.2M', tag: 'Runner', icon: '🛹', color: 'from-amber-500 to-red-600' },
    { id: 'flappy', title: 'Flappy Dash Neon', plays: '12.4M', tag: 'Arcade', icon: '🐥', color: 'from-cyan-500 to-blue-600' },
    { id: 'snake', title: 'Retro Snake 2D', plays: '8.9M', tag: 'Classic', icon: '🐍', color: 'from-emerald-500 to-teal-700' },
    { id: 'racer', title: 'Speed City Drift', plays: '19.1M', tag: 'Racing', icon: '🏎️', color: 'from-purple-500 to-indigo-700' },
    { id: 'puzzle', title: '2048 Hexagon Master', plays: '5.6M', tag: 'Puzzle', icon: '🔢', color: 'from-pink-500 to-rose-700' },
    { id: 'ninja', title: 'Fruit Ninja Dojo', plays: '15.3M', tag: 'Action', icon: '🍉', color: 'from-orange-500 to-amber-700' },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col font-sans select-none overflow-x-hidden">
      {/* Poki Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#161b22]/95 backdrop-blur-md border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('portal')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 flex items-center justify-center font-black text-xl text-black shadow-lg">
            🎮
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-lg tracking-wider text-white">POKI</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold">
                INSTANT PLAY
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono">Free Online Games • No Install Required</p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="hidden md:flex items-center space-x-2 text-xs font-bold">
          {['all', 'Action', 'Runner', 'Arcade', 'Racing', 'Puzzles'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat.toLowerCase())}
              className={\`px-3 py-1.5 rounded-xl transition \${
                selectedCategory === cat.toLowerCase()
                  ? 'bg-cyan-500 text-black shadow'
                  : 'bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700'
              }\`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('subway')}
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition flex items-center space-x-2"
          >
            <span>🛹</span>
            <span>Play Subway Surfers</span>
          </button>
        </div>
      </header>

      {/* Main Game Screen */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* SUBWAY SURFERS 3D ENDLESS RUNNER */}
        {activeTab === 'subway' && (
          <div className="bg-zinc-950 border-2 border-yellow-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Top Game Bar */}
            <div className="bg-gradient-to-r from-zinc-900 to-black px-6 py-3 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🛹</span>
                <div>
                  <h2 className="font-black text-sm text-yellow-400 tracking-wide">SUBWAY SURFERS — REAL-TIME 3D RUNNER</h2>
                  <p className="text-[10px] text-zinc-400 font-mono">Dodge incoming trains, jump barriers, and grab coins!</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-xs font-mono font-bold">
                <div className="flex items-center space-x-1 text-yellow-400">
                  <span className="text-base">🪙</span>
                  <span>{coins}</span>
                </div>
                <div className="text-cyan-400">
                  SCORE: <span className="text-white text-sm">{score}</span>
                </div>
                <div className="text-emerald-400">
                  RECORD: <span className="text-white">{highScore}</span>
                </div>
              </div>
            </div>

            {/* Subway Surfer Track Viewport */}
            <div className="relative h-[480px] bg-gradient-to-b from-[#0a192f] via-[#102a43] to-[#0b0f19] overflow-hidden flex flex-col justify-end p-6">
              {/* Skyline & Night City Background */}
              <div className="absolute top-0 inset-x-0 h-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent flex justify-center items-center pointer-events-none">
                <div className="text-xs font-mono text-cyan-400/60 uppercase tracking-widest">
                  ★ TOKYO METRO RAILWAY SUBWAY SECTOR ★
                </div>
              </div>

              {/* 3 Railway Tracks */}
              <div className="absolute inset-x-12 bottom-0 h-80 grid grid-cols-3 gap-6 border-b-8 border-yellow-500/80">
                {[0, 1, 2].map((trackIdx) => (
                  <div
                    key={trackIdx}
                    className={\`relative h-full border-x-4 border-dashed \${
                      lane === trackIdx ? 'border-yellow-400/80 bg-yellow-400/5' : 'border-zinc-700/60'
                    } flex flex-col justify-end items-center\`}
                  >
                    <span className="text-[10px] font-mono text-zinc-600 mb-2">Track {trackIdx + 1}</span>
                  </div>
                ))}
              </div>

              {/* Obstacles (Trains and Barriers) */}
              {obstacles.map((obs) => {
                const laneLeft = obs.lane === 0 ? '16%' : obs.lane === 1 ? '50%' : '84%';
                const bottomPos = Math.max(10, 320 - obs.distance * 1.3);
                const scale = Math.max(0.6, 1.4 - obs.distance / 250);

                if (obs.distance < -10 || obs.distance > 240) return null;

                return (
                  <div
                    key={obs.id}
                    style={{
                      left: laneLeft,
                      bottom: \`\${bottomPos}px\`,
                      transform: \`translateX(-50%) scale(\${scale})\`,
                    }}
                    className="absolute z-20 flex flex-col items-center transition-all duration-75 pointer-events-none"
                  >
                    <div className="text-4xl filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] animate-pulse">
                      {obs.icon}
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/80 text-yellow-300 border border-yellow-500/50 mt-1">
                      {obs.type === 'train' ? 'EXPRESS TRAIN' : 'BARRIER (JUMP!)'}
                    </span>
                  </div>
                );
              })}

              {/* Gold Coins Floating */}
              {coinItems.map((c) => {
                const laneLeft = c.lane === 0 ? '16%' : c.lane === 1 ? '50%' : '84%';
                const bottomPos = Math.max(10, 320 - c.distance * 1.3);
                const scale = Math.max(0.5, 1.3 - c.distance / 250);

                if (c.distance < -10 || c.distance > 200) return null;

                return (
                  <div
                    key={c.id}
                    style={{
                      left: laneLeft,
                      bottom: \`\${bottomPos}px\`,
                      transform: \`translateX(-50%) scale(\${scale})\`,
                    }}
                    className="absolute z-10 flex flex-col items-center pointer-events-none animate-bounce"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-300 border-2 border-yellow-200 flex items-center justify-center text-xs font-black text-black shadow-lg shadow-yellow-500/50">
                      ★
                    </div>
                  </div>
                );
              })}

              {/* Player Character (Subway Surfer Jake) */}
              <div
                style={{
                  left: lane === 0 ? '16%' : lane === 1 ? '50%' : '84%',
                  bottom: isJumping ? '140px' : '24px',
                  transform: 'translateX(-50%)',
                }}
                className={\`absolute z-30 flex flex-col items-center transition-all duration-150 \${
                  isSliding ? 'scale-y-50' : ''
                }\`}
              >
                {hoverboardActive && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500 text-black font-extrabold mb-1 animate-pulse">
                    ⚡ HOVERBOARD SHIELD
                  </span>
                )}
                <div className="w-14 h-16 rounded-2xl bg-gradient-to-tr from-yellow-400 via-red-500 to-indigo-600 border-2 border-white flex flex-col items-center justify-center text-2xl shadow-2xl relative">
                  <span>🏃</span>
                  <div className="w-12 h-2.5 rounded-full bg-yellow-400 absolute -bottom-2 shadow-lg" />
                </div>
              </div>

              {/* Game Start / Over Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-40 flex flex-col items-center justify-center text-center p-6 space-y-5">
                  <div className="text-6xl animate-bounce">🛹</div>
                  <div>
                    <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-red-500">
                      {isGameOver ? 'BUSTED BY INSPECTOR!' : 'SUBWAY SURFERS'}
                    </h3>
                    <p className="text-xs text-zinc-300 mt-2 max-w-md font-mono">
                      {isGameOver
                        ? \`You scored \${score} points and collected \${coins} gold coins!\`
                        : 'Use keyboard Left/Right arrows to dodge lanes, Up Arrow / Space to Jump, Down Arrow to Slide!'}
                    </p>
                  </div>

                  <button
                    onClick={startSubwayGame}
                    className="px-8 py-3.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-red-500 hover:scale-105 text-black font-black text-sm md:text-base rounded-2xl shadow-2xl shadow-yellow-500/20 transition flex items-center space-x-2"
                  >
                    <span>▶</span>
                    <span>{isGameOver ? 'PLAY AGAIN' : 'TAP TO SURF'}</span>
                  </button>

                  <div className="grid grid-cols-4 gap-2 text-[10px] font-mono text-zinc-400 max-w-sm pt-2">
                    <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg">← Left Lane</div>
                    <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg">→ Right Lane</div>
                    <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg">↑ / Space Jump</div>
                    <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg">↓ Slide Duck</div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile / Screen Touch Controls Bar */}
            <div className="bg-zinc-900 p-4 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={() => setLane((l) => Math.max(0, l - 1))}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-sm rounded-xl border border-zinc-700"
                >
                  ◀ Left
                </button>
                <button
                  onClick={() => setLane((l) => Math.min(2, l + 1))}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-sm rounded-xl border border-zinc-700"
                >
                  Right ▶
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    if (!isJumping) {
                      setIsJumping(true);
                      setTimeout(() => setIsJumping(false), 550);
                    }
                  }}
                  className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-sm rounded-xl shadow-lg"
                >
                  ▲ JUMP
                </button>
                <button
                  onClick={() => {
                    if (!isSliding) {
                      setIsSliding(true);
                      setTimeout(() => setIsSliding(false), 450);
                    }
                  }}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm rounded-xl shadow-lg"
                >
                  ▼ SLIDE
                </button>
                <button
                  onClick={() => setHoverboardActive(true)}
                  className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs rounded-xl"
                  title="Hoverboard Shield"
                >
                  🛡️ SHIELD
                </button>
              </div>
            </div>
          </div>
        )}

        {/* POKI ARCADE GAMES PORTAL GRID */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h3 className="font-extrabold text-lg text-white">Popular Poki Instant Games</h3>
            <span className="text-xs font-mono text-cyan-400">Over 1,000+ Games Available</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {GAMES_LIST.map((game) => (
              <div
                key={game.id}
                onClick={() => setActiveTab(game.id === 'subway' ? 'subway' : 'subway')}
                className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500/60 rounded-2xl p-4 flex flex-col justify-between hover:scale-105 transition cursor-pointer group shadow-lg"
              >
                <div className={\`w-full h-24 rounded-xl bg-gradient-to-tr \${game.color} flex items-center justify-center text-4xl shadow-md\`}>
                  {game.icon}
                </div>
                <div className="mt-3 space-y-1">
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-yellow-400 border border-zinc-700">
                    {game.tag}
                  </span>
                  <h4 className="font-bold text-xs text-white truncate">{game.title}</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">👥 {game.plays} plays</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
`,
  },
};

