'use client';

import React from 'react';
import { Download, Mail, ExternalLink, Calendar, MapPin, Briefcase, Award, GraduationCap, ChevronRight, ChevronLeft, Github, Linkedin, MessageSquare, Globe } from 'lucide-react';

export default function PageFront({ setActivePage }) {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('vasubansal3759@gmail.com'); // Put your actual email here
    alert('Email copied to clipboard!');
  };

  return (
    <div className="newspaper-page-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 1. NEWSPAPER HEADER / MASTHEAD */}
      <header style={{ textAlign: 'center', borderBottom: '4px double #1a1917', paddingBottom: '1rem' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-masthead)', 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          fontWeight: 900, 
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          margin: 0,
          lineHeight: 1
        }}>
          The Bansal Gazette
        </h1>
        <p style={{ 
          fontFamily: 'var(--font-heading)', 
          fontStyle: 'italic', 
          fontSize: '1.2rem', 
          margin: '0.5rem 0 1rem' 
        }}>
          "All the Code That's Fit to Print"
        </p>

        {/* Edition Status Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          borderTop: '1px solid #1a1917', 
          borderBottom: '1px solid #1a1917', 
          padding: '0.4rem 1rem', 
          fontSize: '0.85rem',
          fontFamily: 'var(--font-typewriter)'
        }}>
          <span>VOL. MMXXVI No. 08</span>
          <span>DELHI, INDIA</span>
          <span>STATUS: OPEN TO WORK</span>
          <span>PRICE: 1 COFFEE</span>
        </div>
      </header>

      {/* 2. MAIN FRONT PAGE GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(12, 1fr)', 
        gap: '2rem' 
      }}>
        
        {/* LEFT COLUMN: THE LEAD STORY (8 cols on desktop, 12 on mobile) */}
        <article style={{ 
          gridColumn: 'span 8', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          borderRight: '1px solid #e0dbc8',
          paddingRight: '1.5rem'
        }} className="lead-story-col">
          <div style={{ color: 'var(--color-red-ink)', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>
            ★ LATEST RECRUITMENT NEWS ★
          </div>
          <h2 style={{ fontSize: '2.5rem', lineHeight: '1.1', fontWeight: 900 }}>
            ENGINEER DEPLOYS NEXT-GEN AI PLATFORMS TO PRODUCTION
          </h2>
          <p style={{ fontFamily: 'var(--font-typewriter)', fontStyle: 'italic', color: 'var(--color-text-muted)', margin: 0 }}>
            Special Report: Undergrad SDE Intern modernizes legacy sites, launches microservices, and automates high-performance messaging pipelines.
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid #1a1917', margin: '0.5rem 0' }} />

          {/* Justified News Column text */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '1.5rem',
            textAlign: 'justify',
            fontSize: '0.95rem',
            lineHeight: '1.6'
          }} className="newspaper-text-columns">
            <div>
              <span style={{ 
                float: 'left', 
                fontSize: '3.5rem', 
                lineHeight: '0.8', 
                fontWeight: '900', 
                paddingRight: '0.5rem', 
                fontFamily: 'var(--font-heading)' 
              }}>
                V
              </span>
              asudev Bansal, a highly capable Software Development Engineer Intern at <strong>ChalksnBoard</strong>, has been successfully shipping high-performance architectures. Bridging frontend craft with backend scaling, he recently migrated ChalksnBoard's entire customer-facing site to React and Next.js, boosting user experience and responsiveness.
            </div>
            <div>
              His technical leadership is highlighted in the implementation of <strong>Vasooli AI</strong>, where he engineered automated payment queues using Redis and BullMQ, paired with WhatsApp and Twilio messaging APIs. Currently containerized using Docker, his architectures focus heavily on speed and developer experience.
            </div>
          </div>

          {/* Quick interactive page router prompt */}
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            backgroundColor: 'var(--bg-paper-dark)',
            borderLeft: '4px solid var(--color-red-ink)'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📰</span> Inside This Edition:
            </h4>
            <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
              <li><strong>Page 2:</strong> Technical reviews of AssetFlow, AgriYield, and Vasooli AI systems.</li>
              <li><strong>Page 3:</strong> Classified ads (Internship timeline) and Editor direct contact letter.</li>
            </ul>
          </div>
        </article>

        {/* RIGHT COLUMN: RECRUITER CHEAT-SHEET (4 cols) */}
        <aside style={{ 
          gridColumn: 'span 4', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem'
        }} className="recruiter-cheat-sheet">
          
          {/* Quick CTA Card */}
          <div style={{ 
            border: '2px solid #1a1917', 
            padding: '1.2rem', 
            backgroundColor: '#fff', 
            boxShadow: '4px 4px 0px var(--color-shadow)',
            position: 'relative'
          }}>
            <div style={{ 
              position: 'absolute', 
              top: '-10px', 
              right: '10px', 
              backgroundColor: 'var(--color-red-ink)', 
              color: '#fff', 
              padding: '2px 8px', 
              fontSize: '0.7rem', 
              fontWeight: 'bold',
              letterSpacing: '0.05em'
            }}>
              BULLETIN
            </div>
            <h3 style={{ fontSize: '1.3rem', margin: '0 0 1rem 0', fontFamily: 'var(--font-heading)' }}>
              Recruiter Quick-Actions
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <a 
                href="/resume.pdf" 
                target="_blank"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '0.5rem', 
                  backgroundColor: '#1a1917', 
                  color: '#fff', 
                  padding: '0.7rem', 
                  fontWeight: 'bold',
                  borderRadius: '2px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-red-ink)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#1a1917'}
              >
                <Download size={16} /> Download Resume (PDF)
              </a>

              <button 
                onClick={handleCopyEmail}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '0.5rem', 
                  border: '1px solid #1a1917', 
                  color: '#1a1917', 
                  padding: '0.7rem', 
                  fontWeight: 'bold',
                  borderRadius: '2px'
                }}
              >
                <Mail size={16} /> Copy Email Address
              </button>
            </div>

            <div style={{ 
              marginTop: '1rem', 
              paddingTop: '1rem', 
              borderTop: '1px dashed #1a1917',
              fontSize: '0.85rem',
              lineHeight: '1.5',
              fontFamily: 'var(--font-typewriter)'
            }}>
              <div><strong>Notice:</strong> Immediate Start</div>
              <div><strong>Location:</strong> Delhi, India (Hybrid/Remote)</div>
              <div><strong>Stack:</strong> React, Next.js, Node, Python</div>
            </div>
          </div>

          {/* Quick Skills Board */}
          <div style={{ borderTop: '2px solid #1a1917', paddingTop: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', borderBottom: '1px solid #1a1917', paddingBottom: '0.2rem' }}>
              Core Competencies
            </h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['Next.js', 'React Native', 'Node.js', 'FastAPI', 'Redis', 'BullMQ', 'Docker', 'PostgreSQL', 'MongoDB', 'C++', 'Java', 'Git'].map(skill => (
                <span 
                  key={skill}
                  style={{ 
                    border: '1px solid #1a1917', 
                    padding: '2px 8px', 
                    fontSize: '0.75rem', 
                    fontFamily: 'var(--font-typewriter)',
                    backgroundColor: 'var(--bg-paper-dark)'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Fun Editorial Cartoon / Image Box */}
          <div style={{ 
            border: '1px solid #1a1917', 
            padding: '4px', 
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{ 
              width: '100%', 
              height: '140px', 
              background: 'radial-gradient(circle, #ccc 10%, transparent 11%)', 
              backgroundSize: '8px 8px',
              backgroundColor: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: '#888',
              fontFamily: 'var(--font-typewriter)'
            }}>
              [ CODE // ART ]
            </div>
            <span style={{ fontSize: '0.7rem', fontStyle: 'italic', padding: '0.5rem', fontFamily: 'var(--font-typewriter)' }}>
              Fig 1. Developer converting espresso input into structured API calls.
            </span>
          </div>

        </aside>

      </div>

      {/* PAGE BOTTOM CONTROLS */}
      <footer style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: '1.5rem', 
        paddingTop: '1rem',
        borderTop: '1px solid #1a1917' 
      }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>The Bansal Gazette — Page 1</span>
        <button 
          onClick={() => setActivePage(1)}
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
          Go to Projects (Page 2) <ChevronRight size={16} />
        </button>
      </footer>

    </div>
  );
}
