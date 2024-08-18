import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PersonalInformation from './pages/PersonalInformation';

import ProfileManagement from './pages/ProfileManagement';
import PatientInformation from './pages/PatientInformation';  
import UploadMedicalFiles from './pages/UploadMedicalFiles';
import ResultsSuggestions from './pages/ResultsSuggestions'; 


function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/personal-information" element={<PersonalInformation />} />

                    <Route path="/profile" element={<ProfileManagement />} />
                    <Route path="/patient/:id" element={<PatientInformation />} />
                    <Route path="/upload-medical-files/:id/:type" element={<UploadMedicalFiles />} /> 
                    <Route path="/results-suggestions/:id/:type" element={<ResultsSuggestions />} /> 
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
