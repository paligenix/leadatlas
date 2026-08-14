import { Canvas, useFrame } from "@react-three/fiber";
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
    ref.current.rotation.y += dt * (running ? 0.12 : 0.04);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1.58, 48, 48]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.585, 32, 32]} />
        <meshBasicMaterial color="#111111" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.003, 6, 120]} />
        <meshBasicMaterial color="#111111" />
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
          <pointsMaterial color="#111111" size={0.03} sizeAttenuation />
        </points>
      )}
    </group>
  );
}

export default function Globe() {
  return (
    <div className="globe-layer">
      <Canvas camera={{ position: [0, 0.3, 5.4], fov: 42 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={1} />
        <Earth />
      </Canvas>
    </div>
  );
}
