import React, { useState, useEffect } from "react";
import "./EditWasteLog.css";
import axios from "axios";
import { toast } from "react-toastify";

function EditWasteLog({ log, onClose, onSave }) {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    itemName: "",
    category: "",
    quantity: "",
    unit: "",
    reason: "",
    wastedDate: ""
  });
    const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if(!loggedInUser) {
      console.log("You must log in to edit the waste log.");
      return;
    }
    setUser(loggedInUser);
    setFormData(log);
  }, [log]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
      console.error("User not logged in");
      return;
    }

    const formDataWithUser = { ...formData, user: user };
    console.log("Submitting log with data:", formDataWithUser);

    try{
      const response = await axios.put("http://localhost:8080/food_waste_logs/updateFoodWasteItem", formDataWithUser);
      setLogs([...logs, { ...formData, id: response.data.id }]);
      onSave(formDataWithUser);
      toast.success("Log updated successfully!", {
        className: "my-success-toast"
      });
    } catch (error) {
      console.error("Error updating waste log:", error);
    }
    
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Waste Log</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <label>
            ID:
            <input type="text" name="id" value={formData.id} readOnly />
          </label>
          <label>
            Item Name:
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="edit-waste-form-input edit-waste-form-select"
              required
            >
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains & Bakery">Grains & Bakery</option>
              <option value="Dairy & Eggs">Dairy & Eggs</option>
              <option value="Cooked / Leftovers">Cooked / Leftovers</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Unit:
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Reason:
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            />
          </label>
          <label>
            Wasted Date:
            <input
              type="date"
              name="wastedDate"
              value={formData.wastedDate}
              onChange={handleChange}
              required
            />
          </label>
          <div className="modal-buttons">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditWasteLog;
