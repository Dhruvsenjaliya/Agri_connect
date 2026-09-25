import React from 'react';
import { ProduceListing } from '../../types';
import { StatusBadge } from './StatusBadge';
import { MapPin, Calendar, Scale, Sparkles, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  listing: ProduceListing;
  onQuickOffer?: (listing: ProduceListing) => void;
  onEnquire?: (listing: ProduceListing) => void;
  matchScore?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ listing, onQuickOffer, onEnquire, matchScore }) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-agri-300">
      
      {/* Image & Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-stone-100">
        <img
          src={listing.images[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'}
          alt={listing.product}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <StatusBadge status={listing.grade} type="grade" />
          
          <div className="flex items-center gap-1.5">
            {matchScore && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-white font-bold text-[10px] flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 text-harvest-300" />
                {matchScore}% Match
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium capitalize">
              {listing.priceType}
            </span>
          </div>
        </div>

        {/* Bottom overlay info */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 font-medium drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-harvest-300" />
            <span className="truncate">{listing.location}</span>
          </div>
          <div className="bg-stone-900/70 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-semibold text-emerald-300">
            {listing.availableQuantity.toLocaleString()} {listing.unit} left
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Variety and Category */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-medium text-agri-700">{listing.category}</span>
            <span className="truncate max-w-[120px] text-stone-400">{listing.variety}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-display font-bold text-lg text-stone-900 leading-snug group-hover:text-agri-800 transition-colors">
            {listing.product}
          </h3>

          {/* Farmer details */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-1">
            <User className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-medium truncate">{listing.farmerName}</span>
            <span className="text-amber-500 font-bold ml-auto flex items-center gap-0.5">
              ★ {listing.farmerRating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-xs">
          <div>
            <span className="text-stone-600 text-[10px] block">Price per {listing.unit}</span>
            <div className="font-bold text-base text-agri-950">
              ₹{listing.price.toLocaleString()}
              <span className="text-xs font-normal text-stone-600">/{listing.unit}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-stone-600 text-[10px] block">Min Order (MOQ)</span>
            <div className="font-semibold text-stone-800">
              {listing.moq} {listing.unit}
            </div>
          </div>
        </div>

        {/* Harvest Date and Logistics */}
        <div className="flex items-center justify-between text-[11px] text-stone-600 pt-1 border-t border-stone-100">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-stone-600" />
            <span>Avail: {listing.availableDate}</span>
          </div>
          <span className="text-stone-600 truncate max-w-[140px] text-right">
            {listing.deliveryPreference}
          </span>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            to={`/buyer/product/${listing.id}`}
            className="flex-1 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs text-center transition-colors flex items-center justify-center gap-1"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {onQuickOffer && (
            <button
              onClick={() => onQuickOffer(listing)}
              className="flex-1 py-2 px-3 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-semibold text-xs transition-colors shadow-xs hover:shadow text-center"
            >
              Make Offer
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
