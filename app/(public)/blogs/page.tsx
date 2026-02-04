import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs - Ayukrriti Ayurveda | Ayurvedic Health & Wellness Tips",
  description:
    "Discover the ancient wisdom of Ayurveda through our blogs. Learn about natural remedies, wellness tips, and holistic health practices.",
};

export default async function BlogsPage() {
  const supabase = await createClient();

  // Fetch active blogs
  const { data: blogsData } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const blogs = blogsData as any[];

  // Get unique categories
  const categories = ["All"];
  if (blogs) {
    const uniqueCategories = [
      ...new Set(blogs.map((blog: any) => blog.category).filter(Boolean)),
    ];
    categories.push(...uniqueCategories);
  }

  // Find featured blog
  const featuredBlog = blogs?.find((blog: any) => blog.is_featured) || blogs?.[0];
  const otherBlogs = blogs?.filter((blog: any) => blog.id !== featuredBlog?.id) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4E4B7]/30 via-white to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1a8f4a] via-green-800 to-[#D4AF37] text-white py-16 md:py-20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm font-bold shadow-lg">
              📖 Knowledge Hub
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            Ayurveda & Wellness Blog
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore ancient wisdom for modern health. Discover tips, remedies,
            and insights from our Ayurvedic experts.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Categories */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {categories.map((category, index) => (
              <Badge
                key={category}
                variant={index === 0 ? "default" : "outline"}
                className={`px-5 py-2.5 text-sm cursor-pointer transition-all duration-300 rounded-full font-semibold shadow-sm hover:shadow-md ${
                  index === 0
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white border-0"
                    : "hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#B8941F] hover:text-white hover:border-transparent border-2 border-[#D4AF37] text-[#B8941F]"
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}

        {blogs && blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No blog posts available at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Featured Blog */}
            {featuredBlog && (
              <Card className="mb-12 overflow-hidden group border-2 border-gray-100 hover:border-[#D4AF37] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-video md:aspect-auto md:h-full min-h-[300px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                    {featuredBlog.featured_image ? (
                      <Image
                        src={featuredBlog.featured_image}
                        alt={featuredBlog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1a8f4a] via-green-600 to-[#D4AF37] flex items-center justify-center">
                        <span className="text-white text-6xl font-bold opacity-20">
                          Blog
                        </span>
                      </div>
                    )}
                    <Badge className="absolute top-4 left-4 z-20 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white shadow-lg">
                      ⭐ Featured
                    </Badge>
                  </div>
                  <CardContent className="p-6 md:p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                    {featuredBlog.category && (
                      <Badge
                        className="w-fit mb-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white shadow-sm"
                      >
                        {featuredBlog.category}
                      </Badge>
                    )}
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#D4AF37] transition-colors text-gray-900">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-2 bg-[#F4E4B7]/50 px-3 py-1.5 rounded-full">
                        <User className="h-4 w-4 text-[#D4AF37]" />
                        {featuredBlog.author_name}
                      </span>
                      <span className="flex items-center gap-2 bg-[#F4E4B7]/50 px-3 py-1.5 rounded-full">
                        <Calendar className="h-4 w-4 text-[#D4AF37]" />
                        {new Date(featuredBlog.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="flex items-center gap-2 bg-[#F4E4B7]/50 px-3 py-1.5 rounded-full">
                        <Clock className="h-4 w-4 text-[#D4AF37]" />
                        {featuredBlog.read_time_minutes} min read
                      </span>
                    </div>
                    <Link
                      href={`/blogs/${featuredBlog.slug}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-bold px-6 py-3 rounded-xl hover:from-[#B8941F] hover:to-[#D4AF37] hover:gap-3 transition-all duration-300 shadow-lg hover:shadow-xl w-fit"
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </div>
              </Card>
            )}

            {/* Blog Grid */}
            {otherBlogs.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {otherBlogs.map((blog) => (
                  <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                    <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 h-full border-2 border-gray-100 hover:border-[#D4AF37] rounded-3xl hover:-translate-y-2">
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#F4E4B7] to-white">
                        {blog.featured_image ? (
                          <Image
                            src={blog.featured_image}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#1a8f4a] to-[#D4AF37] flex items-center justify-center">
                            <span className="text-white text-4xl font-bold opacity-20">
                              Blog
                            </span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6 bg-gradient-to-br from-white to-gray-50">
                        {blog.category && (
                          <Badge
                            className="mb-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white text-xs"
                          >
                            {blog.category}
                          </Badge>
                        )}
                        <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-[#D4AF37] transition-colors text-gray-900">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-[#D4AF37]/20">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                            {new Date(blog.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                          <span className="flex items-center gap-1.5 font-semibold text-[#D4AF37]">
                            <Clock className="h-3.5 w-3.5" />
                            {blog.read_time_minutes} min
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-br from-[#1a8f4a] via-green-800 to-[#D4AF37] rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-block mb-4">
              <span className="text-4xl">📧</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-white/90 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
              Get the latest Ayurvedic tips, wellness articles, and exclusive
              offers delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/50 shadow-lg font-medium"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-bold rounded-xl hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                Subscribe 🎉
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
