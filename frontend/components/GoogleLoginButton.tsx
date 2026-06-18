/**
 * Google OAuth Login Button Component
 * Uses @react-oauth/google for authentication with custom styling
 */

'use client'

import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { handleGoogleAuthSuccess } from '@/lib/googleOAuth'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import type { CredentialResponse } from '@react-oauth/google'

// Lazy load GoogleLogin to avoid SSR issues
const GoogleLogin = dynamic(() => 
  import('@react-oauth/google').then(mod => ({
    default: mod.GoogleLogin
  })),
  { ssr: false }
)

interface GoogleLoginButtonProps {
  onSuccess?: () => void
  onError?: (error: string) => void
  className?: string
}

export default function GoogleLoginButton({
  onSuccess,
  onError,
  className = '',
}: GoogleLoginButtonProps) {
  const router = useRouter()
  const { login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const googleButtonRef = useRef<HTMLDivElement>(null)
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  const handleSuccess = useCallback(
    async (credentialResponse: CredentialResponse) => {
      if (!credentialResponse.credential) {
        const errorMsg = 'No credential received from Google'
        setError(errorMsg)
        onError?.(errorMsg)
        return
      }

      setIsLoading(true)
      setError('')

      try {
        // Send token to backend for validation
        const authResponse = await handleGoogleAuthSuccess(credentialResponse.credential)

        // Update auth store with user info
        login(
          {
            id: authResponse.user_id,
            email: authResponse.email,
            username: authResponse.email.split('@')[0],
            fullName: authResponse.full_name,
          },
          authResponse.access_token
        )

        // Call optional callback
        onSuccess?.()

        // Redirect to home
        router.push('/home')
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : 'Google authentication failed'
        console.error('Google login error:', err)
        setError(errorMsg)
        onError?.(errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [login, router, onSuccess, onError]
  )

  const handleError = useCallback(() => {
    const errorMsg = 'Google sign-in failed'
    setError(errorMsg)
    onError?.(errorMsg)
  }, [onError])

  const handleButtonClick = useCallback(() => {
    // Click the hidden Google button to trigger the login flow
    const googleButton = googleButtonRef.current?.querySelector('div[role="button"]') as HTMLElement
    if (googleButton) {
      googleButton.click()
    } else {
      console.error('Google button not found')
      setError('Google login button not ready. Please refresh the page.')
    }
  }, [])

  // Show message if client ID is not configured
  if (!clientId) {
    return (
      <div className={`${className}`}>
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-600 dark:text-yellow-400 text-sm">
          Google OAuth is not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable.
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Hidden Google Login component for OAuth handling */}
      <div ref={googleButtonRef} className="hidden">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap={false}
        />
      </div>

      {/* Custom styled button */}
      <button
        onClick={handleButtonClick}
        disabled={isLoading}
        type="button"
        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-700 dark:text-slate-100 flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
            <span>Signing in with Google...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                style={{ color: '#4285F4' }}
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                style={{ color: '#34A853' }}
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                style={{ color: '#FBBC05' }}
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                style={{ color: '#EA4335' }}
              />
            </svg>
            <span>Sign in with Google</span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-start gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
