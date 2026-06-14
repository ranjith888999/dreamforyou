from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import MenuItemResponse
from app.models import MenuItem, Restaurant

router = APIRouter()

@router.get("/restaurant/{restaurant_id}", response_model=list[MenuItemResponse])
def get_menu_items(
    restaurant_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Get menu items for a restaurant"""
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    items = db.query(MenuItem).filter(
        MenuItem.restaurant_id == restaurant_id,
        MenuItem.is_active == True
    ).offset(skip).limit(limit).all()
    
    return items

@router.get("/{item_id}", response_model=MenuItemResponse)
def get_menu_item(item_id: int, db: Session = Depends(get_db)):
    """Get menu item details"""
    item = db.query(MenuItem).filter(MenuItem.id == item_id).first()
    
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    return item

@router.get("/popular/all", response_model=list[MenuItemResponse])
def get_popular_items(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """Get popular menu items"""
    items = db.query(MenuItem).filter(
        MenuItem.is_popular == True,
        MenuItem.is_active == True
    ).limit(limit).all()
    
    return items

@router.get("/search/by-name")
def search_menu_items(
    name: str = Query(..., min_length=1),
    db: Session = Depends(get_db)
):
    """Search menu items by name"""
    items = db.query(MenuItem).filter(
        MenuItem.name.ilike(f"%{name}%"),
        MenuItem.is_active == True
    ).all()
    
    return items
