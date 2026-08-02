'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';
import { playSound } from '@/components/audio/AudioManager';
import styles from './BootSequence.module.css';

const TOTAL_CHARS = 8000;
const REQUIRED_CLICKS = 3;

export default function BootSequence() {
  const containerRef = useRef(null);
  const setBooted = useStore((state) => state.setBooted);

  const [hasStarted, setHasStarted] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [binaryStr, setBinaryStr] = useState("");
  const [clickCount, setClickCount] = useState(0);

  // Position of the key
  const [keyPos, setKeyPos] = useState({ top: '50%', left: '50%' });

  // Move the key randomly every 800ms
  useEffect(() => {
    if (!hasStarted || isWon) return;

    const moveKey = () => {
      // Keep within bounds (10% to 90% of screen to avoid edges)
      const top = Math.floor(Math.random() * 80 + 10) + '%';
      const left = Math.floor(Math.random() * 80 + 10) + '%';
      setKeyPos({ top, left });
    };

    const intervalId = setInterval(moveKey, 800);
    return () => clearInterval(intervalId);
  }, [hasStarted, isWon]);

  useEffect(() => {
    // Generate initial string
    let str = "";
    for (let i = 0; i < TOTAL_CHARS; i++) {
      str += Math.random() > 0.5 ? '1' : '0';
    }
    setBinaryStr(str);

    // Flip random bits periodically to make it feel alive
    const interval = setInterval(() => {
      setBinaryStr(prev => {
        if (!prev) return prev;
        let arr = prev.split('');
        for(let i=0; i < 100; i++) {
          const idx = Math.floor(Math.random() * TOTAL_CHARS);
          arr[idx] = arr[idx] === '1' ? '0' : '1';
        }
        return arr.join('');
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isWon) {
      playSound('crt'); // Success sound
      
      // GSAP transition to home screen
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => setBooted(true)
      });
    }
  }, [isWon, setBooted]);

  const handleStart = () => {
    if (!hasStarted) {
      setHasStarted(true); // Update state first!
      try {
        playSound('switch');
      } catch (e) {
        console.error("Audio failed to play", e);
      }
    }
  };

  const handleKeyClick = (e) => {
    e.stopPropagation(); // Don't bubble
    if (isWon) return;
    
    try {
      playSound('paper'); // Feedback on catch
    } catch (err) {}
    
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= REQUIRED_CLICKS) {
      setIsWon(true);
    } else {
      // Teleport immediately so they can't double-click it
      const top = Math.floor(Math.random() * 80 + 10) + '%';
      const left = Math.floor(Math.random() * 80 + 10) + '%';
      setKeyPos({ top, left });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={styles.bootContainer} 
      onClick={!hasStarted ? handleStart : undefined}
      onPointerDown={!hasStarted ? handleStart : undefined}
    >
      {!hasStarted ? (
        <div className={styles.startScreen}>
          <div className={`${styles.message} ${styles.pulse}`}>CLICK ANYWHERE TO INITIALIZE SYSTEM</div>
        </div>
      ) : (
        <>
          {/* Score Counter Overlay */}
          <div className={styles.scoreCounter}>
            SYSTEM UNLOCK: {clickCount} / {REQUIRED_CLICKS} KEYS SECURED
          </div>

          <div className={`${styles.binaryGrid} ${isWon ? styles.binaryGridWon : ''}`}>
            {binaryStr}
          </div>

          {!isWon && (
            <div 
              className={styles.hiddenWord} 
              style={{ top: keyPos.top, left: keyPos.left, position: 'absolute', transform: 'translate(-50%, -50%)' }}
              onClick={handleKeyClick}
              onPointerDown={handleKeyClick}
            >
              🔑
            </div>
          )}
        </>
      )}
    </div>
  );
}
