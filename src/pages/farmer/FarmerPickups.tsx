import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HandoverOtpModal } from '../../components/common/HandoverOtpModal';
import { Truck, Calendar, KeyRound, MapPin, CheckCircle2, User, Phone } from 'lucide-react';

export const FarmerPickups: React.FC = () => {
  const { orders } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const pickupOrders = orders.filter(o => o.status === 'Pickup Scheduled' || o.status === 'Paid');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Scheduled Pickups & Logistics</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Driver arrival schedules, vehicle numbers, and farm gate handover OTP verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pickupOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-mono font-bold text-xs text-agri-800">#{order.id}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                Vehicle Assigned
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-lg text-stone-900">
                {order.quantityOrdered} {order.unit} {order.product} (Grade {order.grade})
              </h3>
              <p className="text-xs text-stone-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                Pickup: {order.pickupAddress}
              </p>
            </div>

            {/* Driver Profile */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Assigned Transporter</span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900">{order.deliveryPartnerName || 'Ganesh Shinde (AgriExpress)'}</strong>
                    <span className="text-[11px] text-stone-500">MH-15-EG-4412 (3-Ton Reefer)</span>
                  </div>
                </div>
                <a href="tel:+919765411229" className="p-2 rounded-xl bg-white border border-stone-300 text-stone-700 hover:text-agri-700">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Handover OTP block */}
            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-800 font-bold block uppercase">Farm Gate Handover OTP</span>
                <span className="font-mono text-xl font-extrabold text-amber-950 tracking-widest">{order.pickupOtp}</span>
              </div>

              <button
                onClick={() => setSelectedOrder(order)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                Confirm Handover
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <HandoverOtpModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
          mode="pickup"
        />
      )}
    </div>
  );
};
