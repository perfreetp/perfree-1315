import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Clock,
  Map,
  Package,
  Search,
  BookOpen,
  Save,
  History
} from 'lucide-react'
import Window from '@/components/ui/Window'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useGameStore } from '@/store/gameStore'
import { useUIStore } from '@/store/uiStore'
import { useMetaStore } from '@/store/metaStore'
import { chapters } from '@/data/chapters'
import { locations } from '@/data/locations'
import { items } from '@/data/items'
import { characters } from '@/data/characters'
import { achievements } from '@/data/achievements'
import { endings } from '@/data/endings'
import {
  resolveScene,
  makeChoice,
  applyEffects,
  generateDiaryEntry,
  checkCondition
} from '@/engine/storyEngine'
import { getTimeDisplay } from '@/engine/timeSystem'
import { determineEnding } from '@/engine/endingSystem'
import { useTypewriter } from '@/hooks/useTypewriter'
import { cn } from '@/lib/utils'
import type { SceneChoice, GameState, SceneEffect } from '@/types'

export default function MainWindow() {
  const gameState = useGameStore()
  const uiState = useUIStore()
  const { unlockEnding } = useMetaStore.getState()

  const {
    currentScene,
    currentChapter,
    currentLocation,
    day,
    timeSlotIndex,
    inventory,
    clues,
    visitedLocations,
    gamePhase,
    completedScenes
  } = gameState

  const {
    openWindow,
    focusWindow,
    textHistory,
    addToTextHistory,
    clearTextHistory,
    isTyping,
    setTyping,
    toggleSaveLoad
  } = uiState

  const [showHistory, setShowHistory] = useState(false)
  const textAreaRef = useRef<HTMLDivElement>(null)

  const scene = resolveScene(currentScene, gameState)
  const fullText = scene?.text.join('\n\n') ?? ''

  const {
    displayedText,
    isComplete,
    isTyping: typewriterTyping,
    skip,
    reset
  } = useTypewriter(fullText, { speed: 25 })

  const currentLocationData = locations.find(l => l.id === currentLocation)
  const currentChapterData = chapters.find(c => c.id === currentChapter)

  useEffect(() => {
    setTyping(typewriterTyping)
  }, [typewriterTyping, setTyping])

  useEffect(() => {
    if (scene) {
      reset()

      if (scene.onEnter && scene.onEnter.length > 0) {
        applySceneEffects(scene.onEnter)
      }

      if (!completedScenes.includes(scene.id)) {
        gameState.completeScene(scene.id)
      }

      if (!visitedLocations.includes(scene.locationId)) {
        gameState.visitLocation(scene.locationId)
      }

      scene.text.forEach(para => {
        addToTextHistory(para)
      })
    }
  }, [currentScene])

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight
    }
  }, [displayedText])

  const applySceneEffects = useCallback((effects: SceneEffect[]) => {
    const state = useGameStore.getState()
    const newState = applyEffects(effects, state)

    effects.forEach(effect => {
      switch (effect.type) {
        case 'addItem':
          state.addItem(effect.target)
          break
        case 'addClue':
          state.addClue(effect.target)
          break
        case 'changeAffinity':
          state.changeAffinity(effect.target, typeof effect.value === 'number' ? effect.value : 0)
          break
        case 'addDiary':
          const diaryEntry = generateDiaryEntry(
            'event',
            typeof effect.value === 'string' ? effect.value : effect.target,
            state
          )
          state.addDiaryEntry(diaryEntry)
          break
        case 'unlockLocation':
          state.visitLocation(effect.target)
          break
        case 'triggerEvent':
          state.triggerEvent(effect.target)
          break
        case 'advanceTime':
          state.advanceTime()
          break
      }
    })
  }, [])

  const handleChoiceClick = useCallback((choice: SceneChoice) => {
    const state = useGameStore.getState()

    const { nextState, nextScene } = makeChoice(choice, state)

    if (choice.effects) {
      choice.effects.forEach(effect => {
        switch (effect.type) {
          case 'addItem':
            state.addItem(effect.target)
            break
          case 'addClue':
            state.addClue(effect.target)
            break
          case 'changeAffinity':
            state.changeAffinity(effect.target, typeof effect.value === 'number' ? effect.value : 0)
            break
          case 'addDiary':
            const diaryEntry = generateDiaryEntry(
              'event',
              typeof effect.value === 'string' ? effect.value : effect.target,
              state
            )
            state.addDiaryEntry(diaryEntry)
            break
          case 'unlockLocation':
            state.visitLocation(effect.target)
            break
          case 'triggerEvent':
            state.triggerEvent(effect.target)
            break
          case 'advanceTime':
            state.advanceTime()
            break
        }
      })
    }

    addToTextHistory(`> ${choice.text}`)

    state.setScene(nextScene)

    if (choice.isKey) {
      state.makeKeyChoice({
        sceneId: currentScene,
        choiceId: choice.id,
        choiceText: choice.text,
        chapter: currentChapter
      })
    }

    if (currentChapter === 'chapter-3' && scene?.id.endsWith('-9')) {
      const ending = determineEnding(useGameStore.getState(), endings)
      if (ending) {
        state.setGamePhase('ending')
        state.setEndingType(ending.id)
        unlockEnding(ending.id)
      }
    }
  }, [currentScene, currentChapter, scene, addToTextHistory, unlockEnding])

  const handleSkipTyping = useCallback(() => {
    skip()
  }, [skip])

  const isChoiceDisabled = useCallback((choice: SceneChoice): boolean => {
    if (!choice.condition) return false
    return !checkCondition(choice.condition, gameState)
  }, [gameState])

  if (gamePhase !== 'playing' || !scene) {
    return null
  }

  return (
    <>
      <Window title="雾港来信" id="main" width={900} height={650}>
        <div className="flex h-full flex-col">
          <div className="flex flex-1 gap-4 overflow-hidden">
            <div className="flex w-[70%] flex-col">
              <h2 className="mb-3 font-display text-xl text-paper-200">
                {scene.title}
              </h2>

              <div
                ref={textAreaRef}
                className="relative flex-1 overflow-y-auto pr-2 text-area-scroll"
              >
                <p className="font-body text-paper leading-relaxed whitespace-pre-wrap">
                  {displayedText}
                </p>

                <AnimatePresence>
                  {isTyping && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onClick={handleSkipTyping}
                      className="absolute bottom-2 right-2 text-xs text-fog-dim hover:text-paper transition-colors"
                    >
                      点击跳过
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-2 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(true)}
                >
                  <History size={14} />
                  查看历史
                </Button>
              </div>
            </div>

            <div className="flex w-[30%] flex-col gap-3">
              <div className="old-paper rounded-lg p-3">
                <div className="mb-2 flex items-center gap-2 text-sm">
                  <Clock size={14} className="text-gold" />
                  <span className="text-paper-light">
                    {getTimeDisplay(day, timeSlotIndex)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-harbor" />
                  <span className="text-paper-light">
                    {currentLocationData?.name ?? '未知地点'}
                  </span>
                </div>
              </div>

              <div className="old-paper rounded-lg p-3">
                <div className="text-xs text-fog-dim space-y-1">
                  <div>线索: {clues.length}/14</div>
                  <div>物品: {inventory.length}/14</div>
                  <div>已探: {visitedLocations.length}/7</div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openWindow('map')}
                  className="flex flex-col items-center gap-1 py-3"
                >
                  <Map size={18} />
                  <span className="text-[10px]">地图</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openWindow('items')}
                  className="flex flex-col items-center gap-1 py-3"
                >
                  <Package size={18} />
                  <span className="text-[10px]">物品</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openWindow('clueboard')}
                  className="flex flex-col items-center gap-1 py-3"
                >
                  <Search size={18} />
                  <span className="text-[10px]">线索</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openWindow('archive')}
                  className="flex flex-col items-center gap-1 py-3"
                >
                  <BookOpen size={18} />
                  <span className="text-[10px]">档案</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSaveLoad}
                  className="flex flex-col items-center gap-1 py-3"
                >
                  <Save size={18} />
                  <span className="text-[10px]">保存</span>
                </Button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isComplete && scene.choices && scene.choices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 border-t border-ink-600 pt-4"
              >
                <div className="flex flex-col gap-2">
                  {scene.choices.map((choice, index) => {
                    const disabled = isChoiceDisabled(choice)
                    return (
                      <motion.div
                        key={choice.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant={choice.isKey ? 'key' : 'secondary'}
                          size="md"
                          className="w-full text-left"
                          disabled={disabled}
                          onClick={() => !disabled && handleChoiceClick(choice)}
                          title={disabled ? '条件不足' : undefined}
                        >
                          {choice.isKey && <span className="mr-2">★</span>}
                          {choice.text}
                        </Button>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Window>

      <Modal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        title="对话历史"
        size="lg"
      >
        <div className="max-h-[500px] overflow-y-auto space-y-3">
          {textHistory.map((text, index) => (
            <p
              key={index}
              className={cn(
                'text-sm leading-relaxed',
                text.startsWith('>')
                  ? 'text-gold pl-4 border-l-2 border-gold/30'
                  : 'text-paper'
              )}
            >
              {text}
            </p>
          ))}
        </div>
      </Modal>
    </>
  )
}
