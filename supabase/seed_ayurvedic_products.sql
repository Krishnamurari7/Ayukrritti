-- =====================================================
-- AYURVEDIC PRODUCTS SEED DATA
-- =====================================================

-- Note: Run this AFTER the categories have been updated
-- This replaces the tech products with Ayurvedic products

DO $$
DECLARE
  cat_immunity UUID;
  cat_digestive UUID;
  cat_haircare UUID;
  cat_skincare UUID;
  cat_painrelief UUID;
  cat_wellness UUID;
BEGIN
  SELECT id INTO cat_immunity FROM categories WHERE slug = 'immunity-boosters';
  SELECT id INTO cat_digestive FROM categories WHERE slug = 'digestive-health';
  SELECT id INTO cat_haircare FROM categories WHERE slug = 'hair-care';
  SELECT id INTO cat_skincare FROM categories WHERE slug = 'skin-care';
  SELECT id INTO cat_painrelief FROM categories WHERE slug = 'pain-relief';
  SELECT id INTO cat_wellness FROM categories WHERE slug = 'wellness-supplements';

  -- Clear existing products
  DELETE FROM product_images;
  DELETE FROM products;

  -- Insert Ayurvedic Products
  INSERT INTO products (name, slug, description, price, compare_at_price, category_id, sku, stock_quantity, is_featured, is_active) VALUES
  (
    'Chyawanprash - 500g',
    'chyawanprash-500g',
    'Premium Chyawanprash made with 40+ herbs and natural ingredients. Boosts immunity, improves digestion, and enhances overall vitality. Rich in Vitamin C and antioxidants.',
    24.99,
    29.99,
    cat_immunity,
    'AYU-CHYW-500',
    100,
    true,
    true
  ),
  (
    'Ashwagandha Capsules - 60 Count',
    'ashwagandha-capsules-60',
    'Pure Ashwagandha root extract capsules. Reduces stress and anxiety, improves sleep quality, boosts energy levels. 500mg per capsule.',
    19.99,
    24.99,
    cat_wellness,
    'AYU-ASH-60',
    150,
    true,
    true
  ),
  (
    'Triphala Churna - 100g',
    'triphala-churna-100g',
    'Traditional Ayurvedic digestive tonic made from three fruits. Supports healthy digestion, detoxification, and regular bowel movements.',
    12.99,
    15.99,
    cat_digestive,
    'AYU-TRI-100',
    120,
    true,
    true
  ),
  (
    'Bhringraj Hair Oil - 200ml',
    'bhringraj-hair-oil-200ml',
    'Premium Bhringraj hair oil for hair growth and preventing premature graying. Nourishes scalp, strengthens roots, and promotes thick, lustrous hair.',
    16.99,
    19.99,
    cat_haircare,
    'AYU-BHR-200',
    80,
    true,
    true
  ),
  (
    'Kumkumadi Tailam Face Serum',
    'kumkumadi-tailam-serum',
    'Luxurious Kumkumadi oil for radiant, glowing skin. Reduces blemishes, evens skin tone, and provides natural anti-aging benefits.',
    34.99,
    39.99,
    cat_skincare,
    'AYU-KUM-30',
    60,
    true,
    true
  ),
  (
    'Turmeric Curcumin Capsules',
    'turmeric-curcumin-capsules',
    'High-potency turmeric curcumin with black pepper extract for better absorption. Natural anti-inflammatory and antioxidant support.',
    22.99,
    null,
    cat_wellness,
    'AYU-TUR-60',
    200,
    false,
    true
  ),
  (
    'Mahanarayana Thailam - 100ml',
    'mahanarayana-thailam-100ml',
    'Traditional Ayurvedic massage oil for joint and muscle pain relief. Effective for arthritis, backache, and muscle stiffness.',
    18.99,
    21.99,
    cat_painrelief,
    'AYU-MAH-100',
    90,
    false,
    true
  ),
  (
    'Neem Face Wash - 150ml',
    'neem-face-wash-150ml',
    'Pure neem face wash for clear, healthy skin. Fights acne, removes impurities, and prevents breakouts naturally.',
    9.99,
    12.99,
    cat_skincare,
    'AYU-NEE-150',
    150,
    false,
    true
  ),
  (
    'Giloy Juice - 500ml',
    'giloy-juice-500ml',
    'Pure Giloy juice for immunity and overall wellness. Detoxifies body, improves digestion, and boosts immune system naturally.',
    14.99,
    null,
    cat_immunity,
    'AYU-GIL-500',
    110,
    false,
    true
  ),
  (
    'Brahmi Capsules - 60 Count',
    'brahmi-capsules-60',
    'Pure Brahmi extract for mental clarity and memory enhancement. Supports cognitive function, reduces stress, and improves concentration.',
    17.99,
    null,
    cat_wellness,
    'AYU-BRA-60',
    130,
    false,
    true
  );
END $$;

-- Insert Product Images (placeholder URLs - replace with actual product images)
DO $$
DECLARE
  prod RECORD;
BEGIN
  FOR prod IN SELECT id, slug FROM products LOOP
    INSERT INTO product_images (product_id, image_url, alt_text, display_order) VALUES
    (prod.id, 'https://placehold.co/800x800/4ade80/ffffff/png?text=' || prod.slug, prod.slug || ' - Main Image', 0),
    (prod.id, 'https://placehold.co/800x800/22c55e/ffffff/png?text=' || prod.slug || '-2', prod.slug || ' - Image 2', 1),
    (prod.id, 'https://placehold.co/800x800/16a34a/ffffff/png?text=' || prod.slug || '-3', prod.slug || ' - Image 3', 2);
  END LOOP;
END $$;

-- Update Site Settings
UPDATE site_settings SET value = '"Ayukriti Ayurveda"' WHERE key = 'site_name';

-- Update Sample Banners
DELETE FROM banners;

INSERT INTO banners (title, subtitle, image_url, cta_text, cta_link, display_order, is_active) VALUES
(
  'Welcome to Ayukriti Ayurveda',
  'Authentic Ayurvedic products for holistic wellness',
  'https://placehold.co/1920x600/16a34a/ffffff/png?text=Ayukriti+Ayurveda',
  'Shop Now',
  '/products',
  1,
  true
),
(
  'Natural Immunity Boosters',
  'Strengthen your immunity with traditional Ayurvedic herbs',
  'https://placehold.co/1920x600/22c55e/ffffff/png?text=Immunity+Boosters',
  'Explore Products',
  '/products?category=immunity-boosters',
  2,
  true
),
(
  'Herbal Hair & Skin Care',
  'Natural beauty solutions from ancient Ayurvedic wisdom',
  'https://placehold.co/1920x600/4ade80/ffffff/png?text=Natural+Beauty',
  'Discover',
  '/products?category=hair-care',
  3,
  true
);
