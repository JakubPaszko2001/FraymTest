import WorkCard from "./WorkCard";

export default function HowWeWork() {
  const steps = [
    {
      step: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-5 h-5 mr-2 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          DISCOVERY PHASE
        </>
      ),
      title: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-5 h-5 mr-2 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.1 0-2 .9-2 2v4H8l4 4 4-4h-2v-4c0-1.1-.9-2-2-2z"
            />
          </svg>
          Consultation
        </>
      ),
      text: "We start by understanding your vision, business goals, and expectations for the project.",
      note: "This is where your idea begins to take shape.",
    },
    {
      step: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-5 h-5 mr-2 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v16h16V4H4zm8 4h4m-8 4h8m-8 4h4"
            />
          </svg>
          DESIGN & EXPERIENCE
        </>
      ),
      title: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-5 h-5 mr-2 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m-9-7h9a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h6"
            />
          </svg>
          UX/UI Design
        </>
      ),
      text: "We craft intuitive layouts, refined aesthetics, and interactions that delight users.",
      note: "We create a visual language that tells your brand’s story.",
    },
    {
      step: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-5 h-5 mr-2 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
          DEVELOPMENT CORE
        </>
      ),
      title: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-5 h-5 mr-2 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          Development
        </>
      ),
      text: "We implement the project using modern technologies, ensuring speed, security, and responsiveness.",
      note: "Clean, precise code — the foundation of your online presence.",
    },
    {
      step: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-5 h-5 mr-2 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12 6-12 7z"
            />
          </svg>
          LAUNCH SEQUENCE
        </>
      ),
      title: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-5 h-5 mr-2 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12l5 5L20 7"
            />
          </svg>
          Testing & Launch
        </>
      ),
      text: "We review every pixel, every function, and every effect before your site goes live.",
      note: "Before you press 'start', we’re already one step ahead.",
    },
  ];

    // const steps = [
//   {
//     step: (
//       <>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="inline-block w-5 h-5 mr-2 text-blue-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M13 10V3L4 14h7v7l9-11h-7z"
//           />
//         </svg>
//         DISCOVERY PHASE
//       </>
//     ),
//     title: (
//       <>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="inline-block w-5 h-5 mr-2 text-blue-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M12 8c-1.1 0-2 .9-2 2v4H8l4 4 4-4h-2v-4c0-1.1-.9-2-2-2z"
//           />
//         </svg>
//         Consultation
//       </>
//     ),
//     subtitle: "Konsultacja i analiza potrzeb",
//     text: "Rozpoczynamy od poznania Twojej wizji, celów biznesowych oraz oczekiwań wobec projektu.",
//     note: "To moment, w którym Twoja idea zaczyna przybierać realny kształt.",
//   },
//   {
//     step: (
//       <>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="inline-block w-5 h-5 mr-2 text-blue-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 4v16h16V4H4zm8 4h4m-8 4h8m-8 4h4"
//           />
//         </svg>
//         DESIGN & EXPERIENCE
//       </>
//     ),
//     title: (
//       <>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="inline-block w-5 h-5 mr-2 text-blue-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M12 8v4l3 3m-9-7h9a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h6"
//           />
//         </svg>
//         UX/UI Design
//       </>
//     ),
//     subtitle: "Projekt UX/UI",
//     text: "Projektujemy intuicyjny układ, dopasowaną estetykę i interakcje, które zachwycają użytkowników.",
//     note: "Tworzymy wizualny język, który opowiada historię Twojej marki.",
//   },
//   {
//     step: (
//       <>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="inline-block w-5 h-5 mr-2 text-blue-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 6h16M4 10h16M4 14h16M4 18h16"
//           />
//         </svg>
//         DEVELOPMENT CORE
//       </>
//     ),
//     title: (
//       <>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="inline-block w-5 h-5 mr-2 text-blue-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M3 7h18M3 12h18M3 17h18"
//           />
//         </svg>
//         Development
//       </>
//     ),
//     subtitle: "Programowanie i integracja",
//     text: "Wdrażamy projekt w najnowszych technologiach, dbając o prędkość, bezpieczeństwo i responsywność.",
//     note: "Precyzyjny kod — solidny fundament Twojej obecności online.",
//   },
//   {
//     step: (
//       <>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="inline-block w-5 h-5 mr-2 text-blue-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 19V6l12 6-12 7z"
//           />
//         </svg>
//         LAUNCH SEQUENCE
//       </>
//     ),
//     title: (
//       <>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="inline-block w-5 h-5 mr-2 text-blue-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M5 12l5 5L20 7"
//           />
//         </svg>
//         Testing & Launch
//       </>
//     ),
//     subtitle: "Testy i wdrożenie",
//     text: "Sprawdzamy każdy piksel, każdą funkcję i każdy efekt, zanim Twoja strona trafi do sieci.",
//     note: "Zanim klikniesz 'start', my już jesteśmy o krok dalej.",
//   },
//   {
//     step: (
//       <>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="inline-block w-5 h-5 mr-2 text-blue-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M12 8v4l3 3m6-7a9 9 0 11-18 0 9 9 0 0118 0z"
//           />
//         </svg>
//         LIFETIME SUPPORT
//       </>
//     ),
//     title: (
//       <>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="inline-block w-5 h-5 mr-2 text-blue-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9.75 9.75h.008v.008H9.75V9.75zm0 4.5h.008v.008H9.75v-.008zM15 9.75h.008v.008H15V9.75zm0 4.5h.008v.008H15v-.008z"
//           />
//         </svg>
//         Step 5 — Support
//       </>
//     ),
//     subtitle: "Wsparcie po publikacji",
//     text: "Zapewniamy monitoring, aktualizacje, optymalizację i techniczne wsparcie, by Twoja strona zawsze działała perfekcyjnie.",
//     note: "Nasza współpraca nie kończy się na starcie — to dopiero początek.",
//   },
// ];
//////////

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-white py-20">
      <div className="w-full max-w-3xl px-4 space-y-10">
        {steps.map((s, i) => (
          <WorkCard
            key={i}
            step={s.step}
            title={s.title}
            text={s.text}
            note={s.note}
          />
        ))}
      </div>
    </section>
  );
}
