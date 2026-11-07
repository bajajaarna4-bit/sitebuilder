export const amazonTemplate = {
  name: 'Aura Commerce — Amazon-Style E-Commerce Platform',
  category: 'E-Commerce & Retail',
  description: 'Enterprise e-commerce store with product search, category filtering, star reviews, interactive shopping cart drawer, and checkout preview.',
  files: {
    '/package.json': JSON.stringify(
      {
        name: 'aura-commerce',
        version: '1.0.0',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', next: '15.1.7', 'lucide-react': '^0.475.0' },
      },
      null,
      2
    ),
    '/src/data/products.ts': `export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  image: string;
  inStock: boolean;
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    title: 'Aura SoundPro Max — Spatial Noise-Cancelling Headphones',
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewsCount: 3120,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    badge: 'Overall Pick',
  },
  {
    id: 'prod_2',
    title: 'Mechanical Keymaster 75% — Wireless Hot-Swap RGB',
    price: 139.50,
    rating: 4.7,
    reviewsCount: 840,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'prod_3',
    title: 'Titanium Smartwatch Ultra — Blood Oxygen & GPS Tracking',
    price: 279.00,
    originalPrice: 320.00,
    rating: 4.9,
    reviewsCount: 4210,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    badge: 'Best Seller',
  },
  {
    id: 'prod_4',
    title: 'Minimalist Ceramic Pour-Over Kettle & Coffee Dripper',
    price: 64.99,
    rating: 4.6,
    reviewsCount: 520,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
];
`,
    '/src/App.tsx': `import React, { useState } from 'react';
import { PRODUCTS, Product } from './data/products';

export default function App() {
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const categories = ['All', 'Electronics', 'Computers', 'Wearables', 'Home & Kitchen'];
  const filtered = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="text-xl font-black text-amber-400 tracking-tight">AURA<span className="text-white">STORE</span></span>
          <div className="hidden md:flex space-x-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={\`px-3 py-1 text-xs rounded-full font-medium transition \${
                  selectedCategory === c ? 'bg-amber-400 text-black' : 'text-zinc-400 hover:text-white'
                }\`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg flex items-center space-x-2 text-sm border border-zinc-700"
        >
          <span>🛒 Cart</span>
          <span className="px-1.5 py-0.5 bg-amber-400 text-black text-xs font-bold rounded-full">
            {cart.reduce((a, b) => a + b.qty, 0)}
          </span>
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((prod) => (
            <div key={prod.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-amber-400/40 transition p-4">
              <div>
                <div className="relative h-48 bg-black rounded-lg overflow-hidden mb-3">
                  <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                  {prod.badge && (
                    <span className="absolute top-2 left-2 bg-amber-400 text-black text-[10px] font-bold px-2 py-0.5 rounded">
                      {prod.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-sm text-zinc-100 line-clamp-2 mb-1">{prod.title}</h3>
                <div className="flex items-center space-x-2 text-xs text-amber-400 mb-2">
                  <span>★ {prod.rating}</span>
                  <span className="text-zinc-500">({prod.reviewsCount.toLocaleString()})</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-bold text-white">\${prod.price.toFixed(2)}</span>
                  {prod.originalPrice && (
                    <span className="text-xs text-zinc-500 line-through">\${prod.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => addToCart(prod)}
                className="mt-4 w-full py-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-900 h-full p-6 flex flex-col justify-between border-l border-zinc-800">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">Your Shopping Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
              </div>
              {cart.length === 0 ? (
                <p className="text-zinc-500 text-sm">Your cart is currently empty.</p>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div>
                        <h4 className="text-xs font-semibold text-white line-clamp-1">{item.product.title}</h4>
                        <span className="text-xs text-zinc-400">\${item.product.price} × {item.qty}</span>
                      </div>
                      <span className="text-sm font-bold text-amber-400">\${(item.product.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-zinc-800 pt-4 space-y-3">
                <div className="flex justify-between font-bold text-base">
                  <span>Total:</span>
                  <span className="text-amber-400">\${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => alert("Proceeding to secure checkout...")}
                  className="w-full py-3 bg-amber-400 text-black font-bold text-sm rounded-lg hover:bg-amber-300 transition"
                >
                  Checkout Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
`,
    '/supabase/migrations/20261107_commerce_schema.sql': `-- Aura Commerce Schema
CREATE TABLE IF NOT EXISTS public.aura_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 100,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.aura_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'paid',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
`,
  },
};

