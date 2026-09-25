import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { ShieldCheck, Tractor, ShoppingBag, Truck } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

interface DashboardLayoutProps {
  role: UserRole;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const { currentUser } = useApp();
  const location = useLocation();

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
      
      {/* Top Breadcrumb & User Identity Strip */}
      <div className="mb-4 bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-agri-500/20"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[9px] text-white font-bold">
              ✓
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-sm text-stone-900">{currentUser.name}</h2>
              <StatusBadge status={currentUser.verificationStatus} type="verification" />
            </div>
            <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
              <span>{currentUser.farmOrBusinessName}</span>
              <span>•</span>
              <span>{currentUser.location}, {currentUser.state}</span>
            </p>
          </div>
        </div>

        {/* Right Stats Quick Pill */}
        <div className="flex items-center gap-2 text-xs">
          <div className="bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
            <span className="text-stone-500 text-[10px] block">Trust Rating</span>
            <span className="font-bold text-amber-600">★ {currentUser.rating.toFixed(1)} / 5.0</span>
          </div>
          <div className="bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
            <span className="text-stone-500 text-[10px] block">KYC Status</span>
            <span className="font-bold text-emerald-700">7/12 Land & ID Verified</span>
          </div>
        </div>
      </div>

      {/* Main Dual-Column Workspace */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <Sidebar role={role} />
        
        <main className="flex-1 w-full min-w-0 bg-transparent">
          <Outlet />
        </main>
      </div>

    </div>
  );
};
