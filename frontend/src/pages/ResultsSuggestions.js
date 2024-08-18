import React from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './ResultsSuggestions.css'; 

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

    if (!result) {
        return (
            <div>
                <NavBar page="results" />
                <h2 className='title-h3'>Results and Suggestions</h2>
                <img src="/brand-ye.png" alt="Brand Logo" className='header-logo' />
                <div className='button-container'>
                    <button className='button-back-to-Patient' onClick={handleBackToPatientDetails}>
                        Back to Patient Details
                    </button>
                </div>
                <div className='result-suggestions'>
                    <p>No results found for the specified ID.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <NavBar page="results" />
            <h2 className='title-h3'>Results and Suggestions</h2>
            <img src="/brand-ye.png" alt="Brand Logo" className='header-logo' />
            <div className='button-container'>
                <button className='button-back-to-Patient' onClick={handleBackToPatientDetails}>
                    Back to Patient Details
                </button>
            </div>
            <div className='result-suggestions'>
                <h3>Test Type: {result.testType}</h3>
                <p><strong>Details:</strong> {result.details}</p>
                <p><strong>Suggestions:</strong> {result.suggestions}</p>
            </div>
        </div>
    );
}

export default ResultsSuggestions;
