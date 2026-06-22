import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Confirmed — Your Dream Meal is on its Way!',
  description: 'Your DreamFood order has been confirmed! Track your order in real-time and experience the excitement of food delivery.',
  robots: { index: false, follow: false }, // transactional pages should not be indexed
}

export default function OrderConfirmationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
