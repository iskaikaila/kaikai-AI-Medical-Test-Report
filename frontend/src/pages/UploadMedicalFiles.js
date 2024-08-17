import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function UploadMedicalFiles() {
    const { id, type } = useParams(); // 接收 id 和 type (testName)
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

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

    return (
        <div>
            <NavBar page="upload-medical-files" />
            <h2>Upload Medical Files for {type}</h2>
            <button onClick={handleBackToPatientDetails}>Back to Patient Details</button>
            <div>
                <h3>Select files to upload:</h3>
                <input type="file" multiple onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload Files</button>
            </div>
            {uploadedFiles.length > 0 && (
                <div>
                    <h3>Uploaded Files:</h3>
                    <ul>
                        {uploadedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <button onClick={handleGenerateResults} disabled={uploadedFiles.length === 0}>
                    Generate Results
                </button>
            </div>
        </div>
    );
}

export default UploadMedicalFiles;
