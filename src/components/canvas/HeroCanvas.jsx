'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Component to handle mouse reactivity and rotation
function InteractiveSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smoothly interpolate rotation & position based on mouse position
    const targetX = state.pointer.x * 0.5;
    const targetY = state.pointer.y * 0.5;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.05);
    
    // Add a gentle idle rotation
    meshRef.current.rotation.z += 0.002;
    
    // Subtle position shifting based on mouse
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, state.pointer.x * 0.3, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, state.pointer.y * 0.3, 0.05);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1.3, 64, 64]} />
        <MeshDistortMaterial
          color="#faf9f6"
          roughness={0.05}
          metalness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transmission={0.9} // Glass transmission
          ior={1.5} // Index of refraction
          thickness={1.8} // Liquid thickness
          distort={0.35} // Distortion amount
          speed={2.2} // Morphing speed
          attenuationDistance={2}
          attenuationColor="#faf9f6"
        />
      </mesh>
    </Float>
  );
}

// Background floating dust particles
function FloatingDust({ count = 100 }) {
  const pointsRef = useRef();
  
  // Generate random positions and speeds for the particles
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Position particles in a box around the center
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
      
      // Speed of upward motion
      spd[i] = 0.002 + Math.random() * 0.005;
    }
    return [pos, spd];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const positionsArray = geo.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      // Move particle upward
      positionsArray[i * 3 + 1] += speeds[i];
      
      // Rotate a bit around the Y axis
      const angle = 0.001;
      const x = positionsArray[i * 3];
      const z = positionsArray[i * 3 + 2];
      positionsArray[i * 3] = x * Math.cos(angle) - z * Math.sin(angle);
      positionsArray[i * 3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);
      
      // Reset if it goes too high
      if (positionsArray[i * 3 + 1] > 5) {
        positionsArray[i * 3 + 1] = -5;
      }
    }
    
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#9c805e" // Accent bronze
        size={0.04}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.3}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '400px',
      position: 'relative',
    }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.2} />
        
        {/* Lights placed strategically to hit the edges of the morphing glass shape */}
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, 5, -2]} intensity={2.0} color="#9c805e" /> {/* Bronze highlight */}
        <pointLight position={[3, -5, 2]} intensity={1.5} color="#2ec4b6" />  {/* Teal refraction */}
        <pointLight position={[0, 0, -3]} intensity={1.0} color="#ffffff" />
        
        <InteractiveSphere />
        <FloatingDust count={80} />
      </Canvas>
    </div>
  );
}
