import axios from 'axios';
import { BE_URL } from '../utils/Url_request';
import { useState } from 'react';

export const fetchClassDetail = async (classId, setClassDetail, setLoading, setError) => {
    const token = localStorage.getItem("token");
    if (!token) {
        setError("No token found");
        setLoading(false);
        return;
    }

    if (!classId) {
        setError("Class ID is required");
        setLoading(false);
        return;
    }

    try {
        const response = await fetch(`${BE_URL}/api-gv/class/get/${classId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const classDetailData = await response.json();
        setClassDetail(classDetailData);
        const { memberPerGroup, groupRegisterMethod, subjectName, schoolYear, numberOfGroup, description, createdByName } = classDetailData;

        localStorage.setItem("memberPerGroup", memberPerGroup);
        localStorage.setItem("groupRegisterMethod", groupRegisterMethod);
        localStorage.setItem("subjectName", subjectName);
        localStorage.setItem("schoolYear", schoolYear);
        localStorage.setItem("numberOfGroup", numberOfGroup);
        localStorage.setItem("description", description);
        localStorage.setItem("createdByName", createdByName);

    } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch class detail");
    } finally {
        setLoading(false);
    }
};


//lay danh sach report
export const fetchReportList = async (classId, token) => {
    try {
        const response = await axios.get(
            `${BE_URL}/api-gv/report-request/${classId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching report list:", error);
        throw error;
    }
};


//xoa report
export const deleteReportRequest = async (requestId, token) => {
    try {
        const response = await axios.delete(
            `${BE_URL}/api-gv/report-request/delete/${requestId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error deleting report request:", error);
        throw error;
    }
};