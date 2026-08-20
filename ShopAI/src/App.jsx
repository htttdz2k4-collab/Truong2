import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import AIChatDrawer from './components/AIChatDrawer';
import CartDrawer from './components/CartDrawer';
import CompareModal from './components/CompareModal';
import { PRODUCTS, CATEGORIES } from './data/products';
import { TRANSLATIONS } from './data/translations';
import { Sparkles, Bot, ArrowUpDown } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('shopai_lang') || 'vi');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('shopai_lang', newLang);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('aiScore'); // 'aiScore', 'priceLow', 'priceHigh', 'rating'
  
  const [cart, setCart] = useState([
    { ...PRODUCTS[0], quantity: 1 } // sample item in cart
  ]);
  const [wishlist, setWishlist] = useState(['p1', 'p3']);
  const [compareList, setCompareList] = useState(['p1', 'p2']);

  // Modals & Drawers State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [initialAIPrompt, setInitialAIPrompt] = useState('');

  // Cart Actions
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Actions
  const handleToggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Compare Actions
  const handleToggleCompare = (id) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        alert(lang === 'vi' ? 'Bạn chỉ có thể so sánh tối đa 3 sản phẩm cùng lúc.' : 'You can compare up to 3 products at once.');
        return prev;
      }
      return [...prev, id];
    });
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.tags.some(t => t.toLowerCase().includes(term)) ||
        p.description.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'aiScore') return b.aiScore - a.aiScore;
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchTerm, selectedCategory, sortBy]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#070913] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      
      {/* Navigation */}
      <Navbar
        lang={lang}
        setLang={handleSetLang}
        t={t}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={CATEGORIES}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          setSelectedCategory('All');
          setSearchTerm('');
        }}
        onToggleAIChat={() => setIsAIChatOpen(prev => !prev)}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          t={t}
          onPromptSelect={(promptText) => setInitialAIPrompt(promptText)}
          onOpenAIChat={() => setIsAIChatOpen(true)}
        />

        {/* Product Catalog Section */}
        <section id="catalog" className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                <span>{t.catalog.title}</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 font-semibold px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                  {filteredProducts.length} {t.cart.items}
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {t.catalog.subtitle}
              </p>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" /> {t.catalog.sortBy}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/[0.05] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all"
              >
                <option value="aiScore" className="bg-[#0f1424]">{t.catalog.sortOptionAIScore}</option>
                <option value="rating" className="bg-[#0f1424]">{t.catalog.sortOptionRating}</option>
                <option value="priceLow" className="bg-[#0f1424]">{t.catalog.sortOptionPriceLow}</option>
                <option value="priceHigh" className="bg-[#0f1424]">{t.catalog.sortOptionPriceHigh}</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="glass-panel text-center py-16 p-8 border-white/10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
                <Bot className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">{t.catalog.noProductsFound} "{searchTerm}"</h3>
                <p className="text-xs text-gray-400">{t.catalog.noProductsDesc}</p>
              </div>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="btn-secondary text-xs"
              >
                {t.catalog.resetFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  t={t}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setSelectedProduct(p)}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  isCompared={compareList.includes(product.id)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>
          )}

        </section>
      </main>

      {/* Floating AI Launcher FAB */}
      <button
        onClick={() => setIsAIChatOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black shadow-xl shadow-cyan-500/30 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 font-display font-extrabold group"
        title={t.nav.askAI}
      >
        <Sparkles className="w-6 h-6 animate-pulse group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-xs tracking-wide">{t.nav.askAI}</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
      </button>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        t={t}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        isCompared={selectedProduct ? compareList.includes(selectedProduct.id) : false}
        onToggleCompare={handleToggleCompare}
      />

      <AIChatDrawer
        isOpen={isAIChatOpen}
        t={t}
        onClose={() => setIsAIChatOpen(false)}
        initialPrompt={initialAIPrompt}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setSelectedProduct(p)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        t={t}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <CompareModal
        isOpen={isCompareOpen}
        t={t}
        onClose={() => setIsCompareOpen(false)}
        compareIds={compareList}
        onRemoveCompare={handleToggleCompare}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#05070e] py-10 px-4 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-[#070913] rounded-[7px] flex items-center justify-center">
                <Bot className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-display font-extrabold text-white text-lg">ShopAI Engine</span>
              <p className="text-xs text-gray-500">{t.footer.rights}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-400">
            <a href="#catalog" className="hover:text-cyan-400 transition-colors">{t.footer.catalog}</a>
            <button onClick={() => setIsAIChatOpen(true)} className="hover:text-cyan-400 transition-colors">{t.footer.aiGenius}</button>
            <button onClick={() => setIsCompareOpen(true)} className="hover:text-cyan-400 transition-colors">{t.footer.compareSpecs}</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
