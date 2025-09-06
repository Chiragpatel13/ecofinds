import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = () => {
  const achievements = [
    {
      id: 1,
      title: "First Sale",
      description: "Completed your first successful sale",
      icon: "Star",
      color: "bg-success",
      earned: true,
      earnedDate: "Dec 15, 2024"
    },
    {
      id: 2,
      title: "Eco Warrior",
      description: "Saved 50+ items from landfills",
      icon: "Leaf",
      color: "bg-primary",
      earned: true,
      earnedDate: "Jan 2, 2025"
    },
    {
      id: 3,
      title: "Top Seller",
      description: "Achieved 50+ sales milestone",
      icon: "Trophy",
      color: "bg-accent",
      earned: false,
      progress: 32,
      target: 50
    },
    {
      id: 4,
      title: "Community Favorite",
      description: "Received 100+ positive reviews",
      icon: "Heart",
      color: "bg-error",
      earned: false,
      progress: 67,
      target: 100
    },
    {
      id: 5,
      title: "Quick Seller",
      description: "Average listing sells within 3 days",
      icon: "Zap",
      color: "bg-warning",
      earned: true,
      earnedDate: "Dec 28, 2024"
    },
    {
      id: 6,
      title: "Photographer",
      description: "Upload 10+ high-quality photos",
      icon: "Camera",
      color: "bg-secondary",
      earned: false,
      progress: 7,
      target: 10
    }
  ];

  const earnedAchievements = achievements?.filter(a => a?.earned);
  const inProgressAchievements = achievements?.filter(a => !a?.earned);

  return (
    <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Award" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
          <p className="text-sm text-muted-foreground">
            {earnedAchievements?.length} of {achievements?.length} earned
          </p>
        </div>
      </div>
      {/* Earned Achievements */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Earned Badges</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {earnedAchievements?.map(achievement => (
            <div
              key={achievement?.id}
              className="p-4 bg-surface rounded-lg border border-border text-center group hover:shadow-organic transition-organic"
            >
              <div className={`w-12 h-12 ${achievement?.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-organic`}>
                <Icon name={achievement?.icon} size={24} className="text-white" />
              </div>
              <h5 className="font-medium text-foreground mb-1">{achievement?.title}</h5>
              <p className="text-xs text-muted-foreground mb-2">{achievement?.description}</p>
              <p className="text-xs text-success font-medium">
                Earned {achievement?.earnedDate}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* In Progress Achievements */}
      <div>
        <h4 className="font-medium text-foreground mb-3">In Progress</h4>
        <div className="space-y-3">
          {inProgressAchievements?.map(achievement => (
            <div
              key={achievement?.id}
              className="p-4 bg-background rounded-lg border border-border"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 ${achievement?.color}/20 rounded-full flex items-center justify-center`}>
                  <Icon name={achievement?.icon} size={20} className={`${achievement?.color?.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-foreground">{achievement?.title}</h5>
                    <span className="text-sm text-muted-foreground">
                      {achievement?.progress}/{achievement?.target}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{achievement?.description}</p>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${achievement?.color} transition-all duration-500`}
                      style={{ width: `${(achievement?.progress / achievement?.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 p-4 bg-surface rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Target" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Next Milestone</h4>
            <p className="text-sm text-muted-foreground">
              Complete 18 more sales to unlock the "Top Seller" achievement and earn a special badge for your profile!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;