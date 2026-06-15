# Multi-stage Dockerfile for EasyPanel - Full Stack (Frontend + Backend)
# Stage 1: Build Next.js Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies (using npm install instead of npm ci for flexibility)
RUN npm install --legacy-peer-deps

# Copy frontend source
COPY frontend/ .

# Set API URL for production (relative path works for same domain)
ENV NEXT_PUBLIC_API_URL=/api

# Build frontend
RUN npm run build

# Stage 2: Python Backend with Frontend Static Files
FROM python:3.11-slim

WORKDIR /app

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip setuptools wheel && \
    pip install -r requirements.txt

# Copy application code
COPY backend/ .

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/frontend/.next /app/frontend/.next
COPY --from=frontend-builder /app/frontend/public /app/frontend/public
COPY --from=frontend-builder /app/frontend/package.json /app/frontend/package.json

# Create non-root user for security
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8000/api/health', timeout=5)" || exit 1

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
