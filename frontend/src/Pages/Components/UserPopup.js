import '../../Css/Popup.css';
import React from 'react';
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function UserPopup ({ isOpen, onClose }) {
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) { return (<></>); }
  
  return (
    <div ref={popupRef} className="popup">
      <div className="popup-container">
        <p>Sujan Bharadwaj</p>
        <button onClick={() => navigate('/')}>Logout</button>
      </div>
    </div>
  );
}

export default UserPopup;