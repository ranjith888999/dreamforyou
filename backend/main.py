from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

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

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(restaurants.router, prefix="/api/restaurants", tags=["Restaurants"])
app.include_router(menu.router, prefix="/api/menu", tags=["Menu"])
app.include_router(cart.router, prefix="/api/cart", tags=["Cart"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI Features"])
app.include_router(gamification.router, prefix="/api/gamification", tags=["Gamification"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to DreamFood API",
        "version": "0.1.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
