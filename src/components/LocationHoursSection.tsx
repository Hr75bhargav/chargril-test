import React from 'react';
import { MapPin, Phone, Clock, Calendar, Navigation, ExternalLink } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const LocationHoursSection: React.FC = () => {
  const { businessConfig, isOpenNow, setIsBookModalOpen, theme } = useRestaurant();
  const isDark = theme === 'chargrill-dark';

  const daysOfWeek = [
    { day: 'Mon – Fri', hours: '10:30 AM – 10:00 PM' },
    { day: 'Wednesday', hours: '10:30 AM – 10:00 PM (BOGO Pizza)' },
    { day: 'Sat – Sun', hours: '10:30 AM – 10:00 PM (Taco Sunday)' }
  ];

  const openDirections = () => {
    const query = encodeURIComponent('CharGrill Cafe, Garhi Birbal Road, near Patwar Khana, Indri, Haryana 132041');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section id="location" className={`py-12 sm:py-16 border-b transition-colors duration-300 ${
      isDark
        ? 'bg-[#121110] text-[#FAF5EE] border-[#26201B]'
        : 'bg-[#FAF6EF] text-[#1C1917] border-[#EBDDC8]'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className={`text-[11px] font-extrabold uppercase tracking-widest block mb-1 ${
            isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'
          }`}>
            Easy to Reach · Landmark Near Patwar Khana
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-display ${
            isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
          }`}>
            Find Us in Indri
          </h2>
          <p className={`text-xs sm:text-sm mt-2 ${
            isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'
          }`}>
            Garhi Birbal Road, near Patwar Khana, Indri, Haryana 132041.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Compact Info Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 text-left">
            {/* Address & Hours card */}
            <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
              isDark
                ? 'bg-[#1C1917] border-[#2A241E]'
                : 'bg-[#FFFDF9] border-[#E8DBC5]'
            }`}>
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  isDark
                    ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                    : 'bg-[#E59A19]/15 text-[#E59A19]'
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
                    CharGrill Cafe, Indri
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-[#D6D3D1]' : 'text-[#57534E]'}`}>
                    Garhi Birbal Road, near Patwar Khana,<br />
                    Indri, Haryana 132041
                  </p>
                </div>
              </div>

              <div className={`pt-3 border-t flex items-center justify-between text-xs ${
                isDark ? 'border-[#26201B]' : 'border-[#F2E8DC]'
              }`}>
                <span className={isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}>Phone:</span>
                <a
                  href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`}
                  className={`font-bold transition-colors ${
                    isDark ? 'text-[#FAF5EE] hover:text-[#F59E0B]' : 'text-[#1C1917] hover:text-[#E59A19]'
                  }`}
                >
                  {businessConfig.phone}
                </a>
              </div>

              <div className={`pt-2 border-t ${isDark ? 'border-[#26201B]' : 'border-[#F2E8DC]'}`}>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className={`font-bold flex items-center gap-1.5 ${
                    isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
                  }`}>
                    <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Business Hours</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isOpenNow
                      ? (isDark ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' : 'bg-emerald-100 text-emerald-800')
                      : (isDark ? 'bg-amber-950/80 text-amber-400 border border-amber-800' : 'bg-amber-100 text-amber-800')
                  }`}>
                    {isOpenNow ? 'Open Now' : 'Closed'}
                  </span>
                </div>
                <div className={`space-y-1 text-xs ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                  {daysOfWeek.map((d, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{d.day}</span>
                      <span className={`font-medium ${isDark ? 'text-[#FAF5EE]' : 'text-[#44403C]'}`}>
                        {d.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={openDirections}
                className={`py-3 px-4 rounded-full font-black text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-transform active:scale-95 ${
                  isDark
                    ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#121110]'
                    : 'bg-[#E59A19] hover:bg-[#D9880A] text-white font-extrabold'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </button>

              <button
                onClick={() => setIsBookModalOpen(true)}
                className={`py-3 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer border ${
                  isDark
                    ? 'bg-[#221E1A] hover:bg-[#2C2621] text-[#FAF5EE] border-[#362F27] hover:border-[#F59E0B]'
                    : 'bg-[#FFFDF9] hover:bg-[#FAF6EF] text-[#1C1917] border-[#D8CEBE] hover:border-[#E59A19]'
                }`}
              >
                <Calendar className="w-4 h-4 text-[#F59E0B]" />
                <span>Book a Table</span>
              </button>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed (7 Cols) */}
          <div className="lg:col-span-7">
            <div className={`relative rounded-3xl overflow-hidden border shadow-sm h-72 sm:h-96 ${
              isDark ? 'bg-[#1C1917] border-[#2A241E]' : 'bg-[#FFFDF9] border-[#E8DBC5]'
            }`}>
              <iframe
                title="CharGrill Cafe Indri Location Map"
                src="https://maps.google.com/maps?q=CharGrill%20Cafe%20Garhi%20Birbal%20Road%20near%20Patwar%20Khana%20Indri%20Haryana%20132041&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />

              {/* Overlay card */}
              <div className={`absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs backdrop-blur-md border p-3 rounded-2xl shadow-md text-left ${
                isDark
                  ? 'bg-[#181614]/95 border-[#332C24] text-[#FAF5EE]'
                  : 'bg-[#FFFDF9]/95 border-[#E0D4C3] text-[#1C1917]'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs">
                    CharGrill Cafe, Indri
                  </span>
                  <span className="text-[11px] font-bold text-[#F59E0B]">4.3★</span>
                </div>
                <p className={`text-[11px] mt-0.5 line-clamp-1 ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                  Garhi Birbal Road, near Patwar Khana (132041)
                </p>
                <div className={`mt-1.5 pt-1.5 border-t flex items-center justify-between ${
                  isDark ? 'border-[#26201B]' : 'border-[#F2E8DC]'
                }`}>
                  <span className={`text-[10px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    Open till 10:00 PM
                  </span>
                  <button
                    onClick={openDirections}
                    className="text-[11px] font-bold text-[#F59E0B] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
