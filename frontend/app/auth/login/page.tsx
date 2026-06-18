'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import GoogleLoginButton from '@/components/GoogleLoginButton'
import { useAuthStore } from '@/store/authStore'
import axios from 'axios'

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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-2">
            🍕 DreamFood
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Order your dreams, save your money
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
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
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-slate-300 dark:border-slate-600"></div>
            <div className="px-3 text-sm text-slate-500">OR</div>
            <div className="flex-1 border-t border-slate-300 dark:border-slate-600"></div>
          </div>

          {/* Social Login - Google OAuth */}
          <GoogleLoginButton
            onError={(err) => setError(err)}
            className="mb-3"
          />

          <button
            onClick={() => router.push('/auth/guest')}
            className="w-full py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition font-medium"
          >
            Continue as Guest
          </button>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-primary font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
