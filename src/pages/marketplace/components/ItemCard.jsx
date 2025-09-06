import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ItemCard = ({ item, onWishlist, onQuickView }) => {
  const [isWishlisted, setIsWishlisted] = useState(item?.isWishlisted || false);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleWishlistClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onWishlist?.(item?.id, !isWishlisted);
  };

  const handleQuickView = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setShowQuickView(true);
    onQuickView?.(item);
  };

  const getSustainabilityColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 70) return 'text-warning bg-warning/10';
    return 'text-muted-foreground bg-muted';
  };

  // Format price in INR
  const formatPrice = (price) => {
    if (!price) return '₹0';
    return `₹${parseFloat(price)?.toLocaleString('en-IN')}`;
  };

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-organic hover:shadow-organic-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Link to={`/product-detail?id=${item?.id}`}>
          <Image
            src={item?.image}
            alt={item?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
          {/* Top Right Actions */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWishlistClick}
              className="bg-white/90 hover:bg-white text-foreground shadow-sm"
            >
              <Icon 
                name={isWishlisted ? "Heart" : "Heart"} 
                size={18} 
                className={isWishlisted ? "fill-red-500 text-red-500" : ""}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleQuickView}
              className="bg-white/90 hover:bg-white text-foreground shadow-sm"
            >
              <Icon name="Eye" size={18} />
            </Button>
          </div>

          {/* Bottom Overlay Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white">
              <p className="text-sm font-medium mb-1">{item?.seller?.name}</p>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < Math.floor(item?.seller?.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}
                    />
                  ))}
                </div>
                <span className="text-xs">({item?.seller?.reviews || 0})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {item?.isAuthenticated && (
            <div className="bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1">
              <Icon name="Shield" size={12} />
              <span>Verified</span>
            </div>
          )}
          {item?.isLocal && (
            <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1">
              <Icon name="MapPin" size={12} />
              <span>Local</span>
            </div>
          )}
          {item?.condition === 'new' && (
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
              Like New
            </div>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <Link to={`/product-detail?id=${item?.id}`}>
          <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {item?.title}
          </h3>
        </Link>
        
        {/* Story Snippet */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item?.storySnippet}
        </p>

        {/* Price and Sustainability */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-foreground">{formatPrice(item?.price)}</span>
            {item?.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(item?.originalPrice)}
              </span>
            )}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSustainabilityColor(item?.sustainabilityScore)}`}>
            <div className="flex items-center space-x-1">
              <Icon name="Leaf" size={12} />
              <span>{item?.sustainabilityScore}</span>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={item?.seller?.avatar}
                alt={item?.seller?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-muted-foreground">{item?.seller?.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">{item?.seller?.rating}</span>
          </div>
        </div>

        {/* Tags */}
        {item?.tags && item?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {item?.tags?.slice(0, 3)?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-surface text-xs text-muted-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;