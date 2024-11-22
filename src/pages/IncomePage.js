import React, { useState, useEffect } from 'react';

const IncomePage = () => {
    const [income, setIncome] = useState([]);

    // Fetch income data from the backend
    useEffect(() => {
        const fetchIncome = async () => {
            const response = await fetch('http://localhost:5050/api/income');
            const data = await response.json();
            setIncome(data.income);
        };
        fetchIncome();
    }, []);

    return (
        <div>
            <h2>Manage Income</h2>
            <ul>
                {income.map((entry) => (
                    <li key={entry._id}>
                        {entry.source} - ${entry.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IncomePage;
