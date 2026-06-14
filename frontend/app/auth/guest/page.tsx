'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function GuestPage() {
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!guestName.trim()) {
      setError('Please enter your name')
      return
    }

    setIsLoading(true)

    try {
      // Store guest session in localStorage
      localStorage.setItem('guestMode', 'true')
      localStorage.setItem('guestName', guestName)
      if (guestEmail) {
        localStorage.setItem('guestEmail', guestEmail)
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      router.push('/home')
    } catch (err) {
      setError('Failed to start guest session. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickGuest = async () => {
    setIsLoading(true)
    try {
      localStorage.setItem('guestMode', 'true')
      localStorage.setItem('guestName', 'Guest User')
      await new Promise((resolve) => setTimeout(resolve, 800))
      router.push('/home')
    } catch (err) {
      setError('Failed to start guest session.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-2">
            🍕 DreamFood
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            No commitment, just pure ordering fun!
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-2">Guest Mode</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Experience DreamFood without creating an account
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter your name"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email (Optional)
              </label>
              <input
                id="email"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Starting Guest Session...
                </span>
              ) : (
                'Continue with Name'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-slate-300 dark:border-slate-600"></div>
            <div className="px-3 text-sm text-slate-500">OR</div>
            <div className="flex-1 border-t border-slate-300 dark:border-slate-600"></div>
          </div>

          <button
            onClick={handleQuickGuest}
            disabled={isLoading}
            className="w-full py-2 px-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition disabled:opacity-50"
          >
            Quick Guest Access
          </button>

          {/* Footer Links */}
          <p className="text-center mt-6 text-slate-600 dark:text-slate-400 text-sm">
            Ready to create an account?{' '}
            <Link href="/auth/register" className="text-primary font-semibold hover:underline">
              Sign Up
            </Link>
          </p>

          <p className="text-center mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            ℹ️ <strong>Guest Mode Benefits:</strong> Browse restaurants, create orders, and experience live delivery tracking without signing up!
          </p>
        </div>
      </div>
    </div>
  )
}
