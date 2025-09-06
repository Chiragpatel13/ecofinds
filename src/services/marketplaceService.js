import { supabase } from '../lib/supabase';

export const marketplaceService = {
  // Products
  async getProducts(filters = {}) {
    try {
      let query = supabase?.from('products')?.select(`
          *,
          seller:user_profiles!seller_id(id, full_name, avatar_url, sustainability_score),
          category:categories(id, name, slug),
          product_images(id, image_url, alt_text, is_primary),
          reviews(id, rating)
        `)?.eq('is_available', true);

      // Apply filters
      if (filters?.category_id) {
        query = query?.eq('category_id', filters?.category_id);
      }
      
      if (filters?.min_price) {
        query = query?.gte('price_inr', filters?.min_price);
      }
      
      if (filters?.max_price) {
        query = query?.lte('price_inr', filters?.max_price);
      }
      
      if (filters?.condition) {
        query = query?.eq('condition', filters?.condition);
      }
      
      if (filters?.search) {
        query = query?.or(`title.ilike.%${filters?.search}%,description.ilike.%${filters?.search}%`);
      }

      // Sort options
      switch (filters?.sort) {
        case 'price_low':
          query = query?.order('price_inr', { ascending: true });
          break;
        case 'price_high':
          query = query?.order('price_inr', { ascending: false });
          break;
        case 'newest':
          query = query?.order('created_at', { ascending: false });
          break;
        case 'rating':
          // Note: Complex sorting would need a database function
          query = query?.order('created_at', { ascending: false });
          break;
        default:
          query = query?.order('created_at', { ascending: false });
      }

      const { data, error } = await query?.limit(filters?.limit || 20);

      if (error) {
        console.error('Error fetching products:', error);
        return { data: [], error: error?.message };
      }

      // Transform data to match UI expectations
      const transformedData = data?.map(product => ({
        ...product,
        price: product?.price_inr,
        originalPrice: product?.original_price_inr,
        image: product?.product_images?.find(img => img?.is_primary)?.image_url || product?.product_images?.[0]?.image_url,
        seller: {
          id: product?.seller?.id,
          name: product?.seller?.full_name,
          avatar: product?.seller?.avatar_url,
          rating: product?.seller?.sustainability_score ? (product?.seller?.sustainability_score / 20)?.toFixed(1) : '4.0',
          reviews: Math.floor(Math.random() * 100) + 10 // Placeholder - would need actual review count
        },
        sustainabilityScore: product?.sustainability_score,
        storySnippet: product?.story_snippet,
        isWishlisted: false // Will be updated based on user's wishlist
      }));

      return { data: transformedData, error: null };
    } catch (error) {
      console.error('Service error:', error);
      return { data: [], error: 'Failed to fetch products' };
    }
  },

  async getProductById(id) {
    try {
      const { data, error } = await supabase?.from('products')?.select(`
          *,
          seller:user_profiles!seller_id(id, full_name, avatar_url, phone, bio, sustainability_score, created_at),
          category:categories(id, name, slug),
          product_images(id, image_url, alt_text, display_order, is_primary),
          reviews(
            id, rating, title, comment, created_at,
            user:user_profiles(id, full_name, avatar_url)
          )
        `)?.eq('id', id)?.single();

      if (error) {
        return { data: null, error: error?.message };
      }

      // Transform for UI
      const transformedData = {
        ...data,
        price: data?.price_inr,
        originalPrice: data?.original_price_inr,
        images: data?.product_images?.sort((a, b) => a?.display_order - b?.display_order) || [],
        seller: {
          ...data?.seller,
          rating: data?.seller?.sustainability_score ? (data?.seller?.sustainability_score / 20)?.toFixed(1) : '4.0',
          reviewCount: data?.reviews?.length || 0,
          joinedDate: data?.seller?.created_at
        },
        reviews: data?.reviews?.map(review => ({
          ...review,
          user: {
            name: review?.user?.full_name,
            avatar: review?.user?.avatar_url
          }
        })) || []
      };

      return { data: transformedData, error: null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch product details' };
    }
  },

  async addProduct(productData) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { data: null, error: 'You must be logged in to create a product.' };
      }

      // 1. Insert the product
      const { data: newProduct, error: productError } = await supabase
        .from('products')
        .insert([
          {
            seller_id: user.id,
            category_id: productData.category_id,
            title: productData.title,
            description: productData.description,
            price_inr: productData.price,
            original_price_inr: productData.originalPrice,
            condition: productData.condition,
            brand: productData.brand,
            story_snippet: productData.story_snippet,
            tags: productData.tags,
            stock_quantity: productData.stock_quantity,
          },
        ])
        .select()
        .single();

      if (productError) {
        console.error('Error creating product:', productError);
        return { data: null, error: 'Failed to create product' };
      }

      // 2. Insert product images
      if (productData.images && productData.images.length > 0) {
        const imageInserts = productData.images.map((image, index) => ({
          product_id: newProduct.id,
          image_url: image.url,
          alt_text: image.alt || productData.title,
          is_primary: index === 0, // First image is primary
        }));

        const { error: imageError } = await supabase
          .from('product_images')
          .insert(imageInserts);

        if (imageError) {
          console.error('Error adding product images:', imageError);
          // Optionally, delete the product if images fail to upload
          await supabase.from('products').delete().eq('id', newProduct.id);
          return { data: null, error: 'Failed to add product images.' };
        }
      }

      return { data: newProduct, error: null };
    } catch (error) {
      console.error('Service error creating product:', error);
      return { data: null, error: 'An unexpected error occurred while creating the product.' };
    }
  },

  async getCategories() {
    try {
      const { data, error } = await supabase?.from('categories')?.select('*')?.eq('is_active', true)?.order('name');

      return { data: data || [], error: error?.message || null };
    } catch (error) {
      return { data: [], error: 'Failed to fetch categories' };
    }
  },

  // Wishlist
  async addToWishlist(productId) {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) {
        return { error: 'Please sign in to add items to wishlist' };
      }

      const { data, error } = await supabase?.from('wishlists')?.insert({
          user_id: user?.id,
          product_id: productId
        });

      if (error && error?.code === '23505') {
        return { error: 'Item already in wishlist' };
      }

      return { data, error: error?.message || null };
    } catch (error) {
      return { error: 'Failed to add to wishlist' };
    }
  },

  async removeFromWishlist(productId) {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) {
        return { error: 'Please sign in to manage wishlist' };
      }

      const { data, error } = await supabase?.from('wishlists')?.delete()?.eq('user_id', user?.id)?.eq('product_id', productId);

      return { data, error: error?.message || null };
    } catch (error) {
      return { error: 'Failed to remove from wishlist' };
    }
  },

  async getUserWishlist() {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) {
        return { data: [], error: null };
      }

      const { data, error } = await supabase?.from('wishlists')?.select(`
          product_id,
          products(
            id, title, price_inr, condition,
            product_images(image_url, is_primary),
            seller:user_profiles!seller_id(full_name)
          )
        `)?.eq('user_id', user?.id);

      if (error) {
        return { data: [], error: error?.message };
      }

      const transformedData = data?.map(item => ({
        id: item?.products?.id,
        title: item?.products?.title,
        price: item?.products?.price_inr,
        image: item?.products?.product_images?.find(img => img?.is_primary)?.image_url,
        seller: { name: item?.products?.seller?.full_name }
      })) || [];

      return { data: transformedData, error: null };
    } catch (error) {
      return { data: [], error: 'Failed to fetch wishlist' };
    }
  },

  // Cart
  async addToCart(productId, quantity = 1) {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) {
        return { error: 'Please sign in to add items to cart' };
      }

      const { data, error } = await supabase?.from('cart_items')?.upsert({
          user_id: user?.id,
          product_id: productId,
          quantity: quantity
        }, {
          onConflict: 'user_id,product_id'
        });

      return { data, error: error?.message || null };
    } catch (error) {
      return { error: 'Failed to add to cart' };
    }
  },

  async getCartItems() {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) {
        return { data: [], error: null };
      }

      const { data, error } = await supabase?.from('cart_items')?.select(`
          id, quantity,
          product:products(
            id, title, price_inr, condition, stock_quantity,
            product_images(image_url, is_primary),
            seller:user_profiles!seller_id(id, full_name)
          )
        `)?.eq('user_id', user?.id);

      if (error) {
        return { data: [], error: error?.message };
      }

      const transformedData = data?.map(item => ({
        id: item?.id,
        quantity: item?.quantity,
        product: {
          id: item?.product?.id,
          title: item?.product?.title,
          price: item?.product?.price_inr,
          image: item?.product?.product_images?.find(img => img?.is_primary)?.image_url,
          seller: item?.product?.seller,
          stock: item?.product?.stock_quantity
        }
      })) || [];

      return { data: transformedData, error: null };
    } catch (error) {
      return { data: [], error: 'Failed to fetch cart items' };
    }
  },

  async updateCartItem(cartItemId, quantity) {
    try {
      const { data, error } = await supabase?.from('cart_items')?.update({ quantity: quantity })?.eq('id', cartItemId);

      return { data, error: error?.message || null };
    } catch (error) {
      return { error: 'Failed to update cart item' };
    }
  },

  async removeFromCart(cartItemId) {
    try {
      const { data, error } = await supabase?.from('cart_items')?.delete()?.eq('id', cartItemId);

      return { data, error: error?.message || null };
    } catch (error) {
      return { error: 'Failed to remove from cart' };
    }
  }
};

export default marketplaceService;
