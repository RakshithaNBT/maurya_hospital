import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { isAdminLoggedIn } from '../services/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAdminLoggedIn()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await API.post('/admin/login', { username, password });
      const { token, admin } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('admin', admin.username);
      
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper fade-in">
      <div className="admin-login-card">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <svg width="60" height="60" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="23" stroke="#9E2A22" strokeWidth="4" fill="white" />
            <rect x="21" y="10" width="8" height="30" rx="3" fill="#9E2A22" />
            <rect x="10" y="21" width="30" height="8" rx="3" fill="#9E2A22" />
            <circle cx="25" cy="25" r="4" fill="#E6B325" />
          </svg>
        </div>
        <h2>Admin Portal</h2>
        <p>Login to manage Maurya Hospital clinical resources</p>

        {error && (
          <div 
            style={{ 
              padding: '10px 12px', 
              borderRadius: '6px', 
              backgroundColor: '#ffebee', 
              color: '#c62828',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '20px',
              border: '1px solid #ffcdd2'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', borderRadius: '8px' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
