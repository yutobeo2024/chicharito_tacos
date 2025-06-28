import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ cartItems, isSticky = false }) => {
  const mockCartItems = cartItems || [
    {
      id: 1,
      name: "Carnitas Taco",
      description: "Slow-cooked pork with onions and cilantro",
      price: 3.50,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Carne Asada Taco",
      description: "Grilled beef with fresh salsa",
      price: 4.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Chicken Quesadilla",
      description: "Grilled chicken with melted cheese",
      price: 8.50,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop"
    }
  ];

  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const tax = subtotal * 0.0825; // 8.25% tax
  const total = subtotal + deliveryFee + tax;

  const estimatedDeliveryTime = "25-35 minutes";

  return (
    <div className={`bg-background border border-border rounded-lg p-6 ${isSticky ? 'sticky top-24' : ''}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="ShoppingBag" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Order Summary
        </h3>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {mockCartItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-text-primary truncate">
                {item.name}
              </h4>
              <p className="text-xs text-text-secondary truncate">
                {item.description}
              </p>
            </div>
            
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-medium text-text-primary">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <div className="text-xs text-text-secondary">
                Qty: {item.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 py-4 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Subtotal</span>
          <span className="text-text-primary">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Delivery Fee</span>
          <span className="text-text-primary">${deliveryFee.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Tax</span>
          <span className="text-text-primary">${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
          <span className="text-text-primary">Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Estimated Delivery Time */}
      <div className="mt-6 p-4 bg-accent-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-accent" />
          <span className="text-sm font-medium text-accent">
            Estimated Delivery
          </span>
        </div>
        <p className="text-sm text-text-primary mt-1">
          {estimatedDeliveryTime}
        </p>
      </div>

      {/* Promo Code Section */}
      <div className="mt-4">
        <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary-600 transition-colors duration-200">
          <Icon name="Tag" size={16} />
          <span>Add promo code</span>
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;