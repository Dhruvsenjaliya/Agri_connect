import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Truck, CheckCircle2, Clock, MapPin, KeyRound, ArrowRight, ShieldCheck, Thermometer } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const DeliveryDashboard: React.FC = () => {
  const { deliveryTasks, currentUser } = useApp();

  const activeTasks = deliveryTasks.filter(t => t.status !== 'Delivered');
  const completedTasks = deliveryTasks.filter(t => t.status === 'Delivered');

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white rounded-3xl p-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-2xl text-white">
              Logistics & Fleet Driver Desk
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500 text-white text-xs font-bold">
              AgriExpress
            </span>
          </div>
          <p className="text-xs text-purple-200 mt-1">
            Driver: {currentUser.name} • Vehicle: MH-15-EG-4412 (3-Ton Cold Chain Reefer)
          </p>
        </div>

        <Link
          to="/delivery/tasks"
          className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-stone-950 font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
        >
          <Truck className="w-4 h-4" />
          <span>View All Assigned Tasks ({activeTasks.length})</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-semibold block">Active Assigned Tasks</span>
          <div className="font-display font-extrabold text-3xl text-purple-950">{activeTasks.length}</div>
          <span className="text-[11px] text-purple-600 font-medium">Corridor: Nashik → Pune / Mumbai</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-semibold block">Completed Triplogs</span>
          <div className="font-display font-extrabold text-3xl text-emerald-950">{completedTasks.length + 86}</div>
          <span className="text-[11px] text-emerald-700 font-medium">100% Verified OTP Delivery Rate</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-semibold block">Reefer Container Sensor</span>
          <div className="font-display font-extrabold text-2xl text-stone-900 flex items-center gap-1">
            <Thermometer className="w-6 h-6 text-emerald-600" />
            <span>13.2°C (Optimal)</span>
          </div>
          <span className="text-[11px] text-stone-500">Perishable freshness guaranteed</span>
        </div>
      </div>

      {/* Active Tasks Feed */}
      <div className="space-y-4">
        <h2 className="font-display font-bold text-lg text-stone-900">Current Assigned Tasks</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliveryTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <span className="font-mono font-bold text-xs text-purple-900">#{task.id} (Order #{task.orderId})</span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold">
                  {task.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <h3 className="font-display font-bold text-base text-stone-900">{task.product} — {task.quantity} {task.unit}</h3>

                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">A</span>
                    <div>
                      <strong className="block text-stone-900">Pickup: {task.pickupContact.name} ({task.pickupContact.phone})</strong>
                      <span className="text-stone-500 text-[11px]">{task.pickupAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1 border-t border-stone-200/60">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">B</span>
                    <div>
                      <strong className="block text-stone-900">Delivery: {task.deliveryContact.name} ({task.deliveryContact.phone})</strong>
                      <span className="text-stone-500 text-[11px]">{task.deliveryAddress}</span>
                    </div>
                  </div>
                </div>

                {task.specialInstructions && (
                  <p className="text-stone-500 italic">"{task.specialInstructions}"</p>
                )}
              </div>

              <div className="pt-2 border-t flex items-center justify-between">
                <span className="text-[11px] text-stone-500">2-Factor OTP Required</span>

                <Link
                  to={`/delivery/task/${task.id}`}
                  className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Execute Task & Capture Proof</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
