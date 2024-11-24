import React from "react";
import './HomeMenu.css';
import logo from './logo1.jpg';

function HomeMenu({ changeView }) {
    

    const handleRegisterClick = () => {
        changeView('register');
    };

    const handleLoginClick = () => {
        changeView('login'); 
    };

    return (
        <div className="main-container">
          <div className="content-wrapper">
            <div className="header">
                <img src={logo} alt="Team Logo" className="logo" />
                <h1 className="website-name">Welcome to the Personal Finance Tracker</h1>
            </div>
            <div className="button-container">
                <button className="button" onClick={handleRegisterClick}>
                    Register
                </button>
                <button className="button" onClick={handleLoginClick}>
                    Login
                </button>
            </div>
          </div>
        </div>
    );
}

export default HomeMenu;
