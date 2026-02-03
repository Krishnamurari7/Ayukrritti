import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Clock, ArrowLeft, Share2, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${(blog as any).title} - Aarogya India Blog`,
    description: (blog as any).excerpt || (blog as any).title,
    openGraph: {
      title: (blog as any).title,
      description: (blog as any).excerpt || "",
      images: (blog as any).featured_image ? [(blog as any).featured_image] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch the blog
  const { data: blogData } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!blogData) {
    notFound();
  }

  const blog = blogData as any;

  // Increment view count
  // TODO: Re-enable after fixing type issues
  // await supabase
  //   .from("blogs")
  //   .update({ view_count: (blog.view_count || 0) + 1 })
  //   .eq("id", blog.id);

  // Fetch related blogs (same category, excluding current)
  const { data: relatedBlogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_active", true)
    .eq("category", blog.category)
    .neq("id", blog.id)
    .limit(3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white">
      {/* Hero Section */}
      <div className="bg-[#1a8f4a] text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-green-100 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Blogs
          </Link>

          <div className="max-w-4xl">
            {blog.category && (
              <Badge className="mb-4 bg-green-700 hover:bg-green-600">
                {blog.category}
              </Badge>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-green-100">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {blog.author_name}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {blog.read_time_minutes} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {blog.featured_image && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8">
              <Image
                src={blog.featured_image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Excerpt */}
          {blog.excerpt && (
            <div className="bg-green-50 border-l-4 border-[#1a8f4a] p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-700 italic">{blog.excerpt}</p>
            </div>
          )}

          {/* Main Content */}
          <Card className="mb-8">
            <CardContent className="p-6 md:p-8 lg:p-10">
              <div className="prose prose-lg max-w-none">
                <div
                  className="whitespace-pre-wrap text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Tags:
                    </span>
                    {blog.tags.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-[#1a8f4a] text-[#1a8f4a]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Share this article</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm">
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm">
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Author Bio */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {blog.author_avatar ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={blog.author_avatar}
                      alt={blog.author_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-green-600" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {blog.author_name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Ayurvedic Health Expert & Wellness Consultant
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Blogs */}
          {relatedBlogs && relatedBlogs.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog: any) => (
                  <Link key={relatedBlog.id} href={`/blogs/${relatedBlog.slug}`}>
                    <Card className="overflow-hidden group hover:shadow-lg transition-shadow h-full">
                      <div className="relative aspect-video overflow-hidden">
                        {relatedBlog.featured_image ? (
                          <Image
                            src={relatedBlog.featured_image}
                            alt={relatedBlog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                            <span className="text-white text-2xl font-bold opacity-20">
                              Blog
                            </span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-[#1a8f4a] transition-colors">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedBlog.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
