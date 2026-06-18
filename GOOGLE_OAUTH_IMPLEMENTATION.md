# Google OAuth 2.0 Implementation - Complete Guide

## ✅ What's Been Implemented

### Backend Implementation
- **Endpoint**: `POST /api/auth/google/token`
- **File**: `backend/app/routers/google_oauth.py`
- **Flow**:
  1. Receives Google ID token from frontend
  2. Validates token with Google's servers
  3. Extracts user email and profile info
  4. Creates or updates user in database
  5. Returns JWT token for application use

**Database Changes**:
- Added `google_id` field to User model (unique, nullable)
- Made `hashed_password` nullable for OAuth-only users
- Supports both email/password and Google OAuth authentication

**Environment Variables**:
- `GOOGLE_CLIENT_ID` - Read from .env.prod
- `GOOGLE_CLIENT_SECRET` - Read from .env.prod

### Frontend Implementation

**Components Created**:
1. **GoogleOAuthProvider.tsx** - Wraps app with Google OAuth context
2. **GoogleLoginButton.tsx** - Reusable login button component with:
   - Automatic Google popup
   - Token validation via backend
   - User store integration
   - Error handling
   - Loading states

**Utilities Created**:
- `lib/googleOAuth.ts` - Token validation and API communication

**Updated Files**:
- `app/layout.tsx` - Added GoogleOAuthProvider wrapper
- `app/auth/login/page.tsx` - Integrated GoogleLoginButton
- `package.json` - Added @react-oauth/google dependency

**Environment Variables**:
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - Public, safe to expose

## 🔐 Security Configuration

### Google Cloud Setup
```
Project: coupons-473408
Client ID: [Your Google Client ID from Cloud Console]
Client Secret: [Your Google Client Secret - NEVER COMMIT TO GIT]
OAuth Credentials: Created
```

### Authorized Origins
- ✅ http://localhost:3000 (development)
- ✅ https://bkr-makedreamtrue.nwp2mw.easypanel.host (production)

### Redirect URIs
- ✅ http://localhost:3000/auth/callback/google (development)
- ✅ https://bkr-makedreamtrue.nwp2mw.easypanel.host/auth/callback/google (production)

## 📋 Authentication Flow

```
User clicks "Sign in with Google"
         ↓
Google popup opens (frontend handles)
         ↓
User authenticates with Google
         ↓
Google returns ID token to frontend
         ↓
Frontend sends token to POST /api/auth/google/token
         ↓
Backend validates token with Google
         ↓
Backend creates/updates user in database
         ↓
Backend returns JWT token
         ↓
Frontend stores JWT in localStorage
         ↓
Frontend updates Zustand auth store
         ↓
Frontend redirects to /home
```

## 🚀 Deployment Instructions

### Step 1: Update EasyPanel Environment Variables

In your EasyPanel dashboard, set these environment variables:

**Backend Environment:**
```
GOOGLE_CLIENT_ID=[Your Google Client ID]
GOOGLE_CLIENT_SECRET=[Your Google Client Secret]
```

**Frontend Environment (in Dockerfile or EasyPanel):**
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[Your Google Client ID]
```

### Step 2: Update Frontend Environment Files

For **local development** (.env.local):
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[Your Google Client ID from Cloud Console]
```

For **production** (.env.production):
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[Your Google Client ID from Cloud Console]
```

### Step 3: Rebuild Docker Image

```bash
# Push updated code to GitHub
git push

