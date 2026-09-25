import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Users, 
  Scale, 
  DollarSign, 
  Clock, 
  Lock, 
  ChevronRight,
  Receipt,
  HeartHandshake,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { ProductCard } from '../../components/common/ProductCard';
import { DemandCard } from '../../components/common/DemandCard';

export const LandingPage: React.FC = () => {
  const { listings, demands, switchRole } = useApp();

  const featuredListings = listings.slice(0, 4);
  const featuredDemands = demands.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-agri-950 to-agri-900 text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
        
        {/* Background decorative mesh */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4ade80_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-harvest-400" />
                <span>India's Transparent Pre-Harvest & Farm-Gate Discovery Platform</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
                Connect Farmers <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-agri-300 to-harvest-300">
                  Directly With Buyers
                </span>
              </h1>

              <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Discover demand, negotiate guaranteed commercial terms, and eliminate unnecessary transportation risk before moving perishable produce to the market yard.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/marketplace"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-agri-500 hover:bg-agri-600 text-stone-950 font-display font-extrabold text-sm shadow-xl shadow-agri-600/20 hover:shadow-agri-600/40 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Produce</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/farmer/listings/new"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white font-display font-bold text-sm border border-stone-700 hover:border-stone-600 transition-all flex items-center justify-center gap-2"
                >
                  <Sprout className="w-4 h-4 text-emerald-400" />
                  <span>List Your Produce</span>
                </Link>
              </div>

              {/* Micro Stats Bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-800/80 text-left">
                <div>
                  <span className="block font-display font-extrabold text-xl sm:text-2xl text-white">100%</span>
                  <span className="text-[11px] text-stone-400 font-medium">Pre-Yard Price Discovery</span>
                </div>
                <div>
                  <span className="block font-display font-extrabold text-xl sm:text-2xl text-emerald-400">0%</span>
                  <span className="text-[11px] text-stone-400 font-medium">Distress Sale Risk</span>
                </div>
                <div>
                  <span className="block font-display font-extrabold text-xl sm:text-2xl text-harvest-400">₹0</span>
                  <span className="text-[11px] text-stone-400 font-medium">Unnecessary Freight</span>
                </div>
              </div>

            </div>

            {/* Right Visual Card - "Sell Before Going to the Yard" Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-b from-stone-800/90 to-stone-900/90 p-6 border border-stone-700/80 shadow-2xl backdrop-blur-xl space-y-5">
                
                <div className="flex items-center justify-between border-b border-stone-700/60 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-agri-500/20 text-agri-400 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">The Agri Connect Principle</h4>
                      <span className="text-[10px] text-emerald-300 font-medium uppercase tracking-wider">Direct • Transparent • Fair</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-harvest-400/20 text-harvest-300 text-[10px] font-bold border border-harvest-400/30">
                    BRD v2.0
                  </span>
                </div>

                {/* Core Concept Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-agri-900/80 border border-emerald-500/30 space-y-2">
                  <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>"Sell Before Going to the Yard"</span>
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    Traditional APMC yards force farmers to incur freight costs first, leading to distress sales when supply gluts cause sudden price drops. Agri Connect connects verified buyers to farmers <em>before</em> produce leaves the farm gate.
                  </p>
                </div>

                {/* Step Preview */}
                <div className="space-y-2.5 text-xs text-stone-300">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-800/60 border border-stone-700/40">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                    <div className="truncate"><strong className="text-white">Farmer Lists:</strong> Quantity, Grade, Harvest Date & Price</div>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-800/60 border border-stone-700/40">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                    <div className="truncate"><strong className="text-white">Buyer Matches:</strong> Send Offer & Negotiate Terms</div>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-800/60 border border-stone-700/40">
                    <div className="w-6 h-6 rounded-full bg-harvest-400/20 text-harvest-300 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                    <div className="truncate"><strong className="text-white">Lock Commercials:</strong> Escrow Secured before Loading</div>
                  </div>
                </div>

                {/* Action shortcut to role workspace */}
                <div className="pt-2 flex items-center gap-2">
                  <Link
                    to="/farmer/dashboard"
                    onClick={() => switchRole('farmer')}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-agri-600 hover:bg-agri-500 text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Launch Farmer Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/buyer/dashboard"
                    onClick={() => switchRole('buyer')}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-stone-700 hover:bg-stone-600 text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Launch Buyer Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Market Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-agri-700 uppercase tracking-widest block mb-1">
              Live Agricultural Supply
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
              Fresh Produce Available at Farm Gate
            </h2>
          </div>
          
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-agri-700 hover:text-agri-900 group"
          >
            <span>View all produce listings ({listings.length})</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((item) => (
            <ProductCard key={item.id} listing={item} />
          ))}
        </div>
      </section>

      {/* Live Buyer Demands Section */}
      <section className="bg-stone-100/80 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
                Verified Buyer Requirements
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
                Active Demands Posted by Bulk & Retail Buyers
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Farmers can review target price ranges and submit direct supply offers.
              </p>
            </div>

            <Link
              to="/buyer/demand"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 group"
            >
              <span>Explore all buyer demands ({demands.length})</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDemands.map((demand) => (
              <DemandCard key={demand.id} demand={demand} />
            ))}
          </div>

        </div>
      </section>

      {/* The 8 Stakeholder Ecosystem */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-agri-700 uppercase tracking-widest block">
            End-to-End Agri Network
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
            One Unified Platform for All 8 Stakeholders
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            From farm gate discovery to quality-verified delivery and auditable escrow settlements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Farmer */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-stone-900">1. Farmers & FPOs</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              List upcoming harvest, view active buyer demand, negotiate fair rates, and receive fast bank payouts.
            </p>
            <Link to="/farmer/dashboard" onClick={() => switchRole('farmer')} className="inline-flex items-center gap-1 text-xs font-bold text-agri-700 hover:underline">
              Enter Farmer Portal <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Bulk Buyers */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-stone-900">2. Bulk & Supermarket Buyers</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Procure consistent truckloads with guaranteed grades, cold chain logistics, and escrow protection.
            </p>
            <Link to="/buyer/dashboard" onClick={() => switchRole('buyer')} className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline">
              Enter Bulk Buyer Portal <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Hotels & Restaurants */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-stone-900">3. Hotels & Caterers</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Schedule recurring supplies of crisp, fresh vegetables and fruits directly from orchards.
            </p>
            <Link to="/buyer/demand/new" onClick={() => switchRole('buyer')} className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline">
              Post Procurement Demand <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Logistics */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-stone-900">4. Delivery Partners</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Execute temperature-controlled reefer corridors with dual OTP handover and weighment proofs.
            </p>
            <Link to="/delivery/dashboard" onClick={() => switchRole('delivery')} className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:underline">
              Enter Logistics Portal <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Interactive Value Comparison Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-agri-950 via-stone-900 to-agri-900 text-white p-8 sm:p-12 shadow-2xl border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-harvest-400/20 text-harvest-300 text-xs font-bold border border-harvest-400/30">
                Traditional Yard vs Agri Connect
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Why "Selling Before Going to the Yard" Changes Agricultural Economics
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                When farmers transport produce without a locked deal, local buyers exploit perishable decay time. With Agri Connect, the commercial snapshot is locked in escrow before a single crate is loaded.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/40 text-xs space-y-1">
                <span className="font-bold text-rose-300 flex items-center gap-1.5">
                  ✕ The Old Way (Blind Yard Transport)
                </span>
                <p className="text-stone-300">
                  Pay truck transport upfront → Arrive at yard during glut → Forced to accept whatever low price is offered to avoid total rot.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-xs space-y-1">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                  ✓ The Agri Connect Way (Direct Pre-Negotiation)
                </span>
                <p className="text-stone-200">
                  Publish produce availability → Receive bids and negotiate from home → Lock price & escrow → Hand over produce with OTP.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl text-stone-900">Voices from the Farm Gate & Market</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="text-amber-500 font-bold text-sm">★★★★★</div>
            <p className="text-stone-700 italic leading-relaxed">
              "I used to spend ₹8,000 on truck freight to Mumbai without knowing that day's tomato rate. With Agri Connect, I negotiated ₹25/kg with FreshMart before even plucking!"
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Rajesh" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <strong className="block text-stone-900">Rajesh Patil</strong>
                <span className="text-stone-500 text-[11px]">Tomato & Onion Farmer, Nashik</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="text-amber-500 font-bold text-sm">★★★★★</div>
            <p className="text-stone-700 italic leading-relaxed">
              "We procure 5 tons of fresh vegetables weekly for our supermarket chain. Agri Connect guarantees Grade A quality with weighment slips and platform escrow protection."
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Vikram" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <strong className="block text-stone-900">Vikram Mehta</strong>
                <span className="text-stone-500 text-[11px]">Procurement Lead, FreshMart</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="text-amber-500 font-bold text-sm">★★★★★</div>
            <p className="text-stone-700 italic leading-relaxed">
              "Banquet cooking requires uniform grade onions and potatoes. Posting our requirements on the demand board gets us competitive offers from certified farmers in hours."
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80" alt="Sanjeev" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <strong className="block text-stone-900">Chef Sanjeev Roy</strong>
                <span className="text-stone-500 text-[11px]">Executive Chef, Hotel Sunrise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-agri-700 text-white p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Ready to Experience Direct Agricultural Commerce?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Test all stakeholder roles in this interactive demo prototype. Create produce listings, post demand, negotiate commercial snapshots, and simulate escrow settlement.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/marketplace"
                className="px-6 py-3 rounded-xl bg-white text-agri-950 font-bold text-xs shadow-lg hover:bg-stone-100 transition-colors"
              >
                Browse Marketplace
              </Link>
              <Link
                to="/how-it-works"
                className="px-6 py-3 rounded-xl bg-agri-800 hover:bg-agri-900 text-white font-bold text-xs border border-agri-600 transition-colors"
              >
                See Step-by-Step Workflow
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
