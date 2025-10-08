"use client";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import gsap from "gsap";

const vertexShader = `
  uniform float uTime;
  uniform float uExplosion;
  uniform float uExpand;
  varying float vNoise;
  varying vec3 vColor;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 g0 = vec3(a0.xy,h.x);
    vec3 g1 = vec3(a0.zw,h.y);
    vec3 g2 = vec3(a1.xy,h.z);
    vec3 g3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(g0,g0), dot(g1,g1),
                                   dot(g2,g2), dot(g3,g3)));
    g0 *= norm.x;
    g1 *= norm.y;
    g2 *= norm.z;
    g3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1),
                            dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(g0,x0), dot(g1,x1),
                                dot(g2,x2), dot(g3,x3)));
  }

  void main() {
    vec3 pos = position * uExpand;
    float noise = snoise(pos * 0.7 + uTime * 0.2);
    float explosionStrength = uExplosion * 3.0;

    pos += normalize(pos) * (noise * 0.8 + explosionStrength * 1.5);
    pos *= (1.0 + uExplosion * 1.8);

    vNoise = noise;
    vColor = mix(
      vec3(0.3 + noise * 0.3, 0.5 + noise * 0.4, 1.0),
      vec3(1.0, 1.0, 1.0),
      uExplosion
    );

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.0 + uExplosion * 4.0;
  }
`;

const fragmentShader = `
  varying float vNoise;
  varying vec3 vColor;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    vec3 color = vColor * (0.7 + vNoise * 0.5);
    gl_FragColor = vec4(color, 0.9);
  }
`;

function NebulaParticles({ explosion, aura = false }: { explosion: number; aura?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uExplosion: { value: 0 },
      uExpand: { value: 0.1 },
    }),
    []
  );

  useEffect(() => {
    gsap.to(uniforms.uExpand, {
      value: aura ? 2.5 : 1.2,
      duration: aura ? 6 : 4,
      ease: "power3.out",
    });
  }, [uniforms, aura]);

  // 🌌 Delikatny obrót — bez podążania za myszką
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uExplosion.value = explosion;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0003;
    }
  });

  const particles = useMemo(() => {
    const count = aura ? 9000 : 18000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const r = aura ? 3.5 + Math.random() * 2.5 : 2.8 + Math.random() * 0.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [aura]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        opacity={aura ? 0.25 : 1.0}
      />
    </points>
  );
}

// 🎥 Kamera z animacjami
function ReactiveCamera({ explosion }: { explosion: number }) {
  const { camera } = useThree();
  const startZ = useRef(camera.position.z);

  useEffect(() => {
    gsap.to(camera.position, {
      z: startZ.current + explosion * 3,
      duration: 0.4,
      ease: "power2.inOut",
    });
  }, [explosion]);

  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  // 🔄 Losowe cinematic ruchy
  useEffect(() => {
    let active = true;

    const loop = () => {
      if (!active) return;

      const transition = Math.floor(Math.random() * 3);
      const delay = 4000 + Math.random() * 3000;

      if (transition === 0) {
        gsap.to(camera.position, {
          x: Math.sin(Math.random() * Math.PI * 2) * 4,
          y: Math.cos(Math.random() * Math.PI) * 2,
          z: startZ.current - 2 - Math.random() * 2,
          duration: 3.5,
          ease: "power3.inOut",
          onUpdate: () => camera.lookAt(0, 0, 0),
        });
      } else if (transition === 1) {
        gsap.to(camera.position, {
          z: startZ.current - 6,
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 2,
          duration: 2.2,
          ease: "power4.inOut",
          yoyo: true,
          repeat: 1,
          onUpdate: () => camera.lookAt(0, 0, 0),
        });
      } else if (transition === 2) {
        gsap.to(camera.rotation, {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3,
          z: (Math.random() - 0.5) * 0.2,
          duration: 2.5,
          ease: "sine.inOut",
        });
        gsap.to(camera.position, {
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 2,
          duration: 2.5,
          ease: "power2.inOut",
          onUpdate: () => camera.lookAt(0, 0, 0),
        });
      }

      setTimeout(loop, delay);
    };

    const timer = setTimeout(loop, 3000);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <NebulaParticles explosion={explosion} />
      <NebulaParticles explosion={explosion} aura />
    </>
  );
}

export default function NebulaScene() {
  const [explosion, setExplosion] = useState(0);

  const handleHoldStart = () => {
    const state = { value: explosion };
    gsap.to(state, {
      value: 1,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => setExplosion(state.value),
    });
  };

  const handleHoldEnd = () => {
    const state = { value: explosion };
    gsap.to(state, {
      value: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onUpdate: () => setExplosion(state.value),
    });
  };

  return (
    <div className="relative w-full h-[100lvh] bg-black overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 70 }}>
          <ReactiveCamera explosion={explosion} />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center space-y-6">
        <h1 className="text-4xl md:text-8xl font-[HyperBlob] cosmic-glass text-stroke">
          FRAYMWEB
        </h1>
        <h1 className="text-4xl md:text-8xl font-[HyperBlob] cosmic-glass text-stroke">
          fraymweb
        </h1>
        <p className="text-gray-300">Crafting cosmic digital experiences</p>

        <button
          className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 active:scale-95"
          onMouseDown={handleHoldStart}
          onMouseUp={handleHoldEnd}
          onMouseLeave={handleHoldEnd}
          onTouchStart={handleHoldStart}
          onTouchEnd={handleHoldEnd}
        >
          Przytrzymaj, by eksplodować 💥
        </button>
      </div>
    </div>
  );
}
