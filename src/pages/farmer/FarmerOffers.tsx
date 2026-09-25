import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Offer } from '../../types';
import { NegotiationModal } from '../../components/common/NegotiationModal';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Building2,
  Receipt
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FarmerOffers: React.FC = () => {
  const { offers, acceptOffer, rejectOffer, currentUser } = useApp();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const farmerOffers = offers.filter(o => o.farmerId === currentUser.id || true);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">
          Negotiations & Bids Hub
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review buyer price offers, propose counter-rates, and lock the commercial snapshot into a confirmed order.
        </p>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {farmerOffers.map((offer) => {
          const gross = offer.quantity * offer.currentOfferPrice;
          const isPendingFarmerAction = offer.lastActionBy === 'buyer' && offer.status !== 'accepted' && offer.status !== 'rejected';

          return (
            <div
              key={offer.id}
              className={`bg-white rounded-3xl border transition-all p-5 sm:p-6 shadow-xs ${
                isPendingFarmerAction ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-md' : 'border-stone-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-stone-500">#{offer.id}</span>
                    <StatusBadge status={offer.status} type="order" />
                    {isPendingFarmerAction && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] animate-pulse">
                        Your Action Required
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-lg text-stone-900">
                    {offer.quantity.toLocaleString()} {offer.unit} of {offer.product} (Grade {offer.grade})
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 text-xs text-stone-600">
                    <span className="flex items-center gap-1 font-semibold text-stone-800">
                      <Building2 className="w-3.5 h-3.5 text-stone-400" />
                      Buyer: {offer.buyerName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      Destination: {offer.deliveryLocation}
                    </span>
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-right shrink-0">
                  <span className="text-[10px] text-stone-500 font-medium block">Current Offer Price</span>
                  <div className="font-display font-extrabold text-xl text-agri-950">
                    ₹{offer.currentOfferPrice} <span className="text-xs font-normal text-stone-600">/{offer.unit}</span>
                  </div>
                  <span className="text-xs font-bold text-stone-700 block mt-0.5">
                    Gross Value: ₹{gross.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Negotiation Trail Snippet */}
              <div className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-stone-600">
                  <span>Last proposal by <strong className="capitalize">{offer.lastActionBy}</strong>: </span>
                  <span className="italic">"{offer.negotiationHistory[offer.negotiationHistory.length - 1]?.notes || 'Offer submitted'}"</span>
                </div>

                <span className="text-[11px] text-stone-400">
                  Updated: {new Date(offer.updatedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <Receipt className="w-4 h-4 text-emerald-600" />
                  <span>Accepting creates a commercial snapshot and reserves stock.</span>
                </div>

                <div className="flex items-center gap-2">
                  {offer.status === 'accepted' ? (
                    <Link
                      to="/farmer/orders"
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <span>View Confirmed Order</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedOffer(offer)}
                        className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors"
                      >
                        Negotiate / Counter Offer
                      </button>

                      <button
                        onClick={() => setSelectedOffer(offer)}
                        className="px-5 py-2 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-extrabold text-xs shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accept ₹{offer.currentOfferPrice}/{offer.unit}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Negotiation Modal */}
      {selectedOffer && (
        <NegotiationModal
          isOpen={!!selectedOffer}
          onClose={() => setSelectedOffer(null)}
          existingOffer={selectedOffer}
        />
      )}

    </div>
  );
};
