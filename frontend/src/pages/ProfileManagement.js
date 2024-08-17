import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const sampleData = [
    { id: 1, name: 'John Doe', age: 30, gender: 'Male', testDetails: 'Blood Test - 2024-08-01' },
    { id: 2, name: 'Jane Smith', age: 28, gender: 'Female', testDetails: 'X-Ray - 2024-08-02' },
    { id: 3, name: 'Bob Johnson', age: 45, gender: 'Male', testDetails: 'MRI - 2024-08-03' },
];

function ProfileManagement() {
    const [searchField, setSearchField] = useState('name');
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

    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value);
    };

    const handleSearch = (event) => {
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

    const handleInputChange = (e) => {
        setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
    };

    const handleAddPatient = () => {
        // 这里可以处理将新患者添加到数据库的逻辑
        console.log('New patient added:', newPatient);

        // 清空表单并关闭模态框
        setNewPatient({ name: '', age: '', gender: '', testDetails: '' });
        handleCloseModal();
    };

    // 处理退出登录
    const handleLogout = () => {
        // 处理退出登录逻辑，如清除 token 或重定向到登录页面
        navigate('/login');
    };

    // 处理跳转到医生用户信息页面
    const handleGoToPersonalInfo = () => {
        navigate('/personal-information');
    };

    const filteredData = sampleData
        .filter(patient => {
            if (searchField === 'id' || searchField === 'age') {
                return patient[searchField].toString().includes(searchTerm);
            }
            return patient[searchField].toLowerCase().includes(searchTerm.toLowerCase());
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
        <div>
            <NavBar
                page="profile"
                onLogout={handleLogout}
                onGoToPersonalInfo={handleGoToPersonalInfo}
            />
            <h2>Profile Management</h2>
            <button onClick={handleOpenModal}>Add Patient</button> {/* 添加信息按钮 */}
            <div>
                <label htmlFor="searchField">Search by:</label>
                <select id="searchField" value={searchField} onChange={handleSearchFieldChange}>
                    <option value="name">Patient Name</option>
                    <option value="id">Patient ID</option>
                    <option value="age">Age</option>
                    <option value="gender">Gender</option>
                </select>
                <input
                    type="text"
                    placeholder={`Search by ${searchField}...`}
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>Patient ID {sortKey === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
                        <th onClick={() => handleSort('name')}>Patient Name {sortKey === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
                        <th onClick={() => handleSort('age')}>Age {sortKey === 'age' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
                        <th onClick={() => handleSort('gender')}>Gender {sortKey === 'gender' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
                        <th onClick={() => handleSort('testDetails')}>Test Details {sortKey === 'testDetails' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
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
                                <button onClick={() => handleViewDetails(patient.id)}>
                                    {patient.testDetails}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 模态框 */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New Patient</h2>
                        <form>
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newPatient.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Age:</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={newPatient.age}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Gender:</label>
                                <select
                                    name="gender"
                                    value={newPatient.gender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label>Test Details:</label>
                                <input
                                    type="text"
                                    name="testDetails"
                                    value={newPatient.testDetails}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <button type="button" onClick={handleAddPatient}>Add Patient</button>
                                <button type="button" onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileManagement;
