import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerReviews = ({ reviews, averageRating, totalReviews }) => {
  const [expandedReviews, setExpandedReviews] = useState(new Set());
  const [showAllReviews, setShowAllReviews] = useState(false);

  const toggleReviewExpansion = (reviewId) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < Math.floor(rating) ? "text-warning fill-current" : "text-border"}
      />
    ));
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-heading font-semibold text-text-primary">
        Customer Reviews
      </h3>

      {/* Rating Summary */}
      <div className="bg-surface rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-3xl font-bold text-text-primary">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex items-center space-x-1">
                {renderStars(averageRating)}
              </div>
            </div>
            <p className="text-text-secondary">
              Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-2 text-sm">
                  <span className="w-8 text-text-secondary">{rating}</span>
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <div className="flex-1 bg-border rounded-full h-2">
                    <div
                      className="bg-warning h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-text-secondary text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {displayedReviews.map((review) => {
          const isExpanded = expandedReviews.has(review.id);
          const shouldShowExpand = review.comment.length > 150;
          
          return (
            <div key={review.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                {/* Reviewer Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium text-sm">
                      {review.reviewerName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">
                        {review.reviewerName}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-text-muted">
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                    
                    {review.verified && (
                      <div className="flex items-center space-x-1 text-xs text-success">
                        <Icon name="CheckCircle" size={14} />
                        <span>Verified Purchase</span>
                      </div>
                    )}
                  </div>

                  {/* Review Text */}
                  <div className="text-text-secondary">
                    <p className={shouldShowExpand && !isExpanded ? 'line-clamp-3' : ''}>
                      {review.comment}
                    </p>
                    
                    {shouldShowExpand && (
                      <button
                        onClick={() => toggleReviewExpansion(review.id)}
                        className="text-primary text-sm hover:underline mt-1"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex space-x-2 mt-3">
                      {review.images.map((image, index) => (
                        <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`Review image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Helpful Actions */}
                  <div className="flex items-center space-x-4 pt-2">
                    <button className="flex items-center space-x-1 text-sm text-text-muted hover:text-primary transition-colors duration-200">
                      <Icon name="ThumbsUp" size={14} />
                      <span>Helpful ({review.helpfulCount || 0})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAllReviews ? 'Show Less' : `Show All ${reviews.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;