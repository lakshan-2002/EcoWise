import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import myProfile from './assets/myProfile.png';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import Sidebar from './components/Sidebar';
import './Analytics.css';
import axios from 'axios';
import { toast } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Analytics() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [wasteLogs, setWasteLogs] = useState([]);

  const unitToKgMap = {
    g: 0.001,
    mg: 0.000001,
    kg: 1,

    l: 1,
    ml: 0.001,

    pcs: 0.15,     // average fruit/veg piece weight
    bunches: 0.5,  // average bunch weight (like bananas or greens)
    slices: 0.03,  // average slice (bread/fruit)
  };

  function convertToKg(quantity, unit) {
    const conversionRate = unitToKgMap[unit.toLowerCase()] || 1;
    return quantity * conversionRate;
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    console.log('Logged in user:', loggedInUser);
    if (!loggedInUser) {
      toast.error("You must be logged in to view waste logs", {
      className: "my-error-toast"
     });
    }

  const fetchWasteLogs = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`http://localhost:8080/food_waste_logs/getFoodWasteItemsByUserId/${loggedInUser.id}`);

      const convertedData = response.data.map(item => ({
        ...item,
        quantityInKg: convertToKg(item.quantity, item.unit)
      }));
      setWasteLogs(convertedData);
    

    } catch (error) {
      console.error("Error fetching waste logs:", error);
      toast.error("Error fetching waste logs", {
      className: "my-error-toast"
      });
    }
  };

  fetchWasteLogs();
  }, []);


  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    // Simulate logout process
    console.log('Logging out...');
    alert('Logged out successfully!');
    navigate('/login');
  };

  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);

  useEffect(() => {
    if (wasteLogs.length === 0) return;

    const categories = [
      "Fruits",
      "Vegetables",
      "Grains & Bakery",
      "Cooked / Leftovers",
      "Dairy & Eggs",
      "Other"
    ];

    const categoryColors = [
      '#3B33DD', // Fruits
      '#E23670', // Vegetables
      '#B6B919', // Grains
      '#E88C30', // Cooked
      '#AF57DB', // Dairy
      '#2EB88A', // Other
    ];

    // Sum waste per category in kg
    const totals = Object.fromEntries(categories.map(c => [c, 0]));

    wasteLogs.forEach(item => {
      const cat = categories.includes(item.category) ? item.category : "Other";
      totals[cat] += item.quantityInKg;
    });

    const totalsArray = categories.map(c => totals[c]);
    const totalWaste = totalsArray.reduce((sum, val) => sum + val, 0).toFixed(2);
    const percentages = totalsArray.map(val => ((val / totalWaste) * 100).toFixed(2));

    setPieData({
      labels: categories,
      datasets: [
        {
          data: percentages,
          backgroundColor: categoryColors,
          borderWidth: 0,
        },
      ],
    });

    setBarData({
      labels: categories,
      datasets: [
        {
          label: 'Amount wasted per month (kg)',
          data: totalsArray.map(val => val.toFixed(2)),
          backgroundColor: categoryColors,
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    });
  }, [wasteLogs]);

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
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
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
                  {pieData && <Pie data={pieData} options={pieOptions} />}
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
                  {barData && <Bar data={barData} options={barOptions} />}
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
