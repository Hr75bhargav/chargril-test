import React from 'react';
import { Star, ExternalLink, MessageSquareQuote } from 'lucide-react';
import { DEFAULT_REVIEWS } from '../data/defaultData';
import { useRestaurant } from '../context/RestaurantContext';

export const CustomerReviews: React.FC = () => {
  const { businessConfig } = useRestaurant();

  const googleReviewSearchUrl = 'https://www.google.com/search?q=CharGrill+Cafe+Indri+reviews';

  return (
    <section id="reviews" className="py-16 bg-[#141519] text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Rating Banner Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 p-6 sm:p-8 rounded-3xl bg-[#191b21] border border-stone-800 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl sm:text-5xl font-black text-amber-400 font-sans tracking-tight">
                {businessConfig.googleRating}★
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs font-bold text-stone-200 mt-0.5">
                  Based on {businessConfig.reviewCount}+ Google Reviews
                </div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-stone-700/60" />

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block">
                Local Indri Rating
              </span>
              <p className="text-xs text-stone-300 mt-0.5 max-w-sm">
                Ranked among top fast food cafes in Indri for fresh pizza base, pure veg fast food, and friendly service.
              </p>
            </div>
          </div>

          <a
            href={googleReviewSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-200 hover:text-white font-bold text-xs tracking-wide border border-stone-700 transition-colors shrink-0"
          >
            <span>See all 343+ reviews on Google</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
        </div>

        {/* Real Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEFAULT_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#181a1f] border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between text-left shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium">
                    {rev.source}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-800">
                <div className="font-bold text-xs text-white">
                  {rev.author}
                </div>
                {rev.recommendedDishes && rev.recommendedDishes.length > 0 && (
                  <div className="text-[11px] text-stone-400 mt-1 flex flex-wrap items-center gap-1">
                    <span className="text-stone-500">Liked:</span>
                    {rev.recommendedDishes.map((dish, i) => (
                      <span key={i} className="text-orange-400 font-medium">
                        {dish}{i < rev.recommendedDishes!.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
