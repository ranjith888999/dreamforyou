/**
 * SEO Configuration & Utilities for DreamFood
 * Central source of truth for all metadata, structured data, and SEO helpers.
 */

export const SITE_CONFIG = {
  name: 'DreamFood',
  tagline: 'Order Your Dream Meal',
  description:
    'DreamFood is a free food delivery simulation platform. Browse top restaurants, explore menus, and experience ordering food online — without spending a rupee.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dreamfood.app',
  locale: 'en_IN',
  twitterHandle: '@dreamfoodapp',
  themeColor: '#FC8019',
  defaultOgImage: '/og-image.png',
}

/** Cuisine slugs to human-readable labels + descriptions */
export const CUISINE_META: Record<
  string,
  { label: string; description: string; emoji: string }
> = {
  biryani: {
    label: 'Biryani',
    description:
      'Order Biryani online from top restaurants. Explore Hyderabadi, Lucknowi, and Kolkata Biryani options on DreamFood.',
    emoji: '🍚',
  },
  pizza: {
    label: 'Pizza',
    description:
      'Browse the best Pizza restaurants on DreamFood. From Margherita to BBQ Chicken, explore all pizza varieties.',
    emoji: '🍕',
  },
  burger: {
    label: 'Burger',
    description:
      'Discover the juiciest burgers on DreamFood. Classic beef, chicken, and veggie burgers from top outlets.',
    emoji: '🍔',
  },
  chinese: {
    label: 'Chinese',
    description:
      'Craving Chinese food? Browse Manchurian, fried rice, dim sums and more from top Chinese restaurants on DreamFood.',
    emoji: '🥡',
  },
  'south-indian': {
    label: 'South Indian',
    description:
      'Order authentic South Indian food online — Dosa, Idli, Vada, and more from top South Indian restaurants on DreamFood.',
    emoji: '🥞',
  },
  'north-indian': {
    label: 'North Indian',
    description:
      'Explore rich North Indian cuisine on DreamFood — Butter Chicken, Dal Makhani, Naan and more from top restaurants.',
    emoji: '🍛',
  },
  'ice-cream': {
    label: 'Ice Cream',
    description:
      'Browse ice cream parlours and dessert shops on DreamFood. Find your favourite flavours and sundaes.',
    emoji: '🍦',
  },
  desserts: {
    label: 'Desserts',
    description:
      'Satisfy your sweet tooth with DreamFood. Explore gulab jamun, rasgulla, cakes, and premium desserts.',
    emoji: '🍰',
  },
  snacks: {
    label: 'Snacks',
    description:
      'Browse quick snacks and street food on DreamFood — Samosa, Pani Puri, Bhel and more.',
    emoji: '🥨',
  },
  'healthy-food': {
    label: 'Healthy Food',
    description:
      'Find healthy meal options on DreamFood. Salads, grilled food, low-calorie meals and more.',
    emoji: '🥗',
  },
}

/**
 * Build absolute URL for a path.
 */
export function absoluteUrl(path: string): string {
  return `${SITE_CONFIG.url}${path}`
}

/**
 * Build a keyword list for a cuisine page.
 */
export function cuisineKeywords(cuisineLabel: string): string[] {
  return [
    `${cuisineLabel} delivery`,
    `order ${cuisineLabel} online`,
    `best ${cuisineLabel} near me`,
    `${cuisineLabel} restaurants`,
    `${cuisineLabel} food delivery`,
    'DreamFood',
    'online food ordering',
    'food delivery app',
  ]
}

/**
 * Build a keyword list for a restaurant page.
 */
export function restaurantKeywords(
  restaurantName: string,
  cuisineType: string
): string[] {
  return [
    restaurantName,
    `${restaurantName} menu`,
    `${restaurantName} delivery`,
    `order from ${restaurantName}`,
    `${cuisineType} delivery`,
    `best ${cuisineType} restaurants`,
    'online food delivery',
    'DreamFood',
  ]
}

/** Global homepage keywords */
export const HOMEPAGE_KEYWORDS = [
  'food delivery app',
  'order food online',
  'restaurant discovery',
  'online food ordering',
  'food delivery simulation',
  'free food delivery',
  'DreamFood',
  'Free food delivery simulation',
  'Free food delivery simulation',
  'Biryani delivery',
  'Pizza delivery',
  'Burger delivery',
  'restaurant near me',
  'food ordering platform',
  'best food delivery app India',
]

// ─── JSON-LD Schema Builders ──────────────────────────────────────────────────

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: absoluteUrl('/logo.png'),
    description: SITE_CONFIG.description,
    sameAs: [],
  }
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/home?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function buildRestaurantSchema(restaurant: {
  id: number
  name: string
  description: string
  cuisine_type: string
  rating: number
  review_count: number
  delivery_time: number
  address?: string
  logo_url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': absoluteUrl(`/restaurant/${restaurant.id}`),
    name: restaurant.name,
    description: restaurant.description,
    servesCuisine: restaurant.cuisine_type,
    url: absoluteUrl(`/restaurant/${restaurant.id}`),
    ...(restaurant.address && { address: restaurant.address }),
    ...(restaurant.logo_url && {
      image: restaurant.logo_url,
      logo: restaurant.logo_url,
    }),
    aggregateRating:
      restaurant.review_count > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: restaurant.rating,
            reviewCount: restaurant.review_count,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    potentialAction: {
      '@type': 'OrderAction',
      target: absoluteUrl(`/restaurant/${restaurant.id}`),
    },
  }
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  }
}

export function buildFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildMenuItemSchema(item: {
  name: string
  description: string
  price: number
  restaurantId: number
  restaurantName: string
  isVegetarian: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: item.name,
    description: item.description,
    offers: {
      '@type': 'Offer',
      price: item.price,
      priceCurrency: 'INR',
    },
    suitableForDiet: item.isVegetarian
      ? 'https://schema.org/VegetarianDiet'
      : undefined,
  }
}
