import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, Check, AlertCircle } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';
import { ItemCustomizeModal } from './ItemCustomizeModal';

export const MenuSection: React.FC = () => {
  const {
    menuItems,
    categories,
    addToCart,
    cart,
    selectedItemForCustomize,
    setSelectedItemForCustomize,
    theme
  } = useRestaurant();

  const isDark = theme === 'chargrill-dark';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePizzaSubcategory, setActivePizzaSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllItems, setShowAllItems] = useState(false);

  const pizzaSubcategories = [
    { id: 'all', name: 'All Pizzas' },
    { id: 'Single-Topping', name: 'Single-Topping (From ₹49)' },
    { id: 'Double-Topping', name: 'Double-Topping (From ₹80)' },
    { id: 'Simple Veg', name: 'Simple Veg (From ₹100)' },
    { id: 'Veg 1', name: 'Veg 1 (From ₹150)' },
    { id: 'Veg 2', name: 'Veg 2 (From ₹180)' },
    { id: 'Veg 3', name: 'Veg 3 (From ₹200)' }
  ];

  // Filter items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Pizza subcategory match
      if (activeCategory === 'pizza' && activePizzaSubcategory !== 'all') {
        if (item.subCategory !== activePizzaSubcategory) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesToppings = item.toppings?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesToppings) {
          return false;
        }
      }
      return true;
    });
  }, [menuItems, activeCategory, activePizzaSubcategory, searchQuery]);

  // Keep it shorter on initial view if on 'all' without search
  const displayedItems = useMemo(() => {
    if (searchQuery || activeCategory !== 'all' || showAllItems) {
      return filteredItems;
    }
    return filteredItems.slice(0, 9);
  }, [filteredItems, searchQuery, activeCategory, showAllItems]);

  const getItemCartQty = (itemId: string) => {
    return cart
      .filter((ci) => ci.menuItem.id === itemId)
      .reduce((sum, ci) => sum + ci.quantity, 0);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.sizes && item.sizes.length > 0) {
      setSelectedItemForCustomize(item);
    } else {
      addToCart(item);
    }
  };

  return (
    <section id="menu" className={`py-12 sm:py-16 border-b transition-colors duration-300 ${
      isDark
        ? 'bg-[#121110] text-[#FAF5EE] border-[#26201B]'
        : 'bg-[#FAF6EF] text-[#1C1917] border-[#EBDDC8]'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className={`text-[11px] font-extrabold uppercase tracking-widest block mb-1 ${
            isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'
          }`}>
            CharGrill Cafe & Pizzeria Menu · All Prices in ₹
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-display ${
            isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
          }`}>
            Explore Full Menu & Order
          </h2>
          <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${
            isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'
          }`}>
            Pizzas, burgers, sandwiches, pasta, kurkure momos, sizzling Chinese, and thick shakes. Minimum delivery order: ₹170.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-6 space-y-3">
          {/* Main Category Tabs */}
          <div className="w-full overflow-x-auto pb-1 scrollbar-none">
            <div className={`flex items-center gap-1.5 min-w-max p-1 rounded-full border ${
              isDark ? 'bg-[#1A1815] border-[#2A241E]' : 'bg-[#F3EAD9] border-[#E5D7C2]'
            }`}>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setActivePizzaSubcategory('all');
                  setShowAllItems(false);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? (isDark ? 'bg-[#F59E0B] text-[#121110] shadow-xs' : 'bg-[#E59A19] text-white shadow-xs')
                    : (isDark ? 'text-[#A8A29E] hover:text-[#FAF5EE]' : 'text-[#57534E] hover:text-[#1C1917]')
                }`}
              >
                All Popular ({menuItems.length})
              </button>
              {categories.map((cat) => {
                const count = menuItems.filter(i => i.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setActivePizzaSubcategory('all');
                      setShowAllItems(true);
                    }}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      activeCategory === cat.id
                        ? (isDark ? 'bg-[#F59E0B] text-[#121110] shadow-xs' : 'bg-[#E59A19] text-white shadow-xs')
                        : (isDark ? 'text-[#A8A29E] hover:text-[#FAF5EE]' : 'text-[#57534E] hover:text-[#1C1917]')
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pizza Sub-categories if Pizzas is selected */}
          {activeCategory === 'pizza' && (
            <div className="w-full overflow-x-auto pb-1 scrollbar-none animate-in fade-in duration-200">
              <div className={`flex items-center gap-1.5 min-w-max p-1 rounded-full border shadow-xs ${
                isDark ? 'bg-[#1A1815] border-[#2A241E]' : 'bg-[#FFFDF9] border-[#E8DBC5]'
              }`}>
                {pizzaSubcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActivePizzaSubcategory(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      activePizzaSubcategory === sub.id
                        ? (isDark ? 'bg-[#FAF5EE] text-[#121110]' : 'bg-[#1C1917] text-white')
                        : (isDark ? 'text-[#A8A29E] hover:text-[#FAF5EE]' : 'text-[#57534E] hover:text-[#1C1917]')
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="relative w-full max-w-md mx-auto">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              isDark ? 'text-[#78716C]' : 'text-[#A8A29E]'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by item name or toppings (e.g. chaap, paneer, mushroom, momos, burger)..."
              className={`w-full pl-9 pr-3 py-2 rounded-full border text-xs shadow-xs focus:outline-none transition-colors ${
                isDark
                  ? 'bg-[#1A1815] border-[#2E2822] text-[#FAF5EE] placeholder-[#78716C] focus:border-[#F59E0B]'
                  : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#1C1917] placeholder-[#A8A29E] focus:border-[#E59A19]'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
                  isDark ? 'text-[#A8A29E] hover:text-[#FAF5EE]' : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Menu Items Grid */}
        {displayedItems.length === 0 ? (
          <div className={`py-12 text-center rounded-3xl border p-6 ${
            isDark ? 'bg-[#1C1917] border-[#2A241E]' : 'bg-[#FFFDF9] border-[#E8DBC5]'
          }`}>
            <AlertCircle className="w-8 h-8 text-[#A8A29E] mx-auto mb-2" />
            <h3 className={`text-base font-bold ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
              No dishes found
            </h3>
            <p className={`text-xs mt-1 ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
              Try another search or select a different category above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedItems.map((item) => {
              const inCartQty = getItemCartQty(item.id);
              const hasSizes = item.sizes && item.sizes.length > 0;

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-4 transition-all flex flex-col justify-between group text-left ${
                    isDark
                      ? 'bg-[#1C1917] border-[#2A241E] hover:border-[#F59E0B]/70 hover:shadow-xl hover:shadow-black/50'
                      : 'bg-[#FFFDF9] border-[#E8DBC5] hover:border-[#E59A19]/60 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Food Photo Container */}
                    <div className={`relative rounded-2xl overflow-hidden aspect-4/3 mb-3 border ${
                      isDark ? 'bg-[#141210] border-[#241F1A]' : 'bg-[#FAF6EF] border-[#F0E6D8]'
                    }`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Pure Veg Indicator */}
                      <div className={`absolute top-2.5 left-2.5 backdrop-blur px-1.5 py-1 rounded-md border shadow-xs ${
                        isDark ? 'bg-[#181614]/90 border-[#332C24]' : 'bg-[#FFFDF9]/95 border-[#E0D4C3]'
                      }`}>
                        <span className="w-2.5 h-2.5 rounded-xs border border-emerald-500 flex items-center justify-center">
                          <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        </span>
                      </div>

                      {/* Tag / Category Badge */}
                      {item.subCategory && (
                        <div className={`absolute bottom-2.5 left-2.5 backdrop-blur px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          isDark ? 'bg-[#121110]/90 text-[#FAF5EE] border border-[#2E2822]' : 'bg-[#1C1917]/80 text-white'
                        }`}>
                          {item.subCategory}
                        </div>
                      )}

                      {item.isSpecial && (
                        <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-red-600 to-orange-500 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-white uppercase tracking-wider shadow-xs">
                          Chef's Pick
                        </div>
                      )}
                      {!item.isSpecial && item.isPopular && (
                        <div className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-xs ${
                          isDark ? 'bg-[#F59E0B] text-[#121110]' : 'bg-[#E59A19] text-white'
                        }`}>
                          Popular
                        </div>
                      )}
                    </div>

                    {/* Title and Short Description */}
                    <div>
                      <h3 className={`font-bold text-base leading-snug transition-colors ${
                        isDark
                          ? 'text-[#FAF5EE] group-hover:text-[#F59E0B]'
                          : 'text-[#1C1917] group-hover:text-[#E59A19]'
                      }`}>
                        {item.name}
                      </h3>
                      <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${
                        isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'
                      }`}>
                        {item.description}
                      </p>

                      {/* Toppings Callout */}
                      {item.toppings && (
                        <div className={`mt-1.5 text-[11px] font-medium leading-tight ${
                          isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'
                        }`}>
                          <span className="font-bold">Toppings:</span> {item.toppings}
                        </div>
                      )}

                      {/* Sizes badges */}
                      {hasSizes && (
                        <div className="mt-2 flex flex-wrap gap-1 text-[10px] font-semibold">
                          {item.sizes?.map((s, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 rounded-md border ${
                                isDark
                                  ? 'bg-[#141210] text-[#D6D3D1] border-[#2A241E]'
                                  : 'bg-[#FAF6EF] text-[#57534E] border-[#EBDDC8]'
                              }`}
                            >
                              {s.name.charAt(0)}: ₹{s.price}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price and Add Button */}
                  <div className={`pt-3 border-t flex items-center justify-between mt-3 ${
                    isDark ? 'border-[#26201B]' : 'border-[#F2E8DC]'
                  }`}>
                    <div>
                      <span className={`text-[10px] uppercase font-semibold block ${
                        isDark ? 'text-[#78716C]' : 'text-[#A8A29E]'
                      }`}>
                        {hasSizes ? 'Starting at' : 'Price'}
                      </span>
                      <span className={`text-lg font-black font-display ${
                        isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
                      }`}>
                        ₹{item.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {inCartQty > 0 && (
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isDark ? 'text-[#F59E0B] bg-[#F59E0B]/15' : 'text-[#B45309] bg-[#E59A19]/15'
                        }`}>
                          {inCartQty} in cart
                        </span>
                      )}

                      <button
                        onClick={() => handleItemClick(item)}
                        className={`px-4 py-1.5 rounded-full text-xs font-black shadow-xs transition-transform active:scale-95 flex items-center gap-1 cursor-pointer ${
                          isDark
                            ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#121110]'
                            : 'bg-[#E59A19] hover:bg-[#D9880A] text-white font-extrabold'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{hasSizes ? 'Customize' : 'Add'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Toggle on initial landing */}
        {activeCategory === 'all' && !searchQuery && filteredItems.length > 9 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAllItems(!showAllItems)}
              className={`px-6 py-2.5 rounded-full font-bold text-xs tracking-wide shadow-xs transition-colors cursor-pointer border ${
                isDark
                  ? 'bg-[#221E1A] hover:bg-[#2C2621] text-[#FAF5EE] border-[#362F27] hover:border-[#F59E0B]'
                  : 'bg-[#FFFDF9] hover:bg-[#FAF6EF] text-[#1C1917] border-[#D8CEBE] hover:border-[#E59A19]'
              }`}
            >
              {showAllItems ? 'Show Less' : `View All ${filteredItems.length} Dishes`}
            </button>
          </div>
        )}
      </div>

      {/* Item Customization Modal */}
      {selectedItemForCustomize && (
        <ItemCustomizeModal
          item={selectedItemForCustomize}
          onClose={() => setSelectedItemForCustomize(null)}
        />
      )}
    </section>
  );
};
