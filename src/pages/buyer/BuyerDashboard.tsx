import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Target, 
  MessageSquare, 
  TrendingUp, 
  Truck, 
  CheckSquare, 
  CreditCard, 
  PlusCircle, 
  Package, 
  MapPin, 
  ArrowRight,
  Sparkles,
  Building2
} from 'lucide-react';
import { ProductCard } from '../../components/common/ProductCard';
import { DemandCard } from '../../components/common/DemandCard';

export const BuyerDashboard: React.FC = () => {
  const { listings, demands, offers, orders, enquiries, currentUser } = useApp();

  const activeOrders = orders.filter(o => o.status !== 'Completed');
  const openDemands = demands.filter(d => d.status === 'open');
  const pendingOffers = offers.filter(o => o.status === 'pending' || o.status === 'countered');
  const completedOrders = orders.filter(o => o.status === 'Completed');
  
  const totalPurchaseValue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const recommendedProduce = listings.filter(l => l.status === 'active').slice(0, 3);
  const myDemands = demands.slice(0, 2);

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-xl sm:text-2xl text-white">
              Welcome, {currentUser.name}! 🛒
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-white text-xs font-bold">
              {currentUser.buyerType || 'Bulk Buyer'}
            </span>
          </div>
          <p className="text-xs text-blue-200 mt-1 max-w-xl">
            {currentUser.farmOrBusinessName} • Direct farm gate procurement with guaranteed quality grades and escrow safety.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/buyer/demand/new"
            className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-stone-950 font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Post Procurement Demand</span>
          </Link>

          <Link
            to="/buyer/marketplace"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors flex items-center gap-1.5"
          >
            <Package className="w-4 h-4" />
            <span>Browse Produce</span>
          </Link>
        </div>
      </div>

      {/* 6 Buyer KPI Cards (BRD Section 9) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Active Orders */}
        <Link to="/buyer/orders" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-blue-500 transition-all group">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Active Orders</span>
            <ShoppingBag className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display font-extrabold text-2xl text-stone-900">{activeOrders.length}</div>
          <span className="text-[10px] text-blue-600 font-medium mt-0.5 block">In fulfillment</span>
        </Link>

        {/* Pending Enquiries */}
        <Link to="/buyer/enquiries" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-500 transition-all group">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Enquiries</span>
            <MessageSquare className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display font-extrabold text-2xl text-stone-900">{enquiries.length}</div>
          <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block">Farmer chats</span>
        </Link>

        {/* Pending Offers */}
        <Link to="/buyer/offers" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-500 transition-all group">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Pending Bids</span>
            <TrendingUp className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display font-extrabold text-2xl text-amber-950">{pendingOffers.length}</div>
          <span className="text-[10px] text-amber-600 font-medium mt-0.5 block">In negotiation</span>
        </Link>

        {/* Open Demand Posts */}
        <Link to="/buyer/demand" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-purple-500 transition-all group">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>My Demands</span>
            <Target className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display font-extrabold text-2xl text-stone-900">{openDemands.length}</div>
          <span className="text-[10px] text-purple-600 font-medium mt-0.5 block">Active for matching</span>
        </Link>

        {/* Completed Orders */}
        <Link to="/buyer/orders" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-teal-500 transition-all group">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Completed</span>
            <CheckSquare className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display font-extrabold text-2xl text-stone-900">{completedOrders.length}</div>
          <span className="text-[10px] text-teal-600 font-medium mt-0.5 block">Received & rated</span>
        </Link>

        {/* Total Purchase Value */}
        <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 shadow-xs">
          <div className="flex items-center justify-between text-blue-900 text-xs mb-1 font-semibold">
            <span>Total Value</span>
            <CreditCard className="w-4 h-4 text-blue-700" />
          </div>
          <div className="font-display font-extrabold text-xl text-blue-950">
            ₹{totalPurchaseValue.toLocaleString()}
          </div>
          <span className="text-[10px] text-blue-700 font-medium mt-0.5 block">Escrow protected</span>
        </div>

      </div>

      {/* Recommended Produce Batches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-lg text-stone-900">Recommended Produce Near You</h2>
            <p className="text-xs text-stone-500">Batches matching your procurement history and quality grade requirements</p>
          </div>
          <Link to="/buyer/marketplace" className="text-xs font-bold text-blue-700 hover:text-blue-900">
            Browse All Marketplace →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recommendedProduce.map((item) => (
            <ProductCard key={item.id} listing={item} />
          ))}
        </div>
      </div>

      {/* My Active Demands Summary */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="font-display font-bold text-base text-stone-900">Your Active Procurement Demands</h3>
            <p className="text-xs text-stone-500">Farmers in Nashik/Pune corridors are submitting supply offers for these posts</p>
          </div>
          <Link to="/buyer/demand/new" className="text-xs font-bold text-blue-700 hover:text-blue-900">
            + Post Another Demand
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myDemands.map((demand) => (
            <DemandCard key={demand.id} demand={demand} />
          ))}
        </div>
      </div>

    </div>
  );
};
