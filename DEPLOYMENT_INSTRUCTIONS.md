# Deployment Instructions - Certifications Management

## 🚀 Quick Start

Follow these steps to deploy the certifications management feature:

## Step 1: Apply Database Migration

### Option A: Using Supabase CLI (Recommended for Local)

```bash
# Navigate to project directory
cd D:\Krishna\ecoo

# Apply migration (if using local Supabase)
npx supabase db reset

# Or push only new migrations
npx supabase db push
```

### Option B: Using Supabase Dashboard (Recommended for Production)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the entire contents of `supabase/migrations/006_home_content_tables.sql`
5. Paste into the editor
6. Click **Run**
7. Verify success message

## Step 2: Verify Database Tables

Run this query in SQL Editor to verify tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'announcement_items',
  'trust_badges',
  'certifications',
  'health_goals',
  'why_choose_us',
  'customer_reviews',
  'blogs'
);
```

You should see all 7 tables listed.

## Step 3: Check Default Data

Verify default certifications were inserted:

```sql
SELECT id, title, icon_url, display_order, is_active 
FROM certifications 
ORDER BY display_order;
```

You should see 8 default certifications.

## Step 4: Upload Certification Icons

### Create Directory Structure

In your `public` folder, create:
```
public/
  └── certifications/
      ├── gmo-free.png
      ├── gmp-certified.png
      ├── 100-natural.png
      ├── gluten-free.png
      ├── ethically-proven.png
      ├── ayush-standard.png
      ├── iso-certified.png
      └── lab-tested.png
```

### Icon Requirements
- **Format**: PNG with transparent background
- **Size**: 96x96px to 120x120px recommended
- **Quality**: High resolution (2x for retina displays)
- **File Size**: Keep under 50KB each for performance

### Quick Icon Solution

If you don't have certification icons yet, you can:

1. **Use placeholder icons temporarily**:
   - Create simple badge designs in Canva
   - Use icon libraries (with proper licensing)
   - Generate AI icons

2. **Or update the URLs** in the database to point to existing images:
   ```sql
   UPDATE certifications 
   SET icon_url = '/placeholder-cert.png' 
   WHERE icon_url LIKE '/certifications/%';
   ```

## Step 5: Test Admin Interface

1. **Login as Admin**:
   - Go to `/login`
   - Login with admin credentials
   
2. **Navigate to Certifications**:
   - Go to `/admin/home-content`
   - Click on **Certifications** tab

3. **Test CRUD Operations**:
   - ✅ Try adding a new certification
   - ✅ Edit an existing certification
   - ✅ Try to add 11th certification (should fail)
   - ✅ Try to delete when only 3 active (should fail)
   - ✅ Toggle active/inactive status
   - ✅ Change display order

## Step 6: Verify Frontend Display

1. **Go to Homepage** (`/`)
2. **Scroll to Certifications Section**
   - Should appear after Trust Badges section
   - Look for "Certificate of Natural Goodness" heading
3. **Check Responsiveness**:
   - Mobile view (2 columns)
   - Tablet view (3 columns)
   - Desktop view (4 columns)
4. **Verify Only Active Certifications Show**

## Step 7: Regenerate TypeScript Types (Optional but Recommended)

To remove TypeScript warnings:

```bash
# If using Supabase CLI
npx supabase gen types typescript --local > types/supabase.ts

# Or generate from your live project
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/supabase.ts
```

Then update imports if needed.

## 🔍 Verification Checklist

### Database ✓
- [ ] All 7 home content tables exist
- [ ] Certifications table has correct schema
- [ ] RLS policies are enabled
- [ ] Default data is inserted (8 certifications)
- [ ] Indexes are created

### Admin Panel ✓
- [ ] Certifications tab is visible
- [ ] Can create new certification
- [ ] Can edit existing certification
- [ ] Can delete certification
- [ ] Min/max validation works
- [ ] Form resets after save
- [ ] Toast notifications appear
- [ ] Table displays all certifications

### Frontend ✓
- [ ] Certifications section appears on homepage
- [ ] Only active certifications display
- [ ] Correct order (by display_order)
- [ ] Icons load properly
- [ ] Responsive on all screen sizes
- [ ] Section has gradient background
- [ ] Hover effects work

### Permissions ✓
- [ ] Public can view active certifications
- [ ] Public cannot modify certifications
- [ ] Admin can perform all CRUD operations
- [ ] Non-admin cannot access admin panel

## 🐛 Troubleshooting

### Migration Fails

**Error**: `relation "certifications" already exists`
```sql
-- Drop table and re-run migration
DROP TABLE IF EXISTS certifications CASCADE;
```

**Error**: Permission denied
- Ensure you're logged in as database owner
- Check Supabase project permissions

### Icons Not Showing

**Problem**: Icons display broken image
- Check file path matches database entry
- Verify files exist in `/public/certifications/`
- Check file names are exact (case-sensitive)
- Clear browser cache

**Quick Fix**:
```sql
-- Update all to use a placeholder temporarily
UPDATE certifications 
SET icon_url = '/logo.png' 
WHERE is_active = true;
```

### Certifications Not Appearing on Homepage

1. **Check Active Status**:
   ```sql
   SELECT COUNT(*) FROM certifications WHERE is_active = true;
   ```
   Should be at least 3.

2. **Check Data Exists**:
   ```sql
   SELECT * FROM certifications LIMIT 5;
   ```

3. **Check RLS Policies**:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'certifications';
   ```

