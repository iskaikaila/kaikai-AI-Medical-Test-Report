import React, { useState } from 'react';
import { register } from '../services/authService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, password);
            setMessage('注册成功，请登录。');
        } catch (err) {
            setError('注册失败，请重试。');
        }
    };

    return (
        <div>
            <h2>注册</h2>
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
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
                <button type="submit">注册</button>
            </form>
        </div>
    );
};

export default Register;
