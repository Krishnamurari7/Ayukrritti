"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Eye, EyeOff, Star } from "lucide-react";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author_name: string;
  author_avatar: string | null;
  category: string | null;
  tags: string[] | null;
  is_featured: boolean;
  is_active: boolean;
  view_count: number;
  read_time_minutes: number;
  created_at: string;
  updated_at: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const supabase = createClient();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    author_name: "Admin",
    author_avatar: "",
    category: "",
    tags: "",
    is_featured: false,
    is_active: true,
    read_time_minutes: 5,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch blogs", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  function openDialog(blog?: Blog) {
    if (blog) {
      setSelectedBlog(blog);
      setFormData({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt || "",
        content: blog.content,
        featured_image: blog.featured_image || "",
        author_name: blog.author_name,
        author_avatar: blog.author_avatar || "",
        category: blog.category || "",
        tags: blog.tags?.join(", ") || "",
        is_featured: blog.is_featured,
        is_active: blog.is_active,
        read_time_minutes: blog.read_time_minutes,
      });
    } else {
      setSelectedBlog(null);
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featured_image: "",
        author_name: "Admin",
        author_avatar: "",
        category: "",
        tags: "",
        is_featured: false,
        is_active: true,
        read_time_minutes: 5,
      });
    }
    setDialogOpen(true);
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleTitleChange(title: string) {
    setFormData({
      ...formData,
      title,
      slug: selectedBlog ? formData.slug : generateSlug(title),
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const blogData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt || null,
        content: formData.content,
        featured_image: formData.featured_image || null,
        author_name: formData.author_name,
        author_avatar: formData.author_avatar || null,
        category: formData.category || null,
        tags: formData.tags
          ? formData.tags.split(",").map((tag) => tag.trim())
          : null,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
        read_time_minutes: formData.read_time_minutes,
        updated_at: new Date().toISOString(),
      };

      if (selectedBlog) {
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", selectedBlog.id);

        if (error) throw error;
        toast.success("Blog updated successfully");
      } else {
        const { error } = await supabase.from("blogs").insert([blogData]);

        if (error) throw error;
        toast.success("Blog created successfully");
      }

      setDialogOpen(false);
      fetchBlogs();
    } catch (error: any) {
      toast.error("Failed to save blog", {
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!selectedBlog) return;
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", selectedBlog.id);

      if (error) throw error;

      toast.success("Blog deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedBlog(null);
      fetchBlogs();
    } catch (error: any) {
      toast.error("Failed to delete blog", {
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleStatus(blog: Blog) {
    try {
      const { error } = await supabase
        .from("blogs")
        .update({ is_active: !blog.is_active })
        .eq("id", blog.id);

      if (error) throw error;

      toast.success(
        `Blog ${!blog.is_active ? "activated" : "deactivated"} successfully`
      );
      fetchBlogs();
    } catch (error: any) {
      toast.error("Failed to update blog status", {
        description: error.message,
      });
    }
  }

  async function toggleFeatured(blog: Blog) {
    try {
      const { error } = await supabase
        .from("blogs")
        .update({ is_featured: !blog.is_featured })
        .eq("id", blog.id);

      if (error) throw error;

      toast.success(
        `Blog ${!blog.is_featured ? "featured" : "unfeatured"} successfully`
      );
      fetchBlogs();
    } catch (error: any) {
      toast.error("Failed to update featured status", {
        description: error.message,
      });
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your blog posts and articles
          </p>
        </div>
        <Button
          onClick={() => openDialog()}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Blog
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts ({blogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No blogs yet</p>
              <Button
                onClick={() => openDialog()}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Blog
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex flex-col md:flex-row gap-4 border-b pb-4 last:border-0"
                >
                  {blog.featured_image && (
                    <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={blog.featured_image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{blog.title}</h3>
                      {blog.is_featured && (
                        <Badge className="bg-yellow-500">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge
                        variant={blog.is_active ? "default" : "secondary"}
                        className={
                          blog.is_active ? "bg-green-600" : "bg-gray-400"
                        }
                      >
                        {blog.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      {blog.category && (
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
                          {blog.category}
                        </span>
                      )}
                      <span>By {blog.author_name}</span>
                      <span>{blog.read_time_minutes} min read</span>
                      <span>{blog.view_count} views</span>
                      <span>
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFeatured(blog)}
                      title={blog.is_featured ? "Unfeature" : "Feature"}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          blog.is_featured ? "fill-yellow-500 text-yellow-500" : ""
                        }`}
                      />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(blog)}
                      title={blog.is_active ? "Deactivate" : "Activate"}
                    >
                      {blog.is_active ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDialog(blog)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedBlog(blog);
                        setDeleteDialogOpen(true);
                      }}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedBlog ? "Edit Blog" : "Create New Blog"}
            </DialogTitle>
            <DialogDescription>
              {selectedBlog
                ? "Update the blog details below"
                : "Fill in the details to create a new blog post"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  placeholder="Enter blog title"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  required
                  placeholder="blog-url-slug"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  placeholder="Short description of the blog"
                  rows={2}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                  placeholder="Blog content (supports markdown)"
                  rows={8}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) =>
                    setFormData({ ...formData, featured_image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="author_name">Author Name *</Label>
                <Input
                  id="author_name"
                  value={formData.author_name}
                  onChange={(e) =>
                    setFormData({ ...formData, author_name: e.target.value })
                  }
                  required
                  placeholder="Author name"
                />
              </div>
              <div>
                <Label htmlFor="author_avatar">Author Avatar URL</Label>
                <Input
                  id="author_avatar"
                  value={formData.author_avatar}
                  onChange={(e) =>
                    setFormData({ ...formData, author_avatar: e.target.value })
                  }
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="e.g., Lifestyle, Health"
                />
              </div>
              <div>
                <Label htmlFor="read_time">Read Time (minutes) *</Label>
                <Input
                  id="read_time"
                  type="number"
                  min="1"
                  value={formData.read_time_minutes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      read_time_minutes: parseInt(e.target.value) || 5,
                    })
                  }
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="ayurveda, health, wellness"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_featured: checked })
                  }
                />
                <Label htmlFor="is_featured">Featured Blog</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
                <Label htmlFor="is_active">Active/Published</Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {submitting
                  ? "Saving..."
                  : selectedBlog
                  ? "Update Blog"
                  : "Create Blog"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              blog post "{selectedBlog?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={submitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {submitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
