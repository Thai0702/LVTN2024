import React, { useRef, useState } from 'react'
import { BE_URL } from '../../../utils/Url_request';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import DetailClass from '../DetailClass'

const AddGroup = () => {
    const { classId } = useParams();
    const createClassRef = useRef();
    const navigate = useNavigate();

    /*Add group*/
    const [groupData, setGroupData] = useState({
        classId: classId,
        groupName: '',
        leaderId: '',
    });
    const handleChange = (e) => {
        setGroupData({ ...groupData, [e.target.name]: e.target.value });
    };
    const handleCreateGroup = async () => {

        if (!groupData.groupName || !groupData.leaderId) {
            window.alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        try {
            // Lấy token từ localStorage
            const token = localStorage.getItem('token');

            const response = await fetch(`${BE_URL}/api/class/create-a-group`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token // Thêm token vào header
                },
                body: JSON.stringify({ ...groupData })
            });
            if (response.ok) {
                navigate(`/group/${classId}`);
                window.alert('Add group successfully!');
                
                // Load lại trang sau khi thêm thành công
            }
            else {
                window.alert('add group fail !');
            }
  
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // delete group of class
    const handleDeleteGroup = async (id) => {
        const confirmed = window.confirm("Bạn có chắc muốn xóa nhóm này không?");
        if (!confirmed) {
            return;
        }
        try {
            const url = `${BE_URL}/api/group/${id}`;
            const responseDelete = await fetch(url, {
                method: 'DELETE'
            });

            if (responseDelete.ok) {
                window.alert("Xóa nhóm thành công!");
                window.location.reload(true);
            } else {
                console.error('Failed to delete group');
                alert("Đã xảy ra lỗi khi xóa nhóm!");
            }
        } catch (error) {
            console.error('Error deleting group:', error);
            alert("Đã xảy ra lỗi khi xóa nhóm!");
        }
    };
    return (
        <div>
            <Navbar/>
            <DetailClass/>
            <div ref={createClassRef} className='container-create-project'>

                <form className='addGroup'>
                    <input
                        type='number'
                        placeholder='Mã leader'
                        className='input'
                        name='leaderId'
                        value={groupData.leaderId}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        placeholder='Tên nhóm'
                        className='input'
                        name='groupName'
                        value={groupData.groupName}
                        onChange={handleChange}
                    />
                    <button className='button-create' onClick={handleCreateGroup}>Create</button>
                </form>
            </div>
        </div>
    )
}

export default AddGroup
