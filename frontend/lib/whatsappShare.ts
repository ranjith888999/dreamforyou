/**
 * WhatsApp and Social Share Utilities
 * Optimize sharing for Indian market with WhatsApp-first UX
 */

export interface ShareOrder {
  restaurantName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  simulationId: string;
}

/**
 * Generate WhatsApp share message for simulated order
 */
export const generateWhatsAppShareMessage = (order: ShareOrder): string => {
  const itemsList = order.items
    .map((item) => `${item.name} (x${item.quantity})`)
    .join('\n');

  const message = `🍕 *DreamFood Simulation* 🍕\n\n*${order.restaurantName}*\n\n📦 *Order Summary:*\n${itemsList}\n\n💰 *Total:* ₹${order.total.toFixed(2)}\n\n✨ Join me on DreamFood - Explore restaurants and enjoy dopamine-filled ordering! 🎉\n\n🔗 Download DreamFood: https://dreamfood.app\n\n#DreamFood #FoodDelivery`;

  return message;
};

/**
 * Generate Instagram share text
 */
export const generateInstagramShareText = (order: ShareOrder): string => {
  const hashtags = `#DreamFood #FoodDelivery #${order.restaurantName.replace(/\s/g, '')} #OrderNow #Dopamine #FoodLover`;
  return `Just simulated an order at ${order.restaurantName} on DreamFood! ₹${order.total.toFixed(2)}\n\n${hashtags}`;
};

/**
 * Generate generic social share text
 */
export const generateShareText = (order: ShareOrder): string => {
  return `Check out this amazing order at ${order.restaurantName} on DreamFood! Total: ₹${order.total.toFixed(2)}. Join the dopamine experience! 🍕`;
};

/**
 * Share to WhatsApp (mobile)
 */
export const shareToWhatsApp = (order: ShareOrder): void => {
  const message = generateWhatsAppShareMessage(order);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/?text=${encodedMessage}`;
  window.open(url, '_blank');
};

/**
 * Share to WhatsApp Web (desktop)
 */
export const shareToWhatsAppWeb = (order: ShareOrder): void => {
  const message = generateWhatsAppShareMessage(order);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://web.whatsapp.com/send?text=${encodedMessage}`;
  window.open(url, '_blank');
};

/**
 * Share to Instagram
 */
export const shareToInstagram = (order: ShareOrder): void => {
  const text = generateInstagramShareText(order);
  const encodedText = encodeURIComponent(text);
  const url = `https://www.instagram.com/`;
  // Note: Instagram doesn't support direct share via URL, so redirect to app
  // User can manually copy-paste the text
  window.open(url, '_blank');
};

/**
 * Share to Twitter/X
 */
export const shareToTwitter = (order: ShareOrder): void => {
  const text = generateShareText(order);
  const encodedText = encodeURIComponent(text);
  const hashtag = encodeURIComponent('#DreamFood');
  const url = `https://twitter.com/intent/tweet?text=${encodedText}&hashtags=${hashtag}`;
  window.open(url, '_blank');
};

/**
 * Copy order summary to clipboard
 */
export const copyToClipboard = (order: ShareOrder): Promise<boolean> => {
  const message = generateWhatsAppShareMessage(order);
  return navigator.clipboard
    .writeText(message)
    .then(() => true)
    .catch(() => false);
};

/**
 * Generate shareable link for order
 */
export const generateShareLink = (order: ShareOrder): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const params = new URLSearchParams({
    restaurantName: order.restaurantName,
    total: order.total.toString(),
    simulationId: order.simulationId,
  });
  return `${baseUrl}/shared-order?${params.toString()}`;
};

/**
 * Detect if platform is WhatsApp
 */
export const isWhatsAppPlatform = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('whatsapp');
};

/**
 * Detect if on mobile
 */
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Optimize share method for device
 */
export const getOptimalShareMethod = (): 'whatsapp-mobile' | 'whatsapp-web' | 'generic' => {
  if (isMobile()) {
    return 'whatsapp-mobile';
  }
  return 'whatsapp-web';
};
