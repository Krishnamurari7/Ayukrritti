# Deployment Guide

## Prerequisites
- GitHub account
- Vercel account
- Supabase project (production)
- Razorpay account
- Resend account

## Step 1: Prepare Supabase Production Database

1. Create a new Supabase project for production
2. Run migrations:
   - Copy content from `supabase/migrations/001_initial_schema.sql`
   - Paste into Supabase SQL Editor and execute
   - Copy content from `supabase/migrations/002_rls_policies.sql`
   - Paste and execute
3. Run seed data:
   - Copy content from `supabase/seed.sql`
   - Paste and execute
4. Create Storage Buckets:
   - Create a `product-images` bucket
   - Set it to public
   - Configure storage policies

## Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Production e-commerce platform"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Add Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
ADMIN_EMAIL=admin@yourdomain.com
WEBHOOK_SECRET=generate_a_random_string
```

6. Click "Deploy"

## Step 4: Configure Razorpay Webhooks

1. Go to Razorpay Dashboard
2. Navigate to Settings → Webhooks
3. Add new webhook:
   - URL: `https://your-domain.vercel.app/api/webhooks/razorpay`
   - Secret: Use the same value as `WEBHOOK_SECRET`
   - Events:
     - ✓ payment.authorized
     - ✓ payment.captured
     - ✓ payment.failed
     - ✓ refund.processed
4. Save webhook configuration

## Step 5: Configure Resend

1. Go to Resend Dashboard
2. Add and verify your domain
3. Update DNS records as instructed
4. Wait for verification (can take up to 24 hours)

## Step 6: Post-Deployment Setup

### Create Admin User
1. Visit your deployed site
2. Sign up with the email specified in `ADMIN_EMAIL`
3. The system will automatically assign admin role

Or manually via Supabase SQL Editor:
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

### Test the Platform

1. **Test Customer Flow:**
   - Browse products
   - Add to cart
   - Complete checkout with test Razorpay credentials
   - Verify order appears in account

2. **Test Admin Panel:**
   - Login as admin
   - Access `/admin`
   - Verify all features work

3. **Test Webhooks:**
   - Make a test payment
   - Check Razorpay dashboard for webhook deliveries
   - Verify order status updates

4. **Test Emails:**
   - Complete an order
   - Check if confirmation email arrives
   - Test other email notifications

## Step 7: Custom Domain (Optional)

1. In Vercel Dashboard, go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXT_PUBLIC_SITE_URL` environment variable
6. Redeploy

## Step 8: Monitoring & Analytics

### Vercel Analytics
- Enable in project settings
- Monitor performance metrics

### Supabase Monitoring
- Check database usage
- Monitor API requests
- Review logs for errors

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user tracking

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Review build logs for specific errors
- Ensure all dependencies are in `package.json`

### Database Connection Issues
- Verify Supabase URL and keys
- Check RLS policies are enabled
- Ensure connection pooling is configured

### Payment Not Working
- Switch Razorpay to live mode
- Verify webhook URL is accessible
- Check webhook signature verification

### Emails Not Sending
- Verify Resend domain is verified
- Check API key is correct
- Review Resend logs for errors

## Security Checklist

- [ ] All environment variables are secret
- [ ] RLS policies are enabled on all tables
- [ ] Webhook signatures are verified
- [ ] HTTPS is enforced
- [ ] Admin routes are protected
- [ ] Service role key is never exposed to client
- [ ] CORS is properly configured
- [ ] Rate limiting is in place (Vercel default)

## Performance Optimization

1. **Image Optimization:**
   - Use Supabase CDN for images
   - Enable WebP format
   - Set appropriate cache headers

2. **Database:**
   - Add indexes to frequently queried columns
   - Use connection pooling
   - Monitor slow queries

3. **Caching:**
   - Enable Vercel Edge Caching
   - Use React Query for client-side caching
   - Cache static pages

## Maintenance

### Regular Tasks
- Monitor error logs daily
- Check low stock alerts
- Review order statuses
- Update products regularly
- Backup database weekly

### Updates
```bash
# Update dependencies
npm update

# Test locally
npm run build
npm run test

# Deploy
git add .
git commit -m "Update dependencies"
git push
```

## Scaling Considerations

### When to Scale

1. **Database:**
   - Upgrade Supabase plan when:
     - Database size > 500MB
     - API requests > 500k/month
     - Concurrent connections > 50

2. **Application:**
   - Vercel automatically scales
   - Consider Pro plan for:
     - More bandwidth
     - Better performance
     - Priority support

3. **Email:**
   - Upgrade Resend plan when:
     - Sending > 3k emails/month
     - Need better deliverability

### Load Testing
```bash
# Install k6
npm install -g k6

# Run load test
k6 run tests/load/checkout.js
```

## Success Metrics

Monitor these KPIs:
- Conversion rate (cart to order)
- Average order value
- Page load time (< 2s)
- Error rate (< 1%)
- Customer satisfaction

## Support

For issues during deployment:
1. Check Vercel build logs
2. Review Supabase logs
3. Check browser console for errors
4. Review this guide
5. Contact support if needed

## Congratulations! 🎉

Your e-commerce platform is now live and ready for customers!
