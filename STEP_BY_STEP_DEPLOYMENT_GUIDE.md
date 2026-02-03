# Complete Step-by-Step Deployment Guide

## 🎯 Objective
Deploy your e-commerce platform from development to production in a systematic, error-free manner.

**Estimated Time**: 2-4 hours for first-time deployment

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] GitHub account
- [ ] Vercel account (sign up at vercel.com)
- [ ] Supabase account (sign up at supabase.com)
- [ ] Razorpay account (sign up at razorpay.com)
- [ ] Resend account (sign up at resend.com)
- [ ] Custom domain (optional but recommended)
- [ ] Git installed on your computer
- [ ] Node.js 20+ installed
- [ ] Code editor (VS Code recommended)

---

## Phase 1: Prepare Your Code (30 minutes)

### Step 1.1: Verify Local Application Works

```bash
# Navigate to your project
cd D:\Krishna\ecoo

# Install dependencies
npm install

# Create local environment file
cp .env.example .env.local
# If .env.example doesn't exist, create .env.local manually
```

**Create `.env.local` with:**
```env
NEXT_PUBLIC_SUPABASE_URL=your_local_or_dev_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_local_or_dev_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_local_or_dev_service_key
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=test_secret_xxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxx
RESEND_API_KEY=re_test_xxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=admin@localhost
WEBHOOK_SECRET=local_test_secret
```

**Run the application:**
```bash
npm run dev
```

**Test these pages:**
- [ ] Homepage: http://localhost:3000
- [ ] Products: http://localhost:3000/products
- [ ] Cart: http://localhost:3000/cart
- [ ] Login: http://localhost:3000/login
- [ ] Admin: http://localhost:3000/admin (after login)

If everything works, proceed to next step. If not, fix issues first.

### Step 1.2: Run Tests

```bash
# Run linter
npm run lint

# If you have tests, run them
npm run test

# Build the application to check for build errors
npm run build
```

**Fix any errors before proceeding.**

### Step 1.3: Clean Up Code

```bash
# Remove any console.log statements
# Search in VS Code: Ctrl+Shift+F
# Search for: console.log

# Remove any TODO comments or mark them
# Remove any test/debug code
# Remove unused imports
```

**Checklist:**
- [ ] No console.log in production code
- [ ] No hardcoded secrets or API keys
- [ ] All imports are used
- [ ] No commented-out code blocks
- [ ] README.md is updated

### Step 1.4: Create .gitignore (if not exists)

Create/verify `.gitignore` contains:
```
# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage
*.lcov

# next.js
.next/
out/
build
dist

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env*.local
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# backups
backups/
*.sql
*.sql.gz
```

---

## Phase 2: Set Up Production Database (45 minutes)

### Step 2.1: Create Supabase Production Project

1. **Go to**: https://supabase.com/dashboard
2. **Click**: "New Project"
3. **Fill in**:
   - Name: `ecoo-production`
   - Database Password: [Generate strong password and SAVE IT]
   - Region: [Choose closest to your users]
   - Pricing Plan: Free (can upgrade later)
4. **Click**: "Create new project"
5. **Wait**: 2-3 minutes for project to initialize

**Save these values:**
```
Project URL: https://xxxxxxxxxxxxx.supabase.co
Project ID: xxxxxxxxxxxxx
API URL: https://xxxxxxxxxxxxx.supabase.co
anon/public key: eyJhbGc...
service_role key: eyJhbGc...
```

### Step 2.2: Apply Database Migrations

**Option A: Using Supabase Dashboard (Recommended)**

1. **Go to**: Supabase Dashboard → SQL Editor
2. **Click**: "New Query"

3. **Migration 1 - Initial Schema**:
   - Open: `D:\Krishna\ecoo\supabase\migrations\001_initial_schema.sql`
   - Copy entire content
   - Paste in SQL Editor
   - Click "Run"
   - **Verify**: Success message appears

4. **Migration 2 - RLS Policies**:
   - Open: `002_rls_policies.sql`
   - Copy and paste
   - Click "Run"
   - **Verify**: Success message

5. **Migration 3 - Addresses Table**:
   - Open: `003_add_addresses_table.sql`
   - Copy and paste
   - Click "Run"
   - **Verify**: Success message

