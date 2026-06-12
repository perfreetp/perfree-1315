import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MetaState {
  unlockedEndings: string[]
  unlockedAchievements: string[]
  totalSessions: number
  totalPlayTime: number
  sessionStartTime: number
}

interface MetaActions {
  incrementSession: () => void
  unlockEnding: (endingId: string) => void
  isEndingUnlocked: (endingId: string) => boolean
  unlockAchievementGlobal: (achievementId: string) => void
  updatePlayTime: () => void
  resetSessionStartTime: () => void
}

type MetaStore = MetaState & MetaActions

export const useMetaStore = create<MetaStore>()(
  persist(
    (set, get) => ({
      unlockedEndings: [],
      unlockedAchievements: [],
      totalSessions: 0,
      totalPlayTime: 0,
      sessionStartTime: Date.now(),

      incrementSession: () =>
        set((state) => ({
          totalSessions: state.totalSessions + 1,
          sessionStartTime: Date.now()
        })),

      unlockEnding: (endingId) =>
        set((state) => {
          if (state.unlockedEndings.includes(endingId)) return state
          return {
            unlockedEndings: [...state.unlockedEndings, endingId]
          }
        }),

      isEndingUnlocked: (endingId) => {
        return get().unlockedEndings.includes(endingId)
      },

      unlockAchievementGlobal: (achievementId) =>
        set((state) => {
          if (state.unlockedAchievements.includes(achievementId)) return state
          return {
            unlockedAchievements: [...state.unlockedAchievements, achievementId]
          }
        }),

      updatePlayTime: () =>
        set((state) => {
          const now = Date.now()
          const elapsed = now - state.sessionStartTime
          return {
            totalPlayTime: state.totalPlayTime + elapsed,
            sessionStartTime: now
          }
        }),

      resetSessionStartTime: () =>
        set({
          sessionStartTime: Date.now()
        })
    }),
    {
      name: 'fog-harbor-meta'
    }
  )
)
