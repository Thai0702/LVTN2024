import React, { useEffect, useState } from 'react';
import { BE_URL } from '../../../utils/Url_request';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import DetailClass from '../DetailClass';

const TeacherAddMember = () => {
    const { classId } = useParams();
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [groupList, setGroupList] = useState([]);
    const [displayedStudentList, setDisplayedStudentList] = useState([]);
    const token = localStorage.getItem('token');

    // Load group list
    useEffect(() => {
        fetch(`${BE_URL}/api-gv/classId/group-list/${classId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => {
                setGroupList(data);
            })
            .catch(error => console.error('Error fetching group list:', error));
    }, [classId, token]);

    // Load student list
    useEffect(() => {
        const fetchStudentList = async () => {
            try {
                const response = await fetch(`${BE_URL}/api/class/student-list/${classId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setStudentList(data);
                setDisplayedStudentList(data); // Initialize displayed student list
            } catch (error) {
                console.error('Error fetching student list:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentList();
    }, [classId, token]);

    // Handle checkbox change
    const handleCheckboxChange = (studentId) => {
        setSelectedStudents(prevSelectedStudents => {
            if (prevSelectedStudents.includes(studentId)) {
                return prevSelectedStudents.filter(id => id !== studentId);
            } else {
                return [...prevSelectedStudents, studentId];
            }
        });
    };

    // Handle save
    const handleSave = async () => {
        if (selectedStudents.length === 0 || !groupName) {
            alert('Please select at least one student and a group.');
            return;
        }

        const memberList = selectedStudents.map((studentId) => ({
            classId: parseInt(classId),
            groupName: groupName,
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
                // Update localStorage with selected students
                const updatedLocalStorage = JSON.parse(localStorage.getItem('selectedStudents')) || [];
                const newSelectedStudents = [...updatedLocalStorage, ...selectedStudents];
                localStorage.setItem('selectedStudents', JSON.stringify(newSelectedStudents));

                // Update displayedStudentList to remove selected students
                const updatedDisplayedList = displayedStudentList.filter(student => !selectedStudents.includes(student.accountId));
                setDisplayedStudentList(updatedDisplayedList);
                setSelectedStudents([]); // Reset selected students
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

        loadDisplayedListFromLocalStorage();
    }, [studentList]);
    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <Navbar />
            <DetailClass />
            <div className='container-people'>
                <div className='listpe'>
                    <select onChange={(e) => setGroupName(e.target.value)} value={groupName} style={{ marginLeft: '83px' }}>
                        <option value=''>Select Group</option>
                        {groupList.map((group) => (
                            <option key={group.groupId} value={group.groupName}>
                                {group.groupName}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleSave}>Save</button>
                    <p className='listpeople'>List Students</p>
                    <ul>
                        {displayedStudentList.map((student) => (
                            <li key={student.accountId}>
                                <span>{student.classId} - {student.fullName}</span>
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
