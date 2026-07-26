-- 001_create_extensions_and_enums.sql
-- Generated from DATABASE_SCHEMA_DESIGN_V2.md
-- Run this first

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- for text search if needed later

-- ============================================
-- ENUM TYPES (from Part 5 of V2)
-- ============================================

CREATE TYPE user_role AS ENUM ('tenant', 'owner', 'admin');

CREATE TYPE property_status AS ENUM ('active', 'paused', 'deleted');

CREATE TYPE property_type AS ENUM ('PG', 'Hostel', 'Apartment', 'Independent Room', 'Co-Living');

CREATE TYPE furnished_status AS ENUM ('Full', 'Semi', 'Unfurnished');

CREATE TYPE gender_preference AS ENUM ('Any', 'Male', 'Female');

CREATE TYPE food_preference AS ENUM ('Veg', 'Non-Veg', 'Both');

CREATE TYPE smoking_preference AS ENUM ('Allowed', 'Not Allowed', 'Occasional');

CREATE TYPE report_reason AS ENUM ('Spam', 'Fake Listing', 'Inappropriate Content', 'Scam', 'Harassment', 'Other');

CREATE TYPE report_status AS ENUM ('open', 'in_review', 'resolved', 'rejected');

CREATE TYPE inquiry_status AS ENUM ('new', 'contacted', 'closed');

-- Note: No verification enums (removed per cleaned codebase)