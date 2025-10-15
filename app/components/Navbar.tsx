'use client'
import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (menuRef.current) {
      if (open) {
        gsap.to(menuRef.current, {
          y: 0,
          duration: 0.6,
          ease: 'power4.out'
        })
      } else {
        gsap.to(menuRef.current, {
          y: '-100%',
          duration: 0.6,
          ease: 'power4.in'
        })
      }
    }
  }, [open])

  return (
    <nav
      className="
        fixed inset-x-0 top-0 z-50 h-[72px]
        flex items-center justify-between w-full
        px-6 md:px-10
      "
    >
      {/* LOGO */}
      <Link href="/" className="select-none">
        <span className="text-white font-serif font-bold text-[28px] leading-none">
          F
        </span>
      </Link>

      {/* HAMBURGER */}
      <button
        onClick={() => setOpen(!open)}
        className="
          text-white text-3xl
          hover:text-[#ff00ff]
          transition-colors
          z-[60]
        "
        aria-label="Menu"
      >
        {open ? <FiX /> : <FiMenu />}
      </button>

      {/* MENU OVERLAY */}
      <div
        ref={menuRef}
        className="
          fixed top-0 left-0 w-full h-screen
          bg-black flex flex-col items-center justify-center
          space-y-8 text-white text-2xl
          z-50 font-[HyperBlob]
        "
        style={{ transform: 'translateY(-100%)' }}
      >
        <a
          href="#oferta"
          className="hover:text-[#ff00ff] transition-colors"
          onClick={() => setOpen(false)}
        >
          Oferta
        </a>
        <a
          href="#realizacje"
          className="hover:text-[#ff00ff] transition-colors"
          onClick={() => setOpen(false)}
        >
          Realizacje
        </a>
        <a
          href="#proces"
          className="hover:text-[#ff00ff] transition-colors"
          onClick={() => setOpen(false)}
        >
          Proces
        </a>
        <a
          href="#kontakt"
          className="hover:text-[#ff00ff] transition-colors"
          onClick={() => setOpen(false)}
        >
          Kontakt
        </a>
      </div>
    </nav>
  )
}
