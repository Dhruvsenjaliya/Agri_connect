import React, { useState } from 'react';
import { 
  Sprout, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Receipt, 
  KeyRound, 
  Scale, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'farmer' | 'buyer'>('farmer');

  const farmerSteps = [
    {
      num: '01',
      title: 'Farmer Registration & KYC Verification',
      desc: 'Register with mobile number, Aadhaar, 7/12 Land extract or FPO registration, and bank passbook for direct settlements.'
    },
    {
      num: '02',
      title: 'Publish Produce Availability (Pre-Harvest)',
      desc: 'Create a listing specifying commodity, hybrid variety, harvest date, available quantity, minimum order quantity (MOQ), and price expectations.'
    },
    {
      num: '03',
      title: 'Review Buyer Demands & Direct Enquiries',
      desc: 'Discover active requirements posted by bulk supermarket buyers, restaurant networks, and wholesale caterers in your corridor.'
    },
    {
      num: '04',
      title: 'Transparent Offer & Price Negotiation',
      desc: 'Receive buyer bids, submit counter-offers, and mutually lock an immutable Commercial Terms Snapshot (contract source of truth).'
    },
    {
      num: '05',
      title: 'Buyer Escrow Payment Authorization',
      desc: 'Buyer places funds in platform trust holding. You prepare produce knowing payment is 100% secured before transportation starts.'
    },
    {
      num: '06',
      title: 'Farm Gate Handover with OTP & Weighment',
      desc: 'Hand over produce to the assigned logistics partner or buyer vehicle. Enter the secure 4-digit pickup OTP.'
    },
    {
      num: '07',
      title: 'Inward Acceptance & Automated Bank Payout',
      desc: 'Upon destination delivery inspection, platform automatically settles the net realization into your registered bank account.'
    },
    {
      num: '08',
      title: 'Reputation & Verified Farmer Ratings',
      desc: 'Build high trust scores for consistent grading, on-time loading, and quality accuracy to attract repeat bulk contracts.'
    }
  ];

  const buyerSteps = [
    {
      num: '01',
      title: 'Buyer Onboarding & Verification',
      desc: 'Verify business credentials (GST, PAN, FSSAI licence) for bulk supermarkets, restaurants, hotels, or wholesale aggregators.'
    },
    {
      num: '02',
      title: 'Browse Listings or Post Procurement Demand',
      desc: 'Search fresh harvests across Maharashtra corridors or post custom requirements with target price bands and delivery windows.'
    },
    {
      num: '03',
      title: 'Smart Algorithmic Matching',
      desc: 'Platform calculates match compatibility across commodity, quality grade, quantity feasibility, and transit distance.'
    },
    {
      num: '04',
      title: 'Negotiation & Commercial Agreement',
      desc: 'Submit offers, receive farmer counter-proposals, and agree on all-inclusive terms including cold-chain transport fees.'
    },
    {
      num: '05',
      title: 'Secure Escrow Payment',
      desc: 'Pay via UPI, NetBanking, or RTGS virtual accounts. Funds remain safely in escrow until you verify produce arrival.'
    },
    {
      num: '06',
      title: 'Live Cold-Chain Tracking & Delivery OTP',
      desc: 'Monitor shipment transit from farm gate to your warehouse dock. Provide delivery OTP upon unloading.'
    },
    {
      num: '07',
      title: 'Inward Weighment & Quality Confirmation',
      desc: 'Perform dock inspection. Accept full quantity or record minor transit damage for instant automated dispute deduction.'
    },
    {
      num: '08',
      title: 'Rate Farmer & Repeat Sourcing',
      desc: 'Leave multi-category ratings for product freshness, communication, and sizing to maintain marketplace trust.'
    }
  ];

  const steps = activeTab === 'farmer' ? farmerSteps : buyerSteps;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-agri-700 uppercase tracking-widest block">
          Transparent End-to-End Workflow
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-stone-900">
          How Agri Connect Works
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Agri Connect provides a structured, predictable process that eliminates uncertainty and distress sales for farmers while ensuring quality and reliable supply for buyers.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl bg-stone-100 border border-stone-200 mt-4">
          <button
            onClick={() => setActiveTab('farmer')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'farmer'
                ? 'bg-agri-800 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Farmer Workflow ("Sell Before Going to the Yard")</span>
          </button>

          <button
            onClick={() => setActiveTab('buyer')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'buyer'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buyer Workflow (Direct Sourcing & Escrow)</span>
          </button>
        </div>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs hover:shadow-lg transition-all space-y-3 relative group overflow-hidden"
          >
            <span className="text-4xl font-display font-extrabold text-stone-200 group-hover:text-agri-200 transition-colors block">
              {s.num}
            </span>
            <h3 className="font-display font-bold text-sm text-stone-900 leading-snug">
              {s.title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Core Rules Comparison */}
      <div className="rounded-3xl bg-stone-900 text-white p-8 sm:p-10 border border-stone-800 space-y-6">
        <h3 className="font-display font-bold text-xl text-white text-center">
          Guaranteed Marketplace Governance Principles
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-stone-300">
          <div className="space-y-1.5 p-4 rounded-2xl bg-stone-800/60 border border-stone-700">
            <span className="font-bold text-emerald-400 block flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Locked Commercial Snapshot
            </span>
            <p>
              Once an offer is accepted, terms (unit price, quantity, fees) cannot be changed unilaterally. It forms the legally auditable transaction source of truth.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-stone-800/60 border border-stone-700">
            <span className="font-bold text-harvest-400 block flex items-center gap-1">
              <Receipt className="w-4 h-4" /> Escrow Safety Gate
            </span>
            <p>
              Payment is held securely in platform escrow during transit. Payout to farmer is triggered only upon buyer inward quality confirmation.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-stone-800/60 border border-stone-700">
            <span className="font-bold text-blue-400 block flex items-center gap-1">
              <RotateCcw className="w-4 h-4" /> Fast Dispute Triage
            </span>
            <p>
              Weight discrepancies or transit damage are supported with weighment slips and resolved within 2-4 hours with partial refunds or settlements.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-agri-500 hover:bg-agri-400 text-stone-950 font-bold text-xs shadow-lg transition-colors"
          >
            <span>Try Agri Connect Live Demo Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
};
