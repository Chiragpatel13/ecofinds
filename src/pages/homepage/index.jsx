import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ImpactCounter from './components/ImpactCounter';
import CuratedCollections from './components/CuratedCollections';
import CommunitySpotlight from './components/CommunitySpotlight';
import TrustSection from './components/TrustSection';
import TrendingSearches from './components/TrendingSearches';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-24">
        <HeroSection />
        <ImpactCounter />
        <CuratedCollections />
        <CommunitySpotlight />
        <TrustSection />
        <TrendingSearches />
      </main>
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-accent-foreground"
                  >
                    <path
                      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                    <circle cx="12" cy="19" r="3" fill="currentColor" opacity="0.7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">EcoFinds</h3>
                  <p className="text-sm opacity-80">Circular Stories</p>
                </div>
              </div>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Transforming the way we shop by celebrating the stories behind every pre-loved item.
              </p>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-organic cursor-pointer">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-organic cursor-pointer">
                  <span className="text-xs font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-organic cursor-pointer">
                  <span className="text-xs font-bold">in</span>
                </div>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="/marketplace" className="hover:text-primary-foreground transition-organic">Browse All Items</a></li>
                <li><a href="/marketplace" className="hover:text-primary-foreground transition-organic">Fashion</a></li>
                <li><a href="/marketplace" className="hover:text-primary-foreground transition-organic">Home & Garden</a></li>
                <li><a href="/marketplace" className="hover:text-primary-foreground transition-organic">Electronics</a></li>
                <li><a href="/marketplace" className="hover:text-primary-foreground transition-organic">Books & Media</a></li>
              </ul>
            </div>

            {/* Sell */}
            <div>
              <h4 className="font-semibold mb-4">Sell</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="/seller-dashboard" className="hover:text-primary-foreground transition-organic">Start Selling</a></li>
                <li><a href="/seller-dashboard" className="hover:text-primary-foreground transition-organic">Seller Resources</a></li>
                <li><a href="/seller-dashboard" className="hover:text-primary-foreground transition-organic">Pricing Guide</a></li>
                <li><a href="/seller-dashboard" className="hover:text-primary-foreground transition-organic">Photography Tips</a></li>
                <li><a href="/seller-dashboard" className="hover:text-primary-foreground transition-organic">Success Stories</a></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="/community-hub" className="hover:text-primary-foreground transition-organic">Community Hub</a></li>
                <li><a href="/impact-tracker" className="hover:text-primary-foreground transition-organic">Impact Tracker</a></li>
                <li><a href="/community-hub" className="hover:text-primary-foreground transition-organic">Sustainability Tips</a></li>
                <li><a href="/community-hub" className="hover:text-primary-foreground transition-organic">User Stories</a></li>
                <li><a href="/community-hub" className="hover:text-primary-foreground transition-organic">Events</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-primary-foreground/80 mb-4 md:mb-0">
              © {new Date()?.getFullYear()} EcoFinds. All rights reserved. Making sustainability accessible to everyone.
            </div>
            <div className="flex space-x-6 text-sm text-primary-foreground/80">
              <a href="#" className="hover:text-primary-foreground transition-organic">Privacy Policy</a>
              <a href="#" className="hover:text-primary-foreground transition-organic">Terms of Service</a>
              <a href="#" className="hover:text-primary-foreground transition-organic">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;