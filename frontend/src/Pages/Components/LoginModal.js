import '../../Css/Modal.css';
import React from 'react';



function LoginModal ({ isOpen, onSave, onClose }) {
  if (!isOpen) { return (<></>); }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSave();
    }
  }
  
  return (
    <div className="modal">
      <div className="modal-container">
        <header className="modal-header">
          <span onClick={onClose} className="exit-button display-top-right">&times;</span>
          <h2>Login</h2>
        </header>
        <div className="modal-content">
          Please enter your usename and password
        </div>
        <footer className="modal-footer">
          <button className='save-button' onKeyDown={handleKeyDown} onClick={() => { onSave(); onClose(); }}>Save</button>
        </footer>
      </div>
    </div>
  );
}

export default LoginModal;
