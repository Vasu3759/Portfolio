'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Cursor.module.css';

const LERP_FACTOR_OUTER = 0.08; // Smooth trailing outer ring
const LERP_FACTOR_INNER = 0.25; // Snappy responsive inner dot

export default function Cursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const cursorVal = useRef({ x: 0, y: 0 });
  const dotVal = useRef({ x: 0, y: 0 });

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
        dotVal.current.x = clientX;
        dotVal.current.y = clientY;
        hasMoved = true;
      }
    };
 
    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };
 
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    let animationFrameId;

    const tick = () => {
      if (hasMoved) {
        // Smoothly interpolate positions
        cursorVal.current.x = lerp(cursorVal.current.x, mouse.current.x, LERP_FACTOR_OUTER);
        cursorVal.current.y = lerp(cursorVal.current.y, mouse.current.y, LERP_FACTOR_OUTER);
        
        dotVal.current.x = lerp(dotVal.current.x, mouse.current.x, LERP_FACTOR_INNER);
        dotVal.current.y = lerp(dotVal.current.y, mouse.current.y, LERP_FACTOR_INNER);

        // Apply hardware-accelerated transforms
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${cursorVal.current.x}px, ${cursorVal.current.y}px, 0) translate(-50%, -50%)`;
        }
        if (cursorDotRef.current) {
          cursorDotRef.current.style.transform = `translate3d(${dotVal.current.x}px, ${dotVal.current.y}px, 0) translate(-50%, -50%)`;
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
    <div style={{ pointerEvents: 'none' }}>
      <div 
        ref={cursorRef} 
        className={`${styles.cursor} ${isPointer ? styles.pointer : ''}`} 
      />
      <div 
        ref={cursorDotRef} 
        className={`${styles.cursorDot} ${isPointer ? styles.pointerDot : ''}`} 
      />
    </div>
  );
}
