import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProductDetail from './pages/product-detail';
import SellerDashboard from './pages/seller-dashboard';
import Marketplace from './pages/marketplace';
import ImpactTracker from './pages/impact-tracker';
import Homepage from './pages/homepage';
import CommunityHub from './pages/community-hub';
import PaymentPage from "./pages/payment";
import AboutPage from "./pages/about";
import AuthPage from "./pages/auth";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CommunityHub />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/impact-tracker" element={<ImpactTracker />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/community-hub" element={<CommunityHub />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
