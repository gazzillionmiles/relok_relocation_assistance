-- 007_storage_setup.sql
-- Storage buckets and policies for Relok
-- Generated from DATABASE_SCHEMA_DESIGN_V2.md and UI contract

-- ============================================
-- CREATE STORAGE BUCKETS
-- ============================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('property-images', 'property-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ============================================
-- STORAGE RLS POLICIES
-- ============================================

-- AVATARS: Public read, owner upload/update/delete
CREATE POLICY "avatars_public_read" ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'avatars');

CREATE POLICY "avatars_owner_write" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "avatars_owner_update" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "avatars_owner_delete" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- PROPERTY IMAGES: Public read, property owner upload/update/delete
CREATE POLICY "property_images_public_read" ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'property-images');

CREATE POLICY "property_images_owner_write" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'property-images'
    AND EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = (storage.foldername(name))[1]::uuid
        AND properties.owner_id = auth.uid()
    )
  );

CREATE POLICY "property_images_owner_update" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'property-images'
    AND EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = (storage.foldername(name))[1]::uuid
        AND properties.owner_id = auth.uid()
    )
  );

CREATE POLICY "property_images_owner_delete" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'property-images'
    AND EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = (storage.foldername(name))[1]::uuid
        AND properties.owner_id = auth.uid()
    )
  );

-- Folder convention comments:
-- avatars/{user_id}/avatar.{ext}
-- property-images/{property_id}/{display_order}.{ext}

COMMENT ON POLICY "avatars_public_read" ON storage.objects IS 'Public can view all avatars for profile display.';
COMMENT ON POLICY "avatars_owner_write" ON storage.objects IS 'Users can only upload to their own folder.';
COMMENT ON POLICY "property_images_owner_write" ON storage.objects IS 'Only property owner can upload images to their listing folder.';