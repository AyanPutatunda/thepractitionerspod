// Single place to edit the show's links and copy.
// Empty URLs are hidden on the site, so fill them in as each platform goes live.
export const site = {
  name: 'The Practitioners Pod',
  url: 'https://thepractitionerspod.com',
  tagline: 'Real talk from people who build in production.',
  description:
    'A tech podcast hosted by Ayan Putatunda. Long-form conversations with data, AI and platform engineers about what actually works when you ship to production.',
  email: 'hello@thepractitionerspod.com',

  host: {
    name: 'Ayan Putatunda',
    role: 'Staff Data Engineer · Host',
    website: 'https://ayanputatunda.com',
    linkedin: 'https://www.linkedin.com/in/ayanputatunda/',
    // Drop a square photo at public/images/host.jpg and set this to '/images/host.jpg'.
    photo: '',
  },

  // Where people can listen. Leave a value empty until the show is live there.
  platforms: {
    youtube: '',
    spotify: '',
    apple: '',
    rss: '',
  },

  socials: {
    linkedin: 'https://www.linkedin.com/in/ayanputatunda/',
    x: '',
    youtube: '',
    instagram: '',
  },
} as const;

export const platformLabels: Record<keyof typeof site.platforms, string> = {
  youtube: 'YouTube',
  spotify: 'Spotify',
  apple: 'Apple Podcasts',
  rss: 'RSS',
};

export const activePlatforms = Object.entries(site.platforms)
  .filter(([, url]) => url)
  .map(([key, url]) => ({ key: key as keyof typeof site.platforms, url, label: platformLabels[key as keyof typeof site.platforms] }));
