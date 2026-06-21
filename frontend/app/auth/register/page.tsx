'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import GoogleLoginButton from '@/components/GoogleLoginButton'

// Make this page dynamic (not statically generated) to avoid build-time issues
export const dynamic = 'force-dynamic'

export default function RegisterPage() {
  const [error, setError] = useState('')
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="text-6xl">🍕</div>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-orange-400 mb-2">
            DreamFood
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Join millions ordering their dream meals
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-base">
              Sign up to start ordering delicious food
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-start gap-3">
                <span className="text-lg mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Google Sign Up */}
            <div className="space-y-4">
              <GoogleLoginButton 
                onSuccess={() => {
                  console.log('Google signup successful')
                }}
                onError={(error) => {
                  setError(error)
                }}
              />

              {/* Continue as Guest */}
              <button
                onClick={() => router.push('/auth/guest')}
                className="w-full py-3 px-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2 text-base"
              >
                👤 Continue as Guest
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
              Already have an account?{' '}
              <a href="/auth/login" className="text-orange-600 dark:text-orange-400 font-bold hover:text-orange-700 dark:hover:text-orange-300 transition">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
