> **Historical.** Phase 0 does not create a hosted Supabase project. Schema changes belong in `supabase/migrations`, not `prisma db push`. Follow the root [README](./README.md) and [PROGRESS.md](./PROGRESS.md).

# Supabase Setup Guide

This project now uses **Supabase** for both authentication and database. This guide will walk you through the complete setup.

## 🎯 What is Supabase?

Supabase provides:
- ✅ PostgreSQL database (same as before)
- ✅ Built-in authentication system (replaces NextAuth)
- ✅ User management dashboard
- ✅ Email verification
- ✅ Password reset functionality
- ✅ Free tier available!

## 📝 Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Fill in the details:
   - **Name**: `thepractitionerspod` (or your choice)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to you
4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

## 🔑 Step 2: Get Your Credentials

Once your project is created:

1. Go to **Project Settings** (gear icon) → **API**
2. You'll need these values:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Go to **Project Settings** → **Database**
4. Scroll down to **Connection String** → **URI**
5. Copy the connection string (replace `[YOUR-PASSWORD]` with the password you created)

## 🔧 Step 3: Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxxxxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Database (from Supabase)
DATABASE_URL="postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# YouTube API (Required for episodes)
YOUTUBE_API_KEY="your-youtube-api-key"
YOUTUBE_CHANNEL_ID="your-youtube-channel-id"

# Email (Optional - for automation)
RESEND_API_KEY="your-resend-api-key"
FROM_EMAIL="noreply@thepractitionerspod.com"
ADMIN_EMAIL="admin@thepractitionerspod.com"
```

## 💾 Step 4: Set Up Database Schema

Run these commands to create your database tables:

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to Supabase database
npm run db:push
```

This will create all the necessary tables (Episodes, Guests, Applications, etc.) in your Supabase database.

## 👤 Step 5: Create Your First Admin User

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project
2. Click **Authentication** in the sidebar
3. Click **Users** tab
4. Click **Add user** → **Create new user**
5. Fill in:
   - **Email**: `your@email.com`
   - **Password**: `your-secure-password`
   - **Auto Confirm User**: ✅ YES (check this box!)
6. Click **Create user**

That's it! You can now login with these credentials.

### Option 2: Using SQL (Advanced)

Go to **SQL Editor** in Supabase and run:

```sql
-- This creates a user with email verification already done
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'your@email.com', -- Change this!
  crypt('your-password', gen_salt('bf')), -- Change this!
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

## 🚀 Step 6: Test Your Setup

1. Start the development server:
```bash
npm run dev
```

2. Go to: `http://localhost:3000/admin/login`

3. Login with your email and password

4. You should be redirected to `/admin` dashboard!

## 🎨 Step 7: Configure Email (Optional but Recommended)

By default, Supabase sends emails for:
- Email verification
- Password reset
- Magic links

### Use Supabase's Default (Quick Start)
Supabase provides email service out of the box. No setup needed!

### Use Custom SMTP (Production)
For production, use your own SMTP:

1. Go to **Project Settings** → **Auth**
2. Scroll to **SMTP Settings**
3. Enable **Enable Custom SMTP**
4. Add your SMTP credentials (or use a service like Resend)

## 📧 Email Templates

You can customize email templates:

1. Go to **Authentication** → **Email Templates**
2. Customize templates for:
   - Confirmation (email verification)
   - Invite
   - Magic Link
   - Change Email
   - Reset Password

## 🔐 Step 8: Configure Auth Settings (Optional)

Go to **Authentication** → **Providers** to configure:

### Email Settings
- Enable/disable email confirmation
- Set redirect URLs
- Customize email rate limits

### Social Providers (Optional)
Enable login with:
- Google
- GitHub
- Twitter
- And many more!

Just click on the provider and add your OAuth credentials.

## 🌐 Step 9: Deploy to Production

### Environment Variables for Vercel

When deploying to Vercel, add these environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres.xxxxxxxxxxxxx:[password]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
YOUTUBE_API_KEY=your-key
YOUTUBE_CHANNEL_ID=your-channel-id
RESEND_API_KEY=your-key (optional)
FROM_EMAIL=noreply@thepractitionerspod.com (optional)
ADMIN_EMAIL=admin@thepractitionerspod.com (optional)
```

### Update Supabase Auth Settings

1. Go to **Authentication** → **URL Configuration**
2. Add your production URL:
   - **Site URL**: `https://your-domain.com`
   - **Redirect URLs**: 
     - `https://your-domain.com/**`
     - `https://your-domain.vercel.app/**` (if using Vercel)

## 🔄 Managing Users

### Add More Admin Users

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Create with email and password
4. Make sure to check **Auto Confirm User**

### Reset User Password

1. Go to **Authentication** → **Users**
2. Find the user
3. Click **...** (three dots)
4. Select **Reset Password**
5. User will receive reset email

### Delete User

1. Go to **Authentication** → **Users**
2. Find the user
3. Click **...** (three dots)
4. Select **Delete user**

## 🛡️ Security Best Practices

### Row Level Security (RLS)
Your application data tables (Episodes, Guests, etc.) don't need RLS since they're managed server-side. But if you want to add RLS:

```sql
-- Example: Only allow authenticated users to read episodes
ALTER TABLE "Episode" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read episodes"
ON "Episode"
FOR SELECT
TO authenticated
USING (true);
```

### API Keys
- ✅ The `anon` key is safe to use in your frontend
- ❌ Never expose your `service_role` key
- ✅ All authenticated requests are automatically secured

## 📊 Monitoring

### View Auth Activity
Go to **Authentication** → **Users** to see:
- Total users
- New signups
- Active users
- Failed login attempts

### Database Usage
Go to **Database** → **Usage** to monitor:
- Database size
- Number of rows
- API requests
- Bandwidth

## 🆘 Troubleshooting

### "Invalid login credentials"
- Check email is confirmed (Auto Confirm User was checked)
- Verify password is correct
- Check user exists in Authentication → Users

### "Database connection error"
- Verify DATABASE_URL is correct
- Check password in connection string
- Ensure `npm run db:push` was successful

### "Supabase URL not found"
- Make sure `.env.local` exists (not just `.env`)
- Verify environment variables are set correctly
- Restart dev server: `npm run dev`

### Email not sending
- Check SMTP settings in Supabase
- Verify email provider configuration
- Check spam folder

## 🎉 You're Done!

Your website now uses Supabase for:
- ✅ User authentication (login/logout)
- ✅ Session management
- ✅ PostgreSQL database
- ✅ Email verification
- ✅ Password reset

All while keeping the same beautiful UI and functionality!

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

**Need help?** Check the main [README.md](./README.md) or [SETUP.md](./SETUP.md) for more information.

