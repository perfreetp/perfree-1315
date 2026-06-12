import type { GameState, TimeOfDay } from '@/types'
import { TIME_SLOTS, TIME_SLOT_NAMES, MAX_DAYS } from '@/types'

export function advanceTime(state: GameState): GameState {
  let nextSlotIndex = state.timeSlotIndex + 1
  let nextDay = state.day
  let nextTimeSlot: TimeOfDay = state.timeSlot
  let gamePhase = state.gamePhase

  if (nextSlotIndex >= TIME_SLOTS.length) {
    nextSlotIndex = 0
    nextDay += 1
  }

  if (nextDay > MAX_DAYS) {
    gamePhase = 'ending'
  }

  nextTimeSlot = TIME_SLOTS[nextSlotIndex]

  return {
    ...state,
    day: nextDay,
    timeSlotIndex: nextSlotIndex,
    timeSlot: nextTimeSlot,
    totalActions: state.totalActions + 1,
    gamePhase
  }
}

export function getTimeDisplay(day: number, timeSlotIndex: number): string {
  const timeSlot = TIME_SLOTS[timeSlotIndex]
  const timeName = TIME_SLOT_NAMES[timeSlot]
  return `第${day}天 ${timeName}`
}

export function isTimeUp(day: number, timeSlotIndex: number): boolean {
  return day > MAX_DAYS
}
