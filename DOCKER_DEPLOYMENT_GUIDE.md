# EasyPanel Docker Deployment Guide

## 🐳 Docker Deployment for DreamFood

This guide explains how to deploy DreamFood on EasyPanel using Docker.

---

## 📋 Project Structure

```
DreamFood/
├── Dockerfile.backend          # Backend (FastAPI) Docker image
├── Dockerfile.frontend         # Frontend (Next.js) Docker image
├── docker-compose.yml          # Multi-container orchestration
├── .dockerignore              # Files to exclude from Docker builds
├── backend/                   # FastAPI application
│   ├── main.py
│   ├── requirements.txt
│   ├── app/
│   └── env_prod              # Production environment template
└── frontend/                  # Next.js application
    ├── package.json
    ├── .next/
    └── .env.production        # Production environment template
```

---

## 🚀 Deployment Steps on EasyPanel

### Step 1: Prepare Your Environment

1. **Push Docker files to GitHub** (Already done ✓)
2. **Ensure all files are committed:**
   ```bash
   git add Dockerfile.backend Dockerfile.frontend docker-compose.yml .dockerignore
   git commit -m "Add Docker configuration for EasyPanel deployment"
   git push origin master
   ```

### Step 2: Create EasyPanel Service

1. **Log into EasyPanel Dashboard** → https://your-panel.easypanel.host
2. **Click "New Service"** → Select "Docker Compose"
3. **Configure Service:**
   - **Name:** DreamFood
   - **Source:** GitHub Repository
   - **Repository:** `https://github.com/ranjith888999/dreamforyou.git`
   - **Branch:** `master`
   - **Docker Compose File:** `docker-compose.yml`

### Step 3: Set Environment Variables

In EasyPanel Dashboard → Service Settings → Environment Variables:

**Database Variables:**
```
DB_USER=ranjith
DB_PASSWORD=your-secure-password
DB_NAME=dreamfood
```

**Application Variables:**
```
SECRET_KEY=your-strong-random-key-32-chars-minimum
GROQ_API_KEY=your-groq-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=https://bkr-makedreamtrue.nwp2mw.easypanel.host
NEXT_PUBLIC_API_URL=https://bkr-makedreamtrue.nwp2mw.easypanel.host/api
NEXT_PUBLIC_APP_URL=https://bkr-makedreamtrue.nwp2mw.easypanel.host
CORS_ORIGINS=https://bkr-makedreamtrue.nwp2mw.easypanel.host
DEBUG=False
ENVIRONMENT=production
```

### Step 4: Configure Port Forwarding

**EasyPanel automatically manages:**
- Backend service (port 8000)
- Frontend service (port 3000)
- PostgreSQL service (port 5432 - internal only)
- Redis service (port 6379 - internal only)

**Subdomain mapping:**
- **API:** `/api` → Routes to Backend (port 8000)
- **Frontend:** `/` → Routes to Frontend (port 3000)

### Step 5: Deploy

1. **Click "Deploy"** in EasyPanel
2. **Monitor deployment logs** in real-time
3. **Verify health checks** pass for all services
4. **Access your app** at: `https://bkr-makedreamtrue.nwp2mw.easypanel.host`

---

## 🔍 Docker File Descriptions

### Dockerfile.backend
**Purpose:** Creates Docker image for FastAPI backend

**Key Features:**
- Python 3.11 slim base image (smaller size)
- Installs system dependencies and Python packages
- Non-root user execution (security)
- Health check endpoint
- Multi-stage build optimization

**Build Command:**
```bash
docker build -f Dockerfile.backend -t dreamfood-backend .
```

**Run Command:**
```bash
docker run -p 8000:8000 \
  -e DATABASE_URL=postgresql://... \
  -e REDIS_URL=redis://... \
  dreamfood-backend
```

---

### Dockerfile.frontend
**Purpose:** Creates Docker image for Next.js frontend

**Key Features:**
- Node.js 18-alpine base image
- Multi-stage build (builder + production)
- Only production dependencies in final image
- Non-root user execution
- Health check for frontend

**Build Command:**
```bash
docker build -f Dockerfile.frontend -t dreamfood-frontend .
```

**Run Command:**
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000/api \
  dreamfood-frontend
```

---

### docker-compose.yml
**Purpose:** Orchestrates all services (backend, frontend, database, cache)

**Services Defined:**
1. **postgres** - PostgreSQL Database (port 5432)
2. **redis** - Redis Cache (port 6379)
3. **backend** - FastAPI Application (port 8000)
4. **frontend** - Next.js Application (port 3000)

**Key Features:**
- Health checks for all services
- Volume persistence for database and cache
- Environment variable interpolation
- Network isolation (dreamfood-network)
- Service dependencies (startup order)

---

## 🛠️ Local Testing with Docker

### Run Locally Before Deploying

```bash
# Navigate to project root
cd d:\Python\DremThings

# Create .env file with local values
echo "DB_USER=ranjith" > .env
echo "DB_PASSWORD=ranjith123" >> .env
echo "DB_NAME=dreamfood" >> .env
echo "SECRET_KEY=local-test-secret-key" >> .env
echo "GROQ_API_KEY=your-test-key" >> .env
echo "FRONTEND_URL=http://localhost:3000" >> .env
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" >> .env

