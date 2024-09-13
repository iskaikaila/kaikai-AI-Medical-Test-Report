import React, { useState } from 'react';
import './NavBar.css'; // Ensure this is the correct CSS file path
import userIcon from './images/user.png'; // Adjust the path if necessary

function NavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDoctorInfoClick = () => {
        window.location.href = '/doctor-information';
    };

    const handleLogoutClick = () => {
        window.location.href = '/logout';
    };

    return (
        <div className="navbar">
            <div className="user-info" onClick={toggleDropdown}>
                <div className="user-icon">
                    <img src={userIcon} alt="User Icon" />
                    <span>（用户）</span>
                </div>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={handleDoctorInfoClick}>修改密码</button>
                        <button className="dropdown-item" onClick={handleLogoutClick}>退出登录</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavBar;
