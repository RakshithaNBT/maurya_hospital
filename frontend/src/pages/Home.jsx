import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { FaUserMd, FaClinicMedical, FaClock, FaHeartbeat, FaCheckCircle, FaStar, FaShieldAlt } from 'react-icons/fa';
import hospitalNursingStation from '../assets/hospital_nursing_station.jpg';
import heroBanner from '../assets/hero.png';


const Home = () => {
  const { data: content } = useFetch('/content');

  const wcuRef = React.useRef(null);
  const [wcuVisible, setWcuVisible] = React.useState(false);
  const [activeWcu, setActiveWcu] = React.useState(0);

  const qsRef = React.useRef(null);
  const [qsVisible, setQsVisible] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [activeSpotlight, setActiveSpotlight] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  // Close modal on Escape key
  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setSelectedCard(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Spotlight loop: cycles cards left-to-right one by one when not hovered
  React.useEffect(() => {
    if (selectedCard || isHovered) return;
    const timer = setInterval(() => {
      setActiveSpotlight((prev) => (prev + 1) % 5);
    }, 2800); // 2.8s per card spotlight
    return () => clearInterval(timer);
  }, [selectedCard, isHovered]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWcuVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (wcuRef.current) {
      observer.observe(wcuRef.current);
    }
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setQsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (qsRef.current) {
      observer.observe(qsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const serviceDetails = [
    {
      title: '24/7 Emergency Care',
      tagline: 'Immediate life-saving response, every hour of every day.',
      points: [
        'Round-the-clock emergency department staffed by qualified physicians and trained nursing teams.',
        'Rapid trauma assessment, stabilisation, and transfer protocols in place.',
        'Dedicated ambulance coordination and pre-hospital communication.',
        'Advanced resuscitation equipment and defibrillators on standby.',
        'Direct fast-track access to ICU, OT, and radiology in emergencies.',
      ],
    },
    {
      title: 'Advanced CT Imaging',
      tagline: 'Precision diagnostics powered by state-of-the-art technology.',
      points: [
        'Multi-slice CT scanner providing high-resolution cross-sectional images.',
        'CT Angiography for cardiac, neuro, and vascular studies.',
        '3D reconstruction capability for orthopaedic and surgical planning.',
        'Available round-the-clock including emergency and acute-care scans.',
        'Expert radiologist interpretation with rapid report turnaround.',
      ],
    },
    {
      title: 'Expert Clinical Panel',
      tagline: 'Highly qualified specialists across multiple disciplines.',
      points: [
        'Resident and visiting consultants in Orthopaedics, Neurosurgery, and Plastic Surgery.',
        'Dedicated Oncology, Gynaecology, and General Surgery specialists.',
        'Multi-disciplinary team (MDT) case reviews for complex conditions.',
        'Outpatient consultation hours 6 days a week with flexible slots.',
        'In-house and tele-consultation available for follow-up care.',
      ],
    },
    {
      title: 'Intensive Care Unit',
      tagline: 'Critical care with continuous monitoring and expert intervention.',
      points: [
        'Fully equipped ICU with bedside cardiac monitoring, pulse oximetry, and ventilators.',
        'Dedicated intensivist coverage and 1:2 nurse-to-patient ratio.',
        'Isolation bays available for infection control and post-operative recovery.',
        'Integrated with emergency and surgical departments for seamless transfers.',
        'Family communication protocols and regular clinical briefings.',
      ],
    },
    {
      title: 'Insurance Accepted',
      tagline: 'Hassle-free cashless treatment across all major schemes.',
      points: [
        'Empanelled with all major TPA (Third-Party Administrator) networks.',
        'Government health schemes including Ayushman Bharat / PM-JAY accepted.',
        'Karnataka state government and ESIC beneficiaries covered.',
        'Dedicated insurance desk for pre-authorisation and claim assistance.',
        'Transparent billing with detailed cost estimates provided upfront.',
      ],
    },
  ];


  const welcomeTitle = content?.welcome_title || 'Welcome to Maurya Hospital';
  const welcomeText = content?.welcome_text || 'Maurya Hospital, managed by Anagha Healthcare, is a premier multi-specialty healthcare institution in Mysuru, Karnataka. We are dedicated to providing compassionate, state-of-the-art medical services at affordable rates. Our highly experienced clinical team, modern diagnostic facilities (including round-the-clock CT imaging), and advanced operating systems ensure you receive the finest treatment possible.';

  const stats = {
    beds: content?.stats_beds || '100+',
    doctors: content?.stats_doctors || '25+',
    staff: content?.stats_staff || '150+',
    served: content?.stats_patients_served || '50,000+',
  };

  // 3D tilt helpers
  const handle3DTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) * 10;
    const glare = card.querySelector('.qs-glare');
    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35) 0%, transparent 65%)`;
      glare.style.opacity = '1';
    }
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.03)`;
    card.style.boxShadow = `${rotateY * -1.5}px ${rotateX * 1.5}px 40px rgba(158,42,34,0.22), 0 20px 60px rgba(0,0,0,0.1)`;
  };

  const handle3DReset = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
    const glare = card.querySelector('.qs-glare');
    if (glare) glare.style.opacity = '0';
  };

  return (
    <div className="home-page fade-in">
      {/* 1. Hero Banner */}
      <section className="hero-banner-section" style={{ marginBottom: '60px' }}>
        <img src={heroBanner} alt="Maurya Hospital - Managed by Anagha Healthcare" className="hero-banner-image" />
      </section>



      {/* 3. Welcome Message */}
      <section className="welcome-section section-padding">
        <div className="container">
          <div className="wcu-layout">
            <div className="wcu-image">
              <img src={hospitalNursingStation} alt="Hospital Reception" />
            </div>
            <div>
              <span className="hero-subtitle" style={{ color: 'var(--primary-color)' }}>About Maurya Hospital</span>
              <h2 style={{ fontSize: '2rem', margin: '10px 0 20px', color: 'var(--secondary-color)' }}>{welcomeTitle}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '1.05rem', lineHeight: '1.7' }}>
                {welcomeText}
              </p>
              <Link to="/about" className="btn btn-primary">Read More About Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Services */}
      <section 
        ref={qsRef}
        className={`quick-services container ${qsVisible ? 'qs-visible' : ''}`}
        style={{ marginTop: '60px', paddingBottom: '80px' }}
      >
        <div 
          className="qs-marquee-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="qs-marquee-content">
            {[
              { icon: <FaClock />, title: '24/7 Emergency Care', desc: 'Critical care and rapid trauma response operating round-the-clock with expert physicians.' },
              { icon: <FaClinicMedical />, title: 'Advanced CT Imaging', desc: 'Modern diagnostic imaging, CT Angiography, and 3D reconstructions, available 24/7.' },
              { icon: <FaUserMd />, title: 'Expert Clinical Panel', desc: 'Specialists in Orthopedics, Neurosurgery, Plastic Surgery, Oncology, and Gynecology.' },
              { icon: <FaHeartbeat />, title: 'Intensive Care Unit', desc: 'Fully-monitored high-dependency ICU chambers with life support systems and ventilators.' },
              { icon: <FaShieldAlt />, title: 'Insurance Accepted', desc: 'All major insurance, TPA, and Government schemes are accepted here.' }
            ].concat([
              { icon: <FaClock />, title: '24/7 Emergency Care', desc: 'Critical care and rapid trauma response operating round-the-clock with expert physicians.' },
              { icon: <FaClinicMedical />, title: 'Advanced CT Imaging', desc: 'Modern diagnostic imaging, CT Angiography, and 3D reconstructions, available 24/7.' },
              { icon: <FaUserMd />, title: 'Expert Clinical Panel', desc: 'Specialists in Orthopedics, Neurosurgery, Plastic Surgery, Oncology, and Gynecology.' },
              { icon: <FaHeartbeat />, title: 'Intensive Care Unit', desc: 'Fully-monitored high-dependency ICU chambers with life support systems and ventilators.' },
              { icon: <FaShieldAlt />, title: 'Insurance Accepted', desc: 'All major insurance, TPA, and Government schemes are accepted here.' }
            ]).map((service, idx) => {
              const isSpotlightActive = activeSpotlight === (idx % 5);
              return (
                <div
                  key={idx}
                  className={`service-card ${isSpotlightActive ? 'active-spotlight' : ''}`}
                  onClick={() => setSelectedCard(serviceDetails[idx % 5])}
                  onMouseMove={handle3DTilt}
                  onMouseLeave={handle3DReset}
                  style={{ cursor: 'pointer', transition: 'transform 0.12s ease, box-shadow 0.12s ease' }}
                >
                  {/* Glare overlay */}
                  <div className="qs-glare" />
                  <div className="service-card-inner">
                    <div className="service-icon">{service.icon}</div>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Detail Modal */}
        {selectedCard && createPortal(
          <div className="qs-modal-backdrop" onClick={() => setSelectedCard(null)}>
            <div className="qs-modal" onClick={e => e.stopPropagation()}>
              <button className="qs-modal-close" onClick={() => setSelectedCard(null)} aria-label="Close">✕</button>
              <div className="qs-modal-icon-bar">
                <span className="qs-modal-tag">Maurya Hospital</span>
              </div>
              <h2 className="qs-modal-title">{selectedCard.title}</h2>
              <p className="qs-modal-tagline">{selectedCard.tagline}</p>
              <ul className="qs-modal-list">
                {selectedCard.points.map((pt, i) => (
                  <li key={i}>
                    <span className="qs-modal-check">✔</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <a href="/contact" className="btn btn-primary" style={{ marginTop: '28px', display: 'inline-block' }}>Book an Appointment</a>
            </div>
          </div>,
          document.body
        )}
      </section>

      {/* 4. Why Choose Us */}
      <section className={`why-choose-us section-padding ${wcuVisible ? 'wcu-visible' : ''}`} ref={wcuRef}>
        <div className="container">
          <div className="wcu-redesign-grid">
            
            {/* Left Column: Heading, Subtitle & Feature Cards */}
            <div className="wcu-left-content">
              <h2 className="wcu-main-heading">Why Choose Maurya Hospital?</h2>
              <p className="wcu-main-subtitle">
                Trusted healthcare with experienced specialists, advanced technology and compassionate care.
              </p>
              
              <div className="wcu-cards-stack">
                {[
                  {
                    title: 'Experienced Doctors',
                    desc: 'Highly skilled clinical team and consulting specialists with years of proven medical practice.'
                  },
                  {
                    title: 'Advanced Medical Equipment',
                    desc: 'Equipped with modern diagnostic systems and advanced operating theatres.'
                  },
                  {
                    title: 'Affordable Treatment',
                    desc: 'Transparent, ethical and cost-effective healthcare.'
                  },
                  {
                    title: 'Patient-Centered Care',
                    desc: 'Personalized treatment plans with compassionate nursing support.'
                  },
                  {
                    title: '24/7 Emergency Support',
                    desc: 'Round-the-clock emergency services and critical care.'
                  }
                ].map((feature, idx) => {
                  const isActive = activeWcu === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`wcu-feature-card ${isActive ? 'wcu-active' : ''}`}
                      onClick={() => setActiveWcu(isActive ? null : idx)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="wcu-icon-col">
                        <div className="wcu-gold-icon-wrapper">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>
                      <div className="wcu-text-col">
                        <h4 className="wcu-card-title">{feature.title}</h4>
                        <div className="wcu-desc-wrapper">
                          <p className="wcu-card-desc">{feature.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Premium Image Card */}
            <div className="wcu-right-content">
              <div className="wcu-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                  alt="Doctor consulting patient" 
                />
              </div>
            </div>

          </div>
        </div>

        <style>{`
          /* Why Choose Us Redesign Styles */
          .wcu-redesign-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 50px;
            align-items: start;
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
          }

          .wcu-left-content {
            display: flex;
            flex-direction: column;
            text-align: left;
          }

          .wcu-main-heading {
            font-size: 48px;
            font-weight: bold;
            color: #6B1E16;
            margin: 0 0 12px 0;
            line-height: 1.2;
          }

          .wcu-main-subtitle {
            font-size: 18px;
            color: #666666;
            max-width: 500px;
            line-height: 1.6;
            margin: 0 0 35px 0;
          }

          .wcu-cards-stack {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .wcu-feature-card {
            background: #ffffff;
            border-radius: 18px;
            border: 1px solid rgba(0, 0, 0, 0.04);
            border-left: 4px solid transparent;
            padding: 24px;
            display: flex;
            gap: 20px;
            align-items: start;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.02);
            transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
            opacity: 0;
            transform: translateX(-30px);
          }

          /* Entrance animation delay for cards */
          .wcu-visible .wcu-feature-card {
            animation: slideInLeftWcu 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
          }

          .wcu-visible .wcu-feature-card:nth-child(1) { animation-delay: 0.15s; }
          .wcu-visible .wcu-feature-card:nth-child(2) { animation-delay: 0.3s; }
          .wcu-visible .wcu-feature-card:nth-child(3) { animation-delay: 0.45s; }
          .wcu-visible .wcu-feature-card:nth-child(4) { animation-delay: 0.6s; }
          .wcu-visible .wcu-feature-card:nth-child(5) { animation-delay: 0.75s; }

          @keyframes slideInLeftWcu {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* Active Accordion State */
          .wcu-feature-card.wcu-active {
            transform: translateY(-6px);
            box-shadow: 0 15px 35px rgba(158, 42, 34, 0.06);
            border-left-color: var(--primary-color);
            background: #fffdf8;
          }

          .wcu-feature-card.wcu-active .wcu-gold-icon-wrapper {
            transform: scale(1.15);
          }

          /* Hover Actions for Inactive Cards */
          .wcu-feature-card:hover:not(.wcu-active) {
            transform: translateY(-3px);
            border-left-color: rgba(158, 42, 34, 0.4);
            background: #fffdfc;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
          }

          .wcu-gold-icon-wrapper {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--light-gold) 0%, var(--accent-color) 100%);
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            box-shadow: 0 4px 10px rgba(230, 179, 37, 0.3);
            transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
            flex-shrink: 0;
          }

          .wcu-text-col {
            display: flex;
            flex-direction: column;
            width: 100%;
          }

          .wcu-card-title {
            font-size: 22px;
            font-weight: 600;
            color: var(--primary-color);
            margin: 0;
            line-height: 1.2;
          }

          .wcu-desc-wrapper {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease;
            opacity: 0;
            overflow: hidden;
          }

          .wcu-active .wcu-desc-wrapper {
            grid-template-rows: 1fr;
            opacity: 1;
            margin-top: 8px;
          }

          .wcu-card-desc {
            min-height: 0;
            font-size: 16px;
            line-height: 1.8;
            color: #666666;
            margin: 0;
          }

          /* Right Image styling */
          .wcu-right-content {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            position: sticky;
            top: 100px;
          }

          .wcu-image-container {
            width: 100%;
            border-radius: 20px;
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08), 0 0 20px rgba(158, 42, 34, 0.03);
            border: 4px solid #ffffff;
            overflow: hidden;
            position: relative;
            aspect-ratio: 4 / 3;
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }

          .wcu-visible .wcu-image-container {
            animation: floatImage 6s ease-in-out infinite, slideInRightWcu 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
            animation-delay: 0s, 0.3s;
          }

          @keyframes slideInRightWcu {
            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          @keyframes floatImage {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }

          .wcu-image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }

          .wcu-image-container:hover img {
            transform: scale(1.05);
          }

          /* Responsive Breakpoints */
          @media (max-width: 1024px) {
            .wcu-redesign-grid {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            .wcu-right-content {
              position: static;
            }
            .wcu-image-container {
              max-width: 600px;
              margin: 0 auto;
            }
          }

          @media (max-width: 768px) {
            .wcu-main-heading {
              font-size: 36px;
            }
            .wcu-main-subtitle {
              font-size: 16px;
            }
          }

          @media (max-width: 480px) {
            .wcu-main-heading {
              font-size: 30px;
            }
            .wcu-feature-card {
              padding: 20px;
              gap: 15px;
            }
            .wcu-card-title {
              font-size: 18px;
            }
            .wcu-card-desc {
              font-size: 14px;
            }
          }

          /* ── Service Cards: Marquee layouts ── */
          .qs-marquee-container {
            overflow: hidden;
            width: 100%;
            position: relative;
            padding: 16px 0;
            mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
          }

          .qs-marquee-content {
            display: flex;
            gap: 24px;
            width: max-content;
            animation: qsMarqueeSlideLeft 32s linear infinite;
          }

          .qs-marquee-container:hover .qs-marquee-content {
            animation-play-state: paused;
          }

          @keyframes qsMarqueeSlideLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          /* Base card: sized for marquee */
          .service-card {
            position: relative;
            overflow: hidden;
            border-radius: 20px !important;
            padding: 3px !important;
            background: transparent !important;
            border: none !important;
            display: flex;
            box-shadow: 0 4px 20px rgba(0,0,0,0.04) !important;
            width: 290px !important;
            height: 380px !important;
            flex-shrink: 0 !important;

            /* Staggered entrance animation initial state */
            opacity: 0;
            transform: translateX(80px);
            transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), 
                        transform 0.8s cubic-bezier(0.25, 1, 0.5, 1),
                        box-shadow 0.12s ease;
          }

          /* Staggered entrance animation when visible */
          .qs-visible .service-card {
            opacity: 1;
            transform: translateX(0);
          }

          .qs-visible .service-card:nth-child(1) { transition-delay: 0.1s; }
          .qs-visible .service-card:nth-child(2) { transition-delay: 0.2s; }
          .qs-visible .service-card:nth-child(3) { transition-delay: 0.3s; }
          .qs-visible .service-card:nth-child(4) { transition-delay: 0.4s; }
          .qs-visible .service-card:nth-child(5) { transition-delay: 0.5s; }
          .qs-visible .service-card:nth-child(6) { transition-delay: 0.6s; }
          .qs-visible .service-card:nth-child(7) { transition-delay: 0.7s; }
          .qs-visible .service-card:nth-child(8) { transition-delay: 0.8s; }
          .qs-visible .service-card:nth-child(9) { transition-delay: 0.9s; }
          .qs-visible .service-card:nth-child(10) { transition-delay: 1.0s; }

          /* Rotating red border — always running on every card */
          .service-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(
              transparent 0deg,
              var(--primary-color) 80deg,
              transparent 110deg
            );
            animation: rotateBorder 3.5s linear infinite;
            z-index: 0;
          }

          @keyframes rotateBorder {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }

          /* Card inner content — sits on top of rotating border */
          .service-card-inner {
            position: relative;
            z-index: 2;
            background: #ffffff;
            border-radius: 17px;
            padding: 40px 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            text-align: center;
            width: 100%;
            height: 100%;
            transition: background 0.3s ease, filter 0.3s ease;
          }

          /* Glare overlay — follows cursor */
          .qs-glare {
            position: absolute;
            inset: 0;
            border-radius: 17px;
            pointer-events: none;
            z-index: 3;
            opacity: 0;
            transition: opacity 0.25s ease;
          }

          /* Remove old CSS hover lift — now handled by JS 3D transform */
          .service-card:hover {
            /* 3D tilt is applied via inline style by JS */
          }

          .service-card:hover::before {
            animation: rotateBorder 1.8s linear infinite;
          }

          .service-card:hover .service-card-inner {
            background: #fffdf8;
          }

          /* Icon floats up on hover */
          .service-card:hover .service-icon {
            transform: scale(1.15) translateY(-4px);
            background-color: var(--primary-color) !important;
            color: #ffffff !important;
          }

          /* Loop Spotlight active class (only once entrance animation is complete/visible) */
          .qs-visible .service-card.active-spotlight {
            transform: translateY(-8px) scale(1.03) !important;
            box-shadow: 0 18px 40px rgba(158, 42, 34, 0.18) !important;
          }

          .qs-visible .service-card.active-spotlight::before {
            animation: rotateBorder 1.8s linear infinite !important;
          }

          .qs-visible .service-card.active-spotlight .service-card-inner {
            background: #fffdf8 !important;
          }

          .qs-visible .service-card.active-spotlight .service-icon {
            transform: scale(1.15) translateY(-4px) !important;
            background-color: var(--primary-color) !important;
            color: #ffffff !important;
          }

          .service-card h3 {
            font-size: 1.35rem !important;
            margin: 15px 0 12px 0 !important;
            color: var(--secondary-color);
          }

          .service-card p {
            font-size: 0.95rem !important;
            line-height: 1.6 !important;
            color: var(--text-muted) !important;
            margin: 0;
          }

          /* ── Modal Backdrop ── */
          .qs-modal-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(10, 10, 20, 0.55);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: backdropFadeIn 0.25s ease;
          }

          @keyframes backdropFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }

          /* ── Modal Panel ── */
          .qs-modal {
            background: #ffffff;
            border-radius: 24px;
            padding: 44px 48px;
            max-width: 580px;
            width: 100%;
            position: relative;
            box-shadow: 0 30px 80px rgba(158,42,34,0.18), 0 8px 24px rgba(0,0,0,0.12);
            animation: modalSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
            border-top: 5px solid var(--primary-color);
            max-height: 90vh;
            overflow-y: auto;
          }

          @keyframes modalSlideUp {
            from { opacity: 0; transform: translateY(40px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }

          /* Close button */
          .qs-modal-close {
            position: absolute;
            top: 16px;
            right: 18px;
            background: none;
            border: none;
            font-size: 1.3rem;
            color: #999;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 8px;
            transition: color 0.2s, background 0.2s;
          }
          .qs-modal-close:hover { color: var(--primary-color); background: #fff0ef; }

          /* Tag */
          .qs-modal-icon-bar {
            margin-bottom: 14px;
          }
          .qs-modal-tag {
            display: inline-block;
            background: rgba(158,42,34,0.08);
            color: var(--primary-color);
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            padding: 4px 12px;
            border-radius: 20px;
          }

          /* Title */
          .qs-modal-title {
            font-size: 1.75rem;
            font-weight: 800;
            color: var(--secondary-color);
            margin: 0 0 8px;
            line-height: 1.25;
          }

          /* Tagline */
          .qs-modal-tagline {
            font-size: 1rem;
            color: var(--text-muted);
            margin: 0 0 24px;
            line-height: 1.6;
            border-bottom: 1px solid #f0eded;
            padding-bottom: 20px;
          }

          /* Bullet list */
          .qs-modal-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .qs-modal-list li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-size: 0.95rem;
            color: #444;
            line-height: 1.55;
          }
          .qs-modal-check {
            flex-shrink: 0;
            width: 22px;
            height: 22px;
            background: var(--primary-color);
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.65rem;
            font-weight: 700;
            margin-top: 1px;
          }
        `}</style>
      </section>

      {/* 5. Statistics Counter */}
      <section className="statistics">
        <div className="container stats-grid">
          <div className="stat-item">
            <h3>{stats.beds}</h3>
            <p>Hospital Beds</p>
          </div>
          <div className="stat-item">
            <h3>{stats.doctors}</h3>
            <p>Specialist Doctors</p>
          </div>
          <div className="stat-item">
            <h3>{stats.staff}</h3>
            <p>Clinical Staff</p>
          </div>
          <div className="stat-item">
            <h3>{stats.served}</h3>
            <p>Patients Cured</p>
          </div>
        </div>
      </section>



      {/* 9. Testimonials */}
      <section className="testimonials section-padding">
        <div className="container">
          <div className="section-header">
            <h2>What Our Patients Say</h2>
            <p>Read about patient healing journeys and recovery reviews at Maurya Hospital.</p>
          </div>

          <div className="testimonials-slider">
            <div className="testimonial-card">
              <span className="testimonial-quote">“</span>
              <div className="testimonial-rating">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p>
                My father was admitted for emergency ortho surgery. The care given by the surgeon and ICU staff was highly supportive. Grateful to Maurya Hospital and Anagha Healthcare.
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Suresh Kumar</h4>
                  <span>Mysuru Resident</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <span className="testimonial-quote">“</span>
              <div className="testimonial-rating">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p>
                The CT imaging department is exceptional. I had to get a dual-phase scan at 2 AM. The technician was extremely professional and we got the reports within hours.
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Ananya Hegde</h4>
                  <span>Patient</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <span className="testimonial-quote">“</span>
              <div className="testimonial-rating">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p>
                Hygienic wards, friendly nurses, and prompt doctors. They explained the treatment protocol clearly. Highly recommend this hospital for quality, affordable care.
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Mohammad R.</h4>
                  <span>Retired Officer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Contact Section banner */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-light)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--secondary-color)', marginBottom: '15px' }}>Need Clinical Consultation?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 30px' }}>
            Get in touch with Anagha Healthcare's reception desk at Maurya Hospital. Walk-in appointments or queries are answered 24/7.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:08214534545" className="btn btn-primary">Call Now: 0821-4534545</a>
            <Link to="/contact" className="btn btn-secondary">Get Location & Directions</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