6. **Migration 4 - Addresses RLS**:
   - Open: `004_addresses_rls_policies.sql`
   - Copy and paste
   - Click "Run"
   - **Verify**: Success message

7. **Migration 5 - Product Images Storage**:
   - Open: `005_product_images_storage_setup.sql`
   - Copy and paste
   - Click "Run"
   - **Verify**: Success message

8. **Migration 6 - Home Content Tables**:
   - Open: `006_home_content_tables.sql`
   - Copy and paste
   - Click "Run"
   - **Verify**: Success message

**Verify All Tables Created:**

Run this query:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

**You should see:**
- announcement_items
- addresses
- blogs
- cart_items
- categories
- certifications
- customer_reviews
- health_goals
- order_items
- orders
- product_images
- products
- profiles
- trust_badges
- why_choose_us

### Step 2.3: Set Up Storage Buckets

1. **Go to**: Storage → Buckets
2. **Create `product-images` bucket**:
   - Click "New Bucket"
   - Name: `product-images`
   - Public: ✅ Yes
   - Click "Create Bucket"

3. **Set Up Storage Policies**:
   - Click on `product-images` bucket
   - Go to "Policies" tab
   - Click "New Policy"
   - Select "For full customization"
   - Policy name: `Public read access`
   - Allowed operation: SELECT
   - Target roles: public
   - Policy definition:
   ```sql
   true
   ```
   - Click "Save"

4. **Add Upload Policy for Admin**:
   - Click "New Policy"
   - Policy name: `Admin upload access`
   - Allowed operation: INSERT
   - Target roles: authenticated
   - Policy definition:
   ```sql
   (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
   ```
   - Click "Save"

### Step 2.4: Seed Initial Data (Optional)

If you want to start with demo products:

1. **Go to**: SQL Editor
2. **Open**: `D:\Krishna\ecoo\supabase\seed.sql`
3. **Copy and paste** entire content
4. **Click**: "Run"

**Or seed Ayurvedic products:**
- Open: `seed_ayurvedic_products.sql`
- Copy, paste, and run

### Step 2.5: Verify Database Setup

Run these verification queries:

```sql
-- Check tables count
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public';
-- Should return at least 15

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
-- All should have rowsecurity = true

-- Check storage bucket
SELECT * FROM storage.buckets;
-- Should show product-images bucket

-- Check initial data (if seeded)
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM categories;
```

**Checklist:**
- [ ] All migration files applied successfully
- [ ] All tables created
- [ ] RLS enabled on all tables
- [ ] Storage bucket created
- [ ] Storage policies set
- [ ] Initial data seeded (optional)

---

## Phase 3: Set Up GitHub Repository (15 minutes)

### Step 3.1: Initialize Git Repository

```bash
# If not already initialized
cd D:\Krishna\ecoo
git init

# Check current status
git status
```

### Step 3.2: Create .env.example

Create `.env.example` file:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Resend
RESEND_API_KEY=your_resend_api_key

# App Configuration
NEXT_PUBLIC_SITE_URL=your_production_url
ADMIN_EMAIL=your_admin_email
WEBHOOK_SECRET=generate_random_string_min_32_chars
```

### Step 3.3: Create GitHub Repository

1. **Go to**: https://github.com/new
2. **Repository name**: `ecoo` (or your preferred name)
3. **Description**: E-commerce platform for natural products
4. **Visibility**: Private (recommended) or Public
5. **DO NOT** initialize with README, .gitignore, or license
6. **Click**: "Create repository"

### Step 3.4: Push Code to GitHub

```bash
# Add all files
git add .

# Create first commit
git commit -m "Initial commit: E-commerce platform ready for deployment"

# Add remote repository (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/ecoo.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Verify on GitHub:**
- [ ] All files uploaded
- [ ] No .env.local file visible (should be in .gitignore)
- [ ] README.md displays correctly

---

## Phase 4: Set Up Razorpay (20 minutes)

### Step 4.1: Create Razorpay Account

1. **Go to**: https://razorpay.com/
2. **Sign up** with business details
3. **Verify** email and phone
4. **Complete** KYC (may take 24-48 hours for live mode)

### Step 4.2: Get API Keys

**For Testing (Use first):**

1. **Go to**: Dashboard → Settings → API Keys
2. **Select**: Test Mode (toggle in top-left)
3. **Click**: "Generate Test Key"
4. **Save these values**:
   ```
   Key ID: rzp_test_xxxxxxxxxxxxx
   Key Secret: xxxxxxxxxxxxxxxxx
   ```

**For Production (After testing):**

1. **Complete** KYC verification
2. **Switch** to Live Mode
3. **Generate** Live Keys
4. **Save** separately

### Step 4.3: Configure Webhook (Later)

We'll configure this after deploying to Vercel (Step 6.4)

**Checklist:**
- [ ] Razorpay account created
- [ ] Test API keys obtained
- [ ] Keys saved securely

---

## Phase 5: Set Up Resend (15 minutes)

### Step 5.1: Create Resend Account

1. **Go to**: https://resend.com/
2. **Sign up** with email
3. **Verify** email address

### Step 5.2: Get API Key

1. **Go to**: Dashboard → API Keys
2. **Click**: "Create API Key"
3. **Name**: `ecoo-production`
4. **Permission**: Sending access
5. **Click**: "Create"
6. **Save the API key**: `re_xxxxxxxxxxxxx`

### Step 5.3: Add and Verify Domain

**For Production (Custom domain):**

1. **Go to**: Domains → Add Domain
2. **Enter**: `yourdomain.com`
3. **Add DNS Records**:
   - Copy the provided DNS records
   - Go to your domain registrar
   - Add TXT, MX, and CNAME records
   - Wait for verification (can take up to 72 hours)

**For Testing (Use Resend's domain):**

- You can send from `onboarding@resend.dev`
- Limited to 100 emails/day
- Good for initial testing

### Step 5.4: Test Email Sending

1. **Go to**: Emails → Send Test Email
2. **Enter** your email
3. **Send** test
4. **Verify** you receive it

**Checklist:**
- [ ] Resend account created
- [ ] API key obtained
- [ ] Domain added (or using test domain)
- [ ] Test email sent successfully

---

## Phase 6: Deploy to Vercel (30 minutes)

### Step 6.1: Create Vercel Account

1. **Go to**: https://vercel.com/signup
2. **Sign up** with GitHub
3. **Authorize** Vercel to access GitHub

### Step 6.2: Import Project

1. **Go to**: Dashboard → Add New → Project
2. **Select**: Import Git Repository
3. **Find**: Your `ecoo` repository
4. **Click**: Import

### Step 6.3: Configure Project

**Framework Preset**: Next.js (auto-detected)

**Root Directory**: `./`

**Build Settings**:
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**DO NOT** deploy yet!

### Step 6.4: Add Environment Variables

Click on "Environment Variables" and add:

#### 1. Supabase Variables
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: [Your Supabase URL from Step 2.1]
Environment: Production, Preview, Development
```

```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Your Supabase anon key]
Environment: Production, Preview, Development
```

```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: [Your Supabase service role key]
Environment: Production
⚠️ IMPORTANT: Only add to Production!
```

#### 2. Razorpay Variables (Test Mode First)
```
Name: RAZORPAY_KEY_ID
Value: rzp_test_xxxxxxxxxxxxx
Environment: Production
```

```
Name: RAZORPAY_KEY_SECRET
Value: [Your test secret]
Environment: Production
```

```
Name: NEXT_PUBLIC_RAZORPAY_KEY_ID
Value: rzp_test_xxxxxxxxxxxxx
Environment: Production, Preview, Development
```

#### 3. Resend Variable
```
Name: RESEND_API_KEY
Value: re_xxxxxxxxxxxxx
Environment: Production
```

#### 4. App Configuration
```
Name: NEXT_PUBLIC_SITE_URL
Value: https://your-project.vercel.app (will update after deploy)
Environment: Production
```

```
Name: ADMIN_EMAIL
Value: your-admin-email@gmail.com
Environment: Production
```

#### 5. Webhook Secret
```
Name: WEBHOOK_SECRET
Value: [Generate a random 32+ character string]
Environment: Production
```

**Generate webhook secret:**
```bash
# On Windows PowerShell
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).Guid + (New-Guid).Guid))

