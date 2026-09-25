import React from 'react';
import { Sprout, ShieldCheck, Heart, Award, Users, Scale, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-agri-700 uppercase tracking-widest block">
          About Agri Connect
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-stone-900 leading-tight">
          Direct. Transparent. Fair.
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Agri Connect is a digital agricultural marketplace built to transform how perishable farm produce is discovered, priced, and traded across India.
        </p>
      </div>

      {/* Mission & Problem Statement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            The Core Problem We Solve
          </div>
          <h2 className="font-display font-bold text-2xl text-stone-900">
            Eliminating Post-Harvest Distress Sales
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            In traditional agricultural supply chains, farmers harvest their crops and spend substantial money on freight to transport produce to distant APMC yards without knowing who will buy it or what price they will receive.
          </p>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Because produce is highly perishable, farmers cannot afford to take it back if prices collapse upon arrival. This asymmetry forces farmers into severe distress sales.
          </p>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900">
            <strong>Our Solution:</strong> Enable farmers to discover buyers, negotiate guaranteed prices, and lock contracts <em>before</em> produce is harvested or transported.
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-xl bg-stone-100">
          <img
            src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80"
            alt="Farmers in lush field"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Value Pillars */}
      <div className="space-y-6">
        <h3 className="font-display font-bold text-xl text-stone-900 text-center">
          Our Guiding Pillars
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sprout className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-base text-stone-900">1. Direct Connection</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              No opaque multi-tiered middleman layers. Buyers deal directly with verified farmers with transparent origin tracking.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Scale className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-base text-stone-900">2. Transparent Pricing</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Real-time bids, transparent quality grading standards, and pre-negotiated commercial snapshots ensure both sides get a fair deal.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-base text-stone-900">3. Fair & Auditable Escrow</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Escrow protection guarantees payments are safe and released promptly to farmers upon successful delivery inspection.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
