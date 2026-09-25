import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Target } from 'lucide-react';

export const AdminDemands: React.FC = () => {
  const { demands, updateDemandStatus } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Procurement Demands Oversight</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Monitor reverse buyer requirements across agricultural consumption hubs.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5 pl-5">Demand ID</th>
                <th className="p-3.5">Buyer & Location</th>
                <th className="p-3.5">Commodity</th>
                <th className="p-3.5">Target Price Band</th>
                <th className="p-3.5">Required Date</th>
                <th className="p-3.5">Grade</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {demands.map((d) => (
                <tr key={d.id} className="hover:bg-stone-50/80">
                  <td className="p-3.5 pl-5 font-mono font-bold text-stone-700">#{d.id}</td>
                  <td className="p-3.5 font-bold text-stone-900">
                    {d.buyerName}
                    <span className="text-stone-400 font-normal block text-[10px]">{d.buyerLocation} • {d.buyerType}</span>
                  </td>
                  <td className="p-3.5 font-semibold text-blue-900">{d.quantity} {d.unit} {d.product}</td>
                  <td className="p-3.5 font-bold text-stone-900">₹{d.targetPriceMin} - ₹{d.targetPriceMax}/{d.unit}</td>
                  <td className="p-3.5 text-stone-600">{d.requiredDate}</td>
                  <td className="p-3.5">
                    <StatusBadge status={d.grade} type="grade" />
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={d.status} type="demand" />
                  </td>
                  <td className="p-3.5 pr-5 text-right">
                    <button
                      onClick={() => updateDemandStatus(d.id, d.status === 'open' ? 'cancelled' : 'open')}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold"
                    >
                      {d.status === 'open' ? 'Close' : 'Re-open'}
                    </button>
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
