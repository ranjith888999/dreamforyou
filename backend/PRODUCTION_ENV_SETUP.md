# Production Environment Setup Guide

## Deployment URL
`https://bkr-makedreamtrue.nwp2mw.easypanel.host/`

## Environment Variables Configuration

### 1. Database Configuration
```
DATABASE_URL=postgresql://username:password@host:5432/dreamfood_prod?sslmode=require
```
**Instructions:**
- Replace `username` with your PostgreSQL user
- Replace `password` with your database password
- Replace `host` with your database server address (from EasyPanel)
- Use port 5432 (standard PostgreSQL)
- Use `sslmode=require` for secure connection in production

**Where to get it:**
- Log into EasyPanel dashboard
- Find Database service details in your deployed application

---

### 2. Redis Configuration
```
REDIS_URL=redis://username:password@redis-host:6379/0
```
**Instructions:**
- Replace `username` and `password` if authentication is enabled
- Replace `redis-host` with your Redis server address
- Use database 0 for main cache
- Default port: 6379

**Where to get it:**
- EasyPanel Dashboard → Redis Service Details

---

### 3. JWT Secret Key (CRITICAL)
```
SECRET_KEY=your-production-secret-key-min-32-chars-change-this
```
**Instructions:**
- Generate a strong random string (minimum 32 characters)
- Use a mix of uppercase, lowercase, numbers, and special characters
- Store securely (use EasyPanel secrets/environment variables)
- NEVER commit actual key to GitHub

**Generate with:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

---

### 4. Groq AI API Key
```
GROQ_API_KEY=your-production-groq-api-key
```
**Instructions:**
- Get from Groq API dashboard (https://console.groq.com)
- Sign up for API access
- Create API key in dashboard
- Keep this secret in EasyPanel

---

### 5. Google OAuth Configuration
```
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret
```
**Instructions:**
- Go to Google Cloud Console (https://console.cloud.google.com)
- Create OAuth 2.0 credentials
- Authorized redirect URI: `https://bkr-makedreamtrue.nwp2mw.easypanel.host/api/auth/google/callback`
- Copy Client ID and Client Secret

---

### 6. Application Settings
```
APP_NAME=DreamFood
DEBUG=False
ENVIRONMENT=production
CORS_ORIGINS=https://bkr-makedreamtrue.nwp2mw.easypanel.host,https://www.bkr-makedreamtrue.nwp2mw.easypanel.host
FRONTEND_URL=https://bkr-makedreamtrue.nwp2mw.easypanel.host
```
**Instructions:**
- Set `DEBUG=False` in production (CRITICAL for security)
- Set `ENVIRONMENT=production`
- `CORS_ORIGINS` should include your production domain
- `FRONTEND_URL` is the URL where your Next.js frontend is deployed

---

### 7. Email Configuration (Optional)
```
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-production-email@gmail.com
SMTP_PASSWORD=your-production-email-password
```
**Instructions:**
- Use Gmail with App Password (recommended):
  - Enable 2-factor authentication on Google Account
  - Generate App Password (https://myaccount.google.com/apppasswords)
  - Use the generated password instead of account password
- Alternative: Use SendGrid, Mailgun, etc.

---

### 8. Security Settings
```
COOKIE_SECURE=true
COOKIE_HTTPONLY=true
COOKIE_SAMESITE=Lax
RATE_LIMIT_ENABLED=true
```
**Instructions:**
- `COOKIE_SECURE=true` - Only send cookies over HTTPS
- `COOKIE_HTTPONLY=true` - Prevent JavaScript access to cookies
- `RATE_LIMIT_ENABLED=true` - Enable API rate limiting

---

## How to Set Environment Variables in EasyPanel

1. **SSH into your server** (from EasyPanel dashboard)
   ```bash
   ssh user@your-server
   cd /path/to/dreamfood/backend
   ```

2. **Create/Update .env file**
   ```bash
   nano .env  # or use your preferred editor
   ```

3. **Paste all production values from env_prod**

4. **Save and exit**
   ```bash
   # Press Ctrl+O, Enter, Ctrl+X (in nano)
   ```

5. **Restart your application**
   ```bash
   # Through EasyPanel UI or:
   systemctl restart dreamfood  # (if systemd service)
   ```

---

## Verification Checklist

- [ ] Database URL is correct and database is accessible
- [ ] Redis URL is correct and Redis is running
- [ ] JWT SECRET_KEY is a strong random string (32+ chars)
- [ ] DEBUG is set to False
- [ ] ENVIRONMENT is set to production
- [ ] CORS_ORIGINS includes your production domain
- [ ] FRONTEND_URL points to production
- [ ] GROQ_API_KEY is set (if using AI features)
- [ ] Google OAuth credentials are configured (if using auth)
- [ ] Email configuration is correct (if using email)
- [ ] All sensitive values are stored securely in EasyPanel

---

## Security Best Practices

1. **Never commit .env file to GitHub** ✓ (Already in .gitignore)
2. **Use strong, unique SECRET_KEY** - Generate with random string
3. **Enable HTTPS** - EasyPanel should handle this automatically
4. **Use SSL connections** - `sslmode=require` for database
5. **Enable rate limiting** - Prevent API abuse
6. **Use secure cookies** - SECURE and HTTPONLY flags enabled
7. **Rotate secrets regularly** - Update API keys quarterly
8. **Monitor logs** - Check EasyPanel logs for errors

---

## Troubleshooting

### Connection Issues
- Check database credentials in EasyPanel
- Verify firewall rules allow connection from app server to database
- Test with `psql` command to verify PostgreSQL connection

### API Key Issues
- Verify Groq API key in console
- Check Google OAuth credentials match domain
- Ensure API keys haven't expired

### CORS Errors
- Add exact domain to CORS_ORIGINS
- Include both `https://domain` and `https://www.domain`
- Remove trailing slashes

---

## Frontend Environment Variables

Create `frontend/.env.production` with:
```
NEXT_PUBLIC_API_URL=https://bkr-makedreamtrue.nwp2mw.easypanel.host/api
NEXT_PUBLIC_APP_URL=https://bkr-makedreamtrue.nwp2mw.easypanel.host
```

---

**Last Updated:** June 15, 2026
**Deployment:** EasyPanel
**Status:** Ready for configuration
