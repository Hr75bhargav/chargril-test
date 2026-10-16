import React from 'react';
import { ShoppingBag, Calendar, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const QuickActionBar: React.FC = () => {
  const { businessConfig, setIsBookModalOpen } = useRestaurant();

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openDirections = () => {
    // Direct Google Maps navigation link to CharGrill Cafe on Garhi Birbal Road, Indri
    const encodedAddress = encodeURIComponent('CharGrill Cafe Garhi Birbal Road near Patwar Khana Indri Haryana 132041');
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="bg-[#181a1e] border-y border-stone-800 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          {/* Action 1: Order Food */}
          <button
            onClick={scrollToMenu}
            className="group relative p-3 sm:p-4 rounded-xl bg-stone-900/90 hover:bg-stone-850 border border-stone-700/80 hover:border-orange-500/80 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shrink-0">
                🍕
              </div>
              <div>
                <span className="block text-xs uppercase font-extrabold tracking-wider text-orange-400">
                  Quick Order
                </span>
                <span className="block text-sm sm:text-base font-bold text-white group-hover:text-orange-300 transition-colors">
                  Order Food
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-orange-400 transition-colors hidden sm:block shrink-0" />
          </button>

          {/* Action 2: Book a Table */}
          <button
            onClick={() => setIsBookModalOpen(true)}
            className="group relative p-3 sm:p-4 rounded-xl bg-stone-900/90 hover:bg-stone-850 border border-stone-700/80 hover:border-amber-500/80 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shrink-0">
                🪑
              </div>
              <div>
                <span className="block text-xs uppercase font-extrabold tracking-wider text-amber-400">
                  Dine-In
                </span>
                <span className="block text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  Book a Table
                </span>
              </div>
            </div>
            <Calendar className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transition-colors hidden sm:block shrink-0" />
          </button>

          {/* Action 3: Get Directions */}
          <button
            onClick={openDirections}
            className="group relative p-3 sm:p-4 rounded-xl bg-stone-900/90 hover:bg-stone-850 border border-stone-700/80 hover:border-blue-500/80 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shrink-0">
                📍
              </div>
              <div>
                <span className="block text-xs uppercase font-extrabold tracking-wider text-blue-400">
                  Map & Route
                </span>
                <span className="block text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  Get Directions
                </span>
              </div>
            </div>
            <MapPin className="w-4 h-4 text-stone-500 group-hover:text-blue-400 transition-colors hidden sm:block shrink-0" />
          </button>

          {/* Action 4: Call Now */}
          <a
            href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`}
            className="group relative p-3 sm:p-4 rounded-xl bg-stone-900/90 hover:bg-stone-850 border border-stone-700/80 hover:border-emerald-500/80 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shrink-0">
                📞
              </div>
              <div>
                <span className="block text-xs uppercase font-extrabold tracking-wider text-emerald-400">
                  Direct Line
                </span>
                <span className="block text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Call Now
                </span>
              </div>
            </div>
            <Phone className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 transition-colors hidden sm:block shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
};
