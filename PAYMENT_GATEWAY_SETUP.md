# Payment Gateway Configuration

This guide explains how to configure and manage Razorpay payment gateway credentials for your e-commerce store.

## Overview

The payment gateway configuration supports two methods for managing Razorpay credentials:

1. **Environment Variables** (Recommended for production)
2. **Admin Settings Panel** (For easier management and testing)

The system will prioritize environment variables over database settings.

## Getting Started

### Step 1: Get Razorpay Credentials

1. Sign up for a Razorpay account at [https://razorpay.com](https://razorpay.com)
2. Go to [Razorpay Dashboard → API Keys](https://dashboard.razorpay.com/app/website-app-settings/api-keys)
3. Generate your API keys:
   - **Test Mode**: Keys starting with `rzp_test_`
   - **Live Mode**: Keys starting with `rzp_live_`

You'll receive:
- **Key ID**: Public key (can be exposed in frontend)
- **Key Secret**: Private key (must be kept secure)

### Step 2: Configure via Admin Settings

1. Navigate to **Admin Panel → Settings → Payment Tab**
2. Enter your Razorpay credentials:
   - Razorpay Key ID
   - Razorpay Key Secret
3. **Enable encryption** (recommended) - Toggle "Encrypt credentials in database"
4. Click **Save Payment Gateway Settings**

**Important Notes:**
- The Key Secret is encrypted by default before storing in the database
- These settings are only a fallback; environment variables take priority
- You'll see a notification to add these to your `.env.local` file
- Restart your server after saving for changes to take effect

### Step 3: Configure Environment Variables (Recommended)

Create or update your `.env.local` file in the project root:

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

**Variable Breakdown:**
- `RAZORPAY_KEY_ID`: Server-side key ID
- `RAZORPAY_KEY_SECRET`: Server-side key secret (never expose publicly)
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Client-side key ID (optional, system will fetch from API)

### Step 4: Restart Your Application

After updating credentials (via admin panel or environment variables), restart your Next.js server:

```bash
npm run dev
```

## Configuration Priority

The system follows this priority order:

1. **Environment Variables** - If `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set in `.env.local`
2. **Database Settings** - If not found in environment, fetches from `site_settings` table
3. **Error** - Throws an error if neither is available

## Testing Payment Gateway

### Test Mode
Use test credentials (starting with `rzp_test_`) for development:

**Test Cards:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Test UPI:**
- UPI ID: `success@razorpay`

### Live Mode
Switch to live credentials (starting with `rzp_live_`) when ready for production.

## Security Best Practices

1. **Never commit credentials to Git**
   - Add `.env.local` to `.gitignore`
   - Use environment variables in production

2. **Protect Key Secret**
   - Never expose in frontend code
   - Only use server-side
   - Rotate keys regularly
   - Enable encryption when storing in database

3. **Use HTTPS**
   - Always use HTTPS in production
   - Required for Razorpay integration

4. **Webhook Secret**
   - Set up a separate webhook secret in Razorpay Dashboard
   - Add to environment: `WEBHOOK_SECRET=your_webhook_secret`

5. **Encryption Key**
   - Set a strong encryption key in production: `ENCRYPTION_KEY=your-32-character-secret-key`
   - Use a cryptographically secure random string
   - Never change this key after encrypting data (or data will be unrecoverable)

## API Routes

The following API routes handle payment processing:

- `POST /api/checkout/create-order` - Creates order and Razorpay payment
- `POST /api/checkout/verify-payment` - Verifies payment signature
- `POST /api/webhooks/razorpay` - Handles Razorpay webhooks
- `GET /api/payment/config` - Returns public key ID for frontend

## Admin Features

### Payment Settings Tab

Located at: **Admin Panel → Settings → Payment**

Features:
- Configure Razorpay Key ID
- Configure Razorpay Key Secret
- Toggle visibility of sensitive keys
- Environment variable setup guide
- One-click save with server restart reminder

### Database Schema

Payment credentials are stored in the `site_settings` table:

```sql
-- Key ID (stored as plain text)
key: 'razorpay_key_id'
value: 'rzp_test_xxxxxxxxxxxxx'

-- Key Secret (encrypted by default)
key: 'razorpay_key_secret'
value: 'iv_hex:encrypted_data' -- Encrypted format
```

**Encryption Details:**
- Uses AES-256-CBC encryption algorithm
- Automatically decrypts when fetching from database
- Requires `ENCRYPTION_KEY` environment variable
- Format: `IV:EncryptedData` where IV is the initialization vector

## Troubleshooting

### "Razorpay credentials not found" Error

**Solution:**
1. Check if environment variables are set in `.env.local`
2. Verify credentials are saved in Admin Settings
3. Restart the server after updating

### Payment verification fails

**Solution:**
1. Verify Key Secret is correct
2. Check webhook signature validation
3. Review server logs for detailed errors

### Frontend shows "undefined" key

**Solution:**
1. Check `/api/payment/config` endpoint is accessible
2. Verify Key ID is set in admin settings or environment
3. Check browser console for fetch errors

## Production Deployment

### Environment Variables

Set these in your hosting platform (Vercel, Netlify, etc.):

```env
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_key_secret
WEBHOOK_SECRET=your_webhook_secret
ENCRYPTION_KEY=your-32-character-secret-key-here
```

**Note:** Generate a secure random string for `ENCRYPTION_KEY`. You can use:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Webhook Setup

1. Go to Razorpay Dashboard → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/webhooks/razorpay`
3. Select events:
   - `payment.authorized`
   - `payment.captured`
   - `payment.failed`
   - `refund.processed`
4. Save webhook secret to `WEBHOOK_SECRET` environment variable

## Support

For Razorpay-specific issues:
- Documentation: [https://razorpay.com/docs](https://razorpay.com/docs)
- Support: [https://razorpay.com/support](https://razorpay.com/support)

For application issues:
- Check server logs
- Review Razorpay Dashboard for payment status
- Verify database entries in `orders` table
