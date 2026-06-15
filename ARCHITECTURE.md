# DreamFood Application Architecture & Directory Structure

## Directory Tree

```
d:/Python/DremThings/
│
├── 📁 backend/                          # FastAPI Backend Application
│   ├── 📁 app/
│   │   ├── __init__.py
│   │   ├── config.py                   # Configuration management
│   │   ├── database.py                 # SQLAlchemy database setup
│   │   ├── models.py                   # SQLAlchemy ORM models
│   │   ├── schemas.py                  # Pydantic request/response schemas
│   │   ├── 📁 routers/                 # API endpoint modules
│   │   │   ├── __init__.py
│   │   │   ├── auth.py                 # Authentication endpoints
│   │   │   ├── users.py                # User management
│   │   │   ├── restaurants.py          # Restaurant listings
│   │   │   ├── menu.py                 # Menu management
│   │   │   ├── orders.py               # Order processing
│   │   │   ├── cart.py                 # Shopping cart
│   │   │   ├── ai.py                   # AI-powered features
│   │   │   └── gamification.py         # Rewards & gamification
│   │
│   ├── main.py                         # FastAPI application entry point
│   ├── requirements.txt                # Python dependencies
│   ├── .env.example                    # Environment variables template
│   ├── seed_data.py                    # Database seeding script
│   ├── api_integration_test.py         # API testing
│   └── README.md
│
├── 📁 frontend/                        # Next.js Frontend Application
│   ├── 📁 app/                         # App Router (Next.js 13+)
│   │   ├── layout.tsx                  # Root layout component
│   │   ├── globals.css                 # Global styles
│   │   ├── 📁 home/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx                # Home page
│   │   ├── 📁 auth/
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── 📁 restaurant/
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Dynamic restaurant detail page
│   │   ├── 📁 cart/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── 📁 order/
│   │   │   ├── confirmation/
│   │   │   │   └── page.tsx
│   │   │   └── tracking/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │
│   ├── 📁 components/                  # Reusable React components
│   │   ├── Header.tsx
│   │   ├── RestaurantCard.tsx
│   │   ├── MenuCard.tsx
│   │   └── [other components]
│   │
│   ├── 📁 lib/                         # Utility functions & helpers
│   │   ├── api.ts                      # API client configuration
│   │   ├── utils.ts                    # General utility functions
│   │   └── constants.ts                # Application constants
│   │
│   ├── 📁 store/                       # Zustand state management
│   │   ├── authStore.ts                # Authentication state
│   │   ├── cartStore.ts                # Shopping cart state
│   │   └── uiStore.ts                  # UI state
│   │
│   ├── 📁 public/                      # Static assets
│   │   ├── images/
│   │   ├── fonts/
│   │   └── [other assets]
│   │
│   ├── package.json                    # Node.js dependencies
│   ├── package-lock.json               # Dependency lock file
│   ├── tsconfig.json                   # TypeScript configuration
│   ├── next.config.js                  # Next.js configuration
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── postcss.config.js               # PostCSS configuration
│   ├── .env.production                 # Production environment vars
│   ├── next-env.d.ts                   # Next.js TypeScript definitions
│   └── README.md
│
├── 📁 .vscode/                         # VS Code workspace settings
│   └── settings.json                   # Editor & extension configurations
│
├── 📁 postgres-data/                   # PostgreSQL data volume (local dev)
│
├── Dockerfile                          # Multi-stage Docker build
├── .dockerignore                       # Files to exclude from Docker
├── nginx.conf                          # Nginx reverse proxy configuration
├── docker-compose.yml                  # Docker Compose orchestration
├── .env.example                        # Environment variables template
├── .env.prod                           # Production environment config
├── .gitignore                          # Git ignore rules
│
├── start_backend.ps1                   # PowerShell script to start backend
├── start-docker.sh                     # Bash script to start Docker
├── start-docker.bat                    # Batch script to start Docker
│
├── SOLUTION_EXPLANATION.md             # This deployment solution docs
├── ARCHITECTURE.md                     # Architecture and folder structure
├── PROJECT_SUMMARY.md                  # Project overview
├── QUICK_REFERENCE.md                  # Quick command reference
├── SETUP_GUIDE.md                      # Setup instructions
├── EASYPANEL_SETUP.md                  # EasyPanel deployment guide
├── DOCKER_DEPLOYMENT_GUIDE.md          # Docker deployment instructions
│
└── README.md                           # Main project documentation
```

## Detailed Component Architecture

### Backend Architecture

