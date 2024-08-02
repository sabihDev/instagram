// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 200 range
            throw error;
        } else if (error.request) {
            // Request was made but no response was received
            throw new Error('Network error. Please try again later.');
        } else {
            // Something else caused an error
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 200 range
            throw error;
        } else if (error.request) {
            // Request was made but no response was received
            throw new Error('Network error. Please try again later.');
        } else {
            // Something else caused an error
            throw new Error('An unexpected error occurred.');
        }
    }
};
