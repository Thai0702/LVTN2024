import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './Login.css';

const ClassDetailPage = () => {
  const { classId } = useParams(); // Lấy classId từ URL
  const groupRegisterMethod = localStorage.getItem('groupRegisterMethod');
  const type = localStorage.getItem('type');

  console.log('helo method:', groupRegisterMethod);
  console.log('type:', type);

  const isGroupRegisterMethodValid = groupRegisterMethod !== "RANDOM" &&
    groupRegisterMethod !== "Student" &&
    groupRegisterMethod !== null &&
    groupRegisterMethod !== "null" &&
    groupRegisterMethod !== undefined &&
    groupRegisterMethod !== "";

  return (
    <div>
      <Navbar />
      <div className='container-main'>
        <div className='container-header'>
          {type === "GV" ? (
            <>
              <Link className='link' to={`/stream/${classId}`}>
                <div className='header-1'>Chi tiết</div>
              </Link>
              <Link className='link' to={`/people/${classId}`}>
                <div className='header-1'>Thành viên</div>
              </Link>
              <Link className='link' to={`/methodGroup/${classId}`}>
                <div className='header-1'>Chọn phương thức tạo nhóm</div>
              </Link>
              <Link className='link' to={`/group/${classId}`}>
                <div className='header-1'>Tạo nhóm</div>
              </Link>
              {isGroupRegisterMethodValid && (
                <Link className='link' to={`/tearchAdd/${classId}`}>
                  <div className='header-1'>
                    {groupRegisterMethod ? 'Giáo viên thêm thành viên vào nhóm' : 'Default Text'}
                  </div>
                </Link>
              )}
              {/* {isGroupRegisterMethodValid && (
                <Link className='link' to={`/tearchAdd/${classId}`}>
                  <div className='header-1'>
                    {groupRegisterMethod+ " thêm thành viên vào nhóm"}
                  </div>
                </Link>
              )} */}
               <Link className='link' to={`/project/${classId}`}>
                <div className='header-1'>Tạo dự án</div>
              </Link>
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
