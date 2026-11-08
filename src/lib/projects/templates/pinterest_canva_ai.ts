import { ProjectTemplate } from './index';

// ============================================================================
// PINTEREST AESTHETICS × CANVA DESIGN STUDIO × GOOGLE AI SYNTHESIZER
// ============================================================================
export const pinterestCanvaAiTemplate: ProjectTemplate = {
  name: 'AURA — Pinterest Aesthetic Board × Canva Design Studio × Google AI',
  category: 'Aesthetic Visual Discovery & Creative Design',
  description:
    'Flagship creative hybrid combining Pinterest visual masonry moodboards, Canva drag-and-drop layer design editor, and Google AI neural generative aesthetic synthesizer with multilingual voice guidance in English, Hindi, Korean, Chinese, and Sanskrit.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'aura-pinterest-canva-google-ai',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' (Pinterest) | 'studio' (Canva) | 'saved' (My Boards)
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPins, setSavedPins] = useState(['p1', 'p3', 'p5']);
  const [selectedPinModal, setSelectedPinModal] = useState(null);
  const [copiedHex, setCopiedHex] = useState(null);

  // Google AI Generator State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [aiStyleFilter, setAiStyleFilter] = useState('cyberpunk');

  // Multilingual Guidance
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isVoiceNarrating, setIsVoiceNarrating] = useState(false);

  // Canva Studio State
  const [canvasBg, setCanvasBg] = useState('#0f172a');
  const [canvasAspect, setCanvasAspect] = useState('story'); // 'story' (9:16) | 'post' (1:1) | 'banner' (16:9)
  const [canvasFilter, setCanvasFilter] = useState('normal');
  const [layers, setLayers] = useState([
    { id: 1, type: 'image', content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', x: 20, y: 30, scale: 1 },
    { id: 2, type: 'text', text: 'ETHEREAL VISIONS', color: '#38bdf8', fontSize: 24, fontFamily: 'font-mono' },
    { id: 3, type: 'sticker', sticker: '✨', x: 80, y: 20 },
  ]);
  const [activeLayerId, setActiveLayerId] = useState(2);
  const [newTextVal, setNewTextVal] = useState('NEURAL AESTHETICS');

  // Curated Pinterest Aesthetic Pins
  const [pins, setPins] = useState([
    {
      id: 'p1',
      title: 'Neon Cyber Tokyo Nights',
      category: 'cyberpunk',
      author: '@neo_lumina',
      likes: 4820,
      aspect: 'tall',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      palette: ['#0f172a', '#f43f5e', '#38bdf8', '#a855f7'],
      prompt: 'Cyberpunk rainy alleyway with neon signs and volumetric fog, 8k resolution cinematic lighting',
    },
    {
      id: 'p2',
      title: 'Minimalist Architectural Brutalism',
      category: 'minimal',
      author: '@form_space',
      likes: 3120,
      aspect: 'medium',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      palette: ['#1c1917', '#e7e5e4', '#78716c', '#d6d3d1'],
      prompt: 'Curved concrete brutalist sculpture floating in a desert, warm dusk sun, architectural digest',
    },
    {
      id: 'p3',
      title: 'Ethereal Glassmorphism Prism',
      category: 'abstract',
      author: '@chroma_lab',
      likes: 5690,
      aspect: 'tall',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      palette: ['#030712', '#06b6d4', '#ec4899', '#8b5cf6'],
      prompt: 'Iridescent liquid glass ribbons reflecting multidimensional prism light, octane render 3d',
    },
    {
      id: 'p4',
      title: 'Moody Editorial High Fashion',
      category: 'fashion',
      author: '@vogue_ai',
      likes: 2940,
      aspect: 'short',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      palette: ['#09090b', '#d4af37', '#71717a', '#fafafa'],
      prompt: 'Haute couture metallic cape model captured in cinematic studio shadows, 35mm portrait lens',
    },
    {
      id: 'p5',
      title: 'Dreamy Pastel Anime Clouds',
      category: 'anime',
      author: '@sol_gazing',
      likes: 7210,
      aspect: 'tall',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      palette: ['#fdf2f8', '#f472b6', '#c084fc', '#67e8f9'],
      prompt: 'Ghibli style pastel purple cumulus clouds with shooting stars above tranquil ocean horizon',
    },
    {
      id: 'p6',
      title: 'Holographic Liquid Chrome',
      category: 'abstract',
      author: '@metallic_void',
      likes: 4180,
      aspect: 'medium',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      palette: ['#18181b', '#22d3ee', '#f43f5e', '#ffffff'],
      prompt: 'Molten chrome sphere dripping in zero gravity with neon cyan reflections, ray traced',
    },
  ]);

  const MULTILINGUAL_GUIDES = {
    en: 'Welcome to AURA. Explore Pinterest-style curated moodboards, remix artwork in Canva Creative Studio, and synthesize new aesthetics using Google AI intelligence.',
    hi: 'ऑरा में आपका स्वागत है। पिनट्रेस्ट जैसी सुंदर मूडबोर्ड देखें, कैनवा स्टूडियो में डिज़ाइन बनाएं और गूगल एआई से नई कला उत्पन्न करें।',
    ko: 'AURA에 오신 것을 환영합니다. 핀터레스트 감성 무드보드를 탐색하고, 캔바 디자인 스튜디오에서 리믹스하며, 구글 AI로 새로운 아트를 합성하세요.',
    zh: '欢迎来到 AURA。探索 Pinterest 极具美感的灵感画板，在 Canva 设计工作室自由混搭，并使用 Google AI 实时生成视觉艺术。',
    sa: 'ऑरा-मञ्चे स्वागतम् अस्ति। अत्र पिनट्रेस्ट-सौन्दर्य-पट्टिकाः पश्यन्तु, कैनवा-चित्रागारे रचामन्वयन्तु, गूगल-एआई-साहाय्येन नूतनं सौन्दर्यं जनयन्तु।',
  };

  const handleToggleVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isVoiceNarrating) {
      window.speechSynthesis.cancel();
      setIsVoiceNarrating(false);
      return;
    }
    window.speechSynthesis.cancel();
    const script = MULTILINGUAL_GUIDES[selectedLanguage] || MULTILINGUAL_GUIDES.en;
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = selectedLanguage === 'ko' ? 'ko-KR' : selectedLanguage === 'zh' ? 'zh-CN' : selectedLanguage === 'hi' || selectedLanguage === 'sa' ? 'hi-IN' : 'en-US';
    utterance.onend = () => setIsVoiceNarrating(false);
    utterance.onerror = () => setIsVoiceNarrating(false);
    window.speechSynthesis.speak(utterance);
    setIsVoiceNarrating(true);
  };

  const toggleSavePin = (id) => {
    if (savedPins.includes(id)) {
      setSavedPins(savedPins.filter((p) => p !== id));
    } else {
      setSavedPins([...savedPins, id]);
    }
  };

  const copyHex = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Google AI Generative Aesthetic Synthesizer
  const handleSynthesizeAiPin = (e) => {
    if (e) e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsSynthesizing(true);
    setTimeout(() => {
      const newPinId = 'ai_' + Date.now();
      const stylePhotos = {
        cyberpunk: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
        minimal: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        abstract: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        fashion: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
        anime: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      };

      const newPin = {
        id: newPinId,
        title: aiPrompt.slice(0, 32) + (aiPrompt.length > 32 ? '...' : ''),
        category: aiStyleFilter,
        author: '@google_deepmind_ai',
        likes: 1,
        aspect: 'tall',
        image: stylePhotos[aiStyleFilter] || stylePhotos.abstract,
        palette: ['#0f172a', '#06b6d4', '#f43f5e', '#a855f7'],
        prompt: aiPrompt,
      };

      setPins([newPin, ...pins]);
      setSelectedPinModal(newPin);
      setIsSynthesizing(false);
      setAiPrompt('');
    }, 1200);
  };

  // Remix Pin into Canva Studio
  const handleRemixInCanva = (pin) => {
    setCanvasBg(pin.palette[0] || '#0f172a');
    setLayers([
      { id: 1, type: 'image', content: pin.image, x: 0, y: 0, scale: 1 },
      { id: 2, type: 'text', text: pin.title.toUpperCase(), color: '#ffffff', fontSize: 22, fontFamily: 'font-mono' },
      { id: 3, type: 'sticker', sticker: '✨', x: 80, y: 20 },
    ]);
    setSelectedPinModal(null);
    setActiveTab('studio');
  };

  // Canva Layer Controls
  const addTextLayer = () => {
    const newId = Date.now();
    setLayers([
      ...layers,
      { id: newId, type: 'text', text: newTextVal, color: '#38bdf8', fontSize: 20, fontFamily: 'font-mono' },
    ]);
    setActiveLayerId(newId);
  };

  const addStickerLayer = (sticker) => {
    const newId = Date.now();
    setLayers([...layers, { id: newId, type: 'sticker', sticker, x: 50, y: 50 }]);
    setActiveLayerId(newId);
  };

  const removeLayer = (id) => {
    setLayers(layers.filter((l) => l.id !== id));
  };

  const filteredPins = pins
    .filter((p) => {
      if (activeTab === 'saved') return savedPins.includes(p.id);
      if (activeCategory === 'all') return true;
      return p.category === activeCategory;
    })
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.prompt.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Header: Pinterest Glass Navbar with Google AI & Canva Controls */}
      <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-xl border-b border-white/[0.08] px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Tag */}
        <div className="flex items-center space-x-6 shrink-0">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('explore')}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-indigo-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-red-500/30">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-widest text-red-500 uppercase">AURA</span>
              <span className="text-[9px] font-mono tracking-wider text-cyan-400 uppercase -mt-0.5">Pinterest × Canva × Google AI</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-zinc-900/80 p-1 rounded-full border border-white/[0.08] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('explore')}
              className={\`px-4 py-1.5 rounded-full transition flex items-center space-x-1.5 \${
                activeTab === 'explore' ? 'bg-white text-black font-black shadow' : 'text-zinc-400 hover:text-white'
              }\`}
            >
              <span>📌</span>
              <span>Inspiration Grid</span>
            </button>
            <button
              onClick={() => setActiveTab('studio')}
              className={\`px-4 py-1.5 rounded-full transition flex items-center space-x-1.5 \${
                activeTab === 'studio' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black shadow' : 'text-zinc-400 hover:text-white'
              }\`}
            >
              <span>🎨</span>
              <span>Canva Studio</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={\`px-4 py-1.5 rounded-full transition flex items-center space-x-1.5 \${
                activeTab === 'saved' ? 'bg-red-600 text-white font-black shadow' : 'text-zinc-400 hover:text-white'
              }\`}
            >
              <span>❤️</span>
              <span>My Boards ({savedPins.length})</span>
            </button>
          </nav>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-lg hidden sm:block">
          <input
            type="text"
            placeholder="Search aesthetic vibes, color palettes, neon architecture..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/90 border border-white/[0.08] focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-full px-4 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition"
          />
        </div>

        {/* Right Controls: Multilingual Voice & AI Quick Action */}
        <div className="flex items-center space-x-2.5 shrink-0">
          {/* Multilingual Voice Narrator */}
          <div className="flex items-center space-x-1 bg-zinc-900 border border-white/[0.08] rounded-full px-2.5 py-1">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-xs text-cyan-300 font-mono focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-zinc-900 text-white">🇺🇸 EN</option>
              <option value="hi" className="bg-zinc-900 text-white">🇮🇳 हिन्दी</option>
              <option value="ko" className="bg-zinc-900 text-white">🇰🇷 한국어</option>
              <option value="zh" className="bg-zinc-900 text-white">🇨🇳 中文</option>
              <option value="sa" className="bg-zinc-900 text-white">🕉️ संस्कृतम्</option>
            </select>
            <button
              onClick={handleToggleVoice}
              className={\`p-1 rounded-full text-xs transition \${
                isVoiceNarrating ? 'bg-emerald-500 text-black animate-pulse' : 'text-zinc-400 hover:text-white'
              }\`}
              title="Speak Multilingual Guide"
            >
              {isVoiceNarrating ? '🔊' : '🔈'}
            </button>
          </div>

          <button
            onClick={() => {
              setAiPrompt('Surreal ethereal neon liquid chrome floating in nebula');
              handleSynthesizeAiPin();
            }}
            className="px-3.5 py-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-indigo-600 hover:scale-105 text-white font-extrabold text-xs rounded-full shadow-lg shadow-red-500/20 active:scale-95 transition flex items-center space-x-1.5"
          >
            <span>✨</span>
            <span className="hidden md:inline">Google AI Synthesizer</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* TAB 1: PINTEREST EXPLORE & INSPIRATION MASONRY GRID                       */}
      {/* ========================================================================= */}
      {activeTab !== 'studio' && (
        <div className="flex-1 flex flex-col">
          {/* Google AI Prompt Synthesizer Hero Strip */}
          <div className="bg-gradient-to-b from-zinc-950 via-[#0a0d14] to-transparent px-6 py-6 border-b border-white/[0.06]">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                    Google AI Neural Aesthetic Engine
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">Diffusion & Aesthetic Tokens Ready</span>
              </div>

              {/* Generative Prompt Bar */}
              <form onSubmit={handleSynthesizeAiPin} className="relative flex items-center">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Describe your aesthetic vision (e.g., 'Retro cyberpunk rooftop neon rain reflections')..."
                  className="w-full bg-zinc-900/95 border border-white/[0.1] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 rounded-2xl pl-4 pr-36 py-3.5 text-xs md:text-sm text-white placeholder-zinc-500 focus:outline-none transition shadow-2xl"
                />
                <div className="absolute right-2 flex items-center space-x-2">
                  <select
                    value={aiStyleFilter}
                    onChange={(e) => setAiStyleFilter(e.target.value)}
                    className="bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1.5 rounded-xl border border-white/[0.08] focus:outline-none"
                  >
                    <option value="cyberpunk">Cyberpunk</option>
                    <option value="minimal">Minimal</option>
                    <option value="abstract">Abstract 3D</option>
                    <option value="fashion">High Fashion</option>
                    <option value="anime">Anime Cloud</option>
                  </select>
                  <button
                    type="submit"
                    disabled={isSynthesizing}
                    className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition disabled:opacity-50"
                  >
                    {isSynthesizing ? 'Synthesizing...' : 'Generate Pin'}
                  </button>
                </div>
              </form>

              {/* Category Filter Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto pt-2 pb-1 text-xs font-bold">
                {[
                  { id: 'all', label: 'All Aesthetics' },
                  { id: 'cyberpunk', label: '⚡ Cyberpunk Neon' },
                  { id: 'minimal', label: '🏛️ Minimal Brutalism' },
                  { id: 'abstract', label: '🔮 Glassmorphism 3D' },
                  { id: 'fashion', label: '✨ Editorial Fashion' },
                  { id: 'anime', label: '🌸 Pastel Anime' },
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
            </div>
          </div>

          {/* Pinterest Multi-Column Masonry Grid */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-6">
            {filteredPins.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="text-4xl">📌</div>
                <h3 className="font-bold text-white text-base">No pins found in this moodboard</h3>
                <p className="text-xs text-zinc-500">Try generating a new aesthetic or switching categories.</p>
                <button
                  onClick={() => { setActiveTab('explore'); setActiveCategory('all'); }}
                  className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
                {filteredPins.map((pin) => (
                  <div
                    key={pin.id}
                    onClick={() => setSelectedPinModal(pin)}
                    className="break-inside-avoid group relative rounded-3xl overflow-hidden bg-zinc-950 border border-white/[0.08] hover:border-red-500/80 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1 cursor-pointer flex flex-col"
                  >
                    {/* Visual Card Image */}
                    <div className="relative overflow-hidden bg-zinc-900">
                      <img
                        src={pin.image}
                        alt={pin.title}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5" />

                      {/* Top Overlay: Quick Save Red Pill & Tag */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/60 text-zinc-300 backdrop-blur">
                          {pin.category}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSavePin(pin.id);
                          }}
                          className={\`px-3.5 py-1.5 rounded-full font-black text-xs shadow-xl transition active:scale-90 \${
                            savedPins.includes(pin.id)
                              ? 'bg-zinc-800 text-white border border-white/20'
                              : 'bg-red-600 hover:bg-red-500 text-white'
                          }\`}
                        >
                          {savedPins.includes(pin.id) ? '✓ Saved' : 'Save'}
                        </button>
                      </div>

                      {/* Bottom Overlay: Remix in Canva Button */}
                      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-xs font-bold text-white drop-shadow truncate max-w-[140px]">
                          {pin.author}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemixInCanva(pin);
                          }}
                          className="px-3 py-1 bg-white hover:bg-zinc-200 text-black font-extrabold text-[11px] rounded-full shadow-lg transition active:scale-95 flex items-center space-x-1"
                        >
                          <span>🎨</span>
                          <span>Canva Remix</span>
                        </button>
                      </div>
                    </div>

                    {/* Pin Footer & Extracted Swatches */}
                    <div className="p-3.5 space-y-2 bg-zinc-950">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-white truncate max-w-[180px]">{pin.title}</h4>
                        <span className="text-[10px] font-mono text-zinc-500">❤️ {pin.likes}</span>
                      </div>

                      {/* Micro Color Palette Swatches */}
                      <div className="flex items-center space-x-1.5 pt-0.5">
                        {pin.palette.map((color, idx) => (
                          <div
                            key={idx}
                            style={{ backgroundColor: color }}
                            title={color}
                            onClick={(e) => {
                              e.stopPropagation();
                              copyHex(color);
                            }}
                            className="w-4 h-4 rounded-full border border-white/20 hover:scale-125 transition-transform cursor-pointer"
                          />
                        ))}
                        {copiedHex && (
                          <span className="text-[9px] font-mono text-emerald-400 pl-1">Copied!</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CANVA GRAPHIC DESIGN STUDIO                                        */}
      {/* ========================================================================= */}
      {activeTab === 'studio' && (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Sidebar: Canva Tools, Stickers & Typography Layers */}
          <aside className="w-full md:w-80 bg-zinc-950 border-r border-white/[0.08] p-5 space-y-6 flex flex-col justify-between shrink-0">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-black">
                    C
                  </div>
                  <h3 className="font-black text-sm text-white">Canva Layers & Tools</h3>
                </div>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  ← Back to Grid
                </button>
              </div>

              {/* Aspect Ratio Switcher */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Artboard Preset</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'story', label: '9:16 Story' },
                    { id: 'post', label: '1:1 Square' },
                    { id: 'banner', label: '16:9 Banner' },
                  ].map((asp) => (
                    <button
                      key={asp.id}
                      onClick={() => setCanvasAspect(asp.id)}
                      className={\`py-1.5 rounded-xl text-xs font-bold transition border \${
                        canvasAspect === asp.id
                          ? 'bg-cyan-500 text-black border-cyan-400 font-black'
                          : 'bg-zinc-900 text-zinc-400 border-white/[0.06] hover:text-white'
                      }\`}
                    >
                      {asp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Color Presets */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Canvas Canvas Backdrop</span>
                <div className="flex items-center space-x-2">
                  {['#0f172a', '#18181b', '#450a0a', '#172554', '#052e16', '#3b0764'].map((c) => (
                    <button
                      key={c}
                      style={{ backgroundColor: c }}
                      onClick={() => setCanvasBg(c)}
                      className={\`w-6 h-6 rounded-full border-2 transition \${
                        canvasBg === c ? 'border-cyan-400 scale-110 shadow-lg' : 'border-white/20'
                      }\`}
                    />
                  ))}
                </div>
              </div>

              {/* Aesthetic Visual Filter */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Aesthetic Shader Filter</span>
                <div className="grid grid-cols-4 gap-1.5 text-[10px] font-mono">
                  {['normal', 'cyber', 'retro', 'mono'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setCanvasFilter(f)}
                      className={\`py-1 rounded-lg border capitalize \${
                        canvasFilter === f ? 'bg-white text-black font-bold' : 'bg-zinc-900 text-zinc-400 border-white/[0.08]'
                      }\`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Custom Text Layer */}
              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Typography Studio</span>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTextVal}
                    onChange={(e) => setNewTextVal(e.target.value)}
                    placeholder="Enter layer text..."
                    className="flex-1 bg-zinc-900 border border-white/[0.1] rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
                  />
                  <button
                    onClick={addTextLayer}
                    className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-xl transition"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Aesthetic Stickers Library */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Aesthetic Sticker Assets</span>
                <div className="flex items-center space-x-2">
                  {['✨', '🌸', '⚡', '🔮', '🖤', '🛹', '🛸'].map((s) => (
                    <button
                      key={s}
                      onClick={() => addStickerLayer(s)}
                      className="w-8 h-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-base flex items-center justify-center border border-white/[0.06] hover:scale-110 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Layers List */}
              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Active Layers ({layers.length})</span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {layers.map((layer) => (
                    <div
                      key={layer.id}
                      onClick={() => setActiveLayerId(layer.id)}
                      className={\`px-3 py-2 rounded-xl text-xs flex items-center justify-between border cursor-pointer \${
                        activeLayerId === layer.id
                          ? 'bg-zinc-900 border-cyan-500/80 text-white'
                          : 'bg-zinc-950/60 border-white/[0.06] text-zinc-400'
                      }\`}
                    >
                      <span className="font-mono text-[11px] truncate">
                        {layer.type === 'image' ? '🖼️ Visual Artwork' : layer.type === 'text' ? \`🔤 "\${layer.text}"\` : \`⭐ Sticker \${layer.sticker}\`}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeLayer(layer.id);
                        }}
                        className="text-zinc-500 hover:text-red-400 text-xs ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Export Bar */}
            <div className="pt-4 border-t border-white/[0.08] space-y-2">
              <button
                onClick={() => {
                  alert('Design exported as Ultra-HD 4K PNG! Ready to publish on Pinterest & Instagram.');
                }}
                className="w-full py-2.5 bg-gradient-to-r from-red-600 via-rose-500 to-indigo-600 hover:scale-105 text-white font-extrabold text-xs rounded-xl shadow-xl transition active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>💾</span>
                <span>Export High-Res 4K Asset</span>
              </button>
            </div>
          </aside>

          {/* Central Canva Interactive Canvas Workspace */}
          <main className="flex-1 bg-[#05070a] p-6 flex flex-col items-center justify-center overflow-auto relative">
            <div className="text-[11px] font-mono text-zinc-500 pb-3 flex items-center space-x-3">
              <span>CANVA ARTBOARD INTERACTION</span>
              <span>•</span>
              <span className="text-cyan-400 font-bold">{canvasAspect.toUpperCase()} RATIO</span>
            </div>

            {/* Live Interactive Artboard Frame */}
            <div
              style={{
                backgroundColor: canvasBg,
                filter: canvasFilter === 'cyber' ? 'hue-rotate(180deg) saturate(1.8)' : canvasFilter === 'retro' ? 'sepia(0.5) contrast(1.2)' : canvasFilter === 'mono' ? 'grayscale(1)' : 'none',
              }}
              className={\`relative rounded-3xl overflow-hidden shadow-2xl border border-white/[0.1] transition-all duration-300 flex flex-col items-center justify-center \${
                canvasAspect === 'story'
                  ? 'w-[320px] h-[540px]'
                  : canvasAspect === 'post'
                  ? 'w-[420px] h-[420px]'
                  : 'w-[560px] h-[315px]'
              }\`}
            >
              {/* Render Artwork Layers */}
              {layers.map((layer) => {
                if (layer.type === 'image') {
                  return (
                    <img
                      key={layer.id}
                      src={layer.content}
                      alt="Layer"
                      className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
                    />
                  );
                }
                if (layer.type === 'text') {
                  return (
                    <div
                      key={layer.id}
                      onClick={() => setActiveLayerId(layer.id)}
                      style={{ color: layer.color, fontSize: \`\${layer.fontSize}px\` }}
                      className={\`relative z-20 font-black tracking-tight drop-shadow-2xl text-center px-4 cursor-pointer hover:outline-dashed hover:outline-2 hover:outline-cyan-400 rounded-lg p-2 transition \${
                        activeLayerId === layer.id ? 'outline-dashed outline-2 outline-cyan-400' : ''
                      }\`}
                    >
                      {layer.text}
                    </div>
                  );
                }
                if (layer.type === 'sticker') {
                  return (
                    <div
                      key={layer.id}
                      onClick={() => setActiveLayerId(layer.id)}
                      className={\`absolute z-30 text-5xl cursor-pointer hover:scale-125 transition active:scale-95 select-none \${
                        activeLayerId === layer.id ? 'animate-bounce' : ''
                      }\`}
                      style={{ top: \`\${layer.y}%\`, left: \`\${layer.x}%\` }}
                    >
                      {layer.sticker}
                    </div>
                  );
                }
                return null;
              })}

              {/* Subtle Ambient Grain Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            </div>
          </main>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: HIGH-RES PIN INSPECTOR & PALETTE SWATCH EXTRACTOR                   */}
      {/* ========================================================================= */}
      {selectedPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8">
          <div className="bg-zinc-950 border border-white/[0.1] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Modal Image Half */}
            <div className="md:w-1/2 bg-black relative flex items-center justify-center">
              <img
                src={selectedPinModal.image}
                alt={selectedPinModal.title}
                className="w-full h-full object-cover max-h-[480px]"
              />
              <span className="absolute top-4 left-4 text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/80 text-cyan-400 border border-cyan-500/30">
                {selectedPinModal.category}
              </span>
            </div>

            {/* Modal Details Half */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">{selectedPinModal.author}</span>
                  <button
                    onClick={() => setSelectedPinModal(null)}
                    className="w-7 h-7 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 flex items-center justify-center text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                <h3 className="text-xl font-extrabold text-white leading-tight">
                  {selectedPinModal.title}
                </h3>

                {/* AI Prompt Extraction */}
                <div className="bg-zinc-900/90 rounded-2xl p-3 border border-white/[0.08] space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
                    <span>GOOGLE AI PROMPT RECIPE</span>
                    <span>100% ACCURATE</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                    &quot;{selectedPinModal.prompt}&quot;
                  </p>
                </div>

                {/* Extracted Hex Color Palette */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Extracted Aesthetic Hex Codes</span>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedPinModal.palette.map((hex, i) => (
                      <div
                        key={i}
                        onClick={() => copyHex(hex)}
                        className="p-2 rounded-xl bg-zinc-900 border border-white/[0.08] hover:border-cyan-400 cursor-pointer transition flex flex-col items-center space-y-1"
                      >
                        <div style={{ backgroundColor: hex }} className="w-5 h-5 rounded-full border border-white/20" />
                        <span className="text-[10px] font-mono text-zinc-300">{hex}</span>
                      </div>
                    ))}
                  </div>
                  {copiedHex && (
                    <div className="text-[10px] font-mono text-emerald-400 text-center">
                      Copied {copiedHex} to clipboard!
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => toggleSavePin(selectedPinModal.id)}
                  className={\`flex-1 py-2.5 rounded-xl font-black text-xs transition active:scale-95 \${
                    savedPins.includes(selectedPinModal.id)
                      ? 'bg-zinc-900 border border-white/20 text-white'
                      : 'bg-red-600 hover:bg-red-500 text-white shadow-lg'
                  }\`}
                >
                  {savedPins.includes(selectedPinModal.id) ? '✓ Saved to Board' : 'Save to Board'}
                </button>
                <button
                  onClick={() => handleRemixInCanva(selectedPinModal)}
                  className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-extrabold text-xs rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center space-x-1"
                >
                  <span>🎨</span>
                  <span>Remix in Canva</span>
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
  },
};
