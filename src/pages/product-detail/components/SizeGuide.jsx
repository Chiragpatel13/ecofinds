import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SizeGuide = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product?.size);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const sizeChart = {
    'XS': { chest: '32-34', waist: '26-28', hips: '34-36' },
    'S': { chest: '34-36', waist: '28-30', hips: '36-38' },
    'M': { chest: '36-38', waist: '30-32', hips: '38-40' },
    'L': { chest: '38-40', waist: '32-34', hips: '40-42' },
    'XL': { chest: '40-42', waist: '34-36', hips: '42-44' },
    'XXL': { chest: '42-44', waist: '36-38', hips: '44-46' }
  };

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const fitRecommendations = [
    { size: 'S', fit: 'Tight fit', percentage: 15 },
    { size: 'M', fit: 'Perfect fit', percentage: 70 },
    { size: 'L', fit: 'Loose fit', percentage: 15 }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Size & Fit Guide</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="Ruler"
          iconPosition="left"
          onClick={() => setShowSizeChart(!showSizeChart)}
        >
          Size Chart
        </Button>
      </div>
      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-muted-foreground">Available Size</span>
          <span className="text-sm text-muted-foreground">
            Original size: {product?.size}
          </span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {availableSizes?.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              disabled={size !== product?.size}
              className={`h-12 rounded-lg border text-sm font-medium transition-colors ${
                size === selectedSize
                  ? 'border-primary bg-primary text-primary-foreground'
                  : size === product?.size
                  ? 'border-border hover:border-secondary bg-background' :'border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Only the original size is available for this pre-owned item
        </p>
      </div>
      {/* Fit Recommendations */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Fit Recommendations</h4>
        <div className="space-y-2">
          {fitRecommendations?.map((rec, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="w-8 text-center font-medium">{rec?.size}</span>
                <span className="text-muted-foreground">{rec?.fit}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${rec?.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {rec?.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="border border-border rounded-lg p-4 bg-surface">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Size Chart (inches)</h4>
            <button
              onClick={() => setShowSizeChart(false)}
              className="p-1 hover:bg-background rounded"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2">Size</th>
                  <th className="text-left py-2">Chest</th>
                  <th className="text-left py-2">Waist</th>
                  <th className="text-left py-2">Hips</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(sizeChart)?.map(([size, measurements]) => (
                  <tr
                    key={size}
                    className={`border-b border-border/50 ${
                      size === product?.size ? 'bg-primary/5' : ''
                    }`}
                  >
                    <td className="py-2 font-medium">{size}</td>
                    <td className="py-2">{measurements?.chest}</td>
                    <td className="py-2">{measurements?.waist}</td>
                    <td className="py-2">{measurements?.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* AR Try-On Feature */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <Icon name="Camera" size={20} className="text-accent-foreground" />
          </div>
          <div>
            <h4 className="font-medium text-accent">Try Before You Buy</h4>
            <p className="text-sm text-accent/80">
              Use AR to see how this item looks on you
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Smartphone"
          iconPosition="left"
          className="border-accent text-accent hover:bg-accent/10"
        >
          Launch AR Try-On
        </Button>
      </div>
      {/* Measurements */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Item Measurements</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Length</span>
            <span className="font-medium">{product?.measurements?.length || '28"'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Width</span>
            <span className="font-medium">{product?.measurements?.width || '20"'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sleeve</span>
            <span className="font-medium">{product?.measurements?.sleeve || '24"'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shoulder</span>
            <span className="font-medium">{product?.measurements?.shoulder || '18"'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;