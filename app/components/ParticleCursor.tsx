'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CursorEffect1() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const cursorSize = 160
    const offset = cursorSize / 2

    // 🖱️ płynny ruch kursora
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - offset,
        y: e.clientY - offset,
        duration: 0.6,
        ease: 'none',
      })
    }
    document.addEventListener('mousemove', moveCursor)

    // 🌊 obsługa hoverów (globalna)
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // usuń wszystkie trwające animacje na kursorze, zanim rozpoczniesz nową
      gsap.killTweensOf(cursor)

      // jeśli element lub jego rodzic ma cursor-ignore → nic nie rób
      if (target.closest('.cursor-ignore')) {
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'none' })
        return
      }

      if (target.closest('a') || target.closest('button')) {
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.3,
          ease: 'none',
        })
      } else {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.4,
          ease: 'none',
        })
      }
    }

    // ✨ event delegation działa wszędzie, nawet w SSR i dynamicznych komponentach
    document.body.addEventListener('mouseover', handleHover)
    document.body.addEventListener('mouseout', handleHover)

    // 🧹 cleanup
    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.body.removeEventListener('mouseover', handleHover)
      document.body.removeEventListener('mouseout', handleHover)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="
        fixed top-0 left-0 w-40 h-40
        rounded-full bg-white
        mix-blend-difference
        pointer-events-none
        z-[9999]
        shadow-[0_0_30px_rgba(255,255,255,0.3)]
      "
    />
  )
}
