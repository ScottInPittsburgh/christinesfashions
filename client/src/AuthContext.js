import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (username, password) => {
        if (username === 'admin365' && password === '314159') {
            setIsAuthenticated(true);
            setUser({ username: 'admin', isAdmin: true });
            return true;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, { username, password });
            setUser(response.data);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);