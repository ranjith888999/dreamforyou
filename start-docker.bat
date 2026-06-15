@echo off
REM Quick start script for Docker deployment (Windows)

setlocal enabledelayedexpansion

echo.
echo 🐳 DreamFood Docker Quick Start
echo ================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker Desktop for Windows first.
    pause
    exit /b 1
)
echo ✓ Docker is installed

REM Check if docker-compose is installed
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ docker-compose is not installed. Please install Docker Desktop with Compose.
    pause
    exit /b 1
)
echo ✓ docker-compose is installed

REM Check if .env file exists
if not exist .env (
    echo ⚠ .env file not found. Creating from .env.example...
    copy .env.example .env
    echo ⚠ Please edit .env file and add your credentials
    echo ⚠ Then run this script again
    pause
    exit /b 1
)
echo ✓ .env file found

REM Stop any running containers
echo.
echo Stopping any existing containers...
docker-compose down 2>nul

REM Build images
echo.
echo Building Docker images...
docker-compose build --no-cache
if errorlevel 1 (
    echo ❌ Build failed. Check error messages above.
    pause
    exit /b 1
)

REM Start services
echo.
echo Starting services...
docker-compose up -d
if errorlevel 1 (
    echo ❌ Failed to start services. Check error messages above.
    pause
    exit /b 1
)

REM Wait for services to be healthy
echo.
echo Waiting for services to start (30 seconds)...
timeout /t 30 /nobreak

REM Check service status
echo.
echo Checking service status...
docker-compose ps

REM Display access URLs
echo.
echo ================================
echo ✓ DreamFood is running!
echo ================================
echo.
echo Access URLs:
echo   Frontend:  http://localhost:3000
echo   Backend:   http://localhost:8000
echo   API Docs:  http://localhost:8000/api/docs
echo.
echo Useful Commands:
echo   View logs:        docker-compose logs -f
echo   Stop services:    docker-compose down
echo   Restart backend:  docker-compose restart backend
echo   Database shell:   docker-compose exec postgres psql -U ranjith -d dreamfood
echo.
echo Initial Setup:
echo   1. Database will initialize automatically
echo   2. Check backend logs: docker-compose logs backend
echo   3. Visit frontend: http://localhost:3000
echo.
pause
