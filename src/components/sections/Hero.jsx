'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { playSound } from '@/components/audio/AudioManager';
import { useStore } from '@/store/useStore';
import styles from './Hero.module.css';

const ROLES = [
  "Software Engineer",
  "Backend Engineer",
  "AI Builder",
  "Distributed Systems Enthusiast"
];

export default function Hero() {
  const titleRef = useRef(null);
  const rolesRef = useRef(null);
  const taglineRef = useRef(null);
  const navRef = useRef(null);
  const canvasRef = useRef(null);
  const [view, setView] = useState('home'); // 'home' | 'projects' | 'profile' | 'socials' | 'notebook'
  const contentRef = useRef(null);

  // Audio store state
  const isAudioEnabled = useStore((state) => state.isAudioEnabled);
  const setAudioEnabled = useStore((state) => state.setAudioEnabled);

  // CLI Terminal states
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState([
    "VASU-OS v1.0.4 initialized.",
    "Type 'help' to view available system commands."
  ]);
  const cliEndRef = useRef(null);

  // Keyboard Arcade menu state
  const [menuIndex, setMenuIndex] = useState(0);

  // Reset menuIndex on view change
  const changeView = (newView) => {
    console.log("[DEBUG] changeView triggered with:", newView);
    try { playSound('switch'); } catch (err) { }
    setMenuIndex(0);
    
    // Play a screen transition flicker/refresh animation
    gsap.timeline()
      .to(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          console.log("[DEBUG] Transition fade-out complete. Setting view to:", newView);
          setView(newView);
        }
      })
      .to(contentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out"
      });
  };

  const getMenuItems = () => {
    if (view === 'home') {
      return ['projects', 'internship', 'profile', 'notebook', 'terminal', 'socials', 'resume'];
    } else if (view === 'socials') {
      return ['github', 'linkedin', 'leetcode', 'back'];
    } else if (view === 'projects') {
      return ['assetflow', 'agriyield', 'vasooli', 'back'];
    } else if (view === 'notebook') {
      return ['ABOUT_ME.log', 'INTERNSHIPS.log', 'AGRIYIELD.log', 'VASOOLI_AI.log', 'back'];
    }
    return [];
  };

  const triggerMenuAction = (action) => {
    if (action === 'projects') changeView('projects');
    else if (action === 'internship') changeView('internship');
    else if (action === 'profile') changeView('profile');
    else if (action === 'notebook') changeView('notebook');
    else if (action === 'terminal') changeView('terminal');
    else if (action === 'socials') changeView('socials');
    else if (action === 'resume') {
      try { playSound('switch'); } catch(e) {}
      window.open('/resume.pdf', '_blank');
    }
    else if (action === 'back') changeView('home');
    else if (action === 'github') {
      try { playSound('switch'); } catch(e) {}
      window.open('https://github.com/Vasu3759', '_blank');
    }
    else if (action === 'linkedin') {
      try { playSound('switch'); } catch(e) {}
      window.open('https://www.linkedin.com/in/vasudev-bansal-9191b2295/', '_blank');
    }
    else if (action === 'leetcode') {
      try { playSound('switch'); } catch(e) {}
      window.open('https://leetcode.com/u/sRQnn9uccM/', '_blank');
    }
    else if (action === 'assetflow') {
      try { playSound('switch'); } catch(e) {}
      window.open('https://assetflow-0725.onrender.com/login', '_blank');
    }
    else if (action === 'agriyield') {
      try { playSound('switch'); } catch(e) {}
      window.open('https://github.com/Vasu3759', '_blank');
    }
    else if (action === 'vasooli') {
      try { playSound('switch'); } catch(e) {}
      window.open('https://github.com/Vasu3759', '_blank');
    }
    else if (action === 'ABOUT_ME.log' || action === 'INTERNSHIPS.log' || action === 'AGRIYIELD.log' || action === 'VASOOLI_AI.log') {
      setSelectedFile(action);
      try { playSound('paper'); } catch(e) {}
    }
  };

  const homeItems = [
    { id: 'projects', label: 'PROJECTS' },
    { id: 'internship', label: 'INTERNSHIPS' },
    { id: 'profile', label: 'PROFILE' },
    { id: 'notebook', label: 'NOTEBOOK' },
    { id: 'terminal', label: 'TERMINAL' },
    { id: 'socials', label: 'SOCIALS' },
    { id: 'resume', label: 'RESUME' }
  ];

  const socialsItems = [
    { id: 'github', label: 'GITHUB' },
    { id: 'linkedin', label: 'LINKEDIN' },
    { id: 'leetcode', label: 'LEETCODE' },
    { id: 'back', label: 'BACK' }
  ];

  const projectsItems = [
    { id: 'assetflow', label: 'ASSETFLOW - ENTERPRISE ASSET SYSTEM' },
    { id: 'agriyield', label: 'AGRIYIELD - AI SMART FARMING PLATFORM' },
    { id: 'vasooli', label: 'VASOOLI AI - FEE COLLECTION PLATFORM' },
    { id: 'back', label: 'RETURN TO SYSTEM HOME' }
  ];

  // Helper to render the Tekken-style 3-slot rolling menu
  const renderRollingMenu = (items, currentIdx) => {
    const prevIdx = (currentIdx - 1 + items.length) % items.length;
    const currIdx = currentIdx;
    const nextIdx = (currentIdx + 1) % items.length;

    const visibleIndices = [prevIdx, currIdx, nextIdx];

    return (
      <div className={styles.rollingMenuContainer}>
        {visibleIndices.map((idx, position) => {
          const item = items[idx];
          const isMiddle = position === 1;

          return (
            <button
              key={item.id}
              className={`${styles.rollingMenuItem} ${isMiddle ? styles.rollingMiddleActive : ''}`}
              onClick={() => {
                if (isMiddle) {
                  triggerMenuAction(item.id);
                } else {
                  setMenuIndex(idx);
                }
              }}
              onMouseEnter={() => setMenuIndex(idx)}
            >
              {isMiddle && <span className={styles.fixedCursor}>&gt;</span>}
              {item.label}
              {isMiddle && <span className={styles.fixedCursorRight}>&lt;</span>}
            </button>
          );
        })}
      </div>
    );
  };

  // Keyboard navigation listener (Tekken 3 style)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if terminal input is focused
      if (document.activeElement?.id === 'cli-terminal-input') {
        return;
      }

      const items = getMenuItems();
      if (items.length === 0) return;

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        setMenuIndex((prev) => (prev - 1 + items.length) % items.length);
        try { playSound('keyboard'); } catch(err) {}
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setMenuIndex((prev) => (prev + 1) % items.length);
        try { playSound('keyboard'); } catch(err) {}
      } else if (e.key === 'Enter') {
        e.preventDefault();
        triggerMenuAction(items[menuIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, menuIndex]);

  // MS-DOS Notebook states
  const [selectedFile, setSelectedFile] = useState('ABOUT_ME.log');
  const notebookFiles = {
    'ABOUT_ME.log': [
      "================= PARTITION: USER_BIO =================",
      "Subject: Vasudev Bansal",
      "Academic Status: Computer Science undergraduate at USICT GGSIPU",
      "Current Designation: SDE Intern at ChalksnBoard",
      "",
      "System Diagnostics:",
      "- Coffee intake: High",
      "- Code quality: Works fine, do not ask how",
      "- Sleep cycles: Deprecated",
      "",
      "Focusing on backend systems, REST APIs, microservices, and AI-integrated",
      "platforms using Node.js, Express, FastAPI, Docker, Redis, and BullMQ."
    ],
    'INTERNSHIPS.log': [
      "================= LOG: WORK_EXPERIENCE =================",
      "1. Software Development Engineer (Full Stack) Intern — ChalksnBoard",
      "   Duration: June 2026 – Present",
      "   - Modernized ChalksnBoard website migrating to React.js and Next.js.",
      "   - Implemented interactive scroll animations with Framer Motion, GSAP & Three.js.",
      "   - Building Vasooli AI (Node.js, Express, MongoDB, JWT, WhatsApp/Twilio APIs, Redis, BullMQ).",
      "   - Containerized backend services with Docker & AI voice tech (Edge TTS, Coqui, LiveKit).",
      "",
      "2. Full Stack / AI Developer Intern — AICTE",
      "   Duration: June 2026 – July 2026",
      "   - 6-week internship developing AgriYield (React Native, Node.js, FastAPI, MongoDB).",
      "   - Engineered microservices architecture with Python FastAPI & Node.js REST APIs.",
      "   - Integrated OpenWeather API & OGD India API for real-time agricultural data.",
      "   - Automated Android APK builds using GitHub Actions & Expo CLI, deployed on Render."
    ],
    'AGRIYIELD.log': [
      "================= LOG: AGRIYIELD_DEV =================",
      "Stack: React Native, Expo, Node.js, Express, FastAPI, MongoDB, Docker, Render",
      "",
      "Platform Analysis:",
      "- End-to-end AI-powered smart farming platform.",
      "- Built XGBoost ML microservice exposed via FastAPI (14 soil/env params).",
      "- Implemented JWT Auth, bcrypt hashing, and MongoDB historical prediction storage.",
      "- Integrated OpenWeather API (GPS weather) & OGD India API (live commodity prices).",
      "- Designed bilingual (English/Hindi) mobile UI with glassmorphism styling."
    ],
    'VASOOLI_AI.log': [
      "================= LOG: VASOOLI_AI_DEV =================",
      "Role: Lead Developer",
      "Stack: Node.js, Express, MongoDB, React Native",
      "",
      "Platform Analysis:",
      "- Engineered automated fee collection platform.",
      "- Integrated WhatsApp & Twilio SMS notification queues.",
      "- Scheduled background processing using Redis & BullMQ.",
      "- Containerized deployment environment using Docker."
    ]
  };

  // Phosphor theme cycle state
  const [phosphorTheme, setPhosphorTheme] = useState('green'); // 'green' | 'amber' | 'red'

  const cycleTheme = () => {
    try { playSound('switch'); } catch(e) {}
    if (phosphorTheme === 'green') {
      document.documentElement.style.setProperty('--color-crt-green', '#d69c52');
      setPhosphorTheme('amber');
    } else if (phosphorTheme === 'amber') {
      document.documentElement.style.setProperty('--color-crt-green', '#ff3333');
      setPhosphorTheme('red');
    } else {
      document.documentElement.style.setProperty('--color-crt-green', '#7FAE6E');
      setPhosphorTheme('green');
    }
  };

  // Auto-scroll CLI output
  useEffect(() => {
    if (cliEndRef.current) {
      cliEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cliHistory]);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const input = cliInput.trim().toLowerCase();
    if (!input) return;

    try { playSound('keyboard'); } catch(err) {}

    const newHistory = [...cliHistory, `vasu@sys:~$ ${cliInput}`];
    const args = input.split(' ');
    const cmd = args[0];

    switch (cmd) {
      case 'help':
        newHistory.push(
          "Available terminal options:",
          "  help           - Displays this command menu",
          "  projects       - Transitions screen to PROJECTS",
          "  internship     - Transitions screen to INTERNSHIPS",
          "  profile        - Transitions screen to PROFILE",
          "  socials        - Transitions screen to SOCIALS",
          "  notebook       - Transitions screen to NOTEBOOK (MS-DOS Edit)",
          "  theme [color]  - Changes screen color (green / amber / red)",
          "  clear          - Clears the console logs",
          "  exit / back    - Closes shell and returns to system home"
        );
        break;
      case 'clear':
        setCliHistory([]);
        setCliInput('');
        return;
      case 'exit':
      case 'back':
        changeView('home');
        newHistory.push("Closing shell connection...");
        break;
      case 'projects':
        changeView('projects');
        newHistory.push("Redirecting to [PROJECTS] index...");
        break;
      case 'internship':
      case 'internships':
      case 'experience':
        changeView('internship');
        newHistory.push("Redirecting to [INTERNSHIPS] index...");
        break;
      case 'profile':
        changeView('profile');
        newHistory.push("Redirecting to [PROFILE] index...");
        break;
      case 'socials':
        changeView('socials');
        newHistory.push("Redirecting to [SOCIALS] index...");
        break;
      case 'notebook':
        changeView('notebook');
        newHistory.push("Launching MS-DOS Editor [NOTEBOOK]...");
        break;
      case 'theme':
        const color = args[1];
        if (color === 'green' || color === 'classic') {
          document.documentElement.style.setProperty('--color-crt-green', '#7FAE6E');
          setPhosphorTheme('green');
          newHistory.push("Phosphor theme updated: CLASSIC_GREEN");
        } else if (color === 'amber') {
          document.documentElement.style.setProperty('--color-crt-green', '#d69c52');
          setPhosphorTheme('amber');
          newHistory.push("Phosphor theme updated: AMBER_WARM");
        } else if (color === 'red') {
          document.documentElement.style.setProperty('--color-crt-green', '#ff3333');
          setPhosphorTheme('red');
          newHistory.push("Phosphor theme updated: EMER_RED");
        } else {
          newHistory.push("Theme usage: theme [green|amber|red]");
        }
        break;
      case 'hack':
        newHistory.push(
          "======================================",
          "ACCESS GRANTED. INITIALIZING GLITCH...",
          "01010100 01001000 01000101 00100000 01001101",
          "01000001 01010100 01010010 01001001 01011000",
          "======================================"
        );
        break;
      default:
        newHistory.push(`Command not found: '${cmd}'. Type 'help' for options.`);
    }

    setCliHistory(newHistory);
    setCliInput('');
  };

  // Cinematic GSAP entry (Runs only ONCE on mount)
  useEffect(() => {
    console.log("[DEBUG] Hero cinematic entry mounted");

    const handleGlobalClick = (e) => {
      console.log("[DEBUG] Global click target:", e.target, "Tag:", e.target.tagName, "Classes:", e.target.className);
    };
    window.addEventListener('click', handleGlobalClick);

    const tl = gsap.timeline({ delay: 0.5 });

    if (titleRef.current) {
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        onStart: () => {
          try { playSound('switch'); } catch (err) { }
        }
      });
    }

    if (rolesRef.current) {
      tl.to(rolesRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");
    }

    if (taglineRef.current) {
      tl.to(taglineRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=0.5");
    }

    if (navRef.current) {
      tl.to(navRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=1");
    }

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      tl.kill();
    };
  }, []);

  // Roles rotation animation (Runs only when view is 'home')
  useEffect(() => {
    if (view !== 'home' || !rolesRef.current) return;

    console.log("[DEBUG] Starting roles rotation");
    const rolesChildren = rolesRef.current.children;
    if (rolesChildren.length === 0) return;

    let currentRole = 0;
    gsap.set(rolesChildren, { y: 30, opacity: 0 });
    gsap.to(rolesChildren[0], { y: 0, opacity: 1, duration: 0.5 });

    const roleInterval = setInterval(() => {
      const prev = currentRole;
      currentRole = (currentRole + 1) % ROLES.length;

      if (rolesChildren[prev] && rolesChildren[currentRole]) {
        gsap.to(rolesChildren[prev], { y: -30, opacity: 0, duration: 0.5 });
        gsap.fromTo(rolesChildren[currentRole],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 }
        );
      }
    }, 5000);

    return () => {
      clearInterval(roleInterval);
    };
  }, [view]);

  // Oscilloscope Canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();

      // CRT Green color for the oscilloscope
      ctx.strokeStyle = '#7FAE6E';
      ctx.lineWidth = 2;

      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      for (let x = 0; x < width; x++) {
        // Complex wave combining multiple sine functions
        const wave1 = Math.sin(x * 0.02 + time) * 50;
        const wave2 = Math.sin(x * 0.05 - time * 1.5) * 20;
        const noise = (Math.random() - 0.5) * 5;

        // Attenuate at edges
        const edgeAttenuation = Math.sin((x / width) * Math.PI);

        const y = midY + (wave1 + wave2 + noise) * edgeAttenuation;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      time += 0.05;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className={styles.heroContainer}>
      <div className={styles.dashboard}>

        {/* Brushed metal control panel */}
        <div className={styles.controlPanel}>
          <div className={styles.screwTopLeft} />
          <div className={styles.screwTopRight} />
          
          <button 
            className={`${styles.bezelSwitch} ${isAudioEnabled ? styles.switchOn : ''}`}
            onClick={() => {
              setAudioEnabled(!isAudioEnabled);
              try { playSound('switch'); } catch(e) {}
            }}
          >
            <div className={styles.switchHandle}></div>
            <span className={styles.switchLabel}>AUDIO</span>
          </button>

          <button className={styles.themeKnob} onClick={cycleTheme}>
            <div 
              className={styles.knobGraphic}
              style={{
                transform: phosphorTheme === 'amber' ? 'rotate(120deg)' : phosphorTheme === 'red' ? 'rotate(240deg)' : 'rotate(0deg)'
              }}
            />
            <span className={styles.knobLabel}>COLOR: {phosphorTheme.toUpperCase()}</span>
          </button>

          <div className={styles.screwBottomLeft} />
          <div className={styles.screwBottomRight} />
        </div>
        
        {/* Main CRT Screen Area (Now Full Dashboard Width) */}
        <div className={styles.mainScreen}>
          {/* Subtle scanlines and vignette inside screen only */}
          <div className={styles.crtOverlay}></div>
          <canvas ref={canvasRef} className={styles.oscilloscope} />
          
          <div ref={contentRef} className={styles.content}>
            {/* Home View is kept mounted so its GSAP animated state is preserved */}
            <div style={{ display: view === 'home' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center' }}>
              <h1 ref={titleRef} className={styles.title}>Vasudev Bansal</h1>

              <div ref={rolesRef} className={styles.rolesContainer}>
                {ROLES.map((role, idx) => (
                  <div key={idx} className={styles.role} style={{ position: idx === 0 ? 'relative' : 'absolute', top: 0, left: 0, width: '100%' }}>
                    {role}
                  </div>
                ))}
              </div>

              <h2 ref={taglineRef} className={styles.tagline}>
                "I don't just write code. I engineer systems."
              </h2>

              <div className={styles.systemStatusLine}>
                [ STATUS: RUNNING ON COFFEE | USE ▲/▼ OR W/S TO PRETEND YOU ARE IN CONTROL ]
              </div>

              <div ref={navRef} className={styles.terminalNav}>
                {renderRollingMenu(homeItems, menuIndex)}
              </div>
            </div>

            {view === 'socials' && (
              <div className={styles.menuView}>
                <h2 className={styles.menuTitle}> FOLLOW ME </h2>
                <div className={styles.systemStatusLine} style={{ alignSelf: 'center', marginBottom: '1rem' }}>
                  [ DIAL-UP: STALKER MODE | CHOOSE ▲/▼ TO SELECT YOUR ADDICTION ]
                </div>
                {renderRollingMenu(socialsItems, menuIndex)}
              </div>
            )}

            {view === 'profile' && (
              <div className={styles.menuView}>
                <h2 className={styles.menuTitle}>[ CARBON_BASED_UNIT_LOGS ]</h2>
                <div className={styles.scrollContainer}>
                  <div className={styles.scrollContent}>
                    <div className={styles.profileSection}>
                      <span className={styles.sectionHeader}>[ BIO (SYSTEM_SUMMARY) ]</span>
                      <p className={styles.profileBio}>
                        A human-shaped code compiler at USICT GGSIPU. Currently masquerading as an SDE Intern at ChalksnBoard where I rewrite websites in Next.js because plain HTML wasn't complicated enough. Expert at writing bugs that somehow load faster than the actual features.
                      </p>
                    </div>

                    <div className={styles.profileSection}>
                      <span className={styles.sectionHeader}>[ EDUCATION (BRAIN_PARTITIONING) ]</span>
                      <ul className={styles.profileList}>
                        <li>B.Tech in CSE (USICT GGSIPU) — CGPA: 8.1 [2024 - 2028] (Mostly spent Googling why JavaScript exists)</li>
                        <li>SD Public School — XII: 92% (Clearly peaked here) | X: 91% (Before the screen-glare set in)</li>
                      </ul>
                    </div>

                    <div className={styles.profileSection}>
                      <span className={styles.sectionHeader}>[ TECHNICAL EXPERTISE (THINGS_I_FIGHT_DAILY) ]</span>
                      <ul className={styles.profileList}>
                        <li><strong>Languages:</strong> C++, Java, Python, JavaScript, SQL, HTML/CSS</li>
                        <li><strong>Frontend:</strong> React.js, Next.js, React Native (Expo), Framer Motion, GSAP, Three.js, Tailwind CSS</li>
                        <li><strong>Backend:</strong> Node.js, Express.js, Python FastAPI, REST APIs, JWT Auth, Prisma ORM, BullMQ, Cron Jobs</li>
                        <li><strong>Databases & AI:</strong> PostgreSQL, MongoDB Atlas, Redis, Supabase, Gemini API, XGBoost</li>
                        <li><strong>DevOps & Tools:</strong> Docker, Git, GitHub Actions, Postman, Render, Vercel, Expo CLI</li>
                      </ul>
                    </div>

                    <div className={styles.profileSection}>
                      <span className={styles.sectionHeader}>[ ACHIEVEMENTS (SYSTEM_GLITCHES) ]</span>
                      <ul className={styles.profileList}>
                        <li>Solved 250+ LeetCode problems (Sacrificed my sleep schedule for green checkmarks)</li>
                        <li>Shipped multiple production applications (They are somehow still running, please do not touch them)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button className={`${styles.terminalLink} ${styles.backLink}`} onClick={() => changeView('home')}>
                  <span className={styles.cursorIcon}>&lt;</span> BACK
                </button>
              </div>
            )}

            {view === 'internship' && (
              <div className={styles.menuView}>
                <h2 className={styles.menuTitle}>[ WORK_EXPERIENCE_LOGS ]</h2>
                <div className={styles.scrollContainer}>
                  <div className={styles.scrollContent}>
                    <div className={styles.profileSection}>
                      <span className={styles.sectionHeader}>1. ChalksnBoard — Software Development Engineer Intern</span>
                      <div style={{ color: 'var(--color-crt-green)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        [ June 2026 – Present ] | React, Next.js, Framer Motion, GSAP, Node.js, Express, MongoDB, Docker
                      </div>
                      <ul className={styles.profileList}>
                        <li>Spearheaded modernization of ChalksnBoard website by migrating to scalable React.js & Next.js.</li>
                        <li>Implemented interactive scroll animations & responsive layouts using Framer Motion, GSAP & Three.js.</li>
                        <li>Developing <strong>Vasooli AI</strong> (AI fee collection platform with Node.js, Express, MongoDB, JWT).</li>
                        <li>Built REST APIs with WhatsApp (Interakt), Twilio, Redis & BullMQ for automated workflows.</li>
                        <li>Containerized backend services with Docker & explored AI voice tech (Edge TTS, Coqui, LiveKit).</li>
                      </ul>
                    </div>

                    <div className={styles.profileSection}>
                      <span className={styles.sectionHeader}>2. AICTE — Full Stack / AI Developer Intern</span>
                      <div style={{ color: 'var(--color-crt-green)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        [ June 2026 – July 2026 ] | React Native, Expo, Python FastAPI, Node.js, Express, MongoDB, Render
                      </div>
                      <ul className={styles.profileList}>
                        <li>Completed 6-week internship developing <strong>AgriYield</strong> (AI-powered smart farming platform).</li>
                        <li>Engineered microservices architecture with Node.js/Express APIs and Python FastAPI ML services.</li>
                        <li>Integrated OpenWeather API for GPS weather retrieval & OGD India API for live market prices.</li>
                        <li>Automated Android APK builds using GitHub Actions & Expo CLI, deployed microservices on Render.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button className={`${styles.terminalLink} ${styles.backLink}`} onClick={() => changeView('home')}>
                  <span className={styles.cursorIcon}>&lt;</span> BACK
                </button>
              </div>
            )}

            {view === 'projects' && (
              <div className={styles.menuView}>
                <h2 className={styles.menuTitle}>PROJECT ARCHIVE </h2>
                <div className={styles.systemStatusLine} style={{ alignSelf: 'center', marginBottom: '1rem' }}>
                  [ ARCHIVE: CHOOSE ▲/▼ OR W/S TO REVEAL BUGS ]
                </div>
                <div className={styles.projectList}>
                  <div className={styles.projectItemStatic}>
                    <strong>AgriYield</strong> - AI Smart Farming Platform (React Native, FastAPI, Node.js).
                  </div>
                  {renderRollingMenu(projectsItems, menuIndex)}
                </div>
              </div>
            )}

            {view === 'notebook' && (
              <div className={styles.dosWrapper}>
                {/* MS-DOS Edit header menu bar */}
                <div className={styles.dosHeader}>
                  <span>File</span>
                  <span>Edit</span>
                  <span>Search</span>
                  <span>Options</span>
                  <span>Help</span>
                </div>

                <div className={styles.dosMain}>
                  {/* File Explorer list */}
                  <div className={styles.dosSidebar}>
                    <div className={styles.sidebarTitle}>FILES</div>
                    {Object.keys(notebookFiles).map((file, fileIdx) => (
                      <div 
                        key={file} 
                        className={`${styles.dosFileItem} ${selectedFile === file ? styles.activeFile : ''} ${menuIndex === fileIdx ? styles.activeDosItem : ''}`}
                        onClick={() => {
                          setSelectedFile(file);
                          setMenuIndex(fileIdx);
                          try { playSound('paper'); } catch(e) {}
                        }}
                        onMouseEnter={() => setMenuIndex(fileIdx)}
                      >
                        {file}
                      </div>
                    ))}
                  </div>

                  {/* Document viewer pane */}
                  <div className={styles.dosEditorPane}>
                    <div className={styles.dosFileTitle}>{selectedFile}</div>
                    <div className={styles.dosEditorText}>
                      {notebookFiles[selectedFile].map((line, idx) => (
                        <div key={idx} className={styles.dosTextLine}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* MS-DOS bottom shortcut key helper */}
                <div className={styles.dosFooter}>
                  <span>F1=Help</span>
                  <span>Alt+F=File Menu</span>
                  <span>Selected: {selectedFile}</span>
                </div>

                <button 
                  className={`${styles.terminalLink} ${styles.backLink} ${menuIndex === 3 ? styles.activeLink : ''}`} 
                  style={{ marginTop: '1rem', alignSelf: 'flex-start' }} 
                  onClick={() => changeView('home')}
                  onMouseEnter={() => setMenuIndex(3)}
                >
                  <span className={styles.cursorIcon}>&lt;</span> BACK
                </button>
              </div>
            )}

            {view === 'terminal' && (
              <div className={styles.fullTerminalWrapper} onClick={() => {
                const input = document.getElementById('cli-terminal-input');
                if (input) input.focus();
              }}>
                <div className={styles.terminalHeader}>
                  <span>VASU-OS BASH SHELL (v1.0.4)</span>
                  <span>STATUS: ACTIVE</span>
                </div>
                
                <div className={styles.terminalBody}>
                  <div className={styles.cliHistory}>
                    {cliHistory.map((line, idx) => (
                      <div key={idx} className={styles.cliLine}>{line}</div>
                    ))}
                    <div ref={cliEndRef} />
                  </div>
                </div>

                <div className={styles.terminalPromptBar}>
                  <span className={styles.cliLabel}>vasu@sys:~$</span>
                  <input 
                    id="cli-terminal-input"
                    type="text" 
                    className={styles.cliInput}
                    value={cliInput}
                    onChange={(e) => setCliInput(e.target.value)}
                    onKeyDown={handleCommand}
                    placeholder="type 'help' or 'exit' to return..."
                    autoComplete="off"
                    autoFocus
                  />
                </div>

                <button className={`${styles.terminalLink} ${styles.backLink}`} style={{ marginTop: '1.5rem' }} onClick={() => changeView('home')}>
                  <span className={styles.cursorIcon}>&lt;</span> EXIT TERMINAL
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
