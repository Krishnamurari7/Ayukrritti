# About Page Management Guide

## Overview

The About Page Management feature allows admins to fully control and customize the About page content from the admin panel without touching code. All content is stored in the database and can be easily updated through an intuitive interface.

## Database Tables Created

The following tables were created to manage About page content:

### 1. `about_content`
Stores main content sections (Hero, Story, CTA).
- **section_key**: Unique identifier for the section (hero, story, cta)
- **content**: JSON data containing the section content
- **is_active**: Toggle to show/hide the section

### 2. `about_stats`
Displays key statistics (e.g., "50,000+ Happy Customers").
- **icon**: Lucide icon name (Users, Leaf, Award, Heart)
- **value**: The statistic value (e.g., "50,000+")
- **label**: Description label (e.g., "Happy Customers")
- **display_order**: Order of display
- **is_active**: Toggle to show/hide

### 3. `about_values`
Showcases company values (e.g., "100% Natural").
- **icon**: Lucide icon name
- **title**: Value title
- **description**: Detailed description
- **display_order**: Order of display
- **is_active**: Toggle to show/hide

### 4. `about_centers`
Lists physical center locations.
- **name**: Center name
- **address**: Full address
- **phone**: Contact phone number
- **timing**: Opening hours
- **image**: Image URL
- **services**: Array of services offered
- **display_order**: Order of display
- **is_active**: Toggle to show/hide

### 5. `about_achievements`
Timeline of company achievements.
- **year**: Year of achievement
- **title**: Achievement title
- **description**: Detailed description
- **icon**: Lucide icon name
- **display_order**: Order of display
- **is_active**: Toggle to show/hide

### 6. `about_team`
Team member profiles.
- **name**: Member name
- **role**: Job title/role
- **image**: Profile photo URL
- **experience**: Years of experience
- **display_order**: Order of display
- **is_active**: Toggle to show/hide

## Admin Interface

### Accessing the Admin Panel

1. Navigate to `/admin/about` (requires admin authentication)
2. The page is accessible from the admin sidebar under "About Page"

### Managing Content

The admin interface uses tabs to organize different sections:

#### 1. **Hero Tab**
- Edit the main hero title
- Update the description text
- Manage feature bullet points (one per line)

#### 2. **Story Tab**
- Update story section title
- Change the story image URL
- Edit story paragraphs (separate with double line breaks)

#### 3. **Stats Tab**
- Add/edit/delete statistics
- Set icon names from Lucide icons
- Configure display order
- Toggle active status

#### 4. **Values Tab**
- Add/edit/delete company values
- Set icon names from Lucide icons
- Write titles and descriptions
- Configure display order

#### 5. **Centers Tab**
- Add/edit/delete physical centers
- Enter center details (name, address, phone, timing)
- Add image URLs
- Manage services (add multiple services)
- Configure display order

#### 6. **Achievements Tab**
- Add/edit/delete achievements
- Set year and icon
- Write titles and descriptions
- Configure display order (chronological on frontend)

#### 7. **Team Tab**
- Add/edit/delete team members
- Enter name, role, and experience
- Add profile image URLs
- Configure display order

#### 8. **CTA Tab**
- Edit the call-to-action title
- Update description text
- Configure button texts and links (2 buttons)

## Icon System

The system uses **Lucide React** icons. Common icons available:

- **Stats**: Users, Leaf, Award, Heart, TrendingUp, Star
- **Values**: Leaf, Shield, Target, Heart, CheckCircle
- **Achievements**: Award, CheckCircle, Users, Shield, Heart, MapPin
- **General**: Phone, Clock, Mail, MapPin

To use an icon, simply enter its name (e.g., "Users" or "Leaf") in the icon field.

## Frontend Display

The About page (`/about`) automatically fetches and displays:

1. **Hero Section**: Title, description, and feature checkmarks
2. **Stats Section**: Key statistics in a grid layout
3. **Story Section**: Company story with image
4. **Values Section**: Company values in cards
5. **Centers Section**: Physical center locations with details
6. **Achievements Section**: Timeline of achievements
7. **Team Section**: Team member profiles
8. **CTA Section**: Call-to-action with buttons

## Features

### ✅ Implemented
- Full CRUD operations for all content sections
- Display order management
- Active/inactive toggle for visibility control
- Real-time updates without code changes
- Responsive admin interface
- Image URL support
- Multi-field forms with validation
- Delete confirmation dialogs
- Edit/Cancel functionality
- Array field support (services, features, paragraphs)

### 🔒 Security
- Row Level Security (RLS) enabled on all tables
- Admin-only write access
- Public read access for active content only
- Authentication required for admin panel

## Usage Tips

1. **Images**: Use high-quality images from Unsplash or your own CDN
2. **Icons**: Test icon names at [lucide.dev](https://lucide.dev/icons)
3. **Display Order**: Lower numbers appear first (0, 1, 2, ...)
4. **Services Array**: Press Enter or click + to add services for centers
5. **Active Toggle**: Disable items without deleting them
6. **Paragraphs**: Use double line breaks to separate story paragraphs
7. **Features**: Use single line breaks for hero features

## Troubleshooting

**Content not showing?**
- Check if `is_active` is enabled
- Verify display order is set correctly
- Ensure all required fields are filled

**Icons not displaying?**
- Verify icon name matches Lucide icon exactly (case-sensitive)
- Check console for icon warnings
- Use common icons from the list above

**Images not loading?**
- Ensure image URL is accessible
- Use HTTPS URLs
- Test URL in browser first

## Migration Details

**Migration File**: `supabase/migrations/006_add_about_content_management.sql`

The migration includes:
- Table creation with proper schema
- Default data population
- RLS policies setup
- Indexes for performance
- Admin and public access policies

## Technical Implementation

### Backend
- Uses Supabase for data storage
- Server-side data fetching with `createClient()`
- Async/await patterns for data retrieval

### Frontend (Public)
- Server component for optimal performance
- Type-safe data handling
- Dynamic icon mapping
- Responsive design

### Frontend (Admin)
- Client component for interactivity
- Real-time state management
- Form validation
- Toast notifications for feedback
- Confirmation dialogs for deletions

## Future Enhancements

Potential improvements:
- [ ] Rich text editor for descriptions
- [ ] Image upload functionality
- [ ] Drag-and-drop reordering
- [ ] Preview before save
- [ ] Version history
- [ ] Bulk operations
- [ ] Content templates

## Support

For issues or questions:
1. Check database tables for data integrity
2. Review RLS policies for access issues
3. Check browser console for errors
4. Verify admin authentication

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Compatible With**: Next.js 15, Supabase, Tailwind CSS
