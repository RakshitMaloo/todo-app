import API from './api';

// Register new user
export const register = async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
};

// Login user
export const login = async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    return response.data;
};

// Get current user
export const getCurrentUser = async () => {
    const response = await API.get('/auth/me');
    return response.data;
};

// Logout user (client-side)
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};
