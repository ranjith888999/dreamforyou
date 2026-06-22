/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         DreamFood — Complete Content SEO Strategy Library         ║
 * ║  All keyword clusters, FAQ schemas, page copy, internal links,    ║
 * ║  and blog strategy are defined here and consumed by layouts/pages  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Search intent types:
 *   I = Informational  |  N = Navigational
 *   C = Commercial Investigation  |  T = Transactional
 *
 * Difficulty scale: 1–100  (1 = very easy, 100 = extremely hard)
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface KeywordEntry {
  keyword: string
  /** Estimated monthly searches (India) */
  volume: string
  /** 1-100 */
  difficulty: number
  intent: 'I' | 'N' | 'C' | 'T'
  targetPage: string
  notes?: string
}

export interface FAQEntry {
  question: string
  answer: string
}

export interface BlogPost {
  title: string
  slug: string
  cluster: string
  primaryKeyword: string
  targetPage: string
  intent: 'I' | 'C'
  difficulty: number
  wordCount: number
  description: string
}

// ─── 1. PRIMARY KEYWORDS ─────────────────────────────────────────────────────
// High-volume, high-competition seed keywords. Capture brand awareness.

export const PRIMARY_KEYWORDS: KeywordEntry[] = [
  {
    keyword: 'food delivery app',
    volume: '110K+',
    difficulty: 75,
    intent: 'C',
    targetPage: '/',
    notes: 'Extremely competitive; target via brand differentiation angle',
  },
  {
    keyword: 'order food online',
    volume: '90K+',
    difficulty: 72,
    intent: 'T',
    targetPage: '/home',
    notes: 'Primary transactional keyword — use in H1 and hero copy',
  },
  {
    keyword: 'restaurant near me',
    volume: '1M+',
    difficulty: 88,
    intent: 'T',
    targetPage: '/home',
    notes: 'Too competitive alone; combine with cuisine modifiers',
  },
  {
    keyword: 'online food ordering',
    volume: '74K+',
    difficulty: 70,
    intent: 'T',
    targetPage: '/home',
    notes: 'Use in meta description and page intro copy',
  },
  {
    keyword: 'best food delivery app India',
    volume: '40K+',
    difficulty: 78,
    intent: 'C',
    targetPage: '/',
    notes: 'Commercial investigation — showcase features on landing page',
  },
  {
    keyword: 'food ordering platform',
    volume: '18K+',
    difficulty: 60,
    intent: 'C',
    targetPage: '/',
    notes: 'Good secondary target; achievable in 6–12 months',
  },
]

// ─── 2. SECONDARY KEYWORDS ───────────────────────────────────────────────────
// Medium-volume, medium-difficulty. Fast wins for a new domain.

export const SECONDARY_KEYWORDS: KeywordEntry[] = [
  {
    keyword: 'food delivery simulation',
    volume: '600',
    difficulty: 18,
    intent: 'I',
    targetPage: '/',
    notes: 'Near-zero competition — DreamFood can own this query',
  },
  {
    keyword: 'free food ordering app',
    volume: '2.4K',
    difficulty: 32,
    intent: 'C',
    targetPage: '/',
    notes: 'Strong differentiator — "free" + "ordering" combo',
  },
  {
    keyword: 'virtual food ordering',
    volume: '700',
    difficulty: 15,
    intent: 'I',
    targetPage: '/',
    notes: 'Emerging niche; DreamFood can become the category leader',
  },
  {
    keyword: 'restaurant discovery app',
    volume: '1.3K',
    difficulty: 28,
    intent: 'C',
    targetPage: '/',
    notes: 'Use in About / Feature sections',
  },
  {
    keyword: 'explore restaurants online',
    volume: '1.8K',
    difficulty: 25,
    intent: 'C',
    targetPage: '/home',
    notes: 'Great for the home page intro section',
  },
  {
    keyword: 'DreamFood app',
    volume: 'Brand',
    difficulty: 5,
    intent: 'N',
    targetPage: '/',
    notes: 'Brand keyword — ensure title tag and homepage own this',
  },
  {
    keyword: 'Swiggy alternative',
    volume: '3.2K',
    difficulty: 35,
    intent: 'C',
    targetPage: '/',
    notes: 'High-intent comparison keyword; address it explicitly',
  },
  {
    keyword: 'Zomato alternative',
    volume: '2.8K',
    difficulty: 33,
    intent: 'C',
    targetPage: '/',
    notes: 'Pair with Swiggy alternative in landing page copy',
  },
  {
    keyword: 'food ordering without payment',
    volume: '900',
    difficulty: 14,
    intent: 'I',
    targetPage: '/',
    notes: 'Core USP keyword — own it with a dedicated section',
  },
  {
    keyword: 'gamified food app',
    volume: '400',
    difficulty: 10,
    intent: 'I',
    targetPage: '/leaderboard',
    notes: 'Growing trend; first-mover advantage for DreamFood',
  },
]

// ─── 3. LONG-TAIL KEYWORDS ───────────────────────────────────────────────────
// Low competition, high conversion. Priority targets for content.

