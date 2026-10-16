import React, { useState } from 'react';
import { Phone, ShoppingBag, Calendar, Menu as MenuIcon, X, Settings, MapPin, Sun, Moon } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Header: React.FC = () => {
  const {
    businessConfig,
    isOpenNow,
    cartCount,
    setIsCartOpen,
    setIsBookModalOpen,
    setIsAdminOpen,
    theme,
    toggleTheme
  } = useRestaurant();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'chargrill-dark';

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
      isDark
        ? 'bg-[#181614]/95 border-[#2A241E] text-[#FAF5EE]'
        : 'bg-[#FAF6EF]/90 border-[#EBDDC8] text-[#1C1917]'
    }`}>
      {/* Top Notice Bar */}
      <div className={`border-b px-4 py-1.5 text-xs transition-colors ${
        isDark
          ? 'bg-[#121110] border-[#241F1A] text-[#A8A29E]'
          : 'bg-[#F3EAD9] border-[#E7D6BE] text-[#44403C]'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-semibold">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className={isOpenNow ? (isDark ? 'text-emerald-400' : 'text-emerald-800') : (isDark ? 'text-amber-400' : 'text-amber-800')}>
                {isOpenNow ? 'Open Now' : 'Closed'}
              </span>
              <span className="opacity-40 hidden sm:inline">·</span>
              <span className="opacity-90 hidden sm:inline">
                {businessConfig.openingHoursDisplay}
              </span>
            </div>

            <span className="opacity-30 hidden md:inline">|</span>

            <div className="hidden md:flex items-center gap-1 opacity-90">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              <span>Garhi Birbal Road, near Patwar Khana, Indri</span>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden sm:inline font-medium opacity-90">
              <strong className="text-[#F59E0B]">4.3★</strong> (343+ Reviews)
            </span>
            <a
              href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`}
              className={`flex items-center gap-1.5 font-bold transition-colors ${
                isDark ? 'text-[#FAF5EE] hover:text-[#F59E0B]' : 'text-[#1C1917] hover:text-[#E59A19]'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{businessConfig.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo in the reference's pill-style badge */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform ${
            isDark
              ? 'bg-[#F59E0B] text-[#121110] shadow-[#F59E0B]/20'
              : 'bg-[#E59A19] text-white shadow-[#E59A19]/25'
          }`}>
            <span className="text-base tracking-tighter">CG</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-extrabold text-lg sm:text-xl tracking-tight font-display ${
                isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
              }`}>
                CharGrill
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                isDark
                  ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/35'
                  : 'bg-[#E59A19]/15 text-[#B45309] border border-[#E59A19]/30'
              }`}>
                INDRI
              </span>
            </div>
            <p className={`text-[11px] font-medium leading-none ${
              isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'
            }`}>
              Cafe & Pizzeria
            </p>
          </div>
        </a>

        {/* Clean Center Links */}
        <nav className={`hidden md:flex items-center gap-7 text-xs sm:text-sm font-semibold ${
          isDark ? 'text-[#D6D3D1]' : 'text-[#57534E]'
        }`}>
          <button
            onClick={() => scrollToSection('menu')}
            className={`transition-colors cursor-pointer ${isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'}`}
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection('offers')}
            className={`transition-colors cursor-pointer ${isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'}`}
          >
            Specials
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`transition-colors cursor-pointer ${isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'}`}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('location')}
            className={`transition-colors cursor-pointer ${isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'}`}
          >
            Location
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsBookModalOpen(true)}
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-full shadow-xs transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#221E1A] text-[#FAF5EE] border border-[#362F27] hover:border-[#F59E0B]'
                : 'bg-white text-[#1C1917] border border-[#E0D4C3] hover:border-[#E59A19]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Book Table</span>
          </button>

          {/* Golden / Flame Pill Order Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className={`relative px-4 sm:px-5 py-2 text-xs font-extrabold rounded-full flex items-center gap-2 cursor-pointer transition-transform active:scale-95 shadow-md ${
              isDark
                ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#121110] shadow-[#F59E0B]/20'
                : 'bg-[#E59A19] hover:bg-[#D9880A] text-white shadow-[#E59A19]/25'
            }`}
            aria-label="View Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order</span>
            {cartCount > 0 && (
              <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                isDark ? 'bg-[#121110] text-[#F59E0B]' : 'bg-[#1C1917] text-white'
              }`}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to Warm Cream Theme' : 'Switch to Dark Bistro Theme'}
            aria-label="Toggle Theme"
            className={`p-2 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
              isDark
                ? 'text-[#F59E0B] hover:text-amber-300 hover:bg-[#28221D]'
                : 'text-[#B45309] hover:text-[#E59A19] hover:bg-[#EBDDC8]/50'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Owner Dashboard link */}
          <button
            onClick={() => setIsAdminOpen(true)}
            title="Owner Dashboard"
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDark
                ? 'text-[#A8A29E] hover:text-[#FAF5EE] hover:bg-[#28221D]'
                : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#EBDDC8]/50'
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full ${
              isDark
                ? 'text-[#D6D3D1] hover:bg-[#28221D]'
                : 'text-[#57534E] hover:bg-[#EBDDC8]/50'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 py-4 space-y-2 text-sm font-semibold ${
          isDark
            ? 'bg-[#181614] border-[#2A241E] text-[#FAF5EE]'
            : 'bg-[#FAF6EF] border-[#EBDDC8] text-[#1C1917]'
        }`}>
          <button
            onClick={() => scrollToSection('menu')}
            className={`block w-full text-left py-2 ${isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'}`}
          >
            Our Menu & Pricing
          </button>
          <button
            onClick={() => scrollToSection('offers')}
            className={`block w-full text-left py-2 ${isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'}`}
          >
            Offers & Combos (Wednesday BOGO)
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`block w-full text-left py-2 ${isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'}`}
          >
            About CharGrill Indri
          </button>
          <button
            onClick={() => scrollToSection('location')}
            className={`block w-full text-left py-2 ${isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'}`}
          >
            Location, Hours & Map
          </button>
          <button
            onClick={() => {
              toggleTheme();
              setMobileMenuOpen(false);
            }}
            className={`flex items-center justify-between w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-colors ${
              isDark
                ? 'bg-[#221E1A] border-[#362F27] text-amber-400'
                : 'bg-white border-[#E0D4C3] text-amber-800'
            }`}
          >
            <span>Theme: {isDark ? 'Justdial Dark Bistro' : 'Warm Cream'}</span>
            <span className="flex items-center gap-1.5 text-[11px] underline">
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              Switch
            </span>
          </button>
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBookModalOpen(true);
              }}
              className={`flex-1 py-2 text-center rounded-full text-xs font-bold border ${
                isDark
                  ? 'bg-[#221E1A] border-[#362F27] text-[#FAF5EE]'
                  : 'bg-white border-[#E0D4C3] text-[#1C1917]'
              }`}
            >
              Book Table
            </button>
            <a
              href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`}
              className={`flex-1 py-2 text-center rounded-full text-xs font-bold ${
                isDark
                  ? 'bg-[#F59E0B] text-[#121110]'
                  : 'bg-[#E59A19] text-white'
              }`}
            >
              Call Cafe
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
