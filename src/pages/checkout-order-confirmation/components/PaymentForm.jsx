import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PaymentForm = ({ onFormChange, formData, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [selectedMethod, setSelectedMethod] = useState(formData.paymentMethod || 'card');

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'paypal', label: 'PayPal', icon: 'Wallet' },
    { id: 'apple', label: 'Apple Pay', icon: 'Smartphone' },
    { id: 'google', label: 'Google Pay', icon: 'Smartphone' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (selectedMethod === 'card') {
      if (!formData.cardNumber?.replace(/\s/g, '')) {
        newErrors.cardNumber = 'Card number is required';
      } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }
      
      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
      
      if (!formData.cardName?.trim()) {
        newErrors.cardName = 'Cardholder name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    // Format card number
    if (field === 'cardNumber') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 16) {
        formattedValue = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
      } else {
        return;
      }
    }
    
    // Format expiry date
    if (field === 'expiryDate') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 4) {
        if (digits.length >= 2) {
          formattedValue = `${digits.slice(0, 2)}/${digits.slice(2)}`;
        } else {
          formattedValue = digits;
        }
      } else {
        return;
      }
    }
    
    // Format CVV
    if (field === 'cvv') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 4) {
        formattedValue = digits;
      } else {
        return;
      }
    }

    onFormChange(field, formattedValue);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    onFormChange('paymentMethod', method);
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="CreditCard" size={16} color="white" />
        </div>
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Payment Method
        </h2>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary mb-3">
          Choose Payment Method
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleMethodChange(method.id)}
              className={`flex items-center space-x-3 p-4 border rounded-lg transition-all duration-200 ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary-50 text-primary' :'border-border bg-background text-text-secondary hover:border-primary hover:bg-surface'
              }`}
            >
              <Icon name={method.icon} size={20} />
              <span className="font-medium">{method.label}</span>
              {selectedMethod === method.id && (
                <Icon name="CheckCircle" size={16} className="ml-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Card Details Form */}
      {selectedMethod === 'card' && (
        <div className="space-y-4 p-4 border border-border rounded-lg bg-surface-50">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-text-secondary">
              Your payment information is encrypted and secure
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Card Number *
            </label>
            <Input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber || ''}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              className={errors.cardNumber ? 'border-error' : ''}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-error">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Expiry Date *
              </label>
              <Input
                type="text"
                placeholder="MM/YY"
                value={formData.expiryDate || ''}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                className={errors.expiryDate ? 'border-error' : ''}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-error">{errors.expiryDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                CVV *
              </label>
              <Input
                type="text"
                placeholder="123"
                value={formData.cvv || ''}
                onChange={(e) => handleInputChange('cvv', e.target.value)}
                className={errors.cvv ? 'border-error' : ''}
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-error">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Cardholder Name *
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              value={formData.cardName || ''}
              onChange={(e) => handleInputChange('cardName', e.target.value)}
              className={errors.cardName ? 'border-error' : ''}
            />
            {errors.cardName && (
              <p className="mt-1 text-sm text-error">{errors.cardName}</p>
            )}
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="saveCard"
              checked={formData.saveCard || false}
              onChange={(e) => onFormChange('saveCard', e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <label htmlFor="saveCard" className="text-sm text-text-secondary">
              Save this card for future orders
            </label>
          </div>
        </div>
      )}

      {/* Digital Wallet Info */}
      {selectedMethod !== 'card' && (
        <div className="p-4 border border-border rounded-lg bg-surface-50">
          <div className="flex items-center space-x-3">
            <Icon name="Info" size={16} className="text-primary" />
            <p className="text-sm text-text-secondary">
              You will be redirected to {paymentMethods.find(m => m.id === selectedMethod)?.label} to complete your payment securely.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="ghost"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Delivery
        </Button>
        
        <Button
          variant="primary"
          onClick={handleNext}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Review Order
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;