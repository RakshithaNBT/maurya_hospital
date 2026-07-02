import React from 'react';
import { FaStethoscope } from 'react-icons/fa';

const LoadingScreen = ({ fadeOut }) => {
  return (
    <div 
      className="loader-wrapper" 
      style={{ 
        opacity: fadeOut ? 0 : 1, 
        visibility: fadeOut ? 'hidden' : 'visible',
        pointerEvents: fadeOut ? 'none' : 'auto' 
      }}
    >
      <div className="loader-content">
        
        {/* Animation Track containing Corridor, Wheelchair, and Stethoscope */}
        <div className="animation-track-container">
          <div className="corridor-line" />
          

          
          {/* Stethoscope Heartbeat Phase */}
          <div className="stethoscope-wrapper">
            <div className="pulse-ring ring-1" />
            <div className="pulse-ring ring-2" />
            <div className="stethoscope-icon-box">
              <FaStethoscope className="stethoscope-icon" />
            </div>
          </div>
        </div>

        {/* Branding & Logo */}
        <div className="loader-brand-section">
          <svg 
            className="loader-logo-svg" 
            width="120" 
            height="150" 
            viewBox="0 0 200 250" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Crown Group */}
            <g fill="#E6B325">
              {/* Main Crown Body */}
              <path d="M 40 90 
                       Q 100 102 160 90 
                       C 163 78 171 50 176 40
                       C 165 47 150 51 140 52 
                       C 134 45 130 43 125 40 
                       C 118 50 115 56 112 60 
                       C 106 38 103 22 100 10 
                       C 97 22 94 38 88 60 
                       C 85 56 82 50 75 40 
                       C 70 43 66 45 60 52 
                       C 50 51 35 47 24 40
                       C 29 50 37 78 40 90 Z" />
                       
              {/* Accent under the crown base */}
              <path d="M 36 100 C 60 108 140 108 164 100 C 140 105 60 105 36 100 Z" />
              
              {/* Floating accents */}
              {/* Center tall diamond peak tip */}
              <path d="M 100 4 L 103 10 L 100 13 L 97 10 Z" />
              {/* Left point tip */}
              <path d="M 176 34 L 180 40 L 176 43 L 173 40 Z" />
              {/* Right point tip */}
              <path d="M 24 34 L 27 40 L 24 43 L 20 40 Z" />
              
              {/* Floating diamonds in inner peaks */}
              <path d="M 66 43 L 70 47 L 66 51 L 62 47 Z" />
              <path d="M 134 43 L 138 47 L 134 51 L 130 47 Z" />
              
              {/* Oval and dots inside the crown */}
              <ellipse cx="100" cy="72" rx="4" ry="8" />
              <circle cx="70" cy="78" r="3" />
              <circle cx="130" cy="78" r="3" />
            </g>
            
            {/* Text MH */}
            <text x="100" y="185" 
                  fontFamily="'Playfair Display', 'Didot', 'Georgia', 'Times New Roman', serif" 
                  fontSize="95" 
                  fontWeight="normal"
                  fill="#E6B325" 
                  textAnchor="middle"
                  letterSpacing="-2">MH</text>
                  
            {/* Three bottom lines */}
            <g fill="#E6B325">
              {/* Top thickest/longest line */}
              <rect x="25" y="202" width="150" height="4" rx="2" />
              {/* Middle line */}
              <rect x="37" y="213" width="126" height="3" rx="1.5" />
              {/* Bottom thinnest/shortest line */}
              <rect x="52" y="223" width="96" height="2" rx="1" />
            </g>
          </svg>
          
          <h2 className="loader-brand-title">MAURYA</h2>
          <span className="loader-brand-sub">HOSPITAL</span>
          <span className="loader-brand-managed">MANAGED BY ANAGHA HEALTHCARE</span>
        </div>

        {/* ECG Heartbeat SVG Draw line */}
        <div className="loader-ecg-section">
          <svg viewBox="0 0 280 50" className="ecg-line">
            <defs>
              <linearGradient id="ecg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
            <polyline 
              points="0,25 90,25 95,20 100,25 105,25 110,8 116,42 122,25 127,25 132,28 136,25 280,25" 
              fill="none" 
              stroke="url(#ecg-gradient)" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>

        {/* Tagline */}
        <p className="loader-tagline">Advanced Healthcare For A Better Tomorrow</p>
        
      </div>
    </div>
  );
};

export default LoadingScreen;
