import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, ShieldCheck, Search, ArrowUpRight, ArrowDownLeft, Lock } from 'lucide-react';

export const AdminPayments: React.FC = () => {
  const { ledger } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = ledger.filter(l => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return l.id.toLowerCase().includes(q) || l.orderId.toLowerCase().includes(q) || l.userName.toLowerCase().includes(q) || l.type.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Financial Ledger & Escrow Accounting</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Immutable, auditable double-entry ledger of all simulated payments, commission deductions, refunds, and farmer payouts.
        </p>
      </div>

      <div className="bg-stone-900 text-white p-6 rounded-3xl border border-stone-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs text-stone-400 font-semibold block">Platform Escrow Trust Holding</span>
          <div className="font-display font-extrabold text-3xl text-emerald-400">₹99,896</div>
          <span className="text-[11px] text-stone-400">Total verified balances across all active corridors</span>
        </div>

        <div className="p-3 rounded-2xl bg-stone-800/80 border border-stone-700 text-xs text-stone-300 max-w-sm flex items-start gap-2">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>Ledger Integrity Rule (BRD Section 26):</strong> Admins cannot silently modify historical records. All corrections must appear as auditable adjustment entries.
          </span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        <input
          type="text"
          placeholder="Filter ledger entries by Txn ID, Order ID, User or Type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white"
        />
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5 pl-5">Transaction ID</th>
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Party / Stakeholder</th>
                <th className="p-3.5">Event Type</th>
                <th className="p-3.5">Amount (₹)</th>
                <th className="p-3.5">Before / After Balance</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5 pr-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((entry) => (
                <tr key={entry.id} className="hover:bg-stone-50/80">
                  <td className="p-3.5 pl-5 font-mono font-bold text-stone-800">{entry.id}</td>
                  <td className="p-3.5 font-mono text-agri-800">#{entry.orderId}</td>
                  <td className="p-3.5 font-medium text-stone-900">
                    {entry.userName}
                    <span className="text-stone-400 capitalize block text-[10px]">{entry.userRole}</span>
                  </td>
                  <td className="p-3.5 font-mono text-[11px] font-bold text-stone-700">{entry.type}</td>
                  <td className="p-3.5 font-bold text-stone-900">
                    <span className={entry.type.includes('PAYOUT') || entry.type.includes('REFUND') ? 'text-rose-700' : 'text-emerald-800'}>
                      {entry.type.includes('PAYOUT') || entry.type.includes('REFUND') ? '-' : '+'}₹{entry.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-3.5 text-stone-600 font-mono text-[11px]">
                    ₹{entry.balanceBefore.toLocaleString()} → ₹{entry.balanceAfter.toLocaleString()}
                  </td>
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
