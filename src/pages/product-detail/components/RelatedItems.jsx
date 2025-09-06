import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedItems = ({ items, title = "You Might Also Like" }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Like New': case'Excellent':
        return 'text-success bg-success/10';
      case 'Good':
        return 'text-warning bg-warning/10';
      case 'Fair':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items?.map((item, index) => (
          <Link
            key={index}
            to={`/product-detail?id=${item?.id}`}
            className="group block"
          >
            <div className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-organic transition-all duration-300 group-hover:-translate-y-1">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item?.image}
                  alt={item?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
                  <Icon name="Heart" size={16} className="text-muted-foreground hover:text-error" />
                </button>

                {/* Condition Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item?.condition)}`}>
                  {item?.condition}
                </div>

                {/* Quick View */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                  >
                    Quick View
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {item?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{item?.brand}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-primary">
                      {formatPrice(item?.price)}
                    </span>
                    {item?.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(item?.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Size {item?.size}
                  </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={item?.seller?.avatar}
                      alt={item?.seller?.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-muted-foreground">
                      {item?.seller?.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                    <span className="text-sm font-medium">{item?.seller?.rating}</span>
                  </div>
                </div>

                {/* Sustainability Badge */}
                {item?.sustainabilityScore && (
                  <div className="flex items-center space-x-2 bg-success/5 border border-success/20 rounded-lg p-2">
                    <Icon name="Leaf" size={14} className="text-success" />
                    <span className="text-xs text-success font-medium">
                      {item?.sustainabilityScore}% Impact Score
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e?.preventDefault();
                      // Add to cart logic
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageCircle"
                    onClick={(e) => {
                      e?.preventDefault();
                      // Message seller logic
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Complete the Look Section */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Sparkles" size={20} className="mr-2 text-accent" />
          Complete the Look
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items?.slice(0, 4)?.map((item, index) => (
            <Link
              key={`complete-${index}`}
              to={`/product-detail?id=${item?.id}`}
              className="group block"
            >
              <div className="bg-surface rounded-lg p-3 hover:bg-background transition-colors">
                <div className="aspect-square rounded-lg overflow-hidden mb-2">
                  <Image
                    src={item?.image}
                    alt={item?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-sm font-medium text-foreground line-clamp-1">
                  {item?.title}
                </p>
                <p className="text-sm text-primary font-semibold">
                  {formatPrice(item?.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedItems;