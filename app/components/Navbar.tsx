'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav
      className="
        fixed inset-x-0 top-0 z-60 h-[72px]
      "
    >
      <div
        className="
          mx-auto h-full
          max-w-[1200px] 
          px-6 md:px-4
          grid grid-cols-12 items-center
          gap-x-10
        "
      >
        {/* LOGO – kolumna 1 */}
        <div className="col-start-1 col-span-1">
          <Link href="/" className="select-none">
            <span className="text-white font-serif font-bold text-[28px] leading-none">
              F
            </span>
          </Link>
        </div>

        {/* MENU – kolumny 4–9 */}
        <ul
          className="
            hidden md:flex
            col-start-4 col-span-6
            items-center justify-center gap-10
            text-white text-[14px]
          "
        >
          <li>
            <a
              href="#oferta"
              className="opacity-90 hover:opacity-100 hover:text-[#ff00ff] transition-colors"
            >
              Oferta
            </a>
          </li>
          <li>
            <a
              href="#realizacje"
              className="opacity-90 hover:opacity-100 hover:text-[#ff00ff] transition-colors"
            >
              Realizacje
            </a>
          </li>
          <li>
            <a
              href="#proces"
              className="opacity-90 hover:opacity-100 hover:text-[#ff00ff] transition-colors"
            >
              Proces
            </a>
          </li>
          <li>
            <a
              href="#kontakt"
              className="opacity-90 hover:opacity-100 hover:text-[#ff00ff] transition-colors"
            >
              Kontakt
            </a>
          </li>
        </ul>

        {/* CTA – kolumna 12 */}
        <div className="col-start-12 col-span-1 justify-self-end">
          <Link
            href="#wycena"
            className="
              inline-flex h-[34px] items-center justify-center
              rounded-full bg-white/90 px-3.5 text-[13px] font-semibold text-black
              shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]
              transition hover:-translate-y-[1px]
              hover:shadow-[0_6px_18px_rgba(0,0,0,.35),inset_0_0_0_1px_rgba(255,0,255,.4)]
            "
          >
            Wyceń projekt
          </Link>
        </div>
      </div>
    </nav>
  )
}
