import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProduceListing } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Package, 
  PlusCircle, 
  Search, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Trash2, 
  Eye, 
  Edit3, 
  AlertCircle, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FarmerListings: React.FC = () => {
  const { listings, updateListingStatus, currentUser } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const myListings = listings.filter((item) => {
    if (filterStatus !== 'All' && item.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.product.toLowerCase().includes(q) || item.variety.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-stone-900">My Produce Listings</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage your crop inventory, availability dates, and farm gate pricing.
          </p>
        </div>

        <Link
          to="/farmer/listings/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-bold text-xs shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Add New Produce Listing</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search crop or variety..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 text-xs rounded-xl border border-stone-300 focus:bg-white"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'active', 'under_review', 'sold_out', 'expired'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filterStatus === st ? 'bg-agri-800 text-white shadow-xs' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st === 'All' ? 'All Listings' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myListings.map((item) => {
          const stockPercentage = Math.round((item.availableQuantity / item.initialQuantity) * 100);
          return (
            <div key={item.id} className="bg-white rounded-3xl border border-stone-200 shadow-xs hover:shadow-lg transition-all p-5 flex flex-col justify-between space-y-4">
              
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={item.grade} type="grade" />
                    <span className="text-xs text-stone-500 font-medium">{item.category}</span>
                  </div>
                  <StatusBadge status={item.status} type="listing" />
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-display font-bold text-lg text-stone-900">{item.product}</h3>
                    <p className="text-xs text-stone-500 truncate">{item.variety}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-base text-agri-950">₹{item.price}/{item.unit}</div>
                    <span className="text-[10px] text-stone-400 capitalize">{item.priceType}</span>
                  </div>
                </div>

                {/* Stock Meter */}
                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 space-y-1.5 text-xs">
                  <div className="flex justify-between font-semibold text-stone-700">
                    <span>Available Inventory:</span>
                    <span className="text-stone-900 font-bold">{item.availableQuantity} / {item.initialQuantity} {item.unit}</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        stockPercentage > 40 ? 'bg-emerald-500' : (stockPercentage > 15 ? 'bg-amber-500' : 'bg-rose-500')
                      }`}
                      style={{ width: `${stockPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-stone-500">
                    <span>MOQ: {item.moq} {item.unit}</span>
                    <span>Status: {item.quantityStatus}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-stone-600">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span className="truncate">{item.pickupArea}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>Harvest: {item.harvestDate} (Window: {item.availableTimeWindow})</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => {
                    const newStatus = item.status === 'active' ? 'suspended' : 'active';
                    updateListingStatus(item.id, newStatus);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                    item.status === 'active' ? 'bg-amber-50 text-amber-800 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  {item.status === 'active' ? 'Pause Listing' : 'Activate'}
                </button>

                <Link
                  to={`/buyer/product/${item.id}`}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Public View</span>
                </Link>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
