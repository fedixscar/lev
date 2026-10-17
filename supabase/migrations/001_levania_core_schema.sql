-- ====================================================================
-- LÉVANIA PARFUMS — CORE DATABASE SCHEMA & ROW LEVEL SECURITY
-- PostgreSQL / Supabase Schema Architecture
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. IDENTITIES & PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'reseller')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CATALOGUE & COLLECTIONS
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    wave_expression TEXT NOT NULL CHECK (wave_expression IN ('signature', 'soft', 'intense')),
    banner_image TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    subtitle TEXT,
    fragrance_family TEXT NOT NULL,
    intensity TEXT NOT NULL CHECK (intensity IN ('Subtle', 'Balanced', 'Intense', 'Monumental')),
    description TEXT NOT NULL,
    sensory_profile TEXT,
    main_image TEXT NOT NULL,
    packaging_image TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_bestseller BOOLEAN NOT NULL DEFAULT FALSE,
    bestseller_rank INT CHECK (bestseller_rank BETWEEN 1 AND 10),
    qr_eligible BOOLEAN NOT NULL DEFAULT TRUE,
    rating NUMERIC(3,2) NOT NULL DEFAULT 5.0,
    review_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    size TEXT NOT NULL CHECK (size IN ('50ml', '100ml')),
    price_millimes INT NOT NULL CHECK (price_millimes > 0), -- Stored in integer millimes
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    sku TEXT UNIQUE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(product_id, size)
);

-- 3. ORDERS & COMMERCE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_street TEXT NOT NULL,
    shipping_city TEXT NOT NULL,
    shipping_governorate TEXT NOT NULL,
    subtotal_millimes INT NOT NULL CHECK (subtotal_millimes >= 0),
    discount_millimes INT NOT NULL DEFAULT 0 CHECK (discount_millimes >= 0),
    delivery_fee_millimes INT NOT NULL DEFAULT 0 CHECK (delivery_fee_millimes >= 0),
    total_millimes INT NOT NULL CHECK (total_millimes >= 0),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'cod')),
    payment_method TEXT NOT NULL CHECK (payment_method IN ('online', 'cod')),
    luck_awarded INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    size TEXT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price_millimes INT NOT NULL CHECK (unit_price_millimes >= 0),
    custom_gift_box_details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. LOYALTY & GAMIFICATION (LUCK, XP, WHEEL)
