

import axios from 'axios';
import { BE_URL } from '../utils/Url_request';

// Function to add a report request
export const addReportRequest = async (reportRequestData, token) => {
    try {
        const response = await axios.post(
            `${BE_URL}/api-gv/create/request`,
            reportRequestData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error creating report request:", error);
        throw error;
    }
};

// Function to fetch list of projects by groupId
export const fetchListProject = async (groupId, token) => {
    try {
        const response = await axios.get(
            `${BE_URL}/api-gv/group/projects/${groupId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching list of projects:", error);
        throw error;
    }
};
