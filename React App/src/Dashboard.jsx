import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import myProfile from './assets/myProfile.png';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewCards from './components/OverviewCards';
import WasteChart from './components/WasteChart';
import Recommendations from './components/Recommendations';
import WasteTable from './components/WasteTable';
import axios from 'axios';
import { toast } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [wasteLogs, setWasteLogs] = useState([]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    // Simulate logout process
    console.log('Logging out...');
    alert('Logged out successfully!');
    navigate('/login');
  };

  useEffect(() => {
      const loggedInUser = localStorage.getItem('user');
      if(!loggedInUser){
        console.log('No user logged in');
        toast.error("You must be logged in to view recommendations", {
          className: "my-error-toast"
        });
      }
  
      const fetchRecommendations = async () => {
        try{
          const loggedInUser = JSON.parse(localStorage.getItem('user'));
          const response = await axios.get(`http://localhost:8080/recommendations/getRecommendationsByUserId/${loggedInUser.id}`);
          setRecommendations(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
          toast.error("Error fetching recommendations", {
            className: "my-error-toast"
          });
        }
      };
  
      fetchRecommendations();
    }, []);


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
        setWasteLogs(response.data);
      } catch (error) {
        console.error("Error fetching waste logs:", error);
        toast.error("Error fetching waste logs", {
          className: "my-error-toast"
        });
      }
    };

    fetchWasteLogs();
    }, []);

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
                  <img src={myProfile} alt="profile" className='dashboard-profile-img'/>
                </div>
              </div>
            </div>
          </div>

          <OverviewCards />
          
          <div className="charts-section">
            <WasteChart />
            <Recommendations recommendationsData={recommendations} />
          </div>

          <div className="table-section">
            <div className="section-header">
              <h2>Recent Waste Logs</h2>
            </div>
            <WasteTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 