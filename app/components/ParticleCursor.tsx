'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CursorEffect1() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isReady, setIsReady] = useState(false) // 🔹 Czekamy, aż sprawdzimy urządzenie

  // 🔹 Sprawdzenie typu urządzenia po załadowaniu klienta
  useEffect(() => {
    const mobileCheck =
      window.innerWidth < 768 ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0

    setIsMobile(mobileCheck)
    setIsReady(true) // 🔹 Dopiero teraz komponent może się wyrenderować
  }, [])

  // 🔹 Efekt kursora (tylko na desktopie)
  useEffect(() => {
    if (!isReady || isMobile) return

    const cursor = cursorRef.current
    if (!cursor) return

    const cursorSize = 160
    const offset = cursorSize / 2

    // 🔸 Ruch kursora
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - offset,
        y: e.clientY - offset,
        duration: 0.35, // 🔹 delikatnie szybszy ruch
        ease: 'none',
      })
    }

    // 🔸 Reakcja na hover
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      gsap.killTweensOf(cursor)

      if (target.closest('a') || target.closest('button')) {
        gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: 'none' })
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.4, ease: 'none' })
      }
    }

    document.addEventListener('mousemove', moveCursor)
    document.body.addEventListener('mouseover', handleHover)
    document.body.addEventListener('mouseout', handleHover)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.body.removeEventListener('mouseover', handleHover)
      document.body.removeEventListener('mouseout', handleHover)
    }
  }, [isMobile, isReady])

  // 🔹 Nie renderuj niczego, dopóki nie wykryto urządzenia
  if (!isReady || isMobile) return null

  return (
    <div
      ref={cursorRef}
      className="
        fixed top-0 left-0 w-40 h-40
        rounded-full bg-black
        mix-blend-difference
        pointer-events-none
        z-[9999]
        shadow-[0_0_40px_rgba(59,130,246,0.9),0_0_80px_rgba(59,130,246,0.6),0_0_120px_rgba(59,130,246,0.35)]
      "
    />
  )
}
