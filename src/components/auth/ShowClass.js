import React from 'react';
import css from './PageTeacher/css/showclass.css'
const ShowClass = ({ classList }) => {
    return (
        <div className='class-list-show'>
            {classList.map((classItem) => (
                <div className='container-show'>
                    <div key={classItem.class_id} className='class-item-show'>
                        <h3>{classItem.subject_name}</h3>
                        <div className='show-2'>                           
                        </div>
                    </div>
                </div>

            ))}
        </div>

    );
};

export default ShowClass;
