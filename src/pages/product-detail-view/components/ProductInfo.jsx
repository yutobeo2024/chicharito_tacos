import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductInfo = ({ product }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? "Star" : "Star"}
        size={16}
        className={index < Math.floor(rating) ? "text-warning fill-current" : "text-border"}
      />
    ));
  };

  const infoSections = [
    {
      id: 'description',
      title: 'Description',
      icon: 'FileText',
      content: product.description
    },
    {
      id: 'ingredients',
      title: 'Ingredients',
      icon: 'List',
      content: product.ingredients
    },
    {
      id: 'nutrition',
      title: 'Nutritional Information',
      icon: 'Activity',
      content: product.nutrition
    }
  ];

  return (
    <div className="space-y-6">
      {/* Product Title and Price */}
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
          {product.name}
        </h1>
        <div className="flex items-center justify-between">
          <div className="text-2xl lg:text-3xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </div>
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="text-lg text-text-muted line-through">
              ${product.originalPrice.toFixed(2)}
            </div>
          )}
        </div>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(product.rating)}
          <span className="text-sm font-medium text-text-primary ml-2">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <span className="text-sm text-text-secondary">
          ({product.reviewCount} reviews)
        </span>
      </div>

      {/* Availability Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${
          product.inStock ? 'bg-success' : 'bg-error'
        }`} />
        <span className={`text-sm font-medium ${
          product.inStock ? 'text-success' : 'text-error'
        }`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
        {product.inStock && product.stockCount && product.stockCount < 10 && (
          <span className="text-sm text-warning">
            Only {product.stockCount} left!
          </span>
        )}
      </div>

      {/* Category and Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-3 py-1 bg-primary-50 text-primary text-sm rounded-full">
          {product.category}
        </span>
        {product.tags && product.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Expandable Information Sections */}
      <div className="space-y-3">
        {infoSections.map((section) => (
          <div key={section.id} className="border border-border rounded-lg">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-surface transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Icon name={section.icon} size={20} className="text-primary" />
                <span className="font-medium text-text-primary">
                  {section.title}
                </span>
              </div>
              <Icon
                name="ChevronDown"
                size={20}
                className={`text-text-secondary transition-transform duration-200 ${
                  expandedSection === section.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSection === section.id && (
              <div className="px-4 pb-4">
                <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;