```
FastAPI Application
│
├── Configuration Layer
│   ├── config.py          → Environment-based settings
│   └── .env files         → Secrets & credentials
│
├── Data Layer
│   ├── database.py        → PostgreSQL connection & session management
│   ├── models.py          → SQLAlchemy ORM models (User, Restaurant, Order, etc.)
│   └── schemas.py         → Pydantic validation schemas
│
├── Business Logic Layer
│   ├── routers/auth.py    → Authentication (JWT, registration, login)
│   ├── routers/users.py   → User profile management
│   ├── routers/restaurants.py → Restaurant CRUD operations
│   ├── routers/menu.py    → Menu item management
│   ├── routers/orders.py  → Order processing & tracking
│   ├── routers/cart.py    → Shopping cart operations
│   ├── routers/ai.py      → AI recommendations (Groq integration)
│   └── routers/gamification.py → Reward points & badges
│
├── HTTP Server Layer
│   ├── main.py            → App initialization & route mounting
│   ├── Uvicorn            → ASGI server (runs on port 8001)
│   └── CORS               → Cross-origin request handling
│
└── External Services
    ├── PostgreSQL DB      → User, restaurant, order data
    ├── Redis             → Caching & sessions
    ├── Groq AI           → LLM-based recommendations
    └── Gmail SMTP        → Email notifications
```

### Frontend Architecture

```
Next.js Application
│
├── Routing Layer (App Router)
│   ├── app/layout.tsx     → Root wrapper
│   ├── app/page.tsx       → Home route
│   ├── app/auth/*         → Authentication pages
│   ├── app/restaurant/*   → Restaurant details
│   ├── app/cart/*         → Shopping cart
│   └── app/order/*        → Order management
│
├── Component Layer
│   ├── Page components    → Full-page layouts
│   ├── Reusable components → Header, Cards, Forms
│   └── Client components  → Interactive elements
│
├── State Management (Zustand)
│   ├── authStore.ts       → User authentication state
│   ├── cartStore.ts       → Shopping cart state
│   └── uiStore.ts        → UI/modal state
│
├── API Integration Layer
│   ├── lib/api.ts         → Axios client configuration
│   ├── API endpoints      → Base URL, headers, interceptors
│   └── Request/response   → Data transformation
│
├── Styling Layer
│   ├── globals.css        → Global styles
│   ├── Tailwind CSS       → Utility-first CSS framework
│   └── Component styles   → Scoped CSS modules
│
└── Build & Config
    ├── tsconfig.json      → TypeScript configuration
    ├── next.config.js     → Next.js settings
    └── tailwind.config.js → Tailwind theme customization
```

### Docker Containerization Architecture

```
Dockerfile (Multi-stage build)
│
├── Stage 1: Node.js Alpine (Frontend Builder)
│   ├── Install Node 18
│   ├── Copy package.json & package-lock.json
│   ├── npm install --legacy-peer-deps
│   ├── Copy source code
│   └── npm run build → Generates .next/ optimized build
│
└── Stage 2: Python 3.11 Slim (Production)
    ├── System Packages
    │   ├── curl, nginx, supervisor
    │   ├── Node.js 18
    │   └── PostgreSQL client
    │
    ├── Python Setup
    │   ├── Copy requirements.txt
    │   ├── pip install dependencies
    │   └── Copy backend code
    │
    ├── Frontend Setup
    │   ├── Copy .next/ from Stage 1
    │   ├── Copy node_modules from Stage 1
    │   └── Copy public/ assets
    │
    ├── Nginx Configuration
    │   ├── Reverse proxy rules
    │   ├── Static file serving
    │   └── API routing (/api/* → backend)
    │
    ├── Supervisor Configuration
    │   ├── [program:backend] → Uvicorn on :8001
    │   ├── [program:frontend] → Next.js on :3000
    │   └── [program:nginx] → Reverse proxy on :8000
    │
    ├── Non-root User
    │   └── appuser (UID 1000)
    │
    └── Entrypoint
        └── supervisord manages all processes
```

### Network & Service Architecture

```
                    EasyPanel / Hostinger
                             ↓
                    ┌─────────────────┐
                    │   Port 8000     │
                    │  (Public)       │
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │     Nginx       │
                    │  Reverse Proxy  │
                    └──────┬──────┬───┘
                           │      │
          ┌────────────────┘      └──────────────┐
          │                                      │
          ↓                                      ↓
    /api/* requests                     /* requests
          │                                      │
          ↓                                      ↓
    Port 8001                          Port 3000
    ┌─────────────┐              ┌──────────────┐
    │  FastAPI    │              │   Next.js    │
    │  (Backend)  │              │ (Frontend)   │
    │  Uvicorn    │              │              │
    └──────┬──────┘              └──────┬───────┘
           │                            │
           └────────┬───────┬──────────┘
                    │       │
            ┌───────┘       │
            ↓               ↓
        PostgreSQL      Redis Cache
         (Database)    (Sessions/Cache)
```

