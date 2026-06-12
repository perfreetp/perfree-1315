import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GameState, KeyChoice, DiaryEntry } from '@/types'
import { advanceTime as engineAdvanceTime } from '@/engine/timeSystem'
import { changeAffinity as changeAffinityValue } from '@/engine/affinitySystem'
import { useMetaStore } from './metaStore'
import { chapters } from '@/data/chapters'

const initialGameState: GameState = {
  playerName: '',
  currentChapter: '',
  currentScene: '',
  currentLocation: '',
  day: 1,
  timeSlot: 'dawn',
  timeSlotIndex: 0,
  totalActions: 0,
  inventory: [],
  clues: [],
  clueBoard: {},
  diary: [],
  documents: [],
  affinity: {},
  visitedLocations: [],
  completedScenes: [],
  keyChoices: [],
  unlockedAchievements: [],
  triggeredEvents: [],
  gamePhase: 'title',
  endingType: undefined,
  retryScene: undefined
}

interface GameStoreActions {
  startGame: (playerName: string) => void
  loadGame: (state: GameState) => void
  setLocation: (locationId: string) => void
  setChapter: (chapterId: string) => void
  setScene: (sceneId: string) => void
  advanceTime: () => void
  addItem: (itemId: string) => void
  removeItem: (itemId: string) => void
  addClue: (clueId: string) => void
  changeAffinity: (characterId: string, delta: number) => void
  addDiaryEntry: (entry: DiaryEntry) => void
  addDocument: (docId: string) => void
  makeKeyChoice: (choice: KeyChoice) => void
  completeScene: (sceneId: string) => void
  visitLocation: (locationId: string) => void
  triggerEvent: (eventId: string) => void
  unlockAchievement: (achievementId: string) => void
  setGamePhase: (phase: GameState['gamePhase']) => void
  setEndingType: (endingType: string) => void
  unlockEndingInMeta: (endingId: string) => void
  syncAchievementsToMeta: () => void
  updateClueBoard: (clueId: string, x: number, y: number, connections: string[]) => void
  addClueBoardConnection: (fromId: string, toId: string) => void
  retryFromScene: (sceneId: string) => void
  resetForChapterReplay: (chapterId: string) => void
}

type GameStore = GameState & GameStoreActions

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialGameState,

      startGame: (playerName) => {
        const firstChapter = chapters[0]
        const firstScene = firstChapter.scenes[0]
        set({
          ...initialGameState,
          playerName,
          gamePhase: 'playing',
          currentChapter: firstChapter.id,
          currentScene: firstScene.id,
          currentLocation: firstScene.locationId
        })
      },

      loadGame: (state) => set(state),

      setLocation: (locationId) =>
        set({ currentLocation: locationId }),

      setChapter: (chapterId) =>
        set({ currentChapter: chapterId }),

      setScene: (sceneId) => {
        let chapterId: string | undefined
        for (const chapter of chapters) {
          for (const scene of chapter.scenes) {
            if (scene.id === sceneId) {
              chapterId = chapter.id
              break
            }
          }
          if (chapterId) break
        }
        if (chapterId) {
          set({ currentScene: sceneId, currentChapter: chapterId })
        } else {
          set({ currentScene: sceneId })
        }
      },

      advanceTime: () =>
        set((state) => engineAdvanceTime(state)),

      addItem: (itemId) =>
        set((state) => {
          if (state.inventory.includes(itemId)) return state
          return { inventory: [...state.inventory, itemId] }
        }),

      removeItem: (itemId) =>
        set((state) => ({
          inventory: state.inventory.filter(id => id !== itemId)
        })),

      addClue: (clueId) =>
        set((state) => {
          if (state.clues.includes(clueId)) return state
          return { clues: [...state.clues, clueId] }
        }),

      changeAffinity: (characterId, delta) =>
        set((state) => ({
          affinity: {
            ...state.affinity,
            [characterId]: changeAffinityValue(state.affinity[characterId] ?? 0, delta)
          }
        })),

      addDiaryEntry: (entry) =>
        set((state) => ({
          diary: [...state.diary, entry]
        })),

      addDocument: (docId) =>
        set((state) => {
          if (state.documents.includes(docId)) return state
          return { documents: [...state.documents, docId] }
        }),

      makeKeyChoice: (choice) =>
        set((state) => ({
          keyChoices: [...state.keyChoices, choice]
        })),

      completeScene: (sceneId) =>
        set((state) => {
          if (state.completedScenes.includes(sceneId)) return state
          return { completedScenes: [...state.completedScenes, sceneId] }
        }),

      visitLocation: (locationId) =>
        set((state) => {
          if (state.visitedLocations.includes(locationId)) return state
          return { visitedLocations: [...state.visitedLocations, locationId] }
        }),

      triggerEvent: (eventId) =>
        set((state) => {
          if (state.triggeredEvents.includes(eventId)) return state
          return { triggeredEvents: [...state.triggeredEvents, eventId] }
        }),

      unlockAchievement: (achievementId) =>
        set((state) => {
          if (state.unlockedAchievements.includes(achievementId)) return state
          return { unlockedAchievements: [...state.unlockedAchievements, achievementId] }
        }),

      setGamePhase: (phase) =>
        set({ gamePhase: phase }),

      setEndingType: (endingType) =>
        set({ endingType }),

      unlockEndingInMeta: (endingId) => {
        useMetaStore.getState().unlockEnding(endingId)
      },

      syncAchievementsToMeta: () => {
        const state = get()
        state.unlockedAchievements.forEach((achievementId) => {
          useMetaStore.getState().unlockAchievementGlobal(achievementId)
        })
      },

      updateClueBoard: (clueId, x, y, connections) =>
        set((state) => ({
          clueBoard: {
            ...state.clueBoard,
            [clueId]: { x, y, connections }
          }
        })),

      addClueBoardConnection: (fromId, toId) =>
        set((state) => {
          const fromEntry = state.clueBoard[fromId]
          if (!fromEntry) return state
          if (fromEntry.connections.includes(toId)) return state
          return {
            clueBoard: {
              ...state.clueBoard,
              [fromId]: {
                ...fromEntry,
                connections: [...fromEntry.connections, toId]
              }
            }
          }
        }),

      retryFromScene: (sceneId) =>
        set({ retryScene: sceneId }),

      resetForChapterReplay: (chapterId) =>
        set((state) => ({
          currentChapter: chapterId,
          completedScenes: state.completedScenes.filter(
            id => !id.startsWith(chapterId)
          ),
          keyChoices: state.keyChoices.filter(
            kc => kc.chapter !== chapterId
          ),
          retryScene: undefined
        }))
    }),
    {
      name: 'fog-harbor-save'
    }
  )
)
