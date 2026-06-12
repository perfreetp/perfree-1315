import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link2, StickyNote, RotateCcw, LayoutGrid, Pin } from 'lucide-react'
import Window from '@/components/ui/Window'
import Button from '@/components/ui/Button'
import { useGameStore } from '@/store/gameStore'
import { clues as allClues } from '@/data/clues'
import { cn } from '@/lib/utils'

const CATEGORY_LABELS: Record<string, string> = {
  document: '文献',
  testimony: '证词',
  physical: '物证',
  deduction: '推理',
}

const CATEGORY_COLORS: Record<string, string> = {
  document: 'bg-paper/20 text-paper',
  testimony: 'bg-harbor/20 text-harbor-light',
  physical: 'bg-emerald-900/30 text-emerald-400',
  deduction: 'bg-crimson/20 text-crimson-light',
}

const CARD_WIDTH = 180
const CARD_HEIGHT = 130
const GRID_COLS = 3
const GRID_GAP = 20
const GRID_OFFSET_X = 30
const GRID_OFFSET_Y = 70

function getCardRotation(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0
  }
  return ((hash % 6) - 3)
}

export default function ClueBoardWindow() {
  const { clues: collectedClueIds, clueBoard, updateClueBoard, addClueBoardConnection } = useGameStore()
  const [connectMode, setConnectMode] = useState(false)
  const [selectedClue, setSelectedClue] = useState<string | null>(null)
  const [showNotes, setShowNotes] = useState(false)
  const [noteText, setNoteText] = useState('')

  const collectedClues = useMemo(
    () => allClues.filter(c => collectedClueIds.includes(c.id)),
    [collectedClueIds]
  )

  const getCardPosition = useCallback((clueId: string, index: number) => {
    const existing = clueBoard[clueId]
    if (existing) return { x: existing.x, y: existing.y }
    const col = index % GRID_COLS
    const row = Math.floor(index / GRID_COLS)
    return {
      x: GRID_OFFSET_X + col * (CARD_WIDTH + GRID_GAP),
      y: GRID_OFFSET_Y + row * (CARD_HEIGHT + GRID_GAP),
    }
  }, [clueBoard])

  const handleDragEnd = useCallback((clueId: string, _: unknown, info: { point: { x: number; y: number } }) => {
    const existing = clueBoard[clueId]
    const prevPos = existing ?? { x: 0, y: 0, connections: [] }
    const containerRect = document.querySelector('.cork-board-area')?.getBoundingClientRect()
    const offsetX = containerRect ? info.point.x - containerRect.left : info.point.x
    const offsetY = containerRect ? info.point.y - containerRect.top : info.point.y
    updateClueBoard(clueId, offsetX, offsetY, prevPos.connections)
  }, [clueBoard, updateClueBoard])

  const handleCardClick = useCallback((clueId: string) => {
    if (!connectMode) return
    if (!selectedClue) {
      setSelectedClue(clueId)
    } else if (selectedClue !== clueId) {
      addClueBoardConnection(selectedClue, clueId)
      addClueBoardConnection(clueId, selectedClue)
      setSelectedClue(null)
    } else {
      setSelectedClue(null)
    }
  }, [connectMode, selectedClue, addClueBoardConnection])

  const handleResetPositions = useCallback(() => {
    collectedClues.forEach((clue, index) => {
      const col = index % GRID_COLS
      const row = Math.floor(index / GRID_COLS)
      const existing = clueBoard[clue.id]
      updateClueBoard(
        clue.id,
        GRID_OFFSET_X + col * (CARD_WIDTH + GRID_GAP),
        GRID_OFFSET_Y + row * (CARD_HEIGHT + GRID_GAP),
        existing?.connections ?? []
      )
    })
  }, [collectedClues, clueBoard, updateClueBoard])

  const handleAutoArrange = handleResetPositions

  const connections = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
    const seen = new Set<string>()
    collectedClues.forEach((clue, index) => {
      const pos = getCardPosition(clue.id, index)
      const entry = clueBoard[clue.id]
      if (!entry) return
      entry.connections.forEach(targetId => {
        const key = [clue.id, targetId].sort().join('-')
        if (seen.has(key)) return
        seen.add(key)
        const targetIndex = collectedClues.findIndex(c => c.id === targetId)
        if (targetIndex < 0) return
        const targetPos = getCardPosition(targetId, targetIndex)
        lines.push({
          x1: pos.x + CARD_WIDTH / 2,
          y1: pos.y + CARD_HEIGHT / 2,
          x2: targetPos.x + CARD_WIDTH / 2,
          y2: targetPos.y + CARD_HEIGHT / 2,
        })
      })
    })
    return lines
  }, [collectedClues, clueBoard, getCardPosition])

  if (collectedClues.length === 0) {
    return (
      <Window title="线索板" id="clueboard" width={700} height={500}>
        <div className="cork-board flex h-full items-center justify-center">
          <p className="font-display text-lg text-cork/70">尚无线索，继续探索吧</p>
        </div>
      </Window>
    )
  }

  return (
    <Window title="线索板" id="clueboard" width={700} height={500}>
      <div className="cork-board relative h-full overflow-hidden">
        <div className="cork-board-area relative h-full w-full">
          <div className="absolute inset-0 cork-board" />

          <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full">
            {connections.map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#d4b896"
                strokeWidth={1.5}
                strokeDasharray="6 4"
                opacity={0.5}
              />
            ))}
          </svg>

          <div className="absolute inset-0 z-20">
            {collectedClues.map((clue, index) => {
              const pos = getCardPosition(clue.id, index)
              const rotation = getCardRotation(clue.id)
              const isSelected = selectedClue === clue.id
              return (
                <motion.div
                  key={clue.id}
                  className={cn(
                    'clue-card absolute w-[180px] cursor-grab active:cursor-grabbing',
                    isSelected && 'ring-2 ring-gold',
                    connectMode && 'cursor-pointer'
                  )}
                  style={{ rotate: `${rotation}deg` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ x: pos.x, y: pos.y, scale: 1, opacity: 1 }}
                  drag={connectMode ? false : true}
                  dragMomentum={false}
                  onDragEnd={(_, info) => handleDragEnd(clue.id, _, info)}
                  onClick={() => handleCardClick(clue.id)}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <div className="mb-1 flex items-start justify-between">
                    <Pin
                      size={12}
                      className="mt-0.5 text-crimson animate-pin-wobble"
                    />
                    <span
                      className={cn(
                        'rounded px-1.5 py-0.5 text-[10px] font-body',
                        CATEGORY_COLORS[clue.category] ?? 'bg-ink-600 text-fog'
                      )}
                    >
                      {CATEGORY_LABELS[clue.category] ?? clue.category}
                    </span>
                  </div>
                  <h4 className="font-display text-sm text-paper leading-tight mb-1">
                    {clue.title}
                  </h4>
                  <p className="line-clamp-2 text-xs text-fog leading-relaxed">
                    {clue.content}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="absolute left-0 right-0 top-0 z-30 flex items-center gap-1.5 border-b border-ink-600 bg-ink-800/90 px-3 py-1.5 backdrop-blur-sm">
          <Button
            variant={connectMode ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => {
              setConnectMode(!connectMode)
              setSelectedClue(null)
            }}
          >
            <Link2 size={14} />
            连接模式
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowNotes(!showNotes)}
          >
            <StickyNote size={14} />
            笔记
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleResetPositions}
          >
            <RotateCcw size={14} />
            重置位置
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAutoArrange}
          >
            <LayoutGrid size={14} />
            自动排列
          </Button>
          {connectMode && (
            <span className="ml-auto text-xs text-gold">
              {selectedClue ? '请点击第二张线索卡' : '请点击第一张线索卡'}
            </span>
          )}
        </div>

        {showNotes && (
          <div className="absolute bottom-3 left-3 z-40 w-64">
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="在此记录你的推理..."
              className="old-paper h-40 w-full resize-none rounded-lg p-3 text-sm text-paper placeholder:text-fog-dim focus:outline-none focus:ring-1 focus:ring-gold/30"
            />
          </div>
        )}
      </div>
    </Window>
  )
}
