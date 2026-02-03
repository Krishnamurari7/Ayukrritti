import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs - Aarogya India | Ayurvedic Health & Wellness Tips",
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
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white">
      {/* Hero Section */}
      <div className="bg-[#1a8f4a] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ayurveda & Wellness Blog
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Explore ancient wisdom for modern health. Discover tips, remedies,
            and insights from our Ayurvedic experts.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Categories */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category, index) => (
              <Badge
                key={category}
                variant={index === 0 ? "default" : "outline"}
                className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                  index === 0
                    ? "bg-[#1a8f4a] hover:bg-[#157a3d]"
                    : "hover:bg-[#1a8f4a] hover:text-white border-[#1a8f4a] text-[#1a8f4a]"
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
              <Card className="mb-12 overflow-hidden group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-video md:aspect-auto md:h-full min-h-[300px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                    {featuredBlog.featured_image ? (
                      <Image
                        src={featuredBlog.featured_image}
                        alt={featuredBlog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <span className="text-white text-6xl font-bold opacity-20">
                          Blog
                        </span>
                      </div>
                    )}
                    <Badge className="absolute top-4 left-4 z-20 bg-[#1a8f4a]">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                    {featuredBlog.category && (
                      <Badge
                        variant="outline"
                        className="w-fit mb-4 border-[#1a8f4a] text-[#1a8f4a]"
                      >
                        {featuredBlog.category}
                      </Badge>
                    )}
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#1a8f4a] transition-colors">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {featuredBlog.author_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredBlog.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredBlog.read_time_minutes} min read
                      </span>
                    </div>
                    <Link
                      href={`/blogs/${featuredBlog.slug}`}
                      className="inline-flex items-center gap-2 text-[#1a8f4a] font-semibold hover:gap-3 transition-all"
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
                    <Card className="overflow-hidden group hover:shadow-lg transition-shadow h-full">
                      <div className="relative aspect-video overflow-hidden">
                        {blog.featured_image ? (
                          <Image
                            src={blog.featured_image}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                            <span className="text-white text-4xl font-bold opacity-20">
                              Blog
                            </span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-5">
                        {blog.category && (
                          <Badge
                            variant="outline"
                            className="mb-3 border-[#1a8f4a] text-[#1a8f4a] text-xs"
                          >
                            {blog.category}
                          </Badge>
                        )}
                        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-[#1a8f4a] transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(blog.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {blog.read_time_minutes} min read
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
        <div className="mt-16 bg-gradient-to-r from-[#1a8f4a] to-[#2d5a27] rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-green-100 mb-6 max-w-xl mx-auto">
            Get the latest Ayurvedic tips, wellness articles, and exclusive
            offers delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
