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
  const buttonRef = useRef<HTMLButtonElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const ctaWrapperRef = useRef<HTMLDivElement>(null)

  // 🔹 MOBILE MENU ANIMATION
  useEffect(() => {
    if (!menuRef.current) return

    if (open) {
      document.body.style.overflow = 'hidden'
      gsap.set(menuRef.current, { display: 'flex', visibility: 'visible' })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2, // 🔹 wolniejsze wejście całego modala
        ease: 'power4.out',
      })
      tl.fromTo(
        menuRef.current.querySelectorAll('.menu-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15, // 🔹 wolniejszy rytm pojawiania się linków
          duration: 0.9,
          ease: 'power3.out',
        },
        '-=0.4'
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(menuRef.current, {
        y: '-100%',
        opacity: 0,
        duration: 0.8,
        ease: 'power4.in',
        onComplete: () => gsap.set(menuRef.current, { display: 'none', visibility: 'hidden' }),
      })
    }
  }, [open])

  // 🔹 NAVBAR ENTRANCE ANIMATION
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' } // 🔹 spowolnione wejście
    )

    tl.fromTo(
      [logoRef.current, buttonRef.current],
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.7'
    )

    tl.fromTo(
      linksRef.current?.querySelectorAll('.nav-item') || [],
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 },
      '-=0.4'
    )

    tl.fromTo(
      ctaWrapperRef.current,
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    )
  }, [])

  return (
    <>
      {/* 🔹 NAVBAR */}
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
            className="text-[#0066ff] text-2xl font-extrabold tracking-wide block opacity-0"
          >
            FRAYM
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div
          ref={linksRef}
          className="hidden xl:flex flex-1 justify-center items-center space-x-12 text-white/90 uppercase text-[13px] tracking-widest"
        >
          <div className="nav-item opacity-0">
            <a href="#services" className="hover:text-[#00aaff] transition-colors">Services</a>
          </div>
          <div className="nav-item opacity-0">
            <a href="#portfolio" className="hover:text-[#00aaff] transition-colors">Portfolio</a>
          </div>
          <div className="nav-item opacity-0">
            <a href="#process" className="hover:text-[#00aaff] transition-colors">Process</a>
          </div>
          <div className="nav-item opacity-0">
            <a href="#contact" className="hover:text-[#00aaff] transition-colors">Contact</a>
          </div>
        </div>

        {/* CTA BUTTON */}
        <div ref={ctaWrapperRef} className="hidden xl:flex items-center justify-center h-full opacity-0">
          <Link
            href="#contact"
            className="
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
          ref={buttonRef}
          onClick={() => setOpen(!open)}
          className="text-white text-3xl xl:hidden hover:text-[#00aaff] transition-colors z-[120] opacity-0"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* 🔹 MOBILE FULLSCREEN MENU */}
      <div
        ref={menuRef}
        className="
          fixed top-0 left-0 w-screen h-screen
          bg-[rgba(0,0,0,0.95)] backdrop-blur-[10px]
          flex flex-col items-center justify-center
          text-white text-3xl font-[HyperBlob] xl:hidden z-[9999]
          opacity-0 hidden space-y-4
        "
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-8 right-8 text-4xl text-white hover:text-[#00aaff] transition-colors"
        >
          <FiX />
        </button>

        <div className="menu-item"><a href="#services" onClick={() => setOpen(false)} className="hover:text-[#00e0ff] transition-all duration-300">Services</a></div>
        <div className="menu-item"><a href="#portfolio" onClick={() => setOpen(false)} className="hover:text-[#00e0ff] transition-all duration-300">Portfolio</a></div>
        <div className="menu-item"><a href="#process" onClick={() => setOpen(false)} className="hover:text-[#00e0ff] transition-all duration-300">Process</a></div>
        <div className="menu-item"><a href="#contact" onClick={() => setOpen(false)} className="hover:text-[#00e0ff] transition-all duration-300">Contact</a></div>

        {/* 🔹 CTA w divie, też animowany */}
        <div className="menu-item mt-10">
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="
              relative px-5 py-2.5
              rounded-full uppercase font-semibold tracking-wider text-sm
              text-white overflow-hidden
              bg-[radial-gradient(circle_at_30%_30%,#0066ff,#0022ff_70%)]
              shadow-[0_0_20px_rgba(0,102,255,0.4)]
              transition-all duration-500
              before:absolute before:inset-0
              before:pointer-events-none
              before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.3),transparent)]
              before:translate-x-[-100%] before:opacity-0
              hover:before:translate-x-[100%] hover:before:opacity-100
              before:transition-all before:duration-700 before:ease-out
              hover:shadow-[0_0_25px_rgba(0,153,255,0.9)]
              hover:scale-[1.06]
            "
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  )
}
