import { ProjectTemplate } from './index';

// ============================================================================
// 1. UBER + RAPIDO + OLA RIDE-HAILING CLONE (Flagship Mobility Suite)
// ============================================================================
export const uberRapidoOlaClone: ProjectTemplate = {
  name: 'OmniRide — Uber, Rapido & Ola Unified Mobility Platform',
  category: 'Mobility & Ride-Hailing',
  description: 'Unified multi-modal transit application combining Rapido bike-taxis, Ola autos, and Uber premium sedans with live fare calculation, GPS route simulation, OTP verification, and driver tracking.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'omniride-transit',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [pickup, setPickup] = useState('Cyber Hub, DLF Phase 2');
  const [destination, setDestination] = useState('Indira Gandhi Intl Airport (T3)');
  const [activeTab, setActiveTab] = useState('all'); // all | bike | auto | cab
  const [selectedRide, setSelectedRide] = useState('rapido_bike');
  const [rideStatus, setRideStatus] = useState('idle'); // idle | searching | confirmed | in_transit | completed
  const [driverOtp, setDriverOtp] = useState('7294');
  const [driverEta, setDriverEta] = useState(3);
  const [isSosActive, setIsSosActive] = useState(false);

  const RIDE_OPTIONS = [
    {
      id: 'rapido_bike',
      type: 'bike',
      brand: 'Rapido',
      name: 'Rapido Bike-Taxi',
      badge: 'FASTEST IN TRAFFIC',
      badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
      eta: '2 mins away',
      price: 65,
      capacity: '1 Rider',
      icon: '🏍️',
      description: 'Zip through rush-hour traffic with verified helmet-wearing captains.',
    },
    {
      id: 'ola_auto',
      type: 'auto',
      brand: 'Ola',
      name: 'Ola Auto Express',
      badge: 'POCKET FRIENDLY',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      eta: '4 mins away',
      price: 110,
      capacity: '3 Riders',
      icon: '🛺',
      description: 'Doorstep pickup at guaranteed meter-free fixed rates.',
    },
    {
      id: 'uber_go',
      type: 'cab',
      brand: 'Uber',
      name: 'UberGo AC',
      badge: 'TOP VALUE',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
      eta: '5 mins away',
      price: 240,
      capacity: '4 Riders',
      icon: '🚗',
      description: 'Affordable, compact air-conditioned hatchbacks.',
    },
    {
      id: 'uber_premier',
      type: 'cab',
      brand: 'Uber',
      name: 'Uber Premier Sedan',
      badge: 'LUXURY COMFORT',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
      eta: '7 mins away',
      price: 360,
      capacity: '4 Riders',
      icon: '🚘',
      description: 'High-rated drivers with premium sedans and extra legroom.',
    },
  ];

  const filteredRides = activeTab === 'all' ? RIDE_OPTIONS : RIDE_OPTIONS.filter((r) => r.type === activeTab);
  const chosenRide = RIDE_OPTIONS.find((r) => r.id === selectedRide) || RIDE_OPTIONS[0];

  const handleBookRide = () => {
    setRideStatus('searching');
    setTimeout(() => {
      setRideStatus('confirmed');
    }, 1800);
  };

  const handleCancelRide = () => {
    setRideStatus('idle');
  };

  return (
    <div className="min-h-screen bg-[#0a0d12] text-zinc-100 flex flex-col font-sans select-none">
      {/* Top Mobility Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-500 via-emerald-500 to-cyan-500 flex items-center justify-center text-black font-black text-lg shadow-lg">
            ⚡
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-sm tracking-wide text-white">OmniRide</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-yellow-400 border border-yellow-500/30">
                Rapido • Ola • Uber
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono">Unified Urban Mobility Aggregator</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSosActive(!isSosActive)}
            className={\`px-3 py-1 rounded-full text-xs font-bold transition flex items-center space-x-1 border \${
              isSosActive ? 'bg-red-600 text-white border-red-500 animate-pulse' : 'bg-red-950/40 text-red-400 border-red-800/60 hover:bg-red-900/50'
            }\`}
          >
            <span>🚨</span>
            <span>{isSosActive ? 'SOS SIGNAL BROADCASTING' : 'Safety SOS'}</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-200">
            AR
          </div>
        </div>
      </header>

      {/* Main Grid: Left Controls & Right Map Simulation */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Side: Booking & Transit Manager */}
        <section className="lg:col-span-5 p-6 border-r border-zinc-800/80 overflow-y-auto space-y-5 bg-zinc-950/50">
          {/* Pickup and Drop Box */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center space-x-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shrink-0" />
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Current Pickup Location"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-3 h-3 rounded-full bg-yellow-500 ring-4 ring-yellow-500/20 shrink-0" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to go?"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 font-medium"
              />
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800 text-xs font-bold text-center">
            {[
              { id: 'all', label: 'All Rides' },
              { id: 'bike', label: 'Rapido Bike' },
              { id: 'auto', label: 'Ola Auto' },
              { id: 'cab', label: 'Uber Cabs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={\`py-2 rounded-lg transition \${
                  activeTab === tab.id ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
                }\`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Rides List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>AVAILABLE CAPTAINS (14 NEARBY)</span>
              <span>LOWEST FARE GUARANTEED</span>
            </div>

            {filteredRides.map((ride) => {
              const isSelected = selectedRide === ride.id;
              return (
                <div
                  key={ride.id}
                  onClick={() => setSelectedRide(ride.id)}
                  className={\`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 \${
                    isSelected
                      ? 'bg-zinc-900 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xl'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
                  }\`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-2xl">
                      {ride.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-extrabold text-sm text-white">{ride.name}</h3>
                        <span className={\`text-[9px] font-mono px-1.5 py-0.5 rounded border \${ride.badgeColor}\`}>
                          {ride.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{ride.description}</p>
                      <div className="flex items-center space-x-3 text-[10px] text-zinc-500 font-mono mt-1">
                        <span>⏱ {ride.eta}</span>
                        <span>👥 {ride.capacity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-extrabold text-lg text-emerald-400 font-mono">₹{ride.price}</div>
                    <div className="text-[10px] text-zinc-500 line-through">₹{Math.round(ride.price * 1.25)}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Booking / Status Drawer */}
          {rideStatus === 'idle' && (
            <button
              onClick={handleBookRide}
              className="w-full py-3.5 bg-gradient-to-r from-yellow-500 via-emerald-500 to-cyan-500 hover:opacity-95 text-black font-extrabold text-sm rounded-xl transition shadow-xl shadow-cyan-500/10 flex items-center justify-center space-x-2"
            >
              <span>Book {chosenRide.name} • ₹{chosenRide.price}</span>
              <span>→</span>
            </button>
          )}

          {rideStatus === 'searching' && (
            <div className="bg-zinc-900 border border-cyan-500/40 rounded-2xl p-5 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h4 className="font-bold text-sm text-white">Connecting with Nearby Captains...</h4>
                <p className="text-xs text-zinc-400 mt-1">Broadcasting request to Rapido, Ola & Uber drivers within 3 km</p>
              </div>
            </div>
          )}

          {rideStatus === 'confirmed' && (
            <div className="bg-zinc-900 border border-emerald-500/60 rounded-2xl p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-extrabold text-xs text-emerald-400 uppercase tracking-wider">Captain Arriving in {driverEta} mins</span>
                </div>
                <div className="bg-zinc-800 px-3 py-1 rounded-lg text-xs font-mono font-black text-yellow-400 border border-zinc-700">
                  OTP: {driverOtp}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xl">
                    👨🏻‍✈️
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Rajesh Kumar</h4>
                    <p className="text-xs text-zinc-400 font-mono">DL 03 AB 4921 • White Swift Dzire</p>
                    <span className="text-[10px] text-yellow-400 font-bold">★ 4.92 (1,480 rides)</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => alert('Calling Captain Rajesh at +91 98765 43210 (Masked Number)')}
                    className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-sm text-emerald-300 hover:bg-emerald-900"
                  >
                    📞
                  </button>
                  <button
                    onClick={() => alert('Opening in-app chat with Captain Rajesh.')}
                    className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-700/60 flex items-center justify-center text-sm text-cyan-300 hover:bg-cyan-900"
                  >
                    💬
                  </button>
                </div>
              </div>

              <button
                onClick={handleCancelRide}
                className="w-full py-2 bg-zinc-800 hover:bg-red-950/40 hover:text-red-400 hover:border-red-800 border border-zinc-700 text-xs font-bold text-zinc-300 rounded-xl transition"
              >
                Cancel Ride
              </button>
            </div>
          )}
        </section>

        {/* Right Side: GPS Map & Telemetry Simulator */}
        <section className="lg:col-span-7 bg-[#0f141c] relative flex flex-col justify-between p-6">
          {/* Simulated Dark GPS Map Canvas */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Simulated Vector Route Line */}
          <div className="relative z-10 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl">
            <div>
              <div className="text-[10px] font-mono uppercase text-zinc-400">Total Route Distance</div>
              <div className="font-extrabold text-base text-white font-mono">18.4 km • 32 mins</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase text-zinc-400">Traffic Condition</div>
              <span className="text-xs font-bold text-emerald-400">Light / Moderate on Expressway</span>
            </div>
          </div>

          {/* Live Dynamic Map Landmarks */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center space-y-6">
            <div className="relative w-full max-w-md h-64 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 overflow-hidden shadow-2xl flex flex-col justify-between">
              {/* Pickup Pin */}
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-black text-black">A</span>
                <span className="text-xs font-bold text-zinc-200">{pickup}</span>
              </div>

              {/* Moving Ride Pin */}
              <div className="flex items-center justify-center space-x-2 py-4">
                <div className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-yellow-500/50 shadow-xl flex items-center space-x-2 animate-bounce">
                  <span className="text-lg">{chosenRide.icon}</span>
                  <span className="text-xs font-mono font-bold text-yellow-300">{chosenRide.brand} Driver En Route</span>
                </div>
              </div>

              {/* Destination Pin */}
              <div className="flex items-center space-x-2 justify-end">
                <span className="text-xs font-bold text-zinc-200">{destination}</span>
                <span className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-[9px] font-black text-black">B</span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="relative z-10 grid grid-cols-3 gap-3">
            <div className="bg-zinc-950/80 border border-zinc-800 p-3 rounded-xl">
              <div className="text-[10px] font-mono text-zinc-400">GPS TELEMETRY</div>
              <div className="text-xs font-bold text-cyan-400 mt-0.5">28.4981° N, 77.0924° E</div>
            </div>
            <div className="bg-zinc-950/80 border border-zinc-800 p-3 rounded-xl">
              <div className="text-[10px] font-mono text-zinc-400">FARES CHECKED</div>
              <div className="text-xs font-bold text-emerald-400 mt-0.5">3 APIs Synced (Rapido, Ola, Uber)</div>
            </div>
            <div className="bg-zinc-950/80 border border-zinc-800 p-3 rounded-xl">
              <div className="text-[10px] font-mono text-zinc-400">SURGE MULTIPLIER</div>
              <div className="text-xs font-bold text-yellow-400 mt-0.5">1.0x (Standard Fare)</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
`,
  },
};

// ============================================================================
// 2. WHATSAPP WEB CLONE
// ============================================================================
export const whatsappClone: ProjectTemplate = {
  name: 'WhatsApp Web — Instant Messaging & Group Calls',
  category: 'Messaging & Communication',
  description: 'Full WhatsApp Web interface with chat list, message bubbles, audio recording player, emoji reactions, read receipts, and voice/video calling drawer.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'whatsapp-web-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [activeChatId, setActiveChatId] = useState('1');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [callModal, setCallModal] = useState(false);

  const [chats, setChats] = useState([
    {
      id: '1',
      name: 'NEXUS Autonomous Devs',
      avatar: '🚀',
      lastMessage: 'All 10 specialized agent roles deployed successfully.',
      time: '12:45 PM',
      unread: 0,
      online: true,
      messages: [
        { id: 'm1', sender: 'agent', text: 'Supabase schema synchronized and RLS policies active.', time: '12:40 PM', status: 'read' },
        { id: 'm2', sender: 'me', text: 'Can we also verify the live video streaming and map modules?', time: '12:42 PM', status: 'read' },
        { id: 'm3', sender: 'agent', text: 'All 10 specialized agent roles deployed successfully.', time: '12:45 PM', status: 'read' },
      ],
    },
    {
      id: '2',
      name: 'Aarav Patel (Design Lead)',
      avatar: '🎨',
      lastMessage: 'Sent the Figma tokens for the dark charcoal theme.',
      time: '11:15 AM',
      unread: 2,
      online: true,
      messages: [
        { id: 'm1', sender: 'them', text: 'Hey, review the mobile viewport constraints.', time: '11:10 AM', status: 'read' },
        { id: 'm2', sender: 'them', text: 'Sent the Figma tokens for the dark charcoal theme.', time: '11:15 AM', status: 'read' },
      ],
    },
    {
      id: '3',
      name: 'Sarah Jenkins',
      avatar: '👩🏼‍💻',
      lastMessage: 'Let us hop on a quick WhatsApp video call.',
      time: 'Yesterday',
      unread: 0,
      online: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Let us hop on a quick WhatsApp video call.', time: 'Yesterday', status: 'read' },
      ],
    },
  ]);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: 'msg_' + Date.now(),
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            lastMessage: inputText,
            time: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
    setInputText('');
  };

  return (
    <div className="h-screen bg-[#111b21] text-zinc-100 flex font-sans overflow-hidden select-none">
      {/* Left Chat List Column */}
      <div className="w-80 md:w-96 bg-[#111b21] border-r border-[#222e35] flex flex-col shrink-0">
        {/* WhatsApp Header */}
        <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between">
          <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold">
            💬
          </div>
          <div className="flex items-center space-x-3 text-zinc-400 text-sm">
            <span className="cursor-pointer hover:text-white" title="Status Stories">⭕</span>
            <span className="cursor-pointer hover:text-white" title="New Chat">📝</span>
            <span className="cursor-pointer hover:text-white" title="Menu">⋮</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-2 border-b border-[#222e35]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or start new chat"
            className="w-full bg-[#202c33] rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
          />
        </div>

        {/* Chat List Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#222e35]/40">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={\`flex items-center px-4 py-3 cursor-pointer transition \${
                activeChatId === chat.id ? 'bg-[#2a3942]' : 'hover:bg-[#202c33]'
              }\`}
            >
              <div className="w-11 h-11 rounded-full bg-[#202c33] border border-[#2a3942] flex items-center justify-center text-xl shrink-0 mr-3 relative">
                {chat.avatar}
                {chat.online && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#111b21] absolute bottom-0 right-0" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-zinc-100 truncate">{chat.name}</h4>
                  <span className="text-[10px] text-zinc-400 font-mono">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[11px] text-zinc-400 truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-bold font-mono">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Conversation Column */}
      <div className="flex-1 flex flex-col bg-[#0b141a] relative">
        {/* Chat Top Bar */}
        <div className="bg-[#202c33] px-6 py-3 flex items-center justify-between border-b border-[#222e35]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#2a3942] flex items-center justify-center text-lg">
              {activeChat.avatar}
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">{activeChat.name}</h3>
              <p className="text-[10px] text-emerald-400 font-mono">
                {activeChat.online ? 'online' : 'last seen recently'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-zinc-300 text-sm">
            <button
              onClick={() => setCallModal(true)}
              className="p-2 hover:bg-[#2a3942] rounded-full transition text-emerald-400"
              title="Voice Call"
            >
              📞
            </button>
            <button
              onClick={() => setCallModal(true)}
              className="p-2 hover:bg-[#2a3942] rounded-full transition text-cyan-400"
              title="Video Call"
            >
              📹
            </button>
            <button className="p-2 hover:bg-[#2a3942] rounded-full transition text-zinc-400">
              🔍
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]">
          {activeChat.messages.map((m) => {
            const isMe = m.sender === 'me';
            return (
              <div key={m.id} className={\`flex \${isMe ? 'justify-end' : 'justify-start'}\`}>
                <div
                  className={\`max-w-md px-3.5 py-2 rounded-xl text-xs space-y-1 shadow-md \${
                    isMe
                      ? 'bg-[#005c4b] text-white rounded-tr-none'
                      : 'bg-[#202c33] text-zinc-200 rounded-tl-none'
                  }\`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <div className="flex items-center justify-end space-x-1 text-[9px] text-zinc-400 font-mono">
                    <span>{m.time}</span>
                    {isMe && <span className="text-cyan-300">✓✓</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Input Area */}
        <form onSubmit={handleSendMessage} className="bg-[#202c33] px-4 py-3 flex items-center space-x-3">
          <button type="button" className="text-zinc-400 hover:text-white text-lg">
            😊
          </button>
          <button type="button" className="text-zinc-400 hover:text-white text-lg">
            📎
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message"
            className="flex-1 bg-[#2a3942] text-white rounded-lg px-4 py-2 text-xs placeholder-zinc-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-black font-extrabold flex items-center justify-center transition"
          >
            ➤
          </button>
        </form>

        {/* Calling Modal Overlay */}
        {callModal && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <div className="bg-[#202c33] border border-[#2a3942] rounded-2xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-emerald-600/30 border-2 border-emerald-500 flex items-center justify-center text-4xl mx-auto animate-pulse">
                {activeChat.avatar}
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white">{activeChat.name}</h3>
                <p className="text-xs text-emerald-400 font-mono mt-1">Ringing... (End-to-end encrypted)</p>
              </div>
              <button
                onClick={() => setCallModal(false)}
                className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white font-black text-xl mx-auto flex items-center justify-center shadow-lg"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
`,
  },
};

// ============================================================================
// 3. CLAUDE AI WORKSPACE CLONE
// ============================================================================
export const claudeClone: ProjectTemplate = {
  name: 'Claude 3.5 Sonnet — Interactive AI Studio & Artifacts Canvas',
  category: 'AI Agents & Assistant',
  description: 'Anthropic Claude AI chat interface with split-screen Artifacts preview, markdown code blocks, model switching, thinking trace toggles, and token usage metrics.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'claude-ai-studio',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [model, setModel] = useState('claude-3-5-sonnet');
  const [inputPrompt, setInputPrompt] = useState('');
  const [activeArtifactTab, setActiveArtifactTab] = useState('preview'); // preview | code
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'user',
      content: 'Synthesize a high-performance interactive dashboard with real-time analytics.',
    },
    {
      id: '2',
      role: 'assistant',
      content: 'Here is an interactive telemetry dashboard artifact built with React 19 and Tailwind CSS.',
      hasArtifact: true,
      artifactTitle: 'Interactive Telemetry Monitor',
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;
    const userMsg = { id: String(Date.now()), role: 'user', content: inputPrompt };
    const aiMsg = {
      id: String(Date.now() + 1),
      role: 'assistant',
      content: \`Analysis complete for: "\${inputPrompt}". Generated full artifact components with zero external dependencies.\`,
      hasArtifact: true,
      artifactTitle: 'Generated Application Artifact',
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputPrompt('');
  };

  return (
    <div className="h-screen bg-[#18181b] text-zinc-100 flex font-sans overflow-hidden select-none">
      {/* Left Chat Conversation Column */}
      <div className="w-1/2 flex flex-col border-r border-zinc-800 bg-[#1e1e24]">
        {/* Claude Header */}
        <div className="px-6 py-3.5 border-b border-zinc-800 flex items-center justify-between bg-[#19191e]">
          <div className="flex items-center space-x-2.5">
            <span className="w-7 h-7 rounded-lg bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-black text-xs">
              ✳
            </span>
            <span className="font-extrabold text-sm text-zinc-100">Claude</span>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="bg-zinc-800 text-xs text-orange-300 font-mono px-2 py-1 rounded border border-zinc-700 focus:outline-none"
            >
              <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
              <option value="claude-3-opus">Claude 3 Opus</option>
              <option value="claude-3-5-haiku">Claude 3.5 Haiku</option>
            </select>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">200k Context Window</span>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-zinc-400">
                <span>{m.role === 'user' ? '👤 You' : '✳ Claude'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800/80 text-xs text-zinc-200 leading-relaxed">
                {m.content}
                {m.hasArtifact && (
                  <div className="mt-3 p-3 rounded-lg bg-orange-950/20 border border-orange-500/40 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-orange-400">⚡</span>
                      <span className="font-bold text-orange-300 text-xs">{m.artifactTitle}</span>
                    </div>
                    <span className="text-[10px] font-mono text-orange-400">Viewing on right →</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Prompt Input Box */}
        <form onSubmit={handleSend} className="p-4 border-t border-zinc-800 bg-[#19191e] flex space-x-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Reply to Claude..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs rounded-xl transition"
          >
            Send
          </button>
        </form>
      </div>

      {/* Right Artifacts Canvas Column */}
      <div className="w-1/2 flex flex-col bg-[#0f0f12]">
        {/* Artifact Controls */}
        <div className="px-6 py-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-extrabold text-white">Artifact Canvas</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-800">
              Interactive React
            </span>
          </div>

          <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800 text-xs">
            <button
              onClick={() => setActiveArtifactTab('preview')}
              className={\`px-3 py-1 rounded \${activeArtifactTab === 'preview' ? 'bg-orange-600 text-white font-bold' : 'text-zinc-400'}\`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveArtifactTab('code')}
              className={\`px-3 py-1 rounded \${activeArtifactTab === 'code' ? 'bg-orange-600 text-white font-bold' : 'text-zinc-400'}\`}
            >
              Code
            </button>
          </div>
        </div>

        {/* Artifact Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeArtifactTab === 'preview' ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-white">Live Telemetry & Workload Monitor</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Real-time edge compute utilization across 4 clusters</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono">
                  HEALTHY 99.98%
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500">INFERENCE SPEED</span>
                  <div className="text-xl font-bold text-orange-400 mt-1">42 ms</div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500">TOTAL REQUESTS</span>
                  <div className="text-xl font-bold text-cyan-400 mt-1">1.84M</div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500">CACHE HIT RATE</span>
                  <div className="text-xl font-bold text-emerald-400 mt-1">94.2%</div>
                </div>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Memory Pressure (V8 Heap)</span>
                  <span className="text-orange-400">64%</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full w-[64%]" />
                </div>
              </div>
            </div>
          ) : (
            <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{\`// Claude 3.5 Sonnet Synthesized Artifact
export function TelemetryDashboard() {
  const [latency, setLatency] = useState(42);
  const [load, setLoad] = useState(64);

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl">
      <h2 className="text-white font-bold">Telemetry Monitor</h2>
      <div className="text-orange-400 font-mono mt-2">
        Latency: {latency}ms
      </div>
    </div>
  );
}\`}
            </pre>
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
// 4. CHROME BROWSER SIMULATOR CLONE
// ============================================================================
export const chromeClone: ProjectTemplate = {
  name: 'Google Chrome — Multi-Tab Web Browser & Omnibar Simulator',
  category: 'Browser & Operating Environment',
  description: 'Full Google Chrome browser simulation with tab bar management, back/forward history navigation, URL omnibar with Google autocomplete, bookmarks bar, and web view.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'chrome-browser-simulator',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [tabs, setTabs] = useState([
    { id: '1', title: 'New Tab', url: 'https://www.google.com' },
    { id: '2', title: 'GitHub: bajajaarna4-bit', url: 'https://github.com/bajajaarna4-bit' },
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [omnibarText, setOmnibarText] = useState('https://www.google.com');

  const addTab = () => {
    const id = String(Date.now());
    const newTab = { id, title: 'New Tab', url: 'https://www.google.com' };
    setTabs([...tabs, newTab]);
    setActiveTabId(id);
    setOmnibarText('https://www.google.com');
  };

  const closeTab = (id, e) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const remaining = tabs.filter((t) => t.id !== id);
    setTabs(remaining);
    if (activeTabId === id) {
      setActiveTabId(remaining[0].id);
      setOmnibarText(remaining[0].url);
    }
  };

  return (
    <div className="h-screen bg-[#202124] text-zinc-200 flex flex-col font-sans select-none overflow-hidden">
      {/* Chrome Tab Strip */}
      <div className="bg-[#1f1f23] pt-2 px-2 flex items-center space-x-1 border-b border-zinc-800">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setOmnibarText(tab.url);
                }}
                className={\`flex items-center space-x-2 px-3 py-1.5 rounded-t-xl text-xs cursor-pointer max-w-[180px] group transition \${
                  isActive ? 'bg-[#35363a] text-white font-medium' : 'hover:bg-[#2a2b2e] text-zinc-400'
                }\`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-cyan-500/30 flex items-center justify-center text-[8px] font-bold text-cyan-300">
                  🌐
                </span>
                <span className="truncate flex-1">{tab.title}</span>
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  className="opacity-60 group-hover:opacity-100 hover:text-red-400 text-[10px] px-1"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
        <button
          onClick={addTab}
          className="w-7 h-7 rounded-full hover:bg-zinc-800 flex items-center justify-center text-sm text-zinc-300 font-bold"
          title="New Tab"
        >
          +
        </button>
      </div>

      {/* Chrome Navigation & Omnibar */}
      <div className="bg-[#35363a] px-3 py-2 flex items-center space-x-3 border-b border-zinc-800">
        <div className="flex items-center space-x-2 text-zinc-400 text-sm">
          <button className="hover:text-white">←</button>
          <button className="hover:text-white">→</button>
          <button className="hover:text-white">↻</button>
        </div>

        {/* Omnibar Input */}
        <div className="flex-1 bg-[#202124] rounded-full px-4 py-1.5 flex items-center space-x-2 border border-zinc-700/60 focus-within:border-cyan-500">
          <span className="text-zinc-500 text-xs">🔒</span>
          <input
            type="text"
            value={omnibarText}
            onChange={(e) => setOmnibarText(e.target.value)}
            className="w-full bg-transparent text-xs text-white focus:outline-none font-mono"
          />
          <span className="text-zinc-500 text-xs cursor-pointer">★</span>
        </div>

        <div className="flex items-center space-x-2 text-zinc-400 text-sm">
          <span className="cursor-pointer hover:text-white">🧩</span>
          <div className="w-6 h-6 rounded-full bg-cyan-600 text-[10px] font-bold text-black flex items-center justify-center">
            A
          </div>
          <span className="cursor-pointer hover:text-white">⋮</span>
        </div>
      </div>

      {/* Bookmarks Bar */}
      <div className="bg-[#35363a] px-3 py-1 flex items-center space-x-4 text-[11px] text-zinc-300 border-b border-zinc-800/80">
        <span className="hover:text-white cursor-pointer">⭐ Google</span>
        <span className="hover:text-white cursor-pointer">⭐ GitHub</span>
        <span className="hover:text-white cursor-pointer">⭐ YouTube</span>
        <span className="hover:text-white cursor-pointer">⭐ Supabase Dashboard</span>
      </div>

      {/* Browser Viewport */}
      <div className="flex-1 bg-[#121214] p-8 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-cyan-500/40 flex items-center justify-center text-3xl shadow-2xl">
          🌐
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold text-white tracking-wide">Google Chrome Simulator</h2>
          <p className="text-xs text-zinc-400 font-mono">
            Simulating live browser tab URL: <span className="text-cyan-400">{omnibarText}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
`,
  },
};

// ============================================================================
// 5. VERCEL & RENDER CLOUD HOSTING CLONES
// ============================================================================
export const vercelClone: ProjectTemplate = {
  name: 'Vercel — Frontend Cloud & Serverless Deployments',
  category: 'Cloud Hosting & DevOps',
  description: 'Vercel developer platform clone with preview deployments, Git production branch triggers, real-time build logs, edge network latency, and domain management.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'vercel-cloud-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [deployments, setDeployments] = useState([
    {
      id: 'd1',
      domain: 'nexus-ai-studio.vercel.app',
      branch: 'main',
      commit: 'feat: multi-agent autonomous generator',
      status: 'Ready',
      time: '2m ago',
      author: 'bajajaarna4-bit',
    },
    {
      id: 'd2',
      domain: 'nexus-preview-git-clones.vercel.app',
      branch: 'feature/mobility-clones',
      commit: 'add uber rapido ola unified mobility aggregator',
      status: 'Ready',
      time: '14m ago',
      author: 'bajajaarna4-bit',
    },
  ]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans select-none">
      <header className="border-b border-zinc-800 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-black">▲</span>
          <span className="font-bold text-sm">Vercel Dashboard</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
            Hobby / Pro
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-3 py-1.5 bg-white text-black font-extrabold text-xs rounded-lg hover:bg-zinc-200 transition">
            Add New Project...
          </button>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Deployments</h1>
          <p className="text-xs text-zinc-400 mt-1">Production and Preview deployments managed by GitHub continuous integration</p>
        </div>

        <div className="space-y-3">
          {deployments.map((d) => (
            <div
              key={d.id}
              className="p-5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl flex items-center justify-between transition"
            >
              <div className="flex items-center space-x-4">
                <span className="w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                <div>
                  <a href="#" className="font-extrabold text-sm text-cyan-400 hover:underline font-mono">
                    {d.domain}
                  </a>
                  <div className="flex items-center space-x-3 text-xs text-zinc-400 font-mono mt-1">
                    <span>git:{d.branch}</span>
                    <span>&quot;{d.commit}&quot;</span>
                  </div>
                </div>
              </div>
              <div className="text-right text-xs font-mono">
                <span className="text-emerald-400 font-bold">{d.status}</span>
                <div className="text-zinc-500 mt-0.5">{d.time} by {d.author}</div>
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
// 6. LINKEDIN PROFESSIONAL NETWORK CLONE
// ============================================================================
export const linkedinClone: ProjectTemplate = {
  name: 'LinkedIn — Professional Social Network & Career Hub',
  category: 'Social & Professional Networking',
  description: 'LinkedIn feed clone featuring professional post creator, connection network stats, like/comment engagement, and job search cards.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'linkedin-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: 'Satya Nadella',
      title: 'Chairman and CEO at Microsoft',
      avatar: '👨🏽‍💼',
      time: '3h ago',
      content: 'Excited to announce our newest breakthrough in autonomous AI engineering systems. Transforming how software is conceived and delivered worldwide.',
      likes: 1420,
      comments: 312,
    },
    {
      id: '2',
      author: 'NEXUS Autonomous Engineering',
      title: 'Autonomous Multi-Agent Platform',
      avatar: '⚡',
      time: '5h ago',
      content: 'Shipped support for instant full-stack workspace cloning: Uber, Rapido, Ola, WhatsApp, Claude, and Canva now synthesized in real time.',
      likes: 890,
      comments: 94,
    },
  ]);
  const [newPostText, setNewPostText] = useState('');

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    const p = {
      id: String(Date.now()),
      author: 'You (Developer)',
      title: 'Full-Stack Software Engineer',
      avatar: '👨🏻‍💻',
      time: 'Just now',
      content: newPostText,
      likes: 1,
      comments: 0,
    };
    setPosts([p, ...posts]);
    setNewPostText('');
  };

  return (
    <div className="min-h-screen bg-[#090b0e] text-zinc-100 flex flex-col font-sans select-none">
      <header className="sticky top-0 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-8 h-8 rounded-lg bg-[#0a66c2] flex items-center justify-center text-white font-extrabold text-lg">
            in
          </span>
          <input
            type="text"
            placeholder="Search jobs, skills, companies..."
            className="w-64 bg-zinc-900 border border-zinc-800 rounded-full px-3.5 py-1.5 text-xs text-white focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-6 text-xs text-zinc-400">
          <span className="text-white font-bold cursor-pointer">🏠 Home</span>
          <span className="cursor-pointer hover:text-white">👥 My Network</span>
          <span className="cursor-pointer hover:text-white">💼 Jobs</span>
          <span className="cursor-pointer hover:text-white">💬 Messaging</span>
          <span className="cursor-pointer hover:text-white">🔔 Notifications</span>
        </div>
      </header>

      <main className="max-w-4xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-cyan-600/30 border border-cyan-500 text-2xl flex items-center justify-center mx-auto">
              👨🏻‍💻
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Lead Autonomous Engineer</h3>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">Building NEXUS AI Platform</p>
            </div>
            <div className="pt-3 border-t border-zinc-800 text-left text-xs space-y-1">
              <div className="flex justify-between text-zinc-400">
                <span>Profile viewers</span>
                <span className="text-cyan-400 font-bold">1,842</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Post impressions</span>
                <span className="text-cyan-400 font-bold">12,490</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 space-y-4">
          <form onSubmit={handlePost} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Start a post, share your engineering updates..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none resize-none h-20"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-500 font-mono">Media • Event • Article</span>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#0a66c2] hover:bg-blue-600 text-white font-bold text-xs rounded-full transition"
              >
                Post
              </button>
            </div>
          </form>

          {posts.map((post) => (
            <div key={post.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xl">
                  {post.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">{post.author}</h4>
                  <p className="text-[10px] text-zinc-400">{post.title} • {post.time}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed">{post.content}</p>
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span>👍 {post.likes} Likes</span>
                <span>💬 {post.comments} Comments</span>
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
// 7. SNAPCHAT CLONE
// ============================================================================
export const snapchatClone: ProjectTemplate = {
  name: 'Snapchat Web — Camera Snaps, Stories & Snap Streaks',
  category: 'Social Media & AR',
  description: 'Snapchat camera interface with AR filter selectors, snap streak counters, discover stories carousel, and direct disappearing chat messages.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'snapchat-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [activeFilter, setActiveFilter] = useState('none');
  const [streakDays, setStreakDays] = useState(148);
  const [snapsSent, setSnapsSent] = useState(12);

  const FILTERS = [
    { id: 'none', label: 'Normal', icon: '✨' },
    { id: 'neon', label: 'Cyber Neon', icon: '⚡' },
    { id: 'warm', label: 'Golden Hour', icon: '🌅' },
    { id: 'bw', label: 'Noir B&W', icon: '🎬' },
  ];

  return (
    <div className="h-screen bg-black text-white flex flex-col font-sans select-none overflow-hidden">
      <header className="bg-zinc-950/80 px-6 py-3 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black text-lg">👻</span>
          <span className="font-extrabold text-sm text-yellow-400">Snapchat</span>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 font-bold">
            🔥 {streakDays} Day Streak
          </span>
          <span className="text-zinc-400">Snaps: {snapsSent}</span>
        </div>
      </header>

      <main className="flex-1 relative flex flex-col items-center justify-center p-6 bg-gradient-to-b from-zinc-900 to-black">
        {/* Simulated Camera Viewfinder */}
        <div className="relative w-full max-w-sm h-[480px] bg-zinc-950 border-2 border-yellow-400/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-4">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>📷 Live Camera</span>
            <span>4K 60FPS</span>
          </div>

          <div className="text-center space-y-2">
            <div className="text-6xl animate-pulse">
              {activeFilter === 'neon' ? '🕶️' : activeFilter === 'warm' ? '✨' : activeFilter === 'bw' ? '📽️' : '📸'}
            </div>
            <div className="text-xs text-yellow-300 font-mono">Filter Active: {activeFilter.toUpperCase()}</div>
          </div>

          {/* Shutter Button & Filter Carousel */}
          <div className="space-y-4">
            <div className="flex justify-center space-x-3">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={\`px-3 py-1 rounded-full text-xs font-bold transition flex items-center space-x-1 border \${
                    activeFilter === f.id
                      ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                  }\`}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  setSnapsSent(snapsSent + 1);
                  alert('Snap Captured & Sent to Friends with 🔥 Streak preserved!');
                }}
                className="w-16 h-16 rounded-full border-4 border-white bg-yellow-400/80 hover:bg-yellow-400 flex items-center justify-center text-black font-black text-xl shadow-xl transition active:scale-95"
              >
                Snap
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
`,
  },
};

// ============================================================================
// 8. AMAZON PRIME VIDEO & DISNEY+ HOTSTAR
// ============================================================================
export const primeVideoClone: ProjectTemplate = {
  name: 'Amazon Prime Video — Movies, X-Ray & Originals',
  category: 'Video Streaming & Media',
  description: 'Prime Video clone featuring Amazon Originals carousel, X-Ray cast insights, continue watching scrubber, and 4K HDR playback controls.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'prime-video-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const PRIME_ORIGINALS = [
    { id: '1', title: 'The Lord of the Rings: The Rings of Power', rating: '8.7', year: '2024', badge: 'PRIME ORIGINAL', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
    { id: '2', title: 'The Boys — Season 4', rating: '8.9', year: '2024', badge: 'TOP 10', cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80' },
    { id: '3', title: 'Reacher: Season 2', rating: '8.6', year: '2023', badge: 'ACTION', cover: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col font-sans select-none">
      <header className="px-8 py-4 bg-[#0a0f1d] border-b border-cyan-950 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="text-xl font-black text-cyan-400 tracking-wider">prime video</span>
          <nav className="flex items-center space-x-4 text-xs font-semibold text-zinc-300">
            <span className="text-white hover:text-cyan-400 cursor-pointer">Home</span>
            <span className="hover:text-white cursor-pointer">Store</span>
            <span className="hover:text-white cursor-pointer">Live TV</span>
            <span className="hover:text-white cursor-pointer">Categories</span>
          </nav>
        </div>
        <div className="text-xs font-mono text-cyan-400">Prime Member ✓</div>
      </header>

      <main className="p-8 max-w-6xl w-full mx-auto space-y-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 to-cyan-900 p-8 space-y-4 shadow-2xl">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            Included with Prime
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white">The Rings of Power</h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-xl leading-relaxed">
            Beginning in a time of relative peace, the series follows an ensemble cast of characters as they confront the re-emergence of evil to Middle-earth.
          </p>
          <button
            onClick={() => alert('Starting 4K UHD Streaming with X-Ray enabled!')}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-xl shadow-xl transition flex items-center space-x-2"
          >
            <span>▶ Watch Now with Prime</span>
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Amazon Originals and Exclusives</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRIME_ORIGINALS.map((movie) => (
              <div
                key={movie.id}
                onClick={() => setSelectedVideo(movie)}
                className="bg-[#1e293b] border border-cyan-900/50 rounded-2xl overflow-hidden hover:scale-105 transition cursor-pointer shadow-lg"
              >
                <img src={movie.cover} alt={movie.title} className="w-full h-40 object-cover" />
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-cyan-400 font-bold">{movie.badge}</span>
                    <span className="text-zinc-400 font-mono">★ {movie.rating}</span>
                  </div>
                  <h3 className="font-bold text-sm text-white">{movie.title}</h3>
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

// ============================================================================
// 9. STEEZY STUDIO DANCE & MOVEMENT CLONE
// ============================================================================
export const steezyStudioClone: ProjectTemplate = {
  name: 'Steezy Studio — Dance & Movement Learning Suite',
  category: 'EdTech & Creative Movement',
  description: 'Steezy Studio dance player with video speed controller (0.5x to 1.5x), looping section A-B markers, mirrored camera mode, and multi-angle instructor views.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'steezy-studio-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [speed, setSpeed] = useState(1.0);
  const [isMirrored, setIsMirrored] = useState(false);
  const [activeCamera, setActiveCamera] = useState('front'); // front | back | side
  const [isLooping, setIsLooping] = useState(true);

  return (
    <div className="h-screen bg-black text-white flex flex-col font-sans select-none overflow-hidden">
      <header className="px-6 py-3.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-black text-purple-400">STEEZY</span>
          <span className="text-xs font-mono text-zinc-400">Hip Hop Foundation • Intermediate</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-mono">
            Instructor: Brian Puspos
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row p-6 gap-6 overflow-hidden">
        {/* Main Video Viewport */}
        <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col justify-between p-6 relative overflow-hidden shadow-2xl">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>Camera Angle: {activeCamera.toUpperCase()}</span>
            <span>{isMirrored ? 'MIRRORED (Follow Along)' : 'ORIGINAL'}</span>
          </div>

          <div className="text-center space-y-4 my-auto">
            <div className="text-7xl animate-pulse">🕺</div>
            <div className="text-sm font-bold text-purple-300 font-mono">
              Routine: 8-Count Bounce & Groove
            </div>
          </div>

          {/* Player Controls Bar */}
          <div className="bg-zinc-950/90 border border-zinc-800 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsMirrored(!isMirrored)}
                className={\`px-3 py-1.5 rounded-lg text-xs font-bold transition \${isMirrored ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300'}\`}
              >
                🪞 Mirror Mode
              </button>
              <button
                onClick={() => setIsLooping(!isLooping)}
                className={\`px-3 py-1.5 rounded-lg text-xs font-bold transition \${isLooping ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-300'}\`}
              >
                🔁 Loop A-B (Counts 1-8)
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-zinc-400">Speed:</span>
              {[0.5, 0.75, 1.0, 1.25].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={\`px-2.5 py-1 rounded text-xs font-mono font-bold transition \${speed === s ? 'bg-purple-500 text-black' : 'bg-zinc-800 text-zinc-400'}\`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Camera Angles Switcher Sidebar */}
        <div className="w-full lg:w-72 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Instructor Angles</h3>
          {[
            { id: 'front', label: 'Front Stage (Default)' },
            { id: 'back', label: 'Back View (Follow Mirror)' },
            { id: 'side', label: 'Side Profile (Footwork)' },
          ].map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveCamera(c.id)}
              className={\`p-3 rounded-xl border cursor-pointer transition text-xs font-bold flex items-center justify-between \${
                activeCamera === c.id ? 'bg-purple-950/60 border-purple-500 text-purple-200' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }\`}
            >
              <span>{c.label}</span>
              <span>{activeCamera === c.id ? '✓' : '→'}</span>
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
// 10. HOSTINGER & MICROSOFT 365 CLONES
// ============================================================================
export const hostingerClone: ProjectTemplate = {
  name: 'Hostinger — hPanel Cloud Hosting & Domain Control',
  category: 'Cloud Infrastructure & Web Hosting',
  description: 'Hostinger hPanel interface with domain management, SSL certificate provisioning, WordPress 1-click deployment, file manager, and MySQL database monitor.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'hostinger-hpanel-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [sslActive, setSslActive] = useState(true);

  return (
    <div className="min-h-screen bg-[#11121d] text-zinc-100 flex flex-col font-sans select-none">
      <header className="px-6 py-3.5 bg-[#181928] border-b border-[#25263a] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-black text-[#673de6]">HOSTINGER</span>
          <span className="font-bold text-xs text-white">hPanel Control</span>
        </div>
        <div className="text-xs font-mono text-emerald-400">● Cloud VPS Running</div>
      </header>

      <main className="max-w-5xl w-full mx-auto p-8 space-y-6">
        <div className="bg-[#181928] border border-[#25263a] rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-white">nexus-platform.com</h2>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">Premium Web Hosting • IP: 142.250.190.46</p>
          </div>
          <button
            onClick={() => setSslActive(!sslActive)}
            className={\`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 \${
              sslActive ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-red-950 text-red-300'
            }\`}
          >
            <span>🔒</span>
            <span>{sslActive ? 'Lifetime SSL Active' : 'SSL Inactive'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#181928] border border-[#25263a] p-5 rounded-2xl space-y-2">
            <span className="text-2xl">📁</span>
            <h3 className="font-bold text-sm text-white">File Manager</h3>
            <p className="text-xs text-zinc-400">Direct FTP & file explorer with code editor</p>
          </div>
          <div className="bg-[#181928] border border-[#25263a] p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🗄️</span>
            <h3 className="font-bold text-sm text-white">MySQL Databases</h3>
            <p className="text-xs text-zinc-400">phpMyAdmin & database user management</p>
          </div>
          <div className="bg-[#181928] border border-[#25263a] p-5 rounded-2xl space-y-2">
            <span className="text-2xl">⚡</span>
            <h3 className="font-bold text-sm text-white">Auto Installer</h3>
            <p className="text-xs text-zinc-400">1-click WordPress, Next.js, and Ghost install</p>
          </div>
        </div>
      </main>
    </div>
  );
}
`,
  },
};

export const microsoftClone: ProjectTemplate = {
  name: 'Microsoft 365 — Cloud Productivity Suite',
  category: 'Productivity & Office Suite',
  description: 'Microsoft 365 application launcher and cloud suite with Word, Excel, PowerPoint, Teams, OneDrive, and recent documents activity.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'microsoft-365-clone',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const APPS = [
    { name: 'Word', icon: '📝', color: 'bg-blue-600' },
    { name: 'Excel', icon: '📊', color: 'bg-emerald-600' },
    { name: 'PowerPoint', icon: '📽️', color: 'bg-orange-600' },
    { name: 'Outlook', icon: '✉️', color: 'bg-blue-500' },
    { name: 'OneDrive', icon: '☁️', color: 'bg-sky-600' },
    { name: 'Teams', icon: '👥', color: 'bg-indigo-600' },
  ];

  return (
    <div className="min-h-screen bg-[#1b1a19] text-white flex font-sans select-none">
      {/* App Rail */}
      <div className="w-16 bg-[#252423] border-r border-zinc-800 flex flex-col items-center py-4 space-y-6">
        <span className="text-lg font-bold text-red-500">::</span>
        {APPS.map((app) => (
          <button key={app.name} className="w-10 h-10 rounded-xl hover:bg-zinc-700 flex items-center justify-center text-lg transition" title={app.name}>
            {app.icon}
          </button>
        ))}
      </div>

      {/* Main Workspace */}
      <div className="flex-1 p-8 space-y-8">
        <header className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <h1 className="text-2xl font-bold">Microsoft 365 Cloud</h1>
          <span className="text-xs font-mono text-zinc-400">Enterprise Tenant Active</span>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {APPS.map((app) => (
            <div key={app.name} className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center text-center space-y-2 hover:border-zinc-600 transition cursor-pointer">
              <div className={\`w-12 h-12 rounded-xl \${app.color} flex items-center justify-center text-xl shadow-lg\`}>
                {app.icon}
              </div>
              <span className="font-bold text-xs">{app.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`,
  },
};
