import React from 'react';
import { Sparkles, ArrowRight, Zap, ShieldCheck, Cpu } from 'lucide-react';

export default function Hero({ t, onPromptSelect, onOpenAIChat }) {
  const quickPrompts = t.hero.prompts;

  return (
    <section className="relative overflow-hidden py-12 px-4 lg:px-8 border-b border-white/5">
      {/* Background Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column Text */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
            {t.hero.titleMain} <br />
            <span className="text-ai-gradient">{t.hero.titleGradient}</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Quick Prompt Recommendation Chips */}
          <div className="space-y-2 pt-2">
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> {t.hero.tryAsking}
            </span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onPromptSelect(prompt.replace(/^[^\s]+\s/, ''));
                    onOpenAIChat();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 text-xs text-gray-300 hover:text-cyan-300 transition-all text-left flex items-center gap-1.5 group"
                >
                  <span>{prompt}</span>
                  <ArrowRight className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onOpenAIChat}
              className="btn-primary py-3 px-6 text-sm"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>{t.hero.launchAI}</span>
            </button>
            <a
              href="#catalog"
              className="btn-secondary py-3 px-6 text-sm"
            >
              {t.hero.explore}
            </a>
          </div>

          {/* Trust Badges */}
          <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.hero.trustAuthentic}</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>{t.hero.trustScore}</span>
            </div>
          </div>

        </div>

        {/* Right Column Featured Banner Graphic */}
        <div className="lg:col-span-5 relative">
          <div className="glass-panel p-6 relative overflow-hidden group border-white/15">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-400/30 transition-all duration-500" />
            
            <div className="flex items-center justify-between mb-4">
              <span className="badge-ai">{t.hero.spotlightBadge}</span>
              <span className="badge-score">98% Match</span>
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-video mb-4 border border-white/10 group-hover:scale-[1.02] transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                alt="Aetheris Pro Wireless ANC Headphones"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <div>
                  <h3 className="text-lg font-bold text-white">Aetheris Pro ANC</h3>
                  <p className="text-xs text-cyan-300">Spatial Audio • Hybrid ANC</p>
                </div>
                <span className="text-xl font-extrabold text-white">$249.99</span>
              </div>
            </div>

            <p className="text-xs text-gray-300 line-clamp-2 italic mb-4">
              "AI acoustic adaptation automatically tunes EQ based on your environment for peak audio clarity."
            </p>

            <button
              onClick={onOpenAIChat}
              className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" /> {t.hero.askAboutItem}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
