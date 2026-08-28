'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

function TiltImage({ src }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    setRotateX(-y / (box.height / 2) * 10);
    setRotateY(x / (box.width / 2) * 10);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div style={{ position: 'relative', width: 'clamp(280px, 22vw, 360px)', height: 'clamp(340px, 28vw, 460px)' }}>
      {/* Offset Background Shape matching theme */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        right: '-12px',
        bottom: '-12px',
        backgroundColor: 'rgba(156, 128, 94, 0.12)', /* Soft bronze-gold accent fill */
        border: '1px solid var(--color-accent)',
        borderRadius: '24px',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* 3D Tilting Circular Portrait Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{ 
          rotateX: isHovered ? rotateX : 0, 
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.03 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '24px', /* Modern soft rounded rectangle */
          overflow: 'hidden',
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
          boxShadow: isHovered 
            ? '0 25px 50px rgba(10, 10, 10, 0.12)' 
            : '0 10px 30px rgba(10, 10, 10, 0.05)',
          border: '1px solid var(--color-divider)',
          position: 'relative',
          zIndex: 2,
          transition: 'box-shadow 0.3s ease'
        }}
      >
        <motion.img
          src={src}
          alt="Profile Portrait"
          animate={{ 
            filter: isHovered ? 'grayscale(0%) contrast(1.02)' : 'grayscale(15%) contrast(1.02) sepia(3%)',
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.4 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translateZ(20px)'
          }}
        />
      </motion.div>
    </div>
  );
}


const PROJECTS = [
  {
    id: '01',
    title: 'AssetFlow',
    subtitle: 'ENTERPRISE DEVICE ALLOCATION PLATFORM',
    stack: 'NextJS / Express / Docker / PostgreSQL',
    desc: 'An enterprise asset tracking dashboard built to manage hardware devices, log maintenance metrics, and configure role-based access controls using Next.js, PostgreSQL, and Prisma.',
    link: 'https://assetflow-0725.onrender.com/login',
    repo: 'https://github.com/Vasu3759'
  },
  {
    id: '02',
    title: 'AgriYield',
    subtitle: 'AI CROP ADVISORY APP',
    stack: 'React Native / FastAPI / XGBoost',
    desc: 'A smart farming mobile application that predicts crop yields using XGBoost ML microservices, real-time GPS weather integration, and local market price APIs.',
    link: null,
    repo: 'https://github.com/Vasu3759'
  },
  {
    id: '03',
    title: 'Vasooli AI',
    subtitle: 'AUTOMATED PAYMENT NOTIFICATIONS ENGINE',
    stack: 'NodeJS / Redis / BullMQ / Twilio APIs',
    desc: 'An automated billing and fee collections manager that handles background invoicing workflows, WhatsApp API triggers, and Twilio SMS queues.',
    link: null,
    repo: 'https://github.com/Vasu3759'
  }
];

const EXPERIENCE = [
  {
    company: 'ChalksnBoard',
    role: 'Software Development Engineer Intern',
    period: 'June 2026 – Present',
    details: [
      'Migrated the main ChalksnBoard platform to a modern Next.js and React architecture, boosting performance and developer speed.',
      'Designed backend REST APIs and background task systems using Node.js, Express, and BullMQ queues backed by Redis.'
    ]
  },
  {
    company: 'AICTE',
    role: 'Full Stack & AI Developer Intern',
    period: 'June 2026 – July 2026',
    details: [
      'Built microservices using Python FastAPI and Node.js REST controllers to run machine learning predictions.',
      'Integrated location-based weather tracking using OpenWeather API and Indian commodity market data endpoints.'
    ]
  }
];

