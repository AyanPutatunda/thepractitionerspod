# Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Supabase (Database + Authentication)

**See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.**

Quick version:
1. Go to [supabase.com](https://supabase.com) and create a project
2. Get your credentials from Project Settings → API
3. Create a `.env.local` file:

```env
# Supabase (Required - provides both database and auth)
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
DATABASE_URL="postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres"

# YouTube API (Required for episodes)
YOUTUBE_API_KEY="get-from-google-cloud-console"
YOUTUBE_CHANNEL_ID="your-youtube-channel-id"

# Email (Optional - Supabase has built-in email)
RESEND_API_KEY="get-from-resend.com"
FROM_EMAIL="noreply@thepractitionerspod.com"
ADMIN_EMAIL="admin@thepractitionerspod.com"
```

## 3. Initialize Database

Your Supabase project already has a PostgreSQL database. Just push the schema:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to Supabase database
npm run db:push
```

This creates all tables (Episodes, Guests, Applications, etc.) in your Supabase database.

## 4. Create Admin User

**In Supabase Dashboard:**
1. Go to your Supabase project
2. Click **Authentication** → **Users**
3. Click **Add user** → **Create new user**
4. Enter email and password
5. **Important**: Check **Auto Confirm User** ✅
6. Click **Create user**

Done! You can now login with these credentials.

## 5. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "YouTube Data API v3"
4. Create credentials (API Key)
5. Copy the API key to your `.env` file

To find your YouTube Channel ID:
- Go to your YouTube Studio
- Click on Settings → Channel → Advanced settings
- Copy your Channel ID

## 6. Set Up Email (Optional)

1. Sign up at [Resend](https://resend.com)
2. Get your API key
3. Verify your domain (or use their test domain)
4. Add API key to `.env`

## 7. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 8. Test the Website

### Public Pages
- Home: http://localhost:3000
- Episodes: http://localhost:3000/episodes
- Guests: http://localhost:3000/guests
- Apply: http://localhost:3000/apply
- About: http://localhost:3000/about
- Contact: http://localhost:3000/contact

### Admin Dashboard
- Login: http://localhost:3000/admin/login
- Dashboard: http://localhost:3000/admin

## 9. Add Sample Data (Optional)

Use Prisma Studio to add sample data:
```bash
npm run db:studio
```

Or create sample data programmatically in the database.

## 10. Deploy to Production

### Vercel Deployment

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add all environment variables
5. Deploy

### Database for Production

Update `DATABASE_URL` in Vercel with your production database URL.

## Common Issues

### "Can't reach database server"
- Check if PostgreSQL is running
- Verify DATABASE_URL is correct
- Check firewall settings

### "YouTube API not working"
- Verify API key is correct
- Check if YouTube Data API v3 is enabled
- Ensure you're not hitting rate limits

### "Admin login not working"
- Make sure you created a user in Supabase
- Check "Auto Confirm User" was enabled
- Verify password is correct (case-sensitive)
- Check Supabase credentials in `.env.local`

## Next Steps

1. **Customize Content**: Update the About page with your host information
2. **Add Episodes**: Either sync from YouTube or add manually via admin
3. **Branding**: Replace placeholder text with your actual brand content
4. **Email Templates**: Customize email templates in the code
5. **Analytics**: Add Google Analytics tracking ID
6. **Domain**: Configure your custom domain in hosting provider

## Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review the [Prisma Schema](./prisma/schema.prisma) for database structure
- Inspect component files for customization options

---

Happy podcasting! 🎙️

