import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { History, Search, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export const AdminAuditLogs: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');

  const filtered = auditLogs.filter(log => {
    if (moduleFilter !== 'All' && log.module !== moduleFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return log.action.toLowerCase().includes(q) || log.adminName.toLowerCase().includes(q) || log.recordId.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Security & Operational Audit Trail</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Immutable logging of all sensitive administrative actions (KYC approvals, commission changes, payouts, and dispute resolutions).
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <input
            type="text"
            placeholder="Search audit trail by action, admin or record ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 text-xs rounded-xl border border-stone-300 focus:bg-white"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>

        <select
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          className="px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-800"
        >
          <option value="All">All Modules</option>
          <option value="Users">Users</option>
          <option value="Verification">Verification</option>
          <option value="Listings">Listings</option>
          <option value="Orders">Orders</option>
          <option value="Payments">Payments</option>
          <option value="Refunds">Refunds</option>
          <option value="Payouts">Payouts</option>
          <option value="Disputes">Disputes</option>
          <option value="Commissions">Commissions</option>
        </select>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5 pl-5">Timestamp</th>
                <th className="p-3.5">Admin / Actor</th>
                <th className="p-3.5">Action Executed</th>
                <th className="p-3.5">Module</th>
                <th className="p-3.5">Record ID</th>
                <th className="p-3.5">Old Value → New Value</th>
                <th className="p-3.5">IP / Session</th>
                <th className="p-3.5 pr-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-mono text-[11px]">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-stone-50/80">
                  <td className="p-3.5 pl-5 text-stone-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3.5 font-sans font-bold text-stone-900">{log.adminName}</td>
                  <td className="p-3.5 font-sans font-semibold text-agri-950">{log.action}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-sans font-bold text-[10px]">
                      {log.module}
                    </span>
                  </td>
                  <td className="p-3.5 text-stone-800">#{log.recordId}</td>
                  <td className="p-3.5 text-stone-600 max-w-xs truncate">
                    <span className="text-stone-400">{log.oldValue}</span> → <strong className="text-stone-800">{log.newValue}</strong>
                  </td>
                  <td className="p-3.5 text-stone-400 text-[10px]">{log.ipSession}</td>
                  <td className="p-3.5 pr-5 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] font-sans">
                      {log.status}
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
