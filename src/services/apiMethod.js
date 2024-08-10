import axios from 'axios';
import { BE_URL } from '../utils/Url_request';

export const fetchStudentListAPI = async (classId, token) => {
    try {
        const response = await axios.get(
            `${BE_URL}/api/class/student-list/${classId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching student list:", error);
        throw error;
    }
};


export const fetchGroupListAPI = async (classId, token) => {
    try {
        const response = await axios.get(
            `${BE_URL}/api-gv/classId/group-list/${classId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const groupList = response.data;

        // Calculate max members of group
        const memberCounts = await Promise.all(
            groupList.map((group) =>
                axios.get(
                    `${BE_URL}/api/class/${classId}/group/${group.groupId}/students`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => ({
                    groupId: group.groupId,
                    memberCount: res.data.length,
                }))
            )
        );

        const maxMemberGroup = memberCounts.reduce(
            (max, group) => (group.memberCount > max.memberCount ? group : max),
            { groupId: null, memberCount: 0 }
        );

        return {
            groupList,
            maxMemberCount: maxMemberGroup.memberCount,
        };
    } catch (error) {
        console.error("Error fetching group list:", error);
        throw error;
    }
};