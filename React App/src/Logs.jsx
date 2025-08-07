import React, { useState } from 'react';
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

  return (
    <div className="logs-bg">
      <div className="logs-container">
        {/* Header and Breadcrumb */}
        <div className="logs-header-section">
          <div className="logs-header-row">
            <h1 className="logs-title">Logs</h1>
            <span className="logs-breadcrumb">Home &gt; Logs</span>
          </div>
          <div className="logs-header-line" />
        </div>
        {/* Form Section */}
        <div className="logs-form-section">
          <div className="logs-form-title-row">
            <h2 className="logs-form-title">Add New Log</h2>
          </div>
          <form onSubmit={handleSubmit} className="logs-form">
            <div className="logs-form-row">
              <div className="logs-form-group">
                <label>Item Name</label>
                <input name="itemName" value={form.itemName} onChange={handleChange} required />
              </div>
              <div className="logs-form-group">
                <label>Category</label>
                <input name="category" value={form.category} onChange={handleChange} required />
              </div>
              <div className="logs-form-group">
                <label>Quantity</label>
                <input name="quantity" value={form.quantity} onChange={handleChange} type="number" min="0" required />
              </div>
              <div className="logs-form-group">
                <label>Unit</label>
                <input name="unit" value={form.unit} onChange={handleChange} required />
              </div>
              <div className="logs-form-group">
                <label>Reason</label>
                <input name="reason" value={form.reason} onChange={handleChange} required />
              </div>
              <div className="logs-form-group">
                <label>Wasted Date</label>
                <input name="wastedDate" value={form.wastedDate} onChange={handleChange} type="date" required />
              </div>
            </div>
            <div className="logs-form-btn-row">
              <button type="submit" className="logs-submit-btn">Submit</button>
            </div>
          </form>
          <div className="logs-form-line" />
          {/* Logs List */}
          <div className="logs-list-section">
            <h3 className="logs-list-title">Logs List</h3>
            <div className="logs-list-table-wrapper">
              <table className="logs-list-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Reason</th>
                    <th>Wasted Date</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="logs-list-empty">No logs yet.</td>
                    </tr>
                  ) : (
                    logs.map(log => (
                      <tr key={log.id}>
                        <td>{log.itemName}</td>
                        <td>{log.category}</td>
                        <td>{log.quantity}</td>
                        <td>{log.unit}</td>
                        <td>{log.reason}</td>
                        <td>{log.wastedDate}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;