### Data Flow Architecture

```
User Request
    ↓
Nginx (Port 8000)
    ├─→ /api/* → FastAPI Backend → PostgreSQL
    │   Response JSON
    │
    └─→ /* → Next.js Frontend → Static files + SSR
        Response HTML/JS

Frontend State (Zustand)
    ↓
API Client (Axios)
    ↓
Backend Routers
    ↓
SQLAlchemy Models
    ↓
PostgreSQL Database
```

## Technology Stack Summary

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | Next.js | 13.4 | React framework with SSR |
| | TypeScript | 5.0 | Type-safe JavaScript |
| | Tailwind CSS | 3.3 | Utility-first styling |
| | Zustand | 4.3 | State management |
| | Axios | 1.4 | HTTP client |
| **Backend** | FastAPI | 0.104 | Python web framework |
| | Uvicorn | 0.24 | ASGI server |
| | SQLAlchemy | 2.0 | ORM library |
| | Pydantic | 2.5 | Data validation |
| **Database** | PostgreSQL | 13+ | Relational database |
| **Caching** | Redis | 5.0 | In-memory cache |
| **Reverse Proxy** | Nginx | 1.26 | Load balancer & proxy |
| **Process Manager** | Supervisor | 4.2 | Service orchestration |
| **Containerization** | Docker | Latest | Container runtime |
| **Deployment** | EasyPanel | - | Hostinger platform |

## Environment Configuration

### Development (.env.local / .env)
- Backend: `http://localhost:8000`
- Database: `postgresql://user:pass@localhost:5432/dreamfood`
- Redis: `redis://localhost:6379/0`

### Production (EasyPanel)
- Backend: `https://your-domain.com/api`
- Database: `postgresql://user:pass@production-db:5432/dreamfood`
- Redis: `redis://production-redis:6379/0`
- Frontend: `https://your-domain.com`

## Key Design Patterns

1. **Separation of Concerns**: Frontend, backend, and data layers are independent
2. **Microservice-like**: Multiple services (Nginx, FastAPI, Next.js) in one container
3. **Stateless Services**: Easy horizontal scaling (each instance is independent)
4. **API-First**: Clear contract between frontend and backend via REST API
5. **Configuration Management**: Environment variables for flexibility
6. **Error Handling**: Centralized error responses and logging

## Deployment Pipeline

```
Code Commit
    ↓
GitHub Push
    ↓
EasyPanel Webhook (Auto-triggered)
    ↓
Docker Build
    ├─ Stage 1: Build frontend (.next/)
    └─ Stage 2: Assemble production image
    ↓
Docker Run
    ├─ Start PostgreSQL
    ├─ Start backend (Uvicorn:8001)
    ├─ Start frontend (Next.js:3000)
    └─ Start Nginx (8000 → routes traffic)
    ↓
Health Check
    └─ curl /api/health
    ↓
Live on your domain
```

## Performance Considerations

1. **Frontend**: Next.js SSR + static optimization
2. **Backend**: FastAPI async/await for concurrent requests
3. **Caching**: Redis for session & query caching
4. **Database**: PostgreSQL indexing on frequently queried fields
5. **Nginx**: Gzip compression, reverse proxy caching
6. **Docker**: Multi-stage build reduces image size

## Security Architecture

```
┌─────────────────────────────────────┐
│  HTTPS (EasyPanel SSL)              │
├─────────────────────────────────────┤
│  Nginx (Port 8000)                  │
│  - CORS validation                  │
│  - Request filtering                │
├─────────────────────────────────────┤
│  FastAPI (Port 8001, internal only) │
│  - JWT authentication               │
│  - Request validation (Pydantic)    │
│  - Password hashing (bcrypt)        │
├─────────────────────────────────────┤
│  PostgreSQL (Internal network only) │
│  - User isolation via DB roles      │
│  - Encrypted passwords              │
└─────────────────────────────────────┘
```

## Monitoring & Logging

- **Supervisor**: Manages process restarts
- **Docker logs**: `docker logs <container-id>`
- **Nginx logs**: `/var/log/nginx/access.log` & `error.log`
- **Backend logs**: `/var/log/backend.out.log` & `.err.log`
- **Frontend logs**: Browser console & `/var/log/frontend.out.log`
