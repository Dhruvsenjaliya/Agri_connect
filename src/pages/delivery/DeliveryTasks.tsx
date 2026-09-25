import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Truck, MapPin, ArrowRight } from 'lucide-react';

export const DeliveryTasks: React.FC = () => {
  const { deliveryTasks } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Assigned Logistics Tasks</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Agricultural cold-chain dispatch corridor schedule and dual OTP executions.
        </p>
      </div>

      <div className="space-y-4">
        {deliveryTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-mono font-bold text-xs text-purple-900">Task #{task.id} (Order #{task.orderId})</span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold">
                {task.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-stone-500 uppercase text-[10px] block">Produce Sourcing</span>
                <strong className="text-stone-900 text-sm">{task.product} — {task.quantity} {task.unit}</strong>
                <p className="text-stone-600">{task.pickupAddress}</p>
                <div className="text-stone-500">Contact: {task.pickupContact.name} ({task.pickupContact.phone})</div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-stone-500 uppercase text-[10px] block">Buyer Destination</span>
                <strong className="text-stone-900 text-sm">{task.deliveryContact.name}</strong>
                <p className="text-stone-600">{task.deliveryAddress}</p>
                <div className="text-stone-500">Contact Phone: {task.deliveryContact.phone}</div>
              </div>
            </div>

            <div className="pt-2 border-t flex items-center justify-between">
              <span className="text-xs text-stone-500">Vehicle: {task.vehicleNumber}</span>
              <Link
                to={`/delivery/task/${task.id}`}
                className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Open Task Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
