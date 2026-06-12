import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Play, Star, Home, BookOpen } from 'lucide-react'
import Window from '@/components/ui/Window'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useGameStore } from '@/store/gameStore'
import { endings as allEndings } from '@/data/endings'
import { chapters } from '@/data/chapters'
import { cn } from '@/lib/utils'

type TabId = 'gallery' | 'replay' | 'choices'

const TABS: { id: TabId; label: string }[] = [
  { id: 'gallery', label: '结局画廊' },
  { id: 'replay', label: '章节重玩' },
  { id: 'choices', label: '选择回顾' },
]

const ENDING_GRADIENTS: Record<string, string> = {
  'true-ending': 'from-gold/30 via-amber-900/20 to-ink-700',
  'normal-a': 'from-harbor/20 via-slate-800/30 to-ink-700',
  'normal-b': 'from-blue-900/30 via-slate-800/20 to-ink-700',
  'bad-ending': 'from-crimson/20 via-gray-900/30 to-ink-700',
  'hidden-ending': 'from-purple-900/30 via-indigo-900/20 to-ink-700',
}

const CHAPTER_IDS = ['chapter-1', 'chapter-2', 'chapter-3']

function EndingGalleryTab() {
  const { endingType } = useGameStore()
  const [epilogueEnding, setEpilogueEnding] = useState<string | null>(null)
  const epilogueData = epilogueEnding ? allEndings.find(e => e.id === epilogueEnding) : null

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        {allEndings.map((ending) => {
          const isUnlocked = ending.id === endingType
          const isHidden = ending.isHidden && !isUnlocked
          if (isHidden) return null
          const isTrueEnding = ending.id === 'true-ending'
          return (
            <motion.div
              key={ending.id}
              className={cn(
                'overflow-hidden rounded-lg border transition-all',
                isUnlocked
                  ? 'border-gold/40 shadow-lg shadow-gold/10'
                  : 'border-ink-600',
                isTrueEnding && isUnlocked && 'col-span-2'
              )}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className={cn(
                  'h-24 bg-gradient-to-br',
                  isUnlocked
                    ? ENDING_GRADIENTS[ending.id] ?? 'from-ink-700 to-ink-800'
                    : 'from-ink-800 to-ink-900'
                )}
              >
                {isUnlocked ? (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen size={isTrueEnding ? 32 : 24} className="text-gold/60" />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Lock size={20} className="text-fog-dim/40" />
                  </div>
                )}
              </div>
              <div className="bg-ink-800 p-3">
                <h4 className={cn(
                  'font-display text-sm mb-1',
                  isUnlocked ? 'text-paper' : 'text-fog-dim'
                )}>
                  {isUnlocked ? ending.name : '???'}
                </h4>
                <p className={cn(
                  'text-xs leading-relaxed',
                  isUnlocked ? 'text-fog' : 'text-fog-dim/50'
                )}>
                  {isUnlocked ? ending.description : '???'}
                </p>
                {isUnlocked && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => setEpilogueEnding(ending.id)}
                  >
                    查看尾声
                  </Button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <Modal
        isOpen={!!epilogueData}
        onClose={() => setEpilogueEnding(null)}
        title={epilogueData?.name}
      >
        {epilogueData && (
          <div className="space-y-4">
            {epilogueData.epilogue.map((para, i) => (
              <p key={i} className="text-sm text-paper leading-relaxed">{para}</p>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}

function ChapterReplayTab() {
  const { resetForChapterReplay } = useGameStore()
  const [confirmChapter, setConfirmChapter] = useState<string | null>(null)
  const confirmData = confirmChapter ? chapters.find(c => c.id === confirmChapter) : null

  return (
    <div className="p-4">
      <div className="space-y-3">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="old-paper flex items-center justify-between rounded-lg p-4"
          >
            <div>
              <h4 className="font-display text-sm text-gold mb-1">{chapter.name}</h4>
              <p className="text-xs text-fog-dim leading-relaxed">{chapter.description}</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setConfirmChapter(chapter.id)}
            >
              <Play size={14} />
              重玩
            </Button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!confirmData}
        onClose={() => setConfirmChapter(null)}
        title="确认重玩"
      >
        {confirmData && (
          <div>
            <p className="mb-4 text-sm text-fog">
              确定要重玩「{confirmData.name}」吗？该章节的进度和关键选择将被重置，但全局成就会保留。
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setConfirmChapter(null)}>
                取消
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  resetForChapterReplay(confirmData.id)
                  setConfirmChapter(null)
                }}
              >
                确认重玩
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function ChoiceReviewTab() {
  const { keyChoices, endingType } = useGameStore()
  const chapterNameMap = Object.fromEntries(
    chapters.map(c => [c.id, c.name])
  )

  if (keyChoices.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="font-display text-fog-dim">尚未做出关键选择</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4">
      {keyChoices.map((choice, index) => {
        const isHighlighted = choice.sceneId.includes('ch3') && endingType
        return (
          <motion.div
            key={`${choice.sceneId}-${choice.choiceId}`}
            className={cn(
              'relative border-l-2 pl-4 py-2',
              isHighlighted ? 'border-gold' : 'border-ink-500'
            )}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="mb-1 text-xs text-fog-dim">
              {chapterNameMap[choice.chapter] ?? choice.chapter}
            </div>
            <div className="flex items-start gap-1.5">
              <Star size={12} className="mt-1 shrink-0 text-gold" />
              <div>
                <p className="text-sm text-paper">{choice.choiceText}</p>
                {choice.consequence && (
                  <p className="mt-1 text-xs text-fog-dim">{choice.consequence}</p>
                )}
              </div>
            </div>
            {isHighlighted && (
              <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold" />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export default function EndingWindow() {
  const { gamePhase, setGamePhase } = useGameStore()
  const [activeTab, setActiveTab] = useState<TabId>('gallery')

  if (gamePhase !== 'ending') return null

  return (
    <Window title="结局回顾" id="ending">
      <div className="flex h-full flex-col">
        <div className="flex border-b border-ink-600 bg-ink-800">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 px-4 py-2 text-sm font-body transition-colors',
                activeTab === tab.id
                  ? 'border-b-2 border-gold text-gold'
                  : 'text-fog-dim hover:text-paper'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-auto">
          {activeTab === 'gallery' && <EndingGalleryTab />}
          {activeTab === 'replay' && <ChapterReplayTab />}
          {activeTab === 'choices' && <ChoiceReviewTab />}
        </div>
        <div className="border-t border-ink-600 p-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => setGamePhase('title')}
          >
            <Home size={14} />
            返回标题
          </Button>
        </div>
      </div>
    </Window>
  )
}
