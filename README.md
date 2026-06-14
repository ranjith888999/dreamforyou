# DreamFood - Full Stack Food Delivery Simulation

A modern, full-stack web application that simulates the entire food ordering experience without actual payments or delivery. Built with Next.js, FastAPI, and PostgreSQL.

## 🎯 Project Overview

DreamFood is a dopamine-based food delivery simulation platform designed for:
- College students
- Young professionals  
- Late-night cravers
- People trying to reduce spending
- Users looking for entertainment

Users can browse real restaurants, select food, add to cart, place dream orders, track fake deliveries in real-time, and see how much money they saved - all for ₹0.

## ✨ Key Features

### 1. **User Authentication**
- Email & password registration/login
- Google OAuth integration (ready)
- Guest mode for quick access
- JWT-based session management

### 2. **Restaurant Browsing**
- 8+ pre-loaded restaurants with real details
- Filter by cuisine type
- Search by restaurant name
- 4.5+ ratings with 1000+ reviews

### 3. **Menu System**
- Food items with detailed information
- Pricing, calories, spice level
- Vegetarian/Non-veg indicators
- Popular items highlight

### 4. **Dream Cart**
- Add/remove items
- Update quantities
- Real-time total calculation
- GST simulation (5%)
- Delivery charge logic

### 5. **Order Simulation Engine** (Coming Soon)
8-stage order tracking:
1. Restaurant Accepted ✅
2. Chef Started Cooking 👨‍🍳
3. Food Being Prepared 🍳
4. Food Packed 📦
5. Delivery Partner Assigned 🏍️
6. Delivery Partner Picked Up 🚙
7. Delivery On The Way 🗺️
8. Delivered Successfully 🎉

### 6. **Live Delivery Tracking** (Coming Soon)
- Animated bike movement on map
- Dynamic ETA updates
- Random rider messages
- Rider name and photo

### 7. **Gamification** (Coming Soon)
- Achievements & badges
- 4-tier level system
- Savings streaks
- Monthly/yearly statistics

### 8. **AI Features** (Coming Soon)
- Mood-based food recommendations
- Dream meal generator
- AI food companion chat
- Smart delivery messages via Grok AI

### 9. **Social Features** (Coming Soon)
- Share dream orders
- Community feed
- Like & comment system

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **HTTP Client**: Axios
- **UI Components**: ShadCN UI, Radix UI
- **Icons**: React Icons

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT + bcrypt
- **AI**: Grok API
- **Task Queue**: Celery (ready)
- **Cache**: Redis (ready)

### Infrastructure
- **Hosting**: Hostinger EasyPanel
- **Database**: PostgreSQL Cloud
- **API**: RESTful

## 📁 Project Structure

```
DreamFood/
├── backend/
│   ├── app/
│   │   ├── routers/           # API endpoints
│   │   ├── models.py          # Database models
│   │   ├── schemas.py         # Request/Response schemas
│   │   ├── database.py        # DB configuration
│   │   └── config.py          # Settings
│   ├── main.py                # FastAPI app
│   ├── seed_data.py          # Sample data
│   ├── requirements.txt       # Dependencies
│   └── .env                   # Configuration
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx        # Root layout
│   │   ├── auth/             # Authentication pages
│   │   ├── home/             # Main app pages
│   │   ├── restaurant/       # Restaurant details
│   │   └── cart/             # Shopping cart
│   ├── components/           # Reusable components
│   ├── lib/
│   │   ├── api.ts           # API client
│   │   ├── constants.ts     # Constants
│   │   └── utils.ts         # Utilities
│   ├── store/               # Zustand stores
│   ├── package.json
│   └── tailwind.config.js
│
└── SETUP_GUIDE.md            # Setup instructions
```

## 🚀 Quick Start

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Seed sample data
python seed_data.py

# Run server
python main.py
```

Backend available at: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend available at: `http://localhost:3000`

## 📊 Database

### Pre-loaded Sample Data
- **8 Restaurants**: Biryani, Pizza, Burger, Chinese, South/North Indian, Ice Cream, Desserts
- **16+ Menu Items**: With prices, calories, spice levels
- **7 Achievements**: For gamification
- **User Statistics**: Tracking savings and orders

### Key Tables
- `users` - User accounts
- `restaurants` - Restaurant info
- `menu_items` - Food items
- `orders` - Dream orders
- `order_items` - Order details
- `order_tracking` - Real-time tracking
- `achievements` - Achievement definitions
- `user_statistics` - User progress

## 🔌 API Endpoints

### ✅ Implemented
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/guest-login` - Guest access
- `GET /api/restaurants/` - List restaurants
- `GET /api/restaurants/{id}` - Restaurant details
- `GET /api/menu/restaurant/{id}` - Menu items
- `GET /api/menu/popular/all` - Popular items

### 🔄 In Progress
- Cart operations
- Order placement & tracking
- User profile management

### 📋 Coming Soon
- AI recommendations
- Gamification features
- Social sharing

## 🎨 UI/UX Features

- **Dark Mode**: Full dark mode support
- **Responsive Design**: Mobile-first approach
- **Modern Animations**: Smooth transitions with Framer Motion
- **Glassmorphism**: Contemporary design trends
- **Accessibility**: WCAG compliant
- **Real-time Updates**: Live status changes

## 🔐 Security

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Input validation with Pydantic
- SQL injection prevention via ORM

## 📈 Roadmap

### Phase 1 (Current)
- [x] Project setup
- [x] Authentication
- [x] Restaurant & menu listing
- [ ] Cart functionality
- [ ] Order simulation

### Phase 2
- [ ] Real-time delivery tracking
- [ ] Gamification system
- [ ] AI recommendations
- [ ] Live map integration

### Phase 3
- [ ] Social features
- [ ] Premium tier
- [ ] Advanced analytics
- [ ] Mobile app

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgres://user:pass@host/dreamfood
GROQ_API_KEY=your_grok_api_key
SECRET_KEY=your_secret_key
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📱 Demo Credentials

### Sample User
- Email: `user@dreamfood.com`
- Password: `password123`

Or use Guest mode for instant access!

## 🐛 Troubleshooting

### Backend Issues
- Check database connection in `.env`
- Verify PostgreSQL is running
- Check port 8000 is not in use
- Run `seed_data.py` for sample data

### Frontend Issues
- Clear npm cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Check API URL in `.env.local`

## 📚 Documentation

- **[Backend README](./backend/README.md)** - API documentation
- **[Frontend README](./frontend/README.md)** - Component guide
- **[Setup Guide](./SETUP_GUIDE.md)** - Detailed setup instructions

## 🎯 Success Metrics

- Users can place orders instantly
- Realistic order simulation with animations
- Accurate savings tracking
- Engaging gamification features
- Social sharing capabilities

## 📞 Support

For issues or questions:
1. Check the SETUP_GUIDE.md
2. Review API documentation
3. Check backend logs
4. Check browser console for frontend errors

## 📄 License

MIT License - Feel free to use this project for learning and development!

---

**Created with ❤️ for food lovers who dream big!** 🍕✨

Join the revolution of guilt-free food ordering! Experience the excitement, track your savings, and never feel bad about wanting food again! 🎉
