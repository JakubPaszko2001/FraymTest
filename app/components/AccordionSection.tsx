"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import BrushStroke from "../assets/brushstroke.png";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  title: string;
  items: string[];
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, items, isOpen, onToggle }: SectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  // 🔹 Animacja rozwijania sekcji + itemów
  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;

    if (isOpen) {
      // pokaż kontener
      gsap.to(el, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      // obrót strzałki
      gsap.to(arrowRef.current, {
        rotate: 225,
        duration: 0.4,
        ease: "power2.out",
      });

      // animacja itemów (fade + slide-up)
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.1,
        }
      );
    } else {
      // ukrycie sekcji
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
      });
      gsap.to(arrowRef.current, {
        rotate: 45,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  // 🔹 Efekt SCRAMBLE na hover tytułu
  const scrambleInterval = useRef<NodeJS.Timeout | null>(null);

  const handleHover = () => {
    if (!titleRef.current) return;
    const original = title.toUpperCase();
    const chars = "!@#$%^&*()_+=-<>?/[]{}ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iteration = 0;

    if (scrambleInterval.current) clearInterval(scrambleInterval.current);

    scrambleInterval.current = setInterval(() => {
      if (!titleRef.current) return;

      const newText = original
        .split("")
        .map((char, index) => {
          if (index < iteration) return original[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      titleRef.current.textContent = newText;
      iteration += 1 / 2.5;
      if (iteration >= original.length) {
        clearInterval(scrambleInterval.current!);
        titleRef.current.textContent = original;
      }
    }, 30);
  };

  const handleLeave = () => {
    if (scrambleInterval.current) clearInterval(scrambleInterval.current);
    if (titleRef.current) titleRef.current.textContent = title;
  };

  return (
    <div
      className="border-b border-gray-700 overflow-hidden accordion-section-item"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-4 lg:py-8 px-4 lg:px-8 text-white font-extrabold text-lg lg:text-4xl uppercase tracking-wide transition-all duration-300"
      >
        <span ref={titleRef}>{title}</span>
        <span
          ref={arrowRef}
          className="w-3 h-3 lg:w-5 lg:h-5 border-r-2 border-b-2 border-white transform rotate-45 transition-transform duration-300"
        ></span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden opacity-0 h-0 pl-8 pr-4 lg:pl-16 lg:pr-10 text-gray-200 text-sm lg:text-2xl"
      >
        <ul className="pb-4 space-y-2 lg:space-y-4">
          {items.map((item, i) => (
            <li
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="hover:text-white transition-colors duration-200 opacity-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AccordionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textH2 = useRef<HTMLHeadingElement>(null);

  const sections = [
    {
      title: "Business",
      items: ["Corporate", "Service", "Marketplace", "SAAS Platform"],
    },
    {
      title: "Personal",
      items: ["Portfolio", "Blog", "Business Card", "Resume Website"],
    },
    {
      title: "E-Commerce",
      items: [
        "E-commerce",
        "Dropshipping",
        "Subscription-based",
        "Local Pickup",
      ],
    },
    {
      title: "Creative",
      items: ["Art Studio", "Photography", "Creative Agency", "Music"],
    },
  ];

  // 🔹 Scroll + fade-in sekcji
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

    if (imageRef.current) {
      gsap.set(imageRef.current, {
        position: "absolute",
        top: "-210px",
        left: "-110px",
        zIndex: 10,
      });

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (textH2.current) {
      gsap.set(textH2.current, {
        position: "absolute",
        top: "-110px",
        left: "32px",
        zIndex: 20,
      });

      gsap.fromTo(
        textH2.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textH2.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    gsap.fromTo(
      ".accordion-container",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".accordion-container",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".accordion-section-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".accordion-container",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="relative w-full flex items-center md:min-h-[80vh] justify-center text-start flex-col font-[HyperBlob] px-4 lg:px-0 pt-10">
      <Image
        ref={imageRef}
        src={BrushStroke}
        alt="Brush Stroke"
        width={320}
        className="z-10 md:hidden"
      />

      <h2
        ref={textH2}
        className="md:hidden text-xl lg:text-5xl font-extrabold z-20 text-white"
      >
        We Create
      </h2>

      <div className="accordion-container relative w-full lg:max-w-[1124px] backdrop-blur-[1px] text-white border border-gray-700 divide-y divide-gray-700">
        {sections.map((section, index) => (
          <AccordionItem
            key={index}
            title={section.title}
            items={section.items}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          />
        ))}
      </div>
    </section>
  );
}
