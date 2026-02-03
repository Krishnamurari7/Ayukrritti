-- =====================================================
-- SEED DATA FOR E-COMMERCE PLATFORM
-- =====================================================

-- Insert Categories
INSERT INTO categories (name, slug, description, display_order, is_active) VALUES
('Immunity Boosters', 'immunity-boosters', 'Natural immunity enhancing Ayurvedic products', 1, true),
('Digestive Health', 'digestive-health', 'Ayurvedic solutions for digestive wellness', 2, true),
('Hair Care', 'hair-care', 'Natural hair care and herbal hair products', 3, true),
('Skin Care', 'skin-care', 'Ayurvedic skin care and beauty products', 4, true),
('Pain Relief', 'pain-relief', 'Natural pain management and joint care', 5, true),
('Wellness Supplements', 'wellness-supplements', 'Herbal supplements and vitamins', 6, true);

-- Get category IDs for reference
DO $$
DECLARE
  cat_smartphones UUID;
  cat_laptops UUID;
  cat_audio UUID;
  cat_tablets UUID;
  cat_accessories UUID;
BEGIN
  SELECT id INTO cat_smartphones FROM categories WHERE slug = 'smartphones';
  SELECT id INTO cat_laptops FROM categories WHERE slug = 'laptops';
  SELECT id INTO cat_audio FROM categories WHERE slug = 'audio';
  SELECT id INTO cat_tablets FROM categories WHERE slug = 'tablets';
  SELECT id INTO cat_accessories FROM categories WHERE slug = 'accessories';

  -- Insert Products
  INSERT INTO products (name, slug, description, price, compare_at_price, category_id, sku, stock_quantity, is_featured, is_active) VALUES
  (
    'iPhone 15 Pro',
    'iphone-15-pro',
    'The iPhone 15 Pro features a stunning titanium design, powerful A17 Pro chip, and advanced camera system with 5x optical zoom. Experience USB-C connectivity and customizable Action button.',
    999.00,
    1099.00,
    cat_smartphones,
    'IPH15PRO-128',
    25,
    true,
    true
  ),
  (
    'Samsung Galaxy S24',
    'samsung-galaxy-s24',
    'Samsung Galaxy S24 brings Galaxy AI to your fingertips with incredible performance, stunning display, and advanced photography features. Powered by Snapdragon 8 Gen 3.',
    899.00,
    999.00,
    cat_smartphones,
    'SGS24-256',
    30,
    true,
    true
  ),
  (
    'MacBook Air M3',
    'macbook-air-m3',
    'The new MacBook Air with M3 chip delivers exceptional performance in an ultra-portable design. Features a brilliant Retina display, all-day battery life, and fanless operation.',
    1199.00,
    1299.00,
    cat_laptops,
    'MBA-M3-13',
    15,
    true,
    true
  ),
  (
    'Dell XPS 13',
    'dell-xps-13',
    'Dell XPS 13 combines premium design with powerful Intel Core processors. Features an InfinityEdge display, exceptional build quality, and long battery life for professionals.',
    1099.00,
    1199.00,
    cat_laptops,
    'DXPS13-I7',
    20,
    true,
    true
  ),
  (
    'Sony WH-1000XM5 Headphones',
    'sony-wh-1000xm5',
    'Industry-leading noise cancellation meets exceptional sound quality. Features 30-hour battery life, multipoint connectivity, and AI-powered call clarity.',
    399.00,
    449.00,
    cat_audio,
    'SONYWH1000XM5',
    40,
    true,
    true
  ),
  (
    'AirPods Pro 2',
    'airpods-pro-2',
    'AirPods Pro 2nd generation feature up to 2x more Active Noise Cancellation, Adaptive Audio, and Personalized Spatial Audio. MagSafe charging case included.',
    249.00,
    null,
    cat_audio,
    'APP2-USBC',
    50,
    false,
    true
  ),
  (
    'iPad Pro 12.9"',
    'ipad-pro-12-9',
    'The ultimate iPad experience with M2 chip, stunning Liquid Retina XDR display, and all-day battery life. Perfect for professionals and creators.',
    1099.00,
    1199.00,
    cat_tablets,
    'IPADPRO12-M2',
    18,
    false,
    true
  ),
  (
    'Apple Watch Series 9',
    'apple-watch-series-9',
    'Apple Watch Series 9 features the new S9 chip, brighter display, and Double Tap gesture. Track your fitness, health, and stay connected.',
    399.00,
    429.00,
    cat_accessories,
    'AWS9-45MM',
    35,
    false,
    true
  ),
  (
    'Logitech MX Master 3S Mouse',
    'logitech-mx-master-3s',
    'The ultimate productivity mouse with ultra-fast scrolling, customizable buttons, and works on any surface. Quiet clicks and ergonomic design.',
    99.00,
    null,
    cat_accessories,
    'LGMXM3S-BLK',
    60,
    false,
    true
  ),
  (
    'Anker PowerBank 20000mAh',
    'anker-powerbank-20000mah',
    'High-capacity portable charger with PowerIQ technology. Charges phones, tablets, and more. Features multiple USB ports and fast charging.',
    59.00,
    null,
    cat_accessories,
    'ANK-PB20K',
    75,
    false,
    true
  );
END $$;

-- Insert Product Images (placeholder URLs - replace with actual Supabase Storage URLs)
DO $$
DECLARE
  prod RECORD;
BEGIN
  FOR prod IN SELECT id, slug FROM products LOOP
    INSERT INTO product_images (product_id, image_url, alt_text, display_order) VALUES
    (prod.id, 'https://placehold.co/800x800/png?text=' || prod.slug, prod.slug || ' - Main Image', 0),
    (prod.id, 'https://placehold.co/800x800/png?text=' || prod.slug || '-2', prod.slug || ' - Image 2', 1),
    (prod.id, 'https://placehold.co/800x800/png?text=' || prod.slug || '-3', prod.slug || ' - Image 3', 2);
  END LOOP;
END $$;

-- Insert Sample Banners
INSERT INTO banners (title, subtitle, image_url, cta_text, cta_link, display_order, is_active) VALUES
(
  'Welcome to Our Store',
  'Discover the latest tech at amazing prices',
  'https://placehold.co/1920x600/0066cc/ffffff/png?text=Welcome+Banner',
  'Shop Now',
  '/products',
  1,
  true
),
(
  'Special Sale - Up to 30% Off',
  'Limited time offer on selected products',
  'https://placehold.co/1920x600/cc0000/ffffff/png?text=Sale+Banner',
  'View Deals',
  '/products?filter=sale',
  2,
  true
),
(
  'New Arrivals',
  'Check out our latest products',
  'https://placehold.co/1920x600/00cc66/ffffff/png?text=New+Arrivals',
  'Explore',
  '/products?sort=newest',
  3,
  true
);

-- Insert Site Settings
INSERT INTO site_settings (key, value) VALUES
('site_name', '"TechStore"'),
('shipping_charges', '{"flat_rate": 10, "free_shipping_threshold": 100}'),
('tax_rate', '0.08'),
('low_stock_threshold', '10'),
('currency', '"USD"'),
('currency_symbol', '"$"');

-- Note: To create an admin user, sign up with the email specified in your .env file
-- The trigger will automatically assign the admin role
