import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onVoiceSearch, onVisualSearch, savedSearches = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSavedSearches, setShowSavedSearches] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleSavedSearchClick = (search) => {
    setSearchQuery(search);
    onSearch(search);
    setShowSavedSearches(false);
  };

  return (
    <div className="sticky top-20 z-40 bg-background border-b border-border shadow-organic">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center space-x-3">
            {/* Main Search Input */}
            <div className="flex-1 relative">
              <Input
                type="search"
                placeholder="Search for sustainable treasures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pl-12 pr-4 h-12 text-base"
              />
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
            </div>

            {/* Action Buttons */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onVisualSearch}
              className="h-12 w-12"
              title="Visual Search"
            >
              <Icon name="Camera" size={20} />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onVoiceSearch}
              className="h-12 w-12"
              title="Voice Search"
            >
              <Icon name="Mic" size={20} />
            </Button>

            <Button
              type="submit"
              variant="default"
              className="h-12 px-6 bg-primary hover:bg-primary/90"
            >
              Search
            </Button>

            {/* Saved Searches Toggle */}
            {savedSearches?.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowSavedSearches(!showSavedSearches)}
                className="h-12 w-12"
                title="Saved Searches"
              >
                <Icon name="Bookmark" size={20} />
              </Button>
            )}
          </div>

          {/* Saved Searches Dropdown */}
          {showSavedSearches && savedSearches?.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-organic-lg z-50">
              <div className="p-3">
                <h4 className="text-sm font-medium text-foreground mb-2">Saved Searches</h4>
                <div className="space-y-1">
                  {savedSearches?.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSavedSearchClick(search)}
                      className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-surface rounded-md transition-organic"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Quick Search Tags */}
        <div className="flex items-center space-x-2 mt-3 overflow-x-auto pb-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Popular:</span>
          {['Vintage Denim', 'Designer Bags', 'Sustainable Fashion', 'Home Decor', 'Electronics']?.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
                onSearch(tag);
              }}
              className="px-3 py-1 bg-surface text-foreground text-sm rounded-full hover:bg-secondary/20 transition-organic whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;