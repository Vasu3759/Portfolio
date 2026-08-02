'use client';

import { useStore } from '@/store/useStore';
import BootSequence from '@/components/bootloader/BootSequence';
import Hero from '@/components/sections/Hero';

export default function Home() {
  const isBooted = useStore((state) => state.isBooted);

  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {!isBooted && <BootSequence />}
      
      {isBooted && (
        <>
          <Hero />
          {/* Other sections will be added here */}
        </>
      )}
    </main>
  );
}
