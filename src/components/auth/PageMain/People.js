import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const People = () => {
    const [isPeople, setIsPeople] = useState(false);
    const [fileList, setFileList] = useState([]); // State to store list of uploaded files
    const fileInputRef = useRef(null); // Reference for file input element
    // Function to toggle the display of people section
    const togglePeople = () => {
        setIsPeople(!isPeople);
    };
    // Function to handle file upload
    const handleFileUpload = async () => {
        const file = fileInputRef.current.files[0]; // Get the selected file
        if (file) {
            const formData = new FormData(); // Create form data object
            formData.append('file', file); // Append the file to form data
            try {
                // Send POST request to upload file
                await axios.post('http://localhost:8080/api/excel', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Set appropriate headers for file upload
                    }
                });
                // After successful upload, fetch the updated file list
                fetchFileList();
            } catch (error) {
                console.error('Error uploading file:', error);
                // Handle error
            }
        } else {
            console.error('No file selected');
            // Handle case where no file is selected
        }
    };
    // Function to fetch the list of uploaded files
    const fetchFileList = async () => {
        try {
            // Send GET request to fetch file list
            const response = await axios.get('http://localhost:8080/api/account');
            setFileList(response.data); // Update fileList state with retrieved list
        } catch (error) {
            console.error('Error fetching file list:', error);
            // Handle error
        }
    };

    // useEffect hook to fetch file list when component mounts or is updated
    useEffect(() => {
        fetchFileList();
    }, []);

    return (
        <div className='container-main'>
            <div className='container-header'>
                {/* Toggle button */}
                <div className={`header-1 ${isPeople ? 'open' : ''}`} onClick={togglePeople}>People</div>
            </div>
            {isPeople && (
                <div className='container-body'>
                    {/* File upload section */}
                    <div className='import-people'>
                        <input type='file' ref={fileInputRef} /> {/* File input */}
                        <button onClick={handleFileUpload}>Add</button> {/* Upload button */}
                    </div>
                    {/* Display section */}
                    <div className='works'>
                        {/* Display list of uploaded files */}
                        {fileList.length > 0 ? (
                            <div className='listPeople'>
                                {fileList.map((file, index) => (
                                    <div key={index}>
                                        <p>{file.user_email}</p>                                       
                                    </div>                                                             
                                ))}
                            </div>
                        ) : (
                            <p>No files uploaded yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
export default People;
