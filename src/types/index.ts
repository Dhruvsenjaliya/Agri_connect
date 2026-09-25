export type UserRole = 
  | 'farmer'
  | 'buyer'
  | 'delivery'
  | 'admin';

export type BuyerCategory = 
  | 'Bulk Buyer'
  | 'Retail Buyer'
  | 'Restaurant'
  | 'Hotel'
  | 'Caterer'
  | 'End Consumer';

export type VerificationStatus = 
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Rejected'
  | 'Suspended'
  | 'Expired';

export type QualityGrade = 'A+' | 'A' | 'B' | 'C' | 'Organic';

export type PriceType = 'fixed' | 'negotiable' | 'buyer_offer';

export type ProductCategory = 
  | 'Vegetables'
  | 'Fruits'
  | 'Grains'
  | 'Pulses'
  | 'Spices'
  | 'Dairy'
  | 'Other Produce';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  buyerType?: BuyerCategory;
  location: string;
  district: string;
  state: string;
  verificationStatus: VerificationStatus;
  avatar: string;
  farmOrBusinessName: string;
  rating: number;
  totalRatingsCount: number;
  joinDate: string;
  status: 'active' | 'suspended' | 'pending';
  documents?: {
    idProof?: string;
    landRecordOrGst?: string;
    bankPassbook?: string;
  };
}

export interface ProduceListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerRating: number;
  location: string;
  pickupArea: string;
  product: string;
  category: ProductCategory;
  variety: string;
  initialQuantity: number;
  availableQuantity: number;
  unit: 'kg' | 'quintal' | 'ton' | 'crates' | 'boxes';
  moq: number; // Minimum order quantity
  price: number; // per unit
  priceType: PriceType;
  grade: QualityGrade;
  quantityStatus: 'Estimated' | 'Confirmed';
  harvestDate: string;
  availableDate: string;
  availableTimeWindow: string;
  deliveryPreference: 'Farmer Delivery' | 'Buyer Self Pickup' | 'Third-Party Logistics' | 'Flexible';
  status: 'active' | 'under_review' | 'expired' | 'sold_out' | 'suspended';
  images: string[];
  description: string;
  specialNotes?: string;
  createdAt: string;
}

export interface BuyerDemand {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: BuyerCategory;
  buyerLocation: string;
  product: string;
  category: ProductCategory;
  variety?: string;
  quantity: number;
  unit: 'kg' | 'quintal' | 'ton' | 'crates' | 'boxes';
  grade: QualityGrade;
  targetPriceMin: number;
  targetPriceMax: number;
  requiredDate: string;
  requiredTimeWindow: string;
  fulfillmentPreference: 'Farmer Delivery' | 'Buyer Self Pickup' | 'Third-Party Logistics';
  frequency: 'One-time' | 'Daily' | 'Weekly' | 'Bi-weekly';
  expiryDate: string;
  description: string;
  status: 'open' | 'matched' | 'partially_fulfilled' | 'fulfilled' | 'expired' | 'cancelled';
  createdAt: string;
  matchedCount?: number;
}

export interface MatchScore {
  percentage: number;
  reasons: string[];
  productMatch: boolean;
  quantityFeasible: boolean;
  locationCompatible: boolean;
  dateCompatible: boolean;
  priceCompatible: boolean;
  gradeMatch: boolean;
}

export interface Enquiry {
  id: string;
  listingId?: string;
  demandId?: string;
  buyerId: string;
  buyerName: string;
  farmerId: string;
  farmerName: string;
  product: string;
  message: string;
  requestedQuantity: number;
  unit: string;
  proposedPrice?: number;
  status: 'open' | 'replied' | 'converted_to_offer' | 'closed';
  createdAt: string;
  messages: Array<{
    senderId: string;
    senderRole: 'farmer' | 'buyer';
    senderName: string;
    text: string;
    timestamp: string;
  }>;
}

export interface Offer {
  id: string;
  listingId?: string;
  demandId?: string;
  buyerId: string;
  buyerName: string;
  farmerId: string;
  farmerName: string;
  product: string;
  quantity: number;
  unit: string;
  grade: QualityGrade;
  initialPrice: number;
  currentOfferPrice: number;
  lastActionBy: 'buyer' | 'farmer';
  negotiationHistory: Array<{
    by: 'buyer' | 'farmer';
    price: number;
    notes?: string;
    timestamp: string;
  }>;
  status: 'pending' | 'countered' | 'accepted' | 'rejected' | 'expired';
  fulfillmentType: 'Buyer Self Pickup' | 'Farmer Delivery' | 'Third-Party Delivery';
  pickupLocation: string;
  deliveryLocation: string;
  commercialSnapshot?: CommercialSnapshot;
  createdAt: string;
  updatedAt: string;
}

export interface CommercialSnapshot {
  product: string;
  quantity: number;
  unit: string;
  agreedPricePerUnit: number;
  grossProduceValue: number;
  deliveryCharge: number;
  platformFee: number;
  taxAmount: number;
  discount: number;
  finalPayableAmount: number;
  farmerPlatformCommission: number;
  farmerLogisticsDeduction: number;
  farmerEstimatedNetPayout: number;
  acceptedAt: string;
  paymentTerms: string;
}

export type OrderLifecycleState = 
  | 'Draft'
  | 'Enquiry'
  | 'Negotiation'
  | 'Confirmed'
  | 'Payment Pending'
  | 'Paid'
  | 'Pickup Scheduled'
  | 'Picked Up'
  | 'In Transit'
  | 'Delivered'
  | 'Received'
  | 'Completed'
  | 'Cancelled'
  | 'Disputed'
  | 'Refunded'
  | 'Partially Refunded';

