import axios from 'axios';
import { BE_URL } from '../utils/Url_request';
import { useState } from 'react';

// create class
export const createClass = async (classData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${BE_URL}/api-gv/class`, classData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating class:', error);
        throw error;
    }
};



