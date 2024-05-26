import React, { useState } from 'react';
import axios from 'axios';
import './CeremonyDetails.css';
import { scrollToTopSlowly } from '../Scroll/ScrollToTop';
import PopupForm from '../responsePage/AcceptanceForm';
import cfg from '../../config'
var URL=cfg.URL

const CeremonyDetails = ({ content,guestDetail }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  }; 
  const declineInvitation = async() => {
    try {
      // API call to submit form details
      await axios.post(`${URL}/api/guestDetail`, {name: guestDetail[0], address: guestDetail[1], familyType: guestDetail[2],acceptOrDecline:"declined", availabilityDates: '', memberCount: ''});
      window.alert("Thank you for your response, you can accept this anytime you want till one week before marriage")
    } catch (error) {
      console.error('Error decline invite:', error);
    }
  }
  return (
    <>
    <br />
    {showPopup && <PopupForm content={content.acceptanceForm} onClose={handleClosePopup} guestDetail={guestDetail} />}
    <div>{content.ceremonyDetailsLabel}</div>
    <div className="wedding-card">
      <div className="details-container">
        {content.cards.map((detail, index) => (
          <div key={index} className="detail" id={detail.title}>
            <h3 className='title'>{detail.title}</h3>
            <p>{detail.placeLabel}: <b ><a href={detail.locationUrl} style={{textDecoration:'none'}}>{detail.place}📍</a></b></p>
            <p>{detail.timeLabel}: <b >{detail.time}</b></p>
            <p>{detail.dresscodeLabel}: {detail.dresscode}</p>
            <p>{detail.description}</p>
          </div>
        ))}
      </div><br />
      <button onClick={handleOpenPopup} style={{backgroundColor:'green', color:'white',borderRadius:'10px'}} >{content.acceptButton}</button>&nbsp;
      <button className='decline' onClick={declineInvitation} style={{backgroundColor:'red', color:'white',borderRadius:'10px'}}>{content.declineButton}</button>&nbsp;
      <button onClick={()=> {return scrollToTopSlowly(-window.innerHeight, 2000)}} style={{backgroundColor:'grey', color:'white',borderRadius:'10px'}}>{content.closeButton}</button> 
    </div>
    <div className='creator'>created by Niraj ❤️</div>
    </>
  );
};

export default CeremonyDetails;
