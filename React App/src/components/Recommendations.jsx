import React from 'react';
import { useState } from 'react';
import './Recommendations.css';
import { useNavigate } from 'react-router-dom';

function Recommendations() {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 1,
      text: "Plan your meals ahead and buy only what you need.",
      priority: "High"
    },
    {
      id: 2,
      text: "Store your food properly using airtight containers and keep perishable items visible",
      priority: "Medium"
    },
    {
      id: 3,
      text: "Get creative with leftovers by turning them into new meals",
      priority: "Low"
    },
    
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

  return (
    <div className="recommendations-card">
      <div className="recommendations-header">
        <h3>Recommendations Just for You</h3>
        <button 
          className="see-all-btn" 
          onClick={() => navigate('/recommendations')}>
            See All
        </button>
      </div>
      
      <div className="recommendations-list">
        {recommendations.map((rec) => (
          <div key={rec.id} className="recommendation-item">
            <div className="recommendation-content">
              <span className="recommendation-text">{rec.text}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
      
      <div className="recommendations-footer">
        <p className="disclaimer">*Based on your recent data</p>
      </div>
    </div>
  );
}

export default Recommendations; 