export const LONG_TAIL_KEYWORDS: KeywordEntry[] = [
  {
    keyword: 'best biryani delivery app in india',
    volume: '900',
    difficulty: 22,
    intent: 'C',
    targetPage: '/cuisine/biryani',
  },
  {
    keyword: 'order biryani online hyderabad',
    volume: '1.4K',
    difficulty: 30,
    intent: 'T',
    targetPage: '/cuisine/biryani',
  },
  {
    keyword: 'best pizza restaurants online order',
    volume: '2.1K',
    difficulty: 38,
    intent: 'T',
    targetPage: '/cuisine/pizza',
  },
  {
    keyword: 'order south indian food online',
    volume: '1.1K',
    difficulty: 28,
    intent: 'T',
    targetPage: '/cuisine/south-indian',
  },
  {
    keyword: 'best burger delivery app',
    volume: '1.8K',
    difficulty: 34,
    intent: 'C',
    targetPage: '/cuisine/burger',
  },
  {
    keyword: 'chinese food delivery near me',
    volume: '3.5K',
    difficulty: 45,
    intent: 'T',
    targetPage: '/cuisine/chinese',
  },
  {
    keyword: 'food delivery app like swiggy zomato free',
    volume: '700',
    difficulty: 18,
    intent: 'C',
    targetPage: '/',
    notes: 'Use in comparison FAQ answer',
  },
  {
    keyword: 'how to order food online without paying',
    volume: '1.3K',
    difficulty: 16,
    intent: 'I',
    targetPage: '/',
    notes: 'FAQ target — "DreamFood lets you experience ordering without payment"',
  },
  {
    keyword: 'online restaurant menu explorer',
    volume: '500',
    difficulty: 12,
    intent: 'I',
    targetPage: '/home',
  },
  {
    keyword: 'food delivery app earn rewards',
    volume: '1.1K',
    difficulty: 27,
    intent: 'C',
    targetPage: '/leaderboard',
  },
  {
    keyword: 'best north indian food delivery',
    volume: '2.2K',
    difficulty: 40,
    intent: 'T',
    targetPage: '/cuisine/north-indian',
  },
  {
    keyword: 'healthy food delivery app india',
    volume: '2.8K',
    difficulty: 42,
    intent: 'C',
    targetPage: '/cuisine/healthy-food',
  },
  {
    keyword: 'ice cream delivery near me',
    volume: '4.2K',
    difficulty: 48,
    intent: 'T',
    targetPage: '/cuisine/ice-cream',
  },
  {
    keyword: 'dessert delivery online india',
    volume: '1.6K',
    difficulty: 32,
    intent: 'T',
    targetPage: '/cuisine/desserts',
  },
  {
    keyword: 'snacks delivery near me',
    volume: '2.9K',
    difficulty: 38,
    intent: 'T',
    targetPage: '/cuisine/snacks',
  },
  {
    keyword: 'restaurant ratings and reviews app',
    volume: '1.4K',
    difficulty: 40,
    intent: 'C',
    targetPage: '/home',
  },
  {
    keyword: 'food app with leaderboard and coins',
    volume: '300',
    difficulty: 8,
    intent: 'I',
    targetPage: '/leaderboard',
    notes: 'Zero competition — pure category-creation keyword',
  },
]

// ─── 4. LOCAL SEO KEYWORDS ───────────────────────────────────────────────────
// Geo-modified keywords. Tier 1 cities + popular food hubs.

export const LOCAL_SEO_KEYWORDS: KeywordEntry[] = [
  // Hyderabad (home turf — highest priority)
  {
    keyword: 'best biryani restaurants in hyderabad',
    volume: '8.1K',
    difficulty: 45,
    intent: 'C',
    targetPage: '/cuisine/biryani',
  },
  {
    keyword: 'food delivery hyderabad',
    volume: '12K',
    difficulty: 52,
    intent: 'T',
    targetPage: '/home',
  },
  {
    keyword: 'biryani near kukatpally hyderabad',
    volume: '900',
    difficulty: 22,
    intent: 'T',
    targetPage: '/cuisine/biryani',
  },
  {
    keyword: 'restaurant near hitech city hyderabad',
    volume: '2.2K',
    difficulty: 35,
    intent: 'T',
    targetPage: '/home',
  },
  // Bangalore
  {
    keyword: 'best south indian food delivery bangalore',
    volume: '5.4K',
    difficulty: 50,
    intent: 'T',
    targetPage: '/cuisine/south-indian',
  },
  {
    keyword: 'pizza delivery bangalore',
    volume: '7.2K',
    difficulty: 55,
    intent: 'T',
    targetPage: '/cuisine/pizza',
  },
  // Mumbai
  {
    keyword: 'snacks delivery mumbai',
    volume: '3.8K',
    difficulty: 48,
    intent: 'T',
    targetPage: '/cuisine/snacks',
  },
  {
    keyword: 'chinese food delivery mumbai',
    volume: '4.1K',
    difficulty: 50,
    intent: 'T',
    targetPage: '/cuisine/chinese',
  },
  // Delhi NCR
  {
    keyword: 'north indian food delivery delhi',
    volume: '6.5K',
    difficulty: 54,
    intent: 'T',
    targetPage: '/cuisine/north-indian',
  },
  {
    keyword: 'best burger restaurant delhi',
    volume: '3.2K',
    difficulty: 44,
    intent: 'C',
    targetPage: '/cuisine/burger',
  },
  // Chennai
  {
    keyword: 'south indian food delivery chennai',
    volume: '4.8K',
    difficulty: 48,
    intent: 'T',
    targetPage: '/cuisine/south-indian',
  },
  // Pune
  {
    keyword: 'food delivery pune restaurants',
    volume: '5.6K',
    difficulty: 50,
    intent: 'T',
    targetPage: '/home',
  },
]

// ─── 5. RESTAURANT SEO KEYWORDS ──────────────────────────────────────────────
// Templates used in generateMetadata for individual restaurant pages.

export const RESTAURANT_KEYWORD_TEMPLATES = [
  '{name} menu',
  '{name} online order',
  '{name} delivery',
  '{name} contact',
  'order from {name}',
  '{name} ratings',
  '{name} reviews',
  '{cuisine} restaurant {name}',
  'best {cuisine} near me',
  '{cuisine} food delivery',
  '{cuisine} restaurant menu online',
  '{cuisine} home delivery',
]

/** Expand restaurant keyword templates for a specific restaurant */
export function expandRestaurantKeywords(
  name: string,
  cuisine: string
): string[] {
  return RESTAURANT_KEYWORD_TEMPLATES.map((t) =>
    t.replace(/{name}/g, name).replace(/{cuisine}/g, cuisine)
  )
}

// ─── 6. CUISINE SEO KEYWORDS ─────────────────────────────────────────────────
// Keyword clusters per cuisine. Consumed by /cuisine/[slug]/layout.tsx

