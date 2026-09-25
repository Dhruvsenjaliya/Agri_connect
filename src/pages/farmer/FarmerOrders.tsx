import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { OrderTimeline } from '../../components/common/OrderTimeline';
import { HandoverOtpModal } from '../../components/common/HandoverOtpModal';
import { 
  ShoppingBag, 
  Truck, 
  KeyRound, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Building2, 
  MapPin, 
  ArrowRight,
  Eye,
  FileText
} from 'lucide-react';

export const FarmerOrders: React.FC = () => {
  const { orders, currentUser } = useApp();
  const [selectedOrderForTimeline, setSelectedOrderForTimeline] = useState<Order | null>(null);
  const [selectedOrderForHandover, setSelectedOrderForHandover] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const farmerOrders = orders.filter(o => {
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-stone-900">
            Fulfillment & Customer Orders
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track customer orders, pickup schedules, handover OTPs, and payout settlements.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Payment Pending', 'Pickup Scheduled', 'In Transit', 'Delivered', 'Completed', 'Disputed'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === st ? 'bg-agri-800 text-white shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {farmerOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-agri-800">#{order.id}</span>
                  <StatusBadge status={order.status} type="order" />
                  <span className="text-[11px] text-stone-500 font-medium">
                    Created {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-stone-900">
                  {order.quantityOrdered.toLocaleString()} {order.unit} {order.product} (Grade {order.grade})
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 text-xs text-stone-600">
                  <span className="flex items-center gap-1 font-semibold text-stone-800">
                    <Building2 className="w-3.5 h-3.5 text-stone-400" />
                    Buyer: {order.buyerName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-stone-400" />
                    Logistics: {order.deliveryPartnerName || order.fulfillmentType}
                  </span>
                </div>
              </div>

              {/* Financial Settlement Box */}
              <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 text-right shrink-0 space-y-0.5">
                <span className="text-[10px] text-emerald-800 font-semibold uppercase block">Farmer Net Realization</span>
                <div className="font-display font-extrabold text-xl text-emerald-950">
                  ₹{order.farmerNetPayout.toLocaleString()}
                </div>
                <span className="text-[10px] text-stone-500 block">
                  Gross: ₹{order.grossAmount.toLocaleString()} • Comm: ₹{order.farmerCommissionAmount}
                </span>
                <div className="pt-1">
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    order.payoutStatus === 'paid' ? 'bg-emerald-200 text-emerald-900' : (order.payoutStatus === 'eligible' ? 'bg-amber-100 text-amber-900' : 'bg-stone-200 text-stone-700')
                  }`}>
                    Payout: {order.payoutStatus.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Handover & OTP Strip */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 font-semibold block">Pickup Handover OTP</span>
                  <span className="font-mono font-extrabold text-sm text-stone-900 tracking-wider">
                    {order.pickupOtp || '----'}
                  </span>
                </div>
              </div>

              <div className="text-stone-600">
                <span className="text-stone-400">Loading Window: </span>
                <strong className="text-stone-800">{order.pickupTimeWindow}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedOrderForTimeline(order)}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-semibold text-xs transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Timeline</span>
                </button>

                {order.status === 'Pickup Scheduled' && (
                  <button
                    onClick={() => setSelectedOrderForHandover(order)}
                    className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Confirm Handover & OTP</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Timeline Modal */}
      {selectedOrderForTimeline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-display font-bold text-lg text-stone-900">Order Progress Timeline (#{selectedOrderForTimeline.id})</h3>
              <button onClick={() => setSelectedOrderForTimeline(null)} className="text-stone-400 hover:text-stone-800 text-sm font-bold">✕</button>
            </div>
            <OrderTimeline order={selectedOrderForTimeline} />
            <button
              onClick={() => setSelectedOrderForTimeline(null)}
              className="w-full py-2.5 rounded-xl bg-stone-100 text-stone-800 font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Handover OTP Modal */}
      {selectedOrderForHandover && (
        <HandoverOtpModal
          isOpen={!!selectedOrderForHandover}
          onClose={() => setSelectedOrderForHandover(null)}
          order={selectedOrderForHandover}
          mode="pickup"
        />
      )}

    </div>
  );
};
