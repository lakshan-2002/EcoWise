import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './WasteChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function WasteChart() {
  const wasteData = [
    { category: 'Fruits', amount: 4.5, percentage: 31, color: '#3B33DD' },
    { category: 'Vegetables', amount: 3.2, percentage: 22, color: '#E23670' },
    { category: 'Grains & Bakery', amount: 2.8, percentage: 19, color: '#E88C30' },
    { category: 'Cooked / Leftovers', amount: 2.1, percentage: 14, color: '#B6B919' },
  ];

  const data = {
    labels: wasteData.map(item => item.category),
    datasets: [
      {
        data: wasteData.map(item => item.amount),
        backgroundColor: wasteData.map(item => item.color),
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
        <button className="see-all-btn">See All</button>
      </div>
      <div className="chart-container">
        <div className="chart-wrapper">
          <div className="pie-chart">
            <Doughnut data={data} options={options} width={200} height={200} />
          </div>
        </div>
        <div className="chart-legend">
          {wasteData.map((item, index) => (
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