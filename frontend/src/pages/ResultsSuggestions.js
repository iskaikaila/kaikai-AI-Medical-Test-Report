import React from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const resultData = {
    1: { 
        testType: 'Blood Test', 
        details: 'Blood test result showing normal levels.', 
        suggestions: 'Maintain a balanced diet and regular exercise.' 
    },
    2: { 
        testType: 'X-Ray', 
        details: 'X-Ray shows a minor fracture in the left arm.', 
        suggestions: 'Rest the arm and avoid heavy lifting.' 
    },
    3: { 
        testType: 'MRI', 
        details: 'MRI indicates no major issues.', 
        suggestions: 'Regular follow-up in 6 months.' 
    },
};

function ResultsSuggestions() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const result = resultData[id];

    const handleBackToPatientDetails = () => {
        navigate(`/patient/${id}`);
    };

    return (
        <div>
            <NavBar page="results" />
            <h2>Results and Suggestions</h2>
            <button onClick={handleBackToPatientDetails}>Back to Patient Details</button>
            <div>
                <h3>Test Type: {result?.testType}</h3>
                <p><strong>Details:</strong> {result?.details || 'No details available.'}</p>
                <p><strong>Suggestions:</strong> {result?.suggestions || 'No suggestions available.'}</p>
            </div>
        </div>
    );
}

export default ResultsSuggestions;
