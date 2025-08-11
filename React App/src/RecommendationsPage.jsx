import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myProfile from './assets/myProfile.png';
import './RecommendationsPage.css';
import Sidebar from './components/Sidebar';

function RecommendationsPage() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    alert('Logged out successfully!');
    navigate('/login');
  };

  const handleAddToPlan = (recommendationId) => {
    console.log(`Adding recommendation ${recommendationId} to plan`);
    alert('Added to plan successfully!');
  };

  const recommendations = [
    {
      id: 1,
      category: 'Fruits',
      message: 'Store ripe fruits in the fridge to extend their freshness and reduce spoilage',
      priority: 'High'
    },
    {
      id: 2,
      category: 'Fruits',
      message: 'Buy fruits in smaller batches more frequently to avoid overripe waste',
      priority: 'Medium'
    },
    {
      id: 3,
      category: 'Fruits',
      message: 'Freeze overripe bananas, mangoes, or berries to use later in smoothies or baking',
      priority: 'Low'
    },
    {
      id: 4,
      category: 'Vegetables',
      message: 'Chop and freeze extra vegetables before they spoil to use in future meals',
      priority: 'High'
    },
    {
      id: 5,
      category: 'Vegetables',
      message: 'Use a \'first-in, first-out\' rule in your fridge to make sure older veggies get used first',
      priority: 'Low'
    }
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Freeze overripe fruits today to prevent waste tomorrow',
      category: 'Fruits',
      priority: 'Medium'
    },
    {
      id: 2,
      title: 'Check your fridge for vegetables nearing expiry — cook or prep them now!',
      category: 'Vegetables',
      priority: 'High'
    },
    {
      id: 3,
      title: 'Plan your next three meals with what you already have at home.',
      category: 'Cooked / Leftovers',
      priority: 'Low'
    },
    {
      id: 4,
      title: 'Chop and freeze extra vegetables before they go bad to use in soups or stir-fries later.',
      category: 'Vegetables',
      priority: 'Low'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#C5371B';
      case 'Medium':
        return '#985D15';
      case 'Low':
        return '#08782D';
      default:
        return '#71717A';
    }
  };

  const filteredRecommendations = recommendations.filter(rec => 
    rec.message.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || rec.category === selectedCategory)
  );

  const categories = ['All', ...new Set(recommendations.map(rec => rec.category))];

  return (
   <div className="recommendations-page">
      <Sidebar collapsed={sidebarCollapsed} onLogout={handleLogout} />
      <div className="main-content">
        {/* Recommendations Header */}
        <div className="recommendations-page-header">
          <div className="recommendations-header-left">
            <button
              className="recommendations-sidebar-toggle"
              onClick={toggleSidebar}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="6" width="18" height="2" />
                <rect x="3" y="12" width="18" height="2" />
                <rect x="3" y="18" width="18" height="2" />
              </svg>
            </button>
            <div className="recommendations-separator"></div>
            <div className="recommendations-breadcrumb">
              <span className="recommendations-breadcrumb-item">
                Recommendations
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>

          {/* Page Title */}
          <div className="page-header">
            <h1>Recommendations</h1>
          </div>
          <div className="recommendations-profile-dropdown">
            <img src={myProfile} alt="profile" className='recommendations-profile-img'/>
            <div className='recommendations-divider'></div>
          </div>
          
          {/* Quick Actions Section */}
          <div className="quick-actions-section">
            <div className="section-header">
              <h2>Quick Actions</h2>
              <p>Easy steps you can take in the next 30 days to reduce waste.</p>
            </div>
            
            <div className="quick-actions-grid">
              {quickActions.map((action) => (
                <div key={action.id} className="quick-action-card">
                  <h3>{action.title}</h3>
                  <div className="action-details">
                    <div className="detail-row">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{action.category}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Priority:</span>
                      <div className="priority-chip" style={{ borderColor: getPriorityColor(action.priority) }}>
                        <div 
                          className="priority-dot" 
                          style={{ backgroundColor: getPriorityColor(action.priority) }}
                        ></div>
                        <span>{action.priority}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="add-to-plan-btn"
                    onClick={() => handleAddToPlan(action.id)}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add to Plan
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Main Recommendations Section */}
          <div className="recommendations-section">
            <div className="section-header">
              <div className="recommendations-page-header-left">
                <h2>All Recommendations</h2>
                <p className="description">*Based on your recent data</p>
              </div>
              <div className="header-actions">
                <div className="search-container">
                  <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <button className="filters-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
                  </svg>
                  Filters
                </button>
              </div>
            </div>

            {/* Recommendations Table */}
            <div className="recommendations-table">
              <div className="table-header">
                <div className="table-column category-column">
                  <div className="column-header">
                    <span>Category</span>
                    <svg width="12" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                <div className="table-column message-column">
                  <div className="column-header">
                    <span>Message</span>
                    <svg width="12" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                <div className="table-column priority-column">
                  <div className="column-header">
                    <span>Priority</span>
                    <svg width="12" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                <div className="table-column action-column">
                  <div className="column-header">
                    <span>Action</span>
                  </div>
                </div>
              </div>

              <div className="table-body">
                {filteredRecommendations.map((rec) => (
                  <div key={rec.id} className="table-row">
                    <div className="table-cell category-cell">
                      {rec.category}
                    </div>
                    <div className="table-cell message-cell">
                      {rec.message}
                    </div>
                    <div className="table-cell priority-cell">
                      <div className="priority-chip" style={{ borderColor: getPriorityColor(rec.priority) }}>
                        <div 
                          className="priority-dot" 
                          style={{ backgroundColor: getPriorityColor(rec.priority) }}
                        ></div>
                        <span>{rec.priority}</span>
                      </div>
                    </div>
                    <div className="table-cell action-cell">
                      <button 
                        className="add-to-plan-btn"
                        onClick={() => handleAddToPlan(rec.id)}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19"/>
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Add to Plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default RecommendationsPage;
