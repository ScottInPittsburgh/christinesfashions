import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import './styles.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/register`, { username, password });
                alert('User registered successfully. Please log in.');
                setIsRegistering(false);
            } else {
                const success = await login(username, password);
                if (success) {
                    if (username === 'admin365' && password === '314159') {
                        navigate('/admin');
                    } else {
                        const from = location.state?.from || '/';
                        navigate(from);
                    }
                } else {
                    alert('Invalid credentials. Please try again or create an account.');
                }
            }
        } catch (error) {
            console.error('Login/Register failed:', error);
            alert(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>{isRegistering ? 'Create Account' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Back to Login' : 'Create Account'}
            </button>
        </div>
    );
};

export default Login;