import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'; 

function NavBar({ page, onLogout, onGoToPersonalInfo }) {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className='navbar'>
            <ul>
                {page !== 'details' && (
                    <li>
                        <button onClick={handleDoctorInfoClick}>Personal Information</button>
                    </li>
                )}
                <li>
                    <div className="user-avatar" onClick={toggleDropdown}>
                        <div className="avatar-container">
                            <span>User Avatar</span>
                            <img src="./ren.png" alt="User Avatar" />
                        </div>
                    </div>
                    {isDropdownOpen && (
                        <div className="dropdown">
                            <ul>
                                <li><button onClick={() => console.log('personal-information')}>personal-information</button></li>
                                <li><button onClick={handleLogoutClick}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
