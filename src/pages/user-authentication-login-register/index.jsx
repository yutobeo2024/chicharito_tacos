import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';

const UserAuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      // Redirect authenticated users to menu or previous page
      const returnUrl = sessionStorage.getItem('returnUrl') || '/product-catalog-browse';
      sessionStorage.removeItem('returnUrl');
      navigate(returnUrl);
      return;
    }

    // Store return URL if coming from another page
    const from = location.state?.from?.pathname;
    if (from && from !== '/user-authentication-login-register') {
      sessionStorage.setItem('returnUrl', from);
    }

    // Set initial tab based on URL params or state
    const urlParams = new URLSearchParams(location.search);
    const mode = urlParams.get('mode') || location.state?.mode;
    if (mode === 'register') {
      setActiveTab('register');
    }
  }, [navigate, location]);

  const handleAuthSuccess = (userData) => {
    console.log('Authentication successful:', userData);
    // Navigation is handled within the form components
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Update URL without page reload
    const newUrl = new URL(window.location);
    if (tab === 'register') {
      newUrl.searchParams.set('mode', 'register');
    } else {
      newUrl.searchParams.delete('mode');
    }
    window.history.replaceState({}, '', newUrl);
  };

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Authentication Container */}
          <div className="max-w-md mx-auto">
            {/* Background Card */}
            <div className="bg-background rounded-2xl shadow-lg border border-border p-8">
              {/* Header */}
              <AuthHeader activeTab={activeTab} />

              {/* Tab Navigation */}
              <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

              {/* Form Content */}
              <div className="space-y-6">
                {activeTab === 'login' ? (
                  <LoginForm onSuccess={handleAuthSuccess} />
                ) : (
                  <RegisterForm onSuccess={handleAuthSuccess} />
                )}

                {/* Social Login */}
                <SocialLogin onSuccess={handleAuthSuccess} />
              </div>

              {/* Footer Links */}
              <div className="mt-8 text-center space-y-4">
                {activeTab === 'login' ? (
                  <p className="text-sm text-text-secondary">
                    Don't have an account?{' '}
                    <button
                      onClick={() => handleTabChange('register')}
                      className="text-primary hover:text-primary-600 font-medium transition-colors duration-200"
                    >
                      Create one here
                    </button>
                  </p>
                ) : (
                  <p className="text-sm text-text-secondary">
                    Already have an account?{' '}
                    <button
                      onClick={() => handleTabChange('login')}
                      className="text-primary hover:text-primary-600 font-medium transition-colors duration-200"
                    >
                      Sign in here
                    </button>
                  </p>
                )}

                {/* Guest Browsing */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-text-muted mb-3">
                    Want to browse our menu first?
                  </p>
                  <button
                    onClick={() => navigate('/product-catalog-browse')}
                    className="text-sm text-primary hover:text-primary-600 font-medium transition-colors duration-200"
                  >
                    Continue as Guest
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-text-muted">
                By continuing, you agree to our{' '}
                <button className="text-primary hover:text-primary-600 underline">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-primary hover:text-primary-600 underline">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-100 rounded-full opacity-20 blur-3xl" />
      </div>
    </div>
  );
};

export default UserAuthenticationPage;