export const CUISINE_KEYWORD_CLUSTERS: Record<string, KeywordEntry[]> = {
  biryani: [
    { keyword: 'biryani delivery', volume: '22K', difficulty: 60, intent: 'T', targetPage: '/cuisine/biryani' },
    { keyword: 'order biryani online', volume: '18K', difficulty: 58, intent: 'T', targetPage: '/cuisine/biryani' },
    { keyword: 'best biryani near me', volume: '35K', difficulty: 65, intent: 'T', targetPage: '/cuisine/biryani' },
    { keyword: 'hyderabadi biryani delivery', volume: '9K', difficulty: 48, intent: 'T', targetPage: '/cuisine/biryani' },
    { keyword: 'chicken biryani delivery', volume: '14K', difficulty: 55, intent: 'T', targetPage: '/cuisine/biryani' },
    { keyword: 'mutton biryani online order', volume: '7K', difficulty: 45, intent: 'T', targetPage: '/cuisine/biryani' },
    { keyword: 'biryani restaurant online', volume: '6K', difficulty: 42, intent: 'C', targetPage: '/cuisine/biryani' },
  ],
  pizza: [
    { keyword: 'pizza delivery near me', volume: '90K', difficulty: 78, intent: 'T', targetPage: '/cuisine/pizza' },
    { keyword: 'order pizza online', volume: '60K', difficulty: 75, intent: 'T', targetPage: '/cuisine/pizza' },
    { keyword: 'best pizza restaurant', volume: '25K', difficulty: 65, intent: 'C', targetPage: '/cuisine/pizza' },
    { keyword: 'pizza delivery app', volume: '12K', difficulty: 60, intent: 'C', targetPage: '/cuisine/pizza' },
    { keyword: 'margherita pizza delivery', volume: '8K', difficulty: 45, intent: 'T', targetPage: '/cuisine/pizza' },
    { keyword: 'veg pizza online', volume: '9K', difficulty: 48, intent: 'T', targetPage: '/cuisine/pizza' },
  ],
  burger: [
    { keyword: 'burger delivery near me', volume: '45K', difficulty: 72, intent: 'T', targetPage: '/cuisine/burger' },
    { keyword: 'best burger restaurant', volume: '20K', difficulty: 62, intent: 'C', targetPage: '/cuisine/burger' },
    { keyword: 'order burger online', volume: '15K', difficulty: 58, intent: 'T', targetPage: '/cuisine/burger' },
    { keyword: 'chicken burger delivery', volume: '12K', difficulty: 52, intent: 'T', targetPage: '/cuisine/burger' },
    { keyword: 'veg burger delivery', volume: '8K', difficulty: 45, intent: 'T', targetPage: '/cuisine/burger' },
  ],
  chinese: [
    { keyword: 'chinese food delivery', volume: '40K', difficulty: 68, intent: 'T', targetPage: '/cuisine/chinese' },
    { keyword: 'manchurian delivery', volume: '10K', difficulty: 42, intent: 'T', targetPage: '/cuisine/chinese' },
    { keyword: 'fried rice delivery', volume: '14K', difficulty: 50, intent: 'T', targetPage: '/cuisine/chinese' },
    { keyword: 'chinese restaurant online order', volume: '9K', difficulty: 48, intent: 'T', targetPage: '/cuisine/chinese' },
    { keyword: 'momos delivery near me', volume: '18K', difficulty: 55, intent: 'T', targetPage: '/cuisine/chinese' },
    { keyword: 'noodles delivery', volume: '11K', difficulty: 48, intent: 'T', targetPage: '/cuisine/chinese' },
  ],
  'south-indian': [
    { keyword: 'south indian food delivery', volume: '25K', difficulty: 60, intent: 'T', targetPage: '/cuisine/south-indian' },
    { keyword: 'dosa delivery near me', volume: '12K', difficulty: 48, intent: 'T', targetPage: '/cuisine/south-indian' },
    { keyword: 'idli delivery', volume: '8K', difficulty: 38, intent: 'T', targetPage: '/cuisine/south-indian' },
    { keyword: 'vada delivery online', volume: '5K', difficulty: 32, intent: 'T', targetPage: '/cuisine/south-indian' },
    { keyword: 'udupi restaurant online', volume: '6K', difficulty: 38, intent: 'C', targetPage: '/cuisine/south-indian' },
    { keyword: 'filter coffee near me', volume: '4.5K', difficulty: 35, intent: 'T', targetPage: '/cuisine/south-indian' },
  ],
  'north-indian': [
    { keyword: 'north indian food delivery', volume: '18K', difficulty: 55, intent: 'T', targetPage: '/cuisine/north-indian' },
    { keyword: 'butter chicken delivery', volume: '14K', difficulty: 52, intent: 'T', targetPage: '/cuisine/north-indian' },
    { keyword: 'dal makhani delivery', volume: '7K', difficulty: 38, intent: 'T', targetPage: '/cuisine/north-indian' },
    { keyword: 'paneer delivery online', volume: '9K', difficulty: 42, intent: 'T', targetPage: '/cuisine/north-indian' },
    { keyword: 'roti naan delivery near me', volume: '6K', difficulty: 38, intent: 'T', targetPage: '/cuisine/north-indian' },
    { keyword: 'mughlai food delivery', volume: '4K', difficulty: 32, intent: 'T', targetPage: '/cuisine/north-indian' },
  ],
  'ice-cream': [
    { keyword: 'ice cream delivery near me', volume: '28K', difficulty: 60, intent: 'T', targetPage: '/cuisine/ice-cream' },
    { keyword: 'ice cream delivery app', volume: '9K', difficulty: 48, intent: 'C', targetPage: '/cuisine/ice-cream' },
    { keyword: 'gelato delivery', volume: '5K', difficulty: 35, intent: 'T', targetPage: '/cuisine/ice-cream' },
    { keyword: 'sundae delivery online', volume: '2.5K', difficulty: 25, intent: 'T', targetPage: '/cuisine/ice-cream' },
  ],
  desserts: [
    { keyword: 'dessert delivery near me', volume: '15K', difficulty: 52, intent: 'T', targetPage: '/cuisine/desserts' },
    { keyword: 'cake delivery online', volume: '20K', difficulty: 58, intent: 'T', targetPage: '/cuisine/desserts' },
    { keyword: 'gulab jamun delivery', volume: '4K', difficulty: 28, intent: 'T', targetPage: '/cuisine/desserts' },
    { keyword: 'sweet shop delivery', volume: '6K', difficulty: 35, intent: 'T', targetPage: '/cuisine/desserts' },
    { keyword: 'mithai delivery online', volume: '5K', difficulty: 32, intent: 'T', targetPage: '/cuisine/desserts' },
  ],
  snacks: [
    { keyword: 'snacks delivery near me', volume: '12K', difficulty: 48, intent: 'T', targetPage: '/cuisine/snacks' },
    { keyword: 'samosa delivery', volume: '6K', difficulty: 32, intent: 'T', targetPage: '/cuisine/snacks' },
    { keyword: 'street food delivery online', volume: '8K', difficulty: 40, intent: 'T', targetPage: '/cuisine/snacks' },
    { keyword: 'pani puri delivery', volume: '4K', difficulty: 28, intent: 'T', targetPage: '/cuisine/snacks' },
    { keyword: 'bhel puri delivery', volume: '3K', difficulty: 24, intent: 'T', targetPage: '/cuisine/snacks' },
    { keyword: 'evening snacks delivery', volume: '5K', difficulty: 30, intent: 'T', targetPage: '/cuisine/snacks' },
  ],
  'healthy-food': [
    { keyword: 'healthy food delivery near me', volume: '20K', difficulty: 58, intent: 'T', targetPage: '/cuisine/healthy-food' },
    { keyword: 'salad delivery online', volume: '8K', difficulty: 42, intent: 'T', targetPage: '/cuisine/healthy-food' },
    { keyword: 'low calorie food delivery', volume: '5K', difficulty: 35, intent: 'T', targetPage: '/cuisine/healthy-food' },
    { keyword: 'diet food delivery app', volume: '4K', difficulty: 32, intent: 'C', targetPage: '/cuisine/healthy-food' },
    { keyword: 'grilled chicken delivery', volume: '7K', difficulty: 40, intent: 'T', targetPage: '/cuisine/healthy-food' },
    { keyword: 'keto food delivery', volume: '6K', difficulty: 38, intent: 'T', targetPage: '/cuisine/healthy-food' },
  ],
}

