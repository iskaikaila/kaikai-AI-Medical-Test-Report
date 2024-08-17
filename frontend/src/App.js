import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PersonalInformation from './pages/PersonalInformation';
import UploadFile from './pages/UploadFile';
import ResultsSuggestions from './pages/ResultsSuggestions';
import ProfileManagement from './pages/ProfileManagement';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/personal-information" element={<PersonalInformation />} />
                    <Route path="/upload" element={<UploadFile />} />
                    <Route path="/results-suggestions" element={<ResultsSuggestions />} />
                    <Route path="/profile" element={<ProfileManagement />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
