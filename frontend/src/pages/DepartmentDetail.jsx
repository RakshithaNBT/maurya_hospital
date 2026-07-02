import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { departmentsData } from '../data/departmentsData';
import { FaUserMd, FaCheckCircle, FaChevronRight, FaHospital, FaStethoscope, FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa';
import './DepartmentDetail.css';

const DepartmentDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const department = departmentsData.find(d => d.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!department) {
    return (
      <div className="section-padding text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Department Not Found</h2>
        <p>The specialty you are looking for does not exist.</p>
        <button onClick={() => navigate('/departments')} className="btn btn-primary mt-4">Back to Specialities</button>
      </div>
    );
  }

  return (
    <div className="department-detail-page fade-in">
      {/* Hero Section */}
      <div className="dept-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${department.Image})` }}>
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/departments">Departments</Link> <FaChevronRight className="breadcrumb-icon" /> 
            <span className="current">{department.DepartmentName}</span>
          </div>
          
          <div className="dept-hero-content">
            <span className="dept-eyebrow">Our Speciality</span>
            <h1>{department.DepartmentName}</h1>
            <p className="dept-subtitle">{department.subtitle}</p>
            
            <div className="dept-hero-actions">
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaCalendarCheck /> Book Appointment
              </button>
              <a href="tel:9632999007" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderColor: '#ffffff', color: '#ffffff' }}>
                <FaPhoneAlt /> Call Emergency
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
              <h2 className="section-title">Overview</h2>
              <p className="dept-description">{department.fullDescription}</p>
            </section>

            <section className="dept-section">
              <h2 className="section-title">Key Services & Treatments</h2>
              <div className="services-grid">
                {department.keyServices.map((service, idx) => (
                  <div key={idx} className="service-item">
                    <FaCheckCircle className="service-icon" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="dept-section">
              <h2 className="section-title">Facilities & Equipment</h2>
              <div className="facilities-list">
                {department.facilities.map((facility, idx) => (
                  <div key={idx} className="facility-card">
                    <div className="facility-icon-wrapper">
                      <FaHospital className="facility-icon-inner" />
                    </div>
                    <h4>{facility}</h4>
                  </div>
                ))}
              </div>
            </section>

            <section className="dept-section">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <div className="faq-container">
                {department.faqs.map((faq, idx) => (
                  <div key={idx} className="faq-item">
                    <h4 className="faq-question">Q: {faq.question}</h4>
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="dept-right-col">
            <div className="sticky-sidebar">
              <div className="sidebar-card doctors-card">
                <h3><FaUserMd className="sidebar-icon" /> Our Specialists</h3>
                <div className="doctors-list">
                  {department.doctors.map((doc, idx) => (
                    <div key={idx} className="doctor-item">
                      <div className="doc-avatar">
                        <FaStethoscope />
                      </div>
                      <div className="doc-info">
                        <h4>{doc.name}</h4>
                        <p>{doc.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/doctors" className="btn btn-outline full-width text-center mt-4">View All Doctors</Link>
              </div>

              <div className="sidebar-card contact-card text-center">
                <h3>Need Immediate Help?</h3>
                <p>Our emergency and helpline services are available 24/7 for immediate assistance.</p>
                <div className="contact-numbers">
                  <strong>Emergency: </strong> 9632999007<br/>
                  <strong>Helpline: </strong> 9741596356
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
