'use client'
import AboutSection from './components/AboutSection';
import AccordionSection from './components/AccordionSection';
import Test2 from './components/Test2';

export default function Page() {
  return (
    <>
      <div className="relative w-screen">
        <Test2 /> {/* pełnoekranowy Canvas w tle */}
      </div>
      <AboutSection />
      <AccordionSection />
    </>
  )
}
