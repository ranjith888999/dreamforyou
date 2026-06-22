import type { Metadata } from 'next'
import { SITE_CONFIG, absoluteUrl, buildFAQSchema } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Leaderboard — Top Food Dreamers & Rankings',
  description:
    'See who\'s leading the DreamFood leaderboard! Compete with friends, earn coins, level up, and claim your spot as the top Dream Foodie.',
  keywords: [
    'food leaderboard',
    'DreamFood rankings',
    'food rewards',
    'gamification',
    'food coins',
    'dream foodie',
  ],
  alternates: { canonical: absoluteUrl('/leaderboard') },
  openGraph: {
    title: 'DreamFood Leaderboard — Top Food Dreamers',
    description:
      'Compete with other food lovers on DreamFood! Earn coins, level up, and see your ranking.',
    url: absoluteUrl('/leaderboard'),
    siteName: SITE_CONFIG.name,
    type: 'website',
    images: [{ url: SITE_CONFIG.defaultOgImage, width: 1200, height: 630, alt: 'DreamFood Leaderboard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DreamFood Leaderboard',
    description: 'Compete & earn coins on DreamFood\'s global leaderboard.',
    images: [SITE_CONFIG.defaultOgImage],
  },
}

const leaderboardFAQs = [
  {
    question: 'How do I earn coins on DreamFood?',
    answer:
      'You earn DreamCoins by placing dream orders, maintaining daily streaks, and completing special challenges on DreamFood.',
  },
  {
    question: 'What are the leaderboard levels?',
    answer:
      'DreamFood has four levels: Food Explorer (0 orders), Craving Master (10 orders), Dream Foodie (50 orders), and Savings Champion (100 orders).',
  },
  {
    question: 'Are the orders on DreamFood real?',
    answer:
      'No! DreamFood is a free simulation platform. You can browse restaurants and "order" food without spending any real money.',
  },
]

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd data={buildFAQSchema(leaderboardFAQs)} />
      {children}
    </>
  )
}
