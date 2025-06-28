import React, { useState } from 'react';
import Button from '../../../components/ui/Button';


const SocialLogin = ({ onSuccess }) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful Google login
      const userData = {
        name: 'Maria Garcia',
        email: 'maria.garcia@gmail.com',
        id: 'google_' + Date.now(),
        provider: 'google'
      };

      // Store auth state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userEmail', userData.email);

      // Dispatch auth state change event
      window.dispatchEvent(new CustomEvent('authStateChanged', {
        detail: { isAuthenticated: true, userName: userData.name }
      }));

      onSuccess && onSuccess(userData);
    } catch (error) {
      console.error('Google login failed:', error);
      alert('Google login failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setIsFacebookLoading(true);
    
    try {
      // Simulate Facebook OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful Facebook login
      const userData = {
        name: 'Carlos Rodriguez',
        email: 'carlos.rodriguez@facebook.com',
        id: 'facebook_' + Date.now(),
        provider: 'facebook'
      };

      // Store auth state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userEmail', userData.email);

      // Dispatch auth state change event
      window.dispatchEvent(new CustomEvent('authStateChanged', {
        detail: { isAuthenticated: true, userName: userData.name }
      }));

      onSuccess && onSuccess(userData);
    } catch (error) {
      console.error('Facebook login failed:', error);
      alert('Facebook login failed. Please try again.');
    } finally {
      setIsFacebookLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-secondary">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Google Login */}
        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          loading={isGoogleLoading}
          disabled={isGoogleLoading || isFacebookLoading}
          className="h-12 justify-center"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>{isGoogleLoading ? 'Connecting...' : 'Google'}</span>
          </div>
        </Button>

        {/* Facebook Login */}
        <Button
          variant="outline"
          onClick={handleFacebookLogin}
          loading={isFacebookLoading}
          disabled={isGoogleLoading || isFacebookLoading}
          className="h-12 justify-center"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>{isFacebookLoading ? 'Connecting...' : 'Facebook'}</span>
          </div>
        </Button>
      </div>

      {/* Social Login Info */}
      <div className="text-center">
        <p className="text-xs text-text-muted">
          By signing in with social media, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;