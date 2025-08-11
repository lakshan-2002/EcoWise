import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myProfile from './assets/myProfile.png';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import Sidebar from './components/Sidebar';
import './Analytics.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Analytics() {
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

  // Pie chart data for food categories
  const pieData = {
    labels: ['Fruits', 'Vegetables', 'Grains & Bakery', 'Cooked / Leftovers', 'Dairy & Eggs', 'Other'],
    datasets: [
      {
        data: [31, 19, 22, 14, 4, 10],
        backgroundColor: [
          '#3B33DD', // Blue
          '#E23670', // Red
          '#B6B919', // Yellow
          '#E88C30', // Orange
          '#AF57DB', // Purple
          '#2EB88A', // Green
        ],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      }
    }
  };

  // Bar chart data for waste amounts
  const barData = {
    labels: ['Fruits', 'Vegetables', 'Grains & Bakery', 'Cooked / Leftovers', 'Dairy & Eggs', 'Other'],
    datasets: [
      {
        label: 'Amount wasted per month (kg)',
        data: [10.85, 7.7, 4.9, 6.65, 1.4, 3.5],
        backgroundColor: [
          '#3B33DD',
          '#E23670', 
          '#B6B919',
          '#E88C30',
          '#AF57DB',
          '#2EB88A',
        ],
        borderWidth: 0,
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#27272A',
        },
        ticks: {
          color: '#FFFFFF',
        },
      },
      x: {
        grid: {
          color: '#27272A',
        },
        ticks: {
          color: '#FFFFFF',
        },
      },
    },
  };

  return (
    <div className="analytics">
      <Sidebar collapsed={sidebarCollapsed} onLogout={handleLogout} />
      <div className="main-content">
        <div className="analytics-header">
          <div className="header-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="6" width="18" height="2"/>
                <rect x="3" y="12" width="18" height="2"/>
                <rect x="3" y="18" width="18" height="2"/>
              </svg>
            </button>
            <div className="separator"></div>
            <div className="breadcrumb">
              <span className="breadcrumb-item">Analytics</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
          <div className="header-right">
            <button className="download-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
            <button className="filter-btn">
              <span>Filter</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="analytics-content">
          <h1 className="analytics-title">Analytics</h1>
          <div className="analytics-profile-dropdown">
            <img src={myProfile} alt="profile" className='analytics-profile-img'/>
          </div>
          <div className="charts-container">
            <div className="chart-section">
              <div className="pie-chart-container">
                <div className="pie-chart">
                  <Pie data={pieData} options={pieOptions} />
                  <div className="chart-center-text">
                  </div>
                </div>
                
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#3B33DD' }}></div>
                    <span>Fruits</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#E23670' }}></div>
                    <span>Vegetables</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#B6B919' }}></div>
                    <span>Grains & Bakery</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#E88C30' }}></div>
                    <span>Cooked / Leftovers</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#AF57DB' }}></div>
                    <span>Dairy & Eggs</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#2EB88A' }}></div>
                    <span>Other</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bar-chart-section">
              <div className="bar-chart-container">
                <h3 className="chart-title">Food categories</h3>
                <div className="bar-chart">
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
