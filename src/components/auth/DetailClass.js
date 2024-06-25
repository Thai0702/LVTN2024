import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './Login.css';
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
              <Link className='link' to={`/stream/${classId}`}>
                <div className='header-1'>Stream</div>
              </Link>
              <Link className='link' to={`/people/${classId}`}>
                <div className='header-1'>People</div>
              </Link>
              <Link className='link' to={`/project/${classId}`}>
                <div className='header-1'>Project</div>
              </Link>
              <Link  className='link'to={`/group/${classId}`}>
                <div className='header-1'>Group</div>
              </Link>
              <Link className='link' to={`/methodGroup/${classId}`}>
                <div className='header-1'>Chọn phương thức tạo nhóm</div>
              </Link>
              {groupRegisterMethod !== "RANDOM" && groupRegisterMethod !== "Student" && (
                <Link className='link' to={`/tearchAdd/${classId}`}>
                  <div className='header-1'>
                    {groupRegisterMethod + " add Member"}
                  </div>
                </Link>
              )}              
            </>
          ) : (
            <>
              <Link className='link' to={`/stream/${classId}`}>
                <div className='header-1'>Stream</div>
              </Link>
              <Link className='link' to={`/people/${classId}`}>
                <div className='header-1'>People</div>
              </Link>
              <Link className='link' to={`/group/${classId}`}>
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
