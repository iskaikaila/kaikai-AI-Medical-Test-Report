import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // 引入外部 CSS 文件

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
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
                navigate('/profile'); // 登录成功后跳转到档案管理页面
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    const handleNavigateToRegister = () => {
        navigate('/register');
    };

    const handleAdminLogin = () => {
        // 这里是管理员登录的逻辑
        console.log('Admin login button clicked');
    };

    return (
        <div>

            <div className="login-container">
        <img src="./people1.png" alt="People" className="people-image" />
        <img src="./brand-ye.png" alt="Brand" className="brand-image"/>
  
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input username-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input password-input"
                />
                 <button onClick={handleLogin} className="login-button">登录</button>
            </form>
            <div className='regist'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
             <button onClick={handleNavigateToRegister} className="Register-button" >注册</button>
            </div>
        </div>
        </div>
    );
}

export default Login;
