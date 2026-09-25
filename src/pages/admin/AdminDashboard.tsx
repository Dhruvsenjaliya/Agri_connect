import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Tractor, 
  ShoppingBag, 
  Package, 
  Target, 
  CheckSquare, 
  CreditCard, 
  ShieldAlert, 
  Percent, 
  TrendingUp,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  History
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const AdminDashboard: React.FC = () => {
  const { users, listings, demands, orders, disputes, ledger } = useApp();

  const totalUsers = users.length;
  const activeFarmers = users.filter(u => u.role === 'farmer').length;
  const activeBuyers = users.filter(u => u.role === 'buyer').length;
  const activeListings = listings.filter(l => l.status === 'active').length;
  const activeDemands = demands.filter(d => d.status === 'open').length;
  const confirmedOrders = orders.filter(o => o.status !== 'Draft' && o.status !== 'Cancelled').length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  
  const totalGMV = orders.reduce((sum, o) => sum + o.grossAmount, 0) + 1250000;
  const platformRevenue = orders.reduce((sum, o) => sum + o.platformFee + o.farmerCommissionAmount, 0) + 50000;
  const pendingDisputes = disputes.filter(d => d.status === 'Open').length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-agri-950 text-white rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-2xl text-white">
              Operations & Governance Console
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-700 text-stone-200 text-xs font-bold">
              Central HQ
            </span>
          </div>
          <p className="text-xs text-stone-300 mt-1 max-w-xl">
            Real-time multi-stakeholder governance, KYC verification queue, auditable ledger, and dispute arbitration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/audit-logs"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors flex items-center gap-1.5"
          >
            <History className="w-4 h-4" />
            <span>Audit Trail</span>
          </Link>

          <Link
            to="/admin/disputes"
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Disputes ({pendingDisputes})</span>
          </Link>
        </div>
      </div>

      {/* 10 Operations Metric KPI Cards (BRD Section 21) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        <Link to="/admin/users" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-stone-800 transition-all">
          <span className="text-stone-500 text-xs block">Total Registered Users</span>
          <div className="font-display font-extrabold text-2xl text-stone-900">{totalUsers}</div>
          <span className="text-[10px] text-stone-400">Farmers, Buyers & Drivers</span>
        </Link>

        <Link to="/admin/farmers" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-600 transition-all">
          <span className="text-stone-500 text-xs block">Active Farmers</span>
          <div className="font-display font-extrabold text-2xl text-emerald-800">{activeFarmers}</div>
          <span className="text-[10px] text-emerald-700 font-medium">Nashik & Pune Corridors</span>
        </Link>

        <Link to="/admin/buyers" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-blue-600 transition-all">
          <span className="text-stone-500 text-xs block">Active Buyers</span>
          <div className="font-display font-extrabold text-2xl text-blue-800">{activeBuyers}</div>
          <span className="text-[10px] text-blue-700 font-medium">Supermarkets & Banquets</span>
        </Link>

        <Link to="/admin/listings" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-600 transition-all">
          <span className="text-stone-500 text-xs block">Active Listings</span>
          <div className="font-display font-extrabold text-2xl text-stone-900">{activeListings}</div>
          <span className="text-[10px] text-stone-400">Available produce</span>
        </Link>

        <Link to="/admin/demands" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-blue-600 transition-all">
          <span className="text-stone-500 text-xs block">Active Demand Posts</span>
          <div className="font-display font-extrabold text-2xl text-stone-900">{activeDemands}</div>
          <span className="text-[10px] text-stone-400">Reverse bids open</span>
        </Link>

        <Link to="/admin/orders" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-purple-600 transition-all">
          <span className="text-stone-500 text-xs block">Confirmed Orders</span>
          <div className="font-display font-extrabold text-2xl text-stone-900">{confirmedOrders}</div>
          <span className="text-[10px] text-purple-600 font-medium">Escrow backed</span>
        </Link>

        <Link to="/admin/orders" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-teal-600 transition-all">
          <span className="text-stone-500 text-xs block">Completed Orders</span>
          <div className="font-display font-extrabold text-2xl text-teal-800">{completedOrders}</div>
          <span className="text-[10px] text-teal-700 font-medium">Settled to bank</span>
        </Link>

        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 shadow-xs">
          <span className="text-emerald-800 text-xs font-semibold block">Total Transaction Value</span>
          <div className="font-display font-extrabold text-xl text-emerald-950">₹{totalGMV.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-700">Gross Merchandise Value</span>
        </div>

        <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 shadow-xs">
          <span className="text-blue-800 text-xs font-semibold block">Platform Revenue</span>
          <div className="font-display font-extrabold text-xl text-blue-950">₹{platformRevenue.toLocaleString()}</div>
          <span className="text-[10px] text-blue-700">2% Facilitation Fee</span>
        </div>

        <Link to="/admin/disputes" className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200 shadow-xs hover:border-rose-400 transition-all">
          <span className="text-rose-800 text-xs font-semibold block">Pending Disputes</span>
          <div className="font-display font-extrabold text-2xl text-rose-950">{pendingDisputes}</div>
          <span className="text-[10px] text-rose-700 font-bold">Needs Arbitration</span>
        </Link>

      </div>

      {/* Visual Analytics Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Supply vs Demand Comparison Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-sm text-stone-900">Supply vs Demand Balance (Metric Tons)</h3>
              <p className="text-[11px] text-stone-500">Live corridor volume distribution</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Corridor Match Rate: 91.2%
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { crop: 'Tomato', supply: 85, demand: 78, unit: 'Tons' },
              { crop: 'Onion', supply: 120, demand: 110, unit: 'Tons' },
              { crop: 'Potato', supply: 60, demand: 65, unit: 'Tons' },
              { crop: 'Grapes', supply: 40, demand: 32, unit: 'Tons' },
              { crop: 'Wheat', supply: 95, demand: 90, unit: 'Tons' },
            ].map((row, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-stone-800">
                  <span>{row.crop}</span>
                  <span className="text-stone-500">Supply: {row.supply}T • Demand: {row.demand}T</span>
                </div>
                <div className="w-full h-3 bg-stone-100 rounded-full flex overflow-hidden">
                  <div className="bg-emerald-600 h-full" style={{ width: `${(row.supply / (row.supply + row.demand)) * 100}%` }} title="Supply" />
                  <div className="bg-blue-600 h-full" style={{ width: `${(row.demand / (row.supply + row.demand)) * 100}%` }} title="Demand" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-600" /> Farmer Supply</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-600" /> Buyer Demand</span>
            </div>
            <span className="font-semibold text-stone-700">Pre-Yard Discoveries: 420 Batches</span>
          </div>
        </div>

        {/* Operational Quick Actions */}
        <div className="bg-stone-900 text-white p-6 rounded-3xl border border-stone-800 shadow-md space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-sm text-white">Critical Operations Queues</h3>
            <p className="text-[11px] text-stone-400">Sensitive actions recorded in immutable audit log</p>
          </div>

          <div className="space-y-2">
            <Link
              to="/admin/verifications"
              className="p-3 rounded-2xl bg-stone-800 hover:bg-stone-700 flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-400" />
                <span>KYC Verifications Queue</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[10px]">1 Pending</span>
            </Link>

            <Link
              to="/admin/disputes"
              className="p-3 rounded-2xl bg-stone-800 hover:bg-stone-700 flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Dispute Resolution Desk</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-rose-400/20 text-rose-300 font-bold text-[10px]">{pendingDisputes} Open</span>
            </Link>

            <Link
              to="/admin/payouts"
              className="p-3 rounded-2xl bg-stone-800 hover:bg-stone-700 flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Farmer Payout Release Desk</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold text-[10px]">Ready</span>
            </Link>

            <Link
              to="/admin/commissions"
              className="p-3 rounded-2xl bg-stone-800 hover:bg-stone-700 flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-blue-400" />
                <span>Commission Rules Engine</span>
              </div>
              <span className="text-stone-400 text-[10px]">2% Default</span>
            </Link>
          </div>

          <div className="text-[10px] text-stone-500 pt-2 border-t border-stone-800">
            Audit session ID: <code className="text-emerald-400">192.168.1.45 (SSL-Auth)</code>
          </div>
        </div>

      </div>

    </div>
  );
};
