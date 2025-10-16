"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Upewniamy się, że GSAP działa tylko po stronie klienta
    if (typeof window === "undefined") return;

    // Jeśli referencje istnieją
    if (!titleRef.current || !textRef.current || !formRef.current || !footerRef.current) return;

    // Tworzymy timeline z animacjami fade-in
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 },
    });

    tl.from(titleRef.current, { opacity: 0, y: 40 })
      .from(textRef.current, { opacity: 0, y: 40 }, "-=0.5")
      .from(formRef.current, { opacity: 0, y: 40 }, "+=0.3")
      .from(footerRef.current, { opacity: 0, y: 20 }, "+=0.2");

    // czyszczenie (bez GSAP context — proste i bezpieczne)
    return () => {
      tl.kill();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent! 🚀");
  };

  return (
    <main className="relative min-h-screen text-gray-300 overflow-hidden font-[HyperBlob]">
      {/* Tło z gwiazdami */}
      <div className="absolute inset-0 bg-[url('/stars-bg.png')] bg-cover bg-center opacity-30"></div>

      {/* Zawartość */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-24 space-y-10">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-extrabold text-blue-500 tracking-widest"
        >
          CONTACT US
        </h1>

        <p
          ref={textRef}
          className="text-white max-w-2xl mx-auto leading-relaxed font-light"
        >
          Have a project in mind? Let’s create something{" "}
          <span className="text-blue-400">cosmic</span> together. Reach out to us and we’ll get
          back to you within 48 hours.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full placeholder-white bg-transparent border border-blue-500/40 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full placeholder-white bg-transparent border border-blue-500/40 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full placeholder-white bg-transparent border border-blue-500/40 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
            className="w-full placeholder-white bg-transparent border border-blue-500/40 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />

          <button
            type="submit"
            className="relative overflow-hidden border border-blue-500 text-blue-500 font-bold tracking-widest px-10 py-3 rounded-xl uppercase transition duration-300 hover:bg-blue-600 hover:text-white"
          >
            SEND MESSAGE
          </button>
        </form>

        <div
          ref={footerRef}
          className="mt-20 text-sm text-gray-500 tracking-widest uppercase"
        >
          ORBITING AT <span className="text-blue-400 block mt-2">hello@fraymweb.com</span>
        </div>
      </div>
    </main>
  );
}
