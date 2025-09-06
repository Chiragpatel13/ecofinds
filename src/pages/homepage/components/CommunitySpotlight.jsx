import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunitySpotlight = () => {
  const [activeStory, setActiveStory] = useState(0);

  const userStories = [
    {
      id: 1,
      name: "Sarah Chen",
      location: "Portland, OR",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      story: "Started with one vintage dress, now I've transformed my entire wardrobe sustainably",
      beforeImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop",
      itemsSaved: 47,
      co2Saved: 23,
      joinedDate: "March 2023",
      badge: "Eco Warrior",
      testimonial: `EcoFinds changed how I think about fashion. Every piece in my closet now has a story, and I love knowing I'm making a positive impact while looking great.`
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      location: "Austin, TX",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      story: "Furnished my entire apartment with vintage finds, saving thousands while creating a unique space",
      beforeImage: "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?w=400&h=300&fit=crop",
      afterImage: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=400&h=300&fit=crop",
      itemsSaved: 23,
      co2Saved: 156,
      joinedDate: "January 2023",
      badge: "Design Curator",
      testimonial: `My apartment went from empty to extraordinary with EcoFinds. Each piece has character and history that you just can't get with new furniture.`
    },
    {
      id: 3,
      name: "Emma Thompson",
      location: "Seattle, WA",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      story: "Built a sustainable kitchen with zero-waste goals, finding amazing eco-friendly alternatives",
      beforeImage: "https://images.pixabay.com/photo/2016/12/30/07/59/kitchen-1940174_1280.jpg?w=400&h=300&fit=crop",
      afterImage: "https://images.pixabay.com/photo/2017/06/15/11/51/kitchen-2405752_1280.jpg?w=400&h=300&fit=crop",
      itemsSaved: 34,
      co2Saved: 89,
      joinedDate: "May 2023",
      badge: "Zero Waste Hero",
      testimonial: `EcoFinds helped me achieve my zero-waste kitchen goals. I found beautiful bamboo and glass alternatives that work better than plastic ever did.`
    }
  ];

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % userStories?.length);
  };

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + userStories?.length) % userStories?.length);
  };

  const currentStory = userStories?.[activeStory];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Users" size={16} />
            <span>Community Spotlight</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Real Stories, Real Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the amazing people in our community who are making sustainable choices 
            and transforming their lives one find at a time.
          </p>
        </div>

        {/* Main Story Display */}
        <div className="bg-card rounded-3xl shadow-organic-lg overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Story Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <Image
                    src={currentStory?.avatar}
                    alt={currentStory?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-success-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{currentStory?.name}</h3>
                  <p className="text-muted-foreground flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{currentStory?.location}</span>
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    {currentStory?.badge}
                  </div>
                </div>
              </div>

              <blockquote className="text-lg text-foreground mb-6 italic">
                "{currentStory?.testimonial}"
              </blockquote>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentStory?.itemsSaved}</div>
                  <div className="text-sm text-muted-foreground">Items Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{currentStory?.co2Saved}kg</div>
                  <div className="text-sm text-muted-foreground">CO₂ Prevented</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">12</div>
                  <div className="text-sm text-muted-foreground">Months Active</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link to="/community-hub">
                  <Button 
                    variant="default" 
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Read Full Story
                  </Button>
                </Link>
                <div className="text-sm text-muted-foreground">
                  Member since {currentStory?.joinedDate}
                </div>
              </div>
            </div>

            {/* Before/After Images */}
            <div className="relative">
              <div className="grid grid-cols-2 h-full">
                <div className="relative">
                  <Image
                    src={currentStory?.beforeImage}
                    alt="Before transformation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Before
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src={currentStory?.afterImage}
                    alt="After transformation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium">
                    After
                  </div>
                </div>
              </div>
              
              {/* Transformation Arrow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-organic">
                <Icon name="ArrowRight" size={20} className="text-accent-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Story Navigation */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <button
            onClick={prevStory}
            className="w-12 h-12 bg-card hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center shadow-organic transition-organic"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          
          <div className="flex space-x-2">
            {userStories?.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStory(index)}
                className={`w-3 h-3 rounded-full transition-organic ${
                  index === activeStory ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextStory}
            className="w-12 h-12 bg-card hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center shadow-organic transition-organic"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>

        {/* Community Stats */}
        <div className="bg-card rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Join Our Growing Community
          </h3>
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="text-3xl font-bold text-primary">12.5K+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success">89%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">2.8M</div>
              <div className="text-muted-foreground">Items Exchanged</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">156</div>
              <div className="text-muted-foreground">Cities Worldwide</div>
            </div>
          </div>
          <Link to="/community-hub">
            <Button 
              variant="default" 
              iconName="Users" 
              iconPosition="left"
              className="bg-primary hover:bg-primary/90"
            >
              Join the Community
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunitySpotlight;