# DreamFood Architecture Documentation

## 📐 Table of Contents
1. [System Architecture Overview](#system-architecture-overview)
2. [Component Architecture](#component-architecture)
3. [Data Flow](#data-flow)
4. [Technology Stack Details](#technology-stack-details)
5. [Deployment Architecture](#deployment-architecture)
6. [Security Architecture](#security-architecture)
7. [Scalability Architecture](#scalability-architecture)
8. [Database Architecture](#database-architecture)
9. [API Architecture](#api-architecture)
10. [Frontend Architecture](#frontend-architecture)
11. [Infrastructure Architecture](#infrastructure-architecture)

---

## System Architecture Overview

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      Internet / Users                            │
└────────────────────────────┬──────────────────────────────────────┘
                             │ HTTPS
                             ▼
        ┌────────────────────────────────────────┐
        │   Hostinger EasyPanel (Managed Hosting)│
        │         Port 8000 (Public)             │
        └────────────────┬─────────────────────────┘
                         │
        ┌────────────────▼──────────────────────┐
        │      Docker Container                 │
        │      (Multi-stage Build)              │
        │                                       │
        │  ┌──────────────────────────────────┐ │
        │  │  Supervisor (Process Manager)    │ │
        │  │                                  │ │
        │  │  ├─ Backend   (8001)             │ │
        │  │  │  ├─ FastAPI                  │ │
        │  │  │  ├─ PostgreSQL Client        │ │
        │  │  │  └─ Redis Client             │ │
        │  │  │                              │ │
        │  │  ├─ Frontend  (3000)             │ │
        │  │  │  ├─ Next.js                  │ │
        │  │  │  └─ Node.js                  │ │
        │  │  │                              │ │
        │  │  └─ Nginx     (8000)             │ │
        │  │     ├─ Reverse Proxy             │ │
        │  │     ├─ Load Balancer             │ │
        │  │     └─ SSL Termination           │ │
        │  │                                  │ │
        │  └──────────────────────────────────┘ │
        │                                       │
        │  Non-root User: appuser (UID 1000)   │
        └───────────────┬──────────────────────┘
                        │
            ┌───────────┴─────────────┐
            │                         │
            ▼                         ▼
    ┌──────────────┐        ┌──────────────────┐
    │  PostgreSQL  │        │  Redis Cache     │
    │   Database   │        │  (Session/Cache) │
    │   (External) │        │  (External)      │
    └──────────────┘        └──────────────────┘
```

---

## Component Architecture

### 1. Frontend Component Architecture

```
Next.js Application (Port 3000)
│
├─ Pages Directory (SSR/SSG)
│  ├─ /home - Homepage with restaurant listing
│  ├─ /restaurants/[id] - Restaurant details
│  ├─ /restaurants/[id]/menu - Restaurant menu
│  ├─ /cart - Shopping cart
│  ├─ /checkout - Order placement
│  ├─ /orders - Order history
│  ├─ /orders/[id] - Order tracking
│  ├─ /profile - User profile
│  └─ /auth/* - Authentication pages
│
├─ Components (Reusable UI)
│  ├─ RestaurantCard
│  ├─ MenuItemCard
│  ├─ CartSummary
│  ├─ OrderTracker
│  ├─ UserProfile
│  └─ Navigation
│
├─ Lib (Utilities)
│  ├─ api.ts - API client (Axios)
│  ├─ constants.ts - App constants
│  └─ utils.ts - Helper functions
│
├─ Store (State Management - Zustand)
│  ├─ User store
│  ├─ Cart store
│  ├─ Order store
│  └─ UI state store
│
├─ Public (Static Assets)
│  ├─ Images
│  ├─ Fonts
│  └─ Icons
│
└─ Styles
   ├─ Tailwind CSS
   ├─ Global styles
   └─ Component styles
```

**Key Features:**
- **Server-Side Rendering (SSR)**: Dynamic routes rendered server-side
- **Static Generation (SSG)**: Static pages pre-rendered at build time
- **Incremental Static Regeneration (ISR)**: Stale-while-revalidate pattern
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic per-route splitting
- **Type Safety**: Full TypeScript support

### 2. Backend Component Architecture

```
FastAPI Application (Port 8001)
│
├─ app/
│  │
│  ├─ config.py
│  │  ├─ Database settings
│  │  ├─ JWT configuration
│  │  ├─ CORS settings
│  │  └─ API settings
│  │
│  ├─ database.py
│  │  ├─ SQLAlchemy engine
│  │  ├─ Session management
│  │  └─ Connection pooling
│  │
│  ├─ models.py
│  │  ├─ User model
│  │  ├─ Restaurant model
│  │  ├─ Menu item model
│  │  ├─ Order model
│  │  ├─ Cart model
│  │  └─ Gamification models
│  │
│  ├─ schemas.py
│  │  ├─ Pydantic request/response models
│  │  ├─ Data validation
│  │  └─ API contract definitions
│  │
│  ├─ routers/
│  │  ├─ auth.py - Authentication (JWT, OAuth)
│  │  ├─ users.py - User management
│  │  ├─ restaurants.py - Restaurant operations
│  │  ├─ menu.py - Menu items
│  │  ├─ cart.py - Shopping cart
│  │  ├─ orders.py - Order processing
│  │  ├─ ai.py - AI features (Groq)
│  │  └─ gamification.py - Points & achievements
│  │
│  └─ middleware/
│     ├─ CORS middleware
│     ├─ Authentication middleware
│     └─ Error handling middleware
│
├─ main.py
│  ├─ FastAPI app initialization
│  ├─ Router registration
│  ├─ Middleware setup
│  ├─ Health check endpoints
│  └─ CORS configuration
│
└─ requirements.txt
   ├─ FastAPI & Uvicorn
   ├─ SQLAlchemy & Psycopg2
   ├─ Pydantic & email-validator
   ├─ JWT libraries
   ├─ Groq AI SDK
   └─ Other dependencies
```

**Key Features:**
- **Async/Await**: Full async support with Uvicorn
- **Request Validation**: Pydantic models
- **Response Serialization**: Automatic JSON conversion
- **OpenAPI/Swagger**: Auto-generated API docs
- **Error Handling**: Comprehensive exception handling
- **Middleware**: Cross-cutting concerns

### 3. Infrastructure Component Architecture

```
Docker Container
│
├─ Multi-Stage Build
│  ├─ Stage 1: Frontend Builder (Node 18)
│  │  ├─ Install dependencies
│  │  ├─ Build Next.js app
│  │  └─ Output: .next/, node_modules/, public/
│  │
│  └─ Stage 2: Runtime (Python 3.11)
│     ├─ Install system packages
│     ├─ Install Node.js
│     ├─ Install Nginx
│     ├─ Install Supervisor
│     ├─ Install Python dependencies
│     └─ Copy artifacts from Stage 1
│
├─ Supervisor (Process Manager)
│  ├─ Backend Service (Priority 999)
│  │  ├─ Command: uvicorn main:app
│  │  ├─ Host: 127.0.0.1:8001
│  │  ├─ Auto-restart: Yes
│  │  └─ Logs: /var/log/backend.err.log
│  │
│  ├─ Frontend Service (Priority 998)
│  │  ├─ Command: npm start
│  │  ├─ Host: 127.0.0.1:3000
│  │  ├─ Env: PORT=3000
│  │  ├─ Auto-restart: Yes
│  │  └─ Logs: /var/log/frontend.err.log
│  │
│  └─ Nginx Service (Priority 997)
│     ├─ Command: nginx -g "daemon off;"
│     ├─ Host: 0.0.0.0:8000
│     ├─ Auto-restart: Yes
│     └─ Logs: /var/log/nginx/error.log
│
├─ User & Permissions
│  ├─ Non-root user: appuser (UID 1000)
│  ├─ Directory ownership
│  ├─ File permissions
│  └─ Security isolation
│
└─ Health Check
   ├─ Command: curl -f http://localhost:8000/api/health
   ├─ Interval: 30s
   ├─ Timeout: 10s
   └─ Retries: 3
```

---

## Data Flow

### 1. User Request Flow

```
User Browser (https://domain.com)
            │
            ▼ (Port 8000)
        Nginx Reverse Proxy
            │
            ├─ If /api/* ──────────────────┐
            │                              │
            ├─ If / ──────────────────────┐│
            │                             ││
            ▼                             ││
        Frontend (Next.js)                ││
        Port 3000                         ││
        ├─ SSR Pages                      ││
        ├─ Static Files                   ││
        └─ API Client (Axios)             ││
                                          ││
                ┌─────────────────────────┘│
                │                          │
                ▼                          ▼
            Backend (FastAPI)
            Port 8001
            ├─ Request Validation (Pydantic)
            ├─ Authentication (JWT)
            ├─ Business Logic
            ├─ Database Query
            └─ Response Serialization
                │
                ▼ (SQL)
            PostgreSQL Database
                ├─ Query execution
                ├─ Transaction handling
                └─ Result set
                │
                ▼
            Redis Cache (Optional)
            ├─ Session storage
            ├─ Frequently accessed data
            └─ Rate limit counters
```

### 2. API Request/Response Cycle

```
Frontend
  │
  ├─ HTTP Request (Axios)
  │  ├─ Headers: Authorization, Content-Type
  │  ├─ Body: JSON payload
  │  └─ URL: /api/endpoint
  │
  ▼
Nginx (Reverse Proxy)
  │
  ├─ Route matching (/api/*)
  ├─ Add proxy headers
  │  ├─ X-Real-IP
  │  ├─ X-Forwarded-For
  │  ├─ X-Forwarded-Proto
  │  └─ Host
  │
  ▼
FastAPI Backend
  │
  ├─ Middleware Chain
  │  ├─ CORS validation
  │  ├─ Authentication
  │  └─ Request parsing
  │
  ├─ Route Handler
  │  ├─ Pydantic validation
  │  ├─ Authorization check
  │  ├─ Business logic
  │  └─ Database query
  │
  ├─ Response
  │  ├─ Pydantic serialization
  │  ├─ JSON encoding
  │  └─ HTTP status code
  │
  ▼
Nginx (Response forwarding)
  │
  ├─ Gzip compression (if applicable)
  ├─ Add headers
  └─ Send to client
  │
  ▼
Browser
  │
  ├─ Response received
  ├─ JSON parsed
  ├─ Zustand store updated
  └─ UI re-renders
```

### 3. Authentication Flow

```
User Login
    │
    ▼ POST /api/auth/login
    │ {username, password}
    │
    ▼
Backend (FastAPI)
    │
    ├─ Validate credentials
    ├─ Check password hash (bcrypt)
    ├─ Generate JWT token
    │  ├─ user_id
    │  ├─ exp (expiration)
    │  └─ iat (issued at)
    │
    ▼
Frontend (Zustand)
    │
    ├─ Store JWT in memory
    ├─ Store refresh token in httpOnly cookie
    ├─ Update user state
    │
    ▼
Subsequent Requests
    │
    ├─ Add Authorization header
    │  └─ Bearer <JWT_TOKEN>
    │
    ▼
Backend (FastAPI)
    │
    ├─ Extract JWT from header
    ├─ Verify signature
    ├─ Check expiration
    ├─ Return user claims
    │
    └─ Proceed with request or 401 Unauthorized
```

### 4. Order Processing Flow

```
User Places Order
    │
    ├─ Frontend validates cart
    ├─ Collects delivery address
    ├─ Submits payment info
    │
    ▼ POST /api/orders
    │ {items, address, payment}
    │
    ▼
Backend (FastAPI)
    │
    ├─ Validate order data (Pydantic)
    ├─ Verify JWT token
    ├─ Check item availability
    ├─ Validate address
    ├─ Process payment
    ├─ Create order record (PostgreSQL)
    ├─ Update inventory
    ├─ Add gamification points
    ├─ Cache order status (Redis)
    │
    ▼ Return order_id
    │
    ▼
Frontend (Zustand)
    │
    ├─ Clear cart
    ├─ Store order_id
    ├─ Redirect to order tracking
    │
    ▼
Order Tracking
    │
    ├─ Frontend polls /api/orders/{id}
    ├─ Backend queries order status
    ├─ Backend queries cache first
    │  └─ Falls back to DB if not cached
    │
    ▼
Real-time Status Updates
    │
    ├─ Estimated preparation time
    ├─ Delivery time
    ├─ Driver assignment
    ├─ In-transit status
    └─ Delivery confirmation
```

---

## Technology Stack Details

### Frontend Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Next.js | 13.4 | React meta-framework with SSR/SSG |
| **Runtime** | Node.js | 18 | JavaScript runtime |
| **Language** | TypeScript | 5.0 | Type-safe JavaScript |
| **Styling** | Tailwind CSS | 3.3 | Utility-first CSS framework |
| **State** | Zustand | 4.3.8 | Lightweight state management |
| **HTTP Client** | Axios | 1.4 | Promise-based HTTP client |
| **Animations** | Framer Motion | 10.16.4 | Animation library |
| **Icons** | Lucide React | 0.263 | Icon library |
| **Date Utils** | date-fns | 2.29.3 | Date manipulation |
| **Utilities** | clsx, tailwind-merge | Latest | CSS className utilities |

**Architecture Pattern:**
- Pages: File-based routing (Next.js)
- Components: React functional components
- State: Zustand stores (user, cart, orders, ui)
- Styles: Tailwind CSS with TypeScript
- API: Axios with custom interceptors

### Backend Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | FastAPI | 0.104.1 | Async Python web framework |
| **Server** | Uvicorn | 0.24 | ASGI server |
| **Language** | Python | 3.11 | Core language |
| **ORM** | SQLAlchemy | 2.0 | Database ORM |
| **Validation** | Pydantic | 2.5 | Data validation |
| **Database Driver** | Psycopg2 | Latest | PostgreSQL adapter |
| **Authentication** | PyJWT | Latest | JWT token handling |
| **Password** | Bcrypt | Latest | Password hashing |
| **AI** | Groq SDK | Latest | LLM integration |
| **Email** | email-validator | 2.1.0 | Email validation |
| **CORS** | fastapi-cors | Built-in | CORS middleware |

**Architecture Pattern:**
- Routers: Modular endpoint organization
- Models: SQLAlchemy ORM models
- Schemas: Pydantic request/response models
- Database: Connection pooling with SQLAlchemy
- Async: Async/await throughout

### Infrastructure Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Container** | Docker | Latest | Containerization |
| **Build** | Multi-stage | - | Optimize image size |
| **Reverse Proxy** | Nginx | 1.26 | Load balancing & routing |
| **Process Manager** | Supervisor | 4.2 | Service orchestration |
| **Web Server** | Uvicorn | 0.24 | ASGI server |
| **Hosting** | Hostinger EasyPanel | - | Managed hosting |
| **OS** | Linux (Alpine/Debian) | - | Container OS |

**Architecture Pattern:**
- Containerized multi-service deployment
- Single container with 3 services (supervisor)
- Reverse proxy routing
- Process management and auto-restart

### Database Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Primary DB** | PostgreSQL | 15 | Relational data |
| **Cache** | Redis | 7 | Session & cache |
| **Driver** | Psycopg2 | Latest | PostgreSQL connector |
| **Connection Pool** | SQLAlchemy Pool | Built-in | Connection management |

**Schema Design:**
- Normalized tables (users, restaurants, menu_items, orders, etc.)
- Foreign key relationships
- Indexes on frequently queried columns
- JSON columns for flexible data

---

## Deployment Architecture

### Docker Multi-Stage Build

```dockerfile
Stage 1: Frontend Builder (node:18-alpine)
├─ WORKDIR /app/frontend
├─ COPY frontend/package*.json ./
├─ RUN npm install --legacy-peer-deps
├─ COPY frontend/ .
├─ ENV NEXT_PUBLIC_API_URL=/api
└─ RUN npm run build
   └─ Output: /app/frontend/.next, /app/frontend/node_modules/

Stage 2: Runtime (python:3.11-slim)
├─ Install system packages (curl, nginx, supervisor, nodejs)
├─ COPY backend/requirements.txt
├─ RUN pip install -r requirements.txt
├─ COPY backend/ .
├─ COPY --from=frontend-builder (all frontend artifacts)
├─ COPY nginx.conf /etc/nginx/nginx.conf
├─ Create supervisor configuration
├─ Create directories with proper permissions
├─ Create appuser (non-root)
├─ EXPOSE 8000
└─ CMD supervisord (starts all services)
```

**Benefits:**
- Final image size: ~1.2GB (optimized)
- Layer caching: Faster rebuilds
- Security: Multi-stage isolation
- Production ready: Includes all dependencies

### Deployment Flow on EasyPanel

```
GitHub Repository
    │
    ├─ Push to master branch
    │
    ▼ (Webhook trigger)
    │
EasyPanel CI/CD Pipeline
    │
    ├─ Clone repository
    ├─ Read Dockerfile
    ├─ Build Docker image
    │  ├─ Stage 1: Build frontend
    │  ├─ Stage 2: Create runtime image
    │  └─ Run health check
    │
    ├─ Push image to registry
    ├─ Stop old container
    ├─ Start new container
    │  ├─ Mount volumes
    │  ├─ Set environment variables
    │  ├─ Expose port 8000
    │  ├─ Configure health check
    │  └─ Start supervisord
    │
    ▼
Running Container
    │
    ├─ Supervisor starts services
    │  ├─ Backend (Uvicorn on 8001)
    │  ├─ Frontend (Next.js on 3000)
    │  └─ Nginx (Proxy on 8000)
    │
    ▼
Service Ready
    │
    ├─ Health check passes
    ├─ Container fully operational
    └─ Traffic routed to public URL
```

---

## Security Architecture

### 1. Network Security

```
Internet
    │ HTTPS/SSL
    ▼ (TLS Termination at EasyPanel)
    │
Nginx (Port 8000)
    │ HTTP (Internal)
    ├─ Backend (127.0.0.1:8001)
    └─ Frontend (127.0.0.1:3000)
    
Security:
├─ No external backend exposure
├─ All internal communication over localhost
├─ SSL/TLS at edge (EasyPanel)
└─ Nginx set proper headers
```

### 2. Authentication Architecture

```
User Login Request
    │
    ▼ Validate credentials
    │
Backend (Bcrypt verification)
    │
    ├─ Hash password with salt
    ├─ Compare with stored hash
    ├─ If match → Generate JWT
    │  ├─ Subject: user_id
    │  ├─ Exp: now + 30 minutes
    │  ├─ Secret: Strong key (32+ chars)
    │  └─ Algorithm: HS256
    │
    ▼ Return JWT to frontend
    │
Frontend (Zustand store)
    │
    ├─ Store JWT in memory
    ├─ Store refresh token in httpOnly cookie
    ├─ Add JWT to all requests
    │  └─ Header: Authorization: Bearer <JWT>
    │
    ▼ Subsequent requests
    │
Backend (Verify JWT)
    │
    ├─ Extract from header
    ├─ Verify signature
    ├─ Check expiration
    ├─ Extract user_id from claims
    └─ Proceed or return 401
```

### 3. Access Control

```
Request Comes In
    │
    ▼ Route Handler
    │
├─ Public Route (no auth required)
│  └─ /api/restaurants, /api/menu
│
├─ Protected Route (JWT required)
│  ├─ /api/orders
│  ├─ /api/profile
│  └─ /api/cart
│
└─ Admin Route (role check required)
   ├─ /api/restaurants (POST, PUT)
   ├─ /api/admin/users
   └─ /api/admin/analytics
```

### 4. Data Protection

```
Sensitive Data
├─ Passwords
│  └─ Hashed with Bcrypt (not stored plain)
│
├─ Tokens
│  ├─ Signed with secret key
│  ├─ Include expiration
│  └─ Invalidated on logout
│
├─ API Keys (Groq, Google)
│  └─ Stored in environment variables (not in code)
│
└─ Session Data
   ├─ Stored in Redis (encrypted)
   ├─ httpOnly cookies (not accessible to JS)
   └─ Secure flag (HTTPS only)
```

---

## Scalability Architecture

### 1. Horizontal Scaling (Multiple Containers)

```
Load Balancer
    │
    ├─ Container 1 (Port 8000)
    │  ├─ Backend
    │  ├─ Frontend
    │  └─ Nginx
    │
    ├─ Container 2 (Port 8001)
    │  ├─ Backend
    │  ├─ Frontend
    │  └─ Nginx
    │
    └─ Container 3 (Port 8002)
       ├─ Backend
       ├─ Frontend
       └─ Nginx

Shared Resources
├─ PostgreSQL Database (external)
└─ Redis Cache (external)
```

### 2. Vertical Scaling (Resource Increase)

```
Container Resource Allocation
├─ CPU: Can be increased (default: 1 core)
├─ Memory: Can be increased (default: 512MB)
├─ Disk: Persistent volume for database
└─ Network: Bandwidth throttling (if needed)
```

### 3. Database Scaling

```
PostgreSQL Optimization
├─ Connection Pooling (SQLAlchemy)
├─ Query Indexing
├─ Read Replicas (optional)
└─ Sharding (for very large datasets)

Redis Optimization
├─ Session caching
├─ Database query caching
├─ Rate limit counters
└─ Cluster mode (for high throughput)
```

### 4. Frontend Optimization

```
Next.js Performance
├─ Static Generation (ISG)
├─ Code Splitting
├─ Image Optimization
├─ CSS Minification
├─ JavaScript Minification
└─ CDN Distribution (optional)
```

---

## Database Architecture

### Entity Relationship Diagram

```
┌─────────────┐          ┌─────────────────┐
│   Users     │──────┬───│   Restaurants   │
└─────────────┘      │   └─────────────────┘
      │              │          │
      │              │          ├──────┐
      │              │          │      │
      │              │          ▼      ▼
      │              │    ┌──────────┐ ┌──────────┐
      │              │    │ MenuItems│ │ Reviews  │
      │              │    └──────────┘ └──────────┘
      │              │          │
      │              │          │
      ▼              ▼          ▼
┌─────────────┐  ┌────────┐  ┌──────────┐
│   Orders    │  │ Carts  │  │OrderItems│
└─────────────┘  └────────┘  └──────────┘
      │              │
      ├──────┬───────┘
      │      │
      ▼      ▼
┌──────────────┐
│   Payments   │
└──────────────┘
```

### Core Tables

```sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    full_name VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Restaurants Table
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    owner_id INTEGER REFERENCES users(id),
    address TEXT,
    phone VARCHAR(20),
    opening_time TIME,
    closing_time TIME,
    rating DECIMAL(2,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu Items Table
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(id),
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    category VARCHAR(50),
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    restaurant_id INTEGER REFERENCES restaurants(id),
    total_amount DECIMAL(10,2),
    status VARCHAR(20),
    delivery_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    menu_item_id INTEGER REFERENCES menu_items(id),
    quantity INTEGER,
    price DECIMAL(10,2)
);
```

---

## API Architecture

### API Endpoints Structure

```
API Root: /api (via Nginx proxy)

├─ Authentication
│  ├─ POST   /auth/register       - Register new user
│  ├─ POST   /auth/login          - User login
│  ├─ POST   /auth/logout         - User logout
│  ├─ POST   /auth/refresh        - Refresh JWT
│  └─ GET    /auth/google         - Google OAuth
│
├─ Users
│  ├─ GET    /users/me            - Current user profile
│  ├─ PUT    /users/me            - Update profile
│  ├─ GET    /users/{id}          - Get user by ID
│  └─ DELETE /users/{id}          - Delete account
│
├─ Restaurants
│  ├─ GET    /restaurants         - List restaurants
│  ├─ GET    /restaurants/{id}    - Get details
│  ├─ POST   /restaurants         - Create (owner only)
│  ├─ PUT    /restaurants/{id}    - Update (owner only)
│  └─ DELETE /restaurants/{id}    - Delete (owner only)
│
├─ Menu
│  ├─ GET    /menu                - List menu items
│  ├─ GET    /menu/{id}           - Get item details
│  ├─ POST   /menu                - Create (owner only)
│  ├─ PUT    /menu/{id}           - Update (owner only)
│  └─ DELETE /menu/{id}           - Delete (owner only)
│
├─ Cart
│  ├─ GET    /cart                - Get user cart
│  ├─ POST   /cart                - Add item to cart
│  ├─ PUT    /cart/{item_id}      - Update quantity
│  └─ DELETE /cart/{item_id}      - Remove from cart
│
├─ Orders
│  ├─ GET    /orders              - List user orders
│  ├─ GET    /orders/{id}         - Get order details
│  ├─ POST   /orders              - Create order
│  ├─ PUT    /orders/{id}         - Update order status (admin)
│  └─ GET    /orders/{id}/track   - Track order
│
├─ AI Features
│  ├─ POST   /ai/recommendations  - Get AI recommendations
│  ├─ POST   /ai/chat             - Chat with AI
│  └─ GET    /ai/suggestions      - Get suggestions
│
├─ Gamification
│  ├─ GET    /gamification/points - Get user points
│  ├─ GET    /gamification/badges - Get badges
│  ├─ GET    /gamification/leaderboard - Leaderboard
│  └─ POST   /gamification/redeem - Redeem rewards
│
└─ Health
   └─ GET    /health              - Health check
```

### Request/Response Format

```json
// Request
{
  "method": "POST",
  "url": "/api/orders",
  "headers": {
    "Authorization": "Bearer <JWT_TOKEN>",
    "Content-Type": "application/json"
  },
  "body": {
    "items": [
      {"menu_item_id": 1, "quantity": 2}
    ],
    "delivery_address": "123 Main St"
  }
}

// Response (Success)
{
  "status": 201,
  "data": {
    "order_id": 42,
    "total_amount": 25.99,
    "estimated_delivery": "45 minutes",
    "status": "confirmed"
  }
}

// Response (Error)
{
  "status": 400,
  "error": "Invalid order data",
  "details": [
    {
      "field": "items",
      "message": "At least one item required"
    }
  ]
}
```

---

## Frontend Architecture

### Page Structure

```
Pages (SSR/SSG)
├─ pages/
│  ├─ index.tsx              - Home page
│  ├─ home.tsx               - Restaurant listing
│  ├─ restaurants/
│  │  ├─ [id].tsx            - Restaurant details
│  │  └─ [id]/
│  │     └─ menu.tsx         - Restaurant menu
│  ├─ cart.tsx               - Shopping cart
│  ├─ checkout.tsx           - Order checkout
│  ├─ orders/
│  │  ├─ index.tsx           - Order history
│  │  └─ [id].tsx            - Order tracking
│  ├─ profile/
│  │  ├─ index.tsx           - User profile
│  │  └─ settings.tsx        - Settings
│  ├─ auth/
│  │  ├─ login.tsx           - Login page
│  │  └─ register.tsx        - Registration
│  ├─ _app.tsx               - Global wrapper
│  ├─ _document.tsx          - HTML wrapper
│  └─ _error.tsx             - Error page
```

### State Management (Zustand)

```
Zustand Stores
├─ useUserStore
│  ├─ user (User | null)
│  ├─ token (string)
│  ├─ setUser
│  ├─ logout
│  └─ updateProfile
│
├─ useCartStore
│  ├─ items (CartItem[])
│  ├─ total (number)
│  ├─ addItem
│  ├─ removeItem
│  ├─ updateQuantity
│  └─ clear
│
├─ useOrderStore
│  ├─ orders (Order[])
│  ├─ currentOrder (Order | null)
│  ├─ addOrder
│  ├─ updateStatus
│  └─ getOrder
│
└─ useUIStore
   ├─ isLoading (boolean)
   ├─ notification (Notification | null)
   ├─ setLoading
   └─ showNotification
```

---

## Infrastructure Architecture

### Container Architecture

```
Container Layers
├─ Layer 1: OS (Python 3.11-slim base image)
│
├─ Layer 2: System Packages
│  ├─ curl, nginx, supervisor
│  ├─ postgresql-client
│  └─ build-essential
│
├─ Layer 3: Node.js
│  └─ Installed from NodeSource repository
│
├─ Layer 4: Python Dependencies
│  ├─ FastAPI, Uvicorn
│  ├─ SQLAlchemy, Psycopg2
│  └─ Other Python packages
│
├─ Layer 5: Application Code
│  ├─ Backend source code
│  ├─ Frontend artifacts (.next/)
│  ├─ Nginx configuration
│  └─ Supervisor configuration
│
└─ Layer 6: User & Permissions
   ├─ Non-root user: appuser
   ├─ Directory ownership
   └─ File permissions
```

### Volume & Persistence

```
EasyPanel Volumes
├─ Application Code
│  ├─ Read-only (deployed from Docker image)
│  └─ Updates via container redeploy
│
├─ Database Volume (External)
│  ├─ PostgreSQL data persisted
│  ├─ Backup enabled
│  └─ Multi-region redundancy
│
├─ Redis Volume (External)
│  ├─ Session data persisted
│  └─ AOF (Append-Only File) enabled
│
└─ Logs Volume (Internal)
   ├─ /var/log/supervisord.log
   ├─ /var/log/backend.err.log
   ├─ /var/log/frontend.err.log
   └─ /var/log/nginx/error.log
```

### Port Mapping

```
Container Ports
├─ 8000 → Nginx (Public, exposed)
├─ 3000 → Next.js (Private, localhost only)
├─ 8001 → FastAPI (Private, localhost only)
└─ Various → Log files, temp directories

EasyPanel Mapping
├─ External: https://domain.com → Container 8000
├─ Health Check: Container 8000/api/health
└─ Restart Policy: Always
```

---

## Summary

**DreamFood Architecture provides:**

✅ **Separation of Concerns**: Frontend, backend, proxy layers separated  
✅ **Security**: Non-root execution, JWT authentication, CORS configured  
✅ **Scalability**: Horizontal & vertical scaling ready  
✅ **Reliability**: Auto-restart, health checks, proper logging  
✅ **Performance**: Optimized builds, caching, compression  
✅ **Maintainability**: Clean code organization, documented APIs  
✅ **Deployment**: Single-container deployment, environment-based config  

The architecture follows industry best practices for modern full-stack applications and is production-ready for Hostinger EasyPanel deployment.
