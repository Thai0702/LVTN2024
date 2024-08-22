import React, { useState ,useEffect,useRef } from 'react';
import Navbar from "../Home/Navbar";
import css from "../Home/css/main.css";
import add from "../../img/add.png";
import Sidebar from '../Home/Sidebar';

const Class = () => {
    const [isClassworkopen, setIsClasswork] = useState(false);
    const [isCreateClassworkopen, setIsCreateClasswork] = useState(false);
    const [isStream, setIsStream] = useState(true); // Mặc định mở Stream
    const [isPeople, setIspeople] = useState(false);
    const [isGroup, setIsGroup] = useState(false);
    const [isCreateGroup, setIsCreateGroup] = useState(false);
    const [isProject, setIsProject] = useState(false);
    const [isCreateProject, setIsCreateProject] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const toggleRandom = () => {
        setIsRandom(!isRandom)
        setIsClasswork(false);
        setIsStream(false);
        setIspeople(false);
        setIsGroup(false);
        setIsProject(false);
    };
    const toggleClasswork = () => {
        setIsClasswork(!isClassworkopen);
        setIsStream(false);
        setIspeople(false);
        setIsGroup(false);
        setIsProject(false);
        setIsRandom(false)
    };
    const toggleCreateClasswork = () => {
        setIsCreateClasswork(!isCreateClassworkopen)
        setIsClasswork(false);
        setIsStream(false);
        setIspeople(false);
        setIsGroup(false);
        setIsProject(false);
        setIsRandom(false)
    };
    const toggleStream = () => {
        setIsStream(!isStream);
        setIsClasswork(false);
        setIspeople(false);
        setIsGroup(false);
        setIsProject(false);
        setIsRandom(false)
    };

    const togglePeople = () => {
        setIspeople(!isPeople);
        setIsClasswork(false);
        setIsStream(false);
        setIsGroup(false);
        setIsProject(false);
        setIsRandom(false)
    };

    const toggleGroup = () => {
        setIsGroup(!isGroup);
        setIsClasswork(false);
        setIsStream(false);
        setIspeople(false);
        setIsProject(false);
        setIsRandom(false)
    };
    const toggleCreateGroup = () => {
        setIsCreateGroup(!isCreateGroup);
        setIsGroup(false);
        setIsClasswork(false);
        setIsStream(false);
        setIspeople(false);
        setIsProject(false);
        setIsRandom(false)
    };
    const toggleProject = () => {
        setIsProject(!isProject);
        setIsGroup(false);
        setIsClasswork(false);
        setIsStream(false);
        setIspeople(false);
        setIsRandom(false)
    };
    const toggleCreateProject = () => {
        setIsCreateProject(!isCreateProject);
        setIsProject(false);
        setIsGroup(false);
        setIsClasswork(false);
        setIsStream(false);
        setIspeople(false);
        setIsRandom(false)
      };
      const createClassRef = useRef();
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (createClassRef.current && !createClassRef.current.contains(event.target)) {
            setIsCreateProject(false);
            setIsCreateGroup(false);
            setIsCreateClasswork(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    return (
        <div>
            <Navbar />
            <div className='container-main'>
                <div className='container-header'>
                    <div className={`header-1 ${isStream ? 'open' : ''}`} onClick={toggleStream}>Stream</div>
                    <div className={`header-1 ${isClassworkopen ? 'open' : ''}`} onClick={toggleClasswork}>Classworks</div>
                    <div className={`header-1 ${isPeople ? 'open' : ''}`} onClick={togglePeople}>People</div>
                    <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleGroup}>Group</div>
                    <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleProject}>Project</div>
                    <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleRandom}>Random</div>
                </div>
                {isRandom && (
                    <div ref={createClassRef} className='container-create-project'>
                    <input type='text' placeholder='Group_id' className='input'></input>
                    <input type='text' placeholder='Quatity'className='input'></input>
                    <input type='file' placeholder='attachment'className='input'></input>
                    <button className='button-create' >Random</button>
                </div>
                )}
                {isClassworkopen && (
                    <div className='container-body'>
                        <div className='create-work' onClick={toggleCreateClasswork}>
                            <img src={add} alt='Create' />
                            <p>Create</p>
                        </div>
                        <div className='works'>
                            show all homeworks
                        </div>

                    </div>
                )}
                 {isCreateClassworkopen && (
                    <div ref={createClassRef} className='container-create-project'>
                    <input type='text' placeholder='submit_by' className='input'></input>
                    <input type='text' placeholder='report_of_request'className='input'></input>
                    <input type='text' placeholder='report_title'className='input'></input>
                    <input type='text' placeholder='report_description'className='input'></input>
                    <input type='text' placeholder='created_time'className='input'></input>
                    <input type='file' placeholder='attachment'className='input'></input>
                    <button className='button-create' >Submit</button>
                </div>
                )}
                {isStream && (
                    <div className='container-body'>
                        <div className='body-1'>
                            <div>Class</div>
                        </div>
                        <div className='body-2'>
                            <div className='body-code'>
                                <div>Code Class</div>
                            </div>
                            <div className='body-homework'>
                                <div>documents </div>
                            </div>
                        </div>

                    </div>
                )}
                {isPeople && (
                    <div className='container-body'>
                        <div className='import-people'>
                            <input type='file' />
                            <button>Add</button>
                        </div>
                        <div className='works'>
                            show all people
                        </div>
                    </div>
                )}
                {isGroup && (
                    <div className='container-body'>
                        <div className='create-work' onClick={toggleCreateGroup}>
                            <img src={add} alt='Create' />
                            <p>Add group</p>
                        </div>
                        <div className='works'>
                            show all group here 
                        </div>

                    </div>
                )}
                {isCreateGroup && (
                    <div ref={createClassRef} className='container-create-project'>
                    <input type='text' placeholder='Leader_id' className='input'></input>
                    <input type='text' placeholder='Subject Class'className='input'></input>
                    <button className='button-create' >Create</button>
                </div>
                )}
                  {isProject && (
                    <div className='container-body' >
                        <div className='create-work'onClick={toggleCreateProject}>
                            <img src={add} alt='Create' />
                            <p>Add Project</p>
                        </div>
                        <div className='works'>
                            show all Project here 
                        </div>
                    </div>
                )}
                 {isCreateProject && (
                    <div ref={createClassRef} className='container-create-project'>
                        <input type='text' placeholder='Project Name' className='input'></input>
                        <input type='text' placeholder='Of group'className='input'></input>
                        <input type='text' placeholder='Description'className='input'></input>
                        <input type='text' placeholder='Created by'className='input'></input>
                        <input type='date' placeholder='Expired_day'className='input'></input>
                        <input type='text' placeholder='Expired_time'className='input'></input>
                        <button className='button-create' >Create</button>
                    </div>
                )}


            </div>
        </div>
    );
};

export default Class;
