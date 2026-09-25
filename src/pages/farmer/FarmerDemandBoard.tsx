import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BuyerDemand, MatchScore } from '../../types';
import { DemandCard } from '../../components/common/DemandCard';
import { MatchModal } from '../../components/common/MatchModal';
import { NegotiationModal } from '../../components/common/NegotiationModal';
import { 
  Target, 
  Sparkles, 
  Search, 
  Filter, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export const FarmerDemandBoard: React.FC = () => {
  const { demands, listings, calculateMatchScore, currentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDemandForMatch, setSelectedDemandForMatch] = useState<BuyerDemand | null>(null);
  const [selectedDemandForOffer, setSelectedDemandForOffer] = useState<BuyerDemand | null>(null);

  // Find farmer's primary active listing for match analysis
  const primaryListing = listings.find(l => l.farmerId === currentUser.id && l.status === 'active') || listings[0];

  const filteredDemands = demands.filter(d => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return d.product.toLowerCase().includes(q) || d.buyerName.toLowerCase().includes(q) || d.buyerLocation.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-2xl text-white">Buyer Demand Board</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-white text-xs font-bold">
              Reverse Marketplace
            </span>
          </div>
          <p className="text-xs text-blue-200 mt-1 max-w-xl">
            Supermarket chains, hotels, and bulk buyers post guaranteed requirements. Review target price bands and submit your supply offer directly.
          </p>
        </div>

        <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/20 text-xs text-blue-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-harvest-300" />
          <span>Algorithm Match Active against your {primaryListing?.product || 'Produce'}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search buyer requirements (e.g. Tomato, Onion, Mumbai)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 text-xs rounded-xl border border-stone-300 focus:bg-white"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Demands Grid with Match Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDemands.map((demand) => {
          const match = calculateMatchScore(primaryListing, demand);
          return (
            <DemandCard
              key={demand.id}
              demand={demand}
              matchScore={match.percentage}
              onViewMatches={() => setSelectedDemandForMatch(demand)}
              onSendOffer={() => setSelectedDemandForOffer(demand)}
            />
          );
        })}
      </div>

      {/* Match Breakdown Modal */}
      {selectedDemandForMatch && (
        <MatchModal
          isOpen={!!selectedDemandForMatch}
          onClose={() => setSelectedDemandForMatch(null)}
          demand={selectedDemandForMatch}
          listing={primaryListing}
          matchScore={calculateMatchScore(primaryListing, selectedDemandForMatch)}
          onProceedToOffer={() => {
            const d = selectedDemandForMatch;
            setSelectedDemandForMatch(null);
            setSelectedDemandForOffer(d);
          }}
        />
      )}

      {/* Direct Offer Modal */}
      {selectedDemandForOffer && (
        <NegotiationModal
          isOpen={!!selectedDemandForOffer}
          onClose={() => setSelectedDemandForOffer(null)}
          demand={selectedDemandForOffer}
          listing={primaryListing}
        />
      )}

    </div>
  );
};
