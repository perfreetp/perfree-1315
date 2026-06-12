import { create } from 'zustand'

type AudioType = 'harbor' | 'rain' | 'quiet'

interface UIState {
  activeWindow: string
  openWindows: string[]
  windowPositions: Record<string, { x: number; y: number }>
  textHistory: string[]
  isTyping: boolean
  audioEnabled: boolean
  audioType: AudioType
  showSaveLoad: boolean
  showSettings: boolean
}

interface UIActions {
  openWindow: (windowId: string) => void
  closeWindow: (windowId: string) => void
  focusWindow: (windowId: string) => void
  setWindowPosition: (windowId: string, x: number, y: number) => void
  addToTextHistory: (text: string) => void
  clearTextHistory: () => void
  setTyping: (isTyping: boolean) => void
  toggleAudio: () => void
  setAudioType: (type: AudioType) => void
  toggleSaveLoad: () => void
  toggleSettings: () => void
}

type UIStore = UIState & UIActions

export const useUIStore = create<UIStore>()((set) => ({
  activeWindow: '',
  openWindows: [],
  windowPositions: {},
  textHistory: [],
  isTyping: false,
  audioEnabled: true,
  audioType: 'harbor',
  showSaveLoad: false,
  showSettings: false,

  openWindow: (windowId) =>
    set((state) => {
      if (state.openWindows.includes(windowId)) {
        return { activeWindow: windowId }
      }
      return {
        openWindows: [...state.openWindows, windowId],
        activeWindow: windowId
      }
    }),

  closeWindow: (windowId) =>
    set((state) => ({
      openWindows: state.openWindows.filter(id => id !== windowId),
      activeWindow: state.activeWindow === windowId
        ? state.openWindows[state.openWindows.length - 2] ?? ''
        : state.activeWindow
    })),

  focusWindow: (windowId) =>
    set({ activeWindow: windowId }),

  setWindowPosition: (windowId, x, y) =>
    set((state) => ({
      windowPositions: {
        ...state.windowPositions,
        [windowId]: { x, y }
      }
    })),

  addToTextHistory: (text) =>
    set((state) => ({
      textHistory: [...state.textHistory, text]
    })),

  clearTextHistory: () =>
    set({ textHistory: [] }),

  setTyping: (isTyping) =>
    set({ isTyping }),

  toggleAudio: () =>
    set((state) => ({ audioEnabled: !state.audioEnabled })),

  setAudioType: (type) =>
    set({ audioType: type }),

  toggleSaveLoad: () =>
    set((state) => ({ showSaveLoad: !state.showSaveLoad })),

  toggleSettings: () =>
    set((state) => ({ showSettings: !state.showSettings }))
}))
