import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredItems = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      story: "Once worn by a jazz musician in 1970s New York, now ready for new adventures",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop",
      price: "$89",
      category: "Fashion"
    },
    {
      id: 2,
      title: "Mid-Century Teak Dresser",
      story: "Handcrafted in Denmark, 1960s. Restored with love, ready to organize your life",
      image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?w=800&h=600&fit=crop",
      price: "$245",
      category: "Furniture"
    },
    {
      id: 3,
      title: "Designer Silk Scarf",
      story: "A Parisian find from the 1980s, perfect condition with timeless elegance",
      image: "https://images.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg?w=800&h=600&fit=crop",
      price: "$34",
      category: "Accessories"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems?.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredItems?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems?.length) % featuredItems?.length);
  };

  return (
    <section className="relative bg-gradient-to-br from-surface via-background to-muted min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-secondary rounded-full blur-2xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
                <Icon name="Leaf" size={16} />
                <span>Sustainable Shopping Revolution</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Every item has a{' '}
                <span className="text-primary relative">
                  story
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-accent rounded-full"></div>
                </span>{' '}
                waiting to continue
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                Join our community of conscious consumers discovering unique pre-loved treasures. 
                Every purchase saves items from landfills while adding character to your life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/marketplace">
                <Button 
                  variant="default" 
                  size="lg"
                  iconName="Search"
                  iconPosition="left"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-organic-lg"
                >
                  Start Shopping
                </Button>
              </Link>
              <Link to="/seller-dashboard">
                <Button 
                  variant="outline" 
                  size="lg"
                  iconName="Plus"
                  iconPosition="left"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Start Selling
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2.8K+</div>
                <div className="text-sm text-muted-foreground">Items Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">1.2K+</div>
                <div className="text-sm text-muted-foreground">Happy Sellers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Featured Items Carousel */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl shadow-organic-lg overflow-hidden">
              <div className="aspect-[4/5] relative">
                <Image
                  src={featuredItems?.[currentSlide]?.image}
                  alt={featuredItems?.[currentSlide]?.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block bg-accent px-3 py-1 rounded-full text-xs font-medium mb-3">
                    {featuredItems?.[currentSlide]?.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{featuredItems?.[currentSlide]?.title}</h3>
                  <p className="text-sm opacity-90 mb-3 line-clamp-2">
                    {featuredItems?.[currentSlide]?.story}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{featuredItems?.[currentSlide]?.price}</span>
                    <Button 
                      variant="default" 
                      size="sm"
                      iconName="Heart"
                      iconPosition="left"
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-organic"
              >
                <Icon name="ChevronLeft" size={20} className="text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-organic"
              >
                <Icon name="ChevronRight" size={20} className="text-white" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2">
                {featuredItems?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-organic ${
                      index === currentSlide ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-full text-sm font-medium shadow-organic animate-bounce">
              <Icon name="Recycle" size={16} className="inline mr-1" />
              Eco-Verified
            </div>
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-organic">
              <Icon name="Star" size={16} className="inline mr-1" />
              Featured Find
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;