import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { 
  FaUserMd, 
  FaChevronRight, 
  FaPhoneAlt, 
  FaCalendarCheck, 
  FaClock, 
  FaAward, 
  FaArrowLeft 
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './DoctorDetail.css';

const DoctorDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: doctors, loading } = useFetch('/doctors');

  // Scroll to top on page mount or route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="section-padding text-center" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loader-spinner"></div>
      </div>
    );
  }

  // Find the current doctor by ID
  const doctor = doctors?.find((doc) => String(doc.DoctorId) === String(id));

  if (!doctor) {
    return (
      <div className="section-padding text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#faf9f7' }}>
        <h2 style={{ color: '#8B1E1E', fontWeight: '800' }}>{t('not_found.title')}</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>{t('not_found.desc')}</p>
        <button onClick={() => navigate('/doctors')} className="btn" style={{ backgroundColor: '#8B1E1E', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '30px', fontWeight: '700', marginTop: '20px', cursor: 'pointer' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} /> {i18n.language.startsWith('kn') ? 'ವೈದ್ಯರ ಪಟ್ಟಿಗೆ ಮರಳಿ' : 'Return to Doctors'}
        </button>
      </div>
    );
  }

  const imgSource = doctor.Image 
    ? (doctor.Image.startsWith('/uploads/') ? `http://localhost:5000${doctor.Image}` : doctor.Image)
    : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400";

  return (
    <div className="doctor-detail-page fade-in lang-fade-transition" key={i18n.language}>
      {/* Hero section with styled header banner */}
      <div className="doctor-detail-hero">
        <div className="container">
          <div className="doctor-detail-breadcrumbs">
            <Link to="/">{t('nav.home')}</Link> <FaChevronRight className="breadcrumb-icon" /> 
            <Link to="/doctors">{t('nav.doctors')}</Link> <FaChevronRight className="breadcrumb-icon" /> 
            <span className="current">{t(`doctors_data.${doctor.DoctorId}.name`, { defaultValue: doctor.Name })}</span>
          </div>
        </div>
      </div>

      {/* Main doctor detail details section */}
      <section className="doctor-detail-section">
        <div className="container">
          <div className="doctor-detail-grid">
            
            {/* Left Column: Full Uncropped Portrait */}
            <div className="doctor-detail-portrait-card">
              <div className="doctor-detail-image-box">
                <img 
                  src={imgSource} 
                  alt={t(`doctors_data.${doctor.DoctorId}.name`, { defaultValue: doctor.Name })} 
                  className="doctor-detail-img" 
                />
              </div>
            </div>

            {/* Right Column: Information & CTAs */}
            <div className="doctor-detail-info">
              
              <div className="doctor-info-header">
                <div className="doctor-specialty-row">
                  <FaUserMd /> <span>{t(`doctors_data.${doctor.DoctorId}.specialization`, { defaultValue: doctor.Specialization })}</span>
                </div>
                <h1>{t(`doctors_data.${doctor.DoctorId}.name`, { defaultValue: doctor.Name })}</h1>
                <div className="doctor-badges">
                  <span className="doctor-badge-pill qual">
                    {t(`doctors_data.${doctor.DoctorId}.qualification`, { defaultValue: doctor.Qualification })}
                  </span>
                  <span className="doctor-badge-pill exp">
                    <FaAward style={{ marginRight: '5px' }} /> 
                    {t(`doctors_data.${doctor.DoctorId}.experience`, { defaultValue: doctor.Experience })} {i18n.language.startsWith('kn') ? 'ಅನುಭವ' : 'Experience'}
                  </span>
                </div>
              </div>

              {/* Bio block */}
              <div className="doctor-detail-card">
                <h3>{i18n.language.startsWith('kn') ? 'ವೈದ್ಯರ ಬಗ್ಗೆ' : 'About the Doctor'}</h3>
                <p>
                  {t(`doctors_data.${doctor.DoctorId}.desc`, {
                    defaultValue: doctor.Description || (i18n.language.startsWith('kn') 
                      ? `ಡಾ. ${doctor.Name.replace(/^Dr\.\s+/i, '')} ರವರು ರೋಗಿಗಳಿಗೆ ಅತ್ಯುತ್ತಮ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಪ್ರೀತಿಯಿಂದ ಸಲಹೆ ನೀಡಲು ಬದ್ಧರಾಗಿರುವ ಅನುಭವಿ ತಜ್ಞರಾಗಿದ್ದಾರೆ.` 
                      : `Dr. ${doctor.Name.replace(/^Dr\.\s+/i, '')} is a dedicated healthcare specialist committed to providing world-class clinical support, patient diagnosis, and therapeutic surgical guidance.`)
                  })}
                </p>
              </div>

              {/* Consultation Schedule block */}
              <div className="doctor-detail-card">
                <h3><FaClock style={{ marginRight: '8px', color: '#8B1E1E' }} /> {i18n.language.startsWith('kn') ? 'ಸಂದರ್ಶನ ಸಮಯ' : 'Consultation Hours'}</h3>
                <p style={{ marginBottom: '15px', fontSize: '0.95rem' }}>
                  {i18n.language.startsWith('kn') ? 'ನಮ್ಮ ತಜ್ಞರು ಈ ಕೆಳಗಿನ ಸಮಯಗಳಲ್ಲಿ ಕ್ಲಿನಿಕ್ ಸಂದರ್ಶನಕ್ಕೆ ಲಭ್ಯವಿರುತ್ತಾರೆ:' : 'Our specialists are available for clinic sessions during the following hours:'}
                </p>
                <div className="doctor-schedule-grid">
                  <div className="schedule-item">
                    <div className="schedule-day">{i18n.language.startsWith('kn') ? 'ಸೋಮವಾರ - ಶುಕ್ರವಾರ' : 'Monday – Friday'}</div>
                    <div className="schedule-time">{i18n.language.startsWith('kn') ? 'ಬೆಳಿಗ್ಗೆ 10:00 - ಸಂಜೆ 04:00' : '10:00 AM – 04:00 PM'}</div>
                  </div>
                  <div className="schedule-item">
                    <div className="schedule-day">{i18n.language.startsWith('kn') ? 'ಶನಿವಾರ' : 'Saturday'}</div>
                    <div className="schedule-time">{i18n.language.startsWith('kn') ? 'ಬೆಳಿಗ್ಗೆ 10:00 - ಮಧ್ಯಾಹ್ನ 01:00' : '10:00 AM – 01:00 PM'}</div>
                  </div>
                </div>
              </div>

              {/* Booking CTA card */}
              <div className="doctor-booking-card">
                <div className="doctor-booking-content">
                  <h3>{i18n.language.startsWith('kn') ? `ಡಾ. ${doctor.Name.replace(/^Dr\.\s+/i, '')} ಅವರೊಂದಿಗೆ ಸಮಾಲೋಚಿಸಿ` : `Consult with ${doctor.Name.replace(/^Dr\.\s+/i, '')}`}</h3>
                  <p>
                    {i18n.language.startsWith('kn') 
                      ? 'ಸಮಾಲೋಚನೆಗಾಗಿ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಕಾಯ್ದಿರಿಸಲು ಅಥವಾ ನಮ್ಮ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ.' 
                      : 'Book an appointment or speak with our hospital reception team to schedule your physical consultation sessions.'}
                  </p>
                  <div className="doctor-booking-actions">
                    <a href="tel:9632999007" className="btn btn-primary">
                      <FaPhoneAlt /> {i18n.language.startsWith('kn') ? 'ಕರೆ ಮಾಡಿ: 9632999007' : 'Call: 9632999007'}
                    </a>
                    <Link to="/contact" className="btn btn-outline">
                      <FaCalendarCheck /> {t('home.service_details.btn_book')}
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorDetail;
