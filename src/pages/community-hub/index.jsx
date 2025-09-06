import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CommunityFeed from './components/CommunityFeed';
import ChallengeCard from './components/ChallengeCard';
import KnowledgeBase from './components/KnowledgeBase';
import UserProfile from './components/UserProfile';
import DiscussionForum from './components/DiscussionForum';
import ContentCreation from './components/ContentCreation';

const CommunityHub = () => {
  const [activeView, setActiveView] = useState('feed');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navigationTabs = [
    { key: 'feed', label: 'Community Feed', icon: 'Home' },
    { key: 'discussions', label: 'Discussions', icon: 'MessageSquare' },
    { key: 'knowledge', label: 'Knowledge Base', icon: 'BookOpen' },
    { key: 'challenges', label: 'Challenges', icon: 'Trophy' },
    { key: 'profile', label: 'My Profile', icon: 'User' }
  ];

  const communityStats = {
    totalMembers: 15420,
    activeToday: 1247,
    postsToday: 89,
    challengesActive: 12
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'feed':
        return <CommunityFeed />;
      case 'discussions':
        return <DiscussionForum />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'challenges':
        return <ChallengeCard />;
      case 'profile':
        return <UserProfile />;
      default:
        return <CommunityFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <div className="pt-24 pb-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Users" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">Community Hub</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connect with fellow eco-warriors, share your sustainable journey, and discover the stories behind every pre-loved treasure
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-lg p-4 text-center shadow-organic">
              <div className="text-2xl font-bold text-primary mb-1">
                {communityStats?.totalMembers?.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Community Members</div>
            </div>
            <div className="bg-card rounded-lg p-4 text-center shadow-organic">
              <div className="text-2xl font-bold text-success mb-1">
                {communityStats?.activeToday?.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Active Today</div>
            </div>
            <div className="bg-card rounded-lg p-4 text-center shadow-organic">
              <div className="text-2xl font-bold text-accent mb-1">
                {communityStats?.postsToday}
              </div>
              <div className="text-sm text-muted-foreground">Posts Today</div>
            </div>
            <div className="bg-card rounded-lg p-4 text-center shadow-organic">
              <div className="text-2xl font-bold text-warning mb-1">
                {communityStats?.challengesActive}
              </div>
              <div className="text-sm text-muted-foreground">Active Challenges</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-card rounded-lg p-2 shadow-organic mb-8">
            <div className="flex flex-wrap gap-1">
              {navigationTabs?.map((tab) => (
                <button
                  key={tab?.key}
                  onClick={() => setActiveView(tab?.key)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-organic flex-1 justify-center min-w-0 ${
                    activeView === tab?.key
                      ? 'bg-primary text-primary-foreground shadow-organic'
                      : 'text-foreground hover:bg-surface'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span className="hidden sm:inline truncate">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {renderActiveView()}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-card rounded-lg shadow-organic overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-3">
                <Button
                  variant="default"
                  size="sm"
                  fullWidth
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setShowCreateModal(true)}
                >
                  Create Post
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="MessageSquare"
                  iconPosition="left"
                >
                  Start Discussion
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Trophy"
                  iconPosition="left"
                >
                  Join Challenge
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  Browse Guides
                </Button>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-card rounded-lg shadow-organic overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Trending Topics</h3>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { tag: 'VintageFinds', posts: 234 },
                  { tag: 'TransformationTuesday', posts: 189 },
                  { tag: 'SustainableFashion', posts: 156 },
                  { tag: 'ThriftFlip', posts: 142 },
                  { tag: 'EcoWarrior', posts: 98 }
                ]?.map((topic) => (
                  <div key={topic?.tag} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary cursor-pointer hover:underline">
                      #{topic?.tag}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {topic?.posts} posts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-card rounded-lg shadow-organic overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Community Guidelines</h3>
              </div>
              <div className="p-4 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <Icon name="Heart" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Be kind and respectful to all community members</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Share authentic content and honest reviews</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Leaf" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>Focus on sustainability and circular economy</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Users" size={16} className="text-secondary-foreground mt-0.5 flex-shrink-0" />
                  <span>Help others discover amazing pre-loved finds</span>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Button variant="ghost" size="sm" fullWidth iconName="ExternalLink" iconPosition="right">
                  Read Full Guidelines
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Create Content Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Create New Content</h2>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowCreateModal(false)}
              />
            </div>
            <div className="p-0">
              <ContentCreation />
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="Users" size={20} className="text-primary" />
              <span className="font-semibold text-foreground">EcoFinds Community</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Building a sustainable future, one pre-loved treasure at a time
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <span>© {new Date()?.getFullYear()} EcoFinds</span>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-organic">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-organic">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-organic">Community Guidelines</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityHub;