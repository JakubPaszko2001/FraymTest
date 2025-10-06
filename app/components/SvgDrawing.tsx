"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ArrowScrollDraw() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();

      // Ustawiamy długość kreski (ukryta na starcie)
      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // 🔹 Animacja rysowania przy scrollu
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: pathRef.current,
          start: "top 80%", // kiedy SVG pojawi się na ekranie
          end: "bottom 20%", // do kiedy ma się rysować
          scrub: true, // płynne przewijanie = płynne rysowanie
        },
      });
    }
  }, []);

  return (
    <div className="min-h-[200vh] bg-black flex items-center justify-center">
      <svg
        width="150"
        height="300"
        viewBox="0 0 100 182"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M57.9926 0C57.9926 22 57.9926 -14 57.9926 60.2129C57.9926 73.6142 56.1925 90.0997 74.9925 94.4997C84.4927 96.7231 97.9926 90.008 97.9926 75.9997C97.9926 70.9997 97.9926 57.4997 78.9927 54.4997C61.9927 52.4997 52.5 52 43.5 54.4997C6.78268 64.6977 20.5 149.5 24 178.5M24 178.5C29.1667 173.5 40.5001 159 44.5001 141M24 178.5C18.5 170.666 6.50013 152.8 2.50013 144"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
