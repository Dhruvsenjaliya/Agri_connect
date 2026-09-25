import React, { useState } from 'react';
import { Order, Dispute } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, UploadCloud, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onDisputeRaised?: () => void;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({
  isOpen,
  onClose,
  order,
  onDisputeRaised
}) => {
  const { raiseDispute, currentUser } = useApp();
  const [reason, setReason] = useState<Dispute['reason']>('Quality mismatch');
  const [disputedQty, setDisputedQty] = useState<number>(order.quantityOrdered * 0.1);
  const [description, setDescription] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const claimAmount = Math.round(disputedQty * order.unitPrice);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    raiseDispute({
      orderId: order.id,
      raisedByUserId: currentUser.id,
      raisedByRole: currentUser.role as 'buyer' | 'farmer',
      raisedByName: currentUser.name,
      againstUserId: currentUser.role === 'buyer' ? order.farmerId : order.buyerId,
      againstRole: currentUser.role === 'buyer' ? 'farmer' : 'buyer',
      againstName: currentUser.role === 'buyer' ? order.farmerName : order.buyerName,
      reason,
      description: description || `Dispute raised regarding ${reason} on ${order.product}.`,
      orderedQty: order.quantityOrdered,
      receivedQty: Math.max(0, order.quantityOrdered - disputedQty),
      disputedQty,
      unit: order.unit,
      claimAmount,
      evidence: [
        {
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80',
          name: 'inspection_evidence_photo.jpg'
        },
        {
          type: 'weight_slip',
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=80',
          name: 'weighment_scale_slip.pdf'
        }
      ]
    });

    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      if (onDisputeRaised) onDisputeRaised();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-rose-950 to-rose-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-rose-300" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Raise Official Dispute</h3>
              <p className="text-[11px] text-rose-200">Order #{order.id} • Fair Platform Arbitration</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-rose-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-stone-900">Dispute Docket Lodged!</h4>
            <p className="text-xs text-stone-600 max-w-xs mx-auto">
              Escrow payout is held securely while platform operations staff review evidence and arbitrate fair resolution.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
            
            {/* Reason Selector */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Dispute Reason *
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
              >
                <option value="Quality mismatch">Quality mismatch (Grade/Brix/Size variance)</option>
                <option value="Quantity mismatch">Quantity mismatch (Shortage during weighment)</option>
                <option value="Damaged goods">Damaged goods (Transit crushing/bruising)</option>
                <option value="Spoiled goods">Spoiled / Rotting goods</option>
                <option value="Late delivery">Late delivery / Shelf-life degradation</option>
                <option value="Wrong product">Wrong product / Variety delivered</option>
                <option value="Non-receipt">Non-receipt of shipment</option>
                <option value="Other">Other commercial issue</option>
              </select>
            </div>

            {/* Disputed Quantity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Disputed Quantity ({order.unit}) *
                </label>
                <input
                  type="number"
                  min="1"
                  max={order.quantityOrdered}
                  value={disputedQty}
                  onChange={(e) => setDisputedQty(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Estimated Claim Value
                </label>
                <div className="px-3.5 py-2 bg-rose-50 border border-rose-200 rounded-xl text-sm font-bold text-rose-900">
                  ₹{claimAmount.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Detailed Description & Inspection Notes *
              </label>
              <textarea
                rows={3}
                placeholder="Describe condition upon arrival, crate numbers, inspection temperature, weighment findings..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>

            {/* Evidence Upload Simulator */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Attach Evidence (Photos, Weighment Slips, Video)
              </label>
              <div className="border-2 border-dashed border-stone-300 hover:border-rose-400 p-4 rounded-2xl bg-stone-50 text-center space-y-1 cursor-pointer transition-colors">
                <UploadCloud className="w-6 h-6 text-stone-400 mx-auto" />
                <span className="text-xs font-semibold text-stone-700 block">Click or Drag & Drop Evidence Files</span>
                <span className="text-[10px] text-stone-500 block">Mock files: crate_damage_photo.jpg, weighment_scale.pdf attached by default</span>
              </div>
            </div>

            {/* Info notice */}
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-950 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <div>
                Dispute tickets are arbitrated by the Agri Connect Operations Team within 2-4 hours. Valid resolutions include Partial Refund, Replacement, or Settlement Adjustment.
              </div>
            </div>

            {/* Footer */}
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
                className="px-6 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-extrabold text-xs shadow-md transition-all"
              >
                Submit Dispute to Admin
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
