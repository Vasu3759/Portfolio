'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { id: 'home-section', label: 'About' },
  { id: 'projects-section', label: 'Selected Works' },
  { id: 'experience-section', label: 'Chronology' },
  { id: 'contact-section', label: 'Contact' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home-section');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  // Smooth scroll handler
  const handleNavClick = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Clock update (Local dynamic device time: Day and Time only)
  useEffect(() => {
    const updateClock = () => {
      try {
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        const timeString = new Intl.DateTimeFormat('en-US', options).format(new Date());
        const dayString = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()).toUpperCase();

        setCurrentTime(`${dayString}, ${timeString}`);
      } catch (e) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dayString = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
        setCurrentTime(`${dayString}, ${timeString}`);
      }
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // IntersectionObserver to auto-update active nav state based on user scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // Trigger when section occupies center viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.navbar}>
      {/* Center navigation links */}
      <div 
        className={styles.navLinks}
        onMouseLeave={() => setHoveredTab(null)}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <div 
              key={item.id} 
              className={styles.navLinkContainer}
              onMouseEnter={() => setHoveredTab(item.id)}
            >
              <button
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>

              {/* Smoothly sliding hover background pill */}
              <AnimatePresence>
                {hoveredTab === item.id && (
                  <motion.div
                    layoutId="navHoverPill"
                    className={styles.hoverPill}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Right control utilities */}
      <div className={styles.rightSection}>
        {/* Time display */}
        <span className={styles.time}>{currentTime}</span>
        
        {/* Resume link */}
        <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.resumeBtn}
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
