import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortingBar = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  totalItems, 
  onToggleFilters,
  isFiltersOpen 
}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'popularity', label: 'Most Popular', icon: 'Heart' },
    { value: 'eco-score', label: 'Eco-Impact Score', icon: 'Leaf' },
    { value: 'distance', label: 'Nearest First', icon: 'MapPin' }
  ];

  const getCurrentSortLabel = () => {
    const current = sortOptions?.find(option => option?.value === sortBy);
    return current ? current?.label : 'Sort By';
  };

  const handleSortSelect = (value) => {
    onSortChange(value);
    setShowSortDropdown(false);
  };

  return (
    <div className="bg-background border-b border-border py-4">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFilters}
              className="lg:hidden"
              iconName={isFiltersOpen ? "X" : "Filter"}
              iconPosition="left"
            >
              {isFiltersOpen ? 'Close' : 'Filters'}
            </Button>

            {/* Results Count */}
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {totalItems?.toLocaleString()} items found
              </span>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <span className="text-sm text-success font-medium">
                2,847 saved from landfills
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                iconName="ChevronDown"
                iconPosition="right"
                className="min-w-[140px] justify-between"
              >
                {getCurrentSortLabel()}
              </Button>

              {showSortDropdown && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-organic-lg z-50">
                  <div className="py-2">
                    {sortOptions?.map((option) => (
                      <button
                        key={option?.value}
                        onClick={() => handleSortSelect(option?.value)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-surface transition-organic ${
                          sortBy === option?.value ? 'bg-surface text-primary font-medium' : 'text-foreground'
                        }`}
                      >
                        <Icon name={option?.icon} size={16} />
                        <span>{option?.label}</span>
                        {sortBy === option?.value && (
                          <Icon name="Check" size={16} className="ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center bg-surface rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className="px-3"
              >
                <Icon name="Grid3X3" size={16} />
              </Button>
              <Button
                variant={viewMode === 'masonry' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('masonry')}
                className="px-3"
              >
                <Icon name="LayoutGrid" size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="px-3"
              >
                <Icon name="List" size={16} />
              </Button>
            </div>

            {/* Quick Actions */}
            <Button
              variant="ghost"
              size="sm"
              iconName="Bookmark"
              className="hidden sm:flex"
              title="Save Search"
            />
          </div>
        </div>

        {/* Mobile Results Count */}
        <div className="sm:hidden mt-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {totalItems?.toLocaleString()} items
          </span>
          <span className="text-success font-medium">
            2,847 saved from landfills
          </span>
        </div>
      </div>
    </div>
  );
};

export default SortingBar;