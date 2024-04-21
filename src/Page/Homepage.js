import React, { useState, useEffect } from 'react';
import Navbar from '../components/auth/Navbar';
import ShowClass from '../components/auth/ShowClass';

const Home = () => {
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/class');
        const classData = await response.json();
        setClassList(classData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='home-main'>
        <div className='show-class'>
          <ShowClass classList={classList} />
        </div>
      </div>
    </div>
  );
};

export default Home;
