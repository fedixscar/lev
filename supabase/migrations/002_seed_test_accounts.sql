-- ====================================================================
-- LÉVANIA PARFUMS — SEED TEST ACCOUNTS (ADMIN, RESELLER, CUSTOMER)
-- Exécutez ce script dans l'éditeur SQL de votre projet Supabase
-- ====================================================================

-- 1. Assurer la présence des extensions requises
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Fonction utilitaire pour créer ou mettre à jour un compte Auth Supabase avec mot de passe chiffré
CREATE OR REPLACE FUNCTION public.create_or_update_test_user(
    p_email TEXT,
    p_password TEXT,
    p_full_name TEXT,
    p_role TEXT,
    p_phone TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    v_user_id UUID;
    v_encrypted_password TEXT;
BEGIN
    v_encrypted_password := crypt(p_password, gen_salt('bf'));

    -- Vérifier si l'utilisateur existe déjà dans auth.users
    SELECT id INTO v_user_id FROM auth.users WHERE email = p_email;

    IF v_user_id IS NULL THEN
        v_user_id := uuid_generate_v4();

        -- Insérer dans auth.users
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            v_user_id,
            'authenticated',
            'authenticated',
            p_email,
            v_encrypted_password,
            NOW(),
            NOW(),
            NOW(),
            jsonb_build_object('provider', 'email', 'providers', array['email']),
            jsonb_build_object('full_name', p_full_name, 'role', p_role),
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        );
    ELSE
        -- Mettre à jour le mot de passe existant
        UPDATE auth.users
        SET encrypted_password = v_encrypted_password,
            email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
            raw_user_meta_data = jsonb_build_object('full_name', p_full_name, 'role', p_role),
            updated_at = NOW()
        WHERE id = v_user_id;
    END IF;

    -- Insérer ou mettre à jour dans public.profiles
    INSERT INTO public.profiles (id, full_name, email, phone, role, created_at, updated_at)
    VALUES (v_user_id, p_full_name, p_email, p_phone, p_role, NOW(), NOW())
    ON CONFLICT (id) DO UPDATE
    SET full_name = EXCLUDED.full_name,
        role = EXCLUDED.role,
        phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
        updated_at = NOW();

    -- Initialiser les wallets pour le client
    IF p_role = 'customer' THEN
        INSERT INTO public.luck_wallets (customer_id, balance, lifetime_earned, updated_at)
        VALUES (v_user_id, 150, 150, NOW())
        ON CONFLICT (customer_id) DO NOTHING;

        INSERT INTO public.loyalty_wallets (customer_id, points_balance, lifetime_earned, updated_at)
        VALUES (v_user_id, 240, 240, NOW())
        ON CONFLICT (customer_id) DO NOTHING;
    END IF;

    -- Initialiser le profil revendeur
    IF p_role = 'reseller' THEN
        INSERT INTO public.reseller_profiles (user_id, rank, commission_balance_millimes, pending_commission_millimes, paid_commission_millimes, total_sales_count)
        VALUES (v_user_id, 'Master', 140000, 30000, 280000, 28)
        ON CONFLICT (user_id) DO UPDATE
        SET rank = 'Master';
    END IF;

    RETURN v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ====================================================================
-- 3. CRÉATION DES 3 COMPTES OFFICIELS DE TEST
-- ====================================================================

-- COMPTE 1 : DIRECTION / ADMINISTRATEUR
-- Email: admin@levania-parfums.com
-- Mot de passe: LevaniaAdmin2026!
SELECT public.create_or_update_test_user(
    'admin@levania-parfums.com',
    'LevaniaAdmin2026!',
    'Direction Générale Lévania',
    'admin',
    '+216 71 800 900'
);

-- COMPTE 2 : REVENDEUR OFFICIEL (RANG MASTER)
-- Email: revendeur@levania-parfums.com
-- Mot de passe: LevaniaReseller2026!
SELECT public.create_or_update_test_user(
    'revendeur@levania-parfums.com',
    'LevaniaReseller2026!',
    'Amira Khemir (Revendeur Privilège)',
    'reseller',
    '+216 55 789 012'
);

-- COMPTE 3 : CLIENT PRIVILÈGE
-- Email: client@levania-parfums.com
-- Mot de passe: LevaniaClient2026!
SELECT public.create_or_update_test_user(
    'client@levania-parfums.com',
    'LevaniaClient2026!',
    'Elyes Ben Amor',
    'customer',
    '+216 98 123 456'
);

-- Vérification des profils créés
SELECT id, full_name, email, role, phone, created_at FROM public.profiles;
