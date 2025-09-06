import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ icon, title, value, unit, comparison, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary text-primary-foreground',
    success: 'bg-success text-success-foreground',
    accent: 'bg-accent text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground'
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-organic border border-border hover:shadow-organic-lg transition-organic">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colorClasses?.[color]} flex items-center justify-center`}>
          <Icon name={icon} size={24} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend > 0 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
          }`}>
            <Icon name={trend > 0 ? 'TrendingUp' : 'TrendingDown'} size={12} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        {comparison && (
          <p className="text-xs text-muted-foreground">{comparison}</p>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;