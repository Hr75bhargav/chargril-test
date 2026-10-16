import React from 'react';
import { Phone, MapPin, Instagram, Facebook, ArrowUp, Settings } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Footer: React.FC = () => {
  const { businessConfig, setIsAdminOpen, setIsBookModalOpen, setIsCartOpen, theme } = useRestaurant();
  const isDark = theme === 'chargrill-dark';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t pt-12 pb-24 md:pb-12 text-left transition-colors duration-300 ${
      isDark
        ? 'bg-[#100E0D] text-[#A8A29E] border-[#241F1A]'
        : 'bg-[#F3EAD9] text-[#44403C] border-[#E5D7C2]'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b ${
          isDark ? 'border-[#241F1A]' : 'border-[#E0D4C3]'
        }`}>
          {/* Brand Info (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shadow-sm ${
                isDark
                  ? 'bg-[#F59E0B] text-[#121110]'
                  : 'bg-[#E59A19] text-white'
              }`}>
                CG
              </div>
              <div>
                <h3 className={`text-lg font-bold tracking-tight font-display ${
                  isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
                }`}>
                  CharGrill Cafe, Indri
                </h3>
                <p className={`text-[11px] font-semibold ${
                  isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'
                }`}>
                  Cafe & Pizzeria · Garhi Birbal Road
                </p>
              </div>
            </div>

            <p className={`text-xs max-w-sm leading-relaxed ${
              isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'
            }`}>
              Fresh pizza base, loaded burgers, grilled sandwiches, and thick shakes. The welcoming food hangout in Indri, Haryana.
            </p>

            <div className={`space-y-1.5 text-xs pt-1 ${
              isDark ? 'text-[#D6D3D1]' : 'text-[#57534E]'
            }`}>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <span>Near Patwar Khana, Indri, Haryana 132041</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <a
                  href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`}
                  className={`font-bold hover:underline ${
                    isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
                  }`}
                >
                  {businessConfig.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
            }`}>
              Navigation
            </h4>
            <ul className={`space-y-1.5 text-xs ${
              isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'
            }`}>
              <li>
                <button
                  onClick={scrollToTop}
                  className={`cursor-pointer ${isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'}`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('menu')}
                  className={`cursor-pointer ${isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'}`}
                >
                  Menu & Prices
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className={`cursor-pointer font-semibold ${isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'}`}
                >
                  Order Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsBookModalOpen(true)}
                  className={`cursor-pointer ${isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'}`}
                >
                  Book a Table
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('location')}
                  className={`cursor-pointer ${isDark ? 'hover:text-[#F59E0B]' : 'hover:text-[#E59A19]'}`}
                >
                  Map & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Social (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
            }`}>
              Connect
            </h4>
            <div className="flex items-center gap-2">
              <a
                href={businessConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-colors shadow-xs ${
                  isDark
                    ? 'bg-[#1C1917] border-[#2E2822] text-[#A8A29E] hover:text-[#F59E0B] hover:border-[#F59E0B]'
                    : 'bg-white border-[#D8CEBE] text-[#57534E] hover:text-[#E59A19] hover:border-[#E59A19]'
                }`}
                title="Instagram @char_grill_indri"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={businessConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-colors shadow-xs ${
                  isDark
                    ? 'bg-[#1C1917] border-[#2E2822] text-[#A8A29E] hover:text-[#F59E0B] hover:border-[#F59E0B]'
                    : 'bg-white border-[#D8CEBE] text-[#57534E] hover:text-[#E59A19] hover:border-[#E59A19]'
                }`}
                title="Facebook Char Grill Indri"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            <div className={`p-2.5 rounded-2xl border text-[11px] ${
              isDark
                ? 'bg-[#181614] border-[#26201B] text-[#D6D3D1]'
                : 'bg-white/70 border-[#E0D4C3] text-[#57534E]'
            }`}>
              <div className={`font-bold ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
                Hours: 10:30 AM – 10:00 PM
              </div>
              <div className={isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}>
                ₹200–₹400 / person · Pure Veg
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
          isDark ? 'text-[#78716C]' : 'text-[#78716C]'
        }`}>
          <div>
            © {new Date().getFullYear()} CharGrill Cafe, Indri. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className={`flex items-center gap-1 cursor-pointer transition-colors ${
                isDark ? 'text-[#A8A29E] hover:text-[#FAF5EE]' : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Owner Dashboard</span>
            </button>

            <span>·</span>

            <button
              onClick={scrollToTop}
              className={`flex items-center gap-1 cursor-pointer transition-colors ${
                isDark ? 'text-[#D6D3D1] hover:text-[#FAF5EE]' : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
