import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './UploadMedicalFiles.css'; 

function UploadMedicalFiles() {
    const { id, type } = useParams(); // 接收 id 和 type (testName)
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [report, setReport] = useState({
        symptoms: '',
        food: '',
        medication: '',
        exercise: '',
        routine: ''
    });

    const handleFileChange = (event) => {
        setSelectedFiles(Array.from(event.target.files));
    };

    const handleUpload = () => {
        if (selectedFiles.length === 0) {
            alert('Please select files to upload.');
            return;
        }

        // 模拟文件上传
        setUploadedFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        setSelectedFiles([]);

        alert('Files uploaded successfully!');
    };

    const handleGenerateResults = () => {
        // 模拟生成结果的逻辑
        alert('Results have been generated.');
        navigate(`/results-suggestions/${id}/${type}`); // 跳转到结果建议页面
    };

    const handleBackToPatientDetails = () => {
        navigate(`/patient/${id}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReport(prevReport => ({
            ...prevReport,
            [name]: value
        }));
    };

    const handleSaveReport = () => {
        // 模拟保存报告的逻辑
        alert('Report saved successfully!');
        // 这里可以添加保存报告的逻辑
    };

    const handleDownloadReport = () => {
        // 模拟下载报告的逻辑
        alert('Report downloaded successfully!');
        // 这里可以添加下载报告的逻辑
    };

    return (
        <div className='big-container'>
            <NavBar page="upload-medical-files" />
            <img src="/brand-ye.png" alt="Brand Logo" className='header-logo1' />
            <h2>Upload Medical Files for {type}</h2>
            <button className='button-back-to-Patient-Details' onClick={handleBackToPatientDetails}>
                Back to Patient Details
            </button>

            <div className='frame-upload-info1'>
                <h3>Select files to upload:</h3>
                <input type="file" multiple onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload Files</button>
            </div>

            {uploadedFiles.length > 0 && (
                <div className='frame-upload-info2'>
                    <h3 className='uploaded-files-heading'>Uploaded Files:</h3>
                    <ul>
                        {uploadedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className='frame-upload-info3'>
                <button onClick={handleGenerateResults} disabled={uploadedFiles.length === 0}>
                    Generate Results
                </button>
            </div>

            <div className='report-container'>
                <h3>Suggestions</h3>
                <input
                    type="text"
                    name="symptoms"
                    placeholder="Symptoms"
                    value={report.symptoms}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="food"
                    placeholder="Food"
                    value={report.food}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="medication"
                    placeholder="Medication"
                    value={report.medication}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="exercise"
                    placeholder="Exercise"
                    value={report.exercise}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="routine"
                    placeholder="Routine"
                    value={report.routine}
                    onChange={handleInputChange}
                />
                <div className='report-buttons'>
                    <button onClick={handleSaveReport}>Save Report</button>
                    <button onClick={handleDownloadReport}>Download Report</button>
                </div>
            </div>
        </div>
    );
}

export default UploadMedicalFiles;
