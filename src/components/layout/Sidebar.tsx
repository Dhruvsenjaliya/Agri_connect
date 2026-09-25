import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  Target, 
  MessageSquare, 
  TrendingUp, 
  ShoppingBag, 
  Truck, 
  CheckSquare, 
  Wallet, 
  UserCheck, 
  Users, 
  FileCheck, 
  ShieldAlert, 
  Percent, 
  BarChart3, 
  History,
  CalendarCheck,
  CreditCard,
  Building2,
  LucideIcon
} from 'lucide-react';

interface SidebarProps {
  role: 'farmer' | 'buyer' | 'delivery' | 'admin';
}

interface SidebarLinkItem {
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: number;
  badgeColor?: string;
  highlight?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();
  const { listings, demands, offers, orders, deliveryTasks, disputes } = useApp();

  const farmerLinks: SidebarLinkItem[] = [
    { label: 'Dashboard', path: '/farmer/dashboard', icon: LayoutDashboard },
    { label: 'My Listings', path: '/farmer/listings', icon: Package, badge: listings.length },
    { label: '+ Add Produce', path: '/farmer/listings/new', icon: PlusCircle },
    { label: 'Buyer Demand Board', path: '/farmer/demand', icon: Target, badge: demands.length, highlight: true },
    { label: 'Enquiries', path: '/farmer/enquiries', icon: MessageSquare },
    { label: 'Negotiations & Offers', path: '/farmer/offers', icon: TrendingUp, badge: offers.filter(o => o.status === 'pending' || o.status === 'countered').length },
    { label: 'Orders', path: '/farmer/orders', icon: ShoppingBag, badge: orders.filter(o => o.status !== 'Completed').length },
    { label: 'Scheduled Pickups', path: '/farmer/pickups', icon: CalendarCheck },
    { label: 'Completed Sales', path: '/farmer/sales', icon: CheckSquare },
    { label: 'Earnings & Payouts', path: '/farmer/earnings', icon: Wallet },
    { label: 'Farmer Profile & KYC', path: '/farmer/profile', icon: UserCheck },
  ];

  const buyerLinks: SidebarLinkItem[] = [
    { label: 'Buyer Dashboard', path: '/buyer/dashboard', icon: LayoutDashboard },
    { label: 'Browse Produce', path: '/buyer/marketplace', icon: Package },
    { label: 'My Demand Posts', path: '/buyer/demand', icon: Target, badge: demands.length },
    { label: '+ Post Demand', path: '/buyer/demand/new', icon: PlusCircle, highlight: true },
    { label: 'My Enquiries', path: '/buyer/enquiries', icon: MessageSquare },
    { label: 'Offers & Negotiations', path: '/buyer/offers', icon: TrendingUp, badge: offers.length },
    { label: 'My Orders', path: '/buyer/orders', icon: ShoppingBag, badge: orders.length },
    { label: 'Fulfillment & Inward', path: '/buyer/delivery', icon: Truck },
    { label: 'Company Profile & KYC', path: '/buyer/profile', icon: Building2 },
  ];

  const deliveryLinks: SidebarLinkItem[] = [
    { label: 'Driver Dashboard', path: '/delivery/dashboard', icon: LayoutDashboard },
    { label: 'Assigned Tasks', path: '/delivery/tasks', icon: Truck, badge: deliveryTasks.filter(t => t.status !== 'Delivered').length },
    { label: 'Partner Profile & Fleet', path: '/delivery/profile', icon: UserCheck },
  ];

  const adminLinks: SidebarLinkItem[] = [
    { label: 'Operations Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'All Users Directory', path: '/admin/users', icon: Users },
    { label: 'Farmers Directory', path: '/admin/farmers', icon: UserCheck },
    { label: 'Buyers Directory', path: '/admin/buyers', icon: Building2 },
    { label: 'Logistics Partners', path: '/admin/delivery-partners', icon: Truck },
    { label: 'KYC Verifications', path: '/admin/verifications', icon: FileCheck },
    { label: 'Produce Listings Moderation', path: '/admin/listings', icon: Package },
    { label: 'Demand Posts Board', path: '/admin/demands', icon: Target },
    { label: 'Master Orders & Timeline', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Financial Ledger & Escrow', path: '/admin/payments', icon: CreditCard },
    { label: 'Refunds & Adjustments', path: '/admin/refunds', icon: Wallet },
    { label: 'Farmer Payouts Release', path: '/admin/payouts', icon: CheckSquare },
    { label: 'Disputes Resolution Desk', path: '/admin/disputes', icon: ShieldAlert, badge: disputes.filter(d => d.status === 'Open').length, badgeColor: 'bg-rose-500 text-white' },
    { label: 'Commission Configuration', path: '/admin/commissions', icon: Percent },
    { label: 'Analytics & Reports', path: '/admin/reports', icon: BarChart3 },
    { label: 'Security & Audit Logs', path: '/admin/audit-logs', icon: History },
  ];

  const links: SidebarLinkItem[] = role === 'farmer' ? farmerLinks : role === 'buyer' ? buyerLinks : role === 'delivery' ? deliveryLinks : adminLinks;

  const roleTitle = role === 'farmer' ? 'Farmer Workspace' : role === 'buyer' ? 'Buyer Procurement' : role === 'delivery' ? 'Logistics Fleet' : 'Operations & Admin';
  const roleSubtitle = role === 'farmer' ? 'Sell Before Going to the Yard' : role === 'buyer' ? 'Direct Farm Gate Sourcing' : role === 'delivery' ? 'Cold-Chain & Yard Logistics' : 'Governance & Settlements';

  return (
    <aside className="w-full lg:w-64 bg-white border-r border-stone-200/90 flex flex-col shrink-0 lg:min-h-[calc(100vh-6rem)]">
      {/* Workspace Header */}
      <div className="p-4 border-b border-stone-100 bg-stone-50/50">
        <h3 className="font-display font-bold text-stone-900 text-sm tracking-tight">{roleTitle}</h3>
        <p className="text-[11px] text-stone-600 truncate mt-0.5">{roleSubtitle}</p>
      </div>

      {/* Navigation items */}
      <nav className="p-3 space-y-1 overflow-y-auto flex-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-agri-800 text-white shadow-xs font-semibold'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              } ${link.highlight && !isActive ? 'ring-1 ring-agri-400 bg-emerald-50/60 text-agri-800' : ''}`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-stone-600'}`} />
                <span className="truncate">{link.label}</span>
              </div>
              {link.badge !== undefined && link.badge > 0 && (
                <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${link.badgeColor || (isActive ? 'bg-white text-agri-900' : 'bg-stone-200 text-stone-700')}`}>
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Helper Tip */}
      <div className="p-3 border-t border-stone-100 bg-stone-50/80 m-2 rounded-xl text-[11px] text-stone-600">
        <div className="font-semibold text-stone-800 text-xs mb-1">💡 Pro-Tip</div>
        <p className="leading-snug text-stone-600">
          Negotiate and lock commercial terms before loading produce into transport.
        </p>
      </div>
    </aside>
  );
};
