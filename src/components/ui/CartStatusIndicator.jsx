import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const CartStatusIndicator = ({ className = '' }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Simulate cart count from localStorage or state management
    const savedCartCount = localStorage.getItem('cartItemCount');
    if (savedCartCount) {
      setCartItemCount(parseInt(savedCartCount));
    }

    // Listen for cart updates
    const handleCartUpdate = (event) => {
      const newCount = event.detail?.count || 0;
      setCartItemCount(newCount);
      
      // Trigger animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 200);
      
      // Update localStorage
      localStorage.setItem('cartItemCount', newCount.toString());
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleCartClick = () => {
    // Optional: Add analytics or tracking here
  };

  return (
    <Link
      to="/shopping-cart"
      onClick={handleCartClick}
      className={`relative inline-flex items-center p-2 text-text-secondary hover:text-primary transition-colors duration-200 ${className}`}
      aria-label={`Shopping cart with ${cartItemCount} items`}
    >
      <Icon 
        name="ShoppingCart" 
        size={24} 
        className={`transition-transform duration-200 ${isAnimating ? 'scale-110' : 'scale-100'}`}
      />
      
      {cartItemCount > 0 && (
        <span 
          className={`absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full px-2 py-1 min-w-[20px] text-center transition-all duration-200 ${
            isAnimating ? 'scale-110' : 'scale-100'
          }`}
          aria-live="polite"
        >
          {cartItemCount > 99 ? '99+' : cartItemCount}
        </span>
      )}
    </Link>
  );
};

export default CartStatusIndicator;