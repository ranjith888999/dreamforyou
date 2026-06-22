import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Your Dream Cart — Review Order & Checkout',
  description:
    'Review items in your DreamFood cart, check your bill summary, apply discounts, and place your dream order — no real payment needed.',
  keywords: ['food cart', 'order review', 'checkout', 'DreamFood cart', 'food delivery cart'],
  robots: { index: false, follow: false }, // cart pages should not be indexed
  alternates: { canonical: absoluteUrl('/cart') },
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
