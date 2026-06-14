# DreamFood Backend

This is the FastAPI backend for DreamFood - A dopamine-based food delivery simulation platform.

## Setup Instructions

### 1. Create Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Variables
The `.env` file is already configured. Update if needed:
- Database connection string
- Grok AI API key
- JWT secret key

### 4. Run Database Migrations
The database tables are created automatically when the app starts.

To seed sample data:
```bash
python seed_data.py
```

### 5. Start the Server
```bash
python main.py
```

The API will be available at: `http://localhost:8000`
API Documentation: `http://localhost:8000/docs`

## Project Structure

```
backend/
├── app/
│   ├── routers/           # API route handlers
│   │   ├── auth.py        # Authentication
│   │   ├── restaurants.py # Restaurant listing
│   │   ├── menu.py        # Menu items
│   │   ├── cart.py        # Shopping cart
│   │   ├── orders.py      # Order management
│   │   ├── users.py       # User profile
│   │   ├── ai.py          # AI features
│   │   └── gamification.py# Gamification
│   ├── models.py          # Database models
│   ├── schemas.py         # Pydantic schemas
│   ├── database.py        # Database configuration
│   ├── config.py          # App configuration
│   └── __init__.py
├── main.py               # Application entry point
├── requirements.txt      # Python dependencies
├── .env                  # Environment variables
└── seed_data.py         # Sample data seeding

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email
- `POST /api/auth/google-login` - Google authentication
- `POST /api/auth/guest-login` - Guest mode
- `GET /api/auth/verify-token` - Verify JWT token

### Restaurants
- `GET /api/restaurants/` - List restaurants
- `GET /api/restaurants/{id}` - Get restaurant details
- `GET /api/restaurants/search/by-name` - Search restaurants
- `GET /api/restaurants/category/all` - Get all categories

### Menu
- `GET /api/menu/restaurant/{restaurant_id}` - Get menu items
- `GET /api/menu/{item_id}` - Get menu item details
- `GET /api/menu/popular/all` - Get popular items
- `GET /api/menu/search/by-name` - Search menu items

### Orders (Coming Soon)
- `POST /api/orders/place-order` - Place order
- `GET /api/orders/{order_id}` - Get order details
- `GET /api/orders/user/history` - Order history
- `GET /api/orders/{order_id}/tracking` - Real-time tracking

### Users (Coming Soon)
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/wishlist` - Get wishlist
- `POST /api/users/wishlist/add` - Add to wishlist
- `POST /api/users/saved-orders/save` - Save order

### AI Features (Coming Soon)
- `POST /api/ai/recommend-by-mood` - Mood-based recommendations
- `POST /api/ai/meal-generator` - Generate dream meals
- `GET /api/ai/companion-chat` - AI companion chat
- `GET /api/ai/delivery-messages` - Random delivery messages

### Gamification (Coming Soon)
- `GET /api/gamification/achievements` - Get achievements
- `GET /api/gamification/user-achievements` - User achievements
- `GET /api/gamification/statistics` - User statistics
- `GET /api/gamification/levels` - Level information
- `GET /api/gamification/leaderboard` - Savings leaderboard

## Technologies Used

- **Framework:** FastAPI
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Authentication:** JWT (python-jose)
- **Password Hashing:** bcrypt
- **AI:** Grok API
- **Server:** Uvicorn

## Notes

- All endpoints are ready with basic structure
- Implementation of complex features (order simulation, AI recommendations) will follow
- Database is configured and ready for data
- CORS is enabled for frontend development