// ─── 7 & 8. FAQ QUESTIONS + SCHEMA CONTENT ───────────────────────────────────

/** Homepage FAQs — target "how does DreamFood work" informational queries */
export const HOMEPAGE_FAQS: FAQEntry[] = [
  {
    question: 'What is DreamFood?',
    answer:
      'DreamFood is a free food delivery simulation platform where you can browse real restaurant menus, add items to your cart, and experience the complete online food ordering journey — without spending a single rupee.',
  },
  {
    question: 'Is DreamFood completely free to use?',
    answer:
      'Yes! DreamFood is 100% free. There is no payment, no subscription, and no credit card required. It is a simulation experience designed to let you explore food delivery apps without any real transactions.',
  },
  {
    question: 'How does DreamFood work?',
    answer:
      'Sign in (or continue as a guest), browse restaurants and cuisines, add your favourite dishes to the cart, and simulate placing an order. You earn DreamCoins for every order, track live delivery simulations, and climb the leaderboard.',
  },
  {
    question: 'What cuisines are available on DreamFood?',
    answer:
      'DreamFood features 10 cuisine categories: Biryani, Pizza, Burger, Chinese, South Indian, North Indian, Ice Cream, Desserts, Snacks, and Healthy Food — with multiple restaurants in each category.',
  },
  {
    question: 'Is DreamFood similar to Swiggy or Zomato?',
    answer:
      'DreamFood is inspired by apps like Swiggy and Zomato but is a simulation, not a real delivery service. It replicates the discovery, browsing, and ordering experience without charging money or connecting to actual delivery partners.',
  },
  {
    question: 'How do I earn DreamCoins?',
    answer:
      'You earn DreamCoins by placing dream orders, maintaining daily login streaks, completing challenges, and reaching gamification milestones like "First Dream Order" or "100 Orders Completed".',
  },
  {
    question: 'Can I use DreamFood without an account?',
    answer:
      'Yes! You can continue as a Guest without signing up. Guest users can browse restaurants, explore menus, and use most features. Creating a free account unlocks coin tracking, streaks, and the leaderboard.',
  },
  {
    question: 'Does DreamFood support Google Sign-In?',
    answer:
      'Yes, DreamFood supports Google OAuth sign-in. Simply tap "Continue with Google" on the login screen for instant, passwordless access.',
  },
]

/** Restaurant page FAQs — dynamic per restaurant */
export function buildRestaurantFAQs(
  name: string,
  cuisine: string,
  rating: number,
  deliveryTime: number
): FAQEntry[] {
  return [
    {
      question: `How do I order from ${name} on DreamFood?`,
      answer: `Browse the ${name} menu on DreamFood, add your favourite dishes to your Dream Cart, and tap "Place Dream Order" to simulate your delivery experience — no payment needed.`,
    },
    {
      question: `What is the delivery time for ${name}?`,
      answer: `${name} has an estimated delivery time of ${deliveryTime} minutes on DreamFood.`,
    },
    {
      question: `What type of food does ${name} serve?`,
      answer: `${name} specialises in ${cuisine} cuisine. Browse their full menu on DreamFood to discover all available dishes, with vegetarian and non-vegetarian options.`,
    },
    {
      question: `What is the rating of ${name}?`,
      answer: `${name} has a rating of ${rating} out of 5 stars on DreamFood, based on community reviews.`,
    },
    {
      question: `Does ${name} have vegetarian options?`,
      answer: `Yes, ${name} offers vegetarian menu items clearly marked with a green 🌱 Veg badge, making it easy to filter your choices.`,
    },
  ]
}

