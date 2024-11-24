import React, { useState } from 'react';
import './App.css';
import HomeMenu from './components/HomeMenu';
import Register from './components/Register';
import Login from './components/Login';

function App() {
    const [currentView, setCurrentView] = useState('home');

    const changeView = (view) => {
      setCurrentView(view);
    };

    return (
      <div className="App">
            <h1>Personal Finance Tracker</h1>
            {currentView === 'home' && <HomeMenu changeView={changeView} />}
            {currentView === 'register' && <Register changeView={changeView} />}
            {currentView === 'login' && <Login changeView={changeView} />}
        </div>
    );
}

export default App;