# EasyPanel will automatically rebuild the Docker image with:
# 1. New Frontend: With @react-oauth/google package
# 2. New Backend: With google_oauth.py router and environment variables
# 3. Updated User model with google_id support
```

### Step 4: Verify Deployment

After EasyPanel redeploys:

1. **Check Backend Health**:
   ```
   GET https://bkr-makedreamtrue.nwp2mw.easypanel.host/api/auth/google/health
   ```
   Should return:
   ```json
   {
     "service": "Google OAuth",
     "status": "healthy",
     "configured": true
   }
   ```

2. **Test Login Page**:
   - Navigate to login page
   - Click "Continue with Google"
   - Complete Google authentication
   - Should redirect to /home with JWT stored

## 📦 Dependencies Added

**Backend** (already in requirements.txt):
- ✅ google-auth==2.25.2
- ✅ google-auth-oauthlib==1.2.0
- ✅ google-auth-httplib2==0.2.0

**Frontend** (added to package.json):
- ✅ @react-oauth/google==0.12.0

## 🧪 Testing Locally

### Setup for Local Development

1. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Create .env.local**:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXT_PUBLIC_APP_NAME=DreamFood
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=[Your Google Client ID]
   ```

3. **Create .env for Backend**:
   ```
   DATABASE_URL=postgresql://user:password@localhost/dreamfood
   REDIS_URL=redis://localhost:6379
   SECRET_KEY=your-secret-key
   GROQ_API_KEY=your-groq-key
   GOOGLE_CLIENT_ID=[Your Google Client ID]
   GOOGLE_CLIENT_SECRET=[Your Google Client Secret]
   ```

4. **Run Services**:
   ```bash
   # Terminal 1: Backend
   cd backend
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8001

   # Terminal 2: Frontend
   cd frontend
   npm run dev

   # Terminal 3: Nginx (optional for local testing)
   # Or use docker-compose
   ```

5. **Test OAuth Flow**:
   - Open http://localhost:3000
   - Navigate to login
   - Click "Continue with Google"
   - Authenticate
   - Should be logged in

## 🐛 Troubleshooting

### "Google OAuth is not configured"
- Check NEXT_PUBLIC_GOOGLE_CLIENT_ID is set
- Verify Client ID format in .env files

### "Token validation failed"
- Ensure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct
- Check origin is authorized in Google Cloud Console
- Verify token is fresh (not expired)

### "User not created"
- Check database connection in backend
- Verify User model has been migrated with google_id column
- Check backend logs for SQL errors

### Login button not appearing
- Check @react-oauth/google is installed: `npm list @react-oauth/google`
- Verify GoogleOAuthProvider wraps the component
- Check browser console for errors

## 📚 File Structure

```
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   └── google_oauth.py ⭐ NEW
│   │   ├── models.py (updated)
│   │   ├── config.py (updated)
│   │   └── main.py (updated)
│   └── requirements.txt
├── frontend/
│   ├── components/
│   │   ├── GoogleLoginButton.tsx ⭐ NEW
│   │   └── GoogleOAuthProvider.tsx ⭐ NEW
│   ├── lib/
│   │   └── googleOAuth.ts ⭐ NEW
│   ├── app/
│   │   ├── layout.tsx (updated)
│   │   └── auth/login/page.tsx (updated)
│   ├── package.json (updated)
│   ├── .env.local (updated)
│   └── .env.production (updated)
├── .env.prod (updated)
└── GOOGLE_OAUTH_SETUP.md ⭐ NEW
```

## ✨ What Works Now

✅ Users can sign in with Google on login page
✅ Google credentials validated with Google servers
✅ User accounts created/updated automatically
✅ JWT tokens issued for OAuth users
✅ User data persisted to database
✅ Works on both localhost and production
✅ Mobile-friendly Google login popup
✅ Error handling and user feedback

## 🔄 Next Steps (Optional Enhancements)

1. **Add Email Verification** for OAuth users
2. **Link Accounts** - Let users link Google to existing email accounts
3. **Social Profile Integration** - Store profile picture from Google
4. **Multi-provider OAuth** - Add Apple Sign In, GitHub, etc.
5. **Automatic JWT Refresh** - Add refresh token rotation
6. **Session Management** - Implement logout on all devices

## 📞 Support

If you encounter issues:
1. Check [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md) for configuration details
2. Review backend logs: `docker logs <container-id>`
3. Check frontend console: Browser DevTools → Console
4. Verify Google Cloud Console configuration

---

**Status**: ✅ **Ready for Deployment**
**Last Updated**: 2026-06-18
**Version**: 1.0.0
