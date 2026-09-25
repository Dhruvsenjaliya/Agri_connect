import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Package, Search, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export const AdminListings: React.FC = () => {
  const { listings, updateListingStatus } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = listings.filter(l => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return l.product.toLowerCase().includes(q) || l.farmerName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Produce Listings Moderation</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Approve, suspend, or moderate farmer produce batches to maintain quality and avoid mislabeling.
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        <input
          type="text"
          placeholder="Filter by commodity or farmer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-sm px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white"
        />
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5 pl-5">Listing ID</th>
                <th className="p-3.5">Produce & Variety</th>
                <th className="p-3.5">Farmer</th>
                <th className="p-3.5">Stock / MOQ</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Grade</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/80">
                  <td className="p-3.5 pl-5 font-mono font-bold text-stone-700">#{item.id}</td>
                  <td className="p-3.5 font-bold text-stone-900">
                    {item.product}
                    <span className="text-stone-400 font-normal block text-[10px]">{item.variety}</span>
                  </td>
                  <td className="p-3.5 text-stone-700">{item.farmerName} ({item.location})</td>
                  <td className="p-3.5 text-stone-600">{item.availableQuantity} {item.unit} (MOQ: {item.moq})</td>
                  <td className="p-3.5 font-bold text-agri-950">₹{item.price}/{item.unit}</td>
                  <td className="p-3.5">
                    <StatusBadge status={item.grade} type="grade" />
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={item.status} type="listing" />
                  </td>
                  <td className="p-3.5 pr-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {item.status === 'active' ? (
                        <button
                          onClick={() => updateListingStatus(item.id, 'suspended')}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-[11px]"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => updateListingStatus(item.id, 'active')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px]"
                        >
                          Approve Live
                        </button>
                      )}
                    </div>
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
