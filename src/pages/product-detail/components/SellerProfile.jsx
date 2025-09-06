import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SellerProfile = ({ seller }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 4.0) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      {/* Seller Header */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Image
            src={seller?.avatar}
            alt={seller?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {seller?.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={12} className="text-success-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{seller?.name}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className={`${getRatingColor(seller?.rating)} fill-current`} />
              <span className="font-medium">{seller?.rating}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{seller?.reviewCount} reviews</span>
          </div>
        </div>
      </div>
      {/* Seller Stats */}
      <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{seller?.itemsSold}</div>
          <div className="text-xs text-muted-foreground">Items Sold</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{seller?.responseTime}</div>
          <div className="text-xs text-muted-foreground">Response Time</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{seller?.memberSince}</div>
          <div className="text-xs text-muted-foreground">Member Since</div>
        </div>
      </div>
      {/* Seller Badges */}
      <div className="flex flex-wrap gap-2">
        {seller?.badges?.map((badge, index) => (
          <div
            key={index}
            className="flex items-center space-x-1 bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full text-xs"
          >
            <Icon name={badge?.icon} size={12} />
            <span>{badge?.name}</span>
          </div>
        ))}
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="outline"
          fullWidth
          iconName="MessageCircle"
          iconPosition="left"
        >
          Message Seller
        </Button>
        <Button
          variant="ghost"
          fullWidth
          iconName="Store"
          iconPosition="left"
        >
          View All Items ({seller?.activeListings})
        </Button>
      </div>
      {/* Recent Reviews */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Recent Reviews</h4>
        <div className="space-y-3">
          {seller?.recentReviews?.map((review, index) => (
            <div key={index} className="bg-surface rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={`${
                          i < review?.rating ? 'text-warning fill-current' : 'text-border'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{review?.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">{review?.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{review?.comment}</p>
              <div className="text-xs text-muted-foreground mt-1">
                by {review?.reviewer}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Indicators */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="font-medium text-success">Trusted Seller</span>
        </div>
        <ul className="text-sm text-success/80 space-y-1">
          <li>• Identity verified</li>
          <li>• 100% positive feedback last 30 days</li>
          <li>• Fast shipping record</li>
        </ul>
      </div>
    </div>
  );
};

export default SellerProfile;