import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { NegotiationModal } from '../../components/common/NegotiationModal';
import { 
  MapPin, 
  Calendar, 
  Scale, 
  ShieldCheck, 
  Truck, 
  Tractor, 
  Star, 
  Sparkles, 
  ArrowRight, 
  MessageSquare,
  Lock,
  CheckCircle2
} from 'lucide-react';

export const BuyerProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { listings, sendEnquiry, currentUser } = useApp();
  const navigate = useNavigate();

  const listing = listings.find(l => l.id === id) || listings[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [orderQty, setOrderQty] = useState(listing.moq);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [enquiryMsg, setEnquiryMsg] = useState('');
  const [enquirySent, setEnquirySent] = useState(false);

  const grossEstimate = orderQty * listing.price;
  const platformFeeEstimate = Math.round(grossEstimate * 0.02);
  const deliveryEstimate = 1200;
  const totalEstimate = grossEstimate + platformFeeEstimate + deliveryEstimate;

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryMsg.trim()) return;

    sendEnquiry({
      listingId: listing.id,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      farmerId: listing.farmerId,
      farmerName: listing.farmerName,
      product: listing.product,
      message: enquiryMsg,
      requestedQuantity: orderQty,
      unit: listing.unit,
      proposedPrice: listing.price
    }, enquiryMsg);

    setEnquirySent(true);
    setTimeout(() => {
      navigate('/buyer/enquiries');
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <Link to="/marketplace" className="hover:text-stone-900">Marketplace</Link>
        <span>/</span>
        <span className="text-stone-700 font-medium">{listing.category}</span>
        <span>/</span>
        <span className="text-agri-800 font-bold">{listing.product}</span>
      </div>

      {/* Main Dual-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Gallery & Specs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Photo Gallery */}
          <div className="rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md relative group">
            <img
              src={listing.images[selectedImage] || listing.images[0]}
              alt={listing.product}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <StatusBadge status={listing.grade} type="grade" />
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-bold text-xs capitalize">
                {listing.priceType} Price
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {listing.images.length > 1 && (
            <div className="flex items-center gap-3">
              {listing.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-agri-600 ring-2 ring-agri-600/30' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description & Agronomy Notes */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-display font-bold text-base text-stone-900">Batch Specification & Agronomy Notes</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {listing.description}
            </p>
            {listing.specialNotes && (
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950">
                <strong>Handling Note:</strong> {listing.specialNotes}
              </div>
            )}
          </div>

          {/* Farmer Farm Gate Verification Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Tractor className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-stone-900">{listing.farmerName}</h4>
                <p className="text-xs text-stone-500">{listing.pickupArea}</p>
                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mt-1">
                  <span>★ {listing.farmerRating.toFixed(1)}</span>
                  <span className="text-stone-400 font-normal">• 7/12 Land Extract Verified</span>
                </div>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              Verified Farmer
            </span>
          </div>

        </div>

        {/* Right: Pricing Calculator & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xl space-y-5 sticky top-24">
            
            {/* Title & Price */}
            <div className="border-b pb-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>{listing.category} • {listing.variety}</span>
                <span className="text-emerald-700 font-semibold">{listing.availableQuantity} {listing.unit} Available</span>
              </div>

              <h1 className="font-display font-extrabold text-2xl text-stone-900">{listing.product}</h1>

              <div className="flex items-baseline gap-2 pt-2">
                <span className="font-display font-extrabold text-3xl text-agri-950">₹{listing.price}</span>
                <span className="text-sm text-stone-500 font-medium">per {listing.unit}</span>
              </div>
            </div>

            {/* Quick Quantity Selector */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-stone-700">
                <span>Order / Bid Quantity:</span>
                <span>MOQ: {listing.moq} {listing.unit}</span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  min={listing.moq}
                  max={listing.availableQuantity}
                  value={orderQty}
                  onChange={(e) => setOrderQty(parseInt(e.target.value) || listing.moq)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-base font-bold text-stone-900 focus:bg-white focus:ring-2 focus:ring-agri-500"
                />
                <span className="absolute right-4 top-3 text-xs font-bold text-stone-500 uppercase">{listing.unit}</span>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                Estimated Commercial Terms
              </span>

              <div className="flex justify-between text-stone-600">
                <span>Produce Value ({orderQty} {listing.unit} @ ₹{listing.price}):</span>
                <span className="font-semibold text-stone-900">₹{grossEstimate.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Logistics ({listing.deliveryPreference}):</span>
                <span className="font-semibold text-stone-900">₹{deliveryEstimate.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Platform Escrow Fee (2%):</span>
                <span className="font-semibold text-stone-900">₹{platformFeeEstimate.toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t flex justify-between font-extrabold text-sm text-stone-950">
                <span>Total Escrow Payable:</span>
                <span className="text-agri-800 text-base">₹{totalEstimate.toLocaleString()}</span>
              </div>
            </div>

            {/* Primary Action: Negotiate & Make Offer */}
            <button
              onClick={() => setIsOfferModalOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-agri-700 hover:bg-agri-800 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Negotiate / Submit Offer</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Direct Enquiry Box */}
            <form onSubmit={handleSendEnquiry} className="pt-3 border-t border-stone-100 space-y-2">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                Ask Farmer a Direct Question
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Can you pack in 20kg plastic crates?"
                  value={enquiryMsg}
                  onChange={(e) => setEnquiryMsg(e.target.value)}
                  className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold shrink-0"
                >
                  Send
                </button>
              </div>
            </form>

            <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Escrow protection guarantees funds are held safely until you confirm delivery.</span>
            </div>

          </div>
        </div>

      </div>

      {/* Negotiation Modal */}
      {isOfferModalOpen && (
        <NegotiationModal
          isOpen={isOfferModalOpen}
          onClose={() => setIsOfferModalOpen(false)}
          listing={listing}
        />
      )}

    </div>
  );
};
