import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Sprout, Tractor, ShoppingBag, Truck, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { users, switchRole, setCurrentUser } = useApp();
  const navigate = useNavigate();

  const handleQuickLogin = (userId: string, role: UserRole, targetPath: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    } else {
      switchRole(role);
    }
    navigate(targetPath);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-agri-600 flex items-center justify-center text-white mx-auto shadow-md">
          <Sprout className="w-7 h-7" />
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
          Sign In to Agri Connect
        </h1>
        <p className="text-xs text-stone-500">
          Choose a verified stakeholder demo account to enter its dedicated portal:
        </p>
      </div>

      {/* Demo Accounts List */}
      <div className="space-y-3">
        
        {/* Farmer */}
        <button
          onClick={() => handleQuickLogin('farmer-1', 'farmer', '/farmer/dashboard')}
          className="w-full p-4 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Tractor className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-900">Rajesh Patil</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">Farmer</span>
              </div>
              <p className="text-xs text-stone-500">Rajesh Organic Farms, Nashik • Tomato & Onion Producer</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Buyer - Bulk */}
        <button
          onClick={() => handleQuickLogin('buyer-1', 'buyer', '/buyer/dashboard')}
          className="w-full p-4 rounded-2xl bg-white border border-stone-200 hover:border-blue-500 shadow-xs hover:shadow-md transition-all text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-900">Vikram Mehta</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-semibold">Bulk Buyer</span>
              </div>
              <p className="text-xs text-stone-500">FreshMart Supermarkets, Mumbai • Bulk Sourcing Hub</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Buyer - Hotel */}
        <button
          onClick={() => handleQuickLogin('buyer-3', 'buyer', '/buyer/dashboard')}
          className="w-full p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-500 shadow-xs hover:shadow-md transition-all text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-900">Chef Sanjeev Roy</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">Hotel / Catering</span>
              </div>
              <p className="text-xs text-stone-500">Hotel Sunrise Palace, Mumbai • Daily Kitchen Procurement</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Delivery Partner */}
        <button
          onClick={() => handleQuickLogin('delivery-1', 'delivery', '/delivery/dashboard')}
          className="w-full p-4 rounded-2xl bg-white border border-stone-200 hover:border-purple-500 shadow-xs hover:shadow-md transition-all text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-900">Ganesh Shinde</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-semibold">Logistics Partner</span>
              </div>
              <p className="text-xs text-stone-500">AgriExpress Reefer Logistics • MH-15-EG-4412</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-purple-600 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Operations Admin */}
        <button
          onClick={() => handleQuickLogin('admin-1', 'admin', '/admin/dashboard')}
          className="w-full p-4 rounded-2xl bg-white border border-stone-200 hover:border-stone-900 shadow-xs hover:shadow-md transition-all text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-900">Operations Control HQ</span>
                <span className="px-2 py-0.5 rounded-full bg-stone-800 text-white text-[10px] font-semibold">Admin</span>
              </div>
              <p className="text-xs text-stone-500">Governance, KYC Approvals, Financial Ledger, Disputes & Payouts</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-transform group-hover:translate-x-1" />
        </button>

      </div>
    </div>
  );
};
