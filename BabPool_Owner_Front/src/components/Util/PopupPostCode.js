import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import DaumPostcode from "react-daum-postcode";


const PopupPostCode = (props) => {
  const [visible, setVisible] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        props.setPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props]);
  
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        props.setAddress(fullAddress);
    }

    const postCodeStyle = {
      display: "block",
      position: "absolute",
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      width: "50%",
      height: "50%",
      border: "2px solid #666",
      backgroundColor: "#fff", 
      zIndex: 9999,  
      opacity: 1,  
    };
 
      return (
      <div ref={popupRef}>
        <DaumPostcode onComplete={handlePostCode} style={postCodeStyle} height={700} />
      </div>
      );
      
}
 
export default PopupPostCode;