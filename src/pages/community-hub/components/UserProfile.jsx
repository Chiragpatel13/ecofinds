import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('stats');

  const userProfile = {
    name: "Sarah Chen",
    username: "@sarahc_eco",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=200&fit=crop",
    bio: "Sustainable fashion enthusiast & vintage collector. Helping others discover the beauty of pre-loved treasures. 🌱✨",
    location: "San Francisco, CA",
    joinedDate: "March 2022",
    verified: true,
    badges: [
      { name: "Eco Warrior", icon: "Leaf", color: "bg-success" },
      { name: "Top Seller", icon: "Star", color: "bg-warning" },
      { name: "Community Helper", icon: "Heart", color: "bg-accent" }
    ],
    stats: {
      itemsSold: 127,
      itemsBought: 89,
      co2Saved: 245,
      moneyEarned: 3420,
      followers: 1247,
      following: 892,
      posts: 156
    },
    recentActivity: [
      {
        id: 1,
        type: 'sale',
        item: 'Vintage Leather Jacket',
        amount: 85,
        buyer: 'Emma Wilson',
        date: new Date(Date.now() - 3600000),
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop'
      },
      {
        id: 2,
        type: 'purchase',
        item: 'Ceramic Vase Set',
        amount: 45,
        seller: 'Marcus Rodriguez',
        date: new Date(Date.now() - 7200000),
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop'
      },
      {
        id: 3,
        type: 'post',
        content: 'Just transformed this vintage dress!',
        likes: 34,
        date: new Date(Date.now() - 14400000),
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop'
      }
    ],
    achievements: [
      {
        id: 1,
        title: "First Sale",
        description: "Completed your first successful sale",
        icon: "DollarSign",
        earned: true,
        date: "March 15, 2022"
      },
      {
        id: 2,
        title: "Eco Champion",
        description: "Saved 100kg of CO2 through sustainable shopping",
        icon: "Leaf",
        earned: true,
        date: "June 8, 2023"
      },
      {
        id: 3,
        title: "Community Leader",
        description: "Reached 1000 followers",
        icon: "Users",
        earned: true,
        date: "August 22, 2023"
      },
      {
        id: 4,
        title: "Master Seller",
        description: "Complete 200 successful sales",
        icon: "Award",
        earned: false,
        progress: 63.5
      }
    ]
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'sale': return 'TrendingUp';
      case 'purchase': return 'ShoppingBag';
      case 'post': return 'MessageSquare';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'sale': return 'text-success';
      case 'purchase': return 'text-primary';
      case 'post': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-organic overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-32 overflow-hidden">
        <Image
          src={userProfile?.coverImage}
          alt="Profile cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      {/* Profile Header */}
      <div className="relative px-6 pb-6">
        <div className="flex items-end justify-between -mt-16 mb-4">
          <div className="relative">
            <Image
              src={userProfile?.avatar}
              alt={userProfile?.name}
              className="w-24 h-24 rounded-full border-4 border-card object-cover"
            />
            {userProfile?.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} className="text-primary-foreground" />
              </div>
            )}
          </div>
          <Button variant="outline" size="sm" iconName="Settings">
            Edit Profile
          </Button>
        </div>

        {/* Profile Info */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground mb-1">{userProfile?.name}</h1>
          <p className="text-muted-foreground mb-2">{userProfile?.username}</p>
          <p className="text-foreground leading-relaxed mb-3">{userProfile?.bio}</p>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{userProfile?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>Joined {userProfile?.joinedDate}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {userProfile?.badges?.map((badge) => (
              <div
                key={badge?.name}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full text-white text-sm font-medium ${badge?.color}`}
              >
                <Icon name={badge?.icon} size={14} />
                <span>{badge?.name}</span>
              </div>
            ))}
          </div>

          {/* Follow Stats */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-foreground">{userProfile?.stats?.followers?.toLocaleString()}</span>
              <span className="text-muted-foreground">followers</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-foreground">{userProfile?.stats?.following?.toLocaleString()}</span>
              <span className="text-muted-foreground">following</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-foreground">{userProfile?.stats?.posts}</span>
              <span className="text-muted-foreground">posts</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-surface rounded-lg p-1">
          {[
            { key: 'stats', label: 'Stats', icon: 'BarChart3' },
            { key: 'activity', label: 'Activity', icon: 'Activity' },
            { key: 'achievements', label: 'Achievements', icon: 'Award' }
          ]?.map((tab) => (
            <button
              key={tab?.key}
              onClick={() => setActiveTab(tab?.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-organic flex-1 justify-center ${
                activeTab === tab?.key
                  ? 'bg-card text-foreground shadow-organic'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-success mb-1">{userProfile?.stats?.itemsSold}</div>
              <div className="text-sm text-muted-foreground">Items Sold</div>
            </div>
            <div className="bg-surface rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{userProfile?.stats?.itemsBought}</div>
              <div className="text-sm text-muted-foreground">Items Bought</div>
            </div>
            <div className="bg-surface rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent mb-1">{userProfile?.stats?.co2Saved}kg</div>
              <div className="text-sm text-muted-foreground">CO₂ Saved</div>
            </div>
            <div className="bg-surface rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-warning mb-1">${userProfile?.stats?.moneyEarned}</div>
              <div className="text-sm text-muted-foreground">Earned</div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            {userProfile?.recentActivity?.map((activity) => (
              <div key={activity?.id} className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                <div className="w-12 h-12 overflow-hidden rounded-lg flex-shrink-0">
                  <Image
                    src={activity?.image}
                    alt="Activity"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name={getActivityIcon(activity?.type)} size={14} className={getActivityColor(activity?.type)} />
                    <span className="text-sm font-medium text-foreground">
                      {activity?.type === 'sale' && `Sold ${activity?.item}`}
                      {activity?.type === 'purchase' && `Bought ${activity?.item}`}
                      {activity?.type === 'post' && activity?.content}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity?.amount && `$${activity?.amount} • `}
                    {formatTimeAgo(activity?.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-3">
            {userProfile?.achievements?.map((achievement) => (
              <div
                key={achievement?.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border ${
                  achievement?.earned
                    ? 'bg-success/10 border-success/20' :'bg-surface border-border'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  achievement?.earned ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={achievement?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{achievement?.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement?.description}</p>
                  {achievement?.earned ? (
                    <p className="text-xs text-success mt-1">Earned {achievement?.date}</p>
                  ) : (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs text-muted-foreground">{achievement?.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${achievement?.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;