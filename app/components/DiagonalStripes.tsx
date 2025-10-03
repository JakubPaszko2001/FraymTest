'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

type Props = {
  topText?: string
  bottomText?: string
  topSpeed?: number      // sekundy na pełny obieg
  bottomSpeed?: number
  topTiltDeg?: number
  bottomTiltDeg?: number
  stripeHeight?: number  // px
  fontSize?: number      // px
}

export default function DiagonalStripes({
  topText = 'BUDUJEMY STRONY',
  bottomText = 'NIE DO ZASTĄPIENIA',
  topSpeed = 18,
  bottomSpeed = 14,
  topTiltDeg = -15,
  bottomTiltDeg = 0,
  stripeHeight = 64,
  fontSize = 22,
}: Props) {
  const topTrackRef = useRef<HTMLDivElement | null>(null)
  const botTrackRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const setupMarquee = (
        track: HTMLDivElement | null,
        direction: 'left' | 'right',
        durationSec: number
      ) => {
        if (!track) return

        // 1) upewnij się, że są 2 kopie zawartości
        const content = track.querySelector('.marquee-content') as HTMLDivElement
        if (!content) return
        if (track.querySelectorAll('.marquee-content').length < 2) {
          track.appendChild(content.cloneNode(true))
        }

        // 2) szerokość jednego segmentu (połowa całości po zduplikowaniu)
        //   ważne: odczyt po klonowaniu
        const contentWidth = (track.scrollWidth / 2) || 1

        // 3) reset i pętla z wrapem w zakresie [-contentWidth, 0]
        const wrapX = gsap.utils.wrap(-contentWidth, 0) // zwraca funkcję
        gsap.set(track, { x: 0 })

        gsap.to(track, {
          // dla left jedziemy 0 -> -contentWidth, dla right -contentWidth -> 0
          x: direction === 'left' ? -contentWidth : 0,
          duration: durationSec,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: (x) => wrapX(parseFloat(x)) + 'px',
          },
          // aby prawa->lewa też działało płynnie, zaczynamy od przeciwnego końca i jedziemy w górę
          startAt: direction === 'right' ? { x: -contentWidth } : undefined,
        })
      }

      setupMarquee(topTrackRef.current, 'left', topSpeed)
      setupMarquee(botTrackRef.current, 'right', bottomSpeed)
    })
    return () => ctx.revert()
  }, [topSpeed, bottomSpeed])

  const stripeBase =
    'absolute left-[-15vw] w-[130vw] flex items-center bg-white overflow-hidden text-black'

  const row = (
    text: string,
  ) => (
    <div
      className="marquee-content flex items-center gap-10 px-8 select-none"
      style={{ fontSize }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="font-extrabold uppercase tracking-wide whitespace-nowrap"
        >
          {text}
        </span>
      ))}
    </div>
  )

  return (
    <div className="absolute bottom-0 w-full h-[280px] overflow-hidden">
      {/* Górny pasek (prawo -> lewo) */}
      <div
        className={stripeBase}
        style={{ top: 100, height: stripeHeight, transform: `rotate(${topTiltDeg}deg)`, borderBottom: '2px solid black', zIndex: 1 }}
      >
        <div ref={topTrackRef} className="relative h-full flex items-center">
          {row(topText)}
        </div>
      </div>

      {/* Dolny pasek (lewo -> prawo) */}
      <div
        className={stripeBase}
        style={{ bottom: 0, height: stripeHeight, transform: `rotate(${bottomTiltDeg}deg)` }}
      >
        <div ref={botTrackRef} className="relative h-full flex items-center">
          {row(bottomText)}
        </div>
      </div>
    </div>
  )
}
