'use client'
import AboutSection from './components/AboutSection';
import AccordionSection from './components/AccordionSection';
import MainSection from './components/MainSection';
import HowWeWork from './components/HowWeWork';
import ContactPage from './components/ContactPage';

export default function Page() {
  return (
    <>
      <MainSection />
      <AboutSection />
      <AccordionSection />
      <HowWeWork />
      <ContactPage />
    </>
  )
}
