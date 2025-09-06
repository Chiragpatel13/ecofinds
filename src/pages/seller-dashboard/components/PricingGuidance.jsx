import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const PricingGuidance = ({ onPriceSet }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [suggestedPrice, setSuggestedPrice] = useState(null);

  const categories = [
    "Electronics", "Fashion", "Home & Garden", "Books", "Sports", "Toys", "Jewelry", "Art"
  ];

  const conditions = [
    { value: 'new', label: 'Like New', multiplier: 0.8 },
    { value: 'excellent', label: 'Excellent', multiplier: 0.7 },
    { value: 'good', label: 'Good', multiplier: 0.6 },
    { value: 'fair', label: 'Fair', multiplier: 0.4 }
  ];

  const mockPriceData = {
    "Electronics": { min: 45, max: 180, avg: 95 },
    "Fashion": { min: 15, max: 85, avg: 35 },
    "Home & Garden": { min: 20, max: 120, avg: 55 },
    "Books": { min: 5, max: 25, avg: 12 },
    "Sports": { min: 25, max: 150, avg: 65 },
    "Toys": { min: 8, max: 45, avg: 22 },
    "Jewelry": { min: 30, max: 200, avg: 85 },
    "Art": { min: 40, max: 300, avg: 125 }
  };

  const generatePriceSuggestion = () => {
    if (!selectedCategory || !condition) return;

    const priceData = mockPriceData?.[selectedCategory];
    const conditionData = conditions?.find(c => c?.value === condition);
    
    if (priceData && conditionData) {
      const basePrice = priceData?.avg;
      const adjustedPrice = Math.round(basePrice * conditionData?.multiplier);
      const range = {
        min: Math.max(5, Math.round(adjustedPrice * 0.8)),
        max: Math.round(adjustedPrice * 1.2),
        suggested: adjustedPrice
      };
      setSuggestedPrice(range);
    }
  };

  const handleSetPrice = (price) => {
    onPriceSet?.(price);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="DollarSign" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Pricing Guidance</h3>
          <p className="text-sm text-muted-foreground">Get market-based price suggestions</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select category</option>
            {categories?.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Condition
          </label>
          <div className="grid grid-cols-2 gap-2">
            {conditions?.map(cond => (
              <button
                key={cond?.value}
                onClick={() => setCondition(cond?.value)}
                className={`p-3 rounded-lg border text-sm font-medium transition-organic ${
                  condition === cond?.value
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {cond?.label}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          iconName="Zap"
          iconPosition="left"
          onClick={generatePriceSuggestion}
          disabled={!selectedCategory || !condition}
          fullWidth
        >
          Generate Price Suggestion
        </Button>

        {suggestedPrice && (
          <div className="bg-surface rounded-lg p-4 space-y-4">
            <div className="text-center">
              <h4 className="font-semibold text-foreground mb-2">Suggested Price Range</h4>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Min</p>
                  <p className="text-lg font-bold text-foreground">${suggestedPrice?.min}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Suggested</p>
                  <p className="text-2xl font-bold text-primary">${suggestedPrice?.suggested}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Max</p>
                  <p className="text-lg font-bold text-foreground">${suggestedPrice?.max}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSetPrice(suggestedPrice?.min)}
              >
                Use Min
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleSetPrice(suggestedPrice?.suggested)}
              >
                Use Suggested
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSetPrice(suggestedPrice?.max)}
              >
                Use Max
              </Button>
            </div>

            <div className="bg-background rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Pricing Insights</p>
                  <p>Based on 247 similar items sold in the last 30 days. Items in {condition} condition typically sell within 5-8 days at suggested price.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingGuidance;