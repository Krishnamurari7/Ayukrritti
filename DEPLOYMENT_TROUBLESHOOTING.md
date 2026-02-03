# 🔧 Deployment Troubleshooting Guide

Complete guide to diagnose and fix common deployment issues.

---

## Table of Contents

1. [Build & Deployment Issues](#build--deployment-issues)
2. [Database Connection Issues](#database-connection-issues)
3. [Payment Integration Issues](#payment-integration-issues)
4. [Email Service Issues](#email-service-issues)
5. [Authentication Issues](#authentication-issues)
6. [Performance Issues](#performance-issues)
7. [Image & Storage Issues](#image--storage-issues)
8. [Networking & DNS Issues](#networking--dns-issues)
9. [Security & Access Issues](#security--access-issues)
10. [Production-Specific Issues](#production-specific-issues)

---

## Build & Deployment Issues

### Issue: Vercel Build Fails

#### Symptom: Build fails during deployment

**Common Errors:**

#### Error 1: "Module not found"
```
Error: Cannot find module '@/components/SomeComponent'
```

**Solutions:**
```bash
# 1. Check if the file exists locally
# 2. Verify import path is correct (case-sensitive on Linux)
# 3. Check if file is in .gitignore accidentally
# 4. Ensure file is committed to Git

# Fix:
git add path/to/missing/file.tsx
git commit -m "Add missing file"
git push

# Or fix import path:
# Change: import Component from '@/components/component'
# To: import Component from '@/components/Component'
```

#### Error 2: "TypeScript compilation failed"
```
Type error: Property 'xyz' does not exist on type 'ABC'
```

**Solutions:**
```bash
# 1. Run type check locally
npm run build

# 2. Fix TypeScript errors
# 3. If you need to bypass temporarily (NOT RECOMMENDED):
# In tsconfig.json, add:
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}

# Better: Fix the actual type errors
```

#### Error 3: "Environment variable not defined"
```
Error: NEXT_PUBLIC_SUPABASE_URL is not defined
```

**Solutions:**
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Add the missing variable
4. Select correct environment (Production/Preview/Development)
5. Redeploy

```bash
# Or using Vercel CLI:
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Enter the value when prompted
vercel --prod
```

#### Error 4: "Out of memory"
```
JavaScript heap out of memory
```

**Solutions:**
1. In Vercel, this usually auto-scales
2. If persists, add to `package.json`:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

3. Or optimize your build:
   - Remove unused dependencies
   - Optimize large packages
   - Use dynamic imports

#### Error 5: "Command 'npm run build' exited with 1"

**Diagnostic Steps:**
```bash
# Test locally
npm run build

# Check for:
- ESLint errors
- TypeScript errors
- Missing dependencies
- Circular dependencies

# Fix errors and retry
```

---

## Database Connection Issues

### Issue: Cannot Connect to Supabase

#### Symptom: "Connection refused" or "Database connection failed"

**Diagnostic Steps:**

```bash
# Test 1: Check if Supabase project is active
# Go to Supabase Dashboard → ensure project is not paused

# Test 2: Verify connection string
curl https://YOUR_PROJECT_ID.supabase.co/rest/v1/

# Should return: {"message":"The resource you are looking for could not be found"}
# If timeout or connection refused, check URL
```

**Solutions:**

1. **Verify Environment Variables:**
```bash
# In Vercel, check these are set:
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Common mistakes:
- Extra spaces before/after URL
- Wrong project URL
- Mixing dev and production URLs
- Using service role key on client side
```

2. **Check Supabase Status:**
   - Visit: https://status.supabase.com/
   - Check for ongoing incidents

3. **Verify API Keys:**
```sql
-- In Supabase SQL Editor
SELECT current_setting('request.jwt.claim.sub', true);

-- Should return user ID or null, not error
```

### Issue: RLS Policies Blocking Queries

#### Symptom: Queries return empty even though data exists

**Diagnostic:**
```sql
-- Test in Supabase SQL Editor
-- Turn off RLS temporarily to test
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Run your query
SELECT * FROM products LIMIT 5;

-- If this returns data, RLS is the issue
-- Re-enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
```

**Solutions:**

1. **Check existing policies:**
```sql
SELECT 
  schemaname, tablename, policyname, 
  permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'products';
```

2. **Common RLS issues:**

```sql
-- Issue: Public can't read products
-- Fix: Add read policy
CREATE POLICY "Public can view active products"
ON products FOR SELECT
USING (is_active = true);

-- Issue: Users can't insert cart items
-- Fix: Add insert policy
CREATE POLICY "Authenticated users can add to cart"
ON cart_items FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Issue: Admin can't manage products
-- Fix: Add admin policy
CREATE POLICY "Admin full access"
ON products FOR ALL
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
```

### Issue: Connection Pool Exhausted

#### Symptom: "Sorry, too many clients already"

**Solutions:**

1. **Use Supabase Connection Pooler:**
```typescript
// Instead of direct connection, use pooler
// Connection string format:
// postgres://[USER]:[PASSWORD]@[HOST]:6543/postgres

// In .env:
DATABASE_URL=postgres://postgres:[password]@db.[project].supabase.co:6543/postgres
```

2. **Close connections properly:**
```typescript
// Good: Connection closes after query
const { data } = await supabase.from('products').select();

// Bad: Long-lived connections in serverless
const client = createClient();
// ... long operation ...
// Connection never closes
```

3. **Reduce concurrent connections:**
   - Optimize queries to run faster
   - Use caching to reduce database calls
   - Consider upgrading Supabase plan

---

## Payment Integration Issues

### Issue: Razorpay Payment Modal Not Opening

#### Symptom: Nothing happens when clicking "Pay Now"

**Diagnostic:**
```javascript
// Check browser console for errors
// Common errors:
// 1. "Razorpay is not defined"
// 2. "Invalid key"
// 3. "CORS error"
```

**Solutions:**

1. **Check Razorpay script loaded:**
```typescript
// In app/layout.tsx or checkout page
<Script src="https://checkout.razorpay.com/v1/checkout.js" />

// Verify it loads:
// Open DevTools → Network → Filter "checkout.js"
// Should show 200 status
```

2. **Verify API Key:**
```typescript
// Check NEXT_PUBLIC_RAZORPAY_KEY_ID
// In browser console:
console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

// Should show: rzp_test_xxxx or rzp_live_xxxx
// If undefined, key not set correctly
```

3. **Check CORS:**
```typescript
// Verify domain is allowed in Razorpay Dashboard
// Go to: Settings → API Keys → Webhook/API Details
// Add your domain to allowed origins
```

### Issue: Payment Success but Order Not Created

#### Symptom: Payment completes, but order doesn't appear

**Diagnostic Steps:**

1. **Check Razorpay Dashboard:**
   - Go to Transactions
   - Find the payment
   - Check status: "captured" or "authorized"
   - Note payment ID

2. **Check Webhook Logs:**
```bash
# View Vercel logs
vercel logs --follow

# Filter for webhook
vercel logs | grep "webhooks/razorpay"
```

3. **Check webhook delivery in Razorpay:**
   - Settings → Webhooks
   - Click on webhook
   - View "Webhook Logs"
   - Check for failed deliveries

**Solutions:**

1. **Verify webhook URL:**
```
Should be: https://your-domain.com/api/webhooks/razorpay
NOT: http:// (must be https)
NOT: localhost
NOT: vercel.app preview URL (use production)
```

2. **Verify webhook secret:**
```bash
# Check in Vercel:
WEBHOOK_SECRET=[value]

# Must match Razorpay webhook secret exactly
```

3. **Check webhook signature verification:**
```typescript
// In app/api/webhooks/razorpay/route.ts
// Add logging:
console.log('Received webhook:', event);
console.log('Signature:', receivedSignature);
console.log('Expected:', expectedSignature);

// If signatures don't match:
// 1. Verify secret matches
// 2. Check body is raw (not parsed)
```

4. **Manual order creation test:**
```sql
-- Test creating order manually in Supabase
INSERT INTO orders (
  user_id, 
  total_amount, 
  status, 
  payment_id
) VALUES (
  'user-uuid',
  1000,
  'pending',
  'test_payment_id'
);

-- If this fails, check table structure
```

### Issue: Test Payments Work, Live Payments Fail

#### Symptom: Test mode works, live mode fails

**Checklist:**

- [ ] KYC approved in Razorpay
- [ ] Account activated for live payments
- [ ] Live API keys generated
- [ ] Environment variables updated to live keys
- [ ] Webhook configured for live mode
- [ ] Using real card (not test card)
- [ ] Payment amount ≥ ₹1

**Solutions:**

1. **Verify live mode active:**
```typescript
// In browser console
console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
// Should start with: rzp_live_
// If starts with rzp_test_, live keys not deployed
```

2. **Check Razorpay account status:**
   - Dashboard → Account → Status
   - Should show "Activated"
   - If "Pending KYC", wait for approval

3. **Test with Razorpay test cards in live mode:**
```
Card: 4111 1111 1111 1111
CVV: 123
Expiry: Any future date

Note: This only works in TEST mode
Live mode needs real cards
```

---

## Email Service Issues

### Issue: Emails Not Sending

#### Symptom: Orders complete but no confirmation email

**Diagnostic Steps:**

1. **Check Resend Dashboard:**
   - Go to Resend → Emails
   - Check for sent/failed emails
   - Review error messages

2. **Test API key:**
```bash
# Test with curl
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "onboarding@resend.dev",
    "to": "your-email@example.com",
    "subject": "Test",
    "html": "<p>Test email</p>"
  }'

# Should return: {"id":"..."}
# If error, API key is invalid
```

**Solutions:**

1. **Verify API key in Vercel:**
```bash
# Check environment variable
RESEND_API_KEY=re_xxxxxxxxxxxx

# Should start with: re_
```

2. **Check email format:**
```typescript
// Correct format
{
  from: 'Your Store <noreply@yourdomain.com>',
  to: 'customer@example.com',
  subject: 'Order Confirmation',
  html: '<p>Your order...</p>'
}

// Wrong formats:
from: 'noreply@yourdomain.com' // Missing name
to: ['email1', 'email2'] // Resend expects single string for 'to'
html: undefined // Must have html or text
```

3. **Check domain verification:**
   - If using custom domain
   - Go to Resend → Domains
   - Status should be "Verified"
   - If "Pending", check DNS records

4. **Check email limits:**
   - Free tier: 100 emails/day
   - If exceeded, upgrade plan

### Issue: Emails Going to Spam

**Solutions:**

1. **Verify domain (SPF, DKIM, DMARC):**
```
# Check DNS records are set:
TXT @ v=spf1 include:_spf.resend.com ~all
TXT resend._domainkey [DKIM value from Resend]
TXT _dmarc v=DMARC1; p=none
```

2. **Improve email content:**
   - Use plain text + HTML version
   - Avoid spam trigger words
   - Include unsubscribe link
   - Use real from address

3. **Warm up domain:**
   - Start with low volume
   - Gradually increase sending
   - Monitor spam complaints

---

## Authentication Issues

### Issue: Cannot Sign Up / Login

#### Symptom: "Invalid credentials" or signup fails

**Diagnostic:**

```sql
-- Check Supabase auth users
SELECT 
  id, email, created_at, 
  email_confirmed_at, 
  last_sign_in_at 
FROM auth.users 
WHERE email = 'user@example.com';
```

**Solutions:**

1. **Email confirmation required:**
```typescript
// Check Supabase settings
// Dashboard → Authentication → Settings
// Email Auth → Enable email confirmations

// If disabled, users can login immediately
// If enabled, they must click confirmation link
```

2. **Password too weak:**
```typescript
// Minimum requirements (default):
- At least 6 characters
- Can customize in Supabase settings

// Check error message in response
```

3. **User already exists:**
```sql
-- Check if user exists
SELECT * FROM auth.users WHERE email = 'user@example.com';

-- If exists, user should use "Forgot Password"
```

4. **Rate limiting:**
```typescript
// Supabase has built-in rate limiting
// If too many attempts:
// Error: "Email rate limit exceeded"

// Solution: Wait 60 seconds and retry
```

### Issue: Admin Panel Not Accessible

#### Symptom: Redirected from /admin or "Access Denied"

**Solutions:**

1. **Verify admin role:**
```sql
-- Check user role
SELECT id, email, role 
FROM profiles 
WHERE email = 'your-admin@example.com';

-- If role is NULL or 'customer', update:
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-admin@example.com';
```

2. **Check middleware:**
```typescript
// In middleware.ts
// Verify admin routes are protected:
if (pathname.startsWith('/admin')) {
  // Should check user role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (profile?.role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

3. **Session expired:**
```typescript
// User needs to login again
// Clear cookies and re-login
```

### Issue: "User Not Authorized" for API Routes

**Solutions:**

1. **Check authorization header:**
```typescript
// In API route
const token = request.headers.get('authorization')?.split(' ')[1];

// Should be: Bearer eyJhbGc...

// If missing, client not sending token
```

2. **Verify token:**
```typescript
import { createClient } from '@/lib/supabase/server';

const supabase = createClient();
const { data: { user }, error } = await supabase.auth.getUser();

if (error || !user) {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}
```

---

## Performance Issues

### Issue: Slow Page Load Times

#### Symptom: Pages take >3 seconds to load

**Diagnostic:**

1. **Run Lighthouse Audit:**
   - Open DevTools (F12)
   - Go to Lighthouse tab
   - Run audit
   - Review suggestions

2. **Check Core Web Vitals:**
   - LCP (Largest Contentful Paint): Should be < 2.5s
   - FID (First Input Delay): Should be < 100ms
   - CLS (Cumulative Layout Shift): Should be < 0.1

**Solutions:**

1. **Optimize images:**
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/product.jpg"
  alt="Product"
  width={400}
  height={400}
  loading="lazy"
  placeholder="blur"
/>

// Or optimize existing images:
- Convert to WebP
- Compress (use tinypng.com)
- Use appropriate sizes
- Lazy load below fold
```

2. **Reduce JavaScript bundle:**
```bash
# Analyze bundle
npm run build
# Check .next/analyze/

# Solutions:
- Remove unused dependencies
- Use dynamic imports
- Code split large components
```

3. **Add caching:**
```typescript
// In API routes
return Response.json(data, {
  headers: {
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
  }
});
```

4. **Optimize database queries:**
```sql
-- Add indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);

-- Use appropriate SELECT
-- Instead of: SELECT *
-- Use: SELECT id, name, price, image_url
```

### Issue: High Database Query Times

**Diagnostic:**

```sql
-- Find slow queries
SELECT 
  query,
  mean_exec_time,
  calls,
  total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

**Solutions:**

1. **Add indexes:**
```sql
-- Find missing indexes
SELECT 
  schemaname, tablename, attname
FROM pg_stats
WHERE schemaname = 'public'
  AND n_distinct < -0.01
  AND null_frac < 0.1
ORDER BY tablename;

-- Add indexes for frequently queried columns
```

2. **Optimize N+1 queries:**
```typescript
// Bad: N+1 query
const orders = await supabase.from('orders').select();
for (const order of orders) {
  const items = await supabase
    .from('order_items')
    .select()
    .eq('order_id', order.id);
}

// Good: Single query with join
const orders = await supabase
  .from('orders')
  .select(`
    *,
    order_items(*)
  `);
```

---

## Image & Storage Issues

### Issue: Images Not Loading

#### Symptom: Broken image icons or 404 errors

**Diagnostic:**

```bash
# Test image URL directly
curl -I https://your-project.supabase.co/storage/v1/object/public/product-images/test.jpg

# Should return:
HTTP/2 200
# If 404, file doesn't exist
# If 403, permissions issue
```

**Solutions:**

1. **Verify bucket is public:**
```sql
-- Check bucket settings
SELECT * FROM storage.buckets WHERE name = 'product-images';

-- public column should be true
-- If false:
UPDATE storage.buckets 
SET public = true 
WHERE name = 'product-images';
```

2. **Check storage policies:**
```sql
-- View policies
SELECT * FROM storage.policies 
WHERE bucket_id = 'product-images';

-- Add read policy if missing:
CREATE POLICY "Public can read product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');
```

3. **Verify file uploaded:**
```sql
-- Check if file exists
SELECT name, bucket_id, created_at 
FROM storage.objects 
WHERE bucket_id = 'product-images'
AND name = 'your-image.jpg';
```

4. **Check file path in database:**
```sql
-- Verify product image URLs
SELECT id, name, image_url FROM products LIMIT 5;

-- Should be format:
-- https://xxx.supabase.co/storage/v1/object/public/product-images/image.jpg
```

### Issue: Image Upload Fails

**Solutions:**

1. **Check file size limits:**
```typescript
// Supabase default: 50MB
// Check in Dashboard → Storage → Settings

// Validate client-side:
if (file.size > 5 * 1024 * 1024) {
  throw new Error('File too large (max 5MB)');
}
```

2. **Check upload policy:**
```sql
-- Add upload policy for admin
CREATE POLICY "Admin can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
```

3. **Check file type:**
```typescript
// Validate file type
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
if (!allowedTypes.includes(file.type)) {
  throw new Error('Invalid file type');
}
```

---

## Networking & DNS Issues

### Issue: Domain Not Resolving

#### Symptom: "DNS_PROBE_FINISHED_NXDOMAIN"

**Diagnostic:**

```bash
# Check DNS propagation
# Use: https://dnschecker.org/
# Enter: yourdomain.com

# Or via command line:
nslookup yourdomain.com
dig yourdomain.com

# Should show Vercel IP: 76.76.21.21
```

**Solutions:**

1. **Wait for DNS propagation:**
   - Usually: 5-30 minutes
   - Maximum: 48 hours
   - Can't speed up, must wait

2. **Verify DNS records:**
```
# In your domain registrar:
Type: A
Name: @ (or blank)
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

3. **Check with DNS provider:**
   - Some registrars require additional steps
   - GoDaddy: Must disable "Domain Forwarding"
   - Cloudflare: Must proxy through Cloudflare

### Issue: SSL Certificate Not Working

#### Symptom: "Your connection is not private" or "NET::ERR_CERT_COMMON_NAME_INVALID"

**Solutions:**

1. **Wait for SSL provisioning:**
   - Vercel auto-provisions SSL
   - Takes 1-5 minutes after DNS resolves
   - Check status in Vercel → Domains

2. **Force SSL renewal:**
   - Remove domain from Vercel
   - Wait 5 minutes
   - Add domain again

3. **Check DNS is correct:**
   - SSL won't provision if DNS is wrong
   - Verify A record points to Vercel

---

## Security & Access Issues

### Issue: CORS Errors

#### Symptom: "Access-Control-Allow-Origin" errors in console

**Solutions:**

1. **For API routes:**
```typescript
// In route.ts
export async function POST(request: Request) {
  const response = Response.json(data);
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return response;
}

// Handle OPTIONS
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

2. **For Supabase:**
```typescript
// CORS is handled by Supabase
// Check allowed origins in Supabase Dashboard
// Settings → API → CORS Settings
```

### Issue: 429 Rate Limit Errors

**Solutions:**

1. **Implement exponential backoff:**
```typescript
async function fetchWithRetry(url: string, options: RequestInit, retries = 3) {
  try {
    const response = await fetch(url, options);
    if (response.status === 429 && retries > 0) {
      const delay = Math.pow(2, 3 - retries) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}
```

2. **Implement client-side caching:**
```typescript
// Use React Query
import { useQuery } from '@tanstack/react-query';

const { data } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
```

3. **Upgrade service plan:**
   - Supabase: Higher limits on Pro plan
   - Vercel: Higher limits on Pro plan

---

## Production-Specific Issues

### Issue: Works Locally, Fails in Production

**Common Causes:**

1. **Environment variables missing:**
```bash
# Check all env vars are set in Vercel
# And are in correct environment (Production)
```

2. **Case-sensitive file paths:**
```typescript
// Works on Windows (case-insensitive):
import Component from '@/components/component';

// Fails on Linux (case-sensitive):
// File is named Component.tsx
// Fix: Match exact case
import Component from '@/components/Component';
```

3. **Different Node versions:**
```json
// Specify Node version in package.json
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```

4. **Missing build output:**
```bash
# Ensure .next is built correctly
# Check .vercel/output/ folder exists

# Add to .gitignore:
.next/
.vercel/
```

### Issue: Intermittent Errors

**Solutions:**

1. **Check service status pages:**
   - Vercel: https://www.vercelstatus.com/
   - Supabase: https://status.supabase.com/
   - Razorpay: https://status.razorpay.com/

2. **Implement retry logic:**
```typescript
async function withRetry(fn: () => Promise<any>, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

3. **Add monitoring:**
   - Use Sentry for error tracking
   - Set up uptime monitoring
   - Configure alerts

---

## Emergency Procedures

### Critical Issue: Site Down

**Immediate Actions:**

1. **Check Vercel deployment status**
2. **View error logs:** `vercel logs --follow`
3. **Rollback if needed:** `vercel rollback`
4. **Check service status pages**
5. **Notify team**

### Critical Issue: Payment Issues

**Immediate Actions:**

1. **Enable maintenance mode**
2. **Check Razorpay dashboard**
3. **Verify webhook working**
4. **Check failed payments**
5. **Notify affected customers**

### Critical Issue: Data Loss/Corruption

**Immediate Actions:**

1. **Stop all write operations**
2. **Backup current state**
3. **Assess extent of damage**
4. **Restore from backup if needed**
5. **Document incident**

---

## Getting Help

### Before Reaching Out:

- [ ] Checked this troubleshooting guide
- [ ] Reviewed error logs
- [ ] Tested locally
- [ ] Checked service status pages
- [ ] Searched community forums

### Support Channels:

**Vercel:**
- Docs: https://vercel.com/docs
- Support: support@vercel.com
- Community: https://github.com/vercel/next.js/discussions

**Supabase:**
- Docs: https://supabase.com/docs
- Support: support@supabase.com
- Discord: https://discord.supabase.com

**Razorpay:**
- Docs: https://razorpay.com/docs
- Support: https://razorpay.com/support
- Email: support@razorpay.com

**Resend:**
- Docs: https://resend.com/docs
- Support: support@resend.com
- Discord: https://resend.com/discord

---

## Debugging Tools & Commands

```bash
# Vercel
vercel logs                 # View logs
vercel logs --follow        # Stream logs
vercel env ls               # List env vars
vercel rollback             # Rollback deployment
vercel inspect [url]        # Inspect deployment

# Git
git status                  # Check status
git log --oneline          # View commits
git diff                   # View changes

# Node
npm run build              # Test build locally
npm run lint               # Check code quality
npm audit                  # Check dependencies

# Database
psql $DATABASE_URL         # Connect to database
\dt                        # List tables
\d table_name              # Describe table

# Network
curl -I [url]              # Check headers
ping [domain]              # Check connectivity
nslookup [domain]          # Check DNS

# Performance
lighthouse [url]           # Run audit
npm run build -- --profile # Build with profiling
```

---

**Keep this guide handy during deployment and operations!**

**Last Updated:** February 3, 2026
