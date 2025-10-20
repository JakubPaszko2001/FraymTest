'use client'
import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const ctaWrapperRef = useRef<HTMLDivElement>(null)

  // 🔹 Mobile menu open/close animacja
  useEffect(() => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        y: open ? 0 : '-100%',
        duration: 0.6,
        ease: open ? 'power4.out' : 'power4.in',
      })
    }
  }, [open])

  // 🔹 Animacja wjazdu navbaru i elementów
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Navbar pojawia się z góry
    tl.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )

    // Logo i linki wjeżdżają sekwencyjnie
    tl.fromTo(
      logoRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.5'
    )
    tl.fromTo(
      linksRef.current?.children || [],
      { y: -10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
      },
      '-=0.4'
    )
    tl.fromTo(
      ctaWrapperRef.current,
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.3'
    )
  }, [])

  return (
    <nav
      ref={navRef}
      className="
        fixed top-6 left-1/2 -translate-x-1/2 z-[100]
        flex items-center justify-between
        w-[90%] md:w-[85%] xl:w-[70%] h-[64px]
        px-6 md:px-10 rounded-full
        border border-[#0000ff]/30
        backdrop-blur-[10px] shadow-[0_0_20px_rgba(0,0,255,0.2)]
        font-[HyperBlob] opacity-0
      "
    >
      {/* LOGO */}
      <Link href="/" className="select-none z-[70]">
        <span
          ref={logoRef}
          className="text-[#0066ff] text-2xl font-extrabold tracking-wide block"
        >
          FRAYM
        </span>
      </Link>

      {/* DESKTOP MENU */}
      <div
        ref={linksRef}
        className="hidden xl:flex flex-1 justify-center items-center space-x-12 text-white/90 uppercase text-[13px] tracking-widest"
      >
        <a href="#services" className="hover:text-[#00aaff] transition-colors">
          Services
        </a>
        <a href="#portfolio" className="hover:text-[#00aaff] transition-colors">
          Portfolio
        </a>
        <a href="#process" className="hover:text-[#00aaff] transition-colors">
          Process
        </a>
        <a href="#contact" className="hover:text-[#00aaff] transition-colors">
          Contact
        </a>
      </div>

      {/* CTA BUTTON (desktop only) */}
      <div ref={ctaWrapperRef} className="hidden xl:flex items-center justify-center h-full">
        <Link
          href="#contact"
          className="
            hidden xl:inline-block
            relative px-5 py-2.5
            rounded-full uppercase font-semibold tracking-wider text-sm
            text-white overflow-hidden
            bg-[radial-gradient(circle_at_30%_30%,#0066ff,#0022ff_70%)]
            shadow-[0_0_20px_rgba(0,102,255,0.4)]
            transition-all duration-500
            before:content-[''] before:absolute before:inset-0
            before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.3),transparent)]
            before:translate-x-[-100%] hover:before:translate-x-[100%]
            before:transition-transform before:duration-700 before:ease-out
            hover:shadow-[0_0_25px_rgba(0,153,255,0.9)]
            hover:scale-[1.06]
          "
        >
          Get a Quote
        </Link>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="text-white text-3xl xl:hidden hover:text-[#00aaff] transition-colors z-[60]"
      >
        {open ? <FiX /> : <FiMenu />}
      </button>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className="
          fixed top-0 left-0 w-full h-screen
          bg-black/90 flex flex-col items-center justify-center
          space-y-8 text-white text-2xl
          font-[HyperBlob] xl:hidden z-50
        "
        style={{ transform: 'translateY(-100%)' }}
      >
        <a
          href="#services"
          onClick={() => setOpen(false)}
          className="hover:text-[#00aaff] transition-colors"
        >
          Services
        </a>
        <a
          href="#portfolio"
          onClick={() => setOpen(false)}
          className="hover:text-[#00aaff] transition-colors"
        >
          Portfolio
        </a>
        <a
          href="#process"
          onClick={() => setOpen(false)}
          className="hover:text-[#00aaff] transition-colors"
        >
          Process
        </a>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="hover:text-[#00aaff] transition-colors"
        >
          Contact
        </a>

        {/* CTA – mobile */}
        <Link
          href="#contact"
          onClick={() => setOpen(false)}
          className="
            mt-8 px-8 py-3 rounded-full
            text-white uppercase tracking-widest font-semibold
            bg-gradient-to-r from-[#0033ff] to-[#00c6ff]
            shadow-[0_0_25px_rgba(0,153,255,0.6)]
            hover:shadow-[0_0_35px_rgba(0,204,255,0.9)]
            transition-all duration-300
          "
        >
          Get a Quote
        </Link>
      </div>
    </nav>
  )
}
