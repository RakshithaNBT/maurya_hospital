import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import useFetch from '../hooks/useFetch';
import { departmentsData } from '../data/departmentsData';
import { useTranslation } from 'react-i18next';

const Departments = () => {
  const { t, i18n } = useTranslation();
  const { data: departments, loading } = useFetch('/departments');

  // Use local structured data with slug support for linking
  const displayedDepts = departmentsData;

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
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 65%)`;
      glare.style.opacity = '1';
    }
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`;
    card.style.boxShadow = `${rotateY * -1.5}px ${rotateX * 1.5}px 30px rgba(122,31,31,0.15), 0 10px 30px rgba(0,0,0,0.06)`;
  };

  const handle3DReset = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
    const glare = card.querySelector('.qs-glare');
    if (glare) glare.style.opacity = '0';
  };

  return (
    <div className="departments-page fade-in lang-fade-transition" key={i18n.language}>
      {/* Premium Banner */}
      <PageBanner
        eyebrow={t('banner.departments.eyebrow')}
        title={<>{t('banner.departments.title')} <span style={{ color: '#f0a070' }}>Us</span></>}
        subtitle={t('banner.departments.subtitle')}
        stats={[
          { value: '10+', label: t('banner.departments.stat_dept') },
          { value: '24/7', label: t('banner.departments.stat_care') },
          { value: '100%', label: i18n.language.startsWith('kn') ? "ರೋಗಿ ಕೇಂದ್ರಿತ" : "Patient Focus" },
        ]}
      />

      {/* Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>{t('footer.specialties')}</h2>
            <p>{t('banner.departments.subtitle')}</p>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div className="loader-spinner" style={{ margin: '0 auto' }}></div>
            </div>
          )}

          <style>{`
            .interactive-dept-card {
              position: relative;
              text-decoration: none;
              color: inherit;
              display: flex;
              flex-direction: column;
              height: 100%;
              border-radius: 12px;
              overflow: hidden;
              background: #ffffff;
              box-shadow: 0 4px 15px rgba(0,0,0,0.05);
              transition: transform 0.12s ease, box-shadow 0.12s ease !important;
              border: 1px solid #f0f0f0;
              transform-style: preserve-3d;
            }
            .qs-glare {
              position: absolute;
              inset: 0;
              pointer-events: none;
              z-index: 3;
              opacity: 0;
              transition: opacity 0.25s ease;
            }
            .interactive-dept-card:hover {
              border-color: rgba(122, 31, 31, 0.2);
            }
            .interactive-dept-card:hover .dept-learn-more {
              color: var(--primary-color);
            }
            .interactive-dept-card:hover .dept-learn-more span {
              transform: translateX(4px);
            }
            .interactive-dept-card:hover img {
              transform: scale(1.05);
            }
            .dept-img-wrapper {
              overflow: hidden;
              height: 200px;
            }
            .dept-img-wrapper img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.5s ease;
            }
            .dept-content {
              padding: 24px;
              display: flex;
              flex-direction: column;
              flex-grow: 1;
            }
            .dept-content h3 {
              margin: 0 0 10px 0;
              color: var(--secondary-color);
              font-size: 1.25rem;
            }
            .dept-content p {
              color: var(--text-muted);
              font-size: 0.95rem;
              line-height: 1.6;
              flex-grow: 1;
              margin-bottom: 20px;
            }
            .dept-learn-more {
              color: var(--secondary-color);
              font-weight: 600;
              font-size: 0.95rem;
              display: flex;
              align-items: center;
              gap: 5px;
              transition: color 0.3s;
            }
            .dept-learn-more span {
              transition: transform 0.3s;
            }
          `}</style>

          {!loading && (
            <div className="cards-grid">
              {displayedDepts.map((dept) => {
                const imgSource = dept.Image 
                  ? (typeof dept.Image === 'string' && dept.Image.startsWith('/uploads/') ? `http://localhost:5000${dept.Image}` : dept.Image)
                  : "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600";
                
                return (
                  <Link
                    key={dept.DepartmentId}
                    to={`/specialities/${dept.slug}`}
                    className="interactive-dept-card"
                    onMouseMove={handle3DTilt}
                    onMouseLeave={handle3DReset}
                  >
                    <div className="qs-glare" />
                    <div className="dept-img-wrapper">
                      <img src={imgSource} alt={dept.DepartmentName} />
                    </div>
                    <div className="dept-content">
                      <h3>{t(`departments_data.${dept.DepartmentId}.name`, { defaultValue: dept.DepartmentName })}</h3>
                      <p>{t(`departments_data.${dept.DepartmentId}.desc`, { defaultValue: dept.Description })}</p>
                      <div className="dept-learn-more">
                        {i18n.language.startsWith('kn') ? "ಹೆಚ್ಚಿನ ಮಾಹಿತಿ" : "Learn More"} <span>→</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Departments;
