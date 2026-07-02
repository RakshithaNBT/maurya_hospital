import React, { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "919632999007"; // Replace with actual hospital WA number

  const queries = [
    { label: 'Book an Appointment', text: 'Hello, I would like to book an appointment with a doctor.' },
    { label: 'Emergency Help', text: 'Hello, I have a medical emergency and need immediate assistance.' },
    { label: 'Diagnostic / CT Scan Inquiry', text: 'Hello, I would like to inquire about CT imaging/diagnostic services.' },
    { label: 'General Inquiry', text: 'Hello, I have a general question about the hospital services.' }
  ];

  const handleQueryClick = (text) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="whatsapp-widget-container">
      {isOpen && (
        <div className="whatsapp-menu">
          <div className="whatsapp-header">
            <h4>Chat with Us</h4>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="whatsapp-body">
            <p className="whatsapp-greeting">Hi! How can we help you today?</p>
            <div className="whatsapp-queries">
              {queries.map((query, index) => (
                <button 
                  key={index} 
                  className="whatsapp-query-btn"
                  onClick={() => handleQueryClick(query.text)}
                >
                  {query.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <button 
        className="whatsapp-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? <FaTimes /> : <FaWhatsapp />}
      </button>
    </div>
  );
};

export default WhatsAppWidget;
