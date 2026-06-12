import type { ItemData } from '@/types'
import { getAffinityLevel, type AffinityLevel } from './affinitySystem'

interface CombineRecipe {
  item1: string
  item2: string
  result: string
}

const COMBINE_RECIPES: CombineRecipe[] = [
  { item1: 'manuscript-fragment-a', item2: 'manuscript-fragment-b', result: 'complete-manuscript' },
  { item1: 'logbook-fragment', item2: 'codebook', result: 'lighthouse-code' },
  { item1: 'complete-manuscript', item2: 'printing-plate', result: 'secret-letter' },
  { item1: 'secret-letter', item2: 'lighthouse-code', result: 'author-legacy' }
]

const PUZZLE_HINTS: Record<string, Record<AffinityLevel, string>> = {
  'manuscript-puzzle': {
    stranger: '也许应该多收集一些碎片……',
    friendly: '手稿碎片似乎可以拼合，试试将它们放在一起。',
    trust: '两份残稿分别来自不同的章节，合在一起才能看到完整内容。',
    intimate: '作者故意将手稿拆成两部分藏在不同地方，这是保护真相的方式。'
  },
  'lighthouse-puzzle': {
    stranger: '灯塔似乎隐藏着什么秘密……',
    friendly: '航海日志和密码手册，也许可以一起解读？',
    trust: '航海日志中的坐标用密码手册的规则解码，就能得到灯塔的通行码。',
    intimate: '老灯塔守一直用那本密码手册记录真实的航海日志，解码后就是灯塔密码。'
  },
  'secret-letter-puzzle': {
    stranger: '有些文件看起来很特殊……',
    friendly: '完整手稿和印刷模板，似乎可以组合出什么。',
    trust: '完整手稿配合印刷模板，可以还原出一封密信的原始排版。',
    intimate: '那封密信就是作者最后的指控，印刷模板是它曾经被批量印刷的证据。'
  },
  'final-draft-puzzle': {
    stranger: '所有的线索似乎指向某个终局……',
    friendly: '密信和灯塔密码，也许这就是最后的拼图。',
    trust: '密信揭示了真相，灯塔密码指引了方向，两者合一就是作者的终稿。',
    intimate: '作者的终稿是他留给雾港的最后证词，密信是内容，灯塔是发布地。'
  }
}

export function tryCombine(item1Id: string, item2Id: string, allItems: ItemData[]): string | null {
  for (const recipe of COMBINE_RECIPES) {
    if (
      (item1Id === recipe.item1 && item2Id === recipe.item2) ||
      (item1Id === recipe.item2 && item2Id === recipe.item1)
    ) {
      const hasItem1 = allItems.some(item => item.id === recipe.item1)
      const hasItem2 = allItems.some(item => item.id === recipe.item2)
      if (hasItem1 && hasItem2) {
        return recipe.result
      }
    }
  }
  return null
}

export function checkPuzzleSolved(clues: string[]): boolean {
  const requiredClues = ['author-final-draft']
  return requiredClues.every(clue => clues.includes(clue))
}

export function getHint(puzzleId: string, affinityValue: number): string {
  const hints = PUZZLE_HINTS[puzzleId]
  if (!hints) return '……'
  const level = getAffinityLevel(affinityValue)
  return hints[level]
}
