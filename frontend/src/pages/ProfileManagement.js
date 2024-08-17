import React, { useState } from 'react';
import NavBar from './NavBar';

const sampleData = [
    
    { id: 1, name: 'John Doe', testTime: '2024-08-01', testType: 'Blood Test', testStatus: 'Completed', fileDetails: 'View Details' },
    { id: 2, name: 'Jane Smith', testTime: '2024-08-02', testType: 'X-Ray', testStatus: 'Pending', fileDetails: 'View Details' },
    { id: 3, name: 'Bob Johnson', testTime: '2024-08-03', testType: 'MRI', testStatus: 'In Progress', fileDetails: 'View Details' },

];

function ProfileManagement() {
    const [searchField, setSearchField] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

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

    const filteredData = sampleData
        .filter(patient => {
            if (searchField === 'id') {
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
            <NavBar />
            <h2>Profile Management</h2>
            <div>
                <label htmlFor="searchField">Search by:</label>
                <select id="searchField" value={searchField} onChange={handleSearchFieldChange}>
                    <option value="name">Patient Name</option>
                    <option value="id">Patient ID</option>
                    <option value="testTime">Test Time</option>
                    <option value="testType">Test Type</option>
                    <option value="testStatus">Test Status</option>
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
                        <th onClick={() => handleSort('testTime')}>Test Time {sortKey === 'testTime' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
                        <th onClick={() => handleSort('testType')}>Test Type {sortKey === 'testType' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
                        <th onClick={() => handleSort('testStatus')}>Test Status {sortKey === 'testStatus' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
                        <th>File Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                            <td>{patient.testTime}</td>
                            <td>{patient.testType}</td>
                            <td>{patient.testStatus}</td>
                            <td>
                                <button onClick={() => alert(`Details for patient ID: ${patient.id}`)}>
                                    {patient.fileDetails}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProfileManagement;
