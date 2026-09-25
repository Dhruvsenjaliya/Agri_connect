import React from 'react';
import { Order } from '../../types';
import { CheckCircle2, Clock, CircleDot, AlertCircle } from 'lucide-react';

interface OrderTimelineProps {
  order: Order;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ order }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-bold text-sm text-stone-900">Order Progress Timeline</h4>
        <span className="text-xs font-semibold text-agri-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          Current State: {order.status}
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
        {order.timeline.map((step, idx) => {
          const isDone = step.completed;
          return (
            <div key={idx} className="relative group">
              {/* Dot icon */}
              <div
                className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${
                  isDone
                    ? 'bg-agri-700 text-white'
                    : 'bg-stone-200 text-stone-400'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3 h-3" />}
              </div>

              {/* Text */}
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h5 className={`text-xs font-bold ${isDone ? 'text-stone-900' : 'text-stone-500'}`}>
                    {step.title}
                  </h5>
                  <span className="text-[10px] text-stone-400 font-mono">{step.timestamp}</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
