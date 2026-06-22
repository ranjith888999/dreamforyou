'use client';

import React, { useEffect } from 'react';
import { useRewardStore } from '@/store/rewardStore';
import { Leaderboard } from '@/components/Leaderboard';

interface LeaderboardPageProps {
  params: {
    locale?: string;
  };
}

/**
 * Leaderboard page showing global rankings and user stats
 * Full gamification showcase for competitive dopamine engagement
 */
export default function LeaderboardPage({ params }: LeaderboardPageProps) {
  const { userRewards, leaderboard, getUserRank, addCoins } = useRewardStore();

  useEffect(() => {
    // Initialize mock leaderboard if needed
    if (leaderboard.length === 0) {
      const mockLeaderboard = [
        { rank: 1, userId: 'user1', username: 'Food Lover', coins: 5420, orders: 23, level: 'platinum' },
        { rank: 2, userId: 'user2', username: 'Order Master', coins: 4890, orders: 21, level: 'gold' },
        { rank: 3, userId: 'user3', username: 'Dopamine Seeker', coins: 4120, orders: 18, level: 'gold' },
        { rank: 4, userId: 'user4', username: 'Biryani Fan', coins: 3560, orders: 15, level: 'silver' },
        { rank: 5, userId: 'user5', username: 'Quick Bites', coins: 3200, orders: 14, level: 'silver' },
      ];
      useRewardStore.setState({ leaderboard: mockLeaderboard });
    }
  }, [leaderboard.length]);

  const userRank = getUserRank();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            🏆 Leaderboard & Rankings
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Compete with friends, earn coins, and claim your spot at the top!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                {userRewards?.coins || 0}
              </div>
              <p className="text-slate-600 dark:text-slate-400">My Coins</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                #{userRank || '—'}
              </div>
              <p className="text-slate-600 dark:text-slate-400">My Rank</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {userRewards?.streak || 0}
              </div>
              <p className="text-slate-600 dark:text-slate-400">Day Streak 🔥</p>
            </div>
          </div>
        </div>

        {/* Main Leaderboard */}
        <Leaderboard title="🏆 Global Rankings" limit={10} showAllLink={false} />

        {/* Achievement Section */}
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            🎯 Your Achievements
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🌟', label: 'First Order', unlocked: userRewards?.totalOrders! > 0 },
              { icon: '🔥', label: '7-Day Streak', unlocked: userRewards?.streak! >= 7 },
              { icon: '💯', label: '100 Coins', unlocked: userRewards?.coins! >= 100 },
              { icon: '👑', label: 'Platinum Level', unlocked: userRewards?.level === 'platinum' },
              { icon: '🎁', label: 'Daily Reward', unlocked: userRewards?.badges.includes('daily-reward') },
              { icon: '📢', label: 'Social Butterfly', unlocked: userRewards?.badges.includes('social') },
              { icon: '👥', label: 'Refer Friend', unlocked: userRewards?.referredUsers! > 0 },
              { icon: '⭐', label: 'Top 10 Ranked', unlocked: userRank > 0 && userRank <= 10 },
            ].map((achievement, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg text-center transition-all duration-200 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-200 to-orange-200 dark:from-yellow-900 dark:to-orange-900 shadow-lg scale-105'
                    : 'bg-slate-100 dark:bg-slate-700 opacity-50 grayscale'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {achievement.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-8 shadow-xl text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Climb the Leaderboard?</h3>
          <p className="mb-6 opacity-90">
            Place orders, share with friends, and earn coins to unlock achievements!
          </p>
          <a
            href="/home"
            className="inline-block px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:scale-105 transition-transform duration-200"
          >
            Start Exploring Restaurants →
          </a>
        </div>
      </div>
    </div>
  );
}
