import React from 'react';
import { ArrowRight, Flame, Plus } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const FoodShowcase: React.FC = () => {
  const { menuItems, addToCart, setSelectedItemForCustomize } = useRestaurant();

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Find popular dishes
  const pizzaItem = menuItems.find(i => i.id === 'pizza-3') || menuItems[0];
  const burgerItem = menuItems.find(i => i.id === 'burger-2');
  const pastaItem = menuItems.find(i => i.id === 'pasta-1');
  const shakeItem = menuItems.find(i => i.id === 'shakes-1');
  const chilliPotato = menuItems.find(i => i.id === 'chinese-1');

  const handleQuickAdd = (item: typeof pizzaItem) => {
    if (!item) return;
    if (item.sizes && item.sizes.length > 0) {
      setSelectedItemForCustomize(item);
    } else {
      addToCart(item);
    }
  };

  return (
    <section id="cravings" className="py-16 bg-[#101114] text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-orange-400 mb-1">
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span>Handcrafted Cafe Favourites</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-sans">
            Made for Serious Cravings.
          </h2>
          <p className="text-sm sm:text-base text-stone-300 mt-2 max-w-2xl">
            Pizza · Burgers · Sandwiches · Shakes · Sizzling Hakka Noodles
          </p>
        </div>

        {/* Editorial Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Large Showcase Spotlight (Left 7 Cols) */}
          {pizzaItem && (
            <div className="lg:col-span-7 rounded-3xl bg-[#17181d] border border-stone-800 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 text-left mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block mb-1">
                  Signature Pizza Base
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {pizzaItem.name}
                </h3>
                <p className="text-stone-300 text-sm mt-2 max-w-lg leading-relaxed">
                  {pizzaItem.description}
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <div>
                    <span className="text-xs text-stone-400 block">Starting at</span>
                    <span className="text-2xl font-black text-amber-400">₹{pizzaItem.price}</span>
                  </div>
                  <button
                    onClick={() => handleQuickAdd(pizzaItem)}
                    className="ml-auto px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-orange-700/20 flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Order Now</span>
                  </button>
                </div>
              </div>

              {/* Large Image with natural depth */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-700/60 shadow-inner group/img aspect-video sm:aspect-16/10">
                <img
                  src={pizzaItem.image}
                  alt={pizzaItem.name}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-semibold text-stone-200 border border-stone-700">
                  100% Mozzarella & Hand-kneaded Fresh Base
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between">
                <span className="text-xs text-stone-400">Available in Regular, Medium & Large</span>
                <button
                  onClick={scrollToMenu}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore All Pizzas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Right Column: 4 Curated Bento Cards (Right 5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Burger */}
            {burgerItem && (
              <div className="rounded-2xl bg-[#17181d] border border-stone-800 p-4 flex flex-col justify-between hover:border-orange-500/50 transition-all text-left group">
                <div className="relative rounded-xl overflow-hidden aspect-4/3 mb-3 border border-stone-700/50">
                  <img
                    src={burgerItem.image}
                    alt={burgerItem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-orange-400 border border-stone-700">
                    Bestseller
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-orange-300 transition-colors">
                    {burgerItem.name}
                  </h4>
                  <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                    Double cheddar & crispy patty
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-amber-400">₹{burgerItem.price}</span>
                  <button
                    onClick={() => handleQuickAdd(burgerItem)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-orange-600 text-stone-200 hover:text-white transition-colors cursor-pointer"
                    aria-label={`Add ${burgerItem.name}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Card 2: White Sauce Pasta */}
            {pastaItem && (
              <div className="rounded-2xl bg-[#17181d] border border-stone-800 p-4 flex flex-col justify-between hover:border-orange-500/50 transition-all text-left group">
                <div className="relative rounded-xl overflow-hidden aspect-4/3 mb-3 border border-stone-700/50">
                  <img
                    src={pastaItem.image}
                    alt={pastaItem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-emerald-400 border border-stone-700">
                    Pure Veg
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-orange-300 transition-colors">
                    {pastaItem.name}
                  </h4>
                  <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                    Rich garlic Alfredo cream & corn
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-amber-400">₹{pastaItem.price}</span>
                  <button
                    onClick={() => handleQuickAdd(pastaItem)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-orange-600 text-stone-200 hover:text-white transition-colors cursor-pointer"
                    aria-label={`Add ${pastaItem.name}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Card 3: Oreo Thickshake */}
            {shakeItem && (
              <div className="rounded-2xl bg-[#17181d] border border-stone-800 p-4 flex flex-col justify-between hover:border-orange-500/50 transition-all text-left group">
                <div className="relative rounded-xl overflow-hidden aspect-4/3 mb-3 border border-stone-700/50">
                  <img
                    src={shakeItem.image}
                    alt={shakeItem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-blue-400 border border-stone-700">
                    Chilled Shake
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-orange-300 transition-colors">
                    {shakeItem.name}
                  </h4>
                  <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                    Crumbled cookies & rich gelato
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-amber-400">₹{shakeItem.price}</span>
                  <button
                    onClick={() => handleQuickAdd(shakeItem)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-orange-600 text-stone-200 hover:text-white transition-colors cursor-pointer"
                    aria-label={`Add ${shakeItem.name}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Card 4: Honey Chilli Potato */}
            {chilliPotato && (
              <div className="rounded-2xl bg-[#17181d] border border-stone-800 p-4 flex flex-col justify-between hover:border-orange-500/50 transition-all text-left group">
                <div className="relative rounded-xl overflow-hidden aspect-4/3 mb-3 border border-stone-700/50">
                  <img
                    src={chilliPotato.image}
                    alt={chilliPotato.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-amber-400 border border-stone-700">
                    Crispy Wok
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-orange-300 transition-colors">
                    {chilliPotato.name}
                  </h4>
                  <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                    Sesame glazed crispy potatoes
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-amber-400">₹{chilliPotato.price}</span>
                  <button
                    onClick={() => handleQuickAdd(chilliPotato)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-orange-600 text-stone-200 hover:text-white transition-colors cursor-pointer"
                    aria-label={`Add ${chilliPotato.name}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
