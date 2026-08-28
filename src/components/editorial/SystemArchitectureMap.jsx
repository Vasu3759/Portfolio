'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SystemArchitectureMap() {
  const [jobStatus, setJobStatus] = useState('idle'); // 'idle' | 'api' | 'redis' | 'worker' | 'done'
  const [logs, setLogs] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const consoleEndRef = useRef(null);

  const addLog = (message) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs((prev) => [...prev, `[${time}] ${message}`]);
  };

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const triggerJob = () => {
    if (jobStatus !== 'idle') return;
    
    setLogs([]);
    setJobStatus('api');
    addLog('SYSTEM: POST /api/v1/jobs initiated');
    addLog('API GATEWAY: Authenticating client...');

    setTimeout(() => {
      setJobStatus('redis');
      addLog('API GATEWAY: 202 Accepted. Handing task payload to Broker');
      addLog('REDIS: Enqueuing job_uuid: ' + Math.random().toString(36).substring(2, 8).toUpperCase() + ' to "payment_queue"');
    }, 1000);

    setTimeout(() => {
      setJobStatus('worker');
      addLog('BULLMQ: Polling... task picked up by Container #3');
      addLog('WORKER #3: Running background queue executors...');
      addLog('WORKER #3: Processing payment transaction logs...');
    }, 2500);

    setTimeout(() => {
      setJobStatus('done');
      addLog('WORKER #3: Transaction complete. Webhook response: 200 OK');
      addLog('SYSTEM: Task completed successfully.');
    }, 4500);

    setTimeout(() => {
      setJobStatus('idle');
    }, 6000);
  };

  const nodeInfo = {
    api: {
      title: 'FastAPI / Express Gateway',
      details: [
        'Endpoint: POST /api/v1/jobs',
        'Throughput: 5,000 req/sec limit',
        'Load Balancer: Nginx reverse proxy',
        'Authentication: JWT Bearer check'
      ]
    },
    redis: {
      title: 'Redis Queue Store (Broker)',
      details: [
        'In-Memory Store (v7.2)',
        'Structure: Redis Stream / Lists',
        'Queue Engine: BullMQ client',
        'Failover: Primary-Replica cluster'
      ]
    },
    worker: {
      title: 'BullMQ Worker Engines',
      details: [
        'Runtime: Dockerized Node.js cluster',
        'Scaling: Horizontal auto-scale',
        'Concurrency Limit: 50 active tasks',
        'Task Type: Transaction processing'
      ]
    }
  };

  return (
    <section style={{ padding: '6rem 0 4rem', borderTop: '1px solid var(--color-divider)' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--color-accent)', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
          Interactive Sandbox
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontFamily: 'var(--font-heading)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
          System Architecture Simulator
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '0.5rem', maxWidth: '600px' }}>
          Click the trigger button to watch a dynamic background task travel across the API Gateway, Redis Queue, and BullMQ worker clusters. Hover over nodes to see specs.
        </p>
      </div>

      <div className="sandbox-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', minHeight: '340px' }}>
        
        {/* Left Side: SVG Map */}
        <div style={{
          border: '1px solid var(--color-text)',
          borderRadius: '16px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          position: 'relative'
        }}>
          {/* Node detail tooltip overlay */}
          <div style={{ position: 'absolute', top: '15px', left: '15px', fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)' }}>
            {activeNode ? '● NODE DETECTOR ACTIVE' : '○ HOVER OVER NODE FOR SPECS'}
          </div>

          <div style={{ width: '100%', maxWidth: '400px', margin: '2rem 0' }}>
            <svg viewBox="0 0 320 100" style={{ width: '100%', overflow: 'visible' }}>
              {/* Connecting paths */}
              <line x1="60" y1="50" x2="160" y2="50" stroke={jobStatus === 'redis' || jobStatus === 'worker' || jobStatus === 'done' ? 'var(--color-accent)' : '#e2e2e2'} strokeWidth="2" style={{ transition: 'stroke 0.3s' }} />
              <line x1="160" y1="50" x2="260" y2="50" stroke={jobStatus === 'worker' || jobStatus === 'done' ? 'var(--color-accent)' : '#e2e2e2'} strokeWidth="2" style={{ transition: 'stroke 0.3s' }} />

              {/* Glowing Pulse Dot */}
              {jobStatus === 'api' && (
                <motion.circle cx={60} cy={50} r="6" fill="var(--color-accent)" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
              )}
              {jobStatus === 'redis' && (
                <motion.circle cx={160} cy={50} r="6" fill="var(--color-accent)" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
              )}
              {jobStatus === 'worker' && (
                <motion.circle cx={260} cy={50} r="6" fill="var(--color-accent)" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
              )}

              {/* Pulse transit animation */}
              {jobStatus === 'redis' && (
                <motion.circle cx={60} cy={50} r="4" fill="var(--color-accent)" animate={{ cx: [60, 160] }} transition={{ duration: 0.8, ease: 'easeInOut' }} />
              )}
              {jobStatus === 'worker' && (
                <motion.circle cx={160} cy={50} r="4" fill="var(--color-accent)" animate={{ cx: [160, 260] }} transition={{ duration: 0.8, ease: 'easeInOut' }} />
              )}

              {/* Node 1: API Gateway */}
              <g 
                cursor="pointer"
                onMouseEnter={() => setActiveNode('api')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <circle cx="60" cy="50" r="18" fill={jobStatus === 'api' ? 'var(--color-accent)' : '#ffffff'} stroke="var(--color-text)" strokeWidth="2" style={{ transition: 'fill 0.3s' }} />
                <text x="60" y="54" textAnchor="middle" fill={jobStatus === 'api' ? '#ffffff' : 'var(--color-text)'} fontSize="10" fontWeight="bold" fontFamily="var(--font-display)">API</text>
                <text x="60" y="78" textAnchor="middle" fill="var(--color-text)" fontSize="8.5" fontWeight="bold" fontFamily="var(--font-display)">GATEWAY</text>
              </g>

              {/* Node 2: Redis Broker */}
              <g 
                cursor="pointer"
                onMouseEnter={() => setActiveNode('redis')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <circle cx="160" cy="50" r="18" fill={jobStatus === 'redis' ? 'var(--color-accent)' : '#ffffff'} stroke="var(--color-text)" strokeWidth="2" style={{ transition: 'fill 0.3s' }} />
                <text x="160" y="54" textAnchor="middle" fill={jobStatus === 'redis' ? '#ffffff' : 'var(--color-text)'} fontSize="10" fontWeight="bold" fontFamily="var(--font-display)">REDIS</text>
                <text x="160" y="78" textAnchor="middle" fill="var(--color-text)" fontSize="8.5" fontWeight="bold" fontFamily="var(--font-display)">BROKER</text>
              </g>

              {/* Node 3: Workers */}
              <g 
                cursor="pointer"
                onMouseEnter={() => setActiveNode('worker')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <circle cx="260" cy="50" r="18" fill={jobStatus === 'worker' ? 'var(--color-accent)' : '#ffffff'} stroke="var(--color-text)" strokeWidth="2" style={{ transition: 'fill 0.3s' }} />
                <text x="260" y="54" textAnchor="middle" fill={jobStatus === 'worker' ? '#ffffff' : 'var(--color-text)'} fontSize="10" fontWeight="bold" fontFamily="var(--font-display)">WORKER</text>
                <text x="260" y="78" textAnchor="middle" fill="var(--color-text)" fontSize="8.5" fontWeight="bold" fontFamily="var(--font-display)">CLUSTER</text>
              </g>
            </svg>
          </div>

          {/* Node detail display card */}
          <div style={{ width: '100%', minHeight: '90px', borderTop: '1px solid var(--color-divider)', paddingTop: '1rem', marginTop: '1rem' }}>
            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  style={{ textAlign: 'left' }}
                >
                  <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-accent)', display: 'block', marginBottom: '0.3rem' }}>
                    {nodeInfo[activeNode].title}
                  </strong>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem 1.5rem' }}>
                    {nodeInfo[activeNode].details.map((detail, idx) => (
                      <span key={idx} style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        ✓ {detail}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)', fontSize: '0.8rem', paddingTop: '0.8rem' }}
                >
                  Hover over the API, REDIS, or WORKER nodes above to see the microservices spec sheet.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Log Console */}
        <div style={{
          backgroundColor: '#0a0a0a',
          borderRadius: '16px',
          padding: '1.5rem',
          color: '#ffffff',
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid var(--color-text)'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: '0.8rem', marginBottom: '1rem', opacity: 0.7 }}>
            <span>TASK CONSOLE LOGS</span>
            <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>
              {jobStatus.toUpperCase()}
            </span>
          </div>

          {/* Log rows */}
          <div style={{ flexGrow: 1, overflowY: 'auto', maxHeight: '180px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingRight: '0.5rem' }}>
            {logs.length === 0 ? (
              <span style={{ color: '#666', fontStyle: 'italic' }}>Console idle. Click "Trigger Job Pipeline" to begin.</span>
            ) : (
              logs.map((log, idx) => {
                let color = '#fff';
                if (log.includes('SYSTEM:')) color = 'var(--color-accent)';
                if (log.includes('REDIS:')) color = '#e06c75'; // Soft red
                if (log.includes('BULLMQ:')) color = '#61afef'; // Soft blue
                if (log.includes('WORKER:')) color = '#98c379'; // Soft green
                return <span key={idx} style={{ color }}>{log}</span>;
              })
            )}
            <div ref={consoleEndRef} />
          </div>

          {/* Trigger Button */}
          <button
            onClick={triggerJob}
            disabled={jobStatus !== 'idle'}
            style={{
              marginTop: '1.5rem',
              width: '100%',
              padding: '0.8rem',
              backgroundColor: jobStatus !== 'idle' ? '#222' : 'var(--color-accent)',
              color: jobStatus !== 'idle' ? '#666' : 'var(--bg-color)',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              cursor: jobStatus !== 'idle' ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s, transform 0.1s'
            }}
            onMouseEnter={(e) => {
              if (jobStatus === 'idle') e.target.style.backgroundColor = 'var(--color-text)';
            }}
            onMouseLeave={(e) => {
              if (jobStatus === 'idle') e.target.style.backgroundColor = 'var(--color-accent)';
            }}
          >
            {jobStatus === 'idle' ? 'TRIGGER JOB PIPELINE' : 'PIPELINE ACTIVE...'}
          </button>
        </div>
      </div>
    </section>
  );
}
