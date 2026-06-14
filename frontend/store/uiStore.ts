import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UIMode = 'swiggy' | 'zomato'

interface UIStore {
  uiMode: UIMode
  setUIMode: (mode: UIMode) => void
  toggleUIMode: () => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      uiMode: 'swiggy',
      setUIMode: (mode: UIMode) => set({ uiMode: mode }),
      toggleUIMode: () =>
        set((state) => ({
          uiMode: state.uiMode === 'swiggy' ? 'zomato' : 'swiggy',
        })),
    }),
    {
      name: 'ui-store',
      skipHydration: false,
    }
  )
)
