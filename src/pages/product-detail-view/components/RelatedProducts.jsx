import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products, currentProductId }) => {
  const filteredProducts = products.filter(product => product.id !== currentProductId);

  const handleQuickAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Simulate adding to cart
    const cartEvent = new CustomEvent('cartUpdated', {
      detail: { 
        count: parseInt(localStorage.getItem('cartItemCount') || '0') + 1,
        product: product
      }
    });
    window.dispatchEvent(cartEvent);
    
    // Update localStorage
    const currentCount = parseInt(localStorage.getItem('cartItemCount') || '0');
    localStorage.setItem('cartItemCount', (currentCount + 1).toString());
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < Math.floor(rating) ? "text-warning fill-current" : "text-border"}
      />
    ));
  };

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-heading font-semibold text-text-primary">
        You Might Also Like
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.slice(0, 6).map((product) => (
          <Link
            key={product.id}
            to={`/product-detail-view?id=${product.id}`}
            className="group bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              
              {/* Quick Add Button */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                <Button
                  variant="primary"
                  onClick={(e) => handleQuickAdd(product, e)}
                  iconName="Plus"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform scale-90 group-hover:scale-100"
                >
                  Quick Add
                </Button>
              </div>
              
              {/* Price Badge */}
              <div className="absolute top-2 right-2 bg-background/90 px-2 py-1 rounded-full">
                <span className="text-sm font-semibold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="p-4 space-y-2">
              <h4 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {product.name}
              </h4>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs text-text-muted">
                  ({product.reviewCount})
                </span>
              </div>
              
              <p className="text-sm text-text-secondary line-clamp-2">
                {product.shortDescription}
              </p>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs px-2 py-1 bg-primary-50 text-primary rounded-full">
                  {product.category}
                </span>
                
                {product.isPopular && (
                  <div className="flex items-center space-x-1 text-xs text-warning">
                    <Icon name="TrendingUp" size={12} />
                    <span>Popular</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="text-center pt-4">
        <Link to="/product-catalog-browse">
          <Button variant="outline" iconName="ArrowRight" iconPosition="right">
            View All Products
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;