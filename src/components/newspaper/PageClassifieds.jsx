'use client';

import React, { useState } from 'react';
import { ChevronLeft, Send, Briefcase } from 'lucide-react';

export default function PageClassifieds({ setActivePage }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="newspaper-page-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Header */}
      <header style={{ borderBottom: '4px double #1a1917', paddingBottom: '0.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 style={{ fontFamily: 'var(--font-masthead)', fontSize: '2rem', margin: 0 }}>
            CLASSIFIEDS & OPINION
          </h2>
          <span style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.85rem' }}>
            VOLUME III: WORK CHRONICLES & DIRECT MAIL
          </span>
        </div>
      </header>

      {/* Main Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(12, 1fr)', 
        gap: '2rem' 
      }}>
        
        {/* LEFT COLUMN: WORK EXPERIENCE CLASSFIEDS (7 cols) */}
        <section style={{ 
          gridColumn: 'span 7',
          borderRight: '1px solid #e0dbc8',
          paddingRight: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <h3 style={{ 
            fontSize: '1.4rem', 
            borderBottom: '1px solid #1a1917', 
            paddingBottom: '0.3rem',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Briefcase size={20} /> Professional Postings
          </h3>

          {/* Job 1 */}
          <article style={{ borderBottom: '1px dashed #c0bca8', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h4 style={{ fontSize: '1.1rem', margin: 0 }}>ChalksnBoard — SDE Intern</h4>
              <span style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                June 2026 – Present
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontStyle: 'italic', margin: '0.2rem 0 0.5rem' }}>
              Full-Stack Modernization & Microservices
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', lineHeight: '1.5', textAlign: 'justify' }}>
              <li>Migrating production interfaces to React/Next.js client models.</li>
              <li>Devised backend Redis event listener pipelines for message broadcasts using BullMQ hooks.</li>
              <li>Implementing clean Twilio and WhatsApp API message integration flows.</li>
            </ul>
          </article>

          {/* Job 2 */}
          <article>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h4 style={{ fontSize: '1.1rem', margin: 0 }}>AICTE — Full Stack / AI Intern</h4>
              <span style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                June 2026 – July 2026
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontStyle: 'italic', margin: '0.2rem 0 0.5rem' }}>
              ML Crop Recommendations & API Aggregation
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', lineHeight: '1.5', textAlign: 'justify' }}>
              <li>Co-created AgriYield (React Native / FastAPI) integrating agricultural telemetry feeds.</li>
              <li>Integrated OpenWeather GPS parsing API and OGD India government commodity markets API.</li>
              <li>Containerized deployment stacks using Docker endpoints.</li>
            </ul>
          </article>

        </section>

        {/* RIGHT COLUMN: CONTACT THE EDITOR FORM & SOCIALS (5 cols) */}
        <section style={{ 
          gridColumn: 'span 5',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          
          {/* Letters to the Editor / Contact */}
          <div style={{ 
            border: '2px solid #1a1917', 
            padding: '1.2rem', 
            backgroundColor: '#fff',
            position: 'relative'
          }}>
            <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)' }}>
              Letter to the Editor
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '0 0 1rem 0' }}>
              Have an inquiry or recruiting proposal? Send dispatch directly.
            </p>

            {submitted ? (
              <div style={{ 
                padding: '1rem', 
                backgroundColor: 'var(--bg-paper-dark)', 
                textAlign: 'center',
                fontFamily: 'var(--font-typewriter)',
                fontSize: '0.85rem'
              }}>
                ✉ DISPATCH TRANSMITTED.<br />Thank you for writing.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <input 
                  type="text" 
                  placeholder="Your Name / Organization" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ 
                    padding: '0.5rem', 
                    border: '1px solid #1a1917', 
                    fontSize: '0.85rem', 
                    fontFamily: 'var(--font-typewriter)' 
                  }}
                />
                <input 
                  type="email" 
                  placeholder="Your Return Email Address" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{ 
                    padding: '0.5rem', 
                    border: '1px solid #1a1917', 
                    fontSize: '0.85rem', 
                    fontFamily: 'var(--font-typewriter)' 
                  }}
                />
                <textarea 
                  placeholder="Type your message..." 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  style={{ 
                    padding: '0.5rem', 
                    border: '1px solid #1a1917', 
                    fontSize: '0.85rem', 
                    fontFamily: 'var(--font-typewriter)',
                    resize: 'none' 
                  }}
                />
                <button 
                  type="submit"
                  style={{ 
                    backgroundColor: '#1a1917', 
                    color: '#fff', 
                    padding: '0.6rem', 
                    fontWeight: 'bold', 
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Send size={14} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Social Syndication Stamp Panel */}
          <div>
            <h4 style={{ fontSize: '0.9rem', borderBottom: '1px solid #1a1917', paddingBottom: '0.2rem', marginBottom: '0.8rem' }}>
              Press Syndications
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <a 
                href="https://github.com/Vasu3759" 
                target="_blank"
                style={{ 
                  border: '1px solid #1a1917', 
                  padding: '0.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-typewriter)',
                  backgroundColor: 'var(--bg-paper-dark)'
                }}
              >
                {/* SVG Github replacement icon */}
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> github.sys
              </a>
              <a 
                href="https://www.linkedin.com/in/vasudev-bansal-9191b2295/" 
                target="_blank"
                style={{ 
                  border: '1px solid #1a1917', 
                  padding: '0.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-typewriter)',
                  backgroundColor: 'var(--bg-paper-dark)'
                }}
              >
                {/* SVG Linkedin replacement icon */}
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg> linkedin.sys
              </a>
            </div>
          </div>

        </section>

      </div>

      {/* Bottom controls */}
      <footer style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 'auto', 
        paddingTop: '1rem',
        borderTop: '1px solid #1a1917' 
      }}>
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
          <ChevronLeft size={16} /> Back to Tech Section
        </button>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>The Bansal Gazette — Page 3</span>
      </footer>

    </div>
  );
}
