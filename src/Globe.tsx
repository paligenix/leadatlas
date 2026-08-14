import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useApp } from "./store";

function latLonToVec(lat: number, lon: number, r = 1.62) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.78, 64, 64]} />
      <shaderMaterial
        transparent
        side={THREE.BackSide}
        uniforms={{ color: { value: new THREE.Color("#3ee0c8") } }}
        vertexShader={`
          varying vec3 vN;
          void main() {
            vN = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vN;
          uniform vec3 color;
          void main() {
            float f = pow(0.72 - dot(vN, vec3(0.0, 0.0, 1.0)), 3.2);
            gl_FragColor = vec4(color, f * 0.55);
          }
        `}
      />
    </mesh>
  );
}

function Earth() {
  const ref = useRef<THREE.Group>(null);
  const points = useApp((s) => s.points);
  const running = useApp((s) => s.status.running);

  const positions = useMemo(() => {
    const arr = new Float32Array(Math.max(points.length, 1) * 3);
    points.forEach((p, i) => {
      const v = latLonToVec(p.lat, p.lon, 1.64);
      arr[i * 3] = v.x;
      arr[i * 3 + 1] = v.y;
      arr[i * 3 + 2] = v.z;
    });
    return arr;
  }, [points]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * (running ? 0.18 : 0.06);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1.58, 72, 72]} />
        <meshStandardMaterial
          color="#0b1c33"
          metalness={0.18}
          roughness={0.55}
          emissive="#082033"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.582, 48, 48]} />
        <meshBasicMaterial color="#3ee0c8" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.72, 0.004, 8, 160]} />
        <meshBasicMaterial color="#e8b86d" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0.1]}>
        <torusGeometry args={[1.86, 0.003, 8, 180]} />
        <meshBasicMaterial color="#8b7cff" transparent opacity={0.4} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.05, 1]} />
        <meshBasicMaterial color="#7cf0df" wireframe transparent opacity={0.07} />
      </mesh>
      {points.length > 0 && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial color="#3ee0c8" size={0.035} sizeAttenuation />
        </points>
      )}
    </group>
  );
}

export default function Globe() {
  return (
    <div className="globe-layer">
      <Canvas camera={{ position: [0, 0.4, 5.2], fov: 42 }}>
        <color attach="background" args={["#05070d"]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 2, 3]} intensity={1.4} color="#d9f6ff" />
        <pointLight position={[-3, -1, -2]} intensity={1.2} color="#8b7cff" />
        <Stars radius={80} depth={40} count={2500} factor={3} fade speed={0.6} />
        <Earth />
        <Atmosphere />
      </Canvas>
    </div>
  );
}
