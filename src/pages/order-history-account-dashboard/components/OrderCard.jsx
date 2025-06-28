import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderCard = ({ order, onReorder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-success bg-success-50';
      case 'preparing':
        return 'text-warning bg-warning-50';
      case 'cancelled':
        return 'text-error bg-error-50';
      case 'on the way':
        return 'text-accent bg-accent-50';
      default:
        return 'text-text-secondary bg-surface';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReorderItem = (item) => {
    onReorder([item]);
  };

  const handleReorderAll = () => {
    onReorder(order.items);
  };

  return (
    <div className="bg-background border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Order Header */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-text-primary">
                Order #{order.id}
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <span>{formatDate(order.date)}</span>
              <span className="font-semibold text-text-primary">${order.total.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center mt-2 text-sm text-text-secondary">
              <Icon name="Package" size={16} className="mr-1" />
              <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
          
          <div className="ml-4 flex items-center space-x-2">
            {/* Item Thumbnails */}
            <div className="flex -space-x-2">
              {order.items.slice(0, 3).map((item, index) => (
                <div key={index} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="w-10 h-10 rounded-full border-2 border-background bg-surface flex items-center justify-center">
                  <span className="text-xs font-medium text-text-secondary">
                    +{order.items.length - 3}
                  </span>
                </div>
              )}
            </div>
            
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-text-secondary"
            />
          </div>
        </div>
      </div>

      {/* Expanded Order Details */}
      {isExpanded && (
        <div className="border-t border-border">
          <div className="p-4">
            {/* Order Items */}
            <div className="space-y-3 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">{item.name}</h4>
                      <p className="text-sm text-text-secondary">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-text-primary">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReorderItem(item)}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Reorder
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-secondary">Subtotal:</span>
                <span className="text-text-primary">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-secondary">Delivery Fee:</span>
                <span className="text-text-primary">${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-4 text-lg font-semibold">
                <span className="text-text-primary">Total:</span>
                <span className="text-text-primary">${order.total.toFixed(2)}</span>
              </div>

              {/* Delivery Address */}
              <div className="mb-4 p-3 bg-surface-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="MapPin" size={16} className="text-text-secondary mt-1" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Delivery Address:</p>
                    <p className="text-sm text-text-secondary">{order.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {order.status === 'delivered' && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageCircle"
                      iconPosition="left"
                    >
                      Review
                    </Button>
                  )}
                  
                  {order.trackingNumber && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Truck"
                      iconPosition="left"
                    >
                      Track Order
                    </Button>
                  )}
                </div>
                
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleReorderAll}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reorder All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;