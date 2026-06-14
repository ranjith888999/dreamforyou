# DreamFood Project - Complete Setup Guide

## Quick Start

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Configure environment:**
- The `.env` file is already set with database connection
- Update `GROQ_API_KEY`, `GOOGLE_CLIENT_*` if needed

5. **Initialize database:**
```bash
python seed_data.py
```

6. **Start backend server:**
```bash
python main.py
```

Backend will be available at: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## Project Architecture

```
DreamFood/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── routers/           # API endpoints
│   │   ├── models.py          # Database models
│   │   ├── schemas.py         # Request/Response schemas
│   │   ├── database.py        # DB configuration
│   │   └── config.py          # App settings
│   ├── main.py                # FastAPI app
│   ├── seed_data.py          # Sample data
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
│
└── frontend/                   # Next.js Frontend
    ├── app/                   # Next.js app directory
    │   ├── page.tsx          # Home page
    │   ├── layout.tsx        # Root layout
    │   ├── auth/             # Auth pages
    │   ├── home/             # Main app pages
    │   └── globals.css       # Global styles
    ├── components/           # React components
    ├── lib/
    │   ├── api.ts           # API client
    │   ├── constants.ts     # App constants
    │   └── utils.ts         # Utilities
    ├── store/               # Zustand stores
    ├── package.json
    └── tailwind.config.js
```

## Database Schema

### Users
- Email & username authentication
- Google OAuth support
- Guest mode support
- Profile information

### Restaurants
- 8+ sample restaurants
- Category-based filtering
- Ratings & delivery info

### Menu Items
- Food items with details
- Price, calories, spice level
- Vegetarian/Non-veg options

### Orders
- 8-stage order tracking
- Delivery partner info
- Real-time status updates

### Gamification
- Achievements
- User statistics
- Levels & streaks

## API Endpoints

### Authentication (✅ Implemented)
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/guest-login` - Guest
- `GET /api/auth/verify-token` - Verify

### Restaurants (✅ Implemented)
- `GET /api/restaurants/` - List
- `GET /api/restaurants/{id}` - Details
- `GET /api/restaurants/search/by-name` - Search
- `GET /api/restaurants/category/all` - Categories

### Menu (✅ Implemented)
- `GET /api/menu/restaurant/{id}` - Menu items
- `GET /api/menu/{id}` - Item details
- `GET /api/menu/popular/all` - Popular items
- `GET /api/menu/search/by-name` - Search

### Cart (🔄 Coming Soon)
- Add/Remove items
- Update quantity
- Calculate totals

### Orders (🔄 Coming Soon)
- Place order
- Track delivery (real-time)
- Order history

### Users (🔄 Coming Soon)
- Profile management
- Wishlist
- Saved orders

### AI Features (🔄 Coming Soon)
- Mood-based recommendations
- Dream meal generator
- AI companion chat

### Gamification (🔄 Coming Soon)
- Achievements
- Statistics
- Leaderboard

## Features Status

### ✅ Completed
- Project structure & setup
- Database models & schemas
- Authentication endpoints
- Restaurant & menu endpoints
- Frontend home page
- Login/Register pages
- State management setup
- API client setup

### 🔄 In Progress
- Cart functionality
- Order simulation engine
- Real-time tracking animations
- User dashboard
- AI recommendations
- Gamification system

### 📋 To Do
- Complete cart operations
- Implement 8-stage order tracking
- Add live delivery map
- Create order completion screen
- Build user dashboard
- Implement AI features with Grok
- Add gamification features
- Implement social sharing
- Set up payment simulation

## Technology Stack

### Backend
- FastAPI (Web framework)
- PostgreSQL (Database)
- SQLAlchemy (ORM)
- Pydantic (Data validation)
- python-jose (JWT)
- bcrypt (Password hashing)
- Groq AI (AI recommendations)

### Frontend
- Next.js 14 (React framework)
- TypeScript (Type safety)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- Zustand (State management)
- Axios (HTTP client)
- ShadCN UI (Component library)

### Infrastructure
- Hostinger (Hosting)
- PostgreSQL Cloud (Database)

## Development Tips

1. **Hot Reload:**
   - Backend: Automatic with `uvicorn --reload`
   - Frontend: Automatic with `npm run dev`

2. **Database:**
   - Models are auto-created on app start
   - Run `seed_data.py` for sample data
   - Use PostgreSQL tools to inspect

3. **API Testing:**
   - FastAPI docs: http://localhost:8000/docs
   - Use Postman or Thunder Client

4. **Frontend Development:**
   - Components in `components/`
   - Pages in `app/`
   - Styles with Tailwind CSS

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgres://...
GROQ_API_KEY=gsk_...
SECRET_KEY=your-secret
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Deployment

### Backend (Hostinger)
1. Push code to repository
2. Connect to Hostinger EasyPanel
3. Deploy FastAPI app
4. Configure environment variables

### Frontend (Hostinger)
1. Build: `npm run build`
2. Deploy Next.js app
3. Configure API URL for production

## Support

For issues or questions:
1. Check API docs at `/api/docs`
2. Review database schema
3. Check browser console for frontend errors
4. Review server logs for backend errors

## Next Steps

1. Implement cart functionality
2. Create order simulation engine
3. Add real-time tracking with Framer Motion
4. Build user dashboard
5. Integrate Grok AI for recommendations
6. Add gamification features
7. Implement social sharing
8. Deploy to Hostinger

Good luck building DreamFood! 🍕✨
