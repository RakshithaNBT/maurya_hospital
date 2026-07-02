import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Hospital details */}
          <div className="footer-col footer-about">
            <h3>Maurya Hospital</h3>
            <p>
              Managed by Anagha Healthcare, Maurya Hospital is a premier multi-specialty medical facility in Mysuru. We deliver high-quality, compassionate clinical care with modern technologies.
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
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/departments">Departments</Link></li>
              <li><Link to="/doctors">Doctors</Link></li>
              <li><Link to="/facilities">Facilities</Link></li>
              <li><Link to="/ct-imaging">CT Imaging</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Medical Specialties */}
          <div className="footer-col">
            <h3>Specialties</h3>
            <ul className="footer-links">
              <li><Link to="/departments">Emergency Care</Link></li>
              <li><Link to="/departments">Neuro & Spine Surgery</Link></li>
              <li><Link to="/departments">Orthopedics</Link></li>
              <li><Link to="/departments">Plastic Surgery</Link></li>
              <li><Link to="/departments">General Medicine</Link></li>
              <li><Link to="/departments">Dialysis Services</Link></li>
            </ul>
          </div>

          {/* Column 4: Location & Contact */}
          <div className="footer-col">
            <h3>Contact Us</h3>
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
          <p>&copy; {new Date().getFullYear()} Maurya Hospital. All Rights Reserved.</p>
          <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Managed by Anagha Healthcare, Mysuru, Karnataka.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
