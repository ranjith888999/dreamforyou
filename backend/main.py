from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from contextlib import asynccontextmanager
import logging
import os
from pathlib import Path

from app.config import settings
from app.database import engine
from app import models
from app.routers import auth, restaurants, menu, cart, orders, users, ai, gamification

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create tables
models.Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting DreamFood API...")
    yield
    # Shutdown
    logger.info("Shutting down DreamFood API...")

app = FastAPI(
    title=settings.APP_NAME,
    description="A dopamine-based food delivery simulation platform",
    version="0.1.0",
    lifespan=lifespan
)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers (API endpoints)
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(restaurants.router, prefix="/api/restaurants", tags=["Restaurants"])
app.include_router(menu.router, prefix="/api/menu", tags=["Menu"])
app.include_router(cart.router, prefix="/api/cart", tags=["Cart"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI Features"])
app.include_router(gamification.router, prefix="/api/gamification", tags=["Gamification"])

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# Serve Next.js static files
frontend_path = Path(__file__).parent.parent / "frontend"
static_dir = frontend_path / ".next" / "static"

if static_dir.exists():
    logger.info(f"Mounting static files from {static_dir}")
    app.mount("/static", StaticFiles(directory=static_dir), name="static")
else:
    logger.warning(f"Static directory not found at {static_dir}")

# Serve frontend (SPA routing)
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    """Serve Next.js frontend for all non-API routes"""
    # Don't serve for API routes (those are handled above)
    if full_path.startswith("api/"):
        return {"error": "Not found"}, 404
    
    # Try to serve static file first
    file_path = frontend_path / full_path
    if file_path.exists() and file_path.is_file():
        return FileResponse(file_path)
    
    # Otherwise, serve index.html for SPA routing
    index_path = frontend_path / "out" / "index.html"
    if not index_path.exists():
        # Try alternative location
        index_path = frontend_path / "public" / "index.html"
    
    if index_path.exists():
        return FileResponse(index_path)
    
    # Fallback: serve root page
    return {"message": "DreamFood - UI not found. Building frontend..."}

@app.get("/")
async def root():
    """Root endpoint - serve index.html"""
    index_path = frontend_path / "out" / "index.html"
    if not index_path.exists():
        index_path = frontend_path / "public" / "index.html"
    
    if index_path.exists():
        return FileResponse(index_path)
    
    return {
        "message": "Welcome to DreamFood API",
        "version": "0.1.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
