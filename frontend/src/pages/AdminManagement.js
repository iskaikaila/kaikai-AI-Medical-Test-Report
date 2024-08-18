import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminManagement.css';  // Ensure this is linked correctly
import userIcon from './images/形状.png';
import brandText from './images/brand.png';
import brandLeaf from './images/tree-2.png';
import adminTitle from './images/管理员管理界面.png';

function AdminManagement() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('username');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [newUser, setNewUser] = useState({
        id: '',
        username: '',
        password: '',
        department: '',
        role: 'user', // Default value
        phone: '',
        email: '',
        address: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch users from the database on component load
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/auth/users');
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error('Data format is incorrect:', response.data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!newUser.id) {
            newErrors.id = 'ID是必需的。'; // ID is required.
        }
        if (!newUser.username) {
            newErrors.username = '用户名是必需的。'; // Username is required.
        }
        if (!newUser.password) {
            newErrors.password = '密码是必需的。'; // Password is required.
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(newUser.password)) {
            newErrors.password = '密码必须至少为8个字符，并包含大小写字母和数字。'; // Password must be at least 8 characters long and include uppercase, lowercase, and numbers.
        }
        if (!newUser.role) {
            newErrors.role = '角色是必需的。'; // Role is required.
        }
        if (!/^\d+$/.test(newUser.phone)) {
            newErrors.phone = '电话必须是数字字符串。'; // Phone must be a numeric string.
        }
        if (!/\S+@\S+\.\S+/.test(newUser.email)) {
            newErrors.email = '邮箱地址无效。'; // Email must be a valid email address.
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/api/auth/admin/register', newUser);
            setUsers([...users, response.data.user]);
            setNewUser({ id: '', username: '', password: '', department: '', role: 'user', phone: '', email: '', address: '' });
            setShowRegistrationForm(false);
            setErrors({});
            alert('User registered successfully');
        } catch (error) {
            console.error('Error registering user:', error);
            setErrors({ form: error.response?.data?.message || 'Error registering user' });
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/auth/admin/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filteredUsers = sortedUsers.filter(user => {
        return user[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleInputChange = (field, value) => {
        setNewUser({ ...newUser, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <div className="logo-container">
                    <img src={brandText} alt="MedixAI Logo" className="logo-text" />
                    <img src={brandLeaf} alt="MedixAI Leaf" className="logo-leaf" />
                </div>
                <img src={adminTitle} alt="管理员管理界面" className="admin-title" />
            </div>

            <div className="search-section">
                <select
                    className="filter-select"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                >
                    <option value="id">用户ID</option>
                    <option value="username">用户名</option>
                    <option value="department">科室</option>
                    <option value="role">权限</option>
                    <option value="registration_time">注册时间</option>
                </select>
                <input
                    type="text"
                    className="search-input"
                    placeholder={`请输入${searchField}`}
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button className="search-button">搜索</button>
                <img src={userIcon} alt="Add User" className="add-user-icon" onClick={() => setShowRegistrationForm(true)} />
            </div>

            <table className="user-table">
                <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>
                        用户ID {sortConfig.key === 'id' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}
                    </th>
                    <th onClick={() => handleSort('username')}>
                        用户姓名 {sortConfig.key === 'username' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}
                    </th>
                    <th onClick={() => handleSort('department')}>
                        科室 {sortConfig.key === 'department' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}
                    </th>
                    <th onClick={() => handleSort('role')}>
                        权限 {sortConfig.key === 'role' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}
                    </th>
                    <th onClick={() => handleSort('registration_time')}>
                        注册时间 {sortConfig.key === 'registration_time' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}
                    </th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.map((user, index) => (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.department}</td>
                        <td>{user.role}</td>
                        <td>{user.registration_time}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showRegistrationForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setShowRegistrationForm(false)}>×</span>
                        <h3>注册新用户</h3>
                        <label>
                            用户ID:
                            <input
                                type="text"
                                value={newUser.id}
                                onChange={(e) => handleInputChange('id', e.target.value)}
                            />
                            {errors.id && <p style={{ color: 'red' }}>{errors.id}</p>}
                        </label>
                        <label>
                            用户姓名:
                            <input
                                type="text"
                                value={newUser.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                            />
                            {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                        </label>
                        <label>
                            密码:
                            <input
                                type="password"
                                value={newUser.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                            />
                            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                        </label>
                        <label>
                            科室:
                            <input
                                type="text"
                                value={newUser.department}
                                onChange={(e) => handleInputChange('department', e.target.value)}
                            />
                        </label>
                        <label>
                            权限:
                            <select
                                value={newUser.role}
                                onChange={(e) => handleInputChange('role', e.target.value)}
                            >
                                <option value="user">用户</option>
                                <option value="admin">管理员</option>
                            </select>
                            {errors.role && <p style={{ color: 'red' }}>{errors.role}</p>}
                        </label>
                        <label>
                            电话:
                            <input
                                type="text"
                                value={newUser.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                            {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
                        </label>
                        <label>
                            邮箱:
                            <input
                                type="text"
                                value={newUser.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                        </label>
                        <label>
                            地址:
                            <input
                                type="text"
                                value={newUser.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                        </label>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={handleRegister}>提交</button>
                            <button onClick={() => setShowRegistrationForm(false)}>取消</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default AdminManagement;
