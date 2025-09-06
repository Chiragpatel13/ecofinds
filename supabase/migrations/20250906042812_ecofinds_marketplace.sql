-- Location: supabase/migrations/20250906042812_ecofinds_marketplace.sql
-- Schema Analysis: No existing schema found - creating complete marketplace system
-- Integration Type: New complete e-commerce marketplace with authentication
-- Dependencies: Fresh project - no existing tables

-- 1. Custom Types
CREATE TYPE public.user_role AS ENUM ('buyer', 'seller', 'admin');
CREATE TYPE public.product_condition AS ENUM ('new', 'excellent', 'good', 'fair');
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE public.shipping_status AS ENUM ('pending', 'picked_up', 'in_transit', 'delivered');

-- 2. Core User Table (Critical intermediary table for PostgREST compatibility)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'buyer'::public.user_role,
    phone TEXT,
    bio TEXT,
    avatar_url TEXT,
    location TEXT,
    is_verified BOOLEAN DEFAULT false,
    sustainability_score INTEGER DEFAULT 0 CHECK (sustainability_score >= 0 AND sustainability_score <= 100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Categories
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Products
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price_inr DECIMAL(10,2) NOT NULL CHECK (price_inr >= 0),
    original_price_inr DECIMAL(10,2) CHECK (original_price_inr >= price_inr),
    condition public.product_condition DEFAULT 'good'::public.product_condition,
    brand TEXT,
    model TEXT,
    color TEXT,
    size TEXT,
    weight_grams INTEGER CHECK (weight_grams > 0),
    dimensions_cm TEXT,
    story_snippet TEXT,
    sustainability_score INTEGER DEFAULT 0 CHECK (sustainability_score >= 0 AND sustainability_score <= 100),
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_available BOOLEAN DEFAULT true,
    is_authenticated BOOLEAN DEFAULT false,
    is_local BOOLEAN DEFAULT false,
    stock_quantity INTEGER DEFAULT 1 CHECK (stock_quantity >= 0),
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Product Images
CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    display_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Wishlists
CREATE TABLE public.wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- 7. Shopping Cart
CREATE TABLE public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- 8. Addresses
CREATE TABLE public.addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT DEFAULT 'India'::TEXT,
    is_default BOOLEAN DEFAULT false,
    address_type TEXT DEFAULT 'home'::TEXT CHECK (address_type IN ('home', 'work', 'other')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. Orders
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE RESTRICT,
    order_number TEXT NOT NULL UNIQUE,
    status public.order_status DEFAULT 'pending'::public.order_status,
    total_amount_inr DECIMAL(10,2) NOT NULL CHECK (total_amount_inr >= 0),
    subtotal_inr DECIMAL(10,2) NOT NULL CHECK (subtotal_inr >= 0),
    shipping_cost_inr DECIMAL(10,2) DEFAULT 0 CHECK (shipping_cost_inr >= 0),
    tax_amount_inr DECIMAL(10,2) DEFAULT 0 CHECK (tax_amount_inr >= 0),
    shipping_address_id UUID NOT NULL REFERENCES public.addresses(id) ON DELETE RESTRICT,
    payment_status public.payment_status DEFAULT 'pending'::public.payment_status,
    payment_method TEXT,
    payment_reference TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 10. Order Items
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    seller_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price_inr DECIMAL(10,2) NOT NULL CHECK (unit_price_inr >= 0),
    total_price_inr DECIMAL(10,2) NOT NULL CHECK (total_price_inr >= 0),
    product_snapshot JSONB NOT NULL, -- Store product details at time of purchase
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 11. Reviews
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    order_item_id UUID REFERENCES public.order_items(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_verified_purchase BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, user_id, order_item_id)
);

-- 12. Shipping
CREATE TABLE public.shipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    carrier TEXT NOT NULL,
    tracking_number TEXT,
    status public.shipping_status DEFAULT 'pending'::public.shipping_status,
    estimated_delivery TIMESTAMPTZ,
    actual_delivery TIMESTAMPTZ,
    tracking_updates JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 13. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_products_seller_id ON public.products(seller_id);
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_is_available ON public.products(is_available);
CREATE INDEX idx_products_created_at ON public.products(created_at DESC);
CREATE INDEX idx_products_price_inr ON public.products(price_inr);
CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX idx_product_images_is_primary ON public.product_images(is_primary);
CREATE INDEX idx_wishlists_user_id ON public.wishlists(user_id);
CREATE INDEX idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_categories_parent_id ON public.categories(parent_id);

-- 14. Helper Functions (MUST BE BEFORE RLS POLICIES)
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    new_number TEXT;
BEGIN
    new_number := 'ECO' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    RETURN new_number;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_product_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 15. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;

-- 16. RLS Policies Following Correct Patterns

-- Pattern 1: Core User Tables - Simple column comparison only
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 4: Public Read, Private Write for Categories
CREATE POLICY "public_can_read_categories"
ON public.categories
FOR SELECT
TO public
USING (true);

CREATE POLICY "admins_manage_categories"
ON public.categories
FOR ALL
TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'
))
WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'
));

-- Pattern 4: Public Read, Private Write for Products
CREATE POLICY "public_can_read_products"
ON public.products
FOR SELECT
TO public
USING (is_available = true);

CREATE POLICY "sellers_manage_own_products"
ON public.products
FOR ALL
TO authenticated
USING (seller_id = auth.uid())
WITH CHECK (seller_id = auth.uid());

