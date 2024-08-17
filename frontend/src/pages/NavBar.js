import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 在这里处理退出登录逻辑，如清除本地存储中的 token
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                <li><Link to="/personal-information">Personal Information</Link></li>
                <li><Link to="/upload">Upload File</Link></li>
                <li><Link to="/results-suggestions">Results & Suggestions</Link></li>
                <li><Link to="/profile">Profile Management</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
}

export default NavBar;
