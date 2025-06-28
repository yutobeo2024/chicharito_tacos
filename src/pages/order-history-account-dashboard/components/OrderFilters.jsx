import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderFilters = ({ onFiltersChange, totalOrders }) => {
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    minAmount: '',
    maxAmount: '',
    searchQuery: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'on the way', label: 'On the Way' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'lastyear', label: 'Last Year' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: 'all',
      dateRange: 'all',
      minAmount: '',
      maxAmount: '',
      searchQuery: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = filters.status !== 'all' || 
                          filters.dateRange !== 'all' || 
                          filters.minAmount || 
                          filters.maxAmount || 
                          filters.searchQuery;

  return (
    <div className="bg-background border border-border rounded-lg p-4 mb-6">
      {/* Search Bar */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1 relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
          />
          <Input
            type="search"
            placeholder="Search orders by item name or order number..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "Filter"}
          iconPosition="left"
        >
          {isExpanded ? 'Hide Filters' : 'Filters'}
        </Button>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Order Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {dateRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Amount Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Min Amount
              </label>
              <Input
                type="number"
                placeholder="$0.00"
                value={filters.minAmount}
                onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            {/* Max Amount Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Max Amount
              </label>
              <Input
                type="number"
                placeholder="$999.99"
                value={filters.maxAmount}
                onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              {totalOrders} order{totalOrders !== 1 ? 's' : ''} found
            </div>
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && !isExpanded && (
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-sm text-text-secondary">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {filters.status !== 'all' && (
              <span className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                Status: {statusOptions.find(opt => opt.value === filters.status)?.label}
              </span>
            )}
            {filters.dateRange !== 'all' && (
              <span className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}
              </span>
            )}
            {filters.minAmount && (
              <span className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                Min: ${filters.minAmount}
              </span>
            )}
            {filters.maxAmount && (
              <span className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                Max: ${filters.maxAmount}
              </span>
            )}
            {filters.searchQuery && (
              <span className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                Search: "{filters.searchQuery}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;