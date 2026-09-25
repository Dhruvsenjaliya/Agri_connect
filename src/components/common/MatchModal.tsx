import React from 'react';
import { ProduceListing, BuyerDemand, MatchScore } from '../../types';
import { X, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing?: ProduceListing;
  demand?: BuyerDemand;
  matchScore: MatchScore;
  onProceedToOffer?: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  isOpen,
  onClose,
  listing,
  demand,
  matchScore,
  onProceedToOffer
}) => {
  if (!isOpen || !listing || !demand) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-agri-900 to-agri-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-harvest-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-white">Potential Match Analysis</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-xs">
                  {matchScore.percentage}% Compatibility
                </span>
              </div>
              <p className="text-[11px] text-emerald-100">Smart demand-supply matching engine</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Comparison Side-by-Side */}
          <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-xs">
            <div className="space-y-1 border-r border-stone-200 pr-2">
              <span className="text-[10px] font-bold text-agri-800 uppercase tracking-wider block">Farmer Listing</span>
              <div className="font-bold text-sm text-stone-900">{listing.product}</div>
              <div className="text-stone-600 truncate">{listing.farmerName} • {listing.location}</div>
              <div className="font-semibold text-agri-950">₹{listing.price}/{listing.unit} • Avail: {listing.availableQuantity} {listing.unit}</div>
              <StatusBadge status={listing.grade} type="grade" />
            </div>

            <div className="space-y-1 pl-2">
              <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">Buyer Demand</span>
              <div className="font-bold text-sm text-stone-900">{demand.product}</div>
              <div className="text-stone-600 truncate">{demand.buyerName} • {demand.buyerLocation}</div>
              <div className="font-semibold text-blue-950">Target ₹{demand.targetPriceMin}-₹{demand.targetPriceMax}/{demand.unit} • Req: {demand.quantity} {demand.unit}</div>
              <StatusBadge status={demand.grade} type="grade" />
            </div>
          </div>

          {/* Why this match criteria breakdown */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
              <span>Why this potential match?</span>
            </h4>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 text-xs">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${matchScore.productMatch ? 'text-emerald-600' : 'text-stone-300'}`} />
                <div>
                  <span className="font-semibold text-stone-900">Same Commodity: </span>
                  <span className="text-stone-600">Both parties agree on {listing.product} ({listing.variety}).</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${matchScore.quantityFeasible ? 'text-emerald-600' : 'text-amber-500'}`} />
                <div>
                  <span className="font-semibold text-stone-900">Quantity Availability: </span>
                  <span className="text-stone-600">
                    Listing has {listing.availableQuantity} {listing.unit} available for requested {demand.quantity} {demand.unit}.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${matchScore.locationCompatible ? 'text-emerald-600' : 'text-stone-300'}`} />
                <div>
                  <span className="font-semibold text-stone-900">Transit & Logistics Corridor: </span>
                  <span className="text-stone-600">Origin {listing.location} to Destination {demand.buyerLocation} supported via AgriExpress.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${matchScore.priceCompatible ? 'text-emerald-600' : 'text-stone-300'}`} />
                <div>
                  <span className="font-semibold text-stone-900">Price Band Compatibility: </span>
                  <span className="text-stone-600">
                    Listing price ₹{listing.price} aligns with buyer's budget window (₹{demand.targetPriceMin} - ₹{demand.targetPriceMax}).
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${matchScore.gradeMatch ? 'text-emerald-600' : 'text-stone-300'}`} />
                <div>
                  <span className="font-semibold text-stone-900">Quality Spec: </span>
                  <span className="text-stone-600">Grade {listing.grade} produce satisfies buyer requirement.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Non-Guaranteed Disclaimer Notice */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Important Policy Note:</strong> Matches are generated algorithmically as <em>Potential Matches</em> to assist price and demand discovery. Final commercial terms are established only upon mutual acceptance of an offer.
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-700 hover:bg-stone-200 text-xs font-semibold"
          >
            Close
          </button>

          {onProceedToOffer && (
            <button
              onClick={() => {
                onClose();
                onProceedToOffer();
              }}
              className="px-5 py-2.5 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
            >
              <span>Negotiate / Submit Offer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
