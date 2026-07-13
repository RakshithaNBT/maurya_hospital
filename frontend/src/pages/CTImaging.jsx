import React, { useState, useEffect, useRef } from 'react';
import PageBanner from '../components/PageBanner';
import { FaCheckCircle, FaStar, FaShieldAlt, FaWaveSquare, FaImage, FaBrain, FaRegHospital, FaHourglassHalf, FaStethoscope, FaFastForward } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import multiSliceImage from '../assets/multi_slice_advanced_ct_imaging.png';
import ctScanner from '../assets/ct_scanner.jpg';
import imgHeadToToe from '../assets/Head to Toe Scan.png';
import imgAngio from '../assets/CT ANGIOGRAPHY.png';
import imgDualTriple from '../assets/DUAL-TRIPLE PHASE IMAGING.png';
import img3d from '../assets/3D RECONSTRUCTION.png';
import imgPediatric from '../assets/PEDIATRIC LOW DOSE RADIATION SCAN.png';
import imgDigitalXray from '../assets/DIGITAL X-RAY.png';

const CTImaging = () => {
  const { t, i18n } = useTranslation();
  const [expandedCard, setExpandedCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle clicking outside to collapse cards
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setExpandedCard(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleImage3DTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -12;
    const rotateY = ((x - cx) / cx) * 12;
    const glare = card.querySelector('.qs-glare');
    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.45) 0%, transparent 65%)`;
      glare.style.opacity = '1';
    }
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.boxShadow = `${rotateY * -1.5}px ${rotateX * 1.5}px 35px rgba(158, 42, 34, 0.15), 0 20px 40px rgba(0,0,0,0.1)`;
  };

  const handleImage3DReset = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.boxShadow = 'var(--shadow-md)';
    const glare = card.querySelector('.qs-glare');
    if (glare) glare.style.opacity = '0';
  };

  const scans = [
    {
      key: 'f4', // Head to toe trauma scan
      title: t('ct_imaging.f4_title'),
      desc: t('ct_imaging.f4_desc'),
      image: imgHeadToToe,
      details: t('ct_imaging.f4_desc'),
      badges: i18n.language.startsWith('kn') 
        ? ['ಪೂರ್ಣ ದೇಹದ ಸ್ಕ್ಯಾನಿಂಗ್', 'ತುರ್ತು ಗಾಯದ ಪ್ರೋಟೋಕಾಲ್', 'ಕ್ಯಾನ್ಸರ್ ತಪಾಸಣೆ', 'ಅತಿ ವೇಗದ ಸ್ಕ್ಯಾನಿಂಗ್'] 
        : ['Full Body Screening', 'Emergency Trauma Protocol', 'Oncology Staging', 'Fast Scanning Speed']
    },
    {
      key: 'f2', // CT Angiography
      title: t('ct_imaging.f2_title'),
      desc: t('ct_imaging.f2_desc'),
      image: imgAngio,
      details: t('ct_imaging.f2_desc'),
      badges: i18n.language.startsWith('kn')
        ? ['ರಕ್ತನಾಳಗಳ ವೀಕ್ಷಣೆ', 'ಹೃದಯ ಮತ್ತು ಮೆದುಳಿನ ಅಧ್ಯಯನ', 'ರಕ್ತನಾಳಗಳ ಅಡಚಣೆ ಪತ್ತೆ', '3D ರಕ್ತನಾಳ ಚಿತ್ರಣ']
        : ['Vascular Visualization', 'Coronary & Cerebral Studies', 'Blockage Mapping', '3D Vascular Rendering']
    },
    {
      key: 'f3', // Dual / Triple Phase Imaging
      title: t('ct_imaging.f3_title'),
      desc: t('ct_imaging.f3_desc'),
      image: imgDualTriple,
      details: t('ct_imaging.f3_desc'),
      badges: i18n.language.startsWith('kn')
        ? ['ಡೈನಾಮಿಕ್ ಕಾಂಟ್ರಾಸ್ಟ್ ಹಂತಗಳು', 'ಯಕೃತ್ತು ಮತ್ತು ಮೂತ್ರಪಿಂಡಗಳ ತಪಾಸಣೆ', 'ಹೊಟ್ಟೆಯ ಗಾಯಗಳು', 'ನಿಖರವಾದ ವ್ಯತ್ಯಾಸ']
        : ['Dynamic Contrast Phases', 'Liver & Renal Pathology', 'Abdominal Lesions', 'High Contrast Precision']
    },
    {
      key: 'f1', // 3D Reconstruction Studies
      title: t('ct_imaging.f1_title'),
      desc: t('ct_imaging.f1_desc'),
      image: img3d,
      details: t('ct_imaging.f1_desc'),
      badges: i18n.language.startsWith('kn')
        ? ['3D ವಾಲ್ಯೂಮೆಟ್ರಿಕ್ ರೆಂಡರಿಂಗ್', 'ಮೂಳೆ ಶಸ್ತ್ರಚಿಕಿತ್ಸಾ ಯೋಜನೆ', 'ಶಸ್ತ್ರಚಿಕಿತ್ಸಾ ಮಾರ್ಗಸೂಚಿ', 'ಸ್ಪಷ್ಟ ಮಾದರಿಗಳು']
        : ['3D Volumetric Rendering', 'Orthopedic Planning', 'Surgical Navigation', 'High Clarity Models']
    },
    {
      key: 'f5', // Pediatric Low-Dose Scan
      title: t('ct_imaging.f5_title'),
      desc: t('ct_imaging.f5_desc'),
      image: imgPediatric,
      details: t('ct_imaging.f5_desc'),
      badges: i18n.language.startsWith('kn')
        ? ['ವಿಕಿರಣ ಪ್ರಮಾಣ ನಿಯಂತ್ರಣ', 'AI ಇಮೇಜ್ ರೀಕನ್ಸ್ಟ್ರಕ್ಷನ್', 'ಮಕ್ಕಳಿಗೆ ಸುರಕ್ಷಿತ', 'ಮೃದುವಾದ ಕಾಳಜಿ']
        : ['Calibrated Dose Modulation', 'AI Image Reconstruction', 'Pediatric Safe Protocols', 'Gentle Diagnostic Care']
    },
    {
      key: 'f6', // Low-Dose Radiation Imaging
      title: t('ct_imaging.f6_title'),
      desc: t('ct_imaging.f6_desc'),
      image: imgDigitalXray,
      details: t('ct_imaging.f6_desc'),
      badges: i18n.language.startsWith('kn')
        ? ['ಹೈ ಫ್ರೀಕ್ವೆನ್ಸಿ ರೇಡಿಯೋಗ್ರಫಿ', 'ಎದೆ ಮತ್ತು ಮೂಳೆಗಳ ತಪಾಸಣೆ', 'ಕಡಿಮೆ ವಿಕಿರಣ ಪ್ರಮಾಣ', 'ತಕ್ಷಣದ ಚಿತ್ರ ವೀಕ್ಷಣೆ']
        : ['High Frequency Radiography', 'Chest & Skeletal Studies', 'Low Radiation Exposure', 'Instant Image Access']
    }
  ];

  return (
    <div className="ct-imaging-page fade-in lang-fade-transition" key={i18n.language}>
      <style>{`
        .diagnostic-services-container {
          position: relative;
        }

        /* Grid Layout */
        .diagnostic-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
          position: relative;
          z-index: 41;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Card Styling */
        .diagnostic-card {
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          height: 380px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease;
        }

        .diagnostic-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        /* Full Width Image */
        .diagnostic-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .diagnostic-card:hover .diagnostic-bg-image {
          transform: scale(1.08);
        }

        /* Dark Overlay */
        .diagnostic-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%);
          opacity: 0.7;
          transition: opacity 0.5s ease;
          z-index: 1;
        }

        .diagnostic-card:hover::before {
          opacity: 0.9;
        }

        /* Sliding Info Panel (Glassmorphism) */
        .diagnostic-overlay-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 30px 24px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          transform: translateY(calc(100% - 90px));
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .diagnostic-card:hover .diagnostic-overlay-content {
          transform: translateY(0);
          background: rgba(15, 20, 25, 0.6);
        }

        .diagnostic-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 10px 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .diagnostic-details {
          opacity: 0;
          transition: opacity 0.4s ease 0.1s;
        }

        .diagnostic-card:hover .diagnostic-details {
          opacity: 1;
        }

        .diagnostic-desc {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin: 0 0 20px 0;
        }

        .diagnostic-features {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .feature-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.15);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .feature-icon {
          color: #f0a070;
        }

        /* ── Diagnostic Accordion View Styling ── */
        .diagnostic-accordion-view {
          display: flex;
          flex-direction: column;
          gap: 25px;
          animation: fadeInUp 0.5s ease-out;
          max-width: 1200px;
          margin: 0 auto;
        }

        .diagnostic-active-header {
          background: #ffffff;
          border: 1px solid rgba(158, 42, 34, 0.15);
          border-left: 5px solid var(--primary-color);
          border-radius: 18px;
          padding: 22px 30px;
          box-shadow: 0 8px 25px rgba(158, 42, 34, 0.04);
          transition: all 0.3s ease;
        }

        .diagnostic-active-header:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(158, 42, 34, 0.08);
          background: #fffdfc;
        }

        .diagnostic-header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .diagnostic-header-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .diagnostic-header-check-icon {
          color: var(--accent-color);
          font-size: 1.4rem;
        }

        .diagnostic-header-title {
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--primary-color);
          margin: 0;
        }

        .diagnostic-header-close-btn {
          font-size: 0.95rem;
          font-weight: 600;
          color: #999999;
          transition: color 0.2s ease;
        }

        .diagnostic-active-header:hover .diagnostic-header-close-btn {
          color: var(--primary-color);
        }

        /* Split Details Box */
        .diagnostic-split-details-box {
          background: #fdfdfd;
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.03);
          display: flex;
          overflow: hidden;
          min-height: 400px;
        }

        /* Layout Alternating */
        .diagnostic-split-details-box.layout-image-left {
          flex-direction: row;
        }

        .diagnostic-split-details-box.layout-details-left {
          flex-direction: row-reverse;
        }

        .diagnostic-split-image-col {
          flex: 1.1;
          position: relative;
          min-height: 380px;
          overflow: hidden;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fafaf9;
        }

        .diagnostic-3d-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 340px;
          border-radius: var(--border-radius);
          overflow: hidden;
          transform-style: preserve-3d;
          transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
          box-shadow: var(--shadow-md);
        }

        .diagnostic-3d-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          inset: 0;
          transform: translateZ(20px) scale(1.02);
          transition: transform 0.3s ease;
          will-change: transform;
        }

        .diagnostic-3d-image-container .qs-glare {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          opacity: 0;
          transition: opacity 0.25s ease;
          border-radius: var(--border-radius);
        }

        .diagnostic-split-details-box:hover .diagnostic-3d-image-container img {
          transform: translateZ(20px) scale(1.04);
        }

        .diagnostic-split-info-col {
          flex: 1.2;
          padding: 50px 45px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
          background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
        }

        .diagnostic-split-info-col h3 {
          font-size: 1.8rem;
          color: var(--secondary-color);
          margin: 0 0 15px 0;
          font-weight: 700;
        }

        .diagnostic-split-desc {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--text-muted);
          margin: 0 0 25px 0;
        }

        .diagnostic-split-badges {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .diagnostic-split-badge {
          background: #f5f5f5;
          color: var(--secondary-color);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.88rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(0,0,0,0.04);
        }

        .badge-star-icon {
          color: var(--accent-color);
        }

        /* Other offerings grid */
        .diagnostic-other-offerings-section {
          margin-top: 25px;
        }

        .diagnostic-other-title {
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 20px;
          text-align: left;
        }

        .diagnostic-other-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .diagnostic-other-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
          transition: all 0.3s ease;
        }

        .diagnostic-other-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(158, 42, 34, 0.06);
          border-color: rgba(158, 42, 34, 0.1);
        }

        .diagnostic-other-card-inner {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          height: 100%;
        }

        .diagnostic-other-card-thumb {
          width: 75px;
          height: 75px;
          border-radius: 10px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .diagnostic-other-card-info {
          text-align: left;
        }

        .diagnostic-other-card-info h4 {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--primary-color);
          margin: 0 0 4px 0;
        }

        .diagnostic-other-card-info p {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 991px) {
          .diagnostic-split-details-box {
            flex-direction: column !important;
          }
          .diagnostic-split-image-col {
            min-height: 300px;
          }
          .diagnostic-split-info-col {
            padding: 35px 30px;
          }
        }

        @media (max-width: 576px) {
          .diagnostic-header-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }
          .diagnostic-header-close-btn {
            font-size: 0.85rem !important;
            align-self: flex-end !important;
          }
          .diagnostic-header-title {
            font-size: 1.15rem !important;
          }
          .diagnostic-split-info-col {
            padding: 24px 20px !important;
          }
          .diagnostic-split-badge {
            font-size: 0.8rem !important;
            padding: 6px 12px !important;
          }
        }
      `}</style>

      {/* Premium Banner */}
      <PageBanner
        eyebrow="Advanced Diagnostic Imaging · Mysuru"
        title={<>{t('nav.ct_imaging')}</>}
        subtitle={t('ct_imaging.subtitle')}
        stats={[
          { value: '128', label: i18n.language.startsWith('kn') ? 'ಸ್ಲೈಸ್ ಸಿಟಿ ಸ್ಕ್ಯಾನರ್' : 'Slice CT Scanner' },
          { value: '24/7', label: i18n.language.startsWith('kn') ? 'ಸ್ಕ್ಯಾನ್ ಲಭ್ಯತೆ' : 'Scan Availability' },
          { value: 'Low', label: i18n.language.startsWith('kn') ? 'ಕಡಿಮೆ ವಿಕಿರಣ ಪ್ರಮಾಣ' : 'Low Radiation Dose' },
        ]}
      />

      {/* Intro section */}
      <section className="section-padding">
        <div className="container">
          <div className="wcu-layout" style={{ alignItems: 'flex-start' }}>
            <div>
              <span className="hero-subtitle" style={{ color: 'var(--primary-color)' }}>{i18n.language.startsWith('kn') ? 'ಸುಧಾರಿತ ವೈದ್ಯಕೀಯ ಚಿತ್ರಣ' : 'Advanced Clinical Imaging'}</span>
              <h2>{i18n.language.startsWith('kn') ? 'ಅತ್ಯಾಧುನಿಕ ಸಿಟಿ ಸ್ಕ್ಯಾನಿಂಗ್ ವಿಭಾಗ' : 'State-of-the-Art CT Scanning'}</h2><br />
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.7' }}>
                {i18n.language.startsWith('kn') 
                  ? 'ಮೌರ್ಯ ಆಸ್ಪತ್ರೆಯಲ್ಲಿ, ಸ್ಪಷ್ಟ ಮತ್ತು ತ್ವರಿತ ರೋಗನಿರ್ಣಯವು ಪರಿಣಾಮಕಾರಿ ಕ್ಲಿನಿಕಲ್ ಚಿಕಿತ್ಸೆಗಳ ಕೇಂದ್ರವಾಗಿದೆ ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ. ಅನಘಾ ಹೆಲ್ತ್‌ಕೇರ್ ಅಡಿಯಲ್ಲಿ ನಿರ್ವಹಿಸಲ್ಪಡುವ ನಮ್ಮ ರೇಡಿಯಾಲಜಿ ವಿಭಾಗವು ಅತ್ಯಾಧುನಿಕ ಸಿಟಿ ಸ್ಕ್ಯಾನ್ ಸಿಸ್ಟಮ್‌ಗಳನ್ನು ಹೊಂದಿದೆ.'
                  : 'At Maurya Hospital, we believe that clear and prompt diagnostics form the core of effective clinical treatments. Managed under Anagha Healthcare, our radiology department houses high-specification GE multislice CT systems.'}
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.7' }}>
                {i18n.language.startsWith('kn')
                  ? 'ಕಡಿಮೆ-ಡೋಸ್ ಪ್ರೋಟೋಕಾಲ್ಗಳು ಮತ್ತು ಸ್ವಯಂಚಾಲಿತ ಮಾನ್ಯತೆ ನಿಯಂತ್ರಣವನ್ನು ನಿಯೋಜಿಸುವ ಮೂಲಕ ನಾವು ರೋಗಿಯ ಸುರಕ್ಷತೆಗೆ ಆದ್ಯತೆ ನೀಡುತ್ತೇವೆ. ನಮ್ಮ ವರದಿ ಮಾಡುವ ಪ್ಯಾನೆಲ್‌ಗಳು ಫಲಿತಾಂಶಗಳನ್ನು ತ್ವರಿತವಾಗಿ ರಚಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.'
                  : 'We prioritize patient safety by deploying low-dose protocols and automated exposure modulation. Our diagnostic workflows are fully integrated with digital databases, allowing our reporting panels to generate results rapidly.'}
              </p>

              <div className="ct-highlights" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ background: '#fcf3f2', color: 'var(--primary-color)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaBrain style={{ fontSize: '1.4rem' }} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--secondary-color)', fontSize: '1.1rem' }}>{i18n.language.startsWith('kn') ? 'ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (AI)' : 'Artificial Intelligence'}</h4>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      {i18n.language.startsWith('kn') ? 'ಮೈಕ್ರೋ-ಗಾಯಗಳನ್ನು ಪತ್ತೆಹಚ್ಚುವ ಮೂಲಕ ನಿಖರತೆಯನ್ನು ಹೆಚ್ಚಿಸುವ ಮತ್ತು ಕೆಲಸವನ್ನು ವೇಗಗೊಳಿಸುವ AI ಅಲ್ಗಾರಿದಮ್‌ಗಳು.' : 'AI-assisted algorithms highlighting micro-lesions, speeding up workflows, and improving accuracy.'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ background: '#fcf3f2', color: 'var(--primary-color)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaShieldAlt style={{ fontSize: '1.4rem' }} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--secondary-color)', fontSize: '1.1rem' }}>{i18n.language.startsWith('kn') ? 'ಕಡಿಮೆ ವಿಕಿರಣ' : 'Low Radiation'}</h4>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      {i18n.language.startsWith('kn') ? 'ಕನಿಷ್ಠ ವಿಕಿರಣದೊಂದಿಗೆ ಅದ್ಭುತ ಚಿತ್ರದ ಸ್ಪಷ್ಟತೆಯನ್ನು ಖಚಿತಪಡಿಸುವ ಸಾಫ್ಟ್‌ವೇರ್ ನಿಯಂತ್ರಣ.' : 'Automatic dose modulating software ensuring diagnostic clarity at minimal exposure levels.'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ background: '#fcf3f2', color: 'var(--primary-color)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaFastForward style={{ fontSize: '1.4rem' }} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--secondary-color)', fontSize: '1.1rem' }}>{i18n.language.startsWith('kn') ? 'ತ್ವರಿತ ಸ್ಕ್ಯಾನ್' : 'Fast Scan'}</h4>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      {i18n.language.startsWith('kn') ? 'ತುರ್ತು ಸಂದರ್ಭಗಳಲ್ಲಿ ಅತಿ ವೇಗವಾಗಿ ಸ್ಕ್ಯಾನ್ ಮಾಡುವ ಮತ್ತು ನಿಖರ ಚಿತ್ರಗಳನ್ನು ನೀಡುವ ಚಕ್ರಗಳು.' : 'Rapid imaging cycles capturing clear scans even in emergency trauma situations where patient movement is common.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="wcu-images-single" style={{ width: '100%' }}>
              <img
                src={multiSliceImage}
                alt="State-of-the-Art CT Scanning"
                style={{ borderRadius: 'var(--border-radius)', width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'contain', boxShadow: 'var(--shadow-md)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Services Grid */}
      <section className="section-padding" style={{ backgroundColor: '#faf9f8', borderTop: '1px solid var(--border-color)', position: 'relative' }}>
        <div className="container diagnostic-services-container" ref={containerRef}>
          <div className="section-header" style={{ position: 'relative', zIndex: 42 }}>
            <h2>{t('ct_imaging.features_title')}</h2>
            <p>
              {i18n.language.startsWith('kn') ? 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಪಡೆಯಲು ಕೆಳಗಿನ ಯಾವುದೇ ಸೇವೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.' : 'Click on any service below to learn more about our imaging capabilities.'}
            </p>
          </div>

          {isMobile ? (
            // Mobile inline accordion view
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {scans.map((scan, index) => {
                const isActive = expandedCard === index;
                return (
                  <div key={index} style={{ width: '100%' }}>
                    <div
                      className={`diagnostic-card-mobile-header ${isActive ? 'active' : ''}`}
                      onClick={() => setExpandedCard(isActive ? null : index)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        backgroundColor: isActive ? 'var(--secondary-color)' : 'white',
                        color: isActive ? 'white' : 'var(--secondary-color)',
                        borderRadius: '20px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: isActive ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                        zIndex: 10
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img 
                          src={scan.image} 
                          alt={scan.title} 
                          style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '10px' }} 
                        />
                        <h3 style={{ fontSize: '1.05rem', margin: 0, fontWeight: '700', color: isActive ? 'white' : 'var(--secondary-color)' }}>{scan.title}</h3>
                      </div>
                      <span style={{ 
                        fontSize: '1.3rem', 
                        fontWeight: 'bold', 
                        color: isActive ? 'white' : 'var(--primary-color)',
                        transition: 'transform 0.3s',
                        transform: isActive ? 'rotate(90deg)' : 'none'
                      }}>
                        {isActive ? '−' : '+'}
                      </span>
                    </div>

                    {isActive && (
                      <div 
                        className="diagnostic-mobile-card-body"
                        style={{
                          backgroundColor: 'white',
                          padding: '24px 20px',
                          borderRadius: '20px',
                          border: '1px solid var(--border-color)',
                          marginTop: '8px',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05)',
                          animation: 'acsExpandSlide 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                        }}
                      >
                        <img 
                          src={scan.image} 
                          alt={scan.title} 
                          style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }} 
                        />
                        <h4 style={{ fontSize: '1.2rem', color: 'var(--secondary-color)', fontWeight: '750', marginBottom: '10px', marginTop: 0 }}>
                          {scan.title} {i18n.language.startsWith('kn') ? 'ಅವಲೋಕನ' : 'Overview'}
                        </h4>
                        <p style={{ color: '#444', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '16px' }}>
                          {scan.details || scan.desc}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                          {(scan.badges || []).map((badge, bIdx) => (
                            <span 
                              key={bIdx} 
                              style={{
                                fontSize: '0.78rem',
                                padding: '4px 10px',
                                backgroundColor: '#fdf3f2',
                                color: 'var(--primary-color)',
                                borderRadius: '20px',
                                fontWeight: '600'
                              }}
                            >
                              ★ {badge}
                            </span>
                          ))}
                        </div>
                        <a 
                          href="/contact" 
                          className="btn btn-primary" 
                          style={{ width: '100%', textAlign: 'center', display: 'block', padding: '12px', borderRadius: '10px' }}
                        >
                          {i18n.language.startsWith('kn') ? 'ಸ್ಕ್ಯಾನ್ ನಿಗದಿಪಡಿಸಿ' : 'Schedule Scan'}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : expandedCard === null ? (
            // Default grid view
            <div className="diagnostic-grid">
              {scans.map((scan, index) => (
                <div
                  key={index}
                  className="diagnostic-card"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard(index);
                  }}
                >
                  <img src={scan.image} alt={scan.title} className="diagnostic-bg-image" />
                  <div className="diagnostic-overlay-content">
                    <h3 className="diagnostic-title">{scan.title}</h3>
                    <div className="diagnostic-details">
                      <p className="diagnostic-desc">{scan.desc}</p>
                      <div className="diagnostic-features">
                        <div className="feature-badge">
                          <FaCheckCircle className="feature-icon" /> {i18n.language.startsWith('kn') ? '24/7 ಲಭ್ಯತೆ' : '24/7 Availability'}
                        </div>
                        <div className="feature-badge">
                          <FaStar className="feature-icon" /> {i18n.language.startsWith('kn') ? 'ಸುಧಾರಿತ ತಂತ್ರಜ್ಞಾನ' : 'Advanced Tech'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Expanded accordion view
            (() => {
              const activeScan = scans[expandedCard];
              const isEven = expandedCard % 2 === 0; // Even index: Image Left, Details Right. Odd index: Details Left, Image Right.
              return (
                <div className="diagnostic-accordion-view">
                  
                  {/* Active Featured Card Header */}
                  <div 
                    className="diagnostic-active-header"
                    onClick={() => setExpandedCard(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="diagnostic-header-inner">
                      <div className="diagnostic-header-left">
                        <FaCheckCircle className="diagnostic-header-check-icon" />
                        <h3 className="diagnostic-header-title">{activeScan.title}</h3>
                      </div>
                      <span className="diagnostic-header-close-btn">
                        {i18n.language.startsWith('kn') ? '✕ ಮುಚ್ಚಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : '✕ Click to Close'}
                      </span>
                    </div>
                  </div>

                  {/* Split Details Box */}
                  <div className={`diagnostic-split-details-box ${isEven ? 'layout-image-left' : 'layout-details-left'}`}>
                    
                    {/* Image side */}
                    <div className="diagnostic-split-image-col">
                      <div 
                        className="diagnostic-3d-image-container"
                        onMouseMove={handleImage3DTilt}
                        onMouseLeave={handleImage3DReset}
                      >
                        <div className="qs-glare" />
                        <img src={activeScan.image} alt={activeScan.title} />
                      </div>
                    </div>

                    {/* Details side */}
                    <div className="diagnostic-split-info-col">
                      <h3>{activeScan.title} {i18n.language.startsWith('kn') ? 'ಅವಲೋಕನ' : 'Overview'}</h3>
                      <p className="diagnostic-split-desc">{activeScan.details || activeScan.desc}</p>
                      
                      <div className="diagnostic-split-badges">
                        {(activeScan.badges || []).map((badge, bIdx) => (
                          <span key={bIdx} className="diagnostic-split-badge">
                            <FaStar className="badge-star-icon" /> {badge}
                          </span>
                        ))}
                      </div>

                      <a href="/contact" className="btn btn-primary" style={{ marginTop: '25px', display: 'inline-block' }}>
                        {i18n.language.startsWith('kn') ? 'ಸ್ಕ್ಯಾನ್ ನಿಗದಿಪಡಿಸಿ' : 'Schedule Scan'}
                      </a>
                    </div>

                  </div>

                  {/* Other Scan Offerings grid */}
                  <div className="diagnostic-other-offerings-section">
                    <h4 className="diagnostic-other-title">
                      {i18n.language.startsWith('kn') ? 'ಇತರ ಸಿಟಿ ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ' : 'EXPLORE OTHER CT OFFERINGS'}
                    </h4>
                    <div className="diagnostic-other-grid">
                      {scans.map((scan, index) => {
                        if (index === expandedCard) return null;
                        return (
                          <div 
                            key={index} 
                            className="diagnostic-other-card"
                            onClick={() => setExpandedCard(index)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="diagnostic-other-card-inner">
                              <img src={scan.image} alt={scan.title} className="diagnostic-other-card-thumb" />
                              <div className="diagnostic-other-card-info">
                                <h4>{scan.title}</h4>
                                <p>{scan.desc}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              );
            })()
          )}
        </div>
      </section>

      {/* Banner Call-To-Action */}
      <section className="section-padding">
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--secondary-color)', marginBottom: '20px' }}>
            {i18n.language.startsWith('kn') ? 'ತುರ್ತು ಸಿಟಿ ಸ್ಕ್ಯಾನ್ ಅಗತ್ಯವಿದೆಯೇ?' : 'Need an Emergency CT Scan?'}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
            {i18n.language.startsWith('kn') 
              ? 'ನಮ್ಮ ಸಿಟಿ ಸ್ಕ್ಯಾನ್ ವಿಭಾಗವು ದಿನದ 24 ಗಂಟೆಯೂ ವರ್ಷದ 365 ದಿನಗಳೂ ತುರ್ತು ರೋಗಿಗಳಿಗೆ ಲಭ್ಯವಿರುತ್ತದೆ.'
              : 'Our scanning rooms work 24/7, 365 days a year to cater to urgent clinical requirements, vascular emergencies, and trauma investigations.'}
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:08214534545" className="btn btn-primary">
              {i18n.language.startsWith('kn') ? 'ಸಹಾಯವಾಣಿ: 0821-4534545' : 'Call Reception: 0821-4534545'}
            </a>
            <a href="tel:9632999007" className="btn btn-secondary">{t('nav.emergency')}</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTImaging;

