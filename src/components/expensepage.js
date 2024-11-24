import React, { useState } from 'react';
import '../expensepage.css';

const ExpensePage = () => {
    const [expenses, setExpenses] = useState([]); // State for expenses
    const [newExpense, setNewExpense] = useState({
        name: '',
        cost: '',
        isRecurring: false,
        frequency: 'weekly',
    });
    const [viewPeriod, setViewPeriod] = useState('yearly'); 
    const [editMode, setEditMode] = useState(null); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExpense((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        setNewExpense((prev) => ({ ...prev, isRecurring: e.target.checked }));
    };

    const addExpense = () => {
        if (newExpense.name && newExpense.cost) {
            setExpenses((prev) => [
                ...prev,
                { ...newExpense, id: Date.now(), cost: parseFloat(newExpense.cost) },
            ]);
            setNewExpense({ name: '', cost: '', isRecurring: false, frequency: 'weekly' });
        }
    };

    const deleteExpense = (id) => {
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    };

    const startEdit = (expense) => {
        setEditMode(expense.id);
        setNewExpense({
            name: expense.name,
            cost: expense.cost,
            isRecurring: expense.isRecurring,
            frequency: expense.frequency,
        });
    };

    const saveEdit = () => {
        setExpenses((prev) =>
            prev.map((expense) =>
                expense.id === editMode
                    ? { ...expense, ...newExpense, cost: parseFloat(newExpense.cost) }
                    : expense
            )
        );
        setEditMode(null);
        setNewExpense({ name: '', cost: '', isRecurring: false, frequency: 'weekly' });
    };

    const calculateTotals = () => {
        let recurringTotal = 0;
        let oneTimeTotal = 0;

        expenses.forEach((expense) => {
            if (expense.isRecurring) {
                const cost = expense.cost;
                switch (expense.frequency) {
                    case 'weekly':
                        recurringTotal +=
                            viewPeriod === 'weekly'
                                ? cost
                                : viewPeriod === 'monthly'
                                ? cost * 4
                                : cost * 50; 
                        break;
                    case 'monthly':
                        recurringTotal +=
                            viewPeriod === 'weekly'
                                ? cost / 4
                                : viewPeriod === 'monthly'
                                ? cost
                                : cost * 12;
                        break;
                    case 'yearly':
                        recurringTotal +=
                            viewPeriod === 'weekly'
                                ? cost / 50
                                : viewPeriod === 'monthly'
                                ? cost / 12
                                : cost;
                        break;
                    default:
                        break;
                }
            } else {
                oneTimeTotal += expense.cost;
            }
        });

        return {
            recurringTotal: recurringTotal.toFixed(2),
            oneTimeTotal: oneTimeTotal.toFixed(2),
        };
    };

    return (
        <div>
            <h1>Manage Expenses</h1>

            {/* Form to add or edit expenses */}
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Expense Name"
                    value={newExpense.name}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="cost"
                    placeholder="Cost"
                    value={newExpense.cost}
                    onChange={handleInputChange}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={newExpense.isRecurring}
                        onChange={handleCheckboxChange}
                    />
                    Recurring
                </label>
                {newExpense.isRecurring && (
                    <select
                        name="frequency"
                        value={newExpense.frequency}
                        onChange={handleInputChange}
                    >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                )}
                {editMode ? (
                    <button onClick={saveEdit}>Save Changes</button>
                ) : (
                    <button onClick={addExpense}>Add Expense</button>
                )}
            </div>

            {/* Dropdown to select view period */}
            <div>
                <label>View Recurring Expenses As: </label>
                <select
                    value={viewPeriod}
                    onChange={(e) => setViewPeriod(e.target.value)}
                >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>

            {/* Display expenses */}
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        {expense.name} - ${expense.cost.toFixed(2)} -{' '}
                        {expense.isRecurring
                            ? `Recurring (${expense.frequency})`
                            : 'One-Time'}
                        <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                        <button onClick={() => startEdit(expense)}>Edit</button>
                    </li>
                ))}
            </ul>

            {/* Total Expenses */}
            <h2>Total Recurring Expenses: ${calculateTotals().recurringTotal}</h2>
            <h2>Total One-Time Expenses: ${calculateTotals().oneTimeTotal}</h2>
        </div>
    );
};

export default ExpensePage;
