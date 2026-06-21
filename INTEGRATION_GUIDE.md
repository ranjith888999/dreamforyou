# DreamFood - Feature Integration Guide

## Overview

This guide explains how to integrate the newly implemented dopamine & virality features into your DreamFood application.

---

## Features Implemented

### ✅ Phase 1: Infrastructure
- [x] **PWA (Progressive Web App)** - Installable app with offline support
- [x] **i18n Localization** - Multi-language support (English, Hindi)
- [x] **WhatsApp-First Sharing** - Viral loop optimization
- [x] **Reward Store** - Zustand-based reward management

### ✅ Phase 2: UI Components
- [x] **RewardToast** - Confetti animations & dopamine triggers
- [x] **LanguageToggle** - Language switcher component
- [x] **Leaderboard** - Competitive ranking display
- [x] **ShareOrderButton** - Social sharing with WhatsApp optimization

### ✅ Phase 3: Backend API & Integration
- [x] **Rewards Router** - Leaderboard, coins, streaks
- [x] **Leaderboard Page** - Full gamification showcase
- [x] **Database Schema Extensions** - Reward tracking fields

---

## 1. PWA Setup (Next.js)

### Already Done ✅
- ✅ Added `next-pwa` to `next.config.js`
- ✅ Configured service worker caching
- ✅ Created `public/manifest.json`

### Next Steps
Users will automatically get the PWA install prompt on supported browsers/devices.

**For Testing (Locally):**
```bash
npm run build
npm start
# Then check DevTools > Application > Manifest for PWA readiness
```

---

## 2. i18n Localization (Next.js)

### Already Done ✅
- ✅ Created 12 locale files (6 namespaces × 2 languages)
- ✅ Configured `next-i18next.config.js`
- ✅ Created `lib/i18nInit.ts`

### How to Use in Components

#### Import i18n hook
```typescript
import { useTranslation } from 'react-i18next';
import '@/lib/i18nInit';

export default function MyComponent() {
  const { t, i18n } = useTranslation('menu'); // Use 'menu' namespace
  
  return (
    <div>
      <h1>{t('all_items')}</h1> {/* "All Items" or "सभी आइटम" */}
      <p>Current Language: {i18n.language}</p>
    </div>
  );
}
```

#### Add LanguageToggle to Header
```typescript
import { LanguageToggle } from '@/components/LanguageToggle';

// In your header/layout
<LanguageToggle variant="compact" />
```

#### Add More Languages
1. Create new locale files in `frontend/public/locales/{locale_code}/`
2. Update `next-i18next.config.js` locales array
3. Update `LANGUAGES` array in `LanguageToggle.tsx`

Example: Adding Tamil
```json
// frontend/public/locales/ta/common.json
{
  "app_name": "கனவு உணவு",
  "home": "முகப்பு",
  ...
}
```

---

## 3. WhatsApp Sharing (Frontend)

### Already Done ✅
- ✅ Created `lib/whatsappShare.ts` with all share methods
- ✅ Created `ShareOrderButton` component
- ✅ Optimized for mobile & web WhatsApp

### How to Use

#### In Order/Cart Pages
```typescript
import { ShareOrderButton, ShareBanner } from '@/components/ShareOrderButton';

const orderData = {
  restaurantName: 'Biryani Palace',
  items: [
    { name: 'Hyderabadi Biryani', quantity: 2, price: 350 },
    { name: 'Raita', quantity: 1, price: 80 },
  ],
  total: 780,
  simulationId: 'sim_12345',
};

export default function OrderSummary() {
  return (
    <>
      <ShareBanner order={orderData} />
      <ShareOrderButton order={orderData} showLabel={true} />
    </>
  );
}
```

#### Customize Share Message
Edit `lib/whatsappShare.ts` → `generateWhatsAppShareMessage()` function:

```typescript
const message = `🍕 *My DreamFood Order* 🍕

*${order.restaurantName}*

📦 Items:
${itemsList}

