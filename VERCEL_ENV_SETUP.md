# Vercel Environment Variables Setup

## 🚀 Your Project Has Been Deployed!

**Project URL**: https://ecoo-1lcre852t-veras-projects-4f24ffbd.vercel.app
**Dashboard**: https://vercel.com/veras-projects-4f24ffbd/ecoo

---

## ⚠️ IMPORTANT: Add Environment Variables

Your deployment needs environment variables to work properly. Follow these steps:

### Step 1: Go to Vercel Dashboard

1. Visit: https://vercel.com/veras-projects-4f24ffbd/ecoo
2. Click on **Settings** tab
3. Click on **Environment Variables** in the left sidebar

### Step 2: Add These Environment Variables

Add each variable below. For each one:
- Click **"Add New"**
- Enter the **Name** (left column)
- Enter the **Value** (right column)
- Select **Production**, **Preview**, and **Development**
- Click **Save**

---

## 📋 Required Environment Variables

### 1. Supabase Configuration

Get these from your Supabase dashboard: https://app.supabase.com/project/_/settings/api

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://your-project-id.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: your_anon_key_from_supabase

Name: SUPABASE_SERVICE_ROLE_KEY
Value: your_service_role_key_from_supabase
```

### 2. Razorpay Configuration

Get these from: https://dashboard.razorpay.com/app/keys

**For Testing (use Test Mode keys):**
```
Name: RAZORPAY_KEY_ID
Value: rzp_test_xxxxxxxxxxxxx

Name: RAZORPAY_KEY_SECRET  
Value: your_test_secret_here

Name: NEXT_PUBLIC_RAZORPAY_KEY_ID
Value: rzp_test_xxxxxxxxxxxxx
```

**For Production (use Live Mode keys):**
```
Name: RAZORPAY_KEY_ID
Value: rzp_live_xxxxxxxxxxxxx

Name: RAZORPAY_KEY_SECRET
Value: your_live_secret_here

Name: NEXT_PUBLIC_RAZORPAY_KEY_ID
Value: rzp_live_xxxxxxxxxxxxx
```

### 3. Resend Email Configuration

Get API key from: https://resend.com/api-keys

```
Name: RESEND_API_KEY
Value: re_xxxxxxxxxxxxxxxxxxxxx

Name: ADMIN_EMAIL
Value: noreply@yourdomain.com
```

### 4. Site Configuration

```
Name: NEXT_PUBLIC_SITE_URL
Value: https://ecoo-1lcre852t-veras-projects-4f24ffbd.vercel.app
(Update this to your custom domain later)

Name: WEBHOOK_SECRET
Value: (generate with: openssl rand -base64 32)
Example: kJ8YHzN9mP3xQwR5tV7uZ2aB4cD6eF8g

Name: ENCRYPTION_KEY
Value: (generate with: openssl rand -base64 32)
Example: nQ2sT4vW6yX8zA1bC3dE5fG7hJ9kL0mN
```

---

## 🔐 How to Generate Secure Keys

Open PowerShell or Command Prompt and run:

### For Windows PowerShell:
```powershell
# Generate WEBHOOK_SECRET
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# Generate ENCRYPTION_KEY
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### For Git Bash / Linux / Mac:
```bash
# Generate WEBHOOK_SECRET
openssl rand -base64 32

# Generate ENCRYPTION_KEY
openssl rand -base64 32
```

---

## 🔄 Step 3: Redeploy After Adding Variables

After adding ALL environment variables:

1. Go to **Deployments** tab in Vercel
2. Click the **three dots (...)** on the latest deployment
3. Click **Redeploy**
4. Select **Use existing Build Cache** (optional)
5. Click **Redeploy**

OR run this command:

```bash
cd D:\Krishna\ecoo
vercel --prod
```

---

## ✅ Quick Start Checklist

- [ ] Create Supabase project (if not done)
- [ ] Get Supabase URL and keys
- [ ] Create Razorpay account
- [ ] Get Razorpay test keys
- [ ] Create Resend account
- [ ] Get Resend API key
- [ ] Generate WEBHOOK_SECRET and ENCRYPTION_KEY
- [ ] Add ALL environment variables to Vercel
- [ ] Redeploy the project
- [ ] Test the deployment

---

## 🎯 What's Next?

After redeploying with environment variables:

1. **Set up Supabase database**
   - Run migrations in your Supabase project
   - Upload the SQL files from `supabase/migrations/` folder

2. **Test your site**
   - Visit your Vercel URL
   - Test product pages
   - Test checkout (with Razorpay test mode)

3. **Configure custom domain** (optional)
   - Go to Vercel Settings > Domains
   - Add your custom domain

4. **Set up Razorpay webhook**
   - Go to Razorpay Dashboard > Webhooks
   - Add webhook URL: `https://your-domain.vercel.app/api/webhooks/razorpay`
   - Select events: `payment.captured`, `payment.failed`

---

## 📞 Need Help?

If you encounter issues:

1. Check Vercel deployment logs
2. Check browser console for errors  
3. Verify all environment variables are set correctly
4. Make sure Supabase database is set up

---

## 🔗 Important Links

- **Vercel Dashboard**: https://vercel.com/veras-projects-4f24ffbd/ecoo
- **Supabase Dashboard**: https://app.supabase.com
- **Razorpay Dashboard**: https://dashboard.razorpay.com
- **Resend Dashboard**: https://resend.com/overview

---

**Good luck with your deployment! 🚀**
