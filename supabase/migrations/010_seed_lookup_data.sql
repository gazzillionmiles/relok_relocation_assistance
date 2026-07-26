-- 010_seed_lookup_data.sql
-- Idempotent seed for lookup tables only
-- Generated from DATABASE_SCHEMA_DESIGN_V2.md
-- DO NOT seed users, listings, or demo data.

-- ============================================
-- AMENITIES (canonical list from UI contract)
-- ============================================
INSERT INTO amenities (id, name, category) VALUES
  (gen_random_uuid(), 'WiFi', 'Connectivity'),
  (gen_random_uuid(), 'AC', 'Comfort'),
  (gen_random_uuid(), 'Washing Machine', 'Laundry'),
  (gen_random_uuid(), 'Fridge', 'Kitchen'),
  (gen_random_uuid(), 'Microwave', 'Kitchen'),
  (gen_random_uuid(), 'Geyser', 'Bathroom'),
  (gen_random_uuid(), 'TV', 'Entertainment'),
  (gen_random_uuid(), 'Sofa', 'Living'),
  (gen_random_uuid(), 'Dining Table', 'Living'),
  (gen_random_uuid(), 'Wardrobe', 'Storage'),
  (gen_random_uuid(), 'Study Table', 'Workspace'),
  (gen_random_uuid(), 'Gym', 'Fitness'),
  (gen_random_uuid(), 'Swimming Pool', 'Recreation'),
  (gen_random_uuid(), 'Parking', 'Convenience'),
  (gen_random_uuid(), 'Balcony', 'Convenience'),
  (gen_random_uuid(), 'Power Backup', 'Utility'),
  (gen_random_uuid(), 'Security', 'Safety'),
  (gen_random_uuid(), 'CCTV', 'Safety'),
  (gen_random_uuid(), 'Housekeeping', 'Service'),
  (gen_random_uuid(), 'Laundry Service', 'Service')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- PROPERTY TYPES (already in enum, no table needed)
-- Categories are handled via enum property_type

-- ============================================
-- DEFAULT CONFIG (future expansion)
-- Can add a config table later if needed.

-- ============================================
-- END OF SEED
-- ============================================
-- This migration is idempotent (ON CONFLICT DO NOTHING).
-- No user or listing data seeded.
-- Safe to run multiple times.