/** Cuisine page FAQs — per cuisine type */
export const CUISINE_FAQS: Record<string, FAQEntry[]> = {
  biryani: [
    {
      question: 'What is the best Biryani restaurant on DreamFood?',
      answer:
        'DreamFood features multiple highly-rated Biryani restaurants. Browse the Biryani page, sort by rating, and explore Hyderabadi, Lucknowi, and Kolkata-style Biryanis from top outlets.',
    },
    {
      question: 'What types of Biryani are available?',
      answer:
        'DreamFood Biryani restaurants offer Hyderabadi Biryani, Lucknowi Biryani, Kolkata Biryani, Chicken Biryani, Mutton Biryani, Vegetable Biryani, Prawn Biryani, and Egg Biryani.',
    },
    {
      question: 'Is Biryani available for vegetarians?',
      answer:
        'Yes! Most Biryani restaurants on DreamFood offer Veg Biryani and Paneer Biryani options. Look for the 🌱 Veg badge on menu items.',
    },
    {
      question: 'How spicy is Biryani on DreamFood?',
      answer:
        'Each Biryani menu item on DreamFood shows a spice level indicator from 1 to 5, so you can easily pick mild, medium, or extra-spicy options.',
    },
  ],
  pizza: [
    {
      question: 'What pizza varieties are available on DreamFood?',
      answer:
        'DreamFood pizza restaurants offer Margherita, Pepperoni, BBQ Chicken, Veggie Supreme, Paneer Tikka, Four Cheese, and many more classic and signature pizzas.',
    },
    {
      question: 'Can I order veg pizza on DreamFood?',
      answer:
        'Absolutely! DreamFood clearly labels vegetarian pizzas with a 🌱 Veg badge. Popular veg options include Margherita, Veggie Supreme, and Paneer Tikka pizza.',
    },
    {
      question: 'Which is the best pizza restaurant on DreamFood?',
      answer:
        'Browse the Pizza page on DreamFood and filter by rating to find the top-rated pizza restaurants in your area.',
    },
  ],
  burger: [
    {
      question: 'What kinds of burgers are on DreamFood?',
      answer:
        'DreamFood burger restaurants offer Classic Beef Burger, Crispy Chicken Burger, Veggie Burger, BBQ Smash Burger, Double Patty Burger, and many more signature stacks.',
    },
    {
      question: 'Are there vegetarian burger options on DreamFood?',
      answer:
        'Yes! DreamFood offers multiple vegetarian burger options from top restaurants, including Aloo Tikki Burger, Paneer Burger, and black bean veggie patty burgers.',
    },
  ],
  chinese: [
    {
      question: 'What Chinese dishes can I order on DreamFood?',
      answer:
        'Browse Manchurian (dry & gravy), Fried Rice, Hakka Noodles, Momos, Spring Rolls, Chilli Paneer, Sweet & Sour dishes, and authentic Dim Sum on DreamFood\'s Chinese cuisine page.',
    },
    {
      question: 'Is Indo-Chinese food available on DreamFood?',
      answer:
        'Yes! DreamFood features popular Indo-Chinese dishes like Gobi Manchurian, Chicken 65, Schezwan Fried Rice, and Veg Hakka Noodles — perfect for Indian spice preferences.',
    },
  ],
  'south-indian': [
    {
      question: 'What South Indian dishes are available on DreamFood?',
      answer:
        'DreamFood South Indian restaurants serve Masala Dosa, Plain Dosa, Idli, Medu Vada, Uttapam, Sambar, Chettinad Chicken, Pesarattu, Pongal, and Filter Coffee.',
    },
    {
      question: 'Which is the best South Indian restaurant on DreamFood?',
      answer:
        'Browse the South Indian cuisine page on DreamFood to see all top-rated restaurants. Filter by delivery time and rating to find the best match.',
    },
    {
      question: 'Is South Indian food mostly vegetarian?',
      answer:
        'South Indian cuisine has excellent vegetarian options (Dosa, Idli, Vada), but DreamFood also features non-vegetarian South Indian dishes like Chettinad Chicken and Meen Curry.',
    },
  ],
  'north-indian': [
    {
      question: 'What North Indian dishes are on DreamFood?',
      answer:
        'DreamFood North Indian restaurants serve Butter Chicken, Dal Makhani, Palak Paneer, Rogan Josh, Biryani, Naan, Tandoori Roti, Rajma Chawal, and Lassi.',
    },
    {
      question: 'Is North Indian food spicy?',
      answer:
        'North Indian food can range from mild to very spicy. Each dish on DreamFood shows a spice level indicator (1–5) so you can choose based on your preference.',
    },
  ],
  'ice-cream': [
    {
      question: 'What ice cream flavours are on DreamFood?',
      answer:
        'DreamFood ice cream shops offer Vanilla, Chocolate, Strawberry, Mango, Butterscotch, Kulfi, Gelato, Sundaes, Milkshakes, and seasonal specials.',
    },
    {
      question: 'Can I order ice cream for delivery on DreamFood?',
      answer:
        'Yes! DreamFood lets you browse and "order" ice cream from top ice cream parlours and dessert shops, complete with a simulated delivery experience.',
    },
  ],
  desserts: [
    {
      question: 'What Indian desserts can I order on DreamFood?',
      answer:
        'DreamFood dessert shops feature Gulab Jamun, Rasgulla, Kheer, Halwa, Jalebi, Ladoo, Barfi, Peda, and festive sweets. Cakes, pastries, and cheesecakes are also available.',
    },
    {
      question: 'Can I order a birthday cake on DreamFood?',
      answer:
        'DreamFood\'s dessert page features bakeries and cake shops. Browse custom cakes, photo cakes, and classic bakery items from top-rated shops.',
    },
  ],
  snacks: [
    {
      question: 'What street food snacks are on DreamFood?',
      answer:
        'DreamFood snacks page features Samosa, Pani Puri, Bhel Puri, Aloo Chaat, Pav Bhaji, Dabeli, Vada Pav, Kachori, and a full selection of Indian street food favourites.',
    },
    {
      question: 'Are evening snacks available for delivery?',
      answer:
        'Yes! Browse DreamFood\'s Snacks page to find evening snack spots open for delivery. From chai & biscuits to full chaat platters — it\'s all there.',
    },
  ],
  'healthy-food': [
    {
      question: 'What healthy food options are available on DreamFood?',
      answer:
        'DreamFood\'s Healthy Food page features grilled protein bowls, salads, low-calorie wraps, fruit bowls, smoothies, quinoa dishes, keto meals, and diet-friendly options.',
    },
    {
      question: 'Can I track calories on DreamFood?',
      answer:
        'Yes! Every DreamFood menu item displays its calorie count, making it easy to make informed choices. Look for the calorie count below the dish description.',
    },
    {
      question: 'Does DreamFood have vegan food options?',
      answer:
        'DreamFood Healthy Food restaurants offer multiple plant-based and vegan options including salads, grain bowls, and fruit-based meals. Use the Veg filter to narrow results.',
    },
  ],
}

// ─── 9. HOMEPAGE SEO CONTENT ──────────────────────────────────────────────────

export const HOMEPAGE_CONTENT = {
  heroTitle: 'Order Your Dream Meal — Online Food Delivery, No Payment Needed',
  heroSubtitle:
    'Discover hundreds of restaurants, explore menus across 10 cuisines, and experience the joy of online food ordering — completely free on DreamFood.',
  heroDescription:
    'DreamFood is India\'s most engaging food delivery simulation. Browse Biryani, Pizza, Burger, Chinese, South Indian, and more from top restaurants. Add to cart, place dream orders, earn DreamCoins, and climb the leaderboard — without spending a rupee.',

  whyDreamFoodSection: {
    title: 'Why Choose DreamFood?',
    points: [
      {
        heading: '100% Free — No Payment Required',
        body: 'Experience the complete food ordering journey without a credit card, UPI, or wallet. DreamFood is a free simulation — always.',
      },
      {
        heading: 'Real Restaurant Menus & Ratings',
        body: 'Browse authentic menus with prices, calorie counts, spice levels, and star ratings — just like Swiggy and Zomato.',
      },
      {
        heading: 'Live Delivery Simulation',
        body: 'Watch your order move through 8 real-time stages: Restaurant Accepted → Chef Cooking → Food Packed → Delivered.',
      },
      {
        heading: 'Earn DreamCoins & Climb the Leaderboard',
        body: 'Every order earns you DreamCoins. Maintain streaks, unlock achievements, and compete with friends on the global leaderboard.',
      },
      {
        heading: 'Dark Mode & Beautiful UI',
        body: 'Switch between Swiggy-style (orange) and Zomato-style (red) themes. Fully responsive, dark mode supported.',
      },
      {
        heading: 'Google Sign-In Support',
        body: 'Log in instantly with Google OAuth — no passwords required. Or continue as a guest in one tap.',
      },
    ],
  },

  cuisineSection: {
    title: 'Explore 10 Cuisines on DreamFood',
    subtitle: 'From Hyderabadi Biryani to Gelato — browse every craving.',
  },

  ctaSection: {
    title: 'Start Your Dream Food Journey',
    body: 'Join thousands of food lovers who explore restaurants, simulate orders, and earn rewards on DreamFood — without spending a rupee.',
    buttonText: 'Browse Restaurants',
  },
}