💰 Total: ₹${order.total.toFixed(2)}

Join DreamFood! [Your CTA]`;
```

### WhatsApp Link Examples
- **Mobile**: `https://wa.me/?text=MESSAGE`
- **Web**: `https://web.whatsapp.com/send?text=MESSAGE`
- **Desktop**: Opens WhatsApp Desktop app

---

## 4. Micro-Rewards & Confetti (Frontend)

### Already Done ✅
- ✅ Created `RewardToast` component with confetti
- ✅ Created `store/rewardStore.ts` with Zustand

### How to Use

#### Show Reward Toast on Add-to-Cart
```typescript
import { RewardToast } from '@/components/RewardToast';
import { useRewardStore } from '@/store/rewardStore';

export default function MenuItem() {
  const [showReward, setShowReward] = useState(false);
  const { addCoins } = useRewardStore();

  const handleAddToCart = () => {
    addItem(item);
    addCoins(10, 'Added to cart');
    setShowReward(true);
  };

  return (
    <>
      <RewardToast
        show={showReward}
        type="coins"
        amount={10}
        message="Great choice!"
        onClose={() => setShowReward(false)}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </>
  );
}
```

#### Reward Types
```typescript
type: 'coins' | 'badge' | 'streak' | 'order'

// Examples:
<RewardToast type="coins" amount={100} message="Referral bonus!" />
<RewardToast type="badge" message="First Order" />
<RewardToast type="streak" amount={7} message="7 Day Streak" />
<RewardToast type="order" message="Order placed successfully!" />
```

#### Reward Store Methods
```typescript
const { addCoins, addBadge, updateStreak, addReferral } = useRewardStore();

// Add coins with reason
addCoins(50, 'Daily Reward');

// Add badge
addBadge('first-order');

// Update streak
updateStreak(); // Handles consecutive day logic

// Process referral
addReferral(); // +100 coins
```

---

## 5. Leaderboard (Frontend + Backend)

### Already Done ✅
- ✅ Created `Leaderboard` component
- ✅ Created `/leaderboard` page
- ✅ Created backend rewards API

### How to Use

#### Display Leaderboard in Any Page
```typescript
import { Leaderboard } from '@/components/Leaderboard';

export default function Dashboard() {
  return (
    <Leaderboard 
      title="🏆 Top Performers" 
      limit={5} 
      showAllLink={true}
    />
  );
}
```

#### Fetch Leaderboard from Backend
```typescript
// GET /api/rewards/leaderboard?limit=10&offset=0
const response = await fetch('/api/rewards/leaderboard?limit=10');
const leaderboard = await response.json();

/* Response format:
[
  {
    "rank": 1,
    "user_id": 42,
    "username": "food_lover_99",
    "full_name": "Raj Kumar",
    "coins": 5420,
    "orders": 23,
    "level": "platinum",
    "streak": 7
  },
  ...
]
*/
```

### Backend Endpoints

#### Get Leaderboard
```
GET /api/rewards/leaderboard?limit=10&offset=0
```

#### Get User's Rewards
```
GET /api/rewards/user/{user_id}

Response:
{
  "user_id": 42,
  "coins": 2350,
  "streak": 5,
  "total_orders": 18,
  "level": "gold",
  "badges": ["first-order", "7-day-streak"],
  "referral_code": "DREAM42",
  "referred_users": 3,
  "rank": 7
}
```

#### Claim Daily Reward
```
POST /api/rewards/claim-daily-reward/{user_id}

Response:
{
  "success": true,
  "message": "Daily reward claimed!",
  "coins_earned": 50,
  "total_coins": 2400
}
```

#### Update Streak
```
POST /api/rewards/update-streak/{user_id}

Response:
{
  "success": true,
  "streak": 5,
  "coins": 2350,
  "level": "gold"
}
```

#### Process Referral
```
POST /api/rewards/process-referral/{referrer_id}/{referred_user_id}

Response:
{
  "success": true,
  "message": "Referral processed!",
  "referrer_coins": 2450,
  "referrer_total": 4
}
```

