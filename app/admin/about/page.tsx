"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
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
import { 
  Loader2, 
  Save, 
  Plus, 
  Pencil, 
  Trash2,
  BookOpen,
  Award,
  Users,
  MapPin,
  TrendingUp
} from "lucide-react";

// Types
interface AboutContent {
  id: string;
  section_key: string;
  content: any;
  is_active: boolean;
}

interface AboutStat {
  id: string;
  icon: string;
  value: string;
  label: string;
  display_order: number;
  is_active: boolean;
}

interface AboutValue {
  id: string;
  icon: string;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

interface AboutCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  timing: string;
  image: string;
  services: string[];
  display_order: number;
  is_active: boolean;
}

interface AboutAchievement {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

interface AboutTeam {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  display_order: number;
  is_active: boolean;
}

export default function AdminAboutPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<string>("");

  // Hero Section
  const [heroContent, setHeroContent] = useState({
    title: "",
    description: "",
    features: [] as string[],
  });
  const [heroId, setHeroId] = useState<string | null>(null);

  // Story Section
  const [storyContent, setStoryContent] = useState({
    title: "",
    image: "",
    paragraphs: [] as string[],
  });
  const [storyId, setStoryId] = useState<string | null>(null);

  // CTA Section
  const [ctaContent, setCtaContent] = useState({
    title: "",
    description: "",
    buttons: [] as { text: string; link: string }[],
  });
  const [ctaId, setCtaId] = useState<string | null>(null);

  // Stats
  const [stats, setStats] = useState<AboutStat[]>([]);
  const [statForm, setStatForm] = useState<Partial<AboutStat>>({
    icon: "",
    value: "",
    label: "",
    display_order: 0,
    is_active: true,
  });
  const [editingStatId, setEditingStatId] = useState<string | null>(null);

  // Values
  const [values, setValues] = useState<AboutValue[]>([]);
  const [valueForm, setValueForm] = useState<Partial<AboutValue>>({
    icon: "",
    title: "",
    description: "",
    display_order: 0,
    is_active: true,
  });
  const [editingValueId, setEditingValueId] = useState<string | null>(null);

  // Centers
  const [centers, setCenters] = useState<AboutCenter[]>([]);
  const [centerForm, setCenterForm] = useState<Partial<AboutCenter>>({
    name: "",
    address: "",
    phone: "",
    timing: "",
    image: "",
    services: [],
    display_order: 0,
    is_active: true,
  });
  const [editingCenterId, setEditingCenterId] = useState<string | null>(null);
  const [serviceInput, setServiceInput] = useState("");

  // Achievements
  const [achievements, setAchievements] = useState<AboutAchievement[]>([]);
  const [achievementForm, setAchievementForm] = useState<Partial<AboutAchievement>>({
    year: "",
    title: "",
    description: "",
    icon: "",
    display_order: 0,
    is_active: true,
  });
  const [editingAchievementId, setEditingAchievementId] = useState<string | null>(null);

