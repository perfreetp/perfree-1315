import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, FolderOpen, Trash2, AlertTriangle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useGameStore } from '@/store/gameStore'
import { chapters } from '@/data/chapters'
import { locations } from '@/data/locations'
import { TIME_SLOT_NAMES } from '@/types'
import type { GameState } from '@/types'
import { cn } from '@/lib/utils'

interface SaveData {
  id: number
  name: string
  timestamp: number
  chapterName: string
  locationName: string
  day: number
  timeSlotIndex: number
  state: GameState
}

interface SaveLoadModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'save' | 'load'
}

interface ConfirmDialog {
  type: 'overwrite' | 'delete' | 'load'
  slotId: number
  slotName: string
}

const SLOT_COUNT = 3
const STORAGE_KEY_PREFIX = 'fog-harbor-slot-'

function loadSlot(slotId: number): SaveData | null {
  try {
    const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}${slotId}`)
    if (!data) return null
    return JSON.parse(data) as SaveData
  } catch {
    return null
  }
}

function saveSlot(slotId: number, data: SaveData): void {
  localStorage.setItem(`${STORAGE_KEY_PREFIX}${slotId}`, JSON.stringify(data))
}

function deleteSlot(slotId: number): void {
  localStorage.removeItem(`${STORAGE_KEY_PREFIX}${slotId}`)
}

function formatTimestamp(ts: number): string {
  const date = new Date(ts)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return '刚刚'
  if (diffMins < 60) return `${diffMins}分钟前`
  if (diffHours < 24) return `${diffHours}小时前`
  if (diffDays < 7) return `${diffDays}天前`

  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getTimeSlotName(index: number): string {
  const keys = Object.keys(TIME_SLOT_NAMES) as Array<keyof typeof TIME_SLOT_NAMES>
  return TIME_SLOT_NAMES[keys[index] ?? 'dawn']
}

export default function SaveLoadModal({ isOpen, onClose, mode }: SaveLoadModalProps) {
  const [slots, setSlots] = useState<(SaveData | null)[]>([])
  const [slotNames, setSlotNames] = useState<string[]>(['', '', ''])
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog | null>(null)

  const gameState = useGameStore.getState()
  const setGamePhase = useGameStore((state) => state.setGamePhase)
  const loadGame = useGameStore((state) => state.loadGame)

  useEffect(() => {
    if (isOpen) {
      const loadedSlots = Array.from({ length: SLOT_COUNT }, (_, i) => loadSlot(i))
      setSlots(loadedSlots)
      setSlotNames(loadedSlots.map(s => s?.name ?? ''))
    }
  }, [isOpen])

  const refreshSlots = () => {
    const loadedSlots = Array.from({ length: SLOT_COUNT }, (_, i) => loadSlot(i))
    setSlots(loadedSlots)
  }

  const getCurrentChapterName = (): string => {
    const chapter = chapters.find(c => c.id === gameState.currentChapter)
    return chapter?.name ?? '未知章节'
  }

  const getCurrentLocationName = (): string => {
    const location = locations.find(l => l.id === gameState.currentLocation)
    return location?.name ?? '未知地点'
  }

  const handleSave = (slotId: number) => {
    const existingSlot = slots[slotId]
    const customName = slotNames[slotId].trim() || `存档 ${slotId + 1}`

    if (existingSlot) {
      setConfirmDialog({
        type: 'overwrite',
        slotId,
        slotName: existingSlot.name
      })
      return
    }

    doSave(slotId, customName)
  }

  const doSave = (slotId: number, customName: string) => {
    const currentState = useGameStore.getState()
    const saveData: SaveData = {
      id: slotId,
      name: customName,
      timestamp: Date.now(),
      chapterName: getCurrentChapterName(),
      locationName: getCurrentLocationName(),
      day: currentState.day,
      timeSlotIndex: currentState.timeSlotIndex,
      state: { ...currentState }
    }

    saveSlot(slotId, saveData)
    refreshSlots()
    setConfirmDialog(null)
  }

  const handleLoad = (slotId: number) => {
    const slot = slots[slotId]
    if (!slot) return

    setConfirmDialog({
      type: 'load',
      slotId,
      slotName: slot.name
    })
  }

  const doLoad = (slotId: number) => {
    const slot = slots[slotId]
    if (!slot) return

    loadGame(slot.state)
    setGamePhase('playing')
    setConfirmDialog(null)
    onClose()
  }

  const handleDelete = (slotId: number) => {
    const slot = slots[slotId]
    if (!slot) return

    setConfirmDialog({
      type: 'delete',
      slotId,
      slotName: slot.name
    })
  }

  const doDelete = (slotId: number) => {
    deleteSlot(slotId)
    refreshSlots()
    setSlotNames(prev => {
      const newNames = [...prev]
      newNames[slotId] = ''
      return newNames
    })
    setConfirmDialog(null)
  }

  const handleConfirm = () => {
    if (!confirmDialog) return

    switch (confirmDialog.type) {
      case 'overwrite':
        doSave(confirmDialog.slotId, slotNames[confirmDialog.slotId].trim() || `存档 ${confirmDialog.slotId + 1}`)
        break
      case 'delete':
        doDelete(confirmDialog.slotId)
        break
      case 'load':
        doLoad(confirmDialog.slotId)
        break
    }
  }

  const handleSlotNameChange = (slotId: number, name: string) => {
    setSlotNames(prev => {
      const newNames = [...prev]
      newNames[slotId] = name
      return newNames
    })
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={mode === 'save' ? '保存游戏' : '读取游戏'}
        size="lg"
      >
        <div className="space-y-4">
          {slots.map((slot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'p-4 rounded-lg border transition-all',
                slot
                  ? 'border-ink-600 bg-ink-800/60'
                  : 'border-ink-700/50 bg-ink-800/30'
              )}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-ink-700/50 text-paper font-display text-sm">
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  {mode === 'save' && (
                    <input
                      type="text"
                      value={slotNames[index]}
                      onChange={(e) => handleSlotNameChange(index, e.target.value)}
                      placeholder={slot?.name || `存档 ${index + 1}`}
                      maxLength={20}
                      className="w-full px-3 py-1.5 mb-2 bg-ink-700/50 border border-ink-600 rounded text-sm text-paper placeholder-fog-dim focus:outline-none focus:border-gold/50 font-body"
                    />
                  )}

                  {slot ? (
                    <>
                      {mode === 'load' && (
                        <h4 className="font-display text-paper text-sm mb-1">
                          {slot.name}
                        </h4>
                      )}
                      <div className="space-y-1 text-xs">
                        <p className="text-fog">
                          {slot.chapterName}
                        </p>
                        <p className="text-fog-dim">
                          {slot.locationName} · 第{slot.day}天 · {getTimeSlotName(slot.timeSlotIndex)}
                        </p>
                        <p className="text-fog-dim/70">
                          {formatTimestamp(slot.timestamp)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="text-fog-dim text-sm py-2">
                      空存档位
                    </p>
                  )}
                </div>

                <div className="flex-shrink-0 flex items-center gap-2">
                  {mode === 'save' ? (
                    <Button
                      variant={slot ? 'secondary' : 'primary'}
                      size="sm"
                      onClick={() => handleSave(index)}
                      disabled={gameState.gamePhase !== 'playing' && gameState.gamePhase !== 'ending'}
                    >
                      <Save size={14} />
                      保存
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleLoad(index)}
                        disabled={!slot}
                      >
                        <FolderOpen size={14} />
                        读取
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(index)}
                        disabled={!slot}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          <div className="pt-2 text-center text-xs text-fog-dim">
            {mode === 'save'
              ? '选择一个存档位保存当前进度'
              : '选择一个存档位读取游戏进度'}
          </div>
        </div>
      </Modal>

      <AnimatePresence>
        {confirmDialog && (
          <Modal
            isOpen={!!confirmDialog}
            onClose={() => setConfirmDialog(null)}
            title={
              confirmDialog.type === 'overwrite' ? '确认覆盖'
              : confirmDialog.type === 'delete' ? '确认删除'
              : '确认读取'
            }
            size="sm"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-crimson/20 shrink-0">
                  <AlertTriangle size={20} className="text-crimson-light" />
                </div>
                <div>
                  {confirmDialog.type === 'overwrite' && (
                    <p className="text-sm text-fog">
                      确定要覆盖存档「{confirmDialog.slotName}」吗？此操作无法撤销。
                    </p>
                  )}
                  {confirmDialog.type === 'delete' && (
                    <p className="text-sm text-fog">
                      确定要删除存档「{confirmDialog.slotName}」吗？此操作无法撤销。
                    </p>
                  )}
                  {confirmDialog.type === 'load' && (
                    <p className="text-sm text-fog">
                      确定要读取存档「{confirmDialog.slotName}」吗？当前未保存的进度将会丢失。
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmDialog(null)}
                >
                  取消
                </Button>
                <Button
                  variant={confirmDialog.type === 'delete' ? 'danger' : 'primary'}
                  size="sm"
                  onClick={handleConfirm}
                >
                  {confirmDialog.type === 'overwrite' ? '覆盖'
                  : confirmDialog.type === 'delete' ? '删除'
                  : '读取'}
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
