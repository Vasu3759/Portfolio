'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Cursor.module.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if device has a touch screen
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
 
    // Add custom cursor class to enable cursor hiding in CSS
    document.documentElement.classList.add('custom-cursor-active');

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Move the outer circle with slight delay (GSAP)
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: "power2.out"
      });
      
      // Move the inner dot instantly
      gsap.set(cursorDotRef.current, {
        x: clientX,
        y: clientY
      });
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
 
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
 
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
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
