import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar({ page, onLogout, onGoToPersonalInfo }) {
    const navigate = useNavigate();

    const handleDoctorInfoClick = () => {
        if (onGoToPersonalInfo) {
            onGoToPersonalInfo();
        } else {
            navigate('/personal-information');
        }
    };

    const handleLogoutClick = () => {
        if (onLogout) {
            onLogout();
        } else {
            navigate('/login');
        }
    };

    return (
        <nav>
            <ul>
                {page !== 'details' && (
                    <li>
                        <button onClick={handleDoctorInfoClick}>Personal Information</button>
                    </li>
                )}
                <li>
                    <button onClick={handleLogoutClick}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
