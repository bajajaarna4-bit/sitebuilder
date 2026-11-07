export const blinkitTemplate = {
  name: 'FlashCart — 10-Minute Quick Commerce Platform',
  category: 'Quick Commerce & Groceries',
  description: 'Ultra-fast delivery app featuring 10-minute timer, category drawer, quick item counters, live bill summary, and instant checkout.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'flashcart',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7', 'lucide-react': '^0.475.0' },
      },
      null,
      2
    ),
    '/src/data/items.ts': `export interface QuickItem {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  etaMinutes: number;
}

export const QUICK_ITEMS: QuickItem[] = [
  {
    id: 'b1',
    name: 'Fresh Farm Organic Whole Milk',
    weight: '1 Litre',
    price: 1.89,
    originalPrice: 2.20,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
    category: 'Dairy & Eggs',
    etaMinutes: 8,
  },
  {
    id: 'b2',
    name: 'Organic Hass Avocados (Pack of 2)',
    weight: '300g',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80',
    category: 'Fruits & Veg',
    etaMinutes: 10,
  },
  {
    id: 'b3',
    name: 'Artisan Sourdough Loaf Freshly Baked',
    weight: '450g',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    category: 'Bakery',
    etaMinutes: 11,
  },
  {
    id: 'b4',
    name: 'Cold Pressed Valencia Orange Juice',
    weight: '500ml',
    price: 2.75,
    originalPrice: 3.10,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80',
    category: 'Beverages',
    etaMinutes: 9,
  },
];
`,
    '/src/App.tsx': `import React, { useState } from 'react';
import { QUICK_ITEMS, QuickItem } from './data/items';

export default function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState('All');

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const categories = ['All', 'Dairy & Eggs', 'Fruits & Veg', 'Bakery', 'Beverages'];
  const filtered = activeCategory === 'All' ? QUICK_ITEMS : QUICK_ITEMS.filter((i) => i.category === activeCategory);

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(quantities).reduce((sum, [id, qty]) => {
    const item = QUICK_ITEMS.find((i) => i.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans pb-24">
      <header className="sticky top-0 z-30 bg-yellow-400 text-black px-6 py-3 flex items-center justify-between shadow-md">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-black tracking-tight">FlashCart</span>
            <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">⚡ 10 MINS</span>
          </div>
          <p className="text-xs font-semibold text-zinc-900">Delivering to: 42 Silicon Way, Tech District</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-black text-yellow-400 flex items-center justify-center font-bold text-xs">
          FC
        </div>
      </header>

      <div className="px-6 py-3 border-b border-zinc-800 bg-zinc-900/50 flex space-x-2 overflow-x-auto scrollbar-none">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={\`px-3 py-1 rounded-full text-xs font-semibold transition \${
              activeCategory === c ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }\`}
          >
            {c}
          </button>
        ))}
      </div>

      <main className="max-w-4xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const qty = quantities[item.id] || 0;
            return (
              <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="relative h-32 rounded-lg overflow-hidden bg-black mb-2">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 bg-black/80 text-[10px] text-yellow-400 font-bold px-1.5 py-0.5 rounded">
                      ⏱ {item.etaMinutes}m
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs text-white line-clamp-2">{item.name}</h4>
                  <span className="text-[11px] text-zinc-500">{item.weight}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-white">\${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-[10px] text-zinc-500 line-through ml-1">\${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  {qty === 0 ? (
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition"
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2 bg-emerald-600 rounded-lg px-2 py-0.5">
                      <button onClick={() => updateQty(item.id, -1)} className="font-bold text-sm text-white">-</button>
                      <span className="text-xs font-bold text-white">{qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="font-bold text-sm text-white">+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-zinc-950/90 backdrop-blur border-t border-zinc-800">
          <div className="max-w-xl mx-auto bg-emerald-600 rounded-xl p-3 px-5 flex items-center justify-between shadow-2xl text-white">
            <div>
              <span className="font-bold text-sm">{totalItems} items</span>
              <span className="mx-2">•</span>
              <span className="font-black text-base">\${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={() => alert(\`Order confirmed! FlashCart courier arrives in 10 minutes.\`)}
              className="px-4 py-1.5 bg-white text-emerald-950 font-black text-xs rounded-lg hover:bg-zinc-100 transition shadow"
            >
              Order in 10 mins →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
`,
    '/supabase/migrations/20261107_quick_commerce_schema.sql': `-- FlashCart Quick Commerce Schema
CREATE TABLE IF NOT EXISTS public.flashcart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price NUMERIC(8, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 50,
    eta_minutes INTEGER NOT NULL DEFAULT 10,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
`,
  },
};
