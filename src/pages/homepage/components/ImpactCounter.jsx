import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ImpactCounter = () => {
  const [counters, setCounters] = useState({
    itemsSaved: 0,
    co2Prevented: 0,
    treesSaved: 0
  });

  const finalValues = {
    itemsSaved: 2847,
    co2Prevented: 1256,
    treesSaved: 89
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(finalValues)?.map(key => {
      const increment = finalValues?.[key] / steps;
      let currentStep = 0;

      return setInterval(() => {
        if (currentStep < steps) {
          setCounters(prev => ({
            ...prev,
            [key]: Math.floor(increment * currentStep)
          }));
          currentStep++;
        } else {
          setCounters(prev => ({
            ...prev,
            [key]: finalValues?.[key]
          }));
        }
      }, stepDuration);
    });

    return () => intervals?.forEach(clearInterval);
  }, []);

  const impactItems = [
    {
      key: 'itemsSaved',
      value: counters?.itemsSaved,
      label: 'Items Saved from Landfills',
      icon: 'Package',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      suffix: ''
    },
    {
      key: 'co2Prevented',
      value: counters?.co2Prevented,
      label: 'kg CO₂ Emissions Prevented',
      icon: 'Leaf',
      color: 'text-success',
      bgColor: 'bg-success/10',
      suffix: 'kg'
    },
    {
      key: 'treesSaved',
      value: counters?.treesSaved,
      label: 'Trees Worth of Impact',
      icon: 'TreePine',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      suffix: ''
    }
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="TrendingUp" size={16} />
            <span>Real-Time Community Impact</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Together We're Making a Difference
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every purchase on EcoFinds contributes to a more sustainable future. 
            Here's the collective impact our community has achieved this month.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {impactItems?.map((item, index) => (
            <div
              key={item?.key}
              className="relative bg-card rounded-2xl p-8 shadow-organic hover:shadow-organic-lg transition-organic group"
            >
              {/* Background Icon */}
              <div className={`absolute top-4 right-4 w-12 h-12 ${item?.bgColor} rounded-xl flex items-center justify-center opacity-50 group-hover:opacity-70 transition-organic`}>
                <Icon name={item?.icon} size={24} className={item?.color} />
              </div>

              {/* Counter */}
              <div className="space-y-4">
                <div className={`w-16 h-16 ${item?.bgColor} rounded-2xl flex items-center justify-center`}>
                  <Icon name={item?.icon} size={28} className={item?.color} />
                </div>
                
                <div>
                  <div className="flex items-baseline space-x-1">
                    <span className={`text-4xl font-bold ${item?.color}`}>
                      {item?.value?.toLocaleString()}
                    </span>
                    {item?.suffix && (
                      <span className={`text-lg font-medium ${item?.color} opacity-80`}>
                        {item?.suffix}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground font-medium mt-2">
                    {item?.label}
                  </p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">This Month</span>
                  <span className={`${item?.color} font-medium`}>
                    +{Math.floor(item?.value * 0.15)} from last month
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      item?.key === 'itemsSaved' ? 'bg-primary' :
                      item?.key === 'co2Prevented' ? 'bg-success' : 'bg-accent'
                    }`}
                    style={{ width: `${Math.min((item?.value / finalValues?.[item?.key]) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Floating Animation */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-success rounded-full animate-ping opacity-75"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to see your personal impact? Track your sustainability journey.
          </p>
          <div className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-organic cursor-pointer">
            <Icon name="BarChart3" size={18} />
            <span className="font-medium">View Impact Tracker</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactCounter;