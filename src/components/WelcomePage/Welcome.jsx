// import React from 'react';
import React, { useState } from 'react';
import './Welcome.css'; // Import CSS file for styling
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import { scrollToTopSlowly } from '../Scroll/ScrollToTop';
import SetReminder from '../SetReminder/SetReminder';
import QRCodeComponent from '../QRCodeComponent/QRCodeComponent';

const Welcome = ({guestName,guestAddress,guestType,content}) => {
  const targetDate = new Date(content.marriageDateInDateFormat);
  const [isQROpen, setIsQROpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);

  const openReminderPopup = () => {
    setIsReminderOpen(true);
  };

  const closeReminderPopup = () => {
    setIsReminderOpen(false);
  };
  const openQRModal = () => {
    setIsQROpen(true);
  };

  const closeQRModal = () => {
    setIsQROpen(false);
  };
  return (
    <div className="welcome">
      {/* <img src="https://i.pinimg.com/236x/e0/bf/0b/e0bf0bd51a05023c9bc54e3059d5c872.jpg" height={180} alt="shubh vivah" /> */}
      <img src={content.shaadiImageTopUrl} className='topImage' alt="" />
      <h1 style={{color:'red'}}>{content.brideName}<span>{content.heartEmoji}</span> {content.groomName}</h1>
      <p><b>{content.marriageDate}</b> ({content.weekDay})</p>
      <p>{content.saveTheDate}</p>
      <CountdownTimer targetDate={targetDate} />
      <div className='reminder_QR'><p onClick={openReminderPopup} style={{ cursor: 'pointer' }}>{content?.reminderDetail?.setReminder} &nbsp;<button className='bell-icon-button'><span className='bell'>🔔</span></button></p>&nbsp;&nbsp;<button className='qr-button' onClick={openQRModal}>QR</button></div>
      <div className='invitee'>
      <p>{content.welcomeLabel}  <span style={{color:'maroon', fontSize:'16px', fontWeight:'bold'}}>{guestName || content.guestName}</span></p>
      <p>{guestAddress|| content.guestAddress|| "kala road suriya"}<span>{}</span></p>
      <p>{guestType}</p>
      </div><br />
      <button onClick={()=> {return scrollToTopSlowly(window.outerHeight, 3000)}} style={{backgroundColor:'green', color:'white',borderRadius:'10px'}} >{content.openButton}</button>
      <div className='sender_details'>
        <div className='sender'>
          {content.senderLabel}: 
          <p>{content.senderName}</p>
          <p>{content.senderAddress}</p>
          <p>{content.senderContact}</p>
        </div>
        {/* <div className='shadiImg'><img src="https://i.pinimg.com/originals/97/31/49/97314900939b33684fc741b411927284.gif" alt="" height={100} width={150} /></div> */}
        <div className='shadiImg'><img src={content.shaadiImageBottomUrl} alt="" height={100} width={150} /></div>
      </div>
      {isReminderOpen && <SetReminder targetDate={targetDate} onClose={closeReminderPopup} content={content?.reminderDetail} />}
      <QRCodeComponent guestName = {guestName} guestAddress={guestAddress} isOpen={isQROpen} onClose={closeQRModal}/>
    </div>
  );
};

export default Welcome;
