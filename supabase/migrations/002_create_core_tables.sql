-- 002_create_core_tables.sql
-- Tables: users, profiles, user_preferences, house_rules, amenities, properties
-- Dependency order from V2

-- ============================================
-- users (extends auth.users)
-- ============================================
CREATE TABLE users (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'tenant',
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    last_login timestamptz
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- profiles
-- ============================================
CREATE TABLE profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name text NOT NULL,
    bio text,
    avatar_url text,
    phone text,
    date_of_birth date,
    gender gender_preference,
    occupation text,
    city text NOT NULL,
    locality text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_city_gender ON profiles(city, gender);

-- ============================================
-- user_preferences
-- ============================================
CREATE TABLE user_preferences (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id uuid NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    budget_min integer,
    budget_max integer,
    move_in_date date,
    food_preference food_preference,
    smoking_preference smoking_preference,
    pets_allowed boolean,
    cleanliness_level integer CHECK (cleanliness_level BETWEEN 1 AND 5),
    noise_tolerance integer CHECK (noise_tolerance BETWEEN 1 AND 5),
    guest_policy text,
    age_range_min integer,
    age_range_max integer,
    gender_preference gender_preference,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_preferences_profile_id ON user_preferences(profile_id);
CREATE INDEX idx_user_preferences_lifestyle ON user_preferences(food_preference, smoking_preference, pets_allowed);

-- ============================================
-- house_rules
-- ============================================
CREATE TABLE house_rules (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    property_id uuid, -- will add FK later after properties table
    quiet_hours_start time,
    quiet_hours_end time,
    visitors_allowed boolean,
    overnight_guests boolean,
    chores text,
    additional_rules jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT house_rules_owner_check CHECK (profile_id IS NOT NULL OR property_id IS NOT NULL)
);

CREATE INDEX idx_house_rules_profile_id ON house_rules(profile_id);
CREATE INDEX idx_house_rules_property_id ON house_rules(property_id);

-- ============================================
-- amenities (lookup table)
-- ============================================
CREATE TABLE amenities (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    category text,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_amenities_name ON amenities(name);

-- ============================================
-- properties (core listing table)
-- ============================================
CREATE TABLE properties (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text NOT NULL,
    monthly_rent integer NOT NULL CHECK (monthly_rent > 0),
    security_deposit integer NOT NULL,
    maintenance_fee integer,
    property_type property_type NOT NULL,
    address text NOT NULL,
    locality text,
    city text NOT NULL,
    latitude double precision,
    longitude double precision,
    bedrooms integer NOT NULL CHECK (bedrooms >= 0),
    bathrooms integer NOT NULL CHECK (bathrooms >= 0),
    balcony boolean NOT NULL DEFAULT false,
    parking boolean NOT NULL DEFAULT false,
    furnished furnished_status NOT NULL,
    size_sqft integer,
    available_from date NOT NULL CHECK (available_from >= CURRENT_DATE),
    gender_preference gender_preference NOT NULL,
    smoking_allowed boolean NOT NULL DEFAULT false,
    pets_allowed boolean NOT NULL DEFAULT false,
    food_preference food_preference NOT NULL,
    status property_status NOT NULL DEFAULT 'active',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    deleted_at timestamptz
);

-- Soft delete support via deleted_at + status
CREATE INDEX idx_properties_owner_id ON properties(owner_id);
CREATE INDEX idx_properties_city_locality ON properties(city, locality);
CREATE INDEX idx_properties_rent ON properties(monthly_rent);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_available_from ON properties(available_from);
CREATE INDEX idx_properties_geo ON properties USING GIST (latitude, longitude);
-- Expression index for full-text search (as per V2)
CREATE INDEX idx_properties_search ON properties USING GIN (to_tsvector('english', title || ' ' || description || ' ' || COALESCE(locality, '') || ' ' || city));