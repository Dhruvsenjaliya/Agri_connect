import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole,
  ProduceListing, 
  BuyerDemand, 
  Enquiry, 
  Offer, 
  Order, 
  DeliveryTask, 
  Dispute, 
  TransactionLedger, 
  CommissionRule, 
  AuditLogEntry, 
  NotificationItem,
  ReviewRating,
  MatchScore,
  CommercialSnapshot
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_LISTINGS, 
  INITIAL_DEMANDS, 
  INITIAL_OFFERS, 
  INITIAL_ORDERS, 
  INITIAL_DELIVERY_TASKS, 
  INITIAL_DISPUTES, 
  INITIAL_LEDGER, 
  INITIAL_COMMISSIONS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_ENQUIRIES,
  INITIAL_RATINGS
} from '../data/mockData';

interface AppContextType {
  // Current session
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole, userId?: string) => void;
  users: User[];
  
  // Data arrays
  listings: ProduceListing[];
  demands: BuyerDemand[];
  offers: Offer[];
  orders: Order[];
  deliveryTasks: DeliveryTask[];
  disputes: Dispute[];
  ledger: TransactionLedger[];
  commissions: CommissionRule[];
  auditLogs: AuditLogEntry[];
  notifications: NotificationItem[];
  enquiries: Enquiry[];
  ratings: ReviewRating[];
  
  // Actions
  addListing: (listing: Omit<ProduceListing, 'id' | 'createdAt' | 'status' | 'availableQuantity'>) => void;
  updateListingStatus: (id: string, status: ProduceListing['status']) => void;
  postDemand: (demand: Omit<BuyerDemand, 'id' | 'createdAt' | 'status' | 'matchedCount'>) => void;
  updateDemandStatus: (id: string, status: BuyerDemand['status']) => void;
  sendEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status' | 'messages'>, initialMessage: string) => void;
  replyEnquiry: (enquiryId: string, message: string) => void;
  
  // Negotiation & Orders
  makeOffer: (offerData: { listingId?: string; demandId?: string; farmerId: string; farmerName: string; buyerId: string; buyerName: string; product: string; quantity: number; unit: string; grade: ProduceListing['grade']; price: number; notes?: string; fulfillmentType: Offer['fulfillmentType']; pickupLocation: string; deliveryLocation: string; }) => Offer;
  counterOffer: (offerId: string, counterPrice: number, notes: string) => void;
  acceptOffer: (offerId: string) => Order;
  rejectOffer: (offerId: string) => void;
  
  // Payment & Order Progression
  simulatePayment: (orderId: string, paymentMethod: string) => boolean;
  schedulePickup: (orderId: string, pickupTime: string) => void;
  completeHandover: (orderId: string, confirmedWeight: number, otp: string) => boolean;
  completeDelivery: (orderId: string, receiverNotes: string, otp: string) => boolean;
  confirmReceipt: (orderId: string, receivedQty: number, qualityStatus: 'Accepted' | 'Partially Accepted' | 'Rejected' | 'Disputed', issueNotes?: string) => void;
  rateOrder: (orderId: string, ratings: { overall: number; quality: number; accuracy: number; communication: number; fulfillment: number; comment: string }) => void;
  
  // Disputes & Admin Actions
  raiseDispute: (disputeData: Omit<Dispute, 'id' | 'createdAt' | 'status'>) => void;
  resolveDispute: (disputeId: string, resolution: Dispute['resolutionType'], amount: number, adminNotes: string) => void;
  releasePayout: (orderId: string) => void;
  updateUserStatus: (userId: string, status: User['status'], verificationStatus?: User['verificationStatus']) => void;
  updateCommissionRule: (ruleId: string, newRate: number, note: string) => void;
  
  // Notifications & Utilities
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  calculateMatchScore: (listing: ProduceListing, demand: BuyerDemand) => MatchScore;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or fallback to defaults
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('agri_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('agri_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Farmer Rajesh Patil by default
  });

  const [listings, setListings] = useState<ProduceListing[]>(() => {
    const saved = localStorage.getItem('agri_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  const [demands, setDemands] = useState<BuyerDemand[]>(() => {
    const saved = localStorage.getItem('agri_demands');
    return saved ? JSON.parse(saved) : INITIAL_DEMANDS;
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem('agri_offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('agri_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [deliveryTasks, setDeliveryTasks] = useState<DeliveryTask[]>(() => {
    const saved = localStorage.getItem('agri_delivery_tasks');
    return saved ? JSON.parse(saved) : INITIAL_DELIVERY_TASKS;
  });

  const [disputes, setDisputes] = useState<Dispute[]>(() => {
    const saved = localStorage.getItem('agri_disputes');
    return saved ? JSON.parse(saved) : INITIAL_DISPUTES;
  });

  const [ledger, setLedger] = useState<TransactionLedger[]>(() => {
    const saved = localStorage.getItem('agri_ledger');
    return saved ? JSON.parse(saved) : INITIAL_LEDGER;
  });

  const [commissions, setCommissions] = useState<CommissionRule[]>(() => {
    const saved = localStorage.getItem('agri_commissions');
    return saved ? JSON.parse(saved) : INITIAL_COMMISSIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('agri_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('agri_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('agri_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  const [ratings, setRatings] = useState<ReviewRating[]>(() => {
    const saved = localStorage.getItem('agri_ratings');
    return saved ? JSON.parse(saved) : INITIAL_RATINGS;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('agri_users', JSON.stringify(users));
    localStorage.setItem('agri_current_user', JSON.stringify(currentUser));
    localStorage.setItem('agri_listings', JSON.stringify(listings));
    localStorage.setItem('agri_demands', JSON.stringify(demands));
    localStorage.setItem('agri_offers', JSON.stringify(offers));
    localStorage.setItem('agri_orders', JSON.stringify(orders));
    localStorage.setItem('agri_delivery_tasks', JSON.stringify(deliveryTasks));
    localStorage.setItem('agri_disputes', JSON.stringify(disputes));
    localStorage.setItem('agri_ledger', JSON.stringify(ledger));
    localStorage.setItem('agri_commissions', JSON.stringify(commissions));
    localStorage.setItem('agri_audit_logs', JSON.stringify(auditLogs));
    localStorage.setItem('agri_notifications', JSON.stringify(notifications));
    localStorage.setItem('agri_enquiries', JSON.stringify(enquiries));
    localStorage.setItem('agri_ratings', JSON.stringify(ratings));
  }, [users, currentUser, listings, demands, offers, orders, deliveryTasks, disputes, ledger, commissions, auditLogs, notifications, enquiries, ratings]);

  const addAuditLog = (action: string, module: AuditLogEntry['module'], recordId: string, oldValue: string, newValue: string) => {
    const newLog: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString(),
      adminName: currentUser.role === 'admin' ? currentUser.name : 'System / Auto-Log',
      action,
      module,
      recordId,
      oldValue,
      newValue,
      ipSession: '192.168.1.45 (Active Session)',
      status: 'Success'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addNotification = (userId: string, title: string, message: string, type: NotificationItem['type'], linkUrl?: string) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId,
      title,
      message,
      type,
      linkUrl,
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const switchRole = (role: UserRole, userId?: string) => {
    if (userId) {
      const found = users.find(u => u.id === userId);
      if (found) {
        setCurrentUser(found);
        return;
      }
    }
    const matchingUser = users.find(u => u.role === role) || users[0];
    setCurrentUser(matchingUser);
  };

  const addListing = (listingData: Omit<ProduceListing, 'id' | 'createdAt' | 'status' | 'availableQuantity'>) => {
    const newListing: ProduceListing = {
      ...listingData,
      id: `list-${Date.now().toString().slice(-4)}`,
      availableQuantity: listingData.initialQuantity,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    setListings(prev => [newListing, ...prev]);
    addAuditLog(`Produce Listing Created: ${newListing.product} (${newListing.initialQuantity} ${newListing.unit})`, 'Listings', newListing.id, 'None', 'Status: Active');
    addNotification(currentUser.id, 'Listing Published', `Your listing for ${newListing.product} is now live on the marketplace.`, 'system', '/farmer/listings');
  };

  const updateListingStatus = (id: string, status: ProduceListing['status']) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        addAuditLog(`Listing Status Changed to ${status}`, 'Listings', id, `Status: ${item.status}`, `Status: ${status}`);
        return { ...item, status };
      }
      return item;
    }));
  };

  const postDemand = (demandData: Omit<BuyerDemand, 'id' | 'createdAt' | 'status' | 'matchedCount'>) => {
    const newDemand: BuyerDemand = {
      ...demandData,
      id: `dem-${Date.now().toString().slice(-4)}`,
      status: 'open',
      matchedCount: 2,
      createdAt: new Date().toISOString()
    };
    setDemands(prev => [newDemand, ...prev]);
    addAuditLog(`Buyer Demand Posted: ${newDemand.product} (${newDemand.quantity} ${newDemand.unit})`, 'Listings', newDemand.id, 'None', 'Status: Open');
    addNotification(currentUser.id, 'Demand Posted Successfully', `Your procurement requirement for ${newDemand.product} is live for farmer matching.`, 'match', '/buyer/demand');
  };

  const updateDemandStatus = (id: string, status: BuyerDemand['status']) => {
    setDemands(prev => prev.map(d => d.id === id ? { ...d, status } : d));
  };

  const sendEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status' | 'messages'>, initialMessage: string) => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now().toString().slice(-4)}`,
      status: 'open',
      createdAt: new Date().toISOString(),
      messages: [
        {
          senderId: currentUser.id,
          senderRole: currentUser.role as 'farmer' | 'buyer',
          senderName: currentUser.name,
          text: initialMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    addNotification(enquiryData.farmerId, 'New Buyer Enquiry', `${enquiryData.buyerName} enquired about ${enquiryData.product}`, 'enquiry', '/farmer/enquiries');
  };

  const replyEnquiry = (enquiryId: string, message: string) => {
    setEnquiries(prev => prev.map(enq => {
      if (enq.id === enquiryId) {
        const updatedMessages = [
          ...enq.messages,
          {
            senderId: currentUser.id,
            senderRole: currentUser.role as 'farmer' | 'buyer',
            senderName: currentUser.name,
            text: message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
        const targetUserId = currentUser.role === 'farmer' ? enq.buyerId : enq.farmerId;
        addNotification(targetUserId, 'New Message on Enquiry', `${currentUser.name} replied to your enquiry on ${enq.product}`, 'enquiry');
        return { ...enq, status: 'replied', messages: updatedMessages };
      }
      return enq;
    }));
  };

  // Negotiation & Commercials
  const makeOffer = (offerData: {
    listingId?: string;
    demandId?: string;
    farmerId: string;
    farmerName: string;
    buyerId: string;
    buyerName: string;
    product: string;
    quantity: number;
    unit: string;
    grade: ProduceListing['grade'];
    price: number;
    notes?: string;
    fulfillmentType: Offer['fulfillmentType'];
    pickupLocation: string;
    deliveryLocation: string;
  }): Offer => {
    const grossProduceValue = offerData.quantity * offerData.price;
    const deliveryCharge = offerData.fulfillmentType === 'Third-Party Delivery' ? 1200 : (offerData.fulfillmentType === 'Farmer Delivery' ? 800 : 0);
    const platformFee = Math.round(grossProduceValue * 0.02); // 2%
    const farmerCommission = Math.round(grossProduceValue * 0.02);
    const finalPayable = grossProduceValue + deliveryCharge + platformFee;
    const netPayout = grossProduceValue - farmerCommission;

    const commercialSnapshot: CommercialSnapshot = {
      product: `${offerData.product} (Grade ${offerData.grade})`,
      quantity: offerData.quantity,
      unit: offerData.unit,
      agreedPricePerUnit: offerData.price,
      grossProduceValue,
      deliveryCharge,
      platformFee,
      taxAmount: 0,
      discount: 0,
      finalPayableAmount: finalPayable,
      farmerPlatformCommission: farmerCommission,
      farmerLogisticsDeduction: 0,
      farmerEstimatedNetPayout: netPayout,
      acceptedAt: '',
      paymentTerms: 'Platform Escrow Demo Settlement'
    };

    const newOffer: Offer = {
      id: `off-${Date.now().toString().slice(-4)}`,
      listingId: offerData.listingId,
      demandId: offerData.demandId,
      buyerId: offerData.buyerId,
      buyerName: offerData.buyerName,
      farmerId: offerData.farmerId,
      farmerName: offerData.farmerName,
      product: offerData.product,
      quantity: offerData.quantity,
      unit: offerData.unit,
      grade: offerData.grade,
      initialPrice: offerData.price,
      currentOfferPrice: offerData.price,
      lastActionBy: currentUser.role === 'farmer' ? 'farmer' : 'buyer',
      negotiationHistory: [
        {
          by: currentUser.role === 'farmer' ? 'farmer' : 'buyer',
          price: offerData.price,
          notes: offerData.notes || 'Offer submitted for negotiation.',
          timestamp: new Date().toISOString()
        }
      ],
      status: 'pending',
      fulfillmentType: offerData.fulfillmentType,
      pickupLocation: offerData.pickupLocation,
      deliveryLocation: offerData.deliveryLocation,
      commercialSnapshot,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setOffers(prev => [newOffer, ...prev]);
    const notifyTarget = currentUser.role === 'farmer' ? offerData.buyerId : offerData.farmerId;
    addNotification(notifyTarget, 'New Offer Received', `${currentUser.name} submitted an offer of ₹${offerData.price}/${offerData.unit} for ${offerData.quantity} ${offerData.unit} ${offerData.product}.`, 'offer', currentUser.role === 'farmer' ? '/buyer/offers' : '/farmer/offers');
    return newOffer;
  };

  const counterOffer = (offerId: string, counterPrice: number, notes: string) => {
    setOffers(prev => prev.map(off => {
      if (off.id === offerId) {
        const actionBy: 'farmer' | 'buyer' = currentUser.role === 'farmer' ? 'farmer' : 'buyer';
        const updatedHistory = [
          ...off.negotiationHistory,
          {
            by: actionBy,
            price: counterPrice,
            notes,
            timestamp: new Date().toISOString()
          }
        ];
        const notifyTarget = actionBy === 'farmer' ? off.buyerId : off.farmerId;
        addNotification(notifyTarget, 'Counter Offer Received', `${currentUser.name} countered with ₹${counterPrice}/${off.unit} for ${off.product}.`, 'offer', actionBy === 'farmer' ? '/buyer/offers' : '/farmer/offers');
        return {
          ...off,
          currentOfferPrice: counterPrice,
          lastActionBy: actionBy,
          status: 'countered',
          negotiationHistory: updatedHistory,
          updatedAt: new Date().toISOString()
        };
      }
      return off;
    }));
  };

  const acceptOffer = (offerId: string): Order => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer) throw new Error('Offer not found');

    // Freeze final commercial snapshot
    const gross = offer.quantity * offer.currentOfferPrice;
    const deliveryFee = offer.fulfillmentType === 'Third-Party Delivery' ? 1200 : (offer.fulfillmentType === 'Farmer Delivery' ? 800 : 0);
    const platformFee = Math.round(gross * 0.02);
    const farmerCommissionAmount = Math.round(gross * 0.02);
    const totalAmount = gross + deliveryFee + platformFee;
    const farmerNetPayout = gross - farmerCommissionAmount;

    // Check inventory reservation
    if (offer.listingId) {
      setListings(prev => prev.map(l => {
        if (l.id === offer.listingId) {
          const newQty = Math.max(0, l.availableQuantity - offer.quantity);
          const newStatus = newQty === 0 ? 'sold_out' : l.status;
          return { ...l, availableQuantity: newQty, status: newStatus };
        }
        return l;
      }));
    }

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      offerId: offer.id,
      listingId: offer.listingId,
      demandId: offer.demandId,
      buyerId: offer.buyerId,
      buyerName: offer.buyerName,
      buyerPhone: '+91 98200 99887',
      buyerType: 'Bulk Buyer',
      farmerId: offer.farmerId,
      farmerName: offer.farmerName,
      farmerPhone: '+91 98230 45678',
      product: offer.product,
      category: 'Vegetables',
      grade: offer.grade,
      quantityOrdered: offer.quantity,
      unit: offer.unit,
      unitPrice: offer.currentOfferPrice,
      grossAmount: gross,
      deliveryFee,
      platformFee,
      taxAmount: 0,
      totalAmount,
      farmerCommissionRate: 0.02,
      farmerCommissionAmount,
      farmerLogisticsDeduction: 0,
      farmerNetPayout,
      payoutStatus: 'unreleased',
      fulfillmentType: offer.fulfillmentType,
      pickupAddress: offer.pickupLocation,
      pickupTimeWindow: '07:00 AM - 11:00 AM',
      deliveryAddress: offer.deliveryLocation,
      pickupOtp: Math.floor(1000 + Math.random() * 9000).toString(),
      deliveryOtp: Math.floor(1000 + Math.random() * 9000).toString(),
      status: 'Payment Pending',
      paymentStatus: 'pending',
      timeline: [
        { title: 'Commercial Agreement Reached', description: `Terms finalized at ₹${offer.currentOfferPrice}/${offer.unit} for ${offer.quantity} ${offer.unit}. Commercial snapshot locked.`, timestamp: new Date().toLocaleString(), completed: true },
        { title: 'Payment Pending', description: 'Awaiting buyer demo escrow payment authorization.', timestamp: new Date().toLocaleString(), completed: true },
        { title: 'Pickup & Logistics', description: 'Logistics partner will be assigned upon payment.', timestamp: 'Pending', completed: false },
        { title: 'Delivery & Inspection', description: 'Inspection upon delivery at buyer location.', timestamp: 'Pending', completed: false },
        { title: 'Settlement & Farmer Payout', description: 'Payout release upon acceptance.', timestamp: 'Pending', completed: false }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'accepted', updatedAt: new Date().toISOString() } : o));

    addAuditLog(`Commercial Snapshot Locked & Order Created: #${newOrder.id}`, 'Orders', newOrder.id, 'Offer: Accepted', `Order State: Payment Pending (Total: ₹${totalAmount})`);
    addNotification(offer.farmerId, 'Offer Accepted & Order Created!', `Order #${newOrder.id} for ${newOrder.quantityOrdered} ${newOrder.unit} ${newOrder.product} is confirmed. Awaiting payment.`, 'order', '/farmer/orders');
    addNotification(offer.buyerId, 'Offer Accepted - Please Complete Payment', `Order #${newOrder.id} created. Please complete demo payment of ₹${totalAmount} to proceed.`, 'payment', '/buyer/orders');

    return newOrder;
  };

  const rejectOffer = (offerId: string) => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'rejected', updatedAt: new Date().toISOString() } : o));
  };

  const simulatePayment = (orderId: string, paymentMethod: string): boolean => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return false;

    // Idempotency check: don't double charge or duplicate ledger entries
    if (order.paymentStatus === 'paid') return true;

    const paymentTxnId = `TXN-ESCROW-${Math.floor(10000 + Math.random() * 90000)}`;

    // Update order
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const updatedTimeline = o.timeline.map(t => {
          if (t.title === 'Payment Pending') return { ...t, title: 'Payment Secured in Escrow', description: `₹${o.totalAmount} secured via ${paymentMethod} (Ref: ${paymentTxnId})`, completed: true };
          if (t.title === 'Pickup & Logistics') return { ...t, description: 'Logistics partner assigned. Pickup scheduled.' };
          return t;
        });

        return {
          ...o,
          status: 'Pickup Scheduled',
          paymentStatus: 'paid',
          paymentMethod,
          paymentId: paymentTxnId,
          deliveryPartnerId: 'delivery-1',
          deliveryPartnerName: 'Ganesh Shinde (AgriExpress)',
          timeline: updatedTimeline,
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    }));

    // Record ledger transaction
    const newLedger: TransactionLedger = {
      id: `LEDGER-${Date.now().toString().slice(-4)}`,
      orderId: order.id,
      userId: order.buyerId,
      userName: order.buyerName,
      userRole: 'buyer',
      amount: order.totalAmount,
      type: 'PAYMENT_RECEIVED',
      status: 'completed',
      balanceBefore: 99896,
      balanceAfter: 99896 + order.totalAmount,
      description: `Simulated Demo Escrow Payment received for Order #${order.id}`,
      referenceId: paymentTxnId,
      timestamp: new Date().toLocaleString()
    };
    setLedger(prev => [newLedger, ...prev]);

    // Create delivery task for delivery partner
    const newTask: DeliveryTask = {
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      orderId: order.id,
      driverId: 'delivery-1',
      driverName: 'Ganesh Shinde',
      driverPhone: '+91 97654 11229',
      vehicleNumber: 'MH-15-EG-4412',
      product: `${order.product} (Grade ${order.grade})`,
      quantity: order.quantityOrdered,
      unit: order.unit,
      pickupAddress: order.pickupAddress,
      pickupContact: { name: order.farmerName, phone: order.farmerPhone },
      pickupTimeWindow: order.pickupTimeWindow,
      deliveryAddress: order.deliveryAddress,
      deliveryContact: { name: order.buyerName, phone: order.buyerPhone },
      status: 'Assigned',
      createdAt: new Date().toISOString()
    };
    setDeliveryTasks(prev => [newTask, ...prev]);

    addAuditLog(`Payment Secured in Demo Escrow: Order #${order.id}`, 'Payments', order.id, 'Status: Payment Pending', `Status: Paid (Held: ₹${order.totalAmount})`);
    addNotification(order.farmerId, 'Payment Received in Escrow', `Buyer has paid for Order #${order.id}. Logistics partner will arrive for pickup. OTP: ${order.pickupOtp}`, 'payment', '/farmer/orders');
    addNotification('delivery-1', 'New Delivery Task Assigned', `Task #${newTask.id} for ${order.product} from ${order.farmerName} to ${order.buyerName}`, 'pickup', '/delivery/tasks');

    return true;
  };

  const schedulePickup = (orderId: string, pickupTime: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, pickupTimeWindow: pickupTime, status: 'Pickup Scheduled' } : o));
  };

  const completeHandover = (orderId: string, confirmedWeight: number, otp: string): boolean => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return false;

    // Check OTP or allow demo pass
    if (order.pickupOtp && otp !== order.pickupOtp && otp !== '1234') {
      return false;
    }

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const updatedTimeline = o.timeline.map(t => {
          if (t.title.includes('Pickup')) {
            return {
              ...t,
              title: 'Produce Picked Up & In Transit',
              description: `Loaded at farm gate. Weighed ${confirmedWeight} ${o.unit}. OTP verified.`,
              completed: true,
              timestamp: new Date().toLocaleString()
            };
          }
          return t;
        });

        return {
          ...o,
          status: 'In Transit',
          timeline: updatedTimeline,
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    }));

    // Update Delivery task
    setDeliveryTasks(prev => prev.map(t => {
      if (t.orderId === orderId) {
        return {
          ...t,
          status: 'In Transit',
          pickupProof: {
            otpVerified: true,
            confirmedWeight,
            signature: `${order.farmerName} (Verified)`,
            timestamp: new Date().toLocaleString()
          }
        };
      }
      return t;
    }));

    addAuditLog(`Produce Handover Confirmed: Order #${order.id}`, 'Orders', order.id, 'Status: Pickup Scheduled', `Status: In Transit (Weighed: ${confirmedWeight} ${order.unit})`);
    addNotification(order.buyerId, 'Produce Picked Up & In Transit', `Your order #${order.id} has left the farm and is on the way. Delivery OTP: ${order.deliveryOtp}`, 'delivery', '/buyer/orders');
    return true;
  };

  const completeDelivery = (orderId: string, receiverNotes: string, otp: string): boolean => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return false;

    if (order.deliveryOtp && otp !== order.deliveryOtp && otp !== '1234') {
      return false;
    }

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const updatedTimeline = o.timeline.map(t => {
          if (t.title.includes('Delivery')) {
            return {
              ...t,
              title: 'Produce Delivered at Destination',
              description: `Unloaded at destination. Delivery OTP confirmed. Notes: ${receiverNotes || 'Normal delivery'}.`,
              completed: true,
              timestamp: new Date().toLocaleString()
            };
          }
          return t;
        });

        return {
          ...o,
          status: 'Delivered',
          timeline: updatedTimeline,
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    }));

    setDeliveryTasks(prev => prev.map(t => {
      if (t.orderId === orderId) {
        return {
          ...t,
          status: 'Delivered',
          deliveryProof: {
            otpVerified: true,
            receiverSignature: `${order.buyerName} (Delivery Confirmed)`,
            timestamp: new Date().toLocaleString(),
            notes: receiverNotes
          }
        };
      }
      return t;
    }));

    addAuditLog(`Delivery Completed: Order #${order.id}`, 'Orders', order.id, 'Status: In Transit', 'Status: Delivered');
    addNotification(order.buyerId, 'Produce Delivered! Please Inspect & Confirm', `Order #${order.id} has arrived. Please confirm quality and quantity received.`, 'delivery', '/buyer/orders');
    addNotification(order.farmerId, 'Produce Delivered to Buyer', `Order #${order.id} has reached buyer location. Awaiting buyer inward inspection.`, 'delivery', '/farmer/orders');
    return true;
  };

  const confirmReceipt = (
    orderId: string, 
    receivedQty: number, 
    qualityStatus: 'Accepted' | 'Partially Accepted' | 'Rejected' | 'Disputed', 
    issueNotes?: string
  ) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const discrepancy = order.quantityOrdered - receivedQty;

    if (qualityStatus === 'Accepted') {
      setOrders(prev => prev.map(o => {
        if (o.id === orderId) {
          const updatedTimeline = o.timeline.map(t => {
            if (t.title.includes('Settlement')) {
              return {
                ...t,
                title: 'Settlement & Farmer Payout Eligible',
                description: `Buyer accepted 100% quantity (${receivedQty} ${o.unit}). Farmer Net Payout ₹${o.farmerNetPayout.toLocaleString()} marked eligible.`,
                completed: true,
                timestamp: new Date().toLocaleString()
              };
            }
            return t;
          });

          return {
            ...o,
            quantityReceived: receivedQty,
            receivingOutcome: 'Accepted',
            status: 'Completed',
            payoutStatus: 'eligible',
            timeline: updatedTimeline,
            updatedAt: new Date().toISOString()
          };
        }
        return o;
      }));

      addAuditLog(`Order Received & Accepted 100%: #${order.id}`, 'Orders', order.id, 'Status: Delivered', 'Status: Completed / Payout Eligible');
      addNotification(order.farmerId, 'Buyer Accepted Produce! Payout Eligible', `Full receipt confirmed for Order #${order.id}. ₹${order.farmerNetPayout} is now eligible for release.`, 'payout', '/farmer/earnings');
    } else {
      // Partially accepted or disputed
      const disputeId = `disp-${Date.now().toString().slice(-4)}`;
      const claimAmount = Math.round(discrepancy * order.unitPrice);

      const newDispute: Dispute = {
        id: disputeId,
        orderId: order.id,
        raisedByUserId: order.buyerId,
        raisedByRole: 'buyer',
        raisedByName: order.buyerName,
        againstUserId: order.farmerId,
        againstRole: 'farmer',
        againstName: order.farmerName,
        reason: discrepancy > 0 ? 'Quantity mismatch' : 'Damaged goods',
        description: issueNotes || `Inward check discrepancy: Ordered ${order.quantityOrdered} ${order.unit}, accepted ${receivedQty} ${order.unit}. Disputed ${discrepancy} ${order.unit}.`,
        orderedQty: order.quantityOrdered,
        receivedQty,
        disputedQty: discrepancy,
        unit: order.unit,
        claimAmount,
        evidence: [
          {
            type: 'weight_slip',
            url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=80',
            name: 'receiving_inspection_report.pdf'
          }
        ],
        status: 'Open',
        createdAt: new Date().toISOString()
      };

      setDisputes(prev => [newDispute, ...prev]);

      setOrders(prev => prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            quantityReceived: receivedQty,
            disputedQuantity: discrepancy,
            receivingOutcome: qualityStatus,
            status: 'Disputed',
            disputeId,
            payoutStatus: 'withheld',
            updatedAt: new Date().toISOString()
          };
        }
        return o;
      }));

      addAuditLog(`Dispute Raised on Order #${order.id}: Claim ₹${claimAmount}`, 'Disputes', disputeId, 'Status: None', `Status: Open (${discrepancy} ${order.unit} disputed)`);
      addNotification(order.farmerId, `Dispute Raised for Order #${order.id}`, `Buyer reported discrepancy: ${discrepancy} ${order.unit} disputed. Admin mediation initiated.`, 'dispute', '/farmer/orders');
      addNotification('admin-1', `New Dispute Flagged: Order #${order.id}`, `Dispute #${disputeId} requires admin triage. Claim amount ₹${claimAmount}.`, 'dispute', '/admin/disputes');
    }
  };

  const rateOrder = (orderId: string, ratingData: { overall: number; quality: number; accuracy: number; communication: number; fulfillment: number; comment: string }) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const newRating: ReviewRating = {
      id: `rev-${Date.now().toString().slice(-4)}`,
      orderId,
      fromUserId: currentUser.id,
      fromUserName: currentUser.name,
      toUserId: currentUser.role === 'buyer' ? order.farmerId : order.buyerId,
      toUserName: currentUser.role === 'buyer' ? order.farmerName : order.buyerName,
      overallRating: ratingData.overall,
      qualityRating: ratingData.quality,
      accuracyRating: ratingData.accuracy,
      communicationRating: ratingData.communication,
      fulfillmentRating: ratingData.fulfillment,
      comment: ratingData.comment,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRatings(prev => [newRating, ...prev]);

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        if (currentUser.role === 'buyer') return { ...o, buyerRated: true };
        return { ...o, farmerRated: true };
      }
      return o;
    }));

    addNotification(newRating.toUserId, 'You received a new rating & review!', `${currentUser.name} rated you ${ratingData.overall} stars: "${ratingData.comment}"`, 'system');
  };

  const raiseDispute = (disputeData: Omit<Dispute, 'id' | 'createdAt' | 'status'>) => {
    const newDispute: Dispute = {
      ...disputeData,
      id: `disp-${Date.now().toString().slice(-4)}`,
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    setDisputes(prev => [newDispute, ...prev]);
    setOrders(prev => prev.map(o => o.id === disputeData.orderId ? { ...o, status: 'Disputed', payoutStatus: 'withheld', disputeId: newDispute.id } : o));
    addAuditLog(`Dispute Lodged: #${newDispute.id}`, 'Disputes', newDispute.id, 'None', `Reason: ${newDispute.reason}`);
    addNotification('admin-1', 'New Dispute Lodged', `Dispute #${newDispute.id} on Order #${newDispute.orderId}`, 'dispute', '/admin/disputes');
  };

  const resolveDispute = (disputeId: string, resolution: Dispute['resolutionType'], amount: number, adminNotes: string) => {
    const dispute = disputes.find(d => d.id === disputeId);
    if (!dispute) return;

    setDisputes(prev => prev.map(d => {
      if (d.id === disputeId) {
        return {
          ...d,
          status: 'Resolved',
          resolutionType: resolution,
          resolutionAmount: amount,
          adminNotes,
          resolvedAt: new Date().toISOString()
        };
      }
      return d;
    }));

    // Update the associated order & ledger
    setOrders(prev => prev.map(o => {
      if (o.id === dispute.orderId) {
        const netAfterResolution = Math.max(0, o.farmerNetPayout - (resolution === 'Partial refund' ? amount : (resolution === 'Full refund' ? o.farmerNetPayout : 0)));
        return {
          ...o,
          status: resolution === 'Full refund' ? 'Refunded' : (resolution === 'Partial refund' ? 'Partially Refunded' : 'Completed'),
          farmerNetPayout: netAfterResolution,
          payoutStatus: resolution === 'Full refund' ? 'unreleased' : 'eligible',
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    }));

    // Create adjustment ledger entry
    const adjLedger: TransactionLedger = {
      id: `LEDGER-${Date.now().toString().slice(-4)}`,
      orderId: dispute.orderId,
      userId: dispute.raisedByUserId,
      userName: dispute.raisedByName,
      userRole: dispute.raisedByRole,
      amount,
      type: resolution === 'Partial refund' || resolution === 'Full refund' ? 'REFUND_BUYER' : 'ADJUSTMENT_CREDIT',
      status: 'completed',
      balanceBefore: 99896,
      balanceAfter: 99896 - amount,
      description: `Dispute Resolution (${resolution}): ${adminNotes}`,
      referenceId: `DISP-RES-${disputeId}`,
      timestamp: new Date().toLocaleString()
    };
    setLedger(prev => [adjLedger, ...prev]);

    addAuditLog(`Dispute Resolved: #${disputeId}`, 'Disputes', disputeId, 'Status: Open', `Resolution: ${resolution} (Amount: ₹${amount})`);
    addNotification(dispute.raisedByUserId, 'Dispute Resolved by Admin', `Dispute on Order #${dispute.orderId} resolved with "${resolution}". Adjustment ₹${amount}.`, 'dispute', '/buyer/orders');
    addNotification(dispute.againstUserId, 'Dispute Resolution Completed', `Admin resolved dispute on Order #${dispute.orderId}. Payout adjusted accordingly.`, 'payout', '/farmer/earnings');
  };

  const releasePayout = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (order.payoutStatus === 'paid') return; // Idempotent

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          payoutStatus: 'paid',
          payoutDate: new Date().toLocaleString(),
          status: 'Completed',
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    }));

    // Record ledger payout
    const payoutLedger: TransactionLedger = {
      id: `LEDGER-${Date.now().toString().slice(-4)}`,
      orderId: order.id,
      userId: order.farmerId,
      userName: order.farmerName,
      userRole: 'farmer',
      amount: order.farmerNetPayout,
      type: 'FARMER_PAYOUT',
      status: 'completed',
      balanceBefore: 99896,
      balanceAfter: 99896 - order.farmerNetPayout,
      description: `Farmer Net Payout settled to registered bank account for Order #${order.id}`,
      referenceId: `PAYOUT-${order.id}-FARMER`,
      timestamp: new Date().toLocaleString()
    };
    setLedger(prev => [payoutLedger, ...prev]);

    addAuditLog(`Farmer Net Payout Released: ₹${order.farmerNetPayout.toLocaleString()}`, 'Payouts', order.id, 'PayoutStatus: Eligible', 'PayoutStatus: Paid');
    addNotification(order.farmerId, 'Payout Credited to Your Bank Account! 💰', `₹${order.farmerNetPayout.toLocaleString()} has been transferred to your registered bank account for Order #${order.id}.`, 'payout', '/farmer/earnings');
  };

  const updateUserStatus = (userId: string, status: User['status'], verificationStatus?: User['verificationStatus']) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = {
          ...u,
          status,
          verificationStatus: verificationStatus || u.verificationStatus
        };
        addAuditLog(`User Verification/Status Updated: ${u.name}`, 'Verification', userId, `Status: ${u.status}, KYC: ${u.verificationStatus}`, `Status: ${updated.status}, KYC: ${updated.verificationStatus}`);
        return updated;
      }
      return u;
    }));
  };

  const updateCommissionRule = (ruleId: string, newRate: number, note: string) => {
    setCommissions(prev => prev.map(r => {
      if (r.id === ruleId) {
        const historyEntry = {
          changedBy: currentUser.name,
          changeDate: new Date().toISOString().split('T')[0],
          oldRate: r.rate,
          newRate,
          note
        };
        addAuditLog(`Commission Rate Changed: ${r.ruleName}`, 'Commissions', ruleId, `Rate: ${r.rate}%`, `Rate: ${newRate}%`);
        return {
          ...r,
          rate: newRate,
          history: [historyEntry, ...r.history]
        };
      }
      return r;
    }));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Matching Engine Algorithm
  const calculateMatchScore = (listing: ProduceListing, demand: BuyerDemand): MatchScore => {
    const reasons: string[] = [];
    let score = 0;

    // 1. Product Match (30 pts)
    const productMatch = listing.product.toLowerCase().trim() === demand.product.toLowerCase().trim();
    if (productMatch) {
      score += 30;
      reasons.push(`Exact product match: ${listing.product}`);
    }

    // 2. Location Compatibility (20 pts)
    const locationCompatible = listing.location.toLowerCase() === demand.buyerLocation.toLowerCase() ||
      ['nashik', 'pune', 'mumbai', 'ahmednagar'].includes(listing.location.toLowerCase());
    if (locationCompatible) {
      score += 20;
      reasons.push(`Feasible transit corridor (${listing.location} → ${demand.buyerLocation})`);
    }

    // 3. Quantity Feasibility (20 pts)
    const quantityFeasible = listing.availableQuantity >= demand.quantity && demand.quantity >= listing.moq;
    if (quantityFeasible) {
      score += 20;
      reasons.push(`Inventory available (${listing.availableQuantity} ${listing.unit} exceeds demand of ${demand.quantity} ${demand.unit})`);
    } else if (listing.availableQuantity > 0) {
      score += 10;
      reasons.push(`Partial inventory available (${listing.availableQuantity} / ${demand.quantity} ${demand.unit})`);
    }

    // 4. Grade Match (15 pts)
    const gradeMatch = listing.grade === demand.grade || listing.grade === 'A+';
    if (gradeMatch) {
      score += 15;
      reasons.push(`Quality grade matched (${listing.grade})`);
    }

    // 5. Price Compatibility (15 pts)
    const priceCompatible = listing.price <= demand.targetPriceMax + 2;
    if (priceCompatible) {
      score += 15;
      reasons.push(`Price compatible (₹${listing.price} vs Buyer target ₹${demand.targetPriceMin}-₹${demand.targetPriceMax})`);
    }

    const percentage = Math.min(100, Math.max(20, score));

    return {
      percentage,
      reasons,
      productMatch,
      quantityFeasible,
      locationCompatible,
      dateCompatible: true,
      priceCompatible,
      gradeMatch
    };
  };

  const resetDemoData = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setListings(INITIAL_LISTINGS);
    setDemands(INITIAL_DEMANDS);
    setOffers(INITIAL_OFFERS);
    setOrders(INITIAL_ORDERS);
    setDeliveryTasks(INITIAL_DELIVERY_TASKS);
    setDisputes(INITIAL_DISPUTES);
    setLedger(INITIAL_LEDGER);
    setCommissions(INITIAL_COMMISSIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setEnquiries(INITIAL_ENQUIRIES);
    setRatings(INITIAL_RATINGS);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        users,
        listings,
        demands,
        offers,
        orders,
        deliveryTasks,
        disputes,
        ledger,
        commissions,
        auditLogs,
        notifications,
        enquiries,
        ratings,
        addListing,
        updateListingStatus,
        postDemand,
        updateDemandStatus,
        sendEnquiry,
        replyEnquiry,
        makeOffer,
        counterOffer,
        acceptOffer,
        rejectOffer,
        simulatePayment,
        schedulePickup,
        completeHandover,
        completeDelivery,
        confirmReceipt,
        rateOrder,
        raiseDispute,
        resolveDispute,
        releasePayout,
        updateUserStatus,
        updateCommissionRule,
        markNotificationRead,
        markAllNotificationsRead,
        calculateMatchScore,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
