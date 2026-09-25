import React, { useState } from 'react';
import { Order } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, CheckSquare, AlertTriangle, Scale, ShieldCheck, FileCheck, ArrowRight } from 'lucide-react';

interface DeliveryInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onCompleted?: () => void;
}

export const DeliveryInspectionModal: React.FC<DeliveryInspectionModalProps> = ({
  isOpen,
  onClose,
  order,
  onCompleted
}) => {
  const { confirmReceipt } = useApp();
  const [receivedQty, setReceivedQty] = useState<number>(order.quantityOrdered);
  const [qualityOutcome, setQualityOutcome] = useState<'Accepted' | 'Partially Accepted' | 'Rejected' | 'Disputed'>('Accepted');
  const [notes, setNotes] = useState<string>('Produce inspected at receiving dock. Quality and weight verified.');

  if (!isOpen) return null;

  const discrepancy = order.quantityOrdered - receivedQty;
  const isDiscrepant = discrepancy > 0 || qualityOutcome !== 'Accepted';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confirmReceipt(order.id, receivedQty, isDiscrepant ? (receivedQty > 0 ? 'Partially Accepted' : 'Rejected') : 'Accepted', notes);
    onClose();
    if (onCompleted) onCompleted();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-950 to-blue-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Inward Inspection & Receiving</h3>
              <p className="text-[11px] text-blue-200">Order #{order.id} • Quality & Weight Confirmation</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-blue-200 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          
          {/* Produce Specs */}
          <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-xs space-y-1">
            <div className="flex justify-between font-semibold text-stone-900">
              <span>Commodity:</span>
              <span className="text-blue-900 font-bold">{order.product} (Grade {order.grade})</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Contracted Ordered Quantity:</span>
              <span className="font-bold text-stone-900">{order.quantityOrdered} {order.unit}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Agreed Unit Price:</span>
              <span>₹{order.unitPrice}/{order.unit}</span>
            </div>
          </div>

          {/* Quantity Received Input */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Verified Weight / Quantity Accepted ({order.unit}) *
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max={order.quantityOrdered}
                value={receivedQty}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setReceivedQty(val);
                  if (val < order.quantityOrdered) {
                    setQualityOutcome('Partially Accepted');
                    setNotes(`Received ${val} ${order.unit}. Shortage/damage of ${order.quantityOrdered - val} ${order.unit} reported during warehouse weighment.`);
                  } else {
                    setQualityOutcome('Accepted');
                    setNotes('Produce inspected at receiving dock. 100% verified.');
                  }
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-base font-bold text-stone-900 focus:bg-white focus:ring-2 focus:ring-blue-500"
                required
              />
              <Scale className="w-5 h-5 text-stone-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Discrepancy Alert */}
          {discrepancy > 0 && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs space-y-1 text-amber-950">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Quantity Discrepancy Detected ({discrepancy} {order.unit} shortage/damage)</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-snug">
                The platform will automatically deduct ₹{(discrepancy * order.unitPrice).toLocaleString()} from the settlement and create an auditable adjustment/refund ticket for admin mediation.
              </p>
            </div>
          )}

          {/* Quality Outcome Radios */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Inspection Outcome
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className={`p-2.5 rounded-xl border cursor-pointer font-semibold flex items-center justify-between ${qualityOutcome === 'Accepted' ? 'border-emerald-500 bg-emerald-50 text-emerald-950' : 'border-stone-200 text-stone-700 hover:bg-stone-50'}`}>
                <span>✓ Fully Accepted</span>
                <input
                  type="radio"
                  name="outcome"
                  checked={qualityOutcome === 'Accepted'}
                  onChange={() => {
                    setQualityOutcome('Accepted');
                    setReceivedQty(order.quantityOrdered);
                  }}
                  className="text-emerald-600"
                />
              </label>

              <label className={`p-2.5 rounded-xl border cursor-pointer font-semibold flex items-center justify-between ${qualityOutcome === 'Partially Accepted' ? 'border-amber-500 bg-amber-50 text-amber-950' : 'border-stone-200 text-stone-700 hover:bg-stone-50'}`}>
                <span>⚠️ Partial Accept</span>
                <input
                  type="radio"
                  name="outcome"
                  checked={qualityOutcome === 'Partially Accepted'}
                  onChange={() => {
                    setQualityOutcome('Partially Accepted');
                    setReceivedQty(Math.floor(order.quantityOrdered * 0.95)); // demo default 95%
                  }}
                  className="text-amber-600"
                />
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Dock Inspector Remarks & Evidence Note
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Settlement Safety rule */}
          <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              Confirming receipt finalizes fulfillment and releases the eligible net payout to farmer Rajesh Patil.
            </div>
          </div>

          {/* Footer Submit */}
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
              className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Confirm Inward & Sign Off</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
