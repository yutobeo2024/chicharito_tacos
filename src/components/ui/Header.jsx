import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const location = useLocation();

  const navigationItems = [
    { label: 'Menu', path: '/product-catalog-browse', icon: 'ChefHat' },
    { label: 'Cart', path: '/shopping-cart', icon: 'ShoppingCart' },
    { label: 'Account', path: '/order-history-account-dashboard', icon: 'User' }
  ];

  useEffect(() => {
    // Simulate cart count from localStorage or state management
    const savedCartCount = localStorage.getItem('cartItemCount');
    if (savedCartCount) {
      setCartItemCount(parseInt(savedCartCount));
    }

    // Simulate authentication state
    const authStatus = localStorage.getItem('isAuthenticated');
    const savedUserName = localStorage.getItem('userName');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setUserName(savedUserName || 'User');
    }
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      // Logout
      setIsAuthenticated(false);
      setUserName('');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userName');
    } else {
      // Navigate to login
      window.location.href = '/user-authentication-login-register';
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const Logo = () => (
    <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="ChefHat" size={24} color="white" />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-heading font-bold text-text-primary">
          Chicharito Tacos
        </h1>
        <p className="text-xs text-text-secondary font-caption">
          Authentic Mexican Flavors
        </p>
      </div>
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-surface'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
                {item.path === '/shopping-cart' && cartItemCount > 0 && (
                  <span className="bg-accent text-accent-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon with Count */}
            <Link
              to="/shopping-cart"
              className="relative p-2 text-text-secondary hover:text-primary transition-colors duration-200"
            >
              <Icon name="ShoppingCart" size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-text-primary">Hello, {userName}</span>
                <Button
                  variant="ghost"
                  onClick={handleAuthAction}
                  className="text-sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                onClick={handleAuthAction}
                iconName="LogIn"
                iconPosition="left"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Cart Icon */}
            <Link
              to="/shopping-cart"
              className="relative p-2 text-text-secondary hover:text-primary transition-colors duration-200"
            >
              <Icon name="ShoppingCart" size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={handleMobileMenuToggle}
              className="p-2 text-text-secondary hover:text-primary transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </div>
                  {item.path === '/shopping-cart' && cartItemCount > 0 && (
                    <span className="bg-accent text-accent-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              ))}

              {/* Mobile Authentication */}
              <div className="pt-4 border-t border-border mt-4">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="px-3 py-2">
                      <p className="text-sm text-text-primary">Hello, {userName}</p>
                    </div>
                    <button
                      onClick={handleAuthAction}
                      className="w-full text-left px-3 py-3 text-base font-medium text-text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name="LogOut" size={20} />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/user-authentication-login-register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 text-base font-medium text-text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors duration-200"
                  >
                    <Icon name="LogIn" size={20} />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;