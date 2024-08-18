import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function PatientInformation() {
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const [patientInfo, setPatientInfo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                console.log(`Fetching patient with ID: ${patientId}`);
                
                const patientResponse = await axios.get(`http://localhost:5001/api/patients/${patientId}`);
                console.log('Patient response:', patientResponse.data);
    
                if (patientResponse.data) {
                    setPatient(patientResponse.data);
                } else {
                    console.error('No patient data found');
                }
    
                const infoResponse = await axios.get(`http://localhost:5001/api/patients/patient-info/${patientId}`);
                console.log('Patient info response:', infoResponse.data);
    
                if (infoResponse.data) {
                    setPatientInfo(infoResponse.data);
                } else {
                    console.error('No patient info data found');
                }
    
            } catch (error) {
                console.error('Error fetching patient details:', error);
            }
        };
    
        fetchPatientDetails();
    }, [patientId]);

    const handleResultClick = (infoId) => {
        navigate(`/upload-file/${infoId}`);
    };

    const handleSuggestionClick = (infoId) => {
        navigate(`/result-suggestion/${infoId}`);
    };
    
    return (
        <div>
            <NavBar
                page="patientInfo"
                onLogout={() => navigate('/login')}
                onGoToPersonalInfo={() => navigate('/personal-information')}
            />
            <h2>Patient Information</h2>
            {patient ? (
                <div>
                    <div>
                        <h3>Personal Information</h3>
                        <p><strong>Name:</strong> {patient.name}</p>
                        <p><strong>Age:</strong> {patient.age}</p>
                        <p><strong>Gender:</strong> {patient.gender}</p>
                        <p><strong>Test Details:</strong> {patient.test_details}</p>
                    </div>
                    <div>
                        <h3>Consultation History</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Symptom</th>
                                    <th>Test Status</th>
                                    <th>Result</th>
                                    <th>Suggestion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patientInfo.map((info) => (
                                    <tr key={info.id}>
                                        <td>{info.symptoms}</td>
                                        <td>{info.test_status}</td>
                                        <td>
                                            <button onClick={() => handleResultClick(info.id)}>View Result</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleSuggestionClick(info.id)}>View Suggestion</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>Loading patient information...</p>
            )}
            <button onClick={() => navigate('/profile-management')}>Back to Profile Management</button>
        </div>
    );
}

export default PatientInformation;
