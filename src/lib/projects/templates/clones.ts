import { ProjectTemplate } from './index';

// ============================================================================
// 1. SPOTIFY CLONE TEMPLATE
// ============================================================================
export const spotifyClone: ProjectTemplate = {
  name: 'Spotify Web Player — Music & Podcast Streaming',
  category: 'Audio & Music Streaming',
  description: 'Full Spotify clone with interactive now-playing bottom bar, audio play/pause, playlist navigation, track scrubber, search, and library management.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'spotify-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Starboy',
    artist: 'The Weeknd, Daft Punk',
    album: 'Starboy',
    duration: '3:50',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80',
  });
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(35);

  const PLAYLISTS = [
    { id: '1', title: 'Today Top Hits', desc: 'Jung Kook is on top of the Hottest 50!', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80' },
    { id: '2', title: 'Deep Focus', desc: 'Keep calm and focus with ambient study beats.', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80' },
    { id: '3', title: 'RapCaviar', desc: 'New music from Drake, Travis Scott and 21 Savage.', cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=300&q=80' },
    { id: '4', title: 'All Out 2010s', desc: 'The biggest songs of the 2010s.', cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80' },
  ];

  const SONGS = [
    { title: 'Starboy', artist: 'The Weeknd', album: 'Starboy', duration: '3:50', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=100&q=80' },
    { title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=100&q=80' },
    { title: 'Cruel Summer', artist: 'Taylor Swift', album: 'Lover', duration: '2:58', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=100&q=80' },
    { title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", duration: '2:47', cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=100&q=80' },
  ];

  return (
    <div className="h-screen bg-black text-white flex flex-col font-sans select-none overflow-hidden">
      <div className="flex-1 flex overflow-hidden p-2 gap-2">
        {/* Left Sidebar */}
        <div className="w-64 bg-zinc-900 rounded-lg p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-white font-black text-xl px-2">
              <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-extrabold text-sm">♫</span>
              <span>Spotify</span>
            </div>
            <nav className="space-y-3 font-semibold text-sm">
              <button onClick={() => setActiveTab('home')} className={\`w-full flex items-center space-x-4 px-2 py-1.5 rounded transition \${activeTab === 'home' ? 'text-white bg-zinc-800' : 'text-zinc-400 hover:text-white'}\`}>
                <span>🏠</span><span>Home</span>
              </button>
              <button onClick={() => setActiveTab('search')} className={\`w-full flex items-center space-x-4 px-2 py-1.5 rounded transition \${activeTab === 'search' ? 'text-white bg-zinc-800' : 'text-zinc-400 hover:text-white'}\`}>
                <span>🔍</span><span>Search</span>
              </button>
              <button onClick={() => setActiveTab('library')} className={\`w-full flex items-center space-x-4 px-2 py-1.5 rounded transition \${activeTab === 'library' ? 'text-white bg-zinc-800' : 'text-zinc-400 hover:text-white'}\`}>
                <span>📚</span><span>Your Library</span>
              </button>
            </nav>
            <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs text-zinc-400">
              <div className="font-bold text-white uppercase text-[10px] tracking-wider">Playlists</div>
              <div className="hover:text-white cursor-pointer py-1">Liked Songs</div>
              <div className="hover:text-white cursor-pointer py-1">Discover Weekly</div>
              <div className="hover:text-white cursor-pointer py-1">Lofi Chill Beats</div>
            </div>
          </div>
          <div className="p-3 bg-zinc-950 rounded-lg text-xs space-y-1">
            <div className="font-bold text-emerald-400">Spotify Free</div>
            <div className="text-[10px] text-zinc-400">Upgrade to Premium for ad-free music</div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-gradient-to-b from-emerald-950/40 via-zinc-900 to-zinc-950 rounded-lg overflow-y-auto p-6 space-y-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-zinc-400 cursor-pointer">‹</span>
              <span className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-zinc-400 cursor-pointer">›</span>
              {activeTab === 'search' && (
                <input
                  type="text"
                  placeholder="What do you want to listen to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-72 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-1.5 text-xs text-white focus:outline-none focus:border-white ml-2"
                />
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-3.5 py-1.5 bg-white text-black font-bold text-xs rounded-full hover:scale-105 transition">Explore Premium</button>
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs">U</div>
            </div>
          </div>

          {/* Hero Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white">Good evening</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {PLAYLISTS.slice(0, 3).map((p) => (
                <div key={p.id} onClick={() => { setCurrentTrack({ title: p.title, artist: 'Various Artists', album: p.title, duration: '3:30', cover: p.cover }); setIsPlaying(true); }} className="flex items-center space-x-3 bg-zinc-800/60 hover:bg-zinc-700/60 rounded overflow-hidden cursor-pointer group transition">
                  <img src={p.cover} alt={p.title} className="w-16 h-16 object-cover" />
                  <span className="font-bold text-xs text-white truncate flex-1">{p.title}</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center mr-3 shadow-lg opacity-0 group-hover:opacity-100 transition">▶</div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Tracks Table */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">Popular Tracks</h2>
            <div className="divide-y divide-zinc-800/60 text-xs">
              {SONGS.map((song, i) => (
                <div key={i} onClick={() => { setCurrentTrack(song); setIsPlaying(true); }} className="flex items-center justify-between py-2.5 px-3 hover:bg-zinc-800/60 rounded-md cursor-pointer transition group">
                  <div className="flex items-center space-x-3">
                    <span className="w-4 text-zinc-500 text-center">{i + 1}</span>
                    <img src={song.cover} alt={song.title} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <div className="font-semibold text-white group-hover:text-emerald-400 transition">{song.title}</div>
                      <div className="text-[11px] text-zinc-400">{song.artist}</div>
                    </div>
                  </div>
                  <div className="hidden sm:block text-zinc-400 text-xs">{song.album}</div>
                  <div className="text-zinc-500 text-xs">{song.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Now Playing Bottom Bar */}
      <div className="h-20 bg-zinc-950 border-t border-zinc-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3 w-1/4">
          <img src={currentTrack.cover} alt={currentTrack.title} className="w-14 h-14 rounded object-cover" />
          <div className="min-w-0">
            <div className="font-semibold text-xs text-white truncate">{currentTrack.title}</div>
            <div className="text-[10px] text-zinc-400 truncate">{currentTrack.artist}</div>
          </div>
          <button onClick={() => setLiked(!liked)} className={\`text-sm \${liked ? 'text-emerald-500' : 'text-zinc-500 hover:text-white'}\`}>♥</button>
        </div>

        {/* Player Controls & Scrubber */}
        <div className="flex flex-col items-center space-y-1.5 w-2/4 max-w-md">
          <div className="flex items-center space-x-5 text-sm">
            <button className="text-zinc-400 hover:text-white">⇄</button>
            <button className="text-zinc-400 hover:text-white">⏮</button>
            <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold hover:scale-105 transition">
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button className="text-zinc-400 hover:text-white">⏭</button>
            <button className="text-zinc-400 hover:text-white">↻</button>
          </div>
          <div className="w-full flex items-center space-x-2 text-[10px] text-zinc-400">
            <span>1:14</span>
            <div onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100)); }} className="flex-1 h-1 bg-zinc-800 hover:h-1.5 rounded-full cursor-pointer relative">
              <div className="h-full bg-white group-hover:bg-emerald-500 rounded-full" style={{ width: \`\${progress}%\` }} />
            </div>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Volume & Device */}
        <div className="flex items-center justify-end space-x-3 w-1/4 text-xs text-zinc-400">
          <span>🔊</span>
          <div className="w-20 h-1 bg-zinc-800 rounded-full">
            <div className="w-2/3 h-full bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  },
};

// ============================================================================
// 2. OMEGLE CLONE TEMPLATE
// ============================================================================
export const omegleClone: ProjectTemplate = {
  name: 'Omegle — Live 1-on-1 Random Video & Text Chat',
  category: 'Live Social & Video Chat',
  description: 'Full Omegle clone with real-time stranger matching, video feed simulation, text chat stream, "Next Stranger" skipping, and typing status indicators.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'omegle-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [status, setStatus] = useState('connected'); // connecting | connected | disconnected
  const [messages, setMessages] = useState([
    { sender: 'system', text: "You're now chatting with a random stranger. Say hi!" },
    { sender: 'stranger', text: 'Hey! Where are you from?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [interests, setInterests] = useState('coding, ai, gaming');

  const handleNext = () => {
    setStatus('connecting');
    setMessages([{ sender: 'system', text: 'Looking for someone you can chat with...' }]);
    setTimeout(() => {
      setStatus('connected');
      setMessages([
        { sender: 'system', text: "Connected to a stranger with common interests: coding!" },
        { sender: 'stranger', text: 'Hi! Building anything cool today?' },
      ]);
    }, 1200);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || status !== 'connected') return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: 'you', text: userText }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const replies = [
        'Nice! That sounds super innovative.',
        'Same here, learning full-stack development with AI.',
        'Which tech stack are you using?',
        'Cool, have you tried autonomous web agents?',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [...prev, { sender: 'stranger', text: randomReply }]);
      setIsTyping(false);
    }, 1400);
  };

  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans select-none">
      {/* Header */}
      <header className="h-14 bg-zinc-900 border-b border-zinc-800 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-black tracking-tight text-blue-500">Omegle<span className="text-xs text-zinc-400 font-mono ml-2 uppercase">Clone</span></span>
          <span className="text-[11px] text-zinc-400 font-mono bg-zinc-800 px-2 py-0.5 rounded">38,419 Online</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-zinc-400">Interests:</span>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="bg-black/60 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-blue-500 w-48"
          />
        </div>
      </header>

      {/* Main Split: Left Videos, Right Chat */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left Video Window */}
        <div className="w-1/2 flex flex-col gap-4">
          {/* Stranger Video */}
          <div className="flex-1 bg-black rounded-xl border border-zinc-800 relative overflow-hidden flex items-center justify-center">
            {status === 'connected' ? (
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Stranger"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center space-y-2 text-zinc-500">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <span className="text-xs font-mono">Finding a stranger...</span>
              </div>
            )}
            <div className="absolute top-3 left-3 bg-black/70 px-2 py-1 rounded text-[10px] font-bold text-red-400 flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>STRANGER CAM</span>
            </div>
          </div>

          {/* You Video */}
          <div className="h-44 bg-zinc-900 rounded-xl border border-zinc-800 relative overflow-hidden flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
              alt="You"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-400">
              YOU
            </div>
          </div>
        </div>

        {/* Right Chat Stream */}
        <div className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
          <div className="flex-1 p-4 overflow-y-auto space-y-2 font-mono text-xs">
            {messages.map((m, i) => (
              <div key={i} className={\`p-1.5 rounded \${m.sender === 'system' ? 'text-amber-400 italic bg-amber-950/20' : m.sender === 'you' ? 'text-blue-400 font-semibold' : 'text-red-400 font-semibold'}\`}>
                <span className="capitalize">{m.sender}: </span>
                <span className="text-zinc-200 font-normal">{m.text}</span>
              </div>
            ))}
            {isTyping && <div className="text-[11px] text-zinc-500 italic">Stranger is typing...</div>}
          </div>

          {/* Chat Controls */}
          <div className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center space-x-2">
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs rounded-lg transition"
            >
              {status === 'connected' ? 'Stop (Esc)' : 'Next'}
            </button>
            <form onSubmit={handleSend} className="flex-1 flex space-x-2">
              <input
                type="text"
                disabled={status !== 'connected'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={status === 'connected' ? 'Type a message and press Enter...' : 'Waiting for connection...'}
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition disabled:opacity-40"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  },
};

// ============================================================================
// 3. FIGMA CLONE TEMPLATE
// ============================================================================
export const figmaClone: ProjectTemplate = {
  name: 'Figma — Collaborative Vector & UI Design Studio',
  category: 'Design & Developer Tools',
  description: 'Figma web clone with interactive infinite canvas, shape generators (rect, circle, text, frame), left layers hierarchy tree, and right properties styling inspector.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'figma-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [tool, setTool] = useState('select'); // select | frame | rect | circle | text
  const [elements, setElements] = useState([
    { id: 'el1', type: 'frame', x: 80, y: 80, w: 320, h: 220, bg: '#18181b', name: 'Card Container', radius: 16 },
    { id: 'el2', type: 'rect', x: 100, y: 100, w: 280, h: 48, bg: '#3b82f6', name: 'Primary Button', radius: 8 },
    { id: 'el3', type: 'circle', x: 120, y: 180, w: 60, h: 60, bg: '#10b981', name: 'Status Indicator', radius: 999 },
  ]);
  const [selectedId, setSelectedId] = useState('el1');

  const selectedEl = elements.find((e) => e.id === selectedId);

  const addElement = (type) => {
    const newEl = {
      id: 'el_' + Date.now(),
      type,
      x: 140 + Math.random() * 80,
      y: 120 + Math.random() * 60,
      w: type === 'circle' ? 70 : 160,
      h: type === 'circle' ? 70 : 80,
      bg: type === 'frame' ? '#27272a' : '#8b5cf6',
      name: \`New \${type.toUpperCase()}\`,
      radius: type === 'circle' ? 999 : 8,
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedId(newEl.id);
  };

  const updateSelected = (key, val) => {
    setElements((prev) => prev.map((e) => (e.id === selectedId ? { ...e, [key]: val } : e)));
  };

  return (
    <div className="h-screen bg-[#1e1e1e] text-zinc-100 flex flex-col font-sans select-none overflow-hidden">
      {/* Top Figma Toolbar */}
      <header className="h-12 bg-[#2c2c2c] border-b border-zinc-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 font-black text-sm">
            <span className="text-red-500">F</span>
            <span className="text-purple-400">i</span>
            <span className="text-blue-400">g</span>
            <span className="text-green-400">m</span>
            <span className="text-orange-400">a</span>
          </div>
          <div className="flex items-center space-x-1 bg-zinc-800 p-1 rounded text-xs">
            <button onClick={() => setTool('select')} className={\`px-2.5 py-1 rounded \${tool === 'select' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'}\`}>↖</button>
            <button onClick={() => addElement('frame')} className="px-2.5 py-1 text-zinc-400 hover:text-white"># Frame</button>
            <button onClick={() => addElement('rect')} className="px-2.5 py-1 text-zinc-400 hover:text-white">▢ Rect</button>
            <button onClick={() => addElement('circle')} className="px-2.5 py-1 text-zinc-400 hover:text-white">○ Ellipse</button>
            <button onClick={() => addElement('text')} className="px-2.5 py-1 text-zinc-400 hover:text-white">T Text</button>
          </div>
        </div>

        <span className="text-xs text-zinc-400 font-mono">Untitled Design File — 100%</span>

        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-blue-600 text-white font-bold text-xs rounded hover:bg-blue-500">Share</button>
          <button className="px-3 py-1 bg-zinc-800 text-xs rounded hover:bg-zinc-700">▶ Present</button>
        </div>
      </header>

      {/* Main Work Area: Left Layers | Center Infinite Canvas | Right Inspector */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Layers Hierarchy */}
        <div className="w-60 bg-[#2c2c2c] border-r border-zinc-800 p-3 flex flex-col justify-between shrink-0">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Layers ({elements.length})</span>
            <div className="space-y-1">
              {elements.map((el) => (
                <div
                  key={el.id}
                  onClick={() => setSelectedId(el.id)}
                  className={\`flex items-center space-x-2 px-2.5 py-1.5 rounded text-xs cursor-pointer \${selectedId === el.id ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40' : 'text-zinc-300 hover:bg-zinc-800'}\`}
                >
                  <span className="text-[10px] text-zinc-500 font-mono">[{el.type[0].toUpperCase()}]</span>
                  <span className="truncate">{el.name}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setElements([])} className="text-[11px] text-zinc-500 hover:text-red-400">Clear Canvas</button>
        </div>

        {/* Center Canvas */}
        <div className="flex-1 bg-[#1e1e1e] relative overflow-auto p-12 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px]">
          {elements.map((el) => {
            const isSel = selectedId === el.id;
            return (
              <div
                key={el.id}
                onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}
                style={{
                  position: 'absolute',
                  left: el.x,
                  top: el.y,
                  width: el.w,
                  height: el.h,
                  backgroundColor: el.bg,
                  borderRadius: el.radius,
                  outline: isSel ? '2px solid #3b82f6' : 'none',
                  outlineOffset: '2px',
                  cursor: 'move',
                }}
                className="flex items-center justify-center shadow-lg transition-shadow"
              >
                <span className="text-[10px] font-mono text-white/80 pointer-events-none">{el.name}</span>
              </div>
            );
          })}
        </div>

        {/* Right Inspector */}
        <div className="w-64 bg-[#2c2c2c] border-l border-zinc-800 p-4 space-y-4 shrink-0 text-xs">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block border-b border-zinc-800 pb-2">Properties</span>
          {selectedEl ? (
            <div className="space-y-3 font-mono">
              <div>
                <label className="text-[10px] text-zinc-500 block mb-1">Layer Name</label>
                <input
                  type="text"
                  value={selectedEl.name}
                  onChange={(e) => updateSelected('name', e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1">W (px)</label>
                  <input
                    type="number"
                    value={selectedEl.w}
                    onChange={(e) => updateSelected('w', Number(e.target.value))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1">H (px)</label>
                  <input
                    type="number"
                    value={selectedEl.h}
                    onChange={(e) => updateSelected('h', Number(e.target.value))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 block mb-1">Fill Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={selectedEl.bg.startsWith('#') ? selectedEl.bg : '#3b82f6'}
                    onChange={(e) => updateSelected('bg', e.target.value)}
                    className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={selectedEl.bg}
                    onChange={(e) => updateSelected('bg', e.target.value)}
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 block mb-1">Corner Radius</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={selectedEl.radius || 0}
                  onChange={(e) => updateSelected('radius', Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          ) : (
            <div className="text-zinc-500 text-center pt-8">Select an element to inspect and edit styles.</div>
          )}
        </div>
      </div>
    </div>
  );
}
`,
  },
};

// ============================================================================
// 4. ZOMATO & SWIGGY CLONE TEMPLATE
// ============================================================================
export const zomatoClone: ProjectTemplate = {
  name: 'Zomato & Swiggy — Food Delivery & Restaurant Platform',
  category: 'Food Delivery & Quick-Commerce',
  description: 'Full food ordering application with restaurant discovery, menu dishes, dish customization, live cart drawer, and checkout price calculation.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'zomato-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const RESTAURANTS = [
    { id: 'r1', name: 'Bawarchi Biryani Hub', rating: 4.8, time: '25-30 mins', cuisine: 'Biryani, Mughlai', price: '$25 for two', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80', isVeg: false },
    { id: 'r2', name: 'Pizza Bellissimo', rating: 4.6, time: '35 mins', cuisine: 'Italian, Pizza, Pasta', price: '$30 for two', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', isVeg: true },
    { id: 'r3', name: 'Dragon Wok Express', rating: 4.5, time: '20 mins', cuisine: 'Chinese, Dimsum, Noodles', price: '$20 for two', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80', isVeg: false },
    { id: 'r4', name: 'Green Garden Salad Bar', rating: 4.9, time: '15-20 mins', cuisine: 'Healthy, Vegan, Bowls', price: '$18 for two', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80', isVeg: true },
  ];

  const addToCart = (dish) => {
    setCart((prev) => [...prev, dish]);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-[#0d0f14] text-zinc-100 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="text-2xl font-black text-red-500 uppercase tracking-wider">Zomato<span className="text-white text-xs font-mono ml-2 lowercase">live</span></span>
          <div className="hidden sm:flex items-center space-x-2 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1.5 text-xs text-zinc-300">
            <span>📍</span><span>Bangalore, Indiranagar</span>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search for restaurants, cuisine, or a dish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 text-xs text-white w-64 focus:outline-none focus:border-red-500"
        />

        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-red-400">Cart ({cart.length}) - \${totalPrice.toFixed(2)}</span>
          <button onClick={() => alert('Proceeding to Checkout: $' + totalPrice.toFixed(2))} disabled={cart.length === 0} className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-full disabled:opacity-40 transition">
            Checkout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto p-6 space-y-6 flex-1 w-full">
        <h1 className="text-2xl font-black text-white">Inspiration for your first order</h1>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESTAURANTS.map((r) => (
            <div key={r.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-500/50 transition group flex flex-col justify-between">
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-bold text-white">{r.time}</span>
                  <span className="absolute top-2 right-2 bg-emerald-700 px-1.5 py-0.5 rounded text-[10px] font-bold text-white">★ {r.rating}</span>
                </div>
                <div className="p-3.5 space-y-1">
                  <h3 className="font-bold text-sm text-white truncate">{r.name}</h3>
                  <p className="text-[11px] text-zinc-400 truncate">{r.cuisine}</p>
                  <p className="text-[10px] text-zinc-500">{r.price}</p>
                </div>
              </div>

              <div className="p-3.5 pt-0">
                <button
                  onClick={() => addToCart({ name: r.name + ' Signature Dish', price: 12.99 })}
                  className="w-full py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white font-bold text-xs rounded-xl border border-red-500/40 transition"
                >
                  + Add to Order ($12.99)
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
`,
  },
};

// ============================================================================
// 5. GITHUB CLONE TEMPLATE
// ============================================================================
export const githubClone: ProjectTemplate = {
  name: 'GitHub — Source Code Repository & CI/CD Platform',
  category: 'Developer Platforms',
  description: 'GitHub repository clone with branch switcher, file tree viewer, commit history, pull request status, issues tab, and markdown README renderer.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'github-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [activeTab, setActiveTab] = useState('code');
  const [stars, setStars] = useState(14820);
  const [starred, setStarred] = useState(false);

  const FILES = [
    { name: '.github/workflows', type: 'dir', commit: 'chore: setup edge ci/cd pipeline', age: '2 hours ago' },
    { name: 'src', type: 'dir', commit: 'feat: add autonomous multi-agent orchestrator', age: '14 mins ago' },
    { name: 'tests', type: 'dir', commit: 'test: 29/29 assertions passing', age: '45 mins ago' },
    { name: '.gitignore', type: 'file', commit: 'chore: ignore local build artifacts', age: '1 day ago' },
    { name: 'package.json', type: 'file', commit: 'build: bump react to 19.3.1', age: '3 hours ago' },
    { name: 'README.md', type: 'file', commit: 'docs: update master architecture specification', age: '10 mins ago' },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col font-sans">
      {/* GitHub Top Nav */}
      <header className="h-16 bg-[#161b22] border-b border-[#30363d] px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-black text-sm">🐙</span>
          <span className="font-semibold text-sm text-white">nexus-ai / <span className="font-bold">sitebuilder</span></span>
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#30363d] text-zinc-400 font-mono">Public</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => { setStarred(!starred); setStars(s => starred ? s - 1 : s + 1); }}
            className={\`px-3 py-1.5 rounded-md border border-[#30363d] flex items-center space-x-1 font-semibold transition \${starred ? 'bg-amber-950/60 text-amber-300 border-amber-600' : 'bg-[#21262d] text-white hover:bg-[#30363d]'}\`}
          >
            <span>★</span><span>{starred ? 'Starred' : 'Star'}</span>
            <span className="px-1.5 py-0.2 bg-[#30363d] rounded-full text-[10px] ml-1">{stars}</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-[#161b22] border-b border-[#30363d] px-6 flex space-x-6 text-xs font-semibold">
        {['code', 'issues', 'pull requests', 'actions', 'security'].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={\`py-3 border-b-2 capitalize transition \${activeTab === t ? 'border-[#f78166] text-white' : 'border-transparent text-zinc-400 hover:text-white'}\`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Code Repository View */}
      <main className="max-w-6xl mx-auto p-6 flex-1 w-full space-y-4">
        {/* Repo File Tree */}
        <div className="border border-[#30363d] rounded-md overflow-hidden bg-[#0d1117]">
          <div className="p-3 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-cyan-600 flex items-center justify-center text-[10px] text-white">AI</span>
              <span className="font-bold text-white">antigravity-bot</span>
              <span className="text-zinc-400">feat(orchestrator): 10 autonomous agents synchronized</span>
            </div>
            <span className="text-zinc-500 font-mono text-[11px]">commit 5e64610</span>
          </div>

          <div className="divide-y divide-[#21262d] text-xs font-mono">
            {FILES.map((f, i) => (
              <div key={i} className="p-2.5 px-4 flex items-center justify-between hover:bg-[#161b22] cursor-pointer">
                <div className="flex items-center space-x-3 w-1/3">
                  <span>{f.type === 'dir' ? '📁' : '📄'}</span>
                  <span className="text-white hover:text-blue-400 hover:underline">{f.name}</span>
                </div>
                <div className="text-zinc-400 w-1/2 truncate text-[11px]">{f.commit}</div>
                <div className="text-zinc-500 text-right text-[11px]">{f.age}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Readme Box */}
        <div className="border border-[#30363d] rounded-md p-6 bg-[#0d1117] space-y-3">
          <h2 className="text-xl font-bold text-white border-b border-[#30363d] pb-2">README.md</h2>
          <p className="text-xs text-zinc-300 leading-relaxed">
            NEXUS AI Autonomous Web Development Platform. Supports instant cloning across 30+ domains including WhatsApp, Omegle, Spotify, Figma, GitHub, and Zomato.
          </p>
        </div>
      </main>
    </div>
  );
}
`,
  },
};

// ============================================================================
// 6. GOOGLE SEARCH & GOOGLE MAPS CLONE
// ============================================================================
export const googleClone: ProjectTemplate = {
  name: 'Google & Google Maps — Search Engine & Geospatial Explorer',
  category: 'Search & Navigation',
  description: 'Full Google Search & Maps hybrid with instant query autocomplete, rich knowledge graph cards, map route planner, and live satellite pins.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'google-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [view, setView] = useState('search'); // search | maps
  const [query, setQuery] = useState('nexus autonomous ai platform');
  const [hasSearched, setHasSearched] = useState(true);

  const RESULTS = [
    { title: 'NEXUS AI — Autonomous Full-Stack Development Platform', url: 'https://nexus.ai', snippet: 'Turn natural language instructions into production web applications. Orchestrates 10 specialized autonomous AI agents with Monaco editor and live preview.' },
    { title: 'Google Antigravity & Emergent Multi-Agent Architecture', url: 'https://antigravity.google.dev', snippet: 'Explore directed acyclic graph execution for code synthesis, Playwright DOM testing, and automated runtime healing.' },
    { title: 'GitHub - bajajaarna4-bit/sitebuilder', url: 'https://github.com/bajajaarna4-bit/sitebuilder', snippet: 'Production-grade AI website and application builder with Supabase PostgreSQL, Babel bundler, and 30+ workspace clones.' },
  ];

  return (
    <div className="min-h-screen bg-[#202124] text-white flex flex-col font-sans">
      {/* Top Bar */}
      <header className="p-4 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center space-x-6">
          <span className="text-2xl font-black">
            <span className="text-blue-400">G</span><span className="text-red-400">o</span><span className="text-yellow-400">o</span><span className="text-blue-400">g</span><span className="text-green-400">l</span><span className="text-red-400">e</span>
          </span>
          <div className="flex items-center space-x-1 text-xs">
            <button onClick={() => setView('search')} className={\`px-3 py-1 rounded-full \${view === 'search' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'}\`}>All</button>
            <button onClick={() => setView('maps')} className={\`px-3 py-1 rounded-full \${view === 'maps' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'}\`}>Maps</button>
            <button className="px-3 py-1 text-zinc-400 hover:text-white">Images</button>
            <button className="px-3 py-1 text-zinc-400 hover:text-white">News</button>
          </div>
        </div>
      </header>

      {/* Main View */}
      {view === 'search' ? (
        <main className="max-w-4xl mx-auto p-6 space-y-6 flex-1 w-full">
          {/* Search Box */}
          <div className="bg-[#303134] rounded-full px-5 py-3 flex items-center space-x-3 shadow-lg border border-transparent focus-within:border-zinc-500">
            <span>🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white focus:outline-none"
            />
          </div>

          <div className="text-xs text-zinc-400 font-mono">About 4,820,000 results (0.24 seconds)</div>

          {/* Search Results */}
          <div className="space-y-6">
            {RESULTS.map((res, i) => (
              <div key={i} className="space-y-1">
                <div className="text-[11px] text-zinc-400 font-mono">{res.url}</div>
                <h3 className="text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer">{res.title}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{res.snippet}</p>
              </div>
            ))}
          </div>
        </main>
      ) : (
        /* Maps View */
        <div className="flex-1 flex overflow-hidden">
          <div className="w-80 bg-[#303134] p-4 space-y-4 shrink-0">
            <h2 className="font-bold text-sm text-white">Google Maps Navigation</h2>
            <input type="text" placeholder="Search nearby places..." className="w-full bg-[#202124] rounded-lg p-2 text-xs text-white border border-zinc-700" />
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#202124] rounded-lg cursor-pointer hover:border-blue-500 border border-transparent">
                <div className="font-bold text-blue-400">Googleplex HQ</div>
                <div className="text-[11px] text-zinc-400">Mountain View, California</div>
              </div>
              <div className="p-2.5 bg-[#202124] rounded-lg cursor-pointer hover:border-blue-500 border border-transparent">
                <div className="font-bold text-blue-400">NEXUS AI Cloud Center</div>
                <div className="text-[11px] text-zinc-400">San Francisco, CA</div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-zinc-900 relative flex items-center justify-center bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:24px_24px]">
            <div className="text-center space-y-2">
              <span className="text-4xl">📍</span>
              <div className="font-mono text-xs text-zinc-400">Interactive Map Viewport (Lat: 37.4220, Lng: -122.0841)</div>
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

// ============================================================================
// 7. TIKTOK & VIBESHORT CLONE TEMPLATE
// ============================================================================
export const tiktokClone: ProjectTemplate = {
  name: 'TikTok & VibeShort — Vertical Video Streaming Feed',
  category: 'Short-Form Video & Entertainment',
  description: 'TikTok / VibeShort vertical video clone with swipe/next navigation, floating like heart counters, comment drawer, share actions, and spinning audio disc.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'tiktok-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState([18420, 9420, 28100]);
  const [isLiked, setIsLiked] = useState([false, false, false]);

  const VIDEOS = [
    {
      id: 'v1',
      author: '@elena_dancer',
      desc: 'Steezy studio routine breakdown! 🕺🔥 #dance #steezystudio #tiktok',
      music: 'Original Sound - Steezy Beats',
      bg: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'v2',
      author: '@nexus_ai',
      desc: 'Built an entire full-stack app in 30 seconds using autonomous agents! 🚀💻',
      music: 'Synthwave Neon Horizons - NEXUS Audio',
      bg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'v3',
      author: '@chef_marco',
      desc: 'Quick 10-minute pasta recipe inspired by Zomato gourmet! 🍝✨',
      music: 'Italian Bistro Chill Accents',
      bg: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const current = VIDEOS[currentIndex];

  const toggleLike = () => {
    setIsLiked((prev) => {
      const next = [...prev];
      next[currentIndex] = !next[currentIndex];
      setLikes((l) => {
        const copy = [...l];
        copy[currentIndex] += next[currentIndex] ? 1 : -1;
        return copy;
      });
      return next;
    });
  };

  return (
    <div className="h-screen bg-black text-white flex items-center justify-center font-sans select-none overflow-hidden p-2">
      <div className="relative w-full max-w-sm h-full max-h-[720px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950 flex flex-col justify-between">
        {/* Background Visual */}
        <img src={current.bg} alt="Short" className="absolute inset-0 w-full h-full object-cover opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

        {/* Top Header */}
        <div className="relative z-10 p-4 flex items-center justify-center space-x-4 text-xs font-bold">
          <span className="text-zinc-400">Following</span>
          <span className="text-white border-b-2 border-white pb-0.5">For You</span>
        </div>

        {/* Bottom Info & Floating Controls */}
        <div className="relative z-10 p-4 flex items-end justify-between">
          <div className="space-y-2 max-w-[240px]">
            <h3 className="font-bold text-sm text-white">{current.author}</h3>
            <p className="text-xs text-zinc-200 line-clamp-2">{current.desc}</p>
            <div className="flex items-center space-x-2 text-[11px] text-zinc-400 font-mono">
              <span>♫</span><span className="truncate">{current.music}</span>
            </div>
          </div>

          {/* Floating Actions */}
          <div className="flex flex-col items-center space-y-4">
            <button onClick={toggleLike} className="flex flex-col items-center">
              <span className={\`text-2xl transition active:scale-125 \${isLiked[currentIndex] ? 'text-red-500' : 'text-white'}\`}>♥</span>
              <span className="text-[10px] font-bold">{likes[currentIndex].toLocaleString()}</span>
            </button>

            <button className="flex flex-col items-center">
              <span className="text-2xl text-white">💬</span>
              <span className="text-[10px] font-bold">482</span>
            </button>

            <button className="flex flex-col items-center">
              <span className="text-2xl text-white">↗</span>
              <span className="text-[10px] font-bold">Share</span>
            </button>

            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 animate-spin flex items-center justify-center text-xs">
              💿
            </div>
          </div>
        </div>

        {/* Next / Previous Overlay Buttons */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col space-y-2 z-20">
          <button
            onClick={() => setCurrentIndex((i) => (i > 0 ? i - 1 : VIDEOS.length - 1))}
            className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center font-bold hover:bg-white hover:text-black transition"
          >
            ↑
          </button>
          <button
            onClick={() => setCurrentIndex((i) => (i < VIDEOS.length - 1 ? i + 1 : 0))}
            className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center font-bold hover:bg-white hover:text-black transition"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
}
`,
  },
};

// ============================================================================
// 8. CANVA CLONE TEMPLATE
// ============================================================================
export const canvaClone: ProjectTemplate = {
  name: 'Canva — Visual Graphic Design & Publishing Studio',
  category: 'Design & Creative Media',
  description: 'Canva design studio clone with drag-and-drop elements, preset dimensions (Instagram, YouTube, Presentation), color palette picker, sticker library, and PNG export.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'canva-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [activeTab, setActiveTab] = useState('elements');
  const [headline, setHeadline] = useState('Create Beautiful Designs in Minutes');
  const [subhead, setSubhead] = useState('Powered by Autonomous AI Engine');
  const [canvasBg, setCanvasBg] = useState('#6366f1');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(36);
  const [format, setFormat] = useState('Instagram Post (1:1)');
  const [stickers, setStickers] = useState([
    { id: 'stk1', emoji: '✨', x: 40, y: 50 },
    { id: 'stk2', emoji: '🚀', x: 380, y: 60 },
    { id: 'stk3', emoji: '🔥', x: 220, y: 320 },
  ]);

  const addSticker = (emoji) => {
    setStickers((prev) => [...prev, { id: 's_' + Date.now(), emoji, x: 200 + Math.random() * 60, y: 200 + Math.random() * 60 }]);
  };

  return (
    <div className="h-screen bg-[#0e131f] text-white flex flex-col font-sans select-none overflow-hidden">
      {/* Top Canva Bar */}
      <header className="h-14 bg-[#181f30] border-b border-zinc-800 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 via-teal-400 to-indigo-500 flex items-center justify-center font-black text-black text-sm">C</span>
            <span className="text-lg font-black tracking-wider text-white">Canva<span className="text-xs font-mono text-cyan-400 ml-1.5 uppercase">Pro</span></span>
          </div>

          <div className="flex items-center space-x-2 bg-[#0e131f] border border-zinc-700/80 rounded-lg px-3 py-1 text-xs text-zinc-300">
            <span>📐 Preset:</span>
            <select value={format} onChange={(e) => setFormat(e.target.value)} className="bg-transparent font-semibold text-white focus:outline-none">
              <option value="Instagram Post (1:1)" className="bg-zinc-900">Instagram Post (1:1)</option>
              <option value="YouTube Thumbnail (16:9)" className="bg-zinc-900">YouTube Thumbnail (16:9)</option>
              <option value="Story & Reel (9:16)" className="bg-zinc-900">Story & Reel (9:16)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={() => alert('Exporting design artifact at 300 DPI...')} className="px-4 py-1.5 bg-gradient-to-r from-teal-400 to-indigo-500 hover:opacity-90 text-black font-extrabold text-xs rounded-lg transition shadow-lg">
            Download PNG
          </button>
        </div>
      </header>

      {/* Main Studio Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Elements Toolbar */}
        <div className="w-72 bg-[#181f30] border-r border-zinc-800 p-4 flex flex-col space-y-4 shrink-0 overflow-y-auto">
          <div className="grid grid-cols-4 gap-1 bg-[#0e131f] p-1 rounded-xl text-center text-xs font-semibold">
            {['elements', 'text', 'palette', 'shapes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={\`py-1.5 rounded-lg capitalize transition \${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'}\`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'elements' && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Stickers & Accents</span>
              <div className="grid grid-cols-4 gap-2 text-2xl p-2 bg-[#0e131f] rounded-xl border border-zinc-800">
                {['🚀', '⚡', '🔥', '✨', '💎', '🎉', '🌟', '💡'].map((em) => (
                  <button key={em} onClick={() => addSticker(em)} className="p-2 hover:bg-zinc-800 rounded-lg transition active:scale-125">
                    {em}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Headline Text</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-[#0e131f] border border-zinc-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Subheadline</label>
                <input
                  type="text"
                  value={subhead}
                  onChange={(e) => setSubhead(e.target.value)}
                  className="w-full bg-[#0e131f] border border-zinc-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Font Size: {fontSize}px</label>
                <input
                  type="range"
                  min="20"
                  max="64"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {activeTab === 'palette' && (
            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Canvas Background</label>
                <div className="flex items-center space-x-2">
                  <input type="color" value={canvasBg} onChange={(e) => setCanvasBg(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent" />
                  <span className="text-zinc-300">{canvasBg}</span>
                </div>
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Text Color</label>
                <div className="flex items-center space-x-2">
                  <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent" />
                  <span className="text-zinc-300">{textColor}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center Canvas Preview Area */}
        <div className="flex-1 bg-[#0b0e17] flex items-center justify-center p-8 overflow-auto bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px]">
          <div
            style={{
              backgroundColor: canvasBg,
              color: textColor,
              width: format.includes('Thumbnail') ? '580px' : '460px',
              height: format.includes('Thumbnail') ? '326px' : '460px',
            }}
            className="rounded-2xl shadow-2xl relative p-8 flex flex-col justify-between overflow-hidden transition-all duration-300"
          >
            {/* Draggable/Placed Stickers */}
            {stickers.map((stk) => (
              <span
                key={stk.id}
                style={{ position: 'absolute', left: stk.x, top: stk.y }}
                className="text-3xl cursor-move pointer-events-none select-none drop-shadow-md"
              >
                {stk.emoji}
              </span>
            ))}

            <div className="space-y-3 text-center my-auto relative z-10">
              <h1 style={{ fontSize: \`\${fontSize}px\` }} className="font-black tracking-tight leading-tight drop-shadow-lg">
                {headline}
              </h1>
              <p className="text-sm font-semibold opacity-90 drop-shadow">
                {subhead}
              </p>
            </div>

            <div className="flex justify-between items-center text-[11px] font-mono opacity-75 relative z-10">
              <span>DESIGNED IN CANVA PRO</span>
              <span>1080 × 1080 PX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  },
};

// ============================================================================
// 9. UBUNTU LINUX DESKTOP CLONE TEMPLATE
// ============================================================================
export const ubuntuClone: ProjectTemplate = {
  name: 'Ubuntu 24.04 LTS — Desktop Operating System Simulator',
  category: 'Operating Systems & Workstations',
  description: 'Ubuntu Linux desktop environment with iconic Unity/GNOME dock, top system panel, interactive Bash terminal window (with live command execution), file manager, and system telemetry.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'ubuntu-desktop-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [activeWindow, setActiveWindow] = useState('terminal'); // terminal | files | settings
  const [termInput, setTermInput] = useState('');
  const [termHistory, setTermHistory] = useState([
    'Welcome to Ubuntu 24.04.1 LTS (GNU/Linux 6.8.0-40-generic x86_64)',
    ' * Documentation:  https://help.ubuntu.com',
    ' * Management:     https://landscape.canonical.com',
    ' * Support:        https://ubuntu.com/pro',
    '',
    'developer@nexus-ubuntu:~$ neofetch',
    '       _,met$$$$$gg.          developer@nexus-ubuntu',
    '    ,g$$$$$$$$$$$$$$$P.       OS: Ubuntu 24.04 LTS x86_64',
    '  ,g$$P"     """Y$$.".        Kernel: 6.8.0-generic',
    ' ,$$P\'              \`$$$.     Uptime: 42 days, 14 hours',
    ',\$$P       ,ggs.     \`$$b:   Packages: 1842 (dpkg)',
    'd$$\'     ,$P"\'   .    $$$     Shell: bash 5.2.21',
    '$$P      d$\'     ,    $$$P    Resolution: 1920x1080',
    '$$:      $$.   -    ,d$$\'     DE: GNOME 46',
    '$$\;      Y$b._   _,d$P\'       Memory: 4820MiB / 32140MiB',
    '',
    'developer@nexus-ubuntu:~$ '
  ]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!termInput.trim()) return;

    const cmd = termInput.trim().toLowerCase();
    const promptLine = 'developer@nexus-ubuntu:~$ ' + termInput;
    let response = [];

    if (cmd === 'ls') {
      response = ['Desktop    Documents    Downloads    Music    Pictures    Projects    sitebuilder'];
    } else if (cmd === 'pwd') {
      response = ['/home/developer'];
    } else if (cmd === 'whoami') {
      response = ['developer (uid=1000, gid=1000)'];
    } else if (cmd === 'clear') {
      setTermHistory([]);
      setTermInput('');
      return;
    } else if (cmd === 'help') {
      response = ['Available commands: ls, pwd, whoami, clear, uname -a, pnpm dev, cat package.json'];
    } else if (cmd === 'pnpm dev') {
      response = ['> nexus-ai@1.0.0 dev', '   ▲ Next.js 15.1.7', '   - Local: http://localhost:3000', '   ✓ Ready in 380ms'];
    } else {
      response = [\`bash: \${cmd}: command not found. Type 'help' for available commands.\`];
    }

    setTermHistory((prev) => [...prev, promptLine, ...response]);
    setTermInput('');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#2c001e] via-[#460b37] to-[#77216f] text-white flex flex-col font-sans select-none overflow-hidden relative">
      {/* Ubuntu Top Panel */}
      <div className="h-7 bg-[#111111]/90 backdrop-blur-md px-4 flex items-center justify-between text-xs font-semibold shrink-0 z-40 border-b border-white/5">
        <span className="hover:text-orange-400 cursor-pointer">Activities</span>
        <span className="font-mono">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center space-x-3 text-[11px]">
          <span>📶</span>
          <span>🔊</span>
          <span>🔋 98%</span>
          <span className="text-orange-400 font-bold">⏻</span>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Ubuntu Dock Launcher */}
        <div className="w-14 bg-[#111111]/85 backdrop-blur-md flex flex-col items-center py-3 space-y-3 shrink-0 border-r border-white/5 z-30">
          <button onClick={() => setActiveWindow('terminal')} title="Terminal" className={\`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition \${activeWindow === 'terminal' ? 'bg-orange-600/40 border border-orange-500' : 'hover:bg-white/10'}\`}>
            ⬛
          </button>
          <button onClick={() => setActiveWindow('files')} title="Files" className={\`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition \${activeWindow === 'files' ? 'bg-orange-600/40 border border-orange-500' : 'hover:bg-white/10'}\`}>
            📁
          </button>
          <button onClick={() => setActiveWindow('settings')} title="Settings" className={\`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition \${activeWindow === 'settings' ? 'bg-orange-600/40 border border-orange-500' : 'hover:bg-white/10'}\`}>
            ⚙️
          </button>
          <div className="flex-1" />
          <button title="Trash" className="w-10 h-10 rounded-xl flex items-center justify-center text-lg hover:bg-white/10">
            🗑️
          </button>
        </div>

        {/* Desktop Surface with Open Windows */}
        <div className="flex-1 p-6 relative overflow-hidden flex items-center justify-center">
          {/* Active Window: Terminal */}
          {activeWindow === 'terminal' && (
            <div className="w-full max-w-2xl h-[520px] bg-[#300a24]/95 border border-[#5e2750] rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-lg">
              {/* Window Header */}
              <div className="h-9 bg-[#3e1435] border-b border-[#5e2750] px-4 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-300">developer@nexus-ubuntu: ~</span>
                <div className="flex items-center space-x-2">
                  <button className="w-3.5 h-3.5 rounded-full bg-zinc-600 hover:bg-zinc-500 text-[9px] flex items-center justify-center font-bold">-</button>
                  <button className="w-3.5 h-3.5 rounded-full bg-zinc-600 hover:bg-zinc-500 text-[9px] flex items-center justify-center font-bold">□</button>
                  <button onClick={() => setActiveWindow('')} className="w-3.5 h-3.5 rounded-full bg-orange-600 hover:bg-red-600 text-[9px] flex items-center justify-center font-bold">✕</button>
                </div>
              </div>

              {/* Terminal Logs & Interactive Prompt */}
              <div className="flex-1 p-4 font-mono text-xs text-emerald-400 overflow-y-auto space-y-1">
                {termHistory.map((line, idx) => (
                  <div key={idx} className="whitespace-pre-wrap leading-relaxed">{line}</div>
                ))}

                <form onSubmit={handleCommand} className="flex items-center space-x-1.5 pt-1">
                  <span className="text-zinc-300 font-bold shrink-0">developer@nexus-ubuntu:~$</span>
                  <input
                    type="text"
                    autoFocus
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    className="flex-1 bg-transparent text-emerald-300 focus:outline-none font-mono"
                  />
                </form>
              </div>
            </div>
          )}

          {/* Active Window: Files */}
          {activeWindow === 'files' && (
            <div className="w-full max-w-xl h-[420px] bg-[#1e1e1e] border border-zinc-700 rounded-xl shadow-2xl flex flex-col overflow-hidden">
              <div className="h-9 bg-[#2d2d2d] border-b border-zinc-700 px-4 flex items-center justify-between text-xs">
                <span className="font-bold text-white">Home - File Manager</span>
                <button onClick={() => setActiveWindow('')} className="text-zinc-400 hover:text-white">✕</button>
              </div>
              <div className="flex-1 p-6 grid grid-cols-4 gap-4 text-center text-xs">
                {['Desktop', 'Documents', 'Downloads', 'Music', 'Pictures', 'Projects', 'Videos', 'sitebuilder'].map((folder) => (
                  <div key={folder} className="p-3 rounded-lg hover:bg-white/10 cursor-pointer space-y-1">
                    <span className="text-3xl block">📁</span>
                    <span className="text-zinc-300 truncate block">{folder}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`,
  },
};

