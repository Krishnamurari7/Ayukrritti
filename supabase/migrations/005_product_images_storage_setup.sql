-- Migration: Setup product images storage bucket and policies
-- Description: Creates storage bucket for product images and sets up appropriate access policies

-- Create storage bucket for product images (if not exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for product-images bucket

-- Policy 1: Allow public read access to product images
CREATE POLICY IF NOT EXISTS "Public can view product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Policy 2: Allow admins to upload product images
CREATE POLICY IF NOT EXISTS "Admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images' 
  AND (storage.foldername(name))[1] = 'products'
  AND auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

-- Policy 3: Allow admins to update product images
CREATE POLICY IF NOT EXISTS "Admins can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
)
WITH CHECK (
  bucket_id = 'product-images'
  AND auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

-- Policy 4: Allow admins to delete product images
CREATE POLICY IF NOT EXISTS "Admins can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

-- Ensure product_images table has proper RLS policies

-- Enable RLS on product_images if not already enabled
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to recreate them properly)
DROP POLICY IF EXISTS "Anyone can view product images" ON product_images;
DROP POLICY IF EXISTS "Admins can manage product images" ON product_images;

-- Policy: Public can view all product images
CREATE POLICY "Anyone can view product images"
ON product_images FOR SELECT
TO public
USING (true);

-- Policy: Admins can insert product images
CREATE POLICY "Admins can insert product images"
ON product_images FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

-- Policy: Admins can update product images
CREATE POLICY "Admins can update product images"
ON product_images FOR UPDATE
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

-- Policy: Admins can delete product images
CREATE POLICY "Admins can delete product images"
ON product_images FOR DELETE
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

-- Add helpful comments
COMMENT ON TABLE product_images IS 'Stores product images with support for multiple images per product';
COMMENT ON COLUMN product_images.display_order IS 'Order in which images should be displayed (0 = main image)';
