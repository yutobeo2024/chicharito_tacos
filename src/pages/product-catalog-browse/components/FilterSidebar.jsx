import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  dietaryFilters,
  onDietaryFilterChange,
  onClearFilters,
  className = ''
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    dietary: true,
    rating: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const priceRanges = [
    { id: 'all', label: 'All Prices', min: 0, max: 100 },
    { id: 'budget', label: 'Under $10', min: 0, max: 10 },
    { id: 'mid', label: '$10 - $15', min: 10, max: 15 },
    { id: 'premium', label: '$15 - $20', min: 15, max: 20 },
    { id: 'luxury', label: '$20+', min: 20, max: 100 }
  ];

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', icon: 'Leaf' },
    { id: 'vegan', label: 'Vegan', icon: 'Leaf' },
    { id: 'gluten-free', label: 'Gluten Free', icon: 'Shield' },
    { id: 'spicy', label: 'Spicy', icon: 'Flame' },
    { id: 'mild', label: 'Mild', icon: 'Droplets' }
  ];

  const ratingOptions = [
    { id: '4+', label: '4+ Stars', value: 4 },
    { id: '3+', label: '3+ Stars', value: 3 },
    { id: '2+', label: '2+ Stars', value: 2 },
    { id: '1+', label: '1+ Stars', value: 1 }
  ];

  const hasActiveFilters = activeCategory !== 'all' || 
                          priceRange !== 'all' || 
                          dietaryFilters.length > 0;

  const SectionHeader = ({ title, section, count }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between py-3 text-left"
    >
      <div className="flex items-center space-x-2">
        <h3 className="font-medium text-text-primary">{title}</h3>
        {count > 0 && (
          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            {count}
          </span>
        )}
      </div>
      <Icon 
        name="ChevronDown" 
        size={16} 
        className={`text-text-muted transition-transform duration-200 ${
          expandedSections[section] ? 'rotate-180' : ''
        }`}
      />
    </button>
  );

  return (
    <div className={`bg-background border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            className="text-sm"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="border-b border-border-muted pb-4 mb-4">
        <SectionHeader 
          title="Categories" 
          section="categories" 
          count={activeCategory !== 'all' ? 1 : 0}
        />
        
        {expandedSections.categories && (
          <div className="space-y-2 mt-2">
            <button
              onClick={() => onCategoryChange('all')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                activeCategory === 'all' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              All Categories
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {category.icon && (
                      <Icon name={category.icon} size={16} />
                    )}
                    <span>{category.name}</span>
                  </div>
                  <span className="text-xs opacity-75">({category.count})</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b border-border-muted pb-4 mb-4">
        <SectionHeader 
          title="Price Range" 
          section="price" 
          count={priceRange !== 'all' ? 1 : 0}
        />
        
        {expandedSections.price && (
          <div className="space-y-2 mt-2">
            {priceRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => onPriceRangeChange(range.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  priceRange === range.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dietary Preferences */}
      <div className="border-b border-border-muted pb-4 mb-4">
        <SectionHeader 
          title="Dietary" 
          section="dietary" 
          count={dietaryFilters.length}
        />
        
        {expandedSections.dietary && (
          <div className="space-y-2 mt-2">
            {dietaryOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onDietaryFilterChange(option.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  dietaryFilters.includes(option.id)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={option.icon} size={16} />
                  <span>{option.label}</span>
                  {dietaryFilters.includes(option.id) && (
                    <Icon name="Check" size={16} className="ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div>
        <SectionHeader title="Rating" section="rating" count={0} />
        
        {expandedSections.rating && (
          <div className="space-y-2 mt-2">
            {ratingOptions.map((option) => (
              <button
                key={option.id}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < option.value ? 'text-warning fill-current' : 'text-border'}
                      />
                    ))}
                  </div>
                  <span>& up</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;