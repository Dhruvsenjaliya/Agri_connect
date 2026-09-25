import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProduceListing, ProductCategory, QualityGrade } from '../../types';
import { ProductCard } from '../../components/common/ProductCard';
import { NegotiationModal } from '../../components/common/NegotiationModal';
import { EmptyState } from '../../components/common/EmptyState';
import { 
  Search, 
  Filter, 
  Sparkles, 
  MapPin, 
  SlidersHorizontal, 
  Tractor, 
  Check, 
  ChevronDown,
  Layers,
  Sprout
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export const MarketplacePage: React.FC = () => {
  const { listings, currentUser } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get('category') || 'All';
  const urlQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [searchQuery, setSearchQuery] = useState<string>(urlQuery);
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [priceTypeFilter, setPriceTypeFilter] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'quantity_high'>('recommended');

  // Quick offer modal state
  const [activeOfferListing, setActiveOfferListing] = useState<ProduceListing | null>(null);

  const categories: string[] = [
    'All',
    'Vegetables',
    'Fruits',
    'Grains',
    'Pulses',
    'Spices',
    'Dairy',
    'Other Produce'
  ];

  const locations: string[] = ['All', 'Nashik', 'Pune', 'Ahmednagar', 'Aurangabad', 'Mumbai', 'Nagpur'];
  const grades: string[] = ['All', 'A+', 'A', 'B', 'Organic'];

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Must be active
      if (item.status !== 'active') return false;

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Location filter
      if (selectedLocation !== 'All' && !item.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      // Grade filter
      if (selectedGrade !== 'All' && item.grade !== selectedGrade) {
        return false;
      }

      // Price type filter
      if (priceTypeFilter !== 'All' && item.priceType !== priceTypeFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.product.toLowerCase().includes(q);
        const matchVariety = item.variety.toLowerCase().includes(q);
        const matchFarmer = item.farmerName.toLowerCase().includes(q);
        const matchLocation = item.location.toLowerCase().includes(q);
        if (!matchName && !matchVariety && !matchFarmer && !matchLocation) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'quantity_high') return b.availableQuantity - a.availableQuantity;
      return 0; // recommended
    });
  }, [listings, selectedCategory, selectedLocation, selectedGrade, priceTypeFilter, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-agri-950 via-agri-900 to-agri-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Sprout className="w-4 h-4" />
            Verified Farm Gate Marketplace
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
            Direct Agricultural Produce Sourcing
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Browse available produce batches straight from verified farmers before dispatch. Compare grades, review harvest windows, and negotiate fair terms.
          </p>
        </div>
      </div>

      {/* Category Horizontal Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchParams(cat === 'All' ? {} : { category: cat });
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-agri-800 text-white shadow-md ring-2 ring-agri-600'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            placeholder="Search by commodity, variety, or farmer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 text-xs rounded-xl border border-stone-300 focus:bg-white focus:ring-2 focus:ring-agri-500"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Location */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-700 focus:bg-white"
          >
            <option value="All">All Locations</option>
            {locations.filter(l => l !== 'All').map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          {/* Grade */}
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-700 focus:bg-white"
          >
            <option value="All">All Grades</option>
            {grades.filter(g => g !== 'All').map(g => (
              <option key={g} value={g}>Grade {g}</option>
            ))}
          </select>

          {/* Price Type */}
          <select
            value={priceTypeFilter}
            onChange={(e) => setPriceTypeFilter(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-700 focus:bg-white"
          >
            <option value="All">All Price Types</option>
            <option value="negotiable">Negotiable</option>
            <option value="fixed">Fixed Price</option>
            <option value="buyer_offer">Buyer Offer</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-agri-950 focus:bg-white"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="quantity_high">Available Quantity: High to Low</option>
          </select>

        </div>

      </div>

      {/* Produce Grid */}
      {filteredListings.length === 0 ? (
        <EmptyState
          title="No produce listings match your criteria"
          description="Try broadening your category, location or grade filters to see available crops."
          actionText="Clear All Filters"
          onActionClick={() => {
            setSelectedCategory('All');
            setSelectedLocation('All');
            setSelectedGrade('All');
            setPriceTypeFilter('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((item) => (
            <ProductCard
              key={item.id}
              listing={item}
              onQuickOffer={(listing) => setActiveOfferListing(listing)}
            />
          ))}
        </div>
      )}

      {/* Offer Modal */}
      {activeOfferListing && (
        <NegotiationModal
          isOpen={!!activeOfferListing}
          onClose={() => setActiveOfferListing(null)}
          listing={activeOfferListing}
        />
      )}

    </div>
  );
};
