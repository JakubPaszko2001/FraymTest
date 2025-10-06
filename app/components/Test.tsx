"use client";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const vertexShader = `
  uniform float uTime;
  varying vec3 vColor;

  void main() {
    vec3 pos = position;

    // deformacja sinusoidalna (fale)
    float noise = sin(pos.x * 4.0 + uTime * 0.8) * 0.15 +
                  cos(pos.y * 5.0 + uTime * 0.5) * 0.1;
    pos += normal * noise;

    vColor = normal * 0.5 + 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 1.5;
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    gl_FragColor = vec4(vColor, 0.4);
  }
`;

function ParticleSphere() {
  const pointsRef = useRef<THREE.Points>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
  });

  // tworzymy geometrię sfery z cząsteczek
  const geometry = new THREE.SphereGeometry(2, 256, 256);

  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.elapsedTime;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
    }
  });

  return (
    <points ref={pointsRef}>
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent
        uniforms={uniforms.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
      <primitive object={geometry} attach="geometry" />
    </points>
  );
}

export default function ParticleEffect() {
  return (
    <div className="w-full h-[100vh] bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <ParticleSphere />
      </Canvas>
    </div>
  );
}