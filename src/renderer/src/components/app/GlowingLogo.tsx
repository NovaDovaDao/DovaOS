// src/renderer/src/components/app/GlowingLogo.tsx
import { useEffect, useRef } from 'react'
import DovaLogo from '@renderer/assets/logo.svg?react'

const GlowingLogo = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect((): (() => void) => {
    const container = containerRef.current
    if (!container) return () => {}

    const createSparkle = (): void => {
      const sparkle = document.createElement('div')
      sparkle.className = 'absolute w-1 h-1 bg-white rounded-full animate-sparkle'

      // Random position around the logo
      const angle = Math.random() * Math.PI * 2
      const distance = 40 + Math.random() * 20
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance

      sparkle.style.left = `calc(50% + ${x}px)`
      sparkle.style.top = `calc(50% + ${y}px)`

      container.appendChild(sparkle)

      // Remove sparkle after animation
      setTimeout(() => sparkle.remove(), 1000)
    }

    const interval = setInterval(createSparkle, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-48 h-8">
      <div ref={containerRef} className="relative w-full">
        <div className="absolute inset-0 flex items-center justify-center animate-float">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 blur-xl opacity-50 animate-pulse" />
            <DovaLogo className="relative h-8 w-48" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlowingLogo
