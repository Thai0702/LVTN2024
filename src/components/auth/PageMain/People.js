import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { Link } from 'react-router-dom';

const People = () => {
    const [isPeople, setIsPeople] = useState(false);
    const [fileList, setFileList] = useState([]); // State to store list of uploaded files
    const [classList, setClassList] = useState([]); // State to store list of classes
    const [selectedClassId, setSelectedClassId] = useState(null); // State to store the selected class ID
    const [successMessage, setSuccessMessage] = useState(null); // State to store success message
    const [errorMessage, setErrorMessage] = useState(null); // State to store error message
    const fileInputRef = useRef(null);

    // Function to toggle the display of people section
    const togglePeople = () => {
        setIsPeople(!isPeople);
    };
    const handleFileUpload = async () => {
        const file = fileInputRef.current.files[0];
        if (file && selectedClassId) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                await axios.post(`http://localhost:8080/api/account/${selectedClassId}/excel`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setSuccessMessage('File uploaded successfully!');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
                setErrorMessage(null);
            } catch (error) {
                console.error('Error uploading file:', error);
                setErrorMessage('Error uploading file!');
            }
        } else {
            console.error('No file selected or class not selected');
            setErrorMessage('No file selected or class not selected!');
        }
    };


    // show class on selected
    const fetchClasses = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/class');
            const classData = await response.json();
            setClassList(classData);
        } catch (error) {
            console.error('Error fetching classes:', error);
            // Set error message
            setErrorMessage('Error fetching classes!');
        }
    };
    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <div className='container-main'>
            <div className='container-header'>
                <div className={`header-1 ${isPeople ? 'open' : ''}`} onClick={togglePeople}>People</div>
            </div>
            <div className='container-body'>
                <div className='import-people'>
                    <input type='file' ref={fileInputRef} /> {/* File input */}
                    <select onChange={(e) => setSelectedClassId(e.target.value)} value={selectedClassId}>
                        <option value=''>Select Class</option>
                        {classList.map((classItem) => (
                            <option key={classItem.subject_class_id} value={classItem.subject_class_id}>{classItem.subject_class_id}</option>
                        ))}
                    </select> 
                    <button onClick={handleFileUpload}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default People;
