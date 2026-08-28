'use client';

import React, { useState } from 'react';
import { ExternalLink, ChevronRight, ChevronLeft, Layers, Code, Shield } from 'lucide-react';

const PROJECTS = [
  {
    id: 'assetflow',
    title: 'AssetFlow — Enterprise System',
    category: 'Backend / Full-Stack',
    stack: 'React, Node.js, Express, MongoDB, Docker, CSS',
    description: 'An enterprise-grade asset management system that enables institutions to track hardware, software, and dynamic device allocations. Features JWT authorization protocols, robust database queries, dynamic logs, and custom telemetry reports.',
    github: 'https://github.com/Vasu3759',
    live: 'https://assetflow-0725.onrender.com/login',
    highlights: ['Multi-role privilege tier management', 'Containerized database scaling', 'Sub-second inventory reports']
  },
  {
    id: 'agriyield',
    title: 'AgriYield — Smart Farming App',
    category: 'AI / Mobile',
    stack: 'React Native, Expo, FastAPI, Python XGBoost, Node, MongoDB',
    description: 'An end-to-end AI-powered agriculture helper. Features an XGBoost machine learning microservice deployed via FastAPI to recommend ideal crops. Integrates real-time GPS meteorological feeds using OpenWeather and OGD India government commodity markets.',
    github: 'https://github.com/Vasu3759',
    live: null,
    highlights: ['FastAPI machine learning model API', 'Dual English/Hindi support', 'GPS coordinates lookups']
  },
  {
    id: 'vasooli',
    title: 'Vasooli AI — Payment Queues',
    category: 'Backend / Infrastructure',
    stack: 'Node.js, Express, MongoDB, Redis, BullMQ, Twilio SMS',
    description: 'An automated billing and fee notification engine designed to streamline transaction collection. Integrated Redis with BullMQ background processors to dispatch SMS alerts asynchronously, avoiding main-thread request blockages.',
    github: 'https://github.com/Vasu3759',
    live: null,
    highlights: ['Message dispatching rate-limits', 'Redis queue persistent workers', 'Custom retry error bounds']
  }
];

export default function PageProjects({ setActivePage }) {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.includes(filter));

  return (
    <div className="newspaper-page-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Editorial Page Header */}
      <header style={{ borderBottom: '4px double #1a1917', paddingBottom: '0.8rem' }}>
        <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: 'var(--font-masthead)', fontSize: '2rem', margin: 0 }}>
            THE BUSINESS & TECH SECTION
          </h2>
          <span style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.85rem' }}>
            PATTERNS, METRICS, & CASE STUDIES
          </span>
        </div>
        <div style={{ borderTop: '1px solid #1a1917', marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>FILTER TOPICS:</span>
          {['All', 'Backend', 'Full-Stack', 'AI'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              style={{ 
                fontSize: '0.85rem', 
                textTransform: 'uppercase', 
                fontFamily: 'var(--font-typewriter)',
                fontWeight: filter === cat ? 'bold' : 'normal',
                textDecoration: filter === cat ? 'underline' : 'none',
                color: filter === cat ? 'var(--color-red-ink)' : 'inherit'
              }}
            >
              [{cat}]
            </button>
          ))}
        </div>
      </header>

      {/* Projects Columns Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(12, 1fr)', 
        gap: '2rem' 
      }}>
        
        {filteredProjects.map((project, idx) => {
          const isLarge = idx === 0;
          const colSpan = isLarge ? 'span 12' : 'span 6';
          
          return (
            <article 
              key={project.id}
              style={{ 
                gridColumn: colSpan,
                borderBottom: '1px solid #e0dbc8',
                paddingBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ 
                  color: 'var(--color-red-ink)', 
                  fontFamily: 'var(--font-typewriter)', 
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  // REVIEW: {project.category.toUpperCase()}
                </span>
                <span style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  EST. 2026
                </span>
              </div>

              <h3 style={{ 
                fontSize: isLarge ? '2rem' : '1.4rem', 
                margin: 0,
                lineHeight: '1.2'
              }}>
                {project.title}
              </h3>

              <p style={{ 
                fontSize: '0.9rem', 
                lineHeight: '1.6', 
                textAlign: 'justify',
                margin: 0 
              }}>
                {project.description}
              </p>

              {/* Highlights block */}
              <div style={{ 
                padding: '0.8rem', 
                backgroundColor: 'var(--bg-paper-dark)', 
                fontFamily: 'var(--font-typewriter)',
                fontSize: '0.8rem',
                borderLeft: '2px solid #1a1917'
              }}>
                <strong style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>✓ TECHNICAL HIGHLIGHTS:</strong>
                <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                  {project.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              {/* Stack Details */}
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                <strong>STACK:</strong> {project.stack}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                <a 
                  href={project.github} 
                  target="_blank"
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.3rem', 
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    textDecoration: 'underline'
                  }}
                >
                  {/* Inline SVG GitHub icon replacement */}
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> Repository
                </a>
                {project.live && (
                  <a 
                    href={project.live} 
                    target="_blank"
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.3rem', 
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                      color: 'var(--color-blue-ink)'
                    }}
                  >
                    <ExternalLink size={14} /> Live Deployment
                  </a>
                )}
              </div>
            </article>
          );
        })}

      </div>

      {/* Page Footer Navigation */}
      <footer style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 'auto', 
        paddingTop: '1rem',
        borderTop: '1px solid #1a1917' 
      }}>
        <button 
          onClick={() => setActivePage(0)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.2rem', 
            fontWeight: 'bold',
            fontSize: '1rem',
            border: '1px solid #1a1917',
            padding: '0.4rem 0.8rem',
            backgroundColor: '#fff'
          }}
        >
          <ChevronLeft size={16} /> Back to Front Page
        </button>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>The Bansal Gazette — Page 2</span>
        <button 
          onClick={() => setActivePage(2)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.2rem', 
            fontWeight: 'bold',
            fontSize: '1rem',
            border: '1px solid #1a1917',
            padding: '0.4rem 0.8rem',
            backgroundColor: '#fff'
          }}
        >
          Go to Classifieds (Page 3) <ChevronRight size={16} />
        </button>
      </footer>

    </div>
  );
}
