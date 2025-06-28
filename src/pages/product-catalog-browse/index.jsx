import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import FilterSidebar from './components/FilterSidebar';
import SortDropdown from './components/SortDropdown';
import ProductGrid from './components/ProductGrid';

import Button from '../../components/ui/Button';

const ProductCatalogBrowse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState('all');
  const [dietaryFilters, setDietaryFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Mock data for products
  const mockProducts = [
    {
      id: 1,
      name: "Classic Carnitas Taco",
      description: "Slow-cooked pork shoulder with onions, cilantro, and lime on corn tortilla",
      price: 12.99,
      image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg",
      category: "meat",
      dietary: ["gluten-free"],
      rating: 4.8,
      reviewCount: 124,
      popularity: 95
    },
    {
      id: 2,
      name: "Spicy Chicken Tinga",
      description: "Shredded chicken in chipotle tomato sauce with avocado and queso fresco",
      price: 11.99,
      image: "https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg",
      category: "meat",
      dietary: ["spicy", "gluten-free"],
      rating: 4.6,
      reviewCount: 89,
      popularity: 88
    },
    {
      id: 3,
      name: "Vegetarian Black Bean",
      description: "Seasoned black beans with roasted peppers, corn, and fresh salsa verde",
      price: 9.99,
      image: "https://images.pexels.com/photos/5737241/pexels-photo-5737241.jpeg",
      category: "vegetarian",
      dietary: ["vegetarian", "vegan", "gluten-free"],
      rating: 4.4,
      reviewCount: 67,
      popularity: 75
    },
    {
      id: 4,
      name: "Fish Tacos Baja Style",
      description: "Beer-battered white fish with cabbage slaw and chipotle mayo",
      price: 14.99,
      image: "https://images.pexels.com/photos/6896379/pexels-photo-6896379.jpeg",
      category: "seafood",
      dietary: ["mild"],
      rating: 4.7,
      reviewCount: 156,
      popularity: 92
    },
    {
      id: 5,
      name: "Al Pastor Premium",
      description: "Marinated pork with pineapple, onions, and cilantro on handmade tortillas",
      price: 15.99,
      image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg",
      category: "premium",
      dietary: ["spicy"],
      rating: 4.9,
      reviewCount: 203,
      popularity: 98
    },
    {
      id: 6,
      name: "Grilled Shrimp Deluxe",
      description: "Grilled shrimp with mango salsa, avocado, and lime crema",
      price: 16.99,
      image: "https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg",
      category: "seafood",
      dietary: ["mild", "gluten-free"],
      rating: 4.5,
      reviewCount: 78,
      popularity: 82
    },
    {
      id: 7,
      name: "Mushroom & Quinoa",
      description: "Sautéed mushrooms with quinoa, spinach, and cashew cream sauce",
      price: 10.99,
      image: "https://images.pexels.com/photos/5737241/pexels-photo-5737241.jpeg",
      category: "vegetarian",
      dietary: ["vegetarian", "vegan", "gluten-free"],
      rating: 4.3,
      reviewCount: 45,
      popularity: 68
    },
    {
      id: 8,
      name: "Carne Asada Supreme",
      description: "Grilled steak with guacamole, pico de gallo, and queso fresco",
      price: 17.99,
      image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg",
      category: "premium",
      dietary: ["spicy", "gluten-free"],
      rating: 4.8,
      reviewCount: 187,
      popularity: 96
    }
  ];

  // Mock categories
  const categories = [
    { id: 'meat', name: 'Meat', icon: 'Beef', count: 3 },
    { id: 'seafood', name: 'Seafood', icon: 'Fish', count: 2 },
    { id: 'vegetarian', name: 'Vegetarian', icon: 'Leaf', count: 2 },
    { id: 'premium', name: 'Premium', icon: 'Crown', count: 2 }
  ];

  // Search suggestions
  const searchSuggestions = [
    "Carnitas", "Chicken", "Fish", "Vegetarian", "Spicy", "Al Pastor", 
    "Shrimp", "Mushroom", "Carne Asada", "Black Bean"
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const ranges = {
        'budget': { min: 0, max: 10 },
        'mid': { min: 10, max: 15 },
        'premium': { min: 15, max: 20 },
        'luxury': { min: 20, max: 100 }
      };
      const range = ranges[priceRange];
      if (range) {
        filtered = filtered.filter(product => 
          product.price >= range.min && product.price <= range.max
        );
      }
    }

    // Filter by dietary preferences
    if (dietaryFilters.length > 0) {
      filtered = filtered.filter(product =>
        dietaryFilters.every(filter => product.dietary.includes(filter))
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        case 'popularity':
        default:
          return b.popularity - a.popularity;
      }
    });

    return filtered;
  }, [searchTerm, activeCategory, sortBy, priceRange, dietaryFilters]);

  const handleAddToCart = async (product, quantity) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get current cart count
    const currentCount = parseInt(localStorage.getItem('cartItemCount') || '0');
    const newCount = currentCount + quantity;
    
    // Update cart count
    localStorage.setItem('cartItemCount', newCount.toString());
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { count: newCount, product, quantity }
    }));
    
    setLoading(false);
  };

  const handleDietaryFilterChange = (filterId) => {
    setDietaryFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleClearFilters = () => {
    setActiveCategory('all');
    setPriceRange('all');
    setDietaryFilters([]);
    setSearchTerm('');
  };

  return (
    <>
      <Helmet>
        <title>Menu - Chicharito Tacos | Authentic Mexican Flavors</title>
        <meta name="description" content="Browse our delicious selection of authentic Mexican tacos. From classic carnitas to premium carne asada, find your perfect taco today." />
        <meta name="keywords" content="tacos, mexican food, carnitas, al pastor, vegetarian tacos, seafood tacos" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16 lg:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">
                Our Taco Menu
              </h1>
              <p className="text-text-secondary text-lg">
                Discover authentic Mexican flavors crafted with fresh ingredients
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar
                onSearch={setSearchTerm}
                suggestions={searchSuggestions}
                className="max-w-md"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                iconName="Filter"
                iconPosition="left"
                fullWidth
              >
                Filters & Sort
              </Button>
            </div>

            {/* Mobile Filters Overlay */}
            {showMobileFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
                <div className="absolute right-0 top-0 h-full w-80 bg-background overflow-y-auto">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Filters</h2>
                      <Button
                        variant="ghost"
                        onClick={() => setShowMobileFilters(false)}
                        iconName="X"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <FilterSidebar
                      categories={categories}
                      activeCategory={activeCategory}
                      onCategoryChange={setActiveCategory}
                      priceRange={priceRange}
                      onPriceRangeChange={setPriceRange}
                      dietaryFilters={dietaryFilters}
                      onDietaryFilterChange={handleDietaryFilterChange}
                      onClearFilters={handleClearFilters}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Filter Chips - Mobile */}
            <div className="lg:hidden mb-6">
              <FilterChips
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            <div className="flex gap-8">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-80 flex-shrink-0">
                <FilterSidebar
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  dietaryFilters={dietaryFilters}
                  onDietaryFilterChange={handleDietaryFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </aside>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Sort Controls */}
                <div className="mb-6">
                  <SortDropdown
                    currentSort={sortBy}
                    onSortChange={setSortBy}
                    resultCount={filteredAndSortedProducts.length}
                  />
                </div>

                {/* Product Grid */}
                <ProductGrid
                  products={filteredAndSortedProducts}
                  onAddToCart={handleAddToCart}
                  loading={loading}
                />

                {/* Load More Button - Placeholder for infinite scroll */}
                {filteredAndSortedProducts.length > 0 && (
                  <div className="mt-12 text-center">
                    <Button
                      variant="outline"
                      iconName="MoreHorizontal"
                      iconPosition="left"
                      className="px-8"
                    >
                      Load More Tacos
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductCatalogBrowse;