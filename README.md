# Ayukriti Ayurveda - E-commerce Platform

A complete, production-ready Ayurvedic products e-commerce platform built with Next.js 14, TypeScript, Supabase, and Razorpay for [Ayukriti Ayurveda](https://ayukrritiayurveda.com/).

## 🚀 Features

### Customer Features
- ✅ Product browsing with filters and search
- ✅ Product detail pages with image galleries
- ✅ Shopping cart with real-time updates
- ✅ Secure checkout with Razorpay integration
- ✅ Cash on Delivery (COD) support
- ✅ Order tracking and history
- ✅ User authentication and profiles
- ✅ Guest checkout support

### Admin Features
- ✅ Comprehensive dashboard with analytics
- ✅ Product management (CRUD operations)
- ✅ Order management with status updates
- ✅ Category management
- ✅ Banner management for homepage
- ✅ Blog management system
- ✅ Home content management (announcements, reviews, etc.)
- ✅ User management
- ✅ Low stock alerts
- ✅ **Settings management** - Contact info, social media, company details, shipping, and payment gateway

### Technical Features
- ✅ Inventory locking to prevent overselling
- ✅ Payment webhook handling
- ✅ Email notifications (order confirmation, shipping, etc.)
- ✅ Row Level Security (RLS) for data protection
- ✅ SEO optimization (metadata, sitemap, robots.txt)
- ✅ Responsive design
- ✅ TypeScript for type safety
- ✅ Server-side rendering for performance

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Razorpay account
- Resend account (for emails)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ecoo
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

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

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
WEBHOOK_SECRET=your_webhook_secret
```

4. **Set up Supabase**

- Create a new Supabase project
- Run the migrations in `supabase/migrations/` folder:
  - `001_initial_schema.sql` - Creates all tables and functions
  - `002_rls_policies.sql` - Sets up Row Level Security
- Run the seed script: `supabase/seed.sql` - Adds 10 sample products
- Configure auth providers in Supabase dashboard
- Create storage buckets for product images

5. **Configure Razorpay**

- Sign up at [Razorpay](https://razorpay.com/)
- Get your test API keys from the dashboard
- **Option 1**: Add to `.env.local` (recommended for production)
- **Option 2**: Configure via Admin Panel → Settings → Payment tab (easier for testing)
- Add webhook URL: `https://your-domain.com/api/webhooks/razorpay`
- Configure webhook events: `payment.authorized`, `payment.failed`, `refund.processed`

See [PAYMENT_GATEWAY_SETUP.md](./PAYMENT_GATEWAY_SETUP.md) for detailed configuration guide.

6. **Configure Resend**

- Sign up at [Resend](https://resend.com/)
- Get your API key
- Verify your domain for production emails

## 🚀 Running the Application

**Development mode:**
```bash
npm run dev
```

Visit `http://localhost:3000`

**Production build:**
```bash
npm run build
npm start
```

## 👨‍💼 Creating Admin User

1. Sign up through the normal signup flow
2. In Supabase SQL Editor, run:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
```

Or set `ADMIN_EMAIL` in your `.env.local` and signup with that email - the trigger will automatically assign admin role.

## 📦 Deployment

### Vercel (Recommended)

1. **Push code to GitHub**

2. **Connect to Vercel**
   - Import your repository
   - Configure environment variables
   - Deploy

3. **Post-deployment**
   - Update `NEXT_PUBLIC_SITE_URL` with your production domain
   - Update Razorpay webhook URL
   - Configure custom domain (optional)

### Environment Variables on Vercel
Add all variables from `.env.local` to Vercel's environment variables section.

## 🗂️ Project Structure

```
ecoo/
├── app/                    # Next.js 14 App Router
│   ├── (public)/          # Public pages
│   ├── (auth)/            # Authentication pages
│   ├── account/           # User dashboard
│   ├── admin/             # Admin panel
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── products/         # Product components
│   ├── cart/             # Cart components
│   └── admin/            # Admin components
├── lib/                   # Utility libraries
│   ├── supabase/         # Supabase clients
│   ├── razorpay/         # Razorpay integration
│   ├── email/            # Email service
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript types
├── hooks/                 # Custom React hooks
├── supabase/             # Database migrations
└── tests/                # Test files
```

## 🔒 Security Features

- **Row Level Security (RLS)**: All database tables protected
- **Middleware authentication**: Route protection
- **Role-based access control**: Admin vs Customer
- **Payment signature verification**: Razorpay security
- **Webhook signature verification**: Secure webhook handling
- **Environment variables**: Sensitive data protection

## 📧 Email Notifications

The platform sends automated emails for:
- Order confirmation
- Order shipped
- Order delivered
- Refund processed
- Low stock alerts (to admin)

## 🧪 Testing

Run tests:
```bash
npm test
```

E2E tests:
```bash
npm run test:e2e
```

## 📱 API Endpoints

### Public APIs
- `POST /api/checkout/create-order` - Create new order
- `POST /api/checkout/verify-payment` - Verify payment

### Webhooks
- `POST /api/webhooks/razorpay` - Razorpay webhook handler

## 🎨 Customization

### Colors
Edit `app/globals.css` to change theme colors

### Logo
Replace logo in components and update metadata

### Products
Modify `supabase/seed.sql` to add your own products

## 📚 Documentation

Detailed guides available:
- **[PAYMENT_GATEWAY_SETUP.md](./PAYMENT_GATEWAY_SETUP.md)** - Payment gateway configuration guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment instructions
- **[ABOUT_PAGE_MANAGEMENT.md](./ABOUT_PAGE_MANAGEMENT.md)** - About page content management
- **[CERTIFICATIONS_MANAGEMENT.md](./CERTIFICATIONS_MANAGEMENT.md)** - Product certifications guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical implementation details

## 📊 Database Schema

Key tables:
- `profiles` - User profiles with roles
- `products` - Product catalog
- `product_images` - Product image gallery
- `categories` - Product categories
- `orders` - Order records
- `order_items` - Order line items
- `cart_items` - Shopping cart
- `user_addresses` - Customer addresses
- `inventory_locks` - Prevent overselling
- `banners` - Homepage carousel
- `blogs` - Blog posts
- `site_settings` - Site configuration (contact, social, shipping, etc.)
- `announcement_items` - Top bar announcements
- `trust_badges` - Trust indicators
- `health_goals` - Health goal categories
- `why_choose_us` - Feature highlights
- `customer_reviews` - Customer testimonials
- `admin_logs` - Admin activity tracking

## 🤝 Contributing

This is a production-ready template. Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use for commercial projects

## 🐛 Troubleshooting

### Common Issues

**Database errors:**
- Ensure all migrations are run in order
- Check RLS policies are enabled
- Verify service role key is correct

**Payment issues:**
- Use Razorpay test mode for development
- Verify webhook signature secret
- Check webhook URL is accessible

**Email not sending:**
- Verify Resend API key
- Check domain verification
- Review email templates

## 📞 Support

For issues and questions:
- Check the documentation
- Review error logs
- Contact support

## 🎉 Acknowledgments

Built with:
- Next.js 14
- Supabase
- Razorpay
- shadcn/ui
- Tailwind CSS
- TypeScript
