import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import SortingBar from './components/SortingBar';
import ItemCard from './components/ItemCard';

import FloatingActionButton from './components/FloatingActionButton';


import Button from '../../components/ui/Button';


import marketplaceService from '../../services/marketplaceService';

const MarketplacePage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category_id: '',
    min_price: '',
    max_price: '',
    condition: '',
    sort: 'newest'
  });

  // Load initial data
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [filters]);

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await marketplaceService?.getProducts(filters);
    if (error) {
      setError(error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    const { data } = await marketplaceService?.getCategories();
    setCategories(data || []);
  };

  const handleWishlist = async (productId, isWishlisted) => {
    if (isWishlisted) {
      await marketplaceService?.addToWishlist(productId);
    } else {
      await marketplaceService?.removeFromWishlist(productId);
    }
  };

  const handleQuickView = (product) => {
    // Handle quick view modal
    console.log('Quick view:', product);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <>
      <Helmet>
        <title>EcoFinds Marketplace - Sustainable Shopping</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Search and Filter Section */}
          <div className="mb-8">
            <SearchBar 
              value={filters?.search}
              onChange={(search) => handleFilterChange({ search })}
              onSearch={() => {}}
              onVoiceSearch={() => {}}
              onVisualSearch={() => {}}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <FilterSidebar
                categories={categories}
                filters={filters}
                onFilterChange={handleFilterChange}
                isOpen={true}
                onClose={() => {}}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <SortingBar
                sort={filters?.sort}
                onSortChange={(sort) => handleFilterChange({ sort })}
                totalCount={products?.length || 0}
                sortBy={filters?.sort}
                viewMode="grid"
                onViewModeChange={() => {}}
                totalItems={products?.length || 0}
                onToggleFilters={() => {}}
                isFiltersOpen={false}
              />

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Loading sustainable products...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500">{error}</p>
                  <Button onClick={loadProducts} className="mt-4">
                    Try Again
                  </Button>
                </div>
              ) : products?.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products?.map((item) => (
                    <ItemCard
                      key={item?.id}
                      item={item}
                      onWishlist={handleWishlist}
                      onQuickView={handleQuickView}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <FloatingActionButton 
          onSellClick={() => {}}
          onCameraClick={() => {}}
          onVoiceSearch={() => {}}
        />
      </div>
    </>
  );
};

export default MarketplacePage;