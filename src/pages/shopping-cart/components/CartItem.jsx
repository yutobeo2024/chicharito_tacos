import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, onSaveForLater }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    onRemoveItem(item.id);
    setShowRemoveConfirm(false);
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-4 transition-all duration-200 hover:shadow-md">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex items-start space-x-3">
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-text-primary text-sm mb-1 line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-primary font-semibold text-sm">
                  {formatPrice(item.price)}
                </p>
              </div>
              
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                aria-label={isExpanded ? "Collapse item" : "Expand item"}
              >
                <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
              </button>
            </div>
            
            {item.customizations && item.customizations.length > 0 && (
              <div className="mt-1">
                <p className="text-xs text-text-secondary">
                  {item.customizations.slice(0, 2).join(', ')}
                  {item.customizations.length > 2 && '...'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Expanded Mobile Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-4">
            {item.customizations && item.customizations.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Customizations:</h4>
                <div className="space-y-1">
                  {item.customizations.map((customization, index) => (
                    <p key={index} className="text-sm text-text-secondary">
                      • {customization}
                    </p>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary">Qty:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    aria-label="Decrease quantity"
                  >
                    <Icon name="Minus" size={14} />
                  </button>
                  
                  <span className="w-8 text-center text-sm font-medium text-text-primary">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors duration-200"
                    aria-label="Increase quantity"
                  >
                    <Icon name="Plus" size={14} />
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-semibold text-text-primary">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onSaveForLater(item.id)}
                className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
              >
                Save for later
              </button>
              
              <button
                onClick={() => setShowRemoveConfirm(true)}
                className="text-sm text-error hover:text-error-600 transition-colors duration-200"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:items-center lg:space-x-4">
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-text-primary mb-1">{item.name}</h3>
          {item.customizations && item.customizations.length > 0 && (
            <p className="text-sm text-text-secondary">
              {item.customizations.join(', ')}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Decrease quantity"
          >
            <Icon name="Minus" size={14} />
          </button>
          
          <span className="w-8 text-center font-medium text-text-primary">
            {item.quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors duration-200"
            aria-label="Increase quantity"
          >
            <Icon name="Plus" size={14} />
          </button>
        </div>
        
        <div className="w-20 text-right">
          <p className="font-semibold text-text-primary">
            {formatPrice(item.price)}
          </p>
        </div>
        
        <div className="w-24 text-right">
          <p className="font-semibold text-text-primary">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSaveForLater(item.id)}
            className="p-2 text-text-secondary hover:text-primary transition-colors duration-200"
            aria-label="Save for later"
          >
            <Icon name="Heart" size={18} />
          </button>
          
          <button
            onClick={() => setShowRemoveConfirm(true)}
            className="p-2 text-text-secondary hover:text-error transition-colors duration-200"
            aria-label="Remove item"
          >
            <Icon name="Trash2" size={18} />
          </button>
        </div>
      </div>

      {/* Remove Confirmation Modal */}
      {showRemoveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Remove Item
            </h3>
            <p className="text-text-secondary mb-4">
              Are you sure you want to remove "{item.name}" from your cart?
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowRemoveConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleRemove}
                className="flex-1"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;