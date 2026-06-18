# 🚀 DreamFood Deployment Checklist

## ✅ Pre-Deployment Verification

- [x] Google OAuth implementation complete
- [x] All code committed to GitHub (commit: 2c6129e)
- [x] Environment files protected from git tracking
- [x] Backend Google OAuth router created
- [x] Frontend Google OAuth components created
- [x] Database schema updated (google_id field)
- [x] Configuration files updated

## 📋 Deployment Instructions for EasyPanel

### Step 1: Access EasyPanel Dashboard
1. Login to: https://easypanel.io/
2. Navigate to: DreamFood Application
3. Go to: Environment Variables section

### Step 2: Configure Backend Environment Variables

Add/Update these variables in EasyPanel:

```
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]?sslmode=disable
REDIS_URL=redis://localhost:6379
SECRET_KEY=[generate-secure-random-key]
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GROQ_API_KEY=[your-groq-api-key]
GOOGLE_CLIENT_ID=[your-google-client-id]
GOOGLE_CLIENT_SECRET=[your-google-client-secret]
APP_NAME=DreamFood
DEBUG=False
ENVIRONMENT=production
CORS_ORIGINS=https://bkr-makedreamtrue.nwp2mw.easypanel.host
FRONTEND_URL=https://bkr-makedreamtrue.nwp2mw.easypanel.host
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=[your-email@gmail.com]
SMTP_PASSWORD=[your-password]
```

### Step 3: Configure Frontend Environment Variables

Add/Update these variables in EasyPanel:

```
NEXT_PUBLIC_API_URL=https://bkr-makedreamtrue.nwp2mw.easypanel.host/api
NEXT_PUBLIC_APP_NAME=DreamFood
NEXT_PUBLIC_APP_URL=https://bkr-makedreamtrue.nwp2mw.easypanel.host
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[your-google-client-id]
```

### Step 4: Verify Dockerfile Configuration

In EasyPanel service settings:
- ✅ Dockerfile path: `./Dockerfile` (root level)
- ✅ Port: `8000` (Nginx reverse proxy)
- ✅ Working directory: `/app`

### Step 5: Trigger Redeploy

1. Click "Redeploy" button in EasyPanel
2. Monitor the build logs:
   - Frontend build (Node.js stage)
   - Backend setup (Python stage)
   - Nginx configuration
   - Supervisor process startup

### Step 6: Verify Deployment Success

Check these health endpoints:

```bash
# Frontend
GET https://bkr-makedreamtrue.nwp2mw.easypanel.host/

# Backend Health
GET https://bkr-makedreamtrue.nwp2mw.easypanel.host/api/health

# Google OAuth Health
GET https://bkr-makedreamtrue.nwp2mw.easypanel.host/api/auth/google/health
```

Expected responses:
- Frontend: HTML page loads
- Backend health: `{"status": "healthy"}`
- OAuth health: `{"service": "Google OAuth", "status": "healthy", "configured": true}`

## 🧪 Post-Deployment Testing

### Test Google OAuth Flow

1. **Navigate to Login Page**
   ```
   https://bkr-makedreamtrue.nwp2mw.easypanel.host/auth/login
   ```

2. **Click "Continue with Google"**
   - Google OAuth popup should appear
   - User can authenticate with Google account

3. **Verify Redirect**
   - After authentication, should redirect to `/home`
   - JWT token should be stored in localStorage
   - User info displayed in profile

4. **Check Database**
   - New user should be created with google_id
   - User email matches Google account
   - password_hash should be NULL for Google OAuth users

### API Testing

```bash
# Test OAuth endpoint directly
curl -X POST https://bkr-makedreamtrue.nwp2mw.easypanel.host/api/auth/google/token \
  -H "Content-Type: application/json" \
  -d '{
    "id_token": "google-id-token-here"
  }'

# Expected response:
{
  "access_token": "jwt-token",
  "token_type": "bearer",
  "user_id": 1,
  "email": "user@gmail.com",
  "full_name": "User Name",
  "message": "Welcome back!"
}
```

## 📊 Services Verification

After deployment, verify these services are running:

```bash
# Check running services (in container)
supervisorctl status

# Expected output:
backend                          RUNNING   pid xxxxx, uptime x:xx:xx
frontend                         RUNNING   pid xxxxx, uptime x:xx:xx
nginx                            RUNNING   pid xxxxx, uptime x:xx:xx
```

## 🔍 Troubleshooting

### If OAuth Health Check Returns `"configured": false`
- Verify GOOGLE_CLIENT_ID is set in EasyPanel
- Check environment variables are loaded
- Restart the backend service

### If Frontend Still Shows Old Code
- Clear browser cache: `Ctrl+Shift+Delete`
- Hard refresh: `Ctrl+Shift+R`
- Or visit in Incognito mode

### If Login Button Doesn't Appear
- Check browser console for errors
- Verify NEXT_PUBLIC_GOOGLE_CLIENT_ID is set
- Check that GoogleOAuthProvider wraps the component

### If Token Validation Fails
- Verify GOOGLE_CLIENT_SECRET is correct
- Check Google Cloud Console for credential setup
- Ensure domain is authorized for OAuth

## 📝 Post-Deployment Checklist

- [ ] Environment variables configured in EasyPanel
- [ ] Redeploy triggered and completed successfully
- [ ] Frontend loads at domain
- [ ] API responds to health checks
- [ ] Google OAuth health check shows `configured: true`
- [ ] Login page displays Google login button
- [ ] Google OAuth flow works end-to-end
- [ ] Users can sign in and get redirected
- [ ] Database creates user records
- [ ] JWT tokens are issued correctly
- [ ] Browser console has no critical errors

## 📞 Need Help?

If deployment fails:
1. Check EasyPanel build logs for specific error
2. Verify environment variables are set correctly
3. Ensure Docker can access all files
4. Check database connectivity
5. Review Nginx configuration

---

**Deployment Status**: 🟡 READY FOR DEPLOYMENT
**Last Updated**: 2026-06-18
**Version**: 1.0.0 (Google OAuth Integrated)
