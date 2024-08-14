import axios from 'axios';

const API_URL = '/api/auth/';

export const register = async (username, password) => {
    return await axios.post(`${API_URL}register`, { username, password });
};

export const login = async (username, password) => {
    return await axios.post(`${API_URL}login`, { username, password });
};
