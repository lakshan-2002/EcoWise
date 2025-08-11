import React from 'react';
import './WasteTable.css';

function WasteTable() {
  const wasteLogs = [
    {
      id: 1,
      itemName: 'Apples',
      category: 'Fruits',
      quantity: 4,
      unit: 'pcs',
      reason: 'Spoiled',
      wastedDate: '2025-06-24'
    },
    {
      id: 2,
      itemName: 'Cooked Rice',
      category: 'Cooked / Leftovers',
      quantity: 250,
      unit: 'g',
      reason: 'Leftovers',
      wastedDate: '2025-06-23'
    },
    {
      id: 3,
      itemName: 'Lettuce',
      category: 'Leafy Greens',
      quantity: 7,
      unit: 'head',
      reason: 'Wilted',
      wastedDate: '2025-06-25'
    },
    {
      id: 4,
      itemName: 'Milk',
      category: 'Dairy & Eggs',
      quantity: 325,
      unit: 'ml',
      reason: 'Expired',
      wastedDate: '2025-06-18'
    },
    {
      id: 5,
      itemName: 'Bread',
      category: 'Grains & Bakery',
      quantity: 10,
      unit: 'slices',
      reason: 'Moldy',
      wastedDate: '2025-06-27'
    }
  ];

  return (
    <div className="waste-table">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Reason</th>
              <th>Wasted Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wasteLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.itemName}</td>
                <td>{log.category}</td>
                <td>{log.quantity}</td>
                <td>{log.unit}</td>
                <td>{log.reason}</td>
                <td>
                  <span className="date-chip">{log.wastedDate}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WasteTable; 