# Or use online generator
# Visit: https://randomkeygen.com/
# Use "CodeIgniter Encryption Keys" (256-bit)
```

### Step 6.5: Deploy!

1. **Click**: "Deploy"
2. **Wait**: 2-5 minutes for build
3. **Monitor**: Build logs for any errors

**If build fails:**
- Read error messages carefully
- Common issues:
  - Missing environment variables
  - TypeScript errors
  - Missing dependencies
- Fix issues and redeploy

**If build succeeds:**
- You'll get a URL like: `https://ecoo-xxxxx.vercel.app`
- **Save this URL**

### Step 6.6: Update Site URL

1. **Go to**: Project Settings → Environment Variables
2. **Find**: `NEXT_PUBLIC_SITE_URL`
3. **Edit** and update to your actual Vercel URL
4. **Save**
5. **Redeploy**: Deployments → Three dots → Redeploy

### Step 6.7: Configure Razorpay Webhook

1. **Go to**: Razorpay Dashboard → Settings → Webhooks
2. **Click**: "Add New Webhook"
3. **Webhook URL**: `https://your-vercel-url.vercel.app/api/webhooks/razorpay`
4. **Secret**: [Same as WEBHOOK_SECRET env var]
5. **Active Events**: Select these:
   - ✅ payment.authorized
   - ✅ payment.captured
   - ✅ payment.failed
   - ✅ refund.processed
6. **Click**: "Create Webhook"

### Step 6.8: Test Webhook

1. **Go to**: Razorpay Dashboard → Webhooks
2. **Click** on your webhook
3. **Click**: "Send Test Webhook"
4. **Check** Vercel logs:
   ```bash
   vercel logs --follow
   ```
5. **Verify**: No errors appear

**Checklist:**
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] All environment variables added
- [ ] First deployment successful
- [ ] Site URL updated
- [ ] Razorpay webhook configured
- [ ] Webhook tested successfully

---

## Phase 7: Configure Domain (Optional, 30 minutes)

### Step 7.1: Add Custom Domain

1. **Go to**: Vercel Project → Settings → Domains
2. **Click**: "Add"
3. **Enter**: `yourdomain.com`
4. **Click**: "Add"

### Step 7.2: Update DNS Records

**You'll need to add these DNS records at your domain registrar:**

