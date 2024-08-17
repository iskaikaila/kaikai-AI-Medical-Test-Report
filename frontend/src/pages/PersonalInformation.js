import React from 'react';
import NavBar from './NavBar';

function PersonalInformation() {

    const personalInfo = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 30,
        address: '1234 Main St, Anytown, USA'
    };

    return (
        <div>
            <NavBar />
            <div>
                <h2>Personal Information</h2>
                <p><strong>Name:</strong> {personalInfo.name}</p>
                <p><strong>Email:</strong> {personalInfo.email}</p>
                <p><strong>Age:</strong> {personalInfo.age}</p>
                <p><strong>Address:</strong> {personalInfo.address}</p>
            </div>
        </div>
    );
}

export default PersonalInformation;
