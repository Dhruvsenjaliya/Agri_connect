import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, UserRole } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Users, Search, ShieldCheck, CheckCircle2, XCircle, AlertTriangle, Eye } from 'lucide-react';

interface AdminUsersProps {
  roleFilter?: UserRole;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({ roleFilter }) => {
  const { users, updateUserStatus } = useApp();
  const [activeRole, setActiveRole] = useState<string>(roleFilter || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter((u) => {
    if (activeRole !== 'all' && u.role !== activeRole) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.farmOrBusinessName.toLowerCase().includes(q) || u.location.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">
          {roleFilter ? `${roleFilter.toUpperCase()} Directory` : 'Platform Users Directory'}
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Manage farmers, bulk buyers, restaurants, hotels, and cold-chain logistics partners.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <input
            type="text"
            placeholder="Search by user name, company or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 text-xs rounded-xl border border-stone-300 focus:bg-white"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>

        {!roleFilter && (
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['all', 'farmer', 'buyer', 'delivery', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setActiveRole(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  activeRole === r ? 'bg-stone-900 text-white shadow-xs' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {r === 'all' ? 'All Roles' : r}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5 pl-5">User</th>
                <th className="p-3.5">Role / Category</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">KYC Status</th>
                <th className="p-3.5">Account Status</th>
                <th className="p-3.5">Registered</th>
                <th className="p-3.5 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-stone-50/80">
                  <td className="p-3.5 pl-5">
                    <div className="flex items-center gap-2.5">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <strong className="block text-stone-900">{u.name}</strong>
                        <span className="text-[11px] text-stone-500">{u.farmOrBusinessName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 font-medium text-stone-800">
                    <span className="capitalize">{u.role}</span>
                    {u.buyerType && <span className="text-stone-400 block text-[10px]">{u.buyerType}</span>}
                  </td>
                  <td className="p-3.5 text-stone-600">{u.location}, {u.state}</td>
                  <td className="p-3.5">
                    <StatusBadge status={u.verificationStatus} type="verification" />
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      u.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {u.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3.5 text-stone-500">{u.joinDate}</td>
                  <td className="p-3.5 pr-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                        title="View details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {u.status === 'active' ? (
                        <button
                          onClick={() => updateUserStatus(u.id, 'suspended')}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 text-[11px] font-semibold"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => updateUserStatus(u.id, 'active')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold"
                        >
                          Reactivate
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

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <h3 className="font-display font-bold text-lg text-stone-900">{selectedUser.name}</h3>
                <p className="text-xs text-stone-500">{selectedUser.farmOrBusinessName}</p>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-stone-400 font-bold">✕</button>
            </div>

            <div className="space-y-2 text-xs">
              <div><strong>Role:</strong> <span className="capitalize">{selectedUser.role}</span></div>
              <div><strong>Email:</strong> {selectedUser.email}</div>
              <div><strong>Phone:</strong> {selectedUser.phone}</div>
              <div><strong>Location:</strong> {selectedUser.location}, {selectedUser.state}</div>
              <div className="pt-2 border-t">
                <strong>KYC Documents:</strong>
                <p className="text-stone-600 mt-1">{selectedUser.documents?.idProof || 'Identity Document On File'}</p>
                <p className="text-stone-600">{selectedUser.documents?.landRecordOrGst || 'Business / Land Registration Active'}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="w-full py-2.5 rounded-xl bg-stone-100 text-stone-800 font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
