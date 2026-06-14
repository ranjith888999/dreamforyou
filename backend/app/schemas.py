from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# ============ USER SCHEMAS ============

class UserRegister(BaseModel):
    email: EmailStr
    username: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: str
    profile_picture: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# ============ RESTAURANT SCHEMAS ============

class RestaurantBase(BaseModel):
    name: str
    description: str
    cuisine_type: str
    rating: float
    delivery_time: int
    delivery_charge: float

class RestaurantResponse(RestaurantBase):
    id: int
    review_count: int
    logo_url: str
    banner_url: str
    address: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# ============ MENU ITEM SCHEMAS ============

class MenuItemBase(BaseModel):
    name: str
    description: str
    price: float
    image_url: str
    is_vegetarian: bool
    spice_level: int
    calories: int

class MenuItemResponse(MenuItemBase):
    id: int
    restaurant_id: int
    is_popular: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# ============ CART SCHEMAS ============

class CartItem(BaseModel):
    menu_item_id: int
    quantity: int
    price: float

class CartRequest(BaseModel):
    items: List[CartItem]
    special_instructions: Optional[str] = None

class CartSummary(BaseModel):
    subtotal: float
    delivery_charge: float
    gst: float
    total: float

# ============ ORDER SCHEMAS ============

class OrderItemResponse(BaseModel):
    menu_item_id: int
    quantity: int
    price: float
    
    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: int
    order_number: str
    status: str
    subtotal: float
    delivery_charge: float
    gst: float
    total_amount: float
    rider_name: Optional[str]
    rider_photo: Optional[str]
    estimated_delivery_time: int
    created_at: datetime
    order_items: List[OrderItemResponse]
    
    class Config:
        from_attributes = True

class PlaceOrderRequest(BaseModel):
    restaurant_id: int
    items: List[CartItem]
    delivery_address: str
    special_instructions: Optional[str] = None

# ============ GAMIFICATION SCHEMAS ============

class AchievementResponse(BaseModel):
    id: int
    name: str
    description: str
    badge_icon: str
    
    class Config:
        from_attributes = True

class UserStatisticsResponse(BaseModel):
    total_orders: int
    total_savings: float
    current_streak_days: int
    longest_streak_days: int
    favorite_cuisine: Optional[str]
    favorite_restaurant: Optional[str]
    weekly_savings: float
    monthly_savings: float
    yearly_savings: float
    craving_score: int
    
    class Config:
        from_attributes = True

# ============ AI SCHEMAS ============

class MoodRequest(BaseModel):
    mood: str  # happy, sad, lonely, stressed, celebrating, hungry

class FoodRecommendation(BaseModel):
    menu_item_id: int
    name: str
    price: float
    reason: str
    ai_message: str

class DreamMealResponse(BaseModel):
    meal_name: str
    description: str
    items: List[MenuItemResponse]
    total_price: float
