import '../../Css/Popup.css';
import React from 'react';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function UserPopup ({ isOpen, onClose }) {
  const popupRef = useRef(null);
  const navigate = useNavigate();

  let otherUserData = JSON.parse(localStorage.getItem('userData'));
  let industry = otherUserData.industry;
  let company = otherUserData.company;

  // Return nothing if popup not open
  if (!isOpen) { return (<></>); }
  
  // Add an event listener to detect outside click
  function handleClickOutside(event) {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      // When outside click, close popup and remove event listener
      onClose();
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  
  // Get the user's name from localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userName = userData ? userData.name : 'User';  // Default to 'User' if no name found

  return (
    <div ref={popupRef} className="popup">
      <div className="popup-container">
        <p><b>Username</b>:</p>
        <p>{userName}</p>
        <p><b>Industry</b>:</p>
        <p>{industry}</p>
        <p><b>Company</b>:</p>
        <p>{company}</p>
        <p>&nbsp;</p>
        <button onClick={() => navigate('/')}>Logout</button>
      </div>
    </div>
  );
}

export default UserPopup;