import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ 
  subtotal, 
  tax, 
  deliveryFee, 
  discount = 0, 
  total, 
  appliedPromo,
  estimatedDeliveryTime = "25-35 min",
  minimumOrder = 15
}) => {
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const isMinimumOrderMet = subtotal >= minimumOrder;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Receipt" size={20} color="var(--color-text-secondary)" />
        <h3 className="font-semibold text-text-primary">Order Summary</h3>
      </div>
      
      {/* Order Details */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Subtotal</span>
          <span className="font-medium text-text-primary">
            {formatPrice(subtotal)}
          </span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between items-center text-success">
            <div className="flex items-center space-x-2">
              <span>Discount</span>
              {appliedPromo && (
                <span className="text-xs bg-success-100 text-success-800 px-2 py-1 rounded">
                  {appliedPromo.code}
                </span>
              )}
            </div>
            <span className="font-medium">
              -{formatPrice(discount)}
            </span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Tax</span>
          <span className="font-medium text-text-primary">
            {formatPrice(tax)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-text-secondary">Delivery Fee</span>
            {appliedPromo?.type === 'shipping' && (
              <span className="text-xs bg-success-100 text-success-800 px-2 py-1 rounded">
                FREE
              </span>
            )}
          </div>
          <span className="font-medium text-text-primary">
            {appliedPromo?.type === 'shipping' ? (
              <span className="line-through text-text-muted">
                {formatPrice(deliveryFee)}
              </span>
            ) : (
              formatPrice(deliveryFee)
            )}
          </span>
        </div>
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-text-primary">Total</span>
            <span className="text-lg font-bold text-primary">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Order Information */}
      <div className="pt-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} color="var(--color-text-secondary)" />
            <span className="text-sm text-text-secondary">Estimated delivery</span>
          </div>
          <span className="text-sm font-medium text-text-primary">
            {estimatedDeliveryTime}
          </span>
        </div>
        
        {!isMinimumOrderMet && (
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
              <div className="text-sm">
                <p className="font-medium text-warning-800">
                  Minimum order not met
                </p>
                <p className="text-warning-600">
                  Add {formatPrice(minimumOrder - subtotal)} more to place your order
                </p>
              </div>
            </div>
          </div>
        )}
        
        {isMinimumOrderMet && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-success-800">
                Ready for checkout!
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Additional Info */}
      <div className="text-xs text-text-muted space-y-1">
        <p>• Prices include all applicable taxes</p>
        <p>• Delivery time may vary based on location and demand</p>
        <p>• Free delivery on orders over $30</p>
      </div>
    </div>
  );
};

export default OrderSummary;