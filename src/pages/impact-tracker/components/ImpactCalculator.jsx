import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImpactCalculator = () => {
  const [selectedCategory, setSelectedCategory] = useState('clothing');
  const [quantity, setQuantity] = useState(1);

  const categories = [
    {
      id: 'clothing',
      name: 'Clothing',
      icon: 'Shirt',
      co2PerItem: 8.5,
      waterPerItem: 2700,
      description: 'Average impact per clothing item'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: 'Smartphone',
      co2PerItem: 45.2,
      waterPerItem: 1200,
      description: 'Average impact per electronic device'
    },
    {
      id: 'furniture',
      name: 'Furniture',
      icon: 'Armchair',
      co2PerItem: 125.8,
      waterPerItem: 850,
      description: 'Average impact per furniture piece'
    },
    {
      id: 'books',
      name: 'Books',
      icon: 'Book',
      co2PerItem: 2.3,
      waterPerItem: 45,
      description: 'Average impact per book'
    }
  ];

  const selectedCat = categories?.find(cat => cat?.id === selectedCategory);
  const totalCO2 = selectedCat ? (selectedCat?.co2PerItem * quantity)?.toFixed(1) : 0;
  const totalWater = selectedCat ? (selectedCat?.waterPerItem * quantity)?.toLocaleString() : 0;

  return (
    <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Impact Calculator</h3>
        <Icon name="Calculator" size={20} className="text-primary" />
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Select Category
          </label>
          <div className="grid grid-cols-2 gap-3">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => setSelectedCategory(category?.id)}
                className={`p-3 rounded-lg border transition-organic text-left ${
                  selectedCategory === category?.id
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name={category?.icon} size={16} />
                  <span className="text-sm font-medium">{category?.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{category?.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Quantity
          </label>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              iconName="Minus"
              className="w-10 h-10 p-0"
            />
            <div className="flex-1 text-center">
              <span className="text-2xl font-bold text-foreground">{quantity}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              iconName="Plus"
              className="w-10 h-10 p-0"
            />
          </div>
        </div>

        <div className="bg-surface rounded-lg p-4 space-y-4">
          <h4 className="text-sm font-medium text-foreground">Environmental Impact Saved</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Leaf" size={20} className="text-success" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-success">{totalCO2}</p>
                <p className="text-xs text-muted-foreground">kg CO2 saved</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Droplets" size={20} className="text-blue-500" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-500">{totalWater}</p>
                <p className="text-xs text-muted-foreground">liters water saved</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Equivalent to planting {Math.round(totalCO2 / 22)} trees or driving {Math.round(totalCO2 * 2.3)} fewer miles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCalculator;