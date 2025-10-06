"use client";

import { useState } from "react";

interface SectionProps {
  title: string;
  items: string[];
}

function AccordionItem({ title, items }: SectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-700">
      {/* 🔹 Nagłówek sekcji */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 px-4 text-white font-extrabold text-lg uppercase tracking-wide"
      >
        {title}

        {/* 🔹 Strzałka CSS (domyślnie ↓, po otwarciu ↑) */}
        <span
          className={`w-3 h-3 border-r-2 border-b-2 border-white transform transition-transform duration-300 ${
            open ? "rotate-225" : "rotate-45"
          }`}
        ></span>
      </button>

      {/* 🔹 Zawartość sekcji */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="pl-8 pr-4 pb-4 text-gray-200 text-sm space-y-2">
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
  return (
    <section className="w-full max-w-md bg-black text-white border border-gray-700 divide-y divide-gray-700">
      <AccordionItem
        title="Biznesowe"
        items={["Firmowa", "Usługowa", "Marketplace", "Platforma SAAS"]}
      />
      <AccordionItem
        title="Personalne"
        items={["Portfolio", "Blog", "Wizytówka", "Strona CV"]}
      />
      <AccordionItem
        title="Sklepy"
        items={[
          "E-commerce",
          "Dropshipping",
          "Subskrypcyjny",
          "Z lokalnym odbiorem",
        ]}
      />
      <AccordionItem
        title="Kreatywne"
        items={[
          "Studio artystyczne",
          "Fotograficzna",
          "Agencja kreatywna",
          "Muzyczna",
        ]}
      />
    </section>
  );
}
