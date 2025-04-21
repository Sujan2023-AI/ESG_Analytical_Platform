import '../../Css/Popup.css';
import React from 'react';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function UserPopup ({ isOpen, onClose }) {
  const popupRef = useRef(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    // Clear relevant data from localStorage
    localStorage.removeItem('calculatedRows');

    // Redirect to the login or home page
    navigate('/'); // This assumes '/' is your login page or home page after logout
  };

  return (
    <div ref={popupRef} className="popup">
      <div className="popup-container">
        <p>{userName}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default UserPopup;