# Build and start all services
docker-compose up --build

# In another terminal, check services
docker-compose ps

# View logs
docker-compose logs -f backend   # Backend logs
docker-compose logs -f frontend  # Frontend logs
docker-compose logs -f postgres  # Database logs

# Stop all services
docker-compose down

# Remove volumes (reset database)
docker-compose down -v
```

---

## 🔒 Security Considerations

### Production Checklist
- [ ] Set `DEBUG=False` in environment
- [ ] Use strong `SECRET_KEY` (32+ characters)
- [ ] Enable HTTPS (EasyPanel handles this)
- [ ] Use secure database passwords
- [ ] Set `ENVIRONMENT=production`
- [ ] Enable health checks on all services
- [ ] Use non-root user in containers (✓ configured)
- [ ] Limit resource usage if needed
- [ ] Set up log monitoring
- [ ] Regular backups of database

### Resource Limits (Optional)
Add to docker-compose.yml services if needed:
```yaml
resources:
  limits:
    cpus: '1'
    memory: 512M
  reservations:
    cpus: '0.5'
    memory: 256M
```

---

## 🐛 Troubleshooting

### Backend fails to start
**Check logs:**
```bash
docker-compose logs backend
```

**Common issues:**
- Database connection string invalid
- Port 8000 already in use
- Missing environment variables

**Fix:**
```bash
# Verify database is running
docker-compose logs postgres

# Restart just the backend
docker-compose restart backend
```

### Frontend fails to start
**Check logs:**
```bash
docker-compose logs frontend
```

**Common issues:**
- Next.js build failed
- API URL not configured
- Port 3000 in use

**Fix:**
```bash
# Rebuild frontend
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

### Database connection issues
**Verify PostgreSQL:**
```bash
docker-compose exec postgres psql -U ranjith -d dreamfood -c "SELECT 1"
```

**Check Redis:**
```bash
docker-compose exec redis redis-cli ping
```

### Port conflicts
**Find service using port:**
```bash
netstat -an | findstr :8000  # Windows
lsof -i :8000               # Mac/Linux
```

**Solution:** Change ports in docker-compose.yml or stop conflicting service

---

## 📊 Monitoring & Logs

### View Real-time Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Last 100 lines
docker-compose logs --tail=100
```

### Health Check Status
```bash
# Check all service health
docker-compose ps

# Should show status: healthy/starting/unhealthy
```

### Performance Monitoring
```bash
# View resource usage
docker stats

# View container details
docker inspect dreamfood-backend
```

---

## 🔄 Updating & Redeployment

### Deploy New Code Version

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Update feature XYZ"
   git push origin master
   ```

2. **Redeploy on EasyPanel:**
   - Go to Service → Deployments
   - Click "Deploy Latest"
   - Monitor logs during deployment

3. **Rollback if needed:**
   - Click "Deployments" → Select previous version
   - Click "Rollback"

### Update Environment Variables

1. **Edit in EasyPanel Dashboard:**
   - Service Settings → Environment Variables
   - Update variable value
   - Click "Save"

2. **Restart service:**
   - Click "Restart Service"
   - Confirm restart

### Upgrade Dependencies

1. **Update requirements.txt:**
   ```bash
   cd backend
   pip install -U package-name
   pip freeze > requirements.txt
   git add requirements.txt
   git commit -m "Upgrade dependencies"
   git push
   ```

2. **Update package.json:**
   ```bash
   cd frontend
   npm update package-name
   git add package-lock.json
   git commit -m "Upgrade dependencies"
   git push
   ```

3. **Redeploy on EasyPanel**

---

## 📝 Quick Reference

### Docker Commands
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Execute command in container
docker-compose exec backend python main.py

# SSH into container
docker-compose exec backend /bin/bash
```

### Useful URLs (Local)
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api
- **API Docs:** http://localhost:8000/api/docs
- **Database:** postgres://ranjith:ranjith123@localhost:5432/dreamfood

### Useful URLs (Production - EasyPanel)
- **Frontend:** https://bkr-makedreamtrue.nwp2mw.easypanel.host
- **Backend API:** https://bkr-makedreamtrue.nwp2mw.easypanel.host/api
- **API Docs:** https://bkr-makedreamtrue.nwp2mw.easypanel.host/api/docs

---

## ✅ Deployment Checklist

- [ ] All Dockerfiles are in project root
- [ ] docker-compose.yml is configured
- [ ] .dockerignore file exists
- [ ] All code is committed to GitHub
- [ ] Environment variables are set in EasyPanel
- [ ] Database backup is configured
- [ ] Health checks are enabled
- [ ] Logs are being collected
- [ ] SSL/HTTPS is enabled
- [ ] CORS is configured for your domain
- [ ] API keys are secure and rotated
- [ ] Database credentials are strong
- [ ] Monitoring/alerts are set up
- [ ] Backup strategy is in place

---

## 📞 Support Resources

- **EasyPanel Docs:** https://docs.easypanel.io
- **Docker Docs:** https://docs.docker.com
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **Next.js Docs:** https://nextjs.org/docs

---

**Last Updated:** June 15, 2026
**Status:** Ready for EasyPanel Deployment
