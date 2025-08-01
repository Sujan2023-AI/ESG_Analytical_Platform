import '../../Css/Modal.css';
import React, {useState} from 'react';

function LoginModal ({ isOpen, onSave, onClose }) {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // return nothing if modal shouldn't be open
    if (!isOpen) { return (<></>); }

    // if valid credentials have been given, close modal and try to login
    const handleLogin = () => {
        if (email && password){
            onSave(email, password);
            onClose();
        }
        else {
            alert("please enter both email and passowrd");
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
                        <input placeholder='Email' type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div className="modal-row">
                        <input placeholder='Password' type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <br />
                    <div className="modal-row">
                        <button className='login-button' onClick={handleLogin}>Login</button>
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