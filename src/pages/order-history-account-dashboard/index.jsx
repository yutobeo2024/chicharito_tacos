import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import OrderCard from './components/OrderCard';
import ProfileSettings from './components/ProfileSettings';
import SavedItems from './components/SavedItems';
import OrderFilters from './components/OrderFilters';
import AccountSidebar from './components/AccountSidebar';

const OrderHistoryAccountDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const ordersPerPage = 5;

  // Mock orders data
  const mockOrders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-20T18:30:00Z",
      status: "delivered",
      total: 24.75,
      subtotal: 21.50,
      deliveryFee: 3.25,
      deliveryAddress: "123 Main Street, Apt 4B, New York, NY 10001",
      trackingNumber: "TRK123456789",
      items: [
        {
          id: 1,
          name: "Carnitas Taco",
          price: 3.50,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
        },
        {
          id: 2,
          name: "Chicken Quesadilla",
          price: 8.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop"
        },
        {
          id: 3,
          name: "Guacamole & Chips",
          price: 5.50,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=400&h=300&fit=crop"
        }
      ]
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-18T12:15:00Z",
      status: "preparing",
      total: 18.25,
      subtotal: 15.00,
      deliveryFee: 3.25,
      deliveryAddress: "456 Business Ave, Suite 200, New York, NY 10002",
      items: [
        {
          id: 4,
          name: "Fish Taco Special",
          price: 4.25,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop"
        },
        {
          id: 5,
          name: "Veggie Bowl",
          price: 7.75,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
        }
      ]
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-15T19:45:00Z",
      status: "delivered",
      total: 32.50,
      subtotal: 29.25,
      deliveryFee: 3.25,
      deliveryAddress: "123 Main Street, Apt 4B, New York, NY 10001",
      items: [
        {
          id: 6,
          name: "Spicy Beef Burrito",
          price: 9.50,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop"
        },
        {
          id: 7,
          name: "Chicken Nachos",
          price: 10.25,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop"
        }
      ]
    },
    {
      id: "ORD-2024-004",
      date: "2024-01-12T14:20:00Z",
      status: "cancelled",
      total: 15.75,
      subtotal: 12.50,
      deliveryFee: 3.25,
      deliveryAddress: "123 Main Street, Apt 4B, New York, NY 10001",
      items: [
        {
          id: 8,
          name: "Al Pastor Taco",
          price: 3.75,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop"
        },
        {
          id: 9,
          name: "Mexican Rice",
          price: 5.00,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop"
        }
      ]
    },
    {
      id: "ORD-2024-005",
      date: "2024-01-10T16:30:00Z",
      status: "on the way",
      total: 27.00,
      subtotal: 23.75,
      deliveryFee: 3.25,
      deliveryAddress: "456 Business Ave, Suite 200, New York, NY 10002",
      trackingNumber: "TRK987654321",
      items: [
        {
          id: 10,
          name: "Breakfast Burrito",
          price: 8.50,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop"
        },
        {
          id: 11,
          name: "Chorizo Quesadilla",
          price: 9.25,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop"
        },
        {
          id: 12,
          name: "Fresh Salsa Trio",
          price: 6.00,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=400&h=300&fit=crop"
        }
      ]
    }
  ];

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated');
    const savedUserName = localStorage.getItem('userName');
    
    if (authStatus !== 'true') {
      navigate('/user-authentication-login-register');
      return;
    }

    setIsAuthenticated(true);
    setUserName(savedUserName || 'User');

    // Simulate loading orders
    setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const handleFiltersChange = (filters) => {
    let filtered = [...orders];

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      let startDate;

      switch (filters.dateRange) {
        case 'last7days':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'last30days':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case 'last3months':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case 'lastyear':
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filtered = filtered.filter(order => new Date(order.date) >= startDate);
      }
    }

    // Amount filters
    if (filters.minAmount) {
      filtered = filtered.filter(order => order.total >= parseFloat(filters.minAmount));
    }
    if (filters.maxAmount) {
      filtered = filtered.filter(order => order.total <= parseFloat(filters.maxAmount));
    }

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.items.some(item => item.name.toLowerCase().includes(query))
      );
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handleReorder = (items) => {
    // Add items to cart
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    items.forEach(item => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        currentCart.push({ ...item });
      }
    });
    
    localStorage.setItem('cart', JSON.stringify(currentCart));
    
    // Update cart count
    const totalItems = currentCart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartItemCount', totalItems.toString());
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { count: totalItems }
    }));

    // Navigate to cart
    navigate('/shopping-cart');
  };

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-6">
            <OrderFilters 
              onFiltersChange={handleFiltersChange}
              totalOrders={filteredOrders.length}
            />

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-background border border-border rounded-lg p-6 animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-6 bg-surface rounded w-32"></div>
                      <div className="h-6 bg-surface rounded w-20"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-surface rounded w-48"></div>
                      <div className="h-4 bg-surface rounded w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Package" size={32} className="text-text-muted" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">No Orders Found</h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                  {orders.length === 0 
                    ? "You haven't placed any orders yet. Start by browsing our delicious menu!" :"No orders match your current filters. Try adjusting your search criteria."
                  }
                </p>
                <Link to="/product-catalog-browse">
                  <Button variant="primary" iconName="ChefHat" iconPosition="left">
                    Browse Menu
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {paginatedOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onReorder={handleReorder}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      iconName="ChevronLeft"
                    />
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "primary" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      );
                    })}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      iconName="ChevronRight"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        );

      case 'profile':
        return <ProfileSettings />;

      case 'saved':
        return <SavedItems />;

      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Settings" size={24} className="text-text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Coming Soon</h3>
            <p className="text-text-secondary">
              This feature is currently under development.
            </p>
          </div>
        );
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      
      <main className="pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Welcome back, {userName}!
                </h1>
                <p className="text-text-secondary">
                  Manage your orders, profile, and preferences
                </p>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/product-catalog-browse">
                  <Button variant="outline" iconName="ChefHat" iconPosition="left">
                    Browse Menu
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <AccountSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                orderCount={orders.length}
                savedItemsCount={5}
              />
            </div>

            {/* Mobile Tab Navigation */}
            <div className="lg:hidden mb-6">
              <div className="flex space-x-1 bg-surface-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'orders' ?'bg-background text-primary shadow-sm' :'text-text-secondary hover:text-primary'
                  }`}
                >
                  <Icon name="Package" size={16} />
                  <span>Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'profile' ?'bg-background text-primary shadow-sm' :'text-text-secondary hover:text-primary'
                  }`}
                >
                  <Icon name="User" size={16} />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'saved' ?'bg-background text-primary shadow-sm' :'text-text-secondary hover:text-primary'
                  }`}
                >
                  <Icon name="Heart" size={16} />
                  <span>Saved</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderHistoryAccountDashboard;