import React, { useEffect, useState } from 'react';
import { getReports } from '../services/reportService';
import ReportForm from '../components/ReportForm';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getReports();
                setReports(response.data);
                setLoading(false);
            } catch (err) {
                console.error('获取验单失败：', err);
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return <p>加载中...</p>;
    }

    return (
        <div>
            <h2>验单列表</h2>
            <ReportForm />
            <ul>
                {reports.map((report) => (
                    <li key={report._id}>
                        <h3>{report.title}</h3>
                        <p>{report.content}</p>
                        <p>创建者：{report.createdBy.username}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reports;
