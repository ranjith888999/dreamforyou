# Multi-stage Dockerfile for EasyPanel - Full Stack (Frontend + Backend)
# Stage 1: Build Next.js Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy frontend source (build artifacts excluded by .dockerignore)
COPY frontend/ .

# Set API URL for production
ENV NEXT_PUBLIC_API_URL=/api

# Build frontend
RUN npm run build

# Stage 2: Python + Node.js Backend + Nginx
FROM python:3.11-slim

# Install Node.js, nginx, and supervisor
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    nginx \
    supervisor \
    postgresql-client \
    gcc \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    NODE_ENV=production

# Copy Python requirements
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip setuptools wheel && \
    pip install -r requirements.txt

# Copy backend application code
COPY backend/ .

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/frontend/.next /app/frontend/.next
COPY --from=frontend-builder /app/frontend/node_modules /app/frontend/node_modules
COPY --from=frontend-builder /app/frontend/package.json /app/frontend/package.json
COPY --from=frontend-builder /app/frontend/public /app/frontend/public

# Copy frontend config
COPY frontend/next.config.js /app/frontend/
COPY frontend/.env.production /app/frontend/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy supervisor configuration
RUN mkdir -p /etc/supervisor/conf.d && \
    echo '[supervisord]\n\
nodaemon=true\n\
\n\
[program:backend]\n\
command=uvicorn main:app --host 127.0.0.1 --port 8001\n\
directory=/app\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/var/log/backend.err.log\n\
stdout_logfile=/var/log/backend.out.log\n\
\n\
[program:frontend]\n\
command=npm start\n\
directory=/app/frontend\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/var/log/frontend.err.log\n\
stdout_logfile=/var/log/frontend.out.log\n\
\n\
[program:nginx]\n\
command=/usr/sbin/nginx -g "daemon off;"\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/var/log/nginx/error.log\n\
stdout_logfile=/var/log/nginx/access.log\n\
' > /etc/supervisor/conf.d/supervisord.conf

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app && \
    chown -R appuser:appuser /var/log && chown -R appuser:appuser /var/run && \
    chown -R appuser:appuser /etc/nginx

USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/api/health || exit 1

# Expose port (8000 is the reverse proxy / nginx)
EXPOSE 8000

# Run all services through supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
