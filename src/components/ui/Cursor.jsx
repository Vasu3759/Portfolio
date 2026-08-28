'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Cursor.module.css';

const LERP_FACTOR = 0.2; // Snappy responsiveness for blueprint alignment

export default function Cursor() {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [hoverTag, setHoverTag] = useState('');

  const mouse = useRef({ x: 0, y: 0 });
  const cursorVal = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    // Check if device has a touch screen
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
 
    // Add custom cursor class to enable cursor hiding in CSS
    document.documentElement.classList.add('custom-cursor-active');

    let hasMoved = false;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouse.current.x = clientX;
      mouse.current.y = clientY;
      
      if (!hasMoved) {
        cursorVal.current.x = clientX;
        cursorVal.current.y = clientY;
        setCoords({ x: clientX, y: clientY });
        hasMoved = true;
      }
    };
 
    const onMouseOver = (e) => {
      const target = e.target;
      const anchor = target.closest('a');
      const button = target.closest('button');
      
      if (anchor || button || window.getComputedStyle(target).cursor === 'pointer') {
        setIsPointer(true);
        const text = (anchor?.innerText || button?.innerText || target.innerText || '').toUpperCase();
        if (text.includes('RESUME')) {
          setHoverTag('ENGAGE.RESUME');
        } else if (target.className?.includes('medallion') || anchor?.className?.includes('medallion')) {
          setHoverTag('ENGAGE.SOCIAL');
        } else {
          setHoverTag('ENGAGE.OBJECT');
        }
      } else {
        setIsPointer(false);
        setHoverTag('');
      }
    };
 
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    let animationFrameId;

    const tick = () => {
      if (hasMoved) {
        // Smoothly interpolate positions
        cursorVal.current.x = lerp(cursorVal.current.x, mouse.current.x, LERP_FACTOR);
        cursorVal.current.y = lerp(cursorVal.current.y, mouse.current.y, LERP_FACTOR);

        // Update coordinates state for displaying inside the tag
        setCoords({
          x: Math.round(cursorVal.current.x),
          y: Math.round(cursorVal.current.y)
        });

        // Apply hardware-accelerated transforms
        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${cursorVal.current.x}px, ${cursorVal.current.y}px, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    animationFrameId = requestAnimationFrame(tick);
 
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);
 
  if (!mounted || isTouch) {
    return null; // Prevents hydration mismatch and doesn't render on mobile
  }

  return (
    <div 
      ref={containerRef}
      className={styles.blueprintCursorContainer}
      style={{ pointerEvents: 'none' }}
    >
      {/* Full screen vertical crosshair line */}
      <div className={`${styles.crosshairV} ${isPointer ? styles.pointerV : ''}`} />
      
      {/* Full screen horizontal crosshair line */}
      <div className={`${styles.crosshairH} ${isPointer ? styles.pointerH : ''}`} />

      {/* Center target ring */}
      <div className={`${styles.targetRing} ${isPointer ? styles.targetRingActive : ''}`} />

      {/* Coordinate Display Tag */}
      <div className={`${styles.blueprintInfoTag} ${isPointer ? styles.infoTagActive : ''}`}>
        <span className={styles.coordinateText}>
          {isPointer ? hoverTag : `LOC: ${String(coords.x).padStart(3, '0')} / ${String(coords.y).padStart(3, '0')}`}
        </span>
      </div>
    </div>
  );
}
