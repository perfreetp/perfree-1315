import { useState, useEffect, useCallback, useRef } from 'react'

interface UseTypewriterOptions {
  speed?: number
  startDelay?: number
}

interface UseTypewriterReturn {
  displayedText: string
  isComplete: boolean
  isTyping: boolean
  skip: () => void
  reset: () => void
  progress: number
}

export function useTypewriter(
  fullText: string,
  options: UseTypewriterOptions = {}
): UseTypewriterReturn {
  const { speed = 30, startDelay = 0 } = options

  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const progress = fullText.length > 0 ? displayedText.length / fullText.length : 0

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const skip = useCallback(() => {
    clearTimers()
    setDisplayedText(fullText)
    setCharIndex(fullText.length)
    setIsTyping(false)
    setIsComplete(true)
  }, [fullText, clearTimers])

  const reset = useCallback(() => {
    clearTimers()
    setDisplayedText('')
    setCharIndex(0)
    setIsTyping(false)
    setIsComplete(false)
  }, [clearTimers])

  useEffect(() => {
    reset()

    if (!fullText) {
      setIsComplete(true)
      return
    }

    setIsTyping(true)

    const startTyping = () => {
      intervalRef.current = setInterval(() => {
        setCharIndex((prev) => {
          const nextIndex = prev + 1
          if (nextIndex >= fullText.length) {
            clearTimers()
            setDisplayedText(fullText)
            setIsTyping(false)
            setIsComplete(true)
            return fullText.length
          }
          setDisplayedText(fullText.slice(0, nextIndex))
          return nextIndex
        })
      }, speed)
    }

    if (startDelay > 0) {
      timeoutRef.current = setTimeout(startTyping, startDelay)
    } else {
      startTyping()
    }

    return clearTimers
  }, [fullText, speed, startDelay, reset, clearTimers])

  return {
    displayedText,
    isComplete,
    isTyping,
    skip,
    reset,
    progress
  }
}
