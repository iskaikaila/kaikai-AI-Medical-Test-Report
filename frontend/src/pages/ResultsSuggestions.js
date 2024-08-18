import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ResultSuggestion() {
    const { infoId } = useParams();
    const [suggestion, setSuggestion] = useState('');

    useEffect(() => {
        const fetchSuggestion = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/patient-info/${infoId}/suggestion`);
                setSuggestion(response.data.suggestion);
            } catch (error) {
                console.error('Error fetching suggestion:', error);
            }
        };

        fetchSuggestion();
    }, [infoId]);

    const handleChange = (e) => {
        setSuggestion(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5001/api/patient-info/${infoId}/suggestion`, { suggestion });
            alert('Suggestion updated successfully!');
        } catch (error) {
            console.error('Error updating suggestion:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Suggestion</h2>
            <textarea value={suggestion} onChange={handleChange} />
            <button type="submit">Save</button>
        </form>
    );
}

export default ResultSuggestion;