export interface Order {
  id: string;
  offerId?: string;
  listingId?: string;
  demandId?: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  buyerType: BuyerCategory;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  product: string;
  category: ProductCategory;
  variety?: string;
  grade: QualityGrade;
  quantityOrdered: number;
  quantityReceived?: number;
  disputedQuantity?: number;
  unit: string;
  unitPrice: number;
  
  // Financials
  grossAmount: number;
  deliveryFee: number;
  platformFee: number;
  taxAmount: number;
  totalAmount: number;
  
  // Farmer Settlement
  farmerCommissionRate: number; // e.g. 0.02 for 2%
  farmerCommissionAmount: number;
  farmerLogisticsDeduction: number;
  farmerNetPayout: number;
  payoutStatus: 'unreleased' | 'eligible' | 'processing' | 'paid' | 'withheld';
  payoutDate?: string;

  // Logistics
  fulfillmentType: 'Buyer Self Pickup' | 'Farmer Delivery' | 'Third-Party Delivery';
  pickupAddress: string;
  pickupTimeWindow: string;
  deliveryAddress: string;
  pickupOtp?: string;
  deliveryOtp?: string;
  
  // States
  status: OrderLifecycleState;
  paymentStatus: 'initiated' | 'pending' | 'authorized' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
  paymentMethod?: string;
  paymentId?: string;
  
  // Dispute & Receiving
  receivingOutcome?: 'Accepted' | 'Partially Accepted' | 'Rejected' | 'Disputed';
  disputeId?: string;
  
  // Rating
  buyerRated?: boolean;
  farmerRated?: boolean;
  
  timeline: Array<{
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryTask {
  id: string;
  orderId: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  product: string;
  quantity: number;
  unit: string;
  pickupAddress: string;
  pickupContact: { name: string; phone: string };
  pickupTimeWindow: string;
  deliveryAddress: string;
  deliveryContact: { name: string; phone: string };
  status: 'Assigned' | 'En Route Pickup' | 'Picked Up' | 'In Transit' | 'Delivered' | 'Failed';
  pickupProof?: {
    otpVerified: boolean;
    photoUrl?: string;
    confirmedWeight: number;
    signature: string;
    timestamp: string;
  };
  deliveryProof?: {
    otpVerified: boolean;
    photoUrl?: string;
    receiverSignature?: string;
    timestamp: string;
    notes?: string;
  };
  specialInstructions?: string;
  createdAt: string;
}

export interface Dispute {
  id: string;
  orderId: string;
  raisedByUserId: string;
  raisedByRole: 'buyer' | 'farmer';
  raisedByName: string;
  againstUserId: string;
  againstRole: 'buyer' | 'farmer';
  againstName: string;
  reason: 
    | 'Quality mismatch'
    | 'Quantity mismatch'
    | 'Damaged goods'
    | 'Spoiled goods'
    | 'Late delivery'
    | 'Missing goods'
    | 'Wrong product'
    | 'Non-receipt'
    | 'Payment issue'
    | 'Suspected fraud'
    | 'Other';
  description: string;
  orderedQty: number;
  receivedQty: number;
  disputedQty: number;
  unit: string;
  claimAmount: number;
  evidence: Array<{
    type: 'photo' | 'document' | 'weight_slip' | 'note';
    url: string;
    name: string;
  }>;
  status: 'Open' | 'Under Investigation' | 'Evidence Requested' | 'Resolved' | 'Rejected';
  resolutionType?: 'Release payment' | 'Partial refund' | 'Full refund' | 'Replacement' | 'Re-delivery' | 'Fee reversal' | 'Account action';
  resolutionAmount?: number;
  adminNotes?: string;
  resolvedAt?: string;
  createdAt: string;
}

export interface TransactionLedger {
  id: string;
  orderId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  amount: number;
  type: 'PAYMENT_RECEIVED' | 'COMMISSION_FEE' | 'DELIVERY_PAYOUT' | 'FARMER_PAYOUT' | 'REFUND_BUYER' | 'ADJUSTMENT_CREDIT' | 'ADJUSTMENT_DEBIT';
  status: 'completed' | 'pending' | 'failed' | 'reversed';
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  referenceId: string;
  timestamp: string;
}

export interface CommissionRule {
  id: string;
  ruleName: string;
  commissionType: 'Farmer Transaction' | 'Buyer Service Fee' | 'Logistics Surcharge';
  calculationType: 'Percentage' | 'Fixed';
  rate: number; // e.g. 2 for 2% or 50 for 50 INR
  targetRole: UserRole | 'all';
  category: ProductCategory | 'All Categories';
  geography: string;
  effectiveFrom: string;
  effectiveUntil: string;
  status: 'Active' | 'Scheduled' | 'Expired' | 'Disabled';
  history: Array<{
    changedBy: string;
    changeDate: string;
    oldRate: number;
    newRate: number;
    note: string;
  }>;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  module: 'Users' | 'Verification' | 'Listings' | 'Orders' | 'Payments' | 'Refunds' | 'Payouts' | 'Disputes' | 'Commissions';
  recordId: string;
  oldValue: string;
  newValue: string;
  ipSession: string;
  status: 'Success' | 'Failed' | 'Warning';
}

export interface ReviewRating {
  id: string;
  orderId: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  overallRating: number;
  qualityRating: number;
  accuracyRating: number;
  communicationRating: number;
  fulfillmentRating: number;
  comment: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string; // or 'all'
  title: string;
  message: string;
  type: 'match' | 'enquiry' | 'offer' | 'order' | 'payment' | 'pickup' | 'delivery' | 'dispute' | 'payout' | 'verification' | 'system';
  linkUrl?: string;
  read: boolean;
  timestamp: string;
}
