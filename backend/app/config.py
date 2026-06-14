from pydantic_settings import BaseSettings
from pydantic import field_validator, ConfigDict
from typing import List
import os

class Settings(BaseSettings):
    # App Settings
    APP_NAME: str = "DreamFood"
    DEBUG: bool = True
    ENVIRONMENT: str = "development"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://localhost/dreamfood")
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Grok AI
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    
    # Google OAuth
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    
    # CORS - Keep as string, will parse in property
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:8000"
    
    # Frontend URL
    FRONTEND_URL: str = "http://localhost:3000"
    
    # Email Configuration
    SMTP_SERVER: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    
    model_config = ConfigDict(
        env_file=".env",
        case_sensitive=True
    )
    
    def get_cors_origins(self) -> List[str]:
        """Parse comma-separated CORS origins"""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

settings = Settings()