#### Add Coins (Admin/System)
```
POST /api/rewards/add-coins/{user_id}

Body:
{
  "amount": 100,
  "reason": "social-share"
}
```

#### Get Top Referrers
```
GET /api/rewards/top-referrers?limit=10

Response:
[
  {
    "user_id": 42,
    "username": "social_butterfly",
    "full_name": "Priya Singh",
    "referrals": 15,
    "orders": 45
  },
  ...
]
```

---

## 6. Database Schema Extensions (Backend)

### Required User Model Fields

Add these fields to your `User` model in `app/models.py`:

```python
from sqlalchemy import Column, Integer, String, DateTime, JSON
from datetime import datetime

class User(Base):
    # ... existing fields ...
    
    # Rewards & Gamification
    coins = Column(Integer, default=0)
    streak = Column(Integer, default=0)
    level = Column(String(20), default='bronze')  # bronze/silver/gold/platinum
    badges = Column(JSON, default=[])  # ["first-order", "7-day-streak", ...]
    
    # Tracking
    last_order_date = Column(DateTime, nullable=True)
    last_daily_reward_claim = Column(DateTime, nullable=True)
    
    # Referral Program
    referral_code = Column(String(50), unique=True, nullable=True)
    total_referrals = Column(Integer, default=0)
    referred_by_user_id = Column(Integer, ForeignKey('users.id'), nullable=True)
```

### Migration (Add Fields to Existing Table)

If upgrading existing database, run:

```sql
ALTER TABLE users 
ADD COLUMN coins INTEGER DEFAULT 0,
ADD COLUMN streak INTEGER DEFAULT 0,
ADD COLUMN level VARCHAR(20) DEFAULT 'bronze',
ADD COLUMN badges JSON DEFAULT '[]',
ADD COLUMN last_order_date TIMESTAMP NULL,
ADD COLUMN last_daily_reward_claim TIMESTAMP NULL,
ADD COLUMN referral_code VARCHAR(50) UNIQUE NULL,
ADD COLUMN total_referrals INTEGER DEFAULT 0,
ADD COLUMN referred_by_user_id INTEGER NULL;

CREATE INDEX idx_users_coins ON users(coins DESC);
CREATE INDEX idx_users_referral_code ON users(referral_code);
```

---

## 7. Integration Workflow Examples

### Example 1: Complete Order Flow with Rewards

```typescript
// components/OrderCompletionFlow.tsx
import { RewardToast, MicroActionToast } from '@/components/RewardToast';
import { ShareOrderButton } from '@/components/ShareOrderButton';
import { useRewardStore } from '@/store/rewardStore';

export default function OrderCompletion({ order }) {
  const { addCoins, updateStreak, addBadge } = useRewardStore();
  const [reward, setReward] = useState(null);

  useEffect(() => {
    // 1. Update streak
    updateStreak();
    
    // 2. Award coins for order
    addCoins(50, 'Order completed');
    setReward({ type: 'coins', amount: 50 });
    
    // 3. Check for first order badge
    if (order.isFirstOrder) {
      addBadge('first-order');
      setReward({ type: 'badge', message: 'First Order!' });
    }
  }, [order]);

  return (
    <>
      <RewardToast
        show={reward !== null}
        type={reward?.type}
        amount={reward?.amount}
        message={reward?.message}
        onClose={() => setReward(null)}
      />
      
      <div className="order-summary">
        <h2>Order Confirmed! 🎉</h2>
        <ShareOrderButton order={order} showLabel={true} />
      </div>
    </>
  );
}
```

### Example 2: Referral Tracking

