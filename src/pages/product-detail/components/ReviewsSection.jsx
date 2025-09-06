import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ reviews, averageRating, totalReviews }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 75 },
    { stars: 4, count: 12, percentage: 20 },
    { stars: 3, count: 2, percentage: 3 },
    { stars: 2, count: 1, percentage: 2 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 4.0) return 'text-warning';
    return 'text-error';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">
          Reviews ({totalReviews})
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={20} className={`${getRatingColor(averageRating)} fill-current`} />
            <span className="text-lg font-semibold">{averageRating}</span>
          </div>
          <span className="text-muted-foreground">out of 5</span>
        </div>
      </div>
      {/* Rating Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-foreground mb-3">Rating Breakdown</h4>
          <div className="space-y-2">
            {ratingDistribution?.map((item) => (
              <div key={item?.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm">{item?.stars}</span>
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning rounded-full"
                    style={{ width: `${item?.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {item?.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3">Review Highlights</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Item Accuracy</span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-success fill-current" />
                <span className="text-sm font-medium">4.8</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Seller Communication</span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-success fill-current" />
                <span className="text-sm font-medium">4.9</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Shipping Speed</span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-success fill-current" />
                <span className="text-sm font-medium">4.7</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Overall Satisfaction</span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-success fill-current" />
                <span className="text-sm font-medium">4.8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Filter by:</span>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e?.target?.value)}
            className="text-sm border border-border rounded-lg px-3 py-1 bg-background"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded-lg px-3 py-1 bg-background"
          >
            {sortOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {reviews?.map((review, index) => (
          <div key={index} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
            <div className="flex items-start space-x-4">
              <Image
                src={review?.reviewer?.avatar}
                alt={review?.reviewer?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-foreground">
                      {review?.reviewer?.name}
                    </h5>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={`${
                              i < review?.rating ? 'text-warning fill-current' : 'text-border'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review?.date)}
                      </span>
                    </div>
                  </div>
                  {review?.verified && (
                    <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs">
                      <Icon name="Check" size={12} />
                      <span>Verified Purchase</span>
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground mb-3 leading-relaxed">
                  {review?.comment}
                </p>

                {/* Review Images */}
                {review?.images && review?.images?.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review?.images?.map((image, imgIndex) => (
                      <Image
                        key={imgIndex}
                        src={image}
                        alt={`Review image ${imgIndex + 1}`}
                        className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review?.helpfulCount})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="MessageCircle" size={14} />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="Flag" size={14} />
                    <span>Report</span>
                  </button>
                </div>

                {/* Seller Response */}
                {review?.sellerResponse && (
                  <div className="mt-4 bg-surface rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Store" size={16} className="text-primary" />
                      <span className="font-medium text-primary">Seller Response</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review?.sellerResponse?.date)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review?.sellerResponse?.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Reviews */}
      <div className="text-center">
        <Button
          variant="outline"
          iconName="ChevronDown"
          iconPosition="right"
        >
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default ReviewsSection;