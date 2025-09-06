import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingSearches = () => {
  const [currentTrends, setCurrentTrends] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const trendingSearches = [
    { term: 'vintage band tees', count: '2.3k searches', trend: 'up', icon: 'TrendingUp' },
    { term: 'sustainable home decor', count: '1.8k searches', trend: 'up', icon: 'TrendingUp' },
    { term: 'mid-century furniture', count: '1.5k searches', trend: 'up', icon: 'TrendingUp' },
    { term: 'designer handbags', count: '1.2k searches', trend: 'stable', icon: 'Minus' },
    { term: 'vintage denim jackets', count: '980 searches', trend: 'up', icon: 'TrendingUp' },
    { term: 'eco-friendly kitchenware', count: '756 searches', trend: 'up', icon: 'TrendingUp' },
    { term: 'retro gaming consoles', count: '634 searches', trend: 'down', icon: 'TrendingDown' },
    { term: 'handmade ceramics', count: '523 searches', trend: 'up', icon: 'TrendingUp' }
  ];

  const popularCategories = [
    { name: 'Fashion', icon: 'Shirt', count: '12.5k items', color: 'bg-primary' },
    { name: 'Home & Garden', icon: 'Home', count: '8.9k items', color: 'bg-success' },
    { name: 'Electronics', icon: 'Smartphone', count: '6.2k items', color: 'bg-accent' },
    { name: 'Books & Media', icon: 'Book', count: '4.7k items', color: 'bg-secondary' },
    { name: 'Sports & Outdoors', icon: 'Bike', count: '3.8k items', color: 'bg-primary' },
    { name: 'Art & Collectibles', icon: 'Palette', count: '2.9k items', color: 'bg-success' }
  ];

  const quickActions = [
    { label: 'Browse All', icon: 'Grid3X3', link: '/marketplace' },
    { label: 'Sell Items', icon: 'Plus', link: '/seller-dashboard' },
    { label: 'My Wishlist', icon: 'Heart', link: '/marketplace' },
    { label: 'Local Pickup', icon: 'MapPin', link: '/marketplace' }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTrends(trendingSearches?.slice(0, 6));
        setIsAnimating(false);
      }, 300);
    }, 8000);

    // Initial load
    setCurrentTrends(trendingSearches?.slice(0, 6));

    return () => clearInterval(interval);
  }, []);

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Search" size={16} />
            <span>What's Trending</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Discover What Others Are Finding
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay ahead of the curve with real-time trending searches and popular categories 
            from our community of conscious shoppers.
          </p>
        </div>

        {/* Trending Searches Bar */}
        <div className="bg-card rounded-2xl shadow-organic p-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                <Icon name="TrendingUp" size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Trending Searches</h3>
                <p className="text-sm text-muted-foreground">Updated in real-time</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
            {currentTrends?.map((search, index) => (
              <Link
                key={`${search?.term}-${index}`}
                to="/marketplace"
                className="group flex items-center justify-between p-4 bg-surface hover:bg-primary/5 rounded-xl transition-organic"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 flex items-center justify-center ${getTrendColor(search?.trend)}`}>
                    <Icon name={getTrendIcon(search?.trend)} size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-foreground group-hover:text-primary transition-organic">
                      {search?.term}
                    </div>
                    <div className="text-xs text-muted-foreground">{search?.count}</div>
                  </div>
                </div>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-primary transition-organic" />
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-6">Popular Categories</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {popularCategories?.map((category, index) => (
                <Link
                  key={index}
                  to="/marketplace"
                  className="group bg-card rounded-xl p-6 shadow-organic hover:shadow-organic-lg transition-organic"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${category?.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-organic`}>
                      <Icon name={category?.icon} size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-organic">
                        {category?.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{category?.count}</p>
                    </div>
                    <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-primary transition-organic" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions?.map((action, index) => (
                <Link
                  key={index}
                  to={action?.link}
                  className="group flex items-center space-x-3 p-4 bg-card hover:bg-primary/5 rounded-xl transition-organic"
                >
                  <div className="w-10 h-10 bg-surface group-hover:bg-primary/10 rounded-lg flex items-center justify-center transition-organic">
                    <Icon name={action?.icon} size={18} className="text-muted-foreground group-hover:text-primary transition-organic" />
                  </div>
                  <span className="font-medium text-foreground group-hover:text-primary transition-organic">
                    {action?.label}
                  </span>
                  <Icon name="ArrowRight" size={14} className="text-muted-foreground group-hover:text-primary transition-organic ml-auto" />
                </Link>
              ))}
            </div>

            {/* Search Box */}
            <div className="mt-6 p-4 bg-card rounded-xl">
              <h4 className="font-semibold text-foreground mb-3">Can't find what you're looking for?</h4>
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
                  />
                  <Icon name="Search" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              <Button 
                variant="default" 
                size="sm" 
                fullWidth 
                className="mt-3"
                iconName="Search"
                iconPosition="left"
              >
                Search Now
              </Button>
            </div>
          </div>
        </div>

        {/* Search Suggestions */}
        <div className="bg-card rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Not sure what to search for?
          </h3>
          <p className="text-muted-foreground mb-6">
            Try these popular search suggestions to discover amazing finds
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['vintage leather', 'sustainable fashion', 'mid-century modern', 'handmade pottery', 'retro electronics', 'eco-friendly']?.map((suggestion, index) => (
              <Link
                key={index}
                to="/marketplace"
                className="px-4 py-2 bg-surface hover:bg-primary hover:text-primary-foreground rounded-full text-sm font-medium transition-organic"
              >
                {suggestion}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSearches;