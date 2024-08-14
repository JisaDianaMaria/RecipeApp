import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';  


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            onLoginSuccess();
        } catch (error) {
            console.error("Eroare la autentificare", error);
        }
    };

    const onLoginSuccess = () => {
        navigate('/recipes');
    };

    return (
        <div className="auth-container">
            <h2>Log In</h2>
            <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="auth-button">Log In</button>
            </form>
            <p className="sign-up-link">
                Don't have an account yet? <span onClick={() => navigate('/sign-up')}>Sign Up</span>
            </p>
        </div>
    );
};

export default Login;
