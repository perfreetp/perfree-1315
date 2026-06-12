import type { GameState, EndingData } from '@/types'
import { getTotalAffinity } from './affinitySystem'

interface EndingEvaluation {
  ending: EndingData | null
  priority: number
}

const ENDING_PRIORITY: Record<string, number> = {
  hidden: 5,
  true: 4,
  'normal-a': 3,
  'normal-b': 2,
  bad: 1
}

const KEY_CLUES = [
  'complete-manuscript',
  'lighthouse-code',
  'secret-letter',
  'author-final-draft'
]

const HARBOR_CHARACTER_IDS = ['harbor-master', 'fisherman', 'innkeeper']

function evaluateEndingCondition(
  endingId: string,
  state: GameState
): boolean {
  const totalAffinity = getTotalAffinity(state.affinity)
  const collectedKeyClues = KEY_CLUES.filter(clue => state.clues.includes(clue))
  const correctKeyChoices = state.keyChoices.filter(kc => !kc.consequence || kc.consequence === 'positive')

  switch (endingId) {
    case 'hidden':
      return state.triggeredEvents.includes('hidden-event-lighthouse-midnight')

    case 'true':
      return (
        collectedKeyClues.length === KEY_CLUES.length &&
        totalAffinity >= 200 &&
        correctKeyChoices.length >= 3
      )

    case 'normal-a':
      return (
        collectedKeyClues.length >= 3 &&
        totalAffinity >= 120
      )

    case 'normal-b': {
      const harborAffinity = HARBOR_CHARACTER_IDS.reduce((sum, id) => {
        return sum + (state.affinity[id] || 0)
      }, 0)
      return harborAffinity >= 150
    }

    case 'bad':
      return collectedKeyClues.length < 2

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
