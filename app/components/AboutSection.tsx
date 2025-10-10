"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import BrushStroke from "../assets/brushstroke.png";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textH2 = useRef<HTMLHeadingElement>(null);

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

    // 🔹 Animacja dla obrazu (BrushStroke)
    if (imageRef.current) {
      gsap.set(imageRef.current, {
        position: "absolute",
        top: "40px",
        left: "-100px",
        zIndex: 10,
      });
    
      gsap.fromTo(
        imageRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // 🔹 Animacja dla tekstu (h2)
    if (textH2.current) {
      gsap.set(textH2.current, {
        position: "absolute",
        top: "130px",
        left: "32px",
        zIndex: 10,
      });
    
      gsap.fromTo(
        textH2.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textH2.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // 🔹 SplitType + char reveal
    if (textRef.current) {
      const text = new SplitType(textRef.current, { types: "words,chars" });

      const scrollConfig = {
        trigger: textRef.current,
        start: "top 90%",
        end: "top 30%",
        scrub: true,
      };

      // litery spoza <span>
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

      // litery w <span> – niebieski
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
    <section className="relative min-h-screen w-full flex items-center justify-center px-8 text-start flex flex-col font-[HyperBlob]">
      {/* 🔹 Brush Stroke z animacją opacity */}
      <Image
        ref={imageRef}
        src={BrushStroke}
        alt="Brush Stroke"
        // className="absolute top-10 left-10 z-10"
        width={300}
      />

      {/* 🔹 Nagłówek */}
      <h2 ref={textH2} className="text-xl font-extrabold z-20 text-white">
        About
      </h2>

      {/* 🔹 Tekst z animacją char */}
      <p
        ref={textRef}
        className="fade-text text-2xl font-extrabold leading-snug text-white max-w-4xl uppercase z-20"
      >
        WE ARE{" "}
        <span className="backdrop-blur-[1px] rounded-md px-1">INNOVATIVE</span> company that uses the latest technologies and creates <span className="backdrop-blur-[1px] rounded-md px-1">UNIQUE</span> designs that amaze and leave a lasting impression on our clients.
      </p>
    </section>
  );
}
