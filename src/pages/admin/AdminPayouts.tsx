import React from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminPayouts: React.FC = () => {
  const { orders, releasePayout } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Farmer Payout Settlement Desk</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Verify receiving sign-offs and execute net payouts directly to farmer bank accounts.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5 pl-5">Order ID</th>
                <th className="p-3.5">Farmer</th>
                <th className="p-3.5">Produce & Volume</th>
                <th className="p-3.5">Gross Order Value</th>
                <th className="p-3.5">Platform 2% Fee</th>
                <th className="p-3.5">Net Payout (₹)</th>
                <th className="p-3.5">Settlement Eligibility</th>
                <th className="p-3.5 pr-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/80">
                  <td className="p-3.5 pl-5 font-mono font-bold text-stone-800">#{order.id}</td>
                  <td className="p-3.5 font-medium text-stone-900">{order.farmerName}</td>
                  <td className="p-3.5 font-bold text-stone-900">{order.quantityOrdered} {order.unit} {order.product}</td>
                  <td className="p-3.5 text-stone-700">₹{order.grossAmount.toLocaleString()}</td>
                  <td className="p-3.5 text-stone-500">-₹{order.farmerCommissionAmount}</td>
                  <td className="p-3.5 font-extrabold text-emerald-800">₹{order.farmerNetPayout.toLocaleString()}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      order.payoutStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : (order.payoutStatus === 'eligible' ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-600')
                    }`}>
                      {order.payoutStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3.5 pr-5 text-right">
                    {order.payoutStatus === 'eligible' ? (
                      <button
                        onClick={() => releasePayout(order.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-sm transition-all"
                      >
                        Release Payout
                      </button>
                    ) : (
                      <span className="text-stone-400 text-[11px]">
                        {order.payoutStatus === 'paid' ? 'Settled to Bank' : 'Awaiting Receipt'}
                      </span>
                    )}
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
