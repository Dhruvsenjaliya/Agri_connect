import React from 'react';
import { QualityGrade, VerificationStatus, OrderLifecycleState } from '../../types';

interface StatusBadgeProps {
  status: string | QualityGrade | VerificationStatus | OrderLifecycleState;
  type?: 'grade' | 'order' | 'verification' | 'listing' | 'demand' | 'price' | 'payout';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'order', className = '' }) => {
  let badgeStyle = 'bg-stone-100 text-stone-700 border-stone-200';

  // Grades
  if (type === 'grade' || ['A+', 'A', 'B', 'C', 'Organic'].includes(status)) {
    switch (status) {
      case 'A+':
        badgeStyle = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
        break;
      case 'A':
        badgeStyle = 'bg-green-100 text-green-800 border-green-300 font-semibold';
        break;
      case 'Organic':
        badgeStyle = 'bg-teal-100 text-teal-800 border-teal-300 font-bold';
        break;
      case 'B':
        badgeStyle = 'bg-amber-100 text-amber-800 border-amber-300';
        break;
      case 'C':
        badgeStyle = 'bg-orange-100 text-orange-800 border-orange-300';
        break;
    }
  } 
  // Verification
  else if (type === 'verification' || ['Approved', 'Under Review', 'Submitted', 'Rejected', 'Suspended'].includes(status)) {
    switch (status) {
      case 'Approved':
        badgeStyle = 'bg-emerald-100 text-emerald-800 border-emerald-300';
        break;
      case 'Under Review':
      case 'Submitted':
        badgeStyle = 'bg-amber-100 text-amber-800 border-amber-300';
        break;
      case 'Rejected':
      case 'Suspended':
        badgeStyle = 'bg-rose-100 text-rose-800 border-rose-300';
        break;
      default:
        badgeStyle = 'bg-stone-100 text-stone-700 border-stone-200';
    }
  }
  // Order States
  else {
    switch (status) {
      case 'Completed':
      case 'Delivered':
      case 'Received':
      case 'paid':
      case 'active':
      case 'open':
        badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        break;
      case 'Paid':
      case 'In Transit':
      case 'Pickup Scheduled':
      case 'Picked Up':
        badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
        break;
      case 'Payment Pending':
      case 'Negotiation':
      case 'countered':
      case 'pending':
      case 'eligible':
        badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
        break;
      case 'Disputed':
      case 'Cancelled':
      case 'Rejected':
      case 'withheld':
      case 'suspended':
      case 'sold_out':
        badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';
        break;
      case 'Partially Accepted':
      case 'Partially Refunded':
      case 'Refunded':
        badgeStyle = 'bg-purple-50 text-purple-700 border-purple-200';
        break;
      default:
        badgeStyle = 'bg-stone-100 text-stone-700 border-stone-200';
    }
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyle} ${className}`}>
      {type === 'grade' ? `Grade ${status}` : status}
    </span>
  );
};
