import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Tractor, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Bell, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const RoleSwitcherBar: React.FC = () => {
  const { currentUser, switchRole, notifications, markAllNotificationsRead, resetDemoData } = useApp();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = React.useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roles: Array<{ role: UserRole; label: string; name: string; icon: React.ReactNode; path: string }> = [
    {
      role: 'farmer',
      label: 'Farmer',
      name: 'Rajesh Patil (Nashik)',
      icon: <Tractor className="w-4 h-4 text-emerald-600" />,
      path: '/farmer/dashboard'
    },
    {
      role: 'buyer',
      label: 'Buyer',
      name: 'Vikram (FreshMart)',
      icon: <ShoppingBag className="w-4 h-4 text-blue-600" />,
      path: '/buyer/dashboard'
    },
    {
      role: 'delivery',
      label: 'Logistics',
      name: 'Ganesh (AgriExpress)',
      icon: <Truck className="w-4 h-4 text-amber-600" />,
      path: '/delivery/dashboard'
    },
    {
      role: 'admin',
      label: 'Ops Admin',
      name: 'Operations HQ',
      icon: <ShieldCheck className="w-4 h-4 text-purple-600" />,
      path: '/admin/dashboard'
    }
  ];

  const handleRoleSelect = (role: UserRole, targetPath: string) => {
    switchRole(role);
    navigate(targetPath);
  };

  return (
    <div className="bg-stone-900 text-stone-200 border-b border-stone-800 text-xs py-1.5 px-3 sm:px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Left: Role Switcher Demo Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
          <span className="font-semibold text-stone-400 uppercase tracking-wider text-[10px] mr-1 hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-harvest-400" /> Interactive Demo Role:
          </span>

          {roles.map((r) => {
            const isActive = currentUser.role === r.role;
            return (
              <button
                key={r.role}
                onClick={() => handleRoleSelect(r.role, r.path)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all ${
                  isActive
                    ? 'bg-agri-600 text-white shadow-sm ring-1 ring-agri-400 font-semibold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                }`}
                title={`Switch view to ${r.name}`}
              >
                <span className="p-0.5 rounded-full bg-stone-900/30">{r.icon}</span>
                <span>{r.label}</span>
                {isActive && <CheckCircle2 className="w-3 h-3 text-white ml-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Right: Active Identity Info + Notification Bell + Reset */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="hidden md:flex items-center gap-2 text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px]">
              Active: <strong className="text-stone-100">{currentUser.name}</strong> ({currentUser.farmOrBusinessName})
            </span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              title="Demo Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-stone-900 rounded-xl shadow-2xl border border-stone-200 z-50 overflow-hidden">
                <div className="p-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-agri-700" />
                    <span className="font-semibold text-sm text-stone-800">Demo Activity Feeds</span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-agri-700 hover:text-agri-800 font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-center text-xs text-stone-500">No notifications yet.</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 text-xs transition-colors hover:bg-stone-50 ${
                          !notif.read ? 'bg-emerald-50/60' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-stone-900 text-xs">{notif.title}</h4>
                          <span className="text-[10px] text-stone-600 whitespace-nowrap">{notif.timestamp}</span>
                        </div>
                        <p className="text-stone-700 mt-1 leading-relaxed">{notif.message}</p>
                        {notif.linkUrl && (
                          <Link
                            to={notif.linkUrl}
                            onClick={() => setShowNotifications(false)}
                            className="inline-flex items-center gap-1 mt-2 text-agri-700 hover:text-agri-800 font-medium"
                          >
                            <span>View details</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={() => {
              if (window.confirm('Reset all demo listings, orders, and balances back to original state?')) {
                resetDemoData();
                navigate('/');
              }
            }}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors text-[11px]"
            title="Reset Mock Data"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
