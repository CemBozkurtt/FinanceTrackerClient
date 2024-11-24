import React, { useState } from 'react';
import './Login.css';

function Login({ changeView }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage('Please fill out all fields!');
            return;
        }
        setMessage('Login was Successful!');
        //Login logic here
    };

    return (
        <div className="login-container">
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
            <button onClick={() => changeView('home')}>Return</button>
        </div>
    );
}

export default Login;
