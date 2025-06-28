import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ currentSort, onSortChange, resultCount, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { id: 'popularity', label: 'Most Popular', icon: 'TrendingUp' },
    { id: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { id: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { id: 'name-asc', label: 'Name: A to Z', icon: 'ArrowUp' },
    { id: 'name-desc', label: 'Name: Z to A', icon: 'ArrowDown' },
    { id: 'rating', label: 'Highest Rated', icon: 'Star' },
    { id: 'newest', label: 'Newest First', icon: 'Clock' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentSortOption = sortOptions.find(option => option.id === currentSort) || sortOptions[0];

  const handleSortSelect = (sortId) => {
    onSortChange(sortId);
    setIsOpen(false);
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Results Count */}
      <div className="text-sm text-text-secondary">
        {resultCount > 0 ? (
          <span>
            Showing <span className="font-medium text-text-primary">{resultCount}</span> taco{resultCount !== 1 ? 's' : ''}
          </span>
        ) : (
          <span>No tacos found</span>
        )}
      </div>

      {/* Sort Dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-surface hover:bg-surface-200 border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <Icon name={currentSortOption.icon} size={16} />
          <span>Sort by: {currentSortOption.label}</span>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-56 bg-background border border-border rounded-lg shadow-lg z-50">
            <div className="py-1">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSortSelect(option.id)}
                  className={`w-full text-left px-4 py-3 hover:bg-surface transition-colors duration-200 ${
                    option.id === currentSort ? 'bg-primary-50 text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={option.icon} 
                      size={16} 
                      className={option.id === currentSort ? 'text-primary' : 'text-text-muted'}
                    />
                    <span className="text-sm">{option.label}</span>
                    {option.id === currentSort && (
                      <Icon name="Check" size={16} className="text-primary ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;