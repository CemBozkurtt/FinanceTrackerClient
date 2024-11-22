import React, { useState, useEffect } from 'react';

const ExpensesPage = () => {
    const [expenses, setExpenses] = useState([]);  // Initialize with an empty array
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [standardExpense, setStandardExpense] = useState('');
    const [variableExpense, setVariableExpense] = useState('');

    // Fetch expenses from the backend
    const fetchExpenses = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/expense');
            const data = await response.json();
            if (Array.isArray(data.expenses)) {
                setExpenses(data.expenses);  // Ensure data.expenses is an array
            } else {
                console.error("Error: Expected an array of expenses");
                setExpenses([]);  // Set as empty array if not valid
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
            setExpenses([]);  // Set as empty array if error occurs
        }
    };

    // Fetch expenses when the component loads
    useEffect(() => {
        fetchExpenses();
    }, []);

    // Add a new expense
    const handleAddExpense = async (e) => {
        e.preventDefault();
        const newExpense = {
            description,
            amount,
            standardExpense,
            variableExpense,
            userId: '60c5e4cd8f8c6f2d4c8b5c7e',  // Replace with actual userId (from logged-in user)
        };

        try {
            const response = await fetch('http://localhost:5050/api/expense', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newExpense),  // Include standardExpense and variableExpense
            });

            if (response.ok) {
                // Re-fetch expenses after adding a new one
                fetchExpenses();  // Re-fetch to get updated list from backend
            } else {
                console.error('Failed to add expense');
            }
        } catch (err) {
            console.error('Error adding expense:', err);
        }
    };

        const handleDeleteExpense = async (expenseId) => {
        const response = await fetch(`http://localhost:5050/api/expense/user/${expenseId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Remove the deleted expense from the local state
            setExpenses(expenses.filter((expense) => expense._id !== expenseId));
        } else {
            console.error('Failed to delete expense');
        }
    };


    return (
        <div>
            <h2>Manage Expenses</h2>

            {/* Form to add a new expense */}
            <form onSubmit={handleAddExpense}>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Standard Expense"
                    value={standardExpense}
                    onChange={(e) => setStandardExpense(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Variable Expense"
                    value={variableExpense}
                    onChange={(e) => setVariableExpense(e.target.value)}
                    required
                />
                <button type="submit">Add Expense</button>
            </form>

            {/* Display all expenses */}
            {expenses && expenses.length > 0 ? (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense._id}>
                            {expense.description} - ${expense.amount}
                            <button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No expenses found.</p>
            )}
        </div>
    );
};

export default ExpensesPage;
