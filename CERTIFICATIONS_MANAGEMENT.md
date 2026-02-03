# Certifications Management Guide

## Overview
The certification section on the homepage displays quality certifications and standards that your products meet. Admins can now fully manage these certifications through the admin panel.

## Features
- ✅ Add, edit, and delete certifications
- ✅ Minimum 3 active certifications required
- ✅ Maximum 10 certifications allowed
- ✅ Drag-and-drop ordering via display_order
- ✅ Enable/disable certifications without deleting
- ✅ Responsive grid layout (2-4 columns based on screen size)

## Database Schema

### Table: `certifications`
```sql
- id: UUID (Primary Key)
- title: TEXT (Required) - e.g., "GMO Free", "GMP Certified"
- icon_url: TEXT (Required) - Path to certification icon/badge
- display_order: INTEGER (Default: 0) - Controls display order
- is_active: BOOLEAN (Default: true) - Show/hide certification
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Admin Interface

### Accessing Certification Management
1. Login to admin panel
2. Navigate to **Admin > Home Content**
3. Click on the **Certifications** tab

### Adding a New Certification

1. Click the "Certifications" tab
2. Fill in the form:
   - **Title**: Name of the certification (e.g., "ISO 9001:2015")
   - **Icon URL**: Path to the certification icon (e.g., `/certifications/iso-certified.png`)
   - **Display Order**: Number to control position (lower numbers appear first)
   - **Active**: Toggle to show/hide
3. Click "Create"

**Note**: You cannot add more than 10 certifications total.

### Editing a Certification

1. In the certifications list, click "Edit" next to the certification
2. Form will populate with existing data
3. Make your changes
4. Click "Update"
5. Click "Cancel" to discard changes

### Deleting a Certification

1. Click "Delete" next to the certification you want to remove
2. Confirm the deletion in the dialog

**Note**: You cannot delete a certification if it would result in less than 3 active certifications.

### Display Order

Certifications are displayed in ascending order by the `display_order` field:
- Lower numbers appear first (left to right, top to bottom)
- You can reorder by editing the display_order value
- Example: 1, 2, 3, 4, 5, etc.

### Active/Inactive Toggle

- **Active**: Certification is visible on the homepage
- **Inactive**: Certification is hidden but not deleted
- The counter shows how many certifications are currently active
- Minimum 3 active certifications required

## Frontend Display

### Home Page Location
The certifications section appears on the homepage:
- **Section Title**: "Certificate of Natural Goodness"
- **Subtitle**: "Certified quality you can trust"
- **Layout**: Responsive grid (2-4 columns)
- **Background**: Emerald gradient with white card

### Responsive Breakpoints
- **Mobile (< 640px)**: 2 columns
- **Tablet (640px-768px)**: 3 columns
- **Desktop (768px+)**: 4 columns

### Icon Requirements
- **Format**: PNG recommended (supports transparency)
- **Size**: 96x96px to 120x120px optimal
- **Location**: Store in `/public/certifications/` directory
- **Naming**: Use kebab-case (e.g., `gmo-free.png`, `iso-certified.png`)

## Migration Setup

### Running the Migration

If using Supabase CLI (local):
```bash
npx supabase db reset
```

If using Supabase Dashboard:
1. Go to SQL Editor
2. Copy contents of `supabase/migrations/006_home_content_tables.sql`
3. Run the migration
4. Verify tables are created

### Default Data
The migration includes 8 default certifications:
1. GMO Free
2. GMP Certified
3. 100% Natural
4. Gluten Free
5. Ethically Proven
6. AYUSH Standard
7. ISO 9001:2015
8. Lab Tested

## Image Upload Guide

### Preparing Certification Icons

1. **Create/Download Icon**
   - Transparent background recommended
   - Square aspect ratio (1:1)
   - Professional design

2. **Save to Public Directory**
   ```
   /public/certifications/your-certification.png
   ```

3. **Reference in Admin Panel**
   ```
   /certifications/your-certification.png
   ```

### Recommended Icon Sources
- Custom design using Figma/Canva
- Official certification authority websites
- Icon libraries (with proper licensing)

## Validation Rules

### Count Constraints
- **Minimum Active**: 3 certifications must be active
- **Maximum Total**: 10 certifications maximum
- System enforces these limits automatically

### Field Validation
- **Title**: Required, max 100 characters
- **Icon URL**: Required, valid URL format
- **Display Order**: Integer only

## Best Practices

### Content Guidelines
1. **Use Real Certifications**: Only display certifications you actually have
2. **Keep Titles Short**: 2-4 words maximum
3. **Consistent Naming**: Use official certification names
4. **Update Regularly**: Remove expired certifications

### Design Guidelines
1. **Icon Consistency**: Use similar visual style for all icons
2. **Color Scheme**: Match your brand colors
3. **Clear Visibility**: Ensure icons are recognizable at small sizes
4. **Professional Look**: Use high-quality, crisp images

### Order Strategy
1. **Most Important First**: Place key certifications (GMP, ISO) early
2. **Industry Standard**: Follow common ordering in your industry
3. **Visual Balance**: Alternate between icon types for variety

## Troubleshooting

### "Maximum 10 certifications allowed" Error
- You've reached the limit
- Delete or deactivate an existing certification first

### "Minimum 3 active certifications required" Error
- Cannot delete/deactivate if only 3 active remain
- Activate or add more certifications first

### Icons Not Displaying
- Check file path is correct
- Verify image exists in `/public/certifications/`
- Check file extension matches (case-sensitive)
- Clear browser cache

### Changes Not Showing
- Refresh the homepage
- Check if certification is marked as "Active"
- Verify migration was applied successfully

## API Endpoints (Read-Only)

Public users can view certifications via:

```typescript
// Fetch all active certifications
const { data } = await supabase
  .from('certifications')
  .select('*')
  .eq('is_active', true)
  .order('display_order');
```

## Security & Permissions

### Row Level Security (RLS)
- **Public**: Can view active certifications only
- **Admins**: Full CRUD access to all certifications
- Policies enforce role-based access automatically

### Admin Role Verification
Only users with `role = 'admin'` in the `profiles` table can:
- Create certifications
- Update certifications
- Delete certifications
- Change active status

## Future Enhancements

Potential features for future development:
- [ ] Drag-and-drop reordering in UI
- [ ] Bulk upload certifications
- [ ] Certification expiry dates
- [ ] Upload icons directly from admin panel
- [ ] Preview before saving
- [ ] Certification categories/tags

## Support

For issues or questions:
1. Check this documentation first
2. Review migration file for schema details
3. Verify database tables exist
4. Check admin role permissions

---

**Last Updated**: February 2026
**Version**: 1.0
