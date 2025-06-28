import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountSidebar = ({ activeTab, onTabChange, orderCount, savedItemsCount }) => {
  const sidebarItems = [
    {
      id: 'orders',
      label: 'Order History',
      icon: 'Package',
      count: orderCount,
      description: 'View your past orders'
    },
    {
      id: 'profile',
      label: 'Profile Settings',
      icon: 'User',
      description: 'Manage your account'
    },
    {
      id: 'saved',
      label: 'Saved Items',
      icon: 'Heart',
      count: savedItemsCount,
      description: 'Your favorite items'
    },
    {
      id: 'addresses',
      label: 'Addresses',
      icon: 'MapPin',
      description: 'Delivery locations'
    },
    {
      id: 'payments',
      label: 'Payment Methods',
      icon: 'CreditCard',
      description: 'Manage payment options'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Notification preferences'
    }
  ];

  return (
    <div className="bg-background border border-border rounded-lg p-4 h-fit">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Account</h3>
      
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
              activeTab === item.id
                ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-primary hover:bg-surface'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={activeTab === item.id ? 'text-primary' : 'text-text-muted'}
                />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-text-muted">{item.description}</div>
                </div>
              </div>
              
              {item.count !== undefined && item.count > 0 && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-text-secondary'
                }`}>
                  {item.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <button className="w-full text-left p-2 text-sm text-text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors duration-200">
            <div className="flex items-center space-x-2">
              <Icon name="RotateCcw" size={16} />
              <span>Reorder Last Order</span>
            </div>
          </button>
          <button className="w-full text-left p-2 text-sm text-text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors duration-200">
            <div className="flex items-center space-x-2">
              <Icon name="Download" size={16} />
              <span>Download Order History</span>
            </div>
          </button>
          <button className="w-full text-left p-2 text-sm text-text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors duration-200">
            <div className="flex items-center space-x-2">
              <Icon name="HelpCircle" size={16} />
              <span>Contact Support</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSidebar;