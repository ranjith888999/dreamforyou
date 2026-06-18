# Google OAuth Configuration Guide

This file explains how to configure Google OAuth credentials for DreamFood.

## Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing: "coupons-473408"
3. Enable Google+ API
4. Create OAuth 2.0 credentials (OAuth Consent Screen + Credentials)
5. Get your Client ID and Client Secret

## Configuration Locations

### Backend (.env.prod)
```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Frontend (.env.local for development, .env.production for production)
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
```

## Authorized Origins & Redirect URIs

Configure in Google Cloud Console:

**Authorized JavaScript Origins:**
- http://localhost:3000 (development)
- https://bkr-makedreamtrue.nwp2mw.easypanel.host (production)

**Authorized Redirect URIs:**
- http://localhost:3000/auth/callback/google (development)
- https://bkr-makedreamtrue.nwp2mw.easypanel.host/auth/callback/google (production)

## Important Security Notes

⚠️ **NEVER commit secrets to GitHub!**
- Keep credentials in environment variables only
- Use EasyPanel's environment variable settings
- Frontend uses NEXT_PUBLIC_GOOGLE_CLIENT_ID (safe - publicly visible)
- Backend uses GOOGLE_CLIENT_SECRET (secret - never expose)

## Testing Locally

Set credentials in `.env.local` for frontend:
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-actual-client-id
```

## Deployment on EasyPanel

Configure environment variables in EasyPanel dashboard:
- `GOOGLE_CLIENT_ID=your-client-id`
- `GOOGLE_CLIENT_SECRET=your-client-secret`
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id`

The Docker build will read these and embed them in the application.
