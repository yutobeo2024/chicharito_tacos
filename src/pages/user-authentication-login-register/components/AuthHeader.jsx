import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ activeTab }) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'login':
        return 'Welcome Back!';
      case 'register':
        return 'Join Chicharito Tacos';
      default:
        return 'Welcome';
    }
  };

  const getSubtitle = () => {
    switch (activeTab) {
      case 'login':
        return 'Sign in to your account to place orders and view your history';
      case 'register':
        return 'Create an account to start ordering delicious tacos';
      default:
        return 'Access your account';
    }
  };

  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/product-catalog-browse" className="inline-flex items-center space-x-2 mb-6 hover:opacity-80 transition-opacity duration-200">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="ChefHat" size={28} color="white" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            Chicharito Tacos
          </h1>
          <p className="text-sm text-text-secondary font-caption">
            Authentic Mexican Flavors
          </p>
        </div>
      </Link>

      {/* Title and Subtitle */}
      <div className="space-y-2">
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
          {getTitle()}
        </h2>
        <p className="text-text-secondary max-w-md mx-auto">
          {getSubtitle()}
        </p>
      </div>
    </div>
  );
};

export default AuthHeader;