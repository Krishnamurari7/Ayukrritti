import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { HeroSlider } from "@/components/hero-slider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aarogya India - 100% Authentic Ayurvedic Products & Wellness",
  description: "Shop authentic Ayurvedic medicines, herbal supplements, and natural wellness products. Traditional Indian Ayurveda for holistic health. Free shipping above ₹399.",
  openGraph: {
    title: "Aarogya India - Authentic Ayurvedic Products",
    description: "Shop authentic Ayurvedic medicines and natural wellness products. 100% natural, GMP certified.",
    type: "website",
  },
};

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch hero banners
  const { data: banners } = await supabase
    .from("banners")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  // Fetch announcement items
  const { data: announcementItems } = await supabase
    .from("announcement_items")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  // Fetch trust badges
  const { data: trustBadges } = await supabase
    .from("trust_badges")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  // Fetch health goals
  const { data: healthGoals } = await supabase
    .from("health_goals")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  // Fetch why choose us items
  const { data: whyChooseUsItems } = await supabase
    .from("why_choose_us")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  // Fetch customer reviews
  const { data: customerReviews } = await supabase
    .from("customer_reviews")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  // Fetch certifications
  const { data: certifications } = await supabase
    .from("certifications")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name, slug),
      images:product_images(image_url, alt_text)
    `)
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(8);

  // Fetch categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  // Fetch featured blogs
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="flex flex-col">
      {/* Top Announcement Bar - Marquee */}
      {announcementItems && announcementItems.length > 0 && (
        <div className="bg-green-700 text-white py-2 text-sm overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content animate-marquee">
              {announcementItems.map((item: any, index: number) => (
                <span key={`first-${index}`} className="mx-8">
                  {item.icon} {item.content}
                </span>
              ))}
              {/* Duplicate for seamless loop */}
              {announcementItems.map((item: any, index: number) => (
                <span key={`second-${index}`} className="mx-8">
                  {item.icon} {item.content}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Slider Section */}
      <HeroSlider banners={banners || []} />

      {/* Trust Badges */}
      {trustBadges && trustBadges.length > 0 && (
        <section className="bg-white border-y">
          <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {trustBadges.map((badge: any) => (
                <div key={badge.id} className="flex items-center justify-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${badge.bg_color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-xl sm:text-2xl">{badge.icon}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm">{badge.title}</p>
                    <p className="text-xs text-gray-600">{badge.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications && certifications.length > 0 && (
        <section className="bg-gradient-to-br from-emerald-50 to-green-50 py-8 sm:py-10 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                Certificate of Natural Goodness
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Certified quality you can trust
              </p>
            </div>
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 max-w-6xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {certifications.map((cert: any) => (
                  <div key={cert.id} className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg hover:bg-emerald-50 transition-colors duration-200">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-2 sm:mb-3">
                      <Image
                        src={cert.icon_url}
                        alt={cert.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 text-center">
                      {cert.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Shop by Health Goals - Featured Health Solutions */}
      {healthGoals && healthGoals.length > 0 && (
        <section className="bg-gradient-to-b from-white to-gray-50 py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                Shop by Health Goals
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {healthGoals.map((goal: any) => (
                <div key={goal.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="p-6">
                    <h3 className="text-center font-bold text-gray-900 mb-4 text-sm sm:text-base uppercase tracking-wide">
                      {goal.title}
                    </h3>
                    <div className={`relative aspect-square bg-gradient-to-br ${goal.bg_gradient} rounded-2xl overflow-hidden mb-6 p-4`}>
                      <div className="relative w-full h-full bg-white rounded-xl overflow-hidden">
                        <Image
                          src={goal.image_url}
                          alt={goal.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <Link href={goal.link_url}>
                      <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold uppercase tracking-wide">
                        Know More
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Shop by Categories */}
      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Shop by Categories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Browse All Categories
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Explore our complete range of Ayurvedic wellness products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories?.map((category: any) => {
            const icons: Record<string, string> = {
              'immunity-boosters': '🛡️',
              'digestive-health': '🌱',
              'hair-care': '💇',
              'skin-care': '✨',
              'pain-relief': '💪',
              'wellness-supplements': '💊'
            };
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group"
              >
                <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center hover:border-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="mb-2 sm:mb-3 text-3xl sm:text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300">
                    {icons[category.slug] || '🌿'}
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10 md:mb-12">
            <div className="flex-1">
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                Best Sellers
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                Our Top Products
              </h2>
              <p className="text-sm sm:text-base text-gray-600">Trusted by thousands of happy customers</p>
            </div>
            <Button asChild variant="outline" className="self-start sm:self-auto border-2 border-green-600 text-green-600 hover:bg-green-50 text-sm sm:text-base h-10 sm:h-auto">
              <Link href="/products">
                View All
                <span className="ml-2">→</span>
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.map((product: any) => {
              const discount = product.compare_at_price
                ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
                : 0;
              return (
                <Link key={product.id} href={`/products/${product.slug}`} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-green-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative aspect-square bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
                      {discount > 0 && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            -{discount}% OFF
                          </div>
                        </div>
                      )}
                      {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                        <div className="absolute top-3 left-3 z-10">
                          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            Low Stock
                          </div>
                        </div>
                      )}
                      <Image
                        src={product.images[0]?.image_url || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        {product.category?.name}
                      </Badge>
                      
                      <h3 className="font-semibold line-clamp-2 group-hover:text-green-600 transition-colors min-h-[3rem]">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-green-700">
                          {formatPrice(product.price)}
                        </span>
                        {product.compare_at_price && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(product.compare_at_price)}
                          </span>
                        )}
                      </div>
                      
                      <Button className="w-full bg-green-600 hover:bg-green-700 group-hover:shadow-lg" size="sm">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      {whyChooseUsItems && whyChooseUsItems.length > 0 && (
        <section className="bg-white py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                Why Choose Us
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                The Aarogya India Difference
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
                Experience authentic Ayurvedic wellness with our commitment to quality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUsItems.map((feature: any) => (
                <div key={feature.id} className="group">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center border-2 border-transparent hover:border-green-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-4xl group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Customer Reviews Slider */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-8 sm:py-12 md:py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              Customer Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              What Our Customers Say
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Join thousands of satisfied customers who trust Aarogya India for their wellness needs
            </p>
          </div>

          {/* Reviews Slider */}
          {customerReviews && customerReviews.length > 0 && (
            <div className="reviews-slider-container mb-12">
              <div className="reviews-slider-content animate-reviews-slider">
                {/* First set of reviews */}
                {customerReviews.map((review: any, index: number) => (
                  <div key={`first-${index}`} className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]">
                    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-green-500 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-lg">★</span>
                        ))}
                      </div>
                      
                      {/* Review Text */}
                      <p className="text-gray-700 text-sm mb-4 flex-grow">
                        "{review.review_text}"
                      </p>
                      
                      {/* Product Badge */}
                      {review.product_name && (
                        <div className="mb-4">
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            {review.product_name}
                          </Badge>
                        </div>
                      )}
                      
                      {/* Customer Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                          {review.customer_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{review.customer_name}</p>
                          <p className="text-xs text-gray-500">{review.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {customerReviews.map((review: any, index: number) => (
                  <div key={`second-${index}`} className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]">
                    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-green-500 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-lg">★</span>
                        ))}
                      </div>
                      
                      {/* Review Text */}
                      <p className="text-gray-700 text-sm mb-4 flex-grow">
                        "{review.review_text}"
                      </p>
                      
                      {/* Product Badge */}
                      {review.product_name && (
                        <div className="mb-4">
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            {review.product_name}
                          </Badge>
                        </div>
                      )}
                      
                      {/* Customer Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                          {review.customer_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{review.customer_name}</p>
                          <p className="text-xs text-gray-500">{review.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-1">50,000+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-1">4.9★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Natural Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10 md:mb-12">
            <div className="flex-1">
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                Health & Wellness Blog
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                Latest from Our Blog
              </h2>
              <p className="text-sm sm:text-base text-gray-600">Expert advice and tips for your wellness journey</p>
            </div>
            <Button asChild variant="outline" className="self-start sm:self-auto border-2 border-green-600 text-green-600 hover:bg-green-50 text-sm sm:text-base h-10 sm:h-auto">
              <Link href="/blogs">
                View All Posts
                <span className="ml-2">→</span>
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {blogs?.map((blog: any) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
                <article className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-green-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  {/* Featured Image */}
                  <div className="relative h-48 sm:h-56 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
                    {blog.featured_image && (
                      <Image
                        src={blog.featured_image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    {/* Category Badge */}
                    {blog.category && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 mb-3 w-fit">
                        {blog.category}
                      </Badge>
                    )}
                    
                    {/* Title */}
                    <h3 className="font-bold text-lg sm:text-xl line-clamp-2 group-hover:text-green-600 transition-colors mb-3 min-h-[3.5rem]">
                      {blog.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
                      {blog.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {blog.author_name?.charAt(0) || 'A'}
                        </div>
                        <span className="font-medium text-gray-700">{blog.author_name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{blog.read_time_minutes} min read</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
