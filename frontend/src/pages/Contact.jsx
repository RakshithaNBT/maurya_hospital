import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaExclamationTriangle, FaDirections } from 'react-icons/fa';
import API from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields (Name, Phone, Message).' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const hospitalWhatsAppNumber = "919632999007";
      const messageText = `*New Website Enquiry*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || 'N/A'}\n\n*Message:*\n${formData.message}`;
      
      const whatsappUrl = `https://wa.me/${hospitalWhatsAppNumber}?text=${encodeURIComponent(messageText)}`;
      
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setStatus({
        type: 'success',
        message: 'Redirecting to WhatsApp to send your enquiry!'
      });
      
      // Clear form after slight delay so user sees success message before tab switch
      setTimeout(() => {
        setFormData({ name: '', phone: '', email: '', message: '' });
        setStatus({ type: '', message: '' });
      }, 3000);
      
    } catch (error) {
      console.error('WhatsApp redirect error:', error);
      setStatus({
        type: 'error',
        message: 'Failed to redirect to WhatsApp. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page fade-in">
      {/* Premium Banner */}
      <PageBanner
        eyebrow="We're Here to Help · 24/7"
        title={<>Contact <span style={{ color: '#f0a070' }}>Us</span></>}
        subtitle="Reach out to our reception, administration, or medical team. We are available 24/7."
        stats={[
          { value: '24/7', label: 'Emergency Line' },
          { value: '2 min', label: 'Response Time' },
          { value: '100%', label: 'Patient Focused' },
        ]}
      />

      {/* Main Info & Form */}
      <section className="section-padding">
        <div className="container">
          <div className="contact-layout">
            
            {/* Info Panel */}
            <div className="contact-info-panel">
              <div>
                <h3>Maurya Hospital</h3>
                <p>Managed by Anagha Healthcare</p>
                
                <div className="contact-details">
                  <div className="contact-detail-item">
                    <div className="contact-icon"><FaMapMarkerAlt /></div>
                    <div className="contact-text">
                      <h4>Hospital Address</h4>
                      <p>
                        1306, Sahukar Chennaiah Road,<br />
                        Janatha Nagar, Bogadi 2nd Stage,<br />
                        TK Layout, Mysuru, Karnataka – 570009
                      </p>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="contact-icon"><FaPhoneAlt /></div>
                    <div className="contact-text">
                      <h4>Phone Numbers</h4>
                      <p>
                        0821-4534545 (Landline)<br />
                        9632999007 (Emergency)<br />
                        9741596356 (Admin Office)
                      </p>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="contact-icon"><FaEnvelope /></div>
                    <div className="contact-text">
                      <h4>Email Address</h4>
                      <a href="mailto:anaghahealthcare2026@gmail.com">anaghahealthcare2026@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Call / Chat Buttons */}
              <div className="contact-action-buttons">
                <a 
                  href="https://wa.me/919632999007" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-whatsapp"
                >
                  <FaWhatsapp style={{ fontSize: '1.2rem' }} /> Chat on WhatsApp
                </a>
                <a 
                  href="tel:9632999007" 
                  className="btn btn-emergency-call"
                >
                  <FaExclamationTriangle /> 24/7 Emergency Line
                </a>
              </div>
            </div>

            {/* Form Panel */}
            <div className="contact-form-panel">
              <h3>Send an Enquiry</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
                Fill out the form below and our customer care team will reply shortly.
              </p>

              {status.message && (
                <div 
                  style={{ 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    marginBottom: '20px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: status.type === 'success' ? '#2e7d32' : '#c62828',
                    backgroundColor: status.type === 'success' ? '#e8f5e9' : '#ffebee',
                    border: `1px solid ${status.type === 'success' ? '#c8e6c9' : '#ffcdd2'}`
                  }}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleFormSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name <span style={{ color: 'red' }}>*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="Enter your name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number <span style={{ color: 'red' }}>*</span></label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="Enter mobile number" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label htmlFor="email">Email Address (Optional)</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Enter email address" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="form-group form-group-full" style={{ marginBottom: '25px' }}>
                  <label htmlFor="message">Your Message <span style={{ color: 'red' }}>*</span></label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    placeholder="Type your enquiry or question here..." 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    required 
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                  style={{ width: '100%', borderRadius: '8px' }}
                >
                  {loading ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </form>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="google-map">
            {/* Embedded maps for Mysuru location Sahukar Channaiah Road */}
            <iframe 
              title="Maurya Hospital Location Map"
              src="https://maps.google.com/maps?q=Maurya%20Hospital,%201306,%20Sahukar%20Chennaiah%20Road,%20Bogadi%202nd%20Stage,%20TK%20Layout,%20Mysuru,%20Karnataka%20570009&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Maurya+Hospital,+1306,+Sahukar+Chennaiah+Road,+Janatha+Nagar,+Bogadi+2nd+Stage,+TK+Layout,+Mysuru,+Karnataka+570009" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              <FaDirections style={{ fontSize: '1.25rem' }} /> Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
