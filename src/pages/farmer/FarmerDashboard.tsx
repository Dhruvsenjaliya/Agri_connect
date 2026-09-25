import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { 
  Package, 
  MessageSquare, 
  TrendingUp, 
  ShoppingBag, 
  Truck, 
  CheckSquare, 
  Wallet, 
  PlusCircle, 
  Target, 
  ArrowRight, 
  Sparkles, 
  DollarSign, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const FarmerDashboard: React.FC = () => {
  const { listings, demands, offers, orders, enquiries, currentUser, ledger } = useApp();

  const activeListings = listings.filter(l => l.status === 'active').length;
  const activeEnquiries = enquiries.filter(e => e.status === 'open').length;
  const pendingNegotiations = offers.filter(o => o.status === 'pending' || o.status === 'countered').length;
  const newOrders = orders.filter(o => o.status === 'Payment Pending' || o.status === 'Pickup Scheduled').length;
  const scheduledPickups = orders.filter(o => o.status === 'Pickup Scheduled').length;
  const completedSales = orders.filter(o => o.status === 'Completed').length;
  
  const pendingPayoutTotal = orders
    .filter(o => o.payoutStatus === 'eligible' || o.payoutStatus === 'unreleased')
    .reduce((sum, o) => sum + o.farmerNetPayout, 0);

  const totalEarnings = orders
    .filter(o => o.payoutStatus === 'paid')
    .reduce((sum, o) => sum + o.farmerNetPayout, 0) + 246368; // pre-seeded earnings base

  const recentOrders = orders.slice(0, 4);

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-agri-900 via-agri-800 to-agri-950 text-white rounded-3xl p-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-xl sm:text-2xl text-white">
              Namaste, {currentUser.name}! 🌾
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-bold">
              Farmer Portal
            </span>
          </div>
          <p className="text-xs text-emerald-100 mt-1 max-w-xl">
            You have <strong className="text-white">{pendingNegotiations} pending buyer offers</strong> and <strong className="text-white">{demands.length} active demands</strong> waiting for your produce.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/farmer/listings/new"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List New Produce</span>
          </Link>

          <Link
            to="/farmer/demand"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors flex items-center gap-1.5"
          >
            <Target className="w-4 h-4 text-harvest-300" />
            <span>Buyer Demand Board</span>
          </Link>
        </div>
      </div>

      {/* 8 Metric KPI Cards Grid (Matching BRD Section 8) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        
        {/* Active Listings */}
        <Link to="/farmer/listings" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-500 transition-all group">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Active Listings</span>
            <Package className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display font-extrabold text-2xl text-stone-900">{activeListings}</div>
          <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block">Live in marketplace</span>
        </Link>

        {/* Buyer Enquiries */}
        <Link to="/farmer/enquiries" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-blue-500 transition-all group">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Buyer Enquiries</span>
            <MessageSquare className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display font-extrabold text-2xl text-stone-900">{activeEnquiries || 8}</div>
          <span className="text-[10px] text-blue-600 font-medium mt-0.5 block">Messages received</span>
        </Link>

        {/* Pending Negotiations */}
        <Link to="/farmer/offers" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-500 transition-all group">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Pending Negotiations</span>
            <TrendingUp className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display font-extrabold text-2xl text-amber-950">{pendingNegotiations || 3}</div>
          <span className="text-[10px] text-amber-600 font-medium mt-0.5 block">Action required</span>
        </Link>

        {/* New Orders */}
        <Link to="/farmer/orders" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-purple-500 transition-all group">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>New Orders</span>
            <ShoppingBag className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display font-extrabold text-2xl text-stone-900">{newOrders || 5}</div>
          <span className="text-[10px] text-purple-600 font-medium mt-0.5 block">Payment / Dispatch</span>
        </Link>

        {/* Scheduled Pickups */}
        <Link to="/farmer/pickups" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-500 transition-all group">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Scheduled Pickups</span>
            <Truck className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display font-extrabold text-2xl text-stone-900">{scheduledPickups || 4}</div>
          <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block">Reefer logistics booked</span>
        </Link>

        {/* Completed Sales */}
        <Link to="/farmer/sales" className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-teal-500 transition-all group">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Completed Sales</span>
            <CheckSquare className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display font-extrabold text-2xl text-stone-900">{completedSales || 26}</div>
          <span className="text-[10px] text-teal-600 font-medium mt-0.5 block">Delivered & verified</span>
        </Link>

        {/* Pending Payout */}
        <Link to="/farmer/earnings" className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 shadow-xs hover:border-amber-400 transition-all group">
          <div className="flex items-center justify-between text-amber-800 text-xs mb-1 font-semibold">
            <span>Pending Payout</span>
            <Wallet className="w-4 h-4 text-amber-700 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display font-extrabold text-xl text-amber-950">
            ₹{(pendingPayoutTotal || 48500).toLocaleString()}
          </div>
          <span className="text-[10px] text-amber-700 font-medium mt-0.5 block">Held in trust escrow</span>
        </Link>

        {/* Total Earnings */}
        <Link to="/farmer/earnings" className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 shadow-xs hover:border-emerald-400 transition-all group">
          <div className="flex items-center justify-between text-emerald-800 text-xs mb-1 font-semibold">
            <span>Total Earnings</span>
            <Sparkles className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-display font-extrabold text-xl text-emerald-950">
            ₹{totalEarnings.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">Net realization released</span>
        </Link>

      </div>

      {/* Visual Mock Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Trend Bar */}
        <div className="lg:col-span-2 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-sm text-stone-900">Weekly Farm Gate Sales Realization</h3>
              <p className="text-[11px] text-stone-500">Gross produce value realized vs platform commission (2%)</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              +18.4% vs Traditional APMC Yard
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-4 px-2 border-b border-stone-100">
            {[
              { day: 'Mon', gross: 42, net: 40 },
              { day: 'Tue', gross: 58, net: 56 },
              { day: 'Wed', gross: 35, net: 34 },
              { day: 'Thu', gross: 72, net: 69 },
              { day: 'Fri', gross: 88, net: 85 },
              { day: 'Sat', gross: 95, net: 92 },
              { day: 'Sun', gross: 64, net: 62 },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full max-w-[28px] bg-stone-100 rounded-t-lg h-36 flex items-end overflow-hidden p-0.5">
                  <div
                    style={{ height: `${bar.net}%` }}
                    className="w-full bg-gradient-to-t from-agri-700 to-agri-500 rounded-t-md"
                    title={`Net: ₹${bar.net * 1000}`}
                  />
                </div>
                <span className="text-[10px] font-semibold text-stone-500">{bar.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-agri-600" /> Net Farmer Realization</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-stone-200" /> Max Capacity</span>
            </div>
            <span className="font-semibold text-stone-700">Average Payout Speed: 2.4 Hours</span>
          </div>
        </div>

        {/* Produce Breakdown Doughnut Simulation */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-sm text-stone-900">Top-Selling Produce Breakdown</h3>
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Tomato (Abhinav Hybrid)</span>
                <span>48% (12,500 kg)</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '48%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Onion (Nashik Red Garwa)</span>
                <span>32% (8,200 kg)</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '32%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Potato (Kufri Jyoti)</span>
                <span>14% (3,500 kg)</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '14%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Other Vegetables & Herbs</span>
                <span>6% (1,200 kg)</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '6%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-[11px] text-emerald-950 font-medium">
            💡 <strong>High Demand Alert:</strong> Mumbai supermarkets are seeking 5,000 kg Tomato Grade A for next week.
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-sm text-stone-900">Recent Customer Orders</h3>
            <p className="text-[11px] text-stone-500">Live order fulfillment status and escrow tracking</p>
          </div>
          <Link to="/farmer/orders" className="text-xs font-bold text-agri-700 hover:text-agri-900">
            View all orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200/60">
              <tr>
                <th className="p-3.5 pl-5">Order ID</th>
                <th className="p-3.5">Buyer</th>
                <th className="p-3.5">Produce & Qty</th>
                <th className="p-3.5">Agreed Price</th>
                <th className="p-3.5">Gross Value</th>
                <th className="p-3.5">Net Payout</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-3.5 pl-5 font-mono font-bold text-agri-900">#{order.id}</td>
                  <td className="p-3.5 font-medium text-stone-800">{order.buyerName}</td>
                  <td className="p-3.5 font-semibold text-stone-900">{order.quantityOrdered} {order.unit} {order.product}</td>
                  <td className="p-3.5 text-stone-600">₹{order.unitPrice}/{order.unit}</td>
                  <td className="p-3.5 font-bold text-stone-900">₹{order.grossAmount.toLocaleString()}</td>
                  <td className="p-3.5 font-bold text-agri-800">₹{order.farmerNetPayout.toLocaleString()}</td>
                  <td className="p-3.5">
                    <StatusBadge status={order.status} type="order" />
                  </td>
                  <td className="p-3.5 pr-5 text-right">
                    <Link
                      to="/farmer/orders"
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-[11px] transition-colors"
                    >
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
