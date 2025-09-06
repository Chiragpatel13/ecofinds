import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DiscussionForum = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const forumCategories = [
    { key: 'all', label: 'All Topics', icon: 'MessageSquare', count: 156 },
    { key: 'vintage-fashion', label: 'Vintage Fashion', icon: 'Shirt', count: 42 },
    { key: 'home-decor', label: 'Home Decor', icon: 'Home', count: 38 },
    { key: 'sustainability', label: 'Sustainability', icon: 'Leaf', count: 29 },
    { key: 'authentication', label: 'Authentication', icon: 'Shield', count: 24 },
    { key: 'general', label: 'General', icon: 'MessageCircle', count: 23 }
  ];

  const discussions = [
    {
      id: 1,
      title: 'How to spot fake vintage band t-shirts?',
      content: 'I\'ve been collecting vintage band tees and want to make sure I\'m not buying reproductions. What are the key things to look for when authenticating these items?',
      category: 'authentication',
      author: {
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        badge: 'Vintage Expert'
      },
      stats: {
        replies: 23,
        views: 456,
        likes: 12
      },
      lastActivity: new Date(Date.now() - 1800000),
      isPinned: false,
      isHot: true,
      tags: ['vintage', 'authentication', 'band-tees']
    },
    {
      id: 2,
      title: 'Best practices for photographing items for sale',
      content: 'Looking for tips on how to take great photos that show the true condition and color of items. Lighting, angles, backgrounds - what works best?',
      category: 'general',
      author: {
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        badge: 'New Seller'
      },
      stats: {
        replies: 18,
        views: 234,
        likes: 8
      },
      lastActivity: new Date(Date.now() - 3600000),
      isPinned: true,
      isHot: false,
      tags: ['photography', 'selling', 'tips']
    },
    {
      id: 3,
      title: 'Sustainable fashion brands worth supporting',
      content: 'Let\'s share our favorite sustainable and ethical fashion brands that align with the circular economy principles we love here at EcoFinds.',
      category: 'sustainability',
      author: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        badge: 'Eco Warrior'
      },
      stats: {
        replies: 34,
        views: 678,
        likes: 19
      },
      lastActivity: new Date(Date.now() - 7200000),
      isPinned: false,
      isHot: true,
      tags: ['sustainability', 'brands', 'ethical-fashion']
    },
    {
      id: 4,
      title: 'Mid-century modern furniture finds',
      content: 'Share your amazing mid-century modern furniture discoveries! I\'ll start with this incredible Eames chair I found last week.',
      category: 'home-decor',
      author: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        badge: 'Design Enthusiast'
      },
      stats: {
        replies: 15,
        views: 289,
        likes: 11
      },
      lastActivity: new Date(Date.now() - 10800000),
      isPinned: false,
      isHot: false,
      tags: ['mid-century', 'furniture', 'design']
    },
    {
      id: 5,
      title: '1970s fashion comeback - what\'s trending?',
      content: 'I\'ve noticed a huge resurgence in 70s fashion lately. What pieces from that era are you seeing the most demand for?',
      category: 'vintage-fashion',
      author: {
        name: 'Sophie Chen',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
        badge: 'Fashion Historian'
      },
      stats: {
        replies: 27,
        views: 512,
        likes: 16
      },
      lastActivity: new Date(Date.now() - 14400000),
      isPinned: false,
      isHot: false,
      tags: ['70s-fashion', 'trends', 'vintage']
    }
  ];

  const filteredDiscussions = discussions?.filter(discussion => 
    activeCategory === 'all' || discussion?.category === activeCategory
  );

  const sortedDiscussions = [...filteredDiscussions]?.sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b?.lastActivity - a?.lastActivity;
      case 'popular':
        return b?.stats?.replies - a?.stats?.replies;
      case 'views':
        return b?.stats?.views - a?.stats?.views;
      default:
        return 0;
    }
  });

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Vintage Expert': return 'bg-warning text-warning-foreground';
      case 'Eco Warrior': return 'bg-success text-success-foreground';
      case 'New Seller': return 'bg-primary text-primary-foreground';
      case 'Design Enthusiast': return 'bg-accent text-accent-foreground';
      case 'Fashion Historian': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-organic overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={20} className="text-secondary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Discussion Forum</h2>
              <p className="text-sm text-muted-foreground">Community conversations</p>
            </div>
          </div>
          <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
            New Topic
          </Button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Replies</option>
              <option value="views">Most Views</option>
            </select>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredDiscussions?.length} topics
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="p-6 pb-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {forumCategories?.map((category) => (
            <button
              key={category?.key}
              onClick={() => setActiveCategory(category?.key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-organic ${
                activeCategory === category?.key
                  ? 'bg-primary text-primary-foreground shadow-organic'
                  : 'bg-surface text-foreground hover:bg-secondary/20'
              }`}
            >
              <Icon name={category?.icon} size={14} />
              <span>{category?.label}</span>
              <span className="bg-black/10 text-xs px-1.5 py-0.5 rounded-full">
                {category?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Discussions */}
      <div className="divide-y divide-border">
        {sortedDiscussions?.map((discussion) => (
          <div key={discussion?.id} className="p-6 hover:bg-surface/50 transition-organic cursor-pointer">
            <div className="flex items-start space-x-4">
              {/* Author Avatar */}
              <div className="flex-shrink-0">
                <Image
                  src={discussion?.author?.avatar}
                  alt={discussion?.author?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              {/* Discussion Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {discussion?.isPinned && (
                      <Icon name="Pin" size={16} className="text-accent" />
                    )}
                    {discussion?.isHot && (
                      <Icon name="Flame" size={16} className="text-error" />
                    )}
                    <h3 className="font-semibold text-foreground hover:text-primary transition-organic">
                      {discussion?.title}
                    </h3>
                  </div>
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {discussion?.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {discussion?.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Discussion Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{discussion?.author?.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(discussion?.author?.badge)}`}>
                        {discussion?.author?.badge}
                      </span>
                    </div>
                    <span>•</span>
                    <span>{formatTimeAgo(discussion?.lastActivity)}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={14} />
                      <span>{discussion?.stats?.replies}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={14} />
                      <span>{discussion?.stats?.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={14} />
                      <span>{discussion?.stats?.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="p-6 text-center border-t border-border">
        <Button variant="ghost" iconName="RefreshCw" iconPosition="left">
          Load More Discussions
        </Button>
      </div>
    </div>
  );
};

export default DiscussionForum;