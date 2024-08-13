import React, { useState, useEffect } from 'react';

const ListStudent = () => {
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the list of students
        fetch('http://localhost:8080/api/class/2/student-list')
            .then(response => response.json())
            .then(data => {
                setStudentList(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching student list:', error));
    }, []);

 
    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className='student-list'>
            <h2>List of Students</h2>
            <ul>
                {studentList.map((student) => (
                    <li key={student.student_id}>
                        {student.classId}-{student.studentId}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListStudent;
