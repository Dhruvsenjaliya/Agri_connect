import React from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, MapPin, Phone, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DeliveryProfile: React.FC = () => {
  const { currentUser } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-24 h-24 rounded-3xl object-cover ring-4 ring-purple-500/20 shadow-md"
        />

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="font-display font-extrabold text-2xl text-stone-900">{currentUser.name}</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              Verified Logistics Driver
            </span>
          </div>

          <p className="text-xs text-purple-900 font-bold">{currentUser.farmOrBusinessName}</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-stone-500 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {currentUser.location}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              {currentUser.phone}
            </span>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-purple-800 block">Fleet Rating</span>
          <div className="font-display font-extrabold text-2xl text-purple-950">★ 4.9</div>
          <span className="text-[10px] text-purple-700 font-medium">88 On-Time Trips</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="font-display font-bold text-base text-stone-900 border-b pb-2 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-purple-600" />
          <span>Vehicle & Commercial Driving Credentials</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-xs">
            <span className="text-stone-500 text-[10px] font-bold uppercase block">Driving Licence</span>
            <strong className="text-stone-900 block">MH15-2018-00912 (Commercial Heavy)</strong>
            <span className="text-emerald-600 text-[10px] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> RTO Verified
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-xs">
            <span className="text-stone-500 text-[10px] font-bold uppercase block">Reefer Vehicle Permit</span>
            <strong className="text-stone-900 block">MH-15-EG-4412 (3 Ton Cold Chain)</strong>
            <span className="text-emerald-600 text-[10px] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> State Permit Active
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-xs">
            <span className="text-stone-500 text-[10px] font-bold uppercase block">Payout Bank Acc</span>
            <strong className="text-stone-900 block">Kotak Bank ****5512</strong>
            <span className="text-emerald-600 text-[10px] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Fast Settlement
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
