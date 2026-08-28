'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import BootSequence from '@/components/bootloader/BootSequence';
import MagazinePage from '@/components/editorial/MagazinePage';

export default function Home() {
  const isBooted = useStore((state) => state.isBooted);
  const setBooted = useStore((state) => state.setBooted);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check URL parameters for instant bypass
    const params = new URLSearchParams(window.location.search);
    if (params.get('skipBoot') === 'true' || params.get('ref') === 'recruiter') {
      if (setBooted) {
        setBooted(true);
      }
    }
    setReady(true);
  }, [setBooted]);

  if (!ready) return null;

  return (
    <main style={{ minHeight: '100vh', width: '100vw', position: 'relative' }}>
      {!isBooted && <BootSequence />}
      
      {isBooted && (
        <MagazinePage />
      )}
    </main>
  );
}
