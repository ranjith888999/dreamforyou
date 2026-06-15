# EasyPanel Configuration Guide

## ⚠️ Docker Build Error Fix

**Error:** `failed to read dockerfile: open Dockerfile: no such file or directory`

**Cause:** EasyPanel was looking for `Dockerfile` but we named them `Dockerfile.backend` and `Dockerfile.frontend`

**Solution:** Use the root `Dockerfile` we just created

---

## 🚀 Two Deployment Options for EasyPanel

### **Option 1: Backend Only (Recommended for starting)**

**Use this if:** You want to deploy just the API backend on EasyPanel

**Steps:**

1. **Go to EasyPanel Dashboard**
2. **Select your service** → Edit Settings
3. **Choose Docker Image Build**
4. **Configure:**
   - **Dockerfile:** `Dockerfile` (the root one)
   - **Build Context:** `/` (root directory)
   - **Port:** `8000`

5. **Set Environment Variables:**
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/dreamfood
   REDIS_URL=redis://host:6379/0
   SECRET_KEY=your-secure-random-key-32-chars
   GROQ_API_KEY=your-groq-key
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   FRONTEND_URL=https://your-frontend-domain.com
   CORS_ORIGINS=https://your-frontend-domain.com
   DEBUG=False
   ENVIRONMENT=production
   ```

6. **Deploy** → EasyPanel will build and deploy the backend

---

### **Option 2: Full Stack with Docker Compose (Advanced)**

**Use this if:** You want backend + frontend + database all managed together

**Steps:**

1. **SSH into EasyPanel server** (if available)
   ```bash
   ssh user@your-easypanel-server
   cd /path/to/dreamfood
   ```

2. **Create .env file:**
   ```bash
   cat > .env << EOF
   DB_USER=ranjith
   DB_PASSWORD=your-secure-password
   DB_NAME=dreamfood
   SECRET_KEY=your-secure-random-key
   GROQ_API_KEY=your-groq-key
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   FRONTEND_URL=https://your-domain.com
   CORS_ORIGINS=https://your-domain.com
   DEBUG=False
   ENVIRONMENT=production
   NEXT_PUBLIC_API_URL=https://your-domain.com/api
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   EOF
   ```

3. **Run docker-compose:**
   ```bash
   docker-compose up -d
   ```

4. **Check status:**
   ```bash
   docker-compose ps
   ```

---

## 📁 Directory Structure for EasyPanel

```
DreamFood/
├── Dockerfile                 ← EasyPanel uses this for backend
├── Dockerfile.backend         ← Manual docker build
├── Dockerfile.frontend        ← Manual docker build
├── docker-compose.yml         ← For full-stack deployment
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── app/
└── frontend/
    ├── package.json
    └── app/
```

---

## ✅ Recommended Setup for EasyPanel

Since you're using EasyPanel's managed environment, I recommend **Option 1 (Backend Only)** with the following architecture:

```
EasyPanel Services:
├── Backend Service (Dockerfile)
│   ├── FastAPI Application (port 8000)
│   ├── Environment Variables
│   └── Auto-restart on failure
├── PostgreSQL Service (EasyPanel managed)
├── Redis Service (EasyPanel managed)
└── Frontend Service (Optional separate service)
    └── Next.js Application (port 3000)
```

---

## 🔧 Update EasyPanel Configuration

### In EasyPanel Dashboard:

1. **Go to Services**
2. **Select your service**
3. **Settings → Docker**
4. **Configure:**
   - Build Strategy: `Dockerfile`
   - Dockerfile path: `./Dockerfile`
   - Build context: `./`
   - Port: `8000`

5. **Environment → Add variables:**
   ```
   DATABASE_URL=postgresql://username:password@postgres-host:5432/dreamfood
   REDIS_URL=redis://redis-host:6379/0
   SECRET_KEY=<generate-secure-key>
   GROQ_API_KEY=<your-api-key>
   GOOGLE_CLIENT_ID=<your-client-id>
   GOOGLE_CLIENT_SECRET=<your-client-secret>
   FRONTEND_URL=https://bkr-makedreamtrue.nwp2mw.easypanel.host
   CORS_ORIGINS=https://bkr-makedreamtrue.nwp2mw.easypanel.host
   DEBUG=False
   ENVIRONMENT=production
   ```

6. **Save and Redeploy**

---

## 🐛 Troubleshooting

### If you still get "Dockerfile not found":

1. **Verify Dockerfile exists:**
   ```bash
   ls -la Dockerfile
   ```

2. **Check file is not hidden:**
   ```bash
   # Should show the file
   git ls-files | grep Dockerfile
   ```

3. **Push to GitHub:**
   ```bash
   git add Dockerfile
   git commit -m "Add root Dockerfile for EasyPanel"
   git push origin master
   ```

4. **Redeploy on EasyPanel:**
   - Go to Deployments
   - Click "Deploy Latest"
   - Monitor logs

### If build still fails:

1. **Check logs in EasyPanel Dashboard:**
   - Logs → Build Logs
   - Look for specific error messages

2. **Verify requirements.txt is correct:**
   ```bash
   cd backend
   cat requirements.txt
   ```

3. **Test locally:**
   ```bash
   docker build -f Dockerfile -t dreamfood-backend .
   docker run -p 8000:8000 dreamfood-backend
   ```

---

## 🚀 Deploy Now

### Quick Steps:

1. ✅ Created `Dockerfile` in root (Backend)
2. 📤 Push to GitHub:
   ```bash
   git add Dockerfile
   git commit -m "Add root Dockerfile for EasyPanel deployment"
   git push origin master
   ```

3. 🔄 Redeploy on EasyPanel:
   - Dashboard → Services → Your Service
   - Click "Redeploy" or "Deploy Latest"
   - Monitor build logs

4. ✅ Verify deployment:
   - Check service is healthy
   - Visit `https://bkr-makedreamtrue.nwp2mw.easypanel.host/api/docs`

---

## 📊 File Explanations

| File | Used By | Purpose |
|------|---------|---------|
| `Dockerfile` | EasyPanel | Main backend build |
| `Dockerfile.backend` | Manual/docker-compose | Backend (named) |
| `Dockerfile.frontend` | Manual/docker-compose | Frontend (named) |
| `docker-compose.yml` | Docker Compose | Full-stack local/server |

---

## 💡 Best Practices for EasyPanel

1. **Keep Dockerfile in root** - EasyPanel expects this
2. **Use environment variables** - Don't hardcode secrets
3. **Health checks enabled** - Container auto-restarts if unhealthy
4. **Non-root user** - Security best practice (configured ✓)
5. **Proper logging** - Monitor via EasyPanel dashboard

---

## 🔐 Security Checklist

- [ ] `DEBUG=False` in production
- [ ] `SECRET_KEY` is 32+ characters, random
- [ ] Database password is strong
- [ ] API keys are actual, not placeholder values
- [ ] `CORS_ORIGINS` restricted to your domain
- [ ] HTTPS enabled (EasyPanel handles this)
- [ ] Health checks configured
- [ ] Logs monitored regularly

---

**Status:** Ready to deploy on EasyPanel ✅

Push the new `Dockerfile` and redeploy!
