"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin,
  DollarSign,
  Truck,
  Settings as SettingsIcon,
  Save,
  Loader2,
  CreditCard,
  Eye,
  EyeOff
} from "lucide-react";

interface SiteSettings {
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  whatsapp_number?: string;
  company_name?: string;
  company_description?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_pinterest?: string;
  social_youtube?: string;
  social_linkedin?: string;
  site_name?: string;
  currency?: string;
  currency_symbol?: string;
  tax_rate?: number;
  shipping_charges?: {
    flat_rate: number;
    free_shipping_threshold: number;
  };
  low_stock_threshold?: number;
  razorpay_key_id?: string;
  razorpay_key_secret?: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showKeyId, setShowKeyId] = useState(false);
  const [showKeySecret, setShowKeySecret] = useState(false);
  const [encryptKeys, setEncryptKeys] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");

      if (error) throw error;

      // Convert array of settings to object
      const settingsObj: SiteSettings = {};
      data?.forEach((setting: any) => {
        // For sensitive keys, show masked version but allow editing
        if (setting.key === 'razorpay_key_secret' && setting.value) {
          // Store actual value but will be masked in display
          settingsObj[setting.key as keyof SiteSettings] = setting.value;
        } else {
          settingsObj[setting.key as keyof SiteSettings] = setting.value;
        }
      });

      setSettings(settingsObj);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert(
          { 
            key, 
            value,
            updated_at: new Date().toISOString()
          } as any,
          { 
            onConflict: 'key',
            ignoreDuplicates: false 
          }
        );

      if (error) throw error;
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
      throw error;
    }
  };

  const handleSaveContactInfo = async () => {
    setSaving(true);
    try {
      await Promise.all([
        updateSetting("contact_email", settings.contact_email || ""),
        updateSetting("contact_phone", settings.contact_phone || ""),
        updateSetting("contact_address", settings.contact_address || ""),
        updateSetting("whatsapp_number", settings.whatsapp_number || ""),
      ]);
      toast.success("Contact information saved successfully!");
    } catch (error) {
      toast.error("Failed to save contact information");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCompanyInfo = async () => {
    setSaving(true);
    try {
      await Promise.all([
        updateSetting("company_name", settings.company_name || ""),
        updateSetting("company_description", settings.company_description || ""),
      ]);
      toast.success("Company information saved successfully!");
    } catch (error) {
      toast.error("Failed to save company information");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSocialMedia = async () => {
    setSaving(true);
    try {
      await Promise.all([
        updateSetting("social_facebook", settings.social_facebook || ""),
        updateSetting("social_instagram", settings.social_instagram || ""),
        updateSetting("social_pinterest", settings.social_pinterest || ""),
        updateSetting("social_youtube", settings.social_youtube || ""),
        updateSetting("social_linkedin", settings.social_linkedin || ""),
      ]);
      toast.success("Social media links saved successfully!");
    } catch (error) {
      toast.error("Failed to save social media links");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveGeneralSettings = async () => {
    setSaving(true);
    try {
      await Promise.all([
        updateSetting("site_name", settings.site_name || ""),
        updateSetting("currency", settings.currency || "USD"),
        updateSetting("currency_symbol", settings.currency_symbol || "$"),
        updateSetting("tax_rate", settings.tax_rate || 0),
        updateSetting("low_stock_threshold", settings.low_stock_threshold || 10),
      ]);
      toast.success("General settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save general settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveShippingSettings = async () => {
    setSaving(true);
    try {
      await updateSetting("shipping_charges", settings.shipping_charges || {
        flat_rate: 0,
        free_shipping_threshold: 0
      });
      toast.success("Shipping settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save shipping settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSavePaymentGateway = async () => {
    setSaving(true);
    try {
      if (!settings.razorpay_key_id || !settings.razorpay_key_secret) {
        toast.error("Please provide both Key ID and Key Secret");
        setSaving(false);
        return;
      }

      // Use the secure API endpoint to save credentials
      const response = await fetch("/api/admin/settings/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyId: settings.razorpay_key_id,
          keySecret: settings.razorpay_key_secret,
          encrypt: encryptKeys,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Payment gateway settings saved successfully!");
        toast.info("Please restart your server for changes to take effect.", {
          duration: 5000,
        });
      } else {
        throw new Error(data.error || "Failed to save settings");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save payment gateway settings");
    } finally {
      setSaving(false);
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
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your website's contact information, social media, and general settings
        </p>
      </div>

      <Tabs defaultValue="contact" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="contact">
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="company">
            <Building2 className="h-4 w-4 mr-2" />
            Company
          </TabsTrigger>
          <TabsTrigger value="social">
            <Instagram className="h-4 w-4 mr-2" />
            Social Media
          </TabsTrigger>
          <TabsTrigger value="general">
            <SettingsIcon className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="shipping">
            <Truck className="h-4 w-4 mr-2" />
            Shipping
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" />
            Payment
          </TabsTrigger>
        </TabsList>

        {/* Contact Information Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>
                Manage contact details displayed on your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contact_email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="contact_email"
                  type="email"
                  placeholder="info@example.com"
                  value={settings.contact_email || ""}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  placeholder="+91-9999999999"
                  value={settings.contact_phone || ""}
                  onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <Textarea
                  id="contact_address"
                  placeholder="Enter your complete address"
                  rows={4}
                  value={settings.contact_address || ""}
                  onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp_number">
                  WhatsApp Number (with country code, no + or spaces)
                </Label>
                <Input
                  id="whatsapp_number"
                  type="tel"
                  placeholder="919876543210"
                  value={settings.whatsapp_number || ""}
                  onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  Example: 919876543210 (for India). This will be used for WhatsApp chat button.
                </p>
              </div>

              <Button 
                onClick={handleSaveContactInfo} 
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Contact Information
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Information Tab */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>
                Manage your company details and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company_name">
                  Company Name
                </Label>
                <Input
                  id="company_name"
                  placeholder="Your Company Name"
                  value={settings.company_name || ""}
                  onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_description">
                  Company Description
                </Label>
                <Textarea
                  id="company_description"
                  placeholder="Brief description about your company"
                  rows={5}
                  value={settings.company_description || ""}
                  onChange={(e) => setSettings({ ...settings, company_description: e.target.value })}
                />
              </div>

              <Button 
                onClick={handleSaveCompanyInfo} 
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Company Information
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="h-5 w-5" />
                Social Media Links
              </CardTitle>
              <CardDescription>
                Add your social media profile URLs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="social_facebook" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Label>
                <Input
                  id="social_facebook"
                  type="url"
                  placeholder="https://facebook.com/yourpage"
                  value={settings.social_facebook || ""}
                  onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Label>
                <Input
                  id="social_instagram"
                  type="url"
                  placeholder="https://instagram.com/yourprofile"
                  value={settings.social_instagram || ""}
                  onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_pinterest" className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                  Pinterest
                </Label>
                <Input
                  id="social_pinterest"
                  type="url"
                  placeholder="https://pinterest.com/yourprofile"
                  value={settings.social_pinterest || ""}
                  onChange={(e) => setSettings({ ...settings, social_pinterest: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_youtube" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  YouTube
                </Label>
                <Input
                  id="social_youtube"
                  type="url"
                  placeholder="https://youtube.com/@yourchannel"
                  value={settings.social_youtube || ""}
                  onChange={(e) => setSettings({ ...settings, social_youtube: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_linkedin" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Label>
                <Input
                  id="social_linkedin"
                  type="url"
                  placeholder="https://linkedin.com/company/yourcompany"
                  value={settings.social_linkedin || ""}
                  onChange={(e) => setSettings({ ...settings, social_linkedin: e.target.value })}
                />
              </div>

              <Button 
                onClick={handleSaveSocialMedia} 
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Social Media Links
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure basic site settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site_name">
                  Site Name
                </Label>
                <Input
                  id="site_name"
                  placeholder="Your Site Name"
                  value={settings.site_name || ""}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">
                    Currency Code
                  </Label>
                  <Input
                    id="currency"
                    placeholder="USD, INR, EUR, etc."
                    value={settings.currency || ""}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency_symbol">
                    Currency Symbol
                  </Label>
                  <Input
                    id="currency_symbol"
                    placeholder="$, ₹, €, etc."
                    value={settings.currency_symbol || ""}
                    onChange={(e) => setSettings({ ...settings, currency_symbol: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tax_rate">
                    Tax Rate (%)
                  </Label>
                  <Input
                    id="tax_rate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="8"
                    value={settings.tax_rate || 0}
                    onChange={(e) => setSettings({ ...settings, tax_rate: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="low_stock_threshold">
                    Low Stock Threshold
                  </Label>
                  <Input
                    id="low_stock_threshold"
                    type="number"
                    min="0"
                    placeholder="10"
                    value={settings.low_stock_threshold || 10}
                    onChange={(e) => setSettings({ ...settings, low_stock_threshold: parseInt(e.target.value) || 10 })}
                  />
                </div>
              </div>

              <Button 
                onClick={handleSaveGeneralSettings} 
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save General Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Settings Tab */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Settings
              </CardTitle>
              <CardDescription>
                Configure shipping rates and policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="flat_rate">
                  Flat Shipping Rate ({settings.currency_symbol || "$"})
                </Label>
                <Input
                  id="flat_rate"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="10.00"
                  value={settings.shipping_charges?.flat_rate || 0}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    shipping_charges: {
                      ...settings.shipping_charges,
                      flat_rate: parseFloat(e.target.value) || 0,
                      free_shipping_threshold: settings.shipping_charges?.free_shipping_threshold || 0
                    }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="free_shipping_threshold">
                  Free Shipping Threshold ({settings.currency_symbol || "$"})
                </Label>
                <Input
                  id="free_shipping_threshold"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="100.00"
                  value={settings.shipping_charges?.free_shipping_threshold || 0}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    shipping_charges: {
                      flat_rate: settings.shipping_charges?.flat_rate || 0,
                      free_shipping_threshold: parseFloat(e.target.value) || 0
                    }
                  })}
                />
                <p className="text-sm text-muted-foreground">
                  Orders above this amount will have free shipping
                </p>
              </div>

              <Button 
                onClick={handleSaveShippingSettings} 
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Shipping Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Gateway Tab */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Gateway
              </CardTitle>
              <CardDescription>
                Configure Razorpay payment gateway credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> After saving these credentials, you must update your environment variables 
                  (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET) and restart your server for the changes to take effect.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="razorpay_key_id">
                  Razorpay Key ID
                </Label>
                <div className="relative">
                  <Input
                    id="razorpay_key_id"
                    type={showKeyId ? "text" : "password"}
                    placeholder="rzp_test_xxxxxxxxxxxxx or rzp_live_xxxxxxxxxxxxx"
                    value={settings.razorpay_key_id || ""}
                    onChange={(e) => setSettings({ ...settings, razorpay_key_id: e.target.value })}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeyId(!showKeyId)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showKeyId ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get your Razorpay Key ID from the{" "}
                  <a 
                    href="https://dashboard.razorpay.com/app/website-app-settings/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Razorpay Dashboard
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="razorpay_key_secret">
                  Razorpay Key Secret
                </Label>
                <div className="relative">
                  <Input
                    id="razorpay_key_secret"
                    type={showKeySecret ? "text" : "password"}
                    placeholder="Enter your Razorpay key secret"
                    value={settings.razorpay_key_secret || ""}
                    onChange={(e) => setSettings({ ...settings, razorpay_key_secret: e.target.value })}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeySecret(!showKeySecret)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showKeySecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Keep this secret secure. Never share it publicly.
                </p>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <Label htmlFor="encryptKeys" className="cursor-pointer text-sm font-medium">
                  Encrypt credentials in database (Recommended)
                </Label>
                <Switch
                  id="encryptKeys"
                  checked={encryptKeys}
                  onCheckedChange={setEncryptKeys}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Environment Variables Setup</h4>
                <p className="text-sm text-blue-800 mb-3">
                  After saving, add these to your .env.local file:
                </p>
                <div className="bg-blue-900 text-blue-100 rounded p-3 font-mono text-xs space-y-1">
                  <div>RAZORPAY_KEY_ID={settings.razorpay_key_id || "your_key_id"}</div>
                  <div>RAZORPAY_KEY_SECRET={settings.razorpay_key_secret || "your_key_secret"}</div>
                </div>
              </div>

              <Button 
                onClick={handleSavePaymentGateway} 
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Payment Gateway Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
