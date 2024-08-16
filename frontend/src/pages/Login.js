import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            localStorage.setItem('token', response.data.token);
            // 重定向到首页
            window.location.href = '/';
        } catch (err) {
            setError('登录失败，请检查用户名和密码。');
        }
    };

    return (
        <div>
            <h2>登录</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>用户名：</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>密码：</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">登录</button>
            </form>
            <p>还没有账户？ <Link to="/register">注册</Link></p>
        </div>
    );
};

export default Login;
