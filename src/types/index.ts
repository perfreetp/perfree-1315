export type TimeOfDay = 'dawn' | 'afternoon' | 'dusk' | 'night'

export interface LocationData {
  id: string
  name: string
  description: string
  icon: string
  x: number
  y: number
  characterId?: string
  unlockCondition?: string
  scenes: string[]
}

export interface CharacterData {
  id: string
  name: string
  title: string
  description: string
  color: string
  dialogues: DialogueData[]
}

export interface DialogueData {
  id: string
  text: string
  options?: DialogueOption[]
  next?: string
  affinityChange?: number
  clueId?: string
  itemId?: string
  condition?: string
}

export interface DialogueOption {
  text: string
  next: string
  affinityChange: number
  isKey?: boolean
  clueId?: string
  itemId?: string
}

export interface ItemData {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
  combinableWith?: string
  combineResult?: string
  combineDescription?: string
}

export interface ClueData {
  id: string
  title: string
  content: string
  source: string
  category: 'document' | 'testimony' | 'physical' | 'deduction'
  color: string
}

export interface SceneChoice {
  id: string
  text: string
  isKey?: boolean
  nextScene: string
  effects?: SceneEffect[]
}

export interface SceneEffect {
  type: 'addItem' | 'addClue' | 'changeAffinity' | 'addDiary' | 'unlockLocation' | 'triggerEvent' | 'advanceTime'
  target: string
  value?: number | string
}

export interface SceneData {
  id: string
  locationId: string
  chapter: string
  title: string
  text: string[]
  choices?: SceneChoice[]
  onEnter?: SceneEffect[]
  condition?: string
  dialogue?: string
  isHidden?: boolean
}

export interface ChapterData {
  id: string
  name: string
  description: string
  startScene: string
  scenes: SceneData[]
}

export interface AchievementData {
  id: string
  name: string
  description: string
  icon: string
  condition: string
  isHidden?: boolean
}

export interface GameState {
  playerName: string
  currentChapter: string
  currentScene: string
  currentLocation: string
  day: number
  timeSlot: TimeOfDay
  timeSlotIndex: number
  totalActions: number
  inventory: string[]
  clues: string[]
  clueBoard: Record<string, { x: number; y: number; connections: string[] }>
  diary: DiaryEntry[]
  documents: string[]
  affinity: Record<string, number>
  visitedLocations: string[]
  completedScenes: string[]
  keyChoices: KeyChoice[]
  unlockedAchievements: string[]
  triggeredEvents: string[]
  gamePhase: 'title' | 'playing' | 'ending'
  endingType?: string
  retryScene?: string
}

export interface DiaryEntry {
  id: string
  day: number
  timeSlot: TimeOfDay
  content: string
  type: 'event' | 'discovery' | 'dialogue' | 'deduction'
  timestamp: number
}

export interface KeyChoice {
  sceneId: string
  choiceId: string
  choiceText: string
  chapter: string
  consequence?: string
}

export interface SaveSlot {
  id: number
  name: string
  timestamp: number
  day: number
  timeSlot: TimeOfDay
  location: string
  state: GameState
}

export interface EndingData {
  id: string
  name: string
  description: string
  condition: string
  epilogue: string[]
  isHidden?: boolean
}

export const TIME_SLOTS: TimeOfDay[] = ['dawn', 'afternoon', 'dusk', 'night']
export const TIME_SLOT_NAMES: Record<TimeOfDay, string> = {
  dawn: '清晨',
  afternoon: '午后',
  dusk: '黄昏',
  night: '深夜'
}
export const MAX_DAYS = 7
