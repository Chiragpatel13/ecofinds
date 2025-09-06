import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChallengeCard = () => {
  const [joinedChallenges, setJoinedChallenges] = useState(['sustainable-30']);

  const challenges = [
    {
      id: 'sustainable-30',
      title: '30-Day Sustainable Shopping',
      description: 'Commit to buying only second-hand items for 30 days and track your environmental impact.',
      duration: '30 days',
      participants: 1247,
      reward: 'Eco Warrior Badge',
      progress: 67,
      daysLeft: 10,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop',
      difficulty: 'Medium',
      category: 'Shopping'
    },
    {
      id: 'transformation-week',
      title: 'Transformation Week',
      description: 'Transform one item from your wardrobe or home into something new and share your process.',
      duration: '7 days',
      participants: 892,
      reward: 'DIY Master Badge',
      progress: 0,
      daysLeft: 7,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
      difficulty: 'Easy',
      category: 'DIY'
    },
    {
      id: 'zero-waste',
      title: 'Zero Waste Home Challenge',
      description: 'Reduce household waste to zero by reusing, repurposing, and buying only what you need.',
      duration: '21 days',
      participants: 634,
      reward: 'Zero Waste Hero Badge',
      progress: 0,
      daysLeft: 21,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=200&fit=crop',
      difficulty: 'Hard',
      category: 'Lifestyle'
    }
  ];

  const handleJoinChallenge = (challengeId) => {
    if (joinedChallenges?.includes(challengeId)) {
      setJoinedChallenges(joinedChallenges?.filter(id => id !== challengeId));
    } else {
      setJoinedChallenges([...joinedChallenges, challengeId]);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Hard': return 'bg-error text-error-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Shopping': return 'ShoppingBag';
      case 'DIY': return 'Wrench';
      case 'Lifestyle': return 'Home';
      default: return 'Target';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-organic overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="Trophy" size={20} className="text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Community Challenges</h2>
              <p className="text-sm text-muted-foreground">Join challenges and earn badges</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
        </div>
      </div>
      <div className="p-6 space-y-6">
        {challenges?.map((challenge) => {
          const isJoined = joinedChallenges?.includes(challenge?.id);
          
          return (
            <div key={challenge?.id} className="border border-border rounded-lg overflow-hidden">
              {/* Challenge Image */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={challenge?.image}
                  alt={challenge?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge?.difficulty)}`}>
                    {challenge?.difficulty}
                  </span>
                  <span className="bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {challenge?.duration}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 bg-surface rounded-full flex items-center justify-center">
                    <Icon name={getCategoryIcon(challenge?.category)} size={16} className="text-foreground" />
                  </div>
                </div>
              </div>
              {/* Challenge Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{challenge?.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {challenge?.description}
                    </p>
                  </div>
                </div>

                {/* Challenge Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{challenge?.participants?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Award" size={14} />
                      <span>{challenge?.reward}</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {challenge?.daysLeft} days left
                  </div>
                </div>

                {/* Progress Bar (only for joined challenges) */}
                {isJoined && challenge?.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Progress</span>
                      <span className="text-sm text-muted-foreground">{challenge?.progress}%</span>
                    </div>
                    <div className="w-full bg-surface rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${challenge?.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  variant={isJoined ? "outline" : "default"}
                  size="sm"
                  fullWidth
                  iconName={isJoined ? "Check" : "Plus"}
                  iconPosition="left"
                  onClick={() => handleJoinChallenge(challenge?.id)}
                  className={isJoined ? "border-success text-success hover:bg-success/10" : ""}
                >
                  {isJoined ? "Joined" : "Join Challenge"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {/* View All Challenges */}
      <div className="p-6 pt-0">
        <Button variant="ghost" fullWidth iconName="ArrowRight" iconPosition="right">
          View All Challenges
        </Button>
      </div>
    </div>
  );
};

export default ChallengeCard;