import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wallet, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';

export const AdminRefunds: React.FC = () => {
  const { ledger } = useApp();

  const refundEntries = ledger.filter(l => l.type === 'REFUND_BUYER' || l.type.includes('ADJUSTMENT'));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Refunds & Settlement Adjustments</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Auditable refund executions originating from dispute resolutions and weighment shortage claims.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5 pl-5">Entry ID</th>
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Recipient Buyer</th>
                <th className="p-3.5">Reason & Description</th>
                <th className="p-3.5">Refund Amount</th>
                <th className="p-3.5">Processed Timestamp</th>
                <th className="p-3.5 pr-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {refundEntries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-stone-400 text-xs">No refunds currently issued.</td>
                </tr>
              ) : (
                refundEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-stone-50/80">
                    <td className="p-3.5 pl-5 font-mono font-bold text-stone-700">{entry.id}</td>
                    <td className="p-3.5 font-mono text-agri-800">#{entry.orderId}</td>
                    <td className="p-3.5 font-medium text-stone-900">{entry.userName}</td>
                    <td className="p-3.5 text-stone-700">{entry.description}</td>
                    <td className="p-3.5 font-bold text-rose-700">₹{entry.amount.toLocaleString()}</td>
                    <td className="p-3.5 text-stone-500">{entry.timestamp}</td>
                    <td className="p-3.5 pr-5 text-right">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Processed
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
