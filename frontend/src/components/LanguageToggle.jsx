import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown } from 'react-icons/fa';

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    document.documentElement.setAttribute('lang', lng);
    setIsOpen(false);
  };

  const currentLanguage = i18n.language || 'en';
  const isEnglish = currentLanguage.startsWith('en');

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="lang-dropdown-container" ref={dropdownRef} aria-label="Language Selector">
      <button 
        className="lang-dropdown-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{isEnglish ? 'English' : 'ಕನ್ನಡ'}</span>
        <FaChevronDown className={`chevron-icon ${isOpen ? 'rotated' : ''}`} />
      </button>
      
      {isOpen && (
        <ul className="lang-dropdown-menu">
          <li>
            <button 
              className={`dropdown-item ${isEnglish ? 'active' : ''}`} 
              onClick={() => changeLanguage('en')}
            >
              English
            </button>
          </li>
          <li>
            <button 
              className={`dropdown-item ${!isEnglish ? 'active' : ''}`} 
              onClick={() => changeLanguage('kn')}
            >
              ಕನ್ನಡ
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageToggle;
