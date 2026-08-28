'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingDock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('vasubansal3759@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#0a0a0a',
        color: '#faf9f6',
        padding: '0.6rem 1.5rem',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        zIndex: 1000,
        fontFamily: 'var(--font-display)',
        fontSize: '0.8rem',
        fontWeight: 500,
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      {/* Availability indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          backgroundColor: '#2ec4b6',
          boxShadow: '0 0 8px #2ec4b6'
        }} />
        <span style={{ opacity: 0.8 }}>OPEN TO OFFERS</span>
      </div>

      <div style={{ width: '1px', height: '15px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

      {/* Action Anchors */}
      <a 
        href="/resume.pdf" 
        target="_blank" 
        style={{ color: '#faf9f6', textDecoration: 'none', transition: 'color 0.2s' }}
        onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
        onMouseLeave={(e) => e.target.style.color = '#faf9f6'}
      >
        RESUME
      </a>

      <button 
        onClick={handleCopy}
        style={{ color: '#faf9f6', transition: 'color 0.2s', fontWeight: 500 }}
        onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
        onMouseLeave={(e) => e.target.style.color = '#faf9f6'}
      >
        {copied ? 'COPIED!' : 'COPY EMAIL'}
      </button>

      <div style={{ width: '1px', height: '15px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

      <div style={{ display: 'flex', gap: '1rem' }}>
        <a 
          href="https://github.com/Vasu3759" 
          target="_blank"
          style={{ opacity: 0.8, color: '#fff' }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.8'}
        >
          GH
        </a>
        <a 
          href="https://www.linkedin.com/in/vasudev-bansal-9191b2295/" 
          target="_blank"
          style={{ opacity: 0.8, color: '#fff' }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.8'}
        >
          LI
        </a>
      </div>
    </motion.div>
  );
}
