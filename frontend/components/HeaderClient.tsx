import React, { useEffect, useState } from 'react'
import { Header } from './Header'

/**
 * Prevents hydration mismatch by ensuring Header only renders on the client
 * after store values are available
 */
export function HeaderClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-950 shadow-sm border-b border-slate-200 dark:border-slate-800" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Placeholder to match server-rendered height */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍕</span>
              <span className="text-2xl font-bold">DreamFood</span>
            </div>
            <div className="w-32 h-10" /> {/* Placeholder for nav */}
          </div>
        </div>
      </header>
    )
  }

  return <Header />
}
