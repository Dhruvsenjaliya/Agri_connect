import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { DemandCard } from '../../components/common/DemandCard';
import { PlusCircle, Target, Sparkles } from 'lucide-react';

export const BuyerDemandList: React.FC = () => {
  const { demands, currentUser } = useApp();

  const myDemands = demands.filter(d => d.buyerId === currentUser.id || true);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-stone-900">
            My Procurement Demands
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Requirements posted for farmers to discover and submit competitive supply offers.
          </p>
        </div>

        <Link
          to="/buyer/demand/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Post New Demand</span>
        </Link>
      </div>

      {/* Demands List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myDemands.map((demand) => (
          <DemandCard key={demand.id} demand={demand} />
        ))}
      </div>

    </div>
  );
};
