import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, AlertCircle, ArrowLeft } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    appliedPromo,
    applyPromoCode,
    removePromo,
    setIsCheckoutOpen,
    theme
  } = useRestaurant();

  const isDark = theme === 'chargrill-dark';

  // Keyboard shortcut: Close on ESC key
  useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput.trim());
    if (res.success) {
      setPromoInput('');
      setPromoError(null);
    } else {
      setPromoError(res.message);
    }
  };

  const proceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.code === 'CHARGRILL50') {
      discount = 50;
    } else if (appliedPromo.code === 'BOGOPIZZA') {
      discount = 70;
    } else {
      discount = 30;
    }
  }

  const finalTotal = Math.max(0, cartSubtotal - discount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md border-l flex flex-col shadow-2xl transition-colors duration-300 ${
          isDark
            ? 'bg-[#181614] border-[#2A241E] text-[#FAF5EE]'
            : 'bg-[#FAF6EF] border-[#E5D7C2] text-[#1C1917]'
        }`}>
          {/* Header */}
          <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
            isDark
              ? 'bg-[#141210] border-[#26201B]'
              : 'bg-[#F3EAD9] border-[#E5D7C2]'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                isDark ? 'bg-[#F59E0B] text-[#121110]' : 'bg-[#E59A19] text-white'
              }`}>
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h3 className={`font-extrabold text-base ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
                  Your Cart
                </h3>
                <p className={`text-[11px] ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} · CharGrill Indri
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-red-500 hover:text-red-400 px-2 py-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer border transition-colors ${
                  isDark
                    ? 'bg-[#221E1A] hover:bg-[#2C2621] text-[#D6D3D1] border-[#362F27]'
                    : 'bg-[#FFFDF9] hover:bg-[#EBDDC8] text-[#57534E] border-[#E0D4C3]'
                }`}
                title="Go Back (Esc)"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
                <span className="text-[10px] opacity-60 font-mono">Esc</span>
              </button>
              <button
                onClick={() => setIsCartOpen(false)}
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border transition-colors ${
                  isDark
                    ? 'bg-[#221E1A] hover:bg-red-950/60 hover:text-red-300 text-[#D6D3D1] border-[#362F27]'
                    : 'bg-[#FFFDF9] hover:bg-red-50 hover:text-red-700 text-[#57534E] border-[#E0D4C3]'
                }`}
                aria-label="Close cart"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 text-left">
            {cart.length === 0 ? (
              <div className={`py-16 text-center space-y-3 ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto text-2xl shadow-xs border ${
                  isDark ? 'bg-[#221E1A] border-[#362F27]' : 'bg-[#FFFDF9] border-[#E8DBC5]'
                }`}>
                  🍕
                </div>
                <h4 className={`font-bold text-base ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
                  Your cart is empty
                </h4>
                <p className="text-xs max-w-xs mx-auto opacity-80">
                  Explore our fresh pizza, loaded burgers, and thick shakes.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className={`mt-2 px-5 py-2 rounded-full font-bold text-xs cursor-pointer ${
                    isDark
                      ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#121110]'
                      : 'bg-[#E59A19] hover:bg-[#D9880A] text-white'
                  }`}
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border shadow-xs flex gap-3 ${
                    isDark
                      ? 'bg-[#1F1C19] border-[#2E2822]'
                      : 'bg-[#FFFDF9] border-[#E8DBC5]'
                  }`}
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-black/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className={`font-bold text-xs sm:text-sm truncate ${
                        isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
                      }`}>
                        {item.menuItem.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-500 p-1 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className={`text-[11px] ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                      {item.selectedSize && <span>Size: {item.selectedSize.name}</span>}
                      {item.selectedAddons && item.selectedAddons.length > 0 && (
                        <span> · +{item.selectedAddons.map((a) => a.name).join(', ')}</span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className={`flex items-center gap-1.5 rounded-full p-0.5 border ${
                        isDark ? 'bg-[#141210] border-[#2A241E]' : 'bg-[#F3EAD9] border-[#E5D7C2]'
                      }`}>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${
                            isDark ? 'text-[#FAF5EE] hover:bg-[#2A241E]' : 'text-[#57534E] hover:bg-[#FFFDF9]'
                          }`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className={`w-5 text-center text-xs font-bold ${
                          isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
                        }`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${
                            isDark ? 'text-[#FAF5EE] hover:bg-[#2A241E]' : 'text-[#57534E] hover:bg-[#FFFDF9]'
                          }`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className={`font-extrabold text-sm ${
                        isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
                      }`}>
                        ₹{item.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Coupon input */}
            {cart.length > 0 && (
              <div className="pt-2">
                {appliedPromo ? (
                  <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                    isDark
                      ? 'bg-[#F59E0B]/15 border-[#F59E0B]/35 text-[#F59E0B]'
                      : 'bg-[#E59A19]/15 border-[#E59A19]/40 text-[#92400E]'
                  }`}>
                    <div>
                      <div className="font-bold">
                        {appliedPromo.title} ({appliedPromo.code})
                      </div>
                      <div className="text-[10px] opacity-80">Discount: ₹{discount} applied</div>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-xs hover:text-red-500 font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCode} className="space-y-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => {
                            setPromoInput(e.target.value);
                            setPromoError(null);
                          }}
                          placeholder="Coupon Code (e.g. BOGOPIZZA)"
                          className={`w-full pl-8 pr-3 py-2 rounded-full border text-xs uppercase font-mono focus:outline-none ${
                            isDark
                              ? 'bg-[#1F1C19] border-[#2E2822] text-[#FAF5EE] focus:border-[#F59E0B]'
                              : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#1C1917] focus:border-[#E59A19]'
                          }`}
                        />
                      </div>
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${
                          isDark
                            ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#121110]'
                            : 'bg-[#1C1917] hover:bg-[#292524] text-white'
                        }`}
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{promoError}</span>
                      </p>
                    )}
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className={`p-4 sm:p-5 border-t space-y-3 ${
              isDark
                ? 'bg-[#141210] border-[#26201B]'
                : 'bg-[#F3EAD9] border-[#E5D7C2]'
            }`}>
              <div className="space-y-1 text-xs">
                <div className={`flex justify-between ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  <span>Subtotal</span>
                  <span className={`font-semibold ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
                    ₹{cartSubtotal}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className={`pt-2 border-t flex justify-between font-black text-base ${
                  isDark ? 'border-[#26201B] text-[#FAF5EE]' : 'border-[#E5D7C2] text-[#1C1917]'
                }`}>
                  <span>Total Amount</span>
                  <span className={isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'}>
                    ₹{finalTotal}
                  </span>
                </div>
              </div>

              <button
                onClick={proceedToCheckout}
                className={`w-full py-3.5 px-4 rounded-full font-black text-sm tracking-wide shadow-md flex items-center justify-between cursor-pointer transition-transform active:scale-95 ${
                  isDark
                    ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#121110] shadow-[#F59E0B]/20'
                    : 'bg-[#E59A19] hover:bg-[#D9880A] text-white shadow-[#E59A19]/25 font-extrabold'
                }`}
              >
                <span>Proceed to Checkout</span>
                <div className="flex items-center gap-1">
                  <span>₹{finalTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
