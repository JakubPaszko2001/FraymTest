"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

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
        rotate: 225, // strzałka w górę
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
        rotate: 45, // strzałka w dół
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

        {/* Strzałka (tworzona w CSS) */}
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

  const sections = [
    {
      title: "Biznesowe",
      items: ["Firmowa", "Usługowa", "Marketplace", "Platforma SAAS"],
    },
    {
      title: "Personalne",
      items: ["Portfolio", "Blog", "Wizytówka", "Strona CV"],
    },
    {
      title: "Sklepy",
      items: ["E-commerce", "Dropshipping", "Subskrypcyjny", "Z lokalnym odbiorem"],
    },
    {
      title: "Kreatywne",
      items: ["Studio artystyczne", "Fotograficzna", "Agencja kreatywna", "Muzyczna"],
    },
  ];

  return (
    <section className="relative w-full backdrop-blur-[1px] max-w-md text-white border border-gray-700 divide-y divide-gray-700">
      {sections.map((section, index) => (
        <AccordionItem
          key={index}
          title={section.title}
          items={section.items}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </section>
  );
}
