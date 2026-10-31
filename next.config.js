/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'yt3.ggpht.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/apply',
        destination: '/guest-application',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
