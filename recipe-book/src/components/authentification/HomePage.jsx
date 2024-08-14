import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <img 
                src={`${process.env.PUBLIC_URL}/pictures/recipe-book.webp`} 
                alt="Recipe Book" 
                className="background-image"
            />
            <h1>Welcome to Recipe App</h1>
            <div className="home-buttons">
                <button onClick={() => navigate('/log-in')} className="home-button">Log In</button>
                <button onClick={() => navigate('/sign-up')} className="home-button">Sign Up</button>
            </div>
        </div>
    );
};

export default HomePage;
