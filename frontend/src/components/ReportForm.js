import React, { useState } from 'react';
import { createReport } from '../services/reportService';

const ReportForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createReport(title, content);
            setMessage('验单创建成功。');
            setTitle('');
            setContent('');
        } catch (err) {
            setError('创建验单失败，请重试。');
        }
    };

    return (
        <div>
            <h2>创建验单</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>标题：</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>内容：</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
                <button type="submit">创建</button>
            </form>
        </div>
    );
};

export default ReportForm;
