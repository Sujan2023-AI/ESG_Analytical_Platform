import React from 'react';
import '../../Css/AppHeader.css';
import UserPopup from './UserPopup';
import { useNavigate } from "react-router-dom";

function AppHeader() {
  const navigate = useNavigate();

  const [showUserPopup, setShowUserPopup] = React.useState(false);
  const openUserPopup = () => { setShowUserPopup(true); }
  const closeUserPopup = () => { setShowUserPopup(false); }

  // Get the user's industry and name from localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));
  const industry = userData ? userData.industry : 'Industry';
  const name = userData ? userData.name : 'User';

  // Function to get the initials from the user's name
  const getInitials = (name) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
  };

  const userInitials = getInitials(name);

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
          <p>{industry}</p>
        </div>
        <button id="testId2" className="User" onClick={openUserPopup}>
          {userInitials}
        </button>
        <UserPopup isOpen={showUserPopup} onClose={closeUserPopup} />
      </div>
    </div>
  );
}

export default AppHeader;