'use client';

import { Canvas } from '@react-three/fiber';
import CRTFilter from './CRTFilter';
import { useEffect, useState } from 'react';

export default function Scene() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 9998,
      mixBlendMode: 'overlay', // or 'screen' depending on the exact desired look
    }}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        style={{ pointerEvents: 'none' }}
      >
        <CRTFilter />
      </Canvas>
    </div>
  );
}
