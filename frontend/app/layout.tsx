import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DreamFood - Food Delivery Simulation',
  description: 'Experience the excitement of ordering food without spending money',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-white`}>
        {children}
      </body>
    </html>
  )
}
