# DreamFood - Developer Quick Reference

## 🚀 Quick Start (5 minutes)

### Option 1: Run Everything
```bash
# Terminal 1 - Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python seed_data.py
python main.py

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

### Option 2: Just Frontend (with existing backend)
```bash
cd frontend
npm install
npm run dev
```

## 📍 URLs After Launch
- **Frontend**: http://localhost:3000
- **API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Backend Test**: GET http://localhost:8000/

## 🔑 Test Credentials
- **Email**: test@dreamfood.com
- **Password**: password123
- Or use **Guest Mode** for instant access

## 📁 Key Directories

### Backend
- `/backend/app/routers` - API endpoints (8 files)
- `/backend/app/models.py` - Database tables
- `/backend/app/schemas.py` - Request/response formats
- `/backend/seed_data.py` - Sample data

### Frontend
- `/frontend/app/` - Page routes
- `/frontend/components/` - Reusable UI
- `/frontend/lib/api.ts` - API calls
- `/frontend/store/` - State management

## 🔌 API Quick Reference

### Authentication
```javascript
// Login
POST /api/auth/login
{ "email": "user@example.com", "password": "password123" }

// Register
POST /api/auth/register
{ "email": "new@example.com", "username": "username", "password": "pass", "full_name": "Name" }

// Guest
POST /api/auth/guest-login
```

### Restaurants
```javascript
// List restaurants
GET /api/restaurants/?skip=0&limit=10&cuisine_type=Pizza

// Get single restaurant
GET /api/restaurants/1

// Search
GET /api/restaurants/search/by-name?name=Biryani

// Categories
GET /api/restaurants/category/all
```

### Menu
```javascript
// Get menu for restaurant
GET /api/menu/restaurant/1?skip=0&limit=20

// Get item
GET /api/menu/5

// Popular items
GET /api/menu/popular/all?limit=10

// Search
GET /api/menu/search/by-name?name=Biryani
```

## 💾 Environment Files

### Backend .env
```
DATABASE_URL=postgres://username:password@host:5432/dreamfood?sslmode=disable
GROQ_API_KEY=your-groq-api-key-here
SECRET_KEY=your-secret-key-here
```

### Frontend .env.local
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🛠️ Common Tasks

### Add new API endpoint
1. Create function in `/backend/app/routers/[feature].py`
2. Add router to `/backend/main.py`
3. Define request/response in `/backend/app/schemas.py`
4. Add API function to `/frontend/lib/api.ts`

### Add new page
1. Create folder in `/frontend/app/[page]/`
2. Add `page.tsx` with component
3. Optional: add `layout.tsx`
4. Update Header navigation if needed

### Add new component
1. Create file in `/frontend/components/`
2. Export from component
3. Import in pages where needed
4. Use TypeScript interfaces for props

### Modify database
1. Edit models in `/backend/app/models.py`
2. Delete old database (if dev)
3. Run `seed_data.py` to recreate
4. Restart backend server

## 📊 Database Tables

```
✅ users              - Auth & profile
✅ restaurants        - Restaurant info
✅ menu_items         - Food items
✅ orders             - Dream orders
✅ order_items        - Order lines
✅ order_tracking     - Live tracking
✅ wishlist_items     - Saved foods
✅ saved_orders       - Saved carts
✅ achievements       - Badge definitions
✅ user_achievements  - User badges
✅ user_statistics    - Savings tracking
```

## 🔍 Debugging

### Backend
- **API Docs**: http://localhost:8000/docs
- **Logs**: Check terminal running `python main.py`
- **Database**: Connect with PostgreSQL client

### Frontend
- **DevTools**: F12 in browser
- **Console**: Check for API errors
- **Network Tab**: Watch API requests
- **React DevTools**: Check component state

## 📦 Dependencies

### Backend (Python)
- fastapi - Web framework
- sqlalchemy - ORM
- psycopg2 - PostgreSQL driver
- pydantic - Validation
- python-jose - JWT
- bcrypt - Password hashing

### Frontend (npm)
- next - React framework
- typescript - Type safety
- tailwindcss - Styling
- framer-motion - Animations
- zustand - State management
- axios - HTTP client

## ⚡ Performance Tips

### Backend
- Use pagination for large datasets
- Index frequently searched columns
- Cache expensive queries
- Use connection pooling

### Frontend
- Lazy load images
- Code split large pages
- Cache API responses
- Memoize expensive components

## 🔐 Security Checklist

- [ ] Change SECRET_KEY in production
- [ ] Use HTTPS only in production
- [ ] Validate all user input
- [ ] Use CORS whitelist
- [ ] Hash passwords with bcrypt
- [ ] Validate JWT tokens
- [ ] Sanitize database queries
- [ ] Environment variables in .env

## 📱 Mobile Responsiveness

Classes to remember:
```css
md:        /* Medium screens (768px+) */
lg:        /* Large screens (1024px+) */
mobile-first approach
```

## 🎨 Color Scheme

From tailwind.config.js:
- **Primary**: #FF6B35 (Orange)
- **Secondary**: #004E89 (Blue)
- **Accent**: #F7B801 (Yellow)

## 📈 Feature Implementation Order

Recommended order for next features:

1. **Order Placement** (1-2 hours)
   - POST /api/orders/place-order
   - Calculate totals
   - Generate order number

2. **Order Tracking** (2-3 hours)
   - 8-stage progression
   - Real-time updates
   - Animations

3. **User Dashboard** (2-3 hours)
   - Statistics page
   - Order history
   - Savings tracking

4. **Gamification** (2-3 hours)
   - Achievements system
   - Level progression
   - Leaderboard

5. **AI Features** (3-4 hours)
   - Mood-based recommendations
   - Grok API integration
   - Chat interface

## 🚢 Deployment Checklist

- [ ] Update API URL for production
- [ ] Change SECRET_KEY
- [ ] Update CORS_ORIGINS
- [ ] Set DEBUG=False
- [ ] Configure database backup
- [ ] Setup error logging
- [ ] Test all endpoints
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Setup SSL certificate

## 📚 Further Reading

- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`
- Setup Guide: `SETUP_GUIDE.md`
- Project Summary: `PROJECT_SUMMARY.md`
- FastAPI Docs: https://fastapi.tiangolo.com
- Next.js Docs: https://nextjs.org
- Tailwind CSS: https://tailwindcss.com

## 💬 Common Issues & Fixes

### Backend won't start
- Check if port 8000 is in use
- Verify PostgreSQL is running
- Check .env file exists
- Run `pip install -r requirements.txt`

### Frontend won't start
- Delete node_modules
- Run `npm install` again
- Check API URL in .env.local
- Clear npm cache: `npm cache clean --force`

### Database connection fails
- Check connection string in .env
- Verify PostgreSQL is accessible
- Check firewall settings
- Test with PostgreSQL client

### API returns 401
- Token expired - re-login
- Token not in request header
- Invalid token - clear storage
- Check localStorage for token

## 🎯 Code Standards

- Use TypeScript for all new code
- Follow ESLint rules
- Use components from ShadCN UI
- Name components PascalCase
- Name functions/variables camelCase
- Add JSDoc comments for complex functions
- Use meaningful variable names
- Keep functions focused and small

## 🤝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes
git add .
git commit -m "feat: add feature name"

# Push
git push origin feature/feature-name

# Create pull request on GitHub
```

---

**Save this for reference!** 📌
Most common commands are at the top.

*Last Updated: June 13, 2026*
