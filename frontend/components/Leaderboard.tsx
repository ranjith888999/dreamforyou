'use client';

import React, { useEffect, useState } from 'react';
import { useRewardStore, LeaderboardEntry } from '@/store/rewardStore';
import { Trophy, Medal, Crown } from 'lucide-react';

interface LeaderboardProps {
  title?: string;
  limit?: number;
  showAllLink?: boolean;
}

const getRankMedal = (rank: number): string => {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return '🎯';
  }
};

const getLevelColor = (level: string): string => {
  switch (level) {
    case 'platinum':
      return 'from-purple-400 to-purple-600';
    case 'gold':
      return 'from-yellow-400 to-yellow-600';
    case 'silver':
      return 'from-slate-400 to-slate-600';
    case 'bronze':
    default:
      return 'from-orange-400 to-orange-600';
  }
};

/**
 * Leaderboard component showing top users and competitive ranking
 */
export const Leaderboard: React.FC<LeaderboardProps> = ({
  title = '🏆 Leaderboard',
  limit = 10,
  showAllLink = false,
}) => {
  const { leaderboard, userRewards, getUserRank } = useRewardStore();
  const [displayEntries, setDisplayEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setDisplayEntries(leaderboard.slice(0, limit));
  }, [leaderboard, limit]);

  const userRank = getUserRank();
  const isUserInTop = userRank <= limit;

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          {title}
        </h2>
        {showAllLink && (
          <a
            href="/leaderboard"
            className="text-sm text-orange-600 dark:text-orange-400 hover:underline font-medium"
          >
            View All →
          </a>
        )}
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2 mb-6">
        {displayEntries.length > 0 ? (
          displayEntries.map((entry, index) => (
            <div
              key={entry.userId}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
                index === 0
                  ? 'bg-gradient-to-r from-yellow-200 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 shadow-md'
                  : index === 1
                  ? 'bg-gradient-to-r from-slate-300 to-slate-200 dark:from-slate-700 dark:to-slate-600'
                  : index === 2
                  ? 'bg-gradient-to-r from-orange-200 to-orange-100 dark:from-orange-800 dark:to-orange-700'
                  : 'hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {/* Rank Medal */}
              <div className="w-10 h-10 flex items-center justify-center text-2xl font-bold">
                {getRankMedal(entry.rank)}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {entry.username}
                  </span>
                  <div
                    className={`px-2 py-1 text-xs font-bold rounded-full text-white bg-gradient-to-r ${getLevelColor(
                      entry.level
                    )}`}
                  >
                    {entry.level.toUpperCase()}
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {entry.orders} orders
                </p>
              </div>

              {/* Coins Badge */}
              <div className="text-right">
                <div className="flex items-center gap-1 text-lg font-bold text-yellow-600 dark:text-yellow-400">
                  <span>⭐</span>
                  <span>{entry.coins.toLocaleString()}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">coins</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            Loading leaderboard...
          </div>
        )}
      </div>

      {/* User's Current Rank (if not in top) */}
      {userRewards && !isUserInTop && userRank > 0 && (
        <div className="border-t-2 border-slate-300 dark:border-slate-600 pt-4">
          <div className="flex items-center gap-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <div className="w-10 h-10 flex items-center justify-center text-xl font-bold">
              #{userRank}
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900 dark:text-white">Your Rank</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {userRewards.totalOrders} orders
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-lg font-bold text-yellow-600 dark:text-yellow-400">
                <span>⭐</span>
                <span>{userRewards.coins.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {displayEntries.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            Be the first to join the leaderboard!
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Place orders and earn coins to climb the ranks
          </p>
        </div>
      )}

      {/* Footer Message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900 dark:to-pink-900 rounded-lg text-center">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          🎉 Compete with friends and earn rewards! Share your achievements on WhatsApp.
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
