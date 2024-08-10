// src/apiService.js
import axios from 'axios';
import { BE_URL } from '../utils/Url_request';
import { useState } from 'react';

// get all submitBy requestId
export const getAllSubmitReportsByRequestId = async (requestId) => {
    const token = localStorage.getItem('token'); // Lấy token nếu cần
    const response = await axios.get(`${BE_URL}/api/report/requestSubmit/${requestId}`, {
        headers: {
            'Authorization': `Bearer ${token}`, // Thêm header nếu cần
        },
    });
    return response.data;
};
// delete all submitBy requestId
export const deleteAllSubmitReportsByRequestId = async (requestId) => {
    const token = localStorage.getItem('token'); // Lấy token nếu cần
    const url = `${BE_URL}/api/report/delete/requestSubmit/${requestId}`;
          const responseDelete = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
          });
    return responseDelete.data;
};
// delete submitId
export const deleteSubmitReportsBySubmitId = async (submitId) => {
    const token = localStorage.getItem('token'); // Lấy token nếu cần
    const url = `${BE_URL}/api/report/delete/submit/${submitId}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });
    return response.data;
};
// feedback
// delete submitId

export const saveFeedback = async (feedback, token) => {
    try {
        const response = await axios.post(`${BE_URL}`, feedback, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error saving feedback:', error);
        throw error;
    }
};
//get allFeedback by submitId
export const getAllFeedbackBySubmitId = async (requestId) => {
    const token = localStorage.getItem('token'); // Lấy token nếu cần
    const response = await axios.get(`${BE_URL}/api/getAll/requestId/${requestId}`, {
        headers: {
            'Authorization': `Bearer ${token}`, // Thêm header nếu cần
        },
    });
    return response.data;
};

export const getAllDocumentByClass = async (classId) => {
    const token = localStorage.getItem('token'); // Lấy token nếu cần
    const response = await axios.get(`${BE_URL}/api/upload/resource/document/${classId}`, {
        headers: {
            'Authorization': `Bearer ${token}`, // Thêm header nếu cần
        },
    });
    return response.data;
};



//xoa document
export const deleteResourceById = async (resourceId) => {
    const token = localStorage.getItem('token'); // Lấy token nếu cần
    const url = `${BE_URL}/api/upload/resource/delete/${resourceId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });
        return response.data;
};
