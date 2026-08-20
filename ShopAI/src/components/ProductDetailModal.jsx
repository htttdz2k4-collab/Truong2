import React, { useState } from 'react';
import { X, Star, Sparkles, ShoppingBag, Heart, ShieldCheck, Truck, Check, SlidersHorizontal } from 'lucide-react';

export default function ProductDetailModal({
  product,
  t,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare
}) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 p-6 relative text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left: Image Gallery */}
          <div className="md:col-span-6 space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#0b0f19] border border-white/10 relative">
              <img
                src={images[activeImgIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 badge-ai">{product.badge}</span>
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImgIndex === idx ? 'border-cyan-400 scale-105' : 'border-white/10 opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Specifications & AI Analysis */}
          <div className="md:col-span-6 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-cyan-400 font-semibold uppercase">{product.category}</span>
                <span className="text-xs text-gray-500">•</span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400">({product.reviewsCount} {t?.productDetail?.reviews || 'reviews'})</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold font-display text-white">{product.name}</h2>

              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-3xl font-extrabold text-white">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                  {product.stockCount > 0 ? `${t?.productDetail?.inStock || 'In Stock'} (${product.stockCount} ${t?.productDetail?.left || 'left'})` : (t?.productDetail?.outOfStock || 'Out of Stock')}
                </span>
              </div>
            </div>

            {/* AI Recommendation Highlight Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-purple-950/40 border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                  <Sparkles className="w-4 h-4 animate-pulse text-cyan-400" />
                  <span>{t?.productDetail?.whyMatch || 'Why ShopAI Match Score is'} {product.aiScore}%</span>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {product.aiReason}
              </p>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">{product.description}</p>

            {/* Specs Table */}
            {product.specs && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase text-gray-400">{t?.productDetail?.specsTitle || 'Specifications'}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                      <span className="text-gray-400 block text-[11px]">{key}</span>
                      <span className="font-semibold text-gray-200">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 font-bold text-gray-300"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 font-bold text-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-black hover:opacity-90'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" /> {t?.productCard?.added || 'Added to Cart'}
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" /> {t?.productDetail?.addToCart || 'Add to Cart'} (${(product.price * quantity).toFixed(2)})
                    </>
                  )}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    isWishlisted
                      ? 'bg-pink-500/20 text-pink-300 border-pink-500/40'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? (t?.productDetail?.wishlisted || 'Wishlisted') : (t?.productDetail?.wishlist || 'Save to Wishlist')}
                </button>

                <button
                  onClick={() => onToggleCompare(product.id)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    isCompared
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {isCompared ? (t?.productDetail?.comparing || 'Comparing') : (t?.productDetail?.compare || 'Compare Specs')}
                </button>
              </div>
            </div>

            {/* Shipping & Guarantee */}
            <div className="flex items-center gap-4 text-xs text-gray-400 pt-2">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-cyan-400" /> {t?.productDetail?.freeShipping || 'Free 2-Day Shipping'}
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> {t?.productDetail?.guarantee || '30-Day Money Back Guarantee'}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
