> **The live site is in [`web/`](./web).** See [`web/README.md`](./web/README.md) for local dev, the launch checklist (Netlify + GitHub Actions + domain), and how to publish episodes.
>
> Everything below this note describes an earlier Next.js + Supabase prototype (`app/`, `components/`, `lib/`, `prisma/`). It is not built or deployed and can be deleted.

---

# The Practitioners Pod - Website

A professional podcast platform featuring tech industry leaders with an integrated guest management system. Built with Next.js 14, TypeScript, Tailwind CSS, and Prisma.

## 🎯 Features

### Public-Facing Website
- **Home Page**: Hero section, latest episodes, featured guests, newsletter signup
- **Episodes**: Browse all episodes with filtering, search, and YouTube integration
- **Guests**: Directory of featured guests with social links and bios
- **About**: Podcast story, host information, values, and mission
- **Contact**: Contact form with FAQ section
- **Guest Application**: Comprehensive application form for potential guests

### Admin Dashboard
- **Application Management**: Review, accept, or decline guest applications
- **Episode Management**: Add and manage podcast episodes
- **Guest Database**: Complete profiles and contact information
- **Analytics**: Track applications, episodes, and engagement
- **Email Automation**: Automated responses and notifications

### Technical Features
- **YouTube Integration**: Automatic video embedding and metadata sync
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Secure admin access with NextAuth.js
- **Email**: Transactional emails with Resend
- **SEO Optimized**: Meta tags, Open Graph, and schema markup
- **Responsive Design**: Mobile-first, works on all devices
- **Type-Safe**: Full TypeScript coverage

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (provides PostgreSQL + Authentication)
- YouTube Data API key
- Resend API key (optional, for custom emails)

### Installation

1. **Clone the repository**
```bash
cd thepractitionerspod
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy the `.env.example` file:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```env
# Supabase (provides both database and authentication)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
DATABASE_URL="postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres"

# YouTube API
YOUTUBE_API_KEY="your-youtube-api-key"
YOUTUBE_CHANNEL_ID="your-youtube-channel-id"

