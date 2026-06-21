import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserReward {
  userId: string;
  coins: number;
  streak: number;
  lastOrderDate: string;
  totalOrders: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  badges: string[];
  referralCode: string;
  referredUsers: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  coins: number;
  orders: number;
  avatar?: string;
  level: string;
}

interface RewardStore {
  // User rewards
  userRewards: UserReward | null;
  setUserRewards: (rewards: UserReward) => void;

  // Coin operations
  addCoins: (amount: number, reason: string) => void;
  deductCoins: (amount: number) => void;
  getCoins: () => number;

  // Streak tracking
  updateStreak: () => void;
  resetStreak: () => void;

  // Badges & achievements
  addBadge: (badge: string) => void;
  hasBadge: (badge: string) => boolean;

  // Leaderboard
  leaderboard: LeaderboardEntry[];
  setLeaderboard: (entries: LeaderboardEntry[]) => void;
  getUserRank: () => number;

  // Referral
  addReferral: () => void;
  getReferralCode: () => string;

  // Daily rewards
  claimDailyReward: () => number;
  lastDailyRewardClaim: string | null;
  setLastDailyRewardClaim: (date: string) => void;
}

const DEFAULT_REWARDS: UserReward = {
  userId: '',
  coins: 0,
  streak: 0,
  lastOrderDate: new Date().toISOString(),
  totalOrders: 0,
  level: 'bronze',
  badges: [],
  referralCode: '',
  referredUsers: 0,
};

export const useRewardStore = create<RewardStore>()(
  persist(
    (set, get) => ({
      userRewards: null,
      leaderboard: [],
      lastDailyRewardClaim: null,

      setUserRewards: (rewards: UserReward) =>
        set(() => ({ userRewards: rewards })),

      addCoins: (amount: number, reason: string) => {
        set((state) => {
          if (!state.userRewards) return {};
          return {
            userRewards: {
              ...state.userRewards,
              coins: state.userRewards.coins + amount,
            },
          };
        });
        console.log(`Added ${amount} coins for: ${reason}`);
      },

      deductCoins: (amount: number) => {
        set((state) => {
          if (!state.userRewards) return {};
          return {
            userRewards: {
              ...state.userRewards,
              coins: Math.max(0, state.userRewards.coins - amount),
            },
          };
        });
      },

      getCoins: () => {
        const state = get();
        return state.userRewards?.coins || 0;
      },

      updateStreak: () => {
        set((state) => {
          if (!state.userRewards) return {};
          const lastOrder = new Date(state.userRewards.lastOrderDate);
          const today = new Date();
          const diffTime = today.getTime() - lastOrder.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          let newStreak = state.userRewards.streak;
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }

          return {
            userRewards: {
              ...state.userRewards,
              streak: newStreak,
              lastOrderDate: today.toISOString(),
              totalOrders: state.userRewards.totalOrders + 1,
            },
          };
        });
      },

      resetStreak: () => {
        set((state) => {
          if (!state.userRewards) return {};
          return {
            userRewards: {
              ...state.userRewards,
              streak: 0,
            },
          };
        });
      },

      addBadge: (badge: string) => {
        set((state) => {
          if (!state.userRewards) return {};
          if (state.userRewards.badges.includes(badge)) return {};

          return {
            userRewards: {
              ...state.userRewards,
              badges: [...state.userRewards.badges, badge],
            },
          };
        });
      },

      hasBadge: (badge: string) => {
        const state = get();
        return state.userRewards?.badges.includes(badge) || false;
      },

      setLeaderboard: (entries: LeaderboardEntry[]) => {
        set(() => ({ leaderboard: entries }));
      },

      getUserRank: () => {
        const state = get();
        if (!state.userRewards) return 0;
        const entry = state.leaderboard.find(
          (e) => e.userId === state.userRewards?.userId
        );
        return entry?.rank || 0;
      },

      addReferral: () => {
        set((state) => {
          if (!state.userRewards) return {};
          return {
            userRewards: {
              ...state.userRewards,
              referredUsers: state.userRewards.referredUsers + 1,
              coins: state.userRewards.coins + 100, // Bonus for referral
            },
          };
        });
      },

      getReferralCode: () => {
        const state = get();
        return state.userRewards?.referralCode || '';
      },

      claimDailyReward: () => {
        const state = get();
        const now = new Date().toISOString();
        const lastClaim = state.lastDailyRewardClaim;

        // Check if already claimed today
        if (lastClaim) {
          const lastClaimDate = new Date(lastClaim);
          const today = new Date();
          if (
            lastClaimDate.getDate() === today.getDate() &&
            lastClaimDate.getMonth() === today.getMonth() &&
            lastClaimDate.getFullYear() === today.getFullYear()
          ) {
            return 0; // Already claimed today
          }
        }

        const dailyCoins = 50;
        set(() => ({
          lastDailyRewardClaim: now,
        }));
        get().addCoins(dailyCoins, 'Daily Reward');
        return dailyCoins;
      },

      setLastDailyRewardClaim: (date: string) => {
        set(() => ({ lastDailyRewardClaim: date }));
      },
    }),
    {
      name: 'dream-reward-storage',
      version: 1,
    }
  )
);
