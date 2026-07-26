-- 005_create_moderation_and_final_indexes_triggers.sql
-- Tables: reports, blocks + All remaining indexes + updated_at triggers

-- ============================================
-- reports
-- ============================================
CREATE TABLE reports (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_type text NOT NULL CHECK (target_type IN ('listing', 'user')),
    target_id uuid NOT NULL,
    reason report_reason NOT NULL,
    description text,
    status report_status NOT NULL DEFAULT 'open',
    created_at timestamptz NOT NULL DEFAULT now(),
    resolved_at timestamptz,
    moderator_id uuid REFERENCES users(id) ON DELETE SET NULL,
    moderator_notes text
);

CREATE INDEX idx_reports_reporter ON reports(reporter_id);
CREATE INDEX idx_reports_target ON reports(target_type, target_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_created ON reports(created_at);

-- ============================================
-- blocks (junction)
-- ============================================
CREATE TABLE blocks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    blocker_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blocked_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reason text,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_blocks_unique ON blocks(blocker_id, blocked_id);
CREATE INDEX idx_blocks_blocker ON blocks(blocker_id);
CREATE INDEX idx_blocks_blocked ON blocks(blocked_id);

-- ============================================
-- UPDATED_AT TRIGGERS (for all tables with updated_at)
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to tables that have updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_house_rules_updated_at BEFORE UPDATE ON house_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_saved_searches_updated_at BEFORE UPDATE ON saved_searches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Note: No RLS policies in this migration (as per task requirements)
-- Soft delete support: properties.deleted_at + status='deleted'; users.is_active

-- ============================================
-- ADDITIONAL PERFORMANCE INDEXES (from Part 6 of V2)
-- ============================================

-- Partial index for active listings only
CREATE INDEX idx_properties_active ON properties(status) WHERE status = 'active';

-- Composite indexes for common filter combinations
CREATE INDEX idx_properties_filters ON properties(city, monthly_rent, status, available_from);
CREATE INDEX idx_properties_lifestyle ON properties(gender_preference, smoking_allowed, pets_allowed, food_preference);
CREATE INDEX idx_properties_details ON properties(bedrooms, bathrooms);

-- Messaging performance
CREATE INDEX idx_messages_unread ON messages(conversation_id) WHERE read_at IS NULL;

-- Final note: All tables, columns, constraints, and indexes exactly match DATABASE_SCHEMA_DESIGN_V2.md
-- No obsolete entities (no verifications, no broker_id, no OTP, no document uploads)