  // Team
  const [team, setTeam] = useState<AboutTeam[]>([]);
  const [teamForm, setTeamForm] = useState<Partial<AboutTeam>>({
    name: "",
    role: "",
    image: "",
    experience: "",
    display_order: 0,
    is_active: true,
  });
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchContent(),
      fetchStats(),
      fetchValues(),
      fetchCenters(),
      fetchAchievements(),
      fetchTeam(),
    ]);
    setLoading(false);
  };

  const fetchContent = async () => {
    const { data } = await supabase.from("about_content").select("*");
    if (data) {
      data.forEach((item) => {
        if (item.section_key === "hero") {
          setHeroContent(item.content);
          setHeroId(item.id);
        } else if (item.section_key === "story") {
          setStoryContent(item.content);
          setStoryId(item.id);
        } else if (item.section_key === "cta") {
          setCtaContent(item.content);
          setCtaId(item.id);
        }
      });
    }
  };

  const fetchStats = async () => {
    const { data } = await supabase.from("about_stats").select("*").order("display_order");
    if (data) setStats(data);
  };

  const fetchValues = async () => {
    const { data } = await supabase.from("about_values").select("*").order("display_order");
    if (data) setValues(data);
  };

  const fetchCenters = async () => {
    const { data } = await supabase.from("about_centers").select("*").order("display_order");
    if (data) setCenters(data);
  };

  const fetchAchievements = async () => {
    const { data } = await supabase.from("about_achievements").select("*").order("display_order");
    if (data) setAchievements(data);
  };

  const fetchTeam = async () => {
    const { data } = await supabase.from("about_team").select("*").order("display_order");
    if (data) setTeam(data);
  };

  // Hero Section Handlers
  const handleSaveHero = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("about_content")
        .upsert({
          id: heroId,
          section_key: "hero",
          content: heroContent,
          is_active: true,
          updated_at: new Date().toISOString(),
        });
      if (error) throw error;
      toast.success("Hero section updated successfully");
      fetchContent();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  // Story Section Handlers
  const handleSaveStory = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("about_content")
        .upsert({
          id: storyId,
          section_key: "story",
          content: storyContent,
          is_active: true,
          updated_at: new Date().toISOString(),
        });
      if (error) throw error;
      toast.success("Story section updated successfully");
      fetchContent();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  // CTA Section Handlers
  const handleSaveCTA = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("about_content")
        .upsert({
          id: ctaId,
          section_key: "cta",
          content: ctaContent,
          is_active: true,
          updated_at: new Date().toISOString(),
        });
      if (error) throw error;
      toast.success("CTA section updated successfully");
      fetchContent();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  // Stats Handlers
  const handleSaveStat = async () => {
    setSaving(true);
    try {
      if (editingStatId) {
        const { error } = await supabase
          .from("about_stats")
          .update(statForm)
          .eq("id", editingStatId);
        if (error) throw error;
        toast.success("Stat updated successfully");
      } else {
        const { error } = await supabase.from("about_stats").insert(statForm);
        if (error) throw error;
        toast.success("Stat created successfully");
      }
      setStatForm({ icon: "", value: "", label: "", display_order: 0, is_active: true });
      setEditingStatId(null);
      fetchStats();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStat = async () => {
    if (!deleteId) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("about_stats").delete().eq("id", deleteId);
      if (error) throw error;
      toast.success("Stat deleted successfully");
      fetchStats();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
      setDeleteId(null);
      setDeleteType("");
    }
  };

  // Values Handlers
  const handleSaveValue = async () => {
    setSaving(true);
    try {
      if (editingValueId) {
        const { error } = await supabase
          .from("about_values")
          .update(valueForm)
          .eq("id", editingValueId);
        if (error) throw error;
        toast.success("Value updated successfully");
      } else {
        const { error } = await supabase.from("about_values").insert(valueForm);
        if (error) throw error;
        toast.success("Value created successfully");
      }
      setValueForm({ icon: "", title: "", description: "", display_order: 0, is_active: true });
      setEditingValueId(null);
      fetchValues();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteValue = async () => {
    if (!deleteId) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("about_values").delete().eq("id", deleteId);
      if (error) throw error;
      toast.success("Value deleted successfully");
      fetchValues();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
      setDeleteId(null);
      setDeleteType("");
    }
  };

  // Centers Handlers
  const handleSaveCenter = async () => {
    setSaving(true);
    try {
      if (editingCenterId) {
        const { error } = await supabase
          .from("about_centers")
          .update(centerForm)
          .eq("id", editingCenterId);
        if (error) throw error;
        toast.success("Center updated successfully");
      } else {
        const { error } = await supabase.from("about_centers").insert(centerForm);
        if (error) throw error;
        toast.success("Center created successfully");
      }
      setCenterForm({
        name: "",
        address: "",
        phone: "",
        timing: "",
        image: "",
        services: [],
        display_order: 0,
        is_active: true,
      });
      setEditingCenterId(null);
      fetchCenters();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCenter = async () => {
    if (!deleteId) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("about_centers").delete().eq("id", deleteId);
      if (error) throw error;
      toast.success("Center deleted successfully");
      fetchCenters();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
      setDeleteId(null);
      setDeleteType("");
    }
  };

  // Achievements Handlers
  const handleSaveAchievement = async () => {
    setSaving(true);
    try {
      if (editingAchievementId) {
        const { error } = await supabase
          .from("about_achievements")
          .update(achievementForm)
          .eq("id", editingAchievementId);
        if (error) throw error;
        toast.success("Achievement updated successfully");
      } else {
        const { error } = await supabase.from("about_achievements").insert(achievementForm);
        if (error) throw error;
        toast.success("Achievement created successfully");
      }
      setAchievementForm({
        year: "",
        title: "",
        description: "",
        icon: "",
        display_order: 0,
        is_active: true,
      });
      setEditingAchievementId(null);
      fetchAchievements();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAchievement = async () => {
    if (!deleteId) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("about_achievements").delete().eq("id", deleteId);
      if (error) throw error;
      toast.success("Achievement deleted successfully");
      fetchAchievements();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
      setDeleteId(null);
      setDeleteType("");
    }
  };

  // Team Handlers
  const handleSaveTeam = async () => {
    setSaving(true);
    try {
      if (editingTeamId) {
        const { error } = await supabase
          .from("about_team")
          .update(teamForm)
          .eq("id", editingTeamId);
        if (error) throw error;
        toast.success("Team member updated successfully");
      } else {
        const { error } = await supabase.from("about_team").insert(teamForm);
        if (error) throw error;
        toast.success("Team member created successfully");
      }
      setTeamForm({
        name: "",
        role: "",
        image: "",
        experience: "",
        display_order: 0,
        is_active: true,
      });
      setEditingTeamId(null);
      fetchTeam();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTeam = async () => {
    if (!deleteId) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("about_team").delete().eq("id", deleteId);
      if (error) throw error;
      toast.success("Team member deleted successfully");
      fetchTeam();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
      setDeleteId(null);
      setDeleteType("");
    }
  };

  const handleDelete = () => {
    switch (deleteType) {
      case "stat":
        handleDeleteStat();
        break;
      case "value":
        handleDeleteValue();
        break;
      case "center":
        handleDeleteCenter();
        break;
      case "achievement":
        handleDeleteAchievement();
        break;
      case "team":
        handleDeleteTeam();
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Page Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage all content displayed on the About page
        </p>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-8">
          <TabsTrigger value="hero">
            <BookOpen className="h-4 w-4 mr-2" />
            Hero
          </TabsTrigger>
          <TabsTrigger value="story">Story</TabsTrigger>
          <TabsTrigger value="stats">
            <TrendingUp className="h-4 w-4 mr-2" />
            Stats
          </TabsTrigger>
          <TabsTrigger value="values">Values</TabsTrigger>
          <TabsTrigger value="centers">
            <MapPin className="h-4 w-4 mr-2" />
            Centers
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Award className="h-4 w-4 mr-2" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="h-4 w-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="cta">CTA</TabsTrigger>
        </TabsList>

        {/* Hero Tab */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Manage the main hero section content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                  placeholder="Bringing Ancient Ayurvedic Wisdom to Modern Lives"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={heroContent.description}
                  onChange={(e) =>
                    setHeroContent({ ...heroContent, description: e.target.value })
                  }
                  rows={4}
                  placeholder="For over 25 years, Ayukrriti Ayurveda has been dedicated..."
                />
              </div>
              <div className="space-y-2">
                <Label>Features (one per line)</Label>
                <Textarea
                  value={heroContent.features.join("\n")}
                  onChange={(e) =>
                    setHeroContent({
                      ...heroContent,
                      features: e.target.value.split("\n").filter((f) => f.trim()),
                    })
                  }
                  rows={3}
                  placeholder="100% Natural Products&#10;Expert Consultations&#10;Pan-India Delivery"
                />
              </div>
              <Button onClick={handleSaveHero} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Hero Section
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Story Tab */}
        <TabsContent value="story">
          <Card>
            <CardHeader>
              <CardTitle>Story Section</CardTitle>
              <CardDescription>Manage the company story content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={storyContent.title}
                  onChange={(e) => setStoryContent({ ...storyContent, title: e.target.value })}
                  placeholder="Our Story"
                />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={storyContent.image}
                  onChange={(e) => setStoryContent({ ...storyContent, image: e.target.value })}
                  placeholder="https://example.com/image.jpg (Direct image URL required)"
                />
                {storyContent.image && (
                  <>
                    {storyContent.image.includes("photos.app.goo.gl") && (
                      <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded border border-amber-200 mt-2">
                        ⚠️ Google Photos shared links won't work. Please get the direct image URL:
                        <br />
                        1. Open the image in Google Photos
                        <br />
                        2. Right-click → "Copy image address" or "Open image in new tab"
                        <br />
                        3. Copy the direct URL (should end with .jpg, .png, etc.)
                      </p>
                    )}
                    <div className="relative w-full h-40 rounded border overflow-hidden bg-muted mt-2">
                      <img
                        src={storyContent.image}
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
                  </>
                )}
              </div>
              <div className="space-y-2">
                <Label>Paragraphs (one per line, leave empty line for separation)</Label>
                <Textarea
                  value={storyContent.paragraphs.join("\n\n")}
                  onChange={(e) =>
                    setStoryContent({
                      ...storyContent,
                      paragraphs: e.target.value.split("\n\n").filter((p) => p.trim()),
                    })
                  }
                  rows={8}
                  placeholder="Ayukrriti Ayurveda was founded in 1999...&#10;&#10;What started as a small clinic..."
                />
              </div>
              <Button onClick={handleSaveStory} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Story Section
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{editingStatId ? "Edit" : "Add"} Stat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon Name (Lucide)</Label>
                  <Input
                    value={statForm.icon}
                    onChange={(e) => setStatForm({ ...statForm, icon: e.target.value })}
                    placeholder="Users, Leaf, Award, Heart"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input
                    value={statForm.value}
                    onChange={(e) => setStatForm({ ...statForm, value: e.target.value })}
                    placeholder="50,000+"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Label</Label>
                  <Input
                    value={statForm.label}
                    onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                    placeholder="Happy Customers"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={statForm.display_order}
                    onChange={(e) =>
                      setStatForm({ ...statForm, display_order: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={statForm.is_active}
                    onCheckedChange={(checked) => setStatForm({ ...statForm, is_active: checked })}
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveStat} disabled={saving}>
                  {editingStatId ? "Update" : "Create"}
                </Button>
                {editingStatId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStatForm({
                        icon: "",
                        value: "",
                        label: "",
                        display_order: 0,
                        is_active: true,
                      });
                      setEditingStatId(null);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stats List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Icon</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.icon}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>{item.label}</TableCell>
                      <TableCell>{item.display_order}</TableCell>
                      <TableCell>{item.is_active ? "Yes" : "No"}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setStatForm(item);
                            setEditingStatId(item.id);
                          }}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setDeleteId(item.id);
                            setDeleteType("stat");
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Values Tab */}
        <TabsContent value="values" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{editingValueId ? "Edit" : "Add"} Value</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon Name (Lucide)</Label>
                  <Input
                    value={valueForm.icon}
                    onChange={(e) => setValueForm({ ...valueForm, icon: e.target.value })}
                    placeholder="Leaf, Shield, Target, Heart"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={valueForm.title}
                    onChange={(e) => setValueForm({ ...valueForm, title: e.target.value })}
                    placeholder="100% Natural"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={valueForm.description}
                    onChange={(e) => setValueForm({ ...valueForm, description: e.target.value })}
                    rows={3}
                    placeholder="All our products are made from pure, natural ingredients..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={valueForm.display_order}
                    onChange={(e) =>
                      setValueForm({ ...valueForm, display_order: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={valueForm.is_active}
                    onCheckedChange={(checked) =>
                      setValueForm({ ...valueForm, is_active: checked })
                    }
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveValue} disabled={saving}>
                  {editingValueId ? "Update" : "Create"}
                </Button>
                {editingValueId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setValueForm({
                        icon: "",
                        title: "",
                        description: "",
                        display_order: 0,
                        is_active: true,
                      });
                      setEditingValueId(null);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Values List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Icon</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {values.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.icon}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                      <TableCell>{item.display_order}</TableCell>
                      <TableCell>{item.is_active ? "Yes" : "No"}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setValueForm(item);
                            setEditingValueId(item.id);
                          }}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setDeleteId(item.id);
                            setDeleteType("value");
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Centers Tab */}
        <TabsContent value="centers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{editingCenterId ? "Edit" : "Add"} Center</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>Name</Label>
                  <Input
                    value={centerForm.name}
                    onChange={(e) => setCenterForm({ ...centerForm, name: e.target.value })}
                    placeholder="Ayukrriti Ayurveda - Delhi Main Center"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Address</Label>
                  <Textarea
                    value={centerForm.address}
                    onChange={(e) => setCenterForm({ ...centerForm, address: e.target.value })}
                    rows={2}
                    placeholder="A-12, Green Park Extension, New Delhi - 110016"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={centerForm.phone}
                    onChange={(e) => setCenterForm({ ...centerForm, phone: e.target.value })}
                    placeholder="+91 11 2634 5678"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Timing</Label>
                  <Input
                    value={centerForm.timing}
                    onChange={(e) => setCenterForm({ ...centerForm, timing: e.target.value })}
                    placeholder="Mon - Sat: 9:00 AM - 8:00 PM"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Image URL</Label>
                  <Input
                    value={centerForm.image}
                    onChange={(e) => setCenterForm({ ...centerForm, image: e.target.value })}
                    placeholder="https://example.com/image.jpg (Direct image URL required)"
                  />
                  {centerForm.image && (
                    <>
                      {centerForm.image.includes("photos.app.goo.gl") && (
                        <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded border border-amber-200 mt-2">
                          ⚠️ Google Photos shared links won't work. Please get the direct image URL:
                          <br />
                          1. Open the image in Google Photos
                          <br />
                          2. Right-click → "Copy image address" or "Open image in new tab"
                          <br />
                          3. Copy the direct URL (should end with .jpg, .png, etc.)
                        </p>
                      )}
                      <div className="relative w-full h-40 rounded border overflow-hidden bg-muted mt-2">
                        <img
                          src={centerForm.image}
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
                    </>
                  )}
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Services</Label>
                  <div className="flex gap-2">
                    <Input
                      value={serviceInput}
                      onChange={(e) => setServiceInput(e.target.value)}
                      placeholder="Add a service"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && serviceInput.trim()) {
                          setCenterForm({
                            ...centerForm,
                            services: [...(centerForm.services || []), serviceInput.trim()],
                          });
                          setServiceInput("");
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (serviceInput.trim()) {
                          setCenterForm({
                            ...centerForm,
                            services: [...(centerForm.services || []), serviceInput.trim()],
                          });
                          setServiceInput("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {centerForm.services?.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2"
                      >
                        {service}
                        <button
                          onClick={() =>
                            setCenterForm({
                              ...centerForm,
                              services: centerForm.services?.filter((_, i) => i !== index) || [],
                            })
                          }
                          className="hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={centerForm.display_order}
                    onChange={(e) =>
                      setCenterForm({ ...centerForm, display_order: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={centerForm.is_active}
                    onCheckedChange={(checked) =>
                      setCenterForm({ ...centerForm, is_active: checked })
                    }
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveCenter} disabled={saving}>
                  {editingCenterId ? "Update" : "Create"}
                </Button>
                {editingCenterId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCenterForm({
                        name: "",
                        address: "",
                        phone: "",
                        timing: "",
                        image: "",
                        services: [],
                        display_order: 0,
                        is_active: true,
                      });
                      setEditingCenterId(null);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Centers List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {centers.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.services.join(", ")}</TableCell>
                      <TableCell>{item.display_order}</TableCell>
                      <TableCell>{item.is_active ? "Yes" : "No"}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setCenterForm(item);
                            setEditingCenterId(item.id);
                          }}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setDeleteId(item.id);
                            setDeleteType("center");
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{editingAchievementId ? "Edit" : "Add"} Achievement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    value={achievementForm.year}
                    onChange={(e) => setAchievementForm({ ...achievementForm, year: e.target.value })}
                    placeholder="2024"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon Name (Lucide)</Label>
                  <Input
                    value={achievementForm.icon}
                    onChange={(e) => setAchievementForm({ ...achievementForm, icon: e.target.value })}
                    placeholder="Award, CheckCircle, Users, Shield"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Title</Label>
                  <Input
                    value={achievementForm.title}
                    onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
                    placeholder="Best Ayurvedic Brand Award"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={achievementForm.description}
                    onChange={(e) =>
                      setAchievementForm({ ...achievementForm, description: e.target.value })
                    }
                    rows={2}
                    placeholder="Recognized as the Best Ayurvedic Brand..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={achievementForm.display_order}
                    onChange={(e) =>
                      setAchievementForm({
                        ...achievementForm,
                        display_order: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={achievementForm.is_active}
                    onCheckedChange={(checked) =>
                      setAchievementForm({ ...achievementForm, is_active: checked })
                    }
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveAchievement} disabled={saving}>
                  {editingAchievementId ? "Update" : "Create"}
                </Button>
                {editingAchievementId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAchievementForm({
                        year: "",
                        title: "",
                        description: "",
                        icon: "",
                        display_order: 0,
                        is_active: true,
                      });
                      setEditingAchievementId(null);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {achievements.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.year}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.icon}</TableCell>
                      <TableCell>{item.display_order}</TableCell>
                      <TableCell>{item.is_active ? "Yes" : "No"}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setAchievementForm(item);
                            setEditingAchievementId(item.id);
                          }}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setDeleteId(item.id);
                            setDeleteType("achievement");
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{editingTeamId ? "Edit" : "Add"} Team Member</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={teamForm.name}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    placeholder="Dr. Ramesh Sharma"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={teamForm.role}
                    onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                    placeholder="Founder & Chief Ayurvedic Physician"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Image URL</Label>
                  <Input
                    value={teamForm.image}
                    onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                    placeholder="https://example.com/image.jpg (Direct image URL required)"
                  />
                  {teamForm.image && (
                    <>
                      {teamForm.image.includes("photos.app.goo.gl") && (
                        <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded border border-amber-200 mt-2">
                          ⚠️ Google Photos shared links won't work. Please get the direct image URL:
                          <br />
                          1. Open the image in Google Photos
                          <br />
                          2. Right-click → "Copy image address" or "Open image in new tab"
                          <br />
                          3. Copy the direct URL (should end with .jpg, .png, etc.)
                        </p>
                      )}
                      <div className="relative w-32 h-32 rounded-full border overflow-hidden bg-muted mt-2">
                        <img
                          src={teamForm.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="flex items-center justify-center h-full text-red-500 text-xs">Image failed to load</div>';
                            }
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Experience</Label>
                  <Input
                    value={teamForm.experience}
                    onChange={(e) => setTeamForm({ ...teamForm, experience: e.target.value })}
                    placeholder="30+ years"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={teamForm.display_order}
                    onChange={(e) =>
                      setTeamForm({ ...teamForm, display_order: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={teamForm.is_active}
                    onCheckedChange={(checked) => setTeamForm({ ...teamForm, is_active: checked })}
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveTeam} disabled={saving}>
                  {editingTeamId ? "Update" : "Create"}
                </Button>
                {editingTeamId && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTeamForm({
                        name: "",
                        role: "",
                        image: "",
                        experience: "",
                        display_order: 0,
                        is_active: true,
                      });
                      setEditingTeamId(null);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.role}</TableCell>
                      <TableCell>{item.experience}</TableCell>
                      <TableCell>{item.display_order}</TableCell>
                      <TableCell>{item.is_active ? "Yes" : "No"}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setTeamForm(item);
                            setEditingTeamId(item.id);
                          }}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setDeleteId(item.id);
                            setDeleteType("team");
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CTA Tab */}
        <TabsContent value="cta">
          <Card>
            <CardHeader>
              <CardTitle>Call-to-Action Section</CardTitle>
              <CardDescription>Manage the bottom CTA section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={ctaContent.title}
                  onChange={(e) => setCtaContent({ ...ctaContent, title: e.target.value })}
                  placeholder="Start Your Wellness Journey Today"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={ctaContent.description}
                  onChange={(e) => setCtaContent({ ...ctaContent, description: e.target.value })}
                  rows={3}
                  placeholder="Experience the power of authentic Ayurveda..."
                />
              </div>
              <div className="space-y-2">
                <Label>Button 1 Text</Label>
                <Input
                  value={ctaContent.buttons[0]?.text || ""}
                  onChange={(e) => {
                    const newButtons = [...ctaContent.buttons];
                    newButtons[0] = { ...newButtons[0], text: e.target.value };
                    setCtaContent({ ...ctaContent, buttons: newButtons });
                  }}
                  placeholder="Book Free Consultation"
                />
              </div>
              <div className="space-y-2">
                <Label>Button 1 Link</Label>
                <Input
                  value={ctaContent.buttons[0]?.link || ""}
                  onChange={(e) => {
                    const newButtons = [...ctaContent.buttons];
                    newButtons[0] = { ...newButtons[0], link: e.target.value };
                    setCtaContent({ ...ctaContent, buttons: newButtons });
                  }}
                  placeholder="/contact"
                />
              </div>
              <div className="space-y-2">
                <Label>Button 2 Text</Label>
                <Input
                  value={ctaContent.buttons[1]?.text || ""}
                  onChange={(e) => {
                    const newButtons = [...ctaContent.buttons];
                    newButtons[1] = { ...newButtons[1], text: e.target.value };
                    setCtaContent({ ...ctaContent, buttons: newButtons });
                  }}
                  placeholder="Explore Products"
                />
              </div>
              <div className="space-y-2">
                <Label>Button 2 Link</Label>
                <Input
                  value={ctaContent.buttons[1]?.link || ""}
                  onChange={(e) => {
                    const newButtons = [...ctaContent.buttons];
                    newButtons[1] = { ...newButtons[1], link: e.target.value };
                    setCtaContent({ ...ctaContent, buttons: newButtons });
                  }}
                  placeholder="/products"
                />
              </div>
              <Button onClick={handleSaveCTA} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save CTA Section
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDeleteId(null);
                setDeleteType("");
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={saving}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
