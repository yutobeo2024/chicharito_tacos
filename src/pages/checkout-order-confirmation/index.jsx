import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CheckoutProgress from './components/CheckoutProgress';
import DeliveryForm from './components/DeliveryForm';
import PaymentForm from './components/PaymentForm';
import OrderReview from './components/OrderReview';
import OrderSummary from './components/OrderSummary';
import OrderConfirmation from './components/OrderConfirmation';

const CheckoutOrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(2); // Start at checkout step
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    // Delivery data
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'TX',
    zipCode: '',
    instructions: '',
    // Payment data
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    saveCard: false
  });

  // Check if user came from cart
  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (!cartItems || JSON.parse(cartItems).length === 0) {
      // Redirect to cart if no items
      navigate('/shopping-cart');
    }
  }, [navigate]);

  // Auto-save form data
  useEffect(() => {
    const savedData = localStorage.getItem('checkoutFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('checkoutFormData', JSON.stringify(formData));
  }, [formData]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStepNavigation = (step) => {
    if (step >= 1 && step <= 3) {
      setCurrentStep(step);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOrderConfirmation = () => {
    // Clear cart and form data
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartItemCount');
    localStorage.removeItem('checkoutFormData');
    
    // Update cart count
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { count: 0 }
    }));
    
    setIsOrderConfirmed(true);
    setCurrentStep(3);
  };

  const renderCurrentStep = () => {
    if (isOrderConfirmed) {
      return <OrderConfirmation orderData={formData} />;
    }

    switch (currentStep) {
      case 1:
        return (
          <DeliveryForm
            formData={formData}
            onFormChange={handleFormChange}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <PaymentForm
            formData={formData}
            onFormChange={handleFormChange}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 3:
        return (
          <OrderReview
            deliveryData={formData}
            paymentData={formData}
            onBack={handleStepNavigation}
            onConfirm={handleOrderConfirmation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      
      {/* Progress Indicator */}
      <CheckoutProgress currentStep={isOrderConfirmed ? 3 : currentStep} />
      
      <main className="pt-4 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isOrderConfirmed && <Breadcrumb />}
          
          {isOrderConfirmed ? (
            <OrderConfirmation orderData={formData} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-background rounded-lg border border-border p-6 lg:p-8">
                  {renderCurrentStep()}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <OrderSummary isSticky={true} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CheckoutOrderConfirmation;