import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="login-container">
            <div className="login-toggle">
                <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
                <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Sign Up</button>
            </div>
            {isLogin ? (
                <form className="login-form">
                    <h2>Login</h2>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <form className="signup-form">
                    <h2>Sign Up</h2>
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Sign Up</button>
                </form>
            )}
        </div>
    );
};

export default Login;
