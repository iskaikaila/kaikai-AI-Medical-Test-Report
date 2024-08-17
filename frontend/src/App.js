import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PersonalInformation from './pages/PersonalInformation';
import UploadFile from './pages/UploadFile';
import ProfileManagement from './pages/ProfileManagement';
import PatientDetails from './pages/PatientDetails';
import FileDetails from './pages/FileDetails';  // 新增引入
import ResultsSuggestions from './pages/ResultsSuggestions';  // 新增引入

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/personal-information" element={<PersonalInformation />} />
                    <Route path="/upload" element={<UploadFile />} />
                    <Route path="/profile" element={<ProfileManagement />} />
                    <Route path="/patient/:id" element={<PatientDetails />} />
                    <Route path="/file-details/:id/:type" element={<FileDetails />} /> 
                    <Route path="/results-suggestions/:id/:type" element={<ResultsSuggestions />} /> 
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
