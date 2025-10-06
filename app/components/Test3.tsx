"use client";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";

// === 🔹 GLSL: vertex shader z 3D noise ===
const vertexShader = `
  uniform float uTime;
  varying float vNoise;
  varying vec3 vColor;

  // Simplex noise 3D (GLSL)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 g0 = vec3(a0.xy,h.x);
    vec3 g1 = vec3(a0.zw,h.y);
    vec3 g2 = vec3(a1.xy,h.z);
    vec3 g3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(g0,g0), dot(g1,g1), dot(g2,g2), dot(g3,g3)));
    g0 *= norm.x;
    g1 *= norm.y;
    g2 *= norm.z;
    g3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1),
                            dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(g0,x0), dot(g1,x1),
                                  dot(g2,x2), dot(g3,x3) ) );
  }

  void main() {
    vec3 pos = position;

    // Dodaj ruch 3D noise
    float noise = snoise(pos * 0.7 + uTime * 0.2);
    pos += normalize(pos) * noise * 0.5;

    vNoise = noise;
    vColor = vec3(0.4 + noise * 0.3, 0.4 + noise * 0.2, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.0;
  }
`;

// === 🔹 Fragment shader (kolor + fade) ===
const fragmentShader = `
  varying float vNoise;
  varying vec3 vColor;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    vec3 color = vColor * (0.5 + vNoise * 0.5);
    gl_FragColor = vec4(color, 0.8);
  }
`;

// === 🔹 Komponent cząsteczek ===
function NebulaParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0008;
      pointsRef.current.rotation.x += 0.0004;
    }
  });

  const particles = useMemo(() => {
    const count = 20000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const r = Math.random() * 3.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

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
      />
    </points>
  );
}

// === 🔹 Główna scena ===
export default function NebulaScene() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <NebulaParticles />
      </Canvas>
    </div>
  );
}
