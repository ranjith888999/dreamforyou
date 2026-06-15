#!/bin/bash
# Quick start script for Docker deployment

set -e

echo "🐳 DreamFood Docker Quick Start"
echo "================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ docker-compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker and docker-compose are installed${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠ .env file not found. Creating from .env.example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠ Please edit .env file and add your credentials${NC}"
    echo -e "${YELLOW}⚠ Then run this script again${NC}"
    exit 1
fi

echo -e "${GREEN}✓ .env file found${NC}"

# Stop any running containers
echo -e "${YELLOW}Stopping any existing containers...${NC}"
docker-compose down 2>/dev/null || true

# Build images
echo -e "${YELLOW}Building Docker images...${NC}"
docker-compose build --no-cache

# Create volumes
echo -e "${YELLOW}Creating volumes...${NC}"
docker-compose volume create 2>/dev/null || true

# Start services
echo -e "${YELLOW}Starting services...${NC}"
docker-compose up -d

# Wait for services to be healthy
echo -e "${YELLOW}Waiting for services to start...${NC}"
sleep 10

# Check service status
echo -e "${YELLOW}Checking service status...${NC}"
docker-compose ps

# Display access URLs
echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✓ DreamFood is running!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo -e "${GREEN}Access URLs:${NC}"
echo -e "  Frontend:  http://localhost:3000"
echo -e "  Backend:   http://localhost:8000"
echo -e "  API Docs:  http://localhost:8000/api/docs"
echo ""
echo -e "${GREEN}Useful Commands:${NC}"
echo -e "  View logs:        ${YELLOW}docker-compose logs -f${NC}"
echo -e "  Stop services:    ${YELLOW}docker-compose down${NC}"
echo -e "  Restart backend:  ${YELLOW}docker-compose restart backend${NC}"
echo -e "  Shell in backend: ${YELLOW}docker-compose exec backend /bin/bash${NC}"
echo ""
echo -e "${GREEN}Initial Setup:${NC}"
echo -e "  1. Database will initialize automatically"
echo -e "  2. Check backend logs: ${YELLOW}docker-compose logs backend${NC}"
echo -e "  3. Visit frontend: ${YELLOW}http://localhost:3000${NC}"
echo ""
