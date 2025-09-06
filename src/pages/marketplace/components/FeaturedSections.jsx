import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedSections = ({ localFinds, authenticatedLuxury }) => {
  return (
    <div className="space-y-8 mb-8">
      {/* Local Finds Section */}
      <div className="bg-surface rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Local Finds</h2>
              <p className="text-sm text-muted-foreground">Available for pickup nearby</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {localFinds?.slice(0, 4)?.map((item) => (
            <Link
              key={item?.id}
              to={`/product-detail?id=${item?.id}`}
              className="group block"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                <Image
                  src={item?.image}
                  alt={item?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1">
                  <Icon name="MapPin" size={10} />
                  <span>{item?.distance}</span>
                </div>
              </div>
              <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {item?.title}
              </h3>
              <p className="text-sm font-semibold text-foreground mt-1">${item?.price}</p>
            </Link>
          ))}
        </div>
      </div>
      {/* Authenticated Luxury Section */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Authenticated Luxury</h2>
              <p className="text-sm text-muted-foreground">Verified designer items with authenticity guarantee</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
            View Collection
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {authenticatedLuxury?.slice(0, 3)?.map((item) => (
            <Link
              key={item?.id}
              to={`/product-detail?id=${item?.id}`}
              className="group block bg-card rounded-lg overflow-hidden shadow-organic hover:shadow-organic-lg transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item?.image}
                  alt={item?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex space-x-2">
                  <div className="bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1">
                    <Icon name="Shield" size={12} />
                    <span>Verified</span>
                  </div>
                  <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                    {item?.condition}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                  {item?.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{item?.brand}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-foreground">${item?.price}</span>
                    {item?.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item?.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">{item?.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Sustainability Spotlight */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
            <Icon name="Leaf" size={20} className="text-success-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Sustainability Spotlight</h2>
            <p className="text-sm text-muted-foreground">Items making the biggest environmental impact</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg p-4 text-center">
            <Icon name="Recycle" size={32} className="text-success mx-auto mb-2" />
            <h3 className="font-semibold text-2xl text-foreground">2,847</h3>
            <p className="text-sm text-muted-foreground">Items Saved</p>
          </div>
          <div className="bg-card rounded-lg p-4 text-center">
            <Icon name="Droplets" size={32} className="text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-2xl text-foreground">15,230L</h3>
            <p className="text-sm text-muted-foreground">Water Saved</p>
          </div>
          <div className="bg-card rounded-lg p-4 text-center">
            <Icon name="Zap" size={32} className="text-warning mx-auto mb-2" />
            <h3 className="font-semibold text-2xl text-foreground">8,456kg</h3>
            <p className="text-sm text-muted-foreground">CO₂ Reduced</p>
          </div>
          <div className="bg-card rounded-lg p-4 text-center">
            <Icon name="Users" size={32} className="text-accent mx-auto mb-2" />
            <h3 className="font-semibold text-2xl text-foreground">12,543</h3>
            <p className="text-sm text-muted-foreground">Community Members</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSections;