'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2, LogIn } from 'lucide-react'
import GoogleLoginButton from '@/components/GoogleLoginButton'
import { useAuthStore } from '@/store/authStore'
import axios from 'axios'

// Make this page dynamic (not statically generated) to avoid build-time issues
// with Google OAuth components that require client-side initialization
export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      const { access_token, user } = response.data
      login(
        {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.full_name,
        },
        access_token
      )
      router.push('/home')
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Invalid email or password'
      setError(errorMsg)
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-2">
            🍕 DreamFood
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Order your dreams, save your money
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
            Sign in to your account to continue
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Google Sign In */}
          <div className="mb-6">
            <GoogleLoginButton
              onError={(err) => setError(err)}
            />
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-medium">
                Or sign in with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
            </div>

            <div className="text-right">
              <Link
                href="#"
                className="text-sm text-orange-600 dark:text-orange-400 hover:underline font-medium transition"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Guest Option */}
          <button
            onClick={() => router.push('/auth/guest')}
            className="w-full mt-4 py-2.5 px-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition font-medium"
          >
            Continue as Guest
          </button>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-slate-600 dark:text-slate-400 text-sm">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline transition">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
