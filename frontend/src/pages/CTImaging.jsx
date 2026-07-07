import React, { useState, useEffect, useRef } from 'react';
import PageBanner from '../components/PageBanner';
import { FaCheckCircle, FaStar, FaShieldAlt, FaWaveSquare, FaImage, FaBrain, FaRegHospital, FaHourglassHalf, FaStethoscope, FaFastForward } from 'react-icons/fa';
import multiSliceImage from '../assets/multi_slice_advanced_ct_imaging.png';
import ctScanner from '../assets/ct_scanner.jpg';
import imgHeadToToe from '../assets/Head to Toe Scan.png';
import imgAngio from '../assets/CT ANGIOGRAPHY.png';
import imgDualTriple from '../assets/DUAL-TRIPLE PHASE IMAGING.png';
import img3d from '../assets/3D RECONSTRUCTION.png';
import imgPediatric from '../assets/PEDIATRIC LOW DOSE RADIATION SCAN.png';
import imgDigitalXray from '../assets/DIGITAL X-RAY.png';

const CTImaging = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const containerRef = useRef(null);

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
      title: 'Head to Toe Scan',
      desc: 'Full-body screenings for comprehensive trauma diagnosis, systemic oncology staging, or multi-organ checks.',
      image: imgHeadToToe,
      details: 'Our full-body CT screening is designed to provide comprehensive diagnostic coverage. Commonly utilized in emergency trauma assessments, oncology staging, and multi-organ screening, this scan delivers high-resolution slices from head to toe within seconds.',
      badges: ['Full Body Screening', 'Emergency Trauma Protocol', 'Oncology Staging', 'Fast Scanning Speed']
    },
    {
      title: 'CT Angiography',
      desc: 'Non-invasive, high-definition visualization of cerebral, coronary, renal, and peripheral blood vessels.',
      image: imgAngio,
      details: 'High-definition, non-invasive visualization of the body\'s vascular network. We specialize in coronary, cerebral, renal, and peripheral angiograms, providing clear 3D renderings of arteries and veins to identify blockages, aneurysms, or malformations.',
      badges: ['Vascular Visualization', 'Coronary & Cerebral Studies', 'Blockage Mapping', '3D Vascular Rendering']
    },
    {
      title: 'Dual - Triple Phase Imaging',
      desc: 'Contrast-enhanced dynamic diagnostic imaging to analyze abdominal lesions, liver pathology, and renal concerns.',
      image: imgDualTriple,
      details: 'Contrast-enhanced dynamic imaging tailored for abdomen and pelvis investigations. By capturing scans at precise intervals (arterial, venous, and delayed phases), our specialists can accurately differentiate between benign and malignant lesions.',
      badges: ['Dynamic Contrast Phases', 'Liver & Renal Pathology', 'Abdominal Lesions', 'High Contrast Precision']
    },
    {
      title: '3D Reconstruction',
      desc: 'Volumetric rendering of skeletal structures, joint fractures, and soft tissues for precise pre-surgical planning.',
      image: img3d,
      details: 'Transforming standard axial slices into highly accurate 3D volume-rendered models. This advanced visualization is critical for orthopedic fracture mapping, complex surgical planning, and post-traumatic reconstructive assessments.',
      badges: ['3D Volumetric Rendering', 'Orthopedic Planning', 'Surgical Navigation', 'High Clarity Models']
    },
    {
      title: 'Pediatric Low Dose Radiation Scan',
      desc: 'Optimized scanning protocols limiting radiation dosage specifically for infants and young children.',
      image: imgPediatric,
      details: 'Specially calibrated scanning protocols dedicated to our youngest patients. By implementing advanced dose modulation and AI-based image reconstruction, we minimize radiation exposure while maintaining absolute diagnostic clarity.',
      badges: ['Calibrated Dose Modulation', 'AI Image Reconstruction', 'Pediatric Safe Protocols', 'Gentle Diagnostic Care']
    },
    {
      title: 'Digital X-Ray',
      desc: 'High-frequency digital radiography generating clean skeletal, orthotic, and thoracic imagery with minimal exposure.',
      image: imgDigitalXray,
      details: 'High-frequency digital radiography generating clean skeletal and thoracic imagery. The digital detector plates ensure instant image availability, minimal patient positioning discomfort, and significantly lower radiation compared to traditional X-rays.',
      badges: ['High Frequency Radiography', 'Chest & Skeletal Studies', 'Low Radiation Exposure', 'Instant Image Access']
    }
  ];

  return (
    <div className="ct-imaging-page fade-in">
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
        title={<>Multi Slice Advanced <span style={{ color: '#f0a070' }}>CT Imaging</span></>}
        subtitle="High-definition volumetric scanning, low radiation protocols, and 24/7 diagnostic support."
        stats={[
          { value: '128', label: 'Slice CT Scanner' },
          { value: '24/7', label: 'Scan Availability' },
          { value: 'Low', label: 'Radiation Dose' },
        ]}
      />

      {/* Intro section */}
      <section className="section-padding">
        <div className="container">
          <div className="wcu-layout" style={{ alignItems: 'flex-start' }}>
            <div>
              <span className="hero-subtitle" style={{ color: 'var(--primary-color)' }}>Advanced Clinical Imaging</span>
              <h2>State-of-the-Art CT Scanning</h2><br />
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.7' }}>
                At Maurya Hospital, we believe that clear and prompt diagnostics form the core of effective clinical treatments. Managed under Anagha Healthcare, our radiology department houses high-specification GE multislice CT systems.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.7' }}>
                We prioritize patient safety by deploying low-dose protocols and automated exposure modulation. Our diagnostic workflows are fully integrated with digital databases, allowing our reporting panels to generate results rapidly.
              </p>

              <div className="ct-highlights" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ background: '#fcf3f2', color: 'var(--primary-color)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaBrain style={{ fontSize: '1.4rem' }} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--secondary-color)', fontSize: '1.1rem' }}>Artificial Intelligence</h4>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      AI-assisted algorithms highlighting micro-lesions, speeding up workflows, and improving accuracy.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ background: '#fcf3f2', color: 'var(--primary-color)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaShieldAlt style={{ fontSize: '1.4rem' }} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--secondary-color)', fontSize: '1.1rem' }}>Low Radiation</h4>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      Automatic dose modulating software ensuring diagnostic clarity at minimal exposure levels.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ background: '#fcf3f2', color: 'var(--primary-color)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaFastForward style={{ fontSize: '1.4rem' }} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--secondary-color)', fontSize: '1.1rem' }}>Fast Scan</h4>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      Rapid imaging cycles capturing clear scans even in emergency trauma situations where patient movement is common.
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
            <h2>Our Advanced CT Offerings</h2>
            <p>Click on any service below to learn more about our imaging capabilities.</p>
          </div>

          {expandedCard === null ? (
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
                          <FaCheckCircle className="feature-icon" /> 24/7 Availability
                        </div>
                        <div className="feature-badge">
                          <FaStar className="feature-icon" /> Advanced Tech
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
                      <span className="diagnostic-header-close-btn">✕ Click to Close</span>
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
                      <h3>{activeScan.title} Overview</h3>
                      <p className="diagnostic-split-desc">{activeScan.details || activeScan.desc}</p>
                      
                      <div className="diagnostic-split-badges">
                        {(activeScan.badges || []).map((badge, bIdx) => (
                          <span key={bIdx} className="diagnostic-split-badge">
                            <FaStar className="badge-star-icon" /> {badge}
                          </span>
                        ))}
                      </div>

                      <a href="/contact" className="btn btn-primary" style={{ marginTop: '25px', display: 'inline-block' }}>
                        Schedule Scan
                      </a>
                    </div>

                  </div>

                  {/* Other Scan Offerings grid */}
                  <div className="diagnostic-other-offerings-section">
                    <h4 className="diagnostic-other-title">EXPLORE OTHER CT OFFERINGS</h4>
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
          <h2 style={{ fontSize: '2rem', color: 'var(--secondary-color)', marginBottom: '20px' }}>Need an Emergency CT Scan?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
            Our scanning rooms work 24/7, 365 days a year to cater to urgent clinical requirements, vascular emergencies, and trauma investigations.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:08214534545" className="btn btn-primary">Call Reception: 0821-4534545</a>
            <a href="tel:9632999007" className="btn btn-secondary">Emergency: 9632999007</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTImaging;

