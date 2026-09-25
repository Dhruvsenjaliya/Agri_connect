import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ProductCategory, QualityGrade, PriceType } from '../../types';
import { 
  Sprout, 
  UploadCloud, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Scale, 
  DollarSign,
  AlertCircle
} from 'lucide-react';

export const FarmerAddListing: React.FC = () => {
  const { addListing, currentUser } = useApp();
  const navigate = useNavigate();

  const [product, setProduct] = useState('Tomato');
  const [category, setCategory] = useState<ProductCategory>('Vegetables');
  const [variety, setVariety] = useState('Abhinav Hybrid (Firm Red)');
  const [initialQuantity, setInitialQuantity] = useState(1000);
  const [unit, setUnit] = useState<'kg' | 'quintal' | 'ton' | 'crates' | 'boxes'>('kg');
  const [moq, setMoq] = useState(100);
  const [priceType, setPriceType] = useState<PriceType>('negotiable');
  const [price, setPrice] = useState(25);
  const [grade, setGrade] = useState<QualityGrade>('A');
  const [quantityStatus, setQuantityStatus] = useState<'Estimated' | 'Confirmed'>('Confirmed');
  const [harvestDate, setHarvestDate] = useState('2026-09-26');
  const [availableDate, setAvailableDate] = useState('2026-09-27');
  const [availableTimeWindow, setAvailableTimeWindow] = useState('06:00 AM - 11:00 AM');
  const [pickupArea, setPickupArea] = useState(`${currentUser.farmOrBusinessName}, ${currentUser.location} Farm Gate`);
  const [deliveryPreference, setDeliveryPreference] = useState<'Farmer Delivery' | 'Buyer Self Pickup' | 'Third-Party Logistics' | 'Flexible'>('Flexible');
  const [description, setDescription] = useState('Freshly harvested Grade A produce. Uniform sizing, zero rot, pre-cooled at farm packhouse and packed in clean crates.');
  const [specialNotes, setSpecialNotes] = useState('Loading bay accessible for 3-ton to 10-ton trucks.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (initialQuantity <= 0 || price <= 0 || moq <= 0) {
      alert('Quantity, price and MOQ must be greater than zero.');
      return;
    }

    if (moq > initialQuantity) {
      alert('Minimum Order Quantity (MOQ) cannot exceed total available quantity.');
      return;
    }

    addListing({
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerPhone: currentUser.phone,
      farmerRating: currentUser.rating,
      location: currentUser.location,
      pickupArea,
      product,
      category,
      variety,
      initialQuantity,
      unit,
      moq,
      price,
      priceType,
      grade,
      quantityStatus,
      harvestDate,
      availableDate,
      availableTimeWindow,
      deliveryPreference,
      images: [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=600&auto=format&fit=crop&q=80'
      ],
      description,
      specialNotes
    });

    navigate('/farmer/listings');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">
          Publish Produce Listing ("Sell Before Going to the Yard")
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Lock buyer demand and negotiate price discovery before harvesting or loading transport.
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        
        {/* Section 1: Commodity Specs */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-sm text-stone-900 border-b border-stone-200 pb-2 flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>1. Produce Commodity & Quality Grade</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Produce Commodity *
              </label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:bg-white"
                required
              >
                <option value="Tomato">Tomato (Tamatar)</option>
                <option value="Onion">Onion (Pyaaz / Kanda)</option>
                <option value="Potato">Potato (Aloo / Batata)</option>
                <option value="Grapes">Grapes (Angoor)</option>
                <option value="Banana">Banana (Kela)</option>
                <option value="Wheat">Wheat (Gehun)</option>
                <option value="Rice">Rice (Chawal)</option>
                <option value="Cotton">Cotton (Kapas)</option>
                <option value="Chilli">Chilli (Mirchi)</option>
                <option value="Turmeric">Turmeric (Haldi)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:bg-white"
                required
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
                <option value="Pulses">Pulses</option>
                <option value="Spices">Spices</option>
                <option value="Dairy">Dairy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Quality Grade *
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:bg-white"
                required
              >
                <option value="A+">Grade A+ (Export / Super Premium)</option>
                <option value="A">Grade A (Supermarket & Hotel Top Grade)</option>
                <option value="B">Grade B (Retail & General Wholesale)</option>
                <option value="C">Grade C (Processing / Sauce Grade)</option>
                <option value="Organic">Certified Organic (NPOP/Jaivik)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Variety / Hybrid Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Abhinav Hybrid, Sharbati Gold Lokwan, Thompson Seedless"
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
              required
            />
          </div>
        </div>

        {/* Section 2: Quantity & Pricing */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-sm text-stone-900 border-b border-stone-200 pb-2 flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>2. Available Quantity & Price Terms</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Total Available Qty *
              </label>
              <input
                type="number"
                min="1"
                value={initialQuantity}
                onChange={(e) => setInitialQuantity(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Measurement Unit *
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:bg-white"
              >
                <option value="kg">kg (Kilograms)</option>
                <option value="quintal">Quintal (100 kg)</option>
                <option value="ton">Ton (1,000 kg)</option>
                <option value="crates">Crates (25 kg standard)</option>
                <option value="boxes">Boxes (Punnet 5kg)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Min Order Quantity (MOQ) *
              </label>
              <input
                type="number"
                min="1"
                max={initialQuantity}
                value={moq}
                onChange={(e) => setMoq(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Quantity Status *
              </label>
              <select
                value={quantityStatus}
                onChange={(e) => setQuantityStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:bg-white"
              >
                <option value="Confirmed">Confirmed (Harvested/Weighed)</option>
                <option value="Estimated">Estimated (Field Standing)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Price per {unit} (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-stone-500 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-base font-extrabold text-agri-950 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Price Negotiation Mode *
              </label>
              <select
                value={priceType}
                onChange={(e) => setPriceType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:bg-white"
              >
                <option value="negotiable">Negotiable (Buyers can make counter offers)</option>
                <option value="fixed">Fixed Price (Strict minimum rate)</option>
                <option value="buyer_offer">Buyer Offer (Open for bids)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Harvest Window & Logistics */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-sm text-stone-900 border-b border-stone-200 pb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>3. Harvest Dates & Loading Logistics</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Harvest Date *
              </label>
              <input
                type="date"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Available Date for Loading *
              </label>
              <input
                type="date"
                value={availableDate}
                onChange={(e) => setAvailableDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Loading Time Window *
              </label>
              <input
                type="text"
                placeholder="e.g. 06:00 AM - 11:00 AM"
                value={availableTimeWindow}
                onChange={(e) => setAvailableTimeWindow(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Pickup Farm Gate Area *
              </label>
              <input
                type="text"
                value={pickupArea}
                onChange={(e) => setPickupArea(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Fulfillment Preference *
              </label>
              <select
                value={deliveryPreference}
                onChange={(e) => setDeliveryPreference(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:bg-white"
              >
                <option value="Flexible">Flexible (Any mode mutually agreed)</option>
                <option value="Buyer Self Pickup">Buyer Self Pickup at Farm Gate</option>
                <option value="Farmer Delivery">Farmer Direct Delivery</option>
                <option value="Third-Party Logistics">Third-Party Logistics (AgriExpress)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Description & Quality Notes
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
            />
          </div>
        </div>

        {/* Business Rule Validation Card */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>BRD v2.0 Compliance Guardrails</span>
          </div>
          <ul className="text-[11px] text-emerald-900 list-disc list-inside space-y-0.5">
            <li>Available quantity can never become negative.</li>
            <li>Orders cannot exceed verified inventory.</li>
            <li>Price changes affect future negotiations only; confirmed orders retain accepted terms.</li>
          </ul>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate('/farmer/listings')}
            className="px-5 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-agri-700 hover:bg-agri-800 text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Publish Produce Listing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
