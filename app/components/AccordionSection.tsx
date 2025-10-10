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

  useEffect(() => {
    if (!contentRef.current) return;

    const el = contentRef.current;

    if (isOpen) {
      gsap.to(el, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(arrowRef.current, {
        rotate: 225, // arrow up
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
      });
      gsap.to(arrowRef.current, {
        rotate: 45, // arrow down
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-700 overflow-hidden !z-100">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-4 px-4 text-white font-extrabold text-lg uppercase tracking-wide"
      >
        {title}

        <span
          ref={arrowRef}
          className="w-3 h-3 border-r-2 border-b-2 border-white transform rotate-45"
        ></span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden opacity-0 h-0 pl-8 pr-4 text-gray-200 text-sm"
      >
        <ul className="pb-4 space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="hover:text-white transition-colors duration-200"
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
      items: ["E-commerce", "Dropshipping", "Subscription-based", "Local Pickup"],
    },
    {
      title: "Creative",
      items: ["Art Studio", "Photography", "Creative Agency", "Music"],
    },
  ];

  useEffect(() => {
    // smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // animacja obrazu
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

    // animacja nagłówka
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="relative w-full flex items-center justify-center text-start flex-col font-[HyperBlob] px-4 pt-10">
      
      {/* Brush Stroke z animacją */}
      <Image
        ref={imageRef}
        src={BrushStroke}
        alt="Brush Stroke"
        width={320}
        className="z-10"
      />

      {/* Nagłówek z fade-in */}
      <h2 ref={textH2} className="text-xl font-extrabold z-20 text-white">
        We Create
      </h2>

      {/* Accordion z kategoriami */}
      <div className="relative w-full backdrop-blur-[1px] max-w-md text-white border border-gray-700 divide-y divide-gray-700">
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
