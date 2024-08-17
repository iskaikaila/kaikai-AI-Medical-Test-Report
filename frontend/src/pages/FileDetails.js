import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

const fileDetailsData = {
    "Blood Test": "Here you would see the blood test report, including images and data.",
    "X-Ray": "This is the X-Ray report, displaying images and analysis results.",
    "MRI": "The MRI scan images and detailed report will be displayed here."
    // 根据测试类型添加更多的详情数据
};

function FileDetails() {
    const { id, type } = useParams();
    const details = fileDetailsData[type] || "No details available for this test type.";

    return (
        <div>
            <NavBar />
            <h2>File Details for Patient {id}</h2>
            <h3>{type} Report</h3>
            <p>{details}</p>
            {/* 这里可以根据需要添加具体的图片展示或其他详细信息 */}
        </div>
    );
}

export default FileDetails;
