import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';

const ShowClass = () => {
  const { groupId } = useParams();
  const [classList, setClassList] = useState([]);
  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/group/22/projects`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects for this group');
        }
        const classDetailData = await response.json();
        setClassList(classDetailData);
      } catch (error) {
        console.error('Error:', error);
        setClassList([]); // Set an empty array in case of error
      }
    };
    fetchClassDetail();
  }, []);

  // Check if classList is undefined or null
  if (!classList) {
    return <p>Loading...</p>;
  }

  // Check if classList is not an array or empty
  if (!Array.isArray(classList) || classList.length === 0) {
    return <p>No projects found for this group.</p>;
  }
  return (
    <div>
      <h2>Projects for Group {groupId}</h2>
      <ul>
      {classList.map((classItem) => (
              <li key={classItem.id} className='showclass-1'>
                <div>
                  <div className='name_class'><Link to={`/class/${classItem.projectId}`}>{classItem.projectName}</Link></div>                 
                </div>  
              </li>             
            ))}
      </ul>
    </div>
  );
};

export default ShowClass;
