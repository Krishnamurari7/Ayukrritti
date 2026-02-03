"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { generateSlug } from "@/lib/utils";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { X, Loader2 } from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [product, setProduct] = useState<any>(null);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      if (!productId) return;

      // Load categories
      const { data: categoriesData } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (categoriesData) setCategories(categoriesData);

      // Load product
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (productError || !productData) {
        toast.error("Product not found");
        router.push("/admin/products");
        return;
      }

      setProduct(productData);

      // Load product images
      const { data: imagesData } = await supabase
        .from("product_images")
        .select("*")
        .eq("product_id", productId)
        .order("display_order");

      if (imagesData) setExistingImages(imagesData);

      setLoading(false);
    }

    loadData();
  }, [productId, supabase, router]);

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = existingImages.length - imagesToDelete.length + newImages.length + files.length;
    
    if (totalImages > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setNewImages([...newImages, ...files]);

    // Create preview URLs
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeExistingImage = (imageId: string) => {
    setImagesToDelete([...imagesToDelete, imageId]);
  };

  const removeNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setNewImagePreviews(newImagePreviews.filter((_, i) => i !== index));
  };

  const uploadNewImages = async () => {
    const uploadPromises = newImages.map(async (file, index) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `${productId}/${Date.now()}-${index}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(filePath);

      return {
        product_id: productId,
        image_url: publicUrl,
        display_order: existingImages.length - imagesToDelete.length + index,
      };
    });

    const imageData = await Promise.all(uploadPromises);

    const { error: insertError } = await supabase
      .from("product_images")
      .insert(imageData);

    if (insertError) throw insertError;
  };

  const deleteImages = async () => {
    if (imagesToDelete.length === 0) return;

    // Get image URLs to delete from storage
    const imagesToDeleteData = existingImages.filter((img) =>
      imagesToDelete.includes(img.id)
    );

    // Delete from storage
    for (const image of imagesToDeleteData) {
      const path = image.image_url.split("/product-images/")[1];
      if (path) {
        await supabase.storage.from("product-images").remove([path]);
      }
    }

    // Delete from database
    const { error } = await supabase
      .from("product_images")
      .delete()
      .in("id", imagesToDelete);

    if (error) throw error;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    try {
      // Update product
      const { error: updateError } = await supabase
        .from("products")
        .update({
          name,
          slug: generateSlug(name),
          description: formData.get("description") as string,
          price: parseFloat(formData.get("price") as string),
          compare_at_price: formData.get("compare_at_price")
            ? parseFloat(formData.get("compare_at_price") as string)
            : null,
          category_id: formData.get("category_id") as string,
          sku: formData.get("sku") as string,
          stock_quantity: parseInt(formData.get("stock_quantity") as string),
          is_featured: formData.get("is_featured") === "on",
          is_active: formData.get("is_active") === "on",
          updated_at: new Date().toISOString(),
        })
        .eq("id", productId);

      if (updateError) throw updateError;

      // Delete marked images
      await deleteImages();

      // Upload new images
      if (newImages.length > 0) {
        await uploadNewImages();
      }

      toast.success("Product updated successfully");
      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const visibleExistingImages = existingImages.filter(
    (img) => !imagesToDelete.includes(img.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Edit Product</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={product.name}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input id="sku" name="sku" defaultValue={product.sku} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                rows={5}
                defaultValue={product.description}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={product.price}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="compare_at_price">Compare At Price</Label>
                <Input
                  id="compare_at_price"
                  name="compare_at_price"
                  type="number"
                  step="0.01"
                  defaultValue={product.compare_at_price || ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock_quantity">Stock Quantity *</Label>
                <Input
                  id="stock_quantity"
                  name="stock_quantity"
                  type="number"
                  defaultValue={product.stock_quantity}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category_id">Category *</Label>
              <select
                id="category_id"
                name="category_id"
                className="w-full border rounded-md p-2"
                defaultValue={product.category_id}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Product Images (Max 5)</Label>
              
              {/* Existing Images */}
              {visibleExistingImages.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Current Images
                  </p>
                  <div className="grid grid-cols-5 gap-4">
                    {visibleExistingImages.map((image, index) => (
                      <div key={image.id} className="relative group">
                        <div className="relative aspect-square rounded-lg overflow-hidden border">
                          <Image
                            src={image.image_url}
                            alt={`Product image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExistingImage(image.id)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1">
                            Main Image
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images Preview */}
              {newImagePreviews.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2 mt-4">
                    New Images to Upload
                  </p>
                  <div className="grid grid-cols-5 gap-4">
                    {newImagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="relative aspect-square rounded-lg overflow-hidden border">
                          <Image
                            src={preview}
                            alt={`New image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Images */}
              {visibleExistingImages.length + newImages.length < 5 && (
                <div className="mt-4">
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleNewImageChange}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Add more images ({visibleExistingImages.length + newImages.length}/5 used)
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  name="is_featured"
                  defaultChecked={product.is_featured}
                  className="rounded"
                />
                <Label htmlFor="is_featured">Featured Product</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  defaultChecked={product.is_active}
                  className="rounded"
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>

            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Update Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
