import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityFeed = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const feedPosts = [
    {
      id: 1,
      type: 'transformation',
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        badge: "Eco Warrior",
        followers: 1247
      },
      content: `Just finished transforming this vintage leather jacket I found at EcoFinds! \n\nAdded some embroidered patches and replaced the zipper. It went from dated to absolutely stunning! The quality of vintage leather is unmatched - this piece will last another 30 years easily.`,
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop"
      ],
      tags: ["TransformationTuesday", "VintageLeather", "DIY"],
      likes: 89,
      comments: 23,
      shares: 12,
      timestamp: new Date(Date.now() - 3600000),
      category: "transformation"
    },
    {
      id: 2,
      type: 'sustainable-swap',
      user: {
        name: "Marcus Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        badge: "Green Champion",
        followers: 892
      },
      content: `Made the switch from fast fashion to second-hand shopping 6 months ago and I'm never going back! \n\nMy wardrobe is more unique, higher quality, and I've saved over $800 while reducing my carbon footprint by 65%. Here's my latest EcoFinds haul - each piece has such character!`,
      images: [
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop"
      ],
      tags: ["SustainableSwap", "SecondHandFirst", "EcoFashion"],
      likes: 156,
      comments: 34,
      shares: 28,
      timestamp: new Date(Date.now() - 7200000),
      category: "sustainable-swap"
    },
    {
      id: 3,
      type: 'seller-spotlight',
      user: {
        name: "EcoFinds Team",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        badge: "Official",
        followers: 15420
      },
      content: `🌟 Seller Spotlight: Meet Emma Thompson! \n\nEmma has been with our community for 2 years and has helped 500+ items find new homes. Her specialty? Vintage home decor with authentic stories. Each listing includes the item's history and styling tips. \n\n"I love giving forgotten treasures a chance to shine again," says Emma.`,
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
      ],
      tags: ["SellerSpotlight", "VintageDecor", "CommunityHero"],
      likes: 203,
      comments: 45,
      shares: 67,
      timestamp: new Date(Date.now() - 10800000),
      category: "seller-spotlight"
    },
    {
      id: 4,
      type: 'care-guide',
      user: {
        name: "Dr. Lisa Park",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
        badge: "Textile Expert",
        followers: 3456
      },
      content: `Pro tip for caring for vintage wool sweaters! \n\n1. Always hand wash in cool water with wool-specific detergent\n2. Never wring - gently squeeze out excess water\n3. Lay flat to dry on a clean towel\n4. Store with cedar blocks to prevent moths\n\nProper care can extend a wool sweater's life by decades. Your wallet and the planet will thank you!`,
      images: [
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop"
      ],
      tags: ["CareGuide", "WoolCare", "SustainableLiving"],
      likes: 127,
      comments: 18,
      shares: 31,
      timestamp: new Date(Date.now() - 14400000),
      category: "education"
    }
  ];

  const filterOptions = [
    { key: 'all', label: 'All Posts', icon: 'Grid3X3' },
    { key: 'transformation', label: 'Transformations', icon: 'Sparkles' },
    { key: 'sustainable-swap', label: 'Swaps', icon: 'RefreshCw' },
    { key: 'seller-spotlight', label: 'Spotlights', icon: 'Star' },
    { key: 'education', label: 'Guides', icon: 'BookOpen' }
  ];

  const filteredPosts = activeFilter === 'all' 
    ? feedPosts 
    : feedPosts?.filter(post => post?.category === activeFilter);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleLike = (postId) => {
    // Mock like functionality
    console.log(`Liked post ${postId}`);
  };

  const handleComment = (postId) => {
    // Mock comment functionality
    console.log(`Comment on post ${postId}`);
  };

  const handleShare = (postId) => {
    // Mock share functionality
    console.log(`Shared post ${postId}`);
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="bg-card rounded-lg p-4 shadow-organic">
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((option) => (
            <button
              key={option?.key}
              onClick={() => setActiveFilter(option?.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-organic ${
                activeFilter === option?.key
                  ? 'bg-primary text-primary-foreground shadow-organic'
                  : 'bg-surface text-foreground hover:bg-secondary/20'
              }`}
            >
              <Icon name={option?.icon} size={16} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Feed Posts */}
      <div className="space-y-6">
        {filteredPosts?.map((post) => (
          <div key={post?.id} className="bg-card rounded-lg shadow-organic overflow-hidden">
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={post?.user?.avatar}
                      alt={post?.user?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded-full font-medium">
                      {post?.user?.badge}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{post?.user?.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{post?.user?.followers?.toLocaleString()} followers</span>
                      <span>•</span>
                      <span>{formatTimeAgo(post?.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
              </div>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-4">
              <p className="text-foreground whitespace-pre-line leading-relaxed">
                {post?.content}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {post?.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Post Images */}
            {post?.images && post?.images?.length > 0 && (
              <div className={`px-6 pb-4 ${post?.images?.length > 1 ? 'grid grid-cols-2 gap-2' : ''}`}>
                {post?.images?.map((image, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`Post image ${index + 1}`}
                      className="w-full h-64 object-cover hover:scale-105 transition-organic cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Post Actions */}
            <div className="px-6 py-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post?.id)}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-organic"
                  >
                    <Icon name="Heart" size={20} />
                    <span className="text-sm font-medium">{post?.likes}</span>
                  </button>
                  <button
                    onClick={() => handleComment(post?.id)}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-organic"
                  >
                    <Icon name="MessageCircle" size={20} />
                    <span className="text-sm font-medium">{post?.comments}</span>
                  </button>
                  <button
                    onClick={() => handleShare(post?.id)}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-secondary-foreground transition-organic"
                  >
                    <Icon name="Share2" size={20} />
                    <span className="text-sm font-medium">{post?.shares}</span>
                  </button>
                </div>
                <Button variant="ghost" size="sm" iconName="Bookmark" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center py-8">
        <Button variant="outline" iconName="RefreshCw" iconPosition="left">
          Load More Posts
        </Button>
      </div>
    </div>
  );
};

export default CommunityFeed;