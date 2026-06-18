/**
 * Google OAuth Provider Component
 * Initializes Google OAuth for the entire application
 */

'use client'

import { ReactNode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'

interface GoogleOAuthProviderProps {
  children: ReactNode
}

export default function GoogleOAuthProviderComponent({
  children,
}: GoogleOAuthProviderProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  // If no client ID (e.g., during build), still render children but without OAuth
  // This allows Next.js static generation to work
  if (!clientId) {
    console.warn(
      'NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable not set. Google OAuth will not work at runtime.'
    )
    // Return children without provider during build/development without client ID
    // The GoogleLoginButton will handle the missing client ID gracefully
    return <>{children}</>
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  )
}
