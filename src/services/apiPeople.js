
import axios from 'axios';
import { BE_URL } from '../utils/Url_request';

//them danh sach sinh vien
export const fetchStudentList = async (classId, token) => {
    try {
        const response = await axios.get(
            `${BE_URL}/api/class/student-list/${classId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching student list:", error);
        throw error;
    }
};

//xoa sinh vien


//upload file
export const uploadFile = async (classId, token, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(
            `${BE_URL}/api-gv/class/excel/${classId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

//them SV bang ma
export const addStudent = async (classId, studentId, token) => {
    try {
        const response = await axios.post(
            `${BE_URL}/api-gv/add-student/class/${classId}`,
            { studentId },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error adding student:", error);
        throw error;
    }
};