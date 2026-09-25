import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Building2, MapPin, Phone, Mail, ShieldCheck, CheckCircle2, CreditCard } from 'lucide-react';

export const BuyerProfile: React.FC = () => {
  const { currentUser } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-24 h-24 rounded-3xl object-cover ring-4 ring-blue-500/20 shadow-md"
        />

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="font-display font-extrabold text-2xl text-stone-900">{currentUser.name}</h1>
            <StatusBadge status={currentUser.verificationStatus} type="verification" />
          </div>

          <p className="text-xs text-blue-900 font-bold">{currentUser.farmOrBusinessName} • {currentUser.buyerType}</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-stone-500 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {currentUser.location}, {currentUser.state}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              {currentUser.phone}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              {currentUser.email}
            </span>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-blue-800 block">Buyer Trust Rating</span>
          <div className="font-display font-extrabold text-2xl text-blue-950">★ {currentUser.rating.toFixed(1)}</div>
          <span className="text-[10px] text-blue-700 font-medium">Prompt Escrow Payee</span>
        </div>
      </div>

      {/* Business Verification Credentials */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h2 className="font-display font-bold text-base text-stone-900">Corporate & GST Verification</h2>
          </div>
          <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            GSTIN 27AAACF9821K1Z5 Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-xs">
            <span className="text-stone-500 text-[10px] font-bold uppercase block">Company PAN</span>
            <strong className="text-stone-900 block">{currentUser.documents?.idProof || 'PAN Verified AAACF9821K'}</strong>
            <span className="text-emerald-600 text-[10px] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> NSDL Active
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-xs">
            <span className="text-stone-500 text-[10px] font-bold uppercase block">GST Registration</span>
            <strong className="text-stone-900 block">{currentUser.documents?.landRecordOrGst || 'GSTIN 27AAACF9821K1Z5'}</strong>
            <span className="text-emerald-600 text-[10px] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Maharashtra Regular
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-xs">
            <span className="text-stone-500 text-[10px] font-bold uppercase block">Escrow Bank Mandate</span>
            <strong className="text-stone-900 block">{currentUser.documents?.bankPassbook || 'Axis Bank Corp ****1199'}</strong>
            <span className="text-emerald-600 text-[10px] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Virtual Account Linked
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
