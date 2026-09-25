import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { UserRole, BuyerCategory } from '../../types';
import { Sprout, CheckCircle2, ArrowRight, ShieldCheck, Tractor, ShoppingBag, Truck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { switchRole } = useApp();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('farmer');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Nashik');
  const [businessName, setBusinessName] = useState('');
  const [buyerType, setBuyerType] = useState<BuyerCategory>('Bulk Buyer');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      switchRole(role);
      if (role === 'farmer') navigate('/farmer/dashboard');
      else if (role === 'buyer') navigate('/buyer/dashboard');
      else if (role === 'delivery') navigate('/delivery/dashboard');
      else navigate('/admin/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-agri-600 flex items-center justify-center text-white mx-auto shadow-md">
          <Sprout className="w-7 h-7" />
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
          Create Stakeholder Account
        </h1>
        <p className="text-xs text-stone-500">
          Join India's direct agricultural marketplace and start trading with transparent contracts.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-white rounded-3xl border border-stone-200 text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">Registration Submitted!</h2>
          <p className="text-xs text-stone-600">
            Your verification documents have been routed to operations staff. Redirecting to your workspace demo...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          
          {/* Role selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Select Your Platform Role *
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('farmer')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  role === 'farmer' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Tractor className="w-5 h-5 text-emerald-600" />
                <span>Farmer / FPO</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  role === 'buyer' ? 'border-blue-600 bg-blue-50 text-blue-950 ring-2 ring-blue-500/20' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <span>Buyer / Hotel</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('delivery')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  role === 'delivery' ? 'border-purple-600 bg-purple-50 text-purple-950 ring-2 ring-purple-500/20' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Truck className="w-5 h-5 text-purple-600" />
                <span>Logistics</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Anand Shinde"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Farm / Company / Fleet Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Shinde Agro Farms / Green Valley Foods"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                placeholder="+91 98XXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Primary District/Hub *
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
              >
                <option value="Nashik">Nashik</option>
                <option value="Pune">Pune</option>
                <option value="Ahmednagar">Ahmednagar</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Aurangabad">Aurangabad</option>
                <option value="Nagpur">Nagpur</option>
              </select>
            </div>
          </div>

          {role === 'buyer' && (
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Buyer Category *
              </label>
              <select
                value={buyerType}
                onChange={(e) => setBuyerType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
              >
                <option value="Bulk Buyer">Bulk Buyer / Supermarket Chain</option>
                <option value="Retail Buyer">Retail Buyer / Standalone Mart</option>
                <option value="Restaurant">Restaurant / Food Chain</option>
                <option value="Hotel">Hotel / Banquets</option>
                <option value="Caterer">Event Caterer</option>
                <option value="End Consumer">End Consumer</option>
              </select>
            </div>
          )}

          <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-500 flex items-start gap-2 border border-stone-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>KYC verification documents (7/12 Land extract or GST/PAN) can be uploaded anytime from your profile page.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-agri-700 hover:bg-agri-800 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center text-xs text-stone-500">
            Already have a demo account? <Link to="/login" className="text-agri-700 font-bold hover:underline">Sign In here</Link>
          </div>

        </form>
      )}

    </div>
  );
};
