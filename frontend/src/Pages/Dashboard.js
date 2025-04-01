import React from 'react';
import '../Css/Dashboard.css';
import AppNavigator from './Components/AppNavigator';
import AppOptions from './Components/AppOptions';
import UserPopup from './Components/UserPopup';

function Dashboard() {

  const [showUserPopup, setShowUserPopup] = React.useState(false);
  const openUserPopup = () => { setShowUserPopup(true); }
  const closeUserPopup = () => { setShowUserPopup(false); }

  return (
    <div className="App">
      <div className="Header">
        <div className="Title">
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
      <div>
        <div className="content">
          <AppOptions />
        </div>
      </div>
      <AppNavigator />
    </div>
    
  );
}

export default Dashboard;