import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import DetailClass from '../DetailClass';
import { useNavigate, useParams } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';
import mehthodGroup from './css/mehthodGroup.css'
const MethodAddGroup = () => {
    const { classId } = useParams();
    const subjectName = localStorage.getItem('subjectName')
    const schoolYear = localStorage.getItem('schoolYear')
    const numberOfGroup = localStorage.getItem('numberOfGroup')
    const memberPerGroup = localStorage.getItem('memberPerGroup')
    const groupRegisterMethod = localStorage.getItem('groupRegisterMethod')
    const token = localStorage.getItem('token');
    const [groupList, setGroupList] = useState([]);
    const nagavite = useNavigate()
    const [maxMemberOfGroup, setMaxMemberOfGroup] = useState(0);
    console.log("Maxxxx la:",maxMemberOfGroup)
    // Load group list
       // Load group list and calculate max members of group
       useEffect(() => {
        const fetchGroupList = async () => {
            try {
                const response = await fetch(`${BE_URL}/api-gv/classId/group-list/${classId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                const data = await response.json();
                setGroupList(data);

                // Calculate max members of group
                const memberCounts = await Promise.all(data.map(group =>
                    fetch(`${BE_URL}/api/class/${classId}/group/${group.groupId}/students`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(response => response.json())
                        .then(groupMembers => ({ groupId: group.groupId, memberCount: groupMembers.length }))
                ));

                const maxMemberGroup = memberCounts.reduce((max, group) => group.memberCount > max.memberCount ? group : max, { groupId: null, memberCount: 0 });
                setMaxMemberOfGroup(maxMemberGroup.memberCount);

            } catch (error) {
                console.error('Error fetching group list:', error);
            }
        };

        fetchGroupList();
    }, [classId, token]);

    const [updateData, setUpdateData] = useState({
        subjectName: subjectName,
        schoolYear: schoolYear,
        numberOfGroup: numberOfGroup,
        memberPerGroup: memberPerGroup,
        groupRegisterMethod: groupRegisterMethod
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
            if (updateData.numberOfGroup <= 0 || updateData.memberPerGroup <= 0) {
                alert("Thành viên trong nhóm và số lượng nhóm phải lớn hơn 0");
                return;
            } else if (updateData.memberPerGroup < maxMemberOfGroup) {
                alert("Số lượng thành viên không được nhỏ hơn số lượng thành viên hiện tại!!");
                return;
            }
            // }else if (updateData.numberOfGroup < numberOfGroup) {
            //     alert("Số lượng nhóm không được nhỏ hơn số lượng nhóm hiện tại!!");
            //     return;
            // }
            if (response.ok) {
                setClassList(prevList =>
                    prevList.map(item =>
                        item.subjectClassId === classId ? updateData : item
                    )
                );
                const { groupRegisterMethod } = updateData
                localStorage.setItem('groupRegisterMethod', groupRegisterMethod);
                const { numberOfGroup } = updateData
                localStorage.setItem('numberOfGroup', numberOfGroup);
                const { memberPerGroup } = updateData
                localStorage.setItem('memberPerGroup', memberPerGroup);
                setUpdateData({
                    numberOfGroup: numberOfGroup,
                    memberPerGroup: memberPerGroup,
                    groupRegisterMethod: groupRegisterMethod
                });
                 if(groupRegisterMethod === 'RANDOM'){
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
            <div className='container-method'>
                <div className="update-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-method">
                            <label>Số lượng nhóm: </label>
                            <input
                                type="text"
                                name="numberOfGroup"
                                value={updateData.numberOfGroup}
                                onChange={handleInputChange}
                                placeholder="Số lượng nhóm"
                                // style={{marginLeft: '100px'}}
                            />
                        </div>
                        <div className="form-method">
                            <label style={{marginRight: '100px'}}>Số lượng thành viên:</label>
                            <input
                                type="text"
                                name="memberPerGroup"
                                value={updateData.memberPerGroup}
                                onChange={handleInputChange}
                                placeholder="Số lượng thành viên"
                                // style={{marginLeft: '0px'}}
                            />
                        </div>
                        <div className="form-method">
                            <label>Phương thức: </label>
                            <br></br>
                            <select
                                className='input'
                                name='groupRegisterMethod'
                                value={updateData.groupRegisterMethod}
                                onChange={handleInputChange}
                                style={{marginLeft: '0px'}}
                            >
                            <br></br>
                                <option value=''>Chọn phương thức tạo nhóm</option>
                                <option value='Student'>Sinh viên chọn nhóm</option>
                                <option value='Teacher'>Giảng viên chọn nhóm</option>
                                <option value='RANDOM'>Random</option>
                            </select>
                        </div>
                        <button className='btn-pttn' type="submit">Lưu</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MethodAddGroup;
