import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, Truck, TrendingUp, Heart, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-agri-600 flex items-center justify-center text-white shadow-md">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="font-display font-extrabold text-xl text-white tracking-tight">AGRI </span>
                <span className="font-display font-bold text-xl text-agri-400 tracking-tight">CONNECT</span>
                <div className="text-[10px] text-stone-400 font-medium tracking-widest uppercase">
                  Direct • Transparent • Fair
                </div>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Helping farmers discover bulk and retail buyers before harvesting and transporting perishable produce to distant yards. Sell with confidence at fair, transparent market prices.
            </p>

            <div className="flex items-center gap-2 text-xs text-harvest-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Simulated Prototype • BRD v2.0 Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Marketplace</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link to="/marketplace?category=Vegetables" className="hover:text-agri-400 transition-colors">Vegetables</Link></li>
              <li><Link to="/marketplace?category=Fruits" className="hover:text-agri-400 transition-colors">Fruits & Orchards</Link></li>
              <li><Link to="/marketplace?category=Grains" className="hover:text-agri-400 transition-colors">Grains & Cereals</Link></li>
              <li><Link to="/marketplace?category=Pulses" className="hover:text-agri-400 transition-colors">Pulses & Legumes</Link></li>
              <li><Link to="/marketplace?category=Spices" className="hover:text-agri-400 transition-colors">Spices & Cash Crops</Link></li>
            </ul>
          </div>

          {/* User Portals */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Platform Portals</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link to="/farmer/dashboard" className="hover:text-agri-400 transition-colors">Farmer Workspace</Link></li>
              <li><Link to="/buyer/dashboard" className="hover:text-agri-400 transition-colors">Buyer Procurement Hub</Link></li>
              <li><Link to="/delivery/dashboard" className="hover:text-agri-400 transition-colors">Logistics Partner</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-agri-400 transition-colors">Operations Admin</Link></li>
              <li><Link to="/how-it-works" className="hover:text-agri-400 transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Contact / Hub */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Agri Hubs</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-agri-400 shrink-0 mt-0.5" />
                <span>Nashik, Pune, Ahmednagar, Mumbai Agri Corridors</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-agri-400 shrink-0" />
                <span>1800-AGRI-CONNECT (Demo Toll-Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-agri-400 shrink-0" />
                <span>support@agriconnect.org</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Agri Connect Digital Agriculture Marketplace. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-stone-300">About</Link>
            <span>•</span>
            <Link to="/how-it-works" className="hover:text-stone-300">Workflow</Link>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Sell Before Going to the Yard™</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