```typescript
// pages/referral.tsx
import { useAuthStore } from '@/store/authStore';
import { useRewardStore } from '@/store/rewardStore';

export default function ReferralPage() {
  const { user } = useAuthStore();
  const { getReferralCode } = useRewardStore();

  const referralCode = getReferralCode();
  const referralLink = `https://dreamfood.app?ref=${referralCode}`;

  return (
    <div>
      <h1>Invite Friends & Earn Coins!</h1>
      <p>Your Code: {referralCode}</p>
      <button
        onClick={() => {
          navigator.clipboard.writeText(referralLink);
          alert('Copied!');
        }}
      >
        Copy Link
      </button>
      <ShareOrderButton
        order={{
          restaurantName: 'DreamFood',
          items: [],
          total: 0,
          simulationId: 'ref_' + referralCode,
        }}
      />
    </div>
  );
}
```

### Example 3: Header with Language + Coins

```typescript
// components/Header.tsx
import { LanguageToggle } from '@/components/LanguageToggle';
import { useRewardStore } from '@/store/rewardStore';

export default function Header() {
  const { getCoins } = useRewardStore();
  const coins = getCoins();

  return (
    <header>
      <div className="flex justify-between items-center">
        <h1>DreamFood</h1>
        
        <div className="flex items-center gap-4">
          {/* Coins Display */}
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-lg">
            <span>⭐</span>
            <span className="font-bold">{coins}</span>
          </div>
          
          {/* Language Toggle */}
          <LanguageToggle variant="compact" />
          
          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
```

---

## 8. Performance Optimization

### Image Caching (PWA)
Images are cached for 30 days via service worker. No action needed—automatic.

### i18n Best Practices
- Use namespaces to organize translations
- Load only needed namespaces per page
- Namespace: Fallback pattern prevents missing key errors

```typescript
const { t } = useTranslation(['common', 'menu']);
```

### Reward Store Optimization
Uses Zustand with localStorage persistence. Data syncs on page load automatically.

---

## 9. Testing Checklist

- [ ] Install PWA on mobile device
- [ ] Verify offline mode works (turn off internet → still navigable)
- [ ] Switch language to Hindi and back
- [ ] Add item to cart → See confetti + coins toast
- [ ] Share order to WhatsApp (check message format)
- [ ] Visit leaderboard page → See rankings
- [ ] Claim daily reward → Get 50 coins
- [ ] Check browser DevTools → i18n messages loaded correctly
- [ ] Test on low-bandwidth connection (DevTools → Network Throttling)

---

## 10. Deployment Checklist

- [ ] Update `backend/requirements.txt` (no changes needed)
- [ ] Update `frontend/package.json` dependencies → Already done ✅
- [ ] Database migration for new User fields
- [ ] Update User model in `app/models.py`
- [ ] Rebuild Docker image
- [ ] Test rewards API endpoints
- [ ] Verify PWA manifest on production
- [ ] Monitor analytics for language adoption

---

## 11. Future Enhancements

### Planned Features
- [ ] Daily spin wheel (higher dopamine trigger)
- [ ] Mystery boxes with random rewards
- [ ] Push notifications for streaks
- [ ] Leaderboard real-time updates via WebSocket
- [ ] Achievements/Badges UI showcase
- [ ] Regional language expansion (Tamil, Telugu, etc.)
- [ ] SMS integration for OTP + notifications
- [ ] Analytics dashboard for admin

---

## 12. Support & Troubleshooting

### PWA Not Installing?
- Check `manifest.json` is valid
- Must be HTTPS (except localhost)
- Try in Chrome → "Install App" button

### Translations Not Loading?
- Check locale files exist: `public/locales/{lang}/common.json`
- Verify `next-i18next.config.js` paths are correct
- Clear `.next/` cache and rebuild

### Rewards Not Showing?
- Check `rewardStore.ts` is initialized
- Verify user has rewards data from backend
- Check localStorage: `dream-reward-storage`

### API 404 Errors?
- Ensure `rewards.py` router is imported in `main.py`
- Check endpoint path matches route: `/api/rewards/...`
- Verify User model has required fields

---

## Questions?

Refer to component JSDoc comments and API docstrings for detailed usage.

Good luck launching DreamFood with maximum dopamine! 🚀✨
