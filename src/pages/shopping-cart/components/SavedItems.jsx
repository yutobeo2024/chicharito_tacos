import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SavedItems = ({ savedItems, onMoveToCart, onRemoveSaved }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!savedItems || savedItems.length === 0) {
    return null;
  }

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Heart" size={20} color="var(--color-text-secondary)" />
          <h3 className="font-semibold text-text-primary">
            Saved for Later ({savedItems.length})
          </h3>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
          aria-label={isExpanded ? "Collapse saved items" : "Expand saved items"}
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
        </button>
      </div>
      
      {isExpanded && (
        <div className="space-y-3">
          {savedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary text-sm mb-1 line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-primary font-semibold text-sm">
                  {formatPrice(item.price)}
                </p>
                {item.customizations && item.customizations.length > 0 && (
                  <p className="text-xs text-text-secondary mt-1">
                    {item.customizations.slice(0, 2).join(', ')}
                    {item.customizations.length > 2 && '...'}
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => onMoveToCart(item.id)}
                  className="text-xs px-3 py-1"
                >
                  Add to Cart
                </Button>
                
                <button
                  onClick={() => onRemoveSaved(item.id)}
                  className="p-1 text-text-secondary hover:text-error transition-colors duration-200"
                  aria-label="Remove from saved items"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>
          ))}
          
          {savedItems.length > 3 && (
            <div className="text-center pt-2">
              <Button
                variant="ghost"
                onClick={() => {
                  savedItems.slice(0, 3).forEach(item => onMoveToCart(item.id));
                }}
                iconName="ShoppingCart"
                iconPosition="left"
                className="text-sm"
              >
                Add All to Cart
              </Button>
            </div>
          )}
        </div>
      )}
      
      {!isExpanded && savedItems.length > 0 && (
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {savedItems.slice(0, 3).map((item, index) => (
              <div
                key={item.id}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-background"
                style={{ zIndex: 3 - index }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {savedItems.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-text-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  +{savedItems.length - 3}
                </span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-text-secondary">
            {savedItems.length} item{savedItems.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      )}
    </div>
  );
};

export default SavedItems;