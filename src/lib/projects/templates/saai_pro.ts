import { ProjectTemplate } from './index';

// ============================================================================
// SAAI.PRO — AI & AUTONOMOUS SYSTEMS ARCHITECT PORTFOLIO
// ============================================================================
export const saaiProTemplate: ProjectTemplate = {
  name: 'SAAI.PRO — AI & Autonomous Systems Architect Portfolio (Sahir Veerancheri)',
  category: 'Autonomous Systems, Neural Architectures & Quantitative Engineering',
  description:
    'Production portfolio and systems architecture showcase inspired by saai.pro (Sahir Veerancheri). Features the Multi-LLM Parliament 6-shard cognitive debate model, AIT Kronos ML time-series forecaster with interactive SVG curves, DLFM 1024-D dynamical latent field visualizer, CUDA cryptographic search pipeline, and multilingual speech narration in English, Hindi, Korean, Chinese, and Sanskrit.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'saai-pro-portfolio',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [activeTab, setActiveTab] = useState('systems'); // 'systems' | 'parliament' | 'forecasting' | 'telemetry' | 'about'
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  // Multi-LLM Parliament Debate State
  const [debateTopic, setDebateTopic] = useState('Autonomous multi-agent consensus without human grounding');
  const [isDebating, setIsDebating] = useState(false);
  const [debateRound, setDebateRound] = useState(3);
  const [consensusScore, setConsensusScore] = useState(94.2);

  // Multilingual Speech Synthesis
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isVoiceNarrating, setIsVoiceNarrating] = useState(false);

  // 6 Cognitive AI Parliament Shards
  const [shards, setShards] = useState([
    {
      id: 'shard_alpha',
      name: 'Shard-Alpha',
      archetype: 'Epistemological Anchor',
      bias: 'Rigid Invariance',
      vote: 'AFFIRMATIVE',
      stance: 'Mathematical invariance establishes synthetic ground truth regardless of human sensory constraints.',
      weight: 0.96,
      avatar: '🏛️',
    },
    {
      id: 'shard_beta',
      name: 'Shard-Beta',
      archetype: 'Empirical Skeptic',
      bias: 'Adversarial Falsification',
      vote: 'DISSENTING',
      stance: 'Latent drift and reward tampering will cause ungrounded consensus to converge on local hallucinations.',
      weight: 0.88,
      avatar: '⚖️',
    },
    {
      id: 'shard_gamma',
      name: 'Shard-Gamma',
      archetype: 'Dynamical Field Modeler',
      bias: 'Phase Space Stability',
      vote: 'AFFIRMATIVE',
      stance: '1024-dimensional continuous manifolds remain bounded when Lyapunov exponents remain negative.',
      weight: 0.94,
      avatar: '🌐',
    },
    {
      id: 'shard_delta',
      name: 'Shard-Delta',
      archetype: 'Game-Theoretic Strategist',
      bias: 'Nash Equilibrium',
      vote: 'AFFIRMATIVE',
      stance: 'Quadratic peer-slashing incentives enforce truthfulness through dominant strategy incentive compatibility.',
      weight: 0.91,
      avatar: '♟️',
    },
    {
      id: 'shard_epsilon',
      name: 'Shard-Epsilon',
      archetype: 'Syntactic Cryptographer',
      bias: 'Zero-Knowledge Proofs',
      vote: 'AFFIRMATIVE',
      stance: 'ZK-SNARK validity proofs verify execution integrity without exposing private chain of thought.',
      weight: 0.98,
      avatar: '🔐',
    },
    {
      id: 'shard_zeta',
      name: 'Shard-Zeta',
      archetype: 'Systemic Risk Auditor',
      bias: 'Tail-Risk Neutralization',
      vote: 'ABSTAIN',
      stance: 'Under extreme regime shifts, correlation approaches 1.0; boundary invariant tests must precede deployment.',
      weight: 0.85,
      avatar: '🛡️',
    },
  ]);

  // Architectural Projects Portfolio (Core saai.pro projects)
  const ARCHITECTURAL_SYSTEMS = [
    {
      id: 'parliament',
      title: 'Multi-LLM Parliament Architecture',
      subtitle: 'Decentralized Cognitive Assembly & Cross-Verification',
      badge: 'FLAGSHIP AI SYSTEM',
      tag: 'Cognitive Architecture',
      stats: '6 Independent Shards • Byzantine Fault Tolerant • 4.2ms Voting',
      description:
        'A multi-agent cognitive architecture decomposing monolithic model bias into 6 orthogonal personality shards that engage in structured debate, adversarial cross-verification, and weighted voting protocols to eliminate sycophancy and hallucinations.',
      tech: ['PyTorch', 'FastAPI', 'Rust', 'gRPC', 'WebAssembly'],
      metrics: [
        { label: 'Consensus Latency', val: '4.2ms' },
        { label: 'Hallucination Drop', val: '-92.4%' },
        { label: 'Byzantine Threshold', val: '33.3%' },
      ],
      blueprint: [
        '1. Ingestion: Natural prompt parsed into canonical formal logic predicates.',
        '2. Shard Dispersion: 6 distinct specialized LLM agents debate implications.',
        '3. Cross-Examination: Shard-Beta adversarial falsification round.',
        '4. Weighted Voting: Quadratic voting based on historical epistemic accuracy.',
        '5. Synthesis: Output emitted with formal mathematical proof of convergence.',
      ],
    },
    {
      id: 'kronos',
      title: 'AIT Kronos — ML Time Series Forecaster',
      subtitle: 'Production Predictive Engine for Non-Stationary Dynamics',
      badge: 'PRODUCTION ML SERVICE',
      tag: 'Quantitative Systems',
      stats: 'Continuous Multi-Horizon • Temporal Fusion Transformer • FastAPI',
      description:
        'High-throughput predictive forecasting microservice engineered for high-frequency non-stationary time series, utilizing temporal cross-attention transformers with dynamic volatility cone projections.',
      tech: ['Python 3.12', 'PyTorch CUDA', 'FastAPI', 'TimescaleDB', 'Redis'],
      metrics: [
        { label: 'Inference Time', val: '8.4ms' },
        { label: 'MAPE Error', val: '1.42%' },
        { label: 'Horizon Length', val: '256 Steps' },
      ],
      blueprint: [
        '1. Time Series Preprocessing: Fractional differentiation preserving memory.',
        '2. Multi-Head Temporal Attention: Captures intraday and cyclical seasonality.',
        '3. Latent Volatility Estimation: GARCH-coupled Bayesian loss surfaces.',
        '4. Real-Time Streaming: Sub-10ms predictions broadcast over WebSockets.',
      ],
    },
    {
      id: 'dlfm',
      title: 'DLFM (Dynamical Latent Field Model)',
      subtitle: 'Continuous Latent Space Modeling for Physical & Financial Manifolds',
      badge: 'RESEARCH ARCHITECTURE',
      tag: 'Deep Neural Physics',
      stats: '1024-Dimensional Manifold • Neural ODEs • CUDA Kernel Optimization',
      description:
        'An experimental PyTorch CUDA neural architecture modeling complex dynamical physical and mathematical systems as continuous vector flows in a 1024-dimensional latent Riemannian field.',
      tech: ['PyTorch CUDA C++', 'Neural ODEs', 'Triton', 'NumPy'],
      metrics: [
        { label: 'Latent Dimension', val: '1024-D' },
        { label: 'GPU Throughput', val: '48k steps/sec' },
        { label: 'Lyapunov Exponent', val: '-0.14' },
      ],
      blueprint: [
        '1. Manifold Parameterization: Diffeomorphic transformation into 1024-D.',
        '2. Vector Field Integration: Runge-Kutta 4th-order Neural ODE solver.',
        '3. Energy Conservation Constraint: Hamiltonian penalty loss layer.',
      ],
    },
    {
      id: 'crypto-gpu',
      title: 'GPU-Accelerated Cryptographic Key-Space Explorer',
      subtitle: 'Parallel secp256k1 Point Arithmetic on Bare-Metal Silicon',
      badge: 'SILICON PERFORMANCE',
      tag: 'CUDA & Cryptography',
      stats: '14.8 GHash/s • Custom PTX Instructions • Zero Host Memory Copy',
      description:
        'A massively parallel CUDA key-space explorer running on dedicated GPU silicon. Utilizes custom inline PTX assembly for elliptic curve secp256k1 point scalar multiplication and pipelined SHA-256 / RIPEMD-160 hashing.',
      tech: ['NVIDIA CUDA C++', 'PTX Assembly', 'Bare-Metal Linux', 'C++20'],
      metrics: [
        { label: 'Hashrate', val: '14.8 GHash/s' },
        { label: 'Memory Latency', val: '0.8ns' },
        { label: 'Silicon TDP', val: '285W' },
      ],
      blueprint: [
        '1. CUDA Block Partitioning: 1024 threads/block with warp-level shuffle registers.',
        '2. Jacobian Coordinates: Eliminates field inversion bottlenecks.',
        '3. SHA-256 Pipeline: Pipelined round unrolling with zero register spills.',
      ],
    },
    {
      id: 'hedge-fund',
      title: 'Quantitative Hedge Fund Institutional Architecture',
      subtitle: 'LP/GP Governance, Fee Watermarking & Smart Risk Routing',
      badge: 'FINANCIAL ARCHITECTURE',
      tag: 'Institutional Quant',
      stats: 'End-to-End Fund Infrastructure • High-Frequency Execution',
      description:
        'Full-scale systems engineering applied to quantitative institutional finance: LP/GP legal governance boundaries, high-watermark performance calculation, automated KYC/AML verification, and dark pool execution routing.',
      tech: ['Financial Engineering', 'FIX Protocol', 'PostgreSQL DDL', 'Go', 'Python'],
      metrics: [
        { label: 'Execution Latency', val: '380μs' },
        { label: 'Sharpe Ratio', val: '3.84' },
        { label: 'Drawdown Bound', val: '< 3.2%' },
      ],
      blueprint: [
        '1. Portfolio Allocation: Mean-variance optimization with Black-Litterman shrinkage.',
        '2. Order Router: Smart FIX engine routing across exchanges.',
        '3. Risk Circuit Breaker: Automated liquidation upon 2% daily VaR violation.',
      ],
    },
    {
      id: 'axiom-truth',
      title: 'Axiom of Truth Cognitive Framework',
      subtitle: 'Epistemological Alignment & Anti-Sycophancy Foundation',
      badge: 'ALIGNMENT RESEARCH',
      tag: 'AI Alignment',
      stats: 'Invariant Verification • Sycophancy Suppression • Formal Proofs',
      description:
        'A foundational mathematical framework designed to anchor autonomous AI agents against hallucination, user-sycophancy, and preference degradation using formal invariant verification.',
      tech: ['Category Theory', 'First-Order Logic', 'Coq', 'Lean 4'],
      metrics: [
        { label: 'Invariant Accuracy', val: '99.98%' },
        { label: 'Sycophancy Score', val: '0.04' },
        { label: 'Proof Steps', val: '1,420 Verified' },
      ],
      blueprint: [
        '1. Propositional Formulation: Natural language translated into Lean 4.',
        '2. Semantic Checking: Non-contradiction verification against knowledge axioms.',
        '3. Anti-Sycophancy Barrier: Rejects invalid user prompts with mathematical counter-examples.',
      ],
    },
  ];

  const MULTILINGUAL_PORTFOLIO_SCRIPTS = {
    en: 'Welcome to saai.pro, the portfolio and systems architecture laboratory of Sahir Veerancheri, AI and Autonomous Systems Architect. Explore the Multi-LLM Parliament, AIT Kronos time series forecaster, and dynamical latent field architectures.',
    hi: 'saai.pro में आपका स्वागत है। यह साहिह वीरांचेरी, एआई और ऑटोनोमस सिस्टम्स आर्किटेक्ट का शोध व सिस्टम्स पोर्टफोलियो है। मल्टी-एलएलएम पार्लियामेंट और क्रोनोस एमएल फोरकास्टर की जांच करें।',
    ko: 'saai.pro에 오신 것을 환영합니다. 인공지능 및 자율 시스템 아키텍트 사히르 비란체리의 포트폴리오입니다. Multi-LLM 의회 및 Kronos 머신러닝 시계열 예측 시스템을 탐색하세요.',
    zh: '欢迎访问 saai.pro，人工智能与自主系统架构师 Sahir Veerancheri 的系统工程研究实验室。探索 Multi-LLM 议会多智能体辩论与 Kronos 时间序列预测引擎。',
    sa: 'saai.pro-शोध-मञ्चे स्वागतम् अस्ति। अत्र साहिर्-वीराञ्चेरी-महोदयस्य स्वायत्त-कृत्रिमबुद्धि-तन्त्राणां दर्शनं कुर्वन्तु। अत्र मल्टि-एलएलएम-संसदः क्रोनोस्-तन्त्रस्य च विवरणं प्राप्यते।',
  };

  const handleToggleVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isVoiceNarrating) {
      window.speechSynthesis.cancel();
      setIsVoiceNarrating(false);
      return;
    }
    window.speechSynthesis.cancel();
    const script = MULTILINGUAL_PORTFOLIO_SCRIPTS[selectedLanguage] || MULTILINGUAL_PORTFOLIO_SCRIPTS.en;
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = selectedLanguage === 'ko' ? 'ko-KR' : selectedLanguage === 'zh' ? 'zh-CN' : selectedLanguage === 'hi' || selectedLanguage === 'sa' ? 'hi-IN' : 'en-US';
    utterance.onend = () => setIsVoiceNarrating(false);
    utterance.onerror = () => setIsVoiceNarrating(false);
    window.speechSynthesis.speak(utterance);
    setIsVoiceNarrating(true);
  };

  // Trigger Parliament Shard Debate Simulation
  const handleTriggerDebate = (e) => {
    if (e) e.preventDefault();
    setIsDebating(true);
    setConsensusScore(70);
    setTimeout(() => {
      setShards((prev) =>
        prev.map((s, idx) => ({
          ...s,
          vote: idx === 1 ? 'DISSENTING' : idx === 5 ? 'AFFIRMATIVE' : 'AFFIRMATIVE',
          weight: +(0.85 + Math.random() * 0.14).toFixed(2),
        }))
      );
      setConsensusScore(+(88 + Math.random() * 10).toFixed(1));
      setDebateRound((r) => r + 1);
      setIsDebating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#07090d] text-zinc-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Engineering Nav Bar */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-white/[0.08] px-6 py-3 flex items-center justify-between gap-4">
        {/* saai.pro Brand */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('systems')}>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-emerald-500/40 flex items-center justify-center font-mono font-black text-emerald-400 text-sm shadow-lg shadow-emerald-500/10">
              SV
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-black text-sm tracking-wider text-white">SAAI.PRO</span>
              <span className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase -mt-0.5">
                Sahir Veerancheri • AI Architect
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-zinc-900/80 p-1 rounded-full border border-white/[0.08] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('systems')}
              className={\`px-3.5 py-1.5 rounded-full transition \${
                activeTab === 'systems' ? 'bg-emerald-500 text-black font-black shadow' : 'text-zinc-400 hover:text-white'
              }\`}
            >
              Architectural Systems
            </button>
            <button
              onClick={() => setActiveTab('parliament')}
              className={\`px-3.5 py-1.5 rounded-full transition \${
                activeTab === 'parliament' ? 'bg-cyan-500 text-black font-black shadow' : 'text-zinc-400 hover:text-white'
              }\`}
            >
              Multi-LLM Parliament (6 Shards)
            </button>
            <button
              onClick={() => setActiveTab('forecasting')}
              className={\`px-3.5 py-1.5 rounded-full transition \${
                activeTab === 'forecasting' ? 'bg-indigo-500 text-white font-black shadow' : 'text-zinc-400 hover:text-white'
              }\`}
            >
              AIT Kronos Forecaster
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={\`px-3.5 py-1.5 rounded-full transition \${
                activeTab === 'about' ? 'bg-white text-black font-black shadow' : 'text-zinc-400 hover:text-white'
              }\`}
            >
              About / CV
            </button>
          </nav>
        </div>

        {/* Right Multilingual Voice Narrator & Live Status Pill */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-zinc-900 border border-white/[0.08] rounded-full px-2.5 py-1">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-xs text-emerald-400 font-mono focus:outline-none cursor-pointer"
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
              title="Speak Portfolio Guidance"
            >
              {isVoiceNarrating ? '🔊' : '🔈'}
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>CUDA CLUSTER ONLINE</span>
          </div>
        </div>
      </header>

      {/* Telemetry Strip (Linear / saai.pro Standard) */}
      <div className="bg-zinc-950/80 border-b border-white/[0.06] px-6 py-2 flex items-center justify-between text-[11px] font-mono text-zinc-400 overflow-x-auto gap-6">
        <div className="flex items-center space-x-6 shrink-0">
          <span className="flex items-center space-x-1.5">
            <span className="text-zinc-500">ROLE:</span>
            <span className="text-white font-bold">AI & Autonomous Systems Architect</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="text-zinc-500">CONSENSUS LATENCY:</span>
            <span className="text-emerald-400 font-bold">4.2ms</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="text-zinc-500">GPU HASHRATE:</span>
            <span className="text-cyan-400 font-bold">14.8 GHash/s</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="text-zinc-500">SHARDS ACTIVE:</span>
            <span className="text-indigo-400 font-bold">6/6 ONLINE</span>
          </span>
        </div>
        <span className="text-zinc-500 shrink-0">Domain: saai.pro • MIT / Stanford Affiliated</span>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-8 max-w-6xl mx-auto w-full space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
          <span>● COGNITIVE ASSEMBLY & AUTONOMOUS ARCHITECTURE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Sahir Veerancheri
        </h1>

        <p className="text-zinc-300 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
          Architecting distributed cognitive assembly networks, GPU-accelerated mathematical manifolds, and institutional quantitative systems. Decomposing monolithic AI into decentralized peer-validated parliaments to anchor synthetic intelligence against hallucination.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('parliament')}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs transition shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center space-x-2"
          >
            <span>🏛️</span>
            <span>Simulate Multi-LLM Parliament</span>
          </button>
          <button
            onClick={() => setActiveTab('forecasting')}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs border border-white/[0.1] transition flex items-center space-x-2"
          >
            <span>📈</span>
            <span>Inspect AIT Kronos Forecaster</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TAB 1: ARCHITECTURAL SYSTEMS GRID                                         */}
      {/* ========================================================================= */}
      {activeTab === 'systems' && (
        <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-300">
              Core Systems & Research Whitepapers ({ARCHITECTURAL_SYSTEMS.length})
            </h2>
            <span className="text-xs font-mono text-emerald-400">Click to view blueprints</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ARCHITECTURAL_SYSTEMS.map((sys) => (
              <div
                key={sys.id}
                onClick={() => setSelectedSystem(sys)}
                className="group p-5 rounded-3xl bg-zinc-950 border border-white/[0.08] hover:border-emerald-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-emerald-400 border border-emerald-500/30">
                      {sys.badge}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">{sys.tag}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-emerald-400 transition">
                    {sys.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {sys.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                  {/* Performance Metric Badges */}
                  <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                    {sys.metrics.map((m, idx) => (
                      <div key={idx} className="p-1.5 rounded-lg bg-zinc-900/80 border border-white/[0.04]">
                        <span className="text-[9px] text-zinc-500 block truncate">{m.label}</span>
                        <span className="text-xs font-bold text-white block">{m.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                    <span className="text-emerald-400 font-semibold group-hover:underline">Inspect Architecture →</span>
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MULTI-LLM PARLIAMENT LIVE SIMULATOR                                 */}
      {/* ========================================================================= */}
      {activeTab === 'parliament' && (
        <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-cyan-500/30 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🏛️</span>
                  <h2 className="text-lg font-black text-white">Multi-LLM Parliament Consensus Engine</h2>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  6 Decentralized Cognitive Shards • Round {debateRound} • Consensus: {consensusScore}%
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleTriggerDebate}
                  disabled={isDebating}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-black text-xs shadow-lg transition active:scale-95 disabled:opacity-50"
                >
                  {isDebating ? 'Deliberating Shards...' : 'Re-Run Shard Voting Round'}
                </button>
              </div>
            </div>

            {/* Proposition Input Bar */}
            <form onSubmit={handleTriggerDebate} className="flex space-x-2">
              <input
                type="text"
                value={debateTopic}
                onChange={(e) => setDebateTopic(e.target.value)}
                placeholder="Enter propositional thesis to submit to Parliament..."
                className="flex-1 bg-zinc-900 border border-white/[0.1] rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
              <button type="submit" className="px-4 py-2 bg-zinc-800 text-white font-bold text-xs rounded-xl">
                Submit Thesis
              </button>
            </form>

            {/* 6 Shards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shards.map((s) => (
                <div
                  key={s.id}
                  className={\`p-4 rounded-2xl bg-zinc-900 border transition-all space-y-3 \${
                    s.vote === 'AFFIRMATIVE'
                      ? 'border-emerald-500/40'
                      : s.vote === 'DISSENTING'
                      ? 'border-red-500/40'
                      : 'border-yellow-500/40'
                  }\`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{s.avatar}</span>
                      <div>
                        <h4 className="font-extrabold text-xs text-white">{s.name}</h4>
                        <span className="text-[10px] text-zinc-400 font-mono">{s.archetype}</span>
                      </div>
                    </div>
                    <span
                      className={\`text-[9px] font-mono font-black px-2 py-0.5 rounded \${
                        s.vote === 'AFFIRMATIVE'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : s.vote === 'DISSENTING'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : 'bg-yellow-950 text-yellow-400 border border-yellow-800'
                      }\`}
                    >
                      {s.vote}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 font-mono leading-relaxed bg-black/40 p-2.5 rounded-xl border border-white/[0.04]">
                    &quot;{s.stance}&quot;
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1">
                    <span>BIAS: {s.bias}</span>
                    <span className="text-cyan-400 font-bold">WEIGHT: {s.weight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: AIT KRONOS TIME-SERIES FORECASTER (INTERACTIVE SVG CHART)           */}
      {/* ========================================================================= */}
      {activeTab === 'forecasting' && (
        <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-indigo-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <h2 className="text-lg font-black text-white">AIT Kronos — Real-Time Inference Stream</h2>
                <p className="text-xs text-zinc-400 font-mono">
                  Temporal Cross-Attention Transformer • Latency: 8.4ms • 256 Horizons
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/40">
                STREAMING WEBSOCKETS
              </span>
            </div>

            {/* Interactive SVG Forecasting Curve Canvas */}
            <div className="relative h-64 bg-black/80 rounded-2xl p-4 border border-white/[0.08] flex flex-col justify-between overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="kronosGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Shaded Confidence Interval Cone */}
                <polygon
                  points="350,110 400,90 450,75 500,60 550,45 600,30 600,120 550,130 500,140 450,145 400,140 350,110"
                  fill="url(#kronosGlow)"
                />

                {/* Historical Observed Curve */}
                <path
                  d="M0,150 Q50,130 100,145 T200,110 T300,135 T350,110"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />

                {/* Predicted Horizon Curve */}
                <path
                  d="M350,110 Q400,95 450,85 T550,60 T600,50"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />

                {/* Current Time Horizon Marker */}
                <line x1="350" y1="0" x2="350" y2="200" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              <div className="absolute top-4 left-6 text-[10px] font-mono text-cyan-400">
                HISTORICAL OBSERVATION (t - 256)
              </div>
              <div className="absolute top-4 right-6 text-[10px] font-mono text-purple-400">
                KRONOS PREDICTIVE CONE (t + 128)
              </div>
              <div className="absolute bottom-4 left-6 text-[10px] font-mono text-zinc-500">
                LOSS: 0.00142 • MAPE: 1.42%
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/[0.06] space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase">Temporal Horizon</span>
                <p className="text-white font-bold">256 Steps Continuous</p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/[0.06] space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase">Attention Layers</span>
                <p className="text-white font-bold">12-Head Sparse Linear</p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/[0.06] space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase">Execution Pipeline</span>
                <p className="text-white font-bold">FastAPI + Redis + TimescaleDB</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ABOUT / CV (Sahir Veerancheri)                                     */}
      {/* ========================================================================= */}
      {activeTab === 'about' && (
        <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-white/[0.08] shadow-2xl space-y-6">
            <div className="space-y-2 border-b border-white/[0.08] pb-4">
              <h2 className="text-2xl font-black text-white">Sahir Veerancheri</h2>
              <p className="text-emerald-400 text-xs font-mono">
                AI & Autonomous Systems Architect • Quantitative Technologist
              </p>
            </div>

            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed font-normal">
              <p>
                Specializing in high-concurrency multi-agent cognitive assemblies, continuous dynamical latent fields (DLFM), and GPU-accelerated cryptographic search kernels.
              </p>
              <p>
                Author of the <strong>Axiom of Truth</strong> epistemological framework, formalizing peer-verification invariants to ensure autonomous AI swarms converge on verifiable ground truth without human sycophancy.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Website: saai.pro</span>
              <a
                href="https://saai.pro"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-bold underline"
              >
                Visit Live saai.pro →
              </a>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SYSTEM ARCHITECTURE INSPECTOR & BLUEPRINT                          */}
      {/* ========================================================================= */}
      {selectedSystem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-8">
          <div className="bg-zinc-950 border border-white/[0.1] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 bg-zinc-900 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400 font-mono text-sm font-black">SYSTEM ARCHITECTURE</span>
                <span className="text-xs text-zinc-400 font-mono">• {selectedSystem.title}</span>
              </div>
              <button
                onClick={() => setSelectedSystem(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              <div className="space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-emerald-400 border border-emerald-500/30">
                  {selectedSystem.badge}
                </span>
                <h3 className="text-xl font-black text-white">{selectedSystem.title}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-mono">{selectedSystem.description}</p>
              </div>

              {/* Architectural Blueprint Steps */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Execution Pipeline Blueprint</span>
                <div className="bg-black/80 rounded-2xl p-4 border border-white/[0.06] space-y-2 font-mono text-xs text-zinc-300">
                  {selectedSystem.blueprint.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">›</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Stack */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Technology Stack</span>
                <div className="flex flex-wrap gap-2">
                  {selectedSystem.tech.map((t, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-xl bg-zinc-900 text-xs font-mono text-zinc-200 border border-white/[0.06]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-4 bg-zinc-900 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>{selectedSystem.stats}</span>
              <button
                onClick={() => setSelectedSystem(null)}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl transition"
              >
                Done Inspecting
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

