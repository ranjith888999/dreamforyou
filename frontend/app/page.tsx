import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { buildFAQSchema, SITE_CONFIG } from '@/lib/seo'

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — Free Food Delivery Simulation, Order Online`,
  description:
    "DreamFood is India's #1 free food delivery simulation. Browse 100+ restaurants, explore Biryani, Pizza, Burger & more, earn DreamCoins, and experience online food ordering — without spending a rupee.",
  alternates: { canonical: SITE_CONFIG.url },
  openGraph: {
    title: `${SITE_CONFIG.name} — Free Food Delivery Simulation`,
    description:
      'Order food online for free. Browse restaurants, simulate delivery, earn coins and level up on DreamFood.',
    url: SITE_CONFIG.url,
    type: 'website',
  },
}

const landingFAQs = [
  {
    question: 'What is DreamFood and how does it work?',
    answer:
      'DreamFood is a free food delivery simulation platform. Browse real menus from top restaurants, add dishes to your cart, and simulate the complete online food ordering experience — no payment, no credit card needed.',
  },
  {
    question: 'Is DreamFood completely free?',
    answer:
      'Yes! DreamFood is 100% free forever. It is a simulation — you experience the dopamine rush of food ordering without any real financial transaction.',
  },
  {
    question: 'What cuisines are available on DreamFood?',
    answer:
      'DreamFood offers Biryani, Pizza, Burger, Chinese, South Indian, North Indian, Ice Cream, Desserts, Snacks, and Healthy Food from hundreds of top-rated restaurants.',
  },
]

const features = [
  { emoji: '🍕', title: 'Browse Real Restaurants', description: 'Explore hundreds of restaurants with real menus, ratings, and delivery times across 10 cuisine categories.' },
  { emoji: '🛵', title: 'Live Delivery Simulation', description: 'Watch your order progress through 8 real-time stages from restaurant confirmation to your doorstep.' },
  { emoji: '🏆', title: 'Earn Coins & Level Up', description: 'Every dream order earns DreamCoins. Maintain streaks, unlock achievements, and climb the global leaderboard.' },
  { emoji: '💰', title: 'Track Your Savings', description: "See exactly how much money you've saved by ordering from your dreams — not your wallet." },
  { emoji: '🔐', title: 'Google Sign-In', description: 'Log in instantly with Google OAuth or continue as a guest. No passwords, no friction.' },
  { emoji: '🌙', title: 'Dark Mode & Beautiful UI', description: 'Switch between warm orange and cool red themes. Fully responsive with dark mode support.' }
]

const cuisines = [
  { slug: 'biryani', emoji: '🍚', label: 'Biryani' },
  { slug: 'pizza', emoji: '🍕', label: 'Pizza' },
  { slug: 'burger', emoji: '🍔', label: 'Burger' },
  { slug: 'chinese', emoji: '🥡', label: 'Chinese' },
  { slug: 'south-indian', emoji: '🥞', label: 'South Indian' },
  { slug: 'north-indian', emoji: '🍛', label: 'North Indian' },
  { slug: 'desserts', emoji: '🍰', label: 'Desserts' },
  { slug: 'healthy-food', emoji: '🥗', label: 'Healthy Food' },
]

export default function LandingPage() {
  return (
    <>
      <JsonLd data={buildFAQSchema(landingFAQs)} />
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-orange-500 focus:rounded-lg focus:shadow-lg">Skip to main content</a>
        <header className="sticky top-0 z-50 bg-white dark:bg-slate-950 shadow-sm" role="banner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center space-x-2" aria-label="DreamFood homepage">
                <span className="text-2xl" aria-hidden="true">🍕</span>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">DreamFood</span>
              </Link>
              <nav aria-label="Main navigation" className="flex items-center space-x-4">
                <Link href="/home" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-orange-500 transition">Browse Restaurants</Link>
                <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-slate-900 dark:text-white hover:text-orange-500 transition">Sign In</Link>
                <Link href="/auth/register" className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 hover:shadow-lg transition">Sign Up Free</Link>
              </nav>
            </div>
          </div>
        </header>
        <main id="main-content">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-labelledby="hero-heading">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 id="hero-heading" className="text-5xl font-bold mb-6 leading-tight text-slate-900 dark:text-white">
                  Order Food Online —{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">Free, No Payment</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
                  {"DreamFood is India's most engaging food delivery simulation. Browse Biryani, Pizza, Burgers and more from top restaurants — experience the complete ordering journey without spending a rupee."}
                </p>
                <p className="text-base text-slate-500 dark:text-slate-500 mb-8">Earn DreamCoins, track live delivery, and climb the leaderboard. Experience the complete food delivery journey — completely free.</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/home" className="px-8 py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 hover:shadow-xl transition">Browse Restaurants Free</Link>
                  <Link href="/auth/guest" className="px-8 py-3 text-lg font-semibold border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition">Try as Guest</Link>
                </div>
              </div>
              <div className="p-8 rounded-3xl shadow-2xl bg-gradient-to-r from-orange-500 to-orange-400" aria-hidden="true">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 space-y-4">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center"><div className="text-2xl font-bold text-orange-500">∞</div><p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Dream Orders</p></div>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center"><div className="text-2xl font-bold text-orange-500">0</div><p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Money Spent</p></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-slate-50 dark:bg-slate-900 py-20" aria-labelledby="features-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 id="features-heading" className="text-3xl font-bold text-center mb-4 text-slate-900 dark:text-white">Why Choose DreamFood?</h2>
              <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">The complete online food ordering experience — restaurants, menus, live tracking, rewards — all free.</p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 list-none p-0">
                {features.map((f) => (
                  <li key={f.title} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition text-center">
                    <div className="text-4xl mb-4" aria-hidden="true">{f.emoji}</div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">{f.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{f.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="cuisine-heading">
            <h2 id="cuisine-heading" className="text-3xl font-bold text-center mb-4 text-slate-900 dark:text-white">Browse by Cuisine</h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-10">From Hyderabadi Biryani to Gelato — explore every craving on DreamFood</p>
            <nav aria-label="Browse cuisines">
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 list-none p-0">
                {cuisines.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/cuisine/${c.slug}`} className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition text-center" aria-label={`Browse ${c.label} restaurants`}>
                      <span className="text-3xl" aria-hidden="true">{c.emoji}</span>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{c.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
          <section className="text-white py-20 bg-gradient-to-r from-orange-500 to-orange-400" aria-labelledby="cta-heading">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h2 id="cta-heading" className="text-4xl font-bold mb-6">Start Your Free Food Journey Today</h2>
              <p className="text-xl mb-8 opacity-90">Join thousands of food lovers who browse restaurants, simulate orders, and earn rewards on DreamFood.</p>
              <Link href="/home" className="inline-block px-10 py-4 text-lg font-semibold bg-white text-orange-500 rounded-lg hover:shadow-xl transition">Browse Restaurants Free</Link>
            </div>
          </section>
          <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="faq-landing-heading">
            <h2 id="faq-landing-heading" className="text-2xl font-bold text-center mb-10 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <dl className="space-y-5">
              {landingFAQs.map((faq, i) => (
                <div key={i} className="border border-slate-100 dark:border-slate-800 rounded-xl p-5 bg-slate-50 dark:bg-slate-900">
                  <dt className="font-semibold text-slate-900 dark:text-white mb-2">{faq.question}</dt>
                  <dd className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </main>
        <footer className="bg-slate-900 text-white py-12" aria-label="Site footer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div><p className="font-bold mb-2 text-lg">DreamFood</p><p className="text-slate-400 text-sm">{"India's free food delivery simulation. Order your dream meal without spending a rupee."}</p></div>
              <nav aria-label="Cuisine footer navigation"><p className="font-semibold mb-4">Cuisines</p><ul className="space-y-2 text-slate-400 text-sm"><li><Link href="/cuisine/biryani" className="hover:text-orange-400 transition">Biryani</Link></li><li><Link href="/cuisine/pizza" className="hover:text-orange-400 transition">Pizza</Link></li><li><Link href="/cuisine/burger" className="hover:text-orange-400 transition">Burger</Link></li><li><Link href="/cuisine/chinese" className="hover:text-orange-400 transition">Chinese</Link></li></ul></nav>
              <nav aria-label="More cuisine footer navigation"><p className="font-semibold mb-4">More Cuisines</p><ul className="space-y-2 text-slate-400 text-sm"><li><Link href="/cuisine/south-indian" className="hover:text-orange-400 transition">South Indian</Link></li><li><Link href="/cuisine/north-indian" className="hover:text-orange-400 transition">North Indian</Link></li><li><Link href="/cuisine/desserts" className="hover:text-orange-400 transition">Desserts</Link></li><li><Link href="/cuisine/healthy-food" className="hover:text-orange-400 transition">Healthy Food</Link></li></ul></nav>
              <nav aria-label="Site footer navigation"><p className="font-semibold mb-4">Explore</p><ul className="space-y-2 text-slate-400 text-sm"><li><Link href="/home" className="hover:text-orange-400 transition">Browse Restaurants</Link></li><li><Link href="/leaderboard" className="hover:text-orange-400 transition">Leaderboard</Link></li><li><Link href="/auth/login" className="hover:text-orange-400 transition">Sign In</Link></li><li><Link href="/auth/register" className="hover:text-orange-400 transition">Sign Up Free</Link></li></ul></nav>
            </div>
            <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
              <p>&copy; {new Date().getFullYear()} DreamFood. All rights reserved.</p>
              <p>Free simulation — Not a real food delivery service.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
