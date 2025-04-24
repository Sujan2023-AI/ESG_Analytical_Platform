import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import
import '../Css/Landing.css';
import LoginModal from './Components/LoginModal';

const Login = () => {
    const navigate = useNavigate();

    const [showLoginModal, setLoginModal] = useState(false);
    const openLoginModal = () => { setLoginModal(true); }
    const closeLoginModal = () => { setLoginModal(false); localStorage.setItem("currentPage", 0); }

    const resetState = () => {
        // LocalStorage data
        localStorage.setItem('currentPage', 0)
        localStorage.setItem('savedReports', JSON.stringify([]));
        localStorage.setItem('userData', JSON.stringify({}));
        localStorage.setItem('calculatedRows', JSON.stringify([]));
        localStorage.setItem('reportingYear', 2020);
    };
    resetState();

    const doLogin = (email, password) => {
        //console.log(`Attempting to authenticate with email: ${email}, password: ${password}`);  // Log the credentials being sent
        fetch('http://localhost:5001/authenticate', {
          method: 'POST',
          headers: {'Content-Type':'application/json',}, 
          body: JSON.stringify({email,password}),
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                console.log('Authentication successful:', data);
                localStorage.setItem('userData', JSON.stringify({
                    name: data.name,
                    industry: data.industry,
                    company: data.company,
                }));
                if(data.industry.toLowerCase() === 'semiconductors'){
                    navigate('/dashboard');
                }
                else if (data.industry.toLowerCase() === 'biotechnology & pharmaceuticals'){
                    navigate('/dashboard');
                }
              }
              else{
                  alert('Invalid email or password');
              }
          })
          .catch(error=> {
              console.error('Error during authentication:', error);
              alert('An error occurred. Please try again later.');
          });
    };

    return (
        <div className='home-page'>
            <LoginModal isOpen={showLoginModal} onSave={doLogin} onClose={closeLoginModal} />
            <div className='welcome'>
                <h1>Ontology Enhanced PCA Analysis on the Eurofidai Dataset</h1>
                <p>The integration of ontology-driven methodologies with Principal Component Analysis (PCA) 
                  can significantly enhance ESG metric interpretation and risk assessment. The Eurofidai ESG dataset, 
                  containing 105 raw risk data metrics across global companies, provides an ideal 
                  dataset for this study. The primary objective of this project is to develop an ontology-enhanced 
                  PCA model that improves data structuring, dimensionality reduction, and 
                  interpretability in ESG analysis. This project aligns with the ontology-driven architecture 
                  proposed by Yu, Rabhi, & Bandara (2024), which emphasizes semantic standardization and structured ESG knowledge 
                  representation. Through this study, students will gain hands-on experience with machine learning, 
                  ontology engineering, and sustainability analytics.</p>
                <p>If you would like to request access to this website and the associated dataset, please email <a href="sujan.bharadwaj@unsw.com">sujan.bharadwaj@unsw.com</a> with your use case, for approval case.</p>
                <button className='login-button' onClick={openLoginModal}>Login</button>
            </div>
        </div>
    );
};

export default Login;