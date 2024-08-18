import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminManagement() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('name');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [newUser, setNewUser] = useState({
        id: '',
        username: '',
        password: '',
        department: '',
        role: '',
        phone: '',
        email: '',
        address: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/auth/users');
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/auth/admin/register', newUser);
            setUsers([...users, response.data.user]);
            setNewUser({ id: '', username: '', password: '', department: '', role: '', phone: '', email: '', address: '' });
            setShowRegistrationForm(false);
            alert('User registered successfully');
        } catch (error) {
            console.error('Error registering user:', error);
            alert(error.response?.data?.message || 'Error registering user');
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
        // 检查 user[searchField] 是否为 undefined 或 null
        if (user[searchField] === undefined || user[searchField] === null) {
            return false;
        }
        return user[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    return (
        <div>
            <h2>Admin Management</h2>

            <div>
                <label>
                    Search Field:
                    <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="department">Department</option>
                        <option value="role">Role</option>
                        <option value="id">ID</option>
                        <option value="registration_time">Registration Time</option>
                        <option value="phone">Phone</option>
                        <option value="email">Email</option>
                        <option value="address">Address</option>
                    </select>
                </label>

                <input
                    type="text"
                    placeholder={`Search by ${searchField}...`}
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <button onClick={() => setShowRegistrationForm(true)}>Register New User</button>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>ID</th>
                        <th onClick={() => handleSort('username')}>Username</th>
                        <th onClick={() => handleSort('department')}>Department</th>
                        <th onClick={() => handleSort('role')}>Role</th>
                        <th onClick={() => handleSort('registration_time')}>Registration Time</th>
                        <th onClick={() => handleSort('phone')}>Phone</th>
                        <th onClick={() => handleSort('email')}>Email</th>
                        <th onClick={() => handleSort('address')}>Address</th>
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
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showRegistrationForm && (
                <div>
                    <h3>Register New User</h3>
                    <label>
                        ID:
                        <input
                            type="text"
                            value={newUser.id}
                            onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Username:
                        <input
                            type="text"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Department:
                        <input
                            type="text"
                            value={newUser.department}
                            onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Role:
                        <input
                            type="text"
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Phone:
                        <input
                            type="text"
                            value={newUser.phone}
                            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="text"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Address:
                        <input
                            type="text"
                            value={newUser.address}
                            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                        />
                    </label>
                    <br />
                    <button onClick={handleRegister}>Submit</button>
                    <button onClick={() => setShowRegistrationForm(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default AdminManagement;
