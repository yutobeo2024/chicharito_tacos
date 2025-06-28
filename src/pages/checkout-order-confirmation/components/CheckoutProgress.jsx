import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: 'Cart', icon: 'ShoppingCart' },
    { id: 2, label: 'Checkout', icon: 'CreditCard' },
    { id: 3, label: 'Confirmation', icon: 'CheckCircle' }
  ];

  return (
    <div className="w-full bg-surface py-4 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-200 ${
                    step.id <= currentStep
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-background border-border text-text-muted'
                  }`}
                >
                  <Icon 
                    name={step.icon} 
                    size={16} 
                    color={step.id <= currentStep ? 'white' : 'currentColor'} 
                  />
                </div>
                <span
                  className={`ml-2 text-sm font-medium hidden sm:inline ${
                    step.id <= currentStep ? 'text-primary' : 'text-text-muted'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-colors duration-200 ${
                    step.id < currentStep ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgress;