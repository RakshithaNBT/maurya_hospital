import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaBullseye, FaHospitalAlt, FaLayerGroup, FaAward, FaUserMd, FaLaptopMedical, FaHeartbeat, FaWallet, FaRegHeart, FaFlask, FaChevronRight, FaPills, FaRadiation } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import hospitalBuilding from '../assets/hospital_building.jpg';
import hospitalEmergencyEntrance from '../assets/hospital_emergency_entrance.jpg';
import hospitalEntrance from '../assets/hospital_entrance.png';

// Helper component for count-up animations on scroll
const StatCounter = ({ value, label }) => {
  const [count, setCount] = React.useState(0);
  const elementRef = React.useRef(null);
  const [hasStarted, setHasStarted] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!hasStarted) return;

    // Parse number and any non-numeric suffix
    const numMatch = value.match(/^([\d,]+)(.*)$/);
    if (!numMatch) {
      // Non-numeric (like 24/7)
      setCount(value);
      return;
    }

    const numericStr = numMatch[1].replace(/,/g, '');
    const suffix = numMatch[2];
    const target = parseInt(numericStr, 10);

    let startTimestamp = null;
    const duration = 1500; // 1.5 seconds

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease out quad
      const easedProgress = progress * (2 - progress);
      const current = Math.floor(easedProgress * target);

      setCount(current.toLocaleString() + suffix);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, value]);

  return (
    <div className="stat-counter-box" ref={elementRef}>
      <div className="stat-counter-number">{hasStarted ? count : "0"}</div>
      <div className="stat-counter-label">{label}</div>
    </div>
  );
};

