import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wallet, DollarSign, ArrowUpRight, ShieldCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const FarmerEarnings: React.FC = () => {
  const { orders, ledger, releasePayout } = useApp();

  const paidOrders = orders.filter(o => o.payoutStatus === 'paid');
  const eligibleOrders = orders.filter(o => o.payoutStatus === 'eligible');
  const unreleasedOrders = orders.filter(o => o.payoutStatus === 'unreleased' || o.payoutStatus === 'withheld');

  const totalPaidOut = paidOrders.reduce((sum, o) => sum + o.farmerNetPayout, 0) + 246368;
  const eligiblePayoutTotal = eligibleOrders.reduce((sum, o) => sum + o.farmerNetPayout, 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">
          Farmer Earnings & Settlement Ledgers
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Auditable breakdown of gross produce values, 2% platform commission, and bank payouts.
        </p>
      </div>

      {/* Top 3 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-emerald-900 text-white p-5 rounded-3xl shadow-md space-y-1">
          <span className="text-xs text-emerald-200 font-semibold block">Total Realized & Paid Out</span>
          <div className="font-display font-extrabold text-2xl">₹{totalPaidOut.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-300 block">Directly credited to SBI Acc ****9012</span>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-5 rounded-3xl shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-800 font-semibold block">Eligible for Instant Release</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-display font-extrabold text-2xl text-amber-950">₹{eligiblePayoutTotal.toLocaleString()}</div>
          <span className="text-[11px] text-amber-700 block">Buyer verified receipt • Ready for bank release</span>
        </div>

        <div className="bg-white border border-stone-200 p-5 rounded-3xl shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-semibold block">Standard Platform Commission</span>
          <div className="font-display font-extrabold text-2xl text-stone-900">2.0%</div>
          <span className="text-[11px] text-emerald-700 font-medium block">Zero hidden yard aggregation cuts</span>
        </div>

      </div>

      {/* Eligible Payouts Action Table */}
      {eligibleOrders.length > 0 && (
        <div className="bg-white rounded-3xl border border-amber-300 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-stone-900">Eligible Settlements Ready for Release</h3>
                <p className="text-[11px] text-stone-500">Buyer accepted produce inward check without dispute</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {eligibleOrders.map((order) => (
              <div key={order.id} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-stone-900">
                    Order #{order.id} — {order.quantityOrdered} {order.unit} {order.product} ({order.buyerName})
                  </div>
                  <div className="text-stone-600 text-[11px]">
                    Gross Value: ₹{order.grossAmount.toLocaleString()} - 2% Comm (₹{order.farmerCommissionAmount})
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] text-stone-500 block">Net Payout Amount</span>
                    <strong className="text-emerald-700 text-base font-extrabold">₹{order.farmerNetPayout.toLocaleString()}</strong>
                  </div>

                  <button
                    onClick={() => releasePayout(order.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    Simulate Release to Bank
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transparent Formula Box (BRD Section 15 Example) */}
      <div className="bg-stone-900 text-white p-6 rounded-3xl border border-stone-800 space-y-3">
        <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Transparent Settlement Formula (BRD v2.0 Rule)</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-800/80 p-4 rounded-2xl border border-stone-700 text-xs text-center">
          <div>
            <span className="text-stone-400 text-[10px] block">Gross Produce Value</span>
            <strong className="text-white text-sm">₹25,000</strong>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] block">- Platform Commission (2%)</span>
            <strong className="text-rose-400 text-sm">₹500</strong>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] block">- Logistics (Paid by Buyer)</span>
            <strong className="text-white text-sm">₹0</strong>
          </div>
          <div>
            <span className="text-emerald-400 text-[10px] block font-bold">= Farmer Net Realization</span>
            <strong className="text-emerald-400 text-sm font-extrabold">₹24,500</strong>
          </div>
        </div>
      </div>

      {/* Ledger History */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-stone-100">
          <h3 className="font-display font-bold text-sm text-stone-900">Financial Ledger Entries</h3>
          <p className="text-[11px] text-stone-500">Immutable transaction log of credits and debits</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5 pl-5">Entry ID</th>
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Description</th>
                <th className="p-3.5">Transaction Type</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5 pr-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ledger.map((entry) => (
                <tr key={entry.id} className="hover:bg-stone-50/80">
                  <td className="p-3.5 pl-5 font-mono font-bold text-stone-700">{entry.id}</td>
                  <td className="p-3.5 font-mono text-agri-800">#{entry.orderId}</td>
                  <td className="p-3.5 text-stone-800 max-w-xs truncate">{entry.description}</td>
                  <td className="p-3.5 font-mono text-[11px] text-stone-600">{entry.type}</td>
                  <td className="p-3.5 font-bold text-stone-900">₹{entry.amount.toLocaleString()}</td>
                  <td className="p-3.5 text-stone-500 text-[11px]">{entry.timestamp}</td>
                  <td className="p-3.5 pr-5 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] capitalize">
                      {entry.status}
                    </span>
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
