import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found — DreamFood',
  description: 'The page you are looking for does not exist on DreamFood. Browse our restaurants, explore cuisines, or go back to the homepage.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-7xl mb-6" aria-hidden="true">🍽️</div>
        <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
          404 — Page Not Found
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Looks like this page went out for delivery and never came back! Let us
          help you find what you&apos;re looking for.
        </p>
        <nav aria-label="Not found page navigation" className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/home"
            className="px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 hover:shadow-lg transition"
          >
            Browse Restaurants
          </Link>
          <Link
            href="/"
            className="px-6 py-3 font-semibold rounded-lg border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-orange-400 hover:text-orange-500 transition"
          >
            Go to Homepage
          </Link>
        </nav>
        <nav aria-label="Popular cuisine links" className="mt-10">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Or browse a cuisine:
          </p>
          <ul className="flex flex-wrap gap-2 justify-center list-none p-0">
            {['biryani', 'pizza', 'burger', 'chinese', 'south-indian'].map((slug) => (
              <li key={slug}>
                <Link
                  href={`/cuisine/${slug}`}
                  className="px-3 py-1 text-sm rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-orange-100 hover:text-orange-600 transition capitalize"
                >
                  {slug.replace('-', ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
