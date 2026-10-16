import React from 'react';
import { ShoppingBag, Calendar, Phone, MapPin, Clock, Star, Flame, ArrowRight } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Hero: React.FC = () => {
  const {
    businessConfig,
    isOpenNow,
    setIsBookModalOpen,
    theme
  } = useRestaurant();

  const isDark = theme === 'chargrill-dark';

  const scrollToMenuCategory = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const previewDishes = [
    {
      name: '5 Pizzas Offer',
      desc: 'Single-topping deal',
      img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80',
      price: '₹300'
    },
    {
      name: 'Kurkure Momos',
      desc: 'Crunchy 6 Pcs',
      img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=200&q=80',
      price: '₹120'
    },
    {
      name: 'Chilli Garlic Noodle',
      desc: 'Spicy wok tossed',
      img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=200&q=80',
      price: '₹100'
    },
    {
      name: 'Punjabi Maggi',
      desc: 'Butter tadka masala',
      img: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=200&q=80',
      price: '₹60'
    }
  ];

  return (
    <section className={`relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 border-b transition-colors duration-300 ${
      isDark
        ? 'bg-[#141210] text-[#FAF5EE] border-[#26201B]'
        : 'bg-[#FAF6EF] text-[#1C1917] border-[#EBDDC8]'
    }`}>
      {/* Warm ambient cafe glow in top right corner */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-[#F59E0B]/10' : 'bg-[#F5B731]/15'
      }`} />
      {isDark && (
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#FF6B00]/06 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl flex flex-col justify-center text-left">
          {/* Kicker badge */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider uppercase mb-3">
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
              isDark
                ? 'bg-[#F59E0B]/20 border border-[#F59E0B]/35 text-[#F59E0B]'
                : 'bg-[#E59A19]/15 border border-[#E59A19]/30 text-[#92400E]'
            }`}>
              <Flame className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
              <span>Indri’s Cafe & Pizzeria</span>
            </span>
            <span className="opacity-40" aria-hidden="true">·</span>
            <span className={`flex items-center gap-1 font-semibold ${
              isDark ? 'text-[#D6D3D1]' : 'text-[#57534E]'
            }`}>
              <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
              4.3★ (343+ Reviews)
            </span>
          </div>

          {/* Bold organic headline matching reference image */}
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] font-display ${
            isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
          }`}>
            CharGrill Cafe
            <span className={`block text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 ${
              isDark ? 'text-[#F59E0B]' : 'text-[#E59A19]'
            }`}>
              Pizza. Burgers. Shakes. Good Times.
            </span>
          </h1>

          {/* Clear, natural, authentic description */}
          <p className={`mt-3.5 text-sm sm:text-base max-w-2xl leading-relaxed ${
            isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'
          }`}>
            {businessConfig.shortDescription} Fresh dough pizza base, loaded burgers, sandwiches, and thick shakes right on <strong className={isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}>Garhi Birbal Road, near Patwar Khana, Indri</strong>.
          </p>

          {/* Key Information Chips */}
          <div className={`mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium ${
            isDark ? 'text-[#D6D3D1]' : 'text-[#57534E]'
          }`}>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>
                {isOpenNow ? (
                  <strong className={isDark ? 'text-emerald-400' : 'text-emerald-800'}>Open Now</strong>
                ) : (
                  <strong className={isDark ? 'text-amber-400' : 'text-amber-800'}>Closed</strong>
                )} · Closes 10:00 PM (Peak ~8 PM)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#F59E0B]">₹</span>
              <span>{businessConfig.priceRange} per person</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Garhi Birbal Rd, Indri</span>
            </div>
          </div>

          {/* Pill CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToMenuCategory()}
              className={`px-6 py-3.5 rounded-full font-extrabold text-sm tracking-wide shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer ${
                isDark
                  ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#121110] shadow-[#F59E0B]/20'
                  : 'bg-[#E59A19] hover:bg-[#D9880A] text-white shadow-[#E59A19]/30'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsBookModalOpen(true)}
              className={`px-6 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-xs flex items-center gap-2 transition-colors cursor-pointer border ${
                isDark
                  ? 'bg-[#221E1A] hover:bg-[#2C2621] text-[#FAF5EE] border-[#362F27] hover:border-[#F59E0B]'
                  : 'bg-white hover:bg-[#FAF6EF] text-[#1C1917] border-[#D8CEBE] hover:border-[#E59A19]'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#F59E0B]" />
              <span>Book a Table</span>
            </button>

            <a
              href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`}
              className={`px-4 py-3.5 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors ${
                isDark ? 'text-[#D6D3D1] hover:text-[#FAF5EE]' : 'text-[#44403C] hover:text-[#1C1917]'
              }`}
            >
              <Phone className="w-4 h-4 text-[#F59E0B]" />
              <span>{businessConfig.phone}</span>
            </a>
          </div>

          {/* Mini preview thumbnail strip */}
          <div className={`mt-8 pt-5 border-t max-w-2xl ${
            isDark ? 'border-[#26201B]' : 'border-[#EBDDC8]/90'
          }`}>
            <span className={`text-[11px] font-bold uppercase tracking-wider block mb-2.5 ${
              isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'
            }`}>
              Popular Quick Picks · Tap to explore
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {previewDishes.map((dish, i) => (
                <button
                  key={i}
                  onClick={() => scrollToMenuCategory()}
                  className={`p-2 rounded-2xl border shadow-xs text-left flex items-center gap-2 transition-all cursor-pointer group ${
                    isDark
                      ? 'bg-[#1C1917] border-[#2A241E] hover:border-[#F59E0B]'
                      : 'bg-white border-[#EBE2D5] hover:border-[#E59A19]'
                  }`}
                >
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className={`w-10 h-10 rounded-full object-cover shrink-0 border group-hover:scale-105 transition-transform ${
                      isDark ? 'border-[#2A241E]' : 'border-[#FAF6EF]'
                    }`}
                  />
                  <div className="min-w-0">
                    <div className={`text-xs font-bold truncate transition-colors leading-tight ${
                      isDark
                        ? 'text-[#FAF5EE] group-hover:text-[#F59E0B]'
                        : 'text-[#1C1917] group-hover:text-[#E59A19]'
                    }`}>
                      {dish.name}
                    </div>
                    <div className={`text-[11px] font-extrabold ${
                      isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'
                    }`}>
                      {dish.price}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
