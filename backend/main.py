from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
from sqlalchemy import text

from app.config import settings
from app.database import engine
from app import models
from app.routers import auth, restaurants, menu, cart, orders, users, ai, gamification, google_oauth

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create tables
models.Base.metadata.create_all(bind=engine)

def run_migrations():
    """Run database migrations for new features"""
    try:
        with engine.connect() as conn:
            # Check if google_id column exists in users table
            result = conn.execute(text("""
                SELECT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name='users' AND column_name='google_id'
                )
            """))
            
            column_exists = result.scalar()
            
            if not column_exists:
                logger.info("Adding google_id column to users table...")
                
                # Add the column
                conn.execute(text("""
                    ALTER TABLE users 
                    ADD COLUMN google_id VARCHAR(255) UNIQUE NULL
                """))
                
                # Create index for faster lookups
                conn.execute(text("""
                    CREATE INDEX idx_users_google_id ON users(google_id)
                """))
                
                conn.commit()
                logger.info("✅ Added google_id column to users table for Google OAuth")
            else:
                logger.info("ℹ️ google_id column already exists")
    except Exception as e:
        logger.error(f"Migration error: {e}")
        # Don't fail startup - column might already exist

# Run migrations on startup
run_migrations()

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
app.include_router(google_oauth.router, tags=["Google OAuth"])
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

@app.get("/")
async def root():
    return {
        "message": "DreamFood API - Access the frontend at the root URL or API docs at /docs",
        "version": "0.1.0",
        "docs": "/docs",
        "note": "This is the backend API. If you're seeing this, the frontend is not being served properly through Nginx."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8001,
        reload=settings.DEBUG
    )
