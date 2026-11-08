import { ProjectTemplate } from './index';

// ============================================================================
// PSYCHE REELS (मनःसूत्रम्) — PSYCHOLOGICAL REEL STREAM & MINDSET PROFILER
// ============================================================================
export const psycheReelsTemplate: ProjectTemplate = {
  name: 'PSYCHE REELS (मनःसूत्रम्) — Psychological Reel Stream & Mindset Profiler',
  category: 'AI Psychology, Philosophical Media & Mindset Optimization',
  description:
    'High-concept autonomous short-form reel platform tailored to user preferences. Features real HTML5 vertical video playback, real-time psychological & philosophical personality profiling (Pros, Cons, Mindset Prescriptions), preference filtering, and 6-language multilingual voice synthesis in English, Japanese, Korean, Chinese, Hindi, and Sanskrit.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'psyche-reels-mindset-profiler',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [activeTab, setActiveTab] = useState('reels'); // 'reels' | 'psyche' | 'advice' | 'preferences'
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedReels, setLikedReels] = useState(['r1', 'r4']);
  const [savedReels, setSavedReels] = useState(['r2']);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isVoiceNarrating, setIsVoiceNarrating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Interactive Personality Dial Sliders
  const [introspection, setIntrospection] = useState(85);
  const [rationality, setRationality] = useState(90);
  const [actionBias, setActionBias] = useState(78);
  const [zenDetachment, setZenDetachment] = useState(82);

  // High-Definition Short Reels Catalog
  const REELS_DATABASE = [
    {
      id: 'r1',
      title: 'Marcus Aurelius & The Dichotomy of Control',
      author: '@stoic_mindset',
      category: 'stoicism',
      tags: ['#Stoicism', '#Mindset', '#SelfMastery'],
      duration: '0:45',
      likes: 12450,
      quote: 'You have power over your mind - not outside events. Realize this, and you will find strength.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      psychTrait: 'High Emotional Resilience & Cognitive Reframing',
      philosophy: 'Stoic Rationalism',
    },
    {
      id: 'r2',
      title: 'Carl Jung: Integrating the Dark Shadow',
      author: '@jungian_depth',
      category: 'psychology',
      tags: ['#Jungian', '#ShadowWork', '#Subconscious'],
      duration: '0:58',
      likes: 18920,
      quote: 'Until you make the unconscious conscious, it will direct your life and you will call it fate.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      psychTrait: 'Deep Introspective Metacognition & Subconscious Archetypes',
      philosophy: 'Analytical Psychology',
    },
    {
      id: 'r3',
      title: 'Friedrich Nietzsche: Amor Fati & Will to Power',
      author: '@existential_vigor',
      category: 'philosophy',
      tags: ['#Nietzsche', '#AmorFati', '#Existentialism'],
      duration: '0:52',
      likes: 9810,
      quote: 'My formula for greatness in a human being is amor fati: that one wants nothing to be different.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      psychTrait: 'High Reality Acceptance & Creative Transcendence',
      philosophy: 'Existential Vitalism',
    },
    {
      id: 'r4',
      title: 'Neuro-Plasticity & Dopamine Reset Architecture',
      author: '@neuro_lab',
      category: 'neuroscience',
      tags: ['#Neuroscience', '#Dopamine', '#DeepFocus'],
      duration: '0:42',
      likes: 24100,
      quote: 'Friction and cognitive struggle are the exact chemical triggers that initiate neural remodeling.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      psychTrait: 'Systems-First Neuro-Discipline & Delay of Gratification',
      philosophy: 'Empirical Physicalism',
    },
    {
      id: 'r5',
      title: 'Zen Mind, Beginner Mind (Shoshin)',
      author: '@zen_presence',
      category: 'zen',
      tags: ['#Zen', '#Mindfulness', '#Shoshin'],
      duration: '0:38',
      likes: 8750,
      quote: 'In the beginner’s mind there are many possibilities, but in the expert’s there are few.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      psychTrait: 'Non-Attachment & Epistemic Humility',
      philosophy: 'Eastern Non-Dualism',
    },
    {
      id: 'r6',
      title: 'Deep Work & High-Flow State Entry Protocol',
      author: '@flow_architect',
      category: 'performance',
      tags: ['#FlowState', '#DeepWork', '#Mastery'],
      duration: '0:48',
      likes: 15300,
      quote: 'Clarity precedes mastery. High-flow state requires absolute elimination of synthetic distractions.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      psychTrait: 'Monotropic Attention & Cognitive Density',
      philosophy: 'Pragmatic Transcendence',
    },
  ];

  const filteredReels = REELS_DATABASE.filter((r) =>
    selectedCategory === 'all' ? true : r.category === selectedCategory
  );

  const currentReel = filteredReels[currentReelIndex] || filteredReels[0];

  // Dynamic Psychological & Philosophical Profile Calculation
  const PSYCHE_PROFILE = {
    archetype: 'The Stoic Architect & Jungian Inquirer',
    mbtiEquivalent: 'INTJ / INFJ Cognitive Hybrid',
    dominantPhilosophy: 'Stoic Rationalism & Eastern Non-Dualism',
    dominantTrait: 'Metacognitive Self-Regulation',
    pros: [
      'Exceptional emotional self-regulation under acute stress & chaos',
      'High neuro-plasticity: converts obstacles into cognitive leverage',
      'Rigorous falsification of cognitive biases and unexamined dogmas',
      'Deep monotropic concentration and natural immunity to shallow trends',
    ],
    cons: [
      'Tendency toward intellectual paralysis: over-analyzing simple actions',
      'Occasional emotional detachment leading to perceived stoic aloofness',
      'Hyper-critical internal monologue: setting unattainable perfection bounds',
      'Dopamine sensitivity: vulnerable to burnout when progress plateaus',
    ],
    mindsetAdvices: [
      'Embrace radical embodiment: bridge deep philosophy with tangible everyday execution.',
      'Practice voluntary discomfort (Seneca protocol) to anchor psychological anti-fragility.',
      'Treat cognitive resistance not as friction, but as the precise stimulus for neurogenesis.',
      'Balance analytical introspection with spontaneous, unfiltered creativity.',
    ],
  };

  // Multilingual Voice & Advice Localization (EN, JA, KO, ZH, HI, SA)
  const MULTILINGUAL_PSYCHE_SCRIPTS = {
    en: 'Psychological Diagnosis: You are The Stoic Architect. Your strengths are emotional self-regulation and deep focus. Your growth area is avoiding analytical paralysis. Advice: Convert philosophical insight into immediate disciplined execution.',
    ja: '心理診断：あなたは「ストア派の建築家」です。あなたの強みは感情の自己制御と深い集中力です。改善点は分析麻痺を避けることです。助言：哲学的洞察を直ちに行動に移しましょう。',
    ko: '심리 분석 진단: 당신은 「스토아 철학의 건축가」입니다. 당신의 강점은 높은 감정 통제력과 깊은 몰입도입니다. 주의점은 과도한 분석으로 인한 지연입니다. 조언: 철학적 통찰을 즉각적인 실행으로 연결하세요.',
    zh: '心理学洞察诊断：您是「斯多葛主义架构师」。您的核心优势是情绪自控与深度专注；注意克服过度分析带来的行动迟缓。心智建议：将哲学洞察转化为果断的知行合一。',
    hi: 'मनोवैज्ञानिक विश्लेषण: आपका व्यक्तित्व "स्ट्रोइक वास्तुकार" है। आपकी सबसे बड़ी शक्ति मानसिक संतुलन और गहन एकाग्रता है। कमज़ोरी: अत्यधिक सोच-विचार से बचना। सलाह: अपने दार्शनिक ज्ञान को तुरंत कर्म में बदलें।',
    sa: 'मनोवैज्ञानिक-परीक्षणम्: भवान् "स्थितप्रज्ञः शिल्पी" वर्तते। भवतः सामर्थ्यं मनसः स्थिरता, गहनं ध्यानं च अस्ति। परामर्शः: दार्शनिक-ज्ञानं तत्क्षणमेव कर्मणि प्रयुञ्जताम्।',
  };

  const handleToggleVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isVoiceNarrating) {
      window.speechSynthesis.cancel();
      setIsVoiceNarrating(false);
      return;
    }
    window.speechSynthesis.cancel();
    const script = MULTILINGUAL_PSYCHE_SCRIPTS[selectedLanguage] || MULTILINGUAL_PSYCHE_SCRIPTS.en;
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang =
      selectedLanguage === 'ja'
        ? 'ja-JP'
        : selectedLanguage === 'ko'
        ? 'ko-KR'
        : selectedLanguage === 'zh'
        ? 'zh-CN'
        : selectedLanguage === 'hi' || selectedLanguage === 'sa'
        ? 'hi-IN'
        : 'en-US';
    utterance.onend = () => setIsVoiceNarrating(false);
    utterance.onerror = () => setIsVoiceNarrating(false);
    window.speechSynthesis.speak(utterance);
    setIsVoiceNarrating(true);
  };

  const handleNextReel = () => {
    setCurrentReelIndex((prev) => (prev + 1) % filteredReels.length);
  };

  const handlePrevReel = () => {
    setCurrentReelIndex((prev) => (prev - 1 + filteredReels.length) % filteredReels.length);
  };

  const toggleLikeReel = (id) => {
    if (likedReels.includes(id)) {
      setLikedReels(likedReels.filter((item) => item !== id));
    } else {
      setLikedReels([...likedReels, id]);
    }
  };

  const toggleSaveReel = (id) => {
    if (savedReels.includes(id)) {
      setSavedReels(savedReels.filter((item) => item !== id));
    } else {
      setSavedReels([...savedReels, id]);
    }
  };

  // Keyboard navigation for reels
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        handleNextReel();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        handlePrevReel();
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMuted((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [filteredReels.length]);

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Header: PSYCHE REELS Glass Navbar */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-white/[0.08] px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('reels')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-rose-500/30">
              Ψ
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-300 to-cyan-400 uppercase">
                PSYCHE REELS
              </span>
              <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase -mt-0.5">
                मनःसूत्रम् • AI Mindset & Philosophy Feed
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-zinc-900/80 p-1 rounded-full border border-white/[0.08] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('reels')}
              className={\`px-4 py-1.5 rounded-full transition flex items-center space-x-1.5 \${
                activeTab === 'reels' ? 'bg-rose-500 text-white font-black shadow-lg shadow-rose-500/20' : 'text-zinc-400 hover:text-white'
              }\`}
            >
              <span>📱</span>
              <span>Reel Stream</span>
            </button>
            <button
              onClick={() => setActiveTab('psyche')}
              className={\`px-4 py-1.5 rounded-full transition flex items-center space-x-1.5 \${
                activeTab === 'psyche' ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-black shadow' : 'text-zinc-400 hover:text-white'
              }\`}
            >
              <span>🧠</span>
              <span>Psychology Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('advice')}
              className={\`px-4 py-1.5 rounded-full transition flex items-center space-x-1.5 \${
                activeTab === 'advice' ? 'bg-emerald-500 text-black font-black shadow' : 'text-zinc-400 hover:text-white'
              }\`}
            >
              <span>📜</span>
              <span>Mindset Prescriptions</span>
            </button>
          </nav>
        </div>

        {/* Right Controls: 6-Language Voice Narrator & Cognitive Level */}
        <div className="flex items-center space-x-3">
          {/* Multilingual Voice Narrator */}
          <div className="flex items-center space-x-1 bg-zinc-900 border border-white/[0.08] rounded-full px-2.5 py-1">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-xs text-rose-400 font-mono focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-zinc-900 text-white">🇺🇸 EN</option>
              <option value="ja" className="bg-zinc-900 text-white">🇯🇵 日本語</option>
              <option value="ko" className="bg-zinc-900 text-white">🇰🇷 한국어</option>
              <option value="zh" className="bg-zinc-900 text-white">🇨🇳 中文</option>
              <option value="hi" className="bg-zinc-900 text-white">🇮🇳 हिन्दी</option>
              <option value="sa" className="bg-zinc-900 text-white">🕉️ संस्कृतम्</option>
            </select>
            <button
              onClick={handleToggleVoice}
              className={\`p-1 rounded-full text-xs transition \${
                isVoiceNarrating ? 'bg-rose-500 text-white animate-pulse' : 'text-zinc-400 hover:text-white'
              }\`}
              title="Listen to Mindset Diagnosis"
            >
              {isVoiceNarrating ? '🔊' : '🔈'}
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span>ALGORITHM TUNED TO YOUR PSYCHE</span>
          </div>
        </div>
      </header>

      {/* Category Pills Strip */}
      <div className="bg-zinc-950/80 border-b border-white/[0.06] px-6 py-2.5 flex items-center space-x-2 overflow-x-auto text-xs font-bold">
        {[
          { id: 'all', label: 'All Preferences' },
          { id: 'stoicism', label: '🏛️ Stoic Mindset' },
          { id: 'psychology', label: '🧠 Jungian Depth' },
          { id: 'philosophy', label: '⚡ Existential Vitalism' },
          { id: 'neuroscience', label: '🧬 Neuro-Plasticity' },
          { id: 'zen', label: '🌸 Zen Non-Dualism' },
          { id: 'performance', label: '🎯 Flow State Mastery' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setSelectedCategory(cat.id); setCurrentReelIndex(0); }}
            className={\`px-3.5 py-1.5 rounded-full transition whitespace-nowrap \${
              selectedCategory === cat.id
                ? 'bg-rose-600 text-white font-black shadow-lg shadow-rose-600/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/[0.06]'
            }\`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: VERTICAL SHORT REELS STREAM (INSTAGRAM-STYLE VERTICAL FEED)         */}
      {/* ========================================================================= */}
      {activeTab === 'reels' && (
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Vertical Reel Phone Frame */}
          <div className="relative w-full max-w-[340px] sm:max-w-[360px] h-[600px] sm:h-[640px] rounded-3xl overflow-hidden bg-black border-2 border-white/[0.12] shadow-2xl shadow-rose-500/10 flex flex-col justify-between">
            {/* Embedded Live Video Player */}
            <video
              key={currentReel.id}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              src={currentReel.videoUrl}
              className="absolute inset-0 w-full h-full object-cover filter brightness-90"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none" />

            {/* Top Reel Bar: Author & Tag */}
            <div className="relative z-20 p-4 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-xs font-black">
                  Ψ
                </div>
                <span className="font-bold text-white drop-shadow">{currentReel.author}</span>
              </div>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/20 hover:scale-105 transition"
              >
                {isMuted ? '🔇 Unmute' : '🔊 Sound ON'}
              </button>
            </div>

            {/* Right Side Social Actions (Insta Style) */}
            <div className="absolute right-3.5 bottom-24 z-20 flex flex-col items-center space-y-4">
              <button
                onClick={() => toggleLikeReel(currentReel.id)}
                className="flex flex-col items-center space-y-1 group"
              >
                <div
                  className={\`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all \${
                    likedReels.includes(currentReel.id)
                      ? 'bg-rose-600 text-white scale-110 shadow-lg shadow-rose-600/40'
                      : 'bg-black/50 text-white border border-white/20 group-hover:bg-black/80'
                  }\`}
                >
                  <span className="text-lg">❤️</span>
                </div>
                <span className="text-[10px] font-mono text-white drop-shadow">
                  {likedReels.includes(currentReel.id) ? currentReel.likes + 1 : currentReel.likes}
                </span>
              </button>

              <button
                onClick={() => toggleSaveReel(currentReel.id)}
                className="flex flex-col items-center space-y-1 group"
              >
                <div
                  className={\`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all \${
                    savedReels.includes(currentReel.id)
                      ? 'bg-cyan-500 text-black scale-110 shadow-lg'
                      : 'bg-black/50 text-white border border-white/20 group-hover:bg-black/80'
                  }\`}
                >
                  <span className="text-base">🔖</span>
                </div>
                <span className="text-[10px] font-mono text-white drop-shadow">
                  {savedReels.includes(currentReel.id) ? 'Saved' : 'Save'}
                </span>
              </button>

              <button
                onClick={() => {
                  alert('Psychological imprint recorded: Reel insights synchronized with your mental model.');
                }}
                className="flex flex-col items-center space-y-1 group"
              >
                <div className="w-10 h-10 rounded-full bg-black/50 text-white border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-black/80">
                  <span className="text-base">🧬</span>
                </div>
                <span className="text-[10px] font-mono text-white drop-shadow">Analyze</span>
              </button>
            </div>

            {/* Bottom Reel Caption & Philosophy Meta */}
            <div className="relative z-20 p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                  {currentReel.philosophy}
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  ● Matched to your Psyche
                </span>
              </div>

              <h3 className="font-extrabold text-sm text-white drop-shadow leading-tight">
                {currentReel.title}
              </h3>

              <p className="text-xs text-zinc-200 drop-shadow italic line-clamp-2">
                &quot;{currentReel.quote}&quot;
              </p>

              <div className="flex flex-wrap gap-1 pt-1">
                {currentReel.tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono text-rose-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Keyboard & Swipe Navigation Controls Overlay */}
            <div className="absolute inset-y-0 -right-14 hidden lg:flex flex-col items-center justify-center space-y-3">
              <button
                onClick={handlePrevReel}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-white/20 text-white flex items-center justify-center hover:bg-zinc-800 transition"
                title="Previous Reel (Arrow Up)"
              >
                ▲
              </button>
              <button
                onClick={handleNextReel}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-white/20 text-white flex items-center justify-center hover:bg-zinc-800 transition"
                title="Next Reel (Arrow Down)"
              >
                ▼
              </button>
            </div>
          </div>

          {/* Right Live Psychological Breakdown Card */}
          <div className="max-w-md w-full space-y-4">
            <div className="p-5 rounded-3xl bg-zinc-950 border border-white/[0.08] shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🧬</span>
                  <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">
                    Cognitive Telemetry HUD
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-rose-400 font-bold">LIVE SYNCED</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase">Detected Archetype</span>
                  <h4 className="font-bold text-white text-sm pt-0.5">{PSYCHE_PROFILE.archetype}</h4>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase">Active Cognitive Stimulus</span>
                  <p className="text-cyan-300 pt-0.5">{currentReel.psychTrait}</p>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase">Dopamine Architecture</span>
                  <p className="text-emerald-400 pt-0.5">High-Value Neuro-Discipline (No Brain Rot)</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                <button
                  onClick={() => setActiveTab('psyche')}
                  className="w-full py-2 bg-gradient-to-r from-rose-500 to-purple-600 hover:scale-105 text-white font-extrabold text-xs rounded-xl shadow-lg transition text-center"
                >
                  View Full Psychological & Philosophical Dossier →
                </button>
              </div>
            </div>

            {/* Quick Preference Dials */}
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/[0.06] space-y-3">
              <span className="text-[10px] font-mono uppercase text-zinc-500">Tune Content to Your Mindset</span>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Stoic Detachment</span>
                  <span className="text-rose-400 font-bold">{zenDetachment}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={zenDetachment}
                  onChange={(e) => setZenDetachment(+e.target.value)}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PSYCHOLOGY & PHILOSOPHY PERSONALITY PROFILER                        */}
      {/* ========================================================================= */}
      {activeTab === 'psyche' && (
        <main className="flex-1 max-w-5xl w-full mx-auto p-6 space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-purple-500/30 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🧠</span>
                  <h2 className="text-xl font-black text-white">{PSYCHE_PROFILE.archetype}</h2>
                </div>
                <p className="text-xs text-purple-400 font-mono pt-1">
                  Cognitive Structure: {PSYCHE_PROFILE.mbtiEquivalent} • Dominant Philosophy: {PSYCHE_PROFILE.dominantPhilosophy}
                </p>
              </div>

              <button
                onClick={handleToggleVoice}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition active:scale-95 flex items-center space-x-2"
              >
                <span>{isVoiceNarrating ? '🔊 Speaking...' : '🗣️ Listen to Personality Breakdown'}</span>
              </button>
            </div>

            {/* Pros & Cons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Pros (Strengths) */}
              <div className="p-5 rounded-2xl bg-zinc-900 border border-emerald-500/30 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase font-mono">
                  <span>✦</span>
                  <span>Cognitive Strengths (Pros)</span>
                </div>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {PSYCHE_PROFILE.pros.map((p, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons (Shadow Traits & Growth Areas) */}
              <div className="p-5 rounded-2xl bg-zinc-900 border border-rose-500/30 space-y-3">
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase font-mono">
                  <span>⚠</span>
                  <span>Shadow Trait Blindspots (Cons)</span>
                </div>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {PSYCHE_PROFILE.cons.map((c, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-rose-400 font-bold">!</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Psychological Dial Radar */}
            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/[0.06] space-y-3 font-mono text-xs">
              <span className="text-[10px] text-zinc-500 uppercase">Interactive Psychological Metrics</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 rounded-xl bg-black/60 border border-white/[0.04]">
                  <span className="text-[10px] text-zinc-500">Introspection</span>
                  <p className="text-lg font-bold text-cyan-400">{introspection}%</p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/[0.04]">
                  <span className="text-[10px] text-zinc-500">Rationality</span>
                  <p className="text-lg font-bold text-emerald-400">{rationality}%</p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/[0.04]">
                  <span className="text-[10px] text-zinc-500">Action Bias</span>
                  <p className="text-lg font-bold text-amber-400">{actionBias}%</p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/[0.04]">
                  <span className="text-[10px] text-zinc-500">Zen Detachment</span>
                  <p className="text-lg font-bold text-purple-400">{zenDetachment}%</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ACTIONABLE MINDSET PRESCRIPTIONS & PHILOSOPHY ADVICE                */}
      {/* ========================================================================= */}
      {activeTab === 'advice' && (
        <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-emerald-500/30 shadow-2xl space-y-6">
            <div className="border-b border-white/[0.08] pb-4 space-y-1">
              <h2 className="text-xl font-black text-white">Actionable Mindset Prescriptions</h2>
              <p className="text-xs text-emerald-400 font-mono">
                Prescribed by AI Cognitive Engine based on your watched reels and psychological profile
              </p>
            </div>

            <div className="space-y-4">
              {PSYCHE_PROFILE.mindsetAdvices.map((advice, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-900 border border-white/[0.06] hover:border-emerald-400 transition flex items-start space-x-3.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-black text-emerald-400 text-xs shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                      {advice}
                    </p>
                    <span className="text-[10px] font-mono text-zinc-500">
                      Target: Resolving Analytical Friction & Building Cognitive Resilience
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Synchronized across 6 languages</span>
              <button
                onClick={() => {
                  alert('Cognitive Dossier exported to LocalStorage and Markdown successfully!');
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl transition"
              >
                Export Mindset Artifact
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
`,
  },
};
