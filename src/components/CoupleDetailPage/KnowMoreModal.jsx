import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './KnowMoreModal.css'

const KnowMoreModal = ({ isOpen, onClose, content, CoupleDetails}) => {
    const [loading, setLoading] = useState(true);
    const [imageData, setImageData] = useState([]);
    const [description, setDescription] = useState([]);  
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(()=>{
        
        if(content==='Bride' || content=== 'दुल्हन'){
            setImageData(CoupleDetails?.brideDetailsMore?.imageData)
            setDescription(CoupleDetails?.brideDetailsMore?.description)
        }
        if(content==='Groom' || content==='दूल्हा'){
            setImageData(CoupleDetails?.groomDetailsMore?.imageData)
            setDescription(CoupleDetails?.groomDetailsMore?.description)
        }
        if(content==='Couple' || content==='जोड़ा'){
            setImageData(CoupleDetails?.coupleDetailsMore?.imageData)
            setDescription(CoupleDetails?.coupleDetailsMore?.description)
        }
        setLoading(false)
    },[isOpen,content])
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
        );
    };
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
        prevIndex === imageData.length - 1 ? 0 : prevIndex + 1
        );
    };
    const renderMedia = () => {
        const currentItem = imageData[currentImageIndex];
        if (currentItem?.type === 'image') {
          return <img src={currentItem?.src} alt="carousel" className='knowMoreImageOrVideo'/>;
        } else if (currentItem?.type === 'video') {
        //   return <video src={currentItem?.src} controls className='knowMoreImage' height={200} />;
        return <iframe
            className='knowMoreImageOrVideo'
            src={currentItem?.src} 
            title="YouTube Video Player"
            allowFullScreen
        />
        }
      };
    return (
    <div className='know-more-modal'>
    <Modal
      isOpen={isOpen}
    //   onRequestClose={close}
      contentLabel="Image Modal"
      ariaHideApp={false}
    >
      <button className="close-btn" onClick={onClose} >X</button>
      {loading? <p>loading....</p>:<>
      <h3>{content}</h3>
      <div>
        {/* <img src={imageData[currentImageIndex]?.src} alt="carousel" className='knowMoreImage' height={200} /> */}
        {renderMedia()}
        <div className='prevNextBtn'>
            <button onClick={prevImage} className='corousel-btn'>{CoupleDetails.prevButton}</button>&nbsp;
            <button onClick={nextImage} className='corousel-btn'>{CoupleDetails.nextButton}</button>
        </div>
        
      </div>
      <p>{imageData[currentImageIndex]?.description}</p>
      <div>
        {description?.map((data)=>{ return(
            <div>{data}</div>
        )})}
      </div>
      </>}
    </Modal>
    </div>
  );
};

export default KnowMoreModal;
