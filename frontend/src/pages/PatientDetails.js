import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const patientData = {
    1: { name: 'John Doe', gender: 'Male', age: 30, contact: '123-456-7890', history: [
            { date: '2024-07-15', testName: 'Blood Test', symptoms: 'Fatigue', status: 'Completed', result: 'Normal', suggestion: 'Maintain healthy diet' },
            { date: '2024-06-10', testName: 'X-Ray', symptoms: 'Arm Pain', status: 'Completed', result: 'Fracture in left arm', suggestion: 'Rest and avoid heavy lifting' }
        ]},
    2: { name: 'Jane Smith', gender: 'Female', age: 28, contact: '987-654-3210', history: [
            { date: '2024-08-02', testName: 'X-Ray', symptoms: 'Back Pain', status: 'Pending', result: 'N/A', suggestion: 'N/A' },
        ]},
    3: { name: 'Bob Johnson', gender: 'Male', age: 45, contact: '555-555-5555', history: [
            { date: '2024-08-03', testName: 'MRI', symptoms: 'Headache', status: 'In Progress', result: 'N/A', suggestion: 'N/A' },
            { date: '2024-05-22', testName: 'CT Scan', symptoms: 'Chest Pain', status: 'Completed', result: 'No abnormalities detected', suggestion: 'Regular check-ups recommended' }
        ]},
};

function PatientDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const patient = patientData[id];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTest, setNewTest] = useState({
        testName: '',
        symptoms: '',
        doctor: ''
    });

    if (!patient) {
        return <div>Patient not found</div>;
    }

    const handleResultClick = (record) => {
        navigate(`/file-details/${id}/${record.testName}`);
    };

    const handleSuggestionClick = (record) => {
        navigate(`/results-suggestions/${id}/${record.testName}`);
    };

    const handleBackToProfile = () => {
        navigate('/profile');
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        setNewTest({ ...newTest, [e.target.name]: e.target.value });
    };

    const handleCreateTest = () => {
        // 处理新检查的逻辑，比如将新检查信息保存到数据库
        console.log('New test created:', newTest);

        // 清空表单并关闭模态框
        setNewTest({ testName: '', symptoms: '', doctor: '' });
        handleCloseModal();
    };

    return (
        <div>
            <NavBar page="details" />
            <h2>Patient Details</h2>
            <button onClick={handleBackToProfile}>Back to Profile Management</button>
            <div>
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Contact:</strong> {patient.contact}</p>
            </div>
            <div>
                <h3>Consultation History</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Test Name</th>
                            <th>Symptoms</th>
                            <th>Status</th>
                            <th>Result</th>
                            <th>Suggestion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patient.history.map((record, index) => (
                            <tr key={index}>
                                <td>{record.date}</td>
                                <td>{record.testName}</td>
                                <td>{record.symptoms}</td>
                                <td>{record.status}</td>
                                <td>
                                    <button onClick={() => handleResultClick(record)}>
                                        {record.result}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleSuggestionClick(record)}>
                                        {record.suggestion}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleOpenModal}>Create New Test</button>
            </div>

            {/* 模态框 */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create New Test</h2>
                        <form>
                            <div>
                                <label>Test Name:</label>
                                <input
                                    type="text"
                                    name="testName"
                                    value={newTest.testName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Symptoms:</label>
                                <input
                                    type="text"
                                    name="symptoms"
                                    value={newTest.symptoms}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Doctor:</label>
                                <input
                                    type="text"
                                    name="doctor"
                                    value={newTest.doctor}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <button type="button" onClick={handleCreateTest}>Create Test</button>
                                <button type="button" onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PatientDetails;
