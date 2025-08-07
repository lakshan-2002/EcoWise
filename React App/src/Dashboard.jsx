import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewCards from './components/OverviewCards';
import WasteChart from './components/WasteChart';
import Recommendations from './components/Recommendations';
import WasteTable from './components/WasteTable';

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    // Simulate logout process
    console.log('Logging out...');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <Sidebar collapsed={sidebarCollapsed} onLogout={handleLogout} />
      <div className="main-content">
        <Header onMenuClick={toggleSidebar} />
        <div className="dashboard-content">
          <div className="overview-section">
            <div className="section-header">
              <h1>Overview</h1>
              <div className="header-actions">
                <button className="search-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                  Search
                </button>
                <div className="profile-dropdown">
                  <img src="/profile-avatar.png" alt="Profile" className="profile-avatar" />
                  <svg width="12" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <OverviewCards />
          
          <div className="charts-section">
            <WasteChart />
            <Recommendations />
          </div>

          <div className="table-section">
            <div className="section-header">
              <h2>Recent Waste Logs</h2>
              <button className="see-all-btn">See All</button>
            </div>
            <WasteTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 