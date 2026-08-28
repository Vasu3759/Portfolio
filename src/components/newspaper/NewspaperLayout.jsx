'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageFront from './PageFront';
import PageProjects from './PageProjects';
import PageClassifieds from './PageClassifieds';

const pageVariants = {
  enter: (direction) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
    transformOrigin: direction > 0 ? "left center" : "right center",
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1]
    }
  },
  exit: (direction) => ({
    rotateY: direction > 0 ? -90 : 90,
    opacity: 0,
    transformOrigin: direction > 0 ? "right center" : "left center",
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1]
    }
  })
};

export default function NewspaperLayout() {
  const [activePage, setActivePage] = useState(0); // 0 = Front, 1 = Projects, 2 = Classifieds
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);
  const lastScrollTime = useRef(0);

  const setPageWithDirection = (newPage) => {
    if (newPage === activePage) return;
    setDirection(newPage > activePage ? 1 : -1);
    setActivePage(newPage);
  };

  // Scroll-based page turning (throttle to prevent rapid multiple pages skip)
  useEffect(() => {
    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 1200) return; // 1.2s delay between flips

      if (e.deltaY > 50) {
        // Scroll Down -> Next Page
        if (activePage < 2) {
          setPageWithDirection(activePage + 1);
          lastScrollTime.current = now;
        }
      } else if (e.deltaY < -50) {
        // Scroll Up -> Prev Page
        if (activePage > 0) {
          setPageWithDirection(activePage - 1);
          lastScrollTime.current = now;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activePage]);

  // Touch Swipe for mobile devices
  const touchStart = useRef(0);
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart.current - touchEnd;
      const now = Date.now();
      if (now - lastScrollTime.current < 1200) return;

      if (diff > 80) {
        // Swipe up -> Next Page
        if (activePage < 2) {
          setPageWithDirection(activePage + 1);
          lastScrollTime.current = now;
        }
      } else if (diff < -80) {
        // Swipe down -> Prev Page
        if (activePage > 0) {
          setPageWithDirection(activePage - 1);
          lastScrollTime.current = now;
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activePage]);

  const renderActivePage = () => {
    switch (activePage) {
      case 0:
        return <PageFront setActivePage={setPageWithDirection} />;
      case 1:
        return <PageProjects setActivePage={setPageWithDirection} />;
      case 2:
        return <PageClassifieds setActivePage={setPageWithDirection} />;
      default:
        return <PageFront setActivePage={setPageWithDirection} />;
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: 'var(--bg-paper)',
      perspective: '2000px',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1.5rem'
    }}>
      
      {/* Newspaper Broadsheet Container (Fills the viewport screen height beautifully) */}
      <div 
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: '1200px',
          height: '90vh',
          maxHeight: '850px',
          backgroundColor: '#fdfbfa',
          boxShadow: '0 30px 60px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid #e0dbc8',
          padding: '2.5rem',
          position: 'relative',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* Newspaper Page Selection Headers */}
        <nav style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1.5rem', 
          marginBottom: '1rem', 
          fontFamily: 'var(--font-typewriter)',
          fontSize: '0.85rem',
          borderBottom: '1px solid #1a1917',
          paddingBottom: '0.6rem'
        }}>
          <button 
            onClick={() => setPageWithDirection(0)} 
            style={{ 
              textTransform: 'uppercase', 
              fontWeight: activePage === 0 ? 'bold' : 'normal',
              color: activePage === 0 ? 'var(--color-red-ink)' : 'inherit',
              textDecoration: activePage === 0 ? 'underline' : 'none'
            }}
          >
            [Page I: Front Page]
          </button>
          <button 
            onClick={() => setPageWithDirection(1)} 
            style={{ 
              textTransform: 'uppercase', 
              fontWeight: activePage === 1 ? 'bold' : 'normal',
              color: activePage === 1 ? 'var(--color-red-ink)' : 'inherit',
              textDecoration: activePage === 1 ? 'underline' : 'none'
            }}
          >
            [Page II: Tech & Projects]
          </button>
          <button 
            onClick={() => setPageWithDirection(2)} 
            style={{ 
              textTransform: 'uppercase', 
              fontWeight: activePage === 2 ? 'bold' : 'normal',
              color: activePage === 2 ? 'var(--color-red-ink)' : 'inherit',
              textDecoration: activePage === 2 ? 'underline' : 'none'
            }}
          >
            [Page III: Classifieds]
          </button>
        </nav>

        {/* Dynamic Foldable Content frame */}
        <div style={{ flex: 1, position: 'relative', width: '100%', overflowY: 'auto', paddingRight: '4px' }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activePage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden'
              }}
            >
              {renderActivePage()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