// ─── 10. RESTAURANT PAGE SEO CONTENT ─────────────────────────────────────────

export const RESTAURANT_PAGE_CONTENT = {
  menuSectionTitle: 'Full Menu',
  menuSectionSubtitle: (name: string, cuisine: string) =>
    `Explore the complete ${cuisine} menu at ${name}. All dishes with prices, calorie counts, and spice levels.`,
  vegetarianFilterLabel: 'Show Veg Only',
  breadcrumbHome: 'Home',
  breadcrumbRestaurants: 'Restaurants',
  relatedTitle: (cuisine: string) => `More ${cuisine} Restaurants on DreamFood`,
  relatedSubtitle: (cuisine: string) =>
    `Craving more ${cuisine}? Browse all top-rated ${cuisine} restaurants on DreamFood.`,
}

// ─── 11. CUISINE PAGE SEO CONTENT ─────────────────────────────────────────────

export const CUISINE_PAGE_CONTENT: Record<
  string,
  {
    heroTitle: string
    intro: string
    popularDishes: string[]
    whyOrder: string
  }
> = {
  biryani: {
    heroTitle: 'Best Biryani Restaurants Online — Order Biryani Delivery',
    intro:
      'Biryani is more than food — it is an emotion. Browse DreamFood\'s top-rated Biryani restaurants and explore Hyderabadi Dum Biryani, Lucknowi Awadhi Biryani, Kolkata Biryani, and more. Simulation experience — no payment needed.',
    popularDishes: [
      'Hyderabadi Chicken Biryani',
      'Mutton Dum Biryani',
      'Vegetable Biryani',
      'Prawn Biryani',
      'Egg Biryani',
      'Paneer Biryani',
    ],
    whyOrder:
      'DreamFood Biryani restaurants are rated by the community, with detailed menus showing spice levels, calorie counts, and vegetarian options — helping you find the perfect Biryani experience.',
  },
  pizza: {
    heroTitle: 'Best Pizza Restaurants Online — Order Pizza Delivery',
    intro:
      'From thin-crust Margherita to loaded BBQ Chicken, DreamFood brings you the best pizza restaurants in one place. Browse menus, check ratings, and simulate your pizza order — free, no payment required.',
    popularDishes: [
      'Margherita Pizza',
      'BBQ Chicken Pizza',
      'Paneer Tikka Pizza',
      'Veggie Supreme',
      'Pepperoni Pizza',
      'Four Cheese Pizza',
    ],
    whyOrder:
      'DreamFood pizza restaurants showcase the full menu with toppings, crust types, and sizes. Find your perfect pizza from highly-rated restaurants.',
  },
  burger: {
    heroTitle: 'Best Burger Restaurants Online — Order Burger Delivery',
    intro:
      'Juicy, stacked, and saucy — DreamFood\'s burger restaurants serve the best burgers in town. Explore classic beef burgers, crispy chicken, and veggie options. Browse, add to cart, and simulate your order.',
    popularDishes: [
      'Classic Beef Burger',
      'Crispy Chicken Burger',
      'Double Smash Burger',
      'Aloo Tikki Burger',
      'Paneer Burger',
      'BBQ Bacon Burger',
    ],
    whyOrder:
      'Every burger on DreamFood comes with nutritional information, spice levels, and community ratings. Find your dream burger from top-rated outlets.',
  },
  chinese: [
    // Note: array for different format — using object below
  ] as unknown as { heroTitle: string; intro: string; popularDishes: string[]; whyOrder: string },
}

