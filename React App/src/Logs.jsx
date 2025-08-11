import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import myProfile from './assets/myProfile.png';
import './Logs.css';

const Logs = () => {
  const [form, setForm] = useState({
    itemName: '',
    category: '',
    quantity: '',
    unit: '',
    reason: '',
    wastedDate: ''
  });
  const [logs, setLogs] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogs([
      ...logs,
      { ...form, id: Date.now() }
    ]);
    setForm({
      itemName: '',
      category: '',
      quantity: '',
      unit: '',
      reason: '',
      wastedDate: ''
    });
  };

   const handleLogout = () => {
    // Simulate logout process
    console.log('Logging out...');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="logs-page">
      <Sidebar onLogout={handleLogout} />
      <div className="logs-container">
        {/* Header Section */}
        <div className="logs-header">
          <div className="logs-header-content">
            <div className="logs-header-flex">
              <div className="logs-header-button">
                <svg width="28" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="6" width="18" height="12" rx="2"/>
                  <path d="M9 12h6"/>
                </svg>
              </div>
              <div className="logs-separator"></div>
              <div className="logs-breadcrumb">
                <span className="logs-breadcrumb-item">Logs</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="logs-header-line"></div>
          <div className="logs-header-line-secondary"></div>
        </div>
        

        {/* Form Section */}
        <div className="logs-form-section">
          <div className="logs-form-header">
            <h2 className="logs-form-title">Add New Log</h2>
          </div>
          <div className="logs-profile-dropdown">
            <img src={myProfile} alt="profile" className='logs-profile-img'/>
          </div>
          <div className="logs-form-line"></div>
          
          <form onSubmit={handleSubmit} className="logs-form">
            <div className="logs-form-grid">
              <div className="logs-form-group">
                <label className="logs-form-label">Item Name</label>
                <input 
                  name="itemName" 
                  value={form.itemName} 
                  onChange={handleChange} 
                  className="logs-form-input"
                  placeholder="Item name"
                  required 
                />
              </div>
              
              <div className="logs-form-group">
                <label className="logs-form-label">Category</label>
                <div className='logs-form-select-wrapper'>
                  <select 
                    name="category" 
                    value={form.category} 
                    onChange={handleChange} 
                    className="logs-form-input logs-form-select"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Vegetable">Vegetables</option>
                    <option value="Fruit">Fruits</option>
                    <option value="Grain">Grains & Bakery</option>
                    <option value="Dairy">Dairy & Eggs</option>
                    <option value="Meat">Cooked / Leftovers</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="logs-form-group">
                <label className="logs-form-label">Quantity</label>
                <input 
                  name="quantity" 
                  value={form.quantity} 
                  onChange={handleChange} 
                  type="number" 
                  min="0"
                  className="logs-form-input"
                  placeholder="Quantity"
                  required 
                />
              </div>
              
              <div className="logs-form-group">
                <label className="logs-form-label">Unit</label>
                <input 
                  name="unit" 
                  value={form.unit} 
                  onChange={handleChange} 
                  className="logs-form-input"
                  placeholder="Unit"
                  required 
                />
              </div>
              
              <div className="logs-form-group">
                <label className="logs-form-label">Reason</label>
                <input 
                  name="reason" 
                  value={form.reason} 
                  onChange={handleChange} 
                  className="logs-form-input"
                  placeholder="Reason"
                  required 
                />
              </div>
              
              <div className="logs-form-group">
                <label className="logs-form-label">Wasted Date</label>
                <input 
                  name="wastedDate" 
                  value={form.wastedDate} 
                  onChange={handleChange} 
                  type="date"
                  className="logs-form-input"
                  placeholder="Wasted date"
                  required 
                />
              </div>
            </div>
            
            <div className="logs-form-submit">
              <button type="submit" className="logs-submit-btn">Submit</button>
            </div>
          </form>
          
          <div className="logs-form-line"></div>
    
        </div>
      </div>
    </div>
  );
};

export default Logs; 