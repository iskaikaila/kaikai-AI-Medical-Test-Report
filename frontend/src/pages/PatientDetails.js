import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const patientData = {
    1: { name: 'John Doe', gender: 'Male', age: 30, contact: '123-456-7890', history: [
            { date: '2024-07-15', type: 'Blood Test', status: 'Completed', result: 'Normal', suggestion: 'Maintain healthy diet' },
            { date: '2024-06-10', type: 'X-Ray', status: 'Completed', result: 'Fracture in left arm', suggestion: 'Rest and avoid heavy lifting' }
        ]},
    2: { name: 'Jane Smith', gender: 'Female', age: 28, contact: '987-654-3210', history: [
            { date: '2024-08-02', type: 'X-Ray', status: 'Pending', result: 'N/A', suggestion: 'N/A' },
        ]},
    3: { name: 'Bob Johnson', gender: 'Male', age: 45, contact: '555-555-5555', history: [
            { date: '2024-08-03', type: 'MRI', status: 'In Progress', result: 'N/A', suggestion: 'N/A' },
            { date: '2024-05-22', type: 'CT Scan', status: 'Completed', result: 'No abnormalities detected', suggestion: 'Regular check-ups recommended' }
        ]},
};

function PatientDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const patient = patientData[id];

    if (!patient) {
        return <div>Patient not found</div>;
    }

    const handleResultClick = (record) => {
        navigate(`/file-details/${id}/${record.type}`);
    };

    const handleSuggestionClick = (record) => {
        navigate(`/results-suggestions/${id}/${record.type}`);
    };

    return (
        <div>
            <NavBar page="details" />
            <h2>Patient Details</h2>
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
                            <th>Type</th>
                            <th>Status</th>
                            <th>Result</th>
                            <th>Suggestion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patient.history.map((record, index) => (
                            <tr key={index}>
                                <td>{record.date}</td>
                                <td>{record.type}</td>
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
            </div>
        </div>
    );
}

export default PatientDetails;
