import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import CustomizationPanel from './components/CustomizationPanel';
import QuantitySelector from './components/QuantitySelector';
import RelatedProducts from './components/RelatedProducts';
import CustomerReviews from './components/CustomerReviews';
import StickyBottomBar from './components/StickyBottomBar';
import SocialShare from './components/SocialShare';

const ProductDetailView = () => {
  const [searchParams] = useSearchParams();
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  
  // Get product ID from URL params or search params (for backward compatibility)
  const productId = paramId || searchParams.get('id') || '1';

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState({
    spiceLevel: 'medium',
    addOns: [],
    specialInstructions: '',
    addOnDetails: [],
    totalAddOnPrice: 0
  });
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock product data
  const mockProducts = [
    {
      id: '1',
      name: 'Classic Carnitas Taco',
      price: 3.99,
      originalPrice: 4.49,
      rating: 4.8,
      reviewCount: 127,
      category: 'Pork',
      tags: ['Popular', 'Gluten-Free Option'],
      inStock: true,
      stockCount: 8,
      images: [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
        'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
        'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=800'
      ],
      description: `Our signature carnitas taco features slow-cooked pork shoulder that's been braised for hours until it's incredibly tender and flavorful. The meat is then crisped to perfection and served on handmade corn tortillas with fresh cilantro, diced onions, and a squeeze of lime.\n\nThis authentic Mexican dish represents the heart of traditional taco-making, where time and patience create the most incredible flavors.`,
      ingredients: `Pork shoulder, corn tortillas, white onion, fresh cilantro, lime, sea salt, cumin, oregano, bay leaves, orange juice, garlic, black pepper.\n\nAllergen Information: Contains no major allergens. Gluten-free corn tortillas available upon request.`,
      nutrition: `Per serving (1 taco):\nCalories: 285\nProtein: 18g\nCarbohydrates: 15g\nFat: 16g\nFiber: 3g\nSodium: 420mg\n\nMade with natural ingredients and no artificial preservatives.`,
      shortDescription: 'Slow-cooked pork shoulder with traditional Mexican spices'
    },
    {
      id: '2',
      name: 'Spicy Chicken Tinga',
      price: 3.49,
      rating: 4.6,
      reviewCount: 89,
      category: 'Chicken',
      tags: ['Spicy', 'Protein-Rich'],
      inStock: true,
      stockCount: 12,
      images: [
        'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800'
      ],
      description: `Our spicy chicken tinga features tender shredded chicken slow-cooked in a rich, smoky chipotle tomato sauce. The chicken is perfectly seasoned with a blend of traditional Mexican spices and served with fresh toppings on warm tortillas.\n\nThis dish delivers the perfect balance of heat and flavor, making it a favorite among spice lovers.`,
      ingredients: `Chicken breast, chipotle peppers in adobo, tomatoes, onions, garlic, cumin, oregano, bay leaves, chicken broth, corn tortillas.\n\nAllergen Information: Contains no major allergens. Gluten-free corn tortillas available upon request.`,
      nutrition: `Per serving (1 taco):\nCalories: 260\nProtein: 22g\nCarbohydrates: 12g\nFat: 14g\nFiber: 2g\nSodium: 380mg\n\nHigh in protein and made with natural ingredients.`,
      shortDescription: 'Shredded chicken in smoky chipotle sauce'
    },
    {
      id: '3',
      name: 'Vegetarian Black Bean',
      price: 2.99,
      rating: 4.4,
      reviewCount: 67,
      category: 'Vegetarian',
      tags: ['Vegetarian', 'Vegan', 'High Protein'],
      inStock: true,
      stockCount: 15,
      images: [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
        'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=800'
      ],
      description: `Our vegetarian black bean taco features seasoned black beans cooked with roasted peppers, corn, and fresh vegetables. Topped with crisp lettuce, diced tomatoes, and our house-made salsa verde for a fresh and satisfying plant-based option.\n\nPacked with protein and fiber, this taco proves that vegetarian can be both delicious and filling.`,
      ingredients: `Black beans, roasted bell peppers, corn, onions, garlic, cumin, chili powder, lime, cilantro, lettuce, tomatoes, salsa verde, corn tortillas.\n\nAllergen Information: Vegan and gluten-free. Contains no animal products or major allergens.`,
      nutrition: `Per serving (1 taco):\nCalories: 220\nProtein: 12g\nCarbohydrates: 38g\nFat: 4g\nFiber: 10g\nSodium: 290mg\n\nHigh in fiber and plant-based protein.`,
      shortDescription: 'Seasoned black beans with roasted peppers and fresh salsa verde'
    },
    {
      id: '4',
      name: 'Grilled Fish Taco',
      price: 4.29,
      rating: 4.7,
      reviewCount: 156,
      category: 'Seafood',
      tags: ['Healthy', 'Omega-3', 'Light'],
      inStock: true,
      stockCount: 10,
      images: [
        'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800'
      ],
      description: `Fresh grilled white fish seasoned with lime and spices, served with crisp cabbage slaw and our signature chipotle crema. This light and healthy option delivers fresh ocean flavors with a Mexican twist.\n\nPerfect for those looking for a lighter, protein-rich option without sacrificing flavor.`,
      ingredients: `Fresh white fish (mahi-mahi or tilapia), cabbage, lime, chipotle peppers, sour cream, cilantro, corn tortillas, pickled onions.\n\nAllergen Information: Contains fish and dairy. Gluten-free corn tortillas available upon request.`,
      nutrition: `Per serving (1 taco):\nCalories: 240\nProtein: 20g\nCarbohydrates: 14g\nFat: 12g\nFiber: 3g\nSodium: 320mg\n\nHigh in protein and omega-3 fatty acids.`,
      shortDescription: 'Grilled fish with fresh cabbage slaw and chipotle crema'
    }
  ];

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      reviewerName: 'Maria Rodriguez',
      rating: 5,
      date: '2024-01-15',
      comment: `Absolutely incredible! The carnitas were so tender and flavorful. You can tell they take their time with the cooking process. The meat just falls apart and the seasoning is perfect. This is exactly what a carnitas taco should taste like. Will definitely be ordering again!`,
      verified: true,
      helpfulCount: 23,
      images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200']
    },
    {
      id: 2,
      reviewerName: 'James Chen',
      rating: 4,
      date: '2024-01-10',
      comment: `Really good taco! The pork was delicious and the tortillas were fresh. Only reason I'm not giving 5 stars is because I wished there was a bit more meat, but the flavor was spot on.`,
      verified: true,
      helpfulCount: 15
    },
    {
      id: 3,
      reviewerName: 'Sofia Martinez',rating: 5,date: '2024-01-08',
      comment: `Best carnitas in town! The customization options are great too - I added extra cheese and guacamole and it was perfect. The spice level options are also appreciated.`,
      verified: false,
      helpfulCount: 8
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === productId || p.id === parseInt(productId));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Redirect to product catalog if product not found
        navigate('/');
      }
      setLoading(false);
    }, 500);
  }, [productId, navigate]);

  useEffect(() => {
    // Handle sticky bottom bar visibility
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show sticky bar when scrolled past the main product section
      setShowStickyBar(scrollPosition > windowHeight * 0.5 && scrollPosition < documentHeight - windowHeight * 1.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleCustomizationChange = (newCustomization) => {
    setCustomization(newCustomization);
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      customization: customization,
      totalPrice: calculateTotalPrice()
    };

    // Simulate adding to cart
    const currentCount = parseInt(localStorage.getItem('cartItemCount') || '0');
    const newCount = currentCount + quantity;
    localStorage.setItem('cartItemCount', newCount.toString());

    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { count: newCount, item: cartItem }
    }));

    // Show success feedback (you could add a toast notification here)
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  const calculateTotalPrice = () => {
    const basePrice = product.price * quantity;
    const addOnPrice = customization.totalAddOnPrice * quantity;
    return basePrice + addOnPrice;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <Icon name="AlertCircle" size={48} className="mx-auto text-error mb-4" />
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Product Not Found
              </h2>
              <p className="text-text-secondary mb-6">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-20 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />
          
          {/* Product Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Product Images */}
            <div className="space-y-6">
              <ProductImageGallery 
                images={product.images} 
                productName={product.name} 
              />
              
              {/* Social Share - Desktop */}
              <div className="hidden lg:block">
                <SocialShare product={product} />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <ProductInfo product={product} />
              
              {/* Customization Panel */}
              <CustomizationPanel onCustomizationChange={handleCustomizationChange} />
              
              {/* Quantity and Add to Cart */}
              <div className="space-y-4 p-4 bg-surface rounded-lg">
                <QuantitySelector
                  initialQuantity={quantity}
                  maxQuantity={product.stockCount || 10}
                  onQuantityChange={handleQuantityChange}
                  disabled={!product.inStock}
                />
                
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-text-primary">
                    Total: ${calculateTotalPrice().toFixed(2)}
                  </div>
                  {customization.totalAddOnPrice > 0 && (
                    <div className="text-sm text-text-muted">
                      Base: ${(product.price * quantity).toFixed(2)} + Add-ons: ${(customization.totalAddOnPrice * quantity).toFixed(2)}
                    </div>
                  )}
                </div>
                
                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  fullWidth
                  className="text-lg py-3"
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
              
              {/* Social Share - Mobile */}
              <div className="lg:hidden">
                <SocialShare product={product} />
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="mb-12">
            <CustomerReviews
              reviews={mockReviews}
              averageRating={product.rating}
              totalReviews={product.reviewCount}
            />
          </div>

          {/* Related Products */}
          <RelatedProducts
            products={mockProducts}
            currentProductId={product.id}
          />
        </div>
      </main>

      {/* Sticky Bottom Bar for Mobile */}
      <StickyBottomBar
        product={product}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        customization={customization}
        onAddToCart={handleAddToCart}
        isVisible={showStickyBar}
      />
    </div>
  );
};

export default ProductDetailView;