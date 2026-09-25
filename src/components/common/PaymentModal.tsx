import React, { useState } from 'react';
import { Order } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, CreditCard, CheckCircle2, Lock, Sparkles, Building2, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onSuccess?: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  order,
  onSuccess
}) => {
  const { simulatePayment } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'Demo UPI' | 'Demo NetBanking' | 'Corporate NEFT Escrow'>('Demo UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const ok = simulatePayment(order.id, paymentMethod);
      setIsProcessing(false);
      if (ok) {
        setPaymentSuccess(true);
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {}

        setTimeout(() => {
          onClose();
          if (onSuccess) onSuccess();
        }, 1800);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-stone-900 to-agri-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Platform Escrow Checkout</h3>
              <p className="text-[11px] text-stone-300">Simulated Secure Payment Demo</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {paymentSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-stone-900">Payment Secured in Escrow!</h4>
              <p className="text-xs text-stone-600 max-w-xs mx-auto">
                ₹{order.totalAmount.toLocaleString()} has been placed into platform trust holding. Farmer payout will be released after inward inspection.
              </p>
            </div>
          ) : (
            <>
              {/* Order summary banner */}
              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-xs space-y-1">
                <div className="flex justify-between font-semibold text-stone-800">
                  <span>Order Reference:</span>
                  <span className="font-mono text-agri-800">#{order.id}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Farmer:</span>
                  <span>{order.farmerName}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Commodity:</span>
                  <span className="font-medium">{order.quantityOrdered} {order.unit} {order.product}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-b border-stone-200 py-3 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Gross Produce Value:</span>
                  <span className="font-medium text-stone-900">₹{order.grossAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Logistics & Reefer Transport:</span>
                  <span className="font-medium text-stone-900">₹{order.deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Platform Escrow & QC Fee (2%):</span>
                  <span className="font-medium text-stone-900">₹{order.platformFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Applicable Taxes:</span>
                  <span className="font-medium text-stone-900">₹0 (Exempt)</span>
                </div>
                <div className="pt-2 border-t border-stone-100 flex justify-between text-sm font-extrabold text-stone-900">
                  <span>Total Payable:</span>
                  <span className="text-agri-800 text-base">₹{order.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Select Simulated Demo Method
                </label>
                <div className="space-y-2">
                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'Demo UPI' ? 'border-agri-600 bg-emerald-50/50' : 'border-stone-200 hover:bg-stone-50'}`}>
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-agri-700" />
                      <div>
                        <div className="text-xs font-bold text-stone-900">Simulated UPI Autopay / Instant</div>
                        <div className="text-[10px] text-stone-500">GPay, PhonePe, Paytm simulation</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'Demo UPI'}
                      onChange={() => setPaymentMethod('Demo UPI')}
                      className="text-agri-600 focus:ring-agri-500"
                    />
                  </label>

                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'Demo NetBanking' ? 'border-agri-600 bg-emerald-50/50' : 'border-stone-200 hover:bg-stone-50'}`}>
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-4 h-4 text-blue-700" />
                      <div>
                        <div className="text-xs font-bold text-stone-900">Simulated NetBanking</div>
                        <div className="text-[10px] text-stone-500">HDFC, SBI, ICICI, Axis Bank</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'Demo NetBanking'}
                      onChange={() => setPaymentMethod('Demo NetBanking')}
                      className="text-agri-600 focus:ring-agri-500"
                    />
                  </label>

                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'Corporate NEFT Escrow' ? 'border-agri-600 bg-emerald-50/50' : 'border-stone-200 hover:bg-stone-50'}`}>
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-purple-700" />
                      <div>
                        <div className="text-xs font-bold text-stone-900">Corporate RTGS / NEFT Virtual Account</div>
                        <div className="text-[10px] text-stone-500">For enterprise & bulk buyers</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'Corporate NEFT Escrow'}
                      onChange={() => setPaymentMethod('Corporate NEFT Escrow')}
                      className="text-agri-600 focus:ring-agri-500"
                    />
                  </label>
                </div>
              </div>

              {/* Escrow Rule Note */}
              <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-600 flex items-start gap-2">
                <Lock className="w-4 h-4 text-agri-700 shrink-0 mt-0.5" />
                <div>
                  <strong>BRD v2.0 Safety Rule:</strong> Payment initiation holds funds in platform trust escrow. Funds are <em>not released to the farmer</em> until successful fulfillment and buyer receiving confirmation.
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3 rounded-2xl bg-agri-700 hover:bg-agri-800 disabled:bg-stone-400 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Demo Escrow Auth...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize Demo Escrow Payment (₹{order.totalAmount.toLocaleString()})</span>
                  </>
                )}
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
