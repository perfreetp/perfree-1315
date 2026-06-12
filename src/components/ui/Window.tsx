import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { X, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/uiStore'

interface WindowProps {
  id: string
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  defaultPosition?: { x: number; y: number }
  width?: number
  height?: number | 'auto'
  onClose?: () => void
  isMinimizable?: boolean
}

export default function Window({
  id,
  title,
  icon,
  children,
  className,
  defaultPosition = { x: 100, y: 100 },
  width = 400,
  height = 'auto',
  onClose,
  isMinimizable = false,
}: WindowProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const openWindows = useUIStore((s) => s.openWindows)
  const activeWindow = useUIStore((s) => s.activeWindow)
  const openWindow = useUIStore((s) => s.openWindow)
  const closeWindow = useUIStore((s) => s.closeWindow)
  const focusWindow = useUIStore((s) => s.focusWindow)
  const dragControls = useDragControls()

  useEffect(() => {
    openWindow(id)
    return () => {
      closeWindow(id)
    }
  }, [id])

  const isActive = activeWindow === id
  const zIndex = openWindows.indexOf(id) + 10

  const handleClose = useCallback(() => {
    setIsClosing(true)
  }, [])

  const handleExitComplete = useCallback(() => {
    closeWindow(id)
    onClose?.()
  }, [id, onClose, closeWindow])

  const handleFocus = useCallback(() => {
    if (!isActive) focusWindow(id)
  }, [id, isActive, focusWindow])

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isClosing && (
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          drag
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0}
          onDragStart={handleFocus}
          onMouseDown={handleFocus}
          style={{
            position: 'fixed',
            left: defaultPosition.x,
            top: defaultPosition.y,
            width,
            zIndex,
          }}
          className={cn(
            'bg-ink-900/95 border border-ink-600/50 rounded-lg shadow-2xl backdrop-blur-sm overflow-hidden',
            !isActive && 'opacity-80',
            className
          )}
        >
          <div
            onPointerDown={(e) => dragControls.start(e)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 cursor-grab active:cursor-grabbing select-none',
              'bg-gradient-to-r from-ink-800 to-ink-900 border-b border-ink-600/30'
            )}
          >
            {icon && <span className="text-paper shrink-0">{icon}</span>}
            <span className="font-display text-paper flex-1 text-sm tracking-wide truncate">
              {title}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              {isMinimizable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsMinimized((v) => !v)
                  }}
                  className="p-1 rounded hover:bg-ink-600/50 text-fog-dim hover:text-paper transition-colors"
                >
                  <Minus size={14} />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleClose()
                }}
                className="p-1 rounded hover:bg-crimson/30 text-fog-dim hover:text-crimson-light transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div
                  className="p-4 overflow-auto"
                  style={{
                    maxHeight: height === 'auto' ? '60vh' : height - 40,
                  }}
                >
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
