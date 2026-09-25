import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CommissionRule } from '../../types';
import { Percent, Edit3, History, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AdminCommissions: React.FC = () => {
  const { commissions, updateCommissionRule } = useApp();
  const [selectedRule, setSelectedRule] = useState<CommissionRule | null>(null);
  const [newRate, setNewRate] = useState<number>(2.0);
  const [changeNote, setChangeNote] = useState<string>('Adjusted platform rate for volume corridor');

  const handleSaveRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRule) return;
    updateCommissionRule(selectedRule.id, newRate, changeNote);
    setSelectedRule(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Commission & Platform Fee Engine</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Configure transparent commission percentages, fixed logistics surcharges, and effective date schedules (BRD Section 27).
        </p>
      </div>

      <div className="space-y-4">
        {commissions.map((rule) => (
          <div key={rule.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
              <div>
                <h3 className="font-display font-bold text-base text-stone-900">{rule.ruleName}</h3>
                <span className="text-xs text-stone-500">Target Role: {rule.targetRole} • Category: {rule.category} • Geography: {rule.geography}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 text-right">
                  <span className="text-[10px] text-emerald-800 font-bold block uppercase">Current Rate</span>
                  <div className="font-display font-extrabold text-xl text-emerald-950">
                    {rule.calculationType === 'Percentage' ? `${rule.rate}%` : `₹${rule.rate}`}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedRule(rule);
                    setNewRate(rule.rate);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                >
                  Edit Rate
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600">
              <div><strong>Effective Window:</strong> {rule.effectiveFrom} to {rule.effectiveUntil}</div>
              <div><strong>Status:</strong> <span className="text-emerald-700 font-bold">{rule.status}</span></div>
              <div><strong>Audit History:</strong> {rule.history.length} past amendments recorded</div>
            </div>

            {/* Audit History Log */}
            {rule.history.length > 0 && (
              <div className="bg-stone-50 p-3.5 rounded-2xl border text-xs space-y-1.5">
                <span className="font-bold text-stone-700 text-[10px] uppercase block">Revision History</span>
                {rule.history.map((h, i) => (
                  <div key={i} className="text-stone-600 text-[11px] flex justify-between border-b pb-1 last:border-b-0">
                    <span>{h.changeDate}: Changed from {h.oldRate}% to {h.newRate}% by {h.changedBy}</span>
                    <span className="italic text-stone-400">"{h.note}"</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit Rate Modal */}
      {selectedRule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-display font-bold text-lg text-stone-900">Modify {selectedRule.ruleName}</h3>
              <button onClick={() => setSelectedRule(null)} className="text-stone-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveRate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">
                  New Rate ({selectedRule.calculationType === 'Percentage' ? '%' : '₹'}) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={newRate}
                  onChange={(e) => setNewRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-base font-bold text-stone-900"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">
                  Reason for Commission Amendment *
                </label>
                <input
                  type="text"
                  value={changeNote}
                  onChange={(e) => setChangeNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  required
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedRule(null)}
                  className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-agri-700 text-white font-bold shadow-sm"
                >
                  Save & Log to Audit Trail
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
