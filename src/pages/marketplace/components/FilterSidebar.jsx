import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    condition: true,
    price: true,
    brand: false,
    size: false,
    color: false,
    sustainability: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleFilterChange = (category, value, checked) => {
    onFilterChange(category, value, checked);
  };

  const filterSections = [
    {
      id: 'condition',
      title: 'Condition',
      icon: 'Star',
      options: [
        { value: 'new', label: 'Like New', count: 1247 },
        { value: 'excellent', label: 'Excellent', count: 2156 },
        { value: 'good', label: 'Good', count: 3421 },
        { value: 'fair', label: 'Fair', count: 892 }
      ]
    },
    {
      id: 'brand',
      title: 'Brand',
      icon: 'Tag',
      options: [
        { value: 'nike', label: 'Nike', count: 456 },
        { value: 'adidas', label: 'Adidas', count: 321 },
        { value: 'zara', label: 'Zara', count: 234 },
        { value: 'hm', label: 'H&M', count: 189 },
        { value: 'uniqlo', label: 'Uniqlo', count: 167 }
      ]
    },
    {
      id: 'size',
      title: 'Size',
      icon: 'Ruler',
      options: [
        { value: 'xs', label: 'XS', count: 234 },
        { value: 's', label: 'S', count: 567 },
        { value: 'm', label: 'M', count: 891 },
        { value: 'l', label: 'L', count: 678 },
        { value: 'xl', label: 'XL', count: 345 }
      ]
    },
    {
      id: 'color',
      title: 'Color',
      icon: 'Palette',
      options: [
        { value: 'black', label: 'Black', count: 1234, color: '#000000' },
        { value: 'white', label: 'White', count: 987, color: '#FFFFFF' },
        { value: 'blue', label: 'Blue', count: 765, color: '#3B82F6' },
        { value: 'red', label: 'Red', count: 543, color: '#EF4444' },
        { value: 'green', label: 'Green', count: 432, color: '#10B981' }
      ]
    },
    {
      id: 'sustainability',
      title: 'Sustainability Score',
      icon: 'Leaf',
      options: [
        { value: 'excellent', label: 'Excellent (90-100)', count: 567 },
        { value: 'good', label: 'Good (70-89)', count: 1234 },
        { value: 'fair', label: 'Fair (50-69)', count: 891 },
        { value: 'improving', label: 'Improving (30-49)', count: 345 }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-80 bg-background border-r border-border z-50 lg:z-30
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFilterChange('clear')}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={18} className="text-muted-foreground" />
                <span className="font-medium text-foreground">Price Range</span>
              </div>
              <Icon 
                name={expandedSections?.price ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-muted-foreground"
              />
            </button>
            
            {expandedSections?.price && (
              <div className="mt-3 space-y-3">
                <div className="flex items-center space-x-3">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters?.priceMin || ''}
                    onChange={(e) => handleFilterChange('priceMin', e?.target?.value)}
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters?.priceMax || ''}
                    onChange={(e) => handleFilterChange('priceMax', e?.target?.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Under $25', '$25-$50', '$50-$100', '$100+']?.map((range) => (
                    <button
                      key={range}
                      onClick={() => handleFilterChange('priceRange', range)}
                      className="px-3 py-1 text-sm bg-surface hover:bg-secondary/20 rounded-full transition-organic"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filter Sections */}
          {filterSections?.map((section) => (
            <div key={section?.id} className="mb-6">
              <button
                onClick={() => toggleSection(section?.id)}
                className="flex items-center justify-between w-full py-2 text-left"
              >
                <div className="flex items-center space-x-2">
                  <Icon name={section?.icon} size={18} className="text-muted-foreground" />
                  <span className="font-medium text-foreground">{section?.title}</span>
                </div>
                <Icon 
                  name={expandedSections?.[section?.id] ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground"
                />
              </button>
              
              {expandedSections?.[section?.id] && (
                <div className="mt-3 space-y-2">
                  {section?.options?.map((option) => (
                    <div key={option?.value} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {section?.id === 'color' && (
                          <div 
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: option?.color }}
                          />
                        )}
                        <Checkbox
                          label={option?.label}
                          checked={filters?.[section?.id]?.includes(option?.value) || false}
                          onChange={(e) => handleFilterChange(section?.id, option?.value, e?.target?.checked)}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">({option?.count})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Local Pickup Toggle */}
          <div className="pt-4 border-t border-border">
            <Checkbox
              label="Local Pickup Available"
              description="Show items available for pickup nearby"
              checked={filters?.localPickup || false}
              onChange={(e) => handleFilterChange('localPickup', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;