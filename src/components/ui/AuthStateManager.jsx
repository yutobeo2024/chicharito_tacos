import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthStateManager = ({ className = '', isMobile = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication state from localStorage or state management
    const authStatus = localStorage.getItem('isAuthenticated');
    const savedUserName = localStorage.getItem('userName');
    
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setUserName(savedUserName || 'User');
    }

    // Listen for auth state changes
    const handleAuthChange = (event) => {
      const { isAuthenticated: newAuthState, userName: newUserName } = event.detail;
      setIsAuthenticated(newAuthState);
      setUserName(newUserName || '');
      
      if (newAuthState) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', newUserName || '');
      } else {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userName');
      }
    };

    window.addEventListener('authStateChanged', handleAuthChange);
    
    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  const handleLogin = () => {
    navigate('/user-authentication-login-register');
    setShowDropdown(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    setShowDropdown(false);
    
    // Dispatch auth state change event
    window.dispatchEvent(new CustomEvent('authStateChanged', {
      detail: { isAuthenticated: false, userName: '' }
    }));
  };

  const handleAccountAccess = () => {
    navigate('/order-history-account-dashboard');
    setShowDropdown(false);
  };

  if (isMobile) {
    return (
      <div className={`space-y-3 ${className}`}>
        {isAuthenticated ? (
          <>
            <div className="px-3 py-2">
              <p className="text-sm text-text-primary">Hello, {userName}</p>
            </div>
            <button
              onClick={handleAccountAccess}
              className="w-full text-left px-3 py-3 text-base font-medium text-text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Icon name="User" size={20} />
                <span>My Account</span>
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-3 text-base font-medium text-text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Icon name="LogOut" size={20} />
                <span>Logout</span>
              </div>
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full text-left px-3 py-3 text-base font-medium text-text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <Icon name="LogIn" size={20} />
              <span>Sign In</span>
            </div>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isAuthenticated ? (
        <div className="flex items-center space-x-3">
          <span className="text-sm text-text-primary hidden lg:inline">
            Hello, {userName}
          </span>
          
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-1 p-2 text-text-secondary hover:text-primary transition-colors duration-200 rounded-lg"
              aria-label="Account menu"
            >
              <Icon name="User" size={20} />
              <Icon name="ChevronDown" size={16} className="hidden lg:block" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <button
                    onClick={handleAccountAccess}
                    className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="User" size={16} />
                      <span>My Account</span>
                    </div>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="LogOut" size={16} />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Button
          variant="primary"
          onClick={handleLogin}
          iconName="LogIn"
          iconPosition="left"
          className="text-sm"
        >
          Sign In
        </Button>
      )}

      {/* Overlay to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default AuthStateManager;