import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import SellerProfile from './components/SellerProfile';
import PurchaseSection from './components/PurchaseSection';
import SizeGuide from './components/SizeGuide';
import ReviewsSection from './components/ReviewsSection';
import RelatedItems from './components/RelatedItems';
import Icon from '../../components/AppIcon';


const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState('details');
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const productData = {
    id: searchParams?.get('id') || '1',
    title: "Vintage Levi\'s 501 Original Fit Jeans",
    price: 89.99,
    originalPrice: 120.00,
    discount: 25,
    condition: "Excellent",
    brand: "Levi\'s",
    size: "32x34",
    category: "Men\'s Jeans",
    color: "Indigo Blue",
    colorHex: "#4B5563",
    material: "100% Cotton Denim",
    story: `These classic Levi's 501s have been my go-to jeans for the past 3 years. I bought them new and they've developed the perfect fade and character that only comes with time and wear. The fit is true to size and they've been incredibly durable through countless washes. I'm only selling because I've lost weight and they no longer fit properly. These jeans have so much life left in them and deserve to be worn by someone who will appreciate their quality and timeless style.\n\nThey've been professionally cleaned and are ready for their next adventure. The fading is natural and adds to their authentic vintage appeal.`,
    ownedDuration: "3 years",
    location: "Portland, OR",
    impact: {
      co2Saved: 12.5,
      waterSaved: 1847,
      wasteDiverted: 850
    },
    measurements: {
      length: "34\"",
      width: "32\"",
      inseam: "34\"",
      rise: "12\""
    },
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=800&fit=crop"
    ]
  };

  const sellerData = {
    name: "Sarah Mitchell",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 4.9,
    reviewCount: 127,
    itemsSold: 89,
    responseTime: "< 2hrs",
    memberSince: "2021",
    isVerified: true,
    activeListings: 12,
    badges: [
      { name: "Top Seller", icon: "Award" },
      { name: "Fast Shipper", icon: "Zap" },
      { name: "Eco Champion", icon: "Leaf" }
    ],
    recentReviews: [
      {
        rating: 5,
        comment: "Item exactly as described, fast shipping!",
        reviewer: "Mike R.",
        date: "2025-01-15"
      },
      {
        rating: 5,
        comment: "Great communication and quality item.",
        reviewer: "Jessica L.",
        date: "2025-01-10"
      },
      {
        rating: 4,
        comment: "Good condition, minor wear as expected.",
        reviewer: "David K.",
        date: "2025-01-05"
      }
    ]
  };

  const reviewsData = [
    {
      reviewer: {
        name: "Alex Thompson",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      rating: 5,
      date: "2025-01-20",
      verified: true,
      comment: "Absolutely love these jeans! The condition is exactly as described - excellent quality with beautiful natural fading. Sarah was incredibly responsive and shipped them out the same day. The fit is perfect and they feel like they were made for me. Highly recommend both the item and the seller!",
      helpfulCount: 12,
      images: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop"
      ],
      sellerResponse: {
        date: "2025-01-21",
        message: "Thank you so much for the wonderful review, Alex! I'm thrilled that the jeans fit perfectly and that you're happy with the purchase. Enjoy wearing them!"
      }
    },
    {
      reviewer: {
        name: "Emma Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      rating: 5,
      date: "2025-01-18",
      verified: true,
      comment: "These are exactly what I was looking for! The vintage fade is gorgeous and authentic. Great communication from Sarah throughout the process. The jeans arrived quickly and were packaged with care. Will definitely shop from this seller again.",
      helpfulCount: 8
    },
    {
      reviewer: {
        name: "Jordan Kim",
        avatar: "https://randomuser.me/api/portraits/men/33.jpg"
      },
      rating: 4,
      date: "2025-01-15",
      verified: true,
      comment: "Good quality jeans with nice character. The measurements were accurate and they fit as expected. Only minor point is that there's a small stain on the back pocket that wasn't mentioned, but it's barely noticeable. Overall satisfied with the purchase.",
      helpfulCount: 5
    }
  ];

  const relatedItems = [
    {
      id: "2",
      title: "Vintage Wrangler Western Shirt",
      brand: "Wrangler",
      price: 45.99,
      originalPrice: 65.00,
      condition: "Good",
      size: "L",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
      seller: {
        name: "Mike Johnson",
        avatar: "https://randomuser.me/api/portraits/men/25.jpg",
        rating: 4.7
      },
      sustainabilityScore: 85
    },
    {
      id: "3",
      title: "Classic Leather Belt",
      brand: "Coach",
      price: 32.99,
      originalPrice: 89.00,
      condition: "Like New",
      size: "32",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      seller: {
        name: "Lisa Chen",
        avatar: "https://randomuser.me/api/portraits/women/41.jpg",
        rating: 4.8
      },
      sustainabilityScore: 92
    },
    {
      id: "4",
      title: "Vintage Band T-Shirt",
      brand: "Hanes",
      price: 28.99,
      condition: "Good",
      size: "M",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      seller: {
        name: "Tom Wilson",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        rating: 4.6
      },
      sustainabilityScore: 78
    },
    {
      id: "5",
      title: "Denim Jacket",
      brand: "Gap",
      price: 55.99,
      originalPrice: 89.00,
      condition: "Excellent",
      size: "L",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      seller: {
        name: "Rachel Green",
        avatar: "https://randomuser.me/api/portraits/women/35.jpg",
        rating: 4.9
      },
      sustainabilityScore: 88
    }
  ];

  const tabs = [
    { id: 'details', label: 'Details', icon: 'Info' },
    { id: 'size-guide', label: 'Size Guide', icon: 'Ruler' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'shipping', label: 'Shipping', icon: 'Truck' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = () => {
    console.log('Added to cart:', productData?.id);
    // Add to cart logic here
  };

  const handleBuyNow = () => {
    console.log('Buy now:', productData?.id);
    // Buy now logic here
  };

  const handleMakeOffer = (amount) => {
    console.log('Make offer:', amount);
    // Make offer logic here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="animate-pulse">
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="aspect-square bg-muted rounded-xl"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <a href="/marketplace" className="hover:text-foreground transition-colors">
              Marketplace
            </a>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">{productData?.category}</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground truncate">{productData?.title}</span>
          </nav>

          {/* Main Product Section */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Gallery */}
            <div className="lg:col-span-1">
              <ProductGallery 
                images={productData?.images} 
                productName={productData?.title}
              />
            </div>

            {/* Middle Column - Product Info */}
            <div className="lg:col-span-1">
              <ProductInfo product={productData} />
            </div>

            {/* Right Column - Purchase & Seller */}
            <div className="lg:col-span-1 space-y-6">
              <PurchaseSection
                product={productData}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onMakeOffer={handleMakeOffer}
              />
              <SellerProfile seller={sellerData} />
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setCurrentTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      currentTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-12">
            {currentTab === 'details' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">Product Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Brand</span>
                      <span className="font-medium">{productData?.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Material</span>
                      <span className="font-medium">{productData?.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Color</span>
                      <span className="font-medium">{productData?.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size</span>
                      <span className="font-medium">{productData?.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Condition</span>
                      <span className="font-medium">{productData?.condition}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">Care Instructions</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Machine wash cold with like colors</li>
                    <li>• Do not bleach</li>
                    <li>• Tumble dry low heat</li>
                    <li>• Iron on medium heat if needed</li>
                    <li>• Do not dry clean</li>
                  </ul>
                </div>
              </div>
            )}

            {currentTab === 'size-guide' && (
              <SizeGuide product={productData} />
            )}

            {currentTab === 'reviews' && (
              <ReviewsSection
                reviews={reviewsData}
                averageRating={4.8}
                totalReviews={60}
              />
            )}

            {currentTab === 'shipping' && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Shipping Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Shipping Options</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon name="Truck" size={20} />
                          <div>
                            <div className="font-medium">Standard Shipping</div>
                            <div className="text-sm text-muted-foreground">5-7 business days</div>
                          </div>
                        </div>
                        <span className="font-semibold">$5.99</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon name="Zap" size={20} />
                          <div>
                            <div className="font-medium">Express Shipping</div>
                            <div className="text-sm text-muted-foreground">2-3 business days</div>
                          </div>
                        </div>
                        <span className="font-semibold">$12.99</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Return Policy</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• 7-day return window</li>
                      <li>• Item must be in original condition</li>
                      <li>• Buyer pays return shipping</li>
                      <li>• Full refund upon inspection</li>
                      <li>• No returns on final sale items</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Related Items */}
          <RelatedItems items={relatedItems} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;