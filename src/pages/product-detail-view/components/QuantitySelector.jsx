import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const QuantitySelector = ({ 
  initialQuantity = 1, 
  maxQuantity = 10, 
  onQuantityChange,
  disabled = false 
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    onQuantityChange(quantity);
  }, [quantity, onQuantityChange]);

  const handleDecrease = () => {
    if (quantity > 1 && !disabled) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity && !disabled) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity && !disabled) {
      setQuantity(value);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-text-primary">Quantity:</span>
      
      <div className="flex items-center border border-border rounded-lg overflow-hidden">
        <button
          onClick={handleDecrease}
          disabled={quantity <= 1 || disabled}
          className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <Icon name="Minus" size={16} />
        </button>
        
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={1}
          max={maxQuantity}
          disabled={disabled}
          className="w-16 h-10 text-center border-0 focus:outline-none text-text-primary bg-background disabled:opacity-50"
        />
        
        <button
          onClick={handleIncrease}
          disabled={quantity >= maxQuantity || disabled}
          className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
        >
          <Icon name="Plus" size={16} />
        </button>
      </div>
      
      {maxQuantity && (
        <span className="text-xs text-text-muted">
          Max: {maxQuantity}
        </span>
      )}
    </div>
  );
};

export default QuantitySelector;