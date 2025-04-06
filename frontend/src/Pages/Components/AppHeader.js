import React from 'react';
import '../../Css/AppHeader.css';
import UserPopup from './UserPopup';
import { useNavigate } from "react-router-dom";

function AppHeader() {
  const navigate = useNavigate();

  const [showUserPopup, setShowUserPopup] = React.useState(false);
  const openUserPopup = () => { setShowUserPopup(true); }
  const closeUserPopup = () => { setShowUserPopup(false); }

  return (
    <div className="Header">
      <div className="Title" onClick={() => {navigate("/dashboard")}}>
        <p>Home</p>
      </div>
      <div className="Topic">
        <p>ESG Metric Management System</p>
      </div>
      <div className="Options">
        <div className="Industry">
          <p>Semiconductor</p>
        </div>
        <button id="testId2" className="User" onClick={openUserPopup}>
          Su
        </button>
        <UserPopup isOpen={showUserPopup} onClose={closeUserPopup} />
      </div>
    </div>
  );
}

export default AppHeader;