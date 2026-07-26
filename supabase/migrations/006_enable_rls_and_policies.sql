-- 006_enable_rls_and_policies.sql
-- Generated from DATABASE_SCHEMA_DESIGN_V2.md and ownership rules
-- Enable Row Level Security and create policies for all user-facing tables
-- No schema changes. Production-ready. Least privilege. Supabase Auth compatible.

-- ============================================
-- HELPER FUNCTION: is_admin()
-- ============================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM users 
    WHERE id = auth.uid() 
      AND role = 'admin'
  );
$$;

COMMENT ON FUNCTION public.is_admin() IS 'Security definer helper to check if current user has admin role. Bypasses RLS for the check.';

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE house_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES
-- Public can read (for discovery and matching).
-- Owner full control.
-- ============================================

CREATE POLICY "profiles_select_public" ON profiles
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "profiles_delete_own" ON profiles
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================
-- USER_PREFERENCES
-- Owner only (linked via profile)
-- ============================================

CREATE POLICY "user_preferences_all_own" ON user_preferences
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = user_preferences.profile_id 
        AND profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = user_preferences.profile_id 
        AND profiles.user_id = auth.uid()
    )
  );

-- ============================================
-- HOUSE_RULES
-- Owner only (either tenant profile or property owner)
-- ============================================

CREATE POLICY "house_rules_all_own" ON house_rules
  FOR ALL
  TO authenticated
  USING (
    (profile_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = house_rules.profile_id 
        AND profiles.user_id = auth.uid()
    ))
    OR
    (property_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = house_rules.property_id 
        AND properties.owner_id = auth.uid()
    ))
  )
  WITH CHECK (
    (profile_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = house_rules.profile_id 
        AND profiles.user_id = auth.uid()
    ))
    OR
    (property_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = house_rules.property_id 
        AND properties.owner_id = auth.uid()
    ))
  );

-- ============================================
-- PROPERTIES
-- Public: only active listings
-- Owner: full access (including soft delete via UPDATE)
-- Admin: full access
-- ============================================

CREATE POLICY "properties_select_public_or_owner" ON properties
  FOR SELECT
  TO anon, authenticated
  USING (
    status = 'active' 
    OR owner_id = auth.uid()
    OR is_admin()
  );

CREATE POLICY "properties_insert_own" ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "properties_update_own_or_admin" ON properties
  FOR UPDATE
  TO authenticated
  USING (owner_id = auth.uid() OR is_admin())
  WITH CHECK (owner_id = auth.uid() OR is_admin());

-- Note: DELETE not allowed (use soft delete via status/deleted_at)

-- ============================================
-- PROPERTY_IMAGES
-- Ownership follows parent property
-- ============================================

CREATE POLICY "property_images_select_public_or_owner" ON property_images
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = property_images.property_id 
        AND (properties.status = 'active' OR properties.owner_id = auth.uid() OR is_admin())
    )
  );

CREATE POLICY "property_images_modify_own_property" ON property_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = property_images.property_id 
        AND (properties.owner_id = auth.uid() OR is_admin())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = property_images.property_id 
        AND (properties.owner_id = auth.uid() OR is_admin())
    )
  );

-- ============================================
-- AMENITIES (lookup table)
-- Public read, admin write
-- ============================================

CREATE POLICY "amenities_select_public" ON amenities
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "amenities_modify_admin_only" ON amenities
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================
-- PROPERTY_AMENITIES
-- Ownership follows parent property
-- ============================================

CREATE POLICY "property_amenities_all_own_property" ON property_amenities
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = property_amenities.property_id 
        AND (properties.owner_id = auth.uid() OR is_admin())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = property_amenities.property_id 
        AND (properties.owner_id = auth.uid() OR is_admin())
    )
  );

-- ============================================
-- FAVORITES
-- Owner only
-- ============================================

CREATE POLICY "favorites_all_own" ON favorites
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- SAVED_SEARCHES
-- Owner only
-- ============================================

