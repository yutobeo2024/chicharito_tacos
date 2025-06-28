import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PromoCodeInput = ({ onApplyPromo, appliedPromo, onRemovePromo }) => {
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock promo codes for demonstration
  const validPromoCodes = {
    'TACO10': { discount: 10, type: 'percentage', description: '10% off your order' },
    'SAVE5': { discount: 5, type: 'fixed', description: '$5 off your order' },
    'WELCOME15': { discount: 15, type: 'percentage', description: '15% off for new customers' },
    'FREESHIP': { discount: 0, type: 'shipping', description: 'Free delivery' }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setError('Please enter a promo code');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const upperPromoCode = promoCode.toUpperCase();
      const promoData = validPromoCodes[upperPromoCode];

      if (promoData) {
        onApplyPromo({
          code: upperPromoCode,
          ...promoData
        });
        setPromoCode('');
        setError('');
      } else {
        setError('Invalid promo code. Please try again.');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleRemovePromo = () => {
    onRemovePromo();
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyPromo();
    }
  };

  if (appliedPromo) {
    return (
      <div className="bg-success-50 border border-success-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} color="white" />
            </div>
            <div>
              <p className="font-medium text-success-800">
                Promo code applied: {appliedPromo.code}
              </p>
              <p className="text-sm text-success-600">
                {appliedPromo.description}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleRemovePromo}
            className="p-1 text-success-600 hover:text-success-800 transition-colors duration-200"
            aria-label="Remove promo code"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon name="Tag" size={20} color="var(--color-text-secondary)" />
        <h3 className="font-medium text-text-primary">Promo Code</h3>
      </div>
      
      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            onKeyPress={handleKeyPress}
            className={error ? 'border-error' : ''}
            disabled={isLoading}
          />
        </div>
        
        <Button
          variant="outline"
          onClick={handleApplyPromo}
          disabled={isLoading || !promoCode.trim()}
          loading={isLoading}
          className="px-6"
        >
          Apply
        </Button>
      </div>
      
      {error && (
        <div className="flex items-center space-x-2 text-error text-sm">
          <Icon name="AlertCircle" size={16} />
          <span>{error}</span>
        </div>
      )}
      
      {/* Available Promo Codes Hint */}
      <div className="text-xs text-text-muted">
        <p className="mb-1">Try these codes:</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(validPromoCodes).map((code) => (
            <button
              key={code}
              onClick={() => setPromoCode(code)}
              className="px-2 py-1 bg-surface border border-border rounded text-text-secondary hover:text-primary hover:border-primary transition-colors duration-200"
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoCodeInput;