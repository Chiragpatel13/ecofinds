import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingActionButton = ({ onSellClick, onCameraClick, onVoiceSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const actions = [
    {
      icon: 'Plus',
      label: 'List Item',
      onClick: onSellClick,
      className: 'bg-primary hover:bg-primary/90 text-primary-foreground'
    },
    {
      icon: 'Camera',
      label: 'Visual Search',
      onClick: onCameraClick,
      className: 'bg-accent hover:bg-accent/90 text-accent-foreground'
    },
    {
      icon: 'Mic',
      label: 'Voice Search',
      onClick: onVoiceSearch,
      className: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-fade-in">
          {actions?.map((action, index) => (
            <div
              key={action?.label}
              className="flex items-center space-x-3 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="bg-card text-foreground px-3 py-2 rounded-lg shadow-organic text-sm font-medium whitespace-nowrap">
                {action?.label}
              </span>
              <Button
                variant="default"
                size="icon"
                onClick={() => {
                  action?.onClick();
                  setIsExpanded(false);
                }}
                className={`w-12 h-12 rounded-full shadow-organic-lg ${action?.className}`}
              >
                <Icon name={action?.icon} size={20} />
              </Button>
            </div>
          ))}
        </div>
      )}
      {/* Main FAB */}
      <Button
        variant="default"
        size="icon"
        onClick={toggleExpanded}
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-organic-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <Icon 
          name={isExpanded ? "X" : "Plus"} 
          size={24} 
          className={`transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}
        />
      </Button>
    </div>
  );
};

export default FloatingActionButton;