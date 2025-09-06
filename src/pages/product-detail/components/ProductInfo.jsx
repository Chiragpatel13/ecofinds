import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductInfo = ({ product }) => {
  const conditionColors = {
    'Like New': 'text-success bg-success/10',
    'Excellent': 'text-success bg-success/10',
    'Good': 'text-warning bg-warning/10',
    'Fair': 'text-error bg-error/10'
  };

  return (
    <div className="space-y-6">
      {/* Title and Price */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-3xl font-bold text-foreground leading-tight">
            {product?.title}
          </h1>
          <button className="p-2 hover:bg-surface rounded-lg transition-colors">
            <Icon name="Heart" size={24} className="text-muted-foreground hover:text-error" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-primary">${product?.price}</span>
          {product?.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${product?.originalPrice}
            </span>
          )}
          {product?.discount && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-sm font-medium">
              {product?.discount}% off
            </span>
          )}
        </div>
      </div>
      {/* Key Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Condition</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${conditionColors?.[product?.condition]}`}>
              {product?.condition}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Brand</span>
            <span className="font-medium">{product?.brand}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Size</span>
            <span className="font-medium">{product?.size}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Category</span>
            <span className="font-medium">{product?.category}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Color</span>
            <div className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: product?.colorHex }}
              ></div>
              <span className="font-medium">{product?.color}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Material</span>
            <span className="font-medium">{product?.material}</span>
          </div>
        </div>
      </div>
      {/* Authenticity Badge */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-success-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-success">Authenticity Verified</h3>
            <p className="text-sm text-success/80">
              This item has been authenticated by our expert team
            </p>
          </div>
        </div>
      </div>
      {/* Item Story */}
      <div className="bg-surface rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2" />
          Item Story
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {product?.story}
        </p>
        <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} />
            <span>Owned for {product?.ownedDuration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={16} />
            <span>{product?.location}</span>
          </div>
        </div>
      </div>
      {/* Sustainability Impact */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h3 className="font-semibold text-primary mb-3 flex items-center">
          <Icon name="Leaf" size={20} className="mr-2" />
          Environmental Impact
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{product?.impact?.co2Saved}kg</div>
            <div className="text-xs text-muted-foreground">CO₂ Saved</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{product?.impact?.waterSaved}L</div>
            <div className="text-xs text-muted-foreground">Water Saved</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{product?.impact?.wasteDiverted}g</div>
            <div className="text-xs text-muted-foreground">Waste Diverted</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;