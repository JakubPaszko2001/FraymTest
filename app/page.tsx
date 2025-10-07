'use client'
import { Canvas } from '@react-three/fiber'
import { Environment, ScrollControls, Scroll } from '@react-three/drei'
import Model from './components/Model'
import DiagonalStripes from "./components/DiagonalStripes";
import AboutSection from './components/AboutSection';
import AccordionSection from './components/AccordionSection';
import Test2 from './components/Test2';

export default function Page() {
  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        <Test2 />
        {/* DiagonalStripes jest absolute w środku, więc tu nic nie dodawaj */}
        {/* <DiagonalStripes
          topText="BUDUJEMY STRONY"
          bottomText="NIE DO ZASTĄPIENIA"
          topSpeed={70}
          bottomSpeed={65}
          topTiltDeg={-15}
          bottomTiltDeg={0}
          stripeHeight={72}
          fontSize={24}
        /> */}
      </div>
      <AboutSection />
      <AccordionSection />
    </>
  )
}
