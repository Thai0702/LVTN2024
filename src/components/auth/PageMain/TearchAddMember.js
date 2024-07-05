import React, { useEffect, useState } from 'react';
import { BE_URL } from '../../../utils/Url_request';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import DetailClass from '../DetailClass';
import tearcherChon from '../PageMain/css/tearcherChon.css'
const TeacherAddMember = () => {
    const { classId } = useParams();
    const navigate = useNavigate();
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [groupId, setGroupId] = useState('');
    const [groupList, setGroupList] = useState([]);
    const [displayedStudentList, setDisplayedStudentList] = useState([]);
    const token = localStorage.getItem('token');
    const memberPerGroup = parseInt(localStorage.getItem('memberPerGroup'), 10);
    const [currentMembers, setCurrentMembers] = useState(0);
    const [maxMembers, setMaxMembers] = useState(memberPerGroup);
    const [maxMemberOfGroup, setMaxMemberOfGroup] = useState(0);
    const [isupdateNumber, setIsUpdateOpen] = useState(false);
    const toggleUpdateNumber = () => {
        setIsUpdateOpen(!isupdateNumber);
    };
    // lấy danh sách thành viên của groupId
    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (!userToken) {
            console.error('No token found');
            return;
        }
        if (groupId) {
            fetch(`${BE_URL}/api/class/${classId}/group/${groupId}/students`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setCurrentMembers(data.length);
                })
                .catch(error => console.error('Error fetching members:', error));
        }
    }, [classId, groupId]);

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
    // Load student list
    useEffect(() => {
        const fetchStudentList = async () => {
            try {
                const response = await fetch(`${BE_URL}/api/class/student-list/chooseGroup/${classId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // Filter out students who already have a group
                const studentsWithoutGroup = data.filter(student => {
                    return !groupList.some(group => group.accountId === student.accountId);
                });
                setStudentList(studentsWithoutGroup);
                setDisplayedStudentList(studentsWithoutGroup); // Initialize displayed student list
            } catch (error) {
                console.error('Error fetching student list:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentList();
    }, [classId, token, groupList]);

    // Handle checkbox change
    const handleCheckboxChange = (studentId) => {
        if (!groupId) {
            alert('Vui lòng chọn nhóm trước khi chọn thành viên');
            return;
        }
        setSelectedStudents(prevSelectedStudents => {
            if (prevSelectedStudents.includes(studentId)) {
                setCurrentMembers(currentMembers - 1);
                return prevSelectedStudents.filter(id => id !== studentId);
            } else {
                if (currentMembers >= maxMembers) {
                    alert('Số lượng thành viên đã đạt giới hạn');
                    return prevSelectedStudents;
                }
                setCurrentMembers(currentMembers + 1);
                return [...prevSelectedStudents, studentId];
            }
        });
    };

    // Handle save
    const handleSave = async () => {
        if (selectedStudents.length === 0 || !groupId) {
            alert('Please select at least one student and a group.');
            return;
        }
        console.log("so luong member :", currentMembers)
        if (currentMembers.length > maxMembers) {
            alert('Số lượng thành viên đã đạt giới hạn');
            window.location.reload(true);
        }


        const memberList = selectedStudents.map((studentId) => ({
            classId: parseInt(classId),
            groupId: groupId,
            accountId: studentId
        }));

        try {
            const response = await fetch(`${BE_URL}/api-gv/class/add-member`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(memberList)
            });
            if (response.ok) {
                alert('Members added successfully');
                window.location.reload(true);
            } else {
                alert('Failed to add members');
            }
        } catch (error) {
            console.error('Error adding members:', error);
            alert('Error adding members');
        }
    };

    // Load displayed student list from localStorage on component mount
    useEffect(() => {
        const loadDisplayedListFromLocalStorage = () => {
            const updatedLocalStorage = JSON.parse(localStorage.getItem('selectedStudents')) || [];
            const updatedDisplayedList = studentList.filter(student => !updatedLocalStorage.includes(student.accountId));
            setDisplayedStudentList(updatedDisplayedList);
        };

        if (studentList.length > 0) {
            loadDisplayedListFromLocalStorage();
        }
    }, [studentList]);
    // cap nhat 
    const subjectName = localStorage.getItem('subjectName')
    const schoolYear = localStorage.getItem('schoolYear')
    const numberOfGroup = localStorage.getItem('numberOfGroup')
    const groupRegisterMethod = localStorage.getItem('groupRegisterMethod')
    const nagavite = useNavigate()
    console.log("hello name", subjectName)

    console.log("hello name", schoolYear)
    const [updateData, setUpdateData] = useState({
        subjectName: subjectName,
        schoolYear: schoolYear,
        numberOfGroup: numberOfGroup,
        memberPerGroup: memberPerGroup,
        groupRegisterMethod: groupRegisterMethod
    });
    const [classList, setClassList] = useState([]);
    console.log("mã:", maxMemberOfGroup);
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
            if (response.ok) {
                setClassList(prevList =>
                    prevList.map(item =>
                        item.subjectClassId === classId ? updateData : item
                    )
                );

                const { numberOfGroup } = updateData;
                localStorage.setItem('numberOfGroup', numberOfGroup);
                const { memberPerGroup } = updateData;
                localStorage.setItem('memberPerGroup', memberPerGroup);
                setUpdateData({
                    subjectName: subjectName,
                    schoolYear: schoolYear,
                    numberOfGroup: numberOfGroup,
                    memberPerGroup: memberPerGroup,
                    groupRegisterMethod: groupRegisterMethod,
                });
                alert("Cập nhật thành công");
                window.location.reload(true);
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



    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            <DetailClass />
            <div className='container-people'>
                <div className='updateMethod' onClick={toggleUpdateNumber}><button>Đổi số lượng nhóm</button></div>
                {isupdateNumber && (
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body-1">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Số lượng nhóm</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="numberOfGroup"
                                                value={updateData.numberOfGroup}
                                                onChange={handleInputChange}
                                                placeholder="Số lượng nhóm"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Số lượng thành viên</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="memberPerGroup"
                                                value={updateData.memberPerGroup}
                                                onChange={handleInputChange}
                                                placeholder="Số lượng thành viên trong nhóm"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary" >Cập nhật</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}              
                <div className='listpe'>
                    <select className='chonNhom' onChange={(e) => setGroupId(e.target.value)} value={groupId} >
                        <option value=''>Select Group</option>
                        {groupList.map((group) => (
                            <option key={group.groupId} value={group.groupId}>
                                {group.groupName}
                            </option>
                        ))}
                    </select>
                    <button class="btn btn-danger" onClick={handleSave}>Save</button>
                    <p className='listpeople'>List Students</p>
                    <ul>
                        {displayedStudentList.map((student, index) => (
                            <li key={student.accountId}>
                                <span>{index + 1}. {student.classId} - {student.fullName}</span>
                                <input
                                    type='checkbox'
                                    onChange={() => handleCheckboxChange(student.accountId)}
                                    checked={selectedStudents.includes(student.accountId)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TeacherAddMember;
