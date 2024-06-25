import React, { useState } from 'react';
import Navbar from '../Navbar';
import DetailClass from '../DetailClass';
import { useNavigate, useParams } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import mehthodGroup from './css/mehthodGroup.css'
const MethodAddGroup = () => {
    const { classId } = useParams();
    const subjectName = localStorage.getItem('subjectName')
    const schoolYear = localStorage.getItem('schoolYear')
    const groupRegisterMethod = localStorage.getItem('groupRegisterMethod')
    const nagavite = useNavigate()
    console.log("hello name", subjectName)

    console.log("hello name", schoolYear)
    const [updateData, setUpdateData] = useState({
        subjectName: subjectName,
        schoolYear: schoolYear,
        numberOfGroup: '',
        memberPerGroup: '',
        groupRegisterMethod: ''
    });
    const [classList, setClassList] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BE_URL}/api-gv/class/update/${classId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                setClassList(prevList =>
                    prevList.map(item =>
                        item.subjectClassId === classId ? updateData : item
                    )
                );
                setUpdateData({
                    numberOfGroup: '',
                    memberPerGroup: '',
                    groupRegisterMethod: ''
                });
                if (groupRegisterMethod === 'Tearch') {
                    nagavite(`/tearchAdd/${classId}`)
                }
                else if(groupRegisterMethod === 'RANDOM'){
                    nagavite(`/people/${classId}`)
                }
                else{
                    nagavite(`/group/${classId}`)
                }

            } else {
                console.error('Failed to update class');
            }
        } catch (error) {
            console.error('Error updating class:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = (classItem) => {
        setUpdateData(classItem);
    };

    return (
        <div>
            <Navbar />
            <DetailClass />
            <div className="mehthodGroup">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="numberOfGroup"
                        value={updateData.numberOfGroup}
                        onChange={handleInputChange}
                        placeholder="Số lượng nhóm"
                    />
                    <input
                        type="text"
                        name="memberPerGroup"
                        value={updateData.memberPerGroup}
                        onChange={handleInputChange}
                        placeholder="Số lượng thành viên trong nhóm"
                    />
                    <select                        
                        name='groupRegisterMethod'
                        value={updateData.groupRegisterMethod}
                        onChange={handleInputChange}
                    >
                        <option value=''>Chọn phương thức tạo nhóm</option>
                        <option value='Student'>Sinh viên chọn nhóm</option>
                        <option value='Teacher'>Giảng viên chọn nhóm</option>
                        <option value='RANDOM'>Random</option>
                    </select>
                    <button type="submit">Lưu</button>
                </form>
            </div>
        </div>
    );
};

export default MethodAddGroup;