// Fix the chinese entry properly
CUISINE_PAGE_CONTENT['chinese'] = {
  heroTitle: 'Best Chinese Food Delivery — Order Chinese Online',
  intro:
    'From sizzling Manchurian to steamed Momos, DreamFood\'s Chinese restaurants bring Indo-Chinese and authentic Chinese flavours to your screen. Browse menus, explore dishes, and simulate your order.',
  popularDishes: ['Chicken Manchurian', 'Veg Fried Rice', 'Hakka Noodles', 'Momos', 'Spring Rolls', 'Chilli Paneer'],
  whyOrder: 'DreamFood\'s Chinese restaurants offer both Indo-Chinese and authentic Chinese cuisine with detailed menus and real ratings.',
}
CUISINE_PAGE_CONTENT['south-indian'] = {
  heroTitle: 'Best South Indian Restaurants Online — Dosa, Idli & More',
  intro:
    'Crispy Dosas, fluffy Idlis, and steaming Sambar — DreamFood celebrates the rich flavours of South India. Browse top South Indian restaurants, explore full menus, and simulate your order for free.',
  popularDishes: ['Masala Dosa', 'Idli Sambar', 'Medu Vada', 'Uttapam', 'Chettinad Chicken', 'Filter Coffee'],
  whyOrder: 'South Indian food is among the healthiest cuisines. DreamFood\'s South Indian restaurants display calorie counts, helping you make mindful choices.',
}
CUISINE_PAGE_CONTENT['north-indian'] = {
  heroTitle: 'Best North Indian Food Delivery — Butter Chicken, Dal Makhani & More',
  intro:
    'Rich gravies, tandoori bread, and aromatic rice — DreamFood\'s North Indian restaurants serve the best of Punjabi, Mughlai, and Rajasthani cuisines. Browse menus and simulate your order.',
  popularDishes: ['Butter Chicken', 'Dal Makhani', 'Palak Paneer', 'Tandoori Roti', 'Rajma Chawal', 'Lassi'],
  whyOrder: 'North Indian food on DreamFood comes from highly-rated restaurants with detailed descriptions and spice-level indicators for every dish.',
}
CUISINE_PAGE_CONTENT['ice-cream'] = {
  heroTitle: 'Ice Cream Delivery Online — Browse Top Ice Cream Shops',
  intro:
    'Cool down with DreamFood\'s top-rated ice cream parlours and dessert shops. From Kulfi to Gelato, Milkshakes to Sundaes — explore the full menu and simulate your ice cream order.',
  popularDishes: ['Mango Kulfi', 'Belgian Chocolate', 'Strawberry Sundae', 'Butterscotch', 'Vanilla Gelato', 'Oreo Milkshake'],
  whyOrder: 'DreamFood ice cream shops include seasonal specials and limited-edition flavours. Browse new arrivals and fan-favourite scoops.',
}
CUISINE_PAGE_CONTENT['desserts'] = {
  heroTitle: 'Best Dessert Delivery Online — Sweets, Cakes & More',
  intro:
    'End every dream meal on a sweet note with DreamFood\'s dessert shops. From Gulab Jamun to custom birthday cakes, browse traditional Indian sweets and modern patisserie.',
  popularDishes: ['Gulab Jamun', 'Rasgulla', 'Chocolate Lava Cake', 'Gajar Halwa', 'Jalebi', 'Cheesecake'],
  whyOrder: 'DreamFood dessert restaurants are sourced from top bakeries and mithai shops, with fresh availability indicators and festive special menus.',
}
CUISINE_PAGE_CONTENT['snacks'] = {
  heroTitle: 'Street Food & Snacks Delivery Online — Samosa, Chaat & More',
  intro:
    'Craving street food? DreamFood\'s snacks page brings together the best chaat shops, snack counters, and street food stalls. Explore Pani Puri, Bhel, Samosa, and more.',
  popularDishes: ['Pani Puri', 'Bhel Puri', 'Samosa', 'Pav Bhaji', 'Aloo Chaat', 'Vada Pav'],
  whyOrder: 'DreamFood snack restaurants are perfect for evening cravings. Browse by delivery time and spice level to find your ideal street food fix.',
}
CUISINE_PAGE_CONTENT['healthy-food'] = {
  heroTitle: 'Healthy Food Delivery Online — Salads, Bowls & Diet Meals',
  intro:
    'Eat smart with DreamFood\'s Healthy Food category. Browse protein bowls, salads, low-carb meals, keto dishes, and vegan options from top health-focused restaurants.',
  popularDishes: ['Greek Salad', 'Quinoa Bowl', 'Grilled Chicken Wrap', 'Acai Bowl', 'Keto Meal Box', 'Fruit Bowl'],
  whyOrder: 'Every healthy dish on DreamFood shows calorie count and nutritional information. Make mindful food choices without compromising on taste.',
}

// ─── 12. INTERNAL LINKING STRATEGY ──────────────────────────────────────────

export const INTERNAL_LINKING_MAP: Record<
  string,
  Array<{ anchor: string; href: string; context: string }>
> = {
  '/home': [
    { anchor: 'Browse Biryani', href: '/cuisine/biryani', context: 'Cuisine filter bar and "Browse by Cuisine" section' },
    { anchor: 'Order Pizza Online', href: '/cuisine/pizza', context: 'Cuisine filter bar' },
    { anchor: 'Burger Delivery', href: '/cuisine/burger', context: 'Cuisine filter bar' },
    { anchor: 'South Indian Food', href: '/cuisine/south-indian', context: 'Cuisine filter bar' },
    { anchor: 'Chinese Food Near Me', href: '/cuisine/chinese', context: 'Cuisine filter bar' },
    { anchor: 'View Leaderboard', href: '/leaderboard', context: 'Header navigation' },
    { anchor: 'Sign In with Google', href: '/auth/login', context: 'Header CTA' },
  ],
  '/cuisine/[slug]': [
    { anchor: 'Back to All Restaurants', href: '/home', context: 'Breadcrumb and back button' },
    { anchor: 'See all {cuisine} restaurants', href: '/cuisine/[slug]', context: 'Related section on restaurant page' },
    { anchor: 'Explore Other Cuisines', href: '/cuisine/*', context: 'Bottom "Explore" section on every cuisine page' },
    { anchor: 'View Full Menu', href: '/restaurant/[id]', context: 'Every restaurant card links to restaurant page' },
  ],
  '/restaurant/[id]': [
    { anchor: '{cuisine} Restaurants', href: '/cuisine/[cuisineSlug]', context: 'Cuisine badge links to cuisine page' },
    { anchor: 'Browse all {cuisine} restaurants', href: '/cuisine/[cuisineSlug]', context: 'Bottom related section' },
    { anchor: 'Back to Restaurants', href: '/home', context: 'Breadcrumb' },
    { anchor: 'Add to Cart', href: '/cart', context: 'Every menu item CTA' },
  ],
  '/leaderboard': [
    { anchor: 'Start Ordering', href: '/home', context: 'CTA on leaderboard page' },
    { anchor: 'Sign In', href: '/auth/login', context: 'Login prompt for non-authenticated users' },
  ],
  '/cart': [
    { anchor: 'Continue Shopping', href: '/home', context: 'Empty cart state' },
    { anchor: 'Back to Restaurant', href: '/restaurant/[id]', context: 'Back button' },
    { anchor: 'Place Dream Order', href: '/order/confirmation', context: 'Checkout CTA' },
  ],
}

export const INTERNAL_LINKING_PRINCIPLES = [
  'Every cuisine page links back to /home and forward to individual restaurant pages.',
  'Every restaurant page links to its cuisine category page and to /cart.',
  'Homepage has an "Explore by Cuisine" section linking to all 10 cuisine pages.',
  'Leaderboard page links to /home to drive continued engagement.',
  'Auth pages link to /home upon successful login.',
  'Cart page links to /home (Continue Shopping) and back to the restaurant.',
  'All cuisine pages interlink to each other via the "Explore Other Cuisines" section.',
  'Breadcrumbs are present on restaurant and cuisine pages for crawlability and UX.',
]

// ─── 13. BLOG CONTENT STRATEGY ───────────────────────────────────────────────

export const BLOG_CLUSTERS: Record<
  string,
  { description: string; pillarPage: string; posts: BlogPost[] }
