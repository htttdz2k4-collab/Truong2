import React from 'react';
import { Sparkles, ShoppingBag, Heart, Search, Bot, Layers, SlidersHorizontal, Globe } from 'lucide-react';

export default function Navbar({
  lang,
  setLang,
  t,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onToggleAIChat,
  onOpenCompare,
  compareCount
}) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#070913]/85 border-b border-white/10 px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & Brand */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-2xl tracking-tight text-white">Shop</span>
                <span className="font-display font-extrabold text-2xl tracking-tight text-ai-gradient">AI</span>
                <span className="badge-ai text-[10px] py-0.5 px-2">Gen 4.5</span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide">{t.nav.brandSub}</p>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
              className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold flex items-center gap-1 text-gray-200"
            >
              <span>{lang === 'en' ? '🇺🇸 EN' : '🇻🇳 VI'}</span>
            </button>
            <button
              onClick={onToggleAIChat}
              className="p-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
              title={t.nav.askAI}
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
            </button>
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full bg-white/5 text-gray-200 border border-white/10"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar with AI Semantic Prompting */}
        <div className="relative w-full md:max-w-md lg:max-w-lg">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-cyan-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              className="w-full pl-10 pr-10 py-2.5 bg-white/[0.04] border border-white/10 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 text-xs text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Action Controls & AI Chat Launcher */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 flex items-center gap-1.5 transition-all"
            title="Switch Language / Đổi ngôn ngữ"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'en' ? '🇺🇸 EN' : '🇻🇳 VI'}</span>
          </button>

          {/* AI Genius Button */}
          <button
            onClick={onToggleAIChat}
            className="btn-primary py-2 px-4 text-xs group relative overflow-hidden"
          >
            <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
            <span>{t.nav.askAI}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
          </button>

          {/* Product Compare Badge Button */}
          {compareCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="btn-secondary py-2 px-3 text-xs flex items-center gap-1.5 border-purple-500/40 text-purple-300 hover:text-purple-200"
              title="Compare selected products"
            >
              <SlidersHorizontal className="w-4 h-4 text-purple-400" />
              <span>{t.nav.compare} ({compareCount})</span>
            </button>
          )}

          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-pink-400 transition-all"
            title={t.nav.wishlist}
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-cyan-400 transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-semibold hidden lg:inline">{t.nav.cart}</span>
            {cartCount > 0 && (
              <span className="bg-cyan-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <span className="text-xs text-gray-400 flex items-center gap-1 mr-2 shrink-0 font-medium">
          <Layers className="w-3.5 h-3.5 text-cyan-400" /> {t.nav.categories}
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm shadow-cyan-500/20'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
}
