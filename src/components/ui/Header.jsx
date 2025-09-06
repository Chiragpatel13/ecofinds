import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Marketplace', path: '/marketplace', icon: 'Store' },
    { name: 'Community Hub', path: '/community-hub', icon: 'Users' },
    { name: 'Impact Tracker', path: '/impact-tracker', icon: 'BarChart3' },
    { name: 'Seller Dashboard', path: '/seller-dashboard', icon: 'Package' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-organic">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transition-organic group-hover:scale-105">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary-foreground"
                >
                  <path
                    d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                  <circle cx="12" cy="19" r="3" fill="currentColor" opacity="0.7" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground font-inter">
                EcoFinds
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Circular Stories
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-organic ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-organic'
                    : 'text-foreground hover:bg-surface hover:text-primary'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              iconName="Search"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Search
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Heart"
              iconPosition="left"
            >
              Wishlist
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              List Item
            </Button>
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center cursor-pointer hover:bg-secondary/80 transition-organic">
              <Icon name="User" size={16} className="text-secondary-foreground" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-surface transition-organic"
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? 'X' : 'Menu'}
              size={24}
              className="text-foreground"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-fade-in">
            <div className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-organic ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-surface'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-border mt-4 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Search"
                  iconPosition="left"
                  fullWidth
                  className="justify-start"
                >
                  Search Items
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Heart"
                  iconPosition="left"
                  fullWidth
                  className="justify-start"
                >
                  My Wishlist
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  fullWidth
                  className="justify-start bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  List New Item
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="User"
                  iconPosition="left"
                  fullWidth
                  className="justify-start"
                >
                  My Profile
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Impact Notification Bar */}
      <div className="bg-success text-success-foreground py-2 px-4 text-center text-sm animate-slide-in">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Leaf" size={16} />
          <span className="font-medium">
            Community Impact: 2,847 items saved from landfills this month
          </span>
          <div className="flex space-x-1">
            {[...Array(3)]?.map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-success-foreground rounded-full animate-particle-float"
                style={{ animationDelay: `${i * 0.5}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;