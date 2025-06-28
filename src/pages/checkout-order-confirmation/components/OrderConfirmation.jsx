import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OrderConfirmation = ({ orderData }) => {
  const mockOrderData = orderData || {
    orderNumber: 'CHT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    estimatedDelivery: '25-35 minutes',
    total: 19.49,
    deliveryAddress: '123 Main Street, Austin, TX 78701',
    customerName: 'John Doe',
    customerPhone: '(555) 123-4567'
  };

  const currentTime = new Date();
  const estimatedTime = new Date(currentTime.getTime() + 30 * 60000); // 30 minutes from now

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={40} color="white" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold text-text-primary">
          Order Confirmed!
        </h1>
        <p className="text-lg text-text-secondary">
          Thank you for your order. We're preparing your delicious tacos!
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-background border border-border rounded-lg p-6 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-2">Order Number</h3>
            <p className="text-lg font-mono font-semibold text-text-primary">
              {mockOrderData.orderNumber}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-2">Total Amount</h3>
            <p className="text-lg font-semibold text-primary">
              ${mockOrderData.total.toFixed(2)}
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-text-secondary mb-2">Delivery Address</h3>
            <p className="text-text-primary">{mockOrderData.deliveryAddress}</p>
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="bg-accent-50 border border-accent-200 rounded-lg p-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Icon name="Truck" size={24} className="text-accent" />
          <h3 className="text-lg font-semibold text-accent-800">
            Estimated Delivery
          </h3>
        </div>
        
        <div className="space-y-2">
          <p className="text-2xl font-bold text-accent-800">
            {mockOrderData.estimatedDelivery}
          </p>
          <p className="text-sm text-accent-700">
            Expected by {estimatedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      {/* Order Tracking */}
      <div className="bg-surface rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Order Status
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} color="white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-text-primary">Order Confirmed</p>
              <p className="text-sm text-text-secondary">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
              <Icon name="ChefHat" size={16} color="white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-text-primary">Preparing Your Order</p>
              <p className="text-sm text-text-secondary">In progress...</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-border rounded-full flex items-center justify-center">
              <Icon name="Truck" size={16} className="text-text-muted" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-text-muted">Out for Delivery</p>
              <p className="text-sm text-text-muted">Pending...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Need Help?
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={16} className="text-primary" />
            <span className="text-text-secondary">Call us:</span>
            <a href="tel:+15551234567" className="text-primary hover:text-primary-600">
              (555) 123-4567
            </a>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} className="text-primary" />
            <span className="text-text-secondary">Email:</span>
            <a href="mailto:support@chicharitotacos.com" className="text-primary hover:text-primary-600">
              support@chicharitotacos.com
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/order-history-account-dashboard">
          <Button
            variant="primary"
            iconName="History"
            iconPosition="left"
            fullWidth
          >
            View Order History
          </Button>
        </Link>
        
        <Link to="/product-catalog-browse">
          <Button
            variant="outline"
            iconName="ArrowLeft"
            iconPosition="left"
            fullWidth
          >
            Continue Shopping
          </Button>
        </Link>
      </div>

      {/* Email Confirmation Notice */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Mail" size={16} className="text-primary" />
          <p className="text-sm text-primary-800">
            A confirmation email has been sent to your email address
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;