import React, { useRef, ComponentRef } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import * as THREE from 'three'

export default function Model() {
  const { nodes } = useGLTF("/medias/lavalampMesh6.glb");
  const { viewport } = useThree()
  const torus = useRef<THREE.Mesh | null>(null);

  // ✅ poprawne typowanie refa
  const materialRef = useRef<ComponentRef<typeof MeshTransmissionMaterial>>(null)

  useFrame(() => {
    if (torus.current) {
      torus.current.rotation.y += 0.005
    }
  })

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
    attenuationDistance: { value: 2.5, min: 0, max: 10, step: 0.1 },
    color: { value: '#ff00ff' },
  })

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
        position={[0, -2.7, 0]}
        scale={[0.15, 0.15, 0.15]}
      >
        <MeshTransmissionMaterial ref={materialRef} {...materialProps} />
      </mesh>
    </group>
  )
}
