import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  Map,
  Package,
  Search,
  BookOpen,
  Save,
  FolderOpen,
  Volume2,
  VolumeX,
  Home as HomeIcon,
  MapPin,
  Clock
} from 'lucide-react'
import TitleScreen from '@/components/screens/TitleScreen'
import MainWindow from '@/components/windows/MainWindow'
import MapWindow from '@/components/windows/MapWindow'
import DialogueWindow from '@/components/windows/DialogueWindow'
import ItemWindow from '@/components/windows/ItemWindow'
import ClueBoardWindow from '@/components/windows/ClueBoardWindow'
import ArchiveWindow from '@/components/windows/ArchiveWindow'
import EndingWindow from '@/components/windows/EndingWindow'
import SaveLoadModal from '@/components/modals/SaveLoadModal'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useGameStore } from '@/store/gameStore'
import { useUIStore } from '@/store/uiStore'
import { locations } from '@/data/locations'
import { chapters } from '@/data/chapters'
import { getTimeDisplay } from '@/engine/timeSystem'
import { cn } from '@/lib/utils'

interface FloatingParticle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
}

export default function Home() {
  const gamePhase = useGameStore((state) => state.gamePhase)
  const currentChapter = useGameStore((state) => state.currentChapter)
  const currentLocation = useGameStore((state) => state.currentLocation)
  const day = useGameStore((state) => state.day)
  const timeSlotIndex = useGameStore((state) => state.timeSlotIndex)
  const setGamePhase = useGameStore((state) => state.setGamePhase)

  const openWindows = useUIStore((state) => state.openWindows)
  const showSaveLoad = useUIStore((state) => state.showSaveLoad)
  const showSettings = useUIStore((state) => state.showSettings)
  const toggleSaveLoad = useUIStore((state) => state.toggleSaveLoad)
  const toggleSettings = useUIStore((state) => state.toggleSettings)
  const openWindow = useUIStore((state) => state.openWindow)
  const audioEnabled = useUIStore((state) => state.audioEnabled)
  const audioType = useUIStore((state) => state.audioType)
  const toggleAudio = useUIStore((state) => state.toggleAudio)
  const setAudioType = useUIStore((state) => state.setAudioType)

  const [saveLoadMode, setSaveLoadMode] = useState<'save' | 'load'>('save')
  const [showReturnConfirm, setShowReturnConfirm] = useState(false)

  const particles = useMemo<FloatingParticle[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 2 + Math.random() * 2
    }))
  }, [])

  const currentChapterData = chapters.find(c => c.id === currentChapter)
  const currentLocationData = locations.find(l => l.id === currentLocation)
  const isGameplay = gamePhase === 'playing' || gamePhase === 'ending'

  const handleQuickSave = () => {
    setSaveLoadMode('save')
    toggleSaveLoad()
  }

  const handleQuickLoad = () => {
    setSaveLoadMode('load')
    toggleSaveLoad()
  }

  const handleReturnToTitle = () => {
    setGamePhase('title')
    setShowReturnConfirm(false)
    toggleSettings()
  }

  if (gamePhase === 'title') {
    return <TitleScreen />
  }

  return (
    <div className="fixed inset-0 bg-ink-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 40%, rgba(91, 143, 168, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 60%, rgba(201, 168, 76, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(192, 57, 43, 0.05) 0%, transparent 50%)
          `,
          animation: 'fog-drift 25s ease-in-out infinite alternate'
        }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 18, 25, 0.7) 100%)',
            animation: 'fog-drift 30s ease-in-out infinite alternate-reverse'
          }}
        />
      </div>

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-fog-400/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            bottom: '0%'
          }}
          animate={{
            y: ['0vh', '-120vh'],
            x: ['0%', `${(Math.random() - 0.5) * 8}%`],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      <div className="absolute inset-0 bg-noise pointer-events-none opacity-30" />

      <AnimatePresence>
        {isGameplay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full h-full"
          >
            <div className="absolute top-0 left-0 right-0 z-30 px-4 py-2 flex items-center justify-between bg-gradient-to-b from-ink-900/90 to-transparent">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSettings}
                  className="px-2"
                >
                  <Menu size={18} />
                </Button>
              </div>

              <div className="text-center">
                <h2 className="font-display text-paper-200 text-sm tracking-wider">
                  {currentChapterData?.name ?? '雾港来信'}
                </h2>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleQuickSave}
                  className="px-2"
                  title="快速保存"
                >
                  <Save size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleQuickLoad}
                  className="px-2"
                  title="快速读取"
                >
                  <FolderOpen size={16} />
                </Button>
              </div>
            </div>

            <div className="absolute inset-0 z-10 pt-12 pb-16">
              <MainWindow />

              {openWindows.includes('map') && (
                <MapWindow />
              )}

              {openWindows.includes('dialogue') && (
                <DialogueWindow />
              )}

              {openWindows.includes('items') && (
                <ItemWindow />
              )}

              {openWindows.includes('clueboard') && (
                <ClueBoardWindow />
              )}

              {openWindows.includes('archive') && (
                <ArchiveWindow />
              )}

              {(gamePhase === 'ending' || openWindows.includes('ending')) && (
                <EndingWindow />
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-30 px-4 py-2 flex items-center justify-between bg-gradient-to-t from-ink-900/90 to-transparent">
              <div className="flex items-center gap-2 text-xs text-fog-400">
                <MapPin size={14} className="text-harbor-400" />
                <span>{currentLocationData?.name ?? '未知地点'}</span>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openWindow('map')}
                  className="px-3 py-1.5 flex flex-col items-center gap-0.5"
                >
                  <Map size={16} />
                  <span className="text-[9px]">地图</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openWindow('items')}
                  className="px-3 py-1.5 flex flex-col items-center gap-0.5"
                >
                  <Package size={16} />
                  <span className="text-[9px]">物品</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openWindow('clueboard')}
                  className="px-3 py-1.5 flex flex-col items-center gap-0.5"
                >
                  <Search size={16} />
                  <span className="text-[9px]">线索</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openWindow('archive')}
                  className="px-3 py-1.5 flex flex-col items-center gap-0.5"
                >
                  <BookOpen size={16} />
                  <span className="text-[9px]">档案</span>
                </Button>
              </div>

              <div className="flex items-center gap-2 text-xs text-fog-400">
                <Clock size={14} className="text-gold-400" />
                <span>{getTimeDisplay(day, timeSlotIndex)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSaveLoad && (
          <SaveLoadModal
            isOpen={showSaveLoad}
            onClose={toggleSaveLoad}
            mode={saveLoadMode}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <Modal
            isOpen={showSettings}
            onClose={toggleSettings}
            title="设置"
            size="sm"
          >
            <div className="space-y-6">
              <div>
                <h4 className="font-display text-sm text-paper-200 mb-3">音效设置</h4>
                <div className="flex items-center gap-3 mb-3">
                  <button
                    onClick={toggleAudio}
                    className={cn(
                      'p-2 rounded-lg transition-colors',
                      audioEnabled
                        ? 'text-gold-400 bg-ink-700/40'
                        : 'text-fog-500 bg-ink-700/20'
                    )}
                  >
                    {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                  </button>
                  <span className="text-sm text-fog-400">
                    {audioEnabled ? '音效已开启' : '音效已关闭'}
                  </span>
                </div>
                <div className="text-xs text-fog-500 mb-2">环境音类型</div>
                <div className="flex items-center gap-1 bg-ink-800/60 rounded-lg p-1">
                  {(['harbor', 'rain', 'quiet'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setAudioType(type)}
                      className={cn(
                        'px-3 py-1.5 text-xs rounded transition-all flex-1',
                        audioType === type
                          ? 'bg-gold-500/20 text-gold-400'
                          : 'text-fog-500 hover:text-fog-300 hover:bg-ink-700/40'
                      )}
                    >
                      {type === 'harbor' ? '港湾' : type === 'rain' ? '雨声' : '静谧'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-ink-600/30">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => setShowReturnConfirm(true)}
                >
                  <HomeIcon size={14} />
                  返回标题画面
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReturnConfirm && (
          <Modal
            isOpen={showReturnConfirm}
            onClose={() => setShowReturnConfirm(false)}
            title="确认返回"
            size="sm"
          >
            <div className="space-y-4">
              <p className="text-sm text-fog-400">
                确定要返回标题画面吗？未保存的进度将会丢失。
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReturnConfirm(false)}
                >
                  取消
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleReturnToTitle}
                >
                  确认返回
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}
