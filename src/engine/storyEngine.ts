import type { GameState, SceneData, SceneChoice, SceneEffect, DiaryEntry, TimeOfDay } from '@/types'
import { TIME_SLOTS, TIME_SLOT_NAMES } from '@/types'
import { changeAffinity as changeAffinityValue } from './affinitySystem'
import { advanceTime } from './timeSystem'
import { chapters } from '@/data/chapters'

export function resolveScene(sceneId: string, gameState: GameState): SceneData | null {
  for (const chapter of chapters) {
    for (const scene of chapter.scenes) {
      if (scene.id === sceneId) {
        if (scene.condition && !checkCondition(scene.condition, gameState)) {
          continue
        }
        return scene
      }
    }
  }
  return null
}

export function getSceneChapter(sceneId: string): string | null {
  for (const chapter of chapters) {
    for (const scene of chapter.scenes) {
      if (scene.id === sceneId) {
        return chapter.id
      }
    }
  }
  return null
}

export function applyEffects(effects: SceneEffect[], state: GameState): GameState {
  let newState = { ...state }

  for (const effect of effects) {
    switch (effect.type) {
      case 'addItem':
        if (!newState.inventory.includes(effect.target)) {
          newState.inventory = [...newState.inventory, effect.target]
        }
        break

      case 'addClue':
        if (!newState.clues.includes(effect.target)) {
          newState.clues = [...newState.clues, effect.target]
        }
        break

      case 'changeAffinity': {
        const current = newState.affinity[effect.target] ?? 0
        const delta = typeof effect.value === 'number' ? effect.value : 0
        newState.affinity = {
          ...newState.affinity,
          [effect.target]: changeAffinityValue(current, delta)
        }
        break
      }

      case 'addDiary': {
        const entry = generateDiaryEntry(
          'event',
          typeof effect.value === 'string' ? effect.value : effect.target,
          newState
        )
        newState.diary = [...newState.diary, entry]
        break
      }

      case 'unlockLocation':
        if (!newState.visitedLocations.includes(effect.target)) {
          newState.visitedLocations = [...newState.visitedLocations, effect.target]
        }
        break

      case 'triggerEvent':
        if (!newState.triggeredEvents.includes(effect.target)) {
          newState.triggeredEvents = [...newState.triggeredEvents, effect.target]
        }
        break

      case 'advanceTime':
        newState = advanceTime(newState)
        break
    }
  }

  return newState
}

export function makeChoice(choice: SceneChoice, state: GameState): { nextState: GameState; nextScene: string } {
  let nextState = { ...state }

  if (choice.isKey) {
    const keyChoice = {
      sceneId: state.currentScene,
      choiceId: choice.id,
      choiceText: choice.text,
      chapter: state.currentChapter
    }
    nextState.keyChoices = [...nextState.keyChoices, keyChoice]
  }

  if (choice.effects && choice.effects.length > 0) {
    nextState = applyEffects(choice.effects, nextState)
  }

  nextState.totalActions += 1

  return {
    nextState,
    nextScene: choice.nextScene
  }
}

export function checkCondition(condition: string, state: GameState): boolean {
  const [type, ...rest] = condition.split(':')
  const target = rest.join(':')

  switch (type) {
    case 'hasItem':
      return state.inventory.includes(target)

    case 'hasClue':
      return state.clues.includes(target)

    case 'affinityLevel': {
      const parts = target.split(',')
      if (parts.length < 2) return false
      const characterId = parts[0]
      const requiredValue = parseInt(parts[1], 10)
      return (state.affinity[characterId] ?? 0) >= requiredValue
    }

    case 'visitedLocation':
      return state.visitedLocations.includes(target)

    case 'triggeredEvent':
      return state.triggeredEvents.includes(target)

    default:
      return false
  }
}

export function generateDiaryEntry(
  type: DiaryEntry['type'],
  content: string,
  state: GameState
): DiaryEntry {
  return {
    id: `diary-${state.day}-${state.timeSlotIndex}-${Date.now()}`,
    day: state.day,
    timeSlot: state.timeSlot,
    content,
    type,
    timestamp: Date.now()
  }
}
