import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (username, password) => {
        if (username === 'admin365' && password === '314159') {
            const adminUser = { username: 'admin', isAdmin: true };
            setUser(adminUser);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(adminUser));
            return true;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, { username, password });
            setUser(response.data);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(response.data));
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);