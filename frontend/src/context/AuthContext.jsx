import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginService, register as registerService, getCurrentUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await getCurrentUser();
                setUser(response.data.user);
            } catch (err) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const response = await loginService({ email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            return { success: true };
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Login failed';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        }
    };

    const register = async (name, email, password) => {
        try {
            setError(null);
            const response = await registerService({ name, email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            return { success: true };
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Registration failed';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
