import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15"
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isDefault: true
    },
    {
      id: 2,
      type: "Work",
      address: "456 Business Ave, Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      isDefault: false
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Visa",
      lastFour: "4242",
      expiryDate: "12/25",
      isDefault: true
    },
    {
      id: 2,
      type: "Mastercard",
      lastFour: "8888",
      expiryDate: "08/26",
      isDefault: false
    }
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // Simulate API call
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleSetDefaultAddress = (addressId) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const handleSetDefaultPayment = (paymentId) => {
    setPaymentMethods(prev => prev.map(payment => ({
      ...payment,
      isDefault: payment.id === paymentId
    })));
  };

  const handleDeletePayment = (paymentId) => {
    setPaymentMethods(prev => prev.filter(payment => payment.id !== paymentId));
  };

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="bg-background border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Personal Information</h3>
          <Button
            variant={isEditing ? "success" : "outline"}
            size="sm"
            onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
            iconName={isEditing ? "Check" : "Edit"}
            iconPosition="left"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              First Name
            </label>
            <Input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={!isEditing}
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Last Name
            </label>
            <Input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={!isEditing}
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Date of Birth
            </label>
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Delivery Addresses */}
      <div className="bg-background border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Delivery Addresses</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            Add Address
          </Button>
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-text-primary">{address.type}</span>
                    {address.isDefault && (
                      <span className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm">
                    {address.address}
                  </p>
                  <p className="text-text-secondary text-sm">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {!address.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetDefaultAddress(address.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => handleDeleteAddress(address.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-background border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Payment Methods</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            Add Payment Method
          </Button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((payment) => (
            <div key={payment.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-8 bg-surface rounded flex items-center justify-center">
                    <Icon name="CreditCard" size={16} className="text-text-secondary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-text-primary">
                        {payment.type} •••• {payment.lastFour}
                      </span>
                      {payment.isDefault && (
                        <span className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary text-sm">
                      Expires {payment.expiryDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!payment.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetDefaultPayment(payment.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => handleDeletePayment(payment.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;