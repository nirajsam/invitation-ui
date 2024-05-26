// import React from 'react';
import React, { useState } from 'react';
import './CoupleDetail.css'; // Import CSS file for styling
import KnowMoreModal from './KnowMoreModal';

const CounpleDetail = ({content}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentData, setContent] = useState("");

  const openModal = (data) => {
    setIsOpen(true);
    setContent(data)
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
    <div><b>{content.theCoupleLabel}</b></div>
    <div className="couple-card-container">
      <div className="card groom-card">
        <div className="avatar-container">
          <img className="avatar" src={content.groomImage}  alt="Groom" />
        </div>
        <div className="details">
          <h2>{content.groomDetails.Name}</h2>
          <p>{content.groomDetails.Father} & {content.groomDetails.Mother}</p>
          <p>{content.groomDetails.DOB}</p>
          <p>{content.groomDetails.address}</p>
          <p onClick={()=>{return openModal(content.groom)}} className='knowMore' >know more...</p>
        </div>
      </div>
      <div className="card bride-card">
        <div className="avatar-container">
          <img className="avatar"  src={content.brideImage} alt="Bride" />
        </div>
        <div className="details">
          <h2>{content.brideDetails.Name}</h2>
          <p>{content.brideDetails.Father}& {content.brideDetails.Mother}</p>
          <p>{content.brideDetails.DOB}</p>
          <p>{content.brideDetails.address}</p>
          <p onClick={()=>{return openModal(content.bride)}} className='knowMore'>know more...</p>
        </div>
      </div>
      <div><KnowMoreModal content={contentData} CoupleDetails={content} isOpen={isOpen} onClose={closeModal}/></div>
    </div>
    {true? <button onClick={()=>{return openModal(content.couple)}}style={{backgroundColor:'grey', color:'white',borderRadius:'10px'}}  >together..💕</button>:''}
    </>
  );
};

export default CounpleDetail;
