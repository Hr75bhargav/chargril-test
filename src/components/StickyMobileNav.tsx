import React from 'react';
import { Home, Utensils, ShoppingBag, Calendar, Phone } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const StickyMobileNav: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsBookModalOpen, businessConfig, theme } = useRestaurant();
  const isDark = theme === 'chargrill-dark';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`md:hidden fixed bottom-0 inset-x-0 z-40 backdrop-blur-md border-t px-2 py-1.5 shadow-lg transition-colors duration-300 ${
      isDark
        ? 'bg-[#141210]/95 border-[#28221D]'
        : 'bg-[#FAF6EF]/95 border-[#E5D7C2]'
    }`}>
      <div className={`grid grid-cols-5 gap-1 items-center max-w-md mx-auto text-[10px] font-bold ${
        isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'
      }`}>
        {/* Home */}
        <button
          onClick={scrollToTop}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'
          }`}
        >
          <Home className="w-5 h-5 opacity-70" />
          <span className="mt-0.5">Home</span>
        </button>

        {/* Menu */}
        <button
          onClick={() => scrollTo('menu')}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'
          }`}
        >
          <Utensils className="w-5 h-5 opacity-70" />
          <span className="mt-0.5">Menu</span>
        </button>

        {/* Order (Center Highlight Pill) */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative -top-2 flex flex-col items-center justify-center cursor-pointer"
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform ${
            isDark
              ? 'bg-[#F59E0B] text-[#121110] shadow-[#F59E0B]/30 ring-2 ring-[#141210]'
              : 'bg-[#E59A19] text-white shadow-[#E59A19]/30 ring-2 ring-[#FAF6EF]'
          }`}>
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center ${
                isDark ? 'bg-[#121110] text-[#F59E0B]' : 'bg-[#1C1917] text-white'
              }`}>
                {cartCount}
              </span>
            )}
          </div>
          <span className={`mt-0.5 font-extrabold text-[10px] ${
            isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'
          }`}>
            {cartCount > 0 ? `Cart (${cartCount})` : 'Order'}
          </span>
        </button>

        {/* Book */}
        <button
          onClick={() => setIsBookModalOpen(true)}
          className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'
          }`}
        >
          <Calendar className="w-5 h-5 opacity-70" />
          <span className="mt-0.5">Book</span>
        </button>

        {/* Call */}
        <a
          href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'
          }`}
        >
          <Phone className="w-5 h-5 text-[#F59E0B]" />
          <span className={`mt-0.5 font-bold ${isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'}`}>
            Call
          </span>
        </a>
      </div>
    </div>
  );
};