-- Pattern 4: Public Read, Private Write for Product Images
CREATE POLICY "public_can_read_product_images"
ON public.product_images
FOR SELECT
TO public
USING (true);

CREATE POLICY "sellers_manage_product_images"
ON public.product_images
FOR ALL
TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.products p
    WHERE p.id = product_id AND p.seller_id = auth.uid()
))
WITH CHECK (EXISTS (
    SELECT 1 FROM public.products p
    WHERE p.id = product_id AND p.seller_id = auth.uid()
));

-- Pattern 2: Simple User Ownership
CREATE POLICY "users_manage_own_wishlists"
ON public.wishlists
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_cart_items"
ON public.cart_items
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_addresses"
ON public.addresses
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_orders"
ON public.orders
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Order Items: Users can view their own orders, sellers can view orders for their products
CREATE POLICY "users_view_own_order_items"
ON public.order_items
FOR SELECT
TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_id AND o.user_id = auth.uid()
));

CREATE POLICY "sellers_view_sold_items"
ON public.order_items
FOR SELECT
TO authenticated
USING (seller_id = auth.uid());

-- Pattern 2: Simple User Ownership for Reviews
CREATE POLICY "public_can_read_reviews"
ON public.reviews
FOR SELECT
TO public
USING (true);

CREATE POLICY "users_manage_own_reviews"
ON public.reviews
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Shipments: Only order owners can view
CREATE POLICY "users_view_own_shipments"
ON public.shipments
FOR SELECT
TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_id AND o.user_id = auth.uid()
));

-- 17. Triggers
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_product_updated_at();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_product_updated_at();

-- 18. Storage Buckets for Product Images (Public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
);

-- Storage RLS Policies for Product Images
CREATE POLICY "public_can_view_product_images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'product-images');

CREATE POLICY "authenticated_users_upload_product_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "owners_manage_product_images"
ON storage.objects
FOR UPDATE, DELETE
TO authenticated
USING (bucket_id = 'product-images' AND owner = auth.uid());

-- 19. Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'buyer'::public.user_role)
    );
    RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 20. Mock Data with Complete Auth Users
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    seller1_uuid UUID := gen_random_uuid();
    buyer1_uuid UUID := gen_random_uuid();
    category1_uuid UUID := gen_random_uuid();
    category2_uuid UUID := gen_random_uuid();
    product1_uuid UUID := gen_random_uuid();
    product2_uuid UUID := gen_random_uuid();
    address1_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@ecofinds.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (seller1_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'seller@ecofinds.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Eco Seller", "role": "seller"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (buyer1_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'buyer@ecofinds.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Green Buyer", "role": "buyer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create categories
    INSERT INTO public.categories (id, name, slug, description, is_active) VALUES
        (category1_uuid, 'Sustainable Fashion', 'sustainable-fashion', 'Eco-friendly clothing and accessories', true),
        (category2_uuid, 'Eco Electronics', 'eco-electronics', 'Refurbished and sustainable electronics', true);

    -- Create products with INR pricing
    INSERT INTO public.products (
        id, seller_id, category_id, title, description, price_inr, original_price_inr,
        condition, brand, story_snippet, sustainability_score, tags, is_available, is_authenticated, is_local
    ) VALUES
        (product1_uuid, seller1_uuid, category1_uuid, 'Organic Cotton T-Shirt',
         'Soft, comfortable organic cotton t-shirt made with sustainable practices',
         899.00, 1200.00, 'new', 'EcoWear',
         'Made from certified organic cotton by fair-trade farmers',
         95, ARRAY['organic', 'cotton', 'sustainable', 'fashion'], true, true, true),
        (product2_uuid, seller1_uuid, category2_uuid, 'Refurbished Smartphone',
         'Fully tested and restored smartphone with 6 months warranty',
         15999.00, 25000.00, 'excellent', 'GreenTech',
         'Saved from electronic waste, fully restored to like-new condition',
         88, ARRAY['electronics', 'refurbished', 'smartphone'], true, true, false);

    -- Create product images
    INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary) VALUES
        (product1_uuid, '/images/organic-tshirt-1.jpg', 'Organic Cotton T-Shirt Front View', 1, true),
        (product1_uuid, '/images/organic-tshirt-2.jpg', 'Organic Cotton T-Shirt Back View', 2, false),
        (product2_uuid, '/images/refurb-phone-1.jpg', 'Refurbished Smartphone Front', 1, true),
        (product2_uuid, '/images/refurb-phone-2.jpg', 'Refurbished Smartphone Back', 2, false);

    -- Create address
    INSERT INTO public.addresses (
        id, user_id, full_name, phone, street_address, city, state, postal_code, is_default
    ) VALUES
        (address1_uuid, buyer1_uuid, 'Green Buyer', '+91-9876543210',
         '123 Eco Street, Green Park', 'New Delhi', 'Delhi', '110016', true);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;

-- 21. Helper function for cleanup (development only)
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs first
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email LIKE '%@ecofinds.com';

    -- Delete in dependency order (children first)
    DELETE FROM public.product_images WHERE product_id IN (SELECT id FROM public.products WHERE seller_id = ANY(auth_user_ids_to_delete));
    DELETE FROM public.wishlists WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.cart_items WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.reviews WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.order_items WHERE EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = ANY(auth_user_ids_to_delete));
    DELETE FROM public.orders WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.products WHERE seller_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.addresses WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);
    
    -- Delete auth.users last (after all references are removed)
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);
    
    RAISE NOTICE 'Test data cleanup completed';
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END $$;