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
  const [wasteData, setWasteData] = useState([]);
  const [topFourWasteItems, setTopFourWasteItems] = useState([]);
  const [totalWaste, setTotalWaste] = useState([]);
  const [mostWastedCategory, setMostWastedCategory] = useState([]);
  const [wasteLogs, setWasteLogs] = useState([]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('user');
    navigate('/login');
  };

   useEffect(() => {
      const loggedInUser = localStorage.getItem('user');
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

  // Fetch recommendations when the component mounts
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
          
        } catch (error) {
          console.error("Error fetching recommendations:", error);
          toast.error("Error fetching recommendations", {
            className: "my-error-toast"
          });
        }
      };
  
      fetchRecommendations();
    }, []);

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
    const fetchWasteLogs = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`http://localhost:8080/food_waste_logs/getFoodWasteItemsByUserId/${loggedInUser.id}`);

      const convertedData = response.data.map(item => ({
        ...item,
        quantityInKg: convertToKg(item.quantity, item.unit)
      }));
      setWasteData(convertedData);


    } catch (error) {
      console.error("Error fetching waste logs:", error);
      toast.error("Error fetching waste logs", {
      className: "my-error-toast"
      });
    }
  };

  fetchWasteLogs();
  }, []);

  useEffect(() => {
      if (wasteData.length === 0) return;
  
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
  
      wasteData.forEach(item => {
        const cat = categories.includes(item.category) ? item.category : "Other";
        totals[cat] += item.quantityInKg;
      });

       let sortedData = categories.map((c, i) => ({
        category: c,
        total: totals[c],
        color: categoryColors[i]
      }));

      const wasteSum = sortedData.reduce((sum, item) => sum + item.total, 0).toFixed(2);

      // Sort by total descending
      sortedData.sort((a, b) => b.total - a.total);

      // Take top 4
      sortedData = sortedData.slice(0, 4);

      const totalsArray = sortedData.map(d => d.total);
      const totalWaste = totalsArray.reduce((sum, val) => sum + val, 0).toFixed(2);
      const percentages = totalsArray.map(val => ((val / wasteSum) * 100).toFixed(2));

      const topFourWasteItems = sortedData.map((item, index) => ({
        category: item.category,
        amount: item.total.toFixed(2),
        percentage: percentages[index],
        color: item.color
      }));

      const mostWastedCategory = sortedData[0].category;

      setTopFourWasteItems(topFourWasteItems);
      setTotalWaste(wasteSum);
      setMostWastedCategory(mostWastedCategory);
  }, [wasteData]);


  return (
    <div className="dashboard">
      <Sidebar collapsed={sidebarCollapsed} onLogout={handleLogout}/>
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

          <OverviewCards totalWaste={totalWaste} mostWastedCategory={mostWastedCategory}/>
          
          <div className="charts-section">
            <WasteChart topFourWasteItems={topFourWasteItems} />
            <Recommendations recommendationsData={recommendations} />
          </div>

          <div className="table-section">
            <div className="section-header">
              <h2>Recent Waste Logs</h2>
            </div>
            <WasteTable wasteLogs={wasteLogs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 