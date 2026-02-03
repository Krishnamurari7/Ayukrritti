"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  cta_text: string | null;
  cta_link: string | null;
  display_order: number;
  is_active: boolean;
}

interface BannerManagementProps {
  initialBanners: Banner[];
}

export function BannerManagement({ initialBanners }: BannerManagementProps) {
  const [banners, setBanners] = useState(initialBanners);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [deletingBannerId, setDeletingBannerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image_url: "",
    cta_text: "",
    cta_link: "",
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      image_url: "",
      cta_text: "",
      cta_link: "",
      is_active: true,
    });
    setEditingBanner(null);
  };

  const openDialog = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title,
        subtitle: banner.subtitle || "",
        image_url: banner.image_url,
        cta_text: banner.cta_text || "",
        cta_link: banner.cta_link || "",
        is_active: banner.is_active,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingBanner) {
        // Update existing banner
        const { error } = await supabase
          .from("banners")
          .update({
            title: formData.title,
            subtitle: formData.subtitle || null,
            image_url: formData.image_url,
            cta_text: formData.cta_text || null,
            cta_link: formData.cta_link || null,
            is_active: formData.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingBanner.id);

        if (error) throw error;
        toast.success("Banner updated successfully!");
      } else {
        // Create new banner
        const maxOrder = Math.max(...banners.map((b) => b.display_order), 0);
        const { error } = await supabase.from("banners").insert({
          title: formData.title,
          subtitle: formData.subtitle || null,
          image_url: formData.image_url,
          cta_text: formData.cta_text || null,
          cta_link: formData.cta_link || null,
          is_active: formData.is_active,
          display_order: maxOrder + 1,
        });

        if (error) throw error;
        toast.success("Banner created successfully!");
      }

      setIsDialogOpen(false);
      resetForm();
      router.refresh();
    } catch (error) {
      console.error("Error saving banner:", error);
      toast.error("Failed to save banner");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingBannerId) return;
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("banners")
        .delete()
        .eq("id", deletingBannerId);

      if (error) throw error;

      toast.success("Banner deleted successfully!");
      setIsDeleteDialogOpen(false);
      setDeletingBannerId(null);
      router.refresh();
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Failed to delete banner");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleActive = async (bannerId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("banners")
        .update({ is_active: !currentStatus })
        .eq("id", bannerId);

      if (error) throw error;

      toast.success(`Banner ${!currentStatus ? "activated" : "deactivated"}`);
      router.refresh();
    } catch (error) {
      console.error("Error toggling banner status:", error);
      toast.error("Failed to update banner status");
    }
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const newBanners = [...banners];
    [newBanners[index - 1], newBanners[index]] = [newBanners[index], newBanners[index - 1]];
    await updateDisplayOrders(newBanners);
  };

  const moveDown = async (index: number) => {
    if (index === banners.length - 1) return;
    const newBanners = [...banners];
    [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
    await updateDisplayOrders(newBanners);
  };

  const updateDisplayOrders = async (orderedBanners: Banner[]) => {
    try {
      const updates = orderedBanners.map((banner, index) => ({
        id: banner.id,
        display_order: index + 1,
      }));

      for (const update of updates) {
        await supabase
          .from("banners")
          .update({ display_order: update.display_order })
          .eq("id", update.id);
      }

      toast.success("Banner order updated!");
      router.refresh();
    } catch (error) {
      console.error("Error updating display order:", error);
      toast.error("Failed to update banner order");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => openDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Banner
        </Button>
      </div>

      <div className="space-y-4">
        {banners.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No banners yet. Add your first banner to get started.
          </div>
        ) : (
          banners.map((banner, index) => (
            <div
              key={banner.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              {/* Drag Handle & Order Controls */}
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                >
                  <GripVertical className="w-4 h-4" />
                </Button>
                <span className="text-xs text-muted-foreground text-center">
                  {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => moveDown(index)}
                  disabled={index === banners.length - 1}
                >
                  <GripVertical className="w-4 h-4" />
                </Button>
              </div>

              {/* Image Preview */}
              <div className="relative w-32 h-20 rounded overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={banner.image_url}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Banner Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{banner.title}</h3>
                {banner.subtitle && (
                  <p className="text-sm text-muted-foreground truncate">
                    {banner.subtitle}
                  </p>
                )}
                {banner.cta_text && (
                  <p className="text-xs text-muted-foreground mt-1">
                    CTA: {banner.cta_text} → {banner.cta_link}
                  </p>
                )}
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleActive(banner.id, banner.is_active)}
                  title={banner.is_active ? "Deactivate" : "Activate"}
                >
                  {banner.is_active ? (
                    <Eye className="w-4 h-4 text-green-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => openDialog(banner)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setDeletingBannerId(banner.id);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingBanner ? "Edit Banner" : "Add New Banner"}
            </DialogTitle>
            <DialogDescription>
              Configure the banner that will appear in the homepage hero slider
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Natural Healing With Ayurveda"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Textarea
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  placeholder="e.g., Experience the ancient wisdom of Ayurveda..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL *</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  required
                />
                {formData.image_url && (
                  <div className="relative w-full h-40 rounded border overflow-hidden">
                    <Image
                      src={formData.image_url}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cta_text">Button Text</Label>
                  <Input
                    id="cta_text"
                    value={formData.cta_text}
                    onChange={(e) =>
                      setFormData({ ...formData, cta_text: e.target.value })
                    }
                    placeholder="e.g., Shop Now"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cta_link">Button Link</Label>
                  <Input
                    id="cta_link"
                    value={formData.cta_link}
                    onChange={(e) =>
                      setFormData({ ...formData, cta_link: e.target.value })
                    }
                    placeholder="e.g., /products"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : editingBanner ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this banner. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
