"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import BrushStroke from "../assets/brushstroke.png";

// Rejestracja pluginu ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (textRef.current) {
      // 🔹 rozdzielamy na słowa i litery
      const text = new SplitType(textRef.current, { types: "words,chars" });

      const scrollConfig = {
        trigger: textRef.current,
        start: "top 90%",
        end: "top 30%",
        scrub: true,
      };

      // 🔸 litery spoza <span>
      gsap.fromTo(
        (text.chars ?? []).filter((c) => !c.closest("span")),
        { opacity: 0.4, color: "#777" },
        {
          opacity: 1,
          color: "#ffffff",
          duration: 0.6,
          stagger: 0.02,
          ease: "power2.out",
          scrollTrigger: scrollConfig,
        }
      );

      // 🔹 litery w <span> – niebieski
      gsap.fromTo(
        textRef.current.querySelectorAll("span .char"),
        { opacity: 0.4, color: "#555" },
        {
          opacity: 1,
          color: "#0000ff",
          duration: 0.4,
          stagger: 0.02,
          ease: "power2.out",
          scrollTrigger: scrollConfig,
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-black flex items-center justify-center px-8 text-start flex flex-col">
       <Image
         src={BrushStroke}
         alt="Brush Stroke"
         className="absolute top-10 -left-30 z-10"
         width={300}
       />
       <h2 className="absolute top-33 left-[32px] text-xl font-extrabold z-20">O NAS</h2>
      <p
        ref={textRef}
        className="fade-text text-2xl font-extrabold leading-snug text-white max-w-4xl uppercase"
      >
        Jesteśmy{" "}
        <span>innowacyjną</span> firmą wykorzystującą najnowsze technologie oraz
        tworzącą <span>unikalne</span> designy, które zachwycają i zapadają w
        pamięć naszym klientom.
      </p>
    </section>
  );
}
