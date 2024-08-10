

import axios from 'axios';
import { BE_URL } from '../utils/Url_request';

// Function to add a project
export const addProject = async (projectData, token) => {
    try {
        const response = await axios.post(
            `${BE_URL}/api-gv/project/create-project`,
            projectData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
};

// Function to fetch the group list by classId
// export const fetchGroupList = async (classId, token) => {
//     try {
//         const response = await axios.get(
//             `${BE_URL}/api-gv/classId/group-list/${classId}`,
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: 'Bearer ' + token,
//                 },
//             }
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching group list:", error);
//         throw error;
//     }
// };
