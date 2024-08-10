
import axios from 'axios';
import { BE_URL } from '../utils/Url_request';

export const fetchGroupMembers = async (classId, groupId, token) => {
    try {
        const response = await axios.get(
            `${BE_URL}/api/class/${classId}/group/${groupId}/students`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching members:", error);
        throw error;
    }
};



export const joinGroup = async (classId, groupId, token) => {
    try {
        const response = await axios.post(
            `${BE_URL}/api/class/${classId}/group/${groupId}/join-group`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Error joining group:", error);
        throw error;
    }
};



export const fetchListProject = async (groupId, token) => {
    try {
        const response = await axios.get(
            `${BE_URL}/api-gv/group/projects/${groupId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
};