# Email (Optional - Supabase has built-in email)
RESEND_API_KEY="your-resend-api-key"
FROM_EMAIL="noreply@thepractitionerspod.com"
ADMIN_EMAIL="admin@thepractitionerspod.com"
```

**See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed setup instructions.**

4. **Set up the database**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

5. **Create admin user**

Go to your Supabase project dashboard:
- Navigate to **Authentication** → **Users**
- Click **Add user** → **Create new user**
- Enter email and password
- Check **Auto Confirm User**
- Click **Create user**

That's it! No password hashing or scripts needed.

6. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## 📁 Project Structure

```
thepractitionerspod/
├── app/                          # Next.js 14 App Router
│   ├── (pages)/
│   │   ├── page.tsx             # Home page
│   │   ├── episodes/            # Episodes pages
│   │   ├── guests/              # Guests directory
│   │   ├── apply/               # Guest application
│   │   ├── about/               # About page
│   │   └── contact/             # Contact page
│   ├── admin/                   # Admin dashboard
│   │   ├── page.tsx            # Dashboard home
│   │   ├── login/              # Admin login
│   │   ├── applications/       # Manage applications
│   │   └── episodes/           # Manage episodes
│   ├── api/                     # API routes
│   │   ├── auth/               # NextAuth endpoints
│   │   ├── newsletter/         # Newsletter subscription
│   │   ├── contact/            # Contact form
│   │   └── applications/       # Guest applications
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/                  # React components
│   ├── Navigation.tsx          # Header navigation
│   ├── Footer.tsx              # Footer
│   ├── EpisodeCard.tsx         # Episode display
│   ├── NewsletterSignup.tsx    # Newsletter form
│   └── ...
├── lib/                         # Utility libraries
│   ├── prisma.ts               # Prisma client
│   ├── auth.ts                 # NextAuth configuration
│   └── youtube.ts              # YouTube API integration
├── prisma/                      # Database schema
│   └── schema.prisma           # Prisma schema
├── public/                      # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Deep Navy (#1a2332)
- **Accent**: Muted Blue (#4a5f7f)
- **Text**: Charcoal (#1a202c)
- **Background**: White (#ffffff) / Light Gray (#f8f9fa)

### Typography
- **Font Family**: Inter (sans-serif)
- **Heading Scale**: 5xl (48px) to xl (20px)
- **Body**: 16-18px with 1.6-1.8 line height
- **Letter Spacing**: 0.02em for headings

### Components
- Clean, minimal cards with subtle borders
- Smooth transitions (350ms duration)
- Hover states with color changes
- Responsive breakpoints (mobile-first)

## 🗄️ Database Schema

### Main Tables
- **Users**: Admin authentication
- **Episodes**: Podcast episodes with YouTube data
- **Guests**: Featured guest profiles
- **GuestApplications**: Guest application submissions
- **NewsletterSubscribers**: Email subscribers
- **ContactMessages**: Contact form submissions

See `prisma/schema.prisma` for complete schema.

## 🔌 API Routes

### Public Routes
- `POST /api/newsletter/subscribe` - Newsletter subscription
- `POST /api/contact` - Contact form submission
- `POST /api/applications/submit` - Guest application submission

### Protected Routes (Admin)
- `GET /api/admin/applications` - List all applications
- `PATCH /api/admin/applications/[id]` - Update application status
- `POST /api/admin/episodes` - Create new episode
- `GET /api/youtube/sync` - Sync episodes from YouTube

## 🔐 Authentication

The admin dashboard is protected by **Supabase Auth**.

**Benefits**:
- Built-in user management
- Email verification
- Password reset functionality
- Session management
- Optional social logins (Google, GitHub, etc.)

**Login**: Visit `/admin/login` with credentials created in Supabase dashboard

## 📧 Email Integration

Email templates and sending powered by Resend.

**Automated Emails**:
- Guest application confirmation
- Application status updates
- Newsletter welcome email
- Contact form acknowledgment
- Admin notifications

## 🎥 YouTube Integration

The YouTube Data API v3 is used to:
- Fetch channel videos automatically
- Pull video metadata (title, description, thumbnail)
- Get view counts and duration
- Embed videos responsively

**Setup**:
1. Create a Google Cloud project
2. Enable YouTube Data API v3
3. Generate API key
4. Add to `.env` file

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Max Content Width**: 1200px

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Database
- Your Supabase database is already production-ready
- Make sure you've run `npm run db:push` to create tables

## 🔧 Development

### Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run db:generate  # Generate Prisma Client
```

### Environment Variables

All required environment variables are documented in `.env.example`.

## 📝 Content Management

### Adding Episodes

1. **Via YouTube**: Episodes automatically sync from your YouTube channel
2. **Via Admin Dashboard**: Manually add episodes with YouTube video IDs
3. **Via Database**: Direct database insertion with Prisma Studio

### Managing Applications

1. Log in to `/admin`
2. Navigate to Applications
3. Review applications and update status
4. Send responses via email automation

## 🎯 SEO & Performance

- **Meta Tags**: Unique titles and descriptions for each page
- **Open Graph**: Social media preview optimization
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Images and videos load on demand
- **Fast Loading**: Optimized assets and code splitting

## 🤝 Contributing

This is a custom project for The Practitioners Pod. For issues or suggestions:
1. Document the issue
2. Contact the development team
3. Submit detailed bug reports or feature requests

## 📄 License

Proprietary - All rights reserved by The Practitioners Pod.

## 📞 Support

For technical support or questions:
- **Email**: dev@thepractitionerspod.com
- **Documentation**: See inline code comments
- **Database**: Use Prisma Studio for data management

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.com/) - Database + Authentication
- [Resend](https://resend.com/)
- [YouTube Data API](https://developers.google.com/youtube/v3)

---

**The Practitioners Pod** - Conversations with Tech Practitioners Who Build the Future

