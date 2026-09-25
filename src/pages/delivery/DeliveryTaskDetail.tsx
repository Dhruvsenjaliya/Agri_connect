import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Truck, 
  MapPin, 
  KeyRound, 
  Scale, 
  Camera, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  ArrowRight,
  UploadCloud
} from 'lucide-react';

export const DeliveryTaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { deliveryTasks, orders, completeHandover, completeDelivery } = useApp();
  const navigate = useNavigate();

  const task = deliveryTasks.find(t => t.id === id) || deliveryTasks[0];
  const order = orders.find(o => o.id === task.orderId) || orders[0];

  const [pickupOtpInput, setPickupOtpInput] = useState(order?.pickupOtp || '7412');
  const [weighedQty, setWeighedQty] = useState(task.quantity);
  const [deliveryOtpInput, setDeliveryOtpInput] = useState(order?.deliveryOtp || '8953');
  const [receiverSignNotes, setReceiverSignNotes] = useState('Unloaded at receiving bay without damage. Weighed 100% matched.');
  const [successMsg, setSuccessMsg] = useState('');

  const handleCompletePickup = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = completeHandover(order.id, weighedQty, pickupOtpInput);
    if (ok) {
      setSuccessMsg('Pickup proof recorded! Produce is now marked In Transit.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      alert('Invalid pickup OTP');
    }
  };

  const handleCompleteDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = completeDelivery(order.id, receiverSignNotes, deliveryOtpInput);
    if (ok) {
      setSuccessMsg('Delivery proof recorded! Buyer notified for inward dock inspection.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      alert('Invalid delivery OTP');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-stone-900">
            Logistics Execution & Chain of Custody
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Task #{task.id} • Linked to Commercial Order #{task.orderId}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-bold text-xs">
          Status: {task.status}
        </span>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Route & Cargo Specs */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="font-display font-bold text-sm text-stone-900 border-b pb-2">
          Cargo & Transit Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-stone-500 text-[10px] uppercase font-bold block">Commodity</span>
            <strong className="text-stone-900 text-sm">{task.product}</strong>
            <div className="text-stone-500 font-bold mt-0.5">{task.quantity} {task.unit}</div>
          </div>

          <div>
            <span className="text-stone-500 text-[10px] uppercase font-bold block">Origin (Farm Gate)</span>
            <strong className="text-stone-900 text-xs block">{task.pickupAddress}</strong>
            <div className="text-stone-500">Farmer: {task.pickupContact.name} ({task.pickupContact.phone})</div>
          </div>

          <div>
            <span className="text-stone-500 text-[10px] uppercase font-bold block">Destination</span>
            <strong className="text-stone-900 text-xs block">{task.deliveryAddress}</strong>
            <div className="text-stone-500">Inward Officer: {task.deliveryContact.name} ({task.deliveryContact.phone})</div>
          </div>
        </div>
      </div>

      {/* Step 1: Farm Gate Pickup Proof */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">1</span>
            <h3 className="font-display font-bold text-sm text-stone-900">Proof of Pickup (Farm Gate Loading)</h3>
          </div>
          {task.pickupProof?.otpVerified && (
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Completed at {task.pickupProof.timestamp}
            </span>
          )}
        </div>

        {task.pickupProof?.otpVerified ? (
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-1 text-emerald-950">
            <div className="font-bold">✓ Farmer Handover OTP Verified: {order.pickupOtp}</div>
            <div>Weighed Weight: {task.pickupProof.confirmedWeight} {task.unit} • Sign: {task.pickupProof.signature}</div>
          </div>
        ) : (
          <form onSubmit={handleCompletePickup} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Farmer Pickup OTP *
                </label>
                <input
                  type="text"
                  value={pickupOtpInput}
                  onChange={(e) => setPickupOtpInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-base font-mono font-bold text-stone-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Gross Weighed Quantity ({task.unit}) *
                </label>
                <input
                  type="number"
                  value={weighedQty}
                  onChange={(e) => setWeighedQty(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900"
                  required
                />
              </div>
            </div>

            <div className="p-3 bg-stone-50 border border-dashed border-stone-300 rounded-2xl text-center text-xs text-stone-500 cursor-pointer">
              <Camera className="w-5 h-5 text-stone-400 mx-auto mb-1" />
              <span>Capture Photo of Loaded Crate Stacks & Tarpaulin Seal (Demo Auto-Mocked)</span>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm transition-all"
            >
              Verify Pickup OTP & Begin Transit
            </button>
          </form>
        )}
      </div>

      {/* Step 2: Destination Delivery Proof */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">2</span>
            <h3 className="font-display font-bold text-sm text-stone-900">Proof of Delivery (Buyer Receiving Dock)</h3>
          </div>
          {task.deliveryProof?.otpVerified && (
            <span className="text-xs text-blue-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Completed at {task.deliveryProof.timestamp}
            </span>
          )}
        </div>

        {task.deliveryProof?.otpVerified ? (
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs space-y-1 text-blue-950">
            <div className="font-bold">✓ Buyer Delivery OTP Verified: {order.deliveryOtp}</div>
            <div>Sign-off: {task.deliveryProof.receiverSignature} • Remarks: {task.deliveryProof.notes}</div>
          </div>
        ) : (
          <form onSubmit={handleCompleteDelivery} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Buyer Delivery OTP *
                </label>
                <input
                  type="text"
                  value={deliveryOtpInput}
                  onChange={(e) => setDeliveryOtpInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-base font-mono font-bold text-stone-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Receiver Sign-off Remarks *
                </label>
                <input
                  type="text"
                  value={receiverSignNotes}
                  onChange={(e) => setReceiverSignNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                  required
                />
              </div>
            </div>

            <div className="p-3 bg-stone-50 border border-dashed border-stone-300 rounded-2xl text-center text-xs text-stone-500 cursor-pointer">
              <UploadCloud className="w-5 h-5 text-stone-400 mx-auto mb-1" />
              <span>Upload Buyer Warehouse Inward Weighment Slip (Demo Attached)</span>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs shadow-sm transition-all"
            >
              Verify Delivery OTP & Complete Handover
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
