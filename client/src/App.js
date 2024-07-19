import React, { useState } from 'react';
import './App.css';
import SignUp from './SignUp';
import Login from './Login';
import Notebook from './Notebook';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showLogin, setShowLogin] = useState(true);

  const handleSetToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  };

  if (!token) {
    return (
      <div>
        {showLogin ? (
          <Login setToken={handleSetToken} switchToSignUp={() => setShowLogin(false)} />
        ) : (
          <SignUp switchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    );
  }

  return <Notebook token={token} setToken={handleSetToken} />;
}

export default App;