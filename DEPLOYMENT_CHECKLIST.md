# 🚀 Quick Deployment Checklist

Print this page and check off items as you complete them.

---

## Prerequisites ✓

- [ ] GitHub account created
- [ ] Vercel account created (linked to GitHub)
- [ ] Supabase account created
- [ ] Razorpay account created (KYC submitted)
- [ ] Resend account created
- [ ] Domain purchased (optional)
- [ ] Node.js 20+ installed
- [ ] Git installed

---

## Phase 1: Code Preparation (30 min)

- [ ] Project dependencies installed (`npm install`)
- [ ] Local dev server working (`npm run dev`)
- [ ] Tests passing (`npm run test`)
- [ ] Build successful (`npm run build`)
- [ ] No console.log statements in code
- [ ] .gitignore properly configured
- [ ] .env.example created

---

## Phase 2: Database Setup (45 min)

**Supabase Project:**
- [ ] Production project created
- [ ] Project URL saved: `____________________`
- [ ] Anon key saved: `____________________`
- [ ] Service key saved: `____________________`

**Migrations:**
- [ ] 001_initial_schema.sql applied
- [ ] 002_rls_policies.sql applied
- [ ] 003_add_addresses_table.sql applied
- [ ] 004_addresses_rls_policies.sql applied
- [ ] 005_product_images_storage_setup.sql applied
- [ ] 006_home_content_tables.sql applied

**Storage:**
- [ ] `product-images` bucket created
- [ ] Bucket set to public
- [ ] Read policy added
- [ ] Upload policy added (admin only)

**Verification:**
- [ ] All tables exist (run table count query)
- [ ] RLS enabled on all tables
- [ ] Storage bucket accessible
- [ ] Seed data loaded (optional)

---

## Phase 3: GitHub Repository (15 min)

- [ ] Git repository initialized
- [ ] .env.local added to .gitignore
- [ ] GitHub repository created
- [ ] Repository URL: `____________________`
- [ ] Code pushed to GitHub
- [ ] All files visible on GitHub (except .env.local)

---

## Phase 4: Razorpay Setup (20 min)

**Account:**
- [ ] Account created and verified
- [ ] KYC submitted (for live mode)

**Test Keys:**
- [ ] Test mode enabled
- [ ] Test Key ID: `rzp_test_____________________`
- [ ] Test Key Secret: `____________________`
- [ ] Keys saved securely

**Live Keys (after testing):**
- [ ] KYC approved
- [ ] Live mode enabled
- [ ] Live Key ID: `rzp_live_____________________`
- [ ] Live Key Secret: `____________________`

---

## Phase 5: Resend Setup (15 min)

- [ ] Account created
- [ ] API key generated: `re_____________________`
- [ ] Domain added (or using test domain)
- [ ] DNS records added (if custom domain)
- [ ] Domain verified
- [ ] Test email sent successfully

---

## Phase 6: Vercel Deployment (30 min)

**Project Setup:**
- [ ] Vercel account created (GitHub login)
- [ ] Repository imported
- [ ] Framework detected as Next.js

**Environment Variables Added:**
```
Supabase:
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY (Production only!)

Razorpay (start with test keys):
- [ ] RAZORPAY_KEY_ID
- [ ] RAZORPAY_KEY_SECRET
- [ ] NEXT_PUBLIC_RAZORPAY_KEY_ID

Resend:
- [ ] RESEND_API_KEY

App Config:
- [ ] NEXT_PUBLIC_SITE_URL
- [ ] ADMIN_EMAIL
- [ ] WEBHOOK_SECRET (generated 32+ chars)
```

**Deployment:**
- [ ] First deployment successful
- [ ] Site URL: `____________________`
- [ ] NEXT_PUBLIC_SITE_URL updated with actual URL
- [ ] Redeployed after URL update

**Webhook:**
- [ ] Razorpay webhook added
- [ ] Webhook URL: `[your-site]/api/webhooks/razorpay`
- [ ] Webhook secret matches WEBHOOK_SECRET
- [ ] Events selected: authorized, captured, failed, processed
- [ ] Test webhook sent successfully

---

## Phase 7: Custom Domain (Optional, 30 min)

- [ ] Domain added in Vercel
- [ ] DNS A record added: @ → 76.76.21.21
- [ ] DNS CNAME added: www → cname.vercel-dns.com
- [ ] DNS propagated (check dnschecker.org)
- [ ] SSL certificate active
- [ ] NEXT_PUBLIC_SITE_URL updated to custom domain
- [ ] Razorpay webhook updated to custom domain
- [ ] Redeployed

---

## Phase 8: Admin User (10 min)

- [ ] Signed up at /signup with ADMIN_EMAIL
- [ ] Email verified (if required)
- [ ] Admin role automatically assigned
- [ ] Admin role verified in Supabase profiles table
- [ ] Can access /admin successfully
- [ ] All admin sections accessible

---

## Phase 9: Testing (45 min)

**Critical Paths:**
- [ ] Homepage loads correctly
- [ ] Products page displays all products
- [ ] Product details page works
- [ ] Add to cart works
- [ ] Cart updates correctly
- [ ] User can sign up
- [ ] User can login
- [ ] Checkout flow works
- [ ] Payment modal opens (Razorpay)
- [ ] Test payment successful (test card: 4111 1111 1111 1111)
- [ ] Order confirmation shown
- [ ] Order appears in "My Orders"
- [ ] Order confirmation email received

**Admin Panel:**
- [ ] Can login as admin
- [ ] Can access /admin
- [ ] Can view orders
- [ ] Can update order status
- [ ] Can add products
- [ ] Can edit products
- [ ] Can manage categories
- [ ] Can update home content
- [ ] Can manage banners

**Performance:**
- [ ] Lighthouse audit run
- [ ] Performance score > 80
- [ ] Accessibility score > 90
- [ ] Mobile responsive
- [ ] Images load quickly

**Security:**
- [ ] Cannot access /admin without auth
- [ ] Cannot view other users' data
- [ ] Security headers present
- [ ] SSL working (HTTPS)

**Logs:**
- [ ] No errors in Vercel logs
- [ ] No errors in Supabase logs
- [ ] No failed webhooks in Razorpay

---

## Phase 10: Production Mode (30 min)

⚠️ **Only after thorough testing!**

- [ ] Razorpay KYC approved
- [ ] Live API keys generated
- [ ] RAZORPAY_KEY_ID updated to live key
- [ ] RAZORPAY_KEY_SECRET updated to live secret
- [ ] NEXT_PUBLIC_RAZORPAY_KEY_ID updated to live key
- [ ] Razorpay webhook configured for live mode
- [ ] Application redeployed
- [ ] Test payment with real card (small amount)
- [ ] Payment captured successfully
- [ ] Webhook received
- [ ] Test payment refunded

---

## Phase 11: Final Configuration (20 min)

**Monitoring:**
- [ ] Vercel Analytics enabled
- [ ] Vercel Speed Insights enabled
- [ ] Sentry installed (optional)
- [ ] Uptime monitor configured (UptimeRobot)
- [ ] Alert email configured

**Backups:**
- [ ] Backup script created
- [ ] Manual backup taken
- [ ] Backup schedule configured
- [ ] Restore procedure documented

**Alerts:**
- [ ] Vercel deployment alerts enabled
- [ ] Vercel error alerts enabled
- [ ] Supabase database alerts enabled
- [ ] Email notifications configured

**Documentation:**
- [ ] All credentials saved securely
- [ ] Access document created
- [ ] Runbook created for common tasks
- [ ] Team members have access

---

## Phase 12: Pre-Launch (15 min)

**Content:**
- [ ] Products added
- [ ] Categories created
- [ ] Home banners uploaded
- [ ] About page completed
- [ ] Privacy Policy published
- [ ] Terms & Conditions published
- [ ] Refund Policy published
- [ ] Shipping Policy published
- [ ] Cancellation Policy published
- [ ] Contact information correct
- [ ] Social media links added

**Support:**
- [ ] Support email set up
- [ ] FAQ page created
- [ ] Contact form working
- [ ] WhatsApp number configured
- [ ] Response templates prepared

**Final Verification:**
- [ ] Complete end-to-end order test
- [ ] All pages load without errors
- [ ] All links work
- [ ] All forms submit correctly
- [ ] All emails sending
- [ ] All images loading

---

## Phase 13: Launch! (5 min)

- [ ] All systems verified one last time
- [ ] "Coming Soon" pages removed (if any)
- [ ] Site is publicly accessible
- [ ] First real order placed (by you or team)
- [ ] Launch announcement ready
- [ ] Social media posts scheduled

---

## Phase 14: Post-Launch Monitoring

**First Hour:**
- [ ] Site responding correctly
- [ ] No errors in logs
- [ ] Payments processing
- [ ] Emails sending

**First 24 Hours:**
- [ ] Check logs every 2 hours
- [ ] Monitor error rates
- [ ] Check payment success rate
- [ ] Respond to user feedback
- [ ] Fix critical issues immediately

**First Week:**
- [ ] Daily log reviews
- [ ] Performance optimization
- [ ] User feedback collection
- [ ] Conversion rate analysis
- [ ] Planned improvements documented

---

## 🎉 Deployment Complete!

**Date Completed:** _______________

**Deployed By:** _______________

**Production URL:** _______________

**Status:** ☐ Success  ☐ Issues (document below)

---

## 📝 Notes / Issues Encountered

```
Issue 1:
________________________________________
Solution:
________________________________________

Issue 2:
________________________________________
Solution:
________________________________________

Issue 3:
________________________________________
Solution:
________________________________________
```

---

## 📞 Emergency Contacts

**On-Call Engineer:** _______________

**Team Lead:** _______________

**Service Status Pages:**
- Vercel: https://www.vercelstatus.com/
- Supabase: https://status.supabase.com/
- Razorpay: https://status.razorpay.com/

**Support:**
- Vercel: support@vercel.com
- Supabase: support@supabase.com
- Razorpay: https://razorpay.com/support/

---

## 🔄 Quick Commands Reference

```bash
# View Vercel logs
vercel logs --follow

# Redeploy
vercel --prod

# Rollback
vercel rollback

# Database backup
pg_dump $DB_URL > backup_$(date +%Y%m%d).sql

# Check site health
curl https://your-domain.com/api/health
```

---

**Keep this checklist for reference during future deployments!**
