export const CATEGORIES = [
  'Biryani',
  'Pizza',
  'Burger',
  'Chinese',
  'South Indian',
  'North Indian',
  'Ice Cream',
  'Desserts',
  'Snacks',
  'Healthy Food',
]

export const MOODS = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'lonely', emoji: '😔', label: 'Lonely' },
  { id: 'stressed', emoji: '😰', label: 'Stressed' },
  { id: 'celebrating', emoji: '🎉', label: 'Celebrating' },
  { id: 'hungry', emoji: '😋', label: 'Hungry' },
]

export const ORDER_STAGES = [
  { id: 1, name: 'Restaurant Accepted', emoji: '✅' },
  { id: 2, name: 'Chef Started Cooking', emoji: '👨‍🍳' },
  { id: 3, name: 'Food Being Prepared', emoji: '🍳' },
  { id: 4, name: 'Food Packed', emoji: '📦' },
  { id: 5, name: 'Delivery Partner Assigned', emoji: '🏍️' },
  { id: 6, name: 'Delivery Partner Picked Up', emoji: '🚙' },
  { id: 7, name: 'Delivery On The Way', emoji: '🗺️' },
  { id: 8, name: 'Delivered Successfully', emoji: '🎉' },
]

export const ACHIEVEMENTS = [
  { id: 'first_order', name: 'First Dream Order', icon: '🚀' },
  { id: 'saved_1k', name: 'Saved ₹1000', icon: '💰' },
  { id: 'saved_5k', name: 'Saved ₹5000', icon: '💸' },
  { id: 'saved_10k', name: 'Saved ₹10000', icon: '🎉' },
  { id: '100_orders', name: '100 Orders Completed', icon: '🏆' },
  { id: '7_day_streak', name: '7 Day Streak', icon: '🔥' },
  { id: '30_day_streak', name: '30 Day Streak', icon: '⭐' },
]

export const LEVELS = [
  { level: 1, name: 'Food Explorer', minOrders: 0 },
  { level: 2, name: 'Craving Master', minOrders: 10 },
  { level: 3, name: 'Dream Foodie', minOrders: 50 },
  { level: 4, name: 'Savings Champion', minOrders: 100 },
]

export const GST_RATE = 0.05 // 5% GST
export const DELIVERY_CHARGE_THRESHOLD = 200 // Free delivery above this amount

export const RIDER_MESSAGES = [
  "Traffic near Kukatpally signal.",
  "Rider is approaching your location.",
  "Your food is still hot.",
  "Rider will arrive in 5 minutes.",
  "Crossing Hitech City.",
  "Your food is almost there.",
  "Only 2 km remaining.",
  "Rider is at your building.",
  "Entering your locality.",
  "Just around the corner!",
]

export const PLACEHOLDER_IMAGES = {
  restaurant: 'https://via.placeholder.com/500x300?text=Restaurant',
  menu: 'https://via.placeholder.com/300x200?text=Food',
  rider: 'https://via.placeholder.com/100x100?text=Rider',
}
