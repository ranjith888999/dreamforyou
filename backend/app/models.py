from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, Enum, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=True)  # Nullable for OAuth users
    full_name = Column(String)
    profile_picture = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    google_id = Column(String, unique=True, nullable=True, index=True)  # Google OAuth ID
    is_active = Column(Boolean, default=True)
    auth_provider = Column(String, default="email")  # email, google, guest
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    orders = relationship("Order", back_populates="user")
    wishlist_items = relationship("WishlistItem", back_populates="user")
    saved_orders = relationship("SavedOrder", back_populates="user")
    achievements = relationship("UserAchievement", back_populates="user")
    
class Restaurant(Base):
    __tablename__ = "restaurants"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    cuisine_type = Column(String)  # Biryani, Pizza, Burger, etc.
    rating = Column(Float, default=4.5)
    review_count = Column(Integer, default=1000)
    delivery_time = Column(Integer)  # in minutes
    delivery_charge = Column(Float, default=40)
    logo_url = Column(String)
    banner_url = Column(String)
    address = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    is_active = Column(Boolean, default=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    menu_items = relationship("MenuItem", back_populates="restaurant")
    orders = relationship("Order", back_populates="restaurant")

class MenuItem(Base):
    __tablename__ = "menu_items"
    
    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), index=True)
    name = Column(String, index=True)
    description = Column(Text)
    price = Column(Float)
    image_url = Column(String)
    is_vegetarian = Column(Boolean, default=True)
    spice_level = Column(Integer)  # 1-5
    calories = Column(Integer)
    is_popular = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    restaurant = relationship("Restaurant", back_populates="menu_items")
    order_items = relationship("OrderItem", back_populates="menu_item")
    wishlist_items = relationship("WishlistItem", back_populates="menu_item")

class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PREPARING = "preparing"
    PACKED = "packed"
    ASSIGNED = "assigned"
    PICKED_UP = "picked_up"
    IN_TRANSIT = "in_transit"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), index=True)
    
    order_number = Column(String, unique=True, index=True)
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    
    subtotal = Column(Float)
    delivery_charge = Column(Float)
    gst = Column(Float)
    total_amount = Column(Float)
    
    delivery_address = Column(String)
    rider_name = Column(String, nullable=True)
    rider_photo = Column(String, nullable=True)
    rider_rating = Column(Float, nullable=True)
    rider_phone = Column(String, nullable=True)
    
    estimated_delivery_time = Column(Integer)  # in minutes
    actual_delivery_time = Column(Integer, nullable=True)
    
    special_instructions = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    delivered_at = Column(DateTime, nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="orders")
    restaurant = relationship("Restaurant", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order")
    order_tracking = relationship("OrderTracking", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), index=True)
    menu_item_id = Column(Integer, ForeignKey("menu_items.id"), index=True)
    
    quantity = Column(Integer)
    price = Column(Float)  # Price at time of order
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    order = relationship("Order", back_populates="order_items")
    menu_item = relationship("MenuItem", back_populates="order_items")

class OrderTracking(Base):
    __tablename__ = "order_tracking"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), index=True)
    
    status = Column(Enum(OrderStatus))
    status_message = Column(Text)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    eta_minutes = Column(Integer, nullable=True)
    rider_message = Column(String, nullable=True)
    
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    order = relationship("Order", back_populates="order_tracking")

class WishlistItem(Base):
    __tablename__ = "wishlist_items"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    menu_item_id = Column(Integer, ForeignKey("menu_items.id"), index=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="wishlist_items")
    menu_item = relationship("MenuItem", back_populates="wishlist_items")

class SavedOrder(Base):
    __tablename__ = "saved_orders"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    order_name = Column(String)
    order_data = Column(JSON)  # Store cart items as JSON
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="saved_orders")

class Achievement(Base):
    __tablename__ = "achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(Text)
    badge_icon = Column(String)
    condition = Column(String)  # How to earn this achievement
    
    created_at = Column(DateTime, default=datetime.utcnow)

class UserAchievement(Base):
    __tablename__ = "user_achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    achievement_id = Column(Integer, ForeignKey("achievements.id"), index=True)
    
    earned_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="achievements")

class UserStatistics(Base):
    __tablename__ = "user_statistics"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True, index=True)
    
    total_orders = Column(Integer, default=0)
    total_savings = Column(Float, default=0)
    current_streak_days = Column(Integer, default=0)
    longest_streak_days = Column(Integer, default=0)
    
    favorite_cuisine = Column(String, nullable=True)
    favorite_restaurant = Column(String, nullable=True)
    
    weekly_savings = Column(Float, default=0)
    monthly_savings = Column(Float, default=0)
    yearly_savings = Column(Float, default=0)
    
    craving_score = Column(Integer, default=0)  # 0-100
    
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
