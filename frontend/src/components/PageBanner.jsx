import React from 'react';

/**
 * PageBanner – Premium reusable hero banner for inner pages.
 * Props:
 *   title        {string}   – Main heading (supports JSX)
 *   subtitle     {string}   – Paragraph below the heading
 *   eyebrow      {string}   – Small pill tag above the heading
 *   badge        {string}   – Top-right glassmorphism badge text
 *   stats        {Array}    – [{value, label}, ...] — max 3 items
 */
const PageBanner = ({ title, subtitle, eyebrow, badge = 'TRUSTED HEALTHCARE · MYSURU', stats = [] }) => {
  const crosses = [
    { top: '12%', left: '5%',  size: 48, opacity: 0.07 },
    { top: '55%', left: '2%',  size: 28, opacity: 0.05 },
    { top: '10%', right: '6%', size: 60, opacity: 0.07 },
    { top: '60%', right: '3%', size: 32, opacity: 0.05 },
    { top: '30%', left: '18%', size: 20, opacity: 0.04 },
    { top: '20%', right: '22%',size: 24, opacity: 0.04 },
    { top: '70%', left: '35%', size: 18, opacity: 0.04 },
    { top: '15%', left: '45%', size: 14, opacity: 0.05 },
  ];

  const particles = [
    { cx: 120,  cy: 80,  r: 3   }, { cx: 340,  cy: 50,  r: 2   },
    { cx: 560,  cy: 100, r: 2.5 }, { cx: 780,  cy: 60,  r: 3   },
    { cx: 1000, cy: 90,  r: 2   }, { cx: 1100, cy: 150, r: 2.5 },
    { cx: 200,  cy: 340, r: 2   }, { cx: 450,  cy: 360, r: 3   },
    { cx: 680,  cy: 370, r: 2   }, { cx: 900,  cy: 350, r: 2.5 },
    { cx: 80,   cy: 210, r: 2   }, { cx: 1050, cy: 280, r: 3   },
  ];

  return (
    <section style={{
      position: 'relative',
      minHeight: '420px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 60%, #c0392b 0%, #922b21 35%, #7a1f1f 65%, #4a0f0f 100%)',
    }}>
      {/* Layered depth overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.35) 0%, transparent 50%, rgba(0,0,0,0.25) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(220,80,60,0.25) 0%, transparent 70%)', zIndex: 2 }} />

      {/* Animated ECG line */}
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

      {/* Medical cross watermarks */}
      {crosses.map((c, i) => (
        <svg key={i} style={{ position: 'absolute', top: c.top, left: c.left, right: c.right, width: c.size, height: c.size, opacity: c.opacity, zIndex: 3 }} viewBox="0 0 40 40">
          <rect x="14" y="0"  width="12" height="40" rx="3" fill="white" />
          <rect x="0"  y="14" width="40" height="12" rx="3" fill="white" />
        </svg>
      ))}

      {/* Corner arc shapes */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '320px', height: '320px', opacity: 0.07, zIndex: 3 }} viewBox="0 0 320 320">
        <circle cx="0"   cy="0"   r="260" fill="none" stroke="rgba(255,200,180,1)" strokeWidth="2"   />
        <circle cx="0"   cy="0"   r="200" fill="none" stroke="rgba(255,200,180,1)" strokeWidth="1.5" />
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, right: 0, width: '280px', height: '280px', opacity: 0.07, zIndex: 3 }} viewBox="0 0 280 280">
        <circle cx="280" cy="280" r="230" fill="none" stroke="rgba(255,200,180,1)" strokeWidth="2"   />
        <circle cx="280" cy="280" r="170" fill="none" stroke="rgba(255,200,180,1)" strokeWidth="1.5" />
      </svg>

      {/* Floating particles */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }} viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice">
        {particles.map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="rgba(255,220,200,0.6)">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${p.cy};${p.cy - 8};${p.cy}`} dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      {/* Glassmorphism trust badge */}
      <div className="page-banner-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f0a070">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <span className="page-banner-badge-text">{badge}</span>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '80px 20px 60px' }}>
        {/* Radial glow behind heading */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '500px', height: '260px',
          background: 'radial-gradient(ellipse, rgba(220,80,60,0.35) 0%, transparent 70%)',
          filter: 'blur(30px)', zIndex: 0, pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
          {eyebrow && (
            <span style={{
              display: 'inline-block',
              fontSize: '0.72rem', letterSpacing: '0.25em', fontWeight: 700,
              color: 'rgba(255,190,160,0.85)',
              textTransform: 'uppercase', marginBottom: '14px',
              padding: '5px 16px',
              border: '1px solid rgba(255,180,150,0.25)',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.06)',
            }}>{eyebrow}</span>
          )}

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            fontWeight: 800,
            color: '#ffffff',
            margin: eyebrow ? '0 0 16px' : '0 0 16px',
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
            textShadow: '0 2px 30px rgba(0,0,0,0.4)',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}>{title}</h1>

          {subtitle && (
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'rgba(255,255,255,0.82)',
              width: '100%',
              maxWidth: '580px',
              margin: '0 auto 28px',
              lineHeight: 1.7,
              boxSizing: 'border-box',
            }}>{subtitle}</p>
          )}

          {stats.length > 0 && (
            <div className="page-banner-stats">
              {stats.map((s, i) => (
                <div key={i} className="page-banner-stat-item">
                  <div className="page-banner-stat-value">{s.value}</div>
                  <div className="page-banner-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
