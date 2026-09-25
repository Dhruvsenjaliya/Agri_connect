import React, { useState } from 'react';
import { Offer, ProduceListing, BuyerDemand, QualityGrade } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Receipt, 
  Truck, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NegotiationModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing?: ProduceListing;
  demand?: BuyerDemand;
  existingOffer?: Offer;
  onOfferSubmitted?: () => void;
}

export const NegotiationModal: React.FC<NegotiationModalProps> = ({
  isOpen,
  onClose,
  listing,
  demand,
  existingOffer,
  onOfferSubmitted
}) => {
  const { currentUser, makeOffer, counterOffer, acceptOffer, rejectOffer } = useApp();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState<number>(
    existingOffer ? existingOffer.quantity : (demand ? demand.quantity : (listing ? listing.moq : 100))
  );
  const [offerPrice, setOfferPrice] = useState<number>(
    existingOffer ? existingOffer.currentOfferPrice : (listing ? listing.price : (demand ? demand.targetPriceMin : 25))
  );
  const [fulfillmentType, setFulfillmentType] = useState<Offer['fulfillmentType']>(
    existingOffer ? existingOffer.fulfillmentType : 'Third-Party Delivery'
  );
  const [pickupLocation, setPickupLocation] = useState<string>(
    listing ? listing.pickupArea : 'Nashik Farm Gate Hub'
  );
  const [deliveryLocation, setDeliveryLocation] = useState<string>(
    demand ? demand.buyerLocation : (currentUser.location || 'Mumbai Central Warehouse')
  );
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  // Commercial Snapshot Calculations
  const unit = listing?.unit || demand?.unit || existingOffer?.unit || 'kg';
  const product = listing?.product || demand?.product || existingOffer?.product || 'Produce';
  const grade = (listing?.grade || demand?.grade || existingOffer?.grade || 'A') as QualityGrade;

  const grossProduceValue = quantity * offerPrice;
  const deliveryCharge = fulfillmentType === 'Third-Party Delivery' ? 1200 : (fulfillmentType === 'Farmer Delivery' ? 800 : 0);
  const platformFee = Math.round(grossProduceValue * 0.02); // 2%
  const totalBuyerPayable = grossProduceValue + deliveryCharge + platformFee;
  
  const farmerCommission = Math.round(grossProduceValue * 0.02);
  const farmerNetRealization = grossProduceValue - farmerCommission;

  const handleSubmitNewOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0 || offerPrice <= 0) {
      alert('Please provide valid quantity and price.');
      return;
    }

    const createdOffer = makeOffer({
      listingId: listing?.id,
      demandId: demand?.id,
      farmerId: listing?.farmerId || currentUser.id,
      farmerName: listing?.farmerName || currentUser.name,
      buyerId: demand?.buyerId || currentUser.id,
      buyerName: demand?.buyerName || currentUser.name,
      product,
      quantity,
      unit,
      grade,
      price: offerPrice,
      notes,
      fulfillmentType,
      pickupLocation,
      deliveryLocation
    });

    onClose();
    if (onOfferSubmitted) onOfferSubmitted();
    if (currentUser.role === 'buyer') {
      navigate('/buyer/offers');
    } else {
      navigate('/farmer/offers');
    }
  };

  const handleCounter = () => {
    if (!existingOffer) return;
    if (offerPrice <= 0) return;
    counterOffer(existingOffer.id, offerPrice, notes || `Counter offered ₹${offerPrice}/${unit}`);
    onClose();
    if (onOfferSubmitted) onOfferSubmitted();
  };

  const handleAccept = () => {
    if (!existingOffer) return;
    const newOrder = acceptOffer(existingOffer.id);
    onClose();
    if (currentUser.role === 'buyer') {
      navigate('/buyer/orders');
    } else {
      navigate('/farmer/orders');
    }
  };

  const handleReject = () => {
    if (!existingOffer) return;
    rejectOffer(existingOffer.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-agri-950 via-agri-900 to-agri-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-harvest-300" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {existingOffer ? `Negotiate Terms: Offer #${existingOffer.id}` : `Submit Commercial Offer for ${product}`}
              </h3>
              <p className="text-[11px] text-emerald-200">
                Direct transparent price discovery with locked commercial terms snapshot
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Negotiation History if existing */}
          {existingOffer && existingOffer.negotiationHistory.length > 0 && (
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2">Negotiation Thread</span>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {existingOffer.negotiationHistory.map((h, i) => (
                  <div key={i} className={`p-2 rounded-xl text-xs ${h.by === currentUser.role ? 'bg-emerald-100/70 ml-6 text-emerald-950' : 'bg-stone-200/70 mr-6 text-stone-900'}`}>
                    <div className="flex items-center justify-between font-semibold text-[11px]">
                      <span className="capitalize">{h.by} Proposed: ₹{h.price}/{unit}</span>
                      <span className="text-[10px] text-stone-500">{new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    {h.notes && <p className="mt-1 text-stone-700">{h.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Proposed Price (₹ per {unit}) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-stone-500 text-sm font-bold">₹</span>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white focus:ring-2 focus:ring-agri-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Quantity ({unit}) *
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                disabled={!!existingOffer}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white focus:ring-2 focus:ring-agri-500 disabled:opacity-75"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Fulfillment Option
              </label>
              <select
                value={fulfillmentType}
                onChange={(e) => setFulfillmentType(e.target.value as any)}
                disabled={!!existingOffer}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:bg-white"
              >
                <option value="Third-Party Delivery">Third-Party Logistics (AgriExpress Reefer)</option>
                <option value="Farmer Delivery">Farmer Direct Delivery</option>
                <option value="Buyer Self Pickup">Buyer Self Pickup at Farm Gate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Destination / Unloading Point
              </label>
              <input
                type="text"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                disabled={!!existingOffer}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white disabled:opacity-75"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Negotiation Remarks & Terms Note
            </label>
            <input
              type="text"
              placeholder="e.g. Can accept ₹26/kg if delivery by 7 AM in clean 25kg crates"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
            />
          </div>

          {/* Commercial Snapshot Preview Card */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-agri-950">
                <Receipt className="w-4 h-4 text-agri-700" />
                <span>Commercial Terms Breakdown (Snapshot)</span>
              </div>
              <span className="text-[10px] bg-emerald-200/60 text-emerald-900 font-semibold px-2 py-0.5 rounded-full">
                Contract Source of Truth
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Produce Value ({quantity} {unit} @ ₹{offerPrice}):</span>
                <span className="font-semibold text-stone-900">₹{grossProduceValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Logistics ({fulfillmentType}):</span>
                <span className="font-semibold text-stone-900">₹{deliveryCharge.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Platform Facilitation (2%):</span>
                <span className="font-semibold text-stone-900">₹{platformFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Taxes & Cess:</span>
                <span className="font-semibold text-stone-900">₹0 (Zero Rated)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-stone-500 text-[11px] block">Buyer Total Payable:</span>
                <span className="font-extrabold text-base text-stone-950">₹{totalBuyerPayable.toLocaleString()}</span>
              </div>

              <div className="text-right">
                <span className="text-stone-500 text-[11px] block">Farmer Estimated Net Payout:</span>
                <span className="font-extrabold text-base text-agri-800">₹{farmerNetRealization.toLocaleString()}</span>
                <span className="text-[10px] text-stone-500 block">(After 2% platform commission)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Accepting this offer locks the commercial snapshot and reserves inventory into an official order.</span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-200 text-xs font-semibold"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2 ml-auto">
            {existingOffer ? (
              <>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={handleCounter}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  Counter Offer (₹{offerPrice})
                </button>
                <button
                  onClick={handleAccept}
                  className="px-5 py-2 rounded-xl bg-agri-700 hover:bg-agri-800 text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept ₹{existingOffer.currentOfferPrice}/{unit} & Create Order</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmitNewOffer}
                className="px-6 py-2.5 rounded-xl bg-agri-700 hover:bg-agri-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Submit Commercial Offer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
