import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import ListingCard from './components/ListingCard';
import AnalyticsChart from './components/AnalyticsChart';
import CreateListingForm from './components/CreateListingForm';
import MessageCenter from './components/MessageCenter';
import PayoutSection from './components/PayoutSection';
import AchievementBadges from './components/AchievementBadges';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedListingFilter, setSelectedListingFilter] = useState('all');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock data for metrics
  const metricsData = [
    {
      title: "Total Sales",
      value: "$2,847",
      change: "+12.5%",
      changeType: "positive",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Items Saved",
      value: "127",
      change: "+8.2%",
      changeType: "positive",
      icon: "Leaf",
      color: "primary"
    },
    {
      title: "Seller Rating",
      value: "4.9",
      change: "+0.1",
      changeType: "positive",
      icon: "Star",
      color: "accent"
    },
    {
      title: "Active Listings",
      value: "23",
      change: "-2",
      changeType: "negative",
      icon: "Package",
      color: "secondary"
    }
  ];

  // Mock data for listings
  const mockListings = [
    {
      id: 1,
      title: "Vintage Leather Jacket - Brown, Size M",
      price: 85,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      status: "active",
      views: 234,
      favorites: 18,
      listedDate: "3 days ago"
    },
    {
      id: 2,
      title: "MacBook Pro 2019 - 13 inch, 256GB",
      price: 650,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      status: "active",
      views: 567,
      favorites: 42,
      listedDate: "1 week ago"
    },
    {
      id: 3,
      title: "Ceramic Plant Pots Set - Set of 3",
      price: 45,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
      status: "sold",
      views: 156,
      favorites: 23,
      listedDate: "2 weeks ago"
    },
    {
      id: 4,
      title: "Vintage Camera - Canon AE-1",
      price: 120,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
      status: "draft",
      views: 0,
      favorites: 0,
      listedDate: "Draft"
    },
    {
      id: 5,
      title: "Designer Handbag - Michael Kors",
      price: 95,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
      status: "active",
      views: 189,
      favorites: 31,
      listedDate: "5 days ago"
    },
    {
      id: 6,
      title: "Wooden Coffee Table - Mid-Century Modern",
      price: 180,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      status: "pending",
      views: 78,
      favorites: 12,
      listedDate: "1 day ago"
    }
  ];

  // Mock data for analytics charts
  const salesData = [
    { name: 'Jan', value: 450 },
    { name: 'Feb', value: 620 },
    { name: 'Mar', value: 580 },
    { name: 'Apr', value: 750 },
    { name: 'May', value: 690 },
    { name: 'Jun', value: 820 },
    { name: 'Jul', value: 890 }
  ];

  const viewsData = [
    { name: 'Mon', value: 120 },
    { name: 'Tue', value: 150 },
    { name: 'Wed', value: 180 },
    { name: 'Thu', value: 200 },
    { name: 'Fri', value: 240 },
    { name: 'Sat', value: 280 },
    { name: 'Sun', value: 220 }
  ];

  const conversionData = [
    { name: 'Week 1', value: 12 },
    { name: 'Week 2', value: 18 },
    { name: 'Week 3', value: 15 },
    { name: 'Week 4', value: 22 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'listings', label: 'My Listings', icon: 'Package' },
    { id: 'create', label: 'Create Listing', icon: 'Plus' },
    { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' },
    { id: 'messages', label: 'Messages', icon: 'MessageCircle' },
    { id: 'payouts', label: 'Payouts', icon: 'CreditCard' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' }
  ];

  const listingFilters = [
    { id: 'all', label: 'All Listings' },
    { id: 'active', label: 'Active' },
    { id: 'sold', label: 'Sold' },
    { id: 'draft', label: 'Drafts' },
    { id: 'pending', label: 'Pending' }
  ];

  const filteredListings = selectedListingFilter === 'all' 
    ? mockListings 
    : mockListings?.filter(listing => listing?.status === selectedListingFilter);

  const handleEditListing = (listingId) => {
    console.log('Edit listing:', listingId);
  };

  const handleDeleteListing = (listingId) => {
    console.log('Delete listing:', listingId);
  };

  const handlePromoteListing = (listingId) => {
    console.log('Promote listing:', listingId);
  };

  const handleListingCreated = (newListing) => {
    console.log('New listing created:', newListing);
    setShowSuccessMessage(true);
    setActiveTab('listings');
    // Optionally, refetch listings or add the new listing to the state
    setTimeout(() => setShowSuccessMessage(false), 4000); // Hide after 4 seconds
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData?.map((metric, index) => (
                <MetricsCard key={index} {...metric} />
              ))}
            </div>
            {/* Quick Actions */}
            <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setActiveTab('create')}
                  fullWidth
                >
                  Create New Listing
                </Button>
                <Button
                  variant="outline"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => setActiveTab('messages')}
                  fullWidth
                >
                  Check Messages
                </Button>
                <Button
                  variant="outline"
                  iconName="TrendingUp"
                  iconPosition="left"
                  onClick={() => setActiveTab('analytics')}
                  fullWidth
                >
                  View Analytics
                </Button>
              </div>
            </div>
            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { icon: 'ShoppingBag', text: 'Vintage Leather Jacket sold to Sarah Chen', time: '2 hours ago', color: 'text-success' },
                    { icon: 'Eye', text: 'MacBook Pro listing viewed 23 times today', time: '4 hours ago', color: 'text-primary' },
                    { icon: 'Heart', text: 'Designer Handbag added to 5 wishlists', time: '6 hours ago', color: 'text-accent' },
                    { icon: 'MessageCircle', text: 'New message from Mike Rodriguez', time: '8 hours ago', color: 'text-foreground' }
                  ]?.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon name={activity?.icon} size={16} className={`mt-1 ${activity?.color}`} />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity?.text}</p>
                        <p className="text-xs text-muted-foreground">{activity?.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Performance Tips</h3>
                <div className="space-y-4">
                  {[
                    { icon: 'Camera', text: 'Add more photos to increase views by 40%', action: 'Add Photos' },
                    { icon: 'Tag', text: 'Update pricing on 3 items for better conversion', action: 'Review Prices' },
                    { icon: 'Clock', text: 'Respond to messages within 2 hours for better ratings', action: 'Check Messages' },
                    { icon: 'Share', text: 'Share listings on social media to boost visibility', action: 'Share Now' }
                  ]?.map((tip, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Icon name={tip?.icon} size={16} className="text-primary mt-1" />
                        <p className="text-sm text-foreground">{tip?.text}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        {tip?.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'listings':
        return (
          <div className="space-y-6">
            {showSuccessMessage && (
              <div className="bg-success-subtle text-success-foreground p-4 rounded-lg flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} />
                <p className="font-medium">Listing created successfully!</p>
              </div>
            )}

            {/* Filters */}
            <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">My Listings</h3>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setActiveTab('create')}
                >
                  New Listing
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {listingFilters?.map(filter => (
                  <button
                    key={filter?.id}
                    onClick={() => setSelectedListingFilter(filter?.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-organic ${
                      selectedListingFilter === filter?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface text-foreground hover:bg-secondary'
                    }`}
                  >
                    {filter?.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings?.map(listing => (
                <ListingCard
                  key={listing?.id}
                  listing={listing}
                  onEdit={handleEditListing}
                  onDelete={handleDeleteListing}
                  onPromote={handlePromoteListing}
                />
              ))}
            </div>
            {filteredListings?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-medium text-foreground mb-2">
                  No {selectedListingFilter} listings found
                </h4>
                <p className="text-muted-foreground mb-4">
                  {selectedListingFilter === 'all' ? "You haven't created any listings yet." 
                    : `You don't have any ${selectedListingFilter} listings.`}
                </p>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setActiveTab('create')}
                >
                  Create Your First Listing
                </Button>
              </div>
            )}
          </div>
        );

      case 'create':
        return (
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Create New Listing</h3>
              <p className="text-muted-foreground mb-6">
                Add photos and details to create your listing. Our AI will help optimize your pricing and visibility.
              </p>
              <CreateListingForm onListingCreated={handleListingCreated} />
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Track your performance and get insights to improve your sales.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsChart
                data={salesData}
                type="line"
                title="Monthly Sales Revenue"
                color="#2D5A27"
              />
              <AnalyticsChart
                data={viewsData}
                type="bar"
                title="Weekly Listing Views"
                color="#C65D07"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsChart
                data={conversionData}
                type="line"
                title="Weekly Conversion Rate (%)"
                color="#9CAF88"
              />
              
              <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Key Insights</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Average Sale Time', value: '5.2 days', trend: 'down', change: '-1.3 days' },
                    { metric: 'View to Sale Rate', value: '12.8%', trend: 'up', change: '+2.1%' },
                    { metric: 'Repeat Buyers', value: '34%', trend: 'up', change: '+5.2%' },
                    { metric: 'Average Item Price', value: '$67', trend: 'up', change: '+$8' }
                  ]?.map((insight, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{insight?.metric}</p>
                        <p className="text-2xl font-bold text-primary">{insight?.value}</p>
                      </div>
                      <div className={`flex items-center space-x-1 ${
                        insight?.trend === 'up' ? 'text-success' : 'text-error'
                      }`}>
                        <Icon 
                          name={insight?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                          size={16} 
                        />
                        <span className="text-sm font-medium">{insight?.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Message Center</h3>
              <p className="text-muted-foreground">
                Communicate with buyers and manage your conversations.
              </p>
            </div>
            <MessageCenter />
          </div>
        );

      case 'payouts':
        return (
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Payouts & Earnings</h3>
              <p className="text-muted-foreground">
                Track your earnings, manage payouts, and view transaction history.
              </p>
            </div>
            <PayoutSection />
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Achievements & Badges</h3>
              <p className="text-muted-foreground">
                Track your progress and unlock achievements as you contribute to the circular economy.
              </p>
            </div>
            <AchievementBadges />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Store" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage your listings, track performance, and grow your sustainable business
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map(tab => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-organic ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
