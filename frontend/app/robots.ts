import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/home', '/restaurant/', '/cuisine/', '/leaderboard'],
        disallow: [
          '/auth/',
          '/cart',
          '/order/',
          '/api/',
          '/_next/',
          '/admin/',
        ],
      },
      {
        // Block AI crawlers from scraping training data
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web'],
        disallow: ['/'],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  }
}
