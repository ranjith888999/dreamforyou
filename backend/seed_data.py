"""
Seed script to populate database with sample DreamFood data
Run this after creating tables: python seed_data.py
"""

import sys
sys.path.insert(0, "/backend")

from app.database import SessionLocal
from app.models import User, Restaurant, MenuItem, Achievement, UserStatistics
from app.routers.auth import hash_password
from datetime import datetime

def seed_database():
    db = SessionLocal()
    
    try:
        # Clear existing data
        db.query(MenuItem).delete()
        db.query(Restaurant).delete()
        db.query(User).delete()
        db.query(Achievement).delete()
        db.query(UserStatistics).delete()
        db.commit()
        
        # ========== SAMPLE RESTAURANTS ==========
        restaurants_data = [
            {
                "name": "Biryanist Palace",
                "description": "Authentic Hyderabadi biryani with a modern twist",
                "cuisine_type": "Biryani",
                "rating": 4.8,
                "review_count": 2350,
                "delivery_time": 18,
                "delivery_charge": 40,
                "logo_url": "https://via.placeholder.com/100?text=Biryanist",
                "banner_url": "https://via.placeholder.com/500x200?text=Biryanist+Palace",
                "address": "Kondapur, Hyderabad",
                "latitude": 17.4595,
                "longitude": 78.3637,
            },
            {
                "name": "Pizza Paradise",
                "description": "Wood-fired pizzas with premium Italian ingredients",
                "cuisine_type": "Pizza",
                "rating": 4.7,
                "review_count": 1890,
                "delivery_time": 18,
                "delivery_charge": 30,
                "logo_url": "https://via.placeholder.com/100?text=Pizza",
                "banner_url": "https://via.placeholder.com/500x200?text=Pizza+Paradise",
                "address": "Jubilee Hills, Hyderabad",
                "latitude": 17.3850,
                "longitude": 78.4744,
            },
            {
                "name": "Burger King Diner",
                "description": "Gourmet burgers with craft beers",
                "cuisine_type": "Burger",
                "rating": 4.6,
                "review_count": 1650,
                "delivery_time": 18,
                "delivery_charge": 25,
                "logo_url": "https://via.placeholder.com/100?text=Burger+King",
                "banner_url": "https://via.placeholder.com/500x200?text=Burger+King+Diner",
                "address": "Banjara Hills, Hyderabad",
                "latitude": 17.3700,
                "longitude": 78.4500,
            },
            {
                "name": "Dragon Wok",
                "description": "Authentic Chinese cuisine with fresh ingredients",
                "cuisine_type": "Chinese",
                "rating": 4.5,
                "review_count": 1500,
                "delivery_time": 18,
                "delivery_charge": 35,
                "logo_url": "https://via.placeholder.com/100?text=Dragon+Wok",
                "banner_url": "https://via.placeholder.com/500x200?text=Dragon+Wok",
                "address": "Himayat Nagar, Hyderabad",
                "latitude": 17.3600,
                "longitude": 78.4700,
            },
            {
                "name": "South Express",
                "description": "Traditional South Indian breakfast and meals",
                "cuisine_type": "South Indian",
                "rating": 4.7,
                "review_count": 2100,
                "delivery_time": 20,
                "delivery_charge": 20,
                "logo_url": "https://via.placeholder.com/100?text=South+Express",
                "banner_url": "https://via.placeholder.com/500x200?text=South+Express",
                "address": "Secunderabad, Hyderabad",
                "latitude": 17.3700,
                "longitude": 78.5000,
            },
            {
                "name": "North Star Cafe",
                "description": "North Indian curries and tandoori specialties",
                "cuisine_type": "North Indian",
                "rating": 4.6,
                "review_count": 1750,
                "delivery_time": 20,
                "delivery_charge": 35,
                "logo_url": "https://via.placeholder.com/100?text=North+Star",
                "banner_url": "https://via.placeholder.com/500x200?text=North+Star+Cafe",
                "address": "Kukatpally, Hyderabad",
                "latitude": 17.4595,
                "longitude": 78.3637,
            },
            {
                "name": "Frosty Dreams",
                "description": "Premium ice creams and frozen desserts",
                "cuisine_type": "Ice Cream",
                "rating": 4.8,
                "review_count": 1600,
                "delivery_time": 15,
                "delivery_charge": 15,
                "logo_url": "https://via.placeholder.com/100?text=Frosty+Dreams",
                "banner_url": "https://via.placeholder.com/500x200?text=Frosty+Dreams",
                "address": "Indiranagar, Hyderabad",
                "latitude": 17.3650,
                "longitude": 78.4750,
            },
            {
                "name": "Sweet Surrender",
                "description": "Artisanal desserts and sweets from across India",
                "cuisine_type": "Desserts",
                "rating": 4.7,
                "review_count": 1420,
                "delivery_time": 20,
                "delivery_charge": 20,
                "logo_url": "https://via.placeholder.com/100?text=Sweet",
                "banner_url": "https://via.placeholder.com/500x200?text=Sweet+Surrender",
                "address": "Madhapur, Hyderabad",
                "latitude": 17.4595,
                "longitude": 78.3637,
            },
        ]
        
        restaurants = []
        for rest_data in restaurants_data:
            restaurant = Restaurant(**rest_data)
            db.add(restaurant)
            restaurants.append(restaurant)
        
        db.commit()
        
        # ========== SAMPLE MENU ITEMS ==========
        menu_data = [
            # Biryanist Palace
            {
                "restaurant": restaurants[0],
                "name": "Hyderabadi Chicken Biryani",
                "description": "Fragrant basmati rice with tender chicken and aromatic spices",
                "price": 299,
                "image_url": "https://via.placeholder.com/300x200?text=Chicken+Biryani",
                "is_vegetarian": False,
                "spice_level": 3,
                "calories": 450,
                "is_popular": True,
            },
            {
                "restaurant": restaurants[0],
                "name": "Mutton Biryani",
                "description": "Rich and flavourful mutton biryani cooked in traditional dum pukht",
                "price": 349,
                "image_url": "https://via.placeholder.com/300x200?text=Mutton+Biryani",
                "is_vegetarian": False,
                "spice_level": 4,
                "calories": 520,
                "is_popular": True,
            },
            {
                "restaurant": restaurants[0],
                "name": "Veg Biryani",
                "description": "Aromatic vegetarian biryani with seasonal vegetables",
                "price": 229,
                "image_url": "https://via.placeholder.com/300x200?text=Veg+Biryani",
                "is_vegetarian": True,
                "spice_level": 2,
                "calories": 380,
                "is_popular": False,
            },
            # Pizza Paradise
            {
                "restaurant": restaurants[1],
                "name": "Margherita Pizza",
                "description": "Classic pizza with fresh mozzarella, basil, and tomato sauce",
                "price": 349,
                "image_url": "https://via.placeholder.com/300x200?text=Margherita",
                "is_vegetarian": True,
                "spice_level": 1,
                "calories": 380,
                "is_popular": True,
            },
            {
                "restaurant": restaurants[1],
                "name": "Pepperoni Pizza",
                "description": "Traditional pizza with loads of pepperoni and cheese",
                "price": 399,
                "image_url": "https://via.placeholder.com/300x200?text=Pepperoni",
                "is_vegetarian": False,
                "spice_level": 2,
                "calories": 420,
                "is_popular": True,
            },
            # Burger King Diner
            {
                "restaurant": restaurants[2],
                "name": "Whopper Burger",
                "description": "Flame-grilled beef patty with fresh vegetables and special sauce",
                "price": 279,
                "image_url": "https://via.placeholder.com/300x200?text=Whopper",
                "is_vegetarian": False,
                "spice_level": 1,
                "calories": 510,
                "is_popular": True,
            },
            {
                "restaurant": restaurants[2],
                "name": "Veggie Burger",
                "description": "Plant-based burger with fresh greens and herb mayo",
                "price": 229,
                "image_url": "https://via.placeholder.com/300x200?text=Veggie+Burger",
                "is_vegetarian": True,
                "spice_level": 1,
                "calories": 380,
                "is_popular": False,
            },
            # Dragon Wok
            {
                "restaurant": restaurants[3],
                "name": "Chicken Hakka Noodles",
                "description": "Stir-fried noodles with tender chicken pieces and vegetables",
                "price": 259,
                "image_url": "https://via.placeholder.com/300x200?text=Hakka+Noodles",
                "is_vegetarian": False,
                "spice_level": 2,
                "calories": 420,
                "is_popular": True,
            },
            {
                "restaurant": restaurants[3],
                "name": "Schezwan Fried Rice",
                "description": "Spicy fried rice with schezwan sauce and vegetables",
                "price": 239,
                "image_url": "https://via.placeholder.com/300x200?text=Fried+Rice",
                "is_vegetarian": True,
                "spice_level": 4,
                "calories": 380,
                "is_popular": False,
            },
            # South Express
            {
                "restaurant": restaurants[4],
                "name": "Masala Dosa",
                "description": "Crispy dosa with spiced potato filling and sambar",
                "price": 179,
                "image_url": "https://via.placeholder.com/300x200?text=Masala+Dosa",
                "is_vegetarian": True,
                "spice_level": 2,
                "calories": 280,
                "is_popular": True,
            },
            {
                "restaurant": restaurants[4],
                "name": "Idli Sambar",
                "description": "Soft steamed idlis with flavourful sambar and chutney",
                "price": 149,
                "image_url": "https://via.placeholder.com/300x200?text=Idli",
                "is_vegetarian": True,
                "spice_level": 1,
                "calories": 200,
                "is_popular": False,
            },
            # North Star Cafe
            {
                "restaurant": restaurants[5],
                "name": "Butter Chicken with Naan",
                "description": "Creamy butter chicken served with soft naan bread",
                "price": 319,
                "image_url": "https://via.placeholder.com/300x200?text=Butter+Chicken",
                "is_vegetarian": False,
                "spice_level": 2,
                "calories": 480,
                "is_popular": True,
            },
            {
                "restaurant": restaurants[5],
                "name": "Paneer Tikka Masala",
                "description": "Tender paneer in creamy tomato sauce",
                "price": 289,
                "image_url": "https://via.placeholder.com/300x200?text=Paneer+Tikka",
                "is_vegetarian": True,
                "spice_level": 2,
                "calories": 380,
                "is_popular": False,
            },
            # Frosty Dreams
            {
                "restaurant": restaurants[6],
                "name": "Chocolate Fudge Ice Cream",
                "description": "Rich chocolate ice cream with fudge chunks",
                "price": 129,
                "image_url": "https://via.placeholder.com/300x200?text=Choco+Fudge",
                "is_vegetarian": True,
                "spice_level": 0,
                "calories": 250,
                "is_popular": True,
            },
            {
                "restaurant": restaurants[6],
                "name": "Mango Lassi Shake",
                "description": "Chilled mango yogurt shake",
                "price": 99,
                "image_url": "https://via.placeholder.com/300x200?text=Mango+Lassi",
                "is_vegetarian": True,
                "spice_level": 0,
                "calories": 180,
                "is_popular": False,
            },
            # Sweet Surrender
            {
                "restaurant": restaurants[7],
                "name": "Gulab Jamun",
                "description": "Soft milk solids dumplings in sugar syrup",
                "price": 149,
                "image_url": "https://via.placeholder.com/300x200?text=Gulab+Jamun",
                "is_vegetarian": True,
                "spice_level": 0,
                "calories": 220,
                "is_popular": True,
            },
            {
                "restaurant": restaurants[7],
                "name": "Rasgulla",
                "description": "Spongy cottage cheese balls in light sugar syrup",
                "price": 139,
                "image_url": "https://via.placeholder.com/300x200?text=Rasgulla",
                "is_vegetarian": True,
                "spice_level": 0,
                "calories": 180,
                "is_popular": False,
            },
        ]
        
        for menu_item in menu_data:
            item = MenuItem(**menu_item)
            db.add(item)
        
        db.commit()
        
        # ========== SAMPLE ACHIEVEMENTS ==========
        achievements_data = [
            {
                "name": "First Dream Order",
                "description": "Placed your first dream order",
                "badge_icon": "🚀",
                "condition": "Place 1 order",
            },
            {
                "name": "Saved ₹1000",
                "description": "Saved ₹1000 from dream orders",
                "badge_icon": "💰",
                "condition": "Total savings >= 1000",
            },
            {
                "name": "Saved ₹5000",
                "description": "Saved ₹5000 from dream orders",
                "badge_icon": "💸",
                "condition": "Total savings >= 5000",
            },
            {
                "name": "Saved ₹10000",
                "description": "Saved ₹10000 from dream orders",
                "badge_icon": "🎉",
                "condition": "Total savings >= 10000",
            },
            {
                "name": "100 Orders Completed",
                "description": "Completed 100 dream orders",
                "badge_icon": "🏆",
                "condition": "Total orders >= 100",
            },
            {
                "name": "7 Day Streak",
                "description": "Maintained a 7 day savings streak",
                "badge_icon": "🔥",
                "condition": "Consecutive days >= 7",
            },
            {
                "name": "30 Day Streak",
                "description": "Maintained a 30 day savings streak",
                "badge_icon": "⭐",
                "condition": "Consecutive days >= 30",
            },
        ]
        
        for achievement in achievements_data:
            ach = Achievement(**achievement)
            db.add(ach)
        
        db.commit()
        
        print("✅ Database seeded successfully!")
        print(f"✅ Created {len(restaurants)} restaurants")
        print(f"✅ Created {len(menu_data)} menu items")
        print(f"✅ Created {len(achievements_data)} achievements")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
