import { ProjectTemplate } from './index';

// ============================================================================
// CANDY CRUSH SAGA × FAMILY FARM (SWEET HARVEST SAGA)
// REAL PLAYABLE MATCH-3 CANDY SAGA MERGED WITH REAL TIME FAMILY FARMING SIMULATOR
// ============================================================================
export const candyCrushFarmTemplate: ProjectTemplate = {
  name: 'Candy Crush Saga × Family Farm — Sweet Harvest Saga',
  category: 'Playable Casual Gaming & Interactive Farm Simulation',
  description:
    'A real-time hybrid casual game merging Candy Crush Saga match-3 candy cascades with an interactive Family Farm estate. Matching candies generates harvest resources (berries, fertilizer, sugar syrup, animal fodder) to cultivate crops, raise livestock, bake treats, and fulfill town delivery orders with Web Audio effects.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'candy-crush-family-farm-saga',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7' },
      },
      null,
      2
    ),
    '/src/App.tsx': `function App() {
  const [activeTab, setActiveTab] = useState('dual'); // 'dual' | 'candy' | 'farm' | 'bakery' | 'orders'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState('day'); // 'day' | 'sunset' | 'night'
  const [score, setScore] = useState(1480);
  const [movesLeft, setMovesLeft] = useState(25);
  const [farmLevel, setFarmLevel] = useState(3);
  const [farmXp, setFarmXp] = useState(320);
  const [farmCoins, setFarmCoins] = useState(850);
  const [farmGems, setFarmGems] = useState(24);
  const [sweetAnnouncement, setSweetAnnouncement] = useState('SWEET HARVEST!');

  // Resources earned from Candy Matches
  const [sugarStock, setSugarStock] = useState(14);
  const [fertilizerStock, setFertilizerStock] = useState(8);
  const [berryStock, setBerryStock] = useState(12);
  const [cocoaFodder, setCocoaFodder] = useState(6);
  const [wheatStock, setWheatStock] = useState(9);
  const [milkStock, setMilkStock] = useState(5);
  const [eggStock, setEggStock] = useState(4);
  const [cornStock, setCornStock] = useState(7);

  // Candy types definition
  const CANDY_TYPES = [
    { type: 'strawberry', icon: '🍓', label: 'Berry Blast', color: 'from-rose-500 to-pink-600', yield: 'Berry + XP' },
    { type: 'lemon', icon: '🍋', label: 'Citron Drop', color: 'from-amber-400 to-yellow-500', yield: 'Fertilizer' },
    { type: 'jelly', icon: '🍬', label: 'Sugar Chew', color: 'from-cyan-400 to-blue-500', yield: 'Pure Sugar' },
    { type: 'grape', icon: '🍇', label: 'Royal Grape', color: 'from-purple-500 to-indigo-600', yield: 'Farm Coins' },
    { type: 'cocoa', icon: '🍫', label: 'Cocoa Crunch', color: 'from-amber-700 to-amber-900', yield: 'Animal Fodder' },
    { type: 'lollipop', icon: '🍭', label: 'Rainbow Swirl', color: 'from-fuchsia-500 to-pink-500', yield: 'Sugar Rush' },
  ];

  // 7x7 Candy Board Generator
  const generateInitialBoard = () => {
    const board = [];
    let id = 0;
    for (let r = 0; r < 7; r++) {
      const row = [];
      for (let c = 0; c < 7; c++) {
        const rand = CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)];
        row.push({ id: id++, type: rand.type, icon: rand.icon, row: r, col: c, matched: false });
      }
      board.push(row);
    }
    return board;
  };

  const [board, setBoard] = useState(generateInitialBoard);
  const [selectedCell, setSelectedCell] = useState(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [activeBooster, setActiveBooster] = useState(null); // 'pitchfork' | 'tractor' | 'rooster'

  // Web Audio Synthesizer for Retro Arcade Candy Pops & Farm Sounds
  const playTone = (freq, type, duration) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback safe
    }
  };

  const playCandyPop = () => {
    playTone(520, 'sine', 0.12);
    setTimeout(() => playTone(680, 'sine', 0.14), 60);
    setTimeout(() => playTone(840, 'triangle', 0.18), 120);
  };

  const playChime = () => {
    playTone(784, 'triangle', 0.15);
    setTimeout(() => playTone(987, 'triangle', 0.2), 80);
    setTimeout(() => playTone(1318, 'sine', 0.25), 160);
  };

  const playHarvestTone = () => {
    playTone(440, 'sine', 0.1);
    setTimeout(() => playTone(554, 'sine', 0.12), 70);
    setTimeout(() => playTone(659, 'triangle', 0.2), 140);
  };

  // Match Detection
  const checkMatchesOnBoard = (grid) => {
    const matchedCoords = new Set();

    // Check horizontal 3-in-a-row
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 5; c++) {
        const t1 = grid[r][c].type;
        const t2 = grid[r][c + 1].type;
        const t3 = grid[r][c + 2].type;
        if (t1 && t1 === t2 && t1 === t3) {
          matchedCoords.add(r + '-' + c);
          matchedCoords.add(r + '-' + (c + 1));
          matchedCoords.add(r + '-' + (c + 2));
        }
      }
    }

    // Check vertical 3-in-a-row
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 5; r++) {
        const t1 = grid[r][c].type;
        const t2 = grid[r + 1][c].type;
        const t3 = grid[r + 2][c].type;
        if (t1 && t1 === t2 && t1 === t3) {
          matchedCoords.add(r + '-' + c);
          matchedCoords.add((r + 1) + '-' + c);
          matchedCoords.add((r + 2) + '-' + c);
        }
      }
    }

    return matchedCoords;
  };

  // Handle Candy Click & Swap
  const handleCellClick = (r, c) => {
    if (movesLeft <= 0) {
      setSweetAnnouncement('OUT OF MOVES! HARVEST CROPS FOR MORE!');
      return;
    }

    // Pitchfork booster: clear selected cell immediately
    if (activeBooster === 'pitchfork') {
      const cell = board[r][c];
      processMatches(new Set([r + '-' + c]), board);
      setActiveBooster(null);
      setSweetAnnouncement('FARM PITCHFORK HARVEST!');
      playChime();
      return;
    }

    if (!selectedCell) {
      setSelectedCell({ r, c });
      playTone(400, 'sine', 0.08);
      return;
    }

    // Check if adjacent
    const isAdjacent =
      (Math.abs(selectedCell.r - r) === 1 && selectedCell.c === c) ||
      (Math.abs(selectedCell.c - c) === 1 && selectedCell.r === r);

    if (!isAdjacent) {
      setSelectedCell({ r, c });
      playTone(400, 'sine', 0.08);
      return;
    }

    // Execute swap
    setIsSwapping(true);
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    const temp = newBoard[selectedCell.r][selectedCell.c];
    newBoard[selectedCell.r][selectedCell.c] = {
      ...newBoard[r][c],
      row: selectedCell.r,
      col: selectedCell.c,
    };
    newBoard[r][c] = {
      ...temp,
      row: r,
      col: c,
    };

    const matches = checkMatchesOnBoard(newBoard);
    if (matches.size > 0) {
      setMovesLeft((m) => Math.max(0, m - 1));
      processMatches(matches, newBoard);
    } else {
      // Revert swap with bump tone
      playTone(220, 'sawtooth', 0.12);
      setSweetAnnouncement('NO MATCH! TRY ANOTHER SWAP');
    }

    setSelectedCell(null);
    setIsSwapping(false);
  };

  // Process Matches, Cascades and Harvest Resources
  const processMatches = (matchedCoords, currentBoard) => {
    let earnedBerries = 0;
    let earnedSugar = 0;
    let earnedFertilizer = 0;
    let earnedCocoa = 0;
    let earnedCoins = 0;

    matchedCoords.forEach((key) => {
      const [r, c] = key.split('-').map(Number);
      const cell = currentBoard[r][c];
      if (cell.type === 'strawberry') earnedBerries += 1;
      else if (cell.type === 'jelly') earnedSugar += 1;
      else if (cell.type === 'lemon') earnedFertilizer += 1;
      else if (cell.type === 'cocoa') earnedCocoa += 1;
      else if (cell.type === 'grape') earnedCoins += 25;
      else earnedCoins += 15;
    });

    // Update resources
    setBerryStock((b) => b + earnedBerries);
    setSugarStock((s) => s + earnedSugar);
    setFertilizerStock((f) => f + earnedFertilizer);
    setCocoaFodder((c) => c + earnedCocoa);
    setFarmCoins((c) => c + earnedCoins);

    const matchPoints = matchedCoords.size * 60;
    setScore((s) => s + matchPoints);
    setFarmXp((x) => x + matchedCoords.size * 10);

    // Dynamic celebratory voice banners
    const announcements = ['SWEET!', 'TASTY!', 'DELICIOUS!', 'SUGAR CRUSH!', 'FARM HARVEST!'];
    setSweetAnnouncement(announcements[Math.floor(Math.random() * announcements.length)]);
    playCandyPop();

    // Cascade: drop down candies and fill top
    const nextBoard = currentBoard.map((row) => row.map((cell) => ({ ...cell })));
    for (let c = 0; c < 7; c++) {
      const colItems = [];
      for (let r = 0; r < 7; r++) {
        if (!matchedCoords.has(r + '-' + c)) {
          colItems.push(nextBoard[r][c]);
        }
      }
      // Fill missing with new random candies
      while (colItems.length < 7) {
        const rand = CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)];
        colItems.unshift({
          id: Math.random(),
          type: rand.type,
          icon: rand.icon,
          row: 0,
          col: c,
          matched: false,
        });
      }
      for (let r = 0; r < 7; r++) {
        colItems[r].row = r;
        colItems[r].col = c;
        nextBoard[r][c] = colItems[r];
      }
    }

    setBoard(nextBoard);
  };

  // Booster: Rooster Board Shuffle
  const handleRoosterShuffle = () => {
    if (farmCoins < 80) {
      setSweetAnnouncement('NEED 80 COINS FOR ROOSTER SHUFFLE');
      return;
    }
    setFarmCoins((c) => c - 80);
    setBoard(generateInitialBoard());
    setSweetAnnouncement('COCK-A-DOODLE-DOO! FRESH CANDY BOARD!');
    playChime();
  };

  // Booster: Tractor Column & Row Blast
  const handleTractorBlast = () => {
    if (farmGems < 2) {
      setSweetAnnouncement('NEED 2 GEMS FOR TRACTOR BLAST');
      return;
    }
    setFarmGems((g) => g - 2);
    const coords = new Set();
    for (let i = 0; i < 7; i++) {
      coords.add('3-' + i); // middle row
      coords.add(i + '-3'); // middle col
    }
    processMatches(coords, board);
    setSweetAnnouncement('GOLDEN TRACTOR BLAST! ROW & COLUMN CLEARED!');
    playChime();
  };

  // ==========================================
  // FAMILY FARM ESTATE STATE & SIMULATION
  // ==========================================
  const [farmPlots, setFarmPlots] = useState([
    { id: 1, name: 'Wheat Field', crop: 'wheat', icon: '🌾', stage: 2, maxStage: 2, harvestYield: { type: 'wheat', amount: 3, xp: 20 } },
    { id: 2, name: 'Berry Orchard', crop: 'strawberry', icon: '🍓', stage: 1, maxStage: 2, harvestYield: { type: 'berry', amount: 4, xp: 30 } },
    { id: 3, name: 'Golden Cornfield', crop: 'corn', icon: '🌽', stage: 2, maxStage: 2, harvestYield: { type: 'corn', amount: 2, xp: 25 } },
    { id: 4, name: 'Sugar Cane Patch', crop: 'sugar', icon: '🎋', stage: 0, maxStage: 2, harvestYield: { type: 'sugar', amount: 3, xp: 25 } },
    { id: 5, name: 'Giant Pumpkins', crop: 'pumpkin', icon: '🎃', stage: 1, maxStage: 2, harvestYield: { type: 'coins', amount: 150, xp: 45 } },
    { id: 6, name: 'Sweet Sunflowers', crop: 'sunflower', icon: '🌻', stage: 2, maxStage: 2, harvestYield: { type: 'moves', amount: 5, xp: 35 } },
  ]);

  // Farm Livestock
  const [animals, setAnimals] = useState([
    { id: 'cow', name: 'Daisy the Cow', icon: '🐮', product: 'Fresh Milk', productIcon: '🥛', hungry: false, readyToHarvest: true, timer: 0 },
    { id: 'hen', name: 'Clucky the Hen', icon: '🐔', product: 'Farm Eggs', productIcon: '🥚', hungry: true, readyToHarvest: false, timer: 45 },
    { id: 'sheep', name: 'Woolly the Sheep', icon: '🐑', product: 'Warm Wool', productIcon: '🧶', hungry: false, readyToHarvest: true, timer: 0 },
  ]);

  // Farm Crop Harvest Handler
  const handleHarvestPlot = (plotId) => {
    const plot = farmPlots.find((p) => p.id === plotId);
    if (!plot || plot.stage < plot.maxStage) return;

    if (plot.harvestYield.type === 'wheat') setWheatStock((w) => w + plot.harvestYield.amount);
    else if (plot.harvestYield.type === 'berry') setBerryStock((b) => b + plot.harvestYield.amount);
    else if (plot.harvestYield.type === 'corn') setCornStock((c) => c + plot.harvestYield.amount);
    else if (plot.harvestYield.type === 'sugar') setSugarStock((s) => s + plot.harvestYield.amount);
    else if (plot.harvestYield.type === 'coins') setFarmCoins((c) => c + plot.harvestYield.amount);
    else if (plot.harvestYield.type === 'moves') {
      setMovesLeft((m) => m + plot.harvestYield.amount);
      setSweetAnnouncement('+5 EXTRA CANDY MOVES FROM SUNFLOWERS!');
    }

    setFarmXp((x) => x + plot.harvestYield.xp);
    playHarvestTone();

    // Reset plot to stage 0
    setFarmPlots((plots) =>
      plots.map((p) => (p.id === plotId ? { ...p, stage: 0 } : p))
    );
  };

  // Fertilize Plot with Lemon Fertilizer earned from Candy Crush
  const handleFertilizePlot = (plotId) => {
    if (fertilizerStock <= 0) {
      setSweetAnnouncement('MATCH LEMONS 🍋 IN CANDY CRUSH TO GET FERTILIZER!');
      return;
    }
    setFertilizerStock((f) => f - 1);
    setFarmPlots((plots) =>
      plots.map((p) => (p.id === plotId ? { ...p, stage: p.maxStage } : p))
    );
    setSweetAnnouncement('CROP INSTANTLY BLOOMED WITH CITRON FERTILIZER!');
    playChime();
  };

  // Animal Feed & Harvest
  const handleFeedAnimal = (animalId) => {
    if (cocoaFodder <= 0) {
      setSweetAnnouncement('MATCH CHOCOLATE 🍫 IN CANDY CRUSH TO GET ANIMAL FODDER!');
      return;
    }
    setCocoaFodder((c) => c - 1);
    setAnimals((list) =>
      list.map((a) => (a.id === animalId ? { ...a, hungry: false, readyToHarvest: true } : a))
    );
    playChime();
    setSweetAnnouncement('ANIMAL FED! PRODUCING DELICIOUS FARM GOODS!');
  };

  const handleHarvestAnimal = (animalId) => {
    const animal = animals.find((a) => a.id === animalId);
    if (!animal || !animal.readyToHarvest) return;

    if (animalId === 'cow') setMilkStock((m) => m + 2);
    else if (animalId === 'hen') setEggStock((e) => e + 3);
    else if (animalId === 'sheep') setFarmCoins((c) => c + 140);

    setFarmXp((x) => x + 35);
    playHarvestTone();
    setAnimals((list) =>
      list.map((a) => (a.id === animalId ? { ...a, readyToHarvest: false, hungry: true } : a))
    );
    setSweetAnnouncement('COLLECTED ' + animal.product.toUpperCase() + '!');
  };

  // Farm Bakery Recipes
  const [bakedGoods, setBakedGoods] = useState({ strawberryPie: 2, butterCorn: 1, sugarDonut: 3 });

  const handleBake = (recipe) => {
    if (recipe === 'pie') {
      if (berryStock < 3 || milkStock < 1) {
        setSweetAnnouncement('NEED 3 BERRIES & 1 MILK TO BAKE STRAWBERRY TART!');
        return;
      }
      setBerryStock((b) => b - 3);
      setMilkStock((m) => m - 1);
      setBakedGoods((g) => ({ ...g, strawberryPie: g.strawberryPie + 1 }));
      setFarmXp((x) => x + 60);
      setFarmCoins((c) => c + 120);
      setSweetAnnouncement('BAKED DELICIOUS STRAWBERRY TART! +120 COINS');
      playChime();
    } else if (recipe === 'donut') {
      if (wheatStock < 2 || sugarStock < 2) {
        setSweetAnnouncement('NEED 2 WHEAT & 2 SUGAR TO BAKE CANDIED DONUT!');
        return;
      }
      setWheatStock((w) => w - 2);
      setSugarStock((s) => s - 2);
      setBakedGoods((g) => ({ ...g, sugarDonut: g.sugarDonut + 1 }));
      setFarmXp((x) => x + 50);
      setFarmCoins((c) => c + 100);
      setSweetAnnouncement('BAKED SUGAR CANDIED DONUT! +100 COINS');
      playChime();
    }
  };

  // Town Delivery Orders
  const [orders, setOrders] = useState([
    { id: 101, customer: 'Miss Honey', avatar: '👩‍🌾', request: '3x Wheat + 2x Berries', coins: 220, xp: 75, canFulfill: wheatStock >= 3 && berryStock >= 2 },
    { id: 102, customer: 'Mayor Truffle', avatar: '🎩', request: '1x Strawberry Tart + 2x Milk', coins: 340, xp: 120, canFulfill: bakedGoods.strawberryPie >= 1 && milkStock >= 2 },
    { id: 103, customer: 'Grandpa Barnaby', avatar: '👴', request: '2x Corn + 1x Sugar Donut', coins: 280, xp: 90, canFulfill: cornStock >= 2 && bakedGoods.sugarDonut >= 1 },
  ]);

  const handleFulfillOrder = (orderId) => {
    const o = orders.find((ord) => ord.id === orderId);
    if (!o) return;
    setFarmCoins((c) => c + o.coins);
    setFarmXp((x) => x + o.xp);
    setFarmGems((g) => g + 1);
    setMovesLeft((m) => m + 3);
    playChime();
    setSweetAnnouncement('TOWN DELIVERY COMPLETE! +' + o.coins + ' COINS & +3 CANDY MOVES!');
    // Reroll order
    setOrders((ordList) =>
      ordList.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              coins: ord.coins + 40,
              xp: ord.xp + 20,
              id: Date.now(),
            }
          : ord
      )
    );
  };

  // Background Ambience Styling by Time of Day
  const bgStyles = {
    day: 'bg-gradient-to-br from-sky-400 via-amber-200 to-emerald-400 text-slate-900',
    sunset: 'bg-gradient-to-br from-indigo-900 via-rose-700 to-amber-600 text-white',
    night: 'bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white',
  };

  return (
    <div className={'min-h-screen ' + bgStyles[timeOfDay] + ' font-sans transition-colors duration-700 flex flex-col'}>
      {/* ================= TOP SUGAR-FARM NAVIGATION BAR ================= */}
      <header className="backdrop-blur-md bg-black/40 border-b border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xl sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 flex items-center justify-center text-xl shadow-lg shadow-pink-500/40 ring-2 ring-white/30 animate-pulse">
            🍬
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-black text-base tracking-wide bg-gradient-to-r from-pink-300 via-amber-200 to-emerald-200 bg-clip-text text-transparent">
                CANDY CRUSH × FAMILY FARM
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-pink-500/30 text-pink-300 border border-pink-400/40">
                Sweet Harvest Saga
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 font-medium">
              Match Candies ➔ Harvest Crops ➔ Feed Livestock ➔ Deliver Orders
            </p>
          </div>
        </div>

        {/* Global Stats Dashboard */}
        <div className="flex items-center space-x-3 text-xs font-bold">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-200">
            <span>🪙</span>
            <span>{farmCoins.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-200">
            <span>💎</span>
            <span>{farmGems}</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-200">
            <span>⭐ Farm Lvl {farmLevel}</span>
            <span className="text-[10px] text-purple-300 font-normal">({farmXp} XP)</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-200">
            <span>🎯 Score: {score}</span>
          </div>

          {/* Time & Audio Controls */}
          <div className="flex items-center space-x-1 bg-white/10 rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setTimeOfDay('day')}
              className={'px-2 py-1 rounded-lg text-xs transition ' + (timeOfDay === 'day' ? 'bg-amber-400 text-slate-900 font-bold' : 'text-zinc-300 hover:text-white')}
              title="Day Mode"
            >
              ☀️
            </button>
            <button
              onClick={() => setTimeOfDay('sunset')}
              className={'px-2 py-1 rounded-lg text-xs transition ' + (timeOfDay === 'sunset' ? 'bg-rose-500 text-white font-bold' : 'text-zinc-300 hover:text-white')}
              title="Sunset Mode"
            >
              🌅
            </button>
            <button
              onClick={() => setTimeOfDay('night')}
              className={'px-2 py-1 rounded-lg text-xs transition ' + (timeOfDay === 'night' ? 'bg-indigo-600 text-white font-bold' : 'text-zinc-300 hover:text-white')}
              title="Night Mode"
            >
              🌙
            </button>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="px-2 py-1 text-xs text-zinc-300 hover:text-white"
              title="Toggle Web Audio SFX"
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
          </div>
        </div>
      </header>

      {/* ================= VIEW NAVIGATION TABS ================= */}
      <div className="bg-black/30 border-b border-white/10 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {[
            { id: 'dual', label: 'Split View (Match-3 + Farm)', icon: '⚡' },
            { id: 'candy', label: 'Candy Match-3 Arena', icon: '🍬' },
            { id: 'farm', label: 'Family Farm Estate', icon: '🏡' },
            { id: 'bakery', label: 'Sweet Bakery Kitchen', icon: '🧁' },
            { id: 'orders', label: 'Town Delivery Truck', icon: '🚚' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ' +
                (activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500 to-amber-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-black/20 text-zinc-300 hover:bg-white/10 hover:text-white')
              }
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Live Announcement Banner */}
        <div className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs font-black tracking-wider animate-bounce">
          ✨ {sweetAnnouncement}
        </div>
      </div>

      {/* ================= MAIN INTERACTIVE GAME AREA ================= */}
      <main className="flex-1 p-4 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ================= LEFT COLUMN: CANDY CRUSH MATCH-3 ARENA ================= */}
        {(activeTab === 'dual' || activeTab === 'candy') && (
          <section className={(activeTab === 'dual' ? 'lg:col-span-6' : 'lg:col-span-12') + ' space-y-4'}>
            <div className="backdrop-blur-xl bg-black/50 border border-white/20 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
              {/* Board Header Bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="px-3 py-1.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black text-sm shadow-md">
                    Moves: {movesLeft}
                  </div>
                  <div className="text-xs text-zinc-300">
                    Target: <span className="text-amber-300 font-bold">Harvest Resources for Farm</span>
                  </div>
                </div>

                {/* Match-3 Farm Boosters */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveBooster(activeBooster === 'pitchfork' ? null : 'pitchfork')}
                    className={
                      'px-2.5 py-1 rounded-xl text-xs font-bold border transition flex items-center space-x-1 ' +
                      (activeBooster === 'pitchfork'
                        ? 'bg-amber-400 text-slate-900 border-amber-300 ring-2 ring-amber-300 animate-pulse'
                        : 'bg-white/10 text-zinc-200 border-white/20 hover:bg-white/20')
                    }
                    title="Farm Pitchfork: Click any candy to pop it"
                  >
                    <span>🍴 Pitchfork</span>
                  </button>
                  <button
                    onClick={handleRoosterShuffle}
                    className="px-2.5 py-1 rounded-xl text-xs font-bold bg-white/10 text-zinc-200 border border-white/20 hover:bg-white/20 transition flex items-center space-x-1"
                    title="Rooster: Shuffle Candy Board (Costs 80 Coins)"
                  >
                    <span>🐔 Shuffle</span>
                  </button>
                  <button
                    onClick={handleTractorBlast}
                    className="px-2.5 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition flex items-center space-x-1 shadow-md shadow-cyan-500/30"
                    title="Golden Tractor: Blast crosshairs (Costs 2 Gems)"
                  >
                    <span>🚜 Tractor Blast</span>
                  </button>
                </div>
              </div>

              {/* 7x7 Interactive Candy Board Grid */}
              <div className="flex justify-center">
                <div className="grid grid-cols-7 gap-2 p-3 bg-black/40 rounded-3xl border border-white/15 shadow-inner">
                  {board.map((row, r) =>
                    row.map((cell, c) => {
                      const isSelected = selectedCell && selectedCell.r === r && selectedCell.c === c;
                      return (
                        <button
                          key={cell.id}
                          onClick={() => handleCellClick(r, c)}
                          className={
                            'w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 select-none shadow-md ' +
                            (isSelected
                              ? 'scale-110 ring-4 ring-amber-300 bg-white/40 shadow-amber-400/50 -translate-y-1 z-10'
                              : 'bg-white/10 hover:bg-white/25 hover:scale-105 active:scale-95')
                          }
                        >
                          <span className="drop-shadow-lg transform transition-transform hover:rotate-6">
                            {cell.icon}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Match Yield Guide */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-300">
                <span className="font-semibold text-pink-300">Match Combos Reward:</span>
                <span className="px-2 py-0.5 rounded-lg bg-pink-500/20 text-pink-200">🍓 ➔ Fresh Berries</span>
                <span className="px-2 py-0.5 rounded-lg bg-yellow-500/20 text-yellow-200">🍋 ➔ Citron Fertilizer</span>
                <span className="px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-200">🍬 ➔ Sugar Syrup</span>
                <span className="px-2 py-0.5 rounded-lg bg-amber-800/40 text-amber-200">🍫 ➔ Cocoa Fodder</span>
              </div>
            </div>

            {/* Farm Resources Inventory Bar */}
            <div className="backdrop-blur-md bg-black/40 border border-white/15 rounded-2xl p-3 grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-400/20">
                <div className="text-base">🍓</div>
                <div className="font-extrabold text-pink-200">{berryStock}</div>
                <div className="text-[10px] text-zinc-400">Berries</div>
              </div>
              <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-400/20">
                <div className="text-base">🍋</div>
                <div className="font-extrabold text-yellow-200">{fertilizerStock}</div>
                <div className="text-[10px] text-zinc-400">Fertilizers</div>
              </div>
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20">
                <div className="text-base">🍬</div>
                <div className="font-extrabold text-cyan-200">{sugarStock}</div>
                <div className="text-[10px] text-zinc-400">Sugar Cane</div>
              </div>
              <div className="p-2 rounded-xl bg-amber-700/20 border border-amber-500/30">
                <div className="text-base">🍫</div>
                <div className="font-extrabold text-amber-200">{cocoaFodder}</div>
                <div className="text-[10px] text-zinc-400">Animal Fodder</div>
              </div>
            </div>
          </section>
        )}

        {/* ================= RIGHT COLUMN: FAMILY FARM ESTATE & CROPS ================= */}
        {(activeTab === 'dual' || activeTab === 'farm') && (
          <section className={(activeTab === 'dual' ? 'lg:col-span-6' : 'lg:col-span-12') + ' space-y-4'}>
            <div className="backdrop-blur-xl bg-black/50 border border-white/20 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-black text-base text-emerald-300 flex items-center space-x-2">
                    <span>🏡</span>
                    <span>Sweet Haven Family Farm</span>
                  </h2>
                  <p className="text-xs text-zinc-300">Tap ripe crops to harvest or use Citron Fertilizer</p>
                </div>
                <div className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                  {farmPlots.filter((p) => p.stage >= p.maxStage).length} / {farmPlots.length} Plots Ripe
                </div>
              </div>

              {/* 6 Interactive Farm Crop Plots */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {farmPlots.map((plot) => {
                  const isReady = plot.stage >= plot.maxStage;
                  return (
                    <div
                      key={plot.id}
                      className={
                        'p-3.5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ' +
                        (isReady
                          ? 'bg-gradient-to-br from-emerald-900/60 to-emerald-700/40 border-emerald-400/50 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40'
                          : 'bg-black/40 border-white/10 hover:border-white/20')
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-zinc-200">{plot.name}</span>
                        {isReady && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-400 text-slate-900 font-extrabold animate-pulse">
                            READY!
                          </span>
                        )}
                      </div>

                      <div className="my-3 flex items-center justify-center">
                        <span className={'text-4xl transition-transform ' + (isReady ? 'animate-bounce scale-110' : 'opacity-60 scale-90')}>
                          {plot.icon}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/10">
                          <div
                            className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-300"
                            style={{ width: (plot.stage / plot.maxStage) * 100 + '%' }}
                          />
                        </div>

                        {isReady ? (
                          <button
                            onClick={() => handleHarvestPlot(plot.id)}
                            className="w-full py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs shadow-md transition active:scale-95 flex items-center justify-center space-x-1"
                          >
                            <span>Harvest</span>
                            <span>+{plot.harvestYield.amount}</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleFertilizePlot(plot.id)}
                            className="w-full py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 font-bold text-[11px] transition flex items-center justify-center space-x-1"
                          >
                            <span>🍋 Fertilize ({fertilizerStock})</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ================= LIVESTOCK PASTURE ================= */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <h3 className="font-extrabold text-sm text-amber-300 flex items-center space-x-2 mb-3">
                  <span>🐮</span>
                  <span>Farm Livestock & Animal Sanctuary</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {animals.map((animal) => (
                    <div
                      key={animal.id}
                      className="p-3 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{animal.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-white">{animal.name}</div>
                          <div className="text-[10px] text-zinc-300">Produces: {animal.product} {animal.productIcon}</div>
                        </div>
                      </div>

                      {animal.readyToHarvest ? (
                        <button
                          onClick={() => handleHarvestAnimal(animal.id)}
                          className="w-full py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center space-x-1 animate-pulse"
                        >
                          <span>Collect {animal.productIcon}</span>
                        </button>
                      ) : animal.hungry ? (
                        <button
                          onClick={() => handleFeedAnimal(animal.id)}
                          className="w-full py-1.5 rounded-xl bg-amber-700/30 hover:bg-amber-700/50 border border-amber-500/40 text-amber-200 font-bold text-[11px] transition flex items-center justify-center space-x-1"
                        >
                          <span>Feed Fodder 🍫 ({cocoaFodder})</span>
                        </button>
                      ) : (
                        <div className="text-center py-1 text-[11px] text-emerald-300 font-medium">Grazing peacefully...</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= BAKERY KITCHEN TAB ================= */}
        {activeTab === 'bakery' && (
          <section className="lg:col-span-12 space-y-4">
            <div className="backdrop-blur-xl bg-black/50 border border-white/20 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-black text-lg text-rose-300 flex items-center space-x-2">
                    <span>🧁</span>
                    <span>Sweet Sugar Windmill & Bakery</span>
                  </h2>
                  <p className="text-xs text-zinc-300">
                    Bake farm crops and candy sugar into luxury treats for town villagers
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <span className="px-3 py-1 rounded-xl bg-rose-500/20 text-rose-200 border border-rose-400/30">
                    Baked Tarts: {bakedGoods.strawberryPie}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-400/30">
                    Candied Donuts: {bakedGoods.sugarDonut}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">🥧</span>
                    <div>
                      <h3 className="font-bold text-sm text-white">Strawberry Cream Tart</h3>
                      <p className="text-[11px] text-zinc-400">Requires: 3x Berries (You have {berryStock}) + 1x Milk (You have {milkStock})</p>
                      <p className="text-xs text-emerald-300 font-bold mt-1">Reward: +120 Coins, +60 XP</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBake('pie')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-lg hover:brightness-110 active:scale-95 transition"
                  >
                    Bake Tart
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">🍩</span>
                    <div>
                      <h3 className="font-bold text-sm text-white">Sugar Candied Donut</h3>
                      <p className="text-[11px] text-zinc-400">Requires: 2x Wheat (You have {wheatStock}) + 2x Sugar (You have {sugarStock})</p>
                      <p className="text-xs text-emerald-300 font-bold mt-1">Reward: +100 Coins, +50 XP</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBake('donut')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-extrabold text-xs shadow-lg hover:brightness-110 active:scale-95 transition"
                  >
                    Bake Donut
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= TOWN DELIVERY ORDERS TAB ================= */}
        {activeTab === 'orders' && (
          <section className="lg:col-span-12 space-y-4">
            <div className="backdrop-blur-xl bg-black/50 border border-white/20 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-black text-lg text-cyan-300 flex items-center space-x-2">
                    <span>🚚</span>
                    <span>Town Delivery Truck & Customer Orders</span>
                  </h2>
                  <p className="text-xs text-zinc-300">
                    Deliver freshly harvested farm crops and candy goods for Coins, Gems, and Extra Candy Moves!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-black/40 border border-white/15 flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl shadow-inner">
                        {order.avatar}
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-white">{order.customer}</div>
                        <div className="text-[11px] text-zinc-400">Wants: {order.request}</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-bold">
                      <span className="text-amber-300">+{order.coins} Coins</span>
                      <span className="text-purple-300">+{order.xp} XP</span>
                      <span className="text-cyan-300">+1 Gem</span>
                      <span className="text-pink-300">+3 Moves</span>
                    </div>

                    <button
                      onClick={() => handleFulfillOrder(order.id)}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-extrabold text-xs shadow-lg transition active:scale-95 flex items-center justify-center space-x-1.5"
                    >
                      <span>Deliver Order</span>
                      <span>🚚</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="backdrop-blur-md bg-black/40 border-t border-white/10 px-4 py-2.5 text-center text-xs text-zinc-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Candy Crush Saga × Family Farm (Sweet Harvest) • Fully Interactive Playable Prototype</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Web Audio API: Active</span>
          <span>Dual Match-3 / Farm Engine: Synchronized</span>
          <span>Local Storage Checkpoint: Ready</span>
        </div>
      </footer>
    </div>
  );
}
`,
  },
};
