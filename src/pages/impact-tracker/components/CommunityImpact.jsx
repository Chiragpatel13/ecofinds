import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunityImpact = () => {
  const communityStats = [
    {
      id: 1,
      metric: "Items Saved",
      value: "2,847",
      period: "This Month",
      icon: "Package",
      color: "text-primary"
    },
    {
      id: 2,
      metric: "CO2 Prevented",
      value: "15.2",
      unit: "tons",
      period: "This Month",
      icon: "Leaf",
      color: "text-success"
    },
    {
      id: 3,
      metric: "Community Members",
      value: "12,456",
      period: "Total Active",
      icon: "Users",
      color: "text-accent"
    },
    {
      id: 4,
      metric: "Cities Reached",
      value: "89",
      period: "Worldwide",
      icon: "MapPin",
      color: "text-secondary-foreground"
    }
  ];

  const cityComparisons = [
    { city: "San Francisco", items: 1247, rank: 1 },
    { city: "Portland", items: 1156, rank: 2 },
    { city: "Seattle", items: 1089, rank: 3 },
    { city: "Austin", items: 987, rank: 4 },
    { city: "Denver", items: 856, rank: 5 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Community Impact</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Globe" size={16} />
            <span>Global Network</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {communityStats?.map((stat) => (
            <div key={stat?.id} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-2xl font-bold text-foreground">{stat?.value}</span>
                  {stat?.unit && (
                    <span className="text-sm text-muted-foreground">{stat?.unit}</span>
                  )}
                </div>
                <p className="text-xs font-medium text-foreground">{stat?.metric}</p>
                <p className="text-xs text-muted-foreground">{stat?.period}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6">
          <h4 className="text-sm font-medium text-foreground mb-4">Top Contributing Cities</h4>
          <div className="space-y-3">
            {cityComparisons?.map((city) => (
              <div key={city?.city} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    city?.rank === 1 ? 'bg-accent text-accent-foreground' :
                    city?.rank === 2 ? 'bg-secondary text-secondary-foreground' :
                    city?.rank === 3 ? 'bg-warning text-warning-foreground': 'bg-muted text-muted-foreground'
                  }`}>
                    {city?.rank}
                  </div>
                  <span className="text-sm font-medium text-foreground">{city?.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{city?.items} items</span>
                  <Icon name="TrendingUp" size={14} className="text-success" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityImpact;