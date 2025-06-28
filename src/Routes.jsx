import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserAuthenticationLoginRegister from "pages/user-authentication-login-register";
import ShoppingCart from "pages/shopping-cart";
import ProductCatalogBrowse from "pages/product-catalog-browse";
import CheckoutOrderConfirmation from "pages/checkout-order-confirmation";
import ProductDetailView from "pages/product-detail-view";
import OrderHistoryAccountDashboard from "pages/order-history-account-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<ProductCatalogBrowse />} />
        <Route path="/product-catalog-browse" element={<ProductCatalogBrowse />} />
        <Route path="/user-authentication-login-register" element={<UserAuthenticationLoginRegister />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/checkout-order-confirmation" element={<CheckoutOrderConfirmation />} />
        <Route path="/product-detail-view" element={<ProductDetailView />} />
        <Route path="/product-detail-view/:id" element={<ProductDetailView />} />
        <Route path="/order-history-account-dashboard" element={<OrderHistoryAccountDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;