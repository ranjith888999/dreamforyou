from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import RestaurantResponse
from app.models import Restaurant

router = APIRouter()

@router.get("/", response_model=list[RestaurantResponse])
def get_restaurants(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    cuisine_type: str = Query(None),
    db: Session = Depends(get_db)
):
    """Get all restaurants with optional filtering"""
    query = db.query(Restaurant).filter(Restaurant.is_active == True)
    
    if cuisine_type:
        query = query.filter(Restaurant.cuisine_type == cuisine_type)
    
    return query.offset(skip).limit(limit).all()

@router.get("/{restaurant_id}", response_model=RestaurantResponse)
def get_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    """Get restaurant details by ID"""
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    return restaurant

@router.get("/search/by-name")
def search_restaurants(
    name: str = Query(..., min_length=1),
    db: Session = Depends(get_db)
):
    """Search restaurants by name"""
    restaurants = db.query(Restaurant).filter(
        Restaurant.name.ilike(f"%{name}%"),
        Restaurant.is_active == True
    ).all()
    
    return restaurants

@router.get("/category/all")
def get_categories():
    """Get all available food categories"""
    categories = [
        "Biryani",
        "Pizza",
        "Burger",
        "Chinese",
        "South Indian",
        "North Indian",
        "Ice Cream",
        "Desserts",
        "Snacks",
        "Healthy Food",
    ]
    return {"categories": categories}
