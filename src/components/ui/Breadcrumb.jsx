import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const routeMap = {
    '/product-catalog-browse': { label: 'Menu', parent: null },
    '/product-detail-view': { label: 'Product Details', parent: '/product-catalog-browse' },
    '/shopping-cart': { label: 'Cart', parent: null },
    '/checkout-order-confirmation': { label: 'Checkout', parent: '/shopping-cart' },
    '/order-history-account-dashboard': { label: 'Account', parent: null },
    '/user-authentication-login-register': { label: 'Sign In', parent: null }
  };

  const currentRoute = routeMap[location.pathname];
  
  if (!currentRoute || !currentRoute.parent) {
    return null;
  }

  const parentRoute = routeMap[currentRoute.parent];
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      <Link
        to={currentRoute.parent}
        className="flex items-center hover:text-primary transition-colors duration-200"
      >
        <Icon name="ArrowLeft" size={16} className="mr-1" />
        <span className="hidden sm:inline">{parentRoute.label}</span>
        <span className="sm:hidden">Back</span>
      </Link>
      
      <Icon name="ChevronRight" size={16} className="text-text-muted hidden sm:block" />
      
      <span className="text-text-primary font-medium hidden sm:inline">
        {currentRoute.label}
      </span>
    </nav>
  );
};

export default Breadcrumb;