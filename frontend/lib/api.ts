import axios, { AxiosInstance, AxiosError } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export default api

// Authentication APIs
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  googleLogin: (token: string) => api.post('/auth/google-login', { token }),
  guestLogin: () => api.post('/auth/guest-login'),
  verifyToken: (token: string) => api.get('/auth/verify-token', {
    params: { token }
  }),
}

// Restaurant APIs
export const restaurantAPI = {
  getRestaurants: (skip = 0, limit = 10, cuisineType?: string) =>
    api.get('/restaurants/', {
      params: { skip, limit, cuisine_type: cuisineType }
    }),
  getRestaurant: (id: number) => api.get(`/restaurants/${id}`),
  searchRestaurants: (name: string) =>
    api.get('/restaurants/search/by-name', {
      params: { name }
    }),
  getCategories: () => api.get('/restaurants/category/all'),
}

// Menu APIs
export const menuAPI = {
  getMenuItems: (restaurantId: number, skip = 0, limit = 20) =>
    api.get(`/menu/restaurant/${restaurantId}`, {
      params: { skip, limit }
    }),
  getMenuItem: (id: number) => api.get(`/menu/${id}`),
  getPopularItems: (limit = 10) =>
    api.get('/menu/popular/all', {
      params: { limit }
    }),
  searchMenuItems: (name: string) =>
    api.get('/menu/search/by-name', {
      params: { name }
    }),
}

// Cart APIs (Coming Soon)
export const cartAPI = {
  getCart: () => api.get('/cart/'),
  addItem: (itemId: number, quantity: number) =>
    api.post('/cart/add', { menu_item_id: itemId, quantity }),
  removeItem: (itemId: number) =>
    api.post('/cart/remove', { menu_item_id: itemId }),
  updateQuantity: (itemId: number, quantity: number) =>
    api.post('/cart/update-quantity', { menu_item_id: itemId, quantity }),
  calculateTotal: (items: any[]) =>
    api.post('/cart/calculate-total', { items }),
}

// Order APIs (Coming Soon)
export const orderAPI = {
  placeOrder: (data: any) => api.post('/orders/place-order', data),
  getOrder: (orderId: number) => api.get(`/orders/${orderId}`),
  getOrderHistory: () => api.get('/orders/user/history'),
  getOrderTracking: (orderId: number) => api.get(`/orders/${orderId}/tracking`),
  cancelOrder: (orderId: number) => api.post(`/orders/${orderId}/cancel`),
}

// User APIs
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  getWishlist: () => api.get('/users/wishlist'),
  addToWishlist: (itemId: number) =>
    api.post('/users/wishlist/add', { menu_item_id: itemId }),
  removeFromWishlist: (itemId: number) =>
    api.post('/users/wishlist/remove', { menu_item_id: itemId }),
  getSavedOrders: () => api.get('/users/saved-orders'),
  saveOrder: (orderData: any) =>
    api.post('/users/saved-orders/save', orderData),
}

// AI APIs (Coming Soon)
export const aiAPI = {
  recommendByMood: (mood: string) =>
    api.post('/ai/recommend-by-mood', { mood }),
  generateDreamMeal: (mealType: string) =>
    api.post('/ai/meal-generator', { meal_type: mealType }),
  chatWithCompanion: (message: string) =>
    api.get('/ai/companion-chat', {
      params: { message }
    }),
  getDeliveryMessages: () => api.get('/ai/delivery-messages'),
}

// Gamification APIs (Coming Soon)
export const gamificationAPI = {
  getAchievements: () => api.get('/gamification/achievements'),
  getUserAchievements: () => api.get('/gamification/user-achievements'),
  getUserStatistics: () => api.get('/gamification/statistics'),
  getLevels: () => api.get('/gamification/levels'),
  getLeaderboard: () => api.get('/gamification/leaderboard'),
}
