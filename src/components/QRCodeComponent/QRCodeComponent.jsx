import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import QRCode from 'qrcode.react';
import QrScanner from 'react-qr-scanner';
import './QRCodeComponent.css'
import cfg from '../../config'
var URL=cfg.URL

const QRCodeComponent = ({ isOpen, onClose, guestName, guestAddress }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingScan, setLoadingScan] = useState(true);
  const [isAccepted, setIsAccepted] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [scannedData, setScannedData] = useState('');
  const [recognisedGuest, setRecognisedGuest] = useState([]);
  const [attendedMemberCount, setAttendedMemberCount] = useState(1)
  const [UpdateSuccessMessage, setUpdateSuccessMessage] = useState('')
  const [UpdateErrorMessage, setUpdateErrorMessage] = useState('')
  const [constraints, setConstraints] = useState({
    video: { facingMode: { exact: 'environment' } },
  });
  const [tableData, setTableData] = useState([]);
  const [loadingGuest, setLoadingGuest] = useState(true);

  const fetchGuestDetails = async () => {
    try {
      const res = await axios.get(`${URL}/api/getGuests`);
      console.log('guest', res.data);
      setTableData(res.data);
      setLoadingGuest(false);
    } catch (error) {
      console.error('Error getting guests list:', error);
      setLoadingGuest(false); // Ensure loading state is false in case of error
    }
  };
  const handleUpdate = async (e,memberCount) => {
    e.preventDefault();
    const [scannedName, scannedAddress] = scannedData.split('_');
    setUpdateErrorMessage('');
    setUpdateSuccessMessage('')
    // Validation
    if (memberCount && (isNaN(memberCount) || memberCount < 0 || memberCount > 15)) {
        setUpdateErrorMessage('Number of members must be between 0 and 15');
      return;
    }

    try {
      // API call to submit form details
      await axios.post(`${URL}/api/guestDetail`, {name: scannedName, address: scannedAddress, attendedMemberCount: memberCount});
      // Close popup after successful submission
      setUpdateSuccessMessage("updated members arrival count")
    } catch (error) {
        setUpdateErrorMessage('Something went wrong');
    }
  };

  const handleError = (err) => {
    if (err.name === 'OverconstrainedError') {
      console.error('OverconstrainedError: ', err);
      setConstraints({
        video: { facingMode: 'user' },
      });
    } else {
      console.error(err);
    }
  };

  const handleGenerateQRCode = () => {
    setQrCodeValue(`${guestName}_${guestAddress}`);
  };

  const handleScan = (data) => {
    setLoadingScan(true); // Start loading when scan is initiated
    if (data?.text) {
      setScannedData(data.text);
    }
  };

  useEffect(() => {
    fetchGuestDetails();
  }, []);

  useEffect(() => {
    if (guestName === 'Niraj') {
      setIsAdmin(true);
    }
  }, [guestName]);

  useEffect(() => {
    if (!loadingGuest && scannedData) {
      const [scannedName, scannedAddress] = scannedData.split('_');
      
      const recognisedGuest = tableData?.filter(
        (guest) => {return guest.name === scannedName && guest.address === scannedAddress && guest.acceptOrDecline === "accepted" && !guest.attendedMemberCount}
      );
      if (recognisedGuest.length > 0) {
        setIsAccepted('yes');
        setRecognisedGuest(recognisedGuest);
      } else {
        setIsAccepted('no');
      }
      setLoadingScan(false); // End loading when scan data is processed
    }
  }, [loadingGuest, scannedData, tableData]);

  const previewStyle = {
    height: 300,
    width: 240,
  };
  const handleReset =() =>{
    setLoadingScan(true)
    setIsAccepted('')
    setScannedData('')
    setRecognisedGuest([])
    setAttendedMemberCount(1)
    setUpdateSuccessMessage('')
    setUpdateErrorMessage('')
  }
  const simulateScan = () => {
    // Simulate a scan for testing purposes
    handleScan({ text: 'tarkeshwar modi_kalar road, barki suriya' });
  };
  return (
    <Modal isOpen={isOpen} contentLabel="Image Modal" ariaHideApp={false} id={isAdmin?`qr-admin`:'qr-guest'}>
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      <div style={{ textAlign: 'center' }}>
        {!isAdmin ? (
          <div>
            <h2>Generate QR Code</h2>
            <button onClick={handleGenerateQRCode}>Generate</button>
            <br />
            <br />
            {qrCodeValue && <QRCode value={qrCodeValue} />}
          </div>
        ) : (
          <div>
            <h2>Scan QR Code</h2>
            {loadingScan ? (
              <div>
                <p>
                  <b>Scanning.....</b>
                </p>
                <QrScanner
                  delay={100}
                  style={previewStyle}
                  onError={handleError}
                  onScan={handleScan}
                  constraints={constraints}
                />
              </div>
            ) : scannedData && isAccepted === 'yes' ? (
              <div>
                <h3>Scanned Data:  <p>{scannedData}</p></h3>
                <p style={{ fontSize: '20px', color: 'green' }}>Accepted</p>
                <br />
                {recognisedGuest.map((g) => (
                  <div key={g.name}>
                    <p>Name: {g.name}</p>
                    <p>Address: {g.address}</p>
                    <p>Members: {g.memberCount}</p>
                  </div>
                ))}
                <input placeholder='member count' type="number" value={attendedMemberCount} onChange={(e)=>{return setAttendedMemberCount(e.currentTarget.value)}} /> 
                <button onClick={(e)=>{return handleUpdate(e,attendedMemberCount)}} style={{backgroundColor:'green', color:'white',borderRadius:'10px'}} >update</button>
                <p>{UpdateErrorMessage || UpdateSuccessMessage}</p>
              </div>
            ) : scannedData && isAccepted === 'no' ? (
              <p>
                Scanned data: {scannedData}, this guest's details are not found
                on our guests list
              </p>
            ) : null}
          </div>
        )}
        <button className='reset-button' onClick={handleReset} >scan again</button>
      </div><br /><br /><br />
      {/* <button onClick={simulateScan}>Simulate Scan</button> */}
    </Modal>
  );
};

export default QRCodeComponent;
