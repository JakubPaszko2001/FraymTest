"use client";

import Image from "next/image";
import planet from "@/app/assets/planetSVG.svg";

type HoldButtonProps = {
  onHoldStart: (
    event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => void;
  onHoldEnd: (
    event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => void;
};

export default function HoldButton({ onHoldStart, onHoldEnd }: HoldButtonProps) {
  return (
    <button
      className="!z-50 absolute bottom-[32px] left-1/2 -translate-x-1/2 flex items-center justify-center w-24 h-24 rounded-full hover:bg-white/20 transition-all duration-300 active:scale-95 group overflow-hidden"
      onMouseDown={onHoldStart}
      onMouseUp={onHoldEnd}
      onMouseLeave={onHoldEnd}
      onTouchStart={onHoldStart}
      onTouchEnd={onHoldEnd}
    >
      {/* Obracający się napis HOLD */}
      <div className="absolute inset-0 animate-spin-slow text-[12px] font-semibold text-gray-200 uppercase tracking-[3px] pointer-events-none select-none">
        <svg viewBox="0 0 120 120" className="w-full h-full fill-none">
          <path
            id="circlePath"
            d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
            fill="none"
          />
          <text fill="currentColor">
            <textPath xlinkHref="#circlePath" startOffset="0%">
              • HOLD • HOLD • HOLD • HOLD •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Ikona planety */}
      <Image
        src={planet}
        alt="Planet icon"
        width={40}
        height={40}
        className="opacity-90 group-hover:scale-110 transition-transform duration-300"
      />

      {/* Efekt poświaty */}
      <span className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500"></span>
    </button>
  );
}
