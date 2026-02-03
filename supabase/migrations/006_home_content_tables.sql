-- =====================================================
-- HOME CONTENT MANAGEMENT TABLES
-- =====================================================

-- Create announcement_items table
CREATE TABLE IF NOT EXISTS public.announcement_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    icon TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create trust_badges table
CREATE TABLE IF NOT EXISTS public.trust_badges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    icon TEXT NOT NULL,
    bg_color TEXT DEFAULT 'bg-green-100',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    icon_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create health_goals table
CREATE TABLE IF NOT EXISTS public.health_goals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    link_url TEXT NOT NULL,
    bg_gradient TEXT DEFAULT 'from-teal-700 to-teal-800',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create why_choose_us table
CREATE TABLE IF NOT EXISTS public.why_choose_us (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    icon TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create customer_reviews table
CREATE TABLE IF NOT EXISTS public.customer_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    location TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    product_name TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_name TEXT DEFAULT 'Admin',
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- CREATE INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_announcement_items_display_order ON public.announcement_items(display_order);
CREATE INDEX IF NOT EXISTS idx_announcement_items_is_active ON public.announcement_items(is_active);

CREATE INDEX IF NOT EXISTS idx_trust_badges_display_order ON public.trust_badges(display_order);
CREATE INDEX IF NOT EXISTS idx_trust_badges_is_active ON public.trust_badges(is_active);

CREATE INDEX IF NOT EXISTS idx_certifications_display_order ON public.certifications(display_order);
CREATE INDEX IF NOT EXISTS idx_certifications_is_active ON public.certifications(is_active);

CREATE INDEX IF NOT EXISTS idx_health_goals_display_order ON public.health_goals(display_order);
CREATE INDEX IF NOT EXISTS idx_health_goals_is_active ON public.health_goals(is_active);

CREATE INDEX IF NOT EXISTS idx_why_choose_us_display_order ON public.why_choose_us(display_order);
CREATE INDEX IF NOT EXISTS idx_why_choose_us_is_active ON public.why_choose_us(is_active);

CREATE INDEX IF NOT EXISTS idx_customer_reviews_display_order ON public.customer_reviews(display_order);
CREATE INDEX IF NOT EXISTS idx_customer_reviews_is_active ON public.customer_reviews(is_active);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_is_featured ON public.blogs(is_featured);
CREATE INDEX IF NOT EXISTS idx_blogs_is_active ON public.blogs(is_active);

-- =====================================================
-- ENABLE RLS
-- =====================================================
ALTER TABLE public.announcement_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trust_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.why_choose_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE RLS POLICIES
-- =====================================================

-- Announcement Items Policies
CREATE POLICY "Allow public read access to active announcement items"
    ON public.announcement_items FOR SELECT
    USING (is_active = true);

CREATE POLICY "Allow admin full access to announcement items"
    ON public.announcement_items FOR ALL
    USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Trust Badges Policies
CREATE POLICY "Allow public read access to active trust badges"
    ON public.trust_badges FOR SELECT
    USING (is_active = true);

CREATE POLICY "Allow admin full access to trust badges"
    ON public.trust_badges FOR ALL
    USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Certifications Policies
CREATE POLICY "Allow public read access to active certifications"
    ON public.certifications FOR SELECT
    USING (is_active = true);

CREATE POLICY "Allow admin full access to certifications"
    ON public.certifications FOR ALL
    USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Health Goals Policies
CREATE POLICY "Allow public read access to active health goals"
    ON public.health_goals FOR SELECT
    USING (is_active = true);

CREATE POLICY "Allow admin full access to health goals"
    ON public.health_goals FOR ALL
    USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Why Choose Us Policies
CREATE POLICY "Allow public read access to active why choose us items"
    ON public.why_choose_us FOR SELECT
    USING (is_active = true);

CREATE POLICY "Allow admin full access to why choose us items"
    ON public.why_choose_us FOR ALL
    USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Customer Reviews Policies
CREATE POLICY "Allow public read access to active customer reviews"
    ON public.customer_reviews FOR SELECT
    USING (is_active = true);

CREATE POLICY "Allow admin full access to customer reviews"
    ON public.customer_reviews FOR ALL
    USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Blogs Policies
CREATE POLICY "Allow public read access to active blogs"
    ON public.blogs FOR SELECT
    USING (is_active = true);

CREATE POLICY "Allow admin full access to blogs"
    ON public.blogs FOR ALL
    USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- =====================================================
-- CREATE UPDATE TRIGGERS
-- =====================================================
CREATE OR REPLACE FUNCTION update_home_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_announcement_items_updated_at
    BEFORE UPDATE ON public.announcement_items
    FOR EACH ROW EXECUTE FUNCTION update_home_content_updated_at();

CREATE TRIGGER update_trust_badges_updated_at
    BEFORE UPDATE ON public.trust_badges
    FOR EACH ROW EXECUTE FUNCTION update_home_content_updated_at();

CREATE TRIGGER update_certifications_updated_at
    BEFORE UPDATE ON public.certifications
    FOR EACH ROW EXECUTE FUNCTION update_home_content_updated_at();

CREATE TRIGGER update_health_goals_updated_at
    BEFORE UPDATE ON public.health_goals
    FOR EACH ROW EXECUTE FUNCTION update_home_content_updated_at();

CREATE TRIGGER update_why_choose_us_updated_at
    BEFORE UPDATE ON public.why_choose_us
    FOR EACH ROW EXECUTE FUNCTION update_home_content_updated_at();

CREATE TRIGGER update_customer_reviews_updated_at
    BEFORE UPDATE ON public.customer_reviews
    FOR EACH ROW EXECUTE FUNCTION update_home_content_updated_at();

CREATE TRIGGER update_blogs_updated_at
    BEFORE UPDATE ON public.blogs
    FOR EACH ROW EXECUTE FUNCTION update_home_content_updated_at();

-- =====================================================
-- INSERT DEFAULT DATA
-- =====================================================

-- Default Announcement Items
INSERT INTO public.announcement_items (content, icon, display_order, is_active) VALUES
    ('Free Shipping on Orders Above ₹399', '🚚', 1, true),
    ('100% Authentic Ayurvedic Products', '✅', 2, true),
    ('GMP Certified Manufacturing', '🏭', 3, true)
ON CONFLICT DO NOTHING;

-- Default Trust Badges
INSERT INTO public.trust_badges (title, subtitle, icon, bg_color, display_order, is_active) VALUES
    ('100% Natural', 'Pure Herbs', '🌿', 'bg-green-100', 1, true),
    ('GMP Certified', 'Quality Assured', '✅', 'bg-blue-100', 2, true),
    ('Lab Tested', 'Scientifically Proven', '🔬', 'bg-purple-100', 3, true),
    ('Free Shipping', 'Orders Above ₹399', '🚚', 'bg-amber-100', 4, true)
ON CONFLICT DO NOTHING;

-- Default Certifications
INSERT INTO public.certifications (title, icon_url, display_order, is_active) VALUES
    ('GMO Free', '/certifications/gmo-free.png', 1, true),
    ('GMP Certified', '/certifications/gmp-certified.png', 2, true),
    ('100% Natural', '/certifications/100-natural.png', 3, true),
    ('Gluten Free', '/certifications/gluten-free.png', 4, true),
    ('Ethically Proven', '/certifications/ethically-proven.png', 5, true),
    ('AYUSH Standard', '/certifications/ayush-standard.png', 6, true),
    ('ISO 9001:2015', '/certifications/iso-certified.png', 7, true),
    ('Lab Tested', '/certifications/lab-tested.png', 8, true)
ON CONFLICT DO NOTHING;

-- Default Health Goals
INSERT INTO public.health_goals (title, image_url, link_url, bg_gradient, display_order, is_active) VALUES
    ('For Digestive Care', '/health-goals/digestive-care.jpg', '/products?category=digestive-health', 'from-teal-700 to-teal-800', 1, true),
    ('For Immunity Boost', '/health-goals/immunity-boost.jpg', '/products?category=immunity', 'from-emerald-700 to-emerald-800', 2, true),
    ('For Joint Care', '/health-goals/joint-care.jpg', '/products?category=joint-health', 'from-cyan-700 to-cyan-800', 3, true),
    ('For Skin & Hair', '/health-goals/skin-hair.jpg', '/products?category=beauty', 'from-green-700 to-green-800', 4, true)
ON CONFLICT DO NOTHING;

-- Default Why Choose Us
INSERT INTO public.why_choose_us (icon, title, description, display_order, is_active) VALUES
    ('🌿', '100% Natural', 'Pure herbs and natural ingredients, absolutely no chemicals', 1, true),
    ('✅', 'GMP Certified', 'Manufactured in GMP certified facilities with strict quality controls', 2, true),
    ('🔬', 'Lab Tested', 'All products are thoroughly tested in certified laboratories', 3, true),
    ('📦', 'Free Shipping', 'Free shipping on all orders above ₹399 across India', 4, true)
ON CONFLICT DO NOTHING;

-- Default Customer Reviews
INSERT INTO public.customer_reviews (customer_name, location, rating, review_text, product_name, display_order, is_active) VALUES
    ('Priya Sharma', 'Mumbai', 5, 'Amazing quality products! I''ve been using the immunity booster for 3 months and I can feel the difference. Highly recommended!', 'Immunity Booster', 1, true),
    ('Rajesh Kumar', 'Delhi', 5, 'Authentic Ayurvedic products. The digestive care supplements have really helped me. Great customer service too!', 'Digestive Care', 2, true),
    ('Anita Patel', 'Bangalore', 5, 'Very satisfied with the quality and packaging. Products are genuine and effective. Will order again!', 'Joint Care', 3, true)
ON CONFLICT DO NOTHING;

-- Add comments
COMMENT ON TABLE public.announcement_items IS 'Announcement items displayed in the top marquee banner';
COMMENT ON TABLE public.trust_badges IS 'Trust badges displayed below the hero slider';
COMMENT ON TABLE public.certifications IS 'Certification badges displayed on the home page (min 3, max 10)';
COMMENT ON TABLE public.health_goals IS 'Health goal categories displayed on the home page';
COMMENT ON TABLE public.why_choose_us IS 'Why choose us items displayed on the home page';
COMMENT ON TABLE public.customer_reviews IS 'Customer reviews displayed on the home page';
COMMENT ON TABLE public.blogs IS 'Blog posts for content marketing';
