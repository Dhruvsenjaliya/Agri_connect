import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, Download, Filter, Calendar, MapPin, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { orders, listings, demands, users, disputes } = useApp();
  const [dateFilter, setDateFilter] = useState('Last 30 Days');
  const [locationFilter, setLocationFilter] = useState('All Corridors');
  const [productFilter, setProductFilter] = useState('All Produce');

  const handleExport = () => {
    alert('Simulated Export: Downloaded Agri_Connect_Operations_Report_Q3.csv');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-stone-900">Analytics & Operational Reports</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Key marketplace metrics: Match Rate, Conversion, Farmer Net Realization, and Dispute Ratios (BRD Section 29).
          </p>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-bold text-xs shadow-sm transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Full CSV Report</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-stone-400" />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-xl font-semibold text-stone-800"
          >
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Current Quarter (Q3)">Current Quarter (Q3)</option>
            <option value="All Time">All Time</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-stone-400" />
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-xl font-semibold text-stone-800"
          >
            <option value="All Corridors">All Corridors (Maharashtra)</option>
            <option value="Nashik Hub">Nashik Hub</option>
            <option value="Pune Hub">Pune Hub</option>
            <option value="Mumbai CDC">Mumbai CDC</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-xl font-semibold text-stone-800"
          >
            <option value="All Produce">All Commodities</option>
            <option value="Tomato">Tomato</option>
            <option value="Onion">Onion</option>
            <option value="Wheat">Wheat</option>
            <option value="Grapes">Grapes</option>
          </select>
        </div>
      </div>

      {/* 14 BRD Section 29 Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 text-[11px] block">Match Rate</span>
          <div className="font-display font-extrabold text-2xl text-emerald-700">92.4%</div>
          <span className="text-[10px] text-stone-400">Demand matched to farm listing</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 text-[11px] block">Order Conversion</span>
          <div className="font-display font-extrabold text-2xl text-blue-700">76.8%</div>
          <span className="text-[10px] text-stone-400">Offers accepted into orders</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 text-[11px] block">Average Order Value (AOV)</span>
          <div className="font-display font-extrabold text-2xl text-stone-900">₹45,800</div>
          <span className="text-[10px] text-stone-400">Average bulk contract size</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 text-[11px] block">Farmer Net Realization</span>
          <div className="font-display font-extrabold text-2xl text-emerald-800">98.0%</div>
          <span className="text-[10px] text-stone-400">Gross minus 2% platform fee</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 text-[11px] block">Cancellation Rate</span>
          <div className="font-display font-extrabold text-2xl text-stone-900">1.2%</div>
          <span className="text-[10px] text-emerald-700 font-medium">Low default due to escrow</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 text-[11px] block">Dispute Rate</span>
          <div className="font-display font-extrabold text-2xl text-rose-700">2.1%</div>
          <span className="text-[10px] text-stone-400">Mostly transit crate bruising</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 text-[11px] block">Refund Rate</span>
          <div className="font-display font-extrabold text-2xl text-purple-700">0.8%</div>
          <span className="text-[10px] text-stone-400">Partial weighment adjustments</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 text-[11px] block">On-Time Fulfillment</span>
          <div className="font-display font-extrabold text-2xl text-teal-700">97.6%</div>
          <span className="text-[10px] text-stone-400">Dual OTP corridor dispatch</span>
        </div>

      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="font-display font-bold text-sm text-stone-900">Corridor-Wise Performance Breakdown</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b">
              <tr>
                <th className="p-3">Corridor</th>
                <th className="p-3">Primary Produce</th>
                <th className="p-3">Total Volume</th>
                <th className="p-3">Gross Value (₹)</th>
                <th className="p-3">Avg Delivery Time</th>
                <th className="p-3">Dispute Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-bold text-stone-900">Nashik → Mumbai CDC</td>
                <td className="p-3">Tomato, Onion, Grapes</td>
                <td className="p-3">42.5 Tons</td>
                <td className="p-3 font-bold text-emerald-800">₹10,62,500</td>
                <td className="p-3">3.8 Hours</td>
                <td className="p-3 text-emerald-700 font-semibold">1.4%</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-bold text-stone-900">Pune → Mumbai Hotel Corridor</td>
                <td className="p-3">Banana, Vegetables</td>
                <td className="p-3">28.0 Tons</td>
                <td className="p-3 font-bold text-emerald-800">₹6,16,000</td>
                <td className="p-3">2.9 Hours</td>
                <td className="p-3 text-emerald-700 font-semibold">0.9%</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-bold text-stone-900">Ahmednagar → Mumbai / Pune</td>
                <td className="p-3">Wheat, Pulses, Spices</td>
                <td className="p-3">65.0 Tons</td>
                <td className="p-3 font-bold text-emerald-800">₹22,10,000</td>
                <td className="p-3">5.2 Hours</td>
                <td className="p-3 text-emerald-700 font-semibold">0.4%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
