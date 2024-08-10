
import axios from 'axios';
import { BE_URL } from '../utils/Url_request';

export const fetchStudentsAPI = async (classId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/class/${classId}/student-list`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sinh viên:", error);
        throw error;
    }
};


export const generateRandomGroup = (students, groupSize, groupName) => {
    if (!groupSize || isNaN(groupSize) || groupSize <= 0) {
        throw new Error("Vui lòng nhập một số nguyên dương.");
    }

    if (groupSize > students.length) {
        throw new Error("Không đủ sinh viên để tạo nhóm.");
    }

    const tempStudents = [...students]; // Tạo một bản sao của danh sách sinh viên
    const randomGroupMembers = [];

    for (let i = 0; i < groupSize; i++) {
        const randomIndex = Math.floor(Math.random() * tempStudents.length);
        const selectedStudent = tempStudents.splice(randomIndex, 1)[0]; // Loại bỏ sinh viên đã chọn khỏi danh sách tạm thời
        randomGroupMembers.push(selectedStudent.studentId);
    }

    const finalGroupName = groupName.trim() || `Group ${Math.floor(Math.random() * 6) + 1}`;

    return {
        groupName: finalGroupName,
        members: randomGroupMembers,
    };
};