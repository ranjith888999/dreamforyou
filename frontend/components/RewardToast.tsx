'use client';

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Gift, Zap, Star, Award } from 'lucide-react';

interface RewardToastProps {
  show: boolean;
  type: 'coins' | 'badge' | 'streak' | 'order';
  amount?: number;
  message?: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
}

/**
 * Dopamine-triggering reward toast with confetti animations
 */
export const RewardToast: React.FC<RewardToastProps> = ({
  show,
  type,
  amount = 0,
  message = '',
  onClose,
  autoClose = true,
  autoCloseDuration = 3000,
}) => {
  const [showConfetti, setShowConfetti] = useState(show);

  useEffect(() => {
    if (show) {
      setShowConfetti(true);
      if (autoClose) {
        const timer = setTimeout(() => {
          setShowConfetti(false);
          onClose();
        }, autoCloseDuration);
        return () => clearTimeout(timer);
      }
    }
  }, [show, autoClose, autoCloseDuration, onClose]);

  if (!show) return null;

  const toastConfig = {
    coins: {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      bg: 'from-yellow-500 to-orange-500',
      text: `+${amount} Coins!`,
      emoji: '⭐',
    },
    badge: {
      icon: <Award className="w-8 h-8 text-purple-400" />,
      bg: 'from-purple-500 to-pink-500',
      text: `New Badge: ${message}`,
      emoji: '🏆',
    },
    streak: {
      icon: <Star className="w-8 h-8 text-red-400" />,
      bg: 'from-red-500 to-pink-500',
      text: `${amount} Day Streak! 🔥`,
      emoji: '🔥',
    },
    order: {
      icon: <Gift className="w-8 h-8 text-green-400" />,
      bg: 'from-green-500 to-emerald-500',
      text: message || 'Order Placed!',
      emoji: '🎉',
    },
  };

  const config = toastConfig[type];

  return (
    <>
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 800}
          height={typeof window !== 'undefined' ? window.innerHeight : 600}
          numberOfPieces={100}
          recycle={false}
          gravity={0.2}
        />
      )}

      <div
        className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
          showConfetti ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <div
          className={`bg-gradient-to-r ${config.bg} rounded-full px-8 py-4 shadow-2xl flex items-center gap-4 text-white font-bold text-xl`}
        >
          <span className="text-4xl animate-bounce">{config.emoji}</span>
          <div>
            <p className="text-lg">{config.text}</p>
            {message && type !== 'order' && (
              <p className="text-sm opacity-90">{message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {showConfetti &&
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${2 + Math.random() * 2}s ease-in infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {config.emoji}
            </div>
          ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px);
          }
        }
      `}</style>
    </>
  );
};

/**
 * Micro-interaction toast for add-to-cart feedback
 */
export const MicroActionToast: React.FC<{
  show: boolean;
  message: string;
  onClose: () => void;
}> = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed bottom-8 right-8 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
    >
      {message}
    </div>
  );
};

export default RewardToast;
