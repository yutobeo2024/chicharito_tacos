import React from 'react';
import Button from '../../../components/ui/Button';


const StickyBottomBar = ({ 
  product, 
  quantity, 
  onQuantityChange, 
  customization, 
  onAddToCart,
  isVisible = true 
}) => {
  const calculateTotalPrice = () => {
    const basePrice = product.price * quantity;
    const addOnPrice = customization?.totalAddOnPrice || 0;
    return basePrice + (addOnPrice * quantity);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border shadow-lg md:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between space-x-4">
          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-text-primary truncate">
              {product.name}
            </h4>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-primary">
                ${calculateTotalPrice().toFixed(2)}
              </span>
              {customization?.totalAddOnPrice > 0 && (
                <span className="text-xs text-text-muted">
                  (includes add-ons)
                </span>
              )}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex-shrink-0">
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-200 disabled:opacity-50"
              >
                <span className="text-lg">−</span>
              </button>
              
              <span className="w-12 h-8 flex items-center justify-center text-text-primary bg-background text-sm font-medium">
                {quantity}
              </span>
              
              <button
                onClick={() => onQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
                className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-200 disabled:opacity-50"
              >
                <span className="text-lg">+</span>
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex-shrink-0">
            <Button
              variant="primary"
              onClick={onAddToCart}
              disabled={!product.inStock}
              iconName="ShoppingCart"
              iconPosition="left"
              className="px-4 py-2"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Customization Summary */}
        {customization && (customization.addOns?.length > 0 || customization.spiceLevel !== 'medium') && (
          <div className="mt-2 pt-2 border-t border-border">
            <div className="flex flex-wrap gap-1 text-xs">
              {customization.spiceLevel !== 'medium' && (
                <span className="px-2 py-1 bg-primary-50 text-primary rounded-full">
                  {customization.spiceLevel} spice
                </span>
              )}
              {customization.addOnDetails?.map((addOn, index) => (
                <span key={index} className="px-2 py-1 bg-surface text-text-secondary rounded-full">
                  {addOn.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyBottomBar;