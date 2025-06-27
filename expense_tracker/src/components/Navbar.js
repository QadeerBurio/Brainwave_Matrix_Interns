import React from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={navStyle}>
      <div style={brandStyle}>💼 Expense Tracker</div>
      {user && (
        <div style={rightSide}>
          <span style={welcomeText}>👋 Welcome, {user.name || 'User'}</span>
        </div>
      )}
    </nav>
  );
}

const navStyle = {
  background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  borderRadius: '12px',
  marginBottom: '20px',
  color: '#fff',
  fontFamily: 'Segoe UI, sans-serif'
};

const brandStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  letterSpacing: '1px'
};

const rightSide = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
};

const welcomeText = {
  fontSize: '1rem',
  color: '#fff',
  fontWeight: 500
};

const logoutBtn = {
  padding: '8px 16px',
  background: '#ff4d4f',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background 0.3s'
};

export default Navbar;
