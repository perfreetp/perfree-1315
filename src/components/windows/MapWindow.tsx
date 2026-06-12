import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Book,
  Anchor,
  Library,
  Hotel,
  Pin,
  Footprints,
  Factory,
  Compass,
  Lock,
  MapPin
} from 'lucide-react'
import Window from '@/components/ui/Window'
import { useGameStore } from '@/store/gameStore'
import { useUIStore } from '@/store/uiStore'
import { locations } from '@/data/locations'
import { chapters } from '@/data/chapters'
import { characters } from '@/data/characters'
import { checkCondition } from '@/engine/storyEngine'
import { getTimeDisplay } from '@/engine/timeSystem'
import { cn } from '@/lib/utils'
import type { LocationData } from '@/types'

const LOCATION_ICONS: Record<string, React.ReactNode> = {
  'old-bookstore': <Book size={18} />,
  'harbor-dock': <Anchor size={18} />,
  'city-library': <Library size={18} />,
  'fog-harbor-inn': <Hotel size={18} />,
  'lighthouse-cliff': <Pin size={18} />,
  'fisherman-alley': <Footprints size={18} />,
  'abandoned-press': <Factory size={18} />,
}

export default function MapWindow() {
  const { currentLocation, visitedLocations, setLocation, setScene, completedScenes, day, timeSlotIndex } = useGameStore()
  const { closeWindow, focusWindow } = useUIStore()
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const [travelingTo, setTravelingTo] = useState<string | null>(null)

  const getLocationState = useMemo(() => {
    return (location: LocationData): 'current' | 'visited' | 'unlocked' | 'locked' => {
      if (location.id === currentLocation) return 'current'

      if (location.unlockCondition) {
        const state = useGameStore.getState()
        if (!checkCondition(location.unlockCondition, state)) {
          return 'locked'
        }
      }

      if (visitedLocations.includes(location.id)) return 'visited'
      return 'unlocked'
    }
  }, [currentLocation, visitedLocations])

  const getLocationColor = (state: string): string => {
    switch (state) {
      case 'current':
        return 'bg-gold-400'
      case 'visited':
        return 'bg-paper-400'
      case 'unlocked':
        return 'bg-paper-500'
      case 'locked':
        return 'bg-fog-700'
      default:
        return 'bg-paper-500'
    }
  }

  const getLocationOpacity = (state: string): string => {
    switch (state) {
      case 'current':
        return 'opacity-100'
      case 'visited':
        return 'opacity-100'
      case 'unlocked':
        return 'opacity-70'
      case 'locked':
        return 'opacity-40'
      default:
        return 'opacity-70'
    }
  }

  const findSceneForLocation = (locationId: string): string | null => {
    for (const chapter of chapters) {
      for (const scene of chapter.scenes) {
        if (scene.locationId === locationId && !completedScenes.includes(scene.id)) {
          if (scene.condition) {
            const state = useGameStore.getState()
            if (!checkCondition(scene.condition, state)) {
              continue
            }
          }
          return scene.id
        }
      }
    }
    return null
  }

  const handleLocationClick = (location: LocationData) => {
    const state = getLocationState(location)
    if (state === 'locked' || state === 'current') return

    setTravelingTo(location.id)

    setTimeout(() => {
      setLocation(location.id)

      const sceneId = findSceneForLocation(location.id)
      if (sceneId) {
        setScene(sceneId)
      }

      setTravelingTo(null)
      closeWindow('map')
      focusWindow('main')
    }, 500)
  }

  const getCharacterAtLocation = (locationId: LocationData) => {
    if (!locationId.characterId) return null
    return characters.find(c => c.id === locationId.characterId)
  }

  const pathLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
    const locationPositions = locations.map(loc => ({
      id: loc.id,
      x: loc.x,
      y: loc.y
    }))

    for (let i = 0; i < locationPositions.length; i++) {
      for (let j = i + 1; j < locationPositions.length; j++) {
        const loc1 = locationPositions[i]
        const loc2 = locationPositions[j]
        const distance = Math.sqrt(
          Math.pow(loc1.x - loc2.x, 2) + Math.pow(loc1.y - loc2.y, 2)
        )
        if (distance < 35) {
          lines.push({
            x1: loc1.x,
            y1: loc1.y,
            x2: loc2.x,
            y2: loc2.y
          })
        }
      }
    }

    return lines
  }, [])

  return (
    <Window title="港城地图" id="map" width={600} height={500}>
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-radial from-ink-700 via-ink-800 to-ink-900">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 184, 150, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 184, 150, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-ink-900/60" />
          <motion.div
            className="absolute -left-20 top-0 h-full w-40 bg-gradient-to-r from-fog/20 to-transparent"
            animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-20 top-0 h-full w-40 bg-gradient-to-l from-fog/20 to-transparent"
            animate={{ x: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        <div className="absolute right-4 top-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="relative"
          >
            <Compass size={32} className="text-gold/30" />
          </motion.div>
        </div>

        <svg className="absolute inset-0 h-full w-full pointer-events-none">
          {pathLines.map((line, index) => (
            <motion.line
              key={index}
              x1={`${line.x1}%`}
              y1={`${line.y1}%`}
              x2={`${line.x2}%`}
              y2={`${line.y2}%`}
              stroke="rgba(212, 184, 150, 0.15)"
              strokeWidth="1"
              strokeDasharray="4,4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            />
          ))}
        </svg>

        {locations.map((location, index) => {
          const state = getLocationState(location)
          const isHovered = hoveredLocation === location.id
          const isTraveling = travelingTo === location.id
          const character = getCharacterAtLocation(location)

          return (
            <div
              key={location.id}
              className="absolute"
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: state === 'current' ? 1.1 : 1,
                  opacity: 1
                }}
                transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 15 }}
                whileHover={state !== 'locked' ? { scale: state === 'current' ? 1.15 : 1.05, opacity: 1 } : {}}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => handleLocationClick(location)}
                className={cn(
                  'relative cursor-pointer group',
                  state === 'locked' && 'cursor-not-allowed',
                  getLocationOpacity(state)
                )}
              >
                <AnimatePresence>
                  {state === 'current' && (
                    <motion.div
                      layoutId="current-location-glow"
                      className="absolute inset-0 rounded-full bg-gold/20"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.4, opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </AnimatePresence>

                <div
                  className={cn(
                    'relative flex h-10 w-10 items-center justify-center rounded-full transition-all',
                    'shadow-lg border-2 border-ink-700',
                    state === 'current'
                      ? 'bg-gold animate-pulse-glow'
                      : state === 'visited'
                      ? 'bg-paper'
                      : state === 'unlocked'
                      ? 'bg-paper/70'
                      : 'bg-fog/70',
                    state === 'current' && 'scale-110',
                    state !== 'locked' && 'group-hover:ring-2 group-hover:ring-gold/50'
                  )}
                >
                  <span
                    className={cn(
                      state === 'current'
                        ? 'text-ink-900'
                        : state === 'locked'
                        ? 'text-ink-600'
                        : 'text-ink-800'
                    )}
                  >
                    {LOCATION_ICONS[location.id] ?? <MapPin size={18} />}
                  </span>

                  {state === 'locked' && (
                    <div className="absolute -right-1 -bottom-1 h-5 w-5 flex items-center justify-center rounded-full bg-ink-800 border border-ink-600">
                      <Lock size={10} className="text-fog" />
                    </div>
                  )}
                </div>

                <div className="mt-1 text-center">
                  <span className={cn(
                    'font-body text-xs whitespace-nowrap',
                    state === 'current' ? 'text-gold' : 'text-paper-light'
                  )}>
                    {location.name}
                  </span>
                </div>

                <AnimatePresence>
                  {isHovered && state !== 'locked' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className="absolute left-1/2 top-full z-10 mt-2 w-56 -translate-x-1/2"
                    >
                      <div className="old-paper rounded-lg border border-ink-500 p-3 shadow-xl">
                        <h4 className="mb-1 font-display text-sm text-gold">
                          {location.name}
                        </h4>
                        <p className="mb-2 text-xs text-fog leading-relaxed line-clamp-2">
                          {location.description}
                        </p>
                        {character && (
                          <div className="mb-2 flex items-center gap-1 text-xs text-paper-light">
                            <span className="text-harbor">可对话:</span>
                            <span>{character.name}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-xs">
                          <span className={cn(
                            'px-2 py-0.5 rounded text-xs',
                            state === 'current'
                              ? 'bg-gold/20 text-gold'
                              : state === 'visited'
                              ? 'bg-paper/20 text-paper'
                              : 'bg-fog/20 text-fog'
                          )}>
                            {state === 'current' ? '当前位置' : state === 'visited' ? '已探索' : '未探索'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isTraveling && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <div className="bg-ink-800/90 px-3 py-1.5 rounded-full border border-gold/50">
                        <span className="text-xs text-gold animate-pulse">前往中...</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )
        })}

        <div className="absolute bottom-3 left-3 text-xs text-fog-dim">
          {getTimeDisplay(day, timeSlotIndex)}
        </div>
      </div>
    </Window>
  )
}
