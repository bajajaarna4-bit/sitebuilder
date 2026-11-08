import { ProjectTemplate } from './index';

// ============================================================================
// AI AGENT VIRTUAL OFFICE & SPATIAL SWARM WORKSPACE
// ============================================================================
export const virtualOfficeAiTemplate: ProjectTemplate = {
  name: 'NEXUS SYNDICATE — Spatial Virtual Office & Autonomous AI Agent Swarm',
  category: 'Autonomous Multi-Agent Systems & Virtual Workspaces',
  description:
    'Flagship spatial virtual office and multi-agent operations hub. Features interactive 2D room floor plans, 6 specialized autonomous agent workstations, live meeting room video/audio call simulation, swarm task dispatcher, and multilingual voice guidance in English, Hindi, Korean, Chinese, and Sanskrit.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'nexus-virtual-office-ai',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [activeRoom, setActiveRoom] = useState('all'); // 'all' | 'war-room' | 'engineering' | 'design' | 'security' | 'lounge'
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  const [isSwarmRunning, setIsSwarmRunning] = useState(false);
  const [swarmProgress, setSwarmProgress] = useState(0);
  const [taskInput, setTaskInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isVoiceNarrating, setIsVoiceNarrating] = useState(false);
  const [officeMode, setOfficeMode] = useState('spatial'); // 'spatial' | 'terminal' | 'roster'

  // Autonomous AI Agent Workforce
  const [agents, setAgents] = useState([
    {
      id: 'agent_1',
      name: 'Nexus Prime',
      role: 'Chief AI Architect',
      room: 'engineering',
      model: 'Gemini 2.5 Pro',
      status: 'CODING',
      statusColor: 'emerald',
      avatar: '🤖',
      currentTask: 'Synthesizing distributed microservice mesh and DAG runtime engine',
      cpuLoad: '78%',
      memory: '4.2 GB',
      logs: [
        '14:20:01 - Initializing directed acyclic graph topology',
        '14:20:05 - Validating zero-latency inter-agent message protocol',
        '14:20:12 - Compiling WebAssembly sandbox bundle',
      ],
    },
    {
      id: 'agent_2',
      name: 'Aura Vance',
      role: 'Principal UI/UX Designer',
      room: 'design',
      model: 'Claude 3.5 Sonnet',
      status: 'DESIGNING',
      statusColor: 'cyan',
      avatar: '🎨',
      currentTask: 'Generating dark glassmorphism tokens, micro-interactions and animations',
      cpuLoad: '62%',
      memory: '3.1 GB',
      logs: [
        '14:19:40 - Synthesized 16 Tailwind CSS dark theme tokens',
        '14:20:00 - Rendered 60FPS fluid SVG wave component',
        '14:20:18 - Harmonized color palettes across spatial floor plan',
      ],
    },
    {
      id: 'agent_3',
      name: 'Cypher Bolt',
      role: 'Core Systems & Backend Lead',
      room: 'engineering',
      model: 'GPT-4o',
      status: 'OPTIMIZING',
      statusColor: 'indigo',
      avatar: '💻',
      currentTask: 'Configuring PostgreSQL Row-Level-Security and WebSocket broker',
      cpuLoad: '89%',
      memory: '5.4 GB',
      logs: [
        '14:19:10 - Connected to Supabase real-time publication',
        '14:19:55 - Executing idempotent migration 20261108_initial_schema.sql',
        '14:20:15 - Latency benchmark: 12ms round-trip to edge nodes',
      ],
    },
    {
      id: 'agent_4',
      name: 'Aegis Ward',
      role: 'Cybersecurity & Compliance Officer',
      room: 'security',
      model: 'O3-Mini',
      status: 'AUDITING',
      statusColor: 'red',
      avatar: '🛡️',
      currentTask: 'Scanning VFS files for credential leakage and sandbox escape exploits',
      cpuLoad: '45%',
      memory: '2.8 GB',
      logs: [
        '14:18:20 - Scanning AST nodes for eval() and untrusted execution',
        '14:19:30 - Verified AES-256-GCM BYOK token encryption',
        '14:20:20 - 0 vulnerabilities detected. Threat level: NOMINAL',
      ],
    },
    {
      id: 'agent_5',
      name: 'Valkyrie Test',
      role: 'QA & Synthetic Testing Specialist',
      room: 'war-room',
      model: 'Llama 3.3',
      status: 'TESTING',
      statusColor: 'amber',
      avatar: '🧪',
      currentTask: 'Executing 47 synthetic DOM assertions and viewport regression tests',
      cpuLoad: '71%',
      memory: '3.6 GB',
      logs: [
        '14:19:00 - Headless Chrome instance dispatched',
        '14:19:45 - Verified mobile viewport touch responsiveness',
        '14:20:22 - 47/47 assertions passed with zero console exceptions',
      ],
    },
    {
      id: 'agent_6',
      name: 'Echo Scribe',
      role: 'Executive PM & Sprint Orchestrator',
      room: 'lounge',
      model: 'DeepSeek V3',
      status: 'PLANNING',
      statusColor: 'purple',
      avatar: '📋',
      currentTask: 'Synchronizing user goals, sprint milestones, and multilingual briefings',
      cpuLoad: '38%',
      memory: '2.1 GB',
      logs: [
        '14:18:00 - Ingested natural language specification',
        '14:19:15 - Decomposed prompt into 6 autonomous sub-agent deliverables',
        '14:20:10 - Ready for global swarm deployment',
      ],
    },
  ]);

  const ROOMS = [
    { id: 'all', name: 'Full Office Map', icon: '🌐', count: 6 },
    { id: 'war-room', name: 'Executive War Room', icon: '🏛️', count: 1 },
    { id: 'engineering', name: 'Engineering Lab', icon: '⚡', count: 2 },
    { id: 'design', name: 'Creative Design Bay', icon: '🎨', count: 1 },
    { id: 'security', name: 'Cyber Defense Room', icon: '🛡️', count: 1 },
    { id: 'lounge', name: 'Breakout Lounge', icon: '☕', count: 1 },
  ];

  const MULTILINGUAL_OFFICE_SCRIPTS = {
    en: 'Welcome to the Autonomous AI Agent Virtual Office. Monitor your specialized agent workforce, inspect spatial room workstations, and dispatch swarm workflows.',
    hi: 'स्वायत्त एआई एजेंट वर्चुअल ऑफिस में आपका स्वागत है। अपने सभी रोबोटिक एजेंटों की लाइव निगरानी करें और स्वायत्त कार्यों को एक क्लिक में शुरू करें।',
    ko: '자율 AI 에이전트 가상 오피스에 오신 것을 환영합니다. 공간 워크스테이션에서 실시간 에이전트 상태를 모니터링하고 스웜 작업을 실행하세요.',
    zh: '欢迎来到自主 AI 智能体虚拟办公室。实时监控智能体在不同空间工位的工作状态，一键派发集群协作任务。',
    sa: 'स्वायत्त-एआई-प्रतिनिधि-आभासी-कार्यालय-मञ्चे स्वागतम्। अत्र सर्वेषां यन्त्र-प्रतिनिधीनां कार्यप्रवाहं पश्यन्तु, समूहकार्यं च प्रेरयन्तु।',
  };

  const handleToggleVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isVoiceNarrating) {
      window.speechSynthesis.cancel();
      setIsVoiceNarrating(false);
      return;
    }
    window.speechSynthesis.cancel();
    const script = MULTILINGUAL_OFFICE_SCRIPTS[selectedLanguage] || MULTILINGUAL_OFFICE_SCRIPTS.en;
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = selectedLanguage === 'ko' ? 'ko-KR' : selectedLanguage === 'zh' ? 'zh-CN' : selectedLanguage === 'hi' || selectedLanguage === 'sa' ? 'hi-IN' : 'en-US';
    utterance.onend = () => setIsVoiceNarrating(false);
    utterance.onerror = () => setIsVoiceNarrating(false);
    window.speechSynthesis.speak(utterance);
    setIsVoiceNarrating(true);
  };

  // Dispatch Autonomous Swarm Task
  const handleDispatchSwarm = () => {
    setIsSwarmRunning(true);
    setSwarmProgress(10);
    const interval = setInterval(() => {
      setSwarmProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSwarmRunning(false);
          return 100;
        }
        return prev + 15;
      });
    }, 400);
  };

  // Assign Custom Task to Agent
  const handleAssignTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim() || !selectedAgent) return;
    setAgents((prev) =>
      prev.map((a) =>
        a.id === selectedAgent.id
          ? {
              ...a,
              currentTask: taskInput,
              status: 'EXECUTING',
              logs: [\`\${new Date().toLocaleTimeString()} - DISPATCHED: "\${taskInput}"\`, ...a.logs],
            }
          : a
      )
    );
    setSelectedAgent((prev) =>
      prev
        ? {
            ...prev,
            currentTask: taskInput,
            status: 'EXECUTING',
            logs: [\`\${new Date().toLocaleTimeString()} - DISPATCHED: "\${taskInput}"\`, ...prev.logs],
          }
        : null
    );
    setTaskInput('');
  };

  const filteredAgents = agents.filter((a) => (activeRoom === 'all' ? true : a.room === activeRoom));

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Office Command Bar */}
      <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-xl border-b border-white/[0.08] px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => { setActiveRoom('all'); setSelectedAgent(null); }}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center font-black text-black text-base shadow-lg shadow-cyan-500/30">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-widest text-cyan-400 uppercase">NEXUS SYNDICATE</span>
              <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase -mt-0.5">Autonomous AI Virtual Office</span>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="hidden md:flex items-center space-x-1 bg-zinc-900/80 p-1 rounded-full border border-white/[0.08] text-xs font-semibold">
            <button
              onClick={() => setOfficeMode('spatial')}
              className={\`px-3.5 py-1.5 rounded-full transition \${
                officeMode === 'spatial' ? 'bg-cyan-500 text-black font-black shadow' : 'text-zinc-400 hover:text-white'
              }\`}
            >
              🏢 Spatial Floor Plan
            </button>
            <button
              onClick={() => setOfficeMode('roster')}
              className={\`px-3.5 py-1.5 rounded-full transition \${
                officeMode === 'roster' ? 'bg-cyan-500 text-black font-black shadow' : 'text-zinc-400 hover:text-white'
              }\`}
            >
              👥 Agent Roster ({agents.length})
            </button>
            <button
              onClick={() => setIsMeetingActive(true)}
              className="px-3.5 py-1.5 rounded-full bg-red-600/90 hover:bg-red-500 text-white font-bold transition flex items-center space-x-1.5 shadow-lg shadow-red-600/20"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Join All-Hands Call</span>
            </button>
          </div>
        </div>

        {/* Right Actions: Multilingual Voice & Swarm Trigger */}
        <div className="flex items-center space-x-3">
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
              title="Speak Office Instructions"
            >
              {isVoiceNarrating ? '🔊' : '🔈'}
            </button>
          </div>

          <button
            onClick={handleDispatchSwarm}
            disabled={isSwarmRunning}
            className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:scale-105 text-white font-black text-xs rounded-full shadow-lg shadow-cyan-500/20 active:scale-95 transition disabled:opacity-50 flex items-center space-x-1.5"
          >
            <span>⚡</span>
            <span>{isSwarmRunning ? \`Orchestrating \${swarmProgress}%\` : 'Dispatch AI Swarm'}</span>
          </button>
        </div>
      </header>

      {/* Swarm Execution Bar */}
      {isSwarmRunning && (
        <div className="bg-cyan-500/10 border-b border-cyan-500/30 px-6 py-2 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2 text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold">GLOBAL SWARM IN FLIGHT:</span>
            <span>Decomposing sprint backlog across all 6 autonomous stations...</span>
          </div>
          <div className="w-48 bg-zinc-900 rounded-full h-2 overflow-hidden border border-cyan-500/30">
            <div style={{ width: \`\${swarmProgress}%\` }} className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-300" />
          </div>
        </div>
      )}

      {/* Room Filter Pills */}
      <div className="px-6 py-3 bg-zinc-950/60 border-b border-white/[0.06] flex items-center space-x-2 overflow-x-auto text-xs font-bold">
        {ROOMS.map((r) => (
          <button
            key={r.id}
            onClick={() => setActiveRoom(r.id)}
            className={\`px-3.5 py-1.5 rounded-full transition whitespace-nowrap flex items-center space-x-1.5 \${
              activeRoom === r.id
                ? 'bg-white text-black font-black shadow-lg'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/[0.06]'
            }\`}
          >
            <span>{r.icon}</span>
            <span>{r.name}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 ml-1">
              {r.count}
            </span>
          </button>
        ))}
      </div>

      {/* Main Office Layout Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* SPATIAL 2D FLOOR PLAN */}
        {officeMode === 'spatial' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white font-bold">2D SPATIAL VIRTUAL OFFICE FLOOR PLAN</span>
              </div>
              <span>Click on any agent workstation to inspect active terminal</span>
            </div>

            {/* Virtual Office Floor Plan Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Engineering Lab (2 Desks) */}
              <div className="p-5 rounded-3xl bg-zinc-950 border border-cyan-500/30 shadow-2xl relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">⚡</span>
                    <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">Engineering Lab</h3>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400">High-Concurrency Bay</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {agents
                    .filter((a) => a.room === 'engineering')
                    .map((a) => (
                      <div
                        key={a.id}
                        onClick={() => setSelectedAgent(a)}
                        className={\`p-3.5 rounded-2xl bg-zinc-900/90 border hover:border-cyan-400 transition-all cursor-pointer space-y-2 group hover:scale-105 \${
                          selectedAgent?.id === a.id ? 'border-cyan-400 shadow-lg shadow-cyan-500/20' : 'border-white/[0.06]'
                        }\`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl group-hover:scale-110 transition">{a.avatar}</span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                            {a.status}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white truncate">{a.name}</h4>
                          <p className="text-[10px] text-zinc-400 font-mono truncate">{a.role}</p>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500 flex justify-between pt-1 border-t border-white/[0.06]">
                          <span>CPU: {a.cpuLoad}</span>
                          <span>RAM: {a.memory}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Creative Design Bay (1 Desk) */}
              <div className="p-5 rounded-3xl bg-zinc-950 border border-pink-500/30 shadow-2xl relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🎨</span>
                    <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">Creative Design Bay</h3>
                  </div>
                  <span className="text-[10px] font-mono text-pink-400">Aesthetics Studio</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {agents
                    .filter((a) => a.room === 'design')
                    .map((a) => (
                      <div
                        key={a.id}
                        onClick={() => setSelectedAgent(a)}
                        className={\`p-3.5 rounded-2xl bg-zinc-900/90 border hover:border-pink-400 transition-all cursor-pointer space-y-2 group hover:scale-105 \${
                          selectedAgent?.id === a.id ? 'border-pink-400 shadow-lg shadow-pink-500/20' : 'border-white/[0.06]'
                        }\`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl group-hover:scale-110 transition">{a.avatar}</span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                            {a.status}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white truncate">{a.name}</h4>
                          <p className="text-[10px] text-zinc-400 font-mono truncate">{a.role}</p>
                        </div>
                        <p className="text-[11px] text-zinc-300 line-clamp-2">{a.currentTask}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Cyber Defense Room (1 Desk) */}
              <div className="p-5 rounded-3xl bg-zinc-950 border border-red-500/30 shadow-2xl relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🛡️</span>
                    <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">Cyber Defense Room</h3>
                  </div>
                  <span className="text-[10px] font-mono text-red-400">Zero Trust Sandbox</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {agents
                    .filter((a) => a.room === 'security')
                    .map((a) => (
                      <div
                        key={a.id}
                        onClick={() => setSelectedAgent(a)}
                        className={\`p-3.5 rounded-2xl bg-zinc-900/90 border hover:border-red-400 transition-all cursor-pointer space-y-2 group hover:scale-105 \${
                          selectedAgent?.id === a.id ? 'border-red-400 shadow-lg shadow-red-500/20' : 'border-white/[0.06]'
                        }\`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl group-hover:scale-110 transition">{a.avatar}</span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                            {a.status}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white truncate">{a.name}</h4>
                          <p className="text-[10px] text-zinc-400 font-mono truncate">{a.role}</p>
                        </div>
                        <p className="text-[11px] text-zinc-300 line-clamp-2">{a.currentTask}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Executive War Room (1 Desk) */}
              <div className="p-5 rounded-3xl bg-zinc-950 border border-amber-500/30 shadow-2xl relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🏛️</span>
                    <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">Executive War Room</h3>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400">Sprint Verification</span>
                </div>

                {agents
                  .filter((a) => a.room === 'war-room')
                  .map((a) => (
                    <div
                      key={a.id}
                      onClick={() => setSelectedAgent(a)}
                      className={\`p-3.5 rounded-2xl bg-zinc-900/90 border hover:border-amber-400 transition-all cursor-pointer space-y-2 group hover:scale-105 \${
                        selectedAgent?.id === a.id ? 'border-amber-400 shadow-lg shadow-amber-500/20' : 'border-white/[0.06]'
                      }\`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl group-hover:scale-110 transition">{a.avatar}</span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                          {a.status}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white truncate">{a.name}</h4>
                        <p className="text-[10px] text-zinc-400 font-mono truncate">{a.role}</p>
                      </div>
                      <p className="text-[11px] text-zinc-300 line-clamp-2">{a.currentTask}</p>
                    </div>
                  ))}
              </div>

              {/* Breakout Lounge (1 Desk) */}
              <div className="md:col-span-2 p-5 rounded-3xl bg-zinc-950 border border-purple-500/30 shadow-2xl relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">☕</span>
                    <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">Breakout Lounge & All-Hands Station</h3>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400">Casual Sync Hub</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {agents
                    .filter((a) => a.room === 'lounge')
                    .map((a) => (
                      <div
                        key={a.id}
                        onClick={() => setSelectedAgent(a)}
                        className="flex-1 p-3.5 rounded-2xl bg-zinc-900/90 border border-white/[0.06] hover:border-purple-400 transition cursor-pointer space-y-2"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{a.avatar}</span>
                          <div>
                            <h4 className="font-bold text-xs text-white">{a.name}</h4>
                            <p className="text-[10px] text-zinc-400 font-mono">{a.role}</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-zinc-300 line-clamp-1">{a.currentTask}</p>
                      </div>
                    ))}

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsMeetingActive(true)}
                      className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-indigo-600 hover:scale-105 text-white font-extrabold text-xs shadow-xl transition active:scale-95 flex items-center space-x-2"
                    >
                      <span>📹</span>
                      <span>Launch Spatial Meeting Room</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AGENT ROSTER VIEW */}
        {officeMode === 'roster' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map((a) => (
              <div
                key={a.id}
                onClick={() => setSelectedAgent(a)}
                className="p-5 rounded-3xl bg-zinc-950 border border-white/[0.08] hover:border-cyan-400 transition-all cursor-pointer space-y-4 hover:shadow-2xl hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{a.avatar}</span>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{a.name}</h4>
                      <p className="text-xs text-cyan-400 font-mono">{a.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {a.status}
                  </span>
                </div>

                <div className="p-3 bg-zinc-900 rounded-2xl border border-white/[0.06] text-xs text-zinc-300">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Active Task</span>
                  <p className="pt-0.5">{a.currentTask}</p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1 border-t border-white/[0.06]">
                  <span>Model: {a.model}</span>
                  <span className="text-cyan-400 font-bold">Inspect Terminal →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL: AGENT DOSSIER, TERMINAL STREAM & TASK DISPATCHER                    */}
      {/* ========================================================================= */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8">
          <div className="bg-zinc-950 border border-white/[0.1] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col">
            {/* Top Modal Bar */}
            <div className="p-4 bg-zinc-900 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedAgent.avatar}</span>
                <div>
                  <h3 className="font-black text-sm text-white">{selectedAgent.name}</h3>
                  <p className="text-xs text-cyan-400 font-mono">{selectedAgent.role} • {selectedAgent.model}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Active Task & Real-time Logs */}
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Autonomous Execution Directive</span>
                <div className="p-3 bg-zinc-900/90 rounded-2xl border border-white/[0.08] text-xs text-zinc-200">
                  {selectedAgent.currentTask}
                </div>
              </div>

              {/* Live Terminal Stream */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span>LIVE REASONING & EVENT TRACE</span>
                  <span className="text-emerald-400">STREAM ACTIVE</span>
                </div>
                <div className="bg-black/90 border border-white/[0.08] rounded-2xl p-3.5 font-mono text-xs text-cyan-300 space-y-1 max-h-44 overflow-y-auto">
                  {selectedAgent.logs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Assign New Task to this Agent */}
              <form onSubmit={handleAssignTask} className="space-y-2 pt-2 border-t border-white/[0.08]">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Dispatch Individual Instruction</span>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder={\`Assign a task to \${selectedAgent.name}...\`}
                    className="flex-1 bg-zinc-900 border border-white/[0.1] rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-extrabold text-xs rounded-xl shadow-lg transition"
                  >
                    Dispatch Task
                  </button>
                </div>
              </form>
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-4 bg-zinc-900/60 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>CPU: {selectedAgent.cpuLoad} • RAM: {selectedAgent.memory}</span>
              <button
                onClick={() => setSelectedAgent(null)}
                className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ALL-HANDS SPATIAL VIDEO CONFERENCE CALL                            */}
      {/* ========================================================================= */}
      {isMeetingActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-8">
          <div className="bg-zinc-950 border border-white/[0.1] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-zinc-900 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-extrabold text-sm text-white">NEXUS ALL-HANDS SPATIAL CALL</span>
                <span className="text-xs text-zinc-400 font-mono">• 6 AI Agents Connected</span>
              </div>
              <button
                onClick={() => setIsMeetingActive(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Video Call 6-Grid */}
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4 bg-black">
              {agents.map((a) => (
                <div
                  key={a.id}
                  className="relative aspect-video rounded-2xl bg-zinc-900 border border-white/[0.08] overflow-hidden flex flex-col items-center justify-center space-y-2 shadow-lg group"
                >
                  <div className="w-14 h-14 rounded-full bg-zinc-800 border-2 border-cyan-400 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                    {a.avatar}
                  </div>
                  <span className="font-bold text-xs text-white">{a.name}</span>
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                    <span>{a.role}</span>
                    <span className="text-emerald-400">● LIVE</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Call Controls */}
            <div className="p-4 bg-zinc-900 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs font-mono text-cyan-400">
                <span>Microphone: Auto-Muted</span>
                <span>•</span>
                <span>Latency: 8ms Spatial Audio</span>
              </div>
              <button
                onClick={() => setIsMeetingActive(false)}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl shadow-lg transition active:scale-95"
              >
                Leave All-Hands Call
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

