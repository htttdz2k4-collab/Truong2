import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, X, Send, Bot, User, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function AIChatDrawer({
  isOpen,
  t,
  onClose,
  initialPrompt,
  onAddToCart,
  onQuickView
}) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      text: t?.aiChat?.welcome || "Hello! I'm ShopAI Genius, your personal shopping neural assistant. Tell me what you're looking for or your budget, and I'll find the perfect match for you!",
      recommendations: [PRODUCTS[0], PRODUCTS[1]]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const generateAIResponse = useCallback((userText) => {
    const query = userText.toLowerCase();
    let responseText = "Based on your criteria, here are my top neural recommendations ranked by AI match score:";
    let matchedProducts = [];

    if (query.includes('headphone') || query.includes('audio') || query.includes('music') || query.includes('sound') || query.includes('tai nghe')) {
      matchedProducts = PRODUCTS.filter(p => p.category === 'Audio' || p.tags.includes('audio'));
      responseText = "Here are our top studio-grade spatial audio products with active noise cancellation:";
    } else if (query.includes('watch') || query.includes('wearable') || query.includes('fitness') || query.includes('glasses') || query.includes('ar') || query.includes('đồng hồ')) {
      matchedProducts = PRODUCTS.filter(p => p.category === 'Wearables');
      responseText = "Check out these cutting-edge wearables for health tracking & spatial computing:";
    } else if (query.includes('keyboard') || query.includes('mouse') || query.includes('desk') || query.includes('gaming') || query.includes('pc') || query.includes('bàn phím')) {
      matchedProducts = PRODUCTS.filter(p => p.category === 'Electronics' || p.tags.includes('desk setup'));
      responseText = "Here are top-tier ergonomic gaming and desk productivity gadgets:";
    } else if (query.includes('lamp') || query.includes('home') || query.includes('water') || query.includes('flask') || query.includes('gia dụng')) {
      matchedProducts = PRODUCTS.filter(p => p.category === 'Smart Home');
      responseText = "These smart home accessories bring ambient intelligence to your everyday routine:";
    } else if (query.includes('gift') || query.includes('under 100') || query.includes('cheap') || query.includes('budget') || query.includes('quà')) {
      matchedProducts = PRODUCTS.filter(p => p.price <= 120);
      responseText = "Here are top-rated tech gifts under $120 with high satisfaction scores:";
    } else {
      matchedProducts = PRODUCTS.slice(0, 3);
      responseText = `I analyzed your search for "${userText}". Here are the top items that match your style preferences:`;
    }

    return { responseText, matchedProducts };
  }, []);

  const handleSend = useCallback((textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const { responseText, matchedProducts } = generateAIResponse(text);
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        recommendations: matchedProducts
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  }, [inputValue, generateAIResponse]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, isOpen, handleSend]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  if (!isOpen) return null;

  const promptChips = t?.aiChat?.chips || [
    "Headphones under $250",
    "Smart home gadgets",
    "Gifts for gamers",
    "Ergonomic desk setup"
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md h-full bg-[#090d16] border-l border-white/10 flex flex-col justify-between shadow-2xl relative">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0f1424]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-[#070913] rounded-[11px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base flex items-center gap-1.5">
                {t?.aiChat?.title || 'ShopAI Genius'} <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </h3>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> {t?.aiChat?.subtitle || 'Online • Smart Recommendations'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-medium rounded-tr-none'
                      : 'bg-white/[0.05] border border-white/10 text-gray-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Embedded Recommendations in Chat */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="space-y-2">
                    {msg.recommendations.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onQuickView(item)}
                        className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between gap-3 cursor-pointer transition-all group"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover bg-black"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate group-hover:text-cyan-300">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-extrabold text-cyan-400">${item.price.toFixed(2)}</span>
                            <span className="badge-score text-[9px] py-0 px-1.5">{item.aiScore}% Match</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(item);
                          }}
                          className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/30 transition-all shrink-0"
                          title="Add to cart"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-purple-300" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-xs text-cyan-400 font-medium animate-pulse pl-2">
              <Bot className="w-4 h-4" />
              <span>{t?.aiChat?.thinking || 'ShopAI is thinking...'}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 px-4 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 text-[11px] text-gray-300 hover:text-cyan-300 whitespace-nowrap transition-all"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-[#090d16]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t?.aiChat?.placeholder || 'Ask for recommendations...'}
              className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-full text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold disabled:opacity-40 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
