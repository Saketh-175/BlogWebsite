import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/signin', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error);
            throw new Error('Login failed');
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
