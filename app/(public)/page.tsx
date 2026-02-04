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
  title: "Ayukrriti Ayurveda - 100% Authentic Ayurvedic Products & Wellness",
  description: "Shop authentic Ayurvedic medicines, herbal supplements, and natural wellness products. Traditional Indian Ayurveda for holistic health. Free shipping above ₹399.",
  openGraph: {
    title: "Ayukrriti Ayurveda - Authentic Ayurvedic Products",
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
        <div className="bg-gradient-to-r from-[#1a8f4a] via-[#D4AF37] to-[#1a8f4a] text-white py-2 text-sm overflow-hidden">
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
        <section className="bg-gradient-to-r from-white via-[#F4E4B7]/20 to-white border-y-2 border-[#D4AF37]/30">
          <div className="container mx-auto px-4 py-6 sm:py-8 md:py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {trustBadges.map((badge: any, index: number) => (
                <div 
                  key={badge.id} 
                  className="flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 rounded-xl hover:bg-white/80 transition-all duration-300 hover:shadow-lg group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 ${badge.bg_color} rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl sm:text-3xl">{badge.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm sm:text-base text-gray-900">{badge.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{badge.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications && certifications.length > 0 && (
        <section className="bg-gradient-to-br from-[#F4E4B7] to-white py-12 sm:py-14 md:py-16 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#1a8f4a]/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm font-semibold shadow-lg">
                  🏆 Premium Quality
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a8f4a] mb-2 sm:mb-3">
                Certificate of Natural Goodness
              </h2>
              <p className="text-base sm:text-lg text-gray-700">
                Certified quality you can trust
              </p>
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#D4AF37] p-8 sm:p-10 md:p-12 max-w-6xl mx-auto relative overflow-hidden">
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#D4AF37] rounded-tl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#D4AF37] rounded-br-2xl"></div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 relative z-10">
                {certifications.map((cert: any, index: number) => (
                  <div 
                    key={cert.id} 
                    className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl hover:bg-[#F4E4B7] transition-all duration-300 hover:shadow-lg hover:-translate-y-2 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={cert.icon_url}
                        alt={cert.title}
                        fill
                        className="object-contain drop-shadow-lg"
                      />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 text-center">
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
        <section className="bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 md:py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-12 md:mb-14">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#1a8f4a] to-[#D4AF37] text-white rounded-full text-sm font-semibold shadow-lg">
                  🎯 Your Health Journey
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-3 uppercase tracking-wide">
                Shop by Health Goals
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Discover personalized wellness solutions for your unique needs
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {healthGoals.map((goal: any, index: number) => (
                <div 
                  key={goal.id} 
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group premium-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-center mb-4">
                      <h3 className="text-center font-bold text-gray-900 text-base sm:text-lg uppercase tracking-wide group-hover:text-[#D4AF37] transition-colors">
                        {goal.title}
                      </h3>
                    </div>
                    <div className={`relative aspect-square bg-gradient-to-br ${goal.bg_gradient} rounded-2xl overflow-hidden mb-6 p-4 group-hover:scale-105 transition-transform duration-500`}>
                      <div className="relative w-full h-full bg-white rounded-xl overflow-hidden shadow-inner">
                        <Image
                          src={goal.image_url}
                          alt={goal.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <Link href={goal.link_url}>
                      <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all duration-300">
                        Know More →
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
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <div className="inline-block mb-4">
            <span className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm sm:text-base font-semibold shadow-lg">
              📦 Shop by Categories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a8f4a] mb-3 sm:mb-4">
            Browse All Categories
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Explore our complete range of Ayurvedic wellness products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories?.map((category: any, index: number) => {
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
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-7 text-center hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 premium-card relative overflow-hidden">
                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-3 sm:mb-4 text-4xl sm:text-5xl md:text-6xl group-hover:scale-125 transition-transform duration-300 drop-shadow-lg">
                      {icons[category.slug] || '🌿'}
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm md:text-base group-hover:text-[#D4AF37] transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 sm:mb-12 md:mb-14">
            <div className="flex-1">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm sm:text-base font-semibold shadow-lg">
                  ⭐ Best Sellers
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2 sm:mb-3">
                Our Top Products
              </h2>
              <p className="text-base sm:text-lg text-gray-600">Trusted by thousands of happy customers</p>
            </div>
            <Button asChild className="self-start sm:self-auto bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white border-0 text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/products">
                View All Products
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
                  <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 premium-card">
                    {/* Image */}
                    <div className="relative aspect-square bg-gradient-to-br from-[#F4E4B7] via-white to-[#F4E4B7] overflow-hidden">
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
                    <div className="p-5 space-y-3">
                      <Badge variant="secondary" className="text-xs bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white shadow-sm">
                        {product.category?.name}
                      </Badge>
                      
                      <h3 className="font-bold text-base line-clamp-2 group-hover:text-[#D4AF37] transition-colors min-h-[3rem]">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-[#1a8f4a]">
                          {formatPrice(product.price)}
                        </span>
                        {product.compare_at_price && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(product.compare_at_price)}
                          </span>
                        )}
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white group-hover:shadow-xl transition-all duration-300 font-semibold" size="sm">
                        Add to Cart 🛒
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
          <div className="text-center mb-10 sm:mb-12 md:mb-14">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm sm:text-base font-semibold shadow-lg">
                ✨ Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-3 sm:mb-4">
              The Ayukrriti Ayurveda Difference
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Experience authentic Ayurvedic wellness with our commitment to quality
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {whyChooseUsItems.map((feature: any, index: number) => (
                <div 
                  key={feature.id} 
                  className="group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-gradient-to-br from-[#F4E4B7] to-white rounded-3xl p-8 sm:p-10 text-center border-2 border-transparent hover:border-[#D4AF37] transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl premium-card relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-white to-[#F4E4B7] rounded-full flex items-center justify-center mx-auto mb-5 text-5xl group-hover:scale-125 transition-transform duration-500 border-4 border-[#D4AF37] shadow-lg">
                        {feature.icon}
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-[#1a8f4a] group-hover:text-[#D4AF37] transition-colors">{feature.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
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
          <div className="text-center mb-10 sm:mb-12 md:mb-14">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm sm:text-base font-semibold shadow-lg">
                💬 Customer Reviews
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-3 sm:mb-4">
              What Our Customers Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Join thousands of satisfied customers who trust Ayukrriti Ayurveda for their wellness needs
            </p>
          </div>

          {/* Reviews Slider */}
          {customerReviews && customerReviews.length > 0 && (
            <div className="reviews-slider-container mb-12">
              <div className="reviews-slider-content animate-reviews-slider">
                {/* First set of reviews */}
                {customerReviews.map((review: any, index: number) => (
                  <div key={`first-${index}`} className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px]">
                    <div className="bg-white rounded-3xl p-7 border-2 border-gray-100 hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-bl-3xl"></div>
                      
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-4 relative z-10">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-[#D4AF37] text-xl drop-shadow-sm">★</span>
                        ))}
                      </div>
                      
                      {/* Review Text */}
                      <p className="text-gray-700 text-base mb-5 flex-grow leading-relaxed relative z-10 italic">
                        "{review.review_text}"
                      </p>
                      
                      {/* Product Badge */}
                      {review.product_name && (
                        <div className="mb-4 relative z-10">
                          <Badge variant="secondary" className="text-xs bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white shadow-sm">
                            {review.product_name}
                          </Badge>
                        </div>
                      )}
                      
                      {/* Customer Info */}
                      <div className="flex items-center gap-3 pt-4 border-t-2 border-[#D4AF37]/20 relative z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {review.customer_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{review.customer_name}</p>
                          <p className="text-xs text-gray-500">📍 {review.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {customerReviews.map((review: any, index: number) => (
                  <div key={`second-${index}`} className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px]">
                    <div className="bg-white rounded-3xl p-7 border-2 border-gray-100 hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-bl-3xl"></div>
                      
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-4 relative z-10">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-[#D4AF37] text-xl drop-shadow-sm">★</span>
                        ))}
                      </div>
                      
                      {/* Review Text */}
                      <p className="text-gray-700 text-base mb-5 flex-grow leading-relaxed relative z-10 italic">
                        "{review.review_text}"
                      </p>
                      
                      {/* Product Badge */}
                      {review.product_name && (
                        <div className="mb-4 relative z-10">
                          <Badge variant="secondary" className="text-xs bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white shadow-sm">
                            {review.product_name}
                          </Badge>
                        </div>
                      )}
                      
                      {/* Customer Info */}
                      <div className="flex items-center gap-3 pt-4 border-t-2 border-[#D4AF37]/20 relative z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {review.customer_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{review.customer_name}</p>
                          <p className="text-xs text-gray-500">📍 {review.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#F4E4B7] to-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">50,000+</div>
              <div className="text-sm sm:text-base text-gray-700 font-semibold">Happy Customers</div>
              <div className="text-2xl mt-2">😊</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#F4E4B7] to-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">4.9★</div>
              <div className="text-sm sm:text-base text-gray-700 font-semibold">Average Rating</div>
              <div className="text-2xl mt-2">⭐</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#F4E4B7] to-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">100%</div>
              <div className="text-sm sm:text-base text-gray-700 font-semibold">Natural Products</div>
              <div className="text-2xl mt-2">🌿</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#F4E4B7] to-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-sm sm:text-base text-gray-700 font-semibold">Customer Support</div>
              <div className="text-2xl mt-2">💬</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 sm:mb-12 md:mb-14">
            <div className="flex-1">
              <div className="inline-block mb-4">
                <span className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm sm:text-base font-semibold shadow-lg">
                  📝 Health & Wellness Blog
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2 sm:mb-3">
                Latest from Our Blog
              </h2>
              <p className="text-base sm:text-lg text-gray-600">Expert advice and tips for your wellness journey</p>
            </div>
            <Button asChild className="self-start sm:self-auto bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white border-0 text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/blogs">
                View All Posts
                <span className="ml-2">→</span>
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {blogs?.map((blog: any) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
                <article className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 h-full flex flex-col premium-card">
                  {/* Featured Image */}
                  <div className="relative h-52 sm:h-60 bg-gradient-to-br from-[#F4E4B7] via-white to-[#F4E4B7] overflow-hidden">
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
                  <div className="p-6 sm:p-7 flex flex-col flex-grow">
                    {/* Category Badge */}
                    {blog.category && (
                      <Badge variant="secondary" className="text-xs bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white mb-4 w-fit shadow-sm">
                        {blog.category}
                      </Badge>
                    )}
                    
                    {/* Title */}
                    <h3 className="font-bold text-xl sm:text-2xl line-clamp-2 group-hover:text-[#D4AF37] transition-colors mb-3 min-h-[3.5rem] leading-tight">
                      {blog.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2 mb-5 flex-grow leading-relaxed">
                      {blog.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-5 border-t-2 border-[#D4AF37]/20 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center text-white font-bold shadow-md">
                          {blog.author_name?.charAt(0) || 'A'}
                        </div>
                        <span className="font-semibold text-gray-700">{blog.author_name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#D4AF37]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">{blog.read_time_minutes} min</span>
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
