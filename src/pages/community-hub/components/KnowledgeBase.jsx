import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const KnowledgeBase = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const knowledgeArticles = [
    {
      id: 1,
      title: 'How to Authenticate Designer Handbags',
      excerpt: 'Learn the key indicators that separate authentic luxury bags from counterfeits, including hardware details, stitching patterns, and serial numbers.',
      category: 'authentication',
      readTime: '8 min read',
      difficulty: 'Intermediate',
      author: 'Sarah Mitchell',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=250&fit=crop',
      views: 2847,
      likes: 156,
      tags: ['Designer', 'Authentication', 'Luxury'],
      publishedAt: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      title: 'Complete Guide to Removing Stains from Vintage Clothing',
      excerpt: 'Gentle yet effective methods for treating common stains on delicate vintage fabrics without damaging the material or original colors.',
      category: 'care',
      readTime: '12 min read',
      difficulty: 'Beginner',
      author: 'Dr. Lisa Park',
      authorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=250&fit=crop',
      views: 4521,
      likes: 289,
      tags: ['Vintage', 'Cleaning', 'Maintenance'],
      publishedAt: new Date(Date.now() - 172800000)
    },
    {
      id: 3,
      title: 'Extending Garment Life: Professional Care Tips',
      excerpt: 'Industry secrets from fashion professionals on how to make your clothes last decades with proper storage, cleaning, and maintenance techniques.',
      category: 'care',
      readTime: '15 min read',
      difficulty: 'Advanced',
      author: 'Marcus Rodriguez',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      views: 1923,
      likes: 134,
      tags: ['Care', 'Professional', 'Longevity'],
      publishedAt: new Date(Date.now() - 259200000)
    },
    {
      id: 4,
      title: 'Sustainable Fashion: Understanding Fabric Impact',
      excerpt: 'Deep dive into how different fabrics affect the environment and which materials to prioritize when building a sustainable wardrobe.',
      category: 'sustainability',
      readTime: '10 min read',
      difficulty: 'Intermediate',
      author: 'Emma Thompson',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop',
      views: 3156,
      likes: 201,
      tags: ['Sustainability', 'Fabrics', 'Environment'],
      publishedAt: new Date(Date.now() - 345600000)
    },
    {
      id: 5,
      title: 'Pricing Your Pre-Loved Items: A Seller\'s Guide',
      excerpt: 'Strategic approach to pricing second-hand items for quick sales while maximizing value, including market research and condition assessment.',
      category: 'selling',
      readTime: '7 min read',
      difficulty: 'Beginner',
      author: 'James Wilson',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      views: 2634,
      likes: 178,
      tags: ['Selling', 'Pricing', 'Strategy'],
      publishedAt: new Date(Date.now() - 432000000)
    }
  ];

  const categories = [
    { key: 'all', label: 'All Guides', icon: 'BookOpen', count: knowledgeArticles?.length },
    { key: 'authentication', label: 'Authentication', icon: 'Shield', count: 1 },
    { key: 'care', label: 'Item Care', icon: 'Heart', count: 2 },
    { key: 'sustainability', label: 'Sustainability', icon: 'Leaf', count: 1 },
    { key: 'selling', label: 'Selling Tips', icon: 'DollarSign', count: 1 }
  ];

  const filteredArticles = knowledgeArticles?.filter(article => {
    const matchesCategory = activeCategory === 'all' || article?.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      article?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      article?.excerpt?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      article?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success text-success-foreground';
      case 'Intermediate': return 'bg-warning text-warning-foreground';
      case 'Advanced': return 'bg-error text-error-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInDays = Math.floor((now - timestamp) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="bg-card rounded-lg shadow-organic overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Knowledge Base</h2>
              <p className="text-sm text-muted-foreground">Expert guides and tips</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Contribute
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search guides and tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>
      {/* Categories */}
      <div className="p-6 pb-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
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
      {/* Articles */}
      <div className="p-6 space-y-4">
        {filteredArticles?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No guides found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
          </div>
        ) : (
          filteredArticles?.map((article) => (
            <div key={article?.id} className="border border-border rounded-lg overflow-hidden hover:shadow-organic transition-organic">
              <div className="flex">
                {/* Article Image */}
                <div className="w-32 h-24 flex-shrink-0 overflow-hidden">
                  <Image
                    src={article?.image}
                    alt={article?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Content */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                        {article?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {article?.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Article Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={article?.authorAvatar}
                          alt={article?.author}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-muted-foreground">{article?.author}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{article?.readTime}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(article?.difficulty)}`}>
                        {article?.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={12} />
                        <span>{article?.views?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={12} />
                        <span>{article?.likes}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {article?.tags?.slice(0, 3)?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* View All */}
      <div className="p-6 pt-0">
        <Button variant="ghost" fullWidth iconName="ArrowRight" iconPosition="right">
          Browse All Guides
        </Button>
      </div>
    </div>
  );
};

export default KnowledgeBase;