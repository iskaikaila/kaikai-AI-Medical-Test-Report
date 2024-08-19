import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UploadFile() {
    const { infoId } = useParams();
    const [file, setFile] = useState(null);
    const [symptomName, setSymptomName] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/patient-info/${infoId}`);
                console.log('Response data:', response.data);  // 打印响应数据
                setSymptomName(response.data.symptoms); // 假设症状名称字段是 `symptoms`
                setUploadedFiles(response.data.files);   // 假设文件列表字段是 `files`
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [infoId]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file_name', file.name);
        data.append('file_path', file);  // 将文件对象直接作为路径上传

        try {
            await axios.post(`http://localhost:5001/api/patients/files`, {
                patient_info_id: infoId, // 确保 infoId 是整数类型的 `patient_info_id`
                file_name: file.name,
                file_path: file.name
            });
            alert('File uploaded successfully!');
            navigate(`/patient/${infoId}`);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h2>Upload Test Result File</h2>
            <p><strong>Symptom:</strong> {symptomName}</p>
            
            <h3>Uploaded Files</h3>
            <ul>
                {uploadedFiles.map((file, index) => (
                    <li key={index}>
                        <a href={`http://localhost:5001/uploads/${file.file_path}`} target="_blank" rel="noopener noreferrer">
                            {file.file_name}
                        </a>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default UploadFile;
