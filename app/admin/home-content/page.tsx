"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useImageValidation } from "@/hooks/useImageValidation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface AnnouncementItem {
  id: string;
  content: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

interface TrustBadge {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  bg_color: string;
  display_order: number;
  is_active: boolean;
}

interface HealthGoal {
  id: string;
  title: string;
  image_url: string;
  link_url: string;
  bg_gradient: string;
  display_order: number;
  is_active: boolean;
}

interface WhyChooseUs {
  id: string;
  icon: string;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

interface CustomerReview {
  id: string;
  customer_name: string;
  location: string;
  rating: number;
  review_text: string;
  product_name: string;
  is_active: boolean;
  display_order: number;
}

interface Certification {
  id: string;
  title: string;
  icon_url: string;
  display_order: number;
  is_active: boolean;
}

export default function HomeContentManagement() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<string>("");

  // Announcement Items
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [announcementForm, setAnnouncementForm] = useState<Partial<AnnouncementItem>>({
    content: "",
    icon: "",
    display_order: 0,
    is_active: true,
  });
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<string | null>(null);

  // Trust Badges
  const [badges, setBadges] = useState<TrustBadge[]>([]);
  const [badgeForm, setBadgeForm] = useState<Partial<TrustBadge>>({
    title: "",
    subtitle: "",
    icon: "",
    bg_color: "bg-green-100",
    display_order: 0,
    is_active: true,
  });
  const [editingBadgeId, setEditingBadgeId] = useState<string | null>(null);

  // Health Goals
  const [healthGoals, setHealthGoals] = useState<HealthGoal[]>([]);
  const [healthGoalForm, setHealthGoalForm] = useState<Partial<HealthGoal>>({
    title: "",
    image_url: "",
    link_url: "",
    bg_gradient: "from-teal-700 to-teal-800",
    display_order: 0,
    is_active: true,
  });
  const [editingHealthGoalId, setEditingHealthGoalId] = useState<string | null>(null);
  const healthGoalImageValidation = useImageValidation(healthGoalForm.image_url);

  // Why Choose Us
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUs[]>([]);
  const [whyChooseUsForm, setWhyChooseUsForm] = useState<Partial<WhyChooseUs>>({
    icon: "",
    title: "",
    description: "",
    display_order: 0,
    is_active: true,
  });
  const [editingWhyChooseUsId, setEditingWhyChooseUsId] = useState<string | null>(null);

  // Customer Reviews
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [reviewForm, setReviewForm] = useState<Partial<CustomerReview>>({
    customer_name: "",
    location: "",
    rating: 5,
    review_text: "",
    product_name: "",
    is_active: true,
    display_order: 0,
  });
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  // Certifications
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [certificationForm, setCertificationForm] = useState<Partial<Certification>>({
    title: "",
    icon_url: "",
    display_order: 0,
    is_active: true,
  });
  const [editingCertificationId, setEditingCertificationId] = useState<string | null>(null);
  const certificationImageValidation = useImageValidation(certificationForm.icon_url);

  // Fetch all data
  useEffect(() => {
    fetchAnnouncements();
    fetchBadges();
    fetchHealthGoals();
    fetchWhyChooseUs();
    fetchReviews();
    fetchCertifications();
  }, []);

  const fetchAnnouncements = async () => {
    const { data } = await supabase
      .from("announcement_items")
      .select("*")
      .order("display_order");
    if (data) setAnnouncements(data);
  };

  const fetchBadges = async () => {
    const { data } = await supabase
      .from("trust_badges")
      .select("*")
      .order("display_order");
    if (data) setBadges(data);
  };

  const fetchHealthGoals = async () => {
    const { data } = await supabase
      .from("health_goals")
      .select("*")
      .order("display_order");
    if (data) setHealthGoals(data);
  };

  const fetchWhyChooseUs = async () => {
    const { data } = await supabase
      .from("why_choose_us")
      .select("*")
      .order("display_order");
    if (data) setWhyChooseUs(data);
  };

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("customer_reviews")
      .select("*")
      .order("display_order");
    if (data) setReviews(data);
  };

  const fetchCertifications = async () => {
    const { data } = await supabase
      .from("certifications")
      .select("*")
      .order("display_order");
    if (data) setCertifications(data);
  };

  // Announcement CRUD
  const handleSaveAnnouncement = async () => {
    setLoading(true);
    try {
      if (editingAnnouncementId) {
        // @ts-ignore - Supabase types will be regenerated after migration
        const { error } = await supabase
          .from("announcement_items")
          .update(announcementForm)
          .eq("id", editingAnnouncementId);
        if (error) throw error;
        toast.success("Announcement updated successfully");
      } else {
        // @ts-ignore - Supabase types will be regenerated after migration
        const { error } = await supabase
          .from("announcement_items")
          .insert(announcementForm);
        if (error) throw error;
        toast.success("Announcement created successfully");
      }
      setAnnouncementForm({ content: "", icon: "", display_order: 0, is_active: true });
      setEditingAnnouncementId(null);
      fetchAnnouncements();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditAnnouncement = (item: AnnouncementItem) => {
    setAnnouncementForm(item);
    setEditingAnnouncementId(item.id);
  };

  const handleDeleteAnnouncement = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("announcement_items")
        .delete()
        .eq("id", deleteId);
      if (error) throw error;
      toast.success("Announcement deleted successfully");
      fetchAnnouncements();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setDeleteId(null);
      setDeleteType("");
    }
  };

  // Trust Badge CRUD
  const handleSaveBadge = async () => {
    setLoading(true);
    try {
      if (editingBadgeId) {
        // @ts-ignore - Supabase types will be regenerated after migration
        const { error } = await supabase
          .from("trust_badges")
          .update(badgeForm)
          .eq("id", editingBadgeId);
        if (error) throw error;
        toast.success("Trust badge updated successfully");
      } else {
        // @ts-ignore - Supabase types will be regenerated after migration
        const { error } = await supabase.from("trust_badges").insert(badgeForm);
        if (error) throw error;
        toast.success("Trust badge created successfully");
      }
      setBadgeForm({
        title: "",
        subtitle: "",
        icon: "",
        bg_color: "bg-green-100",
        display_order: 0,
        is_active: true,
      });
      setEditingBadgeId(null);
      fetchBadges();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBadge = (item: TrustBadge) => {
    setBadgeForm(item);
    setEditingBadgeId(item.id);
  };

  const handleDeleteBadge = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("trust_badges")
        .delete()
        .eq("id", deleteId);
      if (error) throw error;
      toast.success("Trust badge deleted successfully");
      fetchBadges();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setDeleteId(null);
      setDeleteType("");
    }
  };

  // Health Goal CRUD
  const handleSaveHealthGoal = async () => {
    setLoading(true);
    try {
      if (editingHealthGoalId) {
        // @ts-ignore - Supabase types will be regenerated after migration
        const { error } = await supabase
          .from("health_goals")
          .update(healthGoalForm)
          .eq("id", editingHealthGoalId);
        if (error) throw error;
        toast.success("Health goal updated successfully");
      } else {
        // @ts-ignore - Supabase types will be regenerated after migration
        const { error } = await supabase.from("health_goals").insert(healthGoalForm);
        if (error) throw error;
        toast.success("Health goal created successfully");
      }
      setHealthGoalForm({
        title: "",
        image_url: "",
        link_url: "",
        bg_gradient: "from-teal-700 to-teal-800",
        display_order: 0,
        is_active: true,
      });
      setEditingHealthGoalId(null);
      fetchHealthGoals();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditHealthGoal = (item: HealthGoal) => {
    setHealthGoalForm(item);
    setEditingHealthGoalId(item.id);
  };

  const handleDeleteHealthGoal = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("health_goals")
        .delete()
        .eq("id", deleteId);
      if (error) throw error;
      toast.success("Health goal deleted successfully");
      fetchHealthGoals();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setDeleteId(null);
      setDeleteType("");
    }
  };

  // Why Choose Us CRUD
  const handleSaveWhyChooseUs = async () => {
    setLoading(true);
    try {
      if (editingWhyChooseUsId) {
        // @ts-ignore - Supabase types will be regenerated after migration
        const { error } = await supabase
          .from("why_choose_us")
          .update(whyChooseUsForm)
          .eq("id", editingWhyChooseUsId);
        if (error) throw error;
        toast.success("Item updated successfully");
      } else {
        // @ts-ignore - Supabase types will be regenerated after migration
        const { error } = await supabase.from("why_choose_us").insert(whyChooseUsForm);
        if (error) throw error;
        toast.success("Item created successfully");
      }
      setWhyChooseUsForm({
        icon: "",
        title: "",
        description: "",
        display_order: 0,
        is_active: true,
      });
      setEditingWhyChooseUsId(null);
      fetchWhyChooseUs();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditWhyChooseUs = (item: WhyChooseUs) => {
    setWhyChooseUsForm(item);
    setEditingWhyChooseUsId(item.id);
  };

  const handleDeleteWhyChooseUs = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("why_choose_us")
        .delete()
        .eq("id", deleteId);
      if (error) throw error;
      toast.success("Item deleted successfully");
      fetchWhyChooseUs();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setDeleteId(null);
      setDeleteType("");
    }
  };

  // Customer Review CRUD
  const handleSaveReview = async () => {
    setLoading(true);
    try {
      if (editingReviewId) {
        // @ts-ignore - Supabase types will be regenerated after migration
        const { error } = await supabase
          .from("customer_reviews")
          .update(reviewForm)
          .eq("id", editingReviewId);
        if (error) throw error;
        toast.success("Review updated successfully");
      } else {
        // @ts-ignore - Supabase types will be regenerated after migration
        const { error } = await supabase.from("customer_reviews").insert(reviewForm);
        if (error) throw error;
        toast.success("Review created successfully");
      }
      setReviewForm({
        customer_name: "",
        location: "",
        rating: 5,
        review_text: "",
        product_name: "",
        is_active: true,
        display_order: 0,
      });
      setEditingReviewId(null);
      fetchReviews();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditReview = (item: CustomerReview) => {
    setReviewForm(item);
    setEditingReviewId(item.id);
  };

  const handleDeleteReview = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("customer_reviews")
        .delete()
        .eq("id", deleteId);
      if (error) throw error;
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setDeleteId(null);
      setDeleteType("");
    }
  };

  // Certification CRUD
  const handleSaveCertification = async () => {
    setLoading(true);
    try {
      // Validate min/max count
      if (!editingCertificationId) {
        const activeCount = certifications.filter(c => c.is_active).length;
        if (activeCount >= 10) {
          toast.error("Maximum 10 certifications allowed");
          setLoading(false);
          return;
        }
      }

      if (editingCertificationId) {
        // @ts-ignore - Supabase types will be regenerated after migration
        const { error } = await supabase
          .from("certifications")
          .update(certificationForm)
          .eq("id", editingCertificationId);
        if (error) throw error;
        toast.success("Certification updated successfully");
      } else {
        // @ts-ignore - Supabase types will be regenerated after migration
        const { error } = await supabase.from("certifications").insert(certificationForm);
        if (error) throw error;
        toast.success("Certification created successfully");
      }
      setCertificationForm({
        title: "",
        icon_url: "",
        display_order: 0,
        is_active: true,
      });
      setEditingCertificationId(null);
      fetchCertifications();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCertification = (item: Certification) => {
    setCertificationForm(item);
    setEditingCertificationId(item.id);
  };

  const handleDeleteCertification = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      // Validate minimum count
      const activeCount = certifications.filter(c => c.is_active && c.id !== deleteId).length;
      if (activeCount < 3) {
        toast.error("Minimum 3 active certifications required");
        setLoading(false);
        setDeleteId(null);
        setDeleteType("");
        return;
      }

      const { error } = await supabase
        .from("certifications")
        .delete()
        .eq("id", deleteId);
      if (error) throw error;
      toast.success("Certification deleted successfully");
      fetchCertifications();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setDeleteId(null);
      setDeleteType("");
    }
  };

  const handleDelete = () => {
    switch (deleteType) {
      case "announcement":
        handleDeleteAnnouncement();
        break;
      case "badge":
        handleDeleteBadge();
        break;
      case "healthGoal":
        handleDeleteHealthGoal();
        break;
      case "whyChooseUs":
        handleDeleteWhyChooseUs();
        break;
      case "review":
        handleDeleteReview();
        break;
      case "certification":
        handleDeleteCertification();
        break;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Home Page Content Management</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Manage all content displayed on the home page</p>
      </div>

      <Tabs defaultValue="announcements" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <TabsTrigger value="announcements" className="text-xs md:text-sm">Announcements</TabsTrigger>
          <TabsTrigger value="badges" className="text-xs md:text-sm">Trust Badges</TabsTrigger>
          <TabsTrigger value="certifications" className="text-xs md:text-sm">Certifications</TabsTrigger>
          <TabsTrigger value="healthGoals" className="text-xs md:text-sm">Health Goals</TabsTrigger>
          <TabsTrigger value="whyChooseUs" className="text-xs md:text-sm">Why Choose Us</TabsTrigger>
          <TabsTrigger value="reviews" className="text-xs md:text-sm">Reviews</TabsTrigger>
        </TabsList>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">{editingAnnouncementId ? "Edit" : "Add"} Announcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Input
                    value={announcementForm.content}
                    onChange={(e) =>
                      setAnnouncementForm({ ...announcementForm, content: e.target.value })
                    }
                    placeholder="Free Shipping on Orders Above ₹399"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon (Emoji)</Label>
                  <Input
                    value={announcementForm.icon}
                    onChange={(e) =>
                      setAnnouncementForm({ ...announcementForm, icon: e.target.value })
                    }
                    placeholder="🎉"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={announcementForm.display_order}
                    onChange={(e) =>
                      setAnnouncementForm({
                        ...announcementForm,
                        display_order: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={announcementForm.is_active}
                    onCheckedChange={(checked) =>
                      setAnnouncementForm({ ...announcementForm, is_active: checked })
                    }
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleSaveAnnouncement} disabled={loading} className="w-full sm:w-auto">
                  {editingAnnouncementId ? "Update" : "Create"}
                </Button>
                {editingAnnouncementId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAnnouncementForm({
                        content: "",
                        icon: "",
                        display_order: 0,
                        is_active: true,
                      });
                      setEditingAnnouncementId(null);
                    }}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Announcements List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs md:text-sm">Icon</TableHead>
                    <TableHead className="text-xs md:text-sm">Content</TableHead>
                    <TableHead className="text-xs md:text-sm">Order</TableHead>
                    <TableHead className="text-xs md:text-sm">Active</TableHead>
                    <TableHead className="text-xs md:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {announcements.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-sm">{item.icon}</TableCell>
                      <TableCell className="text-sm break-words">{item.content}</TableCell>
                      <TableCell className="text-sm">{item.display_order}</TableCell>
                      <TableCell className="text-sm">{item.is_active ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditAnnouncement(item)}
                            className="w-full sm:w-auto"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setDeleteId(item.id);
                              setDeleteType("announcement");
                            }}
                            className="w-full sm:w-auto"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trust Badges Tab */}
        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">{editingBadgeId ? "Edit" : "Add"} Trust Badge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={badgeForm.title}
                    onChange={(e) => setBadgeForm({ ...badgeForm, title: e.target.value })}
                    placeholder="100% Natural"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Input
                    value={badgeForm.subtitle}
                    onChange={(e) => setBadgeForm({ ...badgeForm, subtitle: e.target.value })}
                    placeholder="Pure Herbs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon (Emoji)</Label>
                  <Input
                    value={badgeForm.icon}
                    onChange={(e) => setBadgeForm({ ...badgeForm, icon: e.target.value })}
                    placeholder="🌿"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Background Color (Tailwind class)</Label>
                  <Input
                    value={badgeForm.bg_color}
                    onChange={(e) => setBadgeForm({ ...badgeForm, bg_color: e.target.value })}
                    placeholder="bg-green-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={badgeForm.display_order}
                    onChange={(e) =>
                      setBadgeForm({ ...badgeForm, display_order: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={badgeForm.is_active}
                    onCheckedChange={(checked) =>
                      setBadgeForm({ ...badgeForm, is_active: checked })
                    }
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleSaveBadge} disabled={loading} className="w-full sm:w-auto">
                  {editingBadgeId ? "Update" : "Create"}
                </Button>
                {editingBadgeId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setBadgeForm({
                        title: "",
                        subtitle: "",
                        icon: "",
                        bg_color: "bg-green-100",
                        display_order: 0,
                        is_active: true,
                      });
                      setEditingBadgeId(null);
                    }}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Trust Badges List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs md:text-sm">Icon</TableHead>
                    <TableHead className="text-xs md:text-sm">Title</TableHead>
                    <TableHead className="text-xs md:text-sm">Subtitle</TableHead>
                    <TableHead className="text-xs md:text-sm">Order</TableHead>
                    <TableHead className="text-xs md:text-sm">Active</TableHead>
                    <TableHead className="text-xs md:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {badges.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-sm">{item.icon}</TableCell>
                      <TableCell className="text-sm break-words">{item.title}</TableCell>
                      <TableCell className="text-sm break-words">{item.subtitle}</TableCell>
                      <TableCell className="text-sm">{item.display_order}</TableCell>
                      <TableCell className="text-sm">{item.is_active ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditBadge(item)}
                            className="w-full sm:w-auto"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setDeleteId(item.id);
                              setDeleteType("badge");
                            }}
                            className="w-full sm:w-auto"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">{editingCertificationId ? "Edit" : "Add"} Certification</CardTitle>
              <p className="text-xs md:text-sm text-gray-600">Minimum 3 active, Maximum 10 total</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={certificationForm.title}
                    onChange={(e) =>
                      setCertificationForm({ ...certificationForm, title: e.target.value })
                    }
                    placeholder="GMO Free"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon URL</Label>
                  <Input
                    value={certificationForm.icon_url}
                    onChange={(e) =>
                      setCertificationForm({ ...certificationForm, icon_url: e.target.value })
                    }
                    placeholder="https://example.com/image.png (Direct image URL required)"
                  />
                  {certificationForm.icon_url && (
                    <>
                      {/* Validation Status */}
                      {certificationImageValidation.isValidating && (
                        <p className="text-xs md:text-sm text-blue-600 bg-blue-50 p-2 rounded border border-blue-200 mt-2">
                          🔍 Checking image URL...
                        </p>
                      )}
                      {certificationImageValidation.isValid === false && certificationImageValidation.error && (
                        <p className="text-xs md:text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200 mt-2">
                          ❌ {certificationImageValidation.error}
                        </p>
                      )}
                      {certificationImageValidation.isValid === true && (
                        <p className="text-xs md:text-sm text-green-600 bg-green-50 p-2 rounded border border-green-200 mt-2">
                          ✅ Image URL is valid
                        </p>
                      )}
                      {certificationForm.icon_url.includes("photos.app.goo.gl") && (
                        <p className="text-xs md:text-sm text-amber-600 bg-amber-50 p-2 rounded border border-amber-200 mt-2">
                          ⚠️ Google Photos shared links won't work. Please get the direct image URL:
                          <br />
                          1. Open the image in Google Photos
                          <br />
                          2. Right-click → "Copy image address" or "Open image in new tab"
                          <br />
                          3. Copy the direct URL (should end with .jpg, .png, etc.)
                        </p>
                      )}
                      {/* Only show preview if validation passed or is still validating */}
                      {(certificationImageValidation.isValid === true || certificationImageValidation.isValidating || certificationImageValidation.isValid === null) && (
                        <div className="relative w-full h-32 rounded border overflow-hidden bg-muted mt-2">
                          <img
                            src={certificationForm.icon_url}
                            alt="Preview"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="flex items-center justify-center h-full text-red-500 text-sm">Image failed to load. Please check the URL.</div>';
                              }
                            }}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={certificationForm.display_order}
                    onChange={(e) =>
                      setCertificationForm({
                        ...certificationForm,
                        display_order: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={certificationForm.is_active}
                    onCheckedChange={(checked) =>
                      setCertificationForm({ ...certificationForm, is_active: checked })
                    }
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleSaveCertification} disabled={loading} className="w-full sm:w-auto">
                  {editingCertificationId ? "Update" : "Create"}
                </Button>
                {editingCertificationId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCertificationForm({
                        title: "",
                        icon_url: "",
                        display_order: 0,
                        is_active: true,
                      });
                      setEditingCertificationId(null);
                    }}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Certifications List ({certifications.filter(c => c.is_active).length} active)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs md:text-sm">Title</TableHead>
                    <TableHead className="text-xs md:text-sm">Icon URL</TableHead>
                    <TableHead className="text-xs md:text-sm">Order</TableHead>
                    <TableHead className="text-xs md:text-sm">Active</TableHead>
                    <TableHead className="text-xs md:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certifications.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-sm break-words">{item.title}</TableCell>
                      <TableCell className="text-xs md:text-sm max-w-xs truncate break-all">{item.icon_url}</TableCell>
                      <TableCell className="text-sm">{item.display_order}</TableCell>
                      <TableCell className="text-sm">{item.is_active ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditCertification(item)}
                            className="w-full sm:w-auto"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setDeleteId(item.id);
                              setDeleteType("certification");
                            }}
                            className="w-full sm:w-auto"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Goals Tab */}
        <TabsContent value="healthGoals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">{editingHealthGoalId ? "Edit" : "Add"} Health Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={healthGoalForm.title}
                    onChange={(e) =>
                      setHealthGoalForm({ ...healthGoalForm, title: e.target.value })
                    }
                    placeholder="For Digestive Care"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={healthGoalForm.image_url}
                    onChange={(e) =>
                      setHealthGoalForm({ ...healthGoalForm, image_url: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg (Direct image URL required)"
                  />
                  {healthGoalForm.image_url && (
                    <>
                      {/* Validation Status */}
                      {healthGoalImageValidation.isValidating && (
                        <p className="text-xs md:text-sm text-blue-600 bg-blue-50 p-2 rounded border border-blue-200 mt-2">
                          🔍 Checking image URL...
                        </p>
                      )}
                      {healthGoalImageValidation.isValid === false && healthGoalImageValidation.error && (
                        <p className="text-xs md:text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200 mt-2">
                          ❌ {healthGoalImageValidation.error}
                        </p>
                      )}
                      {healthGoalImageValidation.isValid === true && (
                        <p className="text-xs md:text-sm text-green-600 bg-green-50 p-2 rounded border border-green-200 mt-2">
                          ✅ Image URL is valid
                        </p>
                      )}
                      {healthGoalForm.image_url.includes("photos.app.goo.gl") && (
                        <p className="text-xs md:text-sm text-amber-600 bg-amber-50 p-2 rounded border border-amber-200 mt-2">
                          ⚠️ Google Photos shared links won't work. Please get the direct image URL:
                          <br />
                          1. Open the image in Google Photos
                          <br />
                          2. Right-click → "Copy image address" or "Open image in new tab"
                          <br />
                          3. Copy the direct URL (should end with .jpg, .png, etc.)
                        </p>
                      )}
                      {/* Only show preview if validation passed or is still validating */}
                      {(healthGoalImageValidation.isValid === true || healthGoalImageValidation.isValidating || healthGoalImageValidation.isValid === null) && (
                        <div className="relative w-full h-40 rounded border overflow-hidden bg-muted mt-2">
                          <img
                            src={healthGoalForm.image_url}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="flex items-center justify-center h-full text-red-500 text-sm">Image failed to load. Please check the URL.</div>';
                              }
                            }}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Link URL</Label>
                  <Input
                    value={healthGoalForm.link_url}
                    onChange={(e) =>
                      setHealthGoalForm({ ...healthGoalForm, link_url: e.target.value })
                    }
                    placeholder="/products?category=digestive-health"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Background Gradient (Tailwind classes)</Label>
                  <Input
                    value={healthGoalForm.bg_gradient}
                    onChange={(e) =>
                      setHealthGoalForm({ ...healthGoalForm, bg_gradient: e.target.value })
                    }
                    placeholder="from-teal-700 to-teal-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={healthGoalForm.display_order}
                    onChange={(e) =>
                      setHealthGoalForm({
                        ...healthGoalForm,
                        display_order: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={healthGoalForm.is_active}
                    onCheckedChange={(checked) =>
                      setHealthGoalForm({ ...healthGoalForm, is_active: checked })
                    }
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleSaveHealthGoal} disabled={loading} className="w-full sm:w-auto">
                  {editingHealthGoalId ? "Update" : "Create"}
                </Button>
                {editingHealthGoalId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setHealthGoalForm({
                        title: "",
                        image_url: "",
                        link_url: "",
                        bg_gradient: "from-teal-700 to-teal-800",
                        display_order: 0,
                        is_active: true,
                      });
                      setEditingHealthGoalId(null);
                    }}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Health Goals List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs md:text-sm">Title</TableHead>
                    <TableHead className="text-xs md:text-sm">Image URL</TableHead>
                    <TableHead className="text-xs md:text-sm">Link</TableHead>
                    <TableHead className="text-xs md:text-sm">Order</TableHead>
                    <TableHead className="text-xs md:text-sm">Active</TableHead>
                    <TableHead className="text-xs md:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {healthGoals.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-sm break-words">{item.title}</TableCell>
                      <TableCell className="text-xs md:text-sm max-w-xs truncate break-all">{item.image_url}</TableCell>
                      <TableCell className="text-xs md:text-sm max-w-xs truncate break-all">{item.link_url}</TableCell>
                      <TableCell className="text-sm">{item.display_order}</TableCell>
                      <TableCell className="text-sm">{item.is_active ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditHealthGoal(item)}
                            className="w-full sm:w-auto"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setDeleteId(item.id);
                              setDeleteType("healthGoal");
                            }}
                            className="w-full sm:w-auto"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Why Choose Us Tab */}
        <TabsContent value="whyChooseUs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">{editingWhyChooseUsId ? "Edit" : "Add"} Why Choose Us Item</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon (Emoji)</Label>
                  <Input
                    value={whyChooseUsForm.icon}
                    onChange={(e) =>
                      setWhyChooseUsForm({ ...whyChooseUsForm, icon: e.target.value })
                    }
                    placeholder="🌿"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={whyChooseUsForm.title}
                    onChange={(e) =>
                      setWhyChooseUsForm({ ...whyChooseUsForm, title: e.target.value })
                    }
                    placeholder="100% Natural"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={whyChooseUsForm.description}
                    onChange={(e) =>
                      setWhyChooseUsForm({ ...whyChooseUsForm, description: e.target.value })
                    }
                    placeholder="Pure herbs and natural ingredients, absolutely no chemicals"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={whyChooseUsForm.display_order}
                    onChange={(e) =>
                      setWhyChooseUsForm({
                        ...whyChooseUsForm,
                        display_order: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={whyChooseUsForm.is_active}
                    onCheckedChange={(checked) =>
                      setWhyChooseUsForm({ ...whyChooseUsForm, is_active: checked })
                    }
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleSaveWhyChooseUs} disabled={loading} className="w-full sm:w-auto">
                  {editingWhyChooseUsId ? "Update" : "Create"}
                </Button>
                {editingWhyChooseUsId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setWhyChooseUsForm({
                        icon: "",
                        title: "",
                        description: "",
                        display_order: 0,
                        is_active: true,
                      });
                      setEditingWhyChooseUsId(null);
                    }}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Why Choose Us List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs md:text-sm">Icon</TableHead>
                    <TableHead className="text-xs md:text-sm">Title</TableHead>
                    <TableHead className="text-xs md:text-sm">Description</TableHead>
                    <TableHead className="text-xs md:text-sm">Order</TableHead>
                    <TableHead className="text-xs md:text-sm">Active</TableHead>
                    <TableHead className="text-xs md:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {whyChooseUs.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-sm">{item.icon}</TableCell>
                      <TableCell className="text-sm break-words">{item.title}</TableCell>
                      <TableCell className="text-xs md:text-sm max-w-xs break-words">{item.description}</TableCell>
                      <TableCell className="text-sm">{item.display_order}</TableCell>
                      <TableCell className="text-sm">{item.is_active ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditWhyChooseUs(item)}
                            className="w-full sm:w-auto"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setDeleteId(item.id);
                              setDeleteType("whyChooseUs");
                            }}
                            className="w-full sm:w-auto"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">{editingReviewId ? "Edit" : "Add"} Customer Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Customer Name</Label>
                  <Input
                    value={reviewForm.customer_name}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, customer_name: e.target.value })
                    }
                    placeholder="Priya Sharma"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={reviewForm.location}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, location: e.target.value })
                    }
                    placeholder="Mumbai"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input
                    value={reviewForm.product_name}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, product_name: e.target.value })
                    }
                    placeholder="Immunity Booster"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rating (1-5)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={reviewForm.rating}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Review Text</Label>
                  <Textarea
                    value={reviewForm.review_text}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, review_text: e.target.value })
                    }
                    placeholder="Amazing quality products! I've been using the immunity booster..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={reviewForm.display_order}
                    onChange={(e) =>
                      setReviewForm({
                        ...reviewForm,
                        display_order: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={reviewForm.is_active}
                    onCheckedChange={(checked) =>
                      setReviewForm({ ...reviewForm, is_active: checked })
                    }
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleSaveReview} disabled={loading} className="w-full sm:w-auto">
                  {editingReviewId ? "Update" : "Create"}
                </Button>
                {editingReviewId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setReviewForm({
                        customer_name: "",
                        location: "",
                        rating: 5,
                        review_text: "",
                        product_name: "",
                        is_active: true,
                        display_order: 0,
                      });
                      setEditingReviewId(null);
                    }}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Customer Reviews List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs md:text-sm">Customer</TableHead>
                    <TableHead className="text-xs md:text-sm">Location</TableHead>
                    <TableHead className="text-xs md:text-sm">Product</TableHead>
                    <TableHead className="text-xs md:text-sm">Rating</TableHead>
                    <TableHead className="text-xs md:text-sm">Review</TableHead>
                    <TableHead className="text-xs md:text-sm">Order</TableHead>
                    <TableHead className="text-xs md:text-sm">Active</TableHead>
                    <TableHead className="text-xs md:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-sm break-words">{item.customer_name}</TableCell>
                      <TableCell className="text-sm">{item.location}</TableCell>
                      <TableCell className="text-sm break-words">{item.product_name}</TableCell>
                      <TableCell className="text-sm">{"⭐".repeat(item.rating)}</TableCell>
                      <TableCell className="text-xs md:text-sm max-w-xs truncate break-words">
                        {item.review_text}
                      </TableCell>
                      <TableCell className="text-sm">{item.display_order}</TableCell>
                      <TableCell className="text-sm">{item.is_active ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditReview(item)}
                            className="w-full sm:w-auto"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setDeleteId(item.id);
                              setDeleteType("review");
                            }}
                            className="w-full sm:w-auto"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="w-[95vw] max-w-md mx-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg md:text-xl">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm md:text-base">
              This action cannot be undone. This will permanently delete this item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel 
              onClick={() => {
                setDeleteId(null);
                setDeleteType("");
              }}
              className="w-full sm:w-auto"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading} className="w-full sm:w-auto">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
