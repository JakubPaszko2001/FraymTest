'use client'
import { Canvas } from '@react-three/fiber'
import { Environment, ScrollControls, Scroll } from '@react-three/drei'
import Model from './components/Model'

export default function Page() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 0.8] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#000000',
        }}
      >
        {/* ScrollControls = smoothscroll */}
        <ScrollControls pages={3} damping={0.3}>
          {/* 3D przewijane */}
          <Scroll>
            <Model />
          </Scroll>

          {/* HTML przewijany razem z 3D */}
          <Scroll html>
            {/* <section style={{ height: '100vh',  width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h1 style={{ color: 'white', fontSize: '4rem' }}>FRAYMWEB 🚀</h1>
            </section>
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: 'white', fontSize: '2rem' }}>Scrolluj w dół płynnie...</p>
            </section>
            <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: 'white', fontSize: '2rem' }}>...i dodaj więcej sekcji!</p>
            </section> */}
          </Scroll>
        </ScrollControls>

        <Environment preset="city" />
      </Canvas>
    </>
  )
}
