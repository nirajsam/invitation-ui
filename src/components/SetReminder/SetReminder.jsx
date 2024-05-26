import React, { useState } from 'react';
import './SetReminder.css'; // Import CSS for styling
import cfg from '../../config'
var URL=cfg.URL

const SetReminder = ({ targetDate, onClose , content}) => {
  const [email, setEmail] = useState('');
  const [daysBefore, setDaysBefore] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reminderDate = new Date(targetDate);
    reminderDate.setDate(reminderDate.getDate() - parseInt(daysBefore));

    // Here you can send the reminderDate and email to your backend to handle email scheduling
    const response = await fetch(`${URL}api/set-reminder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, reminderDate }),
    });

    const result = await response.json();
    if (result.success) {
      alert('Reminder set successfully!');
      onClose();
    } else {
      alert('Failed to set reminder. Please try again.');
    }
  };

  return (
    <div className="set-reminder-overlay">
      <div className="set-reminder-popup">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{content.setReminder}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{content.email}:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="daysBefore">{content.daysBeforeWedding}:</label>
            <input
              type="number"
              id="daysBefore"
              value={daysBefore}
              onChange={(e) => setDaysBefore(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={{backgroundColor:'green', color:'white',borderRadius:'10px'}} >Set Reminder</button>
        </form>
      </div>
    </div>
  );
};

export default SetReminder;
