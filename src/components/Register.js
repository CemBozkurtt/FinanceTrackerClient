import React, { useState } from 'react';
import './Register.css';

function Register({ changeView }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match, please try again.');
            return;
        }
        setMessage('Registration was successful!');
        //Registration logic here
    };

    return (
        <div className="register-container">
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Submit Registration</button>
            </form>
            <p>{message}</p>
            <button onClick={() => changeView('home')}>Return</button>
        </div>
    );
}

export default Register;
