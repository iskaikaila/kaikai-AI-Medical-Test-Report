import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok && data.user) {
                // 根据用户角色导航到不同页面
                if (data.user.role === 'admin') {
                    navigate('/admin-management'); // 管理员页面
                } else {
                    navigate('/profile'); // 普通用户页面
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Error logging in:', err);
            setError('An error occurred while logging in. Please try again.');
        }
    };



    return (
        <div>
            <h2>Admin Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
            <button onClick={handleLogin}>Login</button>
            <br /><br />

        </div>
    );
}

export default Login;
