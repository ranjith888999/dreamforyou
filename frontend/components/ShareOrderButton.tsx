'use client';

import React, { useState } from 'react';
import {
  shareToWhatsApp,
  shareToWhatsAppWeb,
  shareToInstagram,
  shareToTwitter,
  copyToClipboard,
  getOptimalShareMethod,
  isMobile,
  ShareOrder,
} from '@/lib/whatsappShare';
import {
  Share2,
  MessageCircle,
  Copy,
  Mail,
  Instagram,
  Twitter,
  Check,
} from 'lucide-react';

interface ShareOrderButtonProps {
  order: ShareOrder;
  className?: string;
  showLabel?: boolean;
}

/**
 * Share Order component with WhatsApp-optimized options
 * Ideal for dopamine trigger - sharing creates social proof
 */
export const ShareOrderButton: React.FC<ShareOrderButtonProps> = ({
  order,
  className = '',
  showLabel = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeShare, setActiveShare] = useState<string | null>(null);

  const handleWhatsAppShare = () => {
    const method = getOptimalShareMethod();
    if (method === 'whatsapp-mobile') {
      shareToWhatsApp(order);
    } else {
      shareToWhatsAppWeb(order);
    }
    setActiveShare('whatsapp');
    setTimeout(() => setActiveShare(null), 1500);
  };

  const handleCopyToClipboard = async () => {
    const success = await copyToClipboard(order);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInstagramShare = () => {
    shareToInstagram(order);
    setActiveShare('instagram');
    setTimeout(() => setActiveShare(null), 1500);
  };

  const handleTwitterShare = () => {
    shareToTwitter(order);
    setActiveShare('twitter');
    setTimeout(() => setActiveShare(null), 1500);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium hover:shadow-lg transition-all duration-200 active:scale-95"
      >
        <Share2 className="w-5 h-5" />
        {showLabel && <span>Share Order</span>}
      </button>

      {/* Share Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50 min-w-max py-2">
          {/* WhatsApp - Primary CTA */}
          <button
            onClick={handleWhatsAppShare}
            className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-700 ${
              activeShare === 'whatsapp'
                ? 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
                : ''
            }`}
          >
            <MessageCircle className="w-5 h-5 text-green-500" />
            <span>WhatsApp</span>
            {activeShare === 'whatsapp' && <Check className="w-4 h-4 ml-auto" />}
          </button>

          {/* Copy to Clipboard */}
          <button
            onClick={handleCopyToClipboard}
            className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-700 ${
              copied
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                : ''
            }`}
          >
            <Copy className="w-5 h-5 text-blue-500" />
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            {copied && <Check className="w-4 h-4 ml-auto" />}
          </button>

          {/* Instagram */}
          <button
            onClick={handleInstagramShare}
            className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-700 ${
              activeShare === 'instagram'
                ? 'bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100'
                : ''
            }`}
          >
            <Instagram className="w-5 h-5 text-pink-500" />
            <span>Instagram</span>
            {activeShare === 'instagram' && <Check className="w-4 h-4 ml-auto" />}
          </button>

          {/* Twitter */}
          <button
            onClick={handleTwitterShare}
            className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-700 ${
              activeShare === 'twitter'
                ? 'bg-sky-100 dark:bg-sky-900 text-sky-900 dark:text-sky-100'
                : ''
            }`}
          >
            <Twitter className="w-5 h-5 text-sky-500" />
            <span>Twitter</span>
            {activeShare === 'twitter' && <Check className="w-4 h-4 ml-auto" />}
          </button>

          {/* Email */}
          <button
            onClick={() => {
              const subject = `Check out my ${order.restaurantName} order on DreamFood!`;
              const body = `I just placed an order at ${order.restaurantName} on DreamFood. Total: ₹${order.total.toFixed(
                2
              )}. You should try it too! Download DreamFood: https://dreamfood.app`;
              window.location.href = `mailto:?subject=${encodeURIComponent(
                subject
              )}&body=${encodeURIComponent(body)}`;
            }}
            className="w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Mail className="w-5 h-5 text-orange-500" />
            <span>Email</span>
          </button>
        </div>
      )}

      {/* Backdrop to close menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

/**
 * Share Banner component - prominent sharing incentive
 */
export const ShareBanner: React.FC<{
  order: ShareOrder;
  onShare?: () => void;
}> = ({ order, onShare }) => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg p-6 mb-6 border-2 border-dashed border-purple-300 dark:border-purple-700">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        🌟 Share & Earn Bonus Coins!
      </h3>
      <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
        Share your order with friends on WhatsApp and earn {' '}
        <span className="font-bold text-yellow-600">+50 coins</span> per share!
      </p>
      <ShareOrderButton
        order={order}
        showLabel={true}
        className="w-full justify-center"
      />
    </div>
  );
};

export default ShareOrderButton;
