import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Track Your Dream Order — Live Delivery Tracking',
  description:
    'Watch your DreamFood order move through every stage in real-time — from restaurant confirmation to delivery at your door.',
  robots: { index: false, follow: false },
}

export default function OrderTrackingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
