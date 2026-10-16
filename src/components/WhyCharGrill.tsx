import React from 'react';
import { Pizza, Sparkles, Users, MapPin, CheckCircle2 } from 'lucide-react';

export const WhyCharGrill: React.FC = () => {
  const points = [
    {
      icon: Pizza,
      title: 'Fresh Dough, Never Frozen',
      subtitle: 'Hand-stretched pizza base',
      desc: 'Our pizza dough is kneaded fresh right here in the kitchen. Crisp crust, soft airy crumb, and genuine 100% mozzarella cheese.'
    },
    {
      icon: Sparkles,
      title: '100% Vegetarian Fast Food',
      subtitle: 'Pure veg cafe comfort',
      desc: 'Full vegetarian kitchen serving paneer grills, fresh herb patties, white sauce alfredo pastas, and crispy wok-tossed Indo-Chinese.'
    },
    {
      icon: Users,
      title: 'Indri’s Favourite Evening Hangout',
      subtitle: 'Friends & family destination',
      desc: 'A comfortable place to unwind over loaded burgers and thick Oreo shakes. Especially lively around 8:00 PM for dinner and group celebrations.'
    },
    {
      icon: MapPin,
      title: 'Easy to Reach on Garhi Birbal Road',
      subtitle: 'Right near Patwar Khana',
      desc: 'Centrally located in Indri for easy dine-in, quick takeaway pickups on your way home, and prompt doorstep delivery.'
    }
  ];

  return (
    <section id="why-chargrill" className="py-16 bg-[#15161b] text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl text-left mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
            Real Food · Honest Flavours
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1 font-sans">
            Why Indri Loves CharGrill
          </h2>
          <p className="text-sm text-stone-300 mt-2">
            No gimmicks or microwave meals. Just freshly made pizzas, burgers, and shakes at honest local prices (₹200–₹400 per person).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#191b21] border border-stone-800/90 hover:border-orange-500/50 transition-all flex flex-col justify-between text-left group shadow-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-600/15 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider block">
                    {pt.subtitle}
                  </span>

                  <h3 className="text-lg font-bold text-white mt-1 group-hover:text-orange-300 transition-colors">
                    {pt.title}
                  </h3>

                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-800 flex items-center gap-1.5 text-[11px] text-stone-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Verified cafe guarantee</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
