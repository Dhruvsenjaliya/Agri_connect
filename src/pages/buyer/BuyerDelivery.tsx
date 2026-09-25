import React from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, MapPin, Phone, KeyRound, CheckCircle2, ShieldCheck, Thermometer } from 'lucide-react';

export const BuyerDelivery: React.FC = () => {
  const { orders } = useApp();

  const inTransitOrders = orders.filter(o => o.status === 'In Transit' || o.status === 'Pickup Scheduled' || o.status === 'Delivered');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Cold-Chain Logistics & Inward Dock</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Live transit telemetry, vehicle driver coordinates, and receiver delivery OTPs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inTransitOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-mono font-bold text-xs text-blue-900">#{order.id}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                {order.status}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-stone-900">
                {order.quantityOrdered} {order.unit} {order.product} (Grade {order.grade})
              </h3>
              <p className="text-xs text-stone-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                Destination: {order.deliveryAddress}
              </p>
            </div>

            {/* Cold Chain Sensor simulation */}
            <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-emerald-700" />
                <div>
                  <strong className="block text-emerald-950">Reefer Telemetry: 13.4°C</strong>
                  <span className="text-[10px] text-emerald-800 font-medium">Optimal vegetable preservation maintained</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-[10px]">
                Normal
              </span>
            </div>

            {/* Delivery OTP block */}
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-blue-900 font-bold uppercase block">Delivery Sign-Off OTP</span>
                <span className="font-mono text-xl font-extrabold text-blue-950 tracking-widest">{order.deliveryOtp || '8953'}</span>
                <span className="text-[10px] text-stone-500 block">Share with driver upon dock unloading</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
