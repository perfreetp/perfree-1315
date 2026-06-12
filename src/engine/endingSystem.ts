import type { GameState, EndingData } from '@/types'
import { getTotalAffinity } from './affinitySystem'

interface EndingEvaluation {
  ending: EndingData | null
  priority: number
}

const ENDING_PRIORITY: Record<string, number> = {
  'hidden-ending': 5,
  'true-ending': 4,
  'normal-a': 3,
  'normal-b': 2,
  'bad-ending': 1
}

const KEY_CLUES = [
  'manuscript-disappearance-truth',
  'writer-hermit-mystery',
  'secret-letter-content',
  'lighthouse-code-interpretation',
  'early-manuscript',
  'anonymous-letter-content'
]

const KEY_ITEMS = [
  'author-legacy',
  'secret-letter',
  'lighthouse-code',
  'complete-manuscript'
]

const HARBOR_CHARACTER_IDS = ['zhao-henian', 'lin-xueqing']

function evaluateEndingCondition(
  endingId: string,
  state: GameState
): boolean {
  const totalAffinity = getTotalAffinity(state.affinity)
  const collectedKeyClues = KEY_CLUES.filter(clue => state.clues.includes(clue))
  const collectedKeyItems = KEY_ITEMS.filter(item => state.inventory.includes(item))

  switch (endingId) {
    case 'hidden-ending':
      return (
        state.inventory.includes('author-legacy') &&
        state.triggeredEvents.includes('lighthouse-night-event') &&
        state.keyChoices.some(kc => kc.choiceId === 'ch2-s10-enter-lighthouse')
      )

    case 'true-ending':
      return (
        state.clues.includes('manuscript-disappearance-truth') &&
        state.clues.includes('writer-hermit-mystery') &&
        state.inventory.includes('author-legacy') &&
        (state.affinity['lin-xueqing'] ?? 0) >= 50 &&
        (state.affinity['he-zhenbang'] ?? 0) >= 50 &&
        state.keyChoices.some(kc => kc.choiceId === 'ch3-s9-trust-writer')
      )

    case 'normal-a':
      return (
        collectedKeyClues.length >= 4 &&
        state.inventory.includes('complete-manuscript')
      )

    case 'normal-b': {
      const harborAffinity = HARBOR_CHARACTER_IDS.reduce((sum, id) => {
        return sum + (state.affinity[id] || 0)
      }, 0)
      return (
        harborAffinity >= 60 &&
        state.clues.includes('dock-knot-mark') &&
        state.inventory.includes('logbook-fragment')
      )
    }

    case 'bad-ending':
      return (
        collectedKeyClues.length < 3 ||
        !state.inventory.includes('complete-manuscript')
      )

    default:
      return false
  }
}

export function determineEnding(state: GameState, allEndings: EndingData[]): EndingData | null {
  const candidates: EndingEvaluation[] = []

  for (const ending of allEndings) {
    if (evaluateEndingCondition(ending.id, state)) {
      const priority = ENDING_PRIORITY[ending.id] ?? 0
      candidates.push({ ending, priority })
    }
  }

  candidates.sort((a, b) => b.priority - a.priority)

  return candidates.length > 0 ? candidates[0].ending : null
}
