import React from 'react';
import { Star, Heart, ShoppingBag, Eye, Check, SlidersHorizontal } from 'lucide-react';

export default function ProductCard({
  product,
  t,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare
}) {
  const [added, setAdded] = React.useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="glass-panel p-4 rounded-2xl relative flex flex-col justify-between group cursor-pointer border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
    >
      {/* Top Badges */}
      <div className="flex items-center justify-between z-10 mb-2">
        <span className="badge-ai">{product.badge}</span>
        <span className="badge-score">{product.aiScore}% {t?.productCard?.match || 'Match'}</span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-[#0b0f19] border border-white/5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all"
            title={t?.productCard?.quickView || 'Quick View'}
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-pink-500 text-white'
                : 'bg-white/20 hover:bg-white/40 text-white'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product.id);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
              isCompared
                ? 'bg-purple-500 text-white'
                : 'bg-white/20 hover:bg-white/40 text-white'
            }`}
            title="Compare Product"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-2 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-gray-500">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-display font-bold text-white text-base line-clamp-1 group-hover:text-cyan-300 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-2 mt-1 font-normal">
            {product.aiReason}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between mt-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-white">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`p-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 ${
              added
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                : 'bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/30'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> {t?.productCard?.added || 'Added'}
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> {t?.productCard?.add || 'Add'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
