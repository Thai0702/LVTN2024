import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import DetailClass from '../DetailClass'
import { BE_URL } from '../../../utils/Url_request';
import groupcss from './css/group.css'

const Group = () => {
    const { classId, groupId } = useParams();
    // show group of class
    /*show list group of class */
    const [grouptList, setGroupList] = useState([]);
    useEffect(() => {
        // Fetch the list of students
        const token = localStorage.getItem('token');
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
            .catch(error => console.error('Error fetching student list:', error));
    }, [classId]);
    // delete group
    const handleDeleteGroup = async (groupId) => {
        if (!groupId) {
            console.error('group ID is missing or undefined');
            window.alert('group ID is missing or undefined');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            window.alert('No token found');
            return;
        }

        const confirmed = window.confirm("Bạn có chắc muốn xóa group này không?");
        if (!confirmed) {
            // Do not delete if user does not confirm
            return;
        }

        try {
            const responseDelete = await fetch(`${BE_URL}/api/group/delete/${groupId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

            if (responseDelete.ok) {
                // Remove project from list if deletion is successful
                setGroupList(grouptList.filter(group => group.groupId !== groupId));
                window.alert('Xóa group thành công.');
            } else {
                const errorData = await responseDelete.json();
                console.error('Error deletinggroup:', errorData.message);
                window.alert('Xảy ra lỗi khi xóa group: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error deleting group:', error);
            window.alert('Xảy ra lỗi khi xóa group.');
        }
    };
    // update

    const [showUpdateForm, setShowUpdateForm] = useState([]);
    const [updateData, setUpdateData] = useState({
        leaderId: '',
        classId: classId,
        groupName: '',
    });
    const handleUpdate = (classItem) => {
        setUpdateData(classItem);
        setShowUpdateForm(true); // Hiển thị form cập nhật khi nhấp vào "Cập nhật"
    };
    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        for (const key in updateData) {
            if (!updateData[key]) {
                alert('Vui lòng điền đầy đủ thông tin.');
                return;
            }
        }
        e.preventDefault();
        try {
            const response = await fetch(`${BE_URL}/api/group/update/${updateData.groupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(updateData),
            });
            if (response.ok) {
                // Cập nhật trực tiếp danh sách lớp sau khi cập nhật thành công
                setGroupList(prevList =>
                    prevList.map(item =>
                        item.subjectClassId === updateData.groupId ? updateData : item
                    )
                );
                setUpdateData({
                    leaderId: '',
                    classId: classId,
                    groupName: '',
                });
                setShowUpdateForm(false);
                window.alert("Update success !!")
                window.location.reload(true); // Ẩn form cập nhật sau khi cập nhật thành công
            } else {
                console.error('Failed to update project');
            }
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div>
            <Navbar />
            <DetailClass />
            <div className='container-group'>
                <div className='create-work'>
                    {/* <img src={add} alt='Create' /> */}

                    <Link className='link' to={`/addGroup/${classId}`}><p className='add-group-text'>Add group</p></Link>

                    {/* <Link to={`/addGroup/${classId}`}><p className='add-group-text'>Add group</p></Link> */}
                    {/* <Link to={`/addGroup/${classId}`}><button className='add-group-text'></button></Link> */}

                </div>
                <div className='listg'>
                    <p className='listgroup'>List Group</p>
                    <ul>
                        <ul>
                            {grouptList.map((listgroup,index) => (
                                <li key={listgroup.groupId}>

                                    <Link className='link' to={`/showmemberGroup/${listgroup.classId}/${listgroup.groupId}`}><span>{index + 1}. Mã lớp : {listgroup.classId} - Tên nhóm : {listgroup.groupName}</span></Link>

                                    {/* <Link to={`/showmemberGroup/${listgroup.classId}/${listgroup.groupId}`}><span>{listgroup.classId} - {listgroup.groupName}</span></Link> */}

                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button onClick={() => handleDeleteGroup(listgroup.groupId)} class="btn btn-danger" type="delete">DELETE</button>
                                        <button onClick={() => handleUpdate(listgroup)} class="btn btn-update" type="update"
                                            style={{
                                                backgroundColor: 'gray',
                                                color: 'white',
                                                border: 'none',
                                                padding: '10px 20px',
                                                cursor: 'pointer',
                                                borderRadius: '5px'
                                            }}>
                                            Update
                                        </button>
                                    </div>

                                    {showUpdateForm && updateData.groupId === listgroup.groupId && (
                                        <div className="update-form">
                                            <form onSubmit={handleSubmit}>
                                                <input
                                                    type="text"
                                                    name="leaderId"
                                                    value={updateData.leaderId}
                                                    onChange={handleInputChange}
                                                    placeholder="Mã leader"
                                                />
                                                <input
                                                    type="text"
                                                    name="groupName"
                                                    value={updateData.groupName}
                                                    onChange={handleInputChange}
                                                    placeholder="Tên nhóm"
                                                />
                                                <button type="submit">Lưu</button>
                                            </form>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Group;
