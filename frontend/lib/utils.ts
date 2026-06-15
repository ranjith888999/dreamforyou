export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price)
}

export function calculateGST(amount: number, gstRate: number = 0.05): number {
  return amount * gstRate
}

export function calculateDeliveryCharge(
  subtotal: number,
  baseCharge: number = 40,
  freeDeliveryThreshold: number = 200
): number {
  return subtotal >= freeDeliveryThreshold ? 0 : baseCharge
}

export function calculateTotal(
  subtotal: number,
  deliveryCharge: number,
  gstRate: number = 0.05
): { gst: number; total: number } {
  const gst = calculateGST(subtotal, gstRate)
  const total = subtotal + deliveryCharge + gst
  return { gst, total }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function timeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function generateOrderNumber(): string {
  return `DF${Date.now().toString().slice(-8)}`
}

export function getRandomRiderName(): string {
  const names = [
    'Ravi',
    'Amit',
    'Priya',
    'Rajesh',
    'Sneha',
    'Arjun',
    'Divya',
    'Vikram',
    'Ananya',
    'Rohan',
  ]
  return names[Math.floor(Math.random() * names.length)]
}

export function getRandomRiderRating(): number {
  return parseFloat((Math.random() * 0.5 + 4.5).toFixed(1))
}

export function getRandomMessage(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)]
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount)
}

export function calculateSavings(orderTotal: number): number {
  return orderTotal
}

export function getLevel(totalOrders: number): { level: number; name: string } {
  if (totalOrders >= 100) return { level: 4, name: 'Savings Champion' }
  if (totalOrders >= 50) return { level: 3, name: 'Dream Foodie' }
  if (totalOrders >= 10) return { level: 2, name: 'Craving Master' }
  return { level: 1, name: 'Food Explorer' }
}

export function calculateStreak(lastOrderDate: Date | null): number {
  if (!lastOrderDate) return 0
  
  const now = new Date()
  const lastOrder = new Date(lastOrderDate)
  
  const diffTime = Math.abs(now.getTime() - lastOrder.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return Math.max(0, diffDays)
}
