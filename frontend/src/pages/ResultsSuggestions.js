import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

const suggestionsData = {
    "Blood Test": "Based on the blood test results, it is recommended to maintain a balanced diet and monitor cholesterol levels.",
    "X-Ray": "The X-Ray suggests a minor fracture. It is recommended to rest and avoid strenuous activities.",
    "MRI": "The MRI indicates no major issues, but regular check-ups are advised to monitor health."
    // 根据测试类型添加更多的建议数据
};

function ResultsSuggestions() {
    const { id, type } = useParams();
    const suggestion = suggestionsData[type] || "No suggestions available for this test type.";

    return (
        <div>
            <NavBar />
            <h2>Suggestions for Patient {id}</h2>
            <h3>{type} Suggestions</h3>
            <p>{suggestion}</p>

        </div>
    );
}

export default ResultsSuggestions;
