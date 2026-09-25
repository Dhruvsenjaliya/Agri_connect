import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  Search, 
  Menu, 
  X, 
  ShoppingBag, 
  Tractor, 
  Truck, 
  ShieldCheck, 
  PlusCircle, 
  ChevronDown,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const Navbar: React.FC = () => {
  const { currentUser, listings, demands } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isPublic = !location.pathname.startsWith('/farmer') && 
                   !location.pathname.startsWith('/buyer') && 
                   !location.pathname.startsWith('/delivery') && 
                   !location.pathname.startsWith('/admin');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getDashboardLink = () => {
    switch (currentUser.role) {
      case 'farmer':
        return '/farmer/dashboard';
      case 'buyer':
        return '/buyer/dashboard';
      case 'delivery':
        return '/delivery/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-agri-800 to-agri-600 flex items-center justify-center text-white shadow-md shadow-agri-900/10 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl tracking-tight text-agri-950">AGRI</span>
                  <span className="font-display font-bold text-xl tracking-tight text-agri-600">CONNECT</span>
                </div>
                <span className="text-[10px] font-medium tracking-widest text-stone-600 uppercase -mt-1">
                  Direct • Transparent • Fair
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
              <Link 
                to="/marketplace" 
                className={`transition-colors hover:text-agri-700 ${location.pathname === '/marketplace' ? 'text-agri-700 font-semibold' : ''}`}
              >
                Marketplace
              </Link>
              <Link 
                to="/how-it-works" 
                className={`transition-colors hover:text-agri-700 ${location.pathname === '/how-it-works' ? 'text-agri-700 font-semibold' : ''}`}
              >
                How It Works
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors hover:text-agri-700 ${location.pathname === '/about' ? 'text-agri-700 font-semibold' : ''}`}
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search fresh produce (e.g. Tomato, Onion, Wheat)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-xs sm:text-sm rounded-full border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-agri-500 focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-stone-600 absolute left-3 top-2.5" />
            </div>
          </form>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Quick action button depending on role or public */}
            {currentUser.role === 'farmer' ? (
              <Link
                to="/farmer/listings/new"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-agri-700 hover:bg-agri-800 text-white font-medium text-xs shadow-sm transition-all hover:shadow"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List Produce</span>
              </Link>
            ) : currentUser.role === 'buyer' ? (
              <Link
                to="/buyer/demand/new"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm transition-all hover:shadow"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Demand</span>
              </Link>
            ) : null}

            {/* Direct Role Workspace Link */}
            <Link
              to={getDashboardLink()}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200/80 border border-stone-200 transition-all text-stone-800 text-xs"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-white"
              />
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="font-semibold text-stone-900 line-clamp-1">{currentUser.name}</span>
                <span className="text-[10px] text-stone-600 capitalize">{currentUser.role} portal</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-stone-600" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search produce..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-100 text-sm rounded-lg border border-stone-200"
            />
            <Search className="w-4 h-4 text-stone-600 absolute left-3 top-2.5" />
          </form>

          <div className="flex flex-col space-y-2 text-sm font-medium text-stone-700">
            <Link 
              to="/marketplace" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-stone-100"
            >
              Browse Marketplace
            </Link>
            <Link 
              to="/how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-stone-100"
            >
              How Agri Connect Works
            </Link>
            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-stone-100"
            >
              About the Initiative
            </Link>
          </div>

          <div className="pt-3 border-t border-stone-100">
            <div className="font-semibold text-xs text-stone-600 uppercase tracking-wider mb-2">Portal Navigation</div>
            <div className="grid grid-cols-2 gap-2">
              <Link 
                to="/farmer/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium"
              >
                <Tractor className="w-4 h-4" /> Farmer Portal
              </Link>
              <Link 
                to="/buyer/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 text-blue-800 text-xs font-medium"
              >
                <ShoppingBag className="w-4 h-4" /> Buyer Portal
              </Link>
              <Link 
                to="/delivery/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 text-amber-800 text-xs font-medium"
              >
                <Truck className="w-4 h-4" /> Logistics Portal
              </Link>
              <Link 
                to="/admin/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 text-purple-800 text-xs font-medium"
              >
                <ShieldCheck className="w-4 h-4" /> Admin Console
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
