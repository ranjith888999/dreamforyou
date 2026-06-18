/**
 * Google OAuth Login Button Component
 * Uses @react-oauth/google for authentication
 */

'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { useAuthStore } from '@/store/authStore'
import { handleGoogleAuthSuccess } from '@/lib/googleOAuth'
import { Loader2 } from 'lucide-react'

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

  if (isLoading) {
    return (
      <button
        disabled
        className={`w-full py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50 ${className}`}
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        Signing in...
      </button>
    )
  }

  return (
    <div className={className}>
      {error && (
        <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        width="100%"
        text="signin_with"
        locale="en"
      />
    </div>
  )
}
