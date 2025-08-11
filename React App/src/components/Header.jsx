import React from 'react';
import './Header.css';

function Header({ onMenuClick }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button className="menu-btn" onClick={onMenuClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          
          <div className="separator"></div>
          
          <nav className="breadcrumb">
            <ol className="breadcrumb-list">
              <li className="breadcrumb-item">
                <a href="#dashboard" className="breadcrumb-link active">
                  Dashboard
                </a>
              </li>
              <li className="breadcrumb-separator">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 