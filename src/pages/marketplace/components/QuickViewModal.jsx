import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QuickViewModal = ({ item, isOpen, onClose, onWishlist }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(item?.isWishlisted || false);

  if (!isOpen || !item) return null;

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist(item?.id, !isWishlisted);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === item?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item?.images?.length - 1 : prev - 1
    );
  };

  const getSustainabilityColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 70) return 'text-warning bg-warning/10';
    return 'text-muted-foreground bg-muted';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-organic-lg">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={item?.images?.[currentImageIndex]}
                alt={item?.title}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {item?.images?.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  >
                    <Icon name="ChevronRight" size={20} />
                  </Button>
                </>
              )}

              {/* Image Indicators */}
              {item?.images?.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {item?.images?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
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
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground mb-2">{item?.title}</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-foreground">${item?.price}</span>
                    {item?.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${item?.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSustainabilityColor(item?.sustainabilityScore)}`}>
                    <div className="flex items-center space-x-1">
                      <Icon name="Leaf" size={14} />
                      <span>{item?.sustainabilityScore}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Seller Info */}
            <div className="flex items-center space-x-3 mb-4 p-3 bg-surface rounded-lg">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={item?.seller?.avatar}
                  alt={item?.seller?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{item?.seller?.name}</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < item?.seller?.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({item?.seller?.reviews} reviews)</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </div>

            {/* Story */}
            <div className="mb-4">
              <h4 className="font-medium text-foreground mb-2">Item Story</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item?.storySnippet}
              </p>
            </div>

            {/* Details */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Condition</span>
                <span className="text-sm font-medium text-foreground capitalize">{item?.condition}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Size</span>
                <span className="text-sm font-medium text-foreground">{item?.size || 'One Size'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Brand</span>
                <span className="text-sm font-medium text-foreground">{item?.brand || 'Unbranded'}</span>
              </div>
              {item?.isLocal && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Distance</span>
                  <span className="text-sm font-medium text-foreground">{item?.distance}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-3">
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleWishlistClick}
                  iconName="Heart"
                  iconPosition="left"
                  className={isWishlisted ? "text-red-500 border-red-500" : ""}
                >
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </Button>
                <Button variant="outline" iconName="Share" iconPosition="left">
                  Share
                </Button>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" fullWidth>
                  Message Seller
                </Button>
                <Link to={`/product-detail?id=${item?.id}`} className="flex-1">
                  <Button variant="default" fullWidth className="bg-primary hover:bg-primary/90">
                    View Full Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;