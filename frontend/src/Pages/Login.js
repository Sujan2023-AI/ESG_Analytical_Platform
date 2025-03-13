import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Updated usage

  const handleLogin = async () => {
    const payload = { username, password };
    try {
      // replace `url` with your GraphDB endpoint that handles authentication
      const response = await axios.post('url', payload);
      if (response.status === 200) {
        navigate('/dashboard');  // This replaces history.push('/dashboard')
      } else {
        //alert('Login failed!');
        navigate('/dashboard');
      }
    } catch (error) {
      //alert('Login error:', error);
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
