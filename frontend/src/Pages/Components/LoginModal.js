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
        <hr />
        <div className="modal-content">
          <div className="modal-row">
            <input placeholder='Email'></input>
          </div>
          <div className="modal-row">
            <input placeholder='Password'></input>
          </div>
          <br />
          <div className="modal-row">
            <button className='login-button' onKeyDown={handleKeyDown} onClick={() => { onSave(); onClose(); }}>Login</button>
          </div>
          <div className="modal-row">
            <p>Forgot your password? | Create an account</p>
          </div>
        </div>
        <footer className="modal-footer">
        </footer>
      </div>
    </div>
  );
}

export default LoginModal;
