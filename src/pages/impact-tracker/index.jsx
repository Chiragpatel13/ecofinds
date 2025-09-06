import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import ProgressChart from './components/ProgressChart';
import AchievementBadge from './components/AchievementBadge';
import CommunityImpact from './components/CommunityImpact';
import ImpactCalculator from './components/ImpactCalculator';
import SocialShare from './components/SocialShare';

const ImpactTracker = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  const [animatedValues, setAnimatedValues] = useState({
    co2: 0,
    water: 0,
    waste: 0,
    items: 0
  });

  // Mock user impact data
  const userStats = {
    co2Saved: 127.5,
    waterConserved: 15420,
    wasteDiverted: 89.2,
    itemsSaved: 23,
    treesEquivalent: 6,
    milesNotDriven: 294
  };

  // Animate counters on mount
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedValues({
          co2: Math.round(userStats?.co2Saved * progress * 10) / 10,
          water: Math.round(userStats?.waterConserved * progress),
          waste: Math.round(userStats?.wasteDiverted * progress * 10) / 10,
          items: Math.round(userStats?.itemsSaved * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    animateCounters();
  }, []);

  // Mock progress data
  const progressData = {
    monthly: [
      { month: 'Jan', value: 45 },
      { month: 'Feb', value: 52 },
      { month: 'Mar', value: 48 },
      { month: 'Apr', value: 61 },
      { month: 'May', value: 55 },
      { month: 'Jun', value: 67 },
      { month: 'Jul', value: 73 },
      { month: 'Aug', value: 69 },
      { month: 'Sep', value: 78 }
    ],
    yearly: [
      { month: '2021', value: 234 },
      { month: '2022', value: 456 },
      { month: '2023', value: 678 },
      { month: '2024', value: 892 }
    ]
  };

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      icon: 'ShoppingBag',
      title: 'First Purchase',
      description: 'Made your first sustainable purchase',
      isUnlocked: true,
      date: 'Jan 15, 2024'
    },
    {
      id: 2,
      icon: 'Recycle',
      title: 'Circular Champion',
      description: 'Saved 50+ items from landfills',
      isUnlocked: false,
      progress: 23,
      maxProgress: 50
    },
    {
      id: 3,
      icon: 'Users',
      title: 'Community Educator',
      description: 'Shared 10 sustainability tips',
      isUnlocked: false,
      progress: 3,
      maxProgress: 10
    },
    {
      id: 4,
      icon: 'Leaf',
      title: 'Carbon Saver',
      description: 'Prevented 100kg of CO2 emissions',
      isUnlocked: true,
      date: 'Aug 22, 2024'
    },
    {
      id: 5,
      icon: 'Award',
      title: 'Sustainability Star',
      description: 'Reached top 10% of eco-contributors',
      isUnlocked: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: 6,
      icon: 'Heart',
      title: 'Community Favorite',
      description: 'Received 100+ positive reviews',
      isUnlocked: false,
      progress: 67,
      maxProgress: 100
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Icon name="TrendingUp" size={16} />
              <span>Your Impact is Growing</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Your Sustainability Journey
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Track your environmental impact and celebrate every sustainable choice you make. 
              Together, we're building a more circular future.
            </p>
          </div>

          {/* Main Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <MetricsCard
              icon="Leaf"
              title="CO2 Emissions Saved"
              value={animatedValues?.co2}
              unit="kg"
              comparison={`Equivalent to planting ${userStats?.treesEquivalent} trees`}
              trend={12}
              color="success"
            />
            <MetricsCard
              icon="Droplets"
              title="Water Conserved"
              value={animatedValues?.water?.toLocaleString()}
              unit="liters"
              comparison="Enough for 2 months of drinking water"
              trend={8}
              color="primary"
            />
            <MetricsCard
              icon="Trash2"
              title="Waste Diverted"
              value={animatedValues?.waste}
              unit="kg"
              comparison="From landfills to new homes"
              trend={15}
              color="accent"
            />
            <MetricsCard
              icon="Package"
              title="Items Saved"
              value={animatedValues?.items}
              unit="pieces"
              comparison="Given second chances"
              trend={23}
              color="secondary"
            />
          </div>

          {/* Progress Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Progress Over Time</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={timeframe === 'monthly' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTimeframe('monthly')}
                  >
                    Monthly
                  </Button>
                  <Button
                    variant={timeframe === 'yearly' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTimeframe('yearly')}
                  >
                    Yearly
                  </Button>
                </div>
              </div>
              <ProgressChart
                data={progressData?.[timeframe]}
                title="CO2 Savings (kg)"
                type="area"
                color="#2D5A27"
              />
            </div>
            
            <ImpactCalculator />
          </div>

          {/* Achievements Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Award" size={16} />
                <span>{achievements?.filter(a => a?.isUnlocked)?.length} of {achievements?.length} unlocked</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements?.map((achievement) => (
                <AchievementBadge
                  key={achievement?.id}
                  icon={achievement?.icon}
                  title={achievement?.title}
                  description={achievement?.description}
                  isUnlocked={achievement?.isUnlocked}
                  progress={achievement?.progress}
                  maxProgress={achievement?.maxProgress}
                  date={achievement?.date}
                />
              ))}
            </div>
          </div>

          {/* Community Impact & Social Share */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <CommunityImpact />
            <SocialShare userStats={userStats} />
          </div>

          {/* Carbon Footprint Comparison */}
          <div className="bg-card rounded-lg p-6 shadow-organic border border-border mb-12">
            <h3 className="text-lg font-semibold text-foreground mb-6">Carbon Footprint Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">Your Second-Hand Purchases</h4>
                <div className="bg-success/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-success">CO2 Emissions</span>
                    <span className="text-2xl font-bold text-success">{userStats?.co2Saved}kg</span>
                  </div>
                  <div className="w-full bg-success/20 rounded-full h-2">
                    <div className="bg-success h-2 rounded-full w-1/4"></div>
                  </div>
                  <p className="text-xs text-success/80 mt-2">75% less than buying new</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">If You Bought New</h4>
                <div className="bg-error/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-error">CO2 Emissions</span>
                    <span className="text-2xl font-bold text-error">{(userStats?.co2Saved * 4)?.toFixed(0)}kg</span>
                  </div>
                  <div className="w-full bg-error/20 rounded-full h-2">
                    <div className="bg-error h-2 rounded-full w-full"></div>
                  </div>
                  <p className="text-xs text-error/80 mt-2">Full manufacturing impact</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-center space-x-4 text-center">
                <div>
                  <Icon name="Car" size={24} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{userStats?.milesNotDriven} miles</p>
                  <p className="text-xs text-muted-foreground">not driven equivalent</p>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div>
                  <Icon name="TreePine" size={24} className="text-success mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{userStats?.treesEquivalent} trees</p>
                  <p className="text-xs text-muted-foreground">planted equivalent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-surface rounded-lg p-6 border border-border">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Learn More</h3>
                <p className="text-sm text-muted-foreground">Understand the environmental impact of different materials</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <Icon name="Shirt" size={20} className="text-accent mb-2" />
                <h4 className="text-sm font-medium text-foreground mb-1">Textile Impact</h4>
                <p className="text-xs text-muted-foreground">
                  Fashion industry accounts for 10% of global carbon emissions. Second-hand clothing reduces this by 82%.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border">
                <Icon name="Smartphone" size={20} className="text-primary mb-2" />
                <h4 className="text-sm font-medium text-foreground mb-1">Electronics Impact</h4>
                <p className="text-xs text-muted-foreground">
                  Manufacturing a smartphone produces 70kg of CO2. Buying used extends device lifespan significantly.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border">
                <Icon name="Armchair" size={20} className="text-secondary-foreground mb-2" />
                <h4 className="text-sm font-medium text-foreground mb-1">Furniture Impact</h4>
                <p className="text-xs text-muted-foreground">
                  Furniture production uses 200+ gallons of water per piece. Pre-owned furniture eliminates this entirely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImpactTracker;