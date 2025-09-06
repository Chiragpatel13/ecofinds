import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSection = () => {
  const verificationFeatures = [
    {
      icon: 'Shield',
      title: 'Verified Sellers',
      description: 'Multi-tier authentication system with identity verification and seller ratings',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'CreditCard',
      title: 'Secure Payments',
      description: 'Bank-level encryption with buyer protection and secure escrow system',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: 'Award',
      title: 'Quality Guarantee',
      description: 'Item authenticity verification with detailed condition reports',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Dedicated customer service team for dispute resolution and assistance',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  const sellerBadges = [
    {
      name: 'Eco Verified',
      icon: 'Leaf',
      description: 'Committed to sustainable practices',
      color: 'bg-success'
    },
    {
      name: 'Top Seller',
      icon: 'Star',
      description: '95%+ positive feedback rating',
      color: 'bg-accent'
    },
    {
      name: 'Authenticated',
      icon: 'CheckCircle',
      description: 'Identity and address verified',
      color: 'bg-primary'
    },
    {
      name: 'Fast Shipper',
      icon: 'Zap',
      description: 'Ships within 24 hours',
      color: 'bg-secondary'
    }
  ];

  const partnerLogos = [
    {
      name: 'Green Business Network',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop',
      description: 'Certified sustainable business partner'
    },
    {
      name: 'Circular Economy Alliance',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=120&h=60&fit=crop',
      description: 'Supporting circular economy initiatives'
    },
    {
      name: 'Climate Action Partners',
      logo: 'https://images.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg?w=120&h=60&fit=crop',
      description: 'Climate positive business certification'
    },
    {
      name: 'Fair Trade Verified',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=120&h=60&fit=crop',
      description: 'Ethical trading practices certified'
    }
  ];

  const securityFeatures = [
    'SSL 256-bit encryption',
    'PCI DSS compliant payments',
    'Identity verification required',
    'Fraud detection system',
    'Secure data storage',
    'Regular security audits'
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Shield" size={16} />
            <span>Trust & Safety</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Shop with Complete Confidence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive verification system and security measures ensure every transaction 
            is safe, secure, and satisfying for both buyers and sellers.
          </p>
        </div>

        {/* Verification Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {verificationFeatures?.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-organic hover:shadow-organic-lg transition-organic group"
            >
              <div className={`w-16 h-16 ${feature?.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-organic`}>
                <Icon name={feature?.icon} size={28} className={feature?.color} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature?.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Seller Badge System */}
        <div className="bg-surface rounded-3xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Seller Verification System
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our multi-tier badge system helps you identify trusted sellers and make informed decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sellerBadges?.map((badge, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-4 text-center hover:scale-105 transition-organic"
              >
                <div className={`w-12 h-12 ${badge?.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon name={badge?.icon} size={20} className="text-white" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{badge?.name}</h4>
                <p className="text-xs text-muted-foreground">{badge?.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Info" size={16} />
              <span>Badges are earned through verified achievements and community feedback</span>
            </div>
          </div>
        </div>

        {/* Security & Partners */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Security Features */}
          <div className="bg-card rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <Icon name="Lock" size={24} className="text-success" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Bank-Level Security</h3>
                <p className="text-muted-foreground">Your data and payments are protected</p>
              </div>
            </div>

            <div className="space-y-3">
              {securityFeatures?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={12} className="text-success" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-success/5 rounded-xl border border-success/20">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Shield" size={16} />
                <span className="font-medium text-sm">100% Secure Guarantee</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your personal and payment information is always protected
              </p>
            </div>
          </div>

          {/* Partner Certifications */}
          <div className="bg-card rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="Award" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Certified Partners</h3>
                <p className="text-muted-foreground">Recognized by leading organizations</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {partnerLogos?.map((partner, index) => (
                <div
                  key={index}
                  className="bg-surface rounded-xl p-4 text-center hover:bg-muted transition-organic"
                >
                  <div className="w-16 h-8 bg-muted rounded mx-auto mb-2 flex items-center justify-center overflow-hidden">
                    <Image
                      src={partner?.logo}
                      alt={partner?.name}
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                  <h4 className="text-xs font-medium text-foreground mb-1">{partner?.name}</h4>
                  <p className="text-xs text-muted-foreground">{partner?.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="ExternalLink" size={14} />
                <span>View all certifications</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Trusted by Thousands</h3>
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="text-3xl font-bold mb-1">99.8%</div>
              <div className="text-primary-foreground/80 text-sm">Successful Transactions</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">4.9/5</div>
              <div className="text-primary-foreground/80 text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">&lt;24h</div>
              <div className="text-primary-foreground/80 text-sm">Support Response</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">$2M+</div>
              <div className="text-primary-foreground/80 text-sm">Protected Transactions</div>
            </div>
          </div>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust EcoFinds for their sustainable shopping needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;