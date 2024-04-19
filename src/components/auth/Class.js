import React, { useState } from 'react';
import Navbar from './Navbar';
import './main.css';
import add from './img/add.png';

const Class = () => {
    const [isClassworkopen, setIsClasswork] = useState(false);
    const [isStream, setIsStream] = useState(true); // Mặc định mở Stream
    const [isPeople, setIspeople] = useState(false);
    const [isGroup, setIsGroup] = useState(false);

    const toggleClasswork = () => {
        setIsClasswork(!isClassworkopen);
        setIsStream(false);
        setIspeople(false);
        setIsGroup(false);
    };

    const toggleStream = () => {
        setIsStream(!isStream);
        setIsClasswork(false);
        setIspeople(false);
        setIsGroup(false);
    };

    const togglePeople = () => {
        setIspeople(!isPeople);
        setIsClasswork(false);
        setIsStream(false);
        setIsGroup(false);
    };

    const toggleGroup = () => {
        setIsGroup(!isGroup);
        setIsClasswork(false);
        setIsStream(false);
        setIspeople(false);
    };

    return (
        <div>
            <Navbar />
            <div className='container-main'>
                <div className='container-header'>
                    <div className={`header-1 ${isStream ? 'open' : ''}`} onClick={toggleStream}>Stream</div>
                    <div className={`header-1 ${isClassworkopen ? 'open' : ''}`} onClick={toggleClasswork}>Classworks</div>
                    <div className={`header-1 ${isPeople ? 'open' : ''}`} onClick={togglePeople}>People</div>
                    <div className={`header-1 ${isGroup ? 'open' : ''}`} onClick={toggleGroup}>Group</div>
                </div>
                {isClassworkopen && (
                    <div className='container-body'>
                        <div className='create-work'>
                            <img src={add} alt='Create' />
                            <p>Create</p>
                        </div>

                        <div className='works'>
                            show all homeworks
                        </div>

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
                        <div className='create-work'>
                            <img src={add} alt='Create' />
                            <p>Add group</p>
                        </div>
                        <div className='works'>
                            show all group here 
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default Class;
