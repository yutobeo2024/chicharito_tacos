import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DeliveryForm = ({ onFormChange, formData, onNext }) => {
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addressSuggestions = [
    "123 Main Street, Austin, TX 78701",
    "456 Oak Avenue, Austin, TX 78702",
    "789 Pine Road, Austin, TX 78703",
    "321 Elm Street, Austin, TX 78704",
    "654 Cedar Lane, Austin, TX 78705"
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city?.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.zipCode?.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    // Format phone number
    if (field === 'phone') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 10) {
        if (digits.length >= 6) {
          formattedValue = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        } else if (digits.length >= 3) {
          formattedValue = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        } else {
          formattedValue = digits;
        }
      } else {
        return; // Don't allow more than 10 digits
      }
    }
    
    // Format ZIP code
    if (field === 'zipCode') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 9) {
        if (digits.length > 5) {
          formattedValue = `${digits.slice(0, 5)}-${digits.slice(5)}`;
        } else {
          formattedValue = digits;
        }
      } else {
        return;
      }
    }

    onFormChange(field, formattedValue);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Show address suggestions
    if (field === 'address' && value.length > 2) {
      const filtered = addressSuggestions.filter(addr => 
        addr.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else if (field === 'address') {
      setShowSuggestions(false);
    }
  };

  const handleAddressSuggestionClick = (suggestion) => {
    const parts = suggestion.split(', ');
    onFormChange('address', parts[0]);
    if (parts[1]) onFormChange('city', parts[1]);
    if (parts[2]) {
      const stateParts = parts[2].split(' ');
      onFormChange('state', stateParts[0]);
      if (stateParts[1]) onFormChange('zipCode', stateParts[1]);
    }
    setShowSuggestions(false);
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="MapPin" size={16} color="white" />
        </div>
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Delivery Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Full Name *
          </label>
          <Input
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={errors.fullName ? 'border-error' : ''}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-error">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Phone Number *
          </label>
          <Input
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={errors.phone ? 'border-error' : ''}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-error">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>

        <div className="md:col-span-2 relative">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Street Address *
          </label>
          <Input
            type="text"
            placeholder="123 Main Street, Apt 4B"
            value={formData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className={errors.address ? 'border-error' : ''}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-error">{errors.address}</p>
          )}
          
          {showSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleAddressSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-2 hover:bg-surface transition-colors duration-200 text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            City *
          </label>
          <Input
            type="text"
            placeholder="Austin"
            value={formData.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={errors.city ? 'border-error' : ''}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-error">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            State
          </label>
          <select
            value={formData.state || 'TX'}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="TX">Texas</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="FL">Florida</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            ZIP Code *
          </label>
          <Input
            type="text"
            placeholder="78701"
            value={formData.zipCode || ''}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            className={errors.zipCode ? 'border-error' : ''}
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-error">{errors.zipCode}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Delivery Instructions (Optional)
          </label>
          <textarea
            placeholder="Leave at door, ring doorbell, etc."
            value={formData.instructions || ''}
            onChange={(e) => handleInputChange('instructions', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          variant="primary"
          onClick={handleNext}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default DeliveryForm;