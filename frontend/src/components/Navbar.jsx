import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaClock, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavLinkClick = (path) => (e) => {
    closeMenu();
    if (window.location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      {/* Top Bar for contact details and location */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <div className="top-bar-item">
              <FaPhoneAlt className="text-accent" />
              <span>9632999007</span>
            </div>
            <div className="top-bar-item">
              <FaEnvelope className="text-accent" />
              <span>anaghahealthcare2026@gmail.com</span>
            </div>
          </div>
          <div className="top-bar-right">
            <div className="top-bar-item">
              <FaClock className="text-accent" />
              <span>{t('nav.topbar.emergency_tag')}</span>
            </div>
            <div className="top-bar-item">
              <FaMapMarkerAlt className="text-accent" />
              <span>{t('nav.topbar.location')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo" onClick={handleNavLinkClick('/')}>
            {/* Custom stylized medical cross SVG logo */}
            <svg width="44" height="55" viewBox="0 0 200 250" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g fill="#E6B325">
                <path d="M 40 90 Q 100 102 160 90 C 163 78 171 50 176 40 C 165 47 150 51 140 52 C 134 45 130 43 125 40 C 118 50 115 56 112 60 C 106 38 103 22 100 10 C 97 22 94 38 88 60 C 85 56 82 50 75 40 C 70 43 66 45 60 52 C 50 51 35 47 24 40 C 29 50 37 78 40 90 Z" />
                <path d="M 36 100 C 60 108 140 108 164 100 C 140 105 60 105 36 100 Z" />
                <path d="M 100 4 L 103 10 L 100 13 L 97 10 Z" />
                <path d="M 176 34 L 180 40 L 176 43 L 173 40 Z" />
                <path d="M 24 34 L 27 40 L 24 43 L 20 40 Z" />
                <path d="M 66 43 L 70 47 L 66 51 L 62 47 Z" />
                <path d="M 134 43 L 138 47 L 134 51 L 130 47 Z" />
                <ellipse cx="100" cy="72" rx="4" ry="8" />
                <circle cx="70" cy="78" r="3" />
                <circle cx="130" cy="78" r="3" />
              </g>
              <text x="100" y="185" fontFamily="'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif" fontSize="95" fontWeight="normal" fill="#E6B325" textAnchor="middle" letterSpacing="-2">MH</text>
              <g fill="#E6B325">
                <rect x="25" y="202" width="150" height="4" rx="2" />
                <rect x="37" y="213" width="126" height="3" rx="1.5" />
                <rect x="52" y="223" width="96" height="2" rx="1" />
              </g>
            </svg>
            <div className="logo-text">
              MAURYA
              <span>HOSPITAL</span>
            </div>
          </Link>

          <div className="nav-toggle" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>

          <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick('/')}>
                {t('nav.home')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick('/about')}>
                {t('nav.about')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/departments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick('/departments')}>
                {t('nav.departments')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctors" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick('/doctors')}>
                {t('nav.doctors')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/facilities" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick('/facilities')}>
                {t('nav.facilities')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/ct-imaging" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick('/ct-imaging')}>
                {t('nav.ct_imaging')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick('/gallery')}>
                {t('nav.gallery')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick('/contact')}>
                {t('nav.contact')}
              </NavLink>
            </li>
            <li className="nav-lang-item">
              <LanguageToggle />
            </li>
            <li>
              <a href="tel:9632999007" className="btn btn-primary btn-sm" style={{ padding: '8px 12px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                {t('nav.emergency')}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
