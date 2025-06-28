import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const CustomizationPanel = ({ onCustomizationChange }) => {
  const [spiceLevel, setSpiceLevel] = useState('medium');
  const [addOns, setAddOns] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const spiceLevels = [
    { id: 'mild', label: 'Mild', icon: '🌶️', description: 'Perfect for sensitive palates' },
    { id: 'medium', label: 'Medium', icon: '🌶️🌶️', description: 'Just the right kick' },
    { id: 'hot', label: 'Hot', icon: '🌶️🌶️🌶️', description: 'For spice lovers' },
    { id: 'extra-hot', label: 'Extra Hot', icon: '🌶️🌶️🌶️🌶️', description: 'Proceed with caution!' }
  ];

  const availableAddOns = [
    { id: 'extra-cheese', label: 'Extra Cheese', price: 1.50 },
    { id: 'guacamole', label: 'Guacamole', price: 2.00 },
    { id: 'sour-cream', label: 'Sour Cream', price: 1.00 },
    { id: 'extra-meat', label: 'Extra Meat', price: 3.00 },
    { id: 'black-beans', label: 'Black Beans', price: 1.25 },
    { id: 'corn', label: 'Corn', price: 0.75 }
  ];

  const handleSpiceLevelChange = (level) => {
    setSpiceLevel(level);
    updateCustomization({ spiceLevel: level, addOns, specialInstructions });
  };

  const handleAddOnToggle = (addOnId) => {
    const updatedAddOns = addOns.includes(addOnId)
      ? addOns.filter(id => id !== addOnId)
      : [...addOns, addOnId];
    
    setAddOns(updatedAddOns);
    updateCustomization({ spiceLevel, addOns: updatedAddOns, specialInstructions });
  };

  const handleSpecialInstructionsChange = (e) => {
    const instructions = e.target.value;
    setSpecialInstructions(instructions);
    updateCustomization({ spiceLevel, addOns, specialInstructions: instructions });
  };

  const updateCustomization = (customization) => {
    const addOnDetails = customization.addOns.map(id => 
      availableAddOns.find(addon => addon.id === id)
    );
    const totalAddOnPrice = addOnDetails.reduce((sum, addon) => sum + addon.price, 0);
    
    onCustomizationChange({
      ...customization,
      addOnDetails,
      totalAddOnPrice
    });
  };

  const calculateAddOnTotal = () => {
    return addOns.reduce((total, addOnId) => {
      const addOn = availableAddOns.find(addon => addon.id === addOnId);
      return total + (addOn ? addOn.price : 0);
    }, 0);
  };

  return (
    <div className="space-y-6 p-4 bg-surface rounded-lg">
      <h3 className="text-lg font-heading font-semibold text-text-primary">
        Customize Your Order
      </h3>

      {/* Spice Level Selection */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary flex items-center space-x-2">
          <Icon name="Flame" size={18} className="text-primary" />
          <span>Spice Level</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {spiceLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => handleSpiceLevelChange(level.id)}
              className={`p-3 rounded-lg border-2 text-left transition-colors duration-200 ${
                spiceLevel === level.id
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary/50 text-text-secondary'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">{level.icon}</span>
                <span className="font-medium">{level.label}</span>
              </div>
              <p className="text-xs opacity-80">{level.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Add-ons Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-text-primary flex items-center space-x-2">
            <Icon name="Plus" size={18} className="text-primary" />
            <span>Add-ons</span>
          </h4>
          {addOns.length > 0 && (
            <span className="text-sm font-medium text-primary">
              +${calculateAddOnTotal().toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {availableAddOns.map((addOn) => (
            <button
              key={addOn.id}
              onClick={() => handleAddOnToggle(addOn.id)}
              className={`p-3 rounded-lg border-2 text-left transition-colors duration-200 ${
                addOns.includes(addOn.id)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary/50 text-text-secondary'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{addOn.label}</span>
                <span className="text-sm">+${addOn.price.toFixed(2)}</span>
              </div>
              {addOns.includes(addOn.id) && (
                <Icon name="Check" size={16} className="mt-1 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Special Instructions */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary flex items-center space-x-2">
          <Icon name="MessageSquare" size={18} className="text-primary" />
          <span>Special Instructions</span>
        </h4>
        <textarea
          value={specialInstructions}
          onChange={handleSpecialInstructionsChange}
          placeholder="Any special requests or dietary restrictions?"
          className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary bg-background"
          rows={3}
          maxLength={200}
        />
        <div className="text-xs text-text-muted text-right">
          {specialInstructions.length}/200 characters
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;