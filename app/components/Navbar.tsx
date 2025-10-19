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
          ease: 'power4.out',
        })
      } else {
        gsap.to(menuRef.current, {
          y: '-100%',
          duration: 0.6,
          ease: 'power4.in',
        })
      }
    }
  }, [open])

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-6 md:px-10 h-[80px]
        backdrop-blur-[1px] bg-transparent
        border-b-[1px] border-[#0000ff]/100
        font-[HyperBlob]
      "
    >
      {/* LOGO */}
      <Link href="/" className="select-none">
        <span className="text-[#0000ff] text-3xl font-extrabold tracking-wider">
          FRAYM
        </span>
      </Link>

      {/* DESKTOP NAV */}
      <div
        className="
          hidden lg:flex items-center space-x-10
          text-white uppercase text-sm tracking-widest
        "
      >
        <a
          href="#services"
          className="relative group transition-colors duration-300"
        >
          <span className="group-hover:text-[#0000ff]">Services</span>
          <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#0000ff] transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a
          href="#portfolio"
          className="relative group transition-colors duration-300"
        >
          <span className="group-hover:text-[#0000ff]">Portfolio</span>
          <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#0000ff] transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a
          href="#process"
          className="relative group transition-colors duration-300"
        >
          <span className="group-hover:text-[#0000ff]">Process</span>
          <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#0000ff] transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a
          href="#contact"
          className="relative group transition-colors duration-300"
        >
          <span className="group-hover:text-[#0000ff]">Contact</span>
          <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#0000ff] transition-all duration-300 group-hover:w-full"></span>
        </a>

        {/* CTA */}
        <Link
          href="#contact"
          className="
            ml-6 border border-[#0000ff] text-[#0000ff] px-5 py-2
            rounded-none hover:bg-[#0000ff] hover:text-black
            transition-all duration-300 tracking-widest
          "
        >
          GET A QUOTE
        </Link>
      </div>

      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setOpen(!open)}
        className="text-white text-3xl lg:hidden hover:text-[#0000ff] transition-colors z-[60]"
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
          font-[HyperBlob] lg:hidden z-50
          border-b border-[#0000ff]/30
        "
        style={{ transform: 'translateY(-100%)' }}
      >
        <a
          href="#services"
          className="hover:text-[#0000ff] transition-colors"
          onClick={() => setOpen(false)}
        >
          Services
        </a>
        <a
          href="#portfolio"
          className="hover:text-[#0000ff] transition-colors"
          onClick={() => setOpen(false)}
        >
          Portfolio
        </a>
        <a
          href="#process"
          className="hover:text-[#0000ff] transition-colors"
          onClick={() => setOpen(false)}
        >
          Process
        </a>
        <a
          href="#contact"
          className="hover:text-[#0000ff] transition-colors"
          onClick={() => setOpen(false)}
        >
          Contact
        </a>
        <Link
          href="#contact"
          onClick={() => setOpen(false)}
          className="
            mt-6 px-6 py-2 border border-[#0000ff]
            text-[#0000ff] hover:bg-[#0000ff] hover:text-black
            transition-all duration-300
          "
        >
          GET A QUOTE
        </Link>
      </div>
    </nav>
  )
}
