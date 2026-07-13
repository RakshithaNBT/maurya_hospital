import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Hospital details */}
          <div className="footer-col footer-about">
            <h3>Maurya Hospital</h3>
            <p>
              {t('footer.desc')}
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="#" className="social-icon" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3>{t('footer.quick_links')}</h3>
            <ul className="footer-links">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/departments">{t('nav.departments')}</Link></li>
              <li><Link to="/doctors">{t('nav.doctors')}</Link></li>
              <li><Link to="/facilities">{t('nav.facilities')}</Link></li>
              <li><Link to="/ct-imaging">{t('nav.ct_imaging')}</Link></li>
              <li><Link to="/gallery">{t('nav.gallery')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Medical Specialties */}
          <div className="footer-col">
            <h3>{t('footer.specialties')}</h3>
            <ul className="footer-links">
              <li><Link to="/departments">{t('home.services.emergency_title')}</Link></li>
              <li><Link to="/departments">{t('departments_data.2.name')}</Link></li>
              <li><Link to="/departments">{t('departments_data.3.name')}</Link></li>
              <li><Link to="/departments">{t('departments_data.4.name')}</Link></li>
              <li><Link to="/departments">{t('departments_data.5.name')}</Link></li>
              <li><Link to="/departments">{t('facilities.default_facilities.dialysis')}</Link></li>
            </ul>
          </div>

          {/* Column 4: Location & Contact */}
          <div className="footer-col">
            <h3>{t('footer.contact_us')}</h3>
            <div className="footer-contact-item">
              <FaMapMarkerAlt className="icon" />
              <span>
                1306, Sahukar Chennaiah Road,<br />
                Janatha Nagar, Bogadi 2nd Stage,<br />
                TK Layout, Mysuru, Karnataka – 570009
              </span>
            </div>
            <div className="footer-contact-item">
              <FaPhoneAlt className="icon" />
              <span>
                0821-4534545<br />
                9632999007 / 9741596356
              </span>
            </div>
            <div className="footer-contact-item">
              <FaEnvelope className="icon" />
              <span style={{ wordBreak: 'break-all' }}>
                anaghahealthcare2026@gmail.com
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
          <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>{t('footer.managed_by')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
