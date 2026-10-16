import React from 'react';
import { MapPin, Phone, Clock, Star, Instagram, Facebook, ArrowRight, Sparkles, Navigation, Calendar, PartyPopper } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const SpotlightSection: React.FC = () => {
  const { businessConfig, setIsBookModalOpen, theme } = useRestaurant();
  const isDark = theme === 'chargrill-dark';

  return (
    <section 
      id="spotlight" 
      className={`py-14 border-t transition-colors duration-300 ${
        isDark 
          ? 'bg-[#151311] border-stone-800 text-stone-200' 
          : 'bg-[#FAF6F0] border-stone-200/80 text-stone-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Cafe Atmosphere & Story */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className={`rounded-3xl p-7 sm:p-9 border relative overflow-hidden transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-[#1E1B17] to-[#171512] border-amber-500/20 shadow-xl shadow-black/40' 
                : 'bg-gradient-to-br from-[#FFFDF9] to-[#F5ECE0] border-amber-900/10 shadow-lg shadow-amber-950/5'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isDark 
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
                    : 'bg-amber-100 text-amber-900 border border-amber-200'
                }`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  Indri's Favorite Hangout
                </span>
                <span className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>• Est. 2024</span>
              </div>

              <h2 className={`font-serif text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 leading-snug ${
                isDark ? 'text-stone-100' : 'text-stone-900'
              }`}>
                Fresh Pizzas, Crispy Burgers & Sizzling Delights in Indri
              </h2>

              <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}>
                Located near Patwar Khana on Garhi Birbal Road, <strong className={isDark ? 'text-amber-400' : 'text-amber-800'}>Char Grill Cafe & Pizzeria</strong> brings authentic stone-baked crusts, double cheese recipes, sizzling tandoori gravies, and comforting cafe shakes to Karnal. 100% pure vegetarian, freshly prepped upon every order.
              </p>

              {/* Highlights row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-dashed border-stone-700/40">
                <div className={`p-3 rounded-xl border text-center ${
                  isDark ? 'bg-black/30 border-stone-800' : 'bg-[#FFFDF9] border-[#E8DBC5]'
                }`}>
                  <p className="text-xs text-stone-400">Pizzas From</p>
                  <p className={`text-lg font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>₹49</p>
                </div>
                <div className={`p-3 rounded-xl border text-center ${
                  isDark ? 'bg-black/30 border-stone-800' : 'bg-[#FFFDF9] border-[#E8DBC5]'
                }`}>
                  <p className="text-xs text-stone-400">Burgers From</p>
                  <p className={`text-lg font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>₹40</p>
                </div>
                <div className={`p-3 rounded-xl border text-center ${
                  isDark ? 'bg-black/30 border-stone-800' : 'bg-[#FFFDF9] border-[#E8DBC5]'
                }`}>
                  <p className="text-xs text-stone-400">Min Delivery</p>
                  <p className={`text-lg font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>₹170</p>
                </div>
                <div className={`p-3 rounded-xl border text-center ${
                  isDark ? 'bg-black/30 border-stone-800' : 'bg-[#FFFDF9] border-[#E8DBC5]'
                }`}>
                  <p className="text-xs text-stone-400">Rating</p>
                  <p className="text-lg font-bold text-amber-500">4.8 ★</p>
                </div>
              </div>
            </div>

            {/* Party Hall Banner */}
            <div className={`rounded-3xl p-6 sm:p-7 border flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-amber-950/40 via-[#1E1B17] to-amber-950/30 border-amber-500/30' 
                : 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/60 border-amber-300'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-amber-500 text-stone-950' : 'bg-amber-600 text-white'
                }`}>
                  <PartyPopper className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-serif text-lg font-bold mb-1 ${
                    isDark ? 'text-stone-100' : 'text-stone-900'
                  }`}>
                    Celebrate Birthday & Kitty Parties
                  </h3>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                    Private AC party hall at just ₹300/hr. <span className="font-semibold text-amber-500">FREE hall booking</span> on food orders above ₹2,000!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-md flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                Reserve Hall
              </button>
            </div>
          </div>

          {/* Right Column: Location & Quick Access */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className={`rounded-3xl p-7 border h-full flex flex-col justify-between transition-all duration-300 ${
              isDark 
                ? 'bg-[#1C1A17] border-stone-800' 
                : 'bg-[#FFFDF9] border-[#E8DBC5] shadow-md'
            }`}>
              <div>
                <h3 className={`font-serif text-xl font-bold mb-4 flex items-center gap-2 ${
                  isDark ? 'text-stone-100' : 'text-stone-900'
                }`}>
                  <MapPin className="w-5 h-5 text-amber-500" />
                  Visit Us in Indri
                </h3>

                <div className="space-y-4 text-sm">
                  <div className={`p-4 rounded-2xl border ${
                    isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-[#FAF6F0] border-stone-200'
                  }`}>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-amber-400' : 'text-amber-800'
                    }`}>Address</p>
                    <p className={`font-medium leading-relaxed ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>
                      {businessConfig.address}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3.5 rounded-2xl border ${
                      isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-[#FAF6F0] border-stone-200'
                    }`}>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1 ${
                        isDark ? 'text-amber-400' : 'text-amber-800'
                      }`}>
                        <Clock className="w-3 h-3" /> Timings
                      </p>
                      <p className={`font-bold ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>
                        {businessConfig.openingHoursDisplay}
                      </p>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${
                      isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-[#FAF6F0] border-stone-200'
                    }`}>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1 ${
                        isDark ? 'text-amber-400' : 'text-amber-800'
                      }`}>
                        <Phone className="w-3 h-3" /> Call Directly
                      </p>
                      <a 
                        href={`tel:${businessConfig.phone}`} 
                        className={`font-bold hover:underline ${isDark ? 'text-amber-400' : 'text-amber-700'}`}
                      >
                        {businessConfig.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5 pt-5 mt-4 border-t border-stone-700/30">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Char Grill Cafe Near Patwar Khana Garhi Birbal Road Indri Karnal')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider border transition-all ${
                    isDark 
                      ? 'bg-stone-800 hover:bg-stone-700 text-stone-100 border-stone-700 hover:border-amber-500/40' 
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                  }`}
                >
                  <Navigation className="w-4 h-4 text-amber-500" />
                  Get Google Maps Directions
                </a>

                <div className="flex gap-2">
                  <a
                    href="https://www.instagram.com/char_grill_indri/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold border transition-all ${
                      isDark 
                        ? 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-800' 
                        : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-500" />
                    @char_grill_indri
                  </a>
                  <a
                    href="https://www.justdial.com/Karnal/Chargrill-Cafe-Near-Patwar-Khana-Indri/9999PX184-X184-240504194929-A1J1_BZDET"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold border transition-all ${
                      isDark 
                        ? 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-800' 
                        : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    Justdial Page
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
