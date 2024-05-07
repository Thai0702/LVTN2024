import React, { useState } from 'react';
import axios from 'axios';
const Add = () => {
    const [groupName, setGroupName] = useState('');
  const [classId, setClassId] = useState('');
  const [accountId, setAccountId] = useState('');
  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/class/add-member', {
        groupName: groupName,
        classId: classId,
        accountId: accountId
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log('Data saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Class ID"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Account ID"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  )
}

export default Add
