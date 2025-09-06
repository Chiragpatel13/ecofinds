
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from '../../components/ui/Header';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import SellerProfile from './components/SellerProfile';
import PurchaseSection from './components/PurchaseSection';
import SizeGuide from './components/SizeGuide';
import ReviewsSection from './components/ReviewsSection';
import RelatedItems from './components/RelatedItems';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import marketplaceService from '../../services/marketplaceService';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');
  const [isAddingToCart, setIsAddingToCart] = useState(false);


  useEffect(() => {
    const productId = searchParams.get('id');
    if (productId) {
      loadProductDetails(productId);
    } else {
      setError('No product ID specified.');
      setIsLoading(false);
    }
  }, [searchParams]);

  const loadProductDetails = async (id) => {
    setIsLoading(true);
    setError(null);
    const { data: productData, error: productError } = await marketplaceService.getProductById(id);

    if (productError || !productData) {
      setError(productError || 'Product not found.');
      setIsLoading(false);
      return;
    }

    setProduct(productData);

    // Fetch related items from the same category
    if (productData.category?.id) {
      const { data: relatedData } = await marketplaceService.getProducts({
        category_id: productData.category.id,
        limit: 5,
      });
      // Filter out the current product
      setRelatedItems(relatedData.filter(p => p.id !== id).slice(0, 4));
    }
    
    setIsLoading(false);
  };

  const handleAddToCart = async () => {
    if (!product?.id || isAddingToCart) return;

    setIsAddingToCart(true);
    const { error } = await marketplaceService.addToCart(product.id, 1);
    
    if (error) {
      // In a real app, you'd use a toast notification system
      alert(`Error: ${error}`);
    } else {
      alert(`"${product.title}" has been added to your cart!`);
      // Future enhancement: update a cart icon in the header
    }
    setIsAddingToCart(false);
  };

  const handleBuyNow = () => {
    console.log('Buy now:', product?.id);
    // Future implementation: redirect to checkout page
    alert('Buy Now functionality to be implemented!');
  };

  const handleMakeOffer = (amount) => {
    console.log('Make offer:', amount);
    alert('Make Offer functionality to be implemented!');
  };
  
  const tabs = [
    { id: 'details', label: 'Details', icon: 'Info' },
    { id: 'size-guide', label: 'Size Guide', icon: 'Ruler' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'shipping', label: 'Shipping', icon: 'Truck' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="animate-pulse">
              <div className="h-6 bg-muted rounded w-1/4 mb-6"></div>
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-1"><div className="aspect-square bg-muted rounded-xl"></div></div>
                <div className="lg:col-span-1 space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                  <div className="h-12 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
                <div className="lg:col-span-1 space-y-4">
                    <div className="h-64 bg-muted rounded-xl"></div>
                    <div className="h-40 bg-muted rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Header />
        <div className="text-center">
            <Icon name="AlertTriangle" size={48} className="text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">An Error Occurred</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => loadProductDetails(searchParams.get('id'))}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{product?.title || 'Product'} - EcoFinds</title>
        <meta name="description" content={product?.description} />
      </Helmet>
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
              <a href={`/marketplace?category=${product?.category?.slug}`} className="hover:text-foreground transition-colors">
                {product?.category?.name}
              </a>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground truncate max-w-xs">{product?.title}</span>
            </nav>

            {/* Main Product Section */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-1">
                <ProductGallery images={product?.images} productName={product?.title} />
              </div>
              <div className="lg:col-span-1">
                <ProductInfo product={product} />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <PurchaseSection
                  product={product}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  onMakeOffer={handleMakeOffer}
                  isAddingToCart={isAddingToCart}
                />
                <SellerProfile seller={product?.seller} />
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
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
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
                      <div className="flex justify-between"><span className="text-muted-foreground">Brand</span><span className="font-medium">{product?.brand || 'N/A'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Material</span><span className="font-medium">{product?.material || 'N/A'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Color</span><span className="font-medium">{product?.color || 'N/A'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Size</span><span className="font-medium">{product?.size || 'N/A'}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Condition</span><span className="font-medium text-success">{product?.condition}</span></div>
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

              {currentTab === 'size-guide' && <SizeGuide product={product} />}

              {currentTab === 'reviews' && (
                <ReviewsSection
                  reviews={product?.reviews || []}
                  averageRating={product?.seller?.rating}
                  totalReviews={product?.seller?.reviewCount}
                />
              )}

              {currentTab === 'shipping' && (
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-4">Shipping & Returns</h3>
                    {/* Shipping details can be added here */}
                    <p className='text-muted-foreground'>Shipping and return policies are determined by the seller. Please review the seller's profile and contact them for specific details.</p>
                </div>
              )}
            </div>
            
            {relatedItems.length > 0 && <RelatedItems items={relatedItems} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
