"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Split text into characters
    if (textRef.current) {
      const text = new SplitType(textRef.current, { types: "chars" });

      const scrollConfig = {
        trigger: textRef.current,
        start: "top 50%",
        end: "top 20%",
        scrub: true,
        toggleActions: "play play reverse reverse",
      };

      // Subtelne rozjaśnianie wszystkich liter
      gsap.fromTo(
        text.chars,
        { opacity: 0.4 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.02,
          scrollTrigger: scrollConfig,
        }
      );

      // Czerwony efekt dla niektórych słów
      gsap.fromTo(
        textRef.current.querySelectorAll("span .char"),
        { color: "#555555" },
        {
          color: "#0000FF", // Tailwindowy niebieski (możesz zmienić np. na #ff0000)
          duration: 0.3,
          stagger: 0.02,
          scrollTrigger: scrollConfig,
        }
      );
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-8 text-start">
      <p
        ref={textRef}
        className="fade-text text-4xl md:text-5xl font-extrabold leading-snug text-white max-w-4xl uppercase"
      >
        Jesteśmy <span>innowacyjną</span> firmą wykorzystującą najnowsze
        technologie oraz tworzącą <span>unikalne</span> designy, które
        zachwycają i zapadają w pamięć naszym klientom.
      </p>
    </section>
  );
}
