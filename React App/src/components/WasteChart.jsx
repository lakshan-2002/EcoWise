import React from 'react';
import './WasteChart.css';

function WasteChart() {
  const wasteData = [
    { category: 'Fruits', amount: 4.5, percentage: 31, color: '#3B33DD' },
    { category: 'Vegetables', amount: 3.2, percentage: 22, color: '#E23670' },
    { category: 'Grains & Bakery', amount: 2.8, percentage: 19, color: '#E88C30' },
    { category: 'Cooked / Leftovers', amount: 2.1, percentage: 14, color: '#B6B919' },
    { category: 'Dairy & Eggs', amount: 1.4, percentage: 10, color: '#AF57DB' },
    { category: 'Other', amount: 0.9, percentage: 4, color: '#2EB88A' }
  ];

  return (
    <div className="waste-chart-card">
      <div className="chart-header">
        <h3>Top Food Categories Wasted</h3>
        <button className="see-all-btn">See All</button>
      </div>
      
      <div className="chart-container">
        <div className="chart-wrapper">
          <div className="pie-chart">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#27272A" strokeWidth="2"/>
              
              {/* Pie chart segments */}
              <path d="M 100 100 L 180 100 A 80 80 0 0 1 100 20 Z" fill="#3B33DD"/>
              <path d="M 100 100 L 100 20 A 80 80 0 0 1 20 100 Z" fill="#E23670"/>
              <path d="M 100 100 L 20 100 A 80 80 0 0 1 100 180 Z" fill="#E88C30"/>
              <path d="M 100 100 L 100 180 A 80 80 0 0 1 180 100 Z" fill="#B6B919"/>
              <path d="M 100 100 L 180 100 A 80 80 0 0 1 100 180 Z" fill="#AF57DB"/>
              <path d="M 100 100 L 100 180 A 80 80 0 0 1 20 100 Z" fill="#2EB88A"/>
            </svg>
          </div>
        </div>
        
        <div className="chart-legend">
          {wasteData.map((item, index) => (
            <div key={index} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: item.color }}></div>
              <div className="legend-info">
                <span className="legend-category">{item.category}</span>
                <span className="legend-amount">{item.amount}kg/month</span>
              </div>
              <span className="legend-percentage">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WasteChart; 