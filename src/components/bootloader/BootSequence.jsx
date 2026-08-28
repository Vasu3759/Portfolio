'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';

export default function BootSequence() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [clicked, setClicked] = useState(false);
  const setBooted = useStore((state) => state.setBooted);

  // Dynamic progress counting from 00 to 100
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  // Exit transition after clicking the button
  useEffect(() => {
    if (clicked) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          if (setBooted) {
            setBooted(true);
          }
        }
      });
    }
  }, [clicked, setBooted]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#faf9f6', /* Cream paper backdrop */
        color: '#0a0a0a', /* Charcoal typography */
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        fontFamily: 'var(--font-display)',
        padding: '2rem',
        overflow: 'hidden'
      }}
    >
      {/* Outer frame border matching editorial theme */}
      <div style={{
        position: 'absolute',
        top: '30px',
        left: '30px',
        right: '30px',
        bottom: '30px',
        border: '1px solid var(--color-text)',
        opacity: 0.08,
        pointerEvents: 'none',
        borderRadius: '4px'
      }} />

      <div style={{ 
        maxWidth: '800px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Name Title */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          margin: 0,
          lineHeight: 0.95
        }}>
          Vasudev Bansal
        </h1>

        {/* Subtitle */}
        <div style={{
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          marginTop: '1.2rem'
        }}>
          Backend & Distributed Systems Architect
        </div>

        {/* Elegant Centered Divider Line */}
        <div style={{
          width: '80px',
          height: '1px',
          backgroundColor: 'var(--color-text)',
          opacity: 0.2,
          margin: '2rem 0'
        }} />

        {/* Catchy Editorial Teaser Description */}
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.1rem, 3.5vw, 1.45rem)',
          lineHeight: '1.6',
          color: 'var(--color-text-muted)',
          maxWidth: '640px',
          margin: '0 0 3rem 0',
          textAlign: 'center'
        }}>
          "An archive of high-performance backend pipelines, background task queues, and interactive real-time graphics."
        </p>

        {/* Progress / Enter Button Area */}
        <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <AnimatePresence mode="wait">
            {progress < 100 ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}
              >
                {/* Huge Monospace Percentage */}
                <span style={{ fontFamily: 'monospace', fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-text)', letterSpacing: '-0.05em' }}>
                  {String(progress).padStart(2, '0')}%
                </span>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5, fontFamily: 'monospace' }}>
                  Initializing System Compilation...
                </span>
              </motion.div>
            ) : (
              <motion.button
                key="button"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                onClick={() => setClicked(true)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: '1.5px solid #0a0a0a',
                  padding: '0.9rem 2.5rem',
                  borderRadius: '30px',
                  backgroundColor: 'transparent',
                  color: '#0a0a0a',
                  cursor: 'pointer',
                  transition: 'background-color 0.25s, color 0.25s, transform 0.2s',
                  boxShadow: '0 4px 12px rgba(10, 10, 10, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0a0a0a';
                  e.currentTarget.style.color = '#faf9f6';
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#0a0a0a';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Enter Portfolio →
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
