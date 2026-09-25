import React, { useState } from 'react';
import { Order } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Star, Heart, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onRated?: () => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  order,
  onRated
}) => {
  const { rateOrder } = useApp();
  const [overall, setOverall] = useState(5);
  const [quality, setQuality] = useState(5);
  const [accuracy, setAccuracy] = useState(5);
  const [communication, setCommunication] = useState(5);
  const [fulfillment, setFulfillment] = useState(5);
  const [comment, setComment] = useState('Excellent fresh produce! Direct farm gate quality was superior to yard aggregators. Will order again.');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rateOrder(order.id, {
      overall,
      quality,
      accuracy,
      communication,
      fulfillment,
      comment
    });
    setSubmitted(true);
    try {
      confetti({ particleCount: 60, spread: 50 });
    } catch (e) {}

    setTimeout(() => {
      onClose();
      if (onRated) onRated();
    }, 1500);
  };

  const renderStars = (rating: number, setRating: (r: number) => void) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`p-1 transition-transform hover:scale-125 ${
            star <= rating ? 'text-amber-400' : 'text-stone-300'
          }`}
        >
          <Star className="w-5 h-5 fill-current" />
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-stone-900 to-agri-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Rate Transaction</h3>
              <p className="text-[11px] text-stone-300">Order #{order.id} • Verified Buyer Review</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-stone-900">Thank You for Rating!</h4>
            <p className="text-xs text-stone-600">
              Your feedback helps keep the Agri Connect farmer-buyer ecosystem transparent and trustworthy.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            <div className="text-center py-2 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-xs text-stone-500 font-semibold block uppercase tracking-wider">Overall Experience</span>
              <div className="flex justify-center">
                {renderStars(overall, setOverall)}
              </div>
            </div>

            {/* Criteria ratings */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-700">Product Quality & Freshness:</span>
                {renderStars(quality, setQuality)}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-700">Listing Accuracy & Sizing:</span>
                {renderStars(accuracy, setAccuracy)}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-700">Farmer Communication:</span>
                {renderStars(communication, setCommunication)}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-700">Fulfillment & Loading:</span>
                {renderStars(fulfillment, setFulfillment)}
              </div>
            </div>

            {/* Review Comment */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Your Review & Observations
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white focus:ring-2 focus:ring-agri-500"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-agri-700 hover:bg-agri-800 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Submit Verified Rating</span>
              <Sparkles className="w-4 h-4 text-harvest-300" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
