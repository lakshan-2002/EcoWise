import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WasteTable.css';
import EditWasteLog from './EditWasteLog'; 
import axios from 'axios';  
import { toast } from 'react-toastify';


function WasteTable() {
  const navigate = useNavigate();
  const [wasteLogs, setWasteLogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedLog, setSelectedLog] = useState(null);

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

    const handleEdit = (log) => {
      setSelectedLog(log);
    };

    const handleDelete = async (id) => {
      try {
        if (window.confirm("Are you sure you want to delete this log?")) {
          await axios.delete(`http://localhost:8080/food_waste_logs/deleteFoodWasteItem/${id}`);
          setWasteLogs(wasteLogs.filter(log => log.id !== id));
          toast.success("Log deleted successfully", {
            className: "my-success-toast"
          });
        }
      } catch (error) {
        console.error("Error deleting waste log:", error);
        toast.error("Error deleting waste log", {
          className: "my-error-toast"
        });
      }
    };

    const handleClose = () => {
      setSelectedLog(null);
    };

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
            {wasteLogs.slice(0, visibleCount).map((log) => (
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
                    <button className="edit-btn" onClick={() => handleEdit(log)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(log.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleCount < wasteLogs.length && (
          <div style={{ textAlign: "right" }}>
            <span
              style={{ color: "white", cursor: "pointer" }}
              onClick={() => setVisibleCount(wasteLogs.length)}
            >
              View More
            </span>
          </div>
        )}
      </div>
      {selectedLog && (
        <EditWasteLog
          log={selectedLog}
          onClose={handleClose}
          onSave={(data) => {
          console.log("Saved:", data);
          handleClose();
        }}
      />
      )}
    </div>
  );
}

export default WasteTable; 