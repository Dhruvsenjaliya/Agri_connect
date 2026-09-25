import React, { useState } from 'react';
import { Order } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, KeyRound, Truck, CheckCircle2, ShieldCheck, Scale, ArrowRight } from 'lucide-react';

interface HandoverOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  mode: 'pickup' | 'delivery';
  onSuccess?: () => void;
}

export const HandoverOtpModal: React.FC<HandoverOtpModalProps> = ({
  isOpen,
  onClose,
  order,
  mode,
  onSuccess
}) => {
  const { completeHandover, completeDelivery } = useApp();
  const [otp, setOtp] = useState(mode === 'pickup' ? (order.pickupOtp || '7412') : (order.deliveryOtp || '8953'));
  const [confirmedWeight, setConfirmedWeight] = useState(order.quantityOrdered);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'pickup') {
      const ok = completeHandover(order.id, confirmedWeight, otp);
      if (ok) {
        onClose();
        if (onSuccess) onSuccess();
      } else {
        setError('Invalid Pickup OTP. Please enter the OTP provided by the driver or farmer.');
      }
    } else {
      const ok = completeDelivery(order.id, notes, otp);
      if (ok) {
        onClose();
        if (onSuccess) onSuccess();
      } else {
        setError('Invalid Delivery OTP. Please enter the OTP received by the buyer.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950 to-amber-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {mode === 'pickup' ? 'Farm Gate Handover OTP' : 'Delivery Sign-off OTP'}
              </h3>
              <p className="text-[11px] text-amber-200">
                Secure 2-Factor Chain of Custody Verification
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-amber-200 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-xs space-y-1">
            <div className="flex justify-between font-semibold text-stone-900">
              <span>Order Reference:</span>
              <span className="font-mono text-amber-900">#{order.id}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Commodity & Qty:</span>
              <span className="font-medium">{order.quantityOrdered} {order.unit} {order.product}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Expected OTP:</span>
              <span className="font-bold text-stone-900 bg-amber-100 px-1.5 py-0.5 rounded">
                {mode === 'pickup' ? order.pickupOtp : order.deliveryOtp}
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* OTP Input */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Enter 4-Digit {mode === 'pickup' ? 'Pickup' : 'Delivery'} OTP *
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-lg font-mono font-bold tracking-widest text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500 text-center"
                required
              />
              <KeyRound className="w-5 h-5 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          {mode === 'pickup' && (
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Confirmed Weighed Quantity ({order.unit}) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={confirmedWeight}
                  onChange={(e) => setConfirmedWeight(parseInt(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white"
                  required
                />
                <Scale className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          {mode === 'delivery' && (
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Driver Delivery Remarks
              </label>
              <input
                type="text"
                placeholder="e.g. Unloaded 40 crates at bay 2 in clean condition"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white"
              />
            </div>
          )}

          <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              OTP confirmation creates an immutable chain-of-custody entry in platform audit logs.
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-200 text-xs font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Verify OTP & Proceed</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
