import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ collapsed, onLogout }) {
  const location = useLocation();
  const handleLogoutClick = (e) => {
    e.preventDefault();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="#84E931"/>
              <path d="M8 8h16v16H8z" stroke="#FFFFFF" strokeWidth="2"/>
              <path d="M12 12h8v8h-8z" fill="#FFFFFF"/>
            </svg>
          </div>
          {!collapsed && <span className="logo-text">EcoWise</span>}
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-menu">
          <li className={`nav-item${location.pathname === '/dashboard' ? ' active' : ''}`}>
            <Link to="/dashboard" className="nav-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              {!collapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li className={`nav-item${location.pathname === '/analytics' ? ' active' : ''}`}>
            <Link to="/analytics" className="nav-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18"/>
                <path d="m9 9 2 2 4-4"/>
              </svg>
              {!collapsed && <span>Analytics</span>}
            </Link>
          </li>
          <li className={`nav-item${location.pathname === '/logs' ? ' active' : ''}`}>
            <Link to="/logs" className="nav-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              {!collapsed && <span>Logs</span>}
            </Link>
          </li>
          <li className={`nav-item${location.pathname === '/recommendations' ? ' active' : ''}`}>
            <Link to="/recommendations" className="nav-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {!collapsed && <span>Recommendations</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item">
          <a href="#logout" className="nav-link logout" onClick={handleLogoutClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            {!collapsed && <span>Logout</span>}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 