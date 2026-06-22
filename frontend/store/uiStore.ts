import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UIMode = 'warm' | 'cool'

interface UIStore {
  uiMode: UIMode
  setUIMode: (mode: UIMode) => void
  toggleUIMode: () => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      uiMode: 'warm',
      setUIMode: (mode: UIMode) => set({ uiMode: mode }),
      toggleUIMode: () =>
        set((state) => ({
          uiMode: state.uiMode === 'warm' ? 'cool' : 'warm',
        })),
    }),
    {
      name: 'ui-store',
      skipHydration: false,
    }
  )
)
