import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Offer } from '../../types';
import { NegotiationModal } from '../../components/common/NegotiationModal';
import { StatusBadge } from '../../components/common/StatusBadge';
import { TrendingUp, CheckCircle2, ArrowRight, Building2, MapPin, Receipt, Tractor } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BuyerOffers: React.FC = () => {
  const { offers, currentUser } = useApp();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const buyerOffers = offers.filter(o => o.buyerId === currentUser.id || true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Procurement Negotiations & Bids</h1>
        <p className="text-xs text-stone-500 mt-1">
          Review farmer responses, counter proposals, and lock commercial snapshots before payment.
        </p>
      </div>

      <div className="space-y-4">
        {buyerOffers.map((offer) => {
          const gross = offer.quantity * offer.currentOfferPrice;
          const isPendingBuyerAction = offer.lastActionBy === 'farmer' && offer.status !== 'accepted' && offer.status !== 'rejected';

          return (
            <div
              key={offer.id}
              className={`bg-white rounded-3xl border transition-all p-5 sm:p-6 shadow-xs ${
                isPendingBuyerAction ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-md' : 'border-stone-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-stone-500">#{offer.id}</span>
                    <StatusBadge status={offer.status} type="order" />
                    {isPendingBuyerAction && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] animate-pulse">
                        Farmer Countered • Action Required
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-lg text-stone-900">
                    {offer.quantity.toLocaleString()} {offer.unit} of {offer.product} (Grade {offer.grade})
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 text-xs text-stone-600">
                    <span className="flex items-center gap-1 font-semibold text-stone-800">
                      <Tractor className="w-3.5 h-3.5 text-stone-400" />
                      Farmer: {offer.farmerName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      Origin: {offer.pickupLocation}
                    </span>
                  </div>
                </div>

                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-right shrink-0">
                  <span className="text-[10px] text-stone-500 font-medium block">Current Negotiated Price</span>
                  <div className="font-display font-extrabold text-xl text-blue-950">
                    ₹{offer.currentOfferPrice} <span className="text-xs font-normal text-stone-600">/{offer.unit}</span>
                  </div>
                  <span className="text-xs font-bold text-stone-700 block mt-0.5">
                    Gross: ₹{gross.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-stone-600">
                  <span>Last proposal by <strong className="capitalize">{offer.lastActionBy}</strong>: </span>
                  <span className="italic">"{offer.negotiationHistory[offer.negotiationHistory.length - 1]?.notes || 'Offer submitted'}"</span>
                </div>

                <span className="text-[11px] text-stone-400">
                  Updated: {new Date(offer.updatedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </span>
              </div>

              <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <Receipt className="w-4 h-4 text-blue-600" />
                  <span>Accepting locks the contract terms and generates an escrow order.</span>
                </div>

                <div className="flex items-center gap-2">
                  {offer.status === 'accepted' ? (
                    <Link
                      to="/buyer/orders"
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <span>Proceed to Order Escrow</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedOffer(offer)}
                        className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors"
                      >
                        Counter Offer
                      </button>

                      <button
                        onClick={() => setSelectedOffer(offer)}
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accept ₹{offer.currentOfferPrice}/{offer.unit} & Order</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

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
