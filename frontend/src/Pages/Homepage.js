import React from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import
import '../Css/Homepage.css';
import LoginModal from './Components/LoginModal';

const Homepage = () => {
  const navigate = useNavigate();  // Updated usage

  const navigateToLogin = () => {
    navigate('/login');  // This replaces history.push('/login')
  };

  const doLogin = () => {
    navigate('/dashboard');
  }

  const [showLoginModal, setLoginModal] = React.useState(false);
  const openLoginModal = () => { setLoginModal(true); }
  const closeLoginModal = () => { setLoginModal(false); }

  return (
    <div className='home-page'>
      <LoginModal isOpen={showLoginModal} onSave={doLogin} onClose={closeLoginModal} />
      <div className='welcome'>
        <h1>Welcome to Our Website</h1>
        <p>The integration of ontology-driven methodologies with Principal Component Analysis (PCA) 
          can significantly enhance ESG metric interpretation and risk assessment. The Eurofidai ESG dataset, 
          containing 105 raw risk data metrics across global companies, provides an ideal 
          dataset for this study. The primary objective of this project is to develop an ontology-enhanced 
          PCA model that improves data structuring, dimensionality reduction, and 
          interpretability in ESG analysis. This project aligns with the ontology-driven architecture 
          proposed by Yu, Rabhi, & Bandara (2024), which emphasizes semantic standardization and structured ESG knowledge 
          representation. Through this study, students will gain hands-on experience with machine learning, 
          ontology engineering, and sustainability analytics.</p>
        <button className='login-button' onClick={openLoginModal}>Login</button>
      </div>
    </div>
  );
};

export default Homepage;