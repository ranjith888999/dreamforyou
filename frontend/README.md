# DreamFood Frontend

Modern Next.js frontend for DreamFood - A dopamine-based food delivery simulation platform.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
```

Navigate to `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
npm run start
```

## Project Structure

```
frontend/
├── app/                    # Next.js 13+ app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── ...
├── components/            # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── RestaurantCard.tsx
│   ├── MenuCard.tsx
│   └── ...
├── lib/                   # Utility functions
│   ├── api.ts            # API client
│   ├── constants.ts      # App constants
│   └── utils.ts          # Utility functions
├── store/                # Zustand stores
│   ├── authStore.ts      # Auth state
│   ├── cartStore.ts      # Cart state
│   └── ...
├── styles/               # Global styles
│   └── globals.css       # Global Tailwind styles
├── public/              # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Features Implemented

- [x] Project initialization
- [x] Tailwind CSS setup
- [x] TypeScript configuration
- [ ] Authentication pages
- [ ] Home page with restaurant listing
- [ ] Restaurant details page
- [ ] Menu items display
- [ ] Shopping cart
- [ ] Order placement
- [ ] Order tracking with animations
- [ ] User dashboard
- [ ] Gamification features
- [ ] AI recommendations
- [ ] Social sharing

## Technologies Used

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui, Radix UI
- **Animations:** Framer Motion
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Icons:** React Icons
- **Date Utilities:** date-fns

## Development

### Run with Hot Reload
```bash
npm run dev
```

### Format Code
```bash
npm run format
```

### Build
```bash
npm run build
```

### Production Start
```bash
npm run start
```

## Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `format` - Format code with Prettier

## Notes

- Dark mode is supported via Tailwind CSS
- Mobile-first responsive design
- All UI components follow shadcn/ui patterns
- API calls are centralized in `lib/api.ts`
- State management uses Zustand for simplicity
