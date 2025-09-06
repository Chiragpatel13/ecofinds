import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialShare = ({ userStats }) => {
  const [shareType, setShareType] = useState('monthly');

  const shareMessages = {
    monthly: `I've saved ${userStats?.co2Saved}kg of CO2 this month by shopping second-hand on EcoFinds! 🌱 Join me in making sustainable choices. #CircularEconomy #SustainableLiving`,
    milestone: `Just reached my sustainability milestone on EcoFinds! ${userStats?.itemsSaved} items saved from landfills 🎉 Every purchase makes a difference. #EcoFinds #SustainableChoices`,
    achievement: `Unlocked a new achievement on EcoFinds! 🏆 Proud to be part of a community that's making real environmental impact. #SustainableShopping #CircularStories`
  };

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => {
        const text = encodeURIComponent(shareMessages?.[shareType]);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        const url = encodeURIComponent(window.location?.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
      }
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-700 hover:bg-blue-800',
      action: () => {
        const text = encodeURIComponent(shareMessages?.[shareType]);
        const url = encodeURIComponent(window.location?.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
      }
    },
    {
      name: 'Instagram',
      icon: 'Instagram',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      action: () => {
        // Instagram doesn't support direct sharing, so copy to clipboard
        navigator.clipboard?.writeText(shareMessages?.[shareType]);
        alert('Message copied to clipboard! Share it on Instagram.');
      }
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(shareMessages?.[shareType]);
    alert('Message copied to clipboard!');
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Share Your Impact</h3>
        <Icon name="Share2" size={20} className="text-primary" />
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Choose what to share
          </label>
          <div className="space-y-2">
            {Object.entries({
              monthly: 'Monthly Progress',
              milestone: 'Latest Milestone',
              achievement: 'New Achievement'
            })?.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setShareType(key)}
                className={`w-full p-3 rounded-lg border text-left transition-organic ${
                  shareType === key
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
                }`}
              >
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Preview Message</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {shareMessages?.[shareType]}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Share on</h4>
          <div className="grid grid-cols-2 gap-3">
            {socialPlatforms?.map((platform) => (
              <Button
                key={platform?.name}
                onClick={platform?.action}
                className={`${platform?.color} text-white border-0 justify-start`}
                iconName={platform?.icon}
                iconPosition="left"
              >
                {platform?.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={copyToClipboard}
            iconName="Copy"
            iconPosition="left"
            fullWidth
          >
            Copy Message
          </Button>
        </div>

        <div className="bg-success/10 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-success flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-success mb-1">Inspire Others</h5>
              <p className="text-xs text-success/80">
                Sharing your sustainability journey encourages others to make eco-friendly choices and join our circular economy community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;