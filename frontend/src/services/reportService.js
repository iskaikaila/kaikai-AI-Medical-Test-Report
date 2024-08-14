import axios from 'axios';

const API_URL = '/api/reports/';

export const createReport = async (title, content) => {
    const token = localStorage.getItem('token');
    return await axios.post(API_URL, { title, content }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getReports = async () => {
    const token = localStorage.getItem('token');
    return await axios.get(API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};
