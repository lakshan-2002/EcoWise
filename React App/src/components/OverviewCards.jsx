import React from 'react';
import './OverviewCards.css';

function OverviewCards() {
  return (
    <div className="overview-cards">
      <div className="card total-waste">
        <div className="card-header">
          <h3>Total Waste this month</h3>
        </div>
        <div className="card-content">
          <div className="waste-amount">
            <span className="amount">35</span>
            <span className="unit">kg/month</span>
          </div>
          <div className="waste-change positive">
            <span className="change-amount">+25.66%</span>
            <span className="change-label">from last month</span>
          </div>
        </div>
      </div>

      <div className="card most-wasted">
        <div className="card-header">
          <h3>Most Wasted Food Category</h3>
        </div>
        <div className="card-content">
          <div className="category-info">
            <div className="category-name">Fruits</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewCards; 