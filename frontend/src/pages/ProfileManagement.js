import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './PatientInformation.css'; 

const patientData = {
    1: { name: 'John Doe', gender: 'Male', age: 30, contact: '123-456-7890', history: [
            { date: '2024-07-15', testName: 'Blood Test', symptoms: 'Fatigue', status: 'Completed', result: 'Normal', suggestion: 'Maintain healthy diet', doctor: 'Dr. Smith' },
            { date: '2024-06-10', testName: 'X-Ray', symptoms: 'Arm Pain', status: 'Completed', result: 'Fracture in left arm', suggestion: 'Rest and avoid heavy lifting', doctor: 'Dr. Johnson' }
        ]},
    2: { name: 'Jane Smith', gender: 'Female', age: 28, contact: '987-654-3210', history: [
            { date: '2024-08-02', testName: 'X-Ray', symptoms: 'Back Pain', status: 'Pending', result: 'N/A', suggestion: 'N/A', doctor: 'Dr. Brown' },
        ]},
    3: { name: 'Bob Johnson', gender: 'Male', age: 45, contact: '555-555-5555', history: [
            { date: '2024-08-03', testName: 'MRI', symptoms: 'Headache', status: 'In Progress', result: 'N/A', suggestion: 'N/A', doctor: 'Dr. White' },
            { date: '2024-05-22', testName: 'CT Scan', symptoms: 'Chest Pain', status: 'Completed', result: 'No abnormalities detected', suggestion: 'Regular check-ups recommended', doctor: 'Dr. Taylor' }
        ]},
};

function PatientInformation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const patient = patientData[id];

    const [showCreateTest, setShowCreateTest] = useState(false);
    const [testName, setTestName] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [doctor, setDoctor] = useState('');

    const handleResultClick = (record) => {
        navigate(`/upload-medical-files/${id}/${record.testName}`);
    };

    const handleSuggestionClick = (record) => {
        navigate(`/results-suggestions/${id}/${record.testName}`);
    };

    const handleBackToProfile = () => {
        navigate('/profile');
    };

    const handleCreateTest = () => {
        alert(`Test created with name: ${testName}, symptoms: ${symptoms}, doctor: ${doctor}`);
        setShowCreateTest(false);
        setTestName('');
        setSymptoms('');
        setDoctor('');
    };

    const handleLogout = () => {
        console.log('Logging out');
        navigate('/login');
    };

    const handleGoToPersonalInfo = () => {
        console.log('Navigating to Doctor Information');
        navigate('/personal-information');
    };

    if (!patient) {
        return <div>Patient not found</div>;
    }

    return (
        <div className="page-container">
            <NavBar 
                page="information"
                onLogout={handleLogout}
                onGoToPersonalInfo={handleGoToPersonalInfo}
            />
            <img src="/头像 .png" alt="头像" className='tou-logo1' />
            <div className="text-1">
                <h2>Patient Information</h2>
            </div>
            <div className="text-2">
                <button className='button-back' onClick={handleBackToProfile}>Back to Profile Management</button>
            </div>
            <div className="text-h3">
                <h3 >Consultation History</h3>
            </div>
            
            <div className="text-4">
                <h3>Personal Information</h3>
                <div className='info-no'>
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Contact:</strong> {patient.contact}</p>
                </div>
            </div>
            
            
            <div className='History-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Test Name</th>
                            <th>Symptoms</th>
                            <th>Status</th>
                            <th>Result</th>
                            <th>Suggestion</th>
                            <th>Doctor</th>
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
                                <td>{record.doctor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className='input-text'>
                <button className='button-create' onClick={() => setShowCreateTest(true)}>Create Test</button>
                
                {showCreateTest && (
                    <div className='modal-overlay'>
                        <div className='modal-content'>
                            <h3 className='text-5'>Create New Test</h3>
                            <label>
                                Test Name:
                                <input
                                    type="text"
                                    value={testName}
                                    onChange={(e) => setTestName(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Symptoms:
                                <input
                                    type="text"
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Doctor:
                                <input
                                    type="text"
                                    value={doctor}
                                    onChange={(e) => setDoctor(e.target.value)}
                                />
                            </label>
                            <br />
                            <button onClick={handleCreateTest}>Submit</button>
                            <button onClick={() => setShowCreateTest(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
            <img src={process.env.PUBLIC_URL + '/brand-ye.png'} alt="Brand Logo" className="header-logo" />
        </div>
    );
}

export default PatientInformation;
