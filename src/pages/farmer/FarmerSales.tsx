import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckSquare, Star, Download, FileText, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';

export const FarmerSales: React.FC = () => {
  const { orders, ratings } = useApp();

  const completedOrders = orders.filter(o => o.status === 'Completed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Completed Sales & Tax Invoices</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          History of fulfilled contracts, buyer quality sign-offs, and ratings.
        </p>
      </div>

      <div className="space-y-4">
        {completedOrders.map((order) => {
          const rating = ratings.find(r => r.orderId === order.id);
          return (
            <div key={order.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-agri-800">#{order.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Fulfilled & Settled
                  </span>
                </div>
                <span className="text-xs text-stone-500">
                  Completed on {order.payoutDate || '23 Sep 2026'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 text-[10px] uppercase font-bold block">Commodity</span>
                  <strong className="text-stone-900 text-sm">{order.quantityOrdered} {order.unit} {order.product}</strong>
                  <div className="text-stone-500">Grade: {order.grade} • ₹{order.unitPrice}/{order.unit}</div>
                </div>

                <div>
                  <span className="text-stone-500 text-[10px] uppercase font-bold block">Buyer</span>
                  <strong className="text-stone-900 text-sm flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-stone-400" />
                    {order.buyerName}
                  </strong>
                  <div className="text-stone-500">Dock Inspection: 100% Accepted</div>
                </div>

                <div className="text-right">
                  <span className="text-stone-500 text-[10px] uppercase font-bold block">Net Realization Settled</span>
                  <strong className="text-emerald-700 text-base font-extrabold">₹{order.farmerNetPayout.toLocaleString()}</strong>
                  <div className="text-stone-400 text-[10px]">Direct NEFT to Bank Acc ****9012</div>
                </div>
              </div>

              {/* Review card if present */}
              {rating && (
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800">Buyer Review ({rating.fromUserName})</span>
                    <span className="text-amber-500 font-bold">★ {rating.overallRating}.0 / 5.0</span>
                  </div>
                  <p className="text-stone-600 italic">"{rating.comment}"</p>
                </div>
              )}

              {/* Invoice Download Simulation */}
              <div className="pt-2 border-t flex items-center justify-between text-xs">
                <span className="text-stone-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Tax Invoice & e-Way Bill Available
                </span>

                <button
                  onClick={() => alert(`Downloaded Tax Invoice & Settlement Receipt for Order #${order.id}`)}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Invoice (PDF)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
