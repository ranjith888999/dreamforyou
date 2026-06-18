/**
 * Google OAuth utilities for token validation and user login
 */

import axios from 'axios'

export interface GoogleAuthResponse {
  access_token: string
  token_type: string
  user_id: number
  email: string
  full_name: string
  message: string
}

/**
 * Send Google ID token to backend for validation and JWT generation
 * @param idToken - Google ID token from frontend
 * @returns JWT token and user info
 */
export async function validateGoogleTokenWithBackend(
  idToken: string
): Promise<GoogleAuthResponse> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
    
    const response = await axios.post<GoogleAuthResponse>(
      `${apiUrl}/auth/google/token`,
      { id_token: idToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('Google OAuth validation error:', error)
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Google authentication failed')
    }
    throw error
  }
}

/**
 * Handle Google OAuth success
 * @param idToken - Google ID token
 * @returns User data with JWT token
 */
export async function handleGoogleAuthSuccess(idToken: string) {
  const response = await validateGoogleTokenWithBackend(idToken)
  
  // Store JWT token
  localStorage.setItem('token', response.access_token)
  
  return response
}

/**
 * Get the Google Client ID from environment
 */
export function getGoogleClientId(): string {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  if (!clientId) {
    console.warn('NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable not set')
    return ''
  }
  return clientId
}