> = {
  'food-discovery': {
    description:
      'Informational content targeting food lovers who want to discover new restaurants, cuisines, and dishes.',
    pillarPage: '/home',
    posts: [
      {
        title: 'Top 10 Best Biryani Restaurants to Try in India (2025)',
        slug: 'best-biryani-restaurants-india',
        cluster: 'food-discovery',
        primaryKeyword: 'best biryani restaurants india',
        targetPage: '/cuisine/biryani',
        intent: 'C',
        difficulty: 35,
        wordCount: 2200,
        description: 'Roundup post ranking the best Biryani styles and restaurants. Internally link to /cuisine/biryani.',
      },
      {
        title: 'Hyderabadi vs Lucknowi Biryani: The Ultimate Comparison',
        slug: 'hyderabadi-vs-lucknowi-biryani',
        cluster: 'food-discovery',
        primaryKeyword: 'hyderabadi vs lucknowi biryani',
        targetPage: '/cuisine/biryani',
        intent: 'I',
        difficulty: 22,
        wordCount: 1800,
        description: 'Informational post driving Biryani cuisine traffic. Strong internal link opportunity.',
      },
      {
        title: '15 Must-Try South Indian Breakfast Dishes',
        slug: 'south-indian-breakfast-dishes',
        cluster: 'food-discovery',
        primaryKeyword: 'south indian breakfast dishes',
        targetPage: '/cuisine/south-indian',
        intent: 'I',
        difficulty: 28,
        wordCount: 1600,
        description: 'List post for South Indian food enthusiasts. Targets long-tail breakfast queries.',
      },
      {
        title: 'Best Veg Burgers in India: A Foodie\'s Guide',
        slug: 'best-veg-burgers-india',
        cluster: 'food-discovery',
        primaryKeyword: 'best veg burger india',
        targetPage: '/cuisine/burger',
        intent: 'C',
        difficulty: 30,
        wordCount: 1500,
        description: 'SEO-rich listicle targeting vegetarian burger queries with strong purchase intent.',
      },
      {
        title: 'Healthy Indian Food Delivery: 10 Low-Calorie Meals to Order',
        slug: 'healthy-indian-food-delivery',
        cluster: 'food-discovery',
        primaryKeyword: 'healthy indian food delivery',
        targetPage: '/cuisine/healthy-food',
        intent: 'C',
        difficulty: 35,
        wordCount: 1800,
        description: 'Targets the growing health-conscious food delivery audience. High commercial intent.',
      },
    ],
  },
  'app-guides': {
    description:
      'How-to and tutorial content explaining DreamFood features to new users.',
    pillarPage: '/',
    posts: [
      {
        title: 'How DreamFood Works: The Complete Beginner\'s Guide',
        slug: 'how-dreamfood-works',
        cluster: 'app-guides',
        primaryKeyword: 'how does dreamfood work',
        targetPage: '/',
        intent: 'I',
        difficulty: 5,
        wordCount: 1200,
        description: 'Core explainer post. Targets brand + informational queries. Should be the top-linked guide.',
      },
      {
        title: 'How to Earn DreamCoins Fast: Tips & Tricks',
        slug: 'earn-dreamcoins-fast',
        cluster: 'app-guides',
        primaryKeyword: 'earn dreamcoins dreamfood',
        targetPage: '/leaderboard',
        intent: 'I',
        difficulty: 4,
        wordCount: 1000,
        description: 'Gamification guide to drive engagement and leaderboard participation.',
      },
      {
        title: 'DreamFood vs Swiggy vs Zomato: What\'s the Difference?',
        slug: 'dreamfood-vs-swiggy-vs-zomato',
        cluster: 'app-guides',
        primaryKeyword: 'dreamfood vs swiggy zomato',
        targetPage: '/',
        intent: 'C',
        difficulty: 18,
        wordCount: 1400,
        description: 'Comparison post targeting users researching food delivery alternatives. High conversion potential.',
      },
      {
        title: 'Food Delivery Simulation Apps: Everything You Need to Know',
        slug: 'food-delivery-simulation-apps',
        cluster: 'app-guides',
        primaryKeyword: 'food delivery simulation app',
        targetPage: '/',
        intent: 'I',
        difficulty: 12,
        wordCount: 1600,
        description: 'Category-defining post. DreamFood becomes the authority on "food delivery simulation".',
      },
    ],
  },
  'food-culture': {
    description:
      'Cultural and lifestyle content to build topical authority and earn backlinks.',
    pillarPage: '/home',
    posts: [
      {
        title: 'The History of Biryani: From Persian Kitchens to Indian Tables',
        slug: 'history-of-biryani',
        cluster: 'food-culture',
        primaryKeyword: 'history of biryani',
        targetPage: '/cuisine/biryani',
        intent: 'I',
        difficulty: 30,
        wordCount: 2000,
        description: 'High-quality editorial content for backlink acquisition and topical authority.',
      },
      {
        title: '10 Indian Street Foods You Must Try at Least Once',
        slug: 'indian-street-foods-to-try',
        cluster: 'food-culture',
        primaryKeyword: 'best indian street food',
        targetPage: '/cuisine/snacks',
        intent: 'I',
        difficulty: 42,
        wordCount: 2200,
        description: 'Evergreen listicle with backlink potential. Internally links to Snacks cuisine page.',
      },
      {
        title: 'The Rise of Healthy Eating in India: Trends in 2025',
        slug: 'healthy-eating-trends-india-2025',
        cluster: 'food-culture',
        primaryKeyword: 'healthy eating trends india 2025',
        targetPage: '/cuisine/healthy-food',
        intent: 'I',
        difficulty: 25,
        wordCount: 1800,
        description: 'Trending content targeting health-conscious food discovery queries.',
      },
    ],
  },
  'gamification': {
    description:
      'Content targeting gamification and reward-based engagement keywords.',
    pillarPage: '/leaderboard',
    posts: [
      {
        title: 'Food Apps with Gamification: Why Rewards Drive Engagement',
        slug: 'food-apps-gamification-rewards',
        cluster: 'gamification',
        primaryKeyword: 'food app gamification',
        targetPage: '/leaderboard',
        intent: 'I',
        difficulty: 14,
        wordCount: 1400,
        description: 'Thought-leadership post building authority in the food-app gamification space.',
      },
      {
        title: 'DreamFood Leaderboard Guide: Levels, Coins & Achievements',
        slug: 'dreamfood-leaderboard-guide',
        cluster: 'gamification',
        primaryKeyword: 'dreamfood leaderboard coins',
        targetPage: '/leaderboard',
        intent: 'I',
        difficulty: 3,
        wordCount: 900,
        description: 'Brand-specific guide. Drives leaderboard engagement and reduces bounce rate.',
      },
    ],
  },
}

/** All blog posts flattened into a single array for sitemap generation */
export const ALL_BLOG_POSTS: BlogPost[] = Object.values(BLOG_CLUSTERS).flatMap(
  (c) => c.posts
)
