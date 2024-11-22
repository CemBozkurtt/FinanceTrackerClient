import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation

const DashboardPage = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your financial dashboard!</p>
            <Link to="/manage-expenses">
                <button>Manage Expenses</button>
            </Link>
            <Link to="/manage-income">
                <button>Manage Income</button>
            </Link>
        </div>
    );
};

export default DashboardPage;
