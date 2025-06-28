import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import EmptyCart from './components/EmptyCart';
import PromoCodeInput from './components/PromoCodeInput';
import OrderSummary from './components/OrderSummary';
import SavedItems from './components/SavedItems';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Carnitas Taco",
      price: 3.50,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      customizations: ["Extra cheese", "Mild salsa", "No onions"]
    },
    {
      id: 2,
      name: "Chicken Burrito Bowl",
      price: 12.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop",
      customizations: ["Brown rice", "Black beans", "Guacamole"]
    },
    {
      id: 3,
      name: "Fish Taco",
      price: 4.25,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
      customizations: ["Cabbage slaw", "Chipotle sauce"]
    }
  ];

  const mockSavedItems = [
    {
      id: 4,
      name: "Beef Quesadilla",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop",
      customizations: ["Extra cheese", "Sour cream"]
    },
    {
      id: 5,
      name: "Churros",
      price: 5.50,
      image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=400&h=300&fit=crop",
      customizations: ["Cinnamon sugar", "Chocolate sauce"]
    }
  ];

  useEffect(() => {
    // Simulate loading cart data
    setTimeout(() => {
      const savedCart = localStorage.getItem('cartItems');
      const savedForLater = localStorage.getItem('savedItems');
      
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems(mockCartItems);
        localStorage.setItem('cartItems', JSON.stringify(mockCartItems));
      }
      
      if (savedForLater) {
        setSavedItems(JSON.parse(savedForLater));
      } else {
        setSavedItems(mockSavedItems);
        localStorage.setItem('savedItems', JSON.stringify(mockSavedItems));
      }
      
      setIsLoading(false);
    }, 1000);
  }, []);

  // Update cart count in header
  useEffect(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartItemCount', totalItems.toString());
    
    // Dispatch event to update header cart count
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { count: totalItems }
    }));
  }, [cartItems]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleSaveForLater = (itemId) => {
    const itemToSave = cartItems.find(item => item.id === itemId);
    if (itemToSave) {
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      const updatedSavedItems = [...savedItems, { ...itemToSave, quantity: 1 }];
      
      setCartItems(updatedCartItems);
      setSavedItems(updatedSavedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
    }
  };

  const handleMoveToCart = (itemId) => {
    const itemToMove = savedItems.find(item => item.id === itemId);
    if (itemToMove) {
      const updatedSavedItems = savedItems.filter(item => item.id !== itemId);
      const updatedCartItems = [...cartItems, { ...itemToMove, quantity: 1 }];
      
      setSavedItems(updatedSavedItems);
      setCartItems(updatedCartItems);
      localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };

  const handleRemoveSaved = (itemId) => {
    const updatedSavedItems = savedItems.filter(item => item.id !== itemId);
    setSavedItems(updatedSavedItems);
    localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
  };

  const handleApplyPromo = (promoData) => {
    setAppliedPromo(promoData);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    
    // Store cart data for checkout
    localStorage.setItem('checkoutItems', JSON.stringify(cartItems));
    localStorage.setItem('appliedPromo', JSON.stringify(appliedPromo));
    
    navigate('/checkout-order-confirmation');
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const deliveryFee = subtotal >= 30 ? 0 : 3.99;
  
  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percentage') {
      discount = subtotal * (appliedPromo.discount / 100);
    } else if (appliedPromo.type === 'fixed') {
      discount = appliedPromo.discount;
    }
  }
  
  const finalDeliveryFee = appliedPromo?.type === 'shipping' ? 0 : deliveryFee;
  const total = subtotal - discount + tax + finalDeliveryFee;
  const minimumOrder = 15;
  const isMinimumOrderMet = subtotal >= minimumOrder;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-text-secondary">Loading your cart...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                Shopping Cart
              </h1>
              <p className="text-text-secondary mt-1">
                {cartItems.length === 0 
                  ? "Your cart is empty" 
                  : `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`
                }
              </p>
            </div>
            
            {cartItems.length > 0 && (
              <Link to="/product-catalog-browse">
                <Button
                  variant="outline"
                  iconName="Plus"
                  iconPosition="left"
                  className="hidden sm:flex"
                >
                  Add More Items
                </Button>
              </Link>
            )}
          </div>

          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {/* Desktop Table Header */}
                <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center lg:py-3 lg:px-4 lg:bg-surface lg:rounded-lg lg:mb-4 lg:text-sm lg:font-medium lg:text-text-secondary">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Total</div>
                  <div className="col-span-1 text-center">Actions</div>
                </div>

                {/* Cart Items List */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                      onSaveForLater={handleSaveForLater}
                    />
                  ))}
                </div>

                {/* Promo Code Section */}
                <div className="mb-6">
                  <PromoCodeInput
                    onApplyPromo={handleApplyPromo}
                    appliedPromo={appliedPromo}
                    onRemovePromo={handleRemovePromo}
                  />
                </div>

                {/* Saved Items */}
                <SavedItems
                  savedItems={savedItems}
                  onMoveToCart={handleMoveToCart}
                  onRemoveSaved={handleRemoveSaved}
                />
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <OrderSummary
                    subtotal={subtotal}
                    tax={tax}
                    deliveryFee={deliveryFee}
                    discount={discount}
                    total={total}
                    appliedPromo={appliedPromo}
                    minimumOrder={minimumOrder}
                  />
                  
                  {/* Checkout Button */}
                  <div className="mt-6">
                    <Button
                      variant="primary"
                      onClick={handleProceedToCheckout}
                      disabled={!isMinimumOrderMet}
                      iconName="ArrowRight"
                      iconPosition="right"
                      className="w-full py-4 text-lg font-semibold"
                    >
                      Proceed to Checkout
                    </Button>
                    
                    {!isMinimumOrderMet && (
                      <p className="text-sm text-warning text-center mt-2">
                        Minimum order of ${minimumOrder.toFixed(2)} required
                      </p>
                    )}
                  </div>
                  
                  {/* Continue Shopping */}
                  <div className="mt-4 text-center">
                    <Link
                      to="/product-catalog-browse"
                      className="text-sm text-primary hover:text-primary-600 transition-colors duration-200"
                    >
                      ← Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sticky Checkout Bar */}
      {cartItems.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-text-secondary">Total</p>
              <p className="text-lg font-bold text-primary">
                ${total.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </p>
              {!isMinimumOrderMet && (
                <p className="text-xs text-warning">
                  Add ${(minimumOrder - subtotal).toFixed(2)} more
                </p>
              )}
            </div>
          </div>
          
          <Button
            variant="primary"
            onClick={handleProceedToCheckout}
            disabled={!isMinimumOrderMet}
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full py-3"
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;