4. **Force Refresh**:
   - Hard refresh browser (Ctrl+Shift+R)
   - Clear Next.js cache: `rm -rf .next`
   - Restart dev server

### TypeScript Errors Persist

The errors in `app/admin/home-content/page.tsx` are suppressed with `@ts-ignore` comments. They will resolve after:

1. Running the migration
2. Regenerating types
3. Restarting TypeScript server (VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server")

These errors don't affect functionality.

## 🔧 Configuration

### Modify Min/Max Limits

To change the 3-10 constraint:

**In Code** (`app/admin/home-content/page.tsx`):
```typescript
// Line ~508 - Change maximum
if (activeCount >= 10) {  // Change 10 to your max
  toast.error("Maximum 10 certifications allowed");
  return;
}

// Line ~536 - Change minimum
if (activeCount < 3) {  // Change 3 to your min
  toast.error("Minimum 3 active certifications required");
  return;
}
```

**In Documentation**:
Update limits in:
- `CERTIFICATIONS_MANAGEMENT.md`
- `IMPLEMENTATION_SUMMARY.md`

### Modify Grid Layout

Change responsive columns in `app/(public)/page.tsx` line ~153:

```typescript
// Current: 2-4 columns
className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"

// Example: 3-6 columns
className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
```

## 🎯 Post-Deployment Tasks

### 1. Add Your Real Certifications
Replace default certifications with your actual ones via admin panel.

### 2. Upload Professional Icons
Create or source high-quality certification badges.

### 3. Set Proper Display Order
Order certifications by importance (most prominent first).

### 4. Document Your Certifications
Keep internal records of:
- Certification authority
- Issue date
- Expiry date (if applicable)
- Certificate numbers

### 5. Monitor Performance
- Check page load times
- Optimize images if needed
- Monitor database query performance

## 📊 Monitoring

### Database Queries

Check active certifications count:
```sql
SELECT 
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE is_active = true) as active
FROM certifications;
```

Check most recent updates:
```sql
SELECT title, updated_at 
FROM certifications 
ORDER BY updated_at DESC 
LIMIT 5;
```

### Performance

Monitor query performance:
```sql
EXPLAIN ANALYZE
SELECT * FROM certifications 
WHERE is_active = true 
ORDER BY display_order;
```

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Migration runs without errors
- ✅ All tables exist with correct structure
- ✅ Admin can manage certifications
- ✅ Certifications display on homepage
- ✅ Icons load correctly
- ✅ Responsive on all devices
- ✅ Min/max validation works
- ✅ RLS policies enforce security

## 📞 Support

If you encounter issues:

1. Check this documentation
2. Review `CERTIFICATIONS_MANAGEMENT.md`
3. Check `IMPLEMENTATION_SUMMARY.md`
4. Verify migration file syntax
5. Check Supabase logs for errors

## 🔄 Rollback Plan

If you need to rollback:

```sql
-- Remove certification tables
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS announcement_items CASCADE;
DROP TABLE IF EXISTS trust_badges CASCADE;
DROP TABLE IF EXISTS health_goals CASCADE;
DROP TABLE IF EXISTS why_choose_us CASCADE;
DROP TABLE IF EXISTS customer_reviews CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;

-- Drop function
DROP FUNCTION IF EXISTS update_home_content_updated_at();
```

Then restore previous version of files:
- `app/(public)/page.tsx`
- `app/admin/home-content/page.tsx`
- `types/database.ts`

---

**Deployment Date**: _____________
**Deployed By**: _____________
**Environment**: ☐ Local  ☐ Staging  ☐ Production
**Status**: ☐ Success  ☐ Partial  ☐ Failed

**Notes**:
_____________________________________________
_____________________________________________
_____________________________________________
