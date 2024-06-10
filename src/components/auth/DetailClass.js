import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
const ClassDetailPage = () => {
  const { classId } = useParams(); // Lấy classId từ URL
  // lay userId by account 
  const groupRegisterMethod = localStorage.getItem('groupRegisterMethod');
  console.log('helo method:', groupRegisterMethod);
  const type = localStorage.getItem('type');
  return (
    <div>
      <Navbar />
      <div className='container-main'>
        <div className='container-header'>
          {type === "GV" ? (
            <>
              <Link to={`/stream/${classId}`}>
                <div className='header-1'>Stream</div>
              </Link>
              <Link to={`/people/${classId}`}>
                <div className='header-1'>People</div>
              </Link>
              <Link to={`/project/${classId}`}>
                <div className='header-1'>Project</div>
              </Link>
              <Link to={`/group/${classId}`}>
                <div className='header-1'>Group</div>
              </Link>
              {groupRegisterMethod !== "RANDOM" && (
                <Link>
                  <div className='header-1'>
                    {groupRegisterMethod + " add Member"}
                  </div>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to={`/stream/${classId}`}>
                <div className='header-1'>Stream</div>
              </Link>
              <Link to={`/people/${classId}`}>
                <div className='header-1'>People</div>
              </Link>
              <Link to={`/group/${classId}`}>
                <div className='header-1'>Group</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ClassDetailPage;
