import React from 'react';
import { BuyerDemand } from '../../types';
import { StatusBadge } from './StatusBadge';
import { MapPin, Calendar, Target, Sparkles, Building2, Send, Clock, Layers } from 'lucide-react';

interface DemandCardProps {
  demand: BuyerDemand;
  onSendOffer?: (demand: BuyerDemand) => void;
  onViewMatches?: (demand: BuyerDemand) => void;
  matchScore?: number;
}

export const DemandCard: React.FC<DemandCardProps> = ({ demand, onSendOffer, onViewMatches, matchScore }) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between hover:border-blue-300 relative overflow-hidden group">
      
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-semibold border border-blue-200">
              {demand.buyerType}
            </span>
            <StatusBadge status={demand.grade} type="grade" />
          </div>

          {matchScore ? (
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-harvest-600" />
              {matchScore}% Match
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-medium uppercase">
              {demand.frequency}
            </span>
          )}
        </div>

        {/* Product Title & Quantity */}
        <div className="flex items-baseline justify-between gap-2 mt-1">
          <h3 className="font-display font-bold text-lg text-stone-900 group-hover:text-blue-700 transition-colors">
            {demand.product}
          </h3>
          <span className="text-base font-extrabold text-stone-900 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200 shrink-0">
            {demand.quantity.toLocaleString()} <span className="text-xs font-medium text-stone-500">{demand.unit}</span>
          </span>
        </div>

        {/* Buyer Info & Location */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600 mt-2">
          <div className="flex items-center gap-1 font-medium text-stone-800">
            <Building2 className="w-3.5 h-3.5 text-stone-400" />
            <span>{demand.buyerName}</span>
          </div>
          <div className="flex items-center gap-1 text-stone-500">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            <span>{demand.buyerLocation}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed bg-stone-50/70 p-2.5 rounded-xl border border-stone-100">
          "{demand.description}"
        </p>
      </div>

      {/* Target Price & Date Grid */}
      <div className="mt-4 pt-3 border-t border-stone-100 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-emerald-50/60 p-2 rounded-xl border border-emerald-100">
            <span className="text-[10px] text-emerald-800 font-medium block">Target Price</span>
            <div className="font-extrabold text-sm text-emerald-950">
              ₹{demand.targetPriceMin} - ₹{demand.targetPriceMax}
              <span className="text-[10px] font-normal text-emerald-800">/{demand.unit}</span>
            </div>
          </div>
          <div className="bg-amber-50/60 p-2 rounded-xl border border-amber-100">
            <span className="text-[10px] text-amber-800 font-medium block">Required By</span>
            <div className="font-bold text-xs text-amber-950 flex items-center gap-1 mt-0.5 truncate">
              <Calendar className="w-3 h-3 text-amber-700" />
              <span>{demand.requiredDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-stone-500">
          <span className="truncate">Fulfillment: <strong className="text-stone-700">{demand.fulfillmentPreference}</strong></span>
          <span className="shrink-0 text-rose-600 font-medium text-[10px]">Expires: {demand.expiryDate}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {onViewMatches && (
            <button
              onClick={() => onViewMatches(demand)}
              className="flex-1 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-harvest-600" />
              <span>Why Match?</span>
            </button>
          )}

          {onSendOffer && (
            <button
              onClick={() => onSendOffer(demand)}
              className="flex-1 py-2 px-3 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-semibold text-xs transition-colors shadow-xs hover:shadow flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Offer</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