export default function MagazinePage() {
  return (
    <div style={{ padding: '70px 2rem 0', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
      <Navbar />

      {/* SECTION 1: HEADER & HERO */}
      <section id="home-section" style={{ minHeight: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem 0 2rem' }}>
        

        {/* Responsive Grid containing Typographic Left Column and 3D Canvas Right Column */}
        <div className="hero-grid" style={{ margin: '1rem 0' }}>
          
          {/* Typographic Identity & Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', letterSpacing: '0.2em', color: 'var(--color-accent)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                CREATIVE DEVELOPER & ARCHITECT
              </span>
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: 'clamp(2.5rem, 8vw, 6.5rem)', 
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  margin: 0
                }}
              >
                Vasudev Bansal
              </motion.h1>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', lineHeight: '1.6', color: 'var(--color-text-muted)', maxWidth: '580px', margin: 0 }}>
                I build backends, distributed systems, and real-time interactive interfaces. I specialize in Node.js, Next.js, FastAPI, Redis queues, and Docker container stacks. Currently, I'm working as a Software Engineering Intern at ChalksnBoard, focusing on production APIs, collections pipelines, and web performance.
              </p>
              
              {/* Identity tag list (extremely classy newspaper style tags) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem', borderTop: '1px solid var(--color-divider)', paddingTop: '1.2rem', maxWidth: '500px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-display)', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>CURRENT ROLE</span>
                  <span style={{ color: 'var(--color-text)' }}>SDE Intern at ChalksnBoard</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-display)', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>EDUCATION</span>
                  <span style={{ color: 'var(--color-text)' }}>B.Tech CSE Undergrad (USICT GGSIPU)</span>
                </div>
              </div>

              {/* Core achievements / stats indicators */}
              <div style={{ display: 'flex', gap: '2.5rem', marginTop: '1rem', borderTop: '1px solid var(--color-divider)', paddingTop: '1.2rem', maxWidth: '500px', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--color-accent)' }}>250+</span>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LeetCode Solved</div>
                </div>
                <div>
                  <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--color-accent)' }}>2+</span>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Industry Roles</div>
                </div>
                <div>
                  <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--color-accent)' }}>3+</span>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Production Apps</div>
                </div>
              </div>
            </motion.div>

            {/* Quick interactive call to actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}
            >
              <a 
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  borderBottom: '2px solid var(--color-text)',
                  paddingBottom: '2px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                VIEW WORKS ↓
              </a>
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color: 'var(--color-accent)',
                  borderBottom: '2px solid var(--color-accent)',
                  paddingBottom: '2px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                LET'S TALK →
              </a>
            </motion.div>
          </div>

          {/* Profile Photo Container (Floating Figure Removed) */}
          <div style={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative'
          }}>
            {/* Profile Photo Floating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ position: 'relative', marginTop: '-5rem' }}
            >
              <TiltImage src="/profile.jpeg" />
            </motion.div>
          </div>

        </div>

      </section>

      {/* TYPOGRAPHIC PARALLAX MARQUEE */}
      <div className="editorial-marquee" style={{ margin: '4rem -2rem' }}>
        <div className="editorial-marquee-inner">
          <span>NEXTJS • EXPRESS • FASTAPI • DOCKER • REDIS • BULLMQ • REDIS • POSTGRES • MONGO • NEXTJS • EXPRESS • FASTAPI • DOCKER • REDIS • BULLMQ</span>
          <span>NEXTJS • EXPRESS • FASTAPI • DOCKER • REDIS • BULLMQ • REDIS • POSTGRES • MONGO • NEXTJS • EXPRESS • FASTAPI • DOCKER • REDIS • BULLMQ</span>
        </div>
      </div>

      {/* SECTION 2: PROJECTS GALLERY */}
      <section id="projects-section" style={{ padding: '6rem 0' }}>
        <div style={{ borderBottom: '1px solid var(--color-text)', paddingBottom: '1rem', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-heading)', fontWeight: 800, margin: 0 }}>
            Selected Works
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {PROJECTS.map((project, idx) => (
            <div 
              key={project.id}
              className="project-editorial-row"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '2rem',
                alignItems: 'start'
              }}
            >
              {/* Large Index Number */}
              <div style={{ gridColumn: 'span 2', fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 300, color: 'var(--color-accent)' }}>
                {project.id} /
              </div>

              {/* Project Content */}
              <div style={{ gridColumn: 'span 10', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem' }} className="project-grid-inner">
                <div>
                  <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
                    {project.title}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--color-accent)', display: 'block', marginBottom: '1.5rem' }}>
                    {project.stack}
                  </span>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: '1.7', margin: 0 }}>
                    {project.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '150px' }}>
                  <div style={{ fontFamily: 'var(--font-typewriter)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    // {project.subtitle}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '2rem', marginTop: 'auto' }}>
                    <a 
                      href={project.repo} 
                      target="_blank"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'underline' }}
                    >
                      REPOSITORY →
                    </a>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank"
                        style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'underline', color: 'var(--color-accent)' }}
                      >
                        LIVE DEMO →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: EXPERIENCE / CHRONOLOGY */}
      <section id="experience-section" style={{ padding: '6rem 0', borderTop: '1px solid var(--color-divider)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem' }} className="experience-editorial-grid">
          <div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontFamily: 'var(--font-heading)', fontWeight: 800, margin: 0 }}>
              Work Chronology
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem', fontSize: '0.95rem' }}>
              Summary of technical roles in professional development and research systems.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {EXPERIENCE.map((exp, idx) => (
              <div 
                key={idx}
                style={{
                  borderBottom: '1px solid var(--color-divider)',
                  paddingBottom: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 700, margin: 0 }}>
                    {exp.company}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-accent)' }}>
                    {exp.period}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>
                  {exp.role}
                </div>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', color: 'var(--color-text-muted)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {exp.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: EDITORIAL CONNECT (SOCIALS GRID) */}
      <section id="contact-section" style={{ padding: '6rem 0 10rem', borderTop: '1px solid var(--color-divider)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Get in Touch
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Available for professional opportunities, research collaborations, or technical discussions. Let's connect.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* LinkedIn Card */}
          <a 
            href="https://www.linkedin.com/in/vasudev-bansal-9191b2295/"
            target="_blank"
            style={{
              border: '1px solid var(--color-text)',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '170px',
              transition: 'background-color 0.3s, color 0.3s',
              backgroundColor: 'transparent',
              color: 'var(--color-text)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-text)';
              e.currentTarget.style.color = 'var(--bg-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 600, opacity: 0.6 }}>01 / CONNECT</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800 }}>LinkedIn →</span>
          </a>

          {/* GitHub Card */}
          <a 
            href="https://github.com/Vasu3759"
            target="_blank"
            style={{
              border: '1px solid var(--color-text)',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '170px',
              transition: 'background-color 0.3s, color 0.3s',
              backgroundColor: 'transparent',
              color: 'var(--color-text)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-text)';
              e.currentTarget.style.color = 'var(--bg-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 600, opacity: 0.6 }}>02 / REPOSITORIES</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800 }}>GitHub →</span>
          </a>

          {/* LeetCode Card */}
          <a 
            href="https://leetcode.com/u/sRQnn9uccM/"
            target="_blank"
            style={{
              border: '1px solid var(--color-text)',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '170px',
              transition: 'background-color 0.3s, color 0.3s',
              backgroundColor: 'transparent',
              color: 'var(--color-text)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-text)';
              e.currentTarget.style.color = 'var(--bg-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 600, opacity: 0.6 }}>03 / ALGORITHMS</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800 }}>LeetCode →</span>
          </a>
        </div>

        {/* Contact details footer (Email and Phone number) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '4rem',
          flexWrap: 'wrap',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)', /* Large and visible */
          fontWeight: 500,
          borderTop: '1px solid var(--color-divider)',
          paddingTop: '3rem',
          maxWidth: '900px',
          margin: '5rem auto 0 auto',
          textAlign: 'center'
        }}>
          <div style={{ padding: '0.5rem 1rem' }}>
            <span style={{ color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '0.05em', marginRight: '0.5rem' }}>EMAIL:</span>
            <a href="mailto:vasudevbansal375@gmail.com" style={{ textDecoration: 'underline', color: 'var(--color-text)', fontWeight: 700 }}>
              vasudevbansal375@gmail.com
            </a>
          </div>
          <div style={{ padding: '0.5rem 1rem' }}>
            <span style={{ color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '0.05em', marginRight: '0.5rem' }}>PHONE:</span>
            <a href="tel:+919318429745" style={{ textDecoration: 'underline', color: 'var(--color-text)', fontWeight: 700 }}>
              +91 9318429745
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
