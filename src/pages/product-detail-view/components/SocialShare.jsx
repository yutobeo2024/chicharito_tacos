import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialShare = ({ product, className = '' }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const currentUrl = window.location.href;
  const shareText = `Check out this delicious ${product.name} from Chicharito Tacos!`;

  const shareOptions = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: 'text-blue-600'
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
      color: 'text-blue-400'
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`,
      color: 'text-green-600'
    },
    {
      name: 'Email',
      icon: 'Mail',
      url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareText + '\n\n' + currentUrl)}`,
      color: 'text-gray-600'
    }
  ];

  const handleShare = (option) => {
    if (option.name === 'Copy Link') {
      handleCopyLink();
    } else {
      window.open(option.url, '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: currentUrl
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled');
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={handleNativeShare}
        iconName="Share2"
        iconPosition="left"
        className="w-full sm:w-auto"
      >
        Share
      </Button>

      {/* Share Menu */}
      {showShareMenu && (
        <>
          <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
            <div className="py-2">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleShare(option)}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-surface transition-colors duration-200"
                >
                  <Icon name={option.icon} size={18} className={option.color} />
                  <span className="text-text-primary">{option.name}</span>
                </button>
              ))}
              
              <div className="border-t border-border my-1" />
              
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-surface transition-colors duration-200"
              >
                <Icon 
                  name={copySuccess ? "Check" : "Copy"} 
                  size={18} 
                  className={copySuccess ? "text-success" : "text-text-secondary"} 
                />
                <span className={copySuccess ? "text-success" : "text-text-primary"}>
                  {copySuccess ? "Copied!" : "Copy Link"}
                </span>
              </button>
            </div>
          </div>

          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowShareMenu(false)}
          />
        </>
      )}
    </div>
  );
};

export default SocialShare;