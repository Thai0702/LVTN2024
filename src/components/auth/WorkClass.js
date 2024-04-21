import React, { useState ,useEffect,useRef } from 'react';

const WorkClass = () => {
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
      
    </div>
  )
}

export default WorkClass
