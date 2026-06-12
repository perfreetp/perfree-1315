import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus } from 'lucide-react'
import Window from '@/components/ui/Window'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useGameStore } from '@/store/gameStore'
import { useUIStore } from '@/store/uiStore'
import { items } from '@/data/items'
import { tryCombine } from '@/engine/puzzleSystem'
import { generateDiaryEntry } from '@/engine/storyEngine'
import { cn } from '@/lib/utils'
import type { ItemData } from '@/types'

type TabType = 'inventory' | 'combine'

const RARITY_BORDER_CLASSES: Record<ItemData['rarity'], string> = {
  common: 'border-paper-600',
  uncommon: 'border-harbor-500',
  rare: 'border-gold-500',
  legendary: 'border-crimson-500'
}

const RARITY_NAMES: Record<ItemData['rarity'], string> = {
  common: '普通',
  uncommon: '稀有',
  rare: '珍贵',
  legendary: '传说'
}

const ACHIEVEMENT_MAP: Record<string, string> = {
  'complete-manuscript': 'pages-united',
  'lighthouse-code': 'code-breaker',
  'author-legacy': 'legacy-revealed'
}

export default function ItemWindow() {
  const {
    inventory,
    addItem,
    removeItem,
    unlockAchievement,
    addDiaryEntry,
    unlockedAchievements
  } = useGameStore()

  const { closeWindow } = useUIStore()

  const [activeTab, setActiveTab] = useState<TabType>('inventory')
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null)
  const [combineSlot1, setCombineSlot1] = useState<string | null>(null)
  const [combineSlot2, setCombineSlot2] = useState<string | null>(null)
  const [combineResult, setCombineResult] = useState<string | null>(null)
  const [combineMessage, setCombineMessage] = useState<string>('')
  const [isCombineAnimating, setIsCombineAnimating] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [hasCombined, setHasCombined] = useState(false)

  const inventoryItems = inventory
    .map(id => items.find(item => item.id === id))
    .filter((item): item is ItemData => item !== undefined)

  const combinableItems = inventoryItems.filter(item => item.combinableWith)

  const allSlots = Array(12).fill(null)

  const handleItemClick = useCallback((item: ItemData) => {
    setSelectedItem(item)
  }, [])

  const handleCombineItemClick = useCallback((itemId: string) => {
    if (combineSlot1 === itemId || combineSlot2 === itemId) return

    if (!combineSlot1) {
      setCombineSlot1(itemId)
    } else if (!combineSlot2) {
      setCombineSlot2(itemId)
    }
  }, [combineSlot1, combineSlot2])

  const clearSlot1 = useCallback(() => {
    setCombineSlot1(null)
    setCombineResult(null)
    setCombineMessage('')
  }, [])

  const clearSlot2 = useCallback(() => {
    setCombineSlot2(null)
    setCombineResult(null)
    setCombineMessage('')
  }, [])

  const handleTryCombine = useCallback(() => {
    if (!combineSlot1 || !combineSlot2) return

    const result = tryCombine(combineSlot1, combineSlot2, items)

    if (result) {
      setIsCombineAnimating(true)

      setTimeout(() => {
        removeItem(combineSlot1)
        removeItem(combineSlot2)
        addItem(result)

        const item1 = items.find(i => i.id === combineSlot1)
        const item2 = items.find(i => i.id === combineSlot2)
        const resultItem = items.find(i => i.id === result)

        const description = resultItem?.combineDescription || '组合成功！'
        setCombineResult(result)
        setCombineMessage(description)

        const diaryEntry = generateDiaryEntry(
          'discovery',
          description,
          useGameStore.getState()
        )
        addDiaryEntry(diaryEntry)

        if (!hasCombined) {
          unlockAchievement('pages-united')
          setHasCombined(true)
        }

        const achievementId = ACHIEVEMENT_MAP[result]
        if (achievementId && !unlockedAchievements.includes(achievementId)) {
          unlockAchievement(achievementId)
        }

        setIsCombineAnimating(false)
        setCombineSlot1(null)
        setCombineSlot2(null)
        setTimeout(() => {
          setCombineResult(null)
          setCombineMessage('')
        }, 2000)
      }, 800)
    } else {
      setIsShaking(true)
      setCombineMessage('这两件物品似乎无法组合...')
      setTimeout(() => {
        setIsShaking(false)
      }, 500)
    }
  }, [combineSlot1, combineSlot2, removeItem, addItem, addDiaryEntry, unlockAchievement, hasCombined, unlockedAchievements])

  const renderItemCard = (item: ItemData, index: number, isSelectable: boolean = true, isSelected: boolean = false) => (
    <motion.div
      key={`${item.id}-${index}`}
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => isSelectable && handleItemClick(item)}
      className={cn(
        'relative flex flex-col items-center justify-center p-2 rounded-lg border-2 cursor-pointer transition-all',
        'bg-ink-800/50 hover:bg-ink-700/50',
        RARITY_BORDER_CLASSES[item.rarity],
        item.rarity === 'legendary' && 'animate-pulse-glow',
        isSelected && 'ring-2 ring-gold-400 ring-offset-2 ring-offset-ink-900'
      )}
    >
      <span className="text-2xl mb-1">{item.icon}</span>
      <span className="text-xs text-paper text-center truncate w-full">{item.name}</span>
    </motion.div>
  )

  const renderEmptySlot = (index: number) => (
    <div
      key={`empty-${index}`}
      className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-dashed border-ink-600/30 bg-ink-800/20"
    >
      <Plus size={16} className="text-ink-600/50 mb-1" />
      <span className="text-[10px] text-ink-600/50">空</span>
    </div>
  )

  const renderCombineSlot = (slotId: string | null, onClear: () => void, label: string) => {
    const item = slotId ? items.find(i => i.id === slotId) : null

    return (
      <div className="relative">
        <motion.div
          animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.3 }}
          className={cn(
            'w-20 h-20 flex flex-col items-center justify-center rounded-lg border-2 transition-all',
            item
              ? cn('bg-ink-800/50', RARITY_BORDER_CLASSES[item.rarity])
              : 'border-dashed border-ink-600/50 bg-ink-800/20'
          )}
        >
          {item ? (
            <>
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-[10px] text-paper text-center truncate w-full px-1">{item.name}</span>
            </>
          ) : (
            <span className="text-xs text-ink-600/50">{label}</span>
          )}
        </motion.div>
        {item && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-ink-700 text-fog-dim hover:text-crimson-light transition-colors"
          >
            <X size={12} />
          </button>
        )}
      </div>
    )
  }

  const renderResultSlot = () => {
    const item = combineResult ? items.find(i => i.id === combineResult) : null

    return (
      <motion.div
        animate={isCombineAnimating ? { scale: [1, 1.3, 1], opacity: [0.5, 1, 1] } : {}}
        transition={{ duration: 0.5 }}
        className={cn(
          'w-20 h-20 flex flex-col items-center justify-center rounded-lg border-2 transition-all',
          item
            ? cn('bg-ink-800/50', RARITY_BORDER_CLASSES[item.rarity])
            : 'border-dashed border-ink-600/50 bg-ink-800/20'
        )}
      >
        {item ? (
          <>
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className="text-[10px] text-paper text-center truncate w-full px-1">{item.name}</span>
          </>
        ) : (
          <span className="text-xs text-ink-600/50">结果</span>
        )}
      </motion.div>
    )
  }

  return (
    <>
      <Window title="物品" id="items" width={600} height={500}>
        <div className="flex h-full flex-col">
          <div className="mb-4 flex gap-4 border-b border-ink-600/30">
            <button
              onClick={() => setActiveTab('inventory')}
              className={cn(
                'pb-2 px-1 font-display text-sm transition-colors relative',
                activeTab === 'inventory'
                  ? 'text-paper'
                  : 'text-fog-dim hover:text-paper'
              )}
            >
              物品栏
              {activeTab === 'inventory' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-paper"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('combine')}
              className={cn(
                'pb-2 px-1 font-display text-sm transition-colors relative',
                activeTab === 'combine'
                  ? 'text-paper'
                  : 'text-fog-dim hover:text-paper'
              )}
            >
              组合
              {activeTab === 'combine' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-paper"
                />
              )}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'inventory' && (
              <motion.div
                key="inventory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col"
              >
                <div className="grid grid-cols-4 gap-3 flex-1">
                  <AnimatePresence>
                    {allSlots.map((_, index) => {
                      const item = inventoryItems[index]
                      return item
                        ? renderItemCard(item, index)
                        : renderEmptySlot(index)
                    })}
                  </AnimatePresence>
                </div>

                <div className="mt-4 pt-3 border-t border-ink-600/30 text-center">
                  <span className="text-sm text-fog-dim">
                    已收集: {inventory.length} / 14
                  </span>
                </div>
              </motion.div>
            )}

            {activeTab === 'combine' && (
              <motion.div
                key="combine"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col"
              >
                <div className="mb-4 flex items-center justify-center gap-3">
                  {renderCombineSlot(combineSlot1, clearSlot1, '[ 物品 1 ]')}
                  <span className="text-paper text-xl">+</span>
                  {renderCombineSlot(combineSlot2, clearSlot2, '[ 物品 2 ]')}
                  <span className="text-paper text-xl">=</span>
                  {renderResultSlot()}
                </div>

                {combineMessage && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      'text-center text-sm mb-4',
                      combineResult ? 'text-gold' : 'text-crimson-light'
                    )}
                  >
                    {combineMessage}
                  </motion.p>
                )}

                {combineSlot1 && combineSlot2 && !combineResult && (
                  <div className="mb-4 text-center">
                    <Button
                      variant="primary"
                      onClick={handleTryCombine}
                      disabled={isCombineAnimating}
                    >
                      尝试组合
                    </Button>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto text-area-scroll">
                  <p className="mb-2 text-xs text-fog-dim">可组合物品：</p>
                  <div className="grid grid-cols-4 gap-2">
                    {combinableItems.map((item, index) => {
                      const isSelected = combineSlot1 === item.id || combineSlot2 === item.id
                      const isUsed = combineResult && (combineSlot1 === item.id || combineSlot2 === item.id)

                      if (isUsed) return null

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          onClick={() => !isSelected && handleCombineItemClick(item.id)}
                          className={cn(
                            'flex flex-col items-center justify-center p-2 rounded-lg border-2 cursor-pointer transition-all',
                            'bg-ink-800/50 hover:bg-ink-700/50',
                            RARITY_BORDER_CLASSES[item.rarity],
                            isSelected && 'ring-2 ring-gold-400 ring-offset-1 ring-offset-ink-900'
                          )}
                        >
                          <span className="text-xl mb-1">{item.icon}</span>
                          <span className="text-[10px] text-paper text-center truncate w-full">{item.name}</span>
                        </motion.div>
                      )
                    })}
                    {combinableItems.length === 0 && (
                      <div className="col-span-4 text-center py-8 text-fog-dim text-sm">
                        暂无可组合的物品
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Window>

      <Modal
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.name || ''}
        size="sm"
      >
        {selectedItem && (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mb-4 inline-flex items-center justify-center w-20 h-20 rounded-lg border-2"
              style={{ borderColor: RARITY_BORDER_CLASSES[selectedItem.rarity] }}
            >
              <span className="text-4xl">{selectedItem.icon}</span>
            </motion.div>

            <div className="mb-3">
              <span className={cn(
                'inline-block px-2 py-0.5 rounded text-xs',
                RARITY_BORDER_CLASSES[selectedItem.rarity],
                'border'
              )}>
                {RARITY_NAMES[selectedItem.rarity]}
              </span>
              {selectedItem.combinableWith && (
                <span className="ml-2 inline-block px-2 py-0.5 rounded text-xs border border-harbor-500 text-harbor">
                  可组合
                </span>
              )}
            </div>

            <p className="text-paper-light text-sm leading-relaxed">
              {selectedItem.description}
            </p>

            {selectedItem.combineDescription && (
              <p className="mt-3 text-xs text-gold italic">
                "{selectedItem.combineDescription}"
              </p>
            )}

            <div className="mt-6">
              <Button variant="primary" onClick={() => setSelectedItem(null)}>
                关闭
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
