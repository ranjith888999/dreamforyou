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

  if (!clientId) {
    console.warn(
      'NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable not set. Google OAuth will not work.'
    )
    return <>{children}</>
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  )
}
