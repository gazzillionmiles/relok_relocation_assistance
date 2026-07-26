-- 008_database_functions.sql
-- Reusable PostgreSQL functions for Relok
-- Generated from DATABASE_SCHEMA_DESIGN_V2.md

-- ============================================
-- is_admin() - already created in 006, ensure exists
-- ============================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- ============================================
-- can_access_conversation()
-- ============================================
CREATE OR REPLACE FUNCTION public.can_access_conversation(conv_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM conversation_participants
    WHERE conversation_id = conv_id
      AND user_id = auth.uid()
  );
$$;

-- ============================================
-- mark_messages_read()
-- ============================================
CREATE OR REPLACE FUNCTION public.mark_messages_read(conv_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE messages
  SET read_at = now()
  WHERE conversation_id = conv_id
    AND sender_id != auth.uid()
    AND read_at IS NULL
    AND EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_id = conv_id
        AND user_id = auth.uid()
    );
END;
$$;

-- ============================================
-- search_properties() - basic full-text + filter helper
-- ============================================
CREATE OR REPLACE FUNCTION public.search_properties(
  search_query text DEFAULT NULL,
  city_filter text DEFAULT NULL,
  min_rent integer DEFAULT NULL,
  max_rent integer DEFAULT NULL,
  prop_type property_type DEFAULT NULL,
  limit_count integer DEFAULT 20,
  offset_count integer DEFAULT 0
)
RETURNS TABLE (
  id uuid,
  title text,
  monthly_rent integer,
  city text,
  locality text,
  property_type property_type,
  status property_status
)
LANGUAGE sql
STABLE
AS $$
  SELECT p.id, p.title, p.monthly_rent, p.city, p.locality, p.property_type, p.status
  FROM properties p
  WHERE p.status = 'active'
    AND (search_query IS NULL OR to_tsvector('english', p.title || ' ' || p.description || ' ' || COALESCE(p.locality, '') || ' ' || p.city) @@ plainto_tsquery('english', search_query))
    AND (city_filter IS NULL OR p.city ILIKE city_filter)
    AND (min_rent IS NULL OR p.monthly_rent >= min_rent)
    AND (max_rent IS NULL OR p.monthly_rent <= max_rent)
    AND (prop_type IS NULL OR p.property_type = prop_type)
  ORDER BY p.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
$$;

-- ============================================
-- soft_delete_property()
-- ============================================
CREATE OR REPLACE FUNCTION public.soft_delete_property(prop_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE properties
  SET status = 'deleted', deleted_at = now(), updated_at = now()
  WHERE id = prop_id
    AND owner_id = auth.uid();
END;
$$;

-- ============================================
-- restore_property()
-- ============================================
CREATE OR REPLACE FUNCTION public.restore_property(prop_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE properties
  SET status = 'active', deleted_at = NULL, updated_at = now()
  WHERE id = prop_id
    AND owner_id = auth.uid()
    AND status = 'deleted';
END;
$$;

COMMENT ON FUNCTION public.is_admin() IS 'Returns true if current auth user has admin role.';
COMMENT ON FUNCTION public.can_access_conversation(uuid) IS 'Checks if current user is a participant in the given conversation.';
COMMENT ON FUNCTION public.mark_messages_read(uuid) IS 'Marks all unread messages in a conversation as read for the current user.';
COMMENT ON FUNCTION public.search_properties(text, text, integer, integer, property_type, integer, integer) IS 'Full-text + filter search for active properties.';
COMMENT ON FUNCTION public.soft_delete_property(uuid) IS 'Soft deletes a property owned by the current user.';
COMMENT ON FUNCTION public.restore_property(uuid) IS 'Restores a soft-deleted property owned by the current user.';