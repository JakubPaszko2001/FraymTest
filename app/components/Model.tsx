import React, { useRef, ComponentRef, useLayoutEffect } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import * as THREE from 'three'
import gsap from 'gsap'

export default function Model() {
  const { nodes } = useGLTF("/medias/lavalampMesh6.glb");
  const { viewport } = useThree()

  // Refy
  const torus = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<ComponentRef<typeof MeshTransmissionMaterial>>(null)

  // Kontrolki Leva – materiał + pływanie
  const {
    thickness, roughness, transmission, ior, chromaticAberration,
    backside, attenuationDistance, color,
    floatAmplitude, floatDuration
  } = useControls({
    // Material
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
    attenuationDistance: { value: 2.5, min: 0, max: 10, step: 0.1 },
    color: { value: '#ff00ff' },
    // Floating
    floatAmplitude: { value: 0.25, min: 0, max: 1, step: 0.01 },
    floatDuration: { value: 2.5, min: 0.5, max: 10, step: 0.1 },
  })

  // Delikatna rotacja obiektu
  useFrame(() => {
    if (torus.current) {
      torus.current.rotation.y += 0.005
    }
  })

  // GSAP: pływa tylko mesh GLB (góra–dół)
useLayoutEffect(() => {
  const mesh = torus.current
  if (!mesh) return

  const startY = mesh.position.y
  const tl = gsap.timeline({ repeat: -1, yoyo: true })

  tl.to(mesh.position, {
    y: startY + floatAmplitude,
    duration: floatDuration,
    ease: 'sine.inOut',
  })

  return () => {
    tl.kill()
    gsap.killTweensOf(mesh.position)
    mesh.position.y = startY
  }
}, [floatAmplitude, floatDuration])

  return (
    <group scale={viewport.width / 3.75}>
      <Text
        font={'/fonts/hyperblob2.otf'}
        position={[0, 0.3, -1]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
        sdfGlyphSize={256}
      >
        FRAYMWEB
      </Text>

      <mesh
        ref={torus}
        geometry={(nodes.Mball as THREE.Mesh).geometry}
        position={[0, -2.3, 0]}
        scale={[0.13, 0.13, 0.13]}
      >
        <MeshTransmissionMaterial
          ref={materialRef}
          thickness={thickness}
          roughness={roughness}
          transmission={transmission}
          ior={ior}
          chromaticAberration={chromaticAberration}
          backside={backside}
          attenuationDistance={attenuationDistance}
          color={color as THREE.ColorRepresentation}
        />
      </mesh>
    </group>
  )
}
