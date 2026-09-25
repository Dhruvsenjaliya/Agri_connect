import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { OrderTimeline } from '../../components/common/OrderTimeline';
import { ShoppingBag, Search, Eye, Filter, Lock } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.farmerName.toLowerCase().includes(q) ||
        o.buyerName.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q) ||
        o.pickupAddress.toLowerCase().includes(q) ||
        o.deliveryAddress.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Master Orders & Multi-Corridor Timeline</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Full visibility into order lifecycle, locked commercial snapshots, escrow deposits, and fulfillment checkpoints.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <input
            type="text"
            placeholder="Search by Order ID, farmer, buyer, product, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 text-xs rounded-xl border border-stone-300 focus:bg-white"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-800"
        >
          <option value="All">All Order States</option>
          <option value="Payment Pending">Payment Pending</option>
          <option value="Pickup Scheduled">Pickup Scheduled</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Received">Received</option>
          <option value="Completed">Completed</option>
          <option value="Disputed">Disputed</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* Master Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5 pl-5">Order ID</th>
                <th className="p-3.5">Farmer & Origin</th>
                <th className="p-3.5">Buyer & Destination</th>
                <th className="p-3.5">Produce & Volume</th>
                <th className="p-3.5">Escrow Total</th>
                <th className="p-3.5">Farmer Net</th>
                <th className="p-3.5">Lifecycle Status</th>
                <th className="p-3.5 pr-5 text-right">Audit Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-stone-50/80">
                  <td className="p-3.5 pl-5 font-mono font-bold text-stone-800">#{o.id}</td>
                  <td className="p-3.5 font-medium text-stone-900">
                    {o.farmerName}
                    <span className="text-stone-400 block text-[10px] truncate max-w-[120px]">{o.pickupAddress}</span>
                  </td>
                  <td className="p-3.5 font-medium text-stone-900">
                    {o.buyerName}
                    <span className="text-stone-400 block text-[10px] truncate max-w-[120px]">{o.deliveryAddress}</span>
                  </td>
                  <td className="p-3.5 font-bold text-stone-900">{o.quantityOrdered} {o.unit} {o.product}</td>
                  <td className="p-3.5 font-bold text-blue-900">₹{o.totalAmount.toLocaleString()}</td>
                  <td className="p-3.5 font-bold text-emerald-800">₹{o.farmerNetPayout.toLocaleString()}</td>
                  <td className="p-3.5">
                    <StatusBadge status={o.status} type="order" />
                  </td>
                  <td className="p-3.5 pr-5 text-right">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-[11px] flex items-center gap-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Timeline</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timeline Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-display font-bold text-lg text-stone-900">Master Order Timeline (#{selectedOrder.id})</h3>
                <p className="text-xs text-stone-500">Commercial Snapshot & Chain of Custody</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-stone-400 font-bold">✕</button>
            </div>

            <OrderTimeline order={selectedOrder} />

            <div className="p-3.5 bg-stone-50 rounded-2xl border text-xs space-y-1">
              <div className="flex justify-between font-bold text-stone-800">
                <span>Escrow Payment Method:</span>
                <span>{selectedOrder.paymentMethod || 'Simulated UPI'} ({selectedOrder.paymentId || 'Pending'})</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Logistics Assigned:</span>
                <span>{selectedOrder.deliveryPartnerName || selectedOrder.fulfillmentType}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Pickup OTP: <strong className="font-mono">{selectedOrder.pickupOtp}</strong></span>
                <span>Delivery OTP: <strong className="font-mono">{selectedOrder.deliveryOtp}</strong></span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 rounded-xl bg-stone-100 text-stone-800 font-bold text-xs"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
