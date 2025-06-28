import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OrderReview = ({ deliveryData, paymentData, onBack, onConfirm }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onConfirm();
  };

  const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return '';
    const cleaned = cardNumber.replace(/\s/g, '');
    return `**** **** **** ${cleaned.slice(-4)}`;
  };

  const getPaymentMethodLabel = (method) => {
    const methods = {
      card: 'Credit/Debit Card',
      paypal: 'PayPal',
      apple: 'Apple Pay',
      google: 'Google Pay'
    };
    return methods[method] || 'Credit/Debit Card';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={16} color="white" />
        </div>
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Review Your Order
        </h2>
      </div>

      {/* Delivery Information */}
      <div className="bg-surface rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary flex items-center space-x-2">
            <Icon name="MapPin" size={18} className="text-primary" />
            <span>Delivery Address</span>
          </h3>
          <button
            onClick={() => onBack(1)}
            className="text-sm text-primary hover:text-primary-600 transition-colors duration-200"
          >
            Edit
          </button>
        </div>
        
        <div className="space-y-2 text-sm">
          <p className="font-medium text-text-primary">{deliveryData.fullName}</p>
          <p className="text-text-secondary">{deliveryData.phone}</p>
          {deliveryData.email && (
            <p className="text-text-secondary">{deliveryData.email}</p>
          )}
          <p className="text-text-secondary">
            {deliveryData.address}
            <br />
            {deliveryData.city}, {deliveryData.state} {deliveryData.zipCode}
          </p>
          {deliveryData.instructions && (
            <div className="mt-3 p-3 bg-background rounded border border-border">
              <p className="text-xs text-text-secondary mb-1">Delivery Instructions:</p>
              <p className="text-sm text-text-primary">{deliveryData.instructions}</p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-surface rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary flex items-center space-x-2">
            <Icon name="CreditCard" size={18} className="text-primary" />
            <span>Payment Method</span>
          </h3>
          <button
            onClick={() => onBack(2)}
            className="text-sm text-primary hover:text-primary-600 transition-colors duration-200"
          >
            Edit
          </button>
        </div>
        
        <div className="space-y-2 text-sm">
          <p className="font-medium text-text-primary">
            {getPaymentMethodLabel(paymentData.paymentMethod)}
          </p>
          {paymentData.paymentMethod === 'card' && (
            <>
              <p className="text-text-secondary">
                {formatCardNumber(paymentData.cardNumber)}
              </p>
              <p className="text-text-secondary">
                {paymentData.cardName}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-success-50 border border-success-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-success-800 mb-1">
              Secure Checkout
            </h4>
            <p className="text-sm text-success-700">
              Your payment information is encrypted and processed securely. We never store your complete card details.
            </p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-0.5"
            defaultChecked
          />
          <label htmlFor="terms" className="text-sm text-text-secondary">
            I agree to the{' '}
            <a href="#" className="text-primary hover:text-primary-600 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:text-primary-600 underline">
              Privacy Policy
            </a>
          </label>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="ghost"
          onClick={() => onBack(2)}
          iconName="ArrowLeft"
          iconPosition="left"
          disabled={isProcessing}
        >
          Back to Payment
        </Button>
        
        <Button
          variant="primary"
          onClick={handleConfirmOrder}
          loading={isProcessing}
          iconName={isProcessing ? undefined : "CheckCircle"}
          iconPosition="right"
          className="min-w-[140px]"
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </div>
  );
};

export default OrderReview;