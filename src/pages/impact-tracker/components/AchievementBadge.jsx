import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadge = ({ icon, title, description, isUnlocked, progress, maxProgress, date }) => {
  const progressPercentage = maxProgress ? (progress / maxProgress) * 100 : 100;

  return (
    <div className={`bg-card rounded-lg p-4 border transition-organic hover:shadow-organic ${
      isUnlocked ? 'border-success shadow-organic' : 'border-border'
    }`}>
      <div className="flex items-start space-x-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isUnlocked 
            ? 'bg-success text-success-foreground' 
            : 'bg-muted text-muted-foreground'
        }`}>
          <Icon name={icon} size={20} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className={`text-sm font-medium ${
              isUnlocked ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {title}
            </h4>
            {isUnlocked && (
              <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mb-2">{description}</p>
          
          {!isUnlocked && maxProgress && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{progress}/{maxProgress}</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className="bg-primary h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {isUnlocked && date && (
            <p className="text-xs text-success font-medium">Unlocked {date}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;