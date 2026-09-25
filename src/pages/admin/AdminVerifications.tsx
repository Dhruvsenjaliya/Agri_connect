import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { FileCheck, ShieldCheck, CheckCircle2, XCircle, Eye, AlertTriangle } from 'lucide-react';

export const AdminVerifications: React.FC = () => {
  const { users, updateUserStatus } = useApp();
  const [selectedDocUser, setSelectedDocUser] = useState<User | null>(null);

  const verificationQueue = users;

  const handleApprove = (userId: string) => {
    updateUserStatus(userId, 'active', 'Approved');
    if (selectedDocUser?.id === userId) setSelectedDocUser(null);
  };

  const handleReject = (userId: string) => {
    updateUserStatus(userId, 'suspended', 'Rejected');
    if (selectedDocUser?.id === userId) setSelectedDocUser(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">KYC & Document Verification Desk</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Review land records (7/12 extracts), FPO certificates, GSTINs, and commercial driver permits.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5 pl-5">Applicant</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Submitted Documents</th>
                <th className="p-3.5">KYC Status</th>
                <th className="p-3.5 pr-5 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {verificationQueue.map((user) => (
                <tr key={user.id} className="hover:bg-stone-50/80">
                  <td className="p-3.5 pl-5">
                    <div className="flex items-center gap-2.5">
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <strong className="block text-stone-900">{user.name}</strong>
                        <span className="text-[11px] text-stone-500">{user.farmOrBusinessName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 font-medium text-stone-800 capitalize">{user.role}</td>
                  <td className="p-3.5 text-stone-600">{user.location}</td>
                  <td className="p-3.5 text-stone-600">
                    <div className="space-y-0.5">
                      <div className="text-[11px] truncate max-w-xs">{user.documents?.idProof || 'Aadhaar ID Uploaded'}</div>
                      <div className="text-[10px] text-stone-400 truncate max-w-xs">{user.documents?.landRecordOrGst || 'Land 7/12 / GSTIN Record'}</div>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={user.verificationStatus} type="verification" />
                  </td>
                  <td className="p-3.5 pr-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedDocUser(user)}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold"
                      >
                        Inspect Docs
                      </button>

                      <button
                        onClick={() => handleApprove(user.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(user.id)}
                        className="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 text-[11px] font-bold"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doc Viewer Modal */}
      {selectedDocUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <h3 className="font-display font-bold text-lg text-stone-900">Verification Inspection: {selectedDocUser.name}</h3>
                <p className="text-xs text-stone-500">{selectedDocUser.farmOrBusinessName} • {selectedDocUser.role}</p>
              </div>
              <button onClick={() => setSelectedDocUser(null)} className="text-stone-400 font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs bg-stone-50 p-4 rounded-2xl border">
              <div className="space-y-1">
                <span className="font-bold text-stone-700">1. Identity Verification:</span>
                <p className="font-mono bg-white p-2 rounded-lg border">{selectedDocUser.documents?.idProof || 'Aadhaar Record (UIDAI Verified)'}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-stone-700">2. Land Extract / GSTIN Record:</span>
                <p className="font-mono bg-white p-2 rounded-lg border">{selectedDocUser.documents?.landRecordOrGst || 'Revenue Extract #NSK-44910'}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-stone-700">3. Bank Mandate:</span>
                <p className="font-mono bg-white p-2 rounded-lg border">{selectedDocUser.documents?.bankPassbook || 'Passbook / Penny Drop Confirmed'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setSelectedDocUser(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 text-stone-800 text-xs font-semibold"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReject(selectedDocUser.id)}
                  className="px-4 py-2 rounded-xl bg-rose-100 text-rose-800 text-xs font-bold"
                >
                  Reject KYC
                </button>
                <button
                  onClick={() => handleApprove(selectedDocUser.id)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm"
                >
                  Approve KYC
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
