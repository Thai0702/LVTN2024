
// import axios from 'axios';
// import { BE_URL } from '../utils/Url_request';

// export const fetchGroupList = async (classId, token) => {
//     const response = await fetch(`${BE_URL}/api-gv/classId/group-list/${classId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error('Failed to fetch group list');
//     }
//     return response.json();
//   };
  

// //xoa
// export const deleteGroup = async (groupId, token) => {
//     const response = await fetch(`${BE_URL}/api/group/delete/${groupId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });
  
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to delete group');
//     }
  
//     return response;
//   };
  

// //update
//   export const updateGroup = async (groupId, updateData, token) => {
//     const response = await fetch(`${BE_URL}/api/group/update/${groupId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(updateData),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to update group');
//     }
//     return response;
//   };