-- Luck Wallet with strict 7,777 cap constraint
CREATE TABLE IF NOT EXISTS public.luck_wallets (
    customer_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    balance INT NOT NULL DEFAULT 0 CHECK (balance >= 0 AND balance <= 7777),
    lifetime_earned INT NOT NULL DEFAULT 0 CHECK (lifetime_earned >= 0),
    lifetime_consumed INT NOT NULL DEFAULT 0 CHECK (lifetime_consumed >= 0),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.luck_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount INT NOT NULL, -- positive for award, negative for wheel spin
    source TEXT NOT NULL CHECK (source IN ('order_earn', 'wheel_consumption', 'admin_adjustment', 'refund_reversal')),
    reference_id TEXT,
    balance_after INT NOT NULL CHECK (balance_after >= 0 AND balance_after <= 7777),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.loyalty_wallets (
    customer_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    points_balance INT NOT NULL DEFAULT 0 CHECK (points_balance >= 0),
    lifetime_earned INT NOT NULL DEFAULT 0 CHECK (lifetime_earned >= 0),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.wheel_spins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    tier TEXT NOT NULL CHECK (tier IN ('Normal Wave', 'Fire Wave', 'Royal Wave', 'Admin Wave')),
    luck_consumed INT NOT NULL CHECK (luck_consumed > 0),
    reward_type TEXT NOT NULL,
    reward_label TEXT NOT NULL,
    reward_value JSONB NOT NULL,
    coupon_code_generated TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. RESELLER ECOSYSTEM
CREATE TABLE IF NOT EXISTS public.reseller_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rank TEXT NOT NULL DEFAULT 'Iron' CHECK (rank IN ('Iron', 'Bronze', 'Gold', 'Platinum', 'Diamond', 'Master')),
    commission_balance_millimes INT NOT NULL DEFAULT 0 CHECK (commission_balance_millimes >= 0),
    pending_commission_millimes INT NOT NULL DEFAULT 0 CHECK (pending_commission_millimes >= 0),
    paid_commission_millimes INT NOT NULL DEFAULT 0 CHECK (paid_commission_millimes >= 0),
    total_sales_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reseller_sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reseller_id UUID NOT NULL REFERENCES public.reseller_profiles(id) ON DELETE CASCADE,
    order_reference TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    product_name TEXT NOT NULL,
    commission_rate_millimes INT NOT NULL CHECK (commission_rate_millimes > 0),
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected', 'paid')),
    evidence_notes TEXT,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

-- 6. PHYSICAL PERFUME QR CODES
CREATE TABLE IF NOT EXISTS public.qr_tokens (
    token TEXT PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    bottle_serial_number TEXT UNIQUE NOT NULL,
    batch_code TEXT NOT NULL,
    bottling_date DATE NOT NULL,
    is_activated BOOLEAN NOT NULL DEFAULT TRUE,
    scan_count INT NOT NULL DEFAULT 0,
    last_scanned_at TIMESTAMPTZ,
    associated_customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target_table TEXT NOT NULL,
    target_id TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- BUSINESS LOGIC FUNCTIONS & TRIGGERS
-- ====================================================================

-- Function: Award Luck with floor(millimes / 10000) and 7777 cap
CREATE OR REPLACE FUNCTION public.award_order_luck(
    p_customer_id UUID,
    p_eligible_millimes INT,
    p_order_id TEXT
) RETURNS INT AS $$
DECLARE
    v_raw_luck INT;
    v_current_bal INT;
    v_luck_to_add INT;
    v_new_bal INT;
BEGIN
    v_raw_luck := FLOOR(p_eligible_millimes / 10000);
    IF v_raw_luck <= 0 THEN
        RETURN 0;
    END IF;

    SELECT balance INTO v_current_bal FROM public.luck_wallets WHERE customer_id = p_customer_id FOR UPDATE;
    IF NOT FOUND THEN
        INSERT INTO public.luck_wallets(customer_id, balance, lifetime_earned)
        VALUES (p_customer_id, 0, 0);
        v_current_bal := 0;
    END IF;

    -- Apply 7,777 cap
    v_luck_to_add := LEAST(v_raw_luck, 7777 - v_current_bal);
    IF v_luck_to_add <= 0 THEN
        RETURN 0;
    END IF;

    v_new_bal := v_current_bal + v_luck_to_add;

    UPDATE public.luck_wallets
    SET balance = v_new_bal,
        lifetime_earned = lifetime_earned + v_luck_to_add,
        updated_at = NOW()
    WHERE customer_id = p_customer_id;

    INSERT INTO public.luck_transactions (customer_id, amount, source, reference_id, balance_after)
    VALUES (p_customer_id, v_luck_to_add, 'order_earn', p_order_id, v_new_bal);

    RETURN v_luck_to_add;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.luck_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reseller_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_tokens ENABLE ROW LEVEL SECURITY;

-- Profiles: users read own, admins read all
CREATE POLICY "Users read own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Orders: users read own orders, admins full access
CREATE POLICY "Customers read own orders" ON public.orders
    FOR SELECT USING (auth.uid() = customer_id);

-- Luck Wallets: users read own wallet
CREATE POLICY "Customers read own luck" ON public.luck_wallets
    FOR SELECT USING (auth.uid() = customer_id);

-- Reseller Sales: resellers read own sales, admins full access
CREATE POLICY "Resellers read own sales" ON public.reseller_sales
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.reseller_profiles rp
            WHERE rp.id = reseller_sales.reseller_id AND rp.user_id = auth.uid()
        )
    );

-- QR Tokens: Public read-only for verification
CREATE POLICY "Public read qr tokens" ON public.qr_tokens
    FOR SELECT USING (is_activated = TRUE);