**For apex domain (yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Common registrars:**
- **GoDaddy**: Domains → Manage → DNS Management
- **Namecheap**: Domain List → Manage → Advanced DNS
- **Cloudflare**: DNS → Add Record

### Step 7.3: Wait for DNS Propagation

- Usually takes 5-30 minutes
- Can take up to 48 hours in rare cases
- Check status at: https://dnschecker.org/

### Step 7.4: Enable SSL

Vercel automatically provisions SSL certificate:
- Usually ready in 1-2 minutes
- Check: Settings → Domains → SSL status

### Step 7.5: Update Environment Variables

1. **Go to**: Settings → Environment Variables
2. **Update**: `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com`
3. **Update**: Razorpay webhook URL to use new domain
4. **Redeploy**

**Checklist:**
- [ ] Custom domain added to Vercel
- [ ] DNS records updated at registrar
- [ ] Domain verified in Vercel
- [ ] SSL certificate active
- [ ] Environment variables updated
- [ ] Razorpay webhook URL updated

---

## Phase 8: Create Admin User (10 minutes)

### Step 8.1: Sign Up as Admin

1. **Go to**: `https://your-domain.com/signup`
2. **Use the email** specified in `ADMIN_EMAIL` environment variable
3. **Fill in** details:
   - Full Name: [Your name]
   - Email: [Same as ADMIN_EMAIL]
   - Password: [Strong password]
   - Phone: [Your phone]
4. **Click**: Sign Up
5. **Check email** for verification (if enabled)

### Step 8.2: Grant Admin Role

**The system should automatically grant admin role**, but verify:

1. **Go to**: Supabase Dashboard
2. **Navigate to**: Table Editor → profiles
3. **Find**: Your user profile
4. **Check**: `role` column should be `'admin'`

**If not admin, update manually:**

1. **Go to**: SQL Editor
2. **Run**:
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-admin-email@domain.com';
```
3. **Verify**:
```sql
SELECT id, full_name, email, role 
FROM profiles 
WHERE email = 'your-admin-email@domain.com';
```

### Step 8.3: Test Admin Access

1. **Go to**: `https://your-domain.com/login`
2. **Login** with admin credentials
3. **Navigate to**: `/admin`
4. **Verify**: You can access admin panel
5. **Check these sections**:
   - [ ] Dashboard
   - [ ] Products
   - [ ] Orders
   - [ ] Users
   - [ ] Categories
   - [ ] Home Content
   - [ ] Settings

---

## Phase 9: Post-Deployment Testing (45 minutes)

### Step 9.1: Critical Path Testing

#### Test 1: Browse Products
- [ ] Visit homepage
- [ ] Click "Products" or "Shop Now"
- [ ] Products display correctly
- [ ] Images load
- [ ] Prices show correctly
- [ ] Certifications badges visible

#### Test 2: Product Details
- [ ] Click on a product
- [ ] Product detail page loads
- [ ] Image gallery works
- [ ] "Add to Cart" button visible
- [ ] Product description shows

#### Test 3: Add to Cart
- [ ] Click "Add to Cart"
- [ ] Success message appears
- [ ] Cart count updates in header
- [ ] Click cart icon
- [ ] Product appears in cart
- [ ] Quantity can be changed
- [ ] Can remove item

#### Test 4: User Registration
- [ ] Go to /signup
- [ ] Enter valid details
- [ ] Click Sign Up
- [ ] Success message appears
- [ ] Email verification sent (check inbox)
- [ ] Can login after signup

#### Test 5: User Login
- [ ] Go to /login
- [ ] Enter credentials
- [ ] Click Login
- [ ] Redirects to homepage or dashboard
- [ ] User menu shows in header
- [ ] Can access account pages

#### Test 6: Checkout Process
- [ ] Add items to cart
- [ ] Go to cart
- [ ] Click "Proceed to Checkout"
- [ ] Fill in shipping address
- [ ] Click "Continue to Payment"
- [ ] Razorpay payment modal opens
- [ ] Can see test payment options

#### Test 7: Payment (Test Mode)
- [ ] Use Razorpay test card:
  - Card: 4111 1111 1111 1111
  - Expiry: Any future date
  - CVV: 123
- [ ] Click Pay
- [ ] Payment succeeds
- [ ] Order confirmation page shows
- [ ] Order appears in "My Orders"

#### Test 8: Email Notifications
- [ ] Check email after order
- [ ] Order confirmation received
- [ ] Email formatting correct
- [ ] Order details accurate

#### Test 9: Admin Panel
- [ ] Login as admin
- [ ] Go to /admin
- [ ] New order appears in orders list
- [ ] Can view order details
- [ ] Can update order status
- [ ] Can add/edit products
- [ ] Can manage categories
- [ ] Can update home content

#### Test 10: Mobile Responsiveness
- [ ] Open site on mobile browser
- [ ] Navigation menu works
- [ ] Products display properly
- [ ] Cart works on mobile
- [ ] Checkout works on mobile
- [ ] Payment works on mobile

### Step 9.2: Performance Testing

**Run Lighthouse Audit:**

1. Open site in Chrome
2. Press F12 (DevTools)
3. Go to "Lighthouse" tab
4. Select:
   - Mode: Navigation
   - Device: Mobile
   - Categories: All
5. Click "Analyze page load"

**Target Scores:**
- Performance: > 80
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

**If scores are low:**
- Check image optimization
- Review Core Web Vitals
- Optimize JavaScript bundles
- Enable caching

### Step 9.3: Security Testing

**Check Security Headers:**
```bash
curl -I https://your-domain.com
```

Should include:
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Strict-Transport-Security`

**Test Authentication:**
- [ ] Cannot access /admin without login
- [ ] Cannot access /account without login
- [ ] Cannot view others' orders
- [ ] Cannot modify others' data
- [ ] API routes are protected

**Test RLS Policies:**

Try to access data you shouldn't:
- Another user's order
- Another user's profile
- Admin-only data

All should return empty or error.

### Step 9.4: Error Handling

**Test error scenarios:**

- [ ] Visit non-existent page (404 should show)
- [ ] Try invalid login (error message shows)
- [ ] Try checkout without address (validation error)
- [ ] Try to add out-of-stock item (appropriate message)
- [ ] Try payment with invalid card (error handled)

### Step 9.5: Monitor Logs

**Check Vercel Logs:**
```bash
# Install Vercel CLI if not already
npm i -g vercel

# Login
vercel login

# View logs
vercel logs --follow
```

**Check for:**
- [ ] No 500 errors
- [ ] No database connection errors
- [ ] No payment errors
- [ ] No unhandled exceptions

**Check Supabase Logs:**
1. Go to Supabase Dashboard
2. Navigate to Logs
3. Check API logs
4. Look for:
   - Failed queries
   - Permission errors
   - Slow queries

**Checklist:**
- [ ] All critical paths tested
- [ ] Test payment successful
- [ ] Emails sending correctly
- [ ] Admin panel functional
- [ ] Mobile responsive
- [ ] Performance scores acceptable
- [ ] Security headers present
- [ ] Error handling works
- [ ] No errors in logs

---

## Phase 10: Switch to Production Mode (30 minutes)

⚠️ **Only do this after thorough testing in test mode!**

### Step 10.1: Complete Razorpay KYC

1. **Go to**: Razorpay Dashboard → Settings → Account
2. **Complete** KYC verification
3. **Submit** required documents
4. **Wait** for approval (1-3 business days)

### Step 10.2: Activate Live Mode

Once KYC approved:

1. **Go to**: Settings → API Keys
2. **Toggle** to "Live Mode"
3. **Click**: "Generate Live Key"
4. **Save**:
   - Live Key ID: `rzp_live_xxxxxxxxxxxxx`
   - Live Key Secret: `xxxxxxxxxxxxxxxxx`

### Step 10.3: Update Vercel Environment Variables

1. **Go to**: Vercel Project → Settings → Environment Variables

2. **Update RAZORPAY_KEY_ID**:
   - Edit variable
   - Replace with live key ID
   - Save

3. **Update RAZORPAY_KEY_SECRET**:
   - Edit variable
   - Replace with live key secret
   - Save

4. **Update NEXT_PUBLIC_RAZORPAY_KEY_ID**:
   - Edit variable
   - Replace with live key ID
   - Save

### Step 10.4: Update Razorpay Webhook

1. **Go to**: Razorpay Dashboard (Live Mode)
2. **Navigate to**: Settings → Webhooks
3. **Add webhook** for live mode:
   - URL: `https://your-domain.com/api/webhooks/razorpay`
   - Secret: [Same WEBHOOK_SECRET]
   - Events: Same as before
4. **Save**

### Step 10.5: Redeploy Application

1. **Go to**: Vercel Deployments
2. **Click**: Three dots on latest deployment
3. **Select**: "Redeploy"
4. **Wait** for deployment to complete

### Step 10.6: Test Live Payments

⚠️ **This will process real payments!**

**Test with small amount first:**

1. Create a test order
2. Use real payment method
3. Complete payment
4. **Verify**:
   - Payment captured in Razorpay dashboard
   - Order status updated
   - Webhook received
   - Email sent
5. **Refund** the test payment

**Checklist:**
- [ ] Razorpay KYC approved
- [ ] Live API keys generated
- [ ] Environment variables updated
- [ ] Webhook configured for live mode
- [ ] Application redeployed
- [ ] Test payment successful
- [ ] Webhook working in live mode

---

## Phase 11: Final Configuration (20 minutes)

### Step 11.1: Set Up Monitoring

**1. Enable Vercel Analytics:**
- Go to Project → Analytics
- Enable Analytics
- Enable Speed Insights

**2. Set Up Sentry (Optional but Recommended):**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Follow the wizard, then:
- Add `SENTRY_DSN` to Vercel environment variables
- Redeploy

**3. Set Up Uptime Monitoring:**
- Sign up at UptimeRobot.com (free)
- Add monitor:
  - Type: HTTPS
  - URL: `https://your-domain.com`
  - Interval: 5 minutes
  - Alert Contacts: Your email

### Step 11.2: Configure Backups

**Create backup script:**

Create `scripts/backup-db.sh`:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump YOUR_SUPABASE_DB_URL > backup_$DATE.sql
gzip backup_$DATE.sql
echo "Backup created: backup_$DATE.sql.gz"
```

**Schedule weekly backups:**
- Set up cron job or
- Use GitHub Actions or
- Use a backup service

### Step 11.3: Set Up Alerts

**Vercel Alerts:**
1. Go to Settings → Alerts
2. Enable:
   - Deployment Failed
   - Error Rate Spike
   - Downtime Detection

**Supabase Alerts:**
1. Go to Settings → Alerts
2. Enable:
   - Database Size Warning
   - Connection Limit Warning
   - API Request Spike

### Step 11.4: Document Access

Create a secure document with:

```
=== PRODUCTION ACCESS CREDENTIALS ===

Vercel:
- Email: xxx
- Team: xxx
- Project: xxx

Supabase:
- Email: xxx
- Organization: xxx
- Project ID: xxx
- Database URL: [secure location]

Razorpay:
- Email: xxx
- Account ID: xxx
- Live Keys: [secure location]

Resend:
- Email: xxx
- API Key: [secure location]

Domain Registrar:
- Provider: xxx
- Domain: xxx
- Login: [secure location]

Admin Access:
- Admin URL: https://your-domain.com/admin
- Admin Email: xxx
- Password: [secure location]
```

**Store securely** in:
- Password manager (1Password, LastPass)
- Encrypted document
- Team password vault

### Step 11.5: Create Runbook

Document common procedures:

**How to:**
- Restart/redeploy application
- Check logs
- Run database migrations
- Update environment variables
- Rollback deployment
- Handle payment issues
- Restore from backup

---

## Phase 12: Launch Preparation (15 minutes)

### Step 12.1: Final Checklist

**Technical:**
- [ ] All environment variables set correctly
- [ ] Database migrations applied
- [ ] RLS policies enabled
- [ ] Storage buckets configured
- [ ] SSL certificate active
- [ ] Custom domain working
- [ ] Live payments working
- [ ] Emails sending
- [ ] Admin panel accessible
- [ ] Backups configured
- [ ] Monitoring enabled
- [ ] Error tracking set up

**Content:**
- [ ] Products added
- [ ] Categories created
- [ ] Home page banners uploaded
- [ ] About page content added
- [ ] Policies pages filled
- [ ] Contact information correct
- [ ] Social media links added
- [ ] Footer information updated

**Legal:**
- [ ] Privacy Policy published
- [ ] Terms & Conditions published
- [ ] Refund Policy published
- [ ] Shipping Policy published
- [ ] Cancellation Policy published

**Testing:**
- [ ] All user flows tested
- [ ] Payment processing verified
- [ ] Email notifications working
- [ ] Mobile responsiveness checked
- [ ] Browser compatibility tested
- [ ] Performance benchmarks met
- [ ] Security audit passed

### Step 12.2: Create Launch Announcement

Prepare announcements for:
- Email subscribers (if any)
- Social media
- Press release (if applicable)
- Blog post about launch

### Step 12.3: Prepare Support

Set up:
- [ ] Support email (support@yourdomain.com)
- [ ] FAQ page
- [ ] Contact form
- [ ] WhatsApp business number
- [ ] Response templates for common questions

---

## Phase 13: Go Live! (5 minutes)

### Step 13.1: Final Verification

**One last check:**
1. Visit your site
2. Complete a test order (if not already done)
3. Check admin panel
4. Verify emails are sending
5. Check all pages load correctly

### Step 13.2: Launch

**You're ready to go live!**

1. **Remove any "Coming Soon" pages**
2. **Enable public access**
3. **Start accepting orders**
4. **Monitor closely for first 24 hours**

### Step 13.3: Post-Launch Monitoring (First 24 Hours)

**Monitor these metrics:**
- Site uptime (should be 100%)
- Error rates (should be < 1%)
- Payment success rate (should be > 95%)
- Page load times (should be < 3s)
- User registrations
- Order completion rate

**Check hourly:**
- Vercel deployment status
- Error logs
- Payment dashboard
- Email delivery
- User feedback

---

## Phase 14: Post-Launch Tasks (First Week)

### Day 1-2: Close Monitoring
- Check logs every 2-3 hours
- Respond to user feedback
- Fix any critical issues immediately
- Monitor payment processing
- Check email deliverability

### Day 3-5: Optimization
- Review performance metrics
- Optimize slow queries
- Improve page load times
- Add missing content
- Fix UI issues

### Day 6-7: Analysis
- Review user behavior
- Analyze conversion rates
- Check bounce rates
- Identify bottlenecks
- Plan improvements

### Week 2-4: Iteration
- Implement user feedback
- Add requested features
- Improve user experience
- Optimize for SEO
- Scale infrastructure if needed

---

## 🎉 Congratulations!

Your e-commerce platform is now live and running in production!

---

## 📞 Troubleshooting Guide

### Issue: Build Fails on Vercel

**Error**: `Module not found`
```bash
# Solution
npm install
npm run build  # Test locally first
# Check package.json for missing dependencies
```

**Error**: `TypeScript errors`
```bash
# Solution
npm run lint
# Fix all TypeScript errors before deploying
```

**Error**: `Environment variable not defined`
```
# Solution
- Double-check all environment variables in Vercel
- Ensure they're set for correct environment (Production)
- Redeploy after adding variables
```

### Issue: Database Connection Failed

**Symptoms**: 500 errors, "Connection refused"

**Solutions**:
1. Check Supabase URL is correct
2. Verify API keys are valid
3. Check RLS policies allow access
4. Verify project is not paused (free tier)

```sql
-- Test database connection
SELECT NOW();

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'products';
```

### Issue: Payments Not Working

**Test Mode Issues:**
- Verify using test API keys
- Check webhook URL is correct
- Verify webhook secret matches
- Use test card: 4111 1111 1111 1111

**Live Mode Issues:**
- Confirm KYC is approved
- Verify live keys are set
- Check webhook is configured for live mode
- Verify business is activated

**Debug webhook:**
```bash
# Check webhook logs in Razorpay dashboard
# Check Vercel logs
vercel logs --follow

# Test webhook manually in Razorpay dashboard
```

### Issue: Emails Not Sending

**Check:**
1. Resend API key is correct
2. Domain is verified (for custom domain)
3. Email limits not exceeded
4. From email is correct format

**Test email:**
```typescript
// Create test API route: app/api/test-email/route.ts
import { sendEmail } from '@/lib/email/resend';

export async function GET() {
  try {
    await sendEmail({
      to: 'your-email@domain.com',
      subject: 'Test Email',
      html: '<p>Test email from production</p>',
    });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

Visit: `https://your-domain.com/api/test-email`

### Issue: Images Not Loading

**Check:**
1. Storage bucket is public
2. Storage policies allow read access
3. Image URLs are correct
4. Files actually uploaded

**Test:**
```
Visit: https://your-project-id.supabase.co/storage/v1/object/public/product-images/test.jpg

Should show image, not error
```

### Issue: 404 on All Pages

**Possible causes:**
- Build failed
- Deployment incomplete
- Routing configuration wrong

**Solution:**
1. Check Vercel deployment status
2. Review build logs
3. Test locally: `npm run build && npm start`
4. Redeploy

### Issue: Cannot Access Admin Panel

**Check:**
1. User role is 'admin' in database
2. Middleware is protecting routes correctly
3. Authentication is working

**Fix role:**
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-admin@domain.com';
```

### Issue: High Response Times

**Optimize:**
1. Add database indexes
2. Enable caching
3. Optimize images
4. Use React Query properly
5. Check for N+1 queries

**Monitor:**
```sql
-- Find slow queries
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

---

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Razorpay Docs](https://razorpay.com/docs)
- [Resend Docs](https://resend.com/docs)

### Support
- Vercel Support: support@vercel.com
- Supabase Support: support@supabase.com
- Razorpay Support: support@razorpay.com

### Tools
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html)
- [DNS Checker](https://dnschecker.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [GTmetrix](https://gtmetrix.com/)
- [Webhook.site](https://webhook.site/) (for testing webhooks)

---

## 📝 Notes

**Keep track of:**
- Deployment dates
- Issues encountered
- Solutions implemented
- Performance metrics
- User feedback

**Update this guide:**
- After each deployment
- When encountering new issues
- When finding better solutions
- When tools/services update

---

**Last Updated**: February 3, 2026
**Version**: 1.0.0
**Next Review**: [After first deployment]

---

## ✅ Deployment Complete!

Once you've completed all phases, your e-commerce platform is:
- ✅ Live and accessible
- ✅ Secure and protected
- ✅ Processing payments
- ✅ Sending emails
- ✅ Monitored and backed up
- ✅ Ready for customers

**Now focus on:**
- Marketing your store
- Adding more products
- Gathering customer feedback
- Optimizing conversion rates
- Growing your business

**Good luck with your e-commerce venture! 🚀**
