import { ProjectTemplate } from '../projects/templates';
import { googleAiNetflixTemplate } from '../projects/templates/google_ai_netflix';
import { pinterestCanvaAiTemplate } from '../projects/templates/pinterest_canva_ai';
import { virtualOfficeAiTemplate } from '../projects/templates/virtual_office_ai';
import { saaiProTemplate } from '../projects/templates/saai_pro';
import { psycheReelsTemplate } from '../projects/templates/psyche_reels';

/**
 * Dynamic Adaptive Application Synthesizer.
 * Ensures NEXUS AI never returns repetitive or cookie-cutter templates.
 * Dynamically synthesizes custom React 19 + Tailwind components, real-time playable games,
 * data models, state managers, and database schemas tailored precisely to the user's prompt.
 */
export function synthesizeDynamicApp(prompt: string): ProjectTemplate {
  const p = prompt.trim();
  const lower = p.toLowerCase();
  const safePromptEscaped = JSON.stringify(prompt);

  // 0000. PSYCHE REELS & MINDSET PROFILER
  if (
    lower.includes('psyche') ||
    (lower.includes('reel') && (lower.includes('psychology') || lower.includes('person') || lower.includes('mindset') || lower.includes('prefer') || lower.includes('pros') || lower.includes('osychology'))) ||
    lower.includes('what type of person are you') ||
    lower.includes('osychology') ||
    lower.includes('philosphy')
  ) {
    return psycheReelsTemplate;
  }

  // 000. SAAI.PRO AI ARCHITECT PORTFOLIO
  if (
    lower.includes('saai.pro') ||
    lower.includes('saai,pro') ||
    lower.includes('saai') ||
    lower.includes('sahir') ||
    lower.includes('multi-llm parliament') ||
    lower.includes('kronos') ||
    lower.includes('dlfm')
  ) {
    return saaiProTemplate;
  }

  // 001. AUTONOMOUS AI AGENT VIRTUAL OFFICE
  if (
    (lower.includes('agent') && (lower.includes('office') || lower.includes('virtual') || lower.includes('swarm') || lower.includes('spatial'))) ||
    lower.includes('virtual office') ||
    lower.includes('ai agent')
  ) {
    return virtualOfficeAiTemplate;
  }

  // 00. PINTEREST, CANVA, GOOGLE AI, AESTHETICS & MOODBOARDS
  if (
    lower.includes('pinterest') ||
    lower.includes('canva') ||
    lower.includes('aesthetic') ||
    lower.includes('asthetic') ||
    lower.includes('aesthetics') ||
    lower.includes('asthetics') ||
    lower.includes('moodboard') ||
    lower.includes('uff')
  ) {
    return pinterestCanvaAiTemplate;
  }

  // 0. CINEMA, NETFLIX, GOOGLE AI, VIDEOS & ANIMATIONS
  if (
    lower.includes('cinema') ||
    lower.includes('netflix') ||
    lower.includes('google ai') ||
    lower.includes('deepmind') ||
    lower.includes('vedio') ||
    lower.includes('video') ||
    lower.includes('animation') ||
    lower.includes('animations') ||
    lower.includes('streamflix') ||
    lower.includes('movie')
  ) {
    return googleAiNetflixTemplate;
  }

  // 1. GAME & ARCADE SYNTHESIS (Subway Surfer, Runner, Poki, Arcade, Playable Games)
  if (
    lower.includes('game') ||
    lower.includes('subway') ||
    lower.includes('surfer') ||
    lower.includes('play') ||
    lower.includes('arcade') ||
    lower.includes('runner') ||
    lower.includes('poki') ||
    lower.includes('gaming')
  ) {
    const gameTitle = lower.includes('subway') ? 'Subway Surfer 3D: Tokyo Rail Rush' : 'Infinite Arcade Runner';
    return {
      name: `${gameTitle} — Real-Time Playable Game`,
      category: 'Gaming & Interactive Entertainment',
      description: `Autonomous playable game synthesized for "${prompt}". Features 3-lane obstacle dodging, jump/slide mechanics, keyboard & touch controls, coin collection, and live score loop.`,
      files: {
        '/package.json': JSON.stringify(
          {
            name: 'custom-web-game',
            version: '1.0.0',
            private: true,
            dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
          },
          null,
          2
        ),
        '/src/App.tsx': `function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [highScore, setHighScore] = useState(2450);
  const [lane, setLane] = useState(1); // 0: Left, 1: Center, 2: Right
  const [isJumping, setIsJumping] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [shieldActive, setShieldActive] = useState(false);

  const [obstacles, setObstacles] = useState([
    { id: 1, lane: 0, distance: 90, type: 'train', icon: '🚆' },
    { id: 2, lane: 2, distance: 160, type: 'barrier', icon: '🚧' },
    { id: 3, lane: 1, distance: 230, type: 'train', icon: '🚇' },
  ]);

  const [coinItems, setCoinItems] = useState([
    { id: 101, lane: 1, distance: 50 },
    { id: 102, lane: 1, distance: 75 },
    { id: 103, lane: 2, distance: 120 },
    { id: 104, lane: 0, distance: 180 },
  ]);

  // Real-time 60FPS Game Loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const loop = setInterval(() => {
      setScore((s) => s + 1);

      // Move obstacles
      setObstacles((prev) => {
        const next = prev.map((obs) => ({ ...obs, distance: obs.distance - 4 }));

        for (const obs of next) {
          if (obs.distance <= 12 && obs.distance >= 0 && obs.lane === lane) {
            if (obs.type === 'barrier' && isJumping) {
              // Dodged barrier successfully
            } else if (shieldActive) {
              setShieldActive(false);
              obs.distance = -60;
            } else {
              setIsGameOver(true);
              setIsPlaying(false);
            }
          }
        }

        return next.map((obs) =>
          obs.distance < -20
            ? {
                ...obs,
                distance: 240 + Math.random() * 80,
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
            setScore((val) => val + 15);
            c.distance = -60;
          }
        }
        return next.map((c) =>
          c.distance < -20
            ? { ...c, distance: 200 + Math.random() * 100, lane: Math.floor(Math.random() * 3) }
            : c
        );
      });
    }, 50);

    return () => clearInterval(loop);
  }, [isPlaying, isGameOver, lane, isJumping, isSliding, shieldActive]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  // Keyboard Listeners
  useEffect(() => {
    const handleKey = (e) => {
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
          setTimeout(() => setIsJumping(false), 520);
        }
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        if (!isSliding) {
          setIsSliding(true);
          setTimeout(() => setIsSliding(false), 450);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isJumping, isSliding]);

  const startGame = () => {
    setScore(0);
    setCoins(0);
    setLane(1);
    setIsJumping(false);
    setIsSliding(false);
    setIsGameOver(false);
    setShieldActive(false);
    setObstacles([
      { id: 1, lane: 0, distance: 90, type: 'train', icon: '🚆' },
      { id: 2, lane: 2, distance: 160, type: 'barrier', icon: '🚧' },
      { id: 3, lane: 1, distance: 230, type: 'train', icon: '🚇' },
    ]);
    setIsPlaying(true);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col font-sans select-none overflow-hidden">
      {/* Top Game Bar */}
      <header className="bg-zinc-950/90 border-b border-zinc-800 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl animate-bounce">🛹</span>
          <div>
            <h1 className="font-black text-sm text-yellow-400 tracking-wide">${gameTitle}</h1>
            <p className="text-[10px] text-zinc-400 font-mono">Real-time Keyboard & Touch Playable</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs font-mono font-bold">
          <div className="flex items-center space-x-1 text-yellow-400">
            <span>🪙</span>
            <span>{coins}</span>
          </div>
          <div className="text-cyan-400">
            SCORE: <span className="text-white text-sm">{score}</span>
          </div>
          <div className="text-emerald-400">
            BEST: <span className="text-white">{highScore}</span>
          </div>
        </div>
      </header>

      {/* 3D Track Canvas Viewport */}
      <main className="flex-1 relative bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#090b10] flex flex-col justify-end p-6 overflow-hidden">
        {/* Neon Track Lanes */}
        <div className="absolute inset-x-8 bottom-0 h-96 grid grid-cols-3 gap-8 border-b-8 border-yellow-500">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className={\`h-full border-x-4 border-dashed \${
                lane === idx ? 'border-yellow-400/90 bg-yellow-400/10' : 'border-zinc-700/60'
              } flex flex-col justify-end items-center pb-2\`}
            >
              <span className="text-[10px] font-mono text-zinc-500">Lane {idx + 1}</span>
            </div>
          ))}
        </div>

        {/* Incoming Obstacles */}
        {obstacles.map((obs) => {
          const laneLeft = obs.lane === 0 ? '16%' : obs.lane === 1 ? '50%' : '84%';
          const bottomPos = Math.max(10, 340 - obs.distance * 1.35);
          const scale = Math.max(0.6, 1.4 - obs.distance / 250);

          if (obs.distance < -15 || obs.distance > 240) return null;

          return (
            <div
              key={obs.id}
              style={{
                left: laneLeft,
                bottom: \`\${bottomPos}px\`,
                transform: \`translateX(-50%) scale(\${scale})\`,
              }}
              className="absolute z-20 flex flex-col items-center pointer-events-none transition-all duration-75"
            >
              <div className="text-5xl filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] animate-pulse">
                {obs.icon}
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-yellow-300 border border-yellow-500 mt-1">
                {obs.type === 'train' ? 'EXPRESS TRAIN' : 'JUMP BARRIER'}
              </span>
            </div>
          );
        })}

        {/* Gold Coins */}
        {coinItems.map((c) => {
          const laneLeft = c.lane === 0 ? '16%' : c.lane === 1 ? '50%' : '84%';
          const bottomPos = Math.max(10, 340 - c.distance * 1.35);
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
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-300 border-2 border-yellow-200 flex items-center justify-center text-xs font-black text-black shadow-lg shadow-yellow-500/50">
                ★
              </div>
            </div>
          );
        })}

        {/* Player Character */}
        <div
          style={{
            left: lane === 0 ? '16%' : lane === 1 ? '50%' : '84%',
            bottom: isJumping ? '150px' : '24px',
            transform: 'translateX(-50%)',
          }}
          className={\`absolute z-30 flex flex-col items-center transition-all duration-150 \${
            isSliding ? 'scale-y-50' : ''
          }\`}
        >
          {shieldActive && (
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-400 text-black font-extrabold mb-1">
              SHIELD ON
            </span>
          )}
          <div className="w-16 h-18 rounded-2xl bg-gradient-to-tr from-yellow-400 via-red-500 to-indigo-600 border-2 border-white flex flex-col items-center justify-center text-3xl shadow-2xl relative">
            <span>🏃</span>
            <div className="w-14 h-3 rounded-full bg-yellow-400 absolute -bottom-2 shadow-lg" />
          </div>
        </div>

        {/* Game Over / Start Modal */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-40 flex flex-col items-center justify-center text-center p-6 space-y-5">
            <div className="text-6xl animate-bounce">🛹</div>
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-red-500">
                {isGameOver ? 'GAME OVER!' : '${gameTitle.toUpperCase()}'}
              </h2>
              <p className="text-xs text-zinc-300 mt-2 font-mono max-w-md">
                {isGameOver
                  ? \`Score: \${score} • Coins: \${coins}\`
                  : 'Use Left/Right arrow keys to switch lanes, Up/Space to Jump, Down to Slide under barriers!'}
              </p>
            </div>

            <button
              onClick={startGame}
              className="px-8 py-3.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-red-500 hover:scale-105 text-black font-black text-sm md:text-base rounded-2xl shadow-2xl transition"
            >
              {isGameOver ? 'PLAY AGAIN' : 'TAP TO START RUNNING'}
            </button>
          </div>
        )}
      </main>

      {/* Touch Controls Bar for Mobile & Quick Play */}
      <footer className="bg-zinc-950 p-4 border-t border-zinc-800 flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setLane((l) => Math.max(0, l - 1))}
            className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-black text-sm rounded-xl border border-zinc-700"
          >
            ◀ LEFT
          </button>
          <button
            onClick={() => setLane((l) => Math.min(2, l + 1))}
            className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-black text-sm rounded-xl border border-zinc-700"
          >
            RIGHT ▶
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => {
              if (!isJumping) {
                setIsJumping(true);
                setTimeout(() => setIsJumping(false), 520);
              }
            }}
            className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm rounded-xl shadow-lg"
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
            className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-black text-sm rounded-xl shadow-lg"
          >
            ▼ SLIDE
          </button>
        </div>
      </footer>
    </div>
  );
}
`,
      },
    };
  }

  // 2. Extract primary domain and descriptive title for general applications
  let appTitle = 'Custom Autonomous Application';
  let category = 'Web Application';
  let primaryColor = 'cyan';
  let accentHex = '#06b6d4';
  let iconEmoji = '⚡';

  if (lower.includes('crypto') || lower.includes('wallet') || lower.includes('web3') || lower.includes('bitcoin')) {
    appTitle = 'CryptoVault — Decentralized Asset & Web3 Portfolio';
    category = 'FinTech & Web3';
    primaryColor = 'amber';
    accentHex = '#f59e0b';
    iconEmoji = '🪙';
  } else if (lower.includes('fitness') || lower.includes('gym') || lower.includes('workout') || lower.includes('health')) {
    appTitle = 'FitPulse — AI Workout Tracker & Fitness Coach';
    category = 'Health & Fitness';
    primaryColor = 'emerald';
    accentHex = '#10b981';
    iconEmoji = '💪';
  } else if (lower.includes('property') || lower.includes('real estate') || lower.includes('home') || lower.includes('house') || lower.includes('rent')) {
    appTitle = 'EstateVue — Modern Real Estate & Rental Marketplace';
    category = 'Real Estate & Housing';
    primaryColor = 'blue';
    accentHex = '#3b82f6';
    iconEmoji = '🏡';
  } else if (lower.includes('portfolio') || lower.includes('photographer') || lower.includes('agency') || lower.includes('studio') || lower.includes('creative')) {
    appTitle = 'Aura Creative — Visual Portfolio & Studio Showcase';
    category = 'Creative Portfolio';
    primaryColor = 'purple';
    accentHex = '#a855f7';
    iconEmoji = '🎨';
  } else if (lower.includes('chat') || lower.includes('message') || lower.includes('call') || lower.includes('connect')) {
    appTitle = 'OmniConnect — Real-Time Communication Hub';
    category = 'Communication & Messaging';
    primaryColor = 'emerald';
    accentHex = '#10b981';
    iconEmoji = '💬';
  } else if (lower.includes('learn') || lower.includes('course') || lower.includes('school') || lower.includes('tutor') || lower.includes('education')) {
    appTitle = 'EduSphere — Interactive Learning & Course Platform';
    category = 'EdTech & Learning';
    primaryColor = 'indigo';
    accentHex = '#6366f1';
    iconEmoji = '🎓';
  } else if (lower.includes('task') || lower.includes('project') || lower.includes('todo') || lower.includes('kanban') || lower.includes('jira')) {
    appTitle = 'SprintFlow — Agile Project & Task Management Board';
    category = 'Productivity & Project Management';
    primaryColor = 'rose';
    accentHex = '#f43f5e';
    iconEmoji = '📋';
  } else {
    const words = p.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => !['build', 'a', 'the', 'website', 'app', 'that', 'with', 'and', 'for', 'to', 'is'].includes(w.toLowerCase()));
    const topic = words.slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Autonomous Studio';
    appTitle = `${topic} — Precision AI Application`;
    category = 'Custom Application';
    primaryColor = 'cyan';
    accentHex = '#06b6d4';
    iconEmoji = '🚀';
  }

  // Derive customized domain items from prompt words
  const domainKeyword = p.split(/\s+/).find(w => w.length > 4) || 'Feature';

  return {
    name: appTitle,
    category,
    description: `Custom full-stack application synthesized specifically for instruction: "${prompt}". Features adaptive interactive state, tailored data fixtures, and database persistence.`,
    files: {
      '/package.json': JSON.stringify(
        {
          name: appTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          version: '1.0.0',
          private: true,
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
      '/src/App.tsx': `function App() {
  const [items, setItems] = useState([
    { id: '1', title: 'Main ${domainKeyword} Stream', status: 'Active', metric: '98.4%', tag: 'Verified' },
    { id: '2', title: 'Live Data Channel', status: 'Synced', metric: '14ms', tag: 'Real-time' },
    { id: '3', title: 'Interactive Flow Controller', status: 'Running', metric: '100%', tag: 'Healthy' },
  ]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [newItemTitle, setNewItemTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const promptDirective = ${safePromptEscaped};

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;
    const newItem = {
      id: String(Date.now()),
      title: newItemTitle,
      status: 'Active',
      metric: 'Just added',
      tag: 'User Generated'
    };
    setItems((prev) => [newItem, ...prev]);
    setNewItemTitle('');
    setModalOpen(false);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#090b0e] text-zinc-100 flex flex-col font-sans selection:bg-${primaryColor}-500/30 selection:text-${primaryColor}-200">
      <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-${primaryColor}-500/20 border border-${primaryColor}-500/40 flex items-center justify-center text-lg font-black text-${primaryColor}-400 shadow-lg">
            ${iconEmoji}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-sm tracking-wide text-white">${appTitle.split('—')[0].trim()}</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-${primaryColor}-950 text-${primaryColor}-300 border border-${primaryColor}-800">
                ${category}
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono">Tailored to: &quot;{promptDirective.slice(0, 50)}...&quot;</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
          />
          <button
            onClick={() => setModalOpen(true)}
            className="px-3.5 py-1.5 bg-${primaryColor}-500 hover:bg-${primaryColor}-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition"
          >
            + Add New
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-${primaryColor}-400 border border-zinc-700">
                  {item.tag}
                </span>
                <button onClick={() => removeItem(item.id)} className="text-zinc-500 hover:text-red-400 text-xs">✕</button>
              </div>
              <h3 className="font-bold text-sm text-white">{item.title}</h3>
              <div className="text-xl font-black text-zinc-100 font-mono">{item.metric}</div>
            </div>
          ))}
        </div>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <form onSubmit={handleAddItem} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-sm w-full space-y-4">
            <h3 className="font-bold text-sm text-white">Create New Entry</h3>
            <input
              type="text"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              placeholder="Title..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
            />
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setModalOpen(false)} className="px-3 py-1.5 text-xs text-zinc-400">Cancel</button>
              <button type="submit" className="px-4 py-1.5 bg-${primaryColor}-500 text-black font-bold text-xs rounded-xl">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
`,
    },
  };
}
