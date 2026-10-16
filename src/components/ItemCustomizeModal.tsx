import React, { useState, useMemo, useEffect } from 'react';
import { X, Plus, Minus, Check, ArrowLeft } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({ item, onClose }) => {
  const { addToCart, theme } = useRestaurant();
  const isDark = theme === 'chargrill-dark';

  // Keyboard shortcut: Close on ESC key
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const [selectedSize, setSelectedSize] = useState<{ name: string; price: number } | undefined>(
    item.sizes && item.sizes.length > 0 ? item.sizes[0] : undefined
  );

  const [selectedAddons, setSelectedAddons] = useState<{ name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  // Determine available addons:
  // If it's a pizza, provide official Pizza Extras adjusted for the selected size
  const effectiveAddons = useMemo(() => {
    if (item.category === 'pizza') {
      const sizeName = selectedSize?.name || 'Regular';
      const isLarge = sizeName.includes('Large');
      const isMedium = sizeName.includes('Medium');

      return [
        {
          name: `Cheese Burst Crust (${sizeName})`,
          price: isLarge ? 90 : isMedium ? 70 : 50
        },
        {
          name: `Extra Cheese (${sizeName})`,
          price: isLarge ? 70 : isMedium ? 50 : 30
        },
        {
          name: `Extra Topping (${sizeName})`,
          price: isLarge ? 40 : isMedium ? 30 : 20
        },
        {
          name: 'Extra Garlic Herb Dip',
          price: 20
        }
      ];
    }
    return item.addonOptions || [];
  }, [item, selectedSize]);

  const toggleAddon = (addon: { name: string; price: number }) => {
    const exists = selectedAddons.some(a => a.name === addon.name);
    if (exists) {
      setSelectedAddons(selectedAddons.filter(a => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const currentUnitPrice = (selectedSize ? selectedSize.price : item.price) +
    selectedAddons.reduce((sum, a) => sum + a.price, 0);

  const totalPrice = currentUnitPrice * quantity;

  const handleConfirm = () => {
    addToCart(item, quantity, selectedSize, selectedAddons, instructions.trim() || undefined);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border transition-colors duration-300 animate-in zoom-in-95 duration-150 ${
          isDark
            ? 'bg-[#181614] border-[#2A241E] text-[#FAF5EE]'
            : 'bg-[#FAF6EF] border-[#E5D7C2] text-[#1C1917]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-44 sm:h-52 w-full shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            isDark ? 'from-[#181614] via-transparent to-black/40' : 'from-[#FAF6EF] via-transparent to-black/30'
          }`} />

          {/* Top navigation actions */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border shadow-sm ${
                isDark
                  ? 'bg-[#181614]/90 hover:bg-[#28221D] text-[#FAF5EE] border-[#382E25]'
                  : 'bg-[#FFFDF9]/95 hover:bg-[#FFFDF9] text-[#1C1917] border-[#E0D4C3]'
              }`}
              title="Go Back (Esc)"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
              <span className="text-[10px] opacity-60 font-mono ml-0.5">Esc</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors cursor-pointer shadow-sm ${
                isDark
                  ? 'bg-[#181614]/90 hover:bg-red-950/70 hover:text-red-300 text-[#FAF5EE] border-[#382E25]'
                  : 'bg-[#FFFDF9]/95 hover:bg-red-50 hover:text-red-700 text-[#1C1917] border-[#E0D4C3]'
              }`}
              aria-label="Close dialog"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Pure Veg Badge */}
          <div className={`absolute bottom-2 left-4 flex items-center gap-1.5 backdrop-blur px-2.5 py-1 rounded-full border ${
            isDark
              ? 'bg-[#181614]/90 border-[#382E25]'
              : 'bg-[#FFFDF9]/95 border-[#E0D4C3]'
          }`}>
            <span className="w-2.5 h-2.5 rounded-xs border border-emerald-500 flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold text-emerald-400">
              Pure Vegetarian
            </span>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-left">
          <div>
            <h3 className={`text-xl sm:text-2xl font-extrabold font-display ${
              isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
            }`}>
              {item.name}
            </h3>
            <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${
              isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'
            }`}>
              {item.description}
            </p>
            {item.toppings && (
              <div className={`mt-2 text-xs font-medium p-2 rounded-xl ${
                isDark
                  ? 'text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/20'
                  : 'text-[#B45309] bg-[#E59A19]/10'
              }`}>
                <strong>Toppings:</strong> {item.toppings}
              </div>
            )}
          </div>

          {/* Size Options */}
          {item.sizes && item.sizes.length > 0 && (
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider block mb-2 ${
                isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'
              }`}>
                Select Size
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {item.sizes.map((s) => {
                  const isSelected = selectedSize?.name === s.name;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? (isDark
                              ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-[#FAF5EE]'
                              : 'bg-[#E59A19]/15 border-[#E59A19] text-[#1C1917]')
                          : (isDark
                              ? 'bg-[#1F1C19] border-[#2C2620] text-[#D6D3D1] hover:border-[#F59E0B]'
                              : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#57534E] hover:border-[#E59A19]')
                      }`}
                    >
                      <div className="text-xs font-bold">{s.name}</div>
                      <div className={`text-sm font-extrabold mt-0.5 ${
                        isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'
                      }`}>
                        ₹{s.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons / Pizza Extras */}
          {effectiveAddons.length > 0 && (
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider block mb-2 ${
                isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'
              }`}>
                {item.category === 'pizza' ? 'Pizza Extras & Crusts' : 'Extra Add-ons'}
              </span>
              <div className="space-y-2">
                {effectiveAddons.map((addon) => {
                  const isChecked = selectedAddons.some(a => a.name === addon.name);
                  return (
                    <button
                      key={addon.name}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`w-full p-2.5 rounded-2xl border flex items-center justify-between text-left cursor-pointer transition-all ${
                        isChecked
                          ? (isDark
                              ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-[#FAF5EE]'
                              : 'bg-[#E59A19]/10 border-[#E59A19] text-[#1C1917]')
                          : (isDark
                              ? 'bg-[#1F1C19] border-[#2C2620] text-[#D6D3D1]'
                              : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#57534E]')
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                          isChecked
                            ? (isDark ? 'bg-[#F59E0B] border-[#F59E0B]' : 'bg-[#E59A19] border-[#E59A19]')
                            : (isDark ? 'border-[#382E25]' : 'border-[#D8CEBE]')
                        }`}>
                          {isChecked && <Check className={`w-3 h-3 ${isDark ? 'text-black' : 'text-white'}`} />}
                        </div>
                        <span className="text-xs font-semibold">{addon.name}</span>
                      </div>
                      <span className={`text-xs font-bold ${isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'}`}>
                        +₹{addon.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
              isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'
            }`}>
              Cooking Notes
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Extra oregano, less spicy, well done crust..."
              className={`w-full px-3.5 py-2.5 rounded-full border text-xs focus:outline-none transition-colors ${
                isDark
                  ? 'bg-[#1F1C19] border-[#2C2620] text-[#FAF5EE] placeholder-[#78716C] focus:border-[#F59E0B]'
                  : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#1C1917] placeholder-[#A8A29E] focus:border-[#E59A19]'
              }`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 sm:p-5 border-t flex items-center justify-between gap-3 ${
          isDark
            ? 'bg-[#141210] border-[#26201B]'
            : 'bg-[#F3EAD9] border-[#E5D7C2]'
        }`}>
          <div className={`flex items-center gap-2 rounded-full p-1 border ${
            isDark ? 'bg-[#1F1C19] border-[#2C2620]' : 'bg-[#FFFDF9] border-[#E8DBC5]'
          }`}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer ${
                isDark ? 'text-[#FAF5EE] hover:bg-[#2A241E]' : 'text-[#57534E] hover:bg-[#FAF6EF]'
              }`}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className={`w-6 text-center font-bold text-xs ${
              isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
            }`}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer ${
                isDark ? 'text-[#FAF5EE] hover:bg-[#2A241E]' : 'text-[#57534E] hover:bg-[#FAF6EF]'
              }`}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`px-3.5 py-3 rounded-full font-bold text-xs border transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#1F1C19] hover:bg-[#2A241E] text-[#D6D3D1] border-[#2C2620]'
                : 'bg-[#FFFDF9] hover:bg-[#FAF6EF] text-[#57534E] border-[#E0D4C3]'
            }`}
            title="Cancel & Go Back (Esc)"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className={`flex-1 py-3 px-5 rounded-full font-black text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-between cursor-pointer transition-transform active:scale-95 ${
              isDark
                ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#121110] shadow-[#F59E0B]/20'
                : 'bg-[#E59A19] hover:bg-[#D9880A] text-white shadow-[#E59A19]/20 font-extrabold'
            }`}
          >
            <span>Add to Order</span>
            <span>₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
