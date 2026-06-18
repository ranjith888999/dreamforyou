"""
Google OAuth 2.0 authentication router
Handles Google token validation and user creation/login
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from google.auth.transport import requests
from google.oauth2 import id_token
import logging
from datetime import timedelta
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import User
from app.routers import auth  # Import JWT creation function

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/auth/google", tags=["Google OAuth"])


class GoogleTokenRequest(BaseModel):
    """Google ID token from frontend"""
    id_token: str


class GoogleAuthResponse(BaseModel):
    """Response with JWT token"""
    access_token: str
    token_type: str
    user_id: int
    email: str
    full_name: str
    message: str


@router.post("/token", response_model=GoogleAuthResponse)
async def google_token_auth(
    token_request: GoogleTokenRequest,
    db: Session = Depends(get_db)
):
    """
    Validate Google ID token and create/login user
    
    Frontend Flow:
    1. User clicks "Sign in with Google"
    2. Google popup returns ID token
    3. Frontend sends ID token to this endpoint
    4. Backend validates with Google
    5. Backend creates/finds user
    6. Backend returns JWT token
    
    Args:
        token_request: Contains Google ID token from frontend
        db: Database session
        
    Returns:
        JWT token and user info
        
    Raises:
        HTTPException: If token is invalid or validation fails
    """
    
    try:
        # Validate token with Google
        idinfo = validate_google_token(token_request.id_token)
        
        # Extract user info from Google token
        email = idinfo.get("email")
        full_name = idinfo.get("name", "")
        google_id = idinfo.get("sub")  # Unique Google user ID
        
        if not email:
            raise HTTPException(
                status_code=400,
                detail="Email not found in Google token"
            )
        
        # Check if user exists
        user = db.query(User).filter(User.email == email).first()
        
        if user:
            # Update existing user with latest Google info
            user.full_name = full_name
            user.google_id = google_id
            db.commit()
            logger.info(f"User {email} logged in with Google")
            message = "Welcome back!"
        else:
            # Create new user from Google info
            user = User(
                email=email,
                username=email.split("@")[0],  # Use email prefix as username
                full_name=full_name,
                google_id=google_id,
                auth_provider="google",
                # Password not required for Google OAuth users
                hashed_password=None
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            logger.info(f"New user {email} created via Google OAuth")
            message = "Account created successfully!"
        
        # Create JWT token for application
        access_token_expires = timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
        access_token = auth.create_access_token(
            data={"sub": str(user.id)},
            expires_delta=access_token_expires
        )
        
        return GoogleAuthResponse(
            access_token=access_token,
            token_type="bearer",
            user_id=user.id,
            email=user.email,
            full_name=user.full_name,
            message=message
        )
        
    except ValueError as e:
        logger.error(f"Google token validation error: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail="Invalid Google token"
        )
    except Exception as e:
        logger.error(f"Google OAuth error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Google OAuth validation failed"
        )


def validate_google_token(id_token_str: str) -> dict:
    """
    Validate Google ID token with Google's servers
    
    Args:
        id_token_str: Google ID token from frontend
        
    Returns:
        Decoded token payload with user info
        
    Raises:
        ValueError: If token is invalid or expired
    """
    
    if not settings.GOOGLE_CLIENT_ID:
        raise ValueError("GOOGLE_CLIENT_ID not configured")
    
    try:
        # Verify token signature and expiration with Google
        idinfo = id_token.verify_oauth2_token(
            id_token_str,
            requests.Request(),
            audience=settings.GOOGLE_CLIENT_ID
        )
        
        # Token verification successful - audience is already validated by verify_oauth2_token
        return idinfo
        
    except Exception as e:
        raise ValueError(f"Token validation failed: {str(e)}")


@router.post("/logout")
async def google_logout():
    """
    Logout endpoint (frontend should discard JWT token)
    
    Note: Google token revocation handled on frontend
    This is just for backend session cleanup if needed
    """
    return {"message": "Logged out successfully"}


@router.get("/health")
async def google_oauth_health():
    """Health check for Google OAuth endpoint"""
    has_credentials = bool(
        settings.GOOGLE_CLIENT_ID and settings.GOOGLE_CLIENT_SECRET
    )
    return {
        "service": "Google OAuth",
        "status": "healthy",
        "configured": has_credentials
    }
