import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  return (
    <div className="text-center py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Empty Cart Illustration */}
        <div className="w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop"
            alt="Delicious tacos waiting for you"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Empty State Content */}
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary-50 rounded-full flex items-center justify-center mb-4">
            <Icon name="ShoppingCart" size={32} color="var(--color-primary)" />
          </div>
          
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            Your cart is empty
          </h2>
          
          <p className="text-text-secondary max-w-sm mx-auto leading-relaxed">
            Looks like you haven't added any delicious tacos to your cart yet. 
            Browse our menu and discover authentic Mexican flavors!
          </p>
          
          {/* Call to Action */}
          <div className="pt-4">
            <Link to="/product-catalog-browse">
              <Button
                variant="primary"
                iconName="ChefHat"
                iconPosition="left"
                className="px-8 py-3"
              >
                Browse Menu
              </Button>
            </Link>
          </div>
          
          {/* Additional Actions */}
          <div className="pt-6 space-y-3">
            <p className="text-sm text-text-muted">
              Or explore our popular items
            </p>
            
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/product-catalog-browse?category=tacos"
                className="px-4 py-2 text-sm text-primary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
              >
                Tacos
              </Link>
              <Link
                to="/product-catalog-browse?category=burritos"
                className="px-4 py-2 text-sm text-primary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
              >
                Burritos
              </Link>
              <Link
                to="/product-catalog-browse?category=sides"
                className="px-4 py-2 text-sm text-primary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
              >
                Sides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;