import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onAddToCart, loading = false, className = '' }) => {
  const SkeletonCard = () => (
    <div className="bg-background border border-border rounded-lg overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-surface"></div>
      <div className="p-4">
        <div className="h-4 bg-surface rounded mb-2"></div>
        <div className="h-3 bg-surface rounded mb-2 w-3/4"></div>
        <div className="h-3 bg-surface rounded mb-3 w-1/2"></div>
        <div className="h-10 bg-surface rounded"></div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-12 h-12 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-text-primary mb-2">No tacos found</h3>
      <p className="text-text-secondary max-w-md">
        We couldn't find any tacos matching your search criteria. Try adjusting your filters or search terms.
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {[...Array(8)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={`grid grid-cols-1 ${className}`}>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;