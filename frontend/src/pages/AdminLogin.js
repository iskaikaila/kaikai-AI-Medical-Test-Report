import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAdminLogin = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.user.role === 'Admin') {
                    navigate('/admin-management'); // 管理员管理页面
                } else {
                    alert('You do not have admin privileges.');
                }
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Error logging in:', err);
            alert('An error occurred while logging in. Please try again.');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <label>
                Username:
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
            </label>
            <br />
            <label>
                Password:
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </label>
            <br />
            <button onClick={handleAdminLogin}>Login</button>
        </div>
    );
}

export default AdminLogin;
