import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import './WasteChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function WasteChart({topFourWasteItems = []}) {
  const navigate = useNavigate();

  const data = {
    labels: topFourWasteItems.map(item => item.category),
    datasets: [
      {
        data: topFourWasteItems.map(item => item.amount),
        backgroundColor: topFourWasteItems.map(item => item.color),
        borderWidth: 2,
        borderColor: '#27272A',
      },
    ],
  };

  const options = {
    responsive: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="waste-chart-card">
      <div className="chart-header">
        <h3>Top Food Categories Wasted</h3>
        <button 
          className="see-all-btn"
          onClick={() => navigate('/analytics')}>
            See All
        </button>
      </div>
      <div className="chart-container">
        <div className="chart-wrapper">
          <div className="pie-chart">
            <Doughnut data={data} options={options} width={200} height={200} />
          </div>
        </div>
        <div className="chart-legend">
          {topFourWasteItems.map((item, index) => (
            <div key={index} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: item.color }}></div>
              <span className="legend-category">{item.category}</span>
              <span className="legend-amount">{item.amount}kg/month</span>
              <span className="legend-percentage">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WasteChart;