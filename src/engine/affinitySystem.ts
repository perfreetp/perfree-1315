export type AffinityLevel = 'stranger' | 'friendly' | 'trust' | 'intimate'

const AFFINITY_LEVEL_NAMES: Record<AffinityLevel, string> = {
  stranger: '陌生',
  friendly: '友善',
  trust: '信任',
  intimate: '亲密'
}

const AFFINITY_THRESHOLDS: { level: AffinityLevel; min: number; max: number }[] = [
  { level: 'stranger', min: 0, max: 25 },
  { level: 'friendly', min: 26, max: 50 },
  { level: 'trust', min: 51, max: 75 },
  { level: 'intimate', min: 76, max: 100 }
]

const LEVEL_ORDER: AffinityLevel[] = ['stranger', 'friendly', 'trust', 'intimate']

export function getAffinityLevel(value: number): AffinityLevel {
  for (const threshold of AFFINITY_THRESHOLDS) {
    if (value >= threshold.min && value <= threshold.max) {
      return threshold.level
    }
  }
  return 'stranger'
}

export function getAffinityLevelName(level: AffinityLevel): string {
  return AFFINITY_LEVEL_NAMES[level]
}

export function changeAffinity(currentValue: number, delta: number): number {
  return Math.max(0, Math.min(100, currentValue + delta))
}

export function getTotalAffinity(affinityRecord: Record<string, number>): number {
  return Object.values(affinityRecord).reduce((sum, value) => sum + value, 0)
}

export function canUnlockDialogue(currentLevel: AffinityLevel, requiredLevel: AffinityLevel): boolean {
  const currentIndex = LEVEL_ORDER.indexOf(currentLevel)
  const requiredIndex = LEVEL_ORDER.indexOf(requiredLevel)
  return currentIndex >= requiredIndex
}
