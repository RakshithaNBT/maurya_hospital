import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaUserMd, FaHospital, FaImages, FaInbox, FaSignOutAlt, FaTachometerAlt, FaRegFileAlt, FaEdit } from 'react-icons/fa';
import { isAdminLoggedIn, adminLogout } from '../services/api';

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin/login');
    }
  }, [navigate, location]);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { id: 'doctors', label: 'Doctors', icon: <FaUserMd /> },
    { id: 'departments', label: 'Departments', icon: <FaHospital /> },
    { id: 'facilities', label: 'Facilities', icon: <FaRegFileAlt /> },
    { id: 'gallery', label: 'Gallery', icon: <FaImages /> },
    { id: 'enquiries', label: 'Enquiries', icon: <FaInbox /> },
    { id: 'content', label: 'Web Content', icon: <FaEdit /> },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar navigation */}
      <aside className="admin-sidebar">
        <div>
          <div className="admin-sidebar-logo">
            <svg width="24" height="30" viewBox="0 0 200 250" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <span style={{ fontWeight: 700, letterSpacing: '1px' }}>Admin Panel</span>
          </div>

          <nav>
            <ul className="admin-menu">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`admin-menu-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="admin-logout" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </aside>

      {/* Main content viewport */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Maurya Hospital Management</h1>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Logged in as <strong>{localStorage.getItem('admin') || 'Admin'}</strong>
            </span>
            <Link to="/" target="_blank" className="btn btn-secondary btn-sm" style={{ padding: '6px 14px' }}>
              View Website
            </Link>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
