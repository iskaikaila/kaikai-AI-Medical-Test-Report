import React from 'react';
import NavBar from './NavBar';
import './PersonalInformation.css'; 


function PersonalInformation() {

    const doctorInfo = {
        name: 'Dr. John Doe',
        email: 'dr.johndoe@example.com',
        specialty: 'Cardiology',
        phone: '555-1234',
        clinicAddress: '1234 Heart St, Cardiotown, USA'
    };

    return (
        <div className='container'>
            <NavBar />
            <header>
                {/* <img src="/brand-ye.png" alt="Brand Logo" className='header-logo1' /> */}
                <br></br>
                <div className="header-text1">Welcome to Medixal</div>
            </header>
            <div className='information-container'>
                <h2>Doctor's Personal Information</h2>
                <p><strong>Name:</strong> {doctorInfo.name}</p>
                <p><strong>Email:</strong> {doctorInfo.email}</p>
                <p><strong>Specialty:</strong> {doctorInfo.specialty}</p>
                <p><strong>Phone:</strong> {doctorInfo.phone}</p>
                <p><strong>Clinic Address:</strong> {doctorInfo.clinicAddress}</p>
            </div>
        </div>
    );
}

export default PersonalInformation;