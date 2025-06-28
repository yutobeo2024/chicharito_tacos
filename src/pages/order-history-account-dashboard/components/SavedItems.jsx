import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SavedItems = () => {
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      name: "Carnitas Taco",
      description: "Slow-cooked pork with onions, cilantro, and salsa verde",
      price: 3.50,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      category: "Tacos",
      isAvailable: true,
      savedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Chicken Quesadilla",
      description: "Grilled chicken with melted cheese in a crispy tortilla",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop",
      category: "Quesadillas",
      isAvailable: true,
      savedDate: "2024-01-12"
    },
    {
      id: 3,
      name: "Spicy Beef Burrito",
      description: "Seasoned beef with rice, beans, cheese, and hot sauce",
      price: 9.50,
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop",
      category: "Burritos",
      isAvailable: false,
      savedDate: "2024-01-10"
    },
    {
      id: 4,
      name: "Fish Taco Special",
      description: "Grilled fish with cabbage slaw and chipotle mayo",
      price: 4.25,
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
      category: "Tacos",
      isAvailable: true,
      savedDate: "2024-01-08"
    },
    {
      id: 5,
      name: "Veggie Bowl",
      description: "Fresh vegetables, black beans, rice, and avocado",
      price: 7.75,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      category: "Bowls",
      isAvailable: true,
      savedDate: "2024-01-05"
    }
  ]);

  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = ['all', 'Tacos', 'Quesadillas', 'Burritos', 'Bowls'];

  const handleRemoveItem = (itemId) => {
    setSavedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleAddToCart = (item) => {
    // Simulate adding to cart
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(currentCart));
    
    // Update cart count
    const totalItems = currentCart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartItemCount', totalItems.toString());
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { count: totalItems }
    }));
  };

  const filteredAndSortedItems = savedItems
    .filter(item => filterCategory === 'all' || item.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.savedDate) - new Date(a.savedDate);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const formatSavedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (savedItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Heart" size={32} className="text-text-muted" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">No Saved Items</h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Start saving your favorite items to easily reorder them later. Browse our menu to find delicious tacos and more!
        </p>
        <Link to="/product-catalog-browse">
          <Button variant="primary" iconName="ChefHat" iconPosition="left">
            Browse Menu
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="recent">Recently Saved</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-text-secondary">
          {filteredAndSortedItems.length} saved item{filteredAndSortedItems.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Saved Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedItems.map((item) => (
          <div key={item.id} className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Item Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              
              {!item.isAvailable && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-medium">Currently Unavailable</span>
                </div>
              )}

              {/* Remove from Saved */}
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-background bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
                aria-label="Remove from saved items"
              >
                <Icon name="Heart" size={16} className="text-error fill-current" />
              </button>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-background bg-opacity-90 text-text-primary text-xs font-medium rounded-full">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Item Details */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-text-primary">{item.name}</h3>
                <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
              </div>

              <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center justify-between text-xs text-text-muted mb-4">
                <span>Saved {formatSavedDate(item.savedDate)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.isAvailable}
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
                </Button>
                
                <Link to={`/product-detail-view?id=${item.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for Filtered Results */}
      {filteredAndSortedItems.length === 0 && savedItems.length > 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">No items found</h3>
          <p className="text-text-secondary">
            Try adjusting your filters to see more saved items.
          </p>
        </div>
      )}
    </div>
  );
};

export default SavedItems;