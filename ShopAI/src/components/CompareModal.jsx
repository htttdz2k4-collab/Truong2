import React from 'react';
import { X, Star, Sparkles, Trash2, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function CompareModal({
  isOpen,
  t,
  onClose,
  compareIds,
  onRemoveCompare,
  onAddToCart
}) {
  if (!isOpen) return null;

  const compareProducts = PRODUCTS.filter(p => compareIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 p-6 relative text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="font-display font-bold text-xl">{t?.compare?.title || 'Product Spec Comparison Matrix'}</h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {compareProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>{t?.compare?.empty || 'No products selected for comparison. Click the comparison icon on any product card!'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr>
                  <th className="p-3 bg-white/5 border-b border-white/10 w-44 font-bold text-gray-400">{t?.compare?.feature || 'Feature'}</th>
                  {compareProducts.map(p => (
                    <th key={p.id} className="p-3 bg-white/5 border-b border-white/10 min-w-[200px] align-top">
                      <div className="flex justify-between items-start mb-2">
                        <span className="badge-ai">{p.badge}</span>
                        <button
                          onClick={() => onRemoveCompare(p.id)}
                          className="text-gray-400 hover:text-red-400 p-1"
                          title="Remove from comparison"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <img src={p.image} alt={p.name} className="w-24 h-24 rounded-xl object-cover mb-2 border border-white/10 bg-black" />
                      <h4 className="font-bold text-white line-clamp-2">{p.name}</h4>
                      <p className="text-base font-extrabold text-cyan-300 mt-1">${p.price.toFixed(2)}</p>
                      
                      <button
                        onClick={() => onAddToCart(p)}
                        className="w-full mt-3 py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black font-bold text-xs border border-cyan-500/30 transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> {t?.compare?.addToCart || 'Add to Cart'}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                <tr>
                  <td className="p-3 font-semibold text-gray-400 bg-white/[0.02]">{t?.compare?.aiMatchScore || 'AI Match Score'}</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-3 font-bold text-purple-300">
                      <span className="badge-score py-1 px-3 text-xs">{p.aiScore}% Match</span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-gray-400 bg-white/[0.02]">{t?.compare?.ratingReviews || 'Rating & Reviews'}</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-3">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{p.rating}</span>
                        <span className="text-gray-500">({p.reviewsCount})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-gray-400 bg-white/[0.02]">{t?.compare?.category || 'Category'}</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-3 font-medium">{p.category}</td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-gray-400 bg-white/[0.02]">{t?.compare?.availability || 'Availability'}</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-3">
                      <span className="text-emerald-400 font-semibold">{p.stockCount} in stock</span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-gray-400 bg-white/[0.02]">{t?.compare?.aiInsight || 'AI Insight'}</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-3 text-xs text-gray-300 leading-relaxed italic">
                      "{p.aiReason}"
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
