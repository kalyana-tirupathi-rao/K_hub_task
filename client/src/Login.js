import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ setToken, switchToSignUp }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', { username, password });
            setMessage('Login successful');
            setToken(response.data.token);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error logging in');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <p>Don't have an account? <a href="#" onClick={switchToSignUp}>Sign up</a></p>
                {message && <div className="message">{message}</div>}
            </form>
        </div>
    );
}

export default Login;