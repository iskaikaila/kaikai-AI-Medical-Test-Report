import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileManagement.css'; // Assuming the CSS is saved as ProfileManagement.css

// Import the logo images
import treeLogo from './images/tree-2.png'; // Adjust path based on your project structure
import brandLogo from './images/brand.png'; // Adjust path based on your project structure

const sampleData = [
    { id: 12345, name: '张三', age: 18, gender: '男', testDetails: '患者详情' },
    { id: 12345, name: '李四', age: 25, gender: '女', testDetails: '患者详情' },
];

function ProfileManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPatient, setNewPatient] = useState({
        name: '',
        age: '',
        gender: '',
        testDetails: ''
    });
    const navigate = useNavigate();

    const handleSearch = () => {
        // Perform search logic here
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (key) => {
        let order = 'asc';
        if (sortKey === key && sortOrder === 'asc') {
            order = 'desc';
        }
        setSortKey(key);
        setSortOrder(order);
    };

    const handleViewDetails = (patientId) => {
        navigate(`/patient/${patientId}`);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddPatient = () => {
        console.log('New patient added:', newPatient);
        setNewPatient({ name: '', age: '', gender: '', testDetails: '' });
        handleCloseModal();
    };

    const filteredData = sampleData
        .filter(patient => {
            return patient.name.includes(searchTerm) || patient.id.toString().includes(searchTerm);
        })
        .sort((a, b) => {
            if (sortKey) {
                if (sortOrder === 'asc') {
                    return a[sortKey] > b[sortKey] ? 1 : -1;
                } else {
                    return a[sortKey] < b[sortKey] ? 1 : -1;
                }
            }
            return 0;
        });

    return (
        <div className="profile-management">
            <header className="header">
                <img src={treeLogo} alt="Logo" className="logo" />
                <img src={brandLogo} alt="Brand" className="brand" />
            </header>
            <h2>患者管理</h2>
            <div className="actions">
                <input
                    type="text"
                    placeholder="请输入患者ID"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>搜索</button>
                <button onClick={handleOpenModal}>添加患者</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>
                        患者ID {sortKey === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('name')}>
                        患者姓名 {sortKey === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('age')}>
                        年龄 {sortKey === 'age' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('gender')}>
                        性别 {sortKey === 'gender' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th>患者详情</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((patient) => (
                    <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>{patient.name}</td>
                        <td>{patient.age}</td>
                        <td>{patient.gender}</td>
                        <td>
                            <button className="details-button" onClick={() => handleViewDetails(patient.id)}>
                                {patient.testDetails}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>添加新患者</h2>
                        <form>
                            <div>
                                <label>姓名:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newPatient.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>年龄:</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={newPatient.age}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>性别:</label>
                                <select
                                    name="gender"
                                    value={newPatient.gender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">选择性别</option>
                                    <option value="男">男</option>
                                    <option value="女">女</option>
                                </select>
                            </div>
                            <div>
                                <label>检查详情:</label>
                                <input
                                    type="text"
                                    name="testDetails"
                                    value={newPatient.testDetails}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <button type="button" onClick={handleAddPatient}>添加患者</button>
                                <button type="button" onClick={handleCloseModal}>取消</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileManagement;
