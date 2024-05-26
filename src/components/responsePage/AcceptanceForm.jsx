import React, { useState } from 'react';
import axios from 'axios';
import './AcceptanceForm.css'

const PopupForm = ({ content, onClose, guestDetail }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [numberOfMembers, setNumberOfMembers] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDateChange = (date) => {
    const index = selectedDates.indexOf(date);
    if (index === -1) {
      setSelectedDates([...selectedDates, date]);
    } else {
      const updatedDates = selectedDates.filter((d) => d !== date);
      setSelectedDates(updatedDates);
    }
  };

  const handleNumberOfMembersChange = (e) => {
    setNumberOfMembers(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    console.log("sam",{name: guestDetail[0], address: guestDetail[1], familyType: guestDetail[2], availabilityDates: selectedDates, memberCount: numberOfMembers})
    // Validation
    if (numberOfMembers && (isNaN(numberOfMembers) || numberOfMembers < 0 || numberOfMembers > 15)) {
      setErrorMessage('Number of members must be between 0 and 15');
      return;
    }

    try {
      // API call to submit form details
      await axios.post('http://localhost:5001/api/guestDetail', {name: guestDetail[0], address: guestDetail[1], familyType: guestDetail[2],acceptOrDecline:"accepted", availabilityDates: selectedDates, memberCount: numberOfMembers});
      // Close popup after successful submission
      onClose();
      window.alert("thank you for your response, we will try our best to serve you better")
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h4>{content.headingDesc}</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label dates'>{content.dateSelectLabel}:</label><br />
            {content.dates.map((date) => (
              <span key={date}>
                <input type="checkbox" id={date} name={date} onChange={() => handleDateChange(date)} />
                <label htmlFor={date}>{date}</label>&nbsp;&nbsp;
              </span>
            ))}
          </div><br />
          <div>
            <label className='label'>{content.numberOfMembersLabel}:</label><br />
            <input style={{width:'100%'}} type="number" value={numberOfMembers} onChange={handleNumberOfMembersChange} />
          </div>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <div className="buttons">
            <button type="submit" style={{backgroundColor:'green', color:'white',borderRadius:'10px'}}>{content.submitButton}</button>
            <button type="button" style={{backgroundColor:'grey', color:'white',borderRadius:'10px'}} onClick={onClose}>{content.cancelButton}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
