import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await onAddToCart(product, quantity);
    setIsAdding(false);
    setShowQuantitySelector(false);
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="StarHalf" size={14} className="text-warning fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-border" />
      );
    }

    return stars;
  };

  const renderDietaryIcons = (dietary) => {
    return (
      <div className="flex items-center space-x-1">
        {dietary.includes('vegan') && (
          <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center" title="Vegan">
            <span className="text-xs text-accent-foreground font-bold">V</span>
          </div>
        )}
        {dietary.includes('vegetarian') && !dietary.includes('vegan') && (
          <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center" title="Vegetarian">
            <Icon name="Leaf" size={12} className="text-success-foreground" />
          </div>
        )}
        {dietary.includes('gluten-free') && (
          <div className="w-5 h-5 bg-warning rounded-full flex items-center justify-center" title="Gluten Free">
            <span className="text-xs text-warning-foreground font-bold">GF</span>
          </div>
        )}
        {dietary.includes('spicy') && (
          <div className="w-5 h-5 bg-error rounded-full flex items-center justify-center" title="Spicy">
            <Icon name="Flame" size={12} className="text-error-foreground" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className="bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group"
      onMouseEnter={() => setShowQuantitySelector(true)}
      onMouseLeave={() => setShowQuantitySelector(false)}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <Link to={`/product-detail-view/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </Link>
        
        {/* Dietary Icons Overlay */}
        <div className="absolute top-2 left-2">
          {renderDietaryIcons(product.dietary)}
        </div>

        {/* Price Badge */}
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-lg text-sm font-semibold">
          ${product.price.toFixed(2)}
        </div>

        {/* Quick Add Button - Desktop Only */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:flex items-center justify-center">
          <Button
            variant="primary"
            onClick={() => setShowQuantitySelector(true)}
            iconName="Plus"
            iconPosition="left"
            className="transform scale-95 group-hover:scale-100 transition-transform duration-200"
          >
            Quick Add
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product-detail-view/${product.id}`}>
          <h3 className="font-semibold text-text-primary mb-1 hover:text-primary transition-colors duration-200 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-text-secondary mb-2 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {renderRatingStars(product.rating)}
          </div>
          <span className="text-xs text-text-muted">({product.reviewCount})</span>
        </div>

        {/* Quantity Selector - Mobile Always Visible, Desktop on Hover */}
        <div className={`transition-all duration-200 ${showQuantitySelector || window.innerWidth < 768 ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary">Quantity:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Icon name="Minus" size={14} />
              </button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Icon name="Plus" size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="primary"
          onClick={handleAddToCart}
          loading={isAdding}
          disabled={isAdding}
          iconName="ShoppingCart"
          iconPosition="left"
          fullWidth
          className="text-sm"
        >
          {isAdding ? 'Adding...' : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;