import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Navbar from "../Home/Navbar";
import "../Login_Register/Login";

const ClassDetailPage = () => {
  const { classId } = useParams(); // Lấy classId từ URL
  const groupRegisterMethod = localStorage.getItem('groupRegisterMethod');
  const type = localStorage.getItem('type');
  const location = useLocation();

  const isGroupRegisterMethodValid = groupRegisterMethod !== "RANDOM" &&
    groupRegisterMethod !== "Student" &&
    groupRegisterMethod !== null &&
    groupRegisterMethod !== "null" &&
    groupRegisterMethod !== undefined &&
    groupRegisterMethod !== "";

  const [activeTab, setActiveTab] = useState('stream'); 

  useEffect(() => {
 
    const currentTab = location.pathname.split('/')[1];

    switch (currentTab) {
      case 'stream':
      case 'people':
      case 'methodGroup':
      case 'group':
      case 'tearchAdd':
      case 'project':
      case 'document':
        setActiveTab(currentTab);
        break;
      default:
        setActiveTab('stream'); 
        break;
    }
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
        <div className="container-header">
          <div className="d-flex flex-column flex-md-row justify-content-around container-main">
            {type === "GV" ? (
              <>
                <Link 
                  className='link' 
                  to={`/stream/${classId}`}
                  onClick={() => setActiveTab('stream')}
                >
                  <div className={`header-1 ${activeTab === 'stream' ? 'active' : ''}`}>Chi tiết</div>
                </Link>
                
                <Link 
                  className='link' 
                  to={`/people/${classId}`}
                  onClick={() => setActiveTab('people')}
                >
                  <div className={`header-1 ${activeTab === 'people' ? 'active' : ''}`}>Thành viên</div>
                </Link>
                
                <Link 
                  className='link' 
                  to={`/methodGroup/${classId}`}
                  onClick={() => setActiveTab('methodGroup')}
                >
                  <div className={`header-1 ${activeTab === 'methodGroup' ? 'active' : ''}`}>Chọn phương thức tạo nhóm</div>
                </Link>
                
                <Link 
                  className='link' 
                  to={`/group/${classId}`}
                  onClick={() => setActiveTab('group')}
                >
                  <div className={`header-1 ${activeTab === 'group' ? 'active' : ''}`}>Tạo nhóm</div>
                </Link>
                
                {isGroupRegisterMethodValid && (
                  <Link 
                    className='link' 
                    to={`/tearchAdd/${classId}`}
                    onClick={() => setActiveTab('tearchAdd')}
                  >
                    <div className={`header-1 ${activeTab === 'tearchAdd' ? 'active' : ''}`}>
                      {groupRegisterMethod ? 'Giáo viên thêm thành viên vào nhóm' : 'Default Text'}
                    </div>
                  </Link>
                )}
                
                <Link 
                  className='link' 
                  to={`/project/${classId}`}
                  onClick={() => setActiveTab('project')}
                >
                  <div className={`header-1 ${activeTab === 'project' ? 'active' : ''}`}>Tạo đồ án</div>
                </Link>

                <Link 
                  className='link' 
                  to={`/document/${classId}`}
                  onClick={() => setActiveTab('document')}
                >
                  <div className={`header-1 ${activeTab === 'document' ? 'active' : ''}`}>Tài liệu</div>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  className='link' 
                  to={`/stream/${classId}`}
                  onClick={() => setActiveTab('stream')}
                >
                  <div className={`header-1 ${activeTab === 'stream' ? 'active' : ''}`}>Stream</div>
                </Link>
                
                <Link 
                  className='link' 
                  to={`/people/${classId}`}
                  onClick={() => setActiveTab('people')}
                >
                  <div className={`header-1 ${activeTab === 'people' ? 'active' : ''}`}>People</div>
                </Link>
                
                <Link 
                  className='link' 
                  to={`/group/${classId}`}
                  onClick={() => setActiveTab('group')}
                >
                  <div className={`header-1 ${activeTab === 'group' ? 'active' : ''}`}>Group</div>
                </Link>
                <Link 
                  className='link' 
                  to={`/document/${classId}`}
                  onClick={() => setActiveTab('document')}
                >
                  <div className={`header-1 ${activeTab === 'document' ? 'active' : ''}`}>Tài liệu</div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
  );
};

export default ClassDetailPage;
