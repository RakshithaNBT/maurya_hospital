import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { departmentsData } from '../data/departmentsData';
import { FaUserMd, FaCheckCircle, FaChevronRight, FaHospital, FaStethoscope, FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './DepartmentDetail.css';

const DepartmentDetail = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const department = departmentsData.find(d => d.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!department) {
    return (
      <div className="section-padding text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2>{t('not_found.title')}</h2>
        <p>{t('not_found.desc')}</p>
        <button onClick={() => navigate('/departments')} className="btn btn-primary mt-4">
          {i18n.language.startsWith('kn') ? 'ವಿಭಾಗಗಳಿಗೆ ಮರಳಿ' : 'Back to Specialities'}
        </button>
      </div>
    );
  }

  return (
    <div className="department-detail-page fade-in lang-fade-transition" key={i18n.language}>
      {/* Hero Section */}
      <div className="dept-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${department.Image})` }}>
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/departments">{t('nav.departments')}</Link> <FaChevronRight className="breadcrumb-icon" /> 
            <span className="current">{t(`departments_data.${department.DepartmentId}.name`, { defaultValue: department.DepartmentName })}</span>
          </div>
          
          <div className="dept-hero-content">
            <span className="dept-eyebrow">{i18n.language.startsWith('kn') ? 'ನಮ್ಮ ವಿಶೇಷತೆ' : 'Our Speciality'}</span>
            <h1>{t(`departments_data.${department.DepartmentId}.name`, { defaultValue: department.DepartmentName })}</h1>
            <p className="dept-subtitle">{t(`departments_data.${department.DepartmentId}.subtitle`, { defaultValue: department.subtitle })}</p>
            
            <div className="dept-hero-actions">
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaCalendarCheck /> {t('home.service_details.btn_book')}
              </button>
              <a href="tel:9632999007" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderColor: '#ffffff', color: '#ffffff' }}>
                <FaPhoneAlt /> {i18n.language.startsWith('kn') ? 'ತುರ್ತು ಕರೆ' : 'Call Emergency'}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container dept-content-container">
        <div className="dept-main-layout">
          {/* Left Column: Main Content */}
          <div className="dept-left-col">
            <section className="dept-section">
              <h2 className="section-title">{i18n.language.startsWith('kn') ? 'ಅವಲೋಕನ' : 'Overview'}</h2>
              <p className="dept-description">
                {t(`departments_data.${department.DepartmentId}.full_desc`, { defaultValue: department.fullDescription })}
              </p>
            </section>

            <section className="dept-section">
              <h2 className="section-title">{i18n.language.startsWith('kn') ? 'ಪ್ರಮುಖ ಸೇವೆಗಳು ಮತ್ತು ಚಿಕಿತ್ಸೆಗಳು' : 'Key Services & Treatments'}</h2>
              <div className="services-grid">
                {department.keyServices.map((service, idx) => (
                  <div key={idx} className="service-item">
                    <FaCheckCircle className="service-icon" />
                    <span>{t(`departments_data.${department.DepartmentId}.services.${idx}`, { defaultValue: service })}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="dept-section">
              <h2 className="section-title">{t('about.infra_title')}</h2>
              <div className="facilities-list">
                {department.facilities.map((facility, idx) => (
                  <div key={idx} className="facility-card">
                    <div className="facility-icon-wrapper">
                      <FaHospital className="facility-icon-inner" />
                    </div>
                    <h4>{t(`departments_data.${department.DepartmentId}.facilities.${idx}`, { defaultValue: facility })}</h4>
                  </div>
                ))}
              </div>
            </section>

            <section className="dept-section">
              <h2 className="section-title">{i18n.language.startsWith('kn') ? 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು' : 'Frequently Asked Questions'}</h2>
              <div className="faq-container">
                {department.faqs.map((faq, idx) => (
                  <div key={idx} className="faq-item">
                    <h4 className="faq-question">Q: {t(`departments_data.${department.DepartmentId}.faqs.${idx}.question`, { defaultValue: faq.question })}</h4>
                    <p className="faq-answer">{t(`departments_data.${department.DepartmentId}.faqs.${idx}.answer`, { defaultValue: faq.answer })}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="dept-right-col">
            <div className="sticky-sidebar">
              <div className="sidebar-card doctors-card">
                <h3><FaUserMd className="sidebar-icon" /> {i18n.language.startsWith('kn') ? 'ನಮ್ಮ ತಜ್ಞರು' : 'Our Specialists'}</h3>
                <div className="doctors-list">
                  {department.doctors.map((doc, idx) => (
                    <div key={idx} className="doctor-item">
                      <div className="doc-avatar">
                        <FaStethoscope />
                      </div>
                      <div className="doc-info">
                        <h4>{t(`doctor_names.${doc.name}`, { defaultValue: doc.name })}</h4>
                        <p>{t(`doctor_roles.${doc.role}`, { defaultValue: doc.role })}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/doctors" className="btn btn-outline full-width text-center mt-4">
                  {i18n.language.startsWith('kn') ? 'ಎಲ್ಲಾ ವೈದ್ಯರನ್ನು ವೀಕ್ಷಿಸಿ' : 'View All Doctors'}
                </Link>
              </div>

              <div className="sidebar-card contact-card text-center">
                <h3>{i18n.language.startsWith('kn') ? 'ತತ್‌ಕ್ಷಣದ ಸಹಾಯ ಬೇಕೇ?' : 'Need Immediate Help?'}</h3>
                <p>
                  {i18n.language.startsWith('kn') 
                    ? 'ನಮ್ಮ ತುರ್ತು ಮತ್ತು ಸಹಾಯವಾಣಿ ಸೇವೆಗಳು ದಿನದ 24 ಗಂಟೆಯೂ ಲಭ್ಯವಿರುತ್ತವೆ.' 
                    : 'Our emergency and helpline services are available 24/7 for immediate assistance.'}
                </p>
                <div className="contact-numbers">
                  <strong>{i18n.language.startsWith('kn') ? 'ತುರ್ತು ಚಿಕಿತ್ಸೆ: ' : 'Emergency: '}</strong> 9632999007<br/>
                  <strong>{i18n.language.startsWith('kn') ? 'ಸಹಾಯವಾಣಿ: ' : 'Helpline: '}</strong> 9741596356
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
