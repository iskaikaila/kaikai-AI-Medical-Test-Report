import React from 'react';
import './PatientInformation.css';
import NavBar from './NavBar';
import avatarImage from '../images/avatarImage.png'; // Ensure this path is correct

function PatientInformation() {
    return (
        <div className="container">
            <div className="navbar-container">
                <NavBar />
            </div>
            <h2>患者个人信息</h2>
            <div className="personal-info clearfix">
                <div className="avatar">
                    <img src={avatarImage} alt="Patient Avatar" />
                </div>
                <div>
                    <p><strong>姓名:</strong> 李**</p>
                    <p><strong>性别:</strong> 男</p>
                    <p><strong>年龄:</strong> XX</p>
                    <p><strong>联系方式:</strong> XXXX-XXXXXXX</p>
                </div>
            </div>
            <div className="consultation-history">
                <h3>就诊历史</h3>
                <table>
                    <thead>
                    <tr>
                        <th>时间</th>
                        <th>检查命名</th>
                        <th>病症</th>
                        <th>检查状态</th>
                        <th>结果</th>
                        <th>建议</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Replace with dynamic data */}
                    <tr>
                        <td>12345</td>
                        <td>糖尿病初诊</td>
                        <td>糖尿病</td>
                        <td>完成</td>
                        <td>结果</td>
                        <td>建议</td>
                    </tr>
                    <tr>
                        <td>12345</td>
                        <td>糖尿病复诊</td>
                        <td>糖尿病</td>
                        <td>完成</td>
                        <td>结果</td>
                        <td>建议</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <button className="back-button" onClick={() => window.history.back()}>返回个人信息管理</button>
        </div>
    );
}

export default PatientInformation;