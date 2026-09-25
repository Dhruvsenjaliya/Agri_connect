import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ProductCategory, QualityGrade, BuyerCategory } from '../../types';
import { Target, PlusCircle, Calendar, MapPin, Scale, DollarSign, ShieldCheck, ArrowRight } from 'lucide-react';

export const BuyerAddDemand: React.FC = () => {
  const { postDemand, currentUser } = useApp();
  const navigate = useNavigate();

  const [product, setProduct] = useState('Tomato');
  const [category, setCategory] = useState<ProductCategory>('Vegetables');
  const [variety, setVariety] = useState('Abhinav or Hybrid Firm Red');
  const [quantity, setQuantity] = useState(500);
  const [unit, setUnit] = useState<'kg' | 'quintal' | 'ton' | 'crates' | 'boxes'>('kg');
  const [grade, setGrade] = useState<QualityGrade>('A');
  const [targetPriceMin, setTargetPriceMin] = useState(24);
  const [targetPriceMax, setTargetPriceMax] = useState(27);
  const [requiredDate, setRequiredDate] = useState('2026-09-28');
  const [requiredTimeWindow, setRequiredTimeWindow] = useState('06:00 AM - 10:00 AM');
  const [buyerLocation, setBuyerLocation] = useState(currentUser.location || 'Mumbai Central CDC');
  const [fulfillmentPreference, setFulfillmentPreference] = useState<'Farmer Delivery' | 'Buyer Self Pickup' | 'Third-Party Logistics'>('Third-Party Logistics');
  const [frequency, setFrequency] = useState<'One-time' | 'Daily' | 'Weekly' | 'Bi-weekly'>('Weekly');
  const [expiryDate, setExpiryDate] = useState('2026-09-28');
  const [description, setDescription] = useState('Bulk procurement for retail store distribution. Need firm, uniform Grade A produce delivered directly in crates.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity <= 0 || targetPriceMin <= 0 || targetPriceMax <= 0) {
      alert('Please enter valid positive numbers for quantity and price.');
      return;
    }

    if (targetPriceMin > targetPriceMax) {
      alert('Minimum target price cannot exceed maximum target price.');
      return;
    }

    postDemand({
      buyerId: currentUser.id,
      buyerName: `${currentUser.name} (${currentUser.farmOrBusinessName})`,
      buyerType: currentUser.buyerType || 'Bulk Buyer',
      buyerLocation,
      product,
      category,
      variety,
      quantity,
      unit,
      grade,
      targetPriceMin,
      targetPriceMax,
      requiredDate,
      requiredTimeWindow,
      fulfillmentPreference,
      frequency,
      expiryDate,
      description
    });

    navigate('/buyer/demand');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">
          Post Procurement Requirement (Demand Board)
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Broadcast your commodity demand directly to verified farmers across agricultural corridors.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        
        {/* Commodity Specs */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-sm text-stone-900 border-b pb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600" />
            <span>1. Required Produce & Quality Spec</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Commodity *
              </label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:bg-white"
                required
              >
                <option value="Tomato">Tomato (Tamatar)</option>
                <option value="Onion">Onion (Pyaaz)</option>
                <option value="Potato">Potato (Aloo)</option>
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
                Required Quality Grade *
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:bg-white"
                required
              >
                <option value="A+">Grade A+ (Export / Top Shelf)</option>
                <option value="A">Grade A (Standard Supermarket / Dining)</option>
                <option value="B">Grade B (Wholesale / Secondary)</option>
                <option value="Organic">Certified Organic</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Variety / Specification Notes
            </label>
            <input
              type="text"
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
            />
          </div>
        </div>

        {/* Quantity & Target Budget */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-sm text-stone-900 border-b pb-2 flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-600" />
            <span>2. Volume & Target Price Band</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Required Quantity *
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Unit *
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:bg-white"
              >
                <option value="kg">kg (Kilograms)</option>
                <option value="quintal">Quintal (100 kg)</option>
                <option value="ton">Ton (1,000 kg)</option>
                <option value="crates">Crates (25 kg)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Procurement Frequency *
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:bg-white"
              >
                <option value="One-time">One-time Order</option>
                <option value="Daily">Daily Standing Order</option>
                <option value="Weekly">Weekly Scheduled Order</option>
                <option value="Bi-weekly">Bi-weekly Scheduled Order</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Target Min Price (₹ per {unit}) *
              </label>
              <input
                type="number"
                min="1"
                value={targetPriceMin}
                onChange={(e) => setTargetPriceMin(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Target Max Price (₹ per {unit}) *
              </label>
              <input
                type="number"
                min="1"
                value={targetPriceMax}
                onChange={(e) => setTargetPriceMax(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white"
                required
              />
            </div>
          </div>
        </div>

        {/* Schedule & Delivery */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-sm text-stone-900 border-b pb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>3. Delivery Dates & Unloading Point</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Required Delivery Date *
              </label>
              <input
                type="date"
                value={requiredDate}
                onChange={(e) => setRequiredDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Delivery Window *
              </label>
              <input
                type="text"
                placeholder="e.g. 06:00 AM - 10:00 AM"
                value={requiredTimeWindow}
                onChange={(e) => setRequiredTimeWindow(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Post Expiry Date *
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Delivery / Destination Address *
              </label>
              <input
                type="text"
                value={buyerLocation}
                onChange={(e) => setBuyerLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Fulfillment Preference *
              </label>
              <select
                value={fulfillmentPreference}
                onChange={(e) => setFulfillmentPreference(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:bg-white"
              >
                <option value="Third-Party Logistics">Third-Party Logistics (AgriExpress Reefer)</option>
                <option value="Farmer Delivery">Farmer Direct Delivery</option>
                <option value="Buyer Self Pickup">Buyer Self Pickup at Farm Gate</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Procurement Description & Special Instructions
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate('/buyer/demand')}
            className="px-5 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Post Procurement Demand</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
