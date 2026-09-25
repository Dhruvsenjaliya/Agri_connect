import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Dispute } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ShieldAlert, CheckCircle2, XCircle, Eye, AlertTriangle, FileText, Scale } from 'lucide-react';

export const AdminDisputes: React.FC = () => {
  const { disputes, resolveDispute } = useApp();
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [resolutionType, setResolutionType] = useState<Dispute['resolutionType']>('Partial refund');
  const [resolutionAmount, setResolutionAmount] = useState<number>(500);
  const [adminNotes, setAdminNotes] = useState<string>('Weighment slip verified. Approved partial refund adjustment for 20kg transit damage.');

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDispute) return;
    resolveDispute(selectedDispute.id, resolutionType, resolutionAmount, adminNotes);
    setSelectedDispute(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Dispute Resolution & Quality Arbitration</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Fair platform adjudication for weighment discrepancies, grade mismatch, or transit damage with evidence scrutiny.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5 pl-5">Dispute ID</th>
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Raised By</th>
                <th className="p-3.5">Against</th>
                <th className="p-3.5">Reason</th>
                <th className="p-3.5">Claim Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5 text-right">Arbitration Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {disputes.map((d) => (
                <tr key={d.id} className="hover:bg-stone-50/80">
                  <td className="p-3.5 pl-5 font-mono font-bold text-stone-700">#{d.id}</td>
                  <td className="p-3.5 font-mono text-agri-800">#{d.orderId}</td>
                  <td className="p-3.5 font-medium text-stone-900">{d.raisedByName} ({d.raisedByRole})</td>
                  <td className="p-3.5 font-medium text-stone-900">{d.againstName}</td>
                  <td className="p-3.5 font-semibold text-rose-800">{d.reason}</td>
                  <td className="p-3.5 font-bold text-stone-900">₹{d.claimAmount.toLocaleString()}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      d.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {d.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3.5 pr-5 text-right">
                    {d.status === 'Open' ? (
                      <button
                        onClick={() => {
                          setSelectedDispute(d);
                          setResolutionAmount(d.claimAmount);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-[11px] shadow-xs"
                      >
                        Arbitrate & Settle
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-semibold text-[11px]">
                        Resolved ({d.resolutionType})
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Arbitration Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <h3 className="font-display font-bold text-lg text-stone-900">Arbitrate Dispute #{selectedDispute.id}</h3>
                <p className="text-xs text-stone-500">Order #{selectedDispute.orderId} • Claim: ₹{selectedDispute.claimAmount.toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedDispute(null)} className="text-stone-400 font-bold">✕</button>
            </div>

            {/* Description & Evidence */}
            <div className="p-4 bg-stone-50 rounded-2xl border text-xs space-y-2">
              <div>
                <span className="text-stone-500 font-bold block">Dispute Description:</span>
                <p className="text-stone-800 leading-relaxed">{selectedDispute.description}</p>
              </div>

              <div>
                <span className="text-stone-500 font-bold block">Attached Evidence:</span>
                <div className="flex gap-2 mt-1">
                  {selectedDispute.evidence.map((ev, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-stone-700 text-[11px] font-mono">
                      📎 {ev.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Resolution Form */}
            <form onSubmit={handleResolve} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Select Official Resolution Decision *
                </label>
                <select
                  value={resolutionType}
                  onChange={(e) => setResolutionType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:bg-white"
                >
                  <option value="Partial refund">Partial refund (Deduct damage/shortage value from farmer settlement)</option>
                  <option value="Full refund">Full refund (Cancel transaction & return escrow 100% to buyer)</option>
                  <option value="Release payment">Release full payment (Reject claim, produce confirmed compliant)</option>
                  <option value="Replacement">Replacement / Re-delivery mandatory</option>
                  <option value="Fee reversal">Fee reversal & platform credit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Adjustment / Settlement Amount (₹) *
                </label>
                <input
                  type="number"
                  value={resolutionAmount}
                  onChange={(e) => setResolutionAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Admin Arbitration Order & Notes *
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDispute(null)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-extrabold text-xs shadow-md"
                >
                  Execute Legally Binding Arbitration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
