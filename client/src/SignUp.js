import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

function SignUp({ switchToLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            setMessage('Password must be at least 8 characters long and contain at least one letter, one number, and one special character.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/auth/signup', { username, password });
            setMessage(response.data.message);
            setTimeout(() => {
                switchToLogin();
            }, 2000);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error signing up');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Sign Up</h2>
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
                <button type="submit">Sign Up</button>
                <p>Already have an account? <a href="#" onClick={switchToLogin}>Log in</a></p>
                {message && <div className="message">{message}</div>}
            </form>
        </div>
    );
}

export default SignUp;