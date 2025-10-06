'use client'
import { Canvas } from '@react-three/fiber'
import { Environment, ScrollControls, Scroll } from '@react-three/drei'
import Model from './components/Model'
import DiagonalStripes from "./components/DiagonalStripes";
import AboutSection from './components/AboutSection';

export default function Page() {
  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 0.8] }}
          className="absolute inset-0 z-0"
          style={{ background: '#000000' }}
        >
          <Model />
          <Environment preset="city" />
        </Canvas>

        {/* DiagonalStripes jest absolute w środku, więc tu nic nie dodawaj */}
        <DiagonalStripes
          topText="BUDUJEMY STRONY"
          bottomText="NIE DO ZASTĄPIENIA"
          topSpeed={70}
          bottomSpeed={65}
          topTiltDeg={-15}
          bottomTiltDeg={0}
          stripeHeight={72}
          fontSize={24}
        />
      </div>
      <AboutSection />
    </>
  )
}
