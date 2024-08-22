import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BE_URL } from '../../../utils/Url_request';

const UpdateReport = () => {
    return (
        <div>
            <h2>Update Report</h2>
                    <input
                        type="text"
                        name="requestOfProject"                      
                        placeholder="Report của group"
                        readOnly 
                    />
                    <input
                        type="time"
                        name="expiredTime"                    
                        placeholder="Thời gian hết hạn"
                    />
                    <input
                        type="date"
                        name="expiredDate"                   
                        placeholder="Ngày hết hạn"
                    />
                    <input
                        type="text"                      
                        placeholder="Chủ đề"
                    />
                    <input
                        type="text"
                        name="requestDescription"                 
                        placeholder="Mô tả"
                    />
                    <button type="submit">Lưu</button>
        </div>
    );
};
export default UpdateReport;
