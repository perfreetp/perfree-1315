import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import Window from '@/components/ui/Window'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useGameStore } from '@/store/gameStore'
import { useUIStore } from '@/store/uiStore'
import { characters } from '@/data/characters'
import { locations } from '@/data/locations'
import { getAffinityLevel, getAffinityLevelName } from '@/engine/affinitySystem'
import { checkCondition, generateDiaryEntry } from '@/engine/storyEngine'
import { useTypewriter } from '@/hooks/useTypewriter'
import { cn } from '@/lib/utils'
import type { DialogueData, DialogueOption } from '@/types'

export default function DialogueWindow() {
  const {
    currentLocation,
    affinity,
    changeAffinity,
    addClue,
    addItem,
    addDiaryEntry,
    addDocument,
    unlockAchievement
  } = useGameStore()

  const { closeWindow, focusWindow, currentDialogueId } = useUIStore()

  const [currentNodeId, setCurrentNodeId] = useState<string>('')
  const [dialogueHistory, setDialogueHistory] = useState<string[]>([])
  const [lastCharacterId, setLastCharacterId] = useState<string>('')
  const [showEndModal, setShowEndModal] = useState(false)

  const historyRef = useRef<HTMLDivElement>(null)

  const location = locations.find(l => l.id === currentLocation)
  const character = location?.characterId
    ? characters.find(c => c.id === location.characterId)
    : undefined

  const currentAffinity = character ? (affinity[character.id] ?? 0) : 0
  const currentLevel = getAffinityLevel(currentAffinity)
  const currentLevelName = getAffinityLevelName(currentLevel)

  const dialogue = character?.dialogues || []
  const currentNode: DialogueData | undefined = dialogue.find(d => d.id === currentNodeId)

  const {
    displayedText,
    isComplete,
    isTyping,
    skip,
    reset
  } = useTypewriter(currentNode?.text || '', { speed: 20 })

  useEffect(() => {
    if (character) {
      if (currentDialogueId) {
        const targetNode = dialogue.find(d => d.id === currentDialogueId)
        if (targetNode && targetNode.id !== currentNodeId) {
          setCurrentNodeId(targetNode.id)
          setDialogueHistory([])
          setLastCharacterId(character.id)
        }
      } else if (character.id !== lastCharacterId) {
        setLastCharacterId(character.id)
        const firstAvailable = dialogue.find(d => {
          if (!d.condition) return true
          return checkCondition(d.condition, useGameStore.getState())
        })
        if (firstAvailable) {
          setCurrentNodeId(firstAvailable.id)
        }
        setDialogueHistory([])
      }
    }
  }, [character, lastCharacterId, dialogue, currentDialogueId, currentNodeId])

  useEffect(() => {
    if (currentNode && isComplete && !dialogueHistory.includes(currentNode.text)) {
      setDialogueHistory(prev => [...prev, currentNode.text])

      const diaryEntry = generateDiaryEntry(
        'dialogue',
        `与${character?.name || '某人'}的对话：${currentNode.text.slice(0, 50)}...`,
        useGameStore.getState()
      )
      addDiaryEntry(diaryEntry)

      if (currentNode.affinityChange) {
        changeAffinity(character!.id, currentNode.affinityChange)
      }
      if (currentNode.clueId) {
        addClue(currentNode.clueId)
        const clueEntry = generateDiaryEntry(
          'discovery',
          `从${character?.name || '某人'}处获得线索`,
          useGameStore.getState()
        )
        addDiaryEntry(clueEntry)
      }
      if (currentNode.itemId) {
        addItem(currentNode.itemId)
        const itemEntry = generateDiaryEntry(
          'discovery',
          `从${character?.name || '某人'}处获得物品`,
          useGameStore.getState()
        )
        addDiaryEntry(itemEntry)
      }
    }
  }, [currentNode, isComplete])

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [dialogueHistory])

  const handleOptionClick = useCallback((option: DialogueOption) => {
    if (!character) return

    if (option.affinityChange !== 0) {
      changeAffinity(character.id, option.affinityChange)
    }

    if (option.clueId) {
      addClue(option.clueId)
      const clueEntry = generateDiaryEntry(
        'discovery',
        `从${character.name}处获得线索`,
        useGameStore.getState()
      )
      addDiaryEntry(clueEntry)
    }

    if (option.itemId) {
      addItem(option.itemId)
      const itemEntry = generateDiaryEntry(
        'discovery',
        `从${character.name}处获得物品`,
        useGameStore.getState()
      )
      addDiaryEntry(itemEntry)
    }

    const nextNode = dialogue.find(d => d.id === option.next)
    if (nextNode) {
      if (nextNode.condition && !checkCondition(nextNode.condition, useGameStore.getState())) {
        return
      }
      setCurrentNodeId(option.next)
      reset()
    } else {
      setShowEndModal(true)
    }
  }, [character, dialogue, changeAffinity, addClue, addItem, addDiaryEntry, reset])

  const isOptionDisabled = useCallback((option: DialogueOption): boolean => {
    const nextNode = dialogue.find(d => d.id === option.next)
    if (nextNode?.condition) {
      return !checkCondition(nextNode.condition, useGameStore.getState())
    }
    return false
  }, [dialogue])

  const getOptionAffinityHint = (value: number): string | null => {
    if (value === 0) return null
    return value > 0 ? '+好感' : '-好感'
  }

  const getAffinityBarSegments = () => {
    const segments = [
      { max: 25, level: 'stranger', color: 'bg-fog-600' },
      { max: 50, level: 'friendly', color: 'bg-harbor-600' },
      { max: 75, level: 'trust', color: 'bg-gold-600' },
      { max: 100, level: 'intimate', color: 'bg-crimson-500' }
    ]

    return segments.map((seg, index) => {
      const segmentStart = index === 0 ? 0 : segments[index - 1].max
      const isActive = currentAffinity > segmentStart
      const isCurrentLevel = getAffinityLevel(seg.max) === currentLevel

      return (
        <div
          key={seg.level}
          className={cn(
            'h-2 rounded-full transition-all duration-500',
            isActive ? seg.color : 'bg-ink-700',
            isCurrentLevel && 'shadow-[0_0_8px_rgba(255,255,255,0.3)]'
          )}
          style={{ width: '23%' }}
        />
      )
    })
  }

  const hasNextOrOptions = currentNode && (currentNode.next || (currentNode.options && currentNode.options.length > 0))

  if (!character) {
    return (
      <Window title="对话" id="dialogue" width={700} height={400}>
        <div className="flex h-full items-center justify-center">
          <p className="text-fog-dim text-center">
            此处目前无人可对话
          </p>
        </div>
      </Window>
    )
  }

  return (
    <>
      <Window title="对话" id="dialogue" width={800} height={550}>
        <div className="flex h-full gap-4 overflow-hidden">
          <div className="flex w-[75%] flex-col">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-display"
                style={{ backgroundColor: character.color }}
              >
                {character.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-display text-lg" style={{ color: character.color }}>
                  {character.name}
                </h3>
                <p className="text-sm text-fog-dim">{character.title}</p>
              </div>
            </div>

            <div ref={historyRef} className="mb-3 max-h-[120px] overflow-y-auto space-y-2 text-area-scroll">
              {dialogueHistory.slice(0, -1).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-ink-800/50 p-2 text-sm text-paper-light"
                >
                  {line}
                </motion.div>
              ))}
            </div>

            <div className="relative">
              <p className="mb-1 text-sm font-display" style={{ color: character.color }}>
                {character.name}
              </p>
              <div className="relative rounded-lg bg-ink-800/70 border border-ink-600/50 p-4">
                <p className="font-body text-paper leading-relaxed">
                  {displayedText}
                </p>
                <AnimatePresence>
                  {isTyping && (
                    <motion.button
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      onClick={skip}
                      className="absolute bottom-2 right-2 text-xs text-fog-dim hover:text-paper transition-colors"
                    >
                      跳过
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence>
              {isComplete && currentNode?.options && currentNode.options.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-2"
                >
                  {currentNode.options.map((option, index) => {
                    const disabled = isOptionDisabled(option)
                    const affinityHint = getOptionAffinityHint(option.affinityChange)
                    return (
                      <motion.div
                        key={option.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant={option.isKey ? 'key' : 'secondary'}
                          size="md"
                          className="w-full text-left"
                          disabled={disabled}
                          onClick={() => !disabled && handleOptionClick(option)}
                          title={disabled ? '需要更深入的了解' : undefined}
                        >
                          <span className="flex items-center justify-between">
                            <span>
                              {option.isKey && <span className="mr-2">★</span>}
                              {option.text}
                            </span>
                            {affinityHint && (
                              <span className={cn(
                                'text-xs ml-2',
                                option.affinityChange > 0 ? 'text-gold' : 'text-crimson-light'
                              )}>
                                {affinityHint}
                              </span>
                            )}
                          </span>
                        </Button>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isComplete && !hasNextOrOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center"
                >
                  <p className="mb-3 text-fog-dim">对话结束</p>
                  <Button variant="primary" onClick={() => setShowEndModal(true)}>
                    关闭对话
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-[25%] border-l border-ink-600/30 pl-4">
            <div className="sticky top-0">
              <h4 className="mb-2 font-display text-paper">{character.name}</h4>
              <p className="mb-1 text-sm text-fog-dim">{currentLevelName}</p>

              <div className="mb-3 flex items-center gap-2">
                <Heart size={14} className="text-crimson-light" />
                <span className="text-xs text-paper-light">
                  好感度: {currentAffinity}/100
                </span>
              </div>

              <div className="mb-4 flex justify-between gap-1">
                {getAffinityBarSegments()}
              </div>

              <div className="space-y-1 text-[10px] text-fog-dim">
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-fog-600" />
                  <span>陌生 0-25</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-harbor-600" />
                  <span>友善 26-50</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold-600" />
                  <span>信任 51-75</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-crimson-500" />
                  <span>亲密 76-100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Window>

      <Modal
        isOpen={showEndModal}
        onClose={() => {
          setShowEndModal(false)
          closeWindow('dialogue')
        }}
        title="对话结束"
        size="sm"
      >
        <div className="text-center">
          <p className="mb-4 text-paper">
            你与{character.name}的对话已结束。
          </p>
          <Button variant="primary" onClick={() => {
            setShowEndModal(false)
            closeWindow('dialogue')
          }}>
            确定
          </Button>
        </div>
      </Modal>
    </>
  )
}
