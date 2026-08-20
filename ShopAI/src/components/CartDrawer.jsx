import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({
  isOpen,
  t,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15.00;
  const total = Math.max(0, subtotal - discountAmount + shipping);
  const freeShippingThreshold = 150;
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AI20') {
      setDiscount(0.20);
      setPromoSuccess(true);
    } else {
      alert('Invalid Promo Code. Try code "AI20" for 20% off!');
    }
  };

  const handleCheckout = () => {
    setIsCheckedOut(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      onClearCart();
      setIsCheckedOut(false);
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md h-full bg-[#080c16] border-l border-white/10 flex flex-col justify-between shadow-2xl relative text-white">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0e1322]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-lg">{t?.cart?.title || 'Your Shopping Bag'}</h3>
            <span className="text-xs bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} {t?.cart?.items || 'Items'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-3 px-4 bg-cyan-950/30 border-b border-white/5 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Truck className="w-4 h-4 text-cyan-400" />
              {subtotal >= freeShippingThreshold ? (t?.cart?.freeShippingUnlocked || 'Free Shipping Unlocked!') : `${t?.cart?.addMoreForFreeShipping || 'Add $'}${(freeShippingThreshold - subtotal).toFixed(2)}${t?.cart?.forFreeShipping || ' for Free Shipping'}`}
            </span>
            <span className="text-gray-400">{Math.round(shippingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{t?.cart?.emptyTitle || 'Your cart is empty'}</h4>
                <p className="text-xs text-gray-400 mt-1">{t?.cart?.emptyDesc || 'Explore our catalog or ask ShopAI for smart picks!'}</p>
              </div>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3 relative group hover:border-cyan-400/30 transition-all"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover bg-black shrink-0 border border-white/5"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">${item.price.toFixed(2)}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-xs font-bold text-gray-300"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-xs">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-xs font-bold text-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-400 text-xs p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right font-extrabold text-sm text-cyan-300">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-[#080c16] space-y-3">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={t?.cart?.promoPlaceholder || 'Promo Code (e.g. AI20)'}
                  className="w-full pl-9 pr-3 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white uppercase placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200"
              >
                {t?.cart?.apply || 'Apply'}
              </button>
            </form>

            {promoSuccess && (
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> {t?.cart?.promoApplied || '20% AI Discount Applied!'}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-300 pt-2 border-t border-white/5">
              <div className="flex justify-between">
                <span>{t?.cart?.subtotal || 'Subtotal'}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>{t?.cart?.aiDiscount || 'AI Discount (20%)'}</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t?.cart?.shipping || 'Estimated Shipping'}</span>
                <span>{shipping === 0 ? <span className="text-emerald-400 font-bold">{t?.cart?.free || 'FREE'}</span> : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                <span>{t?.cart?.total || 'Total'}</span>
                <span className="text-cyan-300">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleCheckout}
              disabled={isCheckedOut}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 font-display font-extrabold text-sm text-black hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              {isCheckedOut ? (
                <span className="flex items-center gap-2 text-white">
                  <Sparkles className="w-4 h-4 animate-spin" /> {t?.cart?.processing || 'Processing Order...'}
                </span>
              ) : (
                <>
                  <span>{t?.cart?.checkout || 'Complete Purchase'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
