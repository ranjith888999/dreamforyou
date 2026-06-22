import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Sign In or Create Account',
  description:
    'Sign in to DreamFood with Google or create a free account to start ordering your dream meals, earn coins, and track your food adventures.',
  keywords: ['DreamFood login', 'food delivery sign in', 'create food account', 'Google sign in food app'],
  robots: { index: false, follow: false }, // auth pages should not be indexed
  alternates: { canonical: absoluteUrl('/auth/login') },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {children}
    </div>
  )
}