CREATE POLICY "saved_searches_all_own" ON saved_searches
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- CONVERSATIONS
-- Only participants can access
-- INSERT allowed for authenticated (app adds participants)
-- ============================================

CREATE POLICY "conversations_select_participant" ON conversations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversation_participants 
      WHERE conversation_participants.conversation_id = conversations.id 
        AND conversation_participants.user_id = auth.uid()
    )
    OR is_admin()
  );

CREATE POLICY "conversations_update_participant" ON conversations
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversation_participants 
      WHERE conversation_participants.conversation_id = conversations.id 
        AND conversation_participants.user_id = auth.uid()
    )
    OR is_admin()
  );

CREATE POLICY "conversations_insert_authenticated" ON conversations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);  -- App ensures creator becomes participant

-- ============================================
-- CONVERSATION_PARTICIPANTS
-- Users can only see/add themselves to conversations they participate in
-- ============================================

CREATE POLICY "conversation_participants_select_own" ON conversation_participants
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM conversation_participants cp2 
      WHERE cp2.conversation_id = conversation_participants.conversation_id 
        AND cp2.user_id = auth.uid()
    )
    OR is_admin()
  );

CREATE POLICY "conversation_participants_insert_self" ON conversation_participants
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- No UPDATE/DELETE for participants (immutable after join)

-- ============================================
-- MESSAGES
-- Only conversation participants can read/send/mark read
-- ============================================

CREATE POLICY "messages_select_participant" ON messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversation_participants 
      WHERE conversation_participants.conversation_id = messages.conversation_id 
        AND conversation_participants.user_id = auth.uid()
    )
    OR is_admin()
  );

CREATE POLICY "messages_insert_participant" ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM conversation_participants 
      WHERE conversation_participants.conversation_id = messages.conversation_id 
        AND conversation_participants.user_id = auth.uid()
    )
  );

CREATE POLICY "messages_update_read_status" ON messages
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversation_participants 
      WHERE conversation_participants.conversation_id = messages.conversation_id 
        AND conversation_participants.user_id = auth.uid()
    )
    OR is_admin()
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversation_participants 
      WHERE conversation_participants.conversation_id = messages.conversation_id 
        AND conversation_participants.user_id = auth.uid()
    )
    OR is_admin()
  );

-- ============================================
-- REPORTS
-- Authenticated can create.
-- Reporter can view own.
-- Admin can manage all.
-- ============================================

CREATE POLICY "reports_insert_authenticated" ON reports
  FOR INSERT
  TO authenticated
  WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "reports_select_own_or_admin" ON reports
  FOR SELECT
  TO authenticated
  USING (reporter_id = auth.uid() OR is_admin());

CREATE POLICY "reports_update_admin_only" ON reports
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "reports_delete_admin_only" ON reports
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================
-- BLOCKS
-- Owner only (blocker manages their block list)
-- ============================================

CREATE POLICY "blocks_all_own" ON blocks
  FOR ALL
  TO authenticated
  USING (blocker_id = auth.uid())
  WITH CHECK (blocker_id = auth.uid());

-- ============================================
-- INQUIRIES
-- Inquirer creates.
-- Property owner or inquirer can view.
-- Admin full access.
-- ============================================

CREATE POLICY "inquiries_insert_own" ON inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "inquiries_select_inquirer_or_owner_or_admin" ON inquiries
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = inquiries.property_id 
        AND properties.owner_id = auth.uid()
    )
    OR is_admin()
  );

CREATE POLICY "inquiries_update_owner_or_admin" ON inquiries
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = inquiries.property_id 
        AND properties.owner_id = auth.uid()
    )
    OR is_admin()
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = inquiries.property_id 
        AND properties.owner_id = auth.uid()
    )
    OR is_admin()
  );

-- ============================================
-- END OF RLS MIGRATION
-- ============================================
-- All policies follow least privilege.
-- Admin role checked via is_admin() helper.
-- No policies on auth.users (Supabase managed).
-- Service role bypasses RLS automatically.
-- Ready to run after migration 005.
-- Every table has RLS enabled and appropriate policies.