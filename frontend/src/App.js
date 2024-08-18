import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PersonalInformation from './pages/PersonalInformation';
import UploadFile from './pages/UploadFile';
import ProfileManagement from './pages/ProfileManagement';
import PatientInformation from './pages/PatientInformation';  
import UploadMedicalFiles from './pages/UploadMedicalFiles';
import ResultsSuggestions from './pages/ResultsSuggestions'; 
import AdminLogin from './pages/AdminLogin'; 
import AdminManagement from './pages/AdminManagement'; 


<<<<<<< HEAD
=======



>>>>>>> 29183519 (add upload file)
function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
<<<<<<< HEAD
                    <Route path="/personal-information" element={<PersonalInformation />} />
                    <Route path="/upload" element={<UploadFile />} />
=======
                    <Route path="/personal-information/:id/:testName" element={<PersonalInformation />} />
                    {/* <Route path="/upload" element={<UploadFile />} /> */}
>>>>>>> 29183519 (add upload file)
                    <Route path="/profile" element={<ProfileManagement />} />
                    <Route path="/patient/:id" element={<PatientInformation />} />
                    <Route path="/upload-medical-files/:id/:type" element={<UploadMedicalFiles />} /> 
                    {/* <Route path="/results-suggestions/:id/:type" element={<ResultsSuggestions />} />  */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/admin-management" element={<AdminManagement />} />  
<<<<<<< HEAD
=======

                    
                    <Route path="/patient/:patientId" element={<PatientInformation />} />
                    <Route path="/upload-file/:infoId" element={<UploadFile />} />
                <Route path="/result-suggestion/:infoId" element={<ResultsSuggestions />} />
>>>>>>> 29183519 (add upload file)
                </Routes>
            </div>
        </Router>
    );
}

export default App;
