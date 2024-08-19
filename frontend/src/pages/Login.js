import React, { useState } from 'react';
import './Login.css';
import logo from '../images/brand.png';
import leaf from '../images/tree-2.png';
import scene from '../images/Examples_scene-2.png';



function Login({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
                if (data.user.role === 'admin') {
                    window.location.href = '/admin-management';
                } else {
                    window.location.href = '/profile';
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
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <div className="login-header">
                    <img src={logo} alt="MedixAI" className="login-logo" />
                    <img src={leaf} alt="Leaf" className="login-leaf" />
                </div>
                <h2>登录</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="login-inputs">
                    <label>
                        <input
                            type="text"
                            placeholder="请输入个人ID"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="password"
                            placeholder="请输入登录密码"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button className="login-button" onClick={handleLogin}>登录</button>
                <button className="admin-login-button" onClick={handleLogin}>登录（管理员）</button>
                <div className="login-image">
                    <img src={scene} alt="Scene" className="login-scene" />
                </div>
            </div>
        </div>
    );
}

export default Login;