const About = () => {
  const { t, i18n } = useTranslation();
  const acsRef = React.useRef(null);
  const [acsVisible, setAcsVisible] = React.useState(false);
  const [activeService, setActiveService] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAcsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (acsRef.current) {
      observer.observe(acsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page fade-in lang-fade-transition" key={i18n.language}>
      {/* Premium Banner */}
      <section style={{
        position: 'relative',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 60%, #c0392b 0%, #922b21 35%, #7a1f1f 65%, #4a0f0f 100%)',
      }}>
        {/* Layered depth gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.35) 0%, transparent 50%, rgba(0,0,0,0.25) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(220,80,60,0.25) 0%, transparent 70%)', zIndex: 2 }} />

        {/* Animated ECG / heartbeat SVG line */}
        <svg style={{ position: 'absolute', bottom: '30px', left: 0, right: 0, width: '100%', height: '70px', opacity: 0.18, zIndex: 3 }} viewBox="0 0 1200 70" preserveAspectRatio="none">
          <polyline
            points="0,35 160,35 180,32 200,35 220,35 240,10 260,60 280,35 300,35 320,38 340,35 360,35 380,32 400,35 420,35 440,10 460,60 480,35 500,35 520,38 540,35 560,35 580,32 600,35 620,35 640,10 660,60 680,35 700,35 720,38 740,35 760,35 780,32 800,35 820,35 840,10 860,60 880,35 900,35 920,38 940,35 960,35 980,32 1000,35 1020,35 1040,10 1060,60 1080,35 1100,35 1120,38 1140,35 1200,35"
            fill="none"
            stroke="rgba(255,200,180,0.9)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animateTransform attributeName="transform" type="translate" from="0 0" to="-240 0" dur="3s" repeatCount="indefinite" />
          </polyline>
        </svg>

        {/* Faint medical cross watermarks */}
        {[
          { top: '12%', left: '5%', size: 48, opacity: 0.07 },
          { top: '55%', left: '2%', size: 28, opacity: 0.05 },
          { top: '10%', right: '6%', size: 60, opacity: 0.07 },
          { top: '60%', right: '3%', size: 32, opacity: 0.05 },
          { top: '30%', left: '18%', size: 20, opacity: 0.04 },
          { top: '20%', right: '22%', size: 24, opacity: 0.04 },
          { top: '70%', left: '35%', size: 18, opacity: 0.04 },
          { top: '15%', left: '45%', size: 14, opacity: 0.05 },
        ].map((c, i) => (
          <svg key={i} style={{ position: 'absolute', top: c.top, left: c.left, right: c.right, width: c.size, height: c.size, opacity: c.opacity, zIndex: 3 }} viewBox="0 0 40 40">
            <rect x="14" y="0" width="12" height="40" rx="3" fill="white" />
            <rect x="0" y="14" width="40" height="12" rx="3" fill="white" />
          </svg>
        ))}

        {/* Soft curved corner shapes */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '320px', height: '320px', opacity: 0.07, zIndex: 3 }} viewBox="0 0 320 320">
          <circle cx="0" cy="0" r="260" fill="none" stroke="rgba(255,200,180,1)" strokeWidth="2" />
          <circle cx="0" cy="0" r="200" fill="none" stroke="rgba(255,200,180,1)" strokeWidth="1.5" />
        </svg>
        <svg style={{ position: 'absolute', bottom: 0, right: 0, width: '280px', height: '280px', opacity: 0.07, zIndex: 3 }} viewBox="0 0 280 280">
          <circle cx="280" cy="280" r="230" fill="none" stroke="rgba(255,200,180,1)" strokeWidth="2" />
          <circle cx="280" cy="280" r="170" fill="none" stroke="rgba(255,200,180,1)" strokeWidth="1.5" />
        </svg>

        {/* Floating glowing particles */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }} viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice">
          {[
            { cx: 120, cy: 80, r: 3 }, { cx: 340, cy: 50, r: 2 }, { cx: 560, cy: 100, r: 2.5 },
            { cx: 780, cy: 60, r: 3 }, { cx: 1000, cy: 90, r: 2 }, { cx: 1100, cy: 150, r: 2.5 },
            { cx: 200, cy: 340, r: 2 }, { cx: 450, cy: 360, r: 3 }, { cx: 680, cy: 370, r: 2 },
            { cx: 900, cy: 350, r: 2.5 }, { cx: 80, cy: 210, r: 2 }, { cx: 1050, cy: 280, r: 3 },
          ].map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="rgba(255,220,200,0.6)">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${p.cy};${p.cy - 8};${p.cy}`} dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>

        {/* Glassmorphism trust badge */}
        <div style={{
          position: 'absolute', top: '22px', right: '40px',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50px',
          padding: '8px 20px',
          display: 'flex', alignItems: 'center', gap: '8px',
          zIndex: 10,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#f0a070"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.75rem', letterSpacing: '0.08em', fontWeight: 600 }}>TRUSTED HEALTHCARE · MYSURU</span>
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', padding: '80px 20px 60px' }}>
          {/* Radial glow behind heading */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '500px', height: '260px',
            background: 'radial-gradient(ellipse, rgba(220,80,60,0.35) 0%, transparent 70%)',
            filter: 'blur(30px)', zIndex: 0, pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{
              display: 'inline-block',
              fontSize: '0.72rem', letterSpacing: '0.25em', fontWeight: 700,
              color: 'rgba(255,190,160,0.85)',
              textTransform: 'uppercase', marginBottom: '14px',
              padding: '5px 16px',
              border: '1px solid rgba(255,180,150,0.25)',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.06)',
            }}>{t('banner.default_badge')}</span>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 0 16px',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              textShadow: '0 2px 30px rgba(0,0,0,0.4)',
            }}>{t('nav.about')}</h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'rgba(255,255,255,0.82)',
              maxWidth: '580px',
              margin: '0 auto 28px',
              lineHeight: 1.7,
            }}>
              {t('banner.about.subtitle')}
            </p>

            {/* Stats row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
              {[
                { value: '20+', labelKey: 'stats_dept' },
                { value: '24/7', labelKey: 'stat_care' },
                { value: '10K+', labelKey: 'stat_satisfaction' },
              ].map((s, i) => (
                <div key={i} style={{
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  borderRadius: '14px',
                  padding: '12px 24px',
                  minWidth: '100px',
                }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f0a070', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em', marginTop: '4px', textTransform: 'uppercase' }}>{t(`banner.departments.${s.labelKey}`)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intro and Mission/Vision */}
      <section className="section-padding">
        <div className="container about-sections">
          <div className="about-intro-grid">
            <div className="about-intro-text">
              <span className="hero-subtitle" style={{ color: 'var(--primary-color)' }}>{t('nav.about')}</span>
              <h2>Maurya Hospital & Anagha Healthcare</h2><br />
              <p style={{ marginBottom: '8px' }}>
                {t('about.welcome_text_p1')}
              </p>
              <p>
                {t('about.welcome_text_p2')}
              </p>
            </div>
            <div>
              <img
                src={hospitalEmergencyEntrance}
                alt="Hospital Emergency Entrance"
                style={{ width: '100%', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-md)' }}
              />
            </div>
          </div>

          {/* Mission, Vision, and Commitment cards */}
          <div className="vision-mission-cards">
            <div className="vision-mission-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaBullseye style={{ color: 'var(--primary-color)' }} /> {t('about.mission_title')}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                {t('about.mission_desc')}
              </p>
            </div>
            <div className="vision-mission-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaEye style={{ color: 'var(--primary-color)' }} /> {t('about.vision_title')}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                {t('about.vision_desc')}
              </p>
            </div>
            <div className="vision-mission-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> {t('about.values_title')}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                {t('about.values_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Redesigned "Why Choose Us" Section */}
      <section className="why-choose-us-redesign section-padding">
        {/* Soft Background Accents */}
        <div className="wcu-bg-overlay" />
        <div className="wcu-radial-glow-1" />
        <div className="wcu-radial-glow-2" />

        {/* Floating blurred circles */}
        <div className="wcu-blur-circle wcu-circle-1" />
        <div className="wcu-blur-circle wcu-circle-2" />

        {/* Faint ECG SVG Line */}
        <svg className="wcu-ecg-line" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <polyline
            points="0,50 160,50 180,45 200,50 220,50 240,15 260,85 280,50 300,50 320,55 340,50 360,50 380,45 400,50 420,50 440,15 460,85 480,50 500,50 520,55 540,50 560,50 580,45 600,50 620,50 640,15 660,85 680,50 700,50 720,55 740,50 760,50 780,45 800,50 820,50 840,15 860,85 880,50 900,50 920,55 940,50 960,50 980,45 1000,50 1020,50 1040,15 1060,85 1080,50 1100,50 1120,55 1140,50 1200,50"
            fill="none"
            stroke="rgba(139,30,30,0.03)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Faint medical cross watermarks */}
        <div className="wcu-cross-container">
          {[
            { top: '10%', left: '8%', size: 40, opacity: 0.03 },
            { top: '75%', left: '4%', size: 30, opacity: 0.02 },
            { top: '20%', right: '10%', size: 50, opacity: 0.03 },
            { top: '80%', right: '6%', size: 35, opacity: 0.02 },
          ].map((c, i) => (
            <svg
              key={i}
              style={{
                position: 'absolute',
                top: c.top,
                left: c.left,
                right: c.right,
                width: c.size,
                height: c.size,
                opacity: c.opacity,
                pointerEvents: 'none'
              }}
              viewBox="0 0 40 40"
            >
              <rect x="15" y="0" width="10" height="40" rx="2" fill="var(--primary-color)" />
              <rect x="0" y="15" width="40" height="10" rx="2" fill="var(--primary-color)" />
            </svg>
          ))}
        </div>

        <div className="container wcu-redesign-container">
          {/* Premium Statistics Row */}
          <div className="wcu-stats-row">
            <StatCounter value="25+" label={i18n.language.startsWith('kn') ? "ಉತ್ಕೃಷ್ಟ ಸೇವಾ ವರ್ಷಗಳು" : "Years of Excellence"} />
            <StatCounter value="50+" label={t('banner.doctors.stat_docs')} />
            <StatCounter value="100K+" label={t('home.stats.served_label')} />
            <StatCounter value="24×7" label={t('home.services.emergency_title')} />
          </div>
        </div>

        <style>{`
          /* Why Choose Us Redesign Section */
          .why-choose-us-redesign {
            position: relative;
            background: linear-gradient(180deg, #ffffff 0%, #f6fbff 100%);
            overflow: hidden;
            padding: 40px 0;
            border-top: 1px solid var(--border-color);
            border-bottom: 1px solid var(--border-color);
          }

          /* Ambient background glow elements */
          .wcu-bg-overlay {
            position: absolute;
            inset: 0;
            background-color: rgba(250, 248, 246, 0.2);
            pointer-events: none;
            z-index: 1;
          }

          .wcu-radial-glow-1 {
            position: absolute;
            top: -200px;
            left: -200px;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(30, 144, 255, 0.04) 0%, transparent 70%);
            pointer-events: none;
            z-index: 1;
          }

          .wcu-radial-glow-2 {
            position: absolute;
            bottom: -200px;
            right: -200px;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(139, 30, 30, 0.03) 0%, transparent 70%);
            pointer-events: none;
            z-index: 1;
          }

          .wcu-blur-circle {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            pointer-events: none;
            z-index: 1;
            opacity: 0.5;
          }

          .wcu-circle-1 {
            top: 20%;
            right: 5%;
            width: 250px;
            height: 250px;
            background: rgba(30, 144, 255, 0.06);
          }

          .wcu-circle-2 {
            bottom: 10%;
            left: 5%;
            width: 300px;
            height: 300px;
            background: rgba(139, 30, 30, 0.04);
          }

          .wcu-ecg-line {
            position: absolute;
            bottom: 180px;
            left: 0;
            right: 0;
            width: 100%;
            height: 100px;
            pointer-events: none;
            z-index: 1;
            opacity: 0.35;
          }

          .wcu-cross-container {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
          }

          /* Split-screen Grid */
          .wcu-redesign-container {
            position: relative;
            z-index: 2;
          }

          .wcu-redesign-grid {
            display: grid;
            grid-template-columns: 4.8fr 7.2fr;
            gap: 60px;
            align-items: flex-start;
            margin-bottom: 60px;
          }

          /* Left Side: Elegant Hospital Image */
          .wcu-left-image-pane {
            position: sticky;
            top: 100px;
          }

          .wcu-image-wrapper {
            position: relative;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(30, 100, 180, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.8);
            aspect-ratio: 4 / 5;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .wcu-hospital-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
          }

          .wcu-image-wrapper:hover .wcu-hospital-img {
            transform: scale(1.06);
          }

          .wcu-blue-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(30, 144, 255, 0.15) 0%, rgba(139, 30, 30, 0.3) 100%);
            mix-blend-mode: multiply;
            pointer-events: none;
          }

          /* Floating medical icons style */
          .wcu-floating-icon {
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-color);
            font-size: 1.25rem;
            z-index: 10;
            pointer-events: none;
          }

          .icon-1 {
            top: 15%;
            left: -20px;
            animation: floatSlow1 5s ease-in-out infinite;
          }

          .icon-2 {
            bottom: 25%;
            right: -20px;
            animation: floatSlow2 6s ease-in-out infinite 0.5s;
          }

          .icon-3 {
            bottom: 12%;
            left: 20%;
            animation: floatSlow3 5.5s ease-in-out infinite 1s;
          }

          /* Floating cross outlines */
          .wcu-floating-cross {
            position: absolute;
            font-size: 2.2rem;
            color: rgba(255, 255, 255, 0.25);
            font-weight: 300;
            z-index: 5;
            pointer-events: none;
          }

          .cross-1 {
            top: 20%;
            right: 15%;
            animation: floatSlow3 7s ease-in-out infinite;
          }

          .cross-2 {
            bottom: 40%;
            left: 10%;
            animation: floatSlow1 8s ease-in-out infinite 0.3s;
          }

          /* Floating animations */
          @keyframes floatSlow1 {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(3deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }

          @keyframes floatSlow2 {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-18px) rotate(-4deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }

          @keyframes floatSlow3 {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }

          /* Right Content Pane Styling */
          .wcu-right-content-pane {
            display: flex;
            flex-direction: column;
            gap: 40px;
            position: relative;
            z-index: 5;
          }

          .wcu-text-header {
            text-align: left;
          }

          .wcu-heading {
            font-size: clamp(2.2rem, 4vw, 3rem);
            font-weight: 800;
            color: var(--secondary-color);
            margin: 10px 0 16px;
            line-height: 1.15;
            animation: fadeInUp 0.6s ease forwards;
          }

          .highlight-red {
            color: var(--primary-color);
          }

          .wcu-heading-underline {
            height: 4px;
            width: 0;
            background: var(--primary-color);
            border-radius: 2px;
            margin-bottom: 24px;
            animation: expandUnderline 0.8s ease 0.3s forwards;
          }

          @keyframes expandUnderline {
            from { width: 0; }
            to { width: 90px; }
          }

          .wcu-description {
            font-size: 1.05rem;
            color: var(--text-muted);
            line-height: 1.8;
            margin-bottom: 30px;
            animation: slideInLeft 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
          }

          /* Premium CTA Button */
          .wcu-learn-more-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 14px 36px;
            background: var(--primary-color);
            color: #ffffff;
            border-radius: 30px;
            font-weight: 700;
            font-size: 1rem;
            text-decoration: none;
            box-shadow: 0 4px 15px rgba(139, 30, 30, 0.15);
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            overflow: hidden;
            cursor: pointer;
            z-index: 10;
          }

          .wcu-learn-more-btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: rgba(255, 255, 255, 0.25);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            pointer-events: none;
          }

          .wcu-learn-more-btn:active::before {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
            transition: transform 0.5s ease-out, opacity 0.5s ease-out;
          }

          .wcu-learn-more-btn:hover {
            background: var(--secondary-color);
            transform: scale(1.05);
            box-shadow: 0 8px 25px rgba(139, 30, 30, 0.3);
          }

          .wcu-learn-more-btn .arrow-icon {
            font-size: 0.85rem;
            transition: transform 0.3s ease;
          }

          .wcu-learn-more-btn:hover .arrow-icon {
            transform: translateX(5px);
          }

          /* Right Content: Premium glass feature cards grid */
          .wcu-feature-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .wcu-feature-card {
            background: rgba(255, 255, 255, 0.45);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.65);
            border-radius: 24px;
            padding: 28px;
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
          }

          .wcu-feature-card:hover {
            transform: translateY(-8px);
            border-color: var(--primary-color);
            box-shadow: 0 15px 35px rgba(139, 30, 30, 0.06), 0 0 15px rgba(139, 30, 30, 0.05);
            background: rgba(255, 255, 255, 0.75);
          }

          .wcu-card-icon-wrapper {
            width: 54px;
            height: 54px;
            border-radius: 12px;
            border: 2px solid rgba(139, 30, 30, 0.15);
            color: var(--primary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 20px;
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            background: #fffdfb;
          }

          .wcu-feature-card:hover .wcu-card-icon-wrapper {
            background: var(--primary-color);
            color: #ffffff;
            border-color: var(--primary-color);
            transform: rotate(8deg);
          }

          .wcu-card-title {
            font-size: 1.15rem;
            font-weight: 700;
            color: var(--secondary-color);
            margin: 0 0 8px 0;
          }

          .wcu-card-desc {
            font-size: 0.9rem;
            color: var(--text-muted);
            line-height: 1.6;
            margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          /* Premium Statistics Row */
          .wcu-stats-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
            background: var(--primary-color);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 24px;
            padding: 35px 20px;
            box-shadow: 0 12px 40px rgba(158, 42, 34, 0.2);
            position: relative;
            z-index: 2;
            text-align: center;
          }

          .stat-counter-box {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .stat-counter-number {
            font-size: 2.5rem;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.1;
            margin-bottom: 6px;
          }

          .stat-counter-label {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.95);
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          /* Keyframe animations */
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Responsive Breakpoints */
          @media (max-width: 1024px) {
            .wcu-redesign-grid {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            .wcu-left-image-pane {
              position: static;
              max-width: 480px;
              margin: 0 auto;
            }
            .wcu-image-wrapper {
              aspect-ratio: 16 / 10;
            }
          }

          @media (max-width: 768px) {
            .wcu-feature-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
            .wcu-stats-row {
              grid-template-columns: repeat(2, 1fr);
              gap: 24px;
            }
            .why-choose-us-redesign {
              padding: 80px 0;
            }
          }

          @media (max-width: 480px) {
            .wcu-stats-row {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </section>

      {/* Redesigned Around-the-Clock Clinical Support Section */}
      <section className={`around-clock-support section-padding ${acsVisible ? 'animated-in' : ''}`} ref={acsRef}>
        {/* Ambient background medical details */}
        <div className="acs-bg-pattern" />
        <div className="acs-radial-glow" />
        
        {/* Floating medical crosses */}
        <div className="acs-cross-container">
          {[
            { top: '15%', left: '5%', size: 30, opacity: 0.025 },
            { top: '70%', right: '8%', size: 40, opacity: 0.02 },
          ].map((c, i) => (
            <svg
              key={i}
              style={{
                position: 'absolute',
                top: c.top,
                left: c.left,
                right: c.right,
                width: c.size,
                height: c.size,
                opacity: c.opacity,
                pointerEvents: 'none'
              }}
              viewBox="0 0 40 40"
            >
              <rect x="15" y="0" width="10" height="40" rx="2" fill="var(--primary-color)" />
              <rect x="0" y="15" width="40" height="10" rx="2" fill="var(--primary-color)" />
            </svg>
          ))}
        </div>

        <div className="container acs-container">
          
          {/* Header Row */}
          <div className="acs-header-row">
            <div className="acs-badge">
              <span className="acs-badge-num">24/7</span>
              <span className="acs-badge-label">Services</span>
            </div>
            <div className="acs-header-text">
              <h2 className="acs-heading">Around-the-Clock Clinical Support</h2>
              <p className="acs-subheading">Uninterrupted medical care and immediate diagnostics response available day & night.</p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="acs-cards-grid">
            {isMobile ? (
              // Mobile view: show cards and expand inline when clicked
              [
                {
                  icon: <FaHeartbeat />,
                  title: 'Emergency Services',
                  desc: 'Trauma & Critical Care',
                  details: 'Our emergency department is staffed 24/7 by trauma specialists, emergency physicians, and nursing teams. Equipped with advanced resuscitation bays, cardiac monitors, and direct fast-track pathways to the operating theatre and ICU.',
                  badges: ['24/7 Trauma Care', 'Emergency Resuscitation', 'Critical Stabilization', 'Ambulance Coordination'],
                  color: '#9E2A22'
                },
                {
                  icon: <FaHospitalAlt />,
                  title: 'ICU Facility',
                  desc: '24/7 High-Dependency Unit',
                  details: 'A state-of-the-art Intensive Care Unit designed for patients requiring continuous life support, close monitoring, and invasive therapeutic interventions. Features high-ratio specialist nursing and absolute infection control protocols.',
                  badges: ['Bedside Ventilators', '1:1 / 1:2 Nursing Care', 'Isolation Chambers', 'Continuous Vital Monitoring'],
                  color: '#9E2A22'
                },
                {
                  icon: <FaFlask />,
                  title: 'Laboratory Services',
                  desc: 'Pathology & Blood Diagnostics',
                  details: 'Fully automated diagnostic pathology and biochemistry laboratories operating round-the-clock. Delivering rapid and precise hematology, biochemistry, and microbiology reports essential for emergency care.',
                  badges: ['Fully Automated Assays', 'Rapid Turnaround Reports', 'Hematology & Biochemistry', 'Pathology Consultations'],
                  color: '#9E2A22'
                },
                {
                  icon: <FaPills />,
                  title: 'Pharmacy Services',
                  desc: 'Fully-Stocked In-house Meds',
                  details: 'In-house hospital pharmacy operating 24 hours a day to cater to inpatient, outpatient, and emergency pharmaceutical demands. Fully stocked with high-grade emergency medicines, surgical consumables, and critical therapeutics.',
                  badges: ['24/7 Open Counter', 'Emergency Formulations', 'Surgical Consumables', 'Verified Cold Chains'],
                  color: '#9E2A22'
                },
                {
                  icon: <FaRadiation />,
                  title: 'Radiology (X-ray & Ultrasound)',
                  desc: 'Ultra-fast Imaging Scan',
                  details: 'Comprehensive diagnostic imaging capabilities containing high-resolution digital X-rays, portable radiography, and emergency ultrasound scans. Ensuring prompt cross-sectional visualization to support clinical decision-making.',
                  badges: ['Digital Radiography', 'Color Doppler Ultrasound', 'Low Dose Exposure', 'Prompt Radiologist Reporting'],
                  color: '#9E2A22'
                }
              ].map((card, idx) => {
                const isActive = activeService === idx;
                return (
                  <div key={idx} style={{ width: '100%', marginBottom: '15px' }}>
                    <div
                      className={`acs-card ${isActive ? 'active-featured-card' : ''}`}
                      onClick={() => setActiveService(isActive ? null : idx)}
                      style={{
                        cursor: 'pointer',
                        opacity: 1,
                        transform: 'none',
                        width: '100%',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div className="acs-card-inner" style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'flex-start', 
                        alignItems: 'center', 
                        textAlign: 'left', 
                        padding: '16px 20px',
                        gap: '15px' 
                      }}>
                        <div className="acs-card-icon-wrapper" style={{ 
                          color: card.color, 
                          borderColor: `${card.color}25`, 
                          marginBottom: 0,
                          width: '45px',
                          height: '45px',
                          fontSize: '1.2rem',
                          borderRadius: '12px'
                        }}>
                          {card.icon}
                        </div>
                        <div className="acs-card-content" style={{ 
                          flexDirection: 'row', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          flexGrow: 1
                        }}>
                          <div style={{ textAlign: 'left' }}>
                            <h3 className="acs-card-title" style={{ 
                              fontSize: '1.05rem', 
                              minHeight: 0, 
                              marginBottom: '2px',
                              justifyContent: 'flex-start'
                            }}>{card.title}</h3>
                            <p className="acs-card-desc" style={{ fontSize: '0.85rem' }}>{card.desc}</p>
                          </div>
                          <span style={{ 
                            fontSize: '1.2rem', 
                            color: isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                            marginLeft: '10px',
                            fontWeight: 'bold',
                            transition: 'transform 0.3s',
                            transform: isActive ? 'rotate(90deg)' : 'none'
                          }}>
                            {isActive ? '−' : '+'}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <div className="acs-expanded-info-box" style={{ 
                        marginTop: '10px', 
                        marginBottom: '15px', 
                        padding: '20px 24px',
                        borderRadius: '20px'
                      }}>
                        <h4 className="acs-expanded-detail-title" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{card.title} Overview</h4>
                        <p className="acs-expanded-detail-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '15px' }}>{card.details}</p>
                        <div className="acs-expanded-badges">
                          {card.badges.map((badge, bIdx) => (
                            <span key={bIdx} className="acs-expanded-badge-item" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              activeService === null ? (
                // Default grid view
                [
                  {
                    icon: <FaHeartbeat />,
                    title: 'Emergency Services',
                    desc: 'Trauma & Critical Care',
                    details: 'Our emergency department is staffed 24/7 by trauma specialists, emergency physicians, and nursing teams. Equipped with advanced resuscitation bays, cardiac monitors, and direct fast-track pathways to the operating theatre and ICU.',
                    badges: ['24/7 Trauma Care', 'Emergency Resuscitation', 'Critical Stabilization', 'Ambulance Coordination'],
                    color: '#9E2A22'
                  },
                  {
                    icon: <FaHospitalAlt />,
                    title: 'ICU Facility',
                    desc: '24/7 High-Dependency Unit',
                    details: 'A state-of-the-art Intensive Care Unit designed for patients requiring continuous life support, close monitoring, and invasive therapeutic interventions. Features high-ratio specialist nursing and absolute infection control protocols.',
                    badges: ['Bedside Ventilators', '1:1 / 1:2 Nursing Care', 'Isolation Chambers', 'Continuous Vital Monitoring'],
                    color: '#9E2A22'
                  },
                  {
                    icon: <FaFlask />,
                    title: 'Laboratory Services',
                    desc: 'Pathology & Blood Diagnostics',
                    details: 'Fully automated diagnostic pathology and biochemistry laboratories operating round-the-clock. Delivering rapid and precise hematology, biochemistry, and microbiology reports essential for emergency care.',
                    badges: ['Fully Automated Assays', 'Rapid Turnaround Reports', 'Hematology & Biochemistry', 'Pathology Consultations'],
                    color: '#9E2A22'
                  },
                  {
                    icon: <FaPills />,
                    title: 'Pharmacy Services',
                    desc: 'Fully-Stocked In-house Meds',
                    details: 'In-house hospital pharmacy operating 24 hours a day to cater to inpatient, outpatient, and emergency pharmaceutical demands. Fully stocked with high-grade emergency medicines, surgical consumables, and critical therapeutics.',
                    badges: ['24/7 Open Counter', 'Emergency Formulations', 'Surgical Consumables', 'Verified Cold Chains'],
                    color: '#9E2A22'
                  },
                  {
                    icon: <FaRadiation />,
                    title: 'Radiology (X-ray & Ultrasound)',
                    desc: 'Ultra-fast Imaging Scan',
                    details: 'Comprehensive diagnostic imaging capabilities containing high-resolution digital X-rays, portable radiography, and emergency ultrasound scans. Ensuring prompt cross-sectional visualization to support clinical decision-making.',
                    badges: ['Digital Radiography', 'Color Doppler Ultrasound', 'Low Dose Exposure', 'Prompt Radiologist Reporting'],
                    color: '#9E2A22'
                  }
                ].map((card, idx) => (
                  <div
                    key={idx}
                    className="acs-card"
                    onClick={() => setActiveService(idx)}
                    style={{
                      transitionDelay: `${idx * 100}ms`,
                      cursor: 'pointer'
                    }}
                  >
                    <div className="acs-card-inner">
                      <div className="acs-card-icon-wrapper" style={{ color: card.color, borderColor: `${card.color}25` }}>
                        {card.icon}
                      </div>
                      <div className="acs-card-content">
                        <h3 className="acs-card-title">{card.title}</h3>
                        <p className="acs-card-desc">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Expanded accordion view
                (() => {
                  const list = [
                    {
                      icon: <FaHeartbeat />,
                      title: 'Emergency Services',
                      desc: 'Trauma & Critical Care',
                      details: 'Our emergency department is staffed 24/7 by trauma specialists, emergency physicians, and nursing teams. Equipped with advanced resuscitation bays, cardiac monitors, and direct fast-track pathways to the operating theatre and ICU.',
                      badges: ['24/7 Trauma Care', 'Emergency Resuscitation', 'Critical Stabilization', 'Ambulance Coordination'],
                      color: '#9E2A22'
                    },
                    {
                      icon: <FaHospitalAlt />,
                      title: 'ICU Facility',
                      desc: '24/7 High-Dependency Unit',
                      details: 'A state-of-the-art Intensive Care Unit designed for patients requiring continuous life support, close monitoring, and invasive therapeutic interventions. Features high-ratio specialist nursing and absolute infection control protocols.',
                      badges: ['Bedside Ventilators', '1:1 / 1:2 Nursing Care', 'Isolation Chambers', 'Continuous Vital Monitoring'],
                      color: '#9E2A22'
                    },
                    {
                      icon: <FaFlask />,
                      title: 'Laboratory Services',
                      desc: 'Pathology & Blood Diagnostics',
                      details: 'Fully automated diagnostic pathology and biochemistry laboratories operating round-the-clock. Delivering rapid and precise hematology, biochemistry, and microbiology reports essential for emergency care.',
                      badges: ['Fully Automated Assays', 'Rapid Turnaround Reports', 'Hematology & Biochemistry', 'Pathology Consultations'],
                      color: '#9E2A22'
                    },
                    {
                      icon: <FaPills />,
                      title: 'Pharmacy Services',
                      desc: 'Fully-Stocked In-house Meds',
                      details: 'In-house hospital pharmacy operating 24 hours a day to cater to inpatient, outpatient, and emergency pharmaceutical demands. Fully stocked with high-grade emergency medicines, surgical consumables, and critical therapeutics.',
                      badges: ['24/7 Open Counter', 'Emergency Formulations', 'Surgical Consumables', 'Verified Cold Chains'],
                      color: '#9E2A22'
                    },
                    {
                      icon: <FaRadiation />,
                      title: 'Radiology (X-ray & Ultrasound)',
                      desc: 'Ultra-fast Imaging Scan',
                      details: 'Comprehensive diagnostic imaging capabilities containing high-resolution digital X-rays, portable radiography, and emergency ultrasound scans. Ensuring prompt cross-sectional visualization to support clinical decision-making.',
                      badges: ['Digital Radiography', 'Color Doppler Ultrasound', 'Low Dose Exposure', 'Prompt Radiologist Reporting'],
                      color: '#9E2A22'
                    }
                  ];
                  const active = list[activeService];
                  return (
                    <div style={{ width: '100%' }}>
                      {/* Active Featured Card Header */}
                      <div
                        className="acs-card active-featured-card"
                        onClick={() => setActiveService(null)}
                        style={{ cursor: 'pointer', opacity: 1, transform: 'none' }}
                      >
                        <div className="acs-card-inner">
                          <div className="acs-card-icon-wrapper" style={{ color: active.color, borderColor: `${active.color}25` }}>
                            {active.icon}
                          </div>
                          <div className="acs-card-content">
                            <h3 className="acs-card-title">{active.title}</h3>
                            <p className="acs-card-desc">{active.desc}</p>
                          </div>
                        </div>
                      </div>

                      {/* Accordion Detail Panel */}
                      <div className="acs-expanded-info-box">
                        <h4 className="acs-expanded-detail-title">{active.title} Overview</h4>
                        <p className="acs-expanded-detail-text">{active.details}</p>
                        <div className="acs-expanded-badges">
                          {active.badges.map((badge, bIdx) => (
                            <span key={bIdx} className="acs-expanded-badge-item">
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Grid of other choices */}
                      <h4 className="acs-other-heading">Explore Other 24/7 Support Services</h4>
                      <div className="acs-cards-grid">
                        {list.map((item, idx) => {
                          if (idx === activeService) return null;
                          return (
                            <div
                              key={idx}
                              className="acs-card"
                              onClick={() => setActiveService(idx)}
                              style={{ cursor: 'pointer', opacity: 1, transform: 'none' }}
                            >
                              <div className="acs-card-inner">
                                <div className="acs-card-icon-wrapper" style={{ color: item.color, borderColor: `${item.color}25` }}>
                                  {item.icon}
                                </div>
                                <div className="acs-card-content">
                                  <h3 className="acs-card-title">{item.title}</h3>
                                  <p className="acs-card-desc">{item.desc}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()
              )
            )}
          </div>

        </div>

        <style>{`
          /* Repositioned and Redesigned 24/7 Services section */
          .around-clock-support {
            position: relative;
            background-color: #faf9f7; /* Very soft warm light gray */
            padding: 90px 0;
            overflow: hidden;
            margin-top: 50px; /* 40-60px margin immediately below Why Choose Us */
            border-top: 1px solid var(--border-color);
            border-bottom: 1px solid var(--border-color);
          }

          .acs-bg-pattern {
            position: absolute;
            inset: 0;
            opacity: 0.015;
            background-image: radial-gradient(var(--primary-color) 1.5px, transparent 1.5px);
            background-size: 24px 24px;
            pointer-events: none;
            z-index: 1;
          }

          .acs-radial-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(139, 30, 30, 0.015) 0%, transparent 70%);
            pointer-events: none;
            z-index: 1;
          }

          .acs-cross-container {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
          }

          .acs-container {
            position: relative;
            z-index: 2;
          }

          /* Header Styling */
          .acs-header-row {
            display: flex;
            gap: 24px;
            align-items: center;
            margin-bottom: 50px;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
          }

          .around-clock-support.animated-in .acs-header-row {
            opacity: 1;
            transform: translateY(0);
          }

          .acs-badge {
            background: linear-gradient(135deg, #e6b325 0%, #9E2A22 100%);
            color: #ffffff;
            padding: 18px 22px;
            border-radius: 20px;
            box-shadow: 0 8px 20px rgba(158, 42, 34, 0.15);
            line-height: 1.1;
            text-align: center;
            min-width: 110px;
            flex-shrink: 0;
          }

          .acs-badge-num {
            display: block;
            font-size: 2rem;
            font-weight: 800;
          }

          .acs-badge-label {
            display: block;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            margin-top: 4px;
            text-transform: uppercase;
          }

          .acs-heading {
            font-size: clamp(1.8rem, 3vw, 2.4rem);
            font-weight: 800;
            color: var(--secondary-color);
            margin: 0 0 6px 0;
          }

          .acs-subheading {
            font-size: 1.05rem;
            color: var(--text-muted);
            margin: 0;
          }

          /* Cards Flex Grid styling */
          .acs-cards-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 24px;
          }

          .acs-card {
            position: relative;
            overflow: hidden;
            border-radius: 24px;
            padding: 2px; /* border thickness */
            text-decoration: none;
            width: calc(33.333% - 16px);
            min-width: 290px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.02);
            opacity: 0;
            transform: translateY(30px);
            display: flex;
            transition: opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), 
                        transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), 
                        box-shadow 0.3s ease;
          }

          .acs-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(
              transparent, 
              var(--primary-color), 
              transparent 30%
            );
            animation: rotateBorder 4s linear infinite;
            z-index: 1;
          }

          @keyframes rotateBorder {
            100% {
              transform: rotate(360deg);
            }
          }

          .acs-card-inner {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 22px;
            padding: 28px 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            text-align: center;
            width: 100%;
            height: 100%;
            z-index: 2;
            transition: background 0.3s ease;
          }

          .around-clock-support.animated-in .acs-card {
            opacity: 1;
            transform: translateY(0);
          }

          .acs-card:hover {
            transform: translateY(-8px); /* Matches translateY of other cards */
            box-shadow: 0 15px 35px rgba(158, 42, 34, 0.15);
          }

          .acs-card:hover .acs-card-inner {
            background: #ffffff;
          }

          .acs-card:hover::before {
            animation: rotateBorder 2s linear infinite; /* Faster rotation on hover */
          }

          /* Left Medical Icon Styling */
          .acs-card-icon-wrapper {
            width: 58px;
            height: 58px;
            border-radius: 16px;
            border: 2px solid;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.6rem;
            flex-shrink: 0;
            background: #fff;
            margin-bottom: 16px; /* Spacing between icon and title */
            transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          }

          .acs-card:hover .acs-card-icon-wrapper {
            transform: scale(1.1);
          }

          .acs-card-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
            justify-content: space-between;
            width: 100%;
          }

          .acs-card-title {
            font-size: 1.25rem;
            font-weight: 750;
            color: var(--secondary-color);
            margin: 0 0 8px 0;
            min-height: 48px; /* Fixed height to align title text positioning */
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.3s ease;
            width: 100%;
          }

          .acs-card:hover .acs-card-title {
            color: var(--primary-color);
          }

          .acs-card-desc {
            font-size: 0.95rem;
            color: var(--text-muted);
            line-height: 1.5;
            margin: 0;
            width: 100%;
          }

          /* Responsive breakpoints */
          @media (max-width: 1140px) {
            .acs-card {
              width: calc(50% - 12px);
            }
          }

          @media (max-width: 768px) {
            .acs-header-row {
              flex-direction: column;
              text-align: center;
              gap: 16px;
            }
            .acs-card {
              width: 100%;
              min-width: 0;
            }
            .around-clock-support {
              padding: 60px 0;
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* ── Accordion Specific Styles ── */
          .active-featured-card {
            width: 100% !important;
            margin-bottom: 0;
            border: 2px solid var(--primary-color) !important;
            animation: acsExpandSlide 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          }
          
          .active-featured-card .acs-card-inner {
            flex-direction: row !important;
            justify-content: flex-start !important;
            align-items: center !important;
            text-align: left !important;
            padding: 22px 30px !important;
            gap: 24px;
          }

          .active-featured-card .acs-card-icon-wrapper {
            margin-bottom: 0 !important;
          }

          .active-featured-card .acs-card-content {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
          }

          .active-featured-card .acs-card-title {
            min-height: 0 !important;
            width: auto !important;
            justify-content: flex-start !important;
            margin-bottom: 0 !important;
            font-size: 1.35rem !important;
          }

          .active-featured-card .acs-card-desc {
            width: auto !important;
            text-align: right !important;
          }

          .acs-expanded-info-box {
            background: #f1f8fc; /* Light blue panel matching user reference */
            border: 2px solid #e1eef6;
            border-radius: 24px;
            padding: 32px 36px;
            margin: 20px 0 36px;
            animation: acsExpandSlide 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            z-index: 10;
            text-align: left;
          }

          @keyframes acsExpandSlide {
            from { opacity: 0; transform: translateY(-12px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .acs-expanded-detail-title {
            font-size: 1.35rem;
            color: var(--secondary-color);
            font-weight: 750;
            margin: 0 0 12px 0;
          }

          .acs-expanded-detail-text {
            font-size: 1.02rem;
            color: #444;
            line-height: 1.7;
            margin: 0 0 24px 0;
          }

          .acs-expanded-badges {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }

          .acs-expanded-badge-item {
            background: #ffffff;
            color: var(--primary-color);
            border: 1px solid #d0e5f2;
            padding: 8px 18px;
            border-radius: 20px;
            font-size: 0.88rem;
            font-weight: 600;
            box-shadow: 0 2px 6px rgba(0,0,0,0.02);
            transition: all 0.2s ease;
          }

          .acs-expanded-badge-item:hover {
            transform: translateY(-2px);
            background: var(--primary-color);
            color: #ffffff;
            border-color: var(--primary-color);
          }

          .acs-other-heading {
            font-size: 1.15rem;
            font-weight: 750;
            color: var(--secondary-color);
            margin: 40px 0 20px 0;
            text-align: center;
            letter-spacing: 0.03em;
            text-transform: uppercase;
          }

          /* Mobile Responsiveness for Clinical Support Accordion and Badges */
          @media (max-width: 768px) {
            .active-featured-card .acs-card-inner {
              flex-direction: column !important;
              align-items: center !important;
              text-align: center !important;
              padding: 24px 20px !important;
              gap: 15px !important;
            }
            .active-featured-card .acs-card-content {
              flex-direction: column !important;
              align-items: center !important;
              justify-content: center !important;
              gap: 10px !important;
            }
            .active-featured-card .acs-card-title {
              justify-content: center !important;
            }
            .active-featured-card .acs-card-desc {
              text-align: center !important;
              width: 100% !important;
            }
            .acs-expanded-info-box {
              padding: 24px 20px !important;
              border-radius: 16px !important;
              margin: 15px 0 25px !important;
            }
            .acs-expanded-detail-title {
              font-size: 1.2rem !important;
            }
            .acs-expanded-detail-text {
              font-size: 0.95rem !important;
              margin-bottom: 16px !important;
            }
            .acs-expanded-badge-item {
              padding: 6px 12px !important;
              font-size: 0.8rem !important;
            }
          }
        `}</style>
      </section>

      {/* Infrastructure details */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-header">
            <h2>{t('about.infra_title')}</h2>
            <p>{t('about.infra_desc')}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div className="hospital-card" style={{ padding: '30px', textAlign: 'center' }}>
              <div className="service-icon"><FaHospitalAlt /></div>
              <h3>{t('about.infra_p1_title')}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {t('about.infra_p1_desc')}
              </p>
            </div>
            <div className="hospital-card" style={{ padding: '30px', textAlign: 'center' }}>
              <div className="service-icon"><FaLayerGroup /></div>
              <h3>{t('about.infra_p2_title')}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {t('about.infra_p2_desc')}
              </p>
            </div>
            <div className="hospital-card" style={{ padding: '30px', textAlign: 'center' }}>
              <div className="service-icon"><FaAward /></div>
              <h3>{t('about.infra_p3_title')}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {t('about.infra_p3_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Management Profile */}
      <section className="section-padding">
        <div className="container">
          <div className="wcu-layout" style={{ alignItems: 'center' }}>
            <div>
              <span className="hero-subtitle" style={{ color: 'var(--primary-color)' }}>{t('about.leadership.eyebrow')}</span>
              <h2>{t('about.leadership.title')}</h2><br />
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.7' }}>
                {t('about.leadership.p1')}
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.7' }}>
                {t('about.leadership.p2')}
              </p>
            </div>
            <div className="wcu-image">
              <img
                src={hospitalEntrance}
                alt="Maurya Hospital Main Entrance"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
