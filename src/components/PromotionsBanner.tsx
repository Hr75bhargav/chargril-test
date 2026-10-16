import React, { useState } from 'react';
import { Tag, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const PromotionsBanner: React.FC = () => {
  const { promotions, applyPromoCode, setIsCartOpen } = useRestaurant();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleApply = (code?: string, id?: string) => {
    if (!code) return;
    const res = applyPromoCode(code);
    if (id) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
    if (res.success) {
      setIsCartOpen(true);
    }
  };

  if (!promotions || promotions.length === 0) return null;

  return (
    <section id="offers" className="py-8 bg-[#141518] border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-orange-400">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Weekly CharGrill Specials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 font-sans">
              Offers & Value Combos
            </h2>
          </div>
          <p className="text-xs text-stone-400 max-w-sm">
            Valid for online pickup and delivery orders in Indri. Apply coupons during checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="relative p-5 rounded-2xl bg-gradient-to-b from-[#1c1e23] to-[#16171b] border border-stone-700/80 hover:border-orange-500/60 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-orange-400">
                    {promo.dayText}
                  </span>
                  {promo.badge && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-orange-600/20 text-orange-300 border border-orange-500/30">
                      {promo.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                  {promo.title}
                </h3>

                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  {promo.description}
                </p>
              </div>

              {promo.code && (
                <div className="mt-5 pt-4 border-t border-stone-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-black text-amber-300 bg-stone-900 px-2.5 py-1 rounded border border-stone-700">
                    <Tag className="w-3 h-3 text-orange-400" />
                    <span>{promo.code}</span>
                  </div>

                  <button
                    onClick={() => handleApply(promo.code, promo.id)}
                    className="text-xs font-bold text-stone-200 hover:text-white bg-stone-800 hover:bg-orange-600 px-3 py-1.5 rounded-lg border border-stone-700 hover:border-orange-500 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === promo.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Applied!</span>
                      </>
                    ) : (
                      <>
                        <span>Apply Code</span>
                        <ArrowRight className="w-3 h-3 text-stone-400" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
