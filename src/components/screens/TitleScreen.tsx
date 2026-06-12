import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Clock, Award, Lock, BookOpen } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useGameStore } from '@/store/gameStore'
import { useUIStore } from '@/store/uiStore'
import { useMetaStore } from '@/store/metaStore'
import { locations } from '@/data/locations'
import { chapters } from '@/data/chapters'
import { endings } from '@/data/endings'
import { TIME_SLOT_NAMES } from '@/types'
import { cn } from '@/lib/utils'

interface FloatingParticle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
}

function formatPlayTime(ms: number): { hours: number; minutes: number } {
  const totalMinutes = Math.floor(ms / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return { hours, minutes }
}

export default function TitleScreen() {
  const gamePhase = useGameStore((state) => state.gamePhase)
  const currentScene = useGameStore((state) => state.currentScene)
  const currentChapter = useGameStore((state) => state.currentChapter)
  const currentLocation = useGameStore((state) => state.currentLocation)
  const day = useGameStore((state) => state.day)
  const timeSlotIndex = useGameStore((state) => state.timeSlotIndex)
  const startGame = useGameStore((state) => state.startGame)
  const loadGame = useGameStore((state) => state.loadGame)
  const setScene = useGameStore((state) => state.setScene)
  const setLocation = useGameStore((state) => state.setLocation)
  const setGamePhase = useGameStore((state) => state.setGamePhase)

  const audioEnabled = useUIStore((state) => state.audioEnabled)
  const audioType = useUIStore((state) => state.audioType)
  const toggleAudio = useUIStore((state) => state.toggleAudio)
  const setAudioType = useUIStore((state) => state.setAudioType)

  const unlockedEndings = useMetaStore((state) => state.unlockedEndings)
  const totalPlayTime = useMetaStore((state) => state.totalPlayTime)
  const incrementSession = useMetaStore((state) => state.incrementSession)
  const isEndingUnlocked = useMetaStore((state) => state.isEndingUnlocked)

  const [playerName, setPlayerName] = useState('修复师')
  const [showNameModal, setShowNameModal] = useState(false)
  const [showEndingsModal, setShowEndingsModal] = useState(false)

  const particles = useMemo<FloatingParticle[]>(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
      size: 2 + Math.random() * 3
    }))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      useMetaStore.getState().updatePlayTime()
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  if (gamePhase !== 'title') return null

  const hasSaveData = currentScene !== ''

  const currentChapterData = chapters.find(c => c.id === currentChapter)
  const currentLocationData = locations.find(l => l.id === currentLocation)
  const timeSlots = Object.keys(TIME_SLOT_NAMES) as Array<keyof typeof TIME_SLOT_NAMES>
  const currentTimeSlotName = TIME_SLOT_NAMES[timeSlots[timeSlotIndex] ?? 'dawn']

  const playTime = formatPlayTime(totalPlayTime)

  const handleStartNewGame = () => {
    setShowNameModal(true)
  }

  const handleConfirmStart = () => {
    const chapter1 = chapters[0]
    startGame(playerName || '修复师')
    setScene(chapter1.startScene)
    setLocation(chapter1.scenes[0].locationId)
    incrementSession()
    setShowNameModal(false)
  }

  const handleContinue = () => {
    if (!hasSaveData) return
    const savedState = useGameStore.getState()
    loadGame(savedState)
    setGamePhase('playing')
  }

  return (
    <div className="fixed inset-0 bg-ink-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 40%, rgba(91, 143, 168, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 60%, rgba(201, 168, 76, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(192, 57, 43, 0.06) 0%, transparent 50%)
          `,
          animation: 'fog-drift 25s ease-in-out infinite alternate'
        }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 18, 25, 0.8) 100%)',
            animation: 'fog-drift 30s ease-in-out infinite alternate-reverse'
          }}
        />
      </div>

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gold/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            bottom: '0%'
          }}
          animate={{
            y: ['0vh', '-120vh'],
            x: ['0%', `${(Math.random() - 0.5) * 10}%`],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      <div className="absolute inset-0 bg-noise pointer-events-none opacity-40" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h1
            className="font-display text-6xl md:text-8xl text-gold mb-4 tracking-widest"
            style={{
              textShadow: '0 0 20px rgba(201, 168, 76, 0.5), 0 0 40px rgba(201, 168, 76, 0.3)',
              animation: 'pulse-glow 3s ease-in-out infinite'
            }}
          >
            雾港来信
          </h1>
          <p className="font-display text-xl text-fog-dim tracking-widest">
            — 文字冒险 —
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={handleStartNewGame}
            className="w-full"
          >
            开始新游戏
          </Button>

          <div className="relative">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleContinue}
              disabled={!hasSaveData}
              className="w-full"
            >
              继续游戏
            </Button>
            {hasSaveData && currentChapterData && currentLocationData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 text-center text-xs text-fog-dim space-y-0.5"
              >
                <p>{currentChapterData.name}</p>
                <p>{currentLocationData.name} · 第{day}天 · {currentTimeSlotName}</p>
              </motion.div>
            )}
          </div>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => setShowEndingsModal(true)}
            className="w-full"
          >
            <Award size={18} />
            结局画廊
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center gap-3"
        >
          <button
            onClick={toggleAudio}
            className={cn(
              'p-2 rounded-lg transition-colors',
              audioEnabled
                ? 'text-gold hover:bg-ink-700/40'
                : 'text-fog-dim hover:bg-ink-700/40'
            )}
            title={audioEnabled ? '关闭音效' : '开启音效'}
          >
            {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          <div className="flex items-center gap-1 bg-ink-800/60 rounded-lg p-1">
            {(['harbor', 'rain', 'quiet'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setAudioType(type)}
                className={cn(
                  'px-3 py-1 text-xs rounded transition-all',
                  audioType === type
                    ? 'bg-gold/20 text-gold'
                    : 'text-fog-dim hover:text-fog hover:bg-ink-700/40'
                )}
              >
                {type === 'harbor' ? '港湾' : type === 'rain' ? '雨声' : '静谧'}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center gap-4 text-xs text-fog-dim"
        >
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>总游戏时间: {playTime.hours}小时{playTime.minutes}分</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award size={14} />
            <span>解锁结局: {unlockedEndings.length}/{endings.length}</span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showNameModal && (
          <Modal
            isOpen={showNameModal}
            onClose={() => setShowNameModal(false)}
            title="开始新游戏"
            size="sm"
          >
            <div className="space-y-4">
              <p className="text-sm text-fog">
                请输入你的名字，修复师。
              </p>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="修复师"
                maxLength={12}
                className="w-full px-4 py-2 bg-ink-700/60 border border-ink-600 rounded text-paper placeholder-fog-dim focus:outline-none focus:border-gold/50 font-body"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleConfirmStart()
                }}
              />
              <p className="text-xs text-fog-dim">
                这个名字将伴随你在雾港的旅程。
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNameModal(false)}
                >
                  取消
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleConfirmStart}
                  disabled={!playerName.trim()}
                >
                  确认
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEndingsModal && (
          <Modal
            isOpen={showEndingsModal}
            onClose={() => setShowEndingsModal(false)}
            title="结局画廊"
            size="lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {endings.map((ending) => {
                const unlocked = isEndingUnlocked(ending.id)
                const isHidden = ending.isHidden && !unlocked
                if (isHidden) return null

                return (
                  <motion.div
                    key={ending.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'p-4 rounded-lg border transition-all',
                      unlocked
                        ? 'border-gold/30 bg-ink-800/60'
                        : 'border-ink-600 bg-ink-800/30'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'p-2 rounded-lg shrink-0',
                        unlocked ? 'bg-gold/20' : 'bg-ink-700/50'
                      )}>
                        {unlocked ? (
                          <BookOpen size={20} className="text-gold" />
                        ) : (
                          <Lock size={20} className="text-fog-dim" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={cn(
                          'font-display text-sm mb-1',
                          unlocked ? 'text-paper' : 'text-fog-dim'
                        )}>
                          {unlocked ? ending.name : '???'}
                        </h4>
                        <p className={cn(
                          'text-xs leading-relaxed',
                          unlocked ? 'text-fog' : 'text-fog-dim/50'
                        )}>
                          {unlocked ? ending.description : '尚未解锁'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-ink-600/30 text-center">
              <p className="text-xs text-fog-dim">
                已解锁 {unlockedEndings.length} / {endings.length} 个结局
              </p>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}
