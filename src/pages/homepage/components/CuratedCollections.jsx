import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CuratedCollections = () => {
  const collections = [
    {
      id: 1,
      title: "Vintage Denim Revival",
      description: "Authentic vintage jeans and jackets with character and stories to tell",
      itemCount: 127,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop",
      tag: "Trending",
      color: "bg-primary"
    },
    {
      id: 2,
      title: "Mid-Century Modern Finds",
      description: "Iconic furniture pieces from the golden age of design",
      itemCount: 89,
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=600&h=400&fit=crop",
      tag: "Editor\'s Pick",
      color: "bg-accent"
    },
    {
      id: 3,
      title: "Sustainable Home Essentials",
      description: "Eco-friendly home goods that combine style with sustainability",
      itemCount: 203,
      image: "https://images.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg?w=600&h=400&fit=crop",
      tag: "New",
      color: "bg-success"
    },
    {
      id: 4,
      title: "Designer Accessories",
      description: "Pre-loved luxury accessories from top fashion houses",
      itemCount: 156,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
      tag: "Luxury",
      color: "bg-secondary"
    }
  ];

  const featuredItems = [
    {
      id: 1,
      title: "Vintage Levi\'s 501 Jeans",
      price: "$45",
      originalPrice: "$89",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop",
      condition: "Excellent",
      seller: "VintageVibes"
    },
    {
      id: 2,
      title: "Eames Lounge Chair",
      price: "$1,200",
      originalPrice: "$2,400",
      image: "https://images.pexels.com/photos/586763/pexels-photo-586763.jpeg?w=300&h=300&fit=crop",
      condition: "Very Good",
      seller: "ModernClassics"
    },
    {
      id: 3,
      title: "Bamboo Kitchen Set",
      price: "$28",
      originalPrice: "$55",
      image: "https://images.pixabay.com/photo/2017/06/15/11/51/kitchen-2405752_1280.jpg?w=300&h=300&fit=crop",
      condition: "Like New",
      seller: "EcoLiving"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Sparkles" size={16} />
            <span>Curated Collections</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Discover Stories Worth Continuing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our expert curators handpick unique collections that celebrate craftsmanship, 
            sustainability, and timeless style.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {collections?.map((collection) => (
            <Link
              key={collection?.id}
              to="/marketplace"
              className="group relative bg-card rounded-2xl overflow-hidden shadow-organic hover:shadow-organic-lg transition-organic"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={collection?.image}
                  alt={collection?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-organic"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Tag */}
                <div className={`absolute top-4 left-4 ${collection?.color} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                  {collection?.tag}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-organic">
                    {collection?.title}
                  </h3>
                  <p className="text-sm opacity-90 mb-3 line-clamp-2">
                    {collection?.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {collection?.itemCount} items
                    </span>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-accent transition-organic">
                      <Icon name="ArrowRight" size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Items */}
        <div className="bg-surface rounded-3xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Today's Featured Finds
              </h3>
              <p className="text-muted-foreground">
                Handpicked items with exceptional stories and value
              </p>
            </div>
            <Link to="/marketplace">
              <Button 
                variant="outline" 
                iconName="ArrowRight" 
                iconPosition="right"
                className="mt-4 lg:mt-0"
              >
                View All
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredItems?.map((item) => (
              <Link
                key={item?.id}
                to="/product-detail"
                className="group bg-card rounded-xl overflow-hidden shadow-organic hover:shadow-organic-lg transition-organic"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={item?.image}
                    alt={item?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-organic"
                  />
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-organic">
                    <Icon name="Heart" size={16} className="text-accent" />
                  </div>
                  <div className="absolute top-3 left-3 bg-success text-success-foreground px-2 py-1 rounded text-xs font-medium">
                    {item?.condition}
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-organic">
                    {item?.title}
                  </h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-bold text-primary">{item?.price}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      {item?.originalPrice}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="User" size={14} />
                    <span>by {item?.seller}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratedCollections;