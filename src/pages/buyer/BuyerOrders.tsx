import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { OrderTimeline } from '../../components/common/OrderTimeline';
import { PaymentModal } from '../../components/common/PaymentModal';
import { DeliveryInspectionModal } from '../../components/common/DeliveryInspectionModal';
import { DisputeModal } from '../../components/common/DisputeModal';
import { RatingModal } from '../../components/common/RatingModal';
import { 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  FileCheck, 
  Star, 
  ShieldAlert, 
  Eye, 
  CheckCircle2, 
  Lock, 
  Tractor,
  Download
} from 'lucide-react';

export const BuyerOrders: React.FC = () => {
  const { orders } = useApp();

  const [selectedOrderForPay, setSelectedOrderForPay] = useState<Order | null>(null);
  const [selectedOrderForInspect, setSelectedOrderForInspect] = useState<Order | null>(null);
  const [selectedOrderForDispute, setSelectedOrderForDispute] = useState<Order | null>(null);
  const [selectedOrderForRating, setSelectedOrderForRating] = useState<Order | null>(null);
  const [selectedOrderForTimeline, setSelectedOrderForTimeline] = useState<Order | null>(null);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">
          Procurement Orders & Escrow Tracking
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Pay into trust escrow, track cold-chain logistics, inspect arriving produce, and sign off for settlement.
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const isPaymentPending = order.status === 'Payment Pending' || order.paymentStatus === 'pending';
          const isDeliveredForInspection = order.status === 'Delivered' || order.status === 'In Transit';
          const isEligibleForRating = (order.status === 'Completed' || order.status === 'Received') && !order.buyerRated;

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-blue-900">#{order.id}</span>
                    <StatusBadge status={order.status} type="order" />
                    <span className="text-[11px] text-stone-500 font-medium">
                      Ordered on {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-stone-900">
                    {order.quantityOrdered.toLocaleString()} {order.unit} of {order.product} (Grade {order.grade})
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 text-xs text-stone-600">
                    <span className="flex items-center gap-1 font-semibold text-stone-800">
                      <Tractor className="w-3.5 h-3.5 text-stone-400" />
                      Farmer: {order.farmerName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-stone-400" />
                      Fulfillment: {order.fulfillmentType}
                    </span>
                  </div>
                </div>

                {/* Total Escrow Box */}
                <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200 text-right shrink-0 space-y-0.5">
                  <span className="text-[10px] text-blue-900 font-semibold uppercase block">Total Payable</span>
                  <div className="font-display font-extrabold text-xl text-blue-950">
                    ₹{order.totalAmount.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-stone-500 block">
                    Produce: ₹{order.grossAmount.toLocaleString()} • Freight: ₹{order.deliveryFee}
                  </span>
                  <div className="pt-1">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      Escrow: {order.paymentStatus === 'paid' ? 'FUNDS SECURED' : 'PENDING PAYMENT'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Action Strip */}
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-stone-600">
                  <Lock className="w-4 h-4 text-agri-700" />
                  <span>
                    {order.paymentStatus === 'paid'
                      ? `Demo Escrow Ref: ${order.paymentId || 'TXN-ESCROW-8912'}`
                      : 'Please authorize escrow demo payment to release shipment.'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setSelectedOrderForTimeline(order)}
                    className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Timeline</span>
                  </button>

                  {/* 1. Pay Escrow button */}
                  {isPaymentPending && (
                    <button
                      onClick={() => setSelectedOrderForPay(order)}
                      className="px-4 py-1.5 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Complete Demo Payment (₹{order.totalAmount.toLocaleString()})</span>
                    </button>
                  )}

                  {/* 2. Inward Inspection & Receiving Confirmation */}
                  {isDeliveredForInspection && (
                    <button
                      onClick={() => setSelectedOrderForInspect(order)}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Dock Inspection & Sign-off</span>
                    </button>
                  )}

                  {/* 3. Raise Dispute option */}
                  {order.paymentStatus === 'paid' && order.status !== 'Completed' && (
                    <button
                      onClick={() => setSelectedOrderForDispute(order)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold border border-rose-200 flex items-center gap-1"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                      <span>Raise Dispute</span>
                    </button>
                  )}

                  {/* 4. Rate Transaction */}
                  {isEligibleForRating && (
                    <button
                      onClick={() => setSelectedOrderForRating(order)}
                      className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>Rate Farmer</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Payment Modal */}
      {selectedOrderForPay && (
        <PaymentModal
          isOpen={!!selectedOrderForPay}
          onClose={() => setSelectedOrderForPay(null)}
          order={selectedOrderForPay}
        />
      )}

      {/* Dock Inspection Modal */}
      {selectedOrderForInspect && (
        <DeliveryInspectionModal
          isOpen={!!selectedOrderForInspect}
          onClose={() => setSelectedOrderForInspect(null)}
          order={selectedOrderForInspect}
        />
      )}

      {/* Dispute Modal */}
      {selectedOrderForDispute && (
        <DisputeModal
          isOpen={!!selectedOrderForDispute}
          onClose={() => setSelectedOrderForDispute(null)}
          order={selectedOrderForDispute}
        />
      )}

      {/* Rating Modal */}
      {selectedOrderForRating && (
        <RatingModal
          isOpen={!!selectedOrderForRating}
          onClose={() => setSelectedOrderForRating(null)}
          order={selectedOrderForRating}
        />
      )}

      {/* Timeline Modal */}
      {selectedOrderForTimeline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-display font-bold text-lg text-stone-900">Order Progress Timeline (#{selectedOrderForTimeline.id})</h3>
              <button onClick={() => setSelectedOrderForTimeline(null)} className="text-stone-400 font-bold">✕</button>
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

    </div>
  );
};
