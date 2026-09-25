import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { MarketplacePage } from './pages/public/MarketplacePage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Farmer Pages
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { FarmerListings } from './pages/farmer/FarmerListings';
import { FarmerAddListing } from './pages/farmer/FarmerAddListing';
import { FarmerDemandBoard } from './pages/farmer/FarmerDemandBoard';
import { FarmerEnquiries } from './pages/farmer/FarmerEnquiries';
import { FarmerOffers } from './pages/farmer/FarmerOffers';
import { FarmerOrders } from './pages/farmer/FarmerOrders';
import { FarmerPickups } from './pages/farmer/FarmerPickups';
import { FarmerSales } from './pages/farmer/FarmerSales';
import { FarmerEarnings } from './pages/farmer/FarmerEarnings';
import { FarmerProfile } from './pages/farmer/FarmerProfile';

// Buyer Pages
import { BuyerDashboard } from './pages/buyer/BuyerDashboard';
import { BuyerProductDetail } from './pages/buyer/BuyerProductDetail';
import { BuyerDemandList } from './pages/buyer/BuyerDemandList';
import { BuyerAddDemand } from './pages/buyer/BuyerAddDemand';
import { BuyerEnquiries } from './pages/buyer/BuyerEnquiries';
import { BuyerOffers } from './pages/buyer/BuyerOffers';
import { BuyerOrders } from './pages/buyer/BuyerOrders';
import { BuyerDelivery } from './pages/buyer/BuyerDelivery';
import { BuyerProfile } from './pages/buyer/BuyerProfile';

// Delivery Partner Pages
import { DeliveryDashboard } from './pages/delivery/DeliveryDashboard';
import { DeliveryTasks } from './pages/delivery/DeliveryTasks';
import { DeliveryTaskDetail } from './pages/delivery/DeliveryTaskDetail';
import { DeliveryProfile } from './pages/delivery/DeliveryProfile';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminVerifications } from './pages/admin/AdminVerifications';
import { AdminListings } from './pages/admin/AdminListings';
import { AdminDemands } from './pages/admin/AdminDemands';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminPayments } from './pages/admin/AdminPayments';
import { AdminRefunds } from './pages/admin/AdminRefunds';
import { AdminPayouts } from './pages/admin/AdminPayouts';
import { AdminDisputes } from './pages/admin/AdminDisputes';
import { AdminCommissions } from './pages/admin/AdminCommissions';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminAuditLogs } from './pages/admin/AdminAuditLogs';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Farmer Workspace Routes */}
        <Route path="/farmer" element={<DashboardLayout role="farmer" />}>
          <Route index element={<Navigate to="/farmer/dashboard" replace />} />
          <Route path="dashboard" element={<FarmerDashboard />} />
          <Route path="listings" element={<FarmerListings />} />
          <Route path="listings/new" element={<FarmerAddListing />} />
          <Route path="demand" element={<FarmerDemandBoard />} />
          <Route path="enquiries" element={<FarmerEnquiries />} />
          <Route path="offers" element={<FarmerOffers />} />
          <Route path="orders" element={<FarmerOrders />} />
          <Route path="pickups" element={<FarmerPickups />} />
          <Route path="sales" element={<FarmerSales />} />
          <Route path="earnings" element={<FarmerEarnings />} />
          <Route path="profile" element={<FarmerProfile />} />
        </Route>

        {/* Buyer Workspace Routes */}
        <Route path="/buyer" element={<DashboardLayout role="buyer" />}>
          <Route index element={<Navigate to="/buyer/dashboard" replace />} />
          <Route path="dashboard" element={<BuyerDashboard />} />
          <Route path="marketplace" element={<MarketplacePage />} />
          <Route path="product/:id" element={<BuyerProductDetail />} />
          <Route path="demand" element={<BuyerDemandList />} />
          <Route path="demand/new" element={<BuyerAddDemand />} />
          <Route path="enquiries" element={<BuyerEnquiries />} />
          <Route path="offers" element={<BuyerOffers />} />
          <Route path="orders" element={<BuyerOrders />} />
          <Route path="delivery" element={<BuyerDelivery />} />
          <Route path="profile" element={<BuyerProfile />} />
        </Route>

        {/* Delivery Partner Routes */}
        <Route path="/delivery" element={<DashboardLayout role="delivery" />}>
          <Route index element={<Navigate to="/delivery/dashboard" replace />} />
          <Route path="dashboard" element={<DeliveryDashboard />} />
          <Route path="tasks" element={<DeliveryTasks />} />
          <Route path="task/:id" element={<DeliveryTaskDetail />} />
          <Route path="profile" element={<DeliveryProfile />} />
        </Route>

        {/* Admin Governance Routes */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="farmers" element={<AdminUsers roleFilter="farmer" />} />
          <Route path="buyers" element={<AdminUsers roleFilter="buyer" />} />
          <Route path="delivery-partners" element={<AdminUsers roleFilter="delivery" />} />
          <Route path="verifications" element={<AdminVerifications />} />
          <Route path="listings" element={<AdminListings />} />
          <Route path="demands" element={<AdminDemands />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="refunds" element={<AdminRefunds />} />
          <Route path="payouts" element={<AdminPayouts />} />
          <Route path="disputes" element={<AdminDisputes />} />
          <Route path="commissions" element={<AdminCommissions />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>
    </Routes>
  );
};
