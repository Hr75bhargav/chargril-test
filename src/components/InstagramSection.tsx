import React from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { INSTAGRAM_HIGHLIGHTS } from '../data/defaultData';
import { useRestaurant } from '../context/RestaurantContext';

export const InstagramSection: React.FC = () => {
  const { businessConfig } = useRestaurant();

  return (
    <section className="py-16 bg-[#111215] text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 text-left">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-pink-400 mb-1">
              <Instagram className="w-4 h-4" />
              <span>Official Social Feed</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
              FROM {businessConfig.instagramHandle.toUpperCase()}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-lg">
              Fresh pizzas, cheese pulls, Wednesday BOGO updates, and Indri cafe moments.
            </p>
          </div>

          <a
            href={businessConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 text-white font-bold text-xs tracking-wide shadow-lg shadow-pink-900/30 transition-transform active:scale-95 shrink-0 self-start sm:self-auto"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_HIGHLIGHTS.map((post) => (
            <a
              key={post.id}
              href={businessConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden aspect-square bg-stone-900 border border-stone-800 block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover overlay with caption & stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-left">
                <span className="text-[10px] font-black uppercase text-orange-400 tracking-wider">
                  {post.tag}
                </span>

                <div>
                  <p className="text-[11px] text-stone-200 line-clamp-2 leading-snug">
                    {post.caption}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-pink-300 font-bold">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1 text-stone-400">
                      <MessageCircle className="w-3 h-3" />
                      Comment
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-stone-400">
            Tag us in your stories at <strong className="text-stone-200">@char_grill_indri</strong> to be featured on our page!
          </p>
        </div>
      </div>
    </section>
  );
};
