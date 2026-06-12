import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSystem() {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  // Generate 3D positions for purple particles
  const positionsPurple = useMemo(() => {
    const arr = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;     // X
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12; // Y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12; // Z
    }
    return arr;
  }, []);

  // Generate 3D positions for cyan particles
  const positionsCyan = useMemo(() => {
    const arr = new Float32Array(250 * 3);
    for (let i = 0; i < 250; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;     // X
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      // Rotation rate over time
      ref.current.rotation.x += delta * 0.02;
      ref.current.rotation.y += delta * 0.03;

      // Drift particle layer position with mouse coordinates
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 1.2, 0.05);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 1.2, 0.05);
    }
  });

  return (
    <group ref={ref}>
      <Points positions={positionsPurple} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.35}
        />
      </Points>
      <Points positions={positionsCyan} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
    </group>
  );
}

export const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none select-none overflow-hidden bg-transparent transition-colors duration-500">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.3]}>
        <ParticleSystem />
      </Canvas>
    </div>
  );
};
