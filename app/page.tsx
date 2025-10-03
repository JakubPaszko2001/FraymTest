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
        {/* <ScrollControls pages={1} damping={0.3}>
          <Scroll> */}
            <Model />
          {/* </Scroll>
        </ScrollControls> */}
        <Environment preset="city" />
      </Canvas>
    </>
  )
}
