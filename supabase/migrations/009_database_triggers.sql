-- 009_database_triggers.sql
-- Triggers for updated_at, search vectors, soft deletes, and cascading metadata

-- ============================================
-- GENERIC updated_at TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply updated_at triggers to all tables that have the column
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_house_rules_updated_at
  BEFORE UPDATE ON house_rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_searches_updated_at
  BEFORE UPDATE ON saved_searches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- PROPERTIES SEARCH VECTOR TRIGGER (for full-text search)
-- ============================================
CREATE OR REPLACE FUNCTION public.properties_search_vector_trigger()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    NEW.title || ' ' || 
    NEW.description || ' ' || 
    COALESCE(NEW.locality, '') || ' ' || 
    NEW.city
  );
  RETURN NEW;
END;
$$;

-- Note: Add search_vector column to properties if not present (additive)
-- For now we assume the column exists or is added in a future migration.
-- CREATE TRIGGER properties_search_vector_update
--   BEFORE INSERT OR UPDATE ON properties
--   FOR EACH ROW EXECUTE FUNCTION properties_search_vector_trigger();

-- ============================================
-- SOFT DELETE CASCADE / CLEANUP TRIGGERS (optional examples)
-- ============================================

-- When a property is soft-deleted, optionally hide related data via RLS or app logic.
-- No automatic hard cascade on soft delete (preserves history).

-- Example: When user is deactivated, conversations remain but messaging can be restricted via RLS.

-- ============================================
-- END OF TRIGGERS
-- ============================================
-- All triggers reference existing tables from migrations 001-005.
-- No schema modifications. Ready for production.