import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ categories, activeCategory, onCategoryChange, className = '' }) => {
  const handleCategoryClick = (category) => {
    onCategoryChange(category === activeCategory ? 'all' : category);
  };

  return (
    <div className={`flex items-center space-x-2 overflow-x-auto pb-2 ${className}`}>
      <div className="flex items-center space-x-2 min-w-max">
        {/* All Categories Chip */}
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
            activeCategory === 'all' ?'bg-primary text-primary-foreground shadow-sm' :'bg-surface text-text-secondary hover:bg-surface-200 hover:text-text-primary'
          }`}
        >
          All Tacos
        </button>

        {/* Category Chips */}
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-surface text-text-secondary hover:bg-surface-200 hover:text-text-primary'
              }`}
            >
              {category.icon && (
                <Icon 
                  name={category.icon} 
                  size={16} 
                  className={isActive ? 'text-primary-foreground' : 'text-text-muted'}
                />
              )}
              <span>{category.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isActive 
                  ? 'bg-primary-600 text-primary-foreground' 
                  : 'bg-surface-300 text-text-muted'
              }`